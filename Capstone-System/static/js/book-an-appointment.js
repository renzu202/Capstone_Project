let submitBtn = document.getElementById('submit-btn');
let myForm = document.getElementById("form-wrapper");
let preloader = document.getElementById('preloader-wrapper');
let bodyElement = document.querySelector('body');
let successDiv = document.getElementById('success');
let lastTab = document.getElementById('tab-6');


// Add a keydown event listener to the form
myForm.addEventListener("keydown", function(event) {
    // Check if the pressed key is the Enter key (key code 13)
    if (event.keyCode === 13) {
        // Prevent the form from submitting
        event.preventDefault();

        // Simulate pressing the "Tab" key to move to the next focusable element
        const focusableElements = myForm.querySelectorAll("input, button, select, textarea, a[href]");
        const currentFocusedIndex = Array.from(focusableElements).indexOf(document.activeElement);
        const nextFocusedIndex = (currentFocusedIndex + 1) % focusableElements.length;

        focusableElements[nextFocusedIndex].focus();
    }
});

// Tabs
$(".tab").hide();
$("#tab-0").show();

//Tab 0 - Patient Selection
function NP() {
    $("#tab-1").show();
    $("#tab-0").hide();
}

function OP() {
    $("#tab-0").hide();
    $("#tab-OP").show();
}

//Tab OP - Old Patient
function PrevOP() {
    $("#tab-0").show();
    $("#tab-OP").hide();
}

function NextOPval() {

}

//Tab 1 - Informed Consent
function PrevVal() {
    $("#tab-1").hide();
    $("#tab-0").show();
}

function NextVal() {
    var checkbox = document.getElementById("agreement");
    if (!checkbox.checked) {
        document.getElementById("agreeVal").innerHTML = "You must agree by reading the informed consent or clicking the checkbox.";
        return false;
    }
    else {
        document.getElementById("agreeVal").innerHTML = "";
        $("#tab-1").hide();
        $("#tab-2").show();
    }
}


//Tab 2 - Patient Information Record

// age event listener
const ageInput = document.getElementById("Age");

