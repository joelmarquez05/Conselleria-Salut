# ConsellerIA — Blog

Blog del projecte **ConsellerIA**: anàlisi ètic i tècnic de la implantació d'intel·ligència
artificial a la Conselleria de Salut de la Generalitat de Catalunya. Exercici de l'assignatura
**TAED1** (Grau en Ciència i Enginyeria de Dades, UPC Telecom BCN).

---

## Estructura del repo

| Fitxer | Contingut | Responsable |
|--------|-----------|-------------|
| `index.html` | Landing — hero amb vídeo + carrousel de titulars + 3 cards de casos | Joel |
| `prioritzaria.html` | Cas 01 · PrioritzarIA (triatge automàtic de trasplantaments) | Biel |
| `bonavistai.html` | Cas 02 · BonavistAI (biaix algorítmic en cribratge ocular) | Joel |
| `psico-xat.html` | Cas 03 · Psico-Xat (xatbot LLM de suport psicològic) | Gerard |
| `joc-resultats.html` | Resultats del joc Reigns + enquesta prèvia | Clara / Biel |
| `conclusions.html` | Conclusions generals + codi deontològic | Breixo |
| `assets/shared.css` | Variables CSS, tipografies i components compartits | **No tocar sense avisar** |
| `assets/shared.js` | Reveal en scroll, link actiu, dropdown, smooth scroll, video play | **No tocar sense avisar** |
| `assets/prioritzaria.js` | Lògica específica del cas (toggle pacients, simulador, vote) | Biel |
| `assets/bonavistai.js` | Lògica específica del cas (tabs micro/meso/macro, vote) | Joel |
| `assets/psico-xat.js` | Lògica específica del cas (3 postures Comitè, vote) | Gerard |
| `assets/img/conselleria-logo.png` | Logo institucional (navbar + favicon) | — |
| `assets/img/senyera-bar.png` | Senyera decorativa (sticky bar superior) | — |
| `assets/img/` | Resta d'imatges, gràfics, captures | Tots |
| `assets/video/` | Vídeo del comunicat de la nova ConsellerIA (pendent) | Joel |
| `vercel.json` | Configuració de hosting (URLs netes) | — |

> El reparto és una proposta — confirmeu-lo al grup abans de començar.

---

## Treballar localment

Necessitem un servidor HTTP perquè els `<link>` i `<script>` relatius funcionin correctament. Des de l'arrel del repo:

```powershell
python -m http.server 8000
```

Després obre [http://localhost:8000](http://localhost:8000) al navegador. També pots fer servir l'extensió **Live Server** de VS Code si prefereixes recàrrega automàtica.

---

## Estil visual: «Editorial Mèdic»

Aspecte general inspirat en revistes mèdiques editorials (NYT Health, JAMA), basat en la paleta i la identitat visual del logo institucional:

- **Fons** blanc (`#ffffff`).
- **Accent principal**: vermell CatSalut (`#c8102e`). Usat en links, eyebrows, top-borders de cards, scroll indicator, video play i tot el branding.
- **Accent secundari**: blau mèdic (`#0284c7`) — ús puntual.
- **Titulars** en serif elegant (`Lora` 600/700).
- **Cos** en sans neutra (`Inter`).
- **Mono** per a dades i etiquetes (`IBM Plex Mono`).
- **Logo** institucional al navbar a dalt-esquerra (a `assets/img/conselleria-logo.png`).

Tots els tokens viuen a `assets/shared.css` (`:root`). **No els sobrescriviu** dins de cap pàgina concreta.

---

## Convencions

- **Llengua**: tot en català. Cites tècniques en anglès o llatí es mantenen amb cursiva (`<em>`).
- **Estructura HTML**: cada pàgina segueix `<nav> + <header class="hero"> + <main class="container"><section class="reveal">…</section>…</main> + <footer>`.
- **Cursiva en títols**: `<em>` dins d'`<h1>` o `<h2>` queda automàticament en color vermell italic.
- **Notes internes** del projecte (paper, statement, guió, style guide…) viuen a `referencia/` i estan gitignored — no apareixeran al repo públic.

---

## Workflow git (proposta)

Mentre el repo és local, treballeu directament a `master`. Quan s'afegeixi un remote:

- Branca per persona: `feat/joel`, `feat/gerard`, `feat/clara`, etc.
- Pull request a `master` (o `main`) per fer review creuada.
- Eviteu modificar el fitxer d'un altre membre sense comentar-ho abans.

---

## Estat del desplegament

- **Repo**: local. Encara sense remote.
- **Vercel**: `vercel.json` ja preparat. Quan vulgueu desplegar:
  1. Pujar el repo a GitHub.
  2. Connectar el repo a Vercel (auto-detect, sense configuració extra).
  3. La URL quedarà com `<repo>.vercel.app`.

---

## Pendents coneguts

- [ ] **Vídeo del hero**: posar el fitxer a `assets/video/consellera.mp4` (i opcionalment `assets/video/poster.jpg`). Mentrestant, el placeholder mostra la cita del guió i un play que diu "encara no disponible" en clicar-lo.
- [ ] **`joc-resultats.html`**: omplir amb contingut del paper §3.1 (resultats joc, ~82 partides) i §3.2 (enquesta, 28 respostes). Afegir gràfics `assets/img/torns.jpg`, `motius.jpg`, `mitjana.jpg`.
- [ ] **`conclusions.html`**: omplir amb codi deontològic, conclusions generals i comparativa pre/post-debat (Breixo).
- [x] ~~**`prioritzaria_blog.html` és inconsistent**~~ — fet: renomenat a `prioritzaria.html` i migrat a la nova estètica (vermell CatSalut + Lora/Inter/IBM Plex Mono), preservant la interactivitat (toggle pacients, simulador de pesos, pestanyes ètiques, votació, conclusions editables).
- [x] ~~Omplir contingut dels casos pràctics~~ — fet per `bonavistai.html` (paper §2.2) i `psico-xat.html` (guió Cas 4, ja que el paper §2.3 està buit). Falten les pàgines del joc i de les conclusions.
