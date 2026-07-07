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

  /* ---------- galeria screenów (.tf__ph_gallery) ----------
     Kilka zdjęć nałożonych na siebie w tym samym boxie. Scroll myszką nad
     zdjęciem przełącza między nimi z fade in/out zamiast przewijać stronę —
     ale tylko dopóki jest gdzie przełączać; na pierwszym/ostatnim zdjęciu
     scroll w tę stronę przechodzi normalnie do przewijania strony. */
  document.querySelectorAll(".tf__ph_gallery").forEach(function (g) {
    var imgs = g.querySelectorAll("img");
    var dots = g.querySelectorAll(".tf__ph_gallery_dots span");
    if (imgs.length < 2) return;
    var idx = 0, cooling = false;
    function show(next) {
      imgs[idx].classList.remove("is-active");
      if (dots[idx]) dots[idx].classList.remove("is-active");
      idx = next;
      imgs[idx].classList.add("is-active");
      if (dots[idx]) dots[idx].classList.add("is-active");
    }
    g.addEventListener("wheel", function (e) {
      if (reduced) return;
      var next = idx + (e.deltaY > 0 ? 1 : -1);
      if (next < 0 || next >= imgs.length || cooling) return;
      e.preventDefault();
      cooling = true;
      show(next);
      setTimeout(function () { cooling = false; }, 550);
    }, { passive: false });
  });

  /* ---------- lightbox: kliknięcie na screen go powiększa ---------- */
  var lightbox = document.createElement("div");
  lightbox.id = "fx-lightbox";
  var lightboxImg = document.createElement("img");
  lightbox.appendChild(lightboxImg);
  document.body.appendChild(lightbox);
  lightbox.addEventListener("click", function () { lightbox.classList.remove("is-open"); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") lightbox.classList.remove("is-open");
  });
  document.querySelectorAll(".tf__project_hero_media img").forEach(function (img) {
    img.addEventListener("click", function () {
      lightboxImg.src = img.currentSrc || img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add("is-open");
    });
  });

  /* ---------- chmury dryfujące w tle sekcji LabInc (#p-labinc) ----------
     Kilka miękkich "kłębów" (gradienty radialne) suwających się w poziomie,
     część w lewo, część w prawo, różnymi prędkościami — pasuje do nieba
     widocznego na screenie z gry. */
  var labHero = document.getElementById("p-labinc");
  var cloudsCv = document.getElementById("fx-clouds");
  var cloudsS = cloudsCv ? fit(cloudsCv) : null;
  var clouds = [];
  for (var ci = 0; ci < 6; ci++) {
    var dir = Math.random() < 0.5 ? 1 : -1;
    clouds.push({
      x: Math.random(),
      y: 0.08 + Math.random() * 0.8,
      scale: 0.7 + Math.random() * 1.1,
      speed: dir * (0.00015 + Math.random() * 0.00035),
      a: 0.05 + Math.random() * 0.06
    });
  }
  var CLOUD_PUFFS = [[0, 0, 46], [38, 6, 34], [-36, 8, 32], [16, -14, 30], [-18, -10, 26]];
  function drawCloud(c, x, y, s, a) {
    CLOUD_PUFFS.forEach(function (pf) {
      var r = pf[2] * s, px = x + pf[0] * s, py = y + pf[1] * s;
      var grad = c.createRadialGradient(px, py, 0, px, py, r);
      grad.addColorStop(0, inkA(a));
      grad.addColorStop(1, inkA(0));
      c.fillStyle = grad;
      c.beginPath(); c.arc(px, py, r, 0, 6.3); c.fill();
    });
  }
  function drawClouds() {
    var c = cloudsCv.getContext("2d");
    c.clearRect(0, 0, cloudsS.w, cloudsS.h);
    clouds.forEach(function (cl) {
      cl.x += cl.speed;
      if (cl.x > 1.25) cl.x = -0.25;
      if (cl.x < -0.25) cl.x = 1.25;
      drawCloud(c, cl.x * cloudsS.w, cl.y * cloudsS.h, cl.scale, cl.a);
    });
  }

  /* ---------- tint ekranu przy wyróżnionych projektach ----------
     Każdy .tf__project_hero[data-tint] barwi cały viewport swoim kolorem
     (LabInc — jaśniejszy niebieski, agregator — zieleń, menedżer haseł —
     fiolet), im bliżej środka ekranu, tym mocniej. Nakładka #fx-tint
     powstaje tylko z JS-em i nie działa przy reduced-motion. */
  var heroes = [];
  document.querySelectorAll(".tf__project_hero[data-tint]").forEach(function (el) {
    heroes.push({ el: el, rgb: el.getAttribute("data-tint") });
  });
  var tint = null;
  if (heroes.length && !reduced) {
    tint = document.createElement("div");
    tint.id = "fx-tint";
    tint.setAttribute("aria-hidden", "true");
    document.body.appendChild(tint);
  }
  function drawTint() {
    var best = null, bestC = 0;
    heroes.forEach(function (h) {
      var r = h.el.getBoundingClientRect();
      var mid = r.top + r.height / 2;
      var c = 1 - Math.abs(mid - vh / 2) / (vh * 0.6); // 1 = idealnie na środku
      if (c > bestC) { bestC = c; best = h; }
    });
    if (best && bestC > 0) {
      var e = bestC * bestC * (3 - 2 * bestC); // smoothstep — łagodne wejście/zejście
      tint.style.background = "rgba(" + best.rgb + "," + (e * 0.55).toFixed(3) + ")";
    } else {
      tint.style.background = "transparent";
    }
  }

  /* ---------- ostatnie repozytoria GitHuba (#gh-repos) ----------
     Pobiera 5 ostatnio aktualizowanych repozytoriów z API GitHuba
     i buduje listę (nazwa, opis, język, data). Przy błędzie notka + link. */
  var ghRepos = document.getElementById("gh-repos");
  if (ghRepos && window.fetch) {
    fetch("https://api.github.com/users/" + ghRepos.getAttribute("data-user") +
      "/repos?sort=pushed&per_page=5")
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(function (repos) {
        if (!repos.length) return;
        ghRepos.innerHTML = "";
        repos.forEach(function (rp) {
          var a = document.createElement("a");
          a.className = "gh-repo";
          a.href = rp.html_url; a.target = "_blank"; a.rel = "noopener";
          var name = document.createElement("span");
          name.className = "gh-repo-name"; name.textContent = rp.name;
          a.appendChild(name);
          if (rp.description) {
            var desc = document.createElement("span");
            desc.className = "gh-repo-desc"; desc.textContent = rp.description;
            a.appendChild(desc);
          }
          var meta = document.createElement("span");
          meta.className = "gh-repo-meta";
          if (rp.language) {
            var lang = document.createElement("span");
            lang.className = "gh-repo-lang"; lang.textContent = rp.language;
            meta.appendChild(lang);
          }
          meta.appendChild(document.createTextNode(
            "updated " + new Date(rp.pushed_at).toLocaleDateString("en-GB",
              { day: "numeric", month: "short", year: "numeric" })));
          a.appendChild(meta);
          ghRepos.appendChild(a);
        });
      })
      .catch(function () {
        ghRepos.innerHTML = '<p class="gh-graph-note">Could not load repositories - see the profile below.</p>';
      });
  }

  /* ---------- resize ---------- */
  window.addEventListener("resize", function () {
    vh = window.innerHeight;
    if (led) ledS = fit(led);
    if (sky) skyS = fit(sky);
    if (cloudsCv) cloudsS = fit(cloudsCv);
    seps.forEach(function (st) { st.s = fit(st.cv); });
  });

  /* ---------- pętla główna ---------- */
  var T = 0;
  function loop() {
    T += 0.016;
    if (led && near(ledBand)) drawLED(prog(ledBand));
    if (cloudsCv && near(labHero)) drawClouds();
    if (tint) drawTint();
    if (sky && near(sEdu)) drawSky(prog(sEdu), T);
    seps.forEach(function (st) { if (near(st.cv)) drawSep(st, T); });
    if (!reduced) requestAnimationFrame(loop);
  }
  loop(); // przy reduced-motion rysuje jedną statyczną klatkę
})();
