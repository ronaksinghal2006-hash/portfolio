
document.addEventListener("DOMContentLoaded", () => {
  // Mobile navigation menu
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("is-open");

      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
      );
    });

    // Close the menu after selecting a navigation link
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
      });
    });

    // Close the mobile menu if the screen becomes wide
    window.addEventListener("resize", () => {
      if (window.innerWidth > 700) {
        navLinks.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
      }
    });
  }

  // Show a placeholder when the profile image is missing
  const profilePhoto = document.getElementById("profilePhoto");
  const photoPlaceholder = document.getElementById("photoPlaceholder");

  function updatePhotoPlaceholder() {
    if (!profilePhoto || !photoPlaceholder) return;

    const hasImage =
      profilePhoto.complete &&
      profilePhoto.naturalWidth > 0;

    profilePhoto.style.display = hasImage ? "block" : "none";
    photoPlaceholder.style.display = hasImage ? "none" : "flex";
  }

  if (profilePhoto && photoPlaceholder) {
    profilePhoto.addEventListener("load", updatePhotoPlaceholder);
    profilePhoto.addEventListener("error", updatePhotoPlaceholder);
    updatePhotoPlaceholder();
  }

  // Automatically update the footer year if you add one later
  const yearElement = document.getElementById("currentYear");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});
