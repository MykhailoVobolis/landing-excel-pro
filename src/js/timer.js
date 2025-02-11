document.addEventListener('DOMContentLoaded', () => {
  const dayScoreboard = document.querySelector('[data-days]');
  const hourScoreboard = document.querySelector('[data-hours]');
  const minuteScoreboard = document.querySelector('[data-minutes]');
  const secondScoreboard = document.querySelector('[data-seconds]');

  const userSelectedDate = new Date('2025-03-01T00:00:00').getTime();

  function startTimer() {
    const intervalTime = setInterval(() => {
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
    }, 1000);
  }

  function updateTimer(days, hours, minutes, seconds) {
    dayScoreboard.textContent = String(days).padStart(2, '0');
    hourScoreboard.textContent = String(hours).padStart(2, '0');
    minuteScoreboard.textContent = String(minutes).padStart(2, '0');
    secondScoreboard.textContent = String(seconds).padStart(2, '0');
  }

  startTimer();
});
