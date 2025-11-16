window.onload = function() {
  document.getElementById("submitBtn").addEventListener("click", validateForm);
};

function validateForm() {
  let valid = true;

  // Regex patterns
  const namePattern = /^[A-Za-z\-]+$/; // letters + dash only
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phonePattern = /^\d{10}$/; // exactly 10 digits

  // Inputs
  const fName = document.getElementById("first-name");
  const lName = document.getElementById("last-name");
  const email = document.getElementById("email");
  const confirmEmail = document.getElementById("confirm-email");
  const phone = document.getElementById("phone");

  // Helpers
  function setError(labelId, errorId, message) {
    document.getElementById(labelId).className = "errorLabel";
    document.getElementById(errorId).innerHTML = "* " + message;
    valid = false;
  }
  function clearError(labelId, errorId) {
    document.getElementById(labelId).className = "normalLabel";
    document.getElementById(errorId).innerHTML = "";
  }

  // First Name
  if (!namePattern.test(fName.value)) {
    setError("fnameLabel", "fn-error", "Please enter a valid first name.");
  } else {
    clearError("fnameLabel", "fn-error");
  }

  // Last Name
  if (!namePattern.test(lName.value)) {
    setError("lnameLabel", "ln-error", "Please enter a valid last name.");
  } else {
    clearError("lnameLabel", "ln-error");
  }

  // Email
  if (!emailPattern.test(email.value)) {
    setError("emailLabel", "email-error", "Invalid email format.");
  } else {
    clearError("emailLabel", "email-error");
  }

  // Confirm Email
  if (confirmEmail.value !== email.value || confirmEmail.value === "") {
    setError("confirmEmailLabel", "confirm-email-error", "Emails must match.");
  } else {
    clearError("confirmEmailLabel", "confirm-email-error");
  }

  // Phone
  if (!phonePattern.test(phone.value)) {
    setError("phoneLabel", "phone-error", "Phone number must be 10 digits.");
  } else {
    clearError("phoneLabel", "phone-error");
  }

  // If all valid
  if (valid) {
    document.getElementById("form").style.display = "none";
    document.getElementById("confirmation").style.display = "block";

    const person = {
      fname: fName.value,
      lname: lName.value,
      email: email.value,
      phone: phone.value.substring(0,3) + "-" +
             phone.value.substring(3,6) + "-" +
             phone.value.substring(6)
    };

    document.getElementById("info").innerHTML =
      `Name: ${person.fname} ${person.lname}<br>
       Email: ${person.email}<br>
       Phone: ${person.phone}`;

    // Optional: log object for debugging
    console.log(person);
  }
}