ageInput.addEventListener("blur", function() {
        var poGNameInput = document.getElementById("PoGName");
        var contact2Input = document.getElementById("Contact2");
        var occupation2Input = document.getElementById("Occupation2");
    // Get the entered age
    const enteredAge = parseInt(ageInput.value);

    // Check if the entered age is below 18
    if (enteredAge < 18) {
        $('#minor-section').show();
        poGNameInput.value = "";
        contact2Input.value = "";
        occupation2Input.value = "";
    } else {
        $('#minor-section').hide();
        poGNameInput.value = "N/A";
        contact2Input.value = 0;
        occupation2Input.value = "N/A";
    }
});

    // history checkbox
        const historyCheckbox = document.getElementById("history");
        const historySection = document.getElementById("dentalHistory-section");

        historyCheckbox.addEventListener("change", function() {
        var prevDenInput = document.getElementById("Dentist");
        var lastVisitInput = document.getElementById("LastVisit");

            if (historyCheckbox.checked) {
                historySection.style.display = "block";
                prevDenInput.value = "";
                lastVisitInput.value = "";
            } else {
                historySection.style.display = "none";
                prevDenInput.value = "N/A";
                lastVisitInput.value = "1111-11-11";
            }
        });

    function NextVal1() {
        var FN = document.getElementById("FullName").value;
        var Sex = document.getElementById("Sex").value;
        var CN1 = document.getElementById("Contact").value;
        var EA = document.getElementById("Email").value;
        var BD = document.getElementById("Birth").value;
        var Age = document.getElementById("Age").value;
        var Rel = document.getElementById("Religion").value;
        var HA = document.getElementById("HomeAddress").value;
        var Nation = document.getElementById("Nationality").value;
        var PoGName = document.getElementById("PoGName").value;
        var CN2 = document.getElementById("Contact2").value;
        var Occ2 = document.getElementById("Occupation2").value;
        var CDate = document.getElementById("CDate").value;
        var Reason = document.getElementById("Reason").value;
        var PD = document.getElementById("Dentist").value;
        var LV = document.getElementById("LastVisit").value;
        var q7input = document.getElementById("inlineRadio14");
        var q8input = document.getElementById("inlineRadio16");
        var q9input = document.getElementById("inlineRadio18");


        if (FN === "") {
            document.getElementById("FNval").innerHTML = "*This field is required";
            return false;
        }
        else {
            document.getElementById("FNval").innerHTML = "";
        }

        if (Sex === "") {
            document.getElementById("Sexval").innerHTML = "*This field is required";
            return false;
        }
        else {
            document.getElementById("Sexval").innerHTML = "";
        }

        if (CN1 === "") {
            document.getElementById("Contact1val").innerHTML = "*This field is required";
            return false;
        }
        else {
            document.getElementById("Contact1val").innerHTML = "";
        }

        if (EA === "") {
            document.getElementById("EAval").innerHTML = "*This field is required";
            return false;
        }
        else {
            document.getElementById("EAval").innerHTML = "";
        }

        if (BD === "") {
            document.getElementById("BDval").innerHTML = "*This field is required";
            return false;
        }
        else {
            document.getElementById("BDval").innerHTML = "";
        }

        if (Age === "") {
            document.getElementById("Ageval").innerHTML = "*This field is required";
            return false;
        }
        else {
            document.getElementById("Ageval").innerHTML = "";
        }

        if (Rel === "") {
            document.getElementById("Relval").innerHTML = "*This field is required";
            return false;
        }
        else {
            document.getElementById("Relval").innerHTML = "";
        }

        if (HA === "") {
            document.getElementById("HAval").innerHTML = "*This field is required";
            return false;
        }
        else {
            document.getElementById("HAval").innerHTML = "";
        }

        if (Nation === "") {
            document.getElementById("Nationval").innerHTML = "*This field is required";
            return false;
        }
        else {
            document.getElementById("Nationval").innerHTML = "";
        }


        if (PoGName === "") {
            document.getElementById("PoGNameval").innerHTML = "*This field is required";
            return false;
        }
        else {
            document.getElementById("PoGNameval").innerHTML = "";
        }

        if (CN2 === "") {
            document.getElementById("Contact2val").innerHTML = "*This field is required";
            return false;
        }
        else {
            document.getElementById("Contact2val").innerHTML = "";
        }

        if (Occ2 === "") {
            document.getElementById("Occupation2val").innerHTML = "*This field is required";
            return false;
        }
        else {
            document.getElementById("Occupation2val").innerHTML = "";
        }

        if (CDate === "") {
            document.getElementById("CDATEval").innerHTML = "*This field is required";
            return false;
        }
        else {
            document.getElementById("CDATEval").innerHTML = "";
        }

        if (Reason === "") {
            document.getElementById("Reasonval").innerHTML = "*This field is required";
            return false;
        }
        else {
            document.getElementById("Reasonval").innerHTML = "";
        }

        if (PD === "") {
            document.getElementById("PDval").innerHTML = "*This field is required";
            return false;
        }
        else {
            document.getElementById("PDval").innerHTML = "";
        }

        if (LV === "") {
            document.getElementById("LVval").innerHTML = "*This field is required";
            return false;
        }
        else {
            document.getElementById("LVval").innerHTML = "";
        }

        if (Sex === "Female") {
            q7input.value = "No";
            q8input.value = "No";
            q9input.value = "No";
            q7input.checked = false;
            q8input.checked = false;
            q9input.checked = false;
            $('#women-section').show()
        }
         else if (Sex === "Male") {
            q7input.value = "N/A";
            q8input.value = "N/A";
            q9input.value = "N/A";
            q7input.checked = true;
            q8input.checked = true;
            q9input.checked = true;
            $('#women-section').hide()
        }

        // Proceed if all field have value
        $("#tab-2").hide();
        $("#tab-3").show();
    }

    function Prev1() {
        $("#tab-2").hide();
        $("#tab-1").show();
        }


//Tab 3 - Medical History

// Add event listeners for each radio button group
document.getElementById("inlineRadio3").addEventListener("change", handleOption2Change);
document.getElementById("inlineRadio4").addEventListener("change", handleOption2Change);

document.getElementById("inlineRadio5").addEventListener("change", handleOption3Change);
document.getElementById("inlineRadio6").addEventListener("change", handleOption3Change);

document.getElementById("inlineRadio7").addEventListener("change", handleOption4Change);
document.getElementById("inlineRadio8").addEventListener("change", handleOption4Change);

function handleOption2Change() {
    var option2Selected = document.querySelector('input[name="Option2"]:checked');
    var tb1 = document.getElementById("tb1");

    if (option2Selected.value === "Yes") {
        tb1.value = "";
        $('.tb1Section').show();
    } else if (option2Selected.value === "No") {
        $('.tb1Section').hide();
        tb1.value = "N/A";
    }
}

