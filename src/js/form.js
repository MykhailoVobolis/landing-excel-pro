import axios from 'axios';

const registerForm = document.querySelector('form');
const localStorageKey = 'feedback-form-state';
const savedLocalStorageKey = localStorage.getItem(localStorageKey);
const register = JSON.parse(savedLocalStorageKey) ?? {};
const userName = registerForm.elements.username;
const userEmail = registerForm.elements.email;
const userPhone = registerForm.elements.phone;
const userPrivacy = registerForm.elements.userPrivacy;

userName.value = register.name ?? '';
userEmail.value = register.email ?? '';
userPhone.value = register.phone ?? '';

registerForm.addEventListener('input', recordLocalStorage);

function recordLocalStorage(event) {
  register.name = registerForm.elements.username.value.trim();
  register.email = registerForm.elements.email.value.trim();
  register.phone = registerForm.elements.phone.value.trim();
  localStorage.setItem(localStorageKey, JSON.stringify(register));
}

registerForm.addEventListener('submit', sendingData);

async function sendingData(event) {
  event.preventDefault();

  if (!userPrivacy.checked) {
    return alert(
      'Будь ласка, погодьтеся з політикою конфіденційності та умовами користування послугами'
    );
  }

  if (!userName.value || !userEmail.value || !userPhone.value) {
    return alert('Будь ласка, заповніть всі поля форми');
  }

  const formData = {
    name: userName.value.trim(),
    email: userEmail.value.trim(),
    phone: userPhone.value.trim(),
  };

  try {
    // Надсилання POST-запиту на неіснуючий ендпоінт
    const response = await axios.post('https://example.com/register', formData);

    localStorage.removeItem(localStorageKey);
    registerForm.reset();

    alert('Дані форми успішно надіслані');
  } catch (error) {
    alert('Сталася помилка при відправленні даних форми');

    // Тільки для демонстрації !!!
    localStorage.removeItem(localStorageKey);
    registerForm.reset();
  }
}
