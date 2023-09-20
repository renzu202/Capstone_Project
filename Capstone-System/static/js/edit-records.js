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

