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

const navToggle = document.getElementById("navToggle");
const navWrap = document.querySelector(".nav-wrap");
const primaryNav = document.getElementById("primaryNav");

function closeMobileNav() {
  if (!navWrap) return;
  navWrap.classList.remove("nav-open");
  if (navToggle) navToggle.setAttribute("aria-expanded", "false");
}

function toggleMobileNav() {
  if (!navWrap) return;
  const isOpen = navWrap.classList.toggle("nav-open");
  if (navToggle) navToggle.setAttribute("aria-expanded", String(isOpen));
}

if (navToggle && navWrap) {
  navToggle.addEventListener("click", (event) => {
    event.stopPropagation();
    toggleMobileNav();
  });

  document.addEventListener("click", (event) => {
    if (!navWrap.classList.contains("nav-open")) return;
    if (navWrap.contains(event.target)) return;
    closeMobileNav();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMobileNav();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 860) closeMobileNav();
  });
}

if (primaryNav) {
  primaryNav.addEventListener("click", (event) => {
    if (event.target.tagName === "A") closeMobileNav();
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
/* ==========================================
   ADVANCED NEON CURSOR EFFECT
========================================== */


const cursorDot = document.querySelector(".cursor-dot");
const cursorGlow = document.querySelector(".cursor-glow");
const cursorSpotlight = document.querySelector(".cursor-spotlight");


if(cursorDot && cursorGlow){


let mouseX = 0;
let mouseY = 0;

let cursorX = 0;
let cursorY = 0;



document.addEventListener("mousemove",(e)=>{


    mouseX = e.clientX;
    mouseY = e.clientY;


    if(cursorSpotlight){

        cursorSpotlight.style.setProperty(
            "--x",
            mouseX+"px"
        );

        cursorSpotlight.style.setProperty(
            "--y",
            mouseY+"px"
        );

    }



    createCursorParticle(mouseX,mouseY);


});





function animateCursor(){


    cursorX += (mouseX - cursorX) * 0.15;

    cursorY += (mouseY - cursorY) * 0.15;



    cursorDot.style.left = cursorX+"px";

    cursorDot.style.top = cursorY+"px";



    cursorGlow.style.left = cursorX+"px";

    cursorGlow.style.top = cursorY+"px";



    requestAnimationFrame(animateCursor);

}


animateCursor();





function createCursorParticle(x,y){


    const particle=document.createElement("span");


    particle.className="cursor-particle";


    particle.style.left=x+"px";

    particle.style.top=y+"px";



    document.body.appendChild(particle);



    setTimeout(()=>{

        particle.remove();

    },800);


}




/* Magnetic Hover Effect */


const magneticElements=document.querySelectorAll(
".skill-card, .project-feature, .stat-card, .cert-card, .contact-info-card"
);



magneticElements.forEach(element=>{


element.addEventListener("mousemove",(e)=>{


const rect=element.getBoundingClientRect();


const x=e.clientX - rect.left - rect.width/2;

const y=e.clientY - rect.top - rect.height/2;



element.style.transform=

`
translate(${x*0.08}px,${y*0.08}px)
scale(1.03)
`;



cursorDot.style.transform=
"translate(-50%,-50%) scale(2)";


});




element.addEventListener("mouseleave",()=>{


element.style.transform="";


cursorDot.style.transform=
"translate(-50%,-50%) scale(1)";


});


});


}
