
function toggleP(card) {
  var wasActive = card.classList.contains('active');
  document.querySelectorAll('.patient-card').forEach(function (c) { c.classList.remove('active'); });
  if (!wasActive) card.classList.add('active');
}

var pts = {
  Joan: { r: 87, e: 67, g: 40 },
  Said: { r: 80, e: 33, g: 60 },
  Eva: { r: 60, e: 100, g: 90 },
  Andreu: { r: 72, e: 83, g: 45 }
};
var IDS = { Joan: 'J', Said: 'S', Eva: 'E', Andreu: 'A' };

function calcW() {
  var wR = +document.getElementById('wR').value;
  var wE = +document.getElementById('wE').value;
  var wG = +document.getElementById('wG').value;
  document.getElementById('vR').textContent = wR;
  document.getElementById('vE').textContent = wE;
  document.getElementById('vG').textContent = wG;

  var tot = wR + wE + wG || 1;
  var sc = {};
  Object.keys(pts).forEach(function (n) {
    sc[n] = Math.round((wR * pts[n].r + wE * pts[n].e + wG * pts[n].g) / tot);
  });
  var mx = Math.max.apply(null, Object.values(sc));

  Object.keys(sc).forEach(function (n) {
    var id = IDS[n];
    document.getElementById('b' + id).style.width = Math.round(sc[n] / mx * 100) + '%';
    document.getElementById('s' + id).textContent = sc[n];
  });

  var sorted = Object.keys(sc).sort(function (a, b) { return sc[b] - sc[a]; });
  document.getElementById('winnerTxt').textContent =
    sorted.slice(0, 3).join(' · ') + '  (exclou: ' + sorted[3] + ')';
}

var votes = { Joan: 8, Said: 3, Eva: 22, Andreu: 41 };

function castVote(name, btn) {
  votes[name] = (votes[name] || 0) + 1;
  document.querySelectorAll('.vote-btn').forEach(function (b) { b.classList.remove('voted'); });
  if (btn) btn.classList.add('voted');

  var tot = Object.values(votes).reduce(function (a, b) { return a + b; }, 0);
  var results = document.getElementById('vResults');
  if (results) results.classList.add('visible');

  Object.keys(votes).forEach(function (n) {
    var id = IDS[n];
    var pct = tot > 0 ? Math.round(votes[n] / tot * 100) : 0;
    var fill = document.getElementById('vb' + id);
    var pctEl = document.getElementById('vp' + id);
    if (fill) fill.style.width = pct + '%';
    if (pctEl) pctEl.textContent = pct + '%';
  });
}

(function () {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', calcW);
  } else {
    calcW();
  }
})();