function handleOption3Change() {
    var option3Selected = document.querySelector('input[name="Option3"]:checked');
    var tb2 = document.getElementById("tb2");

    if (option3Selected.value === "Yes") {
        tb2.value = "";
        $('.tb2Section').show();
    } else if (option3Selected.value === "No") {
        $('.tb2Section').hide();
        tb2.value = "N/A";
    }
}

function handleOption4Change() {
    var option4Selected = document.querySelector('input[name="Option4"]:checked');
    var tb3 = document.getElementById("tb3");

    if (option4Selected.value === "Yes") {
        tb3.value = "";
        $('.tb3Section').show();
    } else if (option4Selected.value === "No") {
        $('.tb3Section').hide();
        tb3.value = "N/A";
    }
}



 // medical conditions checkbox
        const medicalCheckbox = document.getElementById("medCheck");


           medicalCheckbox.addEventListener("change", function() {

        if (medicalCheckbox.checked) {
            $('.medicalCon-section').show()
        } else {
            $('.medicalCon-section').hide()
        }
    });


    function NextVal2(){
        var pName = document.getElementById("PName").value;
        var pmCare = document.getElementById("PMCare").value;
        var option1Selected = document.querySelector('input[name="Option1"]:checked');
        var option2Selected = document.querySelector('input[name="Option2"]:checked');
        var option3Selected = document.querySelector('input[name="Option3"]:checked');
        var option4Selected = document.querySelector('input[name="Option4"]:checked');
        var option5Selected = document.querySelector('input[name="Option5"]:checked');
        var option6Selected = document.querySelector('input[name="Option6"]:checked');
        var tb1 = document.getElementById("tb1").value;
        var tb2 = document.getElementById("tb2").value;
        var tb3 = document.getElementById("tb3").value;

         if (pName === "") {
            document.getElementById("PnameVal").innerHTML = "*This field is required";
            return false;
        }
        else {
            document.getElementById("PnameVal").innerHTML = "";
        }

         if (pmCare === "") {
            document.getElementById("PMcareVal").innerHTML = "*This field is required";
            return false;
        }
        else {
            document.getElementById("PMcareVal").innerHTML = "";
        }

        if (!option1Selected) {
        document.getElementById("Option1val").innerHTML = "*Please select an option";
        return false;
        } else {
            document.getElementById("Option1val").innerHTML = "";
        }

        if (!option2Selected) {
            document.getElementById("Option2val").innerHTML = "*Please select an option";
            return false;
        } else {
            document.getElementById("Option2val").innerHTML = "";
        }

         if (tb1 === "") {
            document.getElementById("tb1Val").innerHTML = "*This field is required";
            return false;
        }
        else {
            document.getElementById("tb1Val").innerHTML = "";
        }

        if (!option3Selected) {
            document.getElementById("Option3val").innerHTML = "*Please select an option";
            return false;
        } else {
            document.getElementById("Option3val").innerHTML = "";
        }

         if (tb2 === "") {
            document.getElementById("tb2Val").innerHTML = "*This field is required";
            return false;
        }
        else {
            document.getElementById("tb2Val").innerHTML = "";
        }

        if (!option4Selected) {
            document.getElementById("Option4val").innerHTML = "*Please select an option";
            return false;
        } else {
            document.getElementById("Option4val").innerHTML = "";
        }

         if (tb3 === "") {
            document.getElementById("tb3Val").innerHTML = "*This field is required";
            return false;
        }
        else {
            document.getElementById("tb3Val").innerHTML = "";
        }

        if (!option5Selected) {
            document.getElementById("Option5val").innerHTML = "*Please select an option";
            return false;
        } else {
            document.getElementById("Option5val").innerHTML = "";
        }

        if (!option6Selected) {
            document.getElementById("Option6val").innerHTML = "*Please select an option";
            return false;
        } else {
            document.getElementById("Option6val").innerHTML = "";
        }




        // Proceed if all field have value
        $("#tab-3").hide();
        $("#tab-4").show();
    }

    function Prev2() {
        $("#tab-3").hide();
        $("#tab-2").show();
        }

//Tab 4 - Upload ID
    function NextVal3(){

         const fileInput = document.getElementById('image');
         const previewImage = document.getElementById('preview');
         const imageError = document.getElementById('image-error');

    // Check if a file was selected
    if (fileInput.files.length === 0) {
        imageError.textContent = 'Please upload your ID';
        imageError.style.display = 'block';
        return false;
    } else {
        imageError.style.display = 'none';
    }
        // Proceed if all field have value
        $("#tab-4").hide();
        $("#tab-5").show();
    }

    function Prev3() {
        $("#tab-4").hide();
        $("#tab-3").show();
        }

