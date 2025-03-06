const dayScoreboard = document.querySelector('[data-days]');
const hourScoreboard = document.querySelector('[data-hours]');
const minuteScoreboard = document.querySelector('[data-minutes]');
const secondScoreboard = document.querySelector('[data-seconds]');

const modalDayScoreboard = document.querySelector('.modal [data-days]');
const modalHourScoreboard = document.querySelector('.modal [data-hours]');
const modalMinuteScoreboard = document.querySelector('.modal [data-minutes]');
const modalSecondScoreboard = document.querySelector('.modal [data-seconds]');

const userSelectedDate = new Date('2025-06-01T19:30:00').getTime();

let intervalTime;

function startTimer() {
  function update() {
    const now = Date.now();
    const ms = userSelectedDate - now;

    if (ms <= 0) {
      clearInterval(intervalTime);
      updateTimer(0, 0, 0, 0);
      return;
    }

    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    updateTimer(days, hours, minutes, seconds);
  }

  // Викликаємо оновлення відразу при старті
  update();

  // Запускаємо інтервал
  intervalTime = setInterval(update, 1000);
}

// Оновлюємо таймер в обох місцях
function updateTimer(days, hours, minutes, seconds) {
  // Оновлення на основній сторінці
  dayScoreboard.textContent = String(days).padStart(2, '0');
  hourScoreboard.textContent = String(hours).padStart(2, '0');
  minuteScoreboard.textContent = String(minutes).padStart(2, '0');
  secondScoreboard.textContent = String(seconds).padStart(2, '0');

  // Оновлення в модалці
  if (
    modalDayScoreboard &&
    modalHourScoreboard &&
    modalMinuteScoreboard &&
    modalSecondScoreboard
  ) {
    modalDayScoreboard.textContent = String(days).padStart(2, '0');
    modalHourScoreboard.textContent = String(hours).padStart(2, '0');
    modalMinuteScoreboard.textContent = String(minutes).padStart(2, '0');
    modalSecondScoreboard.textContent = String(seconds).padStart(2, '0');
  }
}

// Запуск таймера на сторінці
startTimer();
