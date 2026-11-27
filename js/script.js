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


