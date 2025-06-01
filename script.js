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

