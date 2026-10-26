const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');
menuToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.classList.toggle('active', open);
  menuToggle.setAttribute('aria-expanded', String(open));
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuToggle.classList.remove('active');
  menuToggle.setAttribute('aria-expanded', 'false');
}));
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
const progress = document.getElementById('progress');
function updateProgress() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = (max > 0 ? window.scrollY / max * 100 : 0) + '%';
}
window.addEventListener('scroll', updateProgress, { passive: true });
updateProgress();
document.getElementById('year').textContent = new Date().getFullYear();

// Subtle parallax motion on the hero portrait while scrolling (disabled on small screens/reduced motion).
const heroPortrait = document.getElementById('heroPortrait');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let motionTicking = false;
function updatePortraitMotion() {
  if (!heroPortrait || reduceMotion || window.innerWidth < 701) return;
  if (!motionTicking) {
    window.requestAnimationFrame(() => {
      const rect = heroPortrait.getBoundingClientRect();
      const distance = (rect.top + rect.height / 2 - window.innerHeight / 2) / window.innerHeight;
      const bounded = Math.max(-1, Math.min(1, distance));
      heroPortrait.style.setProperty('--scroll-shift', `${bounded * -12}px`);
      heroPortrait.style.transform = `translate3d(0, ${bounded * -12}px, 0) rotate(${bounded * 0.7}deg)`;
      motionTicking = false;
    });
    motionTicking = true;
  }
}
window.addEventListener('scroll', updatePortraitMotion, { passive: true });
window.addEventListener('resize', updatePortraitMotion);
updatePortraitMotion();
