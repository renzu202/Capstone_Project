

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