// Liam P. Smith — personal website (v2)
// Enhancements only; all content is readable without JavaScript.

document.documentElement.classList.add("js");

document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;

  // ---------- Footer year ----------
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // ---------- Light / dark theme toggle ----------
  const toggle = document.querySelector(".theme-toggle");

  const updateToggleLabel = () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    toggle.setAttribute("aria-label", `Switch to ${next} theme`);
  };

  if (toggle) {
    updateToggleLabel();
    toggle.addEventListener("click", () => {
      const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try {
        localStorage.setItem("theme", next);
      } catch (e) {
        // Storage unavailable; the theme still changes for this visit
      }
      updateToggleLabel();
    });
  }

  // ---------- "Show more" for Leadership ----------
  const showMore = document.querySelector(".show-more");
  if (showMore) {
    const section = document.getElementById(showMore.getAttribute("aria-controls"));
    showMore.addEventListener("click", () => {
      const expanded = section.classList.toggle("is-expanded");
      showMore.setAttribute("aria-expanded", String(expanded));
      showMore.textContent = expanded ? "Show less" : "Show more";
    });
  }

  // ---------- Highlight the current section in the nav ----------
  const navLinks = document.querySelectorAll(".nav a");
  const sections = Array.from(navLinks)
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          navLinks.forEach((link) => {
            const isMatch = link.getAttribute("href") === `#${entry.target.id}`;
            link.classList.toggle("is-active", isMatch);
            if (isMatch) link.setAttribute("aria-current", "true");
            else link.removeAttribute("aria-current");
          });
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
  }
});
