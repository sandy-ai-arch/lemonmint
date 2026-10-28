/* ============================================================
   LEMONMINT - GLOBAL SITE CONTROLLER & INTERACTIONS
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      if (window.sound) window.sound.playClick();
    });
  }

  // 2. Sound Toggle Button in HUD
  const soundBtns = document.querySelectorAll('.sound-toggle-btn');
  soundBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (window.sound) {
        window.sound.toggleMute();
      }
    });
  });

  // 3. Mini-game launcher pill in HUD
  const miniGamePills = document.querySelectorAll('.mini-game-pill');
  miniGamePills.forEach(pill => {
    pill.addEventListener('click', () => {
      if (window.bananaGame) {
        window.bananaGame.open();
      }
    });
  });

  // 4. Highlight current page in nav
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-item a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // 5. Easter egg banana clicks on any element with [data-banana-bonus]
  document.querySelectorAll('[data-banana-bonus]').forEach(el => {
    el.addEventListener('click', (e) => {
      const bonus = parseInt(el.getAttribute('data-banana-bonus') || '25', 10);
      if (window.game) {
        window.game.addBananas(bonus, e.clientX, e.clientY);
      }
    });
  });
});
