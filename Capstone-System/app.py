from aiohttp_session import setup, get_session
from aiohttp_session.cookie_storage import EncryptedCookieStorage
from cryptography.fernet import Fernet
import base64
from aiohttp import web
import os
import time
import random
import string
import aiohttp_jinja2
import jinja2
import aiomysql
import logging
import bcrypt



app = web.Application()
logging.basicConfig(level=logging.INFO)
# Static files configuration
static_path = os.path.join(os.path.dirname(__file__), 'static')
app.router.add_static('/static/', path=static_path, name='static')
aiohttp_jinja2.setup(app, loader=jinja2.FileSystemLoader('templates'))

# MySQL configurations
db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': '123456',
    'db': 'db_capstone',
    'autocommit': True,
}

async def create_pool(app):
    app['db_pool'] = await aiomysql.create_pool(**db_config)


async def close_pool(app):
    app['db_pool'].close()
    await app['db_pool'].wait_closed()

# Generate a random Fernet key
key = Fernet.generate_key()

# Encode the key as URL-safe base64 bytes
key_bytes = base64.urlsafe_b64decode(key)

# Print the key as a string (optional)
print(key.decode())

# Use the key as bytes in your aiohttp application
secret_key = key_bytes
setup(app, EncryptedCookieStorage(secret_key))

async def create_admin_credentials(app):
    admin_username = "admin"
    admin_password = "password"
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(admin_password.encode('utf-8'), salt)

    async with aiomysql.create_pool(**db_config) as pool:
        async with pool.acquire() as conn:
            async with conn.cursor() as cursor:

                # Check if the admin already exists
                check_admin_sql = "SELECT id FROM admin_credentials WHERE username = %s"
                await cursor.execute(check_admin_sql, (admin_username,))
                admin_exists = await cursor.fetchone()

                if not admin_exists:
                    # Insert admin credentials into the table
                    insert_admin_sql = """
                    INSERT INTO admin_credentials (username, hashed_password, salt)
                    VALUES (%s, %s, %s)
                    """
                    await cursor.execute(insert_admin_sql, (admin_username, hashed_password.decode('utf-8'), salt.decode('utf-8')))

# Ensure that the admin credentials are created when the application starts
app.on_startup.append(create_admin_credentials)

async def login(request):
    if request.method == 'POST':
        data = await request.post()
        username = data.get('username')
        password = data.get('password')

        async with request.app['db_pool'].acquire() as conn:
            async with conn.cursor() as cursor:
                # Retrieve the hashed password and salt based on the provided username
                query = "SELECT hashed_password, salt FROM admin_credentials WHERE username = %s"
                await cursor.execute(query, (username,))
                result = await cursor.fetchone()

                if result:
                    stored_hashed_password = result[0]
                    salt = result[1]

                    # Verify the entered password
                    if bcrypt.checkpw(password.encode('utf-8'), stored_hashed_password.encode('utf-8')):
                        # Password is correct, set a session cookie with the username
                        session = await get_session(request)
                        session['user_id'] = username  # Set the user_id in the session
                        # Set user_authenticated to True to indicate a successful login
                        user_authenticated = True
                        return aiohttp_jinja2.render_template('admin-dashboard.html', request, {'user_authenticated': user_authenticated})

                    else:
                        # Invalid password, redirect to error page
                        return aiohttp_jinja2.render_template('admin-login.html', request, {'error': True})
                else:
                    # Admin not found, redirect to error page
                    return aiohttp_jinja2.render_template('admin-login.html', request, {'error': True})

    # Handle GET requests, render the login form
    return aiohttp_jinja2.render_template('admin-login.html', request, {'error': False, 'success': False})



async def logout(request):
    # Remove the user's session or any necessary logout logic
    session = await get_session(request)
    session.pop('user_id', None)  # Remove the user_id from the session

    # Redirect to the login page or another appropriate page after logout
    return web.HTTPFound('/admin_login_page')  # Redirect to the login page

# Endpoint for validating email and 4-digit PIN
async def validate_email_and_pin(request):
    try:
        data = await request.json()
        email = data.get('email')
        pin = data.get('pin')

        # Perform email and PIN validation here
        async with request.app['db_pool'].acquire() as conn:
            async with conn.cursor() as cursor:
                query = "SELECT Email_Address, 4digit_PIN FROM tbl_verification WHERE Email_Address = %s AND 4digit_PIN = %s"
                await cursor.execute(query, (email, pin))
                result = await cursor.fetchone()

                if result:
                    # Email and PIN match a row in the database
                    return web.json_response({'valid': True})
                else:
                    # Email and PIN do not match any row
                    return web.json_response({'valid': False})

    except Exception as e:
        return web.json_response({'error': str(e)}, status=500)