//Tab 5 - Appointment setter
    function NextVal4(){
    const scheduleInput = document.querySelector('.selected-schedule-input');
    const scheduleError = document.getElementById('schedule-error');

    if (!scheduleInput.value) {
        scheduleError.textContent = 'Please select an appointment';
        scheduleError.style.display = 'block';
        return false;
    } else {
        scheduleError.style.display = 'none';
    }

        // Proceed if all field have value
        $("#tab-5").hide();
        $("#tab-6").show();
    }

    function Prev4() {
        $("#tab-5").hide();
        $("#tab-4").show();
        }

//Tab 6

    function Prev5() {
        $("#tab-6").hide();
        $("#tab-5").show();
        }


submitBtn.addEventListener('click', async (event) => {
    event.preventDefault(); // Prevent form submission and page reload

    preloader.classList.add('d-block');

    const timer = ms => new Promise(res => setTimeout(res, ms));

    try {
        await timer(100);

        bodyElement.classList.add('loaded');

        lastTab.classList.add('d-none');
        successDiv.classList.add('d-block');

        // Collect form data
        const formData = new FormData(document.getElementById('form-wrapper'));

        // Handle checkboxes
        const checkboxes = document.querySelectorAll('input[name="checkbox_field"]');
        const selectedCheckboxes = Array.from(checkboxes).filter(function(checkbox) {
            return checkbox.checked;
        }).map(function(checkbox) {
            return checkbox.value;
        });

        const checkboxString = selectedCheckboxes.length > 0 ? selectedCheckboxes.join(', ') : 'N/A';

        // Handle Other field
        const otherField = document.getElementById('Other');
        const otherValue = otherField.value.trim();
        const strothers = otherValue !== '' ? otherValue : 'N/A';

        // Set the modified values to the form fields
        formData.set('checkbox_field', checkboxString);
        formData.set('Other', strothers);

        // Get the current date and time
        const currentDate = new Date();

        // Format the date in a suitable format (e.g., "YYYY-MM-DD HH:MM:SS")
        const formattedDate = currentDate.toISOString().slice(0, 19).replace("T", " ");

        // Set the value of the hidden input field (submissionDate) to the formatted date
        formData.set('submissionDate', formattedDate);

        // Send AJAX request
        const response = await fetch('/book_appointment', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error:', error);
    }
});

$(document).on('click', '#btn_agree', function() {
            $('#agreement').prop('checked', true)
            $('#consentmodal').modal('hide')
        })



function previewImage(event) {
  var input = event.target;
  var preview = document.getElementById('preview');

  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      preview.setAttribute('src', e.target.result);
      preview.style.display = 'block'; // Show the preview image
    };

    reader.readAsDataURL(input.files[0]);
  } else {
    preview.setAttribute('src', '');
    preview.style.display = 'none'; // Hide the preview image
  }
}


document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('.index-btn').forEach(button => {
        button.addEventListener('click', scrollToTop);
    });

    // Function to scroll to the top of the page
    function scrollToTop() {
        // Scroll to the top of the page
        document.documentElement.scrollTop = 0; // For modern browsers
        document.body.scrollTop = 0; // For older browsers
    }
});



// Appointment Calendar
 var appointment_id = 0;

var timeslots = [
    "10:00 am - 10:30 am",
    "10:30 am - 11:00 am",
    "11:00 am - 11:30 am",
    "11:30 am - 12:00 pm",
    "12:00 pm - 12:30 pm",
    "12:30 pm - 1:00 pm",
    "01:00 pm - 01:30 pm",
    "01:30 pm - 02:00 pm",
    "02:00 pm - 02:30 pm",
    "02:30 pm - 03:00 pm",
    "03:00 pm - 03:30 pm",
    "03:30 pm - 04:00 pm",
];


    var calendar;
    var appointment = {};


   let availableSlotsData = {}; // Variable to store the fetched data

// Async function to fetch available time slots for a given date
async function fetchAvailableTimeSlots(selectedDate) {
    try {
        const response = await $.ajax({
            url: '/customer/appointments/verify-timeslot',
            method: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({ date_slot: selectedDate }),
        });

        // Convert the API response to a set for efficient lookup
        const bookedTimeSlotsSet = new Set(response.map((time) => parseInt(time)));

        // Store the fetched data in the availableSlotsData variable
        availableSlotsData[selectedDate] = bookedTimeSlotsSet;
    } catch (error) {
        console.log('Error fetching booked time slots:', error);
    }
}

