// ── HELPERS ───────────────────────────────────────────────────
const esc   = s => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const tags  = arr => arr.map(t => `<span class="tag">${esc(t)}</span>`).join('');
const paras = s   => s.trim().split(/\n\n+/)
                      .map(p => `<p>${esc(p.trim().replace(/\n/g,' '))}</p>`)
                      .join('');

// ── RENDER HERO TEXT + WORD CLOUD ────────────────────────────
function renderHero() {
  document.querySelector('.hero-name').textContent = HERO.name;
  document.querySelector('.hero-tag').textContent  = HERO.tag;
  document.querySelector('.hero-bio').textContent  = HERO.bio;

  const wrap  = document.querySelector('.hero-photo-wrap');
  const cx    = 270, cy = 270;          // center of 540×540 container
  const words = HERO.keywords;
  // font sizes cycling through values to add visual variety
  const sizes = [.92, .80, .96, .78, .88, .96, .80, .88, .78, .92, .80, .78, .88];
  // radius varies slightly per word so it looks organic, not mechanical
  const radii = [205, 195, 215, 200, 195, 210, 200, 215, 195, 205, 200, 210, 195];

  words.forEach((word, i) => {
    const angle = (i / words.length) * 2 * Math.PI - Math.PI / 2; // start at top
    const r     = radii[i];
    const x     = cx + r * Math.cos(angle);
    const y     = cy + r * Math.sin(angle);
    const span  = document.createElement('span');
    span.className   = 'wc-word';
    span.textContent = word;
    span.style.left     = x + 'px';
    span.style.top      = y + 'px';
    span.style.fontSize = sizes[i] + 'rem';
    wrap.appendChild(span);
  });
}

// ── RENDER PROJECTS ───────────────────────────────────────────
function renderProjects() {
  const grid = document.querySelector('.projects-grid');
  const frag = document.createDocumentFragment();

  PROJECTS.forEach(p => {
    // Card
    const card = document.createElement('article');
    card.className   = 'project-card fu';
    card.dataset.modal = p.id;
    card.innerHTML = `
      <div class="card-img">
        <img src="${esc(p.cardImage)}" alt="${esc(p.title)}" loading="lazy" />
      </div>
      <div class="card-body">
        <span class="card-cat">${esc(p.category)}</span>
        <h3>${esc(p.title)}</h3>
        <p class="card-desc">${esc(p.shortDesc.replace(/\n/g,' '))}</p>
      </div>
      <div class="card-footer">
        <div class="tag-row">${tags(p.tags.slice(0,4))}</div>
        <span class="read-more">Details →</span>
      </div>`;
    frag.appendChild(card);

    // Modal overlay
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.id        = 'overlay-' + p.id;
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');

    const linkHtml = p.links.map(l =>
      `<a href="${esc(l.url)}" target="_blank" rel="noopener" class="modal-link">${esc(l.label)}</a>`
    ).join('');

    overlay.innerHTML = `
      <div class="modal">
        <button class="modal-close" aria-label="Close">&#x2715;</button>
        <div class="modal-hero">
          <img src="${esc(p.modalImage)}" alt="${esc(p.title)}" />
        </div>
        <div class="modal-bd">
          <div class="modal-cat">${esc(p.category)}</div>
          <h2>${esc(p.title)}</h2>
          <div class="modal-text">${paras(p.fullText)}</div>
          <div class="modal-tags">${tags(p.tags)}</div>
          ${linkHtml ? `<div class="modal-links">${linkHtml}</div>` : ''}
        </div>
      </div>`;
    document.body.appendChild(overlay);
  });

  grid.appendChild(frag);
}

// ── RENDER EDUCATION ──────────────────────────────────────────
function renderEducation() {
  const grid = document.querySelector('.edu-grid');
  grid.innerHTML = EDUCATION.map(e => `
    <div class="edu-card fu">
      <div class="edu-year">${esc(e.years)}</div>
      <h3>${esc(e.degree)}</h3>
      <p class="edu-inst">${esc(e.institution)}</p>
      <p class="edu-thesis">${esc(e.thesis)}</p>
      <div class="edu-tags">${tags(e.tags)}</div>
    </div>`).join('');
}

// ── RENDER EXPERIENCE ─────────────────────────────────────────
function renderExperience() {
  const timeline = document.querySelector('.timeline');
  timeline.innerHTML = EXPERIENCE.map(e => `
    <div class="tl-item fu">
      <div class="tl-dot"></div>
      <div class="tl-body">
        <div class="tl-date">${esc(e.dates)}</div>
        <h3>${esc(e.role)}</h3>
        <p class="tl-company">${esc(e.company)}</p>
        <ul>${e.bullets.map(b => `<li>${esc(b)}</li>`).join('')}</ul>
      </div>
    </div>`).join('');
}

// ── NAV SCROLL ────────────────────────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// ── MOBILE BURGER ─────────────────────────────────────────────
const burger = document.querySelector('.burger');
const navUl  = document.querySelector('#nav ul');
burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  navUl.classList.toggle('open');
});
navUl.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => {
    burger.classList.remove('open');
    navUl.classList.remove('open');
  })
);

// ── MODALS ────────────────────────────────────────────────────
document.addEventListener('click', e => {
  const card = e.target.closest('.project-card');
  if (card) {
    const overlay = document.getElementById('overlay-' + card.dataset.modal);
    if (overlay) { overlay.classList.add('open'); document.body.style.overflow = 'hidden'; }
    return;
  }
  if (e.target.classList.contains('overlay') || e.target.classList.contains('modal-close')) {
    e.target.closest('.overlay').classList.remove('open');
    document.body.style.overflow = '';
  }
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.overlay.open').forEach(o => {
      o.classList.remove('open'); document.body.style.overflow = '';
    });
  }
});

// ── FADE-UP ON SCROLL ─────────────────────────────────────────
const io = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('vis'); io.unobserve(entry.target); }
  });
}, { threshold: 0.1 });

function observeFadeUps() {
  document.querySelectorAll('.fu').forEach(el => io.observe(el));
}

// ── FIT NAME TO WORD-CLOUD WIDTH ──────────────────────────────
function fitName() {
  const el     = document.querySelector('.hero-name');
  const target = document.querySelector('.hero-photo-wrap').offsetWidth;
  el.style.width = 'max-content'; // let it expand freely so offsetWidth = text width
  let lo = 10, hi = 400;
  while (hi - lo > 0.5) {
    const mid = (lo + hi) / 2;
    el.style.fontSize = mid + 'px';
    if (el.offsetWidth <= target) lo = mid; else hi = mid;
  }
  el.style.fontSize = lo + 'px';
  el.style.width = '';
}

// ── INIT ──────────────────────────────────────────────────────
renderHero();
fitName();
renderProjects();
renderEducation();
renderExperience();
observeFadeUps();
