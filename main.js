import './style.css'

document.addEventListener('DOMContentLoaded', () => {
  console.log('Gestiona Asesoría App Loaded');

  // Form Submission Handler (Placeholder)
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Gracias por tu interés. Nos pondremos en contacto contigo pronto.');
      contactForm.reset();
    });
  }

  // Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Navbar scroll glassmorphism effect
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Carousel Auto-play
  const slides = document.querySelectorAll('.carousel-slide');
  if (slides.length > 0) {
    let currentSlide = 0;
    setInterval(() => {
      // Remove active class from current
      slides[currentSlide].classList.remove('active');

      // Calculate next slide
      currentSlide = (currentSlide + 1) % slides.length;

      // Add active class to next
      slides[currentSlide].classList.add('active');
    }, 4000); // Change every 4 seconds
  }

  // Video Mute Toggle Logic
  const solutionsVideo = document.getElementById('solutionsVideo');
  const muteToggle = document.getElementById('muteToggle');

  if (solutionsVideo && muteToggle) {
    muteToggle.addEventListener('click', () => {
      solutionsVideo.muted = !solutionsVideo.muted;

      // Update icon based on state
      const iconName = solutionsVideo.muted ? 'volume-x' : 'volume-2';

      // Re-render icon (Lucide needs to re-scan or we manually replace SVG content)
      // Since Lucide replaces <i> with <svg>, we need to clear and re-add element for Lucide to process,
      // OR manually swap SVG. The easiest robust way with Lucide static linking:
      muteToggle.innerHTML = `<i data-lucide="${iconName}"></i>`;
      window.lucide.createIcons();
    });
  }

  // Smooth Scroll for anchor links (just in case native behavior fails or needs enhancement)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 100, // Offset for fixed header
          behavior: 'smooth'
        });
      }
    });
  });
});

// GSAP Hero Animations
if (typeof gsap !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);

  // Initial Entrance Animation
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  tl.from(".hero-badge", {
    y: -20,
    opacity: 0,
    duration: 0.8,
    delay: 0.2
  })
    .to(".line-reveal", {
      y: "0%",
      duration: 1,
      stagger: 0.15
    }, "-=0.4")
    .to(".hero-subtitle", {
      y: 0,
      opacity: 1,
      duration: 0.8
    }, "-=0.6")
    .to(".hero-actions", {
      y: 0,
      opacity: 1,
      duration: 0.8
    }, "-=0.6")
    .from(".main-image-mask", {
      x: 50,
      opacity: 0,
      duration: 1.2
    }, "-=1")
    .from(".floating-card", {
      y: 30,
      opacity: 0,
      stagger: 0.2,
      duration: 0.8
    }, "-=0.8");

  // Parallax Effect on Mouse Move
  const heroSection = document.querySelector('.hero-modern');
  if (heroSection) {
    heroSection.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;

      gsap.to(".hero-img-main", {
        x: x,
        y: y,
        duration: 1,
        ease: "power2.out"
      });

      gsap.to(".floating-card", {
        x: -x * 1.5,
        y: -y * 1.5,
        duration: 1.2,
        ease: "power2.out"
      });
    });
  }
}
