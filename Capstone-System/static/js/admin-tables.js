
// Function to handle the search request
function searchTable() {
    var input, filter, table, tr, td, i, j, txtValue;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("customerTable");
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
    searchTable();
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
        var id = $(this).data('id');
        var fname = $(this).data('fname');
        var mname = $(this).data('mname');
        var lname = $(this).data('lname');
        var sex = $(this).data('sex');
        var contact = $(this).data('contact');
        var email = $(this).data('email');
        var birthdate = $(this).data('birthdate');
        var age = $(this).data('age');
        var religion = $(this).data('religion');
        var address = $(this).data('address');
        var nationality = $(this).data('nationality');
        var parent = $(this).data('parent');
        var gcontact = $(this).data('gcontact');
        var goccupation = $(this).data('goccupation');
        var datetoday = $(this).data('datetoday');
        var reason = $(this).data('reason');
        var pdentist = $(this).data('pdentist');
        var ldental = $(this).data('ldental');
        var pname = $(this).data('pname');
        var pmedical = $(this).data('pmedical');
        var q1 = $(this).data('q1');
        var q2 = $(this).data('q2');
        var q3 = $(this).data('q3');
        var q4 = $(this).data('q4');
        var q5 = $(this).data('q5');
        var q6 = $(this).data('q6');
        var q7 = $(this).data('q7');
        var q8 = $(this).data('q8');
        var q9 = $(this).data('q9');
        var q10 = $(this).data('q10');
        var q11 = $(this).data('q11');
        var q12 = $(this).data('q12');
        var q13 = $(this).data('q13');
        var medicalcon = $(this).data('medicalcon');
        var others = $(this).data('others');
        var imageFilename = $(this).data('image');
        var created = $(this).data('created');


    // Construct the image URL based on the image filename
    var imageUrl = '/static/img/uploads/' + imageFilename;

    // Create the image tag HTML
    var imageHtml = '<div id="image-container"><img id="userImage" src="' + imageUrl + '" alt="User Image" class="user-image" width="800" height=500"></div>';


        // Set the user information in the modal 1
        $('#userModal .modal-body').html(`
            <div class="modal-content">
            <div class="row">
            <div class="col-sm-6 column-left" style="border-right: 2px solid #ccc;">
            <p>PATIENT INFORMATION RECORD</p>
            <p><strong>Full Name:</strong><span> ${lname}, ${fname} ${mname}</span></p>
            <p><strong>Sex:</strong><span> ${sex}</span></p>
            <p><strong>Contact Number:</strong><span> ${contact}</span></p>
            <p><strong>Email Address:</strong><span> ${email}</span></p>
            <p><strong>Birthdate:</strong><span> ${birthdate}</span></p>
            <p><strong>Age:</strong><span> ${age}</span></p>
            <p><strong>Religion:</strong><span> ${religion}</span></p>
            <p><strong>Home Address:</strong><span> ${address}</span></p>
            <p><strong>Nationality:</strong><span> ${nationality}</span></p>
            <br>
            <p>FOR MINORS:</p>
            <p><strong>Parent/Guardian's Name:</strong><span> ${parent}</span></p>
            <p><strong>Contact No.:</strong><span> ${gcontact}</span></p>\
            <p><strong>Occupation:</strong><span> ${goccupation}</span></p>
            <br>
            <p><strong>Date today:</strong><span> ${datetoday}</span></p>
            <p><strong>Reason for Dental Consultation:</strong><span> ${reason}</span></p>
            <br>
            <p>DENTAL HISTORY</span></p>
            <p><strong>Previous Dentist Dr.:</strong><span> ${pdentist}</span></p>
            <p><strong>Last Dental Visit:</strong><span> ${ldental}</span></p>
            <br>
            </div>
            <div class="col-sm-6 column-right">
            <p>MEDICAL HISTORY</p>
            <p><strong>Physician's Name:</strong><span> ${pname}</span></p>
            <p><strong>Present Medical Care:</strong><span> ${pmedical}</span></p>
            <p><strong>1. Are you in good health?:</strong><span> ${q1}</span></p>
            <p><strong>2. Have you ever had serious illness or surgical operation?:</strong><span> ${q2}</span></p>
            <p><strong>If so, what illness or operation?:</strong><span> ${q3}</span></p>
            <p><strong>3. Have you ever been hospitalized?:</strong><span> ${q4}</span></p>
            <p><strong>If so, when and why?:</strong><span> ${q5}</span></p>
            <p><strong>4. Are you taking any prescription/non-prescription medication?: </strong><span> ${q6}</span></p>
            <p><strong>If so, please specify:</strong><span> ${q7}</span></p>
            <p><strong>5. Do you smoke?:</strong><span> ${q8}</span></p>
            <p><strong>6. Do you drink alcoholic beverages?: </strong><span> ${q9}</span></p>
            <p><strong>If so, how often?:</strong><span> ${q13}</span></p>
            <p>FOR WOMEN ONLY:</p>
            <p><strong>7. Are you pregnant?:</strong><span> ${q10}</span></p>
            <p><strong>8. Are you nursing?:</strong><span> ${q11}</span></p>
            <p><strong>9. Are you taking birth control pills or others?: </strong><span> ${q12}</span></p>
            <p><strong>Medical Conditions:</strong><span> ${medicalcon}</span></p>
            <p><strong>other:</strong><span> ${others}</span></p>
            </div>
            </div>
            <hr style="height: 3px;">
                         <p><strong>Date Created:</strong><span> ${created}</span></p>
             ${imageHtml}
             <br>
            </div>
        `);
    });
});







