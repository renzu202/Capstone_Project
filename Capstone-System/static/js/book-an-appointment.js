let submitBtn = document.getElementById('submit-btn');
let OPsubmitBtn = document.getElementById('OP-submit-btn');
let myForm = document.getElementById("form-wrapper");
let preloader = document.getElementById('preloader-wrapper');
let bodyElement = document.querySelector('body');
let successDiv = document.getElementById('success');
let OPsuccessDiv = document.getElementById('OP-success');
let lastTab = document.getElementById('tab-6');
let OPlastTab = document.getElementById('OP-tab-3')

// Field ToolTip
 function showToolTip(element) {
        var tooltip = element.querySelector('.tooltip');
        if (!tooltip) {
            tooltip = document.createElement("div");
            tooltip.className = "tooltip";
            tooltip.innerText = "Required Field";
            element.appendChild(tooltip);
        }
        tooltip.style.display = "block";
    }

    function hideToolTip(element) {
        var tooltip = element.querySelector('.tooltip');
        if (tooltip) {
            tooltip.style.display = "none";
        }
    }

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

// Number Restrictions
 var firstNameInput = document.getElementById("FirstName");
        var middleNameInput = document.getElementById("MiddleName");
        var lastNameInput = document.getElementById("LastName");

        // Add an event listener to each input element to prevent numbers
        firstNameInput.addEventListener("input", function () {
            this.value = this.value.replace(/[0-9]/g, '');
        });

        middleNameInput.addEventListener("input", function () {
            this.value = this.value.replace(/[0-9]/g, '');
        });

        lastNameInput.addEventListener("input", function () {
            this.value = this.value.replace(/[0-9]/g, '');
        });

// Add a keydown event listener to the form
myForm.addEventListener("keydown", function(event) {
    // Check if the pressed key is the Enter key (key code 13)
    if (event.keyCode === 13) {
        // Prevent the form from submitting
        event.preventDefault();

        // Simulate pressing the "Tab" key to move to the next focusable element
        const focusableElements = myForm.querySelectorAll("input, button, select, textarea, a[href]");
        const currentFocusedIndex = Array.from(focusableElements).indexOf(document.activeElement);
        const nextFocusedIndex = (currentFocusedIndex + 1) % focusableElements.length;

        focusableElements[nextFocusedIndex].focus();
    }
});

// Tabs
$(".tab").hide();
$("#tab-0").show();

//Tab 0 - Patient Selection
function NP() {
    $("#tab-1").show();
    $("#tab-0").hide();
}

function OP() {
    $("#tab-0").hide();
    $("#tab-OP").show();
}

//Tab OP - Old Patient
function PrevOP() {
    $("#tab-0").show();
    $("#tab-OP").hide();
}
async function fetchPatientInfo() {
    try {
        const email = document.getElementById("emailV").value;
        const response = await fetch(`/api/fetch-patient-info?emailV=${email}`);

        if (response.ok) {
            const data = await response.json();
            document.getElementById("OP-FirstName").value = data.First_Name || "";
            document.getElementById("OP-MiddleName").value = data.Middle_Name || "";
            document.getElementById("OP-LastName").value = data.Last_Name || "";
            document.getElementById("OP-Email").value = data.Email_Address || "";
            document.getElementById("OP-Contact").value = data.Contact_No || "";
        } else if (response.status === 404) {
            alert("Email address not found.");
        } else {
            alert("An error occurred.");
        }
    } catch (error) {
        console.error("An error occurred:", error);
    }
}


async function validateEmailAndPIN() {
    const email = document.getElementById('emailV').value;
    const pin = document.getElementById('CodeV').value;

    // Create a JSON object with email and pin
    const data = {
        email: email,
        pin: pin
    };

    try {
        const response = await fetch('/validate-email-pin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const result = await response.json();
            if (result.valid) {
                // Email and PIN are valid, show "tab-1"
                document.getElementById('tab-OP').style.display = 'none';
                document.getElementById('OP-tab-1').style.display = 'block';
                $("#qc1").hide();
                $("#qc2").hide();
                $("#qc3").show();
                $("#qc4").show();


                // Fetch patient information and populate fields
                await fetchPatientInfo();
            } else {
                // Invalid email and/or PIN, show an error message or take appropriate action
                alert('Invalid email and/or PIN. Please try again.');
                return false;
            }
        } else {
            // Handle server error or network issue
            alert('Server error or network issue. Please try again later.');
        }
    } catch (error) {
        console.error(error);
        // Handle any other errors
    }
}


//Tab OP-tab-1
function OPPrevVal1() {
    $("#OP-tab-1").hide();
    $("#tab-0").show();
    $("#qc1").show();
    $("#qc2").show();
    $("#qc3").hide();
    $("#qc4").hide();

}

function OPNextVal1() {
    var checkbox = document.getElementById("OP-agreement");
    if (!checkbox.checked) {
        document.getElementById("OP-agreeVal").innerHTML = "You must agree by reading the informed consent or clicking the checkbox.";
        return false;
    }
    else {
        document.getElementById("OP-agreeVal").innerHTML = "";
        $("#OP-tab-1").hide();
        $("#OP-tab-2").show();
    }
}

