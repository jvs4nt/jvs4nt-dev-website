// ============================================
// Portfolio - Interactive JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all modules
  initCursor();
  initNavbar();
  initTypewriter();
  initScrollAnimations();
  initScrollToTop();
  initMobileMenu();
  initContactForm();
  initSmoothScroll();
});

// ============================================
// Custom Cursor
// ============================================
function initCursor() {
  const cursor = document.querySelector('.cursor');
  const follower = document.querySelector('.cursor-follower');

  // Only enable on non-touch devices
  if (window.matchMedia('(hover: none), (pointer: coarse)').matches) {
    return;
  }

  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Cursor instantâneo (sem delay)
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });

  // Follower com delay suave
  function animateFollower() {
    const dx = mouseX - followerX;
    const dy = mouseY - followerY;

    followerX += dx * 0.15;
    followerY += dy * 0.15;

    follower.style.left = followerX + 'px';
    follower.style.top = followerY + 'px';

    requestAnimationFrame(animateFollower);
  }

  animateFollower();

  // Hover effects on interactive elements
  const interactiveElements = document.querySelectorAll('a, button, .skill-item, .project-card, input, textarea');

  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('hover');
      follower.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('hover');
      follower.classList.remove('hover');
    });
  });
}

// ============================================
// Navbar Scroll Effect
// ============================================
function initNavbar() {
  const navbar = document.querySelector('.navbar');

  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  });

  // Update active nav link on scroll
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (pageYOffset >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

// ============================================
// Typewriter Effect
// ============================================
function initTypewriter() {
  const typewriter = document.querySelector('.typewriter');
  const phrases = [
    'Full Stack Developer',
    'UI/UX Enthusiast',
    'Open Source Contributor',
    'Problem Solver',
    'Tech Innovator'
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      typewriter.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typewriter.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      isDeleting = true;
      typingSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 500; // Pause before typing next
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

// ============================================
// Scroll Animations (Intersection Observer)
// ============================================
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  // Observe elements
  const animateElements = document.querySelectorAll(
    '.about-card, .skill-item, .project-card, .section-header, .contact-info, .contact-form'
  );

  animateElements.forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
  });

  // Stagger animation for grid items
  const grids = {
    'about-cards': '.about-card',
    'skills-grid': '.skill-item',
    'projects-grid': '.project-card'
  };

  Object.entries(grids).forEach(([gridClass, itemSelector]) => {
    const grid = document.querySelector(`.${gridClass}`);
    if (!grid) return;

    const items = grid.querySelectorAll(itemSelector);
    items.forEach((item, index) => {
      item.style.transitionDelay = `${index * 0.1}s`;
    });
  });
}

// ============================================
// Scroll to Top Button
// ============================================
function initScrollToTop() {
  const scrollTopBtn = document.querySelector('.scroll-top');

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ============================================
// Mobile Menu Toggle
// ============================================
function initMobileMenu() {
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // Close menu when clicking a link
  const links = navLinks.querySelectorAll('a');
  links.forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
      navToggle.classList.remove('active');
      navLinks.classList.remove('active');
    }
  });
}

