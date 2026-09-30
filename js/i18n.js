(() => {
  "use strict";

  const translations = {
  "en": {
    "nav.home": "Home",
    "nav.projects": "Projects",
    "nav.contact": "Contact",
    "banner.hello": "Hello, I am",
    "banner.title": "AN ENGINEERING STUDENT BASED IN POLAND",
    "banner.lead": "I develop applications and automation tools that connect APIs, data and AI services. I am in my final semester at Gdańsk University of Technology, looking for a paid internship or part-time role in software development and system integration.",
    "banner.download": "Request my CV <i class=\"isti-download\"></i>",
    "banner.github": "<i class=\"fab fa-github\"></i>My GitHub",
    "about.kicker": "My Projects",
    "about.title": "What I Build",
    "about.lead": "Automation tools, desktop applications and interfaces for technical systems. My work covers requirements, data flows, module integration and testing. I develop projects around practical needs and user feedback.",
    "service.kicker": "Core Strengths",
    "service.title": "From Circuits to Code",
    "service.electronics.title": "Electronics and Simulations",
    "service.electronics.text": "My laboratory experience covers measurements, circuit simulation and PCB design using LTspice, Micro-Cap, EAGLE, KiCad and Vivado. I am interested in systems that combine electronics and software.",
    "service.programming.title": "Programming and Integration",
    "service.programming.text": "I use Python and JavaScript for tooling, API integration and data processing. My C/C++ and Java experience includes projects and object-oriented programming coursework. I combine implementation, interface development and functional testing.",
    "service.tools.title": "IT Tools and Systems",
    "service.tools.text": "I work with Windows, Windows Server and virtual machines. I use Git, Linux and Docker in project workflows and AutoHotkey to automate everyday tasks.",
    "skills.kicker": "Education & Experience",
    "skills.title": "From Theory to Practice",
    "edu.present": "2023 - present | expected graduation: 02.2027",
    "edu.university": "Gdańsk University of Technology",
    "edu.degree": "<span class=\"education-line\">Electronics and Telecommunications</span><span class=\"education-line\"><small>Stream:</small> Electronics</span><span class=\"education-line\"><small>Specialisation:</small> Computer Electronic Systems</span>",
    "edu.simle": "I am the lead software developer for the SeeSky radio telescope project in the SimLE student research club. I develop the frontend and backend of its operating interface, including an interactive sky visualisation. The next project stage covers hardware and SDR integration.",
    "edu.completion": "Completion",
    "edu.asseco.division": "Telecommunications and Media Division",
    "edu.asseco.text": "<li>Prepared and configured a Windows Server 2019 environment for a certificate-handling solution.</li><li>Developed a REST endpoint for request handling in a project involving Microsoft AD CS and DCOM communication.</li><li>Created an environment setup guide and technical documentation for further integration work.</li>",
    "edu.school": "III High School in Sopot",
    "edu.profile": "Polytechnic profile (mathematics and IT)",
    "edu.school.text": "The polytechnic profile gave me a strong foundation in mathematics and computer science. It was also where I began applying that knowledge by building my first IT projects.",
    "projects.kicker": "My Projects",
    "projects.title": "Things I Have Built",
    "project.completed": "Completed",
    "project.inProgress": "In development",
    "labinc.kicker": "02 / Java and Object-Oriented Design",
    "labinc.text": "A Java incremental game about building up chemical-element production. The project combines an object model, economic simulation, game-state management and a Swing interface.",
    "labinc.feature1": "Producing and selling chemical elements",
    "labinc.feature2": "Economy and production progression logic",
    "labinc.feature3": "Game-state persistence and achievements",
    "labinc.feature4": "Swing interface with production and market panels",
    "common.github": "<i class=\"fab fa-github\"></i> View on GitHub",
    "jobagg.kicker": "01 / Integration and Automation",
    "jobagg.text": "JobManager aggregates listings from multiple job portals, provides shared filters and AI-assisted offer research, and sends notifications. I develop it through regular use, integrating data collection, APIs and a user interface.",
    "jobagg.feature1": "Job listings from multiple portals in one application",
    "jobagg.feature2": "Result filtering and offer research with Gemini API",
    "jobagg.feature3": "Modular data-source handling and integrations",
    "jobagg.feature4": "Notifications for offers matching selected criteria",
    "passmgr.kicker": "03 / Group Project",
    "passmgr.text": "A password-manager prototype for Windows and Linux, developed as a student team project. The application provides a credential vault and an interface for managing entries.",
    "passmgr.feature1": "Adding, editing and organising vault entries",
    "passmgr.feature2": "Team collaboration on a desktop application",
    "side.kicker": "Tools and Other Projects",
    "side.title": "More of My Work",
    "side.inventory.text": "A visual video-game inventory generator that builds a Minecraft-style inventory from a searchable item database, with configurable slots and quantities.",
    "side.demo": "<i class=\"fa-solid fa-arrow-up-right-from-square\"></i> Live demo",
    "side.stock.title": "Stock Market Analysis Tool",
    "side.stock.text": "A C++ terminal application that parses stock-market data and draws bar charts directly in the console.",
    "side.blackbox.text": "A C++ terminal logic game that locates hidden atoms by interpreting ray paths. The project includes board logic, ray simulation and user interaction.",
    "side.florist.title": "Florist Website",
    "side.florist.text": "A website for a local florist - a real client project built by a small team.",
    "side.client": "Client project",
    "side.radiotelescope.title": "Radio Telescope Control Panel",
    "side.radiotelescope.text": "Frontend and backend for the <a class=\"project-source-link\" href=\"https://simle.pl/seesky\" target=\"_blank\" rel=\"noopener\">SimLE SeeSky radio telescope</a>. I lead software development, including the interactive sky visualisation. Hardware and SDR integration form the next stage.",
    "side.radiotelescope.demonote": "Demo only - no live star or sensor data",
    "side.yapper.text": "A Windows dictation application I use every day. Two push-to-talk channels, online and offline transcription engines, and automatic clipboard output support everyday text workflows.",
    "activity.kicker": "How I Work",
    "activity.title": "How I Build with AI",
    "activity.usage": "From Requirements to Integration",
    "activity.uptodate": "I use AI development tools for implementation and iterative application development. I define requirements, design module boundaries, connect interfaces and verify system behaviour in practice.",
    "activity.mytools": "Implementation Tools",
    "activity.claudedetail": "Implementation and iterations",
    "activity.codexdetail": "Code changes and verification",
    "activity.now": "Examples and Next Steps",
    "activity.item1": "JobManager: offer sources, research and notifications in one workflow.",
    "activity.item2": "Yapper: a tool I use every day.",
    "activity.item3": "SeeSky: radio telescope interface development and preparation for hardware integration.",
    "activity.item4": "I want to develop in integration and automation, and over time in embedded systems and IoT with AI.",
    "activity.github": "<i class=\"fab fa-github\"></i> Also on GitHub",
    "bio.kicker": "About Me",
    "bio.title": "About Me",
    "bio.intro": "I am a final-semester Electronics and Telecommunications student at Gdańsk University of Technology, in the Electronics stream, specialising in Computer Electronic Systems. I develop applications and automation tools with a focus on API integration, data flows and module interaction. I want to continue combining software development with technical systems.",
    "bio.now": "What keeps me busy right now:",
    "bio.item1": "Engineering thesis: training DQN agents in Mario and ViZDoom, recording metrics and analysing experiments.",
    "bio.item2": "SimLE / SeeSky: leading radio telescope software development, including frontend, backend and sky visualisation.",
    "bio.item3": "Personal tools: JobManager, Yapper and Turf Matchmaking, improved through real use.",
    "bio.item4": "Tutoring: <a class=\"identity-link\" href=\"https://www.e-korepetycje.net/xcape/matematyka\" target=\"_blank\" rel=\"me noopener\">high-school mathematics</a>, using diagrams and analogies adapted to the pupil.",
    "bio.after": "After hours you'll find me into geography, blending music, working on my fitness and diet at the gym, experimenting with AI audio-separation tools, or just getting started with architectural visualization in ComfyUI.",
    "contact.kicker": "Paid internship or first role - part-time, preferably remote or hybrid",
    "contact.title": "LET'S <span class=\"talk\">TALK</span>",
    "contact.email": "Email me",
    "contact.heading": "Contact Me",
    "contact.location": "Gdynia, Poland",
    "contact.links": "Links",
    "nav.cv": "Request CV",
    "contact.cv": "Request my CV",
    "project.archived": "Personal Project",
    "project.inUse": "In use and evolving",
    "project.prototype": "Prototype",
    "side.turf.text": "A Krunker lobby finder with configurable filters, live-data validation and retry handling. Other players also use the tool, and their feedback informs continued development.",
    "activity.step1": "Define the problem, user and expected outcome.",
    "activity.step2": "Break the system into modules, data and interfaces.",
    "activity.step3": "Direct AI-assisted implementation and connect the components.",
    "activity.step4": "Check usage scenarios, diagnose issues and improve the solution.",
    "edu.teachingProgress": "Teaching Progress",
    "edu.semesters": "Semesters",
    "edu.semesterStatus": "6 semesters completed | final semester: 7"
  },
  "pl": {
    "nav.home": "Start",
    "nav.projects": "Projekty",
    "nav.contact": "Kontakt",
    "banner.hello": "Cześć, jestem",
    "banner.title": "STUDENTEM ELEKTRONIKI Z TRÓJMIASTA",
    "banner.lead": "Tworzę aplikacje i narzędzia do automatyzacji, łącząc API, dane i rozwiązania AI. Studiuję na ostatnim semestrze Politechniki Gdańskiej. Szukam płatnego stażu lub pracy na pół etatu przy rozwoju i integracji systemów.",
    "banner.download": "Poproś o CV <i class=\"isti-download\"></i>",
    "banner.github": "<i class=\"fab fa-github\"></i>Mój GitHub",
    "about.kicker": "Moje projekty",
    "about.title": "Co tworzę",
    "about.lead": "Narzędzia do automatyzacji, aplikacje desktopowe i interfejsy dla systemów technicznych. Zajmuję się wymaganiami, przepływem danych, integracją modułów i testowaniem. Projekty rozwijam na podstawie własnych potrzeb i informacji od użytkowników.",
    "service.kicker": "Najważniejsze umiejętności",
    "service.title": "Od układów do kodu",
    "service.electronics.title": "Elektronika i symulacje",
    "service.electronics.text": "Praktyka laboratoryjna obejmuje pomiary, symulację układów i projektowanie PCB. Pracuję z LTspice, Micro-Cap, EAGLE, KiCad i Vivado. Interesuje mnie rozwój systemów łączących elektronikę z oprogramowaniem.",
    "service.programming.title": "Programowanie i integracje",
    "service.programming.text": "Python i JavaScript wykorzystuję do tworzenia narzędzi, integracji API i przetwarzania danych. C/C++ oraz Java to także projekty i zajęcia z programowania obiektowego. Łączę implementację, pracę nad interfejsem i testowanie funkcjonalności.",
    "service.tools.title": "Narzędzia i systemy IT",
    "service.tools.text": "Pracuję ze środowiskami Windows, Windows Server i maszynami wirtualnymi. Korzystam z Git, Linux i Docker w pracy projektowej, a AutoHotkey wykorzystuję do automatyzacji codziennych zadań.",
    "skills.kicker": "Edukacja i doświadczenie",
    "skills.title": "Od nauki do praktyki",
    "edu.present": "2023 - obecnie | planowane ukończenie: 02.2027",
    "edu.university": "Politechnika Gdańska",
    "edu.degree": "<span class=\"education-line\">Elektronika i Telekomunikacja</span><span class=\"education-line\"><small>Strumień:</small> Elektronika</span><span class=\"education-line\"><small>Specjalność:</small> Komputerowe Systemy Elektroniczne</span>",
    "edu.simle": "W zespole SeeSky koła naukowego SimLE jestem główną osobą odpowiedzialną za oprogramowanie radioteleskopu. Rozwijam frontend i backend aplikacji do jego obsługi, w tym interaktywną wizualizację nieba. Kolejny etap projektu obejmuje integrację aplikacji ze sprzętem i odbiornikiem SDR.",
    "edu.completion": "Postęp",
    "edu.asseco.division": "Pion Telekomunikacji i Mediów",
    "edu.asseco.text": "<li>Przygotowanie i konfiguracja środowiska Windows Server 2019 na potrzeby rozwiązania do obsługi certyfikatów.</li><li>Opracowanie endpointu REST do przyjmowania żądań w projekcie wykorzystującym Microsoft AD CS i komunikację DCOM.</li><li>Przygotowanie instrukcji konfiguracji środowiska i dokumentacji technicznej do dalszych prac nad integracją.</li>",
    "edu.school": "III Liceum Ogólnokształcące w Sopocie",
    "edu.profile": "Profil politechniczny (matematyka i informatyka)",
    "edu.school.text": "Profil politechniczny dał mi solidne podstawy z matematyki i informatyki. W liceum zacząłem też wykorzystywać tę wiedzę w praktyce, tworząc pierwsze projekty IT.",
    "projects.kicker": "Portfolio",
    "projects.title": "Moje projekty",
    "project.completed": "Ukończony",
    "project.inProgress": "W trakcie rozwoju",
    "labinc.kicker": "02 / Java i projektowanie obiektowe",
    "labinc.text": "Gra incremental w Javie, w której gracz rozwija produkcję pierwiastków chemicznych. Projekt obejmuje model obiektowy, logikę ekonomii, zarządzanie stanem gry i interfejs Swing.",
    "labinc.feature1": "Produkcja i sprzedaż pierwiastków",
    "labinc.feature2": "Logika ekonomii i rozbudowy produkcji",
    "labinc.feature3": "Zapis stanu gry i osiągnięcia",
    "labinc.feature4": "Interfejs Swing z panelami produkcji i rynku",
    "common.github": "<i class=\"fab fa-github\"></i> Zobacz na GitHubie",
    "jobagg.kicker": "01 / Integracje i automatyzacja",
    "jobagg.text": "JobManager agreguje oferty z wielu portali, udostępnia wspólne filtry i analizę ofert z AI oraz wysyła powiadomienia. Rozwijam go na podstawie codziennego użycia, łącząc pobieranie danych, integracje API i interfejs użytkownika.",
    "jobagg.feature1": "Agregacja ofert z wielu portali w jednej aplikacji",
    "jobagg.feature2": "Filtrowanie wyników i analiza ofert z Gemini API",
    "jobagg.feature3": "Modułowa obsługa źródeł danych i integracji",
    "jobagg.feature4": "Powiadomienia o ofertach dopasowanych do kryteriów",
    "passmgr.kicker": "03 / Projekt grupowy",
    "passmgr.text": "Prototyp menedżera haseł na Windows i Linux, rozwijany w zespole studenckim. Aplikacja udostępnia sejf danych logowania oraz interfejs do zarządzania wpisami.",
    "passmgr.feature1": "Dodawanie, edycja i organizacja wpisów sejfu",
    "passmgr.feature2": "Współpraca w zespole nad aplikacją desktopową",
    "side.kicker": "Narzędzia i pozostałe projekty",
    "side.title": "Więcej moich projektów",
    "side.inventory.text": "Generator ekwipunku do gier w stylu Minecrafta. Pozwala wyszukiwać przedmioty w bazie oraz konfigurować zawartość slotów i liczbę elementów.",
    "side.demo": "<i class=\"fa-solid fa-arrow-up-right-from-square\"></i> Demo",
    "side.stock.title": "Analiza danych giełdowych",
    "side.stock.text": "Aplikacja terminalowa w C++, która przetwarza dane giełdowe i wyświetla wykresy słupkowe bezpośrednio w konsoli.",
    "side.blackbox.text": "Terminalowa gra logiczna w C++: wykrywanie ukrytych atomów na podstawie toru promieni. Projekt obejmuje logikę planszy, symulację ruchu i interakcję z użytkownikiem.",
    "side.florist.title": "Strona dla kwiaciarni",
    "side.florist.text": "Strona przygotowana dla lokalnej kwiaciarni w ramach rzeczywistego projektu realizowanego przez mały zespół.",
    "side.client": "Projekt dla klienta",
    "side.radiotelescope.title": "Panel sterowania radioteleskopem",
    "side.radiotelescope.text": "Frontend i backend aplikacji dla <a class=\"project-source-link\" href=\"https://simle.pl/seesky\" target=\"_blank\" rel=\"noopener\">radioteleskopu SeeSky koła SimLE</a>. Odpowiadam za rozwój oprogramowania, w tym interaktywną wizualizację nieba. Kolejny etap obejmuje integrację ze sprzętem i SDR.",
    "side.radiotelescope.demonote": "Wersja demo - bez danych na żywo o gwiazdach ani z czujników",
    "side.yapper.text": "Aplikacja do dyktowania na Windows, którą wykorzystuję codziennie. Dwa kanały push-to-talk, silniki transkrypcji online i offline oraz automatyczny zapis wyniku do schowka ułatwiają pracę z tekstem.",
    "activity.kicker": "Sposób pracy",
    "activity.title": "Jak buduję z AI",
    "activity.usage": "Od wymagania do integracji",
    "activity.uptodate": "Wykorzystuję narzędzia AI do implementacji i iteracyjnego rozwoju aplikacji. Określam wymagania, projektuję podział na moduły, łączę interfejsy i weryfikuję działanie systemu w praktyce.",
    "activity.mytools": "Narzędzia implementacji",
    "activity.claudedetail": "Implementacja i iteracje",
    "activity.codexdetail": "Zmiany w kodzie i weryfikacja",
    "activity.now": "Przykłady i dalszy kierunek",
    "activity.item1": "JobManager: źródła ofert, research i powiadomienia w jednym procesie.",
    "activity.item2": "Yapper: narzędzie, które wykorzystuję codziennie.",
    "activity.item3": "SeeSky: rozwój aplikacji do obsługi radioteleskopu i przygotowanie do integracji sprzętowej.",
    "activity.item4": "Chcę rozwijać się w integracjach i automatyzacji, a z czasem także w systemach wbudowanych i IoT z AI.",
    "activity.github": "<i class=\"fab fa-github\"></i> Więcej na GitHubie",
    "bio.kicker": "O mnie",
    "bio.title": "O mnie",
    "bio.intro": "Studiuję Elektronikę i Telekomunikację na Politechnice Gdańskiej, w strumieniu Elektronika i specjalności Komputerowe Systemy Elektroniczne. Jestem na ostatnim, 7. semestrze. Rozwijam aplikacje i narzędzia do automatyzacji, z naciskiem na integrację API, przepływ danych i współpracę modułów. Chcę dalej łączyć rozwój oprogramowania z systemami technicznymi.",
    "bio.now": "Aktualnie skupiam się na:",
    "bio.item1": "Praca inżynierska: uczenie agentów DQN w środowiskach Mario i ViZDoom, rejestrowanie metryk i analiza eksperymentów.",
    "bio.item2": "SimLE / SeeSky: odpowiedzialność za oprogramowanie radioteleskopu, frontend, backend i wizualizację nieba.",
    "bio.item3": "Własne narzędzia: JobManager, Yapper i Turf Matchmaking, rozwijane na podstawie rzeczywistego użycia.",
    "bio.item4": "Korepetycje: <a class=\"identity-link\" href=\"https://www.e-korepetycje.net/xcape/matematyka\" target=\"_blank\" rel=\"me noopener\">matematyka na poziomie liceum</a>, z rysunkami i analogiami dopasowanymi do ucznia.",
    "bio.after": "Po godzinach zgłębiam geografię, tworzę blendy muzyczne, dbam o formę i dietę na siłowni, eksperymentuję z narzędziami AI do separacji audio, albo dopiero zaczynam ogarniać wizualizacje architektoniczne w ComfyUI.",
    "contact.kicker": "Płatny staż lub pierwsza praca - pół etatu, najlepiej zdalnie lub hybrydowo",
    "contact.title": "NAPISZ <span class=\"talk\">DO MNIE</span>",
    "contact.email": "Wyślij e-mail",
    "contact.heading": "Kontakt",
    "contact.location": "Gdynia, Polska",
    "contact.links": "Profile",
    "nav.cv": "CV na prośbę",
    "contact.cv": "Poproś o CV",
    "project.archived": "Projekt własny",
    "project.inUse": "Używany i rozwijany",
    "project.prototype": "Prototyp",
    "side.turf.text": "Wyszukiwarka lobby w Krunkerze z filtrami, weryfikacją aktualnych danych i ponawianiem prób dołączenia. Narzędzie używane także przez innych graczy; rozwój uwzględnia ich zgłoszenia i scenariusze użycia.",
    "activity.step1": "Ustalam problem, użytkownika i oczekiwany rezultat.",
    "activity.step2": "Dzielę system na moduły, dane i interfejsy między nimi.",
    "activity.step3": "Prowadzę implementację z AI i łączę elementy.",
    "activity.step4": "Sprawdzam scenariusze użycia, diagnozuję błędy i poprawiam rozwiązanie.",
    "edu.teachingProgress": "Postęp zajęć",
    "edu.semesters": "Semestry",
    "edu.semesterStatus": "6 semestrów ukończonych | ostatni semestr: 7"
  }
};

  const isPolishPage = /\/pl\/(?:index\.html)?$/.test(window.location.pathname);
  let currentLanguage = isPolishPage ? "pl" : "en";

  const toggle = document.getElementById("lang-toggle");

  function applyLanguage(language) {
    const dictionary = translations[language];
    if (!dictionary) return;

    currentLanguage = language;
    document.documentElement.lang = language;
    const seo = language === "pl"
      ? {
          title: "Piotr Jeleniewicz | Software and Automation",
          description: "Piotr Jeleniewicz - student ostatniego semestru PG. Integracje aplikacji, automatyzacja procesów i projekty tworzone z AI. Gdynia, Trójmiasto.",
          socialDescription: "Piotr Jeleniewicz - student ostatniego semestru PG. Integracje aplikacji, automatyzacja procesów i projekty tworzone z AI. Gdynia, Trójmiasto.",
          locale: "pl_PL"
        }
      : {
          title: "Piotr Jeleniewicz | Software and Automation",
          description: "Piotr Jeleniewicz - final-semester engineering student building application integrations and process automation with AI coding tools. Gdynia, Poland.",
          socialDescription: "Piotr Jeleniewicz - final-semester engineering student building application integrations and process automation with AI coding tools. Gdynia, Poland.",
          locale: "en_US"
        };

    document.title = seo.title;
    const description = document.querySelector('meta[name="description"]');
    const openGraphTitle = document.querySelector('meta[property="og:title"]');
    const openGraphDescription = document.querySelector('meta[property="og:description"]');
    const openGraphLocale = document.querySelector('meta[property="og:locale"]');
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (description) description.setAttribute("content", seo.description);
    if (openGraphTitle) openGraphTitle.setAttribute("content", seo.title);
    if (openGraphDescription) openGraphDescription.setAttribute("content", seo.socialDescription);
    if (openGraphLocale) openGraphLocale.setAttribute("content", seo.locale);
    if (twitterTitle) twitterTitle.setAttribute("content", seo.title);
    if (twitterDescription) twitterDescription.setAttribute("content", seo.socialDescription);

    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.dataset.i18n;
      if (dictionary[key] !== undefined) {
        element.innerHTML = dictionary[key];
      }
    });

    if (toggle) {
      toggle.dataset.language = language;
      toggle.setAttribute("aria-label", language === "pl" ? "Wersje językowe" : "Language versions");
      toggle.querySelectorAll("[data-lang-option]").forEach((option) => {
        const isActive = option.dataset.langOption === language;
        option.classList.toggle("is-active", isActive);
        if (isActive) {
          option.setAttribute("aria-current", "page");
        } else {
          option.removeAttribute("aria-current");
        }
      });
    }

  }

  applyLanguage(currentLanguage);
})();
