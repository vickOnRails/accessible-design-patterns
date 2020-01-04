const openModalBtn = document.querySelector(".js-modal-open");
const closeModalBtns = document.querySelectorAll(".js-close-modal-btn");
const modalElem = document.querySelector(".modal");
const body = document.querySelector("body");

class Modal {
  // focusables holds all elements that can be focused
  focusables = modalElem.querySelectorAll(
    '.modal__content a[href], .modal__content area[href], .modal__content input:not([disabled]), .modal__content select:not([disabled]), .modal__content textarea:not([disabled]), .modal__content button:not([disabled]), .modal__content [tabindex="0"]'
  );

  // A container variable for the last focused Item.
  lastFocusedItem;

  constructor(modalElem, parent) {
    this.parent = parent;
    this.modal = modalElem;

    window.addEventListener("click", e => {
      // close the modal if we click on the grey area
      if (this.isModalOpen() && e.target.classList.contains("modal")) {
        this.close();
      }
    });

    // Add the keydown event
    window.addEventListener("keydown", e => {
      // We added a new method to tell if modal is open
      if (this.isModalOpen()) {
        let keyPressed;

        // Find the pressed key
        if (e.shiftKey && e.key === "Tab") {
          keyPressed = "Shift_Tab";
        } else if (e.key === "Tab") {
          keyPressed = "Tab";
        } else if (e.key === "Escape") {
          keyPressed = "Escape";
        }

        switch (keyPressed) {
          case "Tab":
            // Tab is pressed
            if (
              document.activeElement ===
              this.focusables[this.focusables.length - 1]
            ) {
              // If focus is on the last element, focus on the first
              e.preventDefault();
              this.focusables[0].focus();
            }
            break;

          case "Shift_Tab":
            // Shift + Tab is pressed
            if (document.activeElement === this.focusables[0]) {
              // If focus is on the first element, focus on the last
              e.preventDefault();
              this.focusables[this.focusables.length - 1].focus();
            }
            break;

          case "Escape":
            // Close Modal if Escape key is pressed
            this.close();
            break;

          default:
            return;
        }
      }
    });
  }

  open() {
    // document.activeElement holds the currently focused Element
    this.lastFocusedItem = document.activeElement;
    this.parent.classList.add("modal-open");

    // Focus on the first element in the focusables array
    this.focusables[1].focus();
  }

  isModalOpen() {
    return this.parent.classList.contains("modal-open") ? true : false;
  }

  close() {
    // Add the modal-close class that fades out the modal when closed
    this.parent.classList.add("modal-close");

    // Listen for fadeOut animation end (fadeOut is the name of the animation that runs when we close the modal)
    this.parent.addEventListener("animationend", e => {
      if (e.animationName === "fadeOut" || e.animationName === "zoomOut") {
        // Remove both classes when the fadeOut animation ends
        this.parent.classList.remove("modal-close", "modal-open");
      }
    });

    // restore focus to the lasted focused element
    this.lastFocusedItem.focus();
  }
}

// Create an instance of the Modal class
const modal = new Modal(modalElem, body);

openModalBtn.addEventListener("click", () => {
  modal.open();
});

closeModalBtns.forEach(closeModalBtn => {
  closeModalBtn.addEventListener("click", () => {
    modal.close();
  });
});
