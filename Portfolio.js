// Wait for PETIFAYE animation to finish
  setTimeout(() => {
    const intro = document.getElementById("intro-animation");
    intro.style.transition = "opacity 1s ease";
    intro.style.opacity = "0";

    setTimeout(() => {
      intro.style.display = "none";
      const mainContent = document.getElementById("main-content");
      mainContent.style.transition = "opacity 1s ease";
      mainContent.style.opacity = "1";
    }, 1000);
  }, 3200); // adjust to match last letter animation

var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");

function opentab(tabname) {
  for (let tablink of tablinks) {
    tablink.classList.remove("active-link");
  }
  for (let tabcontent of tabcontents) {
    tabcontent.classList.remove("active-tab");
  }
  event.currentTarget.classList.add("active-link");
  document.getElementById(tabname).classList.add("active-tab");
}

var sidemenu = document.getElementById("sidemenu");

function openmenu() {
  sidemenu.style.right = "0";
}

function closemenu() {
  sidemenu.style.right = "-200px";
}

const form = document.getElementById("contact-form");
const msg = document.getElementById("msg");

const scriptURL = "https://formsubmit.co/princeprajapti2589@email.com";
 // Replace with your deployed Web App URL!

form.addEventListener("submit", e => {
  e.preventDefault();

  msg.innerHTML = "⏳ Sending...";

  fetch(scriptURL, {
    method: "POST",
    body: new FormData(form),
    mode: "no-cors"
  })
  .then(() => {
    msg.innerHTML = "✅ Your message has been sent successfully!";
    setTimeout(() => {
      msg.innerHTML = "";
    }, 5000);
    form.reset();
  })
  .catch(error => {
    console.error("Error!", error.message);
    msg.innerHTML = "❌ Something went wrong!";
  });
});

ScrollReveal().reveal('.header-text', { delay: 200, origin: 'top', distance: '30px' });
ScrollReveal().reveal('.about-col-2', { delay: 300, origin: 'left' });
ScrollReveal().reveal('.services-list div', { interval: 200 });


// === Click Ripple Effect ===
const ripple = document.getElementById("ripple");

document.addEventListener("click", (e) => {
  ripple.style.transition = "none";
  ripple.style.transform = "scale(0)";
  ripple.style.opacity = "1";

  ripple.style.left = `${e.pageX - 10}px`;
  ripple.style.top = `${e.pageY - 10}px`;

  requestAnimationFrame(() => {
    ripple.style.transition = "transform 0.4ease-out, opacity 0.4s ease-out";
    ripple.style.transform = "scale(3)";
    ripple.style.opacity = "0";
  });
});