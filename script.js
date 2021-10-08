// 1. Header section JS
// Typing function on main hadder
class TypeWriter {
  constructor(txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = "";
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
  }

  type() {
    // Current index of words
    const current = this.wordIndex % this.words.length;
    // Get full text of current word
    const fullTxt = this.words[current];

    // Check if deleting
    if (this.isDeleting) {
      // Remove char
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      // Add char
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    // Insert txt into element
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

    // Initial Type Speed
    let typeSpeed = 300;

    if (this.isDeleting) {
      typeSpeed /= 2;
    }

    // If word is complete
    if (!this.isDeleting && this.txt === fullTxt) {
      // Make pause at the end
      typeSpeed = this.wait;
      // Set delete to true
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === "") {
      this.isDeleting = false;
      // Move to next word
      this.wordIndex++;
      // Pause before start typing
      typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}

// Init On DOM Load
document.addEventListener("DOMContentLoaded", init);

// Init App
function init() {
  const txtElement = document.querySelector(".txt-type");
  const words = JSON.parse(txtElement.getAttribute("data-words"));
  const wait = txtElement.getAttribute("data-wait");
  // Init TypeWriter
  new TypeWriter(txtElement, words, wait);
}

// 2. About Me section JS
// Changing images in about me section
const photos = document.querySelectorAll(".about-me-photos img");
let interval = setInterval(run, 5000);
function run() {
  photos.forEach((photo) => photo.classList.toggle("hidden-photo"));
}

// 3. Technical skills section + navbar links JS
const progressSection = document.getElementById("section-b");
const progressBarsPercents = [90, 85, 70, 75, 65];
const progressBars = document.querySelectorAll(".progress-percent");
const sections = document.querySelectorAll("section");
const navbarLinks = document.querySelectorAll(".navbar-link");

window.addEventListener("scroll", () => {
  updateTechnicalSkills();
  updateNavBarLinks();
});

function updateTechnicalSkills() {
  if (
    window.pageYOffset >=
    progressSection.offsetTop - window.innerHeight + 100
  ) {
    progressBars.forEach((el, i) => {
      el.style.width = `${progressBarsPercents[i]}%`;
      el.previousElementSibling.firstElementChild.textContent =
        progressBarsPercents[i];
    });
  } else {
    progressBars.forEach((el, i) => {
      el.style.width = "0%";
    });
  }
}

function updateNavBarLinks() {
  sections.forEach((section, i) => {
    if (window.pageYOffset >= section.offsetTop - window.innerHeight + 100) {
      navbarLinks.forEach((navbarLink) => {
        navbarLink.classList.remove("change");
      });
      navbarLinks[i].classList.add("change");
    }
  });
}

updateTechnicalSkills();
updateNavBarLinks();

// FAQ Skills and certificates => the whole skills div is clicable
const skills = document.querySelectorAll(".skill");

skills.forEach((skill) => {
  skill.addEventListener("click", () => {
    skill.classList.toggle("active");
  });
});


// 4. Contact form section JS
// Form control => label animation + email verification
const labels = document.querySelectorAll(".form-control label");

labels.forEach((label) => {
  label.innerHTML = label.innerText
    .split("")
    .map(
      (letter, index) =>
        `<span style="transition-delay:${index * 50}ms">${letter}</span>`
    )
    .join("");
});

const form = document.getElementById("form");
const fullName = document.getElementById("name");
const email = document.getElementById("email");
const message = document.getElementById("message");

// Show error
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerText = message;
}

// Show success
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
  const small = formControl.querySelector("small");
  small.innerText = "";
}

// Check email is valid
function checkEmail(input) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, `Email is not valid`);
  }
}

// Check required fields
function checkRequired(inputArr) {
  inputArr.forEach(function (input) {
    if (input.value.trim() === "") {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}

// Check input length
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} characters`
    );
  } else {
    showSuccess(input);
  }
}

// Get fieldname
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Event listener
form.addEventListener("submit", function (e) {
  // e.preventDefault();

  checkRequired([fullName, email, message]);
  checkLength(fullName, 3, 15);
  checkLength(message, 6, 25);
  checkEmail(email);
});

// Adding active clase in case name and email fields are not empty

form.addEventListener("input", () => {
  if (fullName.value !== "") {
    fullName.classList.add("active");
  } else {
    fullName.classList.remove("active");
  }

  if (email.value !== "") {
    email.classList.add("active");
  } else {
    email.classList.remove("active");
  }

  if (message.value !== "") {
    message.classList.add("active");
  } else {
    message.classList.remove("active");
  }
});

// 5. Footer section JS
// Get current year for footer section
const today = new Date();
const year = document.getElementById("year");
year.innerHTML = today.getFullYear();

// 6. Scroll container hidden when at banner
const scrollContainer = document.querySelector(".scroll-container");
const mainHeader = document.getElementById("main-header");

window.addEventListener("scroll", () => {
  if (window.pageYOffset >= mainHeader.offsetTop + 300) {
    scrollContainer.classList.remove("hidden");
  } else {
    scrollContainer.classList.add("hidden");
  }
});

console.log(scrollContainer);
