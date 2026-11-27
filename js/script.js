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


// Reveal section content as it enters the visitor's screen.
const elementsToReveal = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(function (entries, observer) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");

            // We only need to animate an element the first time it appears.
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15
});

elementsToReveal.forEach(function (element) {
    revealObserver.observe(element);
});


// Highlight the navigation link for the section currently being viewed.
const pageSections = document.querySelectorAll("main section[id]");

const sectionObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            const currentSection = entry.target.getAttribute("id");

            navigationLinks.forEach(function (link) {
                link.classList.remove("active");

                if (link.getAttribute("href") === "#" + currentSection) {
                    link.classList.add("active");
                }
            });
        }
    });
}, {
    rootMargin: "-35% 0px -55% 0px"
});

pageSections.forEach(function (section) {
    sectionObserver.observe(section);
});


// Show the current year in the footer automatically.
const yearElement = document.getElementById("currentYear");
yearElement.textContent = new Date().getFullYear();
