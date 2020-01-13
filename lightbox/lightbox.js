class Lightbox {
  constructor(parent, lightbox) {
    this.parent = parent;
    this.lightbox = lightbox;
    this.images = this.parent.querySelectorAll(".lightbox__images img");
    this.imagesArr = Array.from(this.images);
    this.mainImageContainer = this.lightbox.querySelector(
      ".lightbox__img-large"
    );

    this.addEvents();
  }

  addEvents() {
    this.images.forEach(img => {
      img.addEventListener("click", e => {
        this.open(img);
      });
    });

    window.addEventListener("click", e => {
      if (this.isOpen() && e.target.classList.contains("lightbox")) {
        this.close();
      }
    });

    window.addEventListener("keydown", e => {
      switch (e.key) {
        case "ArrowLeft":
          alert(this.focusedImage());
          this.navigateLeft();
          break;

        case "ArrowRight":
          this.navigateRight();
          break;

        case "Escape":
          this.close();
        default:
          return;
      }
    });
  }

  isOpen() {
    return this.parent.classList.contains("lightbox-open") ? true : false;
  }
  open(img) {
    this.parent.classList.add("lightbox-open");
    this.focusImage(img);
  }

  focusImage(img) {
    this.mainImageContainer.src = img.src;
  }

  focusedImage() {
    console.log(this.imagesArr, this.mainImageContainer);
    return this.imagesArr.indexOf(this.mainImageContainer);
  }

  close() {
    this.parent.classList.remove("lightbox-open");
  }
}

const lightboxElem = document.querySelector(".lightbox");
const body = document.querySelector("body");
const lightbox = new Lightbox(body, lightboxElem);
