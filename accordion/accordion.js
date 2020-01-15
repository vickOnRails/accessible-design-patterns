const accordionElem = document.querySelector(".js-accordion");
const accordionItems = document.querySelectorAll(".js-accordion__item");
const accordionHeadings = document.querySelectorAll(".js-accordion__btn");
const accordionHeadingsArr = Array.from(accordionHeadings);

const ariaExpandedIsTrue = elem => {
  return elem.getAttribute("aria-expanded");
};

accordionItems.forEach((accordionItem, index) => {
  accordionItem
    .querySelector(".js-accordion__btn")
    .addEventListener("click", e => {
      let heading = accordionItem.querySelector(".js-accordion__btn");
      let isExpanded = heading.getAttribute("aria-expanded");
      accordionItem.classList.toggle("accordion--open");

      isExpanded === "true"
        ? heading.setAttribute("aria-expanded", "false")
        : heading.setAttribute("aria-expanded", "true");
    });
});

window.addEventListener("keydown", e => {
  if (document.activeElement.classList.contains("js-accordion__btn")) {
    let keyPressed;

    if (e.key === "ArrowDown") {
      keyPressed = "Down";
    } else if (e.key === "ArrowUp") {
      keyPressed = "Up";
    }

    let curIndex = accordionHeadingsArr.indexOf(document.activeElement);

    switch (keyPressed) {
      case "Up":
        if (curIndex === 0) {
          accordionHeadings[accordionHeadings.length - 1].focus();
        } else {
          accordionHeadings[curIndex - 1].focus();
        }

        break;

      case "Down":
        if (curIndex === accordionHeadings.length - 1) {
          accordionHeadings[0].focus();
        } else {
          accordionHeadings[curIndex + 1].focus();
        }

        break;
    }
  }
});
