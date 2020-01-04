const openModalBtn = document.querySelector(".js-modal-open");
const closeModalBtns = document.querySelectorAll(".js-close-modal-btn");
const modal = document.querySelector(".modal");
const body = document.querySelector("body");

const openModal = () => {
  body.classList.add("modal-open");
};
const closeModal = () => {
  body.classList.remove("modal-open");
};

openModalBtn.addEventListener("click", () => {
  openModal();
});

closeModalBtns.forEach(closeModalBtn => {
  // Loop through all close modal buttons, add event listeners
  closeModalBtn.addEventListener("click", () => {
    closeModal();
  });
});
