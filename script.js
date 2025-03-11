const dropdownMenu = document.querySelector(".dropdown");

document.querySelector(".dropdown-button").addEventListener("click", (e) => {
  e.stopPropagation();
  dropdownMenu.classList.toggle("show");
  document.querySelector(".dropdown-button").style.display = "none";
  document.querySelector(".close-button").style.display = "block";
});

document.addEventListener("click", () => {
  if (dropdownMenu.classList.contains("show")) {
    dropdownMenu.classList.remove("show");
    document.querySelector(".dropdown-button").style.display = "block";
    document.querySelector(".close-button").style.display = "none";
  }
});

window.addEventListener(
  "resize",
  (event) => {
    if (event.currentTarget.innerWidth > 620) {
      document.querySelector(".dropdown-button").style.display = "none";
      document.querySelector(".close-button").style.display = "none";
      dropdownMenu.classList.remove("show");
    } else if (
      event.currentTarget.innerWidth < 620 &&
      !dropdownMenu.classList.contains("show")
    ) {
      document.querySelector(".dropdown-button").style.display = "block";
      document.querySelector(".close-button").style.display = "none";
    }
  },
  true
);
