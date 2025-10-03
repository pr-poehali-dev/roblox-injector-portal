document.addEventListener('DOMContentLoaded', () => {
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhone = (phone) => {
    const re = /^[\d\s\-\+\(\)]+$/;
    return phone.length >= 10 && re.test(phone);
  };

  const showError = (input, message) => {
    const errorElement = input.nextElementSibling;
    if (errorElement && errorElement.classList.contains('error-message')) {
      errorElement.textContent = message;
    } else {
      const error = document.createElement('div');
      error.className = 'error-message';
      error.style.cssText = 'color: hsl(var(--destructive)); font-size: 0.875rem; margin-top: 0.25rem;';
      error.textContent = message;
      input.parentNode.insertBefore(error, input.nextSibling);
    }
    input.style.borderColor = 'hsl(var(--destructive))';
  };

  const clearError = (input) => {
    const errorElement = input.nextElementSibling;
    if (errorElement && errorElement.classList.contains('error-message')) {
      errorElement.remove();
    }
    input.style.borderColor = '';
  };

  document.querySelectorAll('input[type="email"]').forEach(input => {
    input.addEventListener('blur', () => {
      clearError(input);
      if (input.value && !validateEmail(input.value)) {
        showError(input, 'Введите корректный email');
      }
    });

    input.addEventListener('input', () => {
      if (input.nextElementSibling?.classList.contains('error-message')) {
        clearError(input);
      }
    });
  });

  document.querySelectorAll('input[type="tel"]').forEach(input => {
    input.addEventListener('blur', () => {
      clearError(input);
      if (input.value && !validatePhone(input.value)) {
        showError(input, 'Введите корректный номер телефона');
      }
    });

    input.addEventListener('input', () => {
      if (input.nextElementSibling?.classList.contains('error-message')) {
        clearError(input);
      }
    });
  });

  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', (e) => {
      let hasErrors = false;

      form.querySelectorAll('input[required]').forEach(input => {
        clearError(input);
        if (!input.value.trim()) {
          showError(input, 'Это поле обязательно для заполнения');
          hasErrors = true;
        }
      });

      form.querySelectorAll('input[type="email"]').forEach(input => {
        if (input.value && !validateEmail(input.value)) {
          showError(input, 'Введите корректный email');
          hasErrors = true;
        }
      });

      form.querySelectorAll('input[type="tel"]').forEach(input => {
        if (input.value && !validatePhone(input.value)) {
          showError(input, 'Введите корректный номер телефона');
          hasErrors = true;
        }
      });

      if (hasErrors) {
        e.preventDefault();
      }
    });
  });
});
