/* M4 — Layout i RWD */
WDAI.modules.push({
  id: "m4",
  code: "M4",
  tech: "css",
  title: "Layout: Flexbox, Grid i responsywność",
  short: "Layout i RWD",
  lab: "Lab 1–2",
  syllabus: "W1",
  intro: "Flexbox i Grid to narzędzia do układania elementów na stronie: menu w poziomie, karty w siatce, cała strona z nagłówkiem, treścią i stopką. Responsywność (RWD) sprawia, że strona dobrze wygląda na telefonie, tablecie i komputerze — to 2 pkt w Projekcie 1.",
  topics: [
    {
      id: "flex-kontener",
      title: "Flexbox: kontener",
      keywords: ["flex", "display flex", "justify-content", "align-items", "flex-direction", "flex-wrap", "gap", "oś główna"],
      theory: [
        "Flexbox układa elementy w **jednym wymiarze**: w wierszu albo w kolumnie. `display: flex` ustawiasz na **rodzicu** (kontenerze), a jego bezpośrednie dzieci stają się elementami flex.",
        "Są dwie osie: **główna** (wzdłuż `flex-direction`, domyślnie poziomo) i **poprzeczna** (prostopadła). `justify-content` wyrównuje wzdłuż osi głównej, `align-items` wzdłuż poprzecznej. Gdy zmienisz kierunek na `column`, osie się zamieniają.",
      ],
      syntax: [
        {
          title: "Właściwości kontenera",
          lang: "css",
          code: `
.container {
  display: flex;                 /* ❶ */
  flex-direction: row;           /* ❷ row | column | row-reverse | column-reverse */
  justify-content: space-between;/* ❸ flex-start | center | flex-end | space-between | space-around | space-evenly */
  align-items: center;           /* ❹ stretch | flex-start | center | flex-end | baseline */
  flex-wrap: wrap;               /* ❺ nowrap | wrap */
  gap: 16px;                     /* ❻ odstęp między elementami */
}`,
          legend: [["❶", "włącza flexbox dla dzieci"], ["❷", "kierunek osi głównej"], ["❸", "rozkład wzdłuż osi głównej"], ["❹", "wyrównanie w osi poprzecznej"], ["❺", "zawijanie do nowej linii, gdy brakuje miejsca"], ["❻", "odstęp bez marginesów"]],
        },
        {
          title: "Wyśrodkowanie czegokolwiek",
          lang: "css",
          code: `
.center {
  display: flex;
  justify-content: center;  /* poziomo */
  align-items: center;      /* pionowo */
  min-height: 100vh;        /* kontener musi mieć wysokość */
}`,
          explain: "Dokładnie tak działa `.main-container` z szablonu Lab 1.",
        },
      ],
      mistakes: [
        { lang: "css", bad: ".item { display: flex; justify-content: center; }  /* na dziecku */", good: ".container { display: flex; justify-content: center; }", why: "Właściwości kontenera ustawiasz na rodzicu, którego dzieci chcesz ułożyć." },
      ],
      try: {
        html: `<nav class="menu">
  <a href="#">Logo</a>
  <a href="#">Home</a>
  <a href="#">Galeria</a>
  <a href="#">Kontakt</a>
</nav>`,
        css: `.menu {
  display: flex;
  gap: 16px;
  padding: 12px;
  background: #e3f1ef;
}`,
        task: "Ustaw `justify-content: space-between`, potem `center`. Zmień `flex-direction` na `column` i sprawdź, co teraz robi `align-items: center`.",
      },
    },
    {
      id: "flex-elementy",
      title: "Flexbox: elementy (flex, order, align-self)",
      keywords: ["flex-grow", "flex-shrink", "flex-basis", "flex: 1", "order", "align-self", "margin-left auto"],
      theory: [
        "Na **dzieciach** ustawiasz, jak dzielą się miejscem: `flex-grow` (ile wolnego miejsca zabrać), `flex-shrink` (czy się kurczyć), `flex-basis` (rozmiar startowy). Skrót `flex: 1` = rośnij równo z innymi.",
        "`order` zmienia kolejność wyświetlania bez zmiany HTML, `align-self` wyrównuje jeden element inaczej niż pozostałe. Sztuczka: `margin-left: auto` odpycha element na prawy koniec.",
      ],
      syntax: [
        {
          title: "Dzielenie miejsca",
          lang: "css",
          code: `
.sidebar { flex: 0 0 250px; }    /* ❶ */
.content { flex: 1; }            /* ❷ */
.card    { flex: 1 1 220px; }    /* ❸ */
.logo    { margin-right: auto; } /* ❹ */
.special { order: -1; align-self: flex-end; }  /* ❺ */`,
          legend: [["❶", "flex: grow shrink basis — stałe 250px"], ["❷", "zabierz całe pozostałe miejsce"], ["❸", "startuj od 220px, rośnij i kurcz się — z flex-wrap daje responsywne karty"], ["❹", "logo z lewej, reszta menu dociśnięta do prawej"], ["❺", "pokaż jako pierwszy; wyrównaj do dołu"]],
        },
      ],
      try: {
        html: `<div class="row">
  <aside class="side">Sidebar</aside>
  <main class="content">Treść</main>
</div>`,
        css: `.row { display: flex; gap: 12px; }
.side { flex: 0 0 150px; background: #fbf1d6; padding: 12px; }
.content { flex: 1; background: #e3ebfd; padding: 12px; }`,
        task: "Dodaj trzeci element `<aside>` po prawej o szerokości 100px. Potem nadaj sidebarowi `order: 2`.",
      },
    },
    {
      id: "grid",
      title: "CSS Grid: siatka",
      keywords: ["grid", "grid-template-columns", "fr", "repeat", "minmax", "auto-fill", "gap", "galeria"],
      theory: [
        "Grid układa elementy w **dwóch wymiarach**: kolumnach i wierszach. Definiujesz kolumny na kontenerze, a dzieci same wypełniają kolejne komórki.",
        "`fr` to ułamek wolnego miejsca: `1fr 2fr` = druga kolumna dwa razy szersza. `repeat(3, 1fr)` = 3 równe kolumny. `repeat(auto-fill, minmax(200px, 1fr))` = tyle kolumn po min. 200px, ile się zmieści — responsywna galeria **bez media queries**.",
      ],
      syntax: [
        {
          title: "Siatka kolumn",
          lang: "css",
          code: `
.grid {
  display: grid;                                   /* ❶ */
  grid-template-columns: repeat(3, 1fr);           /* ❷ */
  grid-template-rows: auto;                        /* ❸ */
  gap: 16px;                                       /* ❹ */
}
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));  /* ❺ */
  gap: 12px;
}
.gallery img { width: 100%; aspect-ratio: 4 / 3; object-fit: cover; }  /* ❻ */`,
          legend: [["❶", "włącza grid"], ["❷", "3 równe kolumny"], ["❸", "wysokość wierszy dopasowana do treści"], ["❹", "odstęp między komórkami (wiersze i kolumny)"], ["❺", "automatycznie tyle kolumn, ile się zmieści — idealne do galerii w Projekcie 1"], ["❻", "zdjęcia równej wielkości bez zniekształceń"]],
        },
      ],
      try: {
        html: `<div class="gallery">
  <img src="https://picsum.photos/id/10/400/300" alt="Las">
  <img src="https://picsum.photos/id/11/400/300" alt="Pole">
  <img src="https://picsum.photos/id/12/400/300" alt="Plaża">
  <img src="https://picsum.photos/id/13/400/300" alt="Wybrzeże">
  <img src="https://picsum.photos/id/14/400/300" alt="Morze">
  <img src="https://picsum.photos/id/15/400/300" alt="Wodospad">
</div>`,
        css: `.gallery {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}
.gallery img { width: 100%; display: block; }`,
        task: "Zamień kolumny na `repeat(auto-fill, minmax(150px, 1fr))` i zmieniaj szerokość okna przeglądarki. Dodaj `aspect-ratio: 1` i `object-fit: cover` obrazkom.",
      },
    },
    {
      id: "grid-obszary",
      title: "Grid: rozciąganie i obszary (layout strony)",
      keywords: ["grid-column", "grid-row", "span", "grid-template-areas", "grid-area", "layout strony"],
      theory: [
        "Element może zajmować kilka komórek: `grid-column: 1 / 3` (od linii 1 do 3) albo `grid-column: span 2` (2 kolumny). Linie siatki numerujemy od 1, a `-1` to ostatnia linia.",
        "`grid-template-areas` pozwala narysować układ strony nazwami — najczytelniejszy sposób na layout z nagłówkiem, menu, treścią i stopką.",
      ],
      syntax: [
        {
          title: "Layout strony obszarami",
          lang: "css",
          code: `
.page {
  display: grid;
  grid-template-columns: 220px 1fr;          /* ❶ */
  grid-template-rows: auto 1fr auto;         /* ❷ */
  grid-template-areas:                       /* ❸ */
    "header header"
    "nav    main"
    "footer footer";
  min-height: 100vh;
}
header { grid-area: header; }                /* ❹ */
nav    { grid-area: nav; }
main   { grid-area: main; }
footer { grid-area: footer; }

.featured { grid-column: span 2; }           /* ❺ */
.wide     { grid-column: 1 / -1; }           /* ❻ */`,
          legend: [["❶", "menu 220px, treść resztę"], ["❷", "nagłówek i stopka wg treści, środek rozciągnięty"], ["❸", "mapa układu: każdy napis to wiersz"], ["❹", "przypisanie elementu do obszaru"], ["❺", "karta zajmuje 2 kolumny"], ["❻", "od pierwszej do ostatniej linii = cała szerokość"]],
        },
      ],
      try: {
        html: `<div class="page">
  <header>Header</header>
  <nav>Nav</nav>
  <main>Main</main>
  <footer>Footer</footer>
</div>`,
        css: `body { margin: 0; }
.page {
  display: grid;
  grid-template-columns: 160px 1fr;
  grid-template-rows: 60px 1fr 50px;
  grid-template-areas:
    "header header"
    "nav    main"
    "footer footer";
  min-height: 100vh;
}
header { grid-area: header; background: #2a9d8f; }
nav { grid-area: nav; background: #e9c46a; }
main { grid-area: main; background: #f1f1f1; }
footer { grid-area: footer; background: #264653; color: white; }
.page > * { padding: 12px; }`,
        task: "Przenieś menu na prawą stronę, zmieniając tylko `grid-template-areas` i `grid-template-columns`.",
        solution: `grid-template-columns: 1fr 160px;
grid-template-areas:
  "header header"
  "main   nav"
  "footer footer";`,
        solutionFile: "css",
      },
    },
    {
      id: "media-queries",
      title: "Media queries i mobile-first",
      keywords: ["media", "@media", "responsywność", "rwd", "mobile-first", "breakpoint", "min-width", "max-width", "viewport"],
      theory: [
        "**Media query** dodaje style tylko wtedy, gdy spełniony jest warunek (np. szerokość okna). Bez `<meta name=\"viewport\">` w HTML na telefonie nie zadziałają poprawnie.",
        "**Mobile-first**: najpierw piszesz style dla telefonu (jedna kolumna), a potem przez `@media (min-width: …)` dodajesz układ dla większych ekranów. Łatwiej rozbudowywać niż ściskać. Typowe progi (breakpointy): 600–768px (tablet), 1024px (laptop).",
      ],
      syntax: [
        {
          title: "Mobile-first",
          lang: "css",
          code: `
/* ❶ baza: telefon — wszystko w jednej kolumnie */
.cards { display: grid; grid-template-columns: 1fr; gap: 16px; }
.menu  { display: flex; flex-direction: column; }

/* ❷ od 768px: tablet */
@media (min-width: 768px) {
  .cards { grid-template-columns: repeat(2, 1fr); }
  .menu  { flex-direction: row; }
}

/* ❸ od 1024px: komputer */
@media (min-width: 1024px) {
  .cards { grid-template-columns: repeat(3, 1fr); }
}

/* ❹ inne warunki */
@media (orientation: landscape) { }
@media (prefers-color-scheme: dark) { }
@media print { nav { display: none; } }`,
          legend: [["❶", "style bez @media działają wszędzie"], ["❷", "min-width = od tej szerokości w górę"], ["❸", "kolejny próg nadpisuje poprzedni"], ["❹", "orientacja, motyw systemu, wydruk"]],
          explain: "Testuj w DevTools: Ctrl+Shift+M (tryb urządzenia) i zmieniaj szerokość.",
        },
      ],
      mistakes: [
        { lang: "css", bad: "@media (max-width: 768px) { ... }\n@media (max-width: 1024px) { ... }  /* nadpisze poprzednie */", good: "@media (min-width: 768px) { ... }\n@media (min-width: 1024px) { ... }", why: "Przy mobile-first używaj `min-width` w rosnącej kolejności — wtedy kolejne progi logicznie się nadpisują." },
      ],
      try: {
        html: `<div class="cards">
  <div class="card">1</div><div class="card">2</div><div class="card">3</div>
  <div class="card">4</div><div class="card">5</div><div class="card">6</div>
</div>`,
        css: `.cards { display: grid; grid-template-columns: 1fr; gap: 10px; }
.card { background: #e3f1ef; padding: 24px; text-align: center; border-radius: 8px; }

@media (min-width: 400px) {
  .cards { grid-template-columns: repeat(2, 1fr); }
}`,
        task: "Dodaj próg `min-width: 600px` z 3 kolumnami. Zwężaj okno (albo przesuń granicę podglądu) i obserwuj.",
      },
    },
    {
      id: "rwd-elementy",
      title: "Responsywne obrazy, jednostki i menu",
      keywords: ["max-width", "clamp", "img responsywne", "menu mobilne", "hamburger", "aspect-ratio"],
      theory: [
        "Obrazy i wideo nie mogą wychodzić poza ekran: `max-width: 100%; height: auto;`. Kontener treści ograniczaj `max-width` i centruj `margin-inline: auto`.",
        "`clamp(min, preferowana, max)` daje płynny rozmiar czcionki bez progów. Menu na telefonie zwykle chowa się pod przyciskiem (pokazuje go JS — moduł M7).",
      ],
      syntax: [
        {
          title: "Najważniejsze reguły RWD",
          lang: "css",
          code: `
img, video { max-width: 100%; height: auto; display: block; }   /* ❶ */

.container {
  width: min(100% - 32px, 1100px);    /* ❷ */
  margin-inline: auto;                /* ❸ */
}

h1 { font-size: clamp(1.75rem, 4vw, 3rem); }   /* ❹ */

.nav-links { display: none; }                  /* ❺ */
.nav-links.open { display: flex; flex-direction: column; }
@media (min-width: 768px) {
  .menu-toggle { display: none; }
  .nav-links { display: flex; flex-direction: row; }
}`,
          legend: [["❶", "media nigdy szersze niż rodzic"], ["❷", "pełna szerokość z marginesem 16px, ale maks. 1100px"], ["❸", "wyśrodkowanie bloku"], ["❹", "rośnie z oknem między 1.75rem a 3rem"], ["❺", "menu ukryte na telefonie, JS dodaje klasę .open; od tabletu zawsze widoczne"]],
        },
      ],
      try: {
        html: `<div class="container">
  <h1>Responsywny nagłówek</h1>
  <img src="https://picsum.photos/id/1043/1600/600" alt="Szeroki krajobraz">
</div>`,
        css: `.container { width: min(100% - 32px, 700px); margin-inline: auto; }
h1 { font-size: 2rem; }`,
        task: "Bez `max-width: 100%` obraz wystaje — dodaj regułę dla `img`. Potem zmień rozmiar `h1` na `clamp(1.5rem, 5vw, 3rem)`.",
      },
    },
    {
      id: "efekty",
      title: "Transition, transform i animacje",
      keywords: ["transition", "transform", "translate", "rotate", "scale", "animation", "keyframes", "hover"],
      theory: [
        "`transform` przesuwa, obraca, skaluje element bez wpływu na układ innych (`translate`, `rotate`, `scale`, `skew`). `transition` sprawia, że zmiana właściwości (np. przy `:hover`) dzieje się płynnie.",
        "Algorytm `transition`: 1) styl zwykły, 2) styl końcowy (np. `:hover`), 3) `transition` na stylu zwykłym. Dłuższe, zapętlone animacje robi się przez `@keyframes`. Szanuj `prefers-reduced-motion`.",
      ],
      syntax: [
        {
          title: "Płynny hover i animacja",
          lang: "css",
          code: `
.card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;   /* ❶ */
}
.card:hover {
  transform: translateY(-4px) scale(1.02);                 /* ❷ */
  box-shadow: 0 10px 24px rgb(0 0 0 / 12%);
}

@keyframes pulse {                                         /* ❸ */
  from { opacity: 1; }
  50%  { opacity: 0.4; }
  to   { opacity: 1; }
}
.loading { animation: pulse 1.2s ease-in-out infinite; }   /* ❹ */

@media (prefers-reduced-motion: reduce) {                  /* ❺ */
  * { transition: none !important; animation: none !important; }
}`,
          legend: [["❶", "właściwość, czas, krzywa — na stylu zwykłym"], ["❷", "stan końcowy: w górę o 4px i lekko większy"], ["❸", "definicja klatek animacji"], ["❹", "nazwa, czas, krzywa, liczba powtórzeń"], ["❺", "wyłącz ruch dla osób, które sobie tego nie życzą"]],
        },
      ],
      try: {
        html: `<div class="card">Najedź na mnie</div>`,
        css: `.card {
  width: 200px; padding: 30px; text-align: center;
  background: #e3f1ef; border-radius: 12px;
}
.card:hover {
  transform: rotate(3deg);
}`,
        task: "Dodaj `transition: transform 0.3s` do `.card`, żeby obrót był płynny. Potem połącz obrót ze `scale(1.1)`.",
      },
    },
    {
      id: "wzorce",
      title: "Gotowe wzorce: navbar, karty, stopka",
      keywords: ["navbar", "karta", "card", "stopka", "footer", "hero", "wzorce", "layout"],
      theory: [
        "Większość stron składa się z kilku powtarzalnych wzorców. Poznaj je i łącz w Projekcie 1: **navbar** (flex), **hero** (duży baner na stronie głównej), **siatka kart** (grid), **stopka**.",
      ],
      syntax: [
        {
          title: "Navbar + karty + stopka",
          lang: "css",
          code: `
.navbar {                                  /* ❶ */
  display: flex; align-items: center; gap: 24px;
  padding: 12px 24px;
}
.navbar .logo { margin-right: auto; font-weight: 700; }
.navbar a { text-decoration: none; }
.navbar a[aria-current="page"] { border-bottom: 2px solid currentColor; }  /* ❷ */

.hero {                                    /* ❸ */
  display: grid; place-items: center; text-align: center;
  min-height: 60vh; padding: 48px 16px;
}

.cards {                                   /* ❹ */
  display: grid; gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
}
.card { padding: 20px; border-radius: 12px; background: white; box-shadow: 0 2px 10px rgb(0 0 0 / 8%); }

footer {                                   /* ❺ */
  display: flex; flex-wrap: wrap; justify-content: space-between; gap: 12px;
  padding: 24px; margin-top: 48px;
}`,
          legend: [["❶", "logo z lewej, linki z prawej"], ["❷", "wyróżnienie bieżącej podstrony"], ["❸", "place-items: center — wyśrodkowanie w gridzie jedną linijką"], ["❹", "karty projektów/produktów"], ["❺", "stopka zawija się na wąskich ekranach"]],
        },
      ],
      try: {
        html: `<nav class="navbar">
  <span class="logo">Jan Kowalski</span>
  <a href="#" aria-current="page">Home</a>
  <a href="#">Galeria</a>
  <a href="#">Kontakt</a>
</nav>
<section class="hero">
  <div>
    <h1>Cześć, tworzę strony WWW</h1>
    <p>Student informatyki</p>
  </div>
</section>`,
        css: `body { margin: 0; font-family: system-ui, sans-serif; }
.navbar { display: flex; align-items: center; gap: 24px; padding: 12px 24px; background: #1d5c54; }
.navbar a, .navbar .logo { color: white; text-decoration: none; }
.navbar .logo { margin-right: auto; font-weight: 700; }
.hero { display: grid; place-items: center; text-align: center; min-height: 40vh; background: #e3f1ef; }`,
        task: "Dodaj pod hero sekcję z 3 kartami w siatce `auto-fill` i stopkę z imieniem i nazwiskiem.",
      },
    },
  ],
  flashcards: [
    ["Na którym elemencie ustawiasz `display: flex`?", "Na kontenerze (rodzicu). Układane są jego bezpośrednie dzieci."],
    ["`justify-content` a `align-items`?", "`justify-content` — oś główna; `align-items` — oś poprzeczna."],
    ["Co zmienia `flex-direction: column`?", "Oś główna staje się pionowa, więc justify i align zamieniają kierunki."],
    ["Co oznacza `flex: 1`?", "Element rośnie i dzieli wolne miejsce po równo z innymi elementami z `flex: 1`."],
    ["Jak zrobić galerię bez media queries?", "`grid-template-columns: repeat(auto-fill, minmax(200px, 1fr))`."],
    ["Co to jednostka `fr`?", "Ułamek wolnego miejsca w Grid."],
    ["Ile kolumn zajmie `grid-column: 1 / 4`?", "3 (od linii 1 do linii 4)."],
    ["Flex czy Grid do całego layoutu strony?", "Grid (dwa wymiary). Flex do jednego wiersza/kolumny, np. menu."],
    ["Czym jest mobile-first?", "Style bazowe dla telefonu, a większe ekrany dodajesz przez `@media (min-width: …)`."],
    ["Czego potrzebujesz w HTML, żeby media queries działały na telefonie?", "`<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">`."],
    ["Jak sprawić, by obraz nie wychodził poza ekran?", "`img { max-width: 100%; height: auto; }`"],
    ["Co robi `clamp(1.5rem, 4vw, 3rem)`?", "Wartość płynna (4vw), ale nie mniejsza niż 1.5rem i nie większa niż 3rem."],
    ["Trzy kroki użycia `transition`?", "Styl zwykły → styl końcowy (np. :hover) → `transition` na stylu zwykłym."],
    ["Jak wyśrodkować element w pionie i poziomie?", "Rodzic: `display: flex; justify-content: center; align-items: center;` (albo grid + `place-items: center`)."],
  ],
  quiz: [
    { q: "Która właściwość zawija elementy flex do nowej linii?", options: ["flex-flow-wrap", "flex-wrap: wrap", "wrap: true", "overflow: wrap"], answer: 1 },
    { q: "Która właściwość wyrównuje elementy flex w pionie (przy flex-direction: row)?", options: ["justify-content", "align-items", "vertical-align", "text-align"], answer: 1 },
    { q: "Ile kolumn utworzy ten kod?", code: ".grid {\n  display: grid;\n  grid-template-columns: 200px 1fr 1fr;\n}", lang: "css", options: ["1", "2", "3", "200"], answer: 2 },
    { q: "Co robi `grid-column: 1 / -1`?", options: ["Ukrywa element", "Rozciąga element na całą szerokość siatki", "Zajmuje ostatnią kolumnę", "Odwraca kolumny"], answer: 1 },
    { q: "Który zapis to podejście mobile-first?", options: ["@media (max-width: 768px)", "@media (min-width: 768px)", "@media screen only", "@media (orientation: portrait)"], answer: 1 },
    { q: "Co się stanie z kodem na ekranie 500px?", code: ".box { width: 100%; }\n@media (min-width: 768px) {\n  .box { width: 50%; }\n}", lang: "css", options: ["width 50%", "width 100%", "błąd", "width 768px"], answer: 1, explain: "Warunek min-width: 768px nie jest spełniony, więc działa styl bazowy." },
    { q: "`1fr 2fr` — druga kolumna jest:", options: ["2px szersza", "dwa razy szersza od pierwszej", "taka sama", "dwa razy węższa"], answer: 1 },
    { q: "Którą funkcją transform obrócisz element?", options: ["skew()", "rotate()", "translate()", "scale()"], answer: 1 },
    { q: "Gdzie umieszczasz `transition`, żeby animował się i wjazd, i powrót z :hover?", options: ["Tylko w :hover", "Na stylu zwykłym", "W @keyframes", "W media query"], answer: 1 },
    { q: "Jak logo w navbarze (flex) dosunąć do lewej, a linki do prawej?", options: ["float: left", ".logo { margin-right: auto }", ".logo { order: 99 }", "text-align: right"], answer: 1 },
  ],
});