//Tab OP-tab-2
function OPPrevVal2() {
    $("#OP-tab-2").hide();
    $("#OP-tab-1").show();
}

function OPNextVal2() {

var OPReason = document.getElementById("OP-Reason").value;
var OPscheduleError = document.getElementById('OP-schedule-error');
var OPscheduleInput = document.querySelector('.selected-schedule-input');

        if (OPReason === "") {
            document.getElementById("OP-Reasonval").innerHTML = "*This field is required";
            return false;
        }
        else {
            document.getElementById("OP-Reasonval").innerHTML = "";
        }

	 if (!OPscheduleInput.value) {
        	OPscheduleError.textContent = 'Please select an appointment';
        	OPscheduleError.style.display = 'block';
        	return false;
    	} else {
        	OPscheduleError.style.display = 'none';
    	}

    $("#OP-tab-2").hide();
    $("#OP-tab-3").show();
}

//Tab OP-tab-3
function OPPrevVal3() {
    $("#OP-tab-3").hide();
    $("#OP-tab-2").show();
}


//Tab 1 - Informed Consent
function PrevVal() {
    $("#tab-1").hide();
    $("#tab-0").show();
}

function NextVal() {
    var checkbox = document.getElementById("agreement");
    if (!checkbox.checked) {
        document.getElementById("agreeVal").innerHTML = "You must agree by reading the informed consent or clicking the checkbox.";
        return false;
    }
    else {
        document.getElementById("agreeVal").innerHTML = "";
        $("#tab-1").hide();
        $("#tab-2").show();
    }
}


//Tab 2 - Patient Information Record

        // set the current date as the "Date" input's value
    document.addEventListener("DOMContentLoaded", function () {
        const currentDate = new Date().toISOString().substr(0, 10); // Get current date in YYYY-MM-DD format
        document.getElementById("CDate").value = currentDate;
    });

// age event listener
const ageInput = document.getElementById("Age");

ageInput.addEventListener("blur", function() {
        var poGNameInput = document.getElementById("PoGName");
        var contact2Input = document.getElementById("Contact2");
        var occupation2Input = document.getElementById("Occupation2");
    // Get the entered age
    const enteredAge = parseInt(ageInput.value);

    // Check if the entered age is below 18
    if (enteredAge < 18) {
        $('#minor-section').show();
        poGNameInput.value = "";
        contact2Input.value = "";
        occupation2Input.value = "";
    } else {
        $('#minor-section').hide();
        poGNameInput.value = "N/A";
        contact2Input.value = "00000000000";
        occupation2Input.value = "N/A";
    }
});

 var contactInput = document.getElementById("Contact");

    // Add an event listener to intercept keypresses
    contactInput.addEventListener("input", function() {
        // Remove non-numeric characters using a regular expression
        this.value = this.value.replace(/[^0-9]/g, '');
    });

 var contact2Input = document.getElementById("Contact2");

    // Add an event listener to intercept keypresses
    contact2Input.addEventListener("input", function() {
        // Remove non-numeric characters using a regular expression
        this.value = this.value.replace(/[^0-9]/g, '');
    });

    // history checkbox
        const historyCheckbox = document.getElementById("history");
        const historySection = document.getElementById("dentalHistory-section");

        historyCheckbox.addEventListener("change", function() {
        var prevDenInput = document.getElementById("Dentist");
        var lastVisitInput = document.getElementById("LastVisit");
        var CNPDInput = document.getElementById("CNPD");
        var LNPDInput = document.getElementById("LNPD");

            if (historyCheckbox.checked) {
                historySection.style.display = "block";
                prevDenInput.value = "";
                CNPDInput.value = "";
                LNPDInput.value = "";
                lastVisitInput.value = "";
            } else {
                historySection.style.display = "none";
                prevDenInput.value = "N/A";
                CNPDInput.value = "N/A";
                LNPDInput.value = "N/A";
                lastVisitInput.value = "1111-11-11";
            }
        });