// Async function to fetch booked time slots for a given date
async function fetchBookedTimeSlots(selectedDate) {
    try {
        const response = await $.ajax({
            url: '/customer/appointments/verify-timeslot',
            method: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({ date_slot: selectedDate }),
        });

        // Convert the API response to a set for efficient lookup
        const bookedTimeSlotsSet = new Set(response.map((time) => {
            var [hour, minute] = time.split(":");
            var hourInt = parseInt(hour);
            if (hourInt >= 1 && hourInt <= 9) {
                // Convert the 12-hour format to 24-hour format (integer)
                hourInt += 12;
            }
            return hourInt * 60 + parseInt(minute);
        }));

        return bookedTimeSlotsSet;
    } catch (error) {
        console.log('Error fetching booked time slots:', error);
        return new Set(); // Return an empty set in case of an error
    }
}

// Function to update event titles based on the booked time slots
function updateEventTitle(info) {
    // Get the selected date from the event
    const selectedDate = moment(info.event.start).format('YYYY-MM-DD');

    // Call the function to get the booked time slots for the selected date
    fetchBookedTimeSlots(selectedDate).then(bookedTimeSlotsSet => {
        // Calculate the available slots for the event
        const availableSlots = 12 - (bookedTimeSlotsSet ? bookedTimeSlotsSet.size : 0);

        // Get the event title element
        const eventTitleElement = info.el.querySelector('.fc-event-title.fc-sticky');

        // Update the event title and style based on the available slots
        if (availableSlots > 0) {
            eventTitleElement.textContent = `${availableSlots} Slots Available`;
            eventTitleElement.style.color = ''; // Reset text color
        } else {
            eventTitleElement.textContent = 'Fully Booked';
            eventTitleElement.style.color = 'red'; // Set text color to red
        }
    });

}



    $(function(){
        var date = new Date()
        var d    = date.getDate(),
            m    = date.getMonth(),
            y    = date.getFullYear()

        var Calendar = FullCalendar.Calendar;

        calendar = new Calendar(document.getElementById('appointment-calendar'), {
            headerToolbar: {
                left  : false,
                center: 'title',
            },
            height: 500,
            allDaySlot: false,
            selectable: false,
            droppable: false,
            editable: false,
            disableDragging: false,
            themeSystem: 'bootstrap',
            weekends: true,

events: function (fetchInfo, successCallback, failureCallback) {
    // Get the start and end date of the current month
    var startDate = moment(fetchInfo.start).startOf('month');
    var endDate = moment(fetchInfo.end).endOf('month');

    // Calculate today's date
    var today = moment().startOf('day');

    // Ensure that the start date is not before today
    if (startDate.isBefore(today)) {
        startDate = today;
    }

    // Create an array to hold the events for each day in the month
    var events = [];

    // Loop through each day in the month starting from today
    while (startDate.isSameOrBefore(endDate)) {
        // For each day, create an event object and add it to the events array
        events.push({
            start: startDate.format('YYYY-MM-DD'),
            title: '',
            allDay: true,
        });

        // Move to the next day
        startDate.add(1, 'day');
    }

    // Call the successCallback with the events array to render them on the calendar
    successCallback(events);
},

eventClick: function (info) {
    var slotsAvailable = parseInt($(info.el).find('.fc-sticky').text());
    if (slotsAvailable > 0) {
        // Get the selected date from the calendar
        var selectedDate = moment(info.event.start).format('YYYY-MM-DD');

        // Fetch booked time slots from the API endpoint for the selected date
        $.ajax({
            url: '/customer/appointments/verify-timeslot',
            method: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({ date_slot: selectedDate }),
            success: function (response) {
                // Convert booked time slots from API response to a set for efficient lookup
                var bookedTimeSlotsSet = new Set(response.map(time => {
                    var [hour, minute] = time.split(":");
                    var hourInt = parseInt(hour);
                    if (hourInt >= 1 && hourInt <= 9) {
                        // Convert the 12-hour format to 24-hour format (integer)
                        hourInt += 12;
                    }
                    return hourInt * 60 + parseInt(minute);
                }));

                // Log the booked time slots for the selected date to the console
    console.log('Booked time slots for', selectedDate, bookedTimeSlotsSet);

                // Generate the time slot HTML with only the available time slots
                var timeslot_html = '';
                timeslot_html += '<div class="row">';
                timeslots.forEach(function (timeslot) {
                    // Check if the start time of the timeslot is booked
                    if (!isTimeslotBooked(timeslot, bookedTimeSlotsSet)) {
                        // The timeslot is available, include it in the HTML
                        timeslot_html += '<div class="col-md-3 my-2">';
                        timeslot_html += `<button class="btn btn-sm btn-outline-primary btn-timeslot" type="button" style="width:170px">${timeslot}</button>`;
                        timeslot_html += '</div>';
                    }
                });
                timeslot_html += '</div>';

                // Update the time slot modal content with the new HTML
                $('.timeslot-container').html(timeslot_html);
                $('#timeslot_modal').modal('show');
            },
            error: function (error) {
                console.log('Error fetching booked time slots:', error);
            },

        });
        function isTimeslotBooked(timeslot, bookedTimeSlotsSet) {
    var startTimePart = timeslot.split(" -")[0].trim();
    var [hour, minute, meridian] = startTimePart.split(/:| /);
    var hourInt = parseInt(hour);
    if (meridian === "pm" && hourInt !== 12) {
        hourInt += 12;
    }
    var timeslotInteger = hourInt * 60 + parseInt(minute);
    return bookedTimeSlotsSet.has(timeslotInteger);
}
    } else {
        $('#zero_slot_modal').modal('show');
    }
},
                eventDidMount: updateEventTitle,
            editable  : true
        });

    })


