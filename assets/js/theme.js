/* Follows the visitor's system colour scheme. The toggle overrides it, and the
   override is remembered in this browser until it matches the system again. */
(function () {
  var root = document.documentElement;
  var media = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;

  function systemDark() { return !!(media && media.matches); }
  function isDark() {
    var t = root.getAttribute("data-theme");
    return t === "dark" || (t !== "light" && systemDark());
  }

  var stored = null;
  try { stored = localStorage.getItem("theme"); } catch (e) {}
  if (stored === "dark" || stored === "light") root.setAttribute("data-theme", stored);

  function label(btn) {
    var text = isDark() ? "Switch to light mode" : "Switch to dark mode";
    btn.setAttribute("aria-label", text);
    btn.setAttribute("title", text);
  }

  document.addEventListener("DOMContentLoaded", function () {
    var btn = document.querySelector(".theme-toggle");
    if (!btn) return;
    label(btn);
    btn.addEventListener("click", function () {
      var next = isDark() ? "light" : "dark";
      if ((next === "dark") === systemDark()) {
        /* same as the system setting: go back to following it */
        root.removeAttribute("data-theme");
        try { localStorage.removeItem("theme"); } catch (e) {}
      } else {
        root.setAttribute("data-theme", next);
        try { localStorage.setItem("theme", next); } catch (e) {}
      }
      label(btn);
    });
    if (media && media.addEventListener) media.addEventListener("change", function () { label(btn); });
  });
})();
