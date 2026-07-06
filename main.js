/* =========================================
   DARK MODE
   ========================================= */
// NOTE: the initial theme is applied by an inline script in <head>
// (before first paint) to avoid a flash of the wrong theme.
const html = document.documentElement;
const themeToggle = document.querySelector('.theme-toggle');

themeToggle?.addEventListener('click', () => {
  html.classList.toggle('dark');
  localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light');
});

/* =========================================
   NAV: scroll state + hamburger
   ========================================= */
const navbar = document.getElementById('navbar');
const hamburger = document.querySelector('.nav-hamburger');
const navLinks = document.querySelector('.nav-links');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

hamburger?.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', hamburger.classList.contains('open'));
});

navLinks?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

/* =========================================
   SCROLL REVEAL
   ========================================= */
const revealTargets = [
  '.section-heading',
  '.section-body > p',
  '.edu-block',
  '.timeline-item',
  '.project-card',
  '.cert-card',
  '.skill-group',
  '.about-meta',
  '.contact-intro',
  '.contact-cta',
  '.contact-pills',
];

const toReveal = document.querySelectorAll(revealTargets.join(','));
toReveal.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

toReveal.forEach(el => observer.observe(el));

/* =========================================
   ACTIVE NAV HIGHLIGHT
   ========================================= */
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navAnchors.forEach(a => {
        a.style.color = a.getAttribute('href') === `#${id}` ? 'var(--fg)' : '';
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => sectionObserver.observe(s));
