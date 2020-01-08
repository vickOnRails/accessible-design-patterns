class Listbox {
  constructor(listbox) {
    this.listbox = listbox;
    this.listboxItems = this.listbox.querySelectorAll(".listbox__item");
    this.listboxItemsArr = Array.from(this.listboxItem);
    this.addEventListeners();
  }

  addEventListeners() {
    this.listbox.addEventListener("focus", () => {
      if (!this.selected) {
        this.selectOption(this.listboxItems[0]);
      } else {
        this.selectOption(lastlyFocused);
      }
    });
  }
}

const browserList = document.querySelector("");
const browserListInstance = new Listbox(browserList);
