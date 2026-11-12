/* HVAC template behavior: mobile menu + reduced-motion-safe reveals. No dependencies. */
(function () {
  "use strict";
  var roots = document.querySelectorAll(".hv");
  if (!roots.length) return;
  roots.forEach(function (r) { r.classList.add("hv-js", "hv-js-ready"); });

  var btn = document.querySelector("[data-hv-menu]");
  var nav = document.getElementById("hv-nav");
  if (btn && nav) {
    var set = function (open) {
      btn.setAttribute("aria-expanded", String(open));
      nav.classList.toggle("is-open", open);
    };
    btn.addEventListener("click", function () { set(btn.getAttribute("aria-expanded") !== "true"); });
    nav.addEventListener("click", function (e) { if (e.target.closest("a")) set(false); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && btn.getAttribute("aria-expanded") === "true") { set(false); btn.focus(); }
    });
    document.addEventListener("click", function (e) {
      if (!e.target.closest("#hv-header")) set(false);
    });
  }

  var items = document.querySelectorAll(".hv-reveal");
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || !("IntersectionObserver" in window)) {
    items.forEach(function (el) { el.classList.add("is-in"); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
    });
  }, { threshold: 0.12 });
  items.forEach(function (el) { io.observe(el); });
})();
