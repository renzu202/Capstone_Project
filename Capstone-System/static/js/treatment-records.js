
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
