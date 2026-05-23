/**
 * THE DIGITAL ATELIER — atelier.js
 */
 
/* ── MOBILE MENU ── */
const hamburgerBtn = document.getElementById('hamburgerBtn');
const mobileMenu   = document.getElementById('mobileMenu');
const menuOverlay  = document.getElementById('menuOverlay');
 
function openMenu() {
  hamburgerBtn.classList.add('open');
  mobileMenu.classList.add('open');
  menuOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeMenu() {
  hamburgerBtn.classList.remove('open');
  mobileMenu.classList.remove('open');
  menuOverlay.classList.remove('active');
  document.body.style.overflow = '';
}
 
hamburgerBtn.addEventListener('click', () => {
  mobileMenu.classList.contains('open') ? closeMenu() : openMenu();
});
menuOverlay.addEventListener('click', closeMenu);
 
// Fechar ao clicar em link do menu
document.querySelectorAll('.mobile-nav a').forEach(link => {
  link.addEventListener('click', closeMenu);
});
 
// Fechar ao redimensionar para desktop
window.addEventListener('resize', () => {
  if (window.innerWidth >= 900) closeMenu();
});
 
/* ── NAVBAR SCROLL SHADOW ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 8);
}, { passive: true });
 
/* ── SCROLL REVEAL ── */
// Adiciona classe .reveal em elementos que queremos animar
const revealTargets = [
  '.std-card',
  '.drop-card',
  '.test-card',
  '.hero-text',
  '.hero-visual',
  '.circle-title',
  '.circle-body',
  '.circle-form',
];
 
revealTargets.forEach(selector => {
  document.querySelectorAll(selector).forEach(el => {
    el.classList.add('reveal');
  });
});
 
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Delay escalonado para grids
      const siblings = entry.target.parentElement?.querySelectorAll('.reveal');
      if (siblings) {
        const idx = Array.from(siblings).indexOf(entry.target);
        entry.target.style.transitionDelay = `${idx * 70}ms`;
      }
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
 
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
 
/* ── SUBSCRIBE FORM ── */
const emailInput   = document.getElementById('emailInput');
const subscribeBtn = document.getElementById('subscribeBtn');
 
subscribeBtn.addEventListener('click', () => {
  const val = emailInput.value.trim();
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
 
  if (!valid) {
    emailInput.style.outline = '2px solid #e94d8a';
    emailInput.focus();
    setTimeout(() => emailInput.style.outline = '', 1000);
    return;
  }
 
  subscribeBtn.textContent = "✓ You're in!";
  subscribeBtn.style.background = '#1e7a4e';
  emailInput.value = '';
  emailInput.disabled = true;
  subscribeBtn.disabled = true;
});
 
emailInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') subscribeBtn.click();
});
 
/* ── DROP CARD FEEDBACK ── */
document.querySelectorAll('.drop-card').forEach(card => {
  card.addEventListener('click', () => {
    const title = card.querySelector('h4')?.textContent;
    showToast(`🛒 "${title}" added to cart`);
  });
});
 
/* ── TOAST ── */
let toastEl, toastTimer;
function showToast(msg) {
  if (!toastEl) {
    toastEl = Object.assign(document.createElement('div'), {
      style: `
        position:fixed; bottom:28px; left:50%;
        transform:translateX(-50%) translateY(14px);
        background:#1e1440; color:#fff;
        padding:11px 24px; border-radius:99px;
        font-family:'Outfit',sans-serif; font-size:.84rem; font-weight:500;
        opacity:0; pointer-events:none; z-index:999;
        white-space:nowrap; box-shadow:0 8px 32px rgba(0,0,0,.22);
        transition:opacity .25s ease, transform .25s ease;
      `
    });
    document.body.appendChild(toastEl);
  }
  toastEl.textContent = msg;
  toastEl.style.opacity = '1';
  toastEl.style.transform = 'translateX(-50%) translateY(0)';
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toastEl.style.opacity = '0';
    toastEl.style.transform = 'translateX(-50%) translateY(14px)';
  }, 3000);
}