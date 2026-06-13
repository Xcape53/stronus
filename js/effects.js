/* ============================================================
   effects.js - parallaxowe tła sekcji i mikro-efekty
   dołożone do oryginalnego designu strony:
   - P6: gwiezdne niebo w dwóch głębokościach (tło #edu / SimLE)
   - efekt 13: separatory-oscyloskopy (.osc-sep, reagują na mysz)
   - efekt 05: magnetyczny przycisk EMAIL ME (#magzone / #mag)
   Wszystko w jednej pętli rAF; canvasy rysują tylko przy viewporcie.
   Komentarze po polsku - konwencja jak w animacja-banner.js.
   ============================================================ */
(function () {
  "use strict";
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var vh = window.innerHeight;

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
  // aproksymacja Fouriera fali prostokątnej z 4 harmonicznych (1,3,5,7),
  // znormalizowana do amplitudy ~1 jak czysty sinus
  var SQUARE_HARMONICS = [1, 3, 5, 7];
  function fourierSquare(phase) {
    var sum = 0;
    for (var i = 0; i < SQUARE_HARMONICS.length; i++) {
      var k = SQUARE_HARMONICS[i];
      sum += Math.sin(k * phase) / k;
    }
    return sum * (4 / Math.PI);
  }
  function drawSep(st, t) {
    var c = st.cv.getContext("2d");
    c.clearRect(0, 0, st.s.w, st.s.h);
    c.strokeStyle = blueA(.65); c.lineWidth = 2; c.beginPath();
    for (var x = 0; x <= st.s.w; x += 3) {
      var mix = Math.max(0, 1 - Math.abs(x - st.mx) / 130); // 0 z dala od myszki, 1 tuż przy niej
      var phase = x * .045 + t * 3.5;
      var wave = Math.sin(phase) * (1 - mix) + fourierSquare(phase) * mix;
      var y = st.s.h / 2 + wave * (8 + mix * 22);
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
      // odległość kursora od środka PRZYCISKU (nie strefy) - magnes ciągnie w stronę kursora
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
     stan ukryty w CSS - bez JS lub przy reduced-motion karty są po
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
     Kilka zdjęć nałożonych na siebie w tym samym boxie o stałej,
     znormalizowanej wysokości (CSS). Szerokość boxu dopasowuje się co
     zdjęcie do jego naturalnych proporcji - bez czarnych pasów i bez
     przycinania. Scroll myszką nad zdjęciem przełącza między nimi z
     fade in/out zamiast przewijać stronę - ale tylko dopóki jest gdzie
     przełączać; na pierwszym/ostatnim zdjęciu scroll w tę stronę
     przechodzi normalnie do przewijania strony. */
  function sizeGalleryTo(g, img) {
    if (!img.naturalWidth || g.classList.contains("tf__ph_gallery--fixed")) return; // box ma stały rozmiar z CSS, bez przeliczeń
    if (g.classList.contains("tf__ph_gallery--fit-h")) {
      // szerokość stała (do granicy tekstu), zmienia się wysokość
      g.style.height = Math.round((img.naturalHeight / img.naturalWidth) * g.clientWidth) + "px";
    } else {
      // wysokość stała, zmienia się szerokość
      var w = (img.naturalWidth / img.naturalHeight) * g.clientHeight;
      if (g.classList.contains("tf__ph_gallery--wide")) w *= 1.16; // trochę szerzej niż naturalne proporcje - dół się przycina (object-position: top)
      g.style.width = Math.round(w) + "px";
    }
  }
  document.querySelectorAll(".tf__ph_gallery").forEach(function (g) {
    var imgs = g.querySelectorAll("img");
    var dots = g.querySelectorAll(".tf__ph_gallery_dots span");
    function applySize(img) {
      if (img.complete && img.naturalWidth) sizeGalleryTo(g, img);
      else img.addEventListener("load", function () { sizeGalleryTo(g, img); }, { once: true });
    }
    applySize(imgs[0]);
    if (imgs.length < 2) return;
    var idx = 0, cooling = false;
    function show(next) {
      imgs[idx].classList.remove("is-active");
      if (dots[idx]) dots[idx].classList.remove("is-active");
      idx = next;
      imgs[idx].classList.add("is-active");
      if (dots[idx]) dots[idx].classList.add("is-active");
      applySize(imgs[idx]);
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

    // Galeria "--fixed" (karta usługi Electronics) siedzi w gridzie usług -
    // nikt nie scrolluje myszką nad małą miniaturką, więc bez auto-cyklu
    // widać tylko pierwsze zdjęcie. Przełącza się sama, w pętli.
    if (g.classList.contains("tf__ph_gallery--fixed") && !reduced) {
      setInterval(function () {
        if (!near(g)) return;
        show((idx + 1) % imgs.length);
      }, 3200);
    }
  });

  /* ---------- lightbox: pełna galeria ze strzałkami i gestem przesunięcia ---------- */
  var lightbox = document.createElement("div");
  lightbox.id = "fx-lightbox";
  lightbox.setAttribute("role", "dialog");
  lightbox.setAttribute("aria-modal", "true");
  lightbox.setAttribute("aria-hidden", "true");
  var lightboxStage = document.createElement("div");
  lightboxStage.className = "fx-lightbox_stage";
  var lightboxImg = document.createElement("img");
  var lightboxClose = document.createElement("button");
  lightboxClose.className = "fx-lightbox_close";
  lightboxClose.type = "button";
  lightboxClose.innerHTML = "&times;";
  var lightboxPrev = document.createElement("button");
  lightboxPrev.className = "fx-lightbox_nav fx-lightbox_prev";
  lightboxPrev.type = "button";
  var lightboxNext = document.createElement("button");
  lightboxNext.className = "fx-lightbox_nav fx-lightbox_next";
  lightboxNext.type = "button";
  var lightboxCounter = document.createElement("span");
  lightboxCounter.className = "fx-lightbox_counter";
  lightboxStage.appendChild(lightboxImg);
  lightbox.appendChild(lightboxStage);
  lightbox.appendChild(lightboxClose);
  lightbox.appendChild(lightboxPrev);
  lightbox.appendChild(lightboxNext);
  lightbox.appendChild(lightboxCounter);
  document.body.appendChild(lightbox);

  var lightboxImages = [];
  var lightboxIndex = 0;
  var touchStartX = null;

  function updateLightboxLabels() {
    var polish = document.documentElement.lang === "pl";
    lightbox.setAttribute("aria-label", polish ? "Podgląd galerii" : "Gallery preview");
    lightboxClose.setAttribute("aria-label", polish ? "Zamknij podgląd" : "Close preview");
    lightboxPrev.setAttribute("aria-label", polish ? "Poprzednie zdjęcie" : "Previous image");
    lightboxNext.setAttribute("aria-label", polish ? "Następne zdjęcie" : "Next image");
  }

  function renderLightbox() {
    var img = lightboxImages[lightboxIndex];
    if (!img) return;
    lightboxImg.src = img.currentSrc || img.src;
    lightboxImg.alt = img.alt;
    var hasGallery = lightboxImages.length > 1;
    lightbox.classList.toggle("has-gallery", hasGallery);
    lightboxCounter.textContent = hasGallery
      ? (lightboxIndex + 1) + " / " + lightboxImages.length
      : "";
  }

  function closeLightbox() {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("fx-lightbox-open");
  }

  function moveLightbox(step) {
    if (lightboxImages.length < 2) return;
    lightboxIndex = (lightboxIndex + step + lightboxImages.length) % lightboxImages.length;
    renderLightbox();
  }

  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox || e.target === lightboxStage) closeLightbox();
  });
  lightboxClose.addEventListener("click", closeLightbox);
  lightboxPrev.addEventListener("click", function () { moveLightbox(-1); });
  lightboxNext.addEventListener("click", function () { moveLightbox(1); });
  document.addEventListener("keydown", function (e) {
    if (!lightbox.classList.contains("is-open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") moveLightbox(-1);
    if (e.key === "ArrowRight") moveLightbox(1);
  });
  lightboxStage.addEventListener("touchstart", function (e) {
    touchStartX = e.changedTouches[0].clientX;
  }, { passive: true });
  lightboxStage.addEventListener("touchend", function (e) {
    if (touchStartX === null) return;
    var distance = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(distance) > 45) moveLightbox(distance > 0 ? -1 : 1);
    touchStartX = null;
  }, { passive: true });

  updateLightboxLabels();
  new MutationObserver(updateLightboxLabels).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["lang"]
  });

  document.querySelectorAll(".tf__project_hero_media img").forEach(function (img) {
    img.addEventListener("click", function () {
      var gallery = img.closest(".tf__ph_gallery");
      lightboxImages = gallery
        ? Array.prototype.slice.call(gallery.querySelectorAll("img"))
        : [img];
      lightboxIndex = Math.max(0, lightboxImages.indexOf(img));
      renderLightbox();
      lightbox.classList.add("is-open");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.classList.add("fx-lightbox-open");
      lightboxClose.focus();
    });
  });

  /* ---------- chmury dryfujące w tle sekcji LabInc (#p-labinc) ----------
     Kilka miękkich "kłębów" (gradienty radialne) suwających się w poziomie,
     część w lewo, część w prawo, różnymi prędkościami - pasuje do nieba
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

  /* ---------- glow wokół screenów wyróżnionych projektów ----------
     Zamiast tintu na cały viewport (za mocno "pływał" kolorem przy
     scrollu) - stały, lokalny box-shadow w kolorze data-tint dookoła
     .tf__project_hero_media danej sekcji, ustawiany raz przez CSS var. */
  document.querySelectorAll(".tf__project_hero[data-tint]").forEach(function (el) {
    el.style.setProperty("--tint-rgb", el.getAttribute("data-tint"));
  });

  /* ---------- resize ---------- */
  window.addEventListener("resize", function () {
    vh = window.innerHeight;
    if (sky) skyS = fit(sky);
    if (cloudsCv) cloudsS = fit(cloudsCv);
    seps.forEach(function (st) { st.s = fit(st.cv); });
  });

  /* ---------- pętla główna ---------- */
  var T = 0;
  function loop() {
    T += 0.016;
    if (cloudsCv && near(labHero)) drawClouds();
    if (sky && near(sEdu)) drawSky(prog(sEdu), T);
    seps.forEach(function (st) { if (near(st.cv)) drawSep(st, T); });
    if (!reduced) requestAnimationFrame(loop);
  }
  loop(); // przy reduced-motion rysuje jedną statyczną klatkę
})();