async def home_page(request):
    return aiohttp_jinja2.render_template('home.html', request, {})


async def services_page(request):
    return aiohttp_jinja2.render_template('services.html', request, {})


async def book_an_appointment_page(request):
    return aiohttp_jinja2.render_template('book-an-appointment.html', request, {})

async def admin_dashboard_page(request):
    session = await get_session(request)
    user_id = session.get('user_id')

    if user_id:
        # User is authenticated, allow access to the admin dashboard page
        return aiohttp_jinja2.render_template('admin-dashboard.html', request, {'user_authenticated': True})

    # User is not authenticated, render the admin login page without redirecting
    return aiohttp_jinja2.render_template('admin-login.html', request, {'user_authenticated': False})


async def admin_calendar_page(request):
    return aiohttp_jinja2.render_template('admin-calendar.html', request, {})

async def admin_login_page(request):
    return aiohttp_jinja2.render_template('admin-login.html', request, {})

async def verify_timeslot(request):
    try:
        data = await request.json()

        date_input = data.get('date_slot')

        async with request.app['db_pool'].acquire() as conn:
            async with conn.cursor() as cursor:
                # Fetch the booked time slots from tbl_validation
                query = "SELECT Appointment_Schedule FROM tbl_appointments WHERE DATE(Appointment_Schedule) = DATE(%s)"
                await cursor.execute(query, (date_input,))
                result_validation = await cursor.fetchall()

                # Fetch the booked time slots from tbl_clinic_calendar
                query_calendar = "SELECT DoR_Timeslots FROM tbl_admin_timeslot WHERE DATE(DoR_Timeslots) = DATE(%s)"
                await cursor.execute(query_calendar, (date_input,))
                result_calendar = await cursor.fetchall()

                # Extract the time slots from the results and merge them
                booked_timeslots = [
                    time_slot[0].strftime('%H:%M')
                    for result in [result_validation, result_calendar]
                    for time_slot in result
                ]

                # Return the booked time slots as JSON
                return web.json_response(booked_timeslots)

    except Exception as e:
        return web.json_response({'error': str(e)})

async def get_all_email_addresses(request):
    try:
        async with request.app['db_pool'].acquire() as conn:
            async with conn.cursor() as cursor:
                # Retrieve all email addresses from the database
                query = "SELECT Email_Address FROM tbl_patient_information_record"
                await cursor.execute(query)
                result = await cursor.fetchall()

                # Extract the email addresses from the result
                email_addresses = [row[0] for row in result]

                return web.json_response({'email_addresses': email_addresses})

    except Exception as e:
        return web.json_response({'error': str(e)}, status=500)

async def admin_AandM_page(request):
    async with request.app['db_pool'].acquire() as conn:
        async with conn.cursor() as cursor:
            await cursor.execute("SELECT * FROM tbl_appointments")
            AptInfo = await cursor.fetchall()

            await cursor.execute("SELECT * FROM tbl_messages")
            MessInfo = await cursor.fetchall()

            return aiohttp_jinja2.render_template('admin-A&M.html', request, {'AptInfo': AptInfo, 'MessInfo': MessInfo})

