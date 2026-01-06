// ============================================
// DOM ELEMENTS
// ============================================
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const scrollTopBtn = document.getElementById("scrollTop");
const nav = document.querySelector("nav");
const sectionTitles = document.querySelectorAll(".section-title");
const writerElement = document.getElementById("writer");

// ============================================
// MOBILE MENU TOGGLE
// ============================================
function initMobileMenu() {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
}

// ============================================
// NAVIGATION ACTIVE LINK MANAGEMENT
// ============================================
let activeLink = navLinks.querySelector(".link-active");

function handleNavLinkClick() {
  navLinks.addEventListener("click", (e) => {
    const link = e.target.closest("a");
    if (!link) return;

    // Remove active class from current link
    activeLink?.classList.remove("link-active");

    // Update active link
    activeLink = link;
    link.classList.add("link-active");

    // Close mobile menu on link click
    navLinks.classList.remove("active");
  });
}

function updateActiveLinkOnScroll() {
  const viewportMid = window.innerHeight / 2;

  for (const title of sectionTitles) {
    const titlePosition = title.getBoundingClientRect().top;

    if (titlePosition < viewportMid) {
      const id = title.getAttribute("id");
      const newActiveLink = navLinks.querySelector(`a[href="#${id}"]`);

      if (newActiveLink && newActiveLink !== activeLink) {
        activeLink?.classList.remove("link-active");
        activeLink = newActiveLink;
        activeLink.classList.add("link-active");
      }
    }
  }
}

// ============================================
// SCROLL TO TOP BUTTON
// ============================================
function initScrollToTop() {
  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

function toggleScrollTopVisibility() {
  if (window.scrollY > 500) {
    scrollTopBtn.classList.add("visible");
  } else {
    scrollTopBtn.classList.remove("visible");
  }
}

// ============================================
// NAVBAR BACKGROUND ON SCROLL
// ============================================

function updateNavbarBackground() {
  if (window.scrollY > 100) {
    nav.style.background = "rgba(20, 20, 20, 0.7)";
  } else {
    nav.style.background = "rgba(10, 10, 10, 0.95)";
  }
}

// ============================================
// SCROLL EVENT HANDLER (OPTIMIZED)
// ============================================
let ticking = false;

function handleScroll() {
  // Update scroll to top button visibility
  toggleScrollTopVisibility();

  // Update navbar background
  updateNavbarBackground();

  // Throttle active link updates using requestAnimationFrame
  if (!ticking) {
    window.requestAnimationFrame(() => {
      updateActiveLinkOnScroll();
      ticking = false;
    });
    ticking = true;
  }
}

// ============================================
// TYPING EFFECT
// ============================================
function initTypingEffect() {
  if (!writerElement) {
    console.error("Element with id 'writer' not found");
    return;
  }

  const contents = [
    "Web Developer",
    "Designer",
    "Problem Solver",
    "Creative Thinker",
    "Full Stack Developer",
    "UI/UX Enthusiast",
    "Tech Enthusiast",
  ];

  const config = {
    typingSpeed: 70,
    deletingSpeed: 30,
    pauseEnd: 2000,
    pauseStart: 400,
  };

  let contentIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentContent = contents[contentIndex];

    // Update text content
    writerElement.textContent = isDeleting
    ? currentContent.substring(0, charIndex - 1)
    : currentContent.substring(0, charIndex + 1);

    // Update character index
    charIndex += isDeleting ? -1 : 1;

    // Determine next action
    if (!isDeleting && charIndex === currentContent.length) {
      // Finished typing, pause then start deleting
      isDeleting = true;
      setTimeout(type, config.pauseEnd);
    } else if (isDeleting && charIndex === 0) {
      // Finished deleting, move to next content
      isDeleting = false;
      contentIndex = (contentIndex + 1) % contents.length;
      setTimeout(type, config.pauseStart);
    } else {
      // Continue typing or deleting
      const speed = isDeleting ? config.deletingSpeed : config.typingSpeed;
      setTimeout(type, speed);
    }
  }

  // Start typing effect
  type();
}

// ============================================
// INITIALIZE ALL FUNCTIONALITY
// ============================================
function init() {
  // Initialize mobile menu
  initMobileMenu();

  // Initialize navigation
  handleNavLinkClick();

  // Initialize scroll to top button
  initScrollToTop();

  // Initialize typing effect
  initTypingEffect();

  // Attach scroll event listener
  window.addEventListener("scroll", handleScroll);
}

// ============================================
// START APPLICATION
// ============================================
init();
