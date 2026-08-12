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

const experienceFixTheme = document.createElement('link');
experienceFixTheme.rel = 'stylesheet';
experienceFixTheme.href = 'assets/css/experience-fix.css';
document.head.appendChild(experienceFixTheme);

const experienceTechTheme = document.createElement('link');
experienceTechTheme.rel = 'stylesheet';
experienceTechTheme.href = 'assets/css/experience-tech.css';
document.head.appendChild(experienceTechTheme);

const educationModernTheme = document.createElement('link');
educationModernTheme.rel = 'stylesheet';
educationModernTheme.href = 'assets/css/education-modern.css';
document.head.appendChild(educationModernTheme);

const educationLayoutFixTheme = document.createElement('link');
educationLayoutFixTheme.rel = 'stylesheet';
educationLayoutFixTheme.href = 'assets/css/education-layout-fix.css';
document.head.appendChild(educationLayoutFixTheme);

const educationBalancedTheme = document.createElement('link');
educationBalancedTheme.rel = 'stylesheet';
educationBalancedTheme.href = 'assets/css/education-balanced.css';
document.head.appendChild(educationBalancedTheme);

const projectsModernTheme = document.createElement('link');
projectsModernTheme.rel = 'stylesheet';
projectsModernTheme.href = 'assets/css/projects-modern.css';
document.head.appendChild(projectsModernTheme);

const globalAccentTheme = document.createElement('link');
globalAccentTheme.rel = 'stylesheet';
globalAccentTheme.href = 'assets/css/global-accent.css';
document.head.appendChild(globalAccentTheme);

const darkModeTheme = document.createElement('link');
darkModeTheme.rel = 'stylesheet';
darkModeTheme.href = 'assets/css/dark-mode.css';
document.head.appendChild(darkModeTheme);

const printTheme = document.createElement('link');
printTheme.rel = 'stylesheet';
printTheme.href = 'assets/css/print.css';
document.head.appendChild(printTheme);

const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');
const navLinks = document.querySelectorAll('.main-nav a');
const navWrap = document.querySelector('.nav-wrap');
const year = document.querySelector('#year');

if (year) {
  year.textContent = String(new Date().getFullYear());
}

const THEME_STORAGE_KEY = 'portfolio-theme';
const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);

const getPreferredTheme = () => {
  if (storedTheme === 'dark' || storedTheme === 'light') return storedTheme;
  return systemTheme.matches ? 'dark' : 'light';
};

const themeToggle = document.createElement('button');
themeToggle.type = 'button';
themeToggle.className = 'theme-toggle';
themeToggle.innerHTML = `
  <svg class="theme-icon-moon" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M20 15.2A8.3 8.3 0 0 1 8.8 4a8.5 8.5 0 1 0 11.2 11.2Z"></path>
  </svg>
  <svg class="theme-icon-sun" viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="4"></circle>
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"></path>
  </svg>
`;

const updateThemeToggle = (theme) => {
  const nextTheme = theme === 'dark' ? 'clair' : 'sombre';
  themeToggle.setAttribute('aria-label', `Activer le mode ${nextTheme}`);
  themeToggle.setAttribute('title', `Mode ${nextTheme}`);
};

const applyTheme = (theme) => {
  document.documentElement.dataset.theme = theme;
  updateThemeToggle(theme);

  const themeColor = document.querySelector('meta[name="theme-color"]');
  if (themeColor) {
    themeColor.setAttribute('content', theme === 'dark' ? '#0F0F11' : '#FFFFFF');
  }
};

applyTheme(getPreferredTheme());

if (navWrap) {
  navWrap.appendChild(themeToggle);
}

themeToggle.addEventListener('click', () => {
  const currentTheme = document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
  const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
  localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
  applyTheme(nextTheme);
});

systemTheme.addEventListener('change', (event) => {
  if (localStorage.getItem(THEME_STORAGE_KEY)) return;
  applyTheme(event.matches ? 'dark' : 'light');
});

const languageLevels = [5, 4, 3];
const languageRows = document.querySelectorAll('#education .clean-list li');

