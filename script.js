
/* =========================================
   RONAK SINGHAL - PORTFOLIO INTERACTIONS
========================================= */

document.addEventListener("DOMContentLoaded", () => {
    // ---------- 1. Mobile navigation ----------

    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");
    const navItems = document.querySelectorAll(".nav-link, .nav-contact");

    function openMenu() {
        navLinks.classList.add("open");
        menuToggle.classList.add("open");
        menuToggle.setAttribute("aria-expanded", "true");
        menuToggle.setAttribute("aria-label", "Close navigation menu");
        document.body.classList.add("menu-open");
    }

    function closeMenu() {
        navLinks.classList.remove("open");
        menuToggle.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
        document.body.classList.remove("menu-open");
    }

    menuToggle.addEventListener("click", () => {
        const isOpen = navLinks.classList.contains("open");

        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    // Close the menu when a navigation link is selected.
    navItems.forEach((link) => {
        link.addEventListener("click", () => {
            closeMenu();
        });
    });

    // Close the menu with the Escape key.
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeMenu();
        }
    });

    // Close the mobile menu when returning to desktop width.
    window.addEventListener("resize", () => {
        if (window.innerWidth > 760) {
            closeMenu();
        }
    });


    // ---------- 2. Update the footer year ----------

    const yearElement = document.getElementById("current-year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }


    // ---------- 3. Reveal sections while scrolling ----------

    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -35px 0px"
            }
        );

        revealElements.forEach((element) => {
            revealObserver.observe(element);
        });
    } else {
        // Fallback for browsers without IntersectionObserver.
        revealElements.forEach((element) => {
            element.classList.add("is-visible");
        });
    }


    // ---------- 4. Highlight the active navigation link ----------

    const pageSections = document.querySelectorAll("main section[id]");
    const mainNavLinks = document.querySelectorAll(".nav-link");

    if ("IntersectionObserver" in window) {
        const sectionObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) {
                        return;
                    }

                    const currentId = entry.target.id;

                    mainNavLinks.forEach((link) => {
                        const matches = link.getAttribute("href") === `#${currentId}`;

                        link.classList.toggle("active", matches);
                    });
                });
            },
            {
                rootMargin: "-30% 0px -55% 0px",
                threshold: 0
            }
        );

        pageSections.forEach((section) => {
            sectionObserver.observe(section);
        });
    }


    // ---------- 5. Back-to-top button ----------

    const backToTop = document.getElementById("back-to-top");

    function updateBackToTop() {
        if (window.scrollY > 450) {
            backToTop.classList.add("visible");
        } else {
            backToTop.classList.remove("visible");
        }
    }

    window.addEventListener("scroll", updateBackToTop, {
        passive: true
    });

    updateBackToTop();

    backToTop.addEventListener("click", (event) => {
        event.preventDefault();

        window.scrollTo({
            top: 0,
            behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
                ? "auto"
                : "smooth"
        });
    });
});

