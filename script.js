const form = document.getElementById('contactForm');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  
  const inputs = form.querySelectorAll('input[type="text"], input[type="email"], textarea');
  let isValid = true;

  inputs.forEach(input => {
    if (!input.checkValidity()) {
      isValid = false;
      input.classList.add('invalid');
      const errorMessage = input.nextElementSibling;
      if (errorMessage) {
        errorMessage.style.display = 'block';
      }
    } else {
      input.classList.remove('invalid');
      const errorMessage = input.nextElementSibling;
      if (errorMessage) {
        errorMessage.style.display = 'none';
      }
    }
  });

  const radioGroup = document.querySelector('.radio-group');
  const radioInputs = form.querySelectorAll('input[name="queryType"]');
  const radioError = document.querySelector('.radio-group + .error-message');
  if (![...radioInputs].some(radio => radio.checked)) {
    isValid = false;
    radioGroup.classList.add('invalid');
    if (radioError) {
      radioError.style.display = 'block';
    }
  } else {
    radioGroup.classList.remove('invalid');
    if (radioError) {
      radioError.style.display = 'none';
    }
  }

  const consent = document.getElementById('consent');
  const consentError = consent.parentElement.querySelector('.error-message');
  if (!consent.checked) {
    isValid = false;
    consent.parentElement.classList.add('invalid');
    if (consentError) {
      consentError.style.display = 'block';
    }
  } else {
    consent.parentElement.classList.remove('invalid');
    if (consentError) {
      consentError.style.display = 'none';
    }
  }

  if (isValid) {
    const successMessage = document.getElementById('successMessage');
    successMessage.style.display = 'block';

    setTimeout(() => {
      successMessage.style.display = 'none';
      form.reset();
    }, 3000);
  }
});

document.querySelectorAll('input[name="queryType"]').forEach((radio) => {
  radio.addEventListener('change', function() {
    document.querySelectorAll('.radio-item').forEach((item) => {
      item.classList.remove('active');
    });
    this.parentElement.classList.add('active');
  });

  radio.addEventListener('blur', function() {
    this.parentElement.classList.remove('active');
  });
});