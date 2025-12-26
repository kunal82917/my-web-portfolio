window.history.scrollRestoration = "manual";

window.addEventListener("load", () => {
  window.scrollTo(0, 0);
});

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

/* COUNTER ANIMATION */
function animateCounter(element, target) {
  let current = 0;
  const duration = 2500;
  const startTime = Date.now();
  
  function update() {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeOut = 1 - Math.pow(1 - progress, 3);
    current = target * easeOut;
    
    element.textContent = Math.floor(current);
    
    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      element.textContent = target;
    }
  }
  
  update();
}

function initCounters() {
  const counters = document.querySelectorAll(".counter");
  
  const observerOptions = {
    threshold: 0.5
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.counted) {
        const target = parseInt(entry.target.dataset.target);
        animateCounter(entry.target, target);
        entry.target.dataset.counted = "true";
      }
    });
  }, observerOptions);
  
  counters.forEach(counter => observer.observe(counter));
}

window.addEventListener("load", initCounters);

/* SKILL INTERACTION */
function initSkillFilters() {
  const skillSpans = document.querySelectorAll(".skills span");
  
  skillSpans.forEach(span => {
    span.addEventListener("click", (e) => {
      skillSpans.forEach(s => s.style.opacity = "0.4");
      e.target.style.opacity = "1";
      
      setTimeout(() => {
        skillSpans.forEach(s => s.style.opacity = "1");
      }, 1500);
    });
  });
}

window.addEventListener("load", initSkillFilters);

/* SCROLL PROGRESS INDICATOR */
function updateScrollProgress() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  
  let progressBar = document.getElementById("progress-bar");
  if (!progressBar) {
    progressBar = document.createElement("div");
    progressBar.id = "progress-bar";
    progressBar.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      height: 3px;
      background: linear-gradient(90deg, #4f46e5, #06b6d4, #ec4899);
      z-index: 101;
      transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
  }
  
  progressBar.style.width = scrollPercent + "%";
}

window.addEventListener("scroll", updateScrollProgress);
window.addEventListener("load", updateScrollProgress);

/* PARALLAX EFFECT FOR HERO */
window.addEventListener("scroll", () => {
  const hero = document.querySelector(".hero");
  if (hero) {
    const scrollTop = window.scrollY;
    if (scrollTop < 800) {
      hero.style.transform = `translateY(${scrollTop * 0.4}px)`;
    }
  }
});

/* PAGE LOAD ANIMATION */
document.body.style.opacity = "0";
document.body.style.transition = "opacity 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)";

window.addEventListener("load", () => {
  document.body.style.opacity = "1";
});

setTimeout(() => {
  document.body.style.opacity = "1";
}, 100);

/* INTERSECTION OBSERVER FOR ANIMATIONS */
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px"
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    }
  });
}, observerOptions);

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

/* LOAD COMPLETE */
window.addEventListener("load", () => {
  console.log("🔐 Kunal's Security Portfolio loaded successfully!");
});
