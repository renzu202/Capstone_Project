// JavaScript function to populate the "Update admin credentials" modal
function updateAdminRecord(id, username) {
    // Set the values of the form fields
    document.getElementById('edit-id-admin').value = id;
    document.getElementById('edit-username-admin').value = username;

    // Display the modal
    $('#editAdminModal').modal('show');
}

// JavaScript function to populate the "Update admin credentials" modal
function updateSecRecord(id, username) {
    // Set the values of the form fields
    document.getElementById('edit-id-sec').value = id;
    document.getElementById('edit-username-sec').value = username;

    // Display the modal
    $('#editSecModal').modal('show');
}