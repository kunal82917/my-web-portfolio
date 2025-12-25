const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
  const windowHeight = window.innerHeight;

  reveals.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;
    const revealPoint = 100;

    if (elementTop < windowHeight - revealPoint) {
      el.classList.add("active");
    }
  });
}

let ticking = false;

window.addEventListener("scroll", () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      revealOnScroll();
      ticking = false;
    });
    ticking = true;
  }
});

window.addEventListener("load", revealOnScroll);

/* DARK MODE TOGGLE */
const themeToggle = document.getElementById("theme-toggle");
const savedTheme = localStorage.getItem("theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

// Apply theme on load
if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
  document.body.classList.add("dark");
  if (themeToggle) themeToggle.textContent = "☀️";
}

// Safe click handler
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    const isDark = document.body.classList.contains("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");

    themeToggle.textContent = isDark ? "☀️" : "🌙";
  });
}