async def book_appointment(request):
    async with request.app['db_pool'].acquire() as conn:
        async with conn.cursor() as cursor:
            try:
                data = await request.post()

                # GET USER INPUTS

                strFN = data['FirstName']
                strMN = data['MiddleName']
                strLN = data['LastName']
                strSex = data['Sex']
                intCP = int(data['Contact'])
                strEmail = data['Email']
                intPIN = data['PIN']
                intBirth = data['Birth']
                strAge = data['Age']
                strRlg = data['Religion']
                strNational = data['Nationality']
                strHA = data['HomeAddress']
                strPoG = data['PoGName']
                intCP1 = int(data['Contact2'])
                strOcp1 = data['Occupation2']
                intDate = data['CDate']
                strDR = data['Reason']
                strDenT = data['Dentist']
                strLV = data['LastVisit']

                strPName = data['PName']
                strPMcare = data['PMCare']
                strOption1 = data['Option1']
                strOption2 = data['Option2']
                strtb1 = data['tb1']
                strOption3 = data['Option3']
                strtb2 = data['tb2']
                strOption4 = data['Option4']
                strtb3 = data['tb3']
                strOption5 = data['Option5']
                strOption6 = data['Option6']
                strOption7 = data['Option7']
                strOption8 = data['Option8']
                strOption9 = data['Option9']
                strcf = data.getall('checkbox_field')
                checkbox_string = ', '.join(strcf)
                strothers = data['Other']

                # Save file
                file = data['image'].file
                filename = data['image'].filename

                def generate_unique_filename(filename):
                    timestamp = str(int(time.time() * 1000))
                    random_string = ''.join(random.choices(string.ascii_lowercase + string.digits, k=8))
                    extension = os.path.splitext(filename)[1]
                    unique_filename = timestamp + '_' + random_string + extension
                    return unique_filename

                unique_filename = generate_unique_filename(filename)

                # Save the uploaded file to the desired directory
                upload_dir = 'static/img/uploads'
                with open(os.path.join(upload_dir, unique_filename), 'wb') as f:
                    f.write(file.read())

                    intDateCreated = data['submissionDate']

                # SAVE RECORD TO DATABASE
                sql1 = "INSERT INTO tbl_patient_information_record \
                   (First_Name, Middle_Name, Last_Name, Sex, Contact_No, Email_Address, Birthdate, Age, Religion, Nationality, Home_Address, Parent_Name, Parent_Contact_No, Parent_Occupation, Date, Dental_Reason, Previous_Dentist, Last_Visit, Valid_ID, Appointment_Schedule, Date_Created) VALUES(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
                sql2 = "INSERT INTO tbl_medical_history \
                    (Physicians_Name, Present_Medical_Care, q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11, q12, \
                    Medical_Conditions, other) VALUES(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"

                sql3 = "INSERT INTO tbl_appointments (First_Name, Middle_Name, Last_Name, Email_Address, Appointment_Schedule, Dental_Reason) VALUES(%s, %s, %s, %s, %s, %s)"

                sql4 = "INSERT INTO tbl_verification (Email_Address, 4digit_PIN) VALUES(%s, %s)"

                data1 = (strFN, strMN, strLN, strSex, intCP, strEmail, intBirth, strAge, strRlg, strNational, strHA,
                         strPoG, intCP1, strOcp1, intDate, strDR, strDenT, strLV, unique_filename, data['appointment_schedule'], intDateCreated)

                data2 = (strPName, strPMcare, strOption1, strOption2, strtb1, strOption3, strtb2, strOption4, strtb3, strOption5, strOption6, strOption7, strOption8, strOption9, checkbox_string, strothers)

                data3 = (strFN, strMN, strLN, strEmail, data['appointment_schedule'], strDR)

                data4 = (strEmail, intPIN)

                await cursor.execute(sql1, data1)
                await cursor.execute(sql2, data2)
                await cursor.execute(sql3, data3)
                await cursor.execute(sql4, data4)

                flash_message = 'Record successfully saved in the database!'
                return web.Response(text=flash_message)

            except Exception as e:
                print("Error:", e)
                return web.Response(text='Error while submitting appointment')

async def OP_book_appointment(request):
    async with request.app['db_pool'].acquire() as conn:
        async with conn.cursor() as cursor:
            try:
                data = await request.post()

                # GET USER INPUTS

                strFN = data['OP-FirstName']
                strMN = data['OP-MiddleName']
                strLN = data['OP-LastName']
                strEmail = data['OP-Email']
                strDR = data['OP-Reason']

                # SAVE RECORD TO DATABASE
                sql1 = "INSERT INTO tbl_appointments \
                   (First_Name, Middle_Name, Last_Name, Email_Address, Appointment_Schedule, Dental_Reason) VALUES(%s, %s, %s, %s, %s, %s)"

                data1 = (strFN, strMN, strLN, strEmail, data['appointment_schedule'], strDR)

                await cursor.execute(sql1, data1)

                flash_message = 'Record successfully saved in the database!'
                return web.Response(text=flash_message)

            except Exception as e:
                print("Error:", e)
                return web.Response(text='Error while submitting appointment')

