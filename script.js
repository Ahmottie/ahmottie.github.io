const primaryNav = document.querySelector(".primary-nav");
const navToggle = document.querySelector(".mobile-nav-toggle");

const navLink = document.querySelectorAll(".nav-link");

navToggle.addEventListener("click", () => {
  const visibility = primaryNav.getAttribute("data-visible");

  if (visibility === "false") {
    primaryNav.setAttribute("data-visible", true);
    navToggle.setAttribute("aria-expanded", true);
  }

  if (visibility === "true") {
    primaryNav.setAttribute("data-visible", false);
    navToggle.setAttribute("aria-expanded", false);
  }
});

[...navLink].forEach((nav) => {
  nav.addEventListener("click", () => {
    if (primaryNav.getAttribute("data-visible") === "true") {
      primaryNav.setAttribute("data-visible", false);
      navToggle.setAttribute("aria-expanded", false);
    }
  });
});

const contactForm = document.getElementById('contactForm');
const formResponse = document.getElementById('formResponse');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  formResponse.innerText = "Sending...";

  const formData = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    message: document.getElementById('message').value,
  };

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      formResponse.innerText = "Message sent successfully!";
      contactForm.reset();
    } else {
      formResponse.innerText = "Something went wrong. Please try again.";
    }
  } catch (err) {
    formResponse.innerText = "Error connecting to server.";
  }
});