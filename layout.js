document.addEventListener("DOMContentLoaded", () => {
  // Load navbar
  fetch("navbar.html")
    .then(res => res.text())
    .then(html => {
      document.getElementById("navbar").innerHTML = html;
    })
    .then(() => {
      applySavedTheme();
      updateLogo();
      adjustNavbarLinksForLang();
      
    });

  // Load footer
  fetch("footer.html")
    .then(res => res.text())
    .then(html => {
      document.getElementById("footer").innerHTML = html;
    })
    .then(() => {
      initThemeToggle();
      initLanguageToggle();
      highlightActiveLanguage();
    });
});

// === Theme Logic ===
function applySavedTheme() {
  const saved = localStorage.getItem("theme") || "light";
  document.documentElement.classList.toggle("dark", saved === "dark");
}

function updateLogo() {
  const logo = document.getElementById("site-logo");
  if (logo) {
    const isDark = document.documentElement.classList.contains("dark");
    logo.src = isDark ? "/images/Logo-White.png" : "/images/Logo-Black.png";
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
    updateLogo();
  });
}

function highlightActiveLanguage() {
  const isSpanish = window.location.pathname.startsWith("/es/");
  const enBtn = document.getElementById("lang-en");
  const esBtn = document.getElementById("lang-es");

  if (!enBtn || !esBtn) return;

  // Clear both first
  enBtn.classList.remove("active", "inactive");
  esBtn.classList.remove("active", "inactive");

  // Apply correct states
  if (isSpanish) {
    esBtn.classList.add("active");
    enBtn.classList.add("inactive");
  } else {
    enBtn.classList.add("active");
    esBtn.classList.add("inactive");
  }
}


function initLanguageToggle() {
  const enBtn = document.getElementById("lang-en");
  const esBtn = document.getElementById("lang-es");

  if (enBtn) {
    enBtn.addEventListener("click", () => {
      const currentPath = window.location.pathname;
      if (currentPath.startsWith("/es/")) {
        window.location.href = currentPath.replace("/es/", "/");
      }
    });
  }

  if (esBtn) {
    esBtn.addEventListener("click", () => {
      const currentPath = window.location.pathname;
      if (!currentPath.startsWith("/es/")) {
        const page = currentPath === "/" ? "index.html" : currentPath.split("/").pop();
        window.location.href = `/es/${page}`;
      }
    });
  }
}
