(function() {
  const smallAlertBtn = document.querySelector(".js-small__alert-btn");
  const largeAlertBtn = document.querySelector(".js-large__alert-btn");
  const largeAlert = document.querySelector(".js-alert.large--alert");
  const smallAlert = document.querySelector(".js-alert.small--alert");
  const closeAlertBtn = document.querySelector(".close__alert");
  const DURATION = 2000;

  largeAlert.style.maxHeight = "0px";

  smallAlertBtn.addEventListener("click", () => {
    smallAlert.classList.add("show");
    setTimeout(() => {
      smallAlert.classList.add("hide");
    }, DURATION);
  });

  smallAlert.addEventListener("animationend", e => {
    e.animationName === "fadeUp"
      ? smallAlert.classList.remove("show", "hide")
      : null;
  });

  largeAlertBtn.addEventListener("click", () => {
    largeAlert.classList.add("show");

    largeAlert.style.maxHeight = `${largeAlert.scrollHeight}px`;
  });

  closeAlertBtn.addEventListener("click", e => {
    largeAlert.style.maxHeight = "0px";
  });
})();
