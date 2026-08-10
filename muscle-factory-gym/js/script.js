/* ================================
   MUSCLE FACTORY - SITE SETTINGS
   ================================ */
const CONFIG = {
  // Replace with the gym's WhatsApp number in international format.
  // Example for India: 919876543210 (no +, spaces or dashes)
  whatsappNumber: "917387273900",

  whatsappMessage:
    "Hi Muscle Factory Fitness Center 👋%0A%0AI'm interested in joining the gym. Could you please share the membership plans, timings and other details?"
};

/* Preloader */
window.addEventListener("load", () => {
  setTimeout(() => document.getElementById("preloader")?.classList.add("hide"), 500);
});

/* Sticky header */
const header = document.getElementById("siteHeader");
window.addEventListener("scroll", () => {
  header?.classList.toggle("scrolled", window.scrollY > 40);
}, { passive: true });

/* Mobile navigation */
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

menuToggle?.addEventListener("click", () => {
  const open = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", open);
  menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
});

document.querySelectorAll(".main-nav a").forEach(link => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

/* Smooth scroll for internal links */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", event => {
    const id = link.getAttribute("href");
    if (!id || id === "#") return;
    const target = document.querySelector(id);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

/* WhatsApp links */
document.querySelectorAll(".whatsapp-link").forEach(link => {
  link.addEventListener("click", event => {
    event.preventDefault();

    if (CONFIG.whatsappNumber.includes("X")) {
      alert("Please add the gym's WhatsApp number in js/script.js first.");
      return;
    }

    const url = `https://wa.me/${CONFIG.whatsappNumber}?text=${CONFIG.whatsappMessage}`;
    window.open(url, "_blank", "noopener,noreferrer");
  });
});

/* Reveal animations */
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

/* Animated statistics */
const countObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    const element = entry.target;
    const target = Number(element.dataset.count);
    const duration = 1200;
    const start = performance.now();

    function animate(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      element.textContent = Math.floor(target * eased).toLocaleString();

      if (progress < 1) requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
    observer.unobserve(element);
  });
}, { threshold: 0.7 });

document.querySelectorAll("[data-count]").forEach(el => countObserver.observe(el));

/* Current year */
document.getElementById("year").textContent = new Date().getFullYear();
