// ========================
// MAIN JS — ANIMATIONS & INTERACTIONS
// ========================

// Nav scroll effect
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    nav.style.background = 'rgba(5,13,10,0.95)';
  } else {
    nav.style.background = 'rgba(5,13,10,0.7)';
  }
});

// Reveal on scroll
const reveals = document.querySelectorAll('.stat-card, .topic-card, .sol-card, .timeline-item, .timeline-card');
reveals.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 80);

      // Animate stat bars
      const bar = entry.target.querySelector('.stat-fill');
      if (bar) {
        setTimeout(() => bar.classList.add('animated'), i * 80 + 300);
      }

      // Counter animation
      const counter = entry.target.querySelector('.counter');
      if (counter) {
        animateCounter(counter);
      }

      // Decimal counter (1.2°C)
      const val = entry.target.querySelector('.stat-value:not(.counter)');
      if (val && entry.target.querySelector('[data-count]')) {
        const target = parseFloat(entry.target.getAttribute('data-count') || entry.target.querySelector('[data-count]').getAttribute('data-count'));
        if (!isNaN(target)) animateDecimal(val, target);
      }

      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

reveals.forEach(el => observer.observe(el));

function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'));
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      el.textContent = target;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(current);
    }
  }, 16);
}

function animateDecimal(el, target) {
  const duration = 2000;
  const steps = duration / 16;
  let current = 0;
  let step = 0;
  const timer = setInterval(() => {
    step++;
    current = target * (step / steps);
    if (step >= steps) {
      el.textContent = target.toFixed(1);
      clearInterval(timer);
    } else {
      el.textContent = current.toFixed(1);
    }
  }, 16);
}

// Smooth active nav highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.style.color = '#a8ff78';
        }
      });
    }
  });
}, { threshold: 0.5 });

sections.forEach(s => sectionObserver.observe(s));

// Typing effect for hero
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
  heroTitle.style.opacity = '1';
}

// Stagger reveal for hero
window.addEventListener('load', () => {
  const elements = document.querySelectorAll('.hero-badge, .hero-title, .hero-sub, .hero-buttons');
  elements.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `opacity 0.7s ease ${i * 0.15}s, transform 0.7s ease ${i * 0.15}s`;
    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 100 + i * 150);
  });
});

// Add cursor glow effect
document.addEventListener('mousemove', (e) => {
  const cursor = document.getElementById('cursor-glow');
  if (!cursor) {
    const div = document.createElement('div');
    div.id = 'cursor-glow';
    div.style.cssText = `
      position: fixed;
      width: 300px;
      height: 300px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(168,255,120,0.04) 0%, transparent 70%);
      pointer-events: none;
      z-index: 1;
      transform: translate(-50%, -50%);
      transition: left 0.1s, top 0.1s;
    `;
    document.body.appendChild(div);
  }
  const glow = document.getElementById('cursor-glow');
  glow.style.left = e.clientX + 'px';
  glow.style.top = e.clientY + 'px';
});
