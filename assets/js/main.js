/* Reframe — small, restrained. Nothing here is required to read the page. */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------- header hairline on scroll */
  var header = document.getElementById('site-header');
  if (header) {
    var setStuck = function () {
      header.classList.toggle('is-stuck', window.scrollY > 12);
      // the header CTA only appears on a phone once the hero one is gone
      header.classList.toggle('is-past-hero', window.scrollY > window.innerHeight * 0.6);
    };
    setStuck();
    window.addEventListener('scroll', setStuck, { passive: true });
  }

  /* ------------------------------------------------------ reveal on scroll */
  var revealables = document.querySelectorAll('.reveal');

  if (reduced || !('IntersectionObserver' in window)) {
    Array.prototype.forEach.call(revealables, function (el) {
      el.classList.add('is-in');
    });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });

    Array.prototype.forEach.call(revealables, function (el) {
      io.observe(el);
    });
  }

  /* -------------------------------------------------- before / after slider */
  Array.prototype.forEach.call(document.querySelectorAll('[data-ba]'), function (ba) {
    var range = ba.querySelector('[data-ba-range]');
    if (!range) return;

    var apply = function () {
      ba.style.setProperty('--ba-pos', range.value + '%');
    };

    range.addEventListener('input', apply);
    apply();
  });

  /* ------------------------------------------------------------------ form */
  var form = document.querySelector('[data-form]');
  if (form) {
    var status = form.querySelector('[data-form-status]');
    var button = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', function (event) {
      if (!form.checkValidity()) return; // let the browser show its own messages

      event.preventDefault();
      var original = button ? button.textContent : '';
      if (button) {
        button.disabled = true;
        button.textContent = 'Sending';
      }
      if (status) status.textContent = '';

      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(new FormData(form)).toString()
      })
        .then(function (response) {
          if (!response.ok) throw new Error(response.status);
          form.reset();
          if (status) status.textContent = 'Got it. We will come back to you shortly.';
        })
        .catch(function () {
          if (status) {
            status.textContent = 'That did not send. Email hello@wereframe.studio and we will pick it up there.';
          }
        })
        .then(function () {
          if (button) {
            button.disabled = false;
            button.textContent = original;
          }
        });
    });
  }
})();
