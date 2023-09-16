
// reload when submit treatment record
document.getElementById("form-wrapper").addEventListener("submit", function (event) {
            event.preventDefault(); // Prevent the default form submission behavior
            var form = this;

            // Make an AJAX request to submit the form data
            fetch(form.action, {
                method: form.method,
                body: new FormData(form),
            }).then(function (response) {
                if (response.ok) {
                    // Reload the page on success
                    location.reload();
                } else {
                    // Handle errors if needed
                    console.error("Error submitting form");
                }
            }).catch(function (error) {
                console.error("Error submitting form:", error);
            });
        });

// reload when edit treatment record
document.getElementById("edit-form-wrapper").addEventListener("submit", function (event) {
            event.preventDefault(); // Prevent the default form submission behavior
            var form = this;

            // Make an AJAX request to submit the form data
            fetch(form.action, {
                method: form.method,
                body: new FormData(form),
            }).then(function (response) {
                if (response.ok) {
                    // Reload the page on success
                    location.reload();
                } else {
                    // Handle errors if needed
                    console.error("Error submitting form");
                }
            }).catch(function (error) {
                console.error("Error submitting form:", error);
            });
        });


    // Next Appointment checkbox
        const appointmentCheckbox = document.getElementById("checkAppointment");
        const appointmentSection = document.getElementById("NA-section");

        appointmentCheckbox.addEventListener("change", function() {

        var NAInput = document.getElementById("NextAppointment");

            if (appointmentCheckbox.checked) {
                appointmentSection.style.display = "block";
                NAInput.value = "";
            } else {
                appointmentSection.style.display = "none";
                NAInput.value = "N/A";
            }
        });

        // set the current date as the "Date" input's value
    document.addEventListener("DOMContentLoaded", function () {
        const currentDate = new Date().toISOString().substr(0, 10); // Get current date in YYYY-MM-DD format
        document.getElementById("Date").value = currentDate;
    });

            // set the current date as the "Date" input's value
    document.addEventListener("DOMContentLoaded", function () {
        const currentDate = new Date().toISOString().substr(0, 10); // Get current date in YYYY-MM-DD format
        document.getElementById("edit-Date").value = currentDate;
    });


// JavaScript function to populate the "Edit Treatment" modal
function editRecord(id, remarks, procedure, amountCharged, amountPaid, nextAppointment) {
    // Set the values of the form fields in the "Edit Treatment" modal
    document.getElementById('edit-ID').value = id;
    document.getElementById('edit-Remarks').value = remarks;
    document.getElementById('edit-Procedure').value = procedure;
    document.getElementById('edit-AmountCharged').value = amountCharged;
    document.getElementById('edit-AmountPaid').value = amountPaid;
    document.getElementById('edit-NextAppointment').value = nextAppointment;

    // Display the "Edit Treatment" modal
    $('#editTreatmentModal').modal('show');
}

// Delete Function
    $('#deleteRecordModal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget); // Button that triggered the modal
        var recordId = button.data('record-id'); // Extract record ID from data-* attributes
        var modal = $(this);
        modal.find('#deleteRecordLink').attr('href', '/delete_treatment/' + recordId);
    });

