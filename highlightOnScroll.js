export default function highlightOnScroll(sections, navLinks) {
  let sectionPositions = [];
  let activeLink = navLinks.querySelector(".link-active");

  // Cache section positions for performance
  function cacheSectionData() {
    sectionPositions = Array.from(sections).map((title, index) => ({
      offsetTop: title.offsetTop,
      // target: navLinks.querySelector(`a[href="#${title.id}"]`),
      target: navLinks.querySelectorAll("a")[index],
    }));
  }

  // Initial cache
  cacheSectionData();
  // Recalculate on resize (debounced for performance)
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(cacheSectionData, 150);
  });

  function updateActiveLinkOnScroll() {
    const scrollPos = window.scrollY + window.innerHeight / 2;

    for (const section of sectionPositions) {
      if (scrollPos >= section.offsetTop) {
        const newActiveLink = section.target;

        if (newActiveLink && newActiveLink !== activeLink) {
          activeLink?.classList.remove("link-active");
          activeLink = newActiveLink;
          activeLink.classList.add("link-active");
        }
      } else {
        break; // Sections are in order, so we can stop
      }
    }
  }

  let ticking = false;
  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateActiveLinkOnScroll();
        ticking = false;
      });
      ticking = true;
    }
  });

  // Initial call to set correct active link on page load
  updateActiveLinkOnScroll();
}
// export default highlightOnScroll;
