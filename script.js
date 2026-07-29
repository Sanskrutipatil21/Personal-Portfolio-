const typingText = document.getElementById("typingText");

const roles = [
  "Data Analyst",
  "Power BI Developer",
  "Business Intelligence Developer",
  "Python Developer",
  "SQL Developer",
];

const typingSpeed = 90;
const backspaceSpeed = 50;
const pauseDelay = 2000;

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop() {
  const currentRole = roles[roleIndex];

  if (!deleting) {
    charIndex += 1;
    typingText.textContent = currentRole.slice(0, charIndex);

    if (charIndex === currentRole.length) {
      deleting = true;
      window.setTimeout(typeLoop, pauseDelay);
      return;
    }

    window.setTimeout(typeLoop, typingSpeed);
    return;
  }

  charIndex -= 1;
  typingText.textContent = currentRole.slice(0, charIndex);

  if (charIndex === 0) {
    deleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    window.setTimeout(typeLoop, typingSpeed);
    return;
  }

  window.setTimeout(typeLoop, backspaceSpeed);
}

typingText.textContent = "";
window.setTimeout(typeLoop, typingSpeed);

const contactForm = document.querySelector(".contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const submitBtn = contactForm.querySelector(".contact-submit");
    const originalLabel = submitBtn.innerHTML;

    submitBtn.innerHTML = "Message Sent ✓";
    submitBtn.disabled = true;

    window.setTimeout(() => {
      submitBtn.innerHTML = originalLabel;
      submitBtn.disabled = false;
      contactForm.reset();
    }, 2200);
  });
}

const navLinks = document.querySelectorAll(".nav a[href^='#']");
const sections = Array.from(navLinks)
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

function setActiveLink(id) {
  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    setActiveLink(link.getAttribute("href").slice(1));
  });
});

if ("IntersectionObserver" in window && sections.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (visible) {
        setActiveLink(visible.target.id);
      }
    },
    { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
  );

  sections.forEach((section) => observer.observe(section));
}