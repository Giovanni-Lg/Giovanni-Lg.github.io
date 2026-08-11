const balancedTheme = document.createElement('link');
balancedTheme.rel = 'stylesheet';
balancedTheme.href = 'assets/css/balanced.css';
document.head.appendChild(balancedTheme);

const skillContrastTheme = document.createElement('link');
skillContrastTheme.rel = 'stylesheet';
skillContrastTheme.href = 'assets/css/skills-contrast.css';
document.head.appendChild(skillContrastTheme);

const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');
const navLinks = document.querySelectorAll('.main-nav a');
const year = document.querySelector('#year');

if (year) {
  year.textContent = String(new Date().getFullYear());
}

const formatExperienceDuration = (startYear, startMonth) => {
  const now = new Date();
  const totalMonths = (now.getFullYear() - startYear) * 12 + (now.getMonth() - startMonth);
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  if (years === 0) {
    return `${months} mois`;
  }

  if (months === 0) {
    return `${years} an${years > 1 ? 's' : ''}`;
  }

  return `${years} an${years > 1 ? 's' : ''} et ${months} mois`;
};

const orangeExperienceDate = document.querySelector('#experience .experience-card:first-of-type .experience-aside .date');

if (orangeExperienceDate) {
  orangeExperienceDate.textContent = `Septembre 2025 – Aujourd'hui · ${formatExperienceDuration(2025, 8)}`;
}

if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Fermer le menu' : 'Ouvrir le menu');
    document.body.classList.toggle('menu-open', isOpen);
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Ouvrir le menu');
      document.body.classList.remove('menu-open');
    });
  });
}

const revealItems = document.querySelectorAll('.reveal');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (reduceMotion || !('IntersectionObserver' in window)) {
  revealItems.forEach((item) => item.classList.add('visible'));
} else {
  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        currentObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
  );

  revealItems.forEach((item) => observer.observe(item));
}
