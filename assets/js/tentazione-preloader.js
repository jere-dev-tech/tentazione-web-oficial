(function () {
  "use strict";

  var preloader = document.getElementById("tentazione-preloader");
  if (!preloader) return;

  var hasLoadedBefore = false;
  try {
    hasLoadedBefore = sessionStorage.getItem("tentazione-preloader-seen") === "1";
  } catch (error) {
    hasLoadedBefore = false;
  }

  var firstCycleDuration = hasLoadedBefore ? 520 : 1550;
  var fadeDuration = hasLoadedBefore ? 180 : 240;
  var startedAt = Date.now();
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
      try {
        sessionStorage.setItem("tentazione-preloader-seen", "1");
      } catch (error) {}
      unlockPage();
    }, fadeDuration);
  }

  function hideWhenReady() {
    var elapsed = Date.now() - startedAt;
    var remaining = Math.max(0, firstCycleDuration - elapsed);
    window.setTimeout(hidePreloader, remaining);
  }

  lockPage();
  if (document.readyState === "complete") {
    hideWhenReady();
  } else {
    window.addEventListener("load", hideWhenReady, { once: true });
    window.setTimeout(hidePreloader, hasLoadedBefore ? 900 : 2200);
  }
})();
