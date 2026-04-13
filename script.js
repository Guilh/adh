// Hamburger toggle
const hamburger = document.getElementById('navHamburger');
const mobileMenu = document.getElementById('navMobile');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

// Close mobile menu when a link is tapped
document.querySelectorAll('.nav-mobile-link, .nav-mobile .nav-cta').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

// Smooth active nav highlighting
const sections = document.querySelectorAll('section[id], div[id]');
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = link.getAttribute('href') === '#' + entry.target.id
          ? 'var(--teal)'
          : '';
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => observer.observe(s));
