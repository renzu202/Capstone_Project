

// Add event listener to search input
document.getElementById("searchInput").addEventListener("keyup", function() {
    searchAppointmentTable();
});

// Add event listener to reset table when search input is empty
document.getElementById("searchInput").addEventListener("input", function() {
    if (this.value === "") {
        var table = document.getElementById("customerTable");
        var tr = table.getElementsByTagName("tr");

        for (var i = 0; i < tr.length; i++) {
            tr[i].style.display = "";
        }
    }
});

$(document).ready(function() {
    // Event handler for the "Patient Record" link click
    $('.view').click(function() {
        var message = $(this).data('mess');

        // Set the user information in the modal
        $('#messageModal .modal-body').text(message);
    });
});

$(document).ready(function() {
    // Event handler for the "Patient Record" link click
    $('.view').click(function() {
        var message = $(this).data('dental');

        // Set the user information in the modal
        $('#ReasonModal .modal-body').text(message);
    });
});

// Function to handle the search request for Appointments
function searchTable() {
    var input, filter, table, tr, td, i, j, txtValue;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("AppointmentTable");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows (excluding the first row)
    for (i = 1; i < tr.length; i++) {
        var matchFound = false;
        td = tr[i].getElementsByTagName("td");

        // Loop through all table columns in each row
        for (j = 0; j < td.length; j++) {
            var column = td[j];
            if (column) {
                txtValue = column.textContent || column.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    matchFound = true;
                    break;
                }
            }
        }

        // Show/hide row based on matchFound value
        if (matchFound) {
            tr[i].style.display = "";
        } else {
            tr[i].style.display = "none";
        }
    }
}

// Add event listener to appointments search input
document.getElementById("searchInput").addEventListener("keyup", function() {
    searchTable();
});


// Function to handle the search request for Appointments
function searchMessageTable() {
    var input, filter, table, tr, td, i, j, txtValue;
    input = document.getElementById("searchMessageInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("MessageTable");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows (excluding the first row)
    for (i = 1; i < tr.length; i++) {
        var matchFound = false;
        td = tr[i].getElementsByTagName("td");

        // Loop through all table columns in each row
        for (j = 0; j < td.length; j++) {
            var column = td[j];
            if (column) {
                txtValue = column.textContent || column.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    matchFound = true;
                    break;
                }
            }
        }

        // Show/hide row based on matchFound value
        if (matchFound) {
            tr[i].style.display = "";
        } else {
            tr[i].style.display = "none";
        }
    }
}

// Add event listener to appointments search input
document.getElementById("searchMessageInput").addEventListener("keyup", function() {
    searchMessageTable();
});


    $('#EnableCon').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget); // Button that triggered the modal
        var patientId = button.data('patient-id');
        var modal = $(this);
        modal.find('#confirm_enable_button').attr('href', '/delete_timeslots_booked/' + patientId);
    });


// Function to fetch and populate completed appointments
async function fetchAndPopulateCompletedAppointments() {
  try {
    const response = await fetch('/api/fetch-completed-appointments'); // Replace with your actual API endpoint
    if (!response.ok) {
      throw new Error('Failed to fetch completed appointments');
    }
    const data = await response.json();

    const completedAppointmentList = document.getElementById('completed-appointment-list');
    completedAppointmentList.innerHTML = ''; // Clear the existing list

    data.forEach(appointment => {
      const li = document.createElement('li');
      li.textContent = appointment;
      completedAppointmentList.appendChild(li);
    });
  } catch (error) {
    console.error(error);
  }
}

// Function to fetch and populate canceled appointments
async function fetchAndPopulateCanceledAppointments() {
  try {
    const response = await fetch('/api/fetch-canceled-appointments'); // Replace with your actual API endpoint
    if (!response.ok) {
      throw new Error('Failed to fetch canceled appointments');
    }
    const data = await response.json();

    const canceledAppointmentList = document.getElementById('canceled-appointment-list');
    canceledAppointmentList.innerHTML = ''; // Clear the existing list

    data.forEach(appointment => {
      const li = document.createElement('li');
      li.textContent = appointment;
      canceledAppointmentList.appendChild(li);
    });
  } catch (error) {
    console.error(error);
  }
}

// Call the functions to populate the lists when the page loads
window.addEventListener('load', () => {
  fetchAndPopulateCompletedAppointments();
  fetchAndPopulateCanceledAppointments();
});

// Function to clear completed appointments
async function clearCompletedAppointments() {
  try {
    const response = await fetch('/api/delete-completed-appointments', {
      method: 'POST', // You may need to change the HTTP method if it's different
    });
    if (!response.ok) {
      throw new Error('Failed to clear completed appointments');
    }

    // Clear the completed appointments list
    const completedAppointmentList = document.getElementById('completed-appointment-list');
    completedAppointmentList.innerHTML = '';
  } catch (error) {
    console.error(error);
  }
}

// Function to clear canceled appointments
async function clearCanceledAppointments() {
  try {
    const response = await fetch('/api/delete-canceled-appointments', {
      method: 'POST', // You may need to change the HTTP method if it's different
    });
    if (!response.ok) {
      throw new Error('Failed to clear canceled appointments');
    }

    // Clear the canceled appointments list
    const canceledAppointmentList = document.getElementById('canceled-appointment-list');
    canceledAppointmentList.innerHTML = '';
  } catch (error) {
    console.error(error);
  }
}

// Event listeners for the "Clear" buttons
document.getElementById('clearCompletedAppointments').addEventListener('click', clearCompletedAppointments);
document.getElementById('clearCanceledAppointments').addEventListener('click', clearCanceledAppointments);