// ============================================
// Contact Form (Formspree)
// ============================================
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const statusEl = document.getElementById('formStatus');
  const formEndpoint = form.dataset.formEndpoint;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!formEndpoint || formEndpoint.includes('SEU_FORM_ID')) {
      if (statusEl) {
        statusEl.textContent = 'Configure o endpoint do Formspree para ativar o envio.';
        statusEl.classList.remove('success');
        statusEl.classList.add('error');
      }
      return;
    }

    // Get form values
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    // Visual feedback - button animation
    const submitBtn = form.querySelector('.btn-submit');
    const originalContent = submitBtn.innerHTML;

    submitBtn.innerHTML = '<span>Enviando...</span><i class="fas fa-spinner fa-spin"></i>';
    submitBtn.disabled = true;
    if (statusEl) {
      statusEl.textContent = '';
      statusEl.classList.remove('success', 'error');
    }

    try {
      const response = await fetch(formEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Falha ao enviar formulário');
      }

      submitBtn.innerHTML = '<span>Mensagem Enviada!</span><i class="fas fa-check"></i>';
      submitBtn.style.background = 'linear-gradient(135deg, #27c93f 0%, #20b53a 100%)';
      if (statusEl) {
        statusEl.textContent = 'Mensagem enviada com sucesso. Obrigado pelo contato!';
        statusEl.classList.remove('error');
        statusEl.classList.add('success');
      }
      form.reset();
    } catch (error) {
      if (statusEl) {
        statusEl.textContent = 'Nao foi possivel enviar agora. Tente novamente em instantes.';
        statusEl.classList.remove('success');
        statusEl.classList.add('error');
      }
      console.error('Erro no envio do formulario:', error);
    } finally {
      setTimeout(() => {
        submitBtn.innerHTML = originalContent;
        submitBtn.style.background = '';
        submitBtn.disabled = false;
      }, 2000);
    }
  });

  // Input focus effects
  const inputs = form.querySelectorAll('input, textarea');
  inputs.forEach(input => {
    input.addEventListener('focus', () => {
      input.parentElement.classList.add('focused');
    });
    input.addEventListener('blur', () => {
      input.parentElement.classList.remove('focused');
    });
  });
}

// ============================================
// Smooth Scroll for Anchor Links
// ============================================
function initSmoothScroll() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');

      if (href === '#') return;

      e.preventDefault();

      const target = document.querySelector(href);
      if (target) {
        const offsetTop = target.offsetTop - 80; // Account for fixed navbar

        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ============================================
// Skill Cards Tilt Effect (3D)
// ============================================
function initTiltEffect() {
  const cards = document.querySelectorAll('.about-card, .project-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
  });
}

// Enable tilt effect on larger screens
if (window.matchMedia('(min-width: 768px)').matches) {
  initTiltEffect();
}

// ============================================
// Dynamic GitHub Stats (Optional enhancement)
// ============================================
async function fetchGitHubStats(username) {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    const data = await response.json();

    return {
      publicRepos: data.public_repos,
      followers: data.followers,
      following: data.following
    };
  } catch (error) {
    console.error('Error fetching GitHub stats:', error);
    return null;
  }
}

// ============================================
// Particle Effect on Hero (Optional)
// ============================================
function createParticles() {
  const heroImage = document.querySelector('.hero-image-container');
  if (!heroImage) return;

  for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.cssText = `
      position: absolute;
      width: ${Math.random() * 4 + 2}px;
      height: ${Math.random() * 4 + 2}px;
      background: rgba(139, 92, 246, ${Math.random() * 0.5 + 0.3});
      border-radius: 50%;
      top: ${Math.random() * 100}%;
      left: ${Math.random() * 100}%;
      animation: particleFloat ${Math.random() * 3 + 2}s ease-in-out infinite;
      animation-delay: ${Math.random() * 2}s;
      pointer-events: none;
    `;

    heroImage.appendChild(particle);
  }
}

// Add particle animation keyframes to stylesheet
const style = document.createElement('style');
style.textContent = `
  @keyframes particleFloat {
    0%, 100% { transform: translate(0, 0); opacity: 0.5; }
    50% { transform: translate(${Math.random() * 20 - 10}px, ${Math.random() * 20 - 10}px); opacity: 1; }
  }
`;
document.head.appendChild(style);

// Initialize particles
createParticles();

// ============================================
// Performance: Lazy load images (if added later)
// ============================================
function initLazyLoad() {
  const images = document.querySelectorAll('img[data-src]');

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));
}

// ============================================
// Utility: Debounce function
// ============================================
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// ============================================
// Utility: Throttle function
// ============================================
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// ============================================
// Console Easter Egg
// ============================================
console.log(`
  ╔═══════════════════════════════════════════╗
  ║   👋 Olá, desenvolvedor!                  ║
  ║   Gostou do código?                       ║
  ║   Vamos construir algo incrível juntos!   ║
  ║                                           ║
  ║   🚀 GitHub: github.com/jvs4nt            ║
  ║   💼 LinkedIn: linkedin.com/in/jvs4nt     ║
  ╚═══════════════════════════════════════════╝
`);
