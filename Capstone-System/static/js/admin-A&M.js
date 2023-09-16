
// Function to handle the search request
function searchAppointmentTable() {
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


    $('#EnableCon').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget); // Button that triggered the modal
        var patientId = button.data('patient-id');
        var modal = $(this);
        modal.find('#confirm_enable_button').attr('href', '/delete_timeslots_booked/' + patientId);
    });