async def fetch_patient_info(request):
    try:
        email = request.query.get('emailV')  # Get the email address from the query parameter

        async with request.app['db_pool'].acquire() as conn:
            async with conn.cursor() as cursor:
                # Execute a SQL query to retrieve patient information based on the email address
                query = "SELECT Email_Address, First_Name, Middle_Name, Last_Name, Contact_No FROM tbl_patient_information_record WHERE Email_Address = %s"
                await cursor.execute(query, email)
                result = await cursor.fetchone()

                if result:
                    # Extract the desired fields from the result
                    email_address, first_name, middle_name, last_name, contact_no = result

                    # Create a dictionary to store the fetched data
                    patient_info = {
                        "Email_Address": email_address,
                        "First_Name": first_name,
                        "Middle_Name": middle_name,
                        "Last_Name": last_name,
                        "Contact_No": contact_no
                    }

                    logging.info(f"Fetched patient info: {patient_info}")

                    # Return the fetched data as JSON
                    return web.json_response(patient_info)
                else:
                    # Email address not found in the database
                    return web.json_response({"error": "Email address not found"}, status=404)

    except Exception as e:
        return web.json_response({"error": str(e)}, status=500)

async def contact_us_page(request):
    return aiohttp_jinja2.render_template('contact-us.html', request, {})


async def send_message(request):
    try:
        data = await request.post()

        # GET USER INPUTS
        strFname = data['FirstName']
        strMname = data['MiddleName']
        strLname = data['LastName']
        strEmail = data['EmailAdd']
        strSubject = data['Subject']
        strMess = data['Message']

        async with request.app['db_pool'].acquire() as conn:
            async with conn.cursor() as cursor:
                # SAVE RECORD TO DATABASE
                sql = "INSERT INTO tbl_messages (First_Name, Middle_Name, Last_Name, Email_Address, Subject, Message) VALUES(%s, %s, %s, %s, %s, %s)"
                data = (strFname, strMname, strLname, strEmail, strSubject, strMess)
                await cursor.execute(sql, data)

        return aiohttp_jinja2.render_template('contact-us.html', request, {})

    except Exception as e:
        print(e)
        return web.Response(text='Error while submitting message')


async def admin_tables_page(request):
    async with request.app['db_pool'].acquire() as conn:
        async with conn.cursor() as cursor:
            await cursor.execute("SELECT * FROM tbl_patient_information_record")
            personalInfo = await cursor.fetchall()

            await cursor.execute("SELECT * FROM tbl_medical_history")
            medicalInfo = await cursor.fetchall()

            return aiohttp_jinja2.render_template('admin-tables.html', request, {'personalInfo': personalInfo, 'medicalInfo': medicalInfo})


async def get_image_url(request):
    user_id = request.query.get('id')

    if not user_id:
        return web.Response(text="Missing user ID", status=400)

    async with request.app['db_pool'].acquire() as conn:
        async with conn.cursor() as cursor:
            await cursor.execute("SELECT Valid_ID FROM tbl_patient_information_record WHERE ID = %s", (user_id,))
            image_url = await cursor.fetchone()

            if image_url:
                return web.Response(text=image_url[0])
            else:
                return web.Response(text="Image URL not found", status=404)


async def submit_treatment(request):
    try:
        data = await request.post()

        # GET USER INPUTS
        patient_id = data['ID']
        intDate = data['Date']
        strProced = data['Procedure']
        strRem = data['Remarks']
        floatAC = float(data['AmountCharged'])
        floatAP = float(data['AmountPaid'])
        floatBal = floatAC - floatAP
        intNA = data['NextAppointment']

        async with request.app['db_pool'].acquire() as conn:
            async with conn.cursor() as cursor:
                # SAVE RECORD TO DATABASE
                sql = "INSERT INTO tbl_treatment_record \
                       (ID, Date, `Procedure`, Remarks, Amount_Charged, Amount_Paid, Balance, Next_Appointment) VALUES(%s, %s, %s, %s, %s, %s, %s, %s)"
                data = (patient_id, intDate, strProced, strRem, floatAC, floatAP, floatBal, intNA)
                await cursor.execute(sql, data)

        return web.Response(text='')

    except Exception as e:
        print(e)
        return web.Response(text='Error while submitting message')

