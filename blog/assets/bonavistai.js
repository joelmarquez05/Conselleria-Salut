
function showLevel(id, btn) {
  document.querySelectorAll('#nivells .ethics-panel').forEach(function (p) { p.classList.remove('active'); });
  document.querySelectorAll('#nivells .tab-btn').forEach(function (b) { b.classList.remove('active'); });
  var panel = document.getElementById('lvl-' + id);
  if (panel) panel.classList.add('active');
  if (btn) btn.classList.add('active');
}

var votesB = { apagar: 4, avisar: 14, mantenir: 5, humans: 5 };
var ID_B = { apagar: 'B1', avisar: 'B2', mantenir: 'B3', humans: 'B4' };

function castVoteB(name, btn) {
  votesB[name] = (votesB[name] || 0) + 1;
  document.querySelectorAll('#tu .vote-btn').forEach(function (b) { b.classList.remove('voted'); });
  if (btn) btn.classList.add('voted');

  var tot = Object.values(votesB).reduce(function (a, b) { return a + b; }, 0);
  var results = document.getElementById('vResultsB');
  if (results) results.classList.add('visible');

  Object.keys(votesB).forEach(function (n) {
    var id = ID_B[n];
    var pct = tot > 0 ? Math.round(votesB[n] / tot * 100) : 0;
    var fill = document.getElementById('vb' + id);
    var pctEl = document.getElementById('vp' + id);
    if (fill) fill.style.width = pct + '%';
    if (pctEl) pctEl.textContent = pct + '%';
  });
}
