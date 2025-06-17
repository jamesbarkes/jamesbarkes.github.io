document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("navbar");

  // Inject navbar
  fetch("navbar.html")
    .then(res => res.text())
    .then(data => {
      header.innerHTML = data;

      const themeToggle = document.getElementById("theme-toggle");
      const logo = document.getElementById("site-logo");

      // Set theme on load
      const savedTheme = localStorage.getItem("theme") || "light";
      setTheme(savedTheme);

      themeToggle.addEventListener("click", () => {
        const newTheme = document.body.classList.contains("dark") ? "light" : "dark";
        setTheme(newTheme);
      });

      function setTheme(mode) {
        document.body.classList.toggle("dark", mode === "dark");
        logo.src = mode === "dark" ? "images/Logo-White.png" : "images/Logo-Black.png";
        localStorage.setItem("theme", mode);
      }
    });
});
