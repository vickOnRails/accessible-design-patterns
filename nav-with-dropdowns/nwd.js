class DropdownNav {
  constructor(dropdownNav) {
    this.dropdownNav = dropdownNav;
    this.mainNavItems = dropdownNav.querySelectorAll(
      ".nav__list > .nav__list-item > .nav__list-link[aria-haspopup]"
    );
    this.mainNavItemsArr = Array.from(this.mainNavItems);
    this.registerEvents();
  }

  registerEvents() {
    this.mainNavItems.forEach(navItem => {
      navItem.addEventListener("click", () => {
        this.toggleMenuOpen(navItem);
      });
    });

    window.addEventListener("keydown", e => {
      if (e.target.classList.contains("nav__list-link")) {
        if (e.key === "ArrowLeft") {
          this.focusedIndex() === 0
            ? this.focus(this.mainNavItems[this.mainNavItems.length - 1])
            : this.focus(this.mainNavItems[this.focusedIndex() - 1]);
        } else if (e.key === "ArrowRight") {
          this.focusedIndex() === this.mainNavItems.length - 1
            ? this.focus(this.mainNavItems[0])
            : this.focus(this.mainNavItems[this.focusedIndex() + 1]);
        } else if (e.key === "ArrowDown") {
          e.target.nextElementSibling.querySelector(".nav__list-link").focus();
        } else if (e.key === "ArrowUp") {
        }
      }
    });
  }

  isMenuOpen() {}

  focusedIndex() {
    const focused = document.activeElement;
    return this.mainNavItemsArr.indexOf(focused);
  }

  toggleMenuOpen(elem) {
    if (elem.classList.contains("dropdown-open")) {
      elem.classList.remove("dropdown-open");
    } else {
      elem.classList.add("dropdown-open");
      elem.nextElementSibling.querySelector(".nav__list-link").focus();
    }
  }

  focus(elem) {
    elem.focus();
  }
}

const dropdownNavElem = document.querySelector(".dropdown-nav");
const dropdownNav = new DropdownNav(dropdownNavElem);