$(document).on('click', '.fc-daygrid-day-events', function() {
    var day = $(this).prev().find('.fc-daygrid-day-number').text();
    var month = $('.fc-toolbar-title').text().split(" ")[0];
    var year = $('.fc-toolbar-title').text().split(" ")[1];
    var date_slot = `${month} ${day}, ${year}`;

    $('.date_input').val(moment($(this).parents('td').attr('data-date')).format('Y-MM-D'));

});

$(document).on('click', '.btn-timeslot', function() {
    $(this).removeClass('btn-primary').addClass('btn-success').css('color', '#fff');

    var selectedDate = $('.date_input').val();
    var selectedSchedule = $(this).text(); // Get the selected time slot

    $('#patientDate').text(selectedDate);
    $('#patientTime').text(selectedSchedule);
    $('.selected-schedule').text(selectedDate + ', ' + selectedSchedule); // Update the display of selected time slot
    $('.timeslot_input').val(selectedSchedule); // Set the selected time slot in the hidden input field
    $('.btn-timeslot').not(this).prop('disabled', true);
    $('#timeslot_modal').modal('hide');

    var formattedSchedule = selectedDate + ' ' + selectedSchedule.split(" ")[0];
    $('.selected-schedule-input').val(formattedSchedule);
    console.log(formattedSchedule);

        var converted_time = $(this).text().split(' -')[0]
        converted_time = moment(converted_time, 'hh:mm A').format('HH:mm')
        $('.timeslot_input').val(converted_time);

    // Show the "Selected Schedule" modal
    $('#selected_schedule_modal').modal('show');
    });

    $(document).on('hidden.bs.modal', '.modal', function () {
    if ($('.modal:visible').length) {
        $('body').addClass('modal-open');
    }
    });

    // Add a listener for the "Select Another" button in the "Selected Schedule" modal
    $(document).on('click', '#select_another_button', function() {
        $('#selected_schedule_modal').modal('hide');
    });

    // Add a listener for the "Confirm" button in the "Selected Schedule" modal
    $(document).on('click', '#confirm_button', function() {
        $('#selected_schedule_modal').modal('hide');
        $('#calendarModal').modal('hide');
    });

    $(document).on('click', '.btn-calendar', function() {
        $(this).prop('disabled', true)

        if ($('.continue-modal-btn').is(':visible')) {
            $(this).prop('disabled', false)
        }

        calendar.render();
    })

$(document).ready(function() {
    $('.tab input, .tab select, .tab textarea').on('change', function() {
        const fullName = $('#FullName').val();
        const dob = $('#Birth').val();
        const contactNumber = $('#Contact').val();
        const emailAddress = $('#Email').val();
        const appointmentLocation = 'Unit OB6 Estelita Calilung Bldg., San Matias, Guagua Pampanga';

        $('#patientName').text(fullName);
        $('#patientDOB').text(dob);
        $('#patientContact').text(contactNumber);
        $('#patientEmail').text(emailAddress);
        $('#appointmentLocation').text(appointmentLocation);
    });
});

