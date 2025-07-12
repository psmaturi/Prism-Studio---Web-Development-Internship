const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const submitBtn = document.getElementById('submitBtn');
const loadingMsg = document.getElementById('loadingMsg');

const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const messageError = document.getElementById('messageError');

function validateName() {
  const name = nameInput.value.trim();
  if (name.length < 3) {
    nameError.textContent = '⚠️ At least 3 characters required.';
    return false;
  }
  nameError.textContent = '';
  return true;
}

function validateEmail() {
  const email = emailInput.value.trim();
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email)) {
    emailError.textContent = '⚠️ Enter a valid email.';
    return false;
  }
  emailError.textContent = '';
  return true;
}

function validateMessage() {
  const message = messageInput.value.trim();
  if (message.length === 0 || message.length > 500) {
    messageError.textContent = '⚠️ Message is required (max 500 characters).';
    return false;
  }
  messageError.textContent = '';
  return true;
}

function checkFormValidity() {
  const isValid = validateName() && validateEmail() && validateMessage();
  submitBtn.disabled = !isValid;
}

[nameInput, emailInput, messageInput].forEach(input =>
  input.addEventListener('input', checkFormValidity)
);

document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();

  if (validateName() && validateEmail() && validateMessage()) {
    loadingMsg.style.display = 'block';
    loadingMsg.textContent = '⏳ Sending...';

    submitBtn.disabled = true;

    setTimeout(() => {
      loadingMsg.style.display = 'none';
      alert('✅ Form submitted successfully!');
      e.target.reset();
      checkFormValidity();
    }, 1500);
  }
});