// Date validation
function validateDate(input) {
    const dateValue = input.value;
    const parts = dateValue.split('-');

    if (parts.length === 3 && parts[0].length !== 4) {
        document.getElementById("BDval").innerHTML = "Please enter a valid date in mm-dd-yyyy format";
        input.setCustomValidity("Invalid date");
    } else {
        document.getElementById("BDval").innerHTML = "";
        input.setCustomValidity("");
    }
}

    function NextVal1() {
        var FN = document.getElementById("FirstName").value;
        var LN = document.getElementById("LastName").value;
        var Sex = document.getElementById("Sex").value;
        var CN1 = document.getElementById("Contact").value;
        var emailInput = document.getElementById("Email");
        var emailValue = emailInput.value;
        var BD = document.getElementById("Birth").value;
        var Age = document.getElementById("Age").value;
        var HA = document.getElementById("HomeAddress").value;
        var PoGName = document.getElementById("PoGName").value;
        var CN2 = document.getElementById("Contact2").value;
        var Reason = document.getElementById("Reason").value;
        var PD = document.getElementById("Dentist").value;
        var CNPD = document.getElementById("CNPD").value;
        var LV = document.getElementById("LastVisit").value;
        var q7input = document.getElementById("inlineRadio14");
        var q8input = document.getElementById("inlineRadio16");
        var q9input = document.getElementById("inlineRadio18");
        var PASS = document.getElementById("password").value;


        if (FN === "") {
            document.getElementById("FNval").innerHTML = "*This field is required";
            return false;
        }
        else {
            document.getElementById("FNval").innerHTML = "";
        }


        if (LN === "") {
            document.getElementById("LNval").innerHTML = "*This field is required";
            return false;
        }
        else {
            document.getElementById("LNval").innerHTML = "";
        }

         if (Age === "") {
            document.getElementById("Ageval").innerHTML = "*This field is required";
            return false;
        }
        else {
            document.getElementById("Ageval").innerHTML = "";
        }

        if (Sex === "") {
            document.getElementById("Sexval").innerHTML = "*This field is required";
            return false;
        }
        else {
            document.getElementById("Sexval").innerHTML = "";
        }

        if (CN1 === "") {
            document.getElementById("Contact1val").innerHTML = "*This field is required";
            return false;
        }
        else {
            document.getElementById("Contact1val").innerHTML = "";
        }

        if (CN1.charAt(0) !== '0') {
            document.getElementById("Contact1val").innerHTML = "*The number should start with 0";
            return false;
        } else {
            document.getElementById("Contact1val").innerHTML = "";
        }

        if (!/^[0-9]+$/.test(CN1) || CN1.length !== 11) {
            document.getElementById("Contact1val").innerHTML = "*The number should be 11 digits";
            return false;
        } else {
            document.getElementById("Contact1val").innerHTML = "";
        }

        if (emailValue === "") {
            document.getElementById("EAval").innerHTML = "*This field is required";
            return false;
        } else {
            // Regular expression pattern for a basic email format validation
            var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(emailValue)) {
                document.getElementById("EAval").innerHTML = "Invalid email";
                return false;
            } else {
                document.getElementById("EAval").innerHTML = "";
            }
        }

         fetch('/api/get-all-emails')
            .then(response => response.json())
            .then(data => {
                var emailAddresses = data.email_addresses;
                if (emailAddresses.includes(emailValue)) {
                    document.getElementById("EAval").innerHTML = "Email Address already registered";
                    return false;
                } else {
                    document.getElementById("EAval").innerHTML = "";

        if (PASS === "") {
            document.getElementById("PASSval").innerHTML = "*This field is required";
            return false;
        } else if (PASS.length < 8) {
            document.getElementById("PASSval").innerHTML = "*Minimum character required is 8";
            return false;
        } else {
            document.getElementById("PASSval").innerHTML = "";
        }


        if (BD === "") {
            document.getElementById("BDval").innerHTML = "*This field is required";
            return false;
        } else {
            document.getElementById("BDval").innerHTML = "";

        // Validate the format of the birthdate (yyyy-mm-dd)
        var birthDateParts = BD.split('-');
        if (birthDateParts.length !== 3 || birthDateParts[0].length !== 4) {
            document.getElementById("BDval").innerHTML = "Please enter a valid date in mm-dd-yyyy format";
            return false;
        } else {
            // Check if the year part has exactly four digits
            var year = parseInt(birthDateParts[0], 10);
            if (isNaN(year) || year < 1000 || year > 9999) {
                document.getElementById("BDval").innerHTML = "Invalid year format (use yyyy)";
                return false;
            }
        }
    }

        if (HA === "") {
            document.getElementById("HAval").innerHTML = "*This field is required";
            return false;
        }
        else {
            document.getElementById("HAval").innerHTML = "";
        }

        if (PoGName === "") {
            document.getElementById("PoGNameval").innerHTML = "*This field is required";
            return false;
        }
        else {
            document.getElementById("PoGNameval").innerHTML = "";
        }

        if (CN2 === "") {
            document.getElementById("Contact2val").innerHTML = "*This field is required";
            return false;
        }
        else {
            document.getElementById("Contact2val").innerHTML = "";
        }

        if (CN2.charAt(0) !== '0') {
            document.getElementById("Contact2val").innerHTML = "*The number should start with 0";
            return false;
        } else {
            document.getElementById("Contact2val").innerHTML = "";
        }

        if (!/^[0-9]+$/.test(CN2) || CN2.length !== 11) {
            document.getElementById("Contact2val").innerHTML = "*The number should be 11 digits";
            return false;
        } else {
            document.getElementById("Contact2val").innerHTML = "";
        }

        if (Reason === "") {
            document.getElementById("Reasonval").innerHTML = "*This field is required";
            return false;
        }
        else {
            document.getElementById("Reasonval").innerHTML = "";
        }

        if (PD === "") {
            document.getElementById("PDval").innerHTML = "*This field is required";
            return false;
        }
        else {
            document.getElementById("PDval").innerHTML = "";
        }

        if (CNPD === "") {
            document.getElementById("CNPDval").innerHTML = "*This field is required";
            return false;
        }
        else {
            document.getElementById("CNPDval").innerHTML = "";
        }

        if (LV === "") {
            document.getElementById("LVval").innerHTML = "*This field is required";
            return false;
        }
        else {
            document.getElementById("LVval").innerHTML = "";
        }

        if (Sex === "Female") {
            q7input.value = "No";
            q8input.value = "No";
            q9input.value = "No";
            q7input.checked = false;
            q8input.checked = false;
            q9input.checked = false;
            $('#women-section').show()
        }
         else if (Sex === "Male") {
            q7input.value = "N/A";
            q8input.value = "N/A";
            q9input.value = "N/A";
            q7input.checked = true;
            q8input.checked = true;
            q9input.checked = true;
            $('#women-section').hide()
        }

        // Proceed if all field have value
        $("#tab-2").hide();
        $("#tab-3").show();
            }
        });

    }

    function Prev1() {
        $("#tab-2").hide();
        $("#tab-1").show();
        }


