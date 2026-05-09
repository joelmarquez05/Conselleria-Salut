
(function () {
  var els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    els.forEach(function (el) { el.classList.add('visible'); });
    return;
  }
  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });
  els.forEach(function (el) { obs.observe(el); });
})();

(function () {
  var current = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  if (current === '') current = 'index.html';
  document.querySelectorAll('.nav-links a').forEach(function (a) {
    var href = (a.getAttribute('href') || '').toLowerCase();
    if (href === current) {
      a.classList.add('active');
      var dropdown = a.closest('.nav-dropdown');
      if (dropdown) {
        var toggle = dropdown.querySelector('.nav-dropdown-toggle');
        if (toggle) toggle.classList.add('active');
      }
    }
  });
})();

(function () {
  var toggles = document.querySelectorAll('.nav-dropdown-toggle');
  if (!toggles.length) return;
  toggles.forEach(function (toggle) {
    toggle.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      var expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggles.forEach(function (t) { t.setAttribute('aria-expanded', 'false'); });
      toggle.setAttribute('aria-expanded', expanded ? 'false' : 'true');
    });
  });
  document.addEventListener('click', function (e) {
    toggles.forEach(function (toggle) {
      var dropdown = toggle.closest('.nav-dropdown');
      if (dropdown && !dropdown.contains(e.target)) {
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      toggles.forEach(function (t) { t.setAttribute('aria-expanded', 'false'); });
    }
  });
})();

(function () {
  var arrow = document.querySelector('.scroll-indicator');
  if (!arrow) return;
  arrow.addEventListener('click', function (e) {
    var hash = arrow.getAttribute('href');
    if (hash && hash.charAt(0) === '#') {
      var target = document.querySelector(hash);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });
})();

(function () {
  var frames = document.querySelectorAll('.video-frame');
  frames.forEach(function (frame) {
    var btn = frame.querySelector('.video-play');
    if (!btn) return;
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      frame.classList.add('played');
      var quote = frame.querySelector('.video-quote');
      var cite = frame.querySelector('.video-cite');
      var eyebrow = frame.querySelector('.video-eyebrow');
      if (eyebrow) eyebrow.textContent = '◐ Vídeo en preparació';
      if (quote) quote.textContent = 'El vídeo encara no està disponible. L\'estem editant — el penjarem aquí mateix tan aviat com estigui llest.';
      if (cite) cite.textContent = '— Equip ConsellerIA';
    });
  });
})();

(function () {
  var nav = document.querySelector('nav');
  if (!nav) return;
  var navLinks = nav.querySelector('.nav-links');
  if (!navLinks) return;

  var btn = document.createElement('button');
  btn.className = 'nav-toggle';
  btn.type = 'button';
  btn.setAttribute('aria-label', 'Obrir menú de navegació');
  btn.setAttribute('aria-expanded', 'false');
  btn.innerHTML = '<span></span><span></span><span></span>';
  nav.appendChild(btn);

  function closeMenu() {
    if (!nav.classList.contains('nav-open')) return;
    nav.classList.remove('nav-open');
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-label', 'Obrir menú de navegació');
    nav.querySelectorAll('.nav-dropdown-toggle').forEach(function (t) {
      t.setAttribute('aria-expanded', 'false');
    });
  }

  btn.addEventListener('click', function (e) {
    e.stopPropagation();
    var isOpen = nav.classList.toggle('nav-open');
    btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    btn.setAttribute('aria-label', isOpen ? 'Tancar menú de navegació' : 'Obrir menú de navegació');
    if (!isOpen) {
      nav.querySelectorAll('.nav-dropdown-toggle').forEach(function (t) {
        t.setAttribute('aria-expanded', 'false');
      });
    }
  });

  navLinks.addEventListener('click', function (e) {
    var t = e.target;
    while (t && t !== navLinks) {
      if (t.tagName === 'A') {
        closeMenu();
        return;
      }
      t = t.parentNode;
    }
  });

  document.addEventListener('click', function (e) {
    if (!nav.contains(e.target)) closeMenu();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });
})();
