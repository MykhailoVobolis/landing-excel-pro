import axios from 'axios';
import validator from 'validator';
import Inputmask from 'inputmask';

// Функція для ініціалізації форми
function initializeForm(formElement) {
  const localStorageKey = 'register-form-state';
  const savedLocalStorageKey = localStorage.getItem(localStorageKey);
  const register = JSON.parse(savedLocalStorageKey) ?? {};
  const userName = formElement.elements.username;
  const userEmail = formElement.elements.email;
  const userPhone = formElement.elements.phone;
  const userPrivacy = formElement.elements.userPrivacy;

  userName.value = register.name ?? '';
  userEmail.value = register.email ?? '';
  userPhone.value = register.phone ?? '';

  formElement.addEventListener('input', recordLocalStorage);
  formElement.addEventListener('submit', sendingData);

  // Записуємо дані в LocalStorage при кожному введенні
  function recordLocalStorage(event) {
    register.name = formElement.elements.username.value.trim();
    register.email = formElement.elements.email.value.trim();
    register.phone = formElement.elements.phone.value.trim();
    localStorage.setItem(localStorageKey, JSON.stringify(register));
  }

  // Відправка даних форми
  async function sendingData(event) {
    event.preventDefault();

    resetErrors();

    let isValid = true;

    if (!userName.value.trim()) {
      setError(userName, "Це поле є обов'язковим");
      isValid = false;
    }

    if (!userEmail.value.trim()) {
      setError(userEmail, "Це поле є обов'язковим");
      isValid = false;
    } else if (!validator.isEmail(userEmail.value)) {
      setError(userEmail, 'Невірний формат email');
      isValid = false;
    }

    if (!userPhone.value.trim()) {
      setError(userPhone, "Це поле є обов'язковим");
      isValid = false;
    } else if (
      !validator.matches(userPhone.value, /^\+380 \(\d{2}\) \d{3} \d{2} \d{2}$/)
    ) {
      setError(userPhone, 'Невірний формат телефону');
      isValid = false;
    }

    if (!userPrivacy.checked) {
      setError(userPrivacy, 'Потрібно погодитись з політикою конфіденційності');
      isValid = false;
    }

    if (isValid) {
      const formData = {
        name: userName.value.trim(),
        email: userEmail.value.trim(),
        phone: userPhone.value.trim(),
      };

      try {
        // Надсилання POST-запиту на неіснуючий ендпоінт
        const response = await axios.post(
          'https://example.com/register',
          formData
        );

        localStorage.removeItem(localStorageKey);
        formElement.reset();

        alert('Дані форми успішно надіслані');
      } catch (error) {
        alert('Сталася помилка при відправленні даних форми');

        // Тільки для демонстрації !!!
        localStorage.removeItem(localStorageKey);
        formElement.reset();
      }
    }
  }

  // Оновлення помилок
  function setError(inputElement, message) {
    const errorMessageElement = inputElement.nextElementSibling;
    errorMessageElement.textContent = message;
    errorMessageElement.classList.add('show');
  }

  // Скидання помилок
  function resetErrors() {
    const inputs = formElement.querySelectorAll('.form-input');
    inputs.forEach(input => {
      const errorMessageElement = input.nextElementSibling;
      errorMessageElement.classList.remove('show');
    });
  }

  // Маска для телефону
  const phoneInput = formElement.querySelector('input[name="phone"]');
  const im = new Inputmask('+380 (99) 999 99 99');
  im.mask(phoneInput);
}

// Ініціалізація форми для `hero` та модалки
document.addEventListener('DOMContentLoaded', () => {
  const heroForm = document.querySelector('.hero form');
  const modalForm = document.querySelector('.modal form');

  if (heroForm) {
    initializeForm(heroForm);
  }

  if (modalForm) {
    initializeForm(modalForm);
  }
});
