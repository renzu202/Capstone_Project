

// Helper function to capitalize the first word of a string
function capitalizeFirstWord(input) {
    const words = input.split(' ');
    const capitalizedFirstWord = words.map((word, index) => index === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word);
    return capitalizedFirstWord.join(' ');
}

// Get all input elements within the form
var inputElements = document.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], textarea');

// Attach input event listeners to capitalize the first word of the text as the user types
inputElements.forEach(function(inputElement) {
    inputElement.addEventListener('input', function() {
        this.value = capitalizeFirstWord(this.value);
    });
});

// Message limiter

    var messageTextarea = document.getElementById("Message");

    // Select the element where the character count will be displayed
    var charCountElement = document.getElementById("charCount");

    // Add an event listener to the textarea to track changes
    messageTextarea.addEventListener("input", function() {
        // Get the current character count
        var currentCount = messageTextarea.value.length;

        // Update the character count display
        charCountElement.textContent = currentCount + "/500 characters";
    });

function scrollToTop() {
  $("html, body").animate({ scrollTop: 0 }, "slow");
}

function onSubmitForm(event) {
  event.preventDefault();

  // Extract form data
  const formData = {
    FirstName: $("#FirstName").val(),
    MiddleName: $("#MiddleName").val(),
    LastName: $("#LastName").val(),
    EmailAdd: $("#EmailAdd").val(),
    Subject: $("#Subject").val(),
    Message: $("#Message").val(),
  };

  // Make an AJAX request to submit the data to the server
  $.ajax({
    url: "/send_message",
    type: "POST",
    data: formData,
    success: function(response) {
      // Handle the server response if needed
      console.log("Data successfully submitted to the server");

      // Clear the form input fields
      $("#FirstName").val('');
      $("#MiddleName").val('');
      $("#LastName").val('');
      $("#EmailAdd").val('');
      $("#Subject").val('');
      $("#Message").val('');
    },
    error: function(error) {
      // Handle errors if the request fails
      console.error("Error submitting data to the server:", error);
    },
  });

  // Display the success message and scroll to the top
  scrollToTop();
  $("#showMessage").fadeIn(); // Show the message

  // Hide the message after 5 seconds
  setTimeout(function() {
    $("#showMessage").fadeOut(); // Hide the message
  }, 5000); // 5000 milliseconds = 5 seconds
}

// Attach the form submission handler to the form
$("#frmUser").submit(onSubmitForm);

