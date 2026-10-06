// Liam P. Smith — personal website
// Small enhancements only; the page works fully without JavaScript.

document.addEventListener("DOMContentLoaded", () => {
  // Keep the footer year current
  const year = document.getElementById("year");
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // "Expand all / Collapse all" for the Leadership section
  const toggle = document.querySelector(".toggle-all");
  if (toggle) {
    const list = document.getElementById(toggle.getAttribute("aria-controls"));
    const items = list ? list.querySelectorAll("details") : [];

    const syncLabel = () => {
      const allOpen = Array.from(items).every((d) => d.open);
      toggle.textContent = allOpen ? "Collapse all" : "Expand all";
      toggle.setAttribute("aria-expanded", String(allOpen));
    };

    toggle.addEventListener("click", () => {
      const openAll = !Array.from(items).every((d) => d.open);
      items.forEach((d) => { d.open = openAll; });
      syncLabel();
    });

    // Keep the label accurate when individual items are opened or closed
    items.forEach((d) => d.addEventListener("toggle", syncLabel));
    syncLabel();
  }
});