//Tab 3 - Medical History

// Add event listeners for each radio button group
document.getElementById("inlineRadio3").addEventListener("change", handleOption2Change);
document.getElementById("inlineRadio4").addEventListener("change", handleOption2Change);

document.getElementById("inlineRadio5").addEventListener("change", handleOption3Change);
document.getElementById("inlineRadio6").addEventListener("change", handleOption3Change);

document.getElementById("inlineRadio7").addEventListener("change", handleOption4Change);
document.getElementById("inlineRadio8").addEventListener("change", handleOption4Change);

document.getElementById("inlineRadio11").addEventListener("change", handleOption5Change);
document.getElementById("inlineRadio12").addEventListener("change", handleOption5Change);

function handleOption2Change() {
    var option2Selected = document.querySelector('input[name="Option2"]:checked');
    var tb1 = document.getElementById("tb1");

    if (option2Selected.value === "Yes") {
        tb1.value = "";
        $('.tb1Section').show();
    } else if (option2Selected.value === "No") {
        $('.tb1Section').hide();
        tb1.value = "N/A";
    }
}

function handleOption3Change() {
    var option3Selected = document.querySelector('input[name="Option3"]:checked');
    var tb2 = document.getElementById("tb2");

    if (option3Selected.value === "Yes") {
        tb2.value = "";
        $('.tb2Section').show();
    } else if (option3Selected.value === "No") {
        $('.tb2Section').hide();
        tb2.value = "N/A";
    }
}

function handleOption4Change() {
    var option4Selected = document.querySelector('input[name="Option4"]:checked');
    var tb3 = document.getElementById("tb3");

    if (option4Selected.value === "Yes") {
        tb3.value = "";
        $('.tb3Section').show();
    } else if (option4Selected.value === "No") {
        $('.tb3Section').hide();
        tb3.value = "N/A";
    }
}

function handleOption5Change() {
    var option5Selected = document.querySelector('input[name="Option6"]:checked');
    var option1_2Radios = document.querySelectorAll('input[name="Option1_2"]');

 if (option5Selected.value === "Yes") {
        // Reset or unselect all radio buttons in the Option1.2 group
        option1_2Radios.forEach(function(radio) {
            $("#tb4Section").show();
            document.getElementById("inlineRadio4_2").checked = false;
        });
    } else if (option5Selected.value === "No") {
        // Select the hidden input "inlineRadio4.2"
        document.getElementById("inlineRadio4_2").checked = true;
        $("#tb4Section").hide();
    }
}

 // medical conditions checkbox
        const medicalCheckbox = document.getElementById("medCheck");


           medicalCheckbox.addEventListener("change", function() {

        if (medicalCheckbox.checked) {
            $('.medicalCon-section').show()
        } else {
            $('.medicalCon-section').hide()
        }
    });


    function NextVal2(){
        var option1Selected = document.querySelector('input[name="Option1"]:checked');
        var option2Selected = document.querySelector('input[name="Option2"]:checked');
        var option3Selected = document.querySelector('input[name="Option3"]:checked');
        var option4Selected = document.querySelector('input[name="Option4"]:checked');
        var option5Selected = document.querySelector('input[name="Option5"]:checked');
        var option6Selected = document.querySelector('input[name="Option6"]:checked');
        var option7Selected = document.querySelector('input[name="Option1_2"]:checked');
        var tb1 = document.getElementById("tb1").value;
        var tb2 = document.getElementById("tb2").value;
        var tb3 = document.getElementById("tb3").value;


        if (!option1Selected) {
        document.getElementById("Option1val").innerHTML = "*Please select an option";
        return false;
        } else {
            document.getElementById("Option1val").innerHTML = "";
        }

        if (!option2Selected) {
            document.getElementById("Option2val").innerHTML = "*Please select an option";
            return false;
        } else {
            document.getElementById("Option2val").innerHTML = "";
        }

         if (tb1 === "") {
            document.getElementById("tb1Val").innerHTML = "*This field is required";
            return false;
        }
        else {
            document.getElementById("tb1Val").innerHTML = "";
        }

        if (!option3Selected) {
            document.getElementById("Option3val").innerHTML = "*Please select an option";
            return false;
        } else {
            document.getElementById("Option3val").innerHTML = "";
        }

         if (tb2 === "") {
            document.getElementById("tb2Val").innerHTML = "*This field is required";
            return false;
        }
        else {
            document.getElementById("tb2Val").innerHTML = "";
        }

        if (!option4Selected) {
            document.getElementById("Option4val").innerHTML = "*Please select an option";
            return false;
        } else {
            document.getElementById("Option4val").innerHTML = "";
        }

         if (tb3 === "") {
            document.getElementById("tb3Val").innerHTML = "*This field is required";
            return false;
        }
        else {
            document.getElementById("tb3Val").innerHTML = "";
        }

        if (!option5Selected) {
            document.getElementById("Option5val").innerHTML = "*Please select an option";
            return false;
        } else {
            document.getElementById("Option5val").innerHTML = "";
        }

        if (!option6Selected) {
            document.getElementById("Option6val").innerHTML = "*Please select an option";
            return false;
        } else {
            document.getElementById("Option6val").innerHTML = "";
        }

         if (!option7Selected) {
            document.getElementById("Option1_2val").innerHTML = "*Please select an option";
            return false;
        } else {
            document.getElementById("Option1_2val").innerHTML = "";
        }




        // Proceed if all field have value
        $("#tab-3").hide();
        $("#tab-4").show();
    }

    function Prev2() {
        $("#tab-3").hide();
        $("#tab-2").show();
        }

