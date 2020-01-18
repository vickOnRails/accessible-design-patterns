const find = selector => {
  return document.querySelector(selector);
};

const slider = find(".slider");
const output = find(".form__output");
const formGroup = find(".form__group");

const toPercentage = (number, width) => (width / 100) * number + "px";

output.innerHTML = slider.value;
formGroup.style.setProperty(
  "--range-active",
  toPercentage(slider.value, slider.offsetWidth)
);

slider.addEventListener("input", e => {
  let sliderWidth = slider.offsetWidth;
  output.innerHTML = e.target.value;
  formGroup.style.setProperty(
    "--range-active",
    toPercentage(e.target.value, sliderWidth)
  );
});
