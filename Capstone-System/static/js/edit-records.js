function previewImage(event) {
  var input = event.target;
  var preview = document.getElementById('preview');

  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      preview.setAttribute('src', e.target.result);
      preview.style.display = 'block'; // Show the preview image
      $("#VIDImage").hide();
    };

    reader.readAsDataURL(input.files[0]);
  } else {
    preview.setAttribute('src', '');
    preview.style.display = 'none'; // Hide the preview image
  }
}


// Hide/Show Password
const showPassword = document.querySelector("#show-password");
const passwordField = document.querySelector("#pass");

showPassword.addEventListener("click", function() {
    const type = passwordField.getAttribute("type") === "password" ? "text" : "password";
    passwordField.setAttribute("type", type);

    // Toggle the color to yellow
    if (type === "text") {
        this.style.color = "blue";
    } else {
        this.style.color = "gray";
    }
});

