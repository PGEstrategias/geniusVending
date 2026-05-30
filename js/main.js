// ===== HEADER SCROLL EFFECT =====
const header = document.querySelector('.header');
if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  });
}

// ===== MOBILE MENU TOGGLE =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    navToggle.classList.toggle('active');
  });

  document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove('active');
      navToggle.classList.remove('active');
    }
  });
}

// ===== SERVICES SLIDER =====
const sliderTrack = document.querySelector('.services-slider__track');
const sliderPrev = document.getElementById('sliderPrev');
const sliderNext = document.getElementById('sliderNext');
let currentSlide = 0;

function getSlideCount() {
  const slides = document.querySelectorAll('.service-slide');
  return slides.length;
}

function updateSlider() {
  if (sliderTrack) {
    sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
  }
}

if (sliderPrev) {
  sliderPrev.addEventListener('click', () => {
    const total = getSlideCount();
    currentSlide = (currentSlide - 1 + total) % total;
    updateSlider();
  });
}

if (sliderNext) {
  sliderNext.addEventListener('click', () => {
    const total = getSlideCount();
    currentSlide = (currentSlide + 1) % total;
    updateSlider();
  });
}

// Auto-advance slider every 5 seconds
setInterval(() => {
  if (sliderTrack) {
    const total = getSlideCount();
    currentSlide = (currentSlide + 1) % total;
    updateSlider();
  }
}, 5000);

// ===== SCROLL ANIMATIONS =====
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -40px 0px' };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// ===== ACTIVE NAV LINK =====
const currentPath = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav__link').forEach(link => {
  const href = link.getAttribute('href');
  if (href) {
    const linkPage = href.split('/').pop();
    if (linkPage === currentPath || (currentPath === '' && linkPage === 'index.html')) {
      link.classList.add('active');
    }
  }
});

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===== FOOTER FORM (prevent default) =====
const footerForm = document.getElementById('footerForm');
if (footerForm) {
  footerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('¡Gracias por suscribirte! Te contactaremos pronto.');
    footerForm.reset();
  });
}
