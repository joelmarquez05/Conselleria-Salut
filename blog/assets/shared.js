
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
  var path = (location.pathname.split('/').pop() || '').toLowerCase();
  var current = path.replace(/\.html$/, '') || 'index';
  document.querySelectorAll('.nav-links a').forEach(function (a) {
    var href = (a.getAttribute('href') || '').toLowerCase().replace(/\.html$/, '');
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
      var youtubeId = frame.dataset.youtube;
      if (youtubeId) {
        var iframe = document.createElement('iframe');
        iframe.src = 'https://www.youtube-nocookie.com/embed/' + youtubeId + '?autoplay=1&rel=0&modestbranding=1&playsinline=1&iv_load_policy=3';
        iframe.title = 'Comunicat oficial · ConsellerIA';
        iframe.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
        iframe.setAttribute('allowfullscreen', '');
        iframe.loading = 'lazy';
        var poster = frame.querySelector('.video-poster');
        if (poster) poster.replaceWith(iframe);
        frame.classList.add('played');
        return;
      }
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
  var img = document.querySelector('.nav-logo img');
  if (!img) return;
  var desktopSrc = img.getAttribute('src');
  if (!desktopSrc || desktopSrc.indexOf('conselleria-logo.png') === -1) return;
  var mobileSrc = desktopSrc.replace('conselleria-logo.png', 'conselleria-logo-mobile.png');
  var preload = new Image();
  preload.src = mobileSrc;
  var mql = window.matchMedia('(max-width: 760px)');
  function swap(e) { img.src = e.matches ? mobileSrc : desktopSrc; }
  swap(mql);
  if (mql.addEventListener) mql.addEventListener('change', swap);
  else if (mql.addListener) mql.addListener(swap);
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

(function () {
  var conn = navigator.connection;
  if (conn && (conn.saveData || /2g/.test(conn.effectiveType || ''))) return;
  var prefetched = {};
  function prefetch(href) {
    if (!href || prefetched[href]) return;
    prefetched[href] = true;
    var link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = href;
    link.as = 'document';
    document.head.appendChild(link);
  }
  function harvest() {
    document.querySelectorAll('.nav-links a[href], .card-link[href]').forEach(function (a) {
      var url;
      try { url = new URL(a.href, location.href); } catch (_) { return; }
      if (url.origin !== location.origin) return;
      if (url.pathname === location.pathname) return;
      prefetch(url.pathname + url.search);
    });
  }
  var schedule = window.requestIdleCallback || function (cb) { return setTimeout(cb, 600); };
  schedule(harvest, { timeout: 2000 });
  document.addEventListener('mouseover', function (e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a) return;
    var url;
    try { url = new URL(a.href, location.href); } catch (_) { return; }
    if (url.origin !== location.origin) return;
    if (url.pathname === location.pathname) return;
    prefetch(url.pathname + url.search);
  }, { passive: true });
  document.addEventListener('touchstart', function (e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a) return;
    var url;
    try { url = new URL(a.href, location.href); } catch (_) { return; }
    if (url.origin !== location.origin) return;
    if (url.pathname === location.pathname) return;
    prefetch(url.pathname + url.search);
  }, { passive: true });
})();

(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) return;
  document.addEventListener('click', function (e) {
    if (e.defaultPrevented) return;
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var a = e.target.closest && e.target.closest('a');
    if (!a) return;
    var href = a.getAttribute('href');
    if (!href) return;
    if (a.target && a.target !== '_self') return;
    if (a.hasAttribute('download')) return;
    if (/^(mailto:|tel:|javascript:|#)/i.test(href)) return;
    var url;
    try { url = new URL(a.href, location.href); } catch (_) { return; }
    if (url.origin !== location.origin) return;
    if (url.pathname === location.pathname && url.search === location.search) return;
    e.preventDefault();
    document.body.classList.add('page-leaving');
    setTimeout(function () { location.href = a.href; }, 170);
  });
  window.addEventListener('pageshow', function (e) {
    if (e.persisted) document.body.classList.remove('page-leaving');
  });
})();
