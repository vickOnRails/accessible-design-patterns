class Dropdown {
  selected;
  constructor(dropdownElem) {
    this.dropdown = dropdownElem;
    this.dropdownBtn = this.dropdown.querySelector(".btn");
    this.dropdownMenu = this.dropdown.querySelector(".dropdown__menu");
    this.dropdownMenuItems = this.dropdown.querySelectorAll(".dropdown__item");
    this.dropdownLabel = this.dropdown.querySelector(".dropdown__text");
    this.addEventListeners();
  }

  addEventListeners() {

    this.dropdownBtn.addEventListener(
      "click",
      () => {
        this.toggleOpen();
      },
      false
    );

    this.dropdownMenuItems.forEach(dropdownMenuItem => {
      dropdownMenuItem.addEventListener("click", () => {
        this.selectItem(dropdownMenuItem);
        this.close();
      });
    });

    window.addEventListener("keydown", e => {
      let curIndex = this.getSelected();
      if (this.isFocused) {
        switch (e.key) {
          case "ArrowDown":
            this.open();
            if (!this.selected) {
              this.selectItem(this.dropdownMenuItems[0]);
            } else if (curIndex < this.dropdownMenuItems.length - 1) {
              this.selectItem(this.dropdownMenuItems[curIndex + 1]);
            } else {
              return;
            }
            break;

          case "ArrowUp":
            this.open();
            if (!this.selected) {
              this.selectItem(
                this.dropdownMenuItems[this.dropdownMenuItems.length - 1]
              );
            } else if (curIndex > 0) {
              this.selectItem(this.dropdownMenuItems[curIndex - 1]);
            } else {
              return;
            }

            break;

          case "Home":
            this.selectItem(this.dropdownMenuItems[0]);
            break;

          case "End":
            this.selectItem(
              this.dropdownMenuItems[this.dropdownMenuItems.length - 1]
            );
            break;

          default:
            return;
        }
      }
    });
  }

  getSelected() {
    let selectedItem;
    this.dropdownMenuItems.forEach((item, index) => {
      if (item.getAttribute("aria-selected") === "true") {
        selectedItem = index;
      }
    });

    return selectedItem;
  }

  unselectAll() {
    this.dropdownMenuItems.forEach(dropdownMenuItem => {
      dropdownMenuItem.setAttribute("aria-selected", "false");
    });
  }

  selectItem(elem) {
    this.unselectAll();
    elem.setAttribute("aria-selected", "true");
    this.dropdownLabel.innerHTML = elem.innerHTML;
    this.selected = elem;
    this.dropdownBtn.setAttribute("aria-expanded", "true");
    this.dropdownBtn.setAttribute("aria-activedescendant", elem.id);
    this.dropdownBtn.focus();
  }

  isFocused() {
    return document.activeElement.isSameNode(this.dropdownBtn) ? true : false;
  }

  toggleOpen() {
    this.isOpen() ? this.close() : this.open();
  }

  open() {
    this.dropdown.classList.add("dropdown__open");
  }

  close() {
    this.dropdown.classList.remove("dropdown__open");
  }

  isOpen() {
    return this.dropdown.classList.contains("dropdown__open") ? true : false;
  }
}

const dropdownElem = document.querySelector(".dropdown");
const frameworkDropdown = new Dropdown(dropdownElem);
