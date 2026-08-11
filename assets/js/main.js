const balancedTheme = document.createElement('link');
balancedTheme.rel = 'stylesheet';
balancedTheme.href = 'assets/css/balanced.css';
document.head.appendChild(balancedTheme);

const skillContrastTheme = document.createElement('link');
skillContrastTheme.rel = 'stylesheet';
skillContrastTheme.href = 'assets/css/skills-contrast.css';
document.head.appendChild(skillContrastTheme);

const experienceDurationTheme = document.createElement('link');
experienceDurationTheme.rel = 'stylesheet';
experienceDurationTheme.href = 'assets/css/experience-duration.css';
document.head.appendChild(experienceDurationTheme);

const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');
const navLinks = document.querySelectorAll('.main-nav a');
const year = document.querySelector('#year');

if (year) {
  year.textContent = String(new Date().getFullYear());
}

const formatExperienceDuration = (startYear, startMonth, endYear = null, endMonth = null) => {
  const now = new Date();
  const targetYear = endYear ?? now.getFullYear();
  const targetMonth = endMonth ?? now.getMonth();
  const totalMonths = Math.max(0, (targetYear - startYear) * 12 + (targetMonth - startMonth));
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

const experienceDurations = [
  {
    selector: '#experience .experience-card:nth-of-type(2) .experience-aside .date',
    label: "Septembre 2025 – Aujourd'hui",
    duration: formatExperienceDuration(2025, 8),
  },
  {
    selector: '#experience .experience-card:nth-of-type(3) .experience-aside .date',
    label: "Décembre 2024 – Aujourd'hui",
    duration: formatExperienceDuration(2024, 11),
  },
  {
    selector: '#experience .experience-card:nth-of-type(4) .experience-aside .date',
    label: '2020 – Décembre 2024',
    duration: '≈ 4 ans',
  },
];

experienceDurations.forEach(({ selector, label, duration }) => {
  const dateElement = document.querySelector(selector);
  if (!dateElement) return;

  dateElement.innerHTML = `<span class="experience-period">${label}</span><span class="duration-badge">${duration}</span>`;
});

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
