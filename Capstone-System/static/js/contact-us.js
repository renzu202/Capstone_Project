

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