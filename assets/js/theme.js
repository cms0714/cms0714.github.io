/* Light by default; the choice made with the toggle is remembered in this browser. */
(function () {
  var root = document.documentElement;
  var stored = null;
  try { stored = localStorage.getItem("theme"); } catch (e) {}
  if (stored === "dark") root.setAttribute("data-theme", "dark");

  function isDark() { return root.getAttribute("data-theme") === "dark"; }
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
      if (next === "dark") root.setAttribute("data-theme", "dark");
      else root.removeAttribute("data-theme");
      try { localStorage.setItem("theme", next); } catch (e) {}
      label(btn);
    });
  });
})();
