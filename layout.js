document.addEventListener("DOMContentLoaded", () => {
  // Inject navbar
  fetch("navbar.html")
    .then(res => res.text())
    .then(html => {
      document.getElementById("navbar").innerHTML = html;
      initTheme(); // load theme after navbar
    });

  // Inject footer
  fetch("footer.html")
    .then(res => res.text())
    .then(html => {
      document.getElementById("footer").innerHTML = html;
      initThemeToggle(); // bind theme toggle after footer is loaded
    });

  function initTheme() {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.body.classList.toggle("dark", savedTheme === "dark");
  }

  function initThemeToggle() {
    const toggle = document.getElementById("theme-toggle");
    const logo = document.getElementById("site-logo");

    if (!toggle) return;

    // Set initial position
    const currentTheme = localStorage.getItem("theme") || "light";
    setTheme(currentTheme);

    toggle.addEventListener("click", () => {
      const newTheme = document.body.classList.contains("dark") ? "light" : "dark";
      setTheme(newTheme);
    });

    function setTheme(mode) {
      document.body.classList.toggle("dark", mode === "dark");
      localStorage.setItem("theme", mode);

      if (logo) {
        logo.src = mode === "dark" ? "images/Logo-White.png" : "images/Logo-Black.png";
      }

      // Move toggle circle
      toggle.classList.toggle("toggled", mode === "dark");
    }
  }
});
