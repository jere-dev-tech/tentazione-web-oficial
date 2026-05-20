(function () {
  "use strict";

  var preloader = document.getElementById("tentazione-preloader");
  if (!preloader) return;

  var storage = {
    sessionSeen: "tentazione-preloader-seen",
    internalNav: "tentazione-preloader-internal-nav",
    lastFull: "tentazione-preloader-last-full",
  };
  var timings = {
    fullMin: 2400,
    fullMax: 8000,
    reducedMin: 650,
    reducedMax: 3000,
    fullCooldown: 45 * 60 * 1000,
  };
  var now = Date.now();
  var hasLoadedInSession = false;
  var isInternalNavigation = false;
  var shouldShowFull = true;

  try {
    hasLoadedInSession = sessionStorage.getItem(storage.sessionSeen) === "1";
    isInternalNavigation = sessionStorage.getItem(storage.internalNav) === "1";
    sessionStorage.removeItem(storage.internalNav);
  } catch (error) {
    hasLoadedInSession = false;
    isInternalNavigation = false;
  }

  try {
    var lastFull = parseInt(localStorage.getItem(storage.lastFull), 10);
    var shouldRefreshFullIntro = !lastFull || now - lastFull > timings.fullCooldown;
    shouldShowFull = !isInternalNavigation && (!hasLoadedInSession || shouldRefreshFullIntro);
  } catch (error) {
    shouldShowFull = !hasLoadedInSession && !isInternalNavigation;
  }

  var minimumVisibleTime = shouldShowFull ? timings.fullMin : timings.reducedMin;
  var maximumVisibleTime = shouldShowFull ? timings.fullMax : timings.reducedMax;
  var fadeDuration = shouldShowFull ? 260 : 180;
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
        sessionStorage.setItem(storage.sessionSeen, "1");
        if (shouldShowFull) {
          localStorage.setItem(storage.lastFull, String(Date.now()));
        }
      } catch (error) {}
      unlockPage();
    }, fadeDuration);
  }

  function hideWhenReady() {
    var elapsed = Date.now() - startedAt;
    var remaining = Math.max(0, minimumVisibleTime - elapsed);
    window.setTimeout(hidePreloader, remaining);
  }

  function markInternalNavigation(event) {
    var link = event.target.closest ? event.target.closest("a[href]") : null;
    if (!link || link.target && link.target !== "_self" || event.defaultPrevented) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button && event.button !== 0) return;

    var targetUrl;
    try {
      targetUrl = new URL(link.getAttribute("href"), window.location.href);
    } catch (error) {
      return;
    }

    if (targetUrl.origin !== window.location.origin) return;
    if (targetUrl.pathname === window.location.pathname && targetUrl.search === window.location.search && targetUrl.hash) return;

    try {
      sessionStorage.setItem(storage.internalNav, "1");
      sessionStorage.setItem(storage.sessionSeen, "1");
    } catch (error) {}
  }

  document.addEventListener("click", markInternalNavigation, true);
  lockPage();
  if (document.readyState === "complete") {
    hideWhenReady();
  } else {
    window.addEventListener("load", hideWhenReady, { once: true });
    window.setTimeout(hidePreloader, maximumVisibleTime);
  }
})();