//Tab 4 - Upload ID
    function NextVal3(){

         const fileInput = document.getElementById('image');
         const previewImage = document.getElementById('preview');
         const imageError = document.getElementById('image-error');

    // Check if a file was selected
    if (fileInput.files.length === 0) {
        imageError.textContent = 'Please upload your ID';
        imageError.style.display = 'block';
        return false;
    } else {
        imageError.style.display = 'none';
    }

     // Check the file size
    const maxSizeInBytes = 5 * 1024 * 1024; // 5MB in bytes
    const fileSize = fileInput.files[0].size;

    if (fileSize > maxSizeInBytes) {
        imageError.textContent = 'File size exceeds the maximum allowed size (5MB), please upload below 5MB';
        imageError.style.display = 'block';
        return false;
    } else {
        imageError.style.display = 'none';
    }

        // Proceed if all field have value
        $("#tab-4").hide();
        $("#tab-5").show();
    }

    function Prev3() {
        $("#tab-4").hide();
        $("#tab-3").show();
        }

//Tab 5 - Appointment setter
    function NextVal4(){
    const scheduleInput = document.querySelector('.selected-schedule-input');
    const scheduleError = document.getElementById('schedule-error');

    if (!scheduleInput.value) {
        scheduleError.textContent = 'Please select an appointment';
        scheduleError.style.display = 'block';
        return false;
    } else {
        scheduleError.style.display = 'none';
    }

        // Proceed if all field have value
        $("#tab-5").hide();
        $("#tab-6").show();
    }

    function Prev4() {
        $("#tab-5").hide();
        $("#tab-4").show();
        }

//Tab 6

    function Prev5() {
        $("#tab-6").hide();
        $("#tab-5").show();
        }

// Submit old patient
OPsubmitBtn.addEventListener('click', async (event) => {
    event.preventDefault(); // Prevent form submission and page reload

    preloader.classList.add('d-block');

    const timer = ms => new Promise(res => setTimeout(res, ms));

    try {
        await timer(100);

        bodyElement.classList.add('loaded');

        OPlastTab.classList.add('d-none');
        OPsuccessDiv.classList.add('d-block');

        // Collect form data
        const OPformData = new FormData(document.getElementById('OP-form-wrapper'));

        // Send AJAX request
        const response = await fetch('/OP_book_appointment', {
            method: 'POST',
            body: OPformData, // Ensure formData is correctly assigned to the body
        });

        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error(error);
    }
});