async def update_treatment(request):
    try:
        data = await request.post()

        # GET USER INPUTS
        patient_id = data['ID']
        intDate = data['Date']
        strProced = data['Procedure']
        strRem = data['Remarks']
        floatAC = float(data['AmountCharged'])
        floatAP = float(data['AmountPaid'])
        floatBal = floatAC - floatAP
        intNA = data['NextAppointment']

        async with request.app['db_pool'].acquire() as conn:
            async with conn.cursor() as cursor:
                # UPDATE EXISTING RECORD
                sql = "UPDATE tbl_treatment_record SET Date=%s, `Procedure`=%s, Remarks=%s, Amount_Charged=%s, Amount_Paid=%s, Balance=%s, Next_Appointment=%s WHERE T_ID=%s"
                data = (intDate, strProced, strRem, floatAC, floatAP, floatBal, intNA, patient_id)

                await cursor.execute(sql, data)

        return web.Response(text='Treatment record updated successfully')

    except Exception as e:
        print(e)
        return web.Response(text='Error while updating treatment record')



async def read_one_treatment(request):
    try:
        patient_id = request.match_info['id']
        logging.info(f"Patient ID: {patient_id}")

        async with request.app['db_pool'].acquire() as conn:
            async with conn.cursor() as cursor:
                await cursor.execute("SELECT * FROM tbl_patient_information_record WHERE id=%s", patient_id)
                row = await cursor.fetchone()

                # Retrieve treatment records for the patient
                await cursor.execute("SELECT * FROM tbl_treatment_record WHERE ID=%s", patient_id)
                treatment_records = await cursor.fetchall()

                if row:
                    return aiohttp_jinja2.render_template('treatment-records.html', request, {'row': row, 'treatment_records': treatment_records})
                else:
                    return web.Response(text='Error loading #{id}'.format(id=patient_id))

    except Exception as e:
        print(e)
        return web.Response(text='Error while loading treatment records')


async def delete_user(request):
    try:
        patient_id = request.match_info['id']

        async with request.app['db_pool'].acquire() as conn:
            async with conn.cursor() as cursor:
                await cursor.execute("DELETE FROM tbl_patient_information_record WHERE ID=%s", patient_id)

                await cursor.execute("DELETE FROM tbl_medical_history WHERE ID=%s", patient_id)

                await cursor.execute("DELETE FROM tbl_verification WHERE ID=%s", patient_id)

                await cursor.execute("DELETE FROM tbl_treatment_record WHERE ID=%s", patient_id)

        redirect_url = '/admin_tables_page'
        return web.HTTPFound(redirect_url)

    except Exception as e:
        print(e)
        return web.Response(text='Error while deleting user')

async def delete_appointment(request):
    try:
        patient_id = request.match_info['id']

        async with request.app['db_pool'].acquire() as conn:
            async with conn.cursor() as cursor:
                await cursor.execute("DELETE FROM tbl_appointments WHERE ID=%s", patient_id)

        redirect_url = '/admin_A&M_page'
        return web.HTTPFound(redirect_url)

    except Exception as e:
        print(e)
        return web.Response(text='Error while deleting user')

async def delete_treatment(request):
    try:
        patient_id = request.match_info['id']

        async with request.app['db_pool'].acquire() as conn:
            async with conn.cursor() as cursor:
                await cursor.execute("DELETE FROM tbl_treatment_record WHERE T_ID=%s", patient_id)

        # No response is needed here

    except Exception as e:
        print(e)

    # Redirect to the same page (refresh)
    return web.HTTPFound(request.headers.get('Referer', '/'))



async def delete_message(request):
    try:
        patient_id = request.match_info['id']

        async with request.app['db_pool'].acquire() as conn:
            async with conn.cursor() as cursor:
                await cursor.execute("DELETE FROM tbl_messages WHERE ID=%s", patient_id)

        redirect_url = '/admin_A&M_page'
        return web.HTTPFound(redirect_url)

    except Exception as e:
        print(e)
        return web.Response(text='Error while deleting user')

async def save_timeslot(request):
    try:
        data = await request.json()
        selected_schedule = data.get("selected_schedule")

        async with request.app['db_pool'].acquire() as conn:
            async with conn.cursor() as cursor:
                # Save the selected_schedule to your database table
                sql = "INSERT INTO tbl_admin_timeslot (DoR_Timeslots) VALUES (%s)"
                await cursor.execute(sql, (selected_schedule,))

        return web.json_response({"message": "Schedule saved successfully"})
    except Exception as e:
        return web.json_response({"error": str(e)}, status=500)

async def fetch_timeslots(request):
    try:
        async with request.app['db_pool'].acquire() as conn:
            async with conn.cursor() as cursor:
                query = "SELECT DoR_Timeslots FROM tbl_admin_timeslot"
                await cursor.execute(query)
                result = await cursor.fetchall()

                timeslots = [
                    timeslot[0].strftime('%Y-%m-%d %H:%M:%S')
                    for timeslot in result
                ]

                print("Timeslots API Response:", timeslots)

                return web.json_response(timeslots)
    except Exception as e:
        return web.json_response({'error': str(e)})

