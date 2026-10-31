/* ==========================================================================
   PINKOIL — behaviour
   Modules: topbar · reveal · parallax · taste (food view) · utilities
   Plain script (no build step, works from file:// too).
   ========================================================================== */
(function () {
  "use strict";

  var root = document.documentElement;
  root.classList.remove("no-js");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  /* ---------- Utilities ---------- */
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // ?slots → outline every [INSERT …] placeholder
  if (/[?&]slots\b/.test(location.search)) root.classList.add("show-slots");

  /* ---------- Top bar: frosted once you leave the hero ---------- */
  var topbar = document.getElementById("topbar");
  function onScrollBar() {
    topbar.classList.toggle("is-scrolled", window.scrollY > window.innerHeight * 0.6);
  }

  /* ---------- Reveal on scroll ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduceMotion.matches) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -12% 0px", threshold: 0.08 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-in"); });
  }

  /* ---------- Gentle parallax on photo frames ---------- */
  var frames = Array.prototype.slice.call(document.querySelectorAll("[data-speed]"));
  function parallax() {
    if (reduceMotion.matches) return;
    var vh = window.innerHeight;
    for (var i = 0; i < frames.length; i++) {
      var el = frames[i];
      var r = el.parentNode.getBoundingClientRect();
      if (r.bottom < -100 || r.top > vh + 100) continue;
      var offset = (r.top + r.height / 2 - vh / 2) * parseFloat(el.dataset.speed);
      el.style.transform = "translate3d(0," + offset.toFixed(1) + "px,0)";
    }
  }

  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () { onScrollBar(); parallax(); ticking = false; });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  onScroll();

  /* ---------- TASTE — food view ---------- */
  var taste = document.getElementById("taste");
  var panel = taste.querySelector(".taste__panel");
  var openBtn = document.getElementById("taste-open");
  var menuEl = document.getElementById("taste-menu");
  var lastFocus = null;
  var rendered = false;
  var closeTimer = null;

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  // Rendered on first open only — keeps food images off the initial load.
  function renderMenu() {
    if (rendered) return;
    rendered = true;
    var groups = window.PINKOIL_MENU || [];
    var i = 0;
    menuEl.innerHTML = groups.map(function (g) {
      return '<section class="taste__group">' +
        '<h3 class="taste__group-title">' + esc(g.title) + "</h3>" +
        '<ul class="taste__grid">' +
        (g.items || []).map(function (d) {
          var tag = d.tag
            ? '<span class="dish__tag' + (d.accent === "purple" ? " dish__tag--purple" : "") + '">' + esc(d.tag) + "</span>"
            : "";
          return '<li class="dish" style="--i:' + (i++) + '">' +
            '<div class="dish__img"><img src="' + esc(d.img) + '" alt="' + esc(d.alt || d.name) +
              '" width="1200" height="900" loading="lazy" decoding="async">' + tag + "</div>" +
            '<div class="dish__row"><h4 class="dish__name">' + esc(d.name) + "</h4>" +
              '<span class="dish__price">' + esc(d.price) + "</span></div>" +
            '<p class="dish__desc">' + esc(d.desc) + "</p>" +
          "</li>";
        }).join("") +
        "</ul></section>";
    }).join("");
  }

  function focusables() {
    return Array.prototype.filter.call(
      panel.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'),
      function (el) { return el.offsetParent !== null; }
    );
  }

  function openTaste(fromHash) {
    if (taste.classList.contains("is-open")) return;
    clearTimeout(closeTimer);
    renderMenu();
    lastFocus = document.activeElement;
    taste.hidden = false;
    // force layout so the transition runs from the hidden state
    void taste.offsetWidth;
    taste.classList.add("is-open");
    root.classList.add("is-locked");
    openBtn.setAttribute("aria-expanded", "true");
    panel.scrollTop = 0;
    setTimeout(function () { panel.focus({ preventScroll: true }); }, 50);
    if (!fromHash && location.hash !== "#taste") history.pushState({ taste: true }, "", "#taste");
  }

  function closeTaste(fromHash) {
    if (!taste.classList.contains("is-open")) return;
    taste.classList.remove("is-open");
    root.classList.remove("is-locked");
    openBtn.setAttribute("aria-expanded", "false");
    closeTimer = setTimeout(function () { taste.hidden = true; }, reduceMotion.matches ? 0 : 900);
    if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
    if (!fromHash && location.hash === "#taste") {
      if (history.state && history.state.taste) history.back();
      else history.replaceState(null, "", location.pathname + location.search);
    }
  }

  openBtn.addEventListener("click", function () { openTaste(false); });
  taste.addEventListener("click", function (e) {
    if (e.target.closest("[data-close]")) closeTaste(false);
  });

  document.addEventListener("keydown", function (e) {
    if (!taste.classList.contains("is-open")) return;
    if (e.key === "Escape") { e.preventDefault(); closeTaste(false); return; }
    if (e.key === "Tab") {
      var f = focusables();
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && (document.activeElement === first || document.activeElement === panel)) {
        e.preventDefault(); last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus();
      }
    }
  });

  // Back button / shared links: #taste opens the view directly
  window.addEventListener("popstate", function () {
    if (location.hash === "#taste") openTaste(true); else closeTaste(true);
  });
  if (location.hash === "#taste") openTaste(true);

  // Warm the food images in idle time after the brand page has settled
  var idle = window.requestIdleCallback || function (cb) { return setTimeout(cb, 2500); };
  window.addEventListener("load", function () {
    idle(function () {
      (window.PINKOIL_MENU || []).forEach(function (g) {
        (g.items || []).forEach(function (d) { var im = new Image(); im.decoding = "async"; im.src = d.img; });
      });
    });
  });
})();
