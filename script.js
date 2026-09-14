const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');

if (menuToggle && siteNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Abrir menú' : 'Cerrar menú');
    siteNav.classList.toggle('is-open', !isOpen);
  });

  siteNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Abrir menú');
      siteNav.classList.remove('is-open');
    });
  });
}

const currentYear = document.querySelector('#current-year');
if (currentYear) currentYear.textContent = new Date().getFullYear();

const carousel = document.querySelector('[data-carousel]');

if (carousel) {
  const slides = [...carousel.querySelectorAll('.gallery-slide')];
  const dotsContainer = carousel.querySelector('.carousel-dots');
  const counter = carousel.querySelector('.carousel-counter');
  let activeIndex = 0;
  let autoplay;

  const showSlide = (index) => {
    activeIndex = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle('is-active', slideIndex === activeIndex);
    });
    [...dotsContainer.children].forEach((dot, dotIndex) => {
      const isActive = dotIndex === activeIndex;
      dot.classList.toggle('is-active', isActive);
      dot.setAttribute('aria-selected', String(isActive));
    });
    counter.textContent = `${String(activeIndex + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
  };

  slides.forEach((slide, slideIndex) => {
    const dot = document.createElement('button');
    dot.className = 'carousel-dot';
    dot.type = 'button';
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-label', `Ver foto ${slideIndex + 1}`);
    dot.addEventListener('click', () => showSlide(slideIndex));
    dotsContainer.append(dot);
  });

  carousel.querySelector('.carousel-prev').addEventListener('click', () => showSlide(activeIndex - 1));
  carousel.querySelector('.carousel-next').addEventListener('click', () => showSlide(activeIndex + 1));
  carousel.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') showSlide(activeIndex - 1);
    if (event.key === 'ArrowRight') showSlide(activeIndex + 1);
  });

  const stopAutoplay = () => clearInterval(autoplay);
  const startAutoplay = () => { stopAutoplay(); autoplay = setInterval(() => showSlide(activeIndex + 1), 5000); };
  carousel.addEventListener('mouseenter', stopAutoplay);
  carousel.addEventListener('mouseleave', startAutoplay);
  carousel.addEventListener('focusin', stopAutoplay);
  carousel.addEventListener('focusout', startAutoplay);
  showSlide(0);
  startAutoplay();
}