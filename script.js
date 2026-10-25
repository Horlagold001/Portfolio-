
"use strict";

// Page elements

const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("primaryNav");
const navLinks = document.querySelectorAll("#primaryNav a");

const year = document.getElementById("year");
const checklistButton = document.getElementById("checklistButton");
const checklist = document.getElementById("checklist");
const contactForm = document.getElementById("contactForm");
const formNote = document.getElementById("formNote");
const prepareWhatsApp = document.getElementById("prepareWhatsApp");

const WHATSAPP_NUMBER = "2347053134665";

// Footer year
if (year) {
  year.textContent = new Date().getFullYear();
}

// Mobile menu
function closeMenu() {
  if (!nav || !menuToggle) return;

  nav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open menu");
  menuToggle.textContent = "☰";
}

if (menuToggle && nav) {
  menuToggle.addEventListener("click", function () {
    const isOpen = nav.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close menu" : "Open menu"
    );
    menuToggle.textContent = isOpen ? "✕" : "☰";
  });

  navLinks.forEach(function (link) {
    link.addEventListener("click", closeMenu);
  });
}

// Highlight visible navigation section
const sections = document.querySelectorAll("main section[id]");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;

      navLinks.forEach(function (link) {
        const active =
          link.getAttribute("href") === "#" + entry.target.id;

        link.classList.toggle("active", active);

        if (active) {
          link.setAttribute("aria-current", "location");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    });
  }, {
    rootMargin: "-30% 0px -55% 0px"
  });

  sections.forEach(function (section) {
    observer.observe(section);
  });
}

// Project checklist
if (checklistButton && checklist) {
  checklistButton.setAttribute("aria-expanded", "false");

  checklistButton.addEventListener("click", function () {
    const shouldShow = checklist.hidden;
    checklist.hidden = !shouldShow;

    checklistButton.textContent = shouldShow
      ? "Hide project checklist −"
      : "Show project checklist ＋";

    checklistButton.setAttribute(
      "aria-expanded",
      String(shouldShow)
    );
  });
}


if (contactForm) {
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();
    alert("Contact form is working!");

    if (!contactForm.reportValidity()) return;

    const name = document.getElementById("senderName").value.trim();
    const email = document.getElementById("senderEmail").value.trim();
    const topic = document.getElementById("messageType").value;
    const message = document.getElementById("senderMessage").value.trim();

    const text = `Hello Mustapha!

Name: ${name}
Email: ${email || "Not provided"}
Topic: ${topic}

Message:
${message}`;

    const whatsappURL =
      "https://wa.me/2347053134665?text=" +
      encodeURIComponent(text);

    window.location.href = whatsappURL;
  });
}


console.log("Portfolio script loaded successfully.");
