// Smooth scroll for nav links
const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(link.getAttribute('href')).scrollIntoView({behavior: 'smooth'});
    if(window.innerWidth < 720) {
      nav.classList.remove('show');
      burger.classList.remove('active');
      burger.setAttribute('aria-expanded', 'false');
    }
  });
});

// Header background on scroll
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
  if(window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }

  const fromTop = window.scrollY + 120;
  navLinks.forEach(link => {
    const section = document.querySelector(link.hash);
    if(section.offsetTop <= fromTop && (section.offsetTop + section.offsetHeight) > fromTop) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
});

// Reveal sections
const sections = document.querySelectorAll('section');
const observerOptions = { threshold: 0.15 };
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      if(entry.target.id === 'projects') {
        // Animate projects cards with delay
        const cards = entry.target.querySelectorAll('.project-card');
        cards.forEach((card, i) => {
          setTimeout(() => card.classList.add('visible'), i * 150);
        });
      } else if(entry.target.id === 'testimonials') {
        const testimonials = entry.target.querySelectorAll('.testimonial-box');
        testimonials.forEach((t, i) => {
          setTimeout(() => t.classList.add('visible'), i * 180);
        });
      } else {
        entry.target.classList.add('visible');
      }
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);
sections.forEach(section => observer.observe(section));

// Theme toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const savedTheme = localStorage.getItem('theme');

function applyTheme(theme) {
  if(theme === 'light') {
    body.classList.add('light');
    themeToggle.textContent = '☀️';
    themeToggle.setAttribute('aria-pressed', 'true');
  } else {
    body.classList.remove('light');
    themeToggle.textContent = '🌙';
    themeToggle.setAttribute('aria-pressed', 'false');
  }
}

if(savedTheme) {
  applyTheme(savedTheme);
} else {
  applyTheme('dark');
}

themeToggle.addEventListener('click', () => {
  const currentTheme = body.classList.contains('light') ? 'light' : 'dark';
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  applyTheme(newTheme);
  localStorage.setItem('theme', newTheme);
});

// Mobile menu toggle
const burger = document.getElementById('burger');
const nav = document.querySelector('nav');

burger.addEventListener('click', () => {
  burger.classList.toggle('active');
  nav.classList.toggle('show');
  const expanded = burger.classList.contains('active');
  burger.setAttribute('aria-expanded', expanded);
});
burger.addEventListener('keydown', e => {
  if(e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    burger.click();
  }
});

// Message de bienvenue animé
const welcomeBanner = document.getElementById('welcome-banner');
const welcomeText = document.getElementById('welcome-text');
if (welcomeBanner && welcomeText) {
  const messages = [
    "Bienvenue sur mon portfolio !",
    "Découvre mes projets et ma passion pour l'informatique.",
    "Bonne visite ! 🚀"
  ];
  let idx = 0;
  function showBannerMsg() {
    welcomeText.textContent = messages[idx];
    idx = (idx + 1) % messages.length;
  }
  showBannerMsg();
  setInterval(showBannerMsg, 3500);
  // Disparition auto après 10s
  setTimeout(() => {
    welcomeBanner.style.display = "none";
  }, 10000);
}

// Typing effect sur le titre d'accueil
const typingTitle = document.getElementById('typing-title');
if (typingTitle) {
  const fullText = "Bonjour, j'ai 16 ans et je suis en 1ère STI2D";
  let i = 0;
  function type() {
    typingTitle.textContent = fullText.slice(0, i);
    if (i < fullText.length) {
      i++;
      setTimeout(type, 40);
    }
  }
  type();
}

// Bouton remonter en haut
const backToTop = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTop.classList.add('show');
  } else {
    backToTop.classList.remove('show');
  }
});
if (backToTop) {
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ===== Fun Zone : compteur d'années d'expérience (fixe à 1 an) =====
const expYearsEl = document.getElementById('exp-years');
if (expYearsEl) {
  const yearsOfExperience = 1; // Fixé à 1 an
  expYearsEl.textContent = yearsOfExperience; // Valeur finale sans animation complexe
}

// ===== Fun Zone : effet confettis =====
function launchConfetti() {
  for (let i = 0; i < 24; i++) {
    const conf = document.createElement('div');
    conf.className = 'confetti';
    conf.style.left = (window.innerWidth * Math.random()) + 'px';
    conf.style.top = (window.scrollY + 80 + Math.random() * 40) + 'px';
    conf.style.background = `hsl(${Math.random()*360},80%,60%)`;
    conf.style.transform = `rotate(${Math.random()*360}deg)`;
    conf.style.animationDuration = (0.8 + Math.random()*0.7) + 's';
    document.body.appendChild(conf);
    setTimeout(() => conf.remove(), 1400);
  }
}

