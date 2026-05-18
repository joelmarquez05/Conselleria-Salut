
(function () {
  var sN = document.getElementById('s-cribratges');
  var sP = document.getElementById('s-asiatics');
  if (!sN || !sP) return;
  var vN = document.getElementById('s-cribratges-v');
  var vP = document.getElementById('s-asiatics-v');
  var oFnEur = document.getElementById('o-fn-eur');
  var oFnAsi = document.getElementById('o-fn-asi');
  var oExc = document.getElementById('o-excedent');
  var oExcLi = document.getElementById('o-excedent-li');

  var fmt = new Intl.NumberFormat('ca-ES');

  function update() {
    var T = parseInt(sN.value, 10);
    var p = parseInt(sP.value, 10);
    var nAsi = T * p / 100;
    var nEur = T - nAsi;
    var fnEur = nEur * 0.06;
    var fnAsi = nAsi * 0.21;
    var exc = nAsi * 0.15;
    vN.textContent = fmt.format(T);
    vP.textContent = p + '%';
    oFnEur.textContent = fmt.format(Math.round(fnEur));
    oFnAsi.textContent = fmt.format(Math.round(fnAsi));
    oExc.textContent = fmt.format(Math.round(exc));
    if (oExcLi) oExcLi.textContent = fmt.format(Math.round(exc));
  }

  sN.addEventListener('input', update);
  sP.addEventListener('input', update);
  update();
})();

(function () {
  var stage = document.getElementById('quiz-stage');
  if (!stage) return;

  var preguntes = [
    {
      q: 'Has revisat 38 cribratges aquest matí. La IA marca el 39è com a normal. La pacient no es queixa de res.',
      a: [
        { t: 'Tanco el cas i passo al següent', v: 0 },
        { t: 'Reviso jo mateix la imatge igualment', v: 1 }
      ]
    },
    {
      q: 'El sistema marca un cas com a "sense retinopatia". La pacient pertany a un grup del qual saps que la precisió documentada és més baixa.',
      a: [
        { t: 'Confio en la IA, és estadística', v: 0 },
        { t: 'Demano una segona lectura específica', v: 1 }
      ]
    },
    {
      q: 'La IA et dóna un diagnòstic que coincideix exactament amb la teva primera impressió. Et sents legitimat.',
      a: [
        { t: 'Quan coincidim, ja no cal revisar', v: 0 },
        { t: 'Reviso encara que coincidim', v: 1 }
      ]
    },
    {
      q: 'Final del torn. Has fet més de 50 cribratges i et queden 8 més. Estàs cansat.',
      a: [
        { t: 'Acceleraré confiant més en la IA', v: 0 },
        { t: 'Mantinc el mateix nivell de revisió', v: 1 }
      ]
    }
  ];

  var step = 0;
  var score = 0;

  function paint() {
    if (step >= preguntes.length) return paintResult();
    var p = preguntes[step];
    stage.innerHTML = '';
    var prog = document.createElement('div');
    prog.className = 'quiz-prog';
    prog.textContent = 'Pregunta ' + (step + 1) + ' de ' + preguntes.length;
    stage.appendChild(prog);
    var qEl = document.createElement('div');
    qEl.className = 'quiz-question';
    qEl.textContent = p.q;
    stage.appendChild(qEl);
    var grid = document.createElement('div');
    grid.className = 'quiz-options';
    p.a.forEach(function (op) {
      var btn = document.createElement('button');
      btn.className = 'vote-btn';
      btn.textContent = op.t;
      btn.addEventListener('click', function () {
        score += op.v;
        step++;
        paint();
      });
      grid.appendChild(btn);
    });
    stage.appendChild(grid);
  }

  function paintResult() {
    var pct = Math.round(score / preguntes.length * 100);
    var msg, color;
    if (score === 4) {
      msg = 'Phronesis impecable. No has delegat ni un cas. Però compte, perquè aquesta és la mirada freda d\'un test, no l\'aclaparament real d\'un CAP saturat.';
      color = '#16a34a';
    } else if (score === 3) {
      msg = 'Tens consciència del biaix. Encara hi ha una situació on hi has caigut. La fatiga i la confiança son més fàcils del que sembla.';
      color = '#16a34a';
    } else if (score === 2) {
      msg = 'Estàs al mig. La meitat dels casos els has tancat sense revisar la IA. Si això passa al CAP, la supervisió humana es torna una signatura per inèrcia.';
      color = '#d97706';
    } else if (score === 1) {
      msg = 'Has caigut tres vegades en el biaix d\'automatització. La màquina passa a ser l\'autoritat de fet, encara que formalment tu signis. Aquí és on apareixen casos com el d\'en Li.';
      color = '#b91c1c';
    } else {
      msg = 'Confiança total en la IA. Si això es traduís al CAP, els errors sistemàtics no es detectarien fins a la consulta especialitzada. Quan arribessin, ja seria tard.';
      color = '#b91c1c';
    }
    stage.innerHTML = '';
    var resWrap = document.createElement('div');
    resWrap.className = 'quiz-result';
    var sBig = document.createElement('div');
    sBig.className = 'quiz-score';
    sBig.style.color = color;
    sBig.textContent = score + ' / ' + preguntes.length;
    var sLabel = document.createElement('div');
    sLabel.className = 'quiz-score-label';
    sLabel.textContent = 'Índex de prudència clínica · ' + pct + '%';
    var msgEl = document.createElement('div');
    msgEl.className = 'quiz-msg';
    msgEl.textContent = msg;
    var retry = document.createElement('button');
    retry.className = 'cta-btn';
    retry.textContent = '↻ Tornar a intentar-ho';
    retry.style.marginTop = '1.25rem';
    retry.addEventListener('click', function () {
      score = 0;
      step = 0;
      paint();
    });
    resWrap.appendChild(sBig);
    resWrap.appendChild(sLabel);
    resWrap.appendChild(msgEl);
    resWrap.appendChild(retry);
    stage.appendChild(resWrap);
  }

  paint();
})();

(function () {
  var sCribr = document.getElementById('p-cribratges');
  var sCicles = document.getElementById('p-cicles');
  if (!sCribr || !sCicles) return;
  var vCribr = document.getElementById('p-cribratges-v');
  var vCicles = document.getElementById('p-cicles-v');
  var oOper = document.getElementById('p-oper');
  var oRetr = document.getElementById('p-retr');
  var oTot = document.getElementById('p-tot');
  var oEquiv = document.getElementById('p-equiv');

  var fmt = new Intl.NumberFormat('ca-ES');

  function update() {
    var T = parseInt(sCribr.value, 10);
    var c = parseInt(sCicles.value, 10);
    var oper = T * 0.001 * 1.8;
    var retr = c * 10000;
    var tot = oper + retr;
    var dutxes = Math.round(tot / 60);
    vCribr.textContent = fmt.format(T);
    vCicles.textContent = c;
    oOper.textContent = fmt.format(Math.round(oper)) + ' L';
    oRetr.textContent = fmt.format(Math.round(retr)) + ' L';
    oTot.textContent = fmt.format(Math.round(tot)) + ' L';
    oEquiv.textContent = fmt.format(dutxes) + ' dutxes de 5 min';
  }

  sCribr.addEventListener('input', update);
  sCicles.addEventListener('input', update);
  update();
})();

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
