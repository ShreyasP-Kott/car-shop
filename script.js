import menuData from "./data/menu.json";
const dropdownMenu = document.querySelector(".dropdown");

const createMenuItems = (target) => {
  let menuContent = menuData[target.outerText.toLowerCase()];
  if (menuContent) {
    if (target.querySelector(".menu-list")) {
      document.querySelector(".menu-list").style.display = "block";
    } else {
      const contentTexts = Object.keys(menuContent);
      const content = document.createElement("div");
      content.className = "menu-list";
      contentTexts.forEach((contentText) => {
        const listItem = document.createElement("div");
        listItem.className = "list-item";
        listItem.textContent = contentText;
        listItem.addEventListener("mouseenter", (e) => {
          if (target.querySelector(".sub-menu-list")) {
            target.removeChild(target.querySelector(".sub-menu-list"));
          }
          const subContents = menuContent[e.target.outerText];
          const subContentElement = document.createElement("div");
          subContentElement.className = "sub-menu-list";
          subContents.forEach((each) => {
            const subListItem = document.createElement("div");
            subListItem.className = "sub-list-item";
            subListItem.textContent = each.name;
            subContentElement.appendChild(subListItem);
          });
          target.appendChild(subContentElement);
        });
        content.appendChild(listItem);
      });
      target.appendChild(content);
      document.querySelector(".menu-list").style.display = "block";
    }
  }
};

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

const allMenuItems = Array.from(document.querySelectorAll("header .nav li"));
allMenuItems.forEach((menuItem) => {
  menuItem.addEventListener("mouseenter", (e) => {
    createMenuItems(e.target);
  });
});

document.querySelector("header").addEventListener("mouseleave", () => {
  if (document.querySelector(".menu-list"))
    document.querySelector(".menu-list").style.display = "none";
  if (document.querySelector(".sub-menu-list"))
    document.querySelector(".sub-menu-list").style.display = "none";
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

const indicators = document.querySelectorAll(".slider .indicators .indicator");
const arrowPrev = document.querySelector(".slider .arrows .arrow-prev");
const arrowNext = document.querySelector(".slider .arrows .arrow-next");

const handleIndicatorClick = (event) => {
  const indicator = event.target;
  if (!isActive(indicator)) {
    removeActive();
    addActive(indicator);
    showSlide(indicator.dataset.slide);
  }
};

const handlePrevArrowClick = (event) => {
  let activeSlide = 0;
  let newActiveSlide = indicators.length;
  let ready = false;

  indicators.forEach((indicator) => {
    if (isActive(indicator) && !ready) {
      activeSlide = indicator.dataset.slide;
      if (activeSlide !== "1") {
        newActiveSlide = parseInt(activeSlide) - 1;
      }
      removeActive();
      addActive(
        document.querySelector(
          `.slider .indicators [data-slide='${newActiveSlide}']`
        )
      );
      showSlide(newActiveSlide);
      ready = true;
    }
  });
};

const handleNextArrowClick = (event) => {
  let activeSlide = 0;
  let newActiveSlide = 1;
  let ready = false;

  indicators.forEach((indicator) => {
    if (isActive(indicator) && !ready) {
      activeSlide = indicator.dataset.slide;
      if (activeSlide !== indicators.length.toString()) {
        newActiveSlide = parseInt(activeSlide) + 1;
      }
      removeActive();
      addActive(
        document.querySelector(
          `.slider .indicators [data-slide='${newActiveSlide}']`
        )
      );
      showSlide(newActiveSlide);
      ready = true;
    }
  });
};

indicators.forEach((indicator) => {
  indicator.addEventListener("click", handleIndicatorClick);
});

arrowPrev.addEventListener("click", handlePrevArrowClick);
arrowNext.addEventListener("click", handleNextArrowClick);

function isActive(indicator) {
  return indicator.hasAttribute("active");
}

function removeActive() {
  document.querySelectorAll(".slider .indicators [active]").forEach((item) => {
    item.removeAttribute("active");
  });
}

function addActive(indicator) {
  indicator.setAttribute("active", "");
}

function showSlide(newActiveSlide) {
  const newPosition = (100 * (newActiveSlide - 1)).toString();
  document.querySelector(".slider-inner").style.marginLeft = `-${newPosition}%`;
}
