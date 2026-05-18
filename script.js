// ── NAV SCROLL ──────────────────────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// ── MOBILE BURGER ────────────────────────────────────────────
const burger = document.querySelector('.burger');
const navUl  = document.querySelector('#nav ul');
burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  navUl.classList.toggle('open');
});
navUl.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    burger.classList.remove('open');
    navUl.classList.remove('open');
  });
});

// ── MODALS ───────────────────────────────────────────────────
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('click', () => {
    const id = card.dataset.modal;
    const overlay = document.getElementById('overlay-' + id);
    if (overlay) {
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  });
});

document.querySelectorAll('.overlay').forEach(overlay => {
  overlay.addEventListener('click', e => {
    if (e.target === overlay || e.target.classList.contains('modal-close')) {
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.overlay.open').forEach(o => {
      o.classList.remove('open');
      document.body.style.overflow = '';
    });
  }
});

// ── FADE-UP ON SCROLL ─────────────────────────────────────────
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('vis');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.fu').forEach(el => io.observe(el));
