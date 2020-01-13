class Combobox {
  words = [];
  constructor(combobox) {
    this.combobox = combobox;
    this.comboboxListbox = combobox.querySelector(".combobox__listbox");
    this.comboboxInput = combobox.querySelector(".combobox__input-control");
    this.comboboxListboxItems = combobox.querySelectorAll(
      ".combobox__listbox-item"
    );
    this.comboboxListboxItemsArr = Array.from(this.comboboxListboxItems);
    this.addEvents();
  }

  addEvents() {
    this.comboboxListboxItems.forEach(comboboxListboxItem => {
      this.words.push(comboboxListboxItem);
    });
    this.comboboxInput.addEventListener("input", e => {
      if (e.target.value.trim().length === 0) {
        this.hide();
      } else {
        this.filterListbox(e.target.value.trim());
      }
    });
  }

  filterListbox(keyword) {
    let matches = this.words.filter(word => {
      return word.innerHTML.matches(keyword);
    });

    if (matches.length > 0) {
      this.comboboxListbox.innerHTML = `<li class="combobox__listbox-item">${matches[0].innerHTML}</li>`;
      this.show();
    }
  }

  show() {
    this.combobox.classList.add("combobox-open");
  }
  hide() {
    this.combobox.classList.remove("combobox-open");
  }
}

const comboboxElem = document.querySelector(".combobox");
const optionsArr = [
  "Internet Explorer",
  "Safari",
  "Chrome",
  "Firefox",
  "Edge",
  "Opera Browser",
  "UC Browser"
];
const combobox = new Combobox(comboboxElem);
