class Listbox {
  selected;

  constructor(listbox) {
    this.listbox = listbox;
    this.listboxItems = this.listbox.querySelectorAll(".listbox__item");
    this.listboxItemsArr = Array.from(this.listboxItems);
    this.addEventListeners();
  }

  selectOption(elem) {
    let elemID = elem.id;
    this.unselectOptions();
    elem.setAttribute("aria-selected", "true");
    this.listbox.setAttribute("aria-activedescendant", elemID);
    this.selected = elem;
  }

  unselectOptions() {
    this.listboxItems.forEach(listboxItem => {
      listboxItem.setAttribute("aria-selected", "false");
    });
  }

  selectedIndex() {
    let index;
    this.listboxItemsArr.forEach((item, i) => {
      if (item === this.selected) {
        index = i;
      }
    });

    return index;
  }

  addEventListeners() {
    this.listbox.addEventListener("focus", () => {
      if (!this.selected) {
        this.selectOption(this.listboxItems[0]);
      } else {
        this.selectOption(this.selected);
      }
    });

    // Set click event listeners for each list item
    this.listboxItems.forEach(listboxItem => {
      listboxItem.addEventListener("click", () => {
        this.selectOption(listboxItem);
      });
    });

    document.addEventListener("keydown", e => {
      if (this.isFocused()) {
        let curIndex;
        switch (e.key) {
          case "ArrowUp":
            curIndex = this.selectedIndex();
            if (!curIndex < 1) {
              this.selectOption(this.listboxItems[curIndex - 1]);
            } else {
              return;
            }

            break;

          case "ArrowDown":
            curIndex = this.selectedIndex();
            if (curIndex < this.listboxItems.length - 1) {
              this.selectOption(this.listboxItems[curIndex + 1]);
            } else {
              return;
            }
            break;

          case "Home":
            this.selectOption(this.listboxItems[0]);
            break;

          case "End":
            this.selectOption(this.listboxItems[this.listboxItems.length - 1]);
            break;
        }
      }
    });
  }

  isFocused() {
    return document.activeElement.isSameNode(this.listbox) ? true : false;
  }
}

const browserListboxElem = document.querySelector(".listbox.browsers");
const OSSListboxElem = document.querySelector(".listbox.opensource-projects");
const OSSListbox = new Listbox(browserListboxElem);
const browserListbox = new Listbox(OSSListboxElem);
