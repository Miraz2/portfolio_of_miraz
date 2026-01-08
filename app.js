import highlightOnScroll from "./highlightOnScroll.js";
import typingEffect from "./typingEffect.js";

// ============================================
// DOM ELEMENTS
// ============================================
const nav = document.querySelector("nav");
const navLinks = nav.querySelector("#navLinks");
const menuToggle = nav.querySelector("#menuToggle");
const sections = document.querySelectorAll("section");
const writerElement = document.getElementById("writer");
const scrollTopBtn = document.getElementById("scrollTop");

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

    link.classList.add("link-active");
    // Update active link
    activeLink = link;

    // Close mobile menu on link click
    navLinks.classList.remove("active");
  });
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
  typingEffect(
    writerElement,
    {
      typingSpeed: 70,
      deletingSpeed: 30,
      pauseEnd: 2000,
      pauseStart: 400,
    },
    [
      "Web Developer",
      "Designer",
      "Problem Solver",
      "Creative Thinker",
      "Full Stack Developer",
      "UI/UX Enthusiast",
      "Tech Enthusiast",
    ]
  );

  // Initialize highlight on scroll
  highlightOnScroll(sections, navLinks);

  // Attach scroll event listener
  window.addEventListener("scroll", handleScroll);
}

// ============================================
// START APPLICATION
// ============================================
init();