languageRows.forEach((row, index) => {
  const name = row.querySelector('strong')?.textContent?.trim() ?? '';
  const rawText = row.textContent?.trim() ?? '';
  const description = rawText
    .replace(name, '')
    .replace(/^\s*[—-]\s*/, '')
    .trim();
  const level = languageLevels[index] ?? 3;
  const dots = Array.from({ length: 5 }, (_, dotIndex) =>
    `<span class="language-dot${dotIndex < level ? ' is-active' : ''}"></span>`,
  ).join('');

  row.innerHTML = `
    <span class="language-icon" aria-hidden="true"></span>
    <span class="language-copy">
      <strong>${name}</strong>
      <span class="language-description">— ${description}</span>
    </span>
    <span class="language-rating" aria-label="Niveau ${level} sur 5">${dots}</span>
  `;
});

const iconUser = `
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="8" r="3"></circle>
    <path d="M5 20c0-3.3 3.1-6 7-6s7 2.7 7 6"></path>
  </svg>
`;

const iconCode = `
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="m8 9-3 3 3 3"></path>
    <path d="m16 9 3 3-3 3"></path>
    <path d="m14 6-4 12"></path>
  </svg>
`;

const iconTarget = `
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="7"></circle>
    <circle cx="12" cy="12" r="3"></circle>
    <path d="m15 9 4-4"></path>
  </svg>
`;

const iconLayers = `
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="m12 3 8 4-8 4-8-4 8-4Z"></path>
    <path d="m4 12 8 4 8-4"></path>
    <path d="m4 17 8 4 8-4"></path>
  </svg>
`;

const iconServer = `
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <rect x="4" y="4" width="16" height="6" rx="1"></rect>
    <rect x="4" y="14" width="16" height="6" rx="1"></rect>
    <path d="M8 7h.01M8 17h.01"></path>
  </svg>
`;

const iconGlobe = `
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="9"></circle>
    <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"></path>
  </svg>
`;

const iconBuilding = `
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M5 21V5l7-2v18"></path>
    <path d="M12 8h7v13"></path>
    <path d="M8 8h1M8 12h1M8 16h1M15 11h1M15 15h1"></path>
  </svg>
`;

const projectCards = document.querySelectorAll('#projects .project-card');

if (projectCards[0]) {
  projectCards[0].innerHTML = `
    <div class="project-shell">
      <div class="project-header">
        <div>
          <span class="project-category">Full Stack</span>
          <h3>Application d'annuaire d'entreprises</h3>
        </div>
        <span class="project-main-icon">${iconLayers}</span>
      </div>

      <p class="project-summary">Conception et réalisation complète d'une application d'annuaire d'entreprises, depuis l'analyse fonctionnelle jusqu'au déploiement. Le projet m'a permis de prendre en charge l'ensemble de la chaîne technique et de garder une forte proximité avec le besoin client.</p>

      <div class="project-divider"></div>

      <div class="project-details-grid">
        <section class="project-detail">
          <div class="project-detail-title"><span class="project-detail-icon">${iconUser}</span><span>Rôle</span></div>
          <ul class="project-role-list">
            <li>Analyse</li>
            <li>Développement frontend</li>
            <li>Développement backend</li>
            <li>Base de données</li>
            <li>Déploiement</li>
            <li>Maintenance</li>
          </ul>
        </section>

        <section class="project-detail">
          <div class="project-detail-title"><span class="project-detail-icon">${iconCode}</span><span>Technologies</span></div>
          <div class="project-chip-list">
            <span class="project-chip">Angular</span>
            <span class="project-chip">Laravel</span>
            <span class="project-chip">MySQL</span>
          </div>
        </section>

        <section class="project-detail">
          <div class="project-detail-title"><span class="project-detail-icon">${iconTarget}</span><span>Périmètre</span></div>
          <div class="project-chip-list">
            <span class="project-chip">Analyse</span>
            <span class="project-chip">Développement frontend</span>
            <span class="project-chip">Développement backend</span>
            <span class="project-chip">Base de données</span>
            <span class="project-chip">Déploiement</span>
            <span class="project-chip">Maintenance</span>
          </div>
        </section>
      </div>

      <div class="project-divider"></div>

      <div class="project-footer">
        <span class="project-footer-icon">${iconGlobe}</span>
        <span>Projet déployé localement à Madagascar.</span>
      </div>
    </div>
  `;
}

