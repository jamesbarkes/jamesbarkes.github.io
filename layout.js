document.addEventListener("DOMContentLoaded", () => {
  // Load navbar
  fetch("navbar.html")
    .then(res => res.text())
    .then(html => {
      document.getElementById("navbar").innerHTML = html;
    })
    .then(() => {
      applySavedTheme(); // Apply theme after navbar
      updateLogo();      // Update logo after navbar loaded
    });

  // Load footer
  fetch("footer.html")
    .then(res => res.text())
    .then(html => {
      document.getElementById("footer").innerHTML = html;
    })
    .then(() => {
      initThemeToggle(); // Hook up toggle after footer
    });

  function applySavedTheme() {
    const saved = localStorage.getItem("theme") || "light";
    document.documentElement.classList.toggle("dark", saved === "dark");
  }

  function updateLogo() {
    const logo = document.getElementById("site-logo");
    const isDark = document.documentElement.classList.contains("dark");


    if (logo) {
      logo.src = isDark ? "images/Logo-White.png" : "images/Logo-Black.png";
    }
  }

  function initThemeToggle() {
    const toggle = document.getElementById("theme-toggle");

    if (!toggle) return;

    const isDark = localStorage.getItem("theme") === "dark";
    toggle.classList.toggle("toggled", isDark);

    toggle.addEventListener("click", () => {
      const willBeDark = !document.documentElement.classList.contains("dark");
      
      document.documentElement.classList.toggle("dark", willBeDark);
      localStorage.setItem("theme", willBeDark ? "dark" : "light");
      toggle.classList.toggle("toggled", willBeDark);

      updateLogo(); // Update logo each time theme changes
    });
  }

  document.getElementById("lang-en")?.addEventListener("click", () => {
    const currentPath = window.location.pathname;
    if (currentPath.startsWith("/es/")) {
      window.location.href = currentPath.replace("/es/", "/");
    }
  });

  document.getElementById("lang-es")?.addEventListener("click", () => {
    const currentPath = window.location.pathname;
    if (!currentPath.startsWith("/es/")) {
      const page = currentPath === "/" ? "index.html" : currentPath.split("/").pop();
      window.location.href = `/es/${page}`;
    }
  });
});
