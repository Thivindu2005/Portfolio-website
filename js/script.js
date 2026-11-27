// Find the navigation elements that we need to control.
const menuToggle = document.getElementById("menuToggle");
const navigation = document.getElementById("navigation");

// Open and close the navigation menu on smaller screens.
menuToggle.addEventListener("click", function () {
    const menuIsOpen = navigation.classList.toggle("open");

    // Change the button style and accessibility label with the menu.
    menuToggle.classList.toggle("open", menuIsOpen);
    menuToggle.setAttribute("aria-expanded", menuIsOpen);
});

// Close the menu when a visitor clicks one of the navigation links.
const navigationLinks = navigation.querySelectorAll("a");

navigationLinks.forEach(function (link) {
    link.addEventListener("click", function () {
        navigation.classList.remove("open");
        menuToggle.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
    });
});


// Add a background to the floating navigation after scrolling.
const header = document.querySelector(".site-header");

function updateHeader() {
    if (window.scrollY > 40) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
}

window.addEventListener("scroll", updateHeader);
updateHeader();


// Calculate how much of the page the visitor has scrolled through.
const scrollProgress = document.getElementById("scrollProgress");

function updateScrollProgress() {
    const fullPageHeight = document.documentElement.scrollHeight;
    const screenHeight = window.innerHeight;
    const scrollableArea = fullPageHeight - screenHeight;

    let scrollPercentage = 0;

    // A short page has no scrollable area, so keep the bar at zero.
    if (scrollableArea > 0) {
        scrollPercentage = (window.scrollY / scrollableArea) * 100;
    }

    scrollProgress.style.width = scrollPercentage + "%";
}

window.addEventListener("scroll", updateScrollProgress, { passive: true });
window.addEventListener("resize", updateScrollProgress);
updateScrollProgress();


