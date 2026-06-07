const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
  const windowHeight = window.innerHeight;
  reveals.forEach((el) => {
    const elementTop = el.getBoundingClientRect().top;
    if (elementTop < windowHeight - 100) {
      el.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

const themeToggle = document.getElementById("theme-toggle");
if (themeToggle) {
  const html = document.documentElement;

  const saved = localStorage.getItem("theme");
  if (saved) {
    html.setAttribute("data-theme", saved);
  }

  themeToggle.addEventListener("click", () => {
    const current = html.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    html.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  });
}

const hamburger = document.getElementById("hamburger");
const navMenu = document.querySelector(".nav");

if (hamburger && navMenu) {
  hamburger.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    hamburger.setAttribute("aria-expanded", isOpen);
  });

  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("open");
      hamburger.setAttribute("aria-expanded", "false");
    });
  });
}

window.addEventListener("DOMContentLoaded", () => {
  const banner = document.getElementById("cookie-banner");
  if (banner && !localStorage.getItem("cookieAccepted")) {
    setTimeout(() => banner.classList.add("show"), 600);
  }
});

function acceptCookies() {
  localStorage.setItem("cookieAccepted", "true");
  const banner = document.getElementById("cookie-banner");
  if (banner) {
    banner.classList.remove("show");
  }
}

function showToast(msg) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.innerText = msg || "コピーしました";
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2000);
}

function copyText(elementId, msg) {
  const el = document.getElementById(elementId);
  if (!el) return;
  navigator.clipboard.writeText(el.innerText.trim()).then(() => {
    showToast(msg || "コピーしました");
  }).catch(() => {
    showToast("コピーに失敗しました");
  });
}
