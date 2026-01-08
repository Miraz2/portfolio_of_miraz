// ============================================
// TYPING EFFECT
// ============================================
export default function typingEffect(writerElement, config, contents) {
  if (!writerElement) {
    console.error("Element with id 'writer' not found");
    return;
  }

  let contentIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    writerElement.style.animationName = "none"; // Stop blink animation during typing/deleting
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

      writerElement.style.animationName = "blink"; // Restart blink animation
      setTimeout(type, config.pauseEnd);
    } else if (isDeleting && charIndex === 0) {
      // Finished deleting, move to next content
      isDeleting = false;
      contentIndex = (contentIndex + 1) % contents.length;
      writerElement.style.animationName = "blink"; // Restart blink animation
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
