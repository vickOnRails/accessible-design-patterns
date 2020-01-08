class Tab {
  constructor(tabElem) {
    this.tab = tabElem;
    this.tabItems = this.tab.querySelectorAll(".tab__item");
    this.tabItemsArray = Array.from(this.tabItems);
    this.tabPanelItems = this.tab.querySelectorAll(".tab__content");
    this.registerEvents();
  }

  registerEvents() {
    window.addEventListener("keydown", e => {
      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        let focusedIndex = this.getFocusedIndex();
        if (focusedIndex >= 0) {
          switch (e.key) {
            case "ArrowLeft":
              if (focusedIndex > 0) {
                this.activateTab(this.tabItems[focusedIndex - 1]);
              } else {
                this.activateTab(this.tabItems[this.tabItems.length - 1]);
              }

              break;

            case "ArrowRight":
              if (focusedIndex >= this.tabItems.length - 1) {
                this.activateTab(this.tabItems[0]);
              } else {
                this.activateTab(this.tabItems[focusedIndex + 1]);
              }
              break;

            default:
              return;
          }
        }
      }
    });

    this.tabItems.forEach(tabItem => {
      tabItem.addEventListener("click", e => {
        this.activateTab(e.target);
      });

      tabItem.addEventListener("focus", e => {
        this.activateTab(e.target);
      });
    });
  }

  getFocusedIndex() {
    return this.tabItemsArray.indexOf(document.activeElement);
  }

  deactivateAllTabs() {
    this.tabItems.forEach(tabItem => {
      tabItem.setAttribute("aria-selected", "false");
      tabItem.setAttribute("tabindex", "-1");
    });

    this.tabPanelItems.forEach(tabPanelItem => {
      tabPanelItem.classList.remove("show");
    });
  }

  activateTab(elem) {
    let associatedTab = elem.getAttribute("aria-controls");
    this.deactivateAllTabs();
    document.getElementById(associatedTab).classList.add("show");
    elem.setAttribute("aria-selected", "true");
    elem.focus();
    elem.setAttribute("tabindex", "0");
  }
}

const tabElem = document.querySelector(".tab.pricing");
const pricingTab = new Tab(tabElem);