async def disable_day(request):
    try:
        data = await request.json()
        selected_day = data.get("selected_day")

        async with request.app['db_pool'].acquire() as conn:
            async with conn.cursor() as cursor:
                # Save the selected_schedule to your database table
                sql = "INSERT INTO tbl_admin_date (Disabled_Dates) VALUES (%s)"
                await cursor.execute(sql, (selected_day,))

        return web.json_response({"message": "Schedule saved successfully"})
    except Exception as e:
        return web.json_response({"error": str(e)}, status=500)

async def fetch_disabled_dates(request):
    try:
        async with request.app['db_pool'].acquire() as conn:
            async with conn.cursor() as cursor:
                query = "SELECT Disabled_Dates FROM tbl_admin_date"
                await cursor.execute(query)
                result = await cursor.fetchall()

                disabled_dates = [
                    date[0].strftime('%Y-%m-%d')
                    for date in result
                ]

                return web.json_response(disabled_dates)
    except Exception as e:
        return web.json_response({'error': str(e)})

async def delete_disabled_date(request):
    date_to_delete = request.query.get('date')
    try:
        async with request.app['db_pool'].acquire() as conn:
            async with conn.cursor() as cursor:
                query = "DELETE FROM tbl_admin_date WHERE Disabled_Dates = %s"
                await cursor.execute(query, date_to_delete)
                return web.json_response({'message': f'Disabled date {date_to_delete} deleted successfully'})
    except Exception as e:
        return web.json_response({'error': str(e)})

async def delete_disabled_timeslot(request):
    timeslot_to_delete = request.query.get('timeslot')
    try:
        async with request.app['db_pool'].acquire() as conn:
            async with conn.cursor() as cursor:
                query = "DELETE FROM tbl_admin_timeslot WHERE DoR_Timeslots = %s"
                await cursor.execute(query, timeslot_to_delete)
                return web.json_response({'message': f'Disabled timeslot {timeslot_to_delete} deleted successfully'})
    except Exception as e:
        return web.json_response({'error': str(e)})






app.router.add_get('/', home_page)
app.router.add_get('/services_page', services_page)
app.router.add_get('/book_an_appointment_page', book_an_appointment_page)
app.router.add_post('/book_appointment', book_appointment)
app.router.add_post('/OP_book_appointment', OP_book_appointment)
app.router.add_post('/customer/appointments/verify-timeslot', verify_timeslot)
app.router.add_get('/contact_us_page', contact_us_page)
app.router.add_post('/send_message', send_message)
app.router.add_get('/admin_tables_page', admin_tables_page)
app.router.add_get('/admin_dashboard_page', admin_dashboard_page)
app.router.add_get('/admin_calendar_page', admin_calendar_page)
app.router.add_get('/admin_A&M_page', admin_AandM_page)
app.router.add_get('/admin_login_page', admin_login_page)
app.router.add_post('/submit_treatment', submit_treatment)
app.router.add_get('/read_one_treatment/{id}', read_one_treatment)
app.router.add_get('/delete_user/{id}', delete_user)
app.router.add_get('/delete_appointment/{id}', delete_appointment)
app.router.add_get('/delete_message/{id}', delete_message)
app.router.add_get('/delete_treatment/{id}', delete_treatment)
app.router.add_get('/get_image_url', get_image_url)
app.router.add_post('/save-timeslot', save_timeslot)
app.router.add_post('/disable-day', disable_day)
app.router.add_get('/fetch-disabled-dates', fetch_disabled_dates)
app.router.add_get('/fetch_timeslots', fetch_timeslots)
app.router.add_get('/api/get-all-emails', get_all_email_addresses)
app.router.add_delete('/delete-disabled-date', delete_disabled_date)
app.router.add_delete('/delete-disabled-timeslot', delete_disabled_timeslot)
app.router.add_post('/login', login)
app.router.add_route('*', '/logout', logout)
app.router.add_post('/validate-email-pin', validate_email_and_pin)
app.router.add_post('/update_treatment', update_treatment)
app.router.add_get('/api/fetch-patient-info', fetch_patient_info)


app.on_startup.append(create_pool)
app.on_cleanup.append(close_pool)

def main():
    web.run_app(app, host='localhost', port=8080)

if __name__ == "__main__":
    main()