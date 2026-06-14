(() => {
  "use strict";

  const STORAGE_KEY = "xcape-language";

  const translations = {
    en: {
      "nav.home": "Home",
      "nav.projects": "Projects",
      "nav.contact": "Contact",
      "banner.hello": "Hello I'm Piotr Jeleniewicz",
      "banner.title": "ENGINEERING STUDENT BASED IN POLAND",
      "banner.lead": "As a passionate engineering student interested in technology and electronics, I thrive on learning new things and developing my technical skills.",
      "banner.download": "Download CV <i class=\"isti-download\"></i>",
      "banner.github": "<i class=\"fab fa-github\"></i>My GitHub",
      "about.kicker": "About Me",
      "about.title": "A Visual Journey through my Portfolio",
      "about.lead": "I am an engineering student interested in technology and electronics. I like to learn new things and develop my technical skills. I have experience in design and programming. I am active, committed, and able to work under time pressure. I quickly absorb new information.",
      "service.kicker": "Core Strengths",
      "service.title": "From Circuits to Code",
      "service.electronics.title": "Electronics and Simulations",
      "service.electronics.text": "Practical knowledge of electronic components and measuring instruments, confirmed through laboratory work. Experience with circuit design and simulation tools: Micro-Cap, LTspice, Falstad, EAGLE and Vivado, plus foundations of control theory, system analysis, simulation and modeling.",
      "service.programming.title": "Programming and Engineering Fundamentals",
      "service.programming.text": "Experience in C++ and JavaScript, gained through practical technical projects. Strong foundations in mathematics and physics that support engineering problem-solving.",
      "service.tools.title": "IT Tools and Systems",
      "service.tools.text": "Task automation with AutoHotkey, everyday work in Visual Studio Code, management of VMware and VirtualBox virtual machines, and operating-system configuration.",
      "skills.kicker": "My Skills",
      "skills.title": "Crafting Ideas, Building Dreams - My Creative Portfolio",
      "edu.present": "2023 - Present",
      "edu.university": "Gdańsk University of Technology",
      "edu.degree": "Electronics and Telecommunications, 3rd year",
      "edu.simle": "I am an active member of the SimLE student research club. As the lead software developer for an ambitious 3 m radio telescope, I help turn engineering theory into a working system - from remote control and star tracking to SDR data analysis.",
      "edu.completion": "Completion",
      "edu.asseco.division": "Telecommunications and Media Division",
      "edu.asseco.text": "- REST API development: implemented an endpoint for receiving certificate requests and returning issued certificates.<br><br>- MS ADCS integration: established DCOM communication with the certificate authority to submit processed requests.<br><br>- Deployment preparation: configured the application for hosting in Microsoft IIS.",
      "edu.school": "III High School in Sopot",
      "edu.profile": "Polytechnic profile (mathematics and IT)",
      "edu.school.text": "The polytechnic profile gave me a strong foundation in mathematics and computer science. It was also where I began applying that knowledge by building my first IT projects.",
      "projects.kicker": "My Projects",
      "projects.title": "Things I Have Built",
      "project.completed": "Completed",
      "project.inProgress": "In development",
      "labinc.kicker": "01 / Java Desktop Game",
      "labinc.text": "An educational strategy game combining incremental/idle mechanics with chemistry. You start with a simple coal mine and grow a production empire of 16 factories - all the way to a nuclear reactor producing synthetic elements.",
      "labinc.feature1": "All 118 chemical elements to produce and sell - from carbon to oganesson",
      "labinc.feature2": "Exponential economy scaling from $0.01 up to $10<sup>35</sup>",
      "labinc.feature3": "18 achievements plus automatic and manual game saves",
      "labinc.feature4": "Custom dark Swing GUI - Mining, Factories, Market and Achievements panels, animated effects and sound",
      "common.github": "<i class=\"fab fa-github\"></i> View on GitHub",
      "jobagg.kicker": "02 / Data &amp; AI Tool",
      "jobagg.text": "A tool that hunts for jobs so I don't have to. It scrapes offers from major job portals, merges them into one ranked list and investigates the most promising ones in depth.",
      "jobagg.feature1": "Aggregates offers from multiple job portals into one list",
      "jobagg.feature2": "Filtering per provider or globally, with ranked results",
      "jobagg.feature3": "Deep Research with the Gemini API: company profile, reputation, salary versus the market, work mode, actual technology stack and benefits",
      "jobagg.feature4": "Red-flag detection - planned layoffs, complex reporting structures and organizational silos",
      "passmgr.kicker": "03 / Cross-platform App",
      "passmgr.text": "A simple cross-platform password manager developed as a group project - one lightweight vault that behaves the same on Windows and Linux.",
      "passmgr.feature1": "Runs natively on Windows and Linux",
      "passmgr.feature2": "Built by a small student team as a group project",
      "side.kicker": "Side Projects",
      "side.title": "More of My Work",
      "side.inventory.text": "A visual video-game inventory generator that builds a Minecraft-style inventory from a searchable item database, with configurable slots and quantities.",
      "side.demo": "<i class=\"fa-solid fa-arrow-up-right-from-square\"></i> Live demo",
      "side.stock.title": "Stock Market Analysis Tool",
      "side.stock.text": "A C++ terminal application that parses stock-market data and draws bar charts directly in the console.",
      "side.blackbox.text": "A simple terminal-based logic game written in C++ - find hidden boxes by shooting rays and interpreting how they deflect.",
      "side.florist.title": "Florist Website",
      "side.florist.text": "A website for a local florist - a real client project built by a small team.",
      "side.client": "Client project",
      "side.radiotelescope.title": "Radio Telescope Control Panel",
      "side.radiotelescope.text": "Frontend and backend control panel for the SimLE student research club's 3 m radio telescope - remote control, tracking and monitoring in a single interface.",
      "side.frontend": "Frontend",
      "side.backend": "Backend",
      "side.japper.text": "Windows desktop app for speech-to-text transcription with two push-to-talk channels and switchable offline/online transcription engines.",
      "side.pushtotalk": "Push-to-talk",
      "side.offlineonline": "Offline/Online",
      "activity.kicker": "Find Me Online",
      "activity.title": "My Activity",
      "activity.usage": "Claude Code Usage",
      "activity.summary": "29 active days since April &middot; 772M+ tokens processed &middot; currently on Fable 5",
      "activity.claude": "<i class=\"fa-solid fa-arrow-up-right-from-square\"></i> Built with Claude Code",
      "activity.now": "Right Now",
      "activity.item1": "Engineering thesis - teaching a reinforcement-learning agent (PPO/DQN) to master an arcade game on its own",
      "activity.item2": "SimLE research club - lead software developer of a 3 m radio telescope",
      "activity.item3": "Building this portfolio and a job search aggregator",
      "activity.item4": "Math tutoring - primary school through advanced high-school level",
      "activity.github": "<i class=\"fab fa-github\"></i> Also on GitHub",
      "bio.kicker": "About Me",
      "bio.title": "About Me",
      "bio.intro": "My name is Piotr. I study Electronics and Telecommunications at Gdańsk University of Technology (WETI), currently in my 6th semester on the Computer Electronic Systems profile. What drives me most is automation - building bullet-proof setups that keep working reliably across different systems.",
      "bio.now": "What keeps me busy right now:",
      "bio.item1": "Engineering thesis - teaching a reinforcement-learning agent (PPO/DQN) to master an arcade game on its own",
      "bio.item2": "SimLE research club - lead software developer of a 3 m radio telescope: remote-control web app, star targeting and tracking, SDR data analysis",
      "bio.item3": "Personal projects - a job search aggregator, this portfolio and websites built for real clients",
      "bio.item4": "Math tutoring - from primary school up to advanced high-school level",
      "bio.after": "After hours you'll find me diving (Open Water Diver), playing guitar and going to concerts, experimenting with computer graphics and AI tools, or at the gym and on the bike.",
      "contact.kicker": "Have a project in mind?",
      "contact.title": "LET'S <span class=\"talk\">TALK</span>",
      "contact.email": "Email me",
      "contact.heading": "Contact Me",
      "contact.location": "Tricity, Poland",
      "contact.links": "Links"
    },
    pl: {
      "nav.home": "Start",
      "nav.projects": "Projekty",
      "nav.contact": "Kontakt",
      "banner.hello": "Cześć, jestem Piotr Jeleniewicz",
      "banner.title": "STUDENT ELEKTRONIKI Z TRÓJMIASTA",
      "banner.lead": "Studiuję elektronikę i telekomunikację. Najbardziej interesuje mnie łączenie sprzętu z oprogramowaniem, automatyzacja i tworzenie rozwiązań, które sprawdzają się w praktyce.",
      "banner.download": "Pobierz CV <i class=\"isti-download\"></i>",
      "banner.github": "<i class=\"fab fa-github\"></i>Mój GitHub",
      "about.kicker": "O mnie",
      "about.title": "Portfolio w obrazach",
      "about.lead": "Łączę wiedzę z elektroniki, programowania i projektowania. Szybko uczę się nowych narzędzi, dobrze odnajduję się w pracy projektowej i lubię doprowadzać pomysły do działającego rozwiązania.",
      "service.kicker": "Najważniejsze umiejętności",
      "service.title": "Od układów do kodu",
      "service.electronics.title": "Elektronika i symulacje",
      "service.electronics.text": "Praktyczna znajomość elementów elektronicznych i aparatury pomiarowej zdobyta podczas laboratoriów. Korzystam z narzędzi do projektowania i symulacji, takich jak Micro-Cap, LTspice, Falstad, EAGLE i Vivado. Znam też podstawy teorii sterowania, analizy systemów i modelowania.",
      "service.programming.title": "Programowanie i podstawy inżynierii",
      "service.programming.text": "Programuję w C++ i JavaScript, przede wszystkim przy własnych projektach technicznych. Solidne podstawy matematyki i fizyki pomagają mi sprawnie rozwiązywać problemy inżynierskie.",
      "service.tools.title": "Narzędzia i systemy IT",
      "service.tools.text": "Automatyzuję powtarzalne zadania w AutoHotkey, pracuję w Visual Studio Code, konfiguruję systemy operacyjne oraz zarządzam maszynami wirtualnymi w VMware i VirtualBox.",
      "skills.kicker": "Edukacja i doświadczenie",
      "skills.title": "Od nauki do praktyki",
      "edu.present": "2023 - obecnie",
      "edu.university": "Politechnika Gdańska",
      "edu.degree": "Elektronika i telekomunikacja, 3. rok",
      "edu.simle": "Aktywnie działam w kole naukowym SimLE, gdzie odpowiadam za rozwój oprogramowania 3-metrowego radioteleskopu. Pracuję między innymi nad zdalnym sterowaniem, namierzaniem i śledzeniem gwiazd oraz analizą danych SDR.",
      "edu.completion": "Postęp",
      "edu.asseco.division": "Pion Telekomunikacji i Mediów",
      "edu.asseco.text": "- REST API: przygotowanie endpointu do obsługi wniosków o wystawienie certyfikatu i zwracania gotowych certyfikatów.<br><br>- Integracja z MS ADCS: komunikacja z urzędem certyfikacji przez DCOM i przekazywanie wniosków do realizacji.<br><br>- Wdrożenie: przygotowanie i konfiguracja aplikacji do pracy w środowisku Microsoft IIS.",
      "edu.school": "III Liceum Ogólnokształcące w Sopocie",
      "edu.profile": "Profil politechniczny (matematyka i informatyka)",
      "edu.school.text": "Profil politechniczny dał mi solidne podstawy z matematyki i informatyki. W liceum zacząłem też wykorzystywać tę wiedzę w praktyce, tworząc pierwsze projekty IT.",
      "projects.kicker": "Portfolio",
      "projects.title": "Moje projekty",
      "project.completed": "Ukończony",
      "project.inProgress": "W trakcie rozwoju",
      "labinc.kicker": "01 / Gra komputerowa w Javie",
      "labinc.text": "Edukacyjna gra strategiczna łącząca mechanikę incremental/idle z chemią. Zaczynasz od prostej kopalni węgla i rozwijasz imperium złożone z 16 fabryk - aż po reaktor jądrowy produkujący syntetyczne pierwiastki.",
      "labinc.feature1": "Wszystkie 118 pierwiastków chemicznych do produkcji i sprzedaży - od węgla po oganeson",
      "labinc.feature2": "Rozbudowana ekonomia gry obejmująca wartości od $0,01 do $10<sup>35</sup>",
      "labinc.feature3": "18 osiągnięć oraz automatyczny i ręczny zapis gry",
      "labinc.feature4": "Autorski ciemny interfejs Swing - panele kopalni, fabryk, rynku i osiągnięć, animowane efekty oraz dźwięk",
      "common.github": "<i class=\"fab fa-github\"></i> Zobacz na GitHubie",
      "jobagg.kicker": "02 / Agregator ofert i analiza AI",
      "jobagg.text": "Aplikacja zbiera ogłoszenia z największych portali pracy, porządkuje je w jednym rankingu i pomaga dokładnie sprawdzić najbardziej interesujące oferty.",
      "jobagg.feature1": "Oferty z wielu portali zebrane w jednym miejscu",
      "jobagg.feature2": "Wspólne filtry, filtrowanie według źródła i ranking wyników",
      "jobagg.feature3": "Analiza Deep Research z użyciem Gemini API: profil i opinie o firmie, wynagrodzenie na tle rynku, tryb pracy, faktycznie wykorzystywane technologie i benefity",
      "jobagg.feature4": "Wykrywanie sygnałów ostrzegawczych, takich jak planowane zwolnienia, skomplikowane struktury raportowania i silosy organizacyjne",
      "passmgr.kicker": "03 / Aplikacja wieloplatformowa",
      "passmgr.text": "Prosty menedżer haseł rozwijany jako projekt grupowy. Ta sama lekka aplikacja działa na Windowsie i Linuksie, zapewniając wygodny dostęp do zaszyfrowanego sejfu.",
      "passmgr.feature1": "Natywne działanie w systemach Windows i Linux",
      "passmgr.feature2": "Projekt rozwijany przez mały zespół studentów",
      "side.kicker": "Po godzinach",
      "side.title": "Więcej moich projektów",
      "side.inventory.text": "Generator ekwipunku do gier w stylu Minecrafta. Pozwala wyszukiwać przedmioty w bazie oraz konfigurować zawartość slotów i liczbę elementów.",
      "side.demo": "<i class=\"fa-solid fa-arrow-up-right-from-square\"></i> Demo",
      "side.stock.title": "Analiza danych giełdowych",
      "side.stock.text": "Aplikacja terminalowa w C++, która przetwarza dane giełdowe i wyświetla wykresy słupkowe bezpośrednio w konsoli.",
      "side.blackbox.text": "Prosta gra logiczna napisana w C++. Zadaniem gracza jest odnalezienie ukrytych pól na podstawie toru wystrzeliwanych promieni.",
      "side.florist.title": "Strona dla kwiaciarni",
      "side.florist.text": "Strona przygotowana dla lokalnej kwiaciarni w ramach rzeczywistego projektu realizowanego przez mały zespół.",
      "side.client": "Projekt dla klienta",
      "side.radiotelescope.title": "Panel sterowania radioteleskopem",
      "side.radiotelescope.text": "Panel sterowania (frontend i backend) do radioteleskopu o średnicy 3 m, budowanego w kole naukowym SimLE - zdalne sterowanie, śledzenie i monitorowanie w jednym interfejsie.",
      "side.frontend": "Frontend",
      "side.backend": "Backend",
      "side.japper.text": "Aplikacja desktopowa na Windows do transkrypcji mowy na tekst, z dwoma kanałami push-to-talk oraz przełączanymi silnikami transkrypcji offline i online.",
      "side.pushtotalk": "Push-to-talk",
      "side.offlineonline": "Offline/Online",
      "activity.kicker": "Aktywność",
      "activity.title": "Nad czym teraz pracuję",
      "activity.usage": "Claude Code w liczbach",
      "activity.summary": "29 aktywnych dni od kwietnia &middot; ponad 772 mln przetworzonych tokenów &middot; obecnie Fable 5",
      "activity.claude": "<i class=\"fa-solid fa-arrow-up-right-from-square\"></i> Tworzone z Claude Code",
      "activity.now": "Na bieżąco",
      "activity.item1": "Praca inżynierska: rozwijam agenta uczenia ze wzmocnieniem (PPO/DQN), który samodzielnie uczy się grać w grę zręcznościową",
      "activity.item2": "SimLE: odpowiadam za oprogramowanie 3-metrowego radioteleskopu",
      "activity.item3": "Rozwój tego portfolio i agregatora ofert pracy",
      "activity.item4": "Korepetycje z matematyki od szkoły podstawowej po poziom rozszerzony w liceum",
      "activity.github": "<i class=\"fab fa-github\"></i> Więcej na GitHubie",
      "bio.kicker": "O mnie",
      "bio.title": "O mnie",
      "bio.intro": "Mam na imię Piotr. Studiuję elektronikę i telekomunikację na Politechnice Gdańskiej (WETI), na profilu Komputerowe Systemy Elektroniczne. Najbardziej interesuje mnie automatyzacja i tworzenie niezawodnych rozwiązań, które dobrze działają w różnych środowiskach.",
      "bio.now": "Aktualnie skupiam się na:",
      "bio.item1": "Pracy inżynierskiej nad agentem uczenia ze wzmocnieniem (PPO/DQN), który samodzielnie uczy się grać w grę zręcznościową",
      "bio.item2": "Rozwoju oprogramowania 3-metrowego radioteleskopu w kole naukowym SimLE: zdalnego sterowania, namierzania i śledzenia gwiazd oraz analizy danych SDR",
      "bio.item3": "Własnych projektach: agregatorze ofert pracy, tym portfolio i stronach przygotowywanych dla realnych klientów",
      "bio.item4": "Korepetycjach z matematyki od szkoły podstawowej po poziom rozszerzony w liceum",
      "bio.after": "Po godzinach nurkuję (Open Water Diver), gram na gitarze, chodzę na koncerty i eksperymentuję z grafiką komputerową oraz narzędziami AI. Regularnie trenuję też na siłowni i jeżdżę na rowerze.",
      "contact.kicker": "Masz projekt lub pomysł?",
      "contact.title": "NAPISZ <span class=\"talk\">DO MNIE</span>",
      "contact.email": "Wyślij e-mail",
      "contact.heading": "Kontakt",
      "contact.location": "Trójmiasto, Polska",
      "contact.links": "Profile"
    }
  };

  let currentLanguage = "en";

  try {
    const savedLanguage = localStorage.getItem(STORAGE_KEY);
    if (savedLanguage === "pl" || savedLanguage === "en") {
      currentLanguage = savedLanguage;
    }
  } catch (_) {
    /* localStorage może być niedostępny w restrykcyjnym trybie prywatnym. */
  }

  const toggle = document.getElementById("lang-toggle");

  function applyLanguage(language) {
    const dictionary = translations[language];
    if (!dictionary) return;

    currentLanguage = language;
    document.documentElement.lang = language;
    document.title = language === "pl"
      ? "Piotr Jeleniewicz - portfolio"
      : "Piotr Jeleniewicz - Portfolio";

    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.dataset.i18n;
      if (dictionary[key] !== undefined) {
        element.innerHTML = dictionary[key];
      }
    });

    if (toggle) {
      toggle.dataset.language = language;
      toggle.setAttribute(
        "aria-label",
        language === "pl" ? "Przełącz stronę na język angielski" : "Switch the website to Polish"
      );
      toggle.querySelectorAll("[data-lang-option]").forEach((option) => {
        const isActive = option.dataset.langOption === language;
        option.classList.toggle("is-active", isActive);
        option.setAttribute("aria-hidden", isActive ? "false" : "true");
      });
    }

    try {
      localStorage.setItem(STORAGE_KEY, language);
    } catch (_) {
      /* Zmiana nadal działa w bieżącej karcie bez zapisu preferencji. */
    }
  }

  if (toggle) {
    toggle.addEventListener("click", () => {
      applyLanguage(currentLanguage === "en" ? "pl" : "en");
    });
  }

  applyLanguage(currentLanguage);
})();
