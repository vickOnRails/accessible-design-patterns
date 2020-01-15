class Lightbox {
  constructor(parent, lightbox) {
    this.parent = parent;
    this.lightbox = lightbox;
    this.images = this.parent.querySelectorAll(".lightbox__images img");
    this.imagesArr = Array.from(this.images);
    this.mainImageContainer = this.lightbox.querySelector(
      ".lightbox__img-large"
    );
    this.leftButton = this.lightbox.querySelector(".lightbox__content-left");
    this.rightButton = this.lightbox.querySelector(".lightbox__content-right");
    this.title = this.lightbox.querySelector(".lightbox__content-title");
    this.closeLightboxButton = this.lightbox.querySelector(".close__modal-btn");

    this.addEvents();
  }

  addEvents() {
    this.images.forEach(img => {
      img.addEventListener("click", e => {
        this.open(img);
      });

      this.closeLightboxButton.addEventListener("click", e => this.close());
      img.addEventListener("keydown", e => {
        switch (e.key) {
          case "Enter":
            this.open(e.target);
            break;
          case " ":
            this.open(e.target);
            break;
        }
      });
    });

    window.addEventListener("animationend", e => {
      if (e.animationName === "lighten") {
        this.parent.classList.remove("lightbox-open", "lightbox-close");
      }
    });

    this.leftButton.addEventListener("click", () => {
      this.navigateLeft();
    });

    this.rightButton.addEventListener("click", () => {
      this.navigateRight();
    });

    window.addEventListener("click", e => {
      if (this.isOpen() && e.target.classList.contains("lightbox")) {
        this.close();
      }
    });

    window.addEventListener("keydown", e => {
      let curentIndex = this.focusedImage();
      switch (e.key) {
        case "ArrowLeft":
          curentIndex === 0
            ? this.focusImage(this.images[this.images.length - 1])
            : this.focusImage(this.images[curentIndex - 1]);
          break;

        case "ArrowRight":
          curentIndex === this.images.length - 1
            ? this.focusImage(this.images[0])
            : this.focusImage(this.images[curentIndex + 1]);
          break;

        case "Escape":
          this.close();
        default:
          return;
      }
    });
  }

  navigateLeft() {
    let curentIndex = this.focusedImage();
    curentIndex === 0
      ? this.focusImage(this.images[this.images.length - 1])
      : this.focusImage(this.images[curentIndex - 1]);
  }

  navigateRight() {
    let curentIndex = this.focusedImage();
    curentIndex === this.images.length - 1
      ? this.focusImage(this.images[0])
      : this.focusImage(this.images[curentIndex + 1]);
  }

  isOpen() {
    return this.parent.classList.contains("lightbox-open") ? true : false;
  }
  open(img) {
    this.parent.classList.add("lightbox-open");
    this.focusImage(img);
    // this.title.focus();
  }

  focusImage(img) {
    this.mainImageContainer.src = img.src;
    this.title.innerHTML = img.alt;
  }

  focusedImage() {
    let image = this.imagesArr.filter((img, index) => {
      return img.src === this.mainImageContainer.src;
    });
    return this.imagesArr.indexOf(image[0]);
  }

  close() {
    this.parent.classList.add("lightbox-close");
  }
}

const lightboxElem = document.querySelector(".lightbox");
const body = document.querySelector("body");
const lightbox = new Lightbox(body, lightboxElem);
