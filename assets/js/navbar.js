// function openHamburger() {}

let isHamburberOpen = false;
const hamburgerOpen = () => {
  let hamburgerItemsElement = document.getElementById("hamburger-bars-items");

  if (!isHamburberOpen) {
    hamburgerItemsElement.style.display = "block";
    isHamburberOpen = true;
  } else {
    hamburgerItemsElement.style.display = "none";
    isHamburberOpen = false;
  }
};
