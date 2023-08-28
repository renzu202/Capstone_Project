// Appointment Calendar
 var appointment_id = 0;

var timeslots = [
    "10:00 am - 11:00 am",
    "11:00 am - 12:00 pm",
    "12:00 pm - 01:00 pm",
    "01:00 pm - 02:00 pm",
    "02:00 pm - 03:00 pm",
    "03:00 pm - 4:00 pm",
];


    var calendar;
    var appointment = {};


   let availableSlotsData = {}; // Variable to store the fetched data

  function fetchAndDisplayDisabledDates() {
            $.ajax({
                url: '/fetch-disabled-dates', // Update with your API endpoint URL
                method: 'GET',
                dataType: 'json',
                success: function (response) {
                    const disabledDatesList = response.map(date => `<li>${date}</li>`).join('');
                    $('#disabled-dates-list').html(`<ul>${disabledDatesList}</ul>`);
                },
                error: function (error) {
                console.log('Error fetching disabled dates:', error);
                }
            });
        }

        function fetchAndDisplayTimeslots() {
            $.ajax({
                url: '/fetch_timeslots', // Update with your API endpoint URL
                method: 'GET',
                dataType: 'json',
                success: function (response) {
                    const timeslotsList = response.map(timeslot => `<li>${timeslot}</li>`).join('');
                    $('#timeslots-list').html(`<ul>${timeslotsList}</ul>`);
                },
                error: function (error) {
                    console.log('Error fetching timeslots:', error);
                }
            });
        }

        // Fetch disabled dates and timeslots when the page loads
        fetchAndDisplayDisabledDates();
        fetchAndDisplayTimeslots();


// Function to save timeslot using Fetch API
function saveTimeslot(selectedSchedule) {
    fetch('/save-timeslot', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ selected_schedule: selectedSchedule })
    })
    .then(response => response.json())
    .then(data => {
        // Display the response message
        $('#response-message').html(`<p>${data.message}</p>`);
    })
    .catch(error => {
        console.error('Error saving schedule:', error);
        $('#response-message').html(`<p>Error: ${error.message}</p>`);
    });
}


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

async function fetchBookedTimeSlotsFromCalendar(selectedDate) {
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
        console.log('Error fetching booked time slots from calendar:', error);
        return new Set(); // Return an empty set in case of an error
    }
}

// Function to update event titles based on the booked time slots
function updateEventTitle(info) {
    // Get the selected date from the event
    const selectedDate = moment(info.event.start).format('YYYY-MM-DD');

    // Fetch disabled dates from the API
    fetch('/fetch-disabled-dates')
        .then(response => response.json())
        .then(disabledDates => {
            const eventTitleElement = info.el.querySelector('.fc-event-title.fc-sticky');

            // Check if the selected date is disabled
            if (disabledDates.includes(selectedDate)) {
                eventTitleElement.textContent = 'Not Available';
                eventTitleElement.style.color = '#433F3E';
                return; // Exit the function if the date is disabled
            }

            // Fetch booked time slots from the API for the selected date
            fetchBookedTimeSlots(selectedDate).then(bookedTimeSlotsSet => {
                // Fetch booked time slots from the calendar's own API for the selected date
                fetchBookedTimeSlotsFromCalendar(selectedDate).then(bookedTimeSlotsFromCalendar => {
                    // Combine the two sets of booked time slots
                    const combinedBookedTimeSlots = new Set([...bookedTimeSlotsSet, ...bookedTimeSlotsFromCalendar]);

                    // Calculate available slots
                    const availableSlots = 6 - combinedBookedTimeSlots.size;

                    if (availableSlots > 0) {
                        eventTitleElement.textContent = `${availableSlots} Slots Available`;
                        eventTitleElement.style.color = '';
                    } else {
                        eventTitleElement.textContent = 'Fully Booked';
                        eventTitleElement.style.color = 'red';
                    }
                });
            });
        })
        .catch(error => {
            console.log('Error fetching disabled dates:', error);
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
            hiddenDays: [0],
            height: 500,
            allDaySlot: false,
            selectable: false,
            droppable: false,
            editable: false,
            themeSystem: 'bootstrap',
            weekends: true,

events: function (fetchInfo, successCallback, failureCallback) {
    // Get the start and end date of the current month
    var startDate = moment(fetchInfo.start).startOf('month');
     var endDate = moment(today).add(2, 'months');

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
    var eventTitle = $(info.el).find('.fc-sticky').text();

    if (eventTitle === 'Not Available') {
        showNotAvailableModal(); // Show the "Not Available" modal
        return; // Prevent further processing
    }

    var slotsAvailable = parseInt(eventTitle);
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

                 updateEventTitle(info);

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



$(document).on('click', '#confirm_button', function() {
    var selectedSchedule = $('.selected-schedule-input').val();

    axios.post('/save-timeslot', { selected_schedule: selectedSchedule })
        .then(response => {
            console.log(response.data.message); // Success message from backend
            $('#selected_schedule_modal').modal('hide');
            $('#calendarModal').modal('hide');
            $('.btn-calendar').click();
            $('.btn-calendar').click();
            fetchAndDisplayTimeslots();
        })
        .catch(error => {
            console.error('Error saving schedule:', error.response.data.error);
        });
});


$(document).ready(function() {
    var isCalendarRendered = false;

    $(document).on('click', '.btn-calendar', function() {
        if (!isCalendarRendered) {
            // Render the calendar
            calendar.render();
            $('.btn-calendar').text('Close Calendar');
        } else {
            // Hide and destroy the calendar
            calendar.destroy();
            $('.btn-calendar').text('Open Calendar');
        }

        // Toggle the flag
        isCalendarRendered = !isCalendarRendered;
    });
});

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

$(document).on('click', '.btn-disable-day', function() {
    $('#timeslot_modal').modal('hide');
    $('#confirm_disable_modal').modal('show');
});

    // Add a listener for the "Disable this Day" button
$(document).on('click', '#confirm_disable_button', function() {
    var selectedDay = $('.date_input').val();
    console.log(selectedDay);

    axios.post('/disable-day', { selected_day: selectedDay })
        .then(response => {
            console.log(response.data.message); // Success message from backend
            $('#confirm_disable_modal').modal('hide');
        })
        .catch(error => {
            console.error('Error saving schedule:', error.response.data.error);
        });
        $('#confirm_disable_modal').modal('hide');
        $('.btn-calendar').click();
        $('.btn-calendar').click();
        fetchAndDisplayDisabledDates();
});

function showNotAvailableModal() {
    $('#not_available_modal').modal('show');
}






