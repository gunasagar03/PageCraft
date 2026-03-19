/* ============================================================
   PageCraft — main.js
   ============================================================ */

/* ── Custom Cursor ── */
const cursor    = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');

let mouseX = 0, mouseY = 0;
let ringX  = 0, ringY  = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX - 6 + 'px';
  cursor.style.top  = mouseY - 6 + 'px';
});

function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  cursorRing.style.left = ringX - 18 + 'px';
  cursorRing.style.top  = ringY - 18 + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

/* ── Nav Scroll ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

/* ── Mobile Hamburger ── */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

/* ── 3D Hero Card Tilt ── */
const heroCard3d = document.getElementById('heroCard3d');

document.addEventListener('mousemove', (e) => {
  if (!heroCard3d) return;
  const rect = heroCard3d.getBoundingClientRect();
  const cx   = rect.left + rect.width  / 2;
  const cy   = rect.top  + rect.height / 2;
  const dx   = (e.clientX - cx) / window.innerWidth;
  const dy   = (e.clientY - cy) / window.innerHeight;
  heroCard3d.style.transform = `rotateY(${dx * 18}deg) rotateX(${-dy * 14}deg)`;
});

document.addEventListener('mouseleave', () => {
  if (heroCard3d) heroCard3d.style.transform = 'rotateY(0deg) rotateX(0deg)';
});

/* ── Service Card Mouse-Glow ── */
document.querySelectorAll('[data-mouse]').forEach((card) => {
  card.addEventListener('mousemove', (e) => {
    const r = card.getBoundingClientRect();
    const px = ((e.clientX - r.left) / r.width  * 100) + '%';
    const py = ((e.clientY - r.top)  / r.height * 100) + '%';
    card.style.setProperty('--mx', px);
    card.style.setProperty('--my', py);
  });
});

/* ── Scroll Reveal ── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

/* ── Apple Liquid Button Ripple ── */
document.querySelectorAll('.liquid-btn').forEach((btn) => {
  btn.addEventListener('click', function (e) {
    const ripple = document.createElement('span');
    const r      = this.getBoundingClientRect();
    const size   = Math.max(r.width, r.height) * 2;

    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.2);
      pointer-events: none;
      left: ${e.clientX - r.left - size / 2}px;
      top:  ${e.clientY - r.top  - size / 2}px;
      transform: scale(0);
      animation: rippleAnim 0.6s ease-out forwards;
    `;

    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 700);
  });
});

/* Inject ripple keyframe once */
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `@keyframes rippleAnim { to { transform: scale(1); opacity: 0; } }`;
document.head.appendChild(rippleStyle);

/* ── Contact Form Submit ── */
const submitBtn = document.getElementById('submitBtn');
if (submitBtn) {
  submitBtn.addEventListener('click', () => {
    const originalText = submitBtn.textContent;
    submitBtn.textContent = '✓ Message Sent!';
    submitBtn.style.background = 'linear-gradient(135deg, #28c840, #43e8d8)';
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.textContent = originalText;
      submitBtn.style.background = '';
      submitBtn.disabled = false;
    }, 3000);
  });
}

/* ── Smooth active nav link highlight on scroll ── */
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      navAnchors.forEach((a) => {
        a.style.color = a.getAttribute('href') === '#' + entry.target.id
          ? 'var(--text)'
          : '';
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach((s) => sectionObserver.observe(s));