//Submit new patient
submitBtn.addEventListener('click', async (event) => {
    event.preventDefault(); // Prevent form submission and page reload

    preloader.classList.add('d-block');

    const timer = ms => new Promise(res => setTimeout(res, ms));

    try {
        await timer(100);

        bodyElement.classList.add('loaded');

        lastTab.classList.add('d-none');
        successDiv.classList.add('d-block');

        // Collect form data
        const formData = new FormData(document.getElementById('form-wrapper'));

        // Handle checkboxes
        const checkboxes = document.querySelectorAll('input[name="checkbox_field"]');
        const selectedCheckboxes = Array.from(checkboxes).filter(function(checkbox) {
            return checkbox.checked;
        }).map(function(checkbox) {
            return checkbox.value;
        });

        const checkboxString = selectedCheckboxes.length > 0 ? selectedCheckboxes.join(', ') : 'N/A';

        // Handle Other field
        const otherField = document.getElementById('Other');
        const otherValue = otherField.value.trim();
        const strothers = otherValue !== '' ? otherValue : 'N/A';

        // Handle Middle Name field
        const MiddleField = document.getElementById('MiddleName');
        const MiddleValue = MiddleField.value.trim();
        const strMiddle = MiddleValue !== '' ? MiddleValue : '';

                // Handle Religion field
        const religionField = document.getElementById('Religion');
        const strRlg = religionField.value.trim();
        const strReligion = strRlg !== '' ? strRlg : 'N/A';

        // Handle Nationality field
        const nationalityField = document.getElementById('Nationality');
        const strNational = nationalityField.value.trim();
        const strNationality = strNational !== '' ? strNational : 'N/A';

        // Handle Occupation2 field
        const occupation2Field = document.getElementById('Occupation2');
        const strOcp1 = occupation2Field.value.trim();
        const strOccupation2 = strOcp1 !== '' ? strOcp1 : 'N/A';

        // Handle License field
        const LNPDField = document.getElementById('LNPD');
        const strLNPD = LNPDField.value.trim();
        const strLNPD2 = strLNPD !== '' ? strLNPD : 'N/A';

        // Handle PName field
        const pNameField = document.getElementById('PName');
        const strPName = pNameField.value.trim();
        const strPatientName = strPName !== '' ? strPName : 'N/A';

        // Handle PMCare field
        const pmCareField = document.getElementById('PMCare');
        const strPMcare = pmCareField.value.trim();
        const strPMCare = strPMcare !== '' ? strPMcare : 'N/A';

        // Set the modified values to the form fields
        formData.set('checkbox_field', checkboxString);
        formData.set('Other', strothers);
        formData.set('MiddleName', strMiddle)
        formData.set('Religion', strReligion);
        formData.set('Nationality', strNationality);
        formData.set('Occupation2', strOccupation2);
        formData.set('LNPD', strLNPD2);
        formData.set('PName', strPatientName);
        formData.set('PMCare', strPMCare);

        // Get the current date and time
        const currentDate = new Date();

        // Format the date in a suitable format (e.g., "YYYY-MM-DD HH:MM:SS")
        const formattedDate = currentDate.toISOString().slice(0, 19).replace("T", " ");

        // Set the value of the hidden input field (submissionDate) to the formatted date
        formData.set('submissionDate', formattedDate);

        // Send AJAX request
        const response = await fetch('/book_appointment', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error:', error);
    }
});

$(document).on('click', '#btn_agree', function() {
            $('#agreement').prop('checked', true)
            $('#OP-agreement').prop('checked', true)
            $('#consentmodal').modal('hide')
        })



function previewImage(event) {
  var input = event.target;
  var preview = document.getElementById('preview');

  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      preview.setAttribute('src', e.target.result);
      preview.style.display = 'block'; // Show the preview image
    };

    reader.readAsDataURL(input.files[0]);
  } else {
    preview.setAttribute('src', '');
    preview.style.display = 'none'; // Hide the preview image
  }
}


document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('.index-btn').forEach(button => {
        button.addEventListener('click', scrollToTop);
    });

    // Function to scroll to the top of the page
    function scrollToTop() {
        // Scroll to the top of the page
        document.documentElement.scrollTop = 0; // For modern browsers
        document.body.scrollTop = 0; // For older browsers
    }
});



// Appointment Calendar
 var appointment_id = 0;

var timeslots = [
    "10:00 am - 11:00 am",
    "11:00 am - 12:00 pm",
    "01:00 pm - 02:00 pm",
    "02:00 pm - 03:00 pm",
    "03:00 pm - 4:00 pm",
];


    var calendar;
    var appointment = {};


   let availableSlotsData = {}; // Variable to store the fetched data

// Async function to fetch available time slots for a given date
async function fetchAvailableTimeSlots(selectedDate) {
    try {
        const response = await $.ajax({
            url: '/customer/appointments/verify-timeslot',
            method: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({ date_slot: selectedDate }),
        });

        // Convert the API response to a set for efficient lookup
        const bookedTimeSlotsSet = new Set(response.map((time) => parseInt(time)));

        // Store the fetched data in the availableSlotsData variable
        availableSlotsData[selectedDate] = bookedTimeSlotsSet;
    } catch (error) {
        console.log('Error fetching booked time slots:', error);
    }
}

// Async function to fetch booked time slots for a given date
async function fetchBookedTimeSlots(selectedDate) {
    try {
        const response = await $.ajax({
            url: '/customer/appointments/verify-timeslot',
            method: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({ date_slot: selectedDate }),
        });

        // Convert the API response to a set for efficient lookup
        const bookedTimeSlotsSet = new Set(response.map((time) => {
            var [hour, minute] = time.split(":");
            var hourInt = parseInt(hour);
            if (hourInt >= 1 && hourInt <= 9) {
                // Convert the 12-hour format to 24-hour format (integer)
                hourInt += 12;
            }
            return hourInt * 60 + parseInt(minute);
        }));

        return bookedTimeSlotsSet;
    } catch (error) {
        console.log('Error fetching booked time slots:', error);
        return new Set(); // Return an empty set in case of an error
    }
}

async function fetchBookedTimeSlotsFromCalendar(selectedDate) {
    try {
        const response = await $.ajax({
            url: '/customer/appointments/verify-timeslot',
            method: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({ date_slot: selectedDate }),
        });

 // Convert the API response to a set for efficient lookup
        const bookedTimeSlotsSet = new Set(response.map((time) => {
            var [hour, minute] = time.split(":");
            var hourInt = parseInt(hour);
            if (hourInt >= 1 && hourInt <= 9) {
                // Convert the 12-hour format to 24-hour format (integer)
                hourInt += 12;
            }
            return hourInt * 60 + parseInt(minute);
        }));

        return bookedTimeSlotsSet;
    } catch (error) {
        console.log('Error fetching booked time slots from calendar:', error);
        return new Set(); // Return an empty set in case of an error
    }
}

