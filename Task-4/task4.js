document.getElementById("registrationForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const password = document.getElementById("password");

  const inputs = [name, email, password];
  let valid = true;

  document.querySelectorAll(".error").forEach(err => err.textContent = "");

  if (name.value.trim() === "") {
    setError(name, "Name is required");
    valid = false;
  } else {
    setSuccess(name);
  }

  if (email.value.trim() === "") {
    setError(email, "Email is required");
    valid = false;
  } else if (!email.value.includes("@")) {
    setError(email, "Email must include '@'");
    valid = false;
  } else {
    setSuccess(email);
  }

  if (password.value.trim() === "") {
    setError(password, "Password is required");
    valid = false;
  } else if (password.value.length < 8) {
    setError(password, "Password must be at least 8 characters");
    valid = false;
  } else {
    setSuccess(password);
  }

  if (valid) {
    alert("Registration successful!");
    this.reset();
    inputs.forEach(input => input.classList.remove("valid"));
  }
});

function setError(input, message) {
  const formGroup = input.parentElement;
  const errorDisplay = formGroup.querySelector(".error");
  errorDisplay.textContent = message;
  input.classList.add("invalid");
  input.classList.remove("valid");
}

function setSuccess(input) {
  input.classList.add("valid");
  input.classList.remove("invalid");
}