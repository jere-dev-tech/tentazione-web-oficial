(function () {
  "use strict";

  var preloader = document.getElementById("tentazione-preloader");
  if (!preloader) return;

  var firstCycleDuration = 4200;
  var fadeDuration = 280;
  var isHidden = false;
  var activeClass = "preloader-active";

  function preventTouchScroll(event) {
    if (!isHidden) {
      event.preventDefault();
    }
  }

  function lockPage() {
    document.documentElement.classList.add(activeClass);
    document.body.classList.add(activeClass);
    document.addEventListener("touchmove", preventTouchScroll, { passive: false });
  }

  function unlockPage() {
    document.documentElement.classList.remove(activeClass);
    document.body.classList.remove(activeClass);
    document.removeEventListener("touchmove", preventTouchScroll);
  }

  function hidePreloader() {
    if (isHidden) return;
    isHidden = true;

    preloader.classList.add("is-hidden");
    window.setTimeout(function () {
      if (preloader && preloader.parentNode) {
        preloader.parentNode.removeChild(preloader);
      }
      unlockPage();
    }, fadeDuration);
  }

  lockPage();
  window.setTimeout(hidePreloader, firstCycleDuration);
})();
