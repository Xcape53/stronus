/* ============================================================
   effects.js — parallaxowe tła sekcji i mikro-efekty
   dołożone do oryginalnego designu strony:
   - P4: macierz LED przewijana scrollem (pasek #fx-led-band, nad My skills)
   - P6: gwiezdne niebo w dwóch głębokościach (tło #edu / SimLE)
   - efekt 13: separatory-oscyloskopy (.osc-sep, reagują na mysz)
   - efekt 05: magnetyczny przycisk EMAIL ME (#magzone / #mag)
   Wszystko w jednej pętli rAF; canvasy rysują tylko przy viewporcie.
   Komentarze po polsku — konwencja jak w animacja-banner.js.
   ============================================================ */
(function () {
  "use strict";
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var vh = window.innerHeight;
  var BLUE = "#2c7ffe";

  function blueA(a) { return "rgba(44,127,254," + a + ")"; }
  function inkA(a) { return "rgba(242,243,247," + a + ")"; }

  /* ---------- pomocnicze ---------- */
  function fit(cv) {
    var d = Math.min(window.devicePixelRatio || 1, 2);
    var w = cv.clientWidth, h = cv.clientHeight;
    cv.width = w * d; cv.height = h * d;
    cv.getContext("2d").setTransform(d, 0, 0, d, 0, 0);
    return { w: w, h: h };
  }
  function prog(el) { // 0..1 gdy element przechodzi przez viewport
    var r = el.getBoundingClientRect();
    return Math.max(0, Math.min(1, (vh - r.top) / (vh + r.height)));
  }
  function near(el) {
    var r = el.getBoundingClientRect();
    return r.bottom > -80 && r.top < vh + 80;
  }

  /* ---------- P4: macierz LED (pasek nad My skills) ---------- */
  var ledBand = document.getElementById("fx-led-band");
  var led = document.getElementById("fx-led");
  var ledS = led ? fit(led) : null;
  // najmocniejsze umiejętności wg profilu (ROBOTA) i technologii z projektów
  var MSG = "PYTHON * C++ * JAVA * JAVASCRIPT * AUTOHOTKEY * GIMP * LINUX * REST API * SDR * ";
  var ROWS = 13, pix = null, msgW = 0;
  if (led) {
    var off = document.createElement("canvas"), offc = off.getContext("2d");
    offc.font = "bold 12px Consolas, monospace";
    msgW = Math.ceil(offc.measureText(MSG).width) + 40;
    off.width = msgW; off.height = ROWS;
    offc = off.getContext("2d");
    offc.font = "bold 12px Consolas, monospace";
    offc.fillStyle = "#fff"; offc.textBaseline = "middle";
    offc.fillText(MSG, 0, ROWS / 2 + 1);
    pix = offc.getImageData(0, 0, msgW, ROWS).data;
  }
  function lit(col, row) { return pix[(row * msgW + (col % msgW)) * 4 + 3] > 120; }
  function drawLED(p) {
    var c = led.getContext("2d"); c.clearRect(0, 0, ledS.w, ledS.h);
    var cell = Math.max(5, Math.floor(ledS.w / 230)); // drobne diody = niski pasek i więcej tekstu naraz
    var cols = Math.ceil(ledS.w / cell);
    var top = (ledS.h - ROWS * cell) / 2;
    var win = Math.floor(p * msgW * 0.45); // wolniejsze przewijanie napisu
    for (var r = 0; r < ROWS; r++) {
      for (var cl = 0; cl < cols; cl++) {
        var on = lit(cl + win, r);
        c.fillStyle = on ? BLUE : inkA(.06);
        c.beginPath();
        c.arc(cl * cell + cell / 2, top + r * cell + cell / 2,
          on ? cell * .34 : cell * .16, 0, 6.3);
        c.fill();
      }
    }
  }

  /* ---------- P6: gwiezdne niebo (tło #edu) ---------- */
  var sEdu = document.getElementById("edu");
  var sky = document.getElementById("fx-sky");
  var skyS = sky ? fit(sky) : null;
  var stars = [];
  for (var si = 0; si < 120; si++) stars.push({
    x: Math.random(), y: Math.random(),
    z: Math.random() < .6 ? 0 : 1, tw: Math.random() * 6
  });
  function drawSky(p, t) {
    var c = sky.getContext("2d"); c.clearRect(0, 0, skyS.w, skyS.h);
    stars.forEach(function (st) {
      var speed = st.z ? .3 : .1; // parallax: bliższe gwiazdy suną szybciej
      var y = (st.y * skyS.h + p * skyS.h * speed) % skyS.h;
      var a = .15 + .3 * Math.abs(Math.sin(t + st.tw));
      c.fillStyle = inkA(st.z ? a : a * .5);
      c.fillRect(st.x * skyS.w, y, st.z ? 2.2 : 1.3, st.z ? 2.2 : 1.3);
    });
  }

  /* ---------- efekt 13: separatory-oscyloskopy ---------- */
  var seps = [];
  document.querySelectorAll(".osc-sep").forEach(function (cv) {
    var st = { cv: cv, s: fit(cv), mx: -999 };
    cv.addEventListener("mousemove", function (e) {
      st.mx = e.clientX - cv.getBoundingClientRect().left;
    });
    cv.addEventListener("mouseleave", function () { st.mx = -999; });
    seps.push(st);
  });
  function drawSep(st, t) {
    var c = st.cv.getContext("2d");
    c.clearRect(0, 0, st.s.w, st.s.h);
    c.strokeStyle = blueA(.65); c.lineWidth = 2; c.beginPath();
    for (var x = 0; x <= st.s.w; x += 3) {
      var boost = Math.max(0, 1 - Math.abs(x - st.mx) / 130) * 30;
      var y = st.s.h / 2 + Math.sin(x * .045 + t * 3.5) * (8 + boost) +
        Math.sin(x * .012 - t * 2.4) * 5;
      x === 0 ? c.moveTo(x, y) : c.lineTo(x, y);
    }
    c.stroke();
  }

  /* ---------- efekt 05: magnetyczny EMAIL ME ---------- */
  var magzone = document.getElementById("magzone"), mag = document.getElementById("mag");
  if (magzone && mag && !reduced) {
    var magR = null; // pozycja przycisku bez transformacji, łapana przy wejściu w strefę
    magzone.addEventListener("mouseenter", function () {
      mag.style.transform = "translate(0,0)";
      magR = mag.getBoundingClientRect();
    });
    magzone.addEventListener("mousemove", function (e) {
      if (!magR) magR = mag.getBoundingClientRect();
      // odległość kursora od środka PRZYCISKU (nie strefy) — magnes ciągnie w stronę kursora
      var dx = e.clientX - (magR.left + magR.width / 2);
      var dy = e.clientY - (magR.top + magR.height / 2);
      mag.style.transition = "transform .15s ease-out";
      mag.style.transform = "translate(" + dx * .35 + "px," + dy * .35 + "px)";
    });
    magzone.addEventListener("mouseleave", function () {
      magR = null;
      mag.style.transition = "transform .45s cubic-bezier(.3,2.2,.4,.8)";
      mag.style.transform = "translate(0,0)";
    });
  }

  /* ---------- odsłanianie kart (.fx-reveal) ----------
     Zastępuje szablonowe data-animation (GSAP), które zostawiało karty
     w #projects/#online na opacity:0. Klasa fx-armed na <html> uzbraja
     stan ukryty w CSS — bez JS lub przy reduced-motion karty są po
     prostu widoczne od razu. */
  var reveals = document.querySelectorAll(".fx-reveal");
  if (reveals.length && !reduced && "IntersectionObserver" in window) {
    document.documentElement.classList.add("fx-armed");
    reveals.forEach(function (el, i) {
      el.style.transitionDelay = (i % 3) * 0.12 + "s"; // lekki stagger w rzędzie
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("is-in");
          io.unobserve(en.target);
        }
      });
    }, { rootMargin: "0px 0px -60px 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  }

  /* ---------- kafelki kontrybucji GitHuba (#gh-graph) ----------
     Pobiera ostatni rok aktywności z publicznego API i rysuje siatkę
     7xN w kolorystyce strony. Przy błędzie zostaje notka + link. */
  var ghGraph = document.getElementById("gh-graph");
  var ghTotal = document.getElementById("gh-graph-total");
  var ghDays = null;
  var GH_LEVELS = ["rgba(255,255,255,.08)", "rgba(44,127,254,.28)",
    "rgba(44,127,254,.5)", "rgba(44,127,254,.75)", "rgba(44,127,254,1)"];
  function ghRender() {
    if (!ghGraph || !ghDays || !ghGraph.clientWidth) return;
    var weeksFit = Math.max(10, Math.floor((ghGraph.clientWidth + 3) / 12));
    var cells = ghDays.slice(-weeksFit * 7);
    ghGraph.innerHTML = "";
    cells.forEach(function (c) {
      var d = document.createElement("div");
      d.className = "d";
      d.style.background = GH_LEVELS[c ? c.level : 0];
      if (c) d.title = c.date + ": " + c.count + " contributions";
      ghGraph.appendChild(d);
    });
  }
  if (ghGraph && window.fetch) {
    fetch("https://github-contributions-api.jogruber.de/v4/" +
      ghGraph.getAttribute("data-user") + "?y=last")
      .then(function (r) { return r.json(); })
      .then(function (data) {
        var days = data.contributions || [];
        if (!days.length) return;
        // dopełnij początek do niedzieli i koniec do soboty (pełne kolumny-tygodnie)
        var pre = new Date(days[0].date + "T12:00").getDay();
        var post = 6 - new Date(days[days.length - 1].date + "T12:00").getDay();
        ghDays = [];
        while (pre--) ghDays.push(null);
        ghDays = ghDays.concat(days);
        while (post--) ghDays.push(null);
        ghRender();
        if (ghTotal && data.total && data.total.lastYear !== undefined) {
          ghTotal.textContent = data.total.lastYear + " contributions in the last year";
        }
      })
      .catch(function () {
        ghGraph.innerHTML = '<p class="gh-graph-note">Could not load the graph - see the profile below.</p>';
      });
  }

  /* ---------- resize ---------- */
  window.addEventListener("resize", function () {
    vh = window.innerHeight;
    if (led) ledS = fit(led);
    if (sky) skyS = fit(sky);
    seps.forEach(function (st) { st.s = fit(st.cv); });
    ghRender();
  });

  /* ---------- pętla główna ---------- */
  var T = 0;
  function loop() {
    T += 0.016;
    if (led && near(ledBand)) drawLED(prog(ledBand));
    if (sky && near(sEdu)) drawSky(prog(sEdu), T);
    seps.forEach(function (st) { if (near(st.cv)) drawSep(st, T); });
    if (!reduced) requestAnimationFrame(loop);
  }
  loop(); // przy reduced-motion rysuje jedną statyczną klatkę
})();
