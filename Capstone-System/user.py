from aiohttp import web
import os
import time
import random
import string
import aiohttp_jinja2
import jinja2
import aiomysql
import logging


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


async def home_page(request):
    return aiohttp_jinja2.render_template('home.html', request, {})


async def services_page(request):
    return aiohttp_jinja2.render_template('services.html', request, {})


async def online_appointment_page(request):
    return aiohttp_jinja2.render_template('online-appointment.html', request, {})


async def book_appointment(request):
    async with request.app['db_pool'].acquire() as conn:
        async with conn.cursor() as cursor:
            try:
                data = await request.post()

                # GET USER INPUTS

                #data 1
                strFN = data['FullName']
                strSex = data['Sex']
                intCP = int(data['Contact'])
                strEmail = data['Email']
                intBirth = data['Birth']
                strAge = data['Age']
                strRlg = data['Religion']
                strNational = data['Nationality']
                strHA = data['HomeAddress']
                strOcp = data['Occupation']
                strPoG = data['PoGName']
                intCP1 = int(data['Contact2'])
                strOcp1 = data['Occupation2']
                intDate = data['CDate']
                strDR = data['Reason']
                strDenT = data['Dentist']
                strLV = data['LastVisit']

                # data2
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
                        (Full_Name, Sex, Contact_No, Email_Address, Birthdate, Age, Religion, Nationality, Home_Address, \
                        Occupation, Parent_Name, Parent_Contact_No, Parent_Occupation, Date, Dental_Reason, Previous_Dentist, \
                        Last_Visit) VALUES(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
                sql2 = "INSERT INTO tbl_medical_history \
                        (Physicians_Name, Present_Medical_Care, q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11, q12, \
                        Medical_Conditions, other) VALUES(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"

                sql3 = "INSERT INTO tbl_validation (Valid_ID, Appointment_Schedule, Date_Created) VALUES(%s, %s, %s)"

                data1 = (strFN, strSex, intCP, strEmail, intBirth, strAge, strRlg, strNational, strHA,
                         strOcp, strPoG, intCP1, strOcp1, intDate, strDR, strDenT, strLV)

                data2 = (strPName, strPMcare, strOption1, strOption2, strtb1, strOption3, strtb2, strOption4, strtb3, strOption5, strOption6, strOption7, strOption8, strOption9, checkbox_string, strothers)

                data3 = (unique_filename, data['appointment_schedule'], intDateCreated)

                await cursor.execute(sql1, data1)
                await cursor.execute(sql2, data2)
                await cursor.execute(sql3, data3)

                flash_message = 'Record successfully saved in the database!'
                return web.Response(text=flash_message)

            except Exception as e:
                print("Error:", e)
                return web.Response(text='Error while submitting appointment')


async def verify_timeslot(request):
    try:
        data = await request.json()

        date_input = data.get('date_slot')

        async with request.app['db_pool'].acquire() as conn:
            async with conn.cursor() as cursor:
                # Fetch the booked time slots for the selected date from the database
                query = "SELECT Appointment_Schedule FROM tbl_validation WHERE DATE(Appointment_Schedule) = DATE(%s)"
                await cursor.execute(query, (date_input,))
                result = await cursor.fetchall()

                # Extract the time slots from the result and return as a list
                booked_timeslots = [time_slot[0].strftime('%H:%M') for time_slot in result]

                # Return the booked time slots as JSON
                return web.json_response(booked_timeslots)

    except Exception as e:
        return web.json_response({'error': str(e)})


async def contact_us_page(request):
    return aiohttp_jinja2.render_template('contact-us.html', request, {})


async def send_message(request):
    try:
        data = await request.post()

        # GET USER INPUTS
        strFname = data['FullName']
        strEmail = data['EmailAdd']
        strSubject = data['Subject']
        strMess = data['Message']

        async with request.app['db_pool'].acquire() as conn:
            async with conn.cursor() as cursor:
                # SAVE RECORD TO DATABASE
                sql = "INSERT INTO tbl_messages (Full_Name, Email_Address, Subject, Message) VALUES(%s, %s, %s, %s)"
                data = (strFname, strEmail, strSubject, strMess)
                await cursor.execute(sql, data)

        flash_message = 'Record successfully saved in the database!'
        return web.Response(text=flash_message)

    except Exception as e:
        print(e)
        return web.Response(text='Error while submitting message')


async def admin_page(request):
    async with request.app['db_pool'].acquire() as conn:
        async with conn.cursor() as cursor:
            await cursor.execute("SELECT * FROM tbl_patient_information_record")
            personalInfo = await cursor.fetchall()

            await cursor.execute("SELECT * FROM tbl_medical_history")
            medicalInfo = await cursor.fetchall()

            await cursor.execute("SELECT * FROM tbl_validation")
            OtherInfo = await cursor.fetchall()

            return aiohttp_jinja2.render_template('admin.html', request, {'personalInfo': personalInfo, 'medicalInfo': medicalInfo, 'OtherInfo': OtherInfo})


async def get_image_url(request):
    user_id = request.query.get('id')

    if not user_id:
        return web.Response(text="Missing user ID", status=400)

    async with request.app['db_pool'].acquire() as conn:
        async with conn.cursor() as cursor:
            await cursor.execute("SELECT Valid_ID FROM tbl_validation WHERE ID = %s", (user_id,))
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
        intAC = data['AmountCharged']
        intAP = data['AmountPaid']
        intBal = data['Balance']
        intNA = data['NextAppointment']

        async with request.app['db_pool'].acquire() as conn:
            async with conn.cursor() as cursor:
                # SAVE RECORD TO DATABASE
                sql = "INSERT INTO tbl_treatment_record \
                       (ID, Date, `Procedure`, Remarks, Amount_Charged, Amount_Paid, Balance, Next_Appointment) VALUES(%s, %s, %s, %s, %s, %s, %s, %s)"
                data = (patient_id, intDate, strProced, strRem, intAC, intAP, intBal, intNA)
                await cursor.execute(sql, data)

        flash_message = 'Record successfully saved in the database!'
        return web.Response(text=flash_message)

    except Exception as e:
        print(e)
        return web.Response(text='Error while submitting message')


async def read_one_treatment(request):
    try:
        patient_id = request.match_info['id']
        logging.info(f"Patient ID: {patient_id}")

        async with request.app['db_pool'].acquire() as conn:
            async with conn.cursor() as cursor:
                await cursor.execute("SELECT * FROM tbl_patient_information_record WHERE id=%s", patient_id)
                row = await cursor.fetchone()
                logging.info(f"Patient Information: {row}")

                # Retrieve treatment records for the patient
                await cursor.execute("SELECT * FROM tbl_treatment_record WHERE ID=%s", patient_id)
                treatment_records = await cursor.fetchall()
                logging.info(f"Treatment Records: {treatment_records}")

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

        flash_message = 'Record successfully deleted from the server!'
        return web.Response(text=flash_message)

    except Exception as e:
        print(e)
        return web.Response(text='Error while deleting user')


app.router.add_get('/', home_page)
app.router.add_get('/services_page', services_page)
app.router.add_get('/online_appointment_page', online_appointment_page)
app.router.add_post('/book_appointment', book_appointment)
app.router.add_post('/customer/appointments/verify-timeslot', verify_timeslot)
app.router.add_get('/contact_us_page', contact_us_page)
app.router.add_post('/send_message', send_message)
app.router.add_get('/admin_page', admin_page)
app.router.add_post('/submit_treatment', submit_treatment)
app.router.add_get('/read_one_treatment/{id}', read_one_treatment)
app.router.add_get('/delete_user/{id}', delete_user)
app.router.add_get('/get_image_url', get_image_url)

app.on_startup.append(create_pool)
app.on_cleanup.append(close_pool)

def main():
    web.run_app(app, host='localhost', port=8080)

if __name__ == "__main__":
    main()
