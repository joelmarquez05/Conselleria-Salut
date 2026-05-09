
function showStance(id, btn) {
  document.querySelectorAll('#bioetica .ethics-panel').forEach(function (p) { p.classList.remove('active'); });
  document.querySelectorAll('#bioetica .tab-btn').forEach(function (b) { b.classList.remove('active'); });
  var panel = document.getElementById('st-' + id);
  if (panel) panel.classList.add('active');
  if (btn) btn.classList.add('active');
}

var votesP = { apagada: 6, fre: 16, consentiment: 6 };
var ID_P = { apagada: 'P1', fre: 'P2', consentiment: 'P3' };

function castVoteP(name, btn) {
  votesP[name] = (votesP[name] || 0) + 1;
  document.querySelectorAll('#tu .vote-btn').forEach(function (b) { b.classList.remove('voted'); });
  if (btn) btn.classList.add('voted');

  var tot = Object.values(votesP).reduce(function (a, b) { return a + b; }, 0);
  var results = document.getElementById('vResultsP');
  if (results) results.classList.add('visible');

  Object.keys(votesP).forEach(function (n) {
    var id = ID_P[n];
    var pct = tot > 0 ? Math.round(votesP[n] / tot * 100) : 0;
    var fill = document.getElementById('vb' + id);
    var pctEl = document.getElementById('vp' + id);
    if (fill) fill.style.width = pct + '%';
    if (pctEl) pctEl.textContent = pct + '%';
  });
}
