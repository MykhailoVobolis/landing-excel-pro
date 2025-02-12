document.addEventListener('DOMContentLoaded', () => {
  const modal = document.querySelector('.modal-overlay');
  const openBtn = document.querySelector('.registration-toggle-btn');
  const closeBtn = document.querySelector('.close-modal');

  openBtn.addEventListener('click', () => {
    if (window.innerWidth < 768) {
      modal.classList.add('active');
    }
  });

  closeBtn.addEventListener('click', () => {
    modal.classList.remove('active');
  });

  // Закриття модального вікна при кліку поза ним
  modal.addEventListener('click', e => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });
});
