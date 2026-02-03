// src/theme/theme.js

const THEME_KEY = "lockerbol-theme";


export function initTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY);

  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

  // 1️⃣ aplicar tema inicial
  applyTheme(savedTheme ?? (mediaQuery.matches ? "dark" : "light"));

  // 2️⃣ escuchar cambios del sistema
  mediaQuery.addEventListener("change", (e) => {
    const stored = localStorage.getItem(THEME_KEY);
    if (!stored || stored === "system") {
      applyTheme(e.matches ? "dark" : "light");
    }
  });
}

export function applyTheme(theme) {
  const root = document.documentElement;

  if (theme === "dark") {
    root.classList.add("dark");
    root.classList.remove("light");
  } else {
    root.classList.add("light");
    root.classList.remove("dark");
  }
}
