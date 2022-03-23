const menuBtn = document.querySelector(".menu-btn");
const navBar = document.querySelector(".nav-bar");
const navList = document.querySelectorAll(".nav-bar li");

//event listener to toggle menu button and nav bar when menu button is clicked
menuBtn.addEventListener("click", toggleMenuBarAndNavBar);

// Stop propagation of body click on the nav bar
navBar.addEventListener("click", (e) => {
  e.stopPropagation();
});

//Event listener to toggle menu button and nav bar when a list item from the nav-bar is clicked
Array.from(navList).forEach((element) =>
  element.addEventListener("click", toggleMenuBarAndNavBar)
);

document.body.addEventListener("click", closeMenuBar);

// Close the navBar if open and target != navBar
function closeMenuBar(e) {
  const classActiveNav = "menu-btn-active";
  if (navBar.classList.contains(classActiveNav)) {
    setTimeout(() => {
      navBar.classList.remove(classActiveNav);
      menuBtn.classList.remove("open");
    }, 0);
  }
}

// Function which toggles menu button and nav bar
function toggleMenuBarAndNavBar(e) {
  menuBtn.classList.toggle("open");
  navBar.classList.toggle("menu-btn-active");
  e.stopPropagation();
}

// Text-Changing Functionality
class TxtRotate {
  constructor(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 1000;
    this.txt = "";
    this.tick();
    this.isDeleting = false;
  }

  tick() {
    const i = this.loopNum % this.toRotate.length;
    const fullTxt = this.toRotate[i];

    if (this.isDeleting) {
      this.txt = fullTxt.slice(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.slice(0, this.txt.length + 1);
    }

    this.el.innerHTML = " " + this.txt;

    let that = this;
    let delta = 150 - Math.random() * 100;

    if (this.isDeleting) {
      delta /= 2.5;
    }

    if (!this.isDeleting && this.txt === fullTxt) {
      delta = this.period;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === "") {
      this.isDeleting = false;
      this.loopNum++;
      delta = 500;
    }

    setTimeout(function () {
      that.tick();
    }, delta);
  }
}

window.onload = function () {
  var elements = document.querySelectorAll(".txt-rotate");
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute("data-rotate");
    var period = elements[i].getAttribute("data-period");
    if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), period);
    }
  }
};