// Function to update event titles based on the booked time slots
function updateEventTitle(info) {
    // Get the selected date from the event
    const selectedDate = moment(info.event.start).format('YYYY-MM-DD');

    // Fetch disabled dates from the API
    fetch('/fetch-disabled-dates')
        .then(response => response.json())
        .then(disabledDates => {
            const eventTitleElement = info.el.querySelector('.fc-event-title.fc-sticky');

            // Check if the selected date is disabled
            if (disabledDates.includes(selectedDate)) {
                eventTitleElement.textContent = 'Not Available';
                eventTitleElement.style.color = '#433F3E';
                return; // Exit the function if the date is disabled
            }

            // Fetch booked time slots from the API for the selected date
            fetchBookedTimeSlots(selectedDate).then(bookedTimeSlotsSet => {
                // Fetch booked time slots from the calendar's own API for the selected date
                fetchBookedTimeSlotsFromCalendar(selectedDate).then(bookedTimeSlotsFromCalendar => {
                    // Combine the two sets of booked time slots
                    const combinedBookedTimeSlots = new Set([...bookedTimeSlotsSet, ...bookedTimeSlotsFromCalendar]);

                    // Calculate available slots
                    const availableSlots = 5 - combinedBookedTimeSlots.size;

                    if (availableSlots > 0) {
                        eventTitleElement.textContent = `${availableSlots} Slots Available`;
                        eventTitleElement.style.color = '';
                    } else {
                        eventTitleElement.textContent = 'Fully Booked';
                        eventTitleElement.style.color = 'red';
                    }
                });
            });
        })
        .catch(error => {
            console.log('Error fetching disabled dates:', error);
        });
}



    $(function(){
        var date = new Date()
        var d    = date.getDate(),
            m    = date.getMonth(),
            y    = date.getFullYear()

        var Calendar = FullCalendar.Calendar;

        calendar = new Calendar(document.querySelector('.appointment-calendar'), {
            headerToolbar: {
                left  : false,
                center: 'title',
            },
            hiddenDays: [0],
            height: 500,
            allDaySlot: false,
            selectable: false,
            droppable: false,
            editable: false,
            themeSystem: 'bootstrap',
            weekends: true,

events: function (fetchInfo, successCallback, failureCallback) {
    // Get the start and end date of the current month
    var startDate = moment(fetchInfo.start).startOf('month');
     var endDate = moment(today).add(2, 'months');

    // Calculate today's date
    var today = moment().startOf('day');

    // Ensure that the start date is not before today
    if (startDate.isBefore(today)) {
        startDate = today;
    }

    // Create an array to hold the events for each day in the month
    var events = [];

    // Loop through each day in the month starting from today
    while (startDate.isSameOrBefore(endDate)) {
        // For each day, create an event object and add it to the events array
        events.push({
            start: startDate.format('YYYY-MM-DD'),
            title: '',
            allDay: true,
        });

        // Move to the next day
        startDate.add(1, 'day');
    }

    // Call the successCallback with the events array to render them on the calendar
    successCallback(events);
},

eventClick: function (info) {
    var eventTitle = $(info.el).find('.fc-sticky').text();

    if (eventTitle === 'Not Available') {
        showNotAvailableModal(); // Show the "Not Available" modal
        return; // Prevent further processing
    }

    var slotsAvailable = parseInt($(info.el).find('.fc-sticky').text());
    if (slotsAvailable > 0) {
        // Get the selected date from the calendar
        var selectedDate = moment(info.event.start).format('YYYY-MM-DD');

        // Fetch booked time slots from the API endpoint for the selected date
        $.ajax({
            url: '/customer/appointments/verify-timeslot',
            method: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({ date_slot: selectedDate }),
            success: function (response) {
                // Convert booked time slots from API response to a set for efficient lookup
                var bookedTimeSlotsSet = new Set(response.map(time => {
                    var [hour, minute] = time.split(":");
                    var hourInt = parseInt(hour);
                    if (hourInt >= 1 && hourInt <= 9) {
                        // Convert the 12-hour format to 24-hour format (integer)
                        hourInt += 12;
                    }
                    return hourInt * 60 + parseInt(minute);
                }));

                // Log the booked time slots for the selected date to the console
    console.log('Booked time slots for', selectedDate, bookedTimeSlotsSet);

                // Generate the time slot HTML with only the available time slots
                var timeslot_html = '';
                timeslot_html += '<div class="row">';
                timeslots.forEach(function (timeslot) {
                    // Check if the start time of the timeslot is booked
                    if (!isTimeslotBooked(timeslot, bookedTimeSlotsSet)) {
                        // The timeslot is available, include it in the HTML
                        timeslot_html += '<div class="col-md-3 my-2">';
                        timeslot_html += `<button class="btn btn-sm btn-outline-primary btn-timeslot" type="button" style="width:170px">${timeslot}</button>`;
                        timeslot_html += '</div>';
                    }
                });
                timeslot_html += '</div>';

                // Update the time slot modal content with the new HTML
                $('.timeslot-container').html(timeslot_html);
                $('#timeslot_modal').modal('show');
            },
            error: function (error) {
                console.log('Error fetching booked time slots:', error);
            },

        });
        function isTimeslotBooked(timeslot, bookedTimeSlotsSet) {
    var startTimePart = timeslot.split(" -")[0].trim();
    var [hour, minute, meridian] = startTimePart.split(/:| /);
    var hourInt = parseInt(hour);
    if (meridian === "pm" && hourInt !== 12) {
        hourInt += 12;
    }
    var timeslotInteger = hourInt * 60 + parseInt(minute);
    return bookedTimeSlotsSet.has(timeslotInteger);
}
    } else {
        $('#zero_slot_modal').modal('show');
    }
},
                eventDidMount: updateEventTitle,
        });

    })


