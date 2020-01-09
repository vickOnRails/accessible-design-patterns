const checkbox = document.querySelector(".checkbox__btn");

const toggleCheckboxState = e => {
  e.target.setAttribute("aria-checked", `${!isCheckboxChecked()}`);
};

const isCheckboxChecked = () => {
  return checkbox.getAttribute("aria-checked") === "true";
};

checkbox.addEventListener("click", toggleCheckboxState);
