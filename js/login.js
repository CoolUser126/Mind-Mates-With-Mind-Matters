// Mock registered emails (you can replace this with data fetched from a database or API)
const registeredEmails = ['user1@example.com', 'user2@example.com', 'user3@example.com'];

// Get references to the form elements
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const emailError = document.getElementById('email-error');
const passwordError = document.getElementById('password-error');
const submitButton = document.getElementById('submit-btn');

// Function to validate the email
function validateEmail() {
  const emailValue = emailInput.value.trim();

  // Check if email field is empty
  if (emailValue === '') {
    emailError.textContent = 'Email is required.';
    emailError.style.display = 'block';
    emailInput.parentElement.classList.add('error');
    return false;
  }

  // Check if email is in the registered list
  if (!registeredEmails.includes(emailValue)) {
    emailError.textContent = 'Email is not registered.';
    emailError.style.display = 'block';
    emailInput.parentElement.classList.add('error');
    return false;
  }

  emailError.style.display = 'none';
  emailInput.parentElement.classList.remove('error');
  emailInput.parentElement.classList.add('success');
  return true;
}

// Function to validate the password
function validatePassword() {
  const passwordValue = passwordInput.value.trim();

  // Check if password field is empty
  if (passwordValue === '') {
    passwordError.textContent = 'Password is required.';
    passwordError.style.display = 'block';
    passwordInput.parentElement.classList.add('error');
    return false;
  }

  passwordError.style.display = 'none';
  passwordInput.parentElement.classList.remove('error');
  passwordInput.parentElement.classList.add('success');
  return true;
}

// Event listener for form submission
submitButton.addEventListener('click', (event) => {
  event.preventDefault(); // Prevent form submission

  const isEmailValid = validateEmail();
  const isPasswordValid = validatePassword();

  if (isEmailValid && isPasswordValid) {
    alert('Login successful!'); // You can replace this with redirection or further actions
  }
});

// Real-time validation for email input
emailInput.addEventListener('input', () => {
  if (emailInput.parentElement.classList.contains('error')) {
    validateEmail();
  }
});

// Real-time validation for password input
passwordInput.addEventListener('input', () => {
  if (passwordInput.parentElement.classList.contains('error')) {
    validatePassword();
  }
});

// Close button functionality
document.querySelector('.close-icon').addEventListener('click', () => {
  window.history.back(); // Navigates to the previous page
});