$(document).on('click', '.fc-daygrid-day-events', function() {
    var day = $(this).prev().find('.fc-daygrid-day-number').text();
    var month = $('.fc-toolbar-title').text().split(" ")[0];
    var year = $('.fc-toolbar-title').text().split(" ")[1];
    var date_slot = `${month} ${day}, ${year}`;

    $('.date_input').val(moment($(this).parents('td').attr('data-date')).format('Y-MM-D'));

});

$(document).on('click', '.btn-timeslot', function() {
    $(this).removeClass('btn-primary').addClass('btn-success').css('color', '#fff');

    var selectedDate = $('.date_input').val();
    var selectedSchedule = $(this).text(); // Get the selected time slot

    $('#patientDate').text(selectedDate);
    $('#patientTime').text(selectedSchedule);
    $('#OP-patientDate').text(selectedDate);
    $('#OP-patientTime').text(selectedSchedule);
    $('.selected-schedule').text(selectedDate + ', ' + selectedSchedule); // Update the display of selected time slot
    $('.timeslot_input').val(selectedSchedule); // Set the selected time slot in the hidden input field
    $('.btn-timeslot').not(this).prop('disabled', true);
    $('#timeslot_modal').modal('hide');

    var formattedSchedule = selectedDate + ' ' + selectedSchedule.split(" ")[0];
    $('.selected-schedule-input').val(formattedSchedule);
    console.log(formattedSchedule);

        var converted_time = $(this).text().split(' -')[0]
        converted_time = moment(converted_time, 'hh:mm A').format('HH:mm')

        $('.timeslot_input').val(converted_time);

    // Show the "Selected Schedule" modal
    $('#selected_schedule_modal').modal('show');
    });

    $(document).on('hidden.bs.modal', '.modal', function () {
    if ($('.modal:visible').length) {
        $('body').addClass('modal-open');
    }
    });

    // Add a listener for the "Select Another" button in the "Selected Schedule" modal
    $(document).on('click', '#select_another_button', function() {
        $('#selected_schedule_modal').modal('hide');
    });

    // Add a listener for the "Confirm" button in the "Selected Schedule" modal
    $(document).on('click', '#confirm_button', function() {
        $('#selected_schedule_modal').modal('hide');
        $('#calendarModal').modal('hide');
    });

$(document).ready(function() {
    var isCalendarRendered = false;

    $(document).on('click', '.btn-calendar', function() {
        if (!isCalendarRendered) {
            // Render the calendar
            calendar.render();
            $('.btn-calendar').text('Close Calendar');
        } else {
            // Hide and destroy the calendar
            calendar.destroy();
            $('.btn-calendar').text('Open Calendar');
        }

        // Toggle the flag
        isCalendarRendered = !isCalendarRendered;
    });
});

$(document).ready(function() {
    $('.tab input, .tab select, .tab textarea').on('change', function() {

    // New Patient
        const FirstName = $('#FirstName').val();
        const MiddleName = $('#MiddleName').val();
        const LastName = $('#LastName').val();
        const contactNumber = $('#Contact').val();
        const emailAddress = $('#Email').val();
        const appointmentLocation = 'Unit OB6 Estelita Calilung Bldg., San Matias, Guagua Pampanga';

    // Old Patient
        const OPFirstName = $('#OP-FirstName').val();
        const OPMiddleName = $('#OP-MiddleName').val();
        const OPLastName = $('#OP-LastName').val();
        const OPcontactNumber = $('#OP-Contact').val();
        const OPemailAddress = $('#OP-Email').val();
        const OPappointmentLocation = 'Unit OB6 Estelita Calilung Bldg., San Matias, Guagua Pampanga';


    // New Patient
        $('#patientName').text(LastName + ", " + FirstName + " " + MiddleName);
        $('#patientContact').text(contactNumber);
        $('#patientEmail').text(emailAddress);
        $('#appointmentLocation').text(appointmentLocation);

    // Old Patient
        $('#OP-patientName').text(OPLastName + ", " + OPFirstName + " " + OPMiddleName);
        $('#OP-patientContact').text(OPcontactNumber);
        $('#OP-patientEmail').text(OPemailAddress);
        $('#OP-appointmentLocation').text(OPappointmentLocation);
    });
});

function showNotAvailableModal() {
    $('#not_available_modal').modal('show');
}

// Hide/Show Password
const showPassword = document.querySelector("#show-password");
const passwordField = document.querySelector("#password");

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

