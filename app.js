const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

let activeLink = navLinks.querySelector(".link-active");
navLinks.addEventListener("click", (e) => {
  const link = e.target.closest("a");
  if (!link) return;

  // Remove active from current
  activeLink?.classList.remove("link-active");
  activeLink = link;

  // Add to clicked
  link.classList.add("link-active");
});

// Scroll to top button
const scrollTopBtn = document.getElementById("scrollTop");
const midPoint = window.innerHeight / 2;

const sectionTitles = document.querySelectorAll(".section-title");

let ticking = false;
const viewportMid = window.innerHeight / 2;

window.addEventListener("scroll", () => {
  if (window.scrollY > 500) {
    scrollTopBtn.classList.add("visible");
  } else {
    scrollTopBtn.classList.remove("visible");
  }

  if (!ticking) {
    window.requestAnimationFrame(() => {
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

      ticking = false;
    });
    ticking = true;
  }
});

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Navbar background on scroll
const nav = document.querySelector("nav");
nav.style.transition = "background 0.3s ease, backdrop-filter 0.3s ease";
window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    nav.style.background = "rgba(20, 20, 20, 0.7)";
    nav.style.backdropFilter = "blur(10px)";
  } else {
    nav.style.background = "rgba(10, 10, 10, 0.95)";
  }
});

// Typing effect
const writerElement = document.getElementById("writer");

if (!writerElement) {
  console.error("Element with id 'writer' not found");
} else {
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
    typingSpeed: 100,
    deletingSpeed: 50,
    pauseEnd: 2000,
    pauseStart: 500,
  };

  let contentIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentContent = contents[contentIndex];

    // Update text
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
      // Finished deleting, move to next word
      isDeleting = false;
      contentIndex = (contentIndex + 1) % contents.length;
      setTimeout(type, config.pauseStart);
    } else {
      // Continue typing or deleting
      const speed = isDeleting ? config.deletingSpeed : config.typingSpeed;
      setTimeout(type, speed);
    }
  }

  type();
}