if (projectCards[1]) {
  projectCards[1].innerHTML = `
    <div class="project-shell">
      <div class="project-header">
        <div>
          <span class="project-category">Backend & DevOps</span>
          <h3>Gando — Application de gestion</h3>
        </div>
        <span class="project-main-icon">${iconServer}</span>
      </div>

      <p class="project-summary">Développement backend d'une application de gestion pour un client basé en France, avec prise en charge des API métier, de la persistance, du paiement et de plusieurs aspects de déploiement et d'automatisation.</p>

      <div class="project-divider"></div>

      <div class="project-details-grid">
        <section class="project-detail">
          <div class="project-detail-title"><span class="project-detail-icon">${iconUser}</span><span>Rôle</span></div>
          <p class="project-summary" style="margin:0">Développement backend & DevOps</p>
        </section>

        <section class="project-detail">
          <div class="project-detail-title"><span class="project-detail-icon">${iconCode}</span><span>Technologies</span></div>
          <div class="project-chip-list">
            <span class="project-chip">NestJS</span>
            <span class="project-chip">Node.js</span>
            <span class="project-chip">MongoDB</span>
            <span class="project-chip">Stripe</span>
            <span class="project-chip">Docker</span>
            <span class="project-chip">GitHub Actions</span>
            <span class="project-chip">Cloud</span>
            <span class="project-chip">SSH</span>
          </div>
        </section>

        <section class="project-detail">
          <div class="project-detail-title"><span class="project-detail-icon">${iconTarget}</span><span>Fonctionnalités</span></div>
          <div class="project-chip-list">
            <span class="project-chip">Utilisateurs</span>
            <span class="project-chip">Véhicules</span>
            <span class="project-chip">Locations</span>
            <span class="project-chip">Clients</span>
            <span class="project-chip">Paiements</span>
            <span class="project-chip">Facturation</span>
            <span class="project-chip">API REST</span>
          </div>
        </section>
      </div>

      <div class="project-divider"></div>

      <div class="project-footer">
        <span class="project-footer-icon">${iconBuilding}</span>
        <span>Projet réalisé pour un client basé en France.</span>
      </div>
    </div>
  `;
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
    selector: '#experience .experience-card:nth-of-type(1) .experience-aside .date',
    label: "Septembre 2025 – Aujourd'hui",
    duration: formatExperienceDuration(2025, 8),
  },
  {
    selector: '#experience .experience-card:nth-of-type(2) .experience-aside .date',
    label: "Décembre 2024 – Aujourd'hui",
    duration: formatExperienceDuration(2024, 11),
  },
  {
    selector: '#experience .experience-card:nth-of-type(3) .experience-aside .date',
    label: '2020 – Décembre 2024',
    duration: '4 ans',
  },
];

experienceDurations.forEach(({ selector, label, duration }) => {
  const dateElement = document.querySelector(selector);
  if (!dateElement) return;

  dateElement.innerHTML = `<span class="experience-period">${label}</span><span class="duration-badge">${duration}</span>`;
});

const experienceTechBlocks = document.querySelectorAll('#experience .experience-body .tech');

experienceTechBlocks.forEach((techBlock) => {
  if (techBlock.classList.contains('stack-highlight')) return;

  const label = techBlock.querySelector('strong')?.textContent?.trim() || 'Technologies :';
  const rawText = techBlock.textContent
    .replace(label, '')
    .trim()
    .replace(/^[:\s]+/, '');

  const technologies = rawText
    .split(',')
    .map((item) => item.trim().replace(/\.$/, ''))
    .filter(Boolean);

  techBlock.innerHTML = `
    <strong>${label}</strong>
    ${technologies.map((technology) => `<span>${technology}</span>`).join('')}
  `;
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
