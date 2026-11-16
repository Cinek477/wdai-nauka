/* M3 — CSS: podstawy */
WDAI.modules.push({
  id: "m3",
  code: "M3",
  tech: "css",
  title: "CSS — selektory, kaskada, box model",
  short: "CSS podstawy",
  lab: "Lab 1–2",
  syllabus: "W1",
  intro: "CSS decyduje o wyglądzie: kolorach, czcionkach, odstępach i położeniu elementów. Za wygląd i jakość dostajesz w Projekcie 1 aż 5 punktów.",
  topics: [
    {
      id: "skladnia",
      title: "Jak dołączyć CSS i jak wygląda reguła",
      keywords: ["link", "style", "inline", "reguła", "selektor", "deklaracja", "właściwość"],
      theory: [
        "CSS można dodać na 3 sposoby: **zewnętrzny plik** przez `<link>` (najlepiej — jeden plik dla wszystkich podstron), blok `<style>` w `<head>` albo atrybut `style` w elemencie (unikaj — trudno utrzymać).",
        "**Reguła** CSS to **selektor** (CO stylujemy) i **blok deklaracji** w nawiasach klamrowych. Każda **deklaracja** to `właściwość: wartość;`.",
      ],
      syntax: [
        {
          title: "Budowa reguły",
          lang: "css",
          code: `
/* komentarz w CSS */
h1 {                       /* ❶ selektor */
  color: #1d5c54;          /* ❷ właściwość: wartość; */
  font-size: 2rem;
}

nav a, footer a {          /* ❸ grupowanie selektorów przecinkiem */
  text-decoration: none;
}`,
          legend: [["❶", "selektor — do których elementów stosujemy styl"], ["❷", "deklaracja; każda kończy się średnikiem"], ["❸", "ta sama reguła dla kilku selektorów"]],
        },
        {
          title: "3 sposoby dołączenia",
          lang: "html",
          code: `
<!-- ❶ zewnętrzny plik (zalecane) -->
<link rel="stylesheet" href="css/style.css" />

<!-- ❷ blok w head -->
<style>
  body { background: #f7f7f5; }
</style>

<!-- ❸ inline — tylko wyjątkowo -->
<p style="color: red;">Uwaga!</p>`,
          legend: [["❶", "jeden wspólny plik dla wszystkich podstron — wymóg spójności w Projekcie 1"], ["❷", "style tylko dla tej strony"], ["❸", "styl jednego elementu; ma najwyższą specyficzność"]],
        },
      ],
      try: {
        html: `<h1>Nagłówek</h1>
<p>Akapit tekstu.</p>
<p class="lead">Akapit z klasą lead.</p>`,
        css: `h1 {
  color: #1d5c54;
}`,
        task: "Ustaw wszystkim akapitom kolor `#555`, a akapitowi z klasą `.lead` rozmiar `1.25rem`.",
        solution: `h1 { color: #1d5c54; }
p { color: #555; }
.lead { font-size: 1.25rem; }`,
        solutionFile: "css",
      },
    },
    {
      id: "selektory",
      title: "Selektory",
      keywords: ["klasa", "id", "potomek", "dziecko", "pseudoklasa", "hover", "nth-child", "pseudoelement", "before", "after", "atrybut"],
      theory: [
        "Selektor wskazuje elementy. Najczęściej stylujemy po **klasach** (`.card`) — można je dawać wielu elementom i łączyć. `#id` jest unikalny i ma bardzo wysoką specyficzność, więc w CSS używaj go rzadko.",
        "**Pseudoklasy** (`:hover`, `:focus`, `:nth-child()`) wybierają elementy w danym stanie lub pozycji. **Pseudoelementy** (`::before`, `::after`, `::first-letter`) tworzą „wirtualną” część elementu.",
      ],
      syntax: [
        {
          title: "Rodzaje selektorów",
          lang: "css",
          code: `
p { }                     /* ❶ element (typ) */
.card { }                 /* ❷ klasa */
#kontakt { }              /* ❸ id */
nav a { }                 /* ❹ potomek: każdy a wewnątrz nav */
ul > li { }               /* ❺ bezpośrednie dziecko */
h2 + p { }                /* ❻ pierwszy p zaraz po h2 */
input[type="email"] { }   /* ❼ atrybut */
a:hover { }               /* ❽ pseudoklasa: najechanie myszą */
li:nth-child(odd) { }     /* ❾ co drugi (nieparzyste) */
.card::before { content: "★ "; }  /* ❿ pseudoelement */`,
          legend: [
            ["❶", "wszystkie elementy danego typu"],
            ["❷", "elementy z class=\"card\""],
            ["❸", "element z id=\"kontakt\""],
            ["❹", "spacja = na dowolnej głębokości wewnątrz"],
            ["❺", "> = tylko bezpośrednie dzieci"],
            ["❻", "+ = sąsiad zaraz po (~ = dowolny kolejny sąsiad)"],
            ["❼", "po atrybucie i jego wartości"],
            ["❽", "stany: :hover, :focus, :active, :visited, :checked, :disabled"],
            ["❾", "pozycja: :first-child, :last-child, :nth-child(2), :nth-child(3n)"],
            ["❿", "wstawiona treść przed elementem (wymaga content)"],
          ],
        },
        {
          title: "Kolejność stanów linku: LVHA",
          lang: "css",
          code: `
a:link    { color: #1d5c54; }   /* nieodwiedzony */
a:visited { color: #6a45a3; }   /* odwiedzony */
a:hover   { color: #c2410c; }   /* najechanie */
a:active  { color: #000; }      /* w trakcie kliknięcia */
a:focus-visible { outline: 3px solid #1d5c54; }  /* fokus z klawiatury */`,
          explain: "Kolejność ma znaczenie (zapamiętaj „LoVe HAte”), bo przy tej samej specyficzności wygrywa reguła napisana później.",
        },
      ],
      mistakes: [
        { lang: "css", bad: "#menu #lista #element { color: red; }", good: ".menu-item { color: red; }", why: "Selektory po id są bardzo silne i trudno je potem nadpisać. Stylując, używaj klas." },
      ],
      try: {
        html: `<nav>
  <a href="#">Home</a>
  <a href="#">Galeria</a>
  <a href="#">Kontakt</a>
</nav>
<ul>
  <li>Pierwszy</li><li>Drugi</li><li>Trzeci</li><li>Czwarty</li>
</ul>`,
        css: `nav a {
  margin-right: 12px;
}
nav a:hover {
  color: #c2410c;
}`,
        task: "Pokoloruj co drugi element listy na szaro (`li:nth-child(even)`) i dodaj przed każdym linkiem w nav znak `→` przez `::before`.",
        solution: `nav a { margin-right: 12px; }
nav a:hover { color: #c2410c; }
li:nth-child(even) { background: #eee; }
nav a::before { content: "→ "; }`,
        solutionFile: "css",
      },
    },
    {
      id: "kaskada",
      title: "Kaskada, specyficzność i dziedziczenie",
      keywords: ["kaskada", "specyficzność", "important", "dziedziczenie", "inherit", "priorytet"],
      theory: [
        "Gdy kilka reguł ustawia tę samą właściwość, przeglądarka rozstrzyga konflikt w kolejności: **1. istotność** (`!important`), **2. specyficzność** selektora, **3. kolejność** w kodzie (późniejsza wygrywa).",
        "**Specyficzność** liczymy jako trójkę (ID, KLASY, ELEMENTY): `#id` = (1,0,0), `.klasa` / `[atrybut]` / `:pseudoklasa` = (0,1,0), `element` / `::pseudoelement` = (0,0,1). Styl inline jest silniejszy od każdego selektora. Często zapisuje się to jako 100 / 10 / 1.",
        "**Dziedziczenie**: część właściwości (głównie tekstowe: `color`, `font-family`, `font-size`, `line-height`) przechodzi z rodzica na dzieci. Dlatego czcionkę ustawiasz raz na `body`. Właściwości pudełka (`margin`, `border`, `background`) się nie dziedziczą.",
      ],
      syntax: [
        {
          title: "Liczenie specyficzności",
          lang: "css",
          code: `
p               { color: black; }   /* ❶ (0,0,1) */
.lead           { color: gray; }    /* ❷ (0,1,0) */
main .lead      { color: blue; }    /* ❸ (0,1,1) */
#intro          { color: green; }   /* ❹ (1,0,0) */
#intro .lead a:hover { }            /* ❺ (1,2,1) */
p { color: red !important; }        /* ❻ wygrywa ze wszystkim */`,
          legend: [["❶", "1 element"], ["❷", "1 klasa — mocniejsza niż dowolna liczba elementów"], ["❸", "klasa + element"], ["❹", "1 id — mocniejsze niż dowolna liczba klas"], ["❺", "id + klasa + pseudoklasa + element"], ["❻", "!important łamie kaskadę — używaj tylko w ostateczności"]],
          explain: "Policz specyficzność dowolnego selektora w zakładce **Narzędzia**.",
        },
      ],
      mistakes: [
        { lang: "css", bad: ".btn { color: white !important; }", good: ".hero .btn { color: white; }", why: "Zamiast `!important` zwiększ specyficzność albo przenieś regułę niżej w pliku." },
      ],
      try: {
        html: `<main>
  <p id="intro" class="lead">Jaki kolor ma ten tekst?</p>
</main>`,
        css: `#intro { color: green; }
main .lead { color: blue; }
.lead { color: gray; }
p { color: black; }`,
        task: "Przewidź kolor, a potem usuwaj reguły od góry i sprawdzaj, która przejmuje kontrolę.",
      },
    },
    {
      id: "kolory-jednostki",
      title: "Kolory i jednostki",
      keywords: ["hex", "rgb", "hsl", "px", "rem", "em", "%", "vw", "vh", "kolor", "przezroczystość"],
      theory: [
        "Kolory zapisujemy jako nazwy (`red`), hex (`#1d5c54`), `rgb(29 92 84)` lub `hsl(173 52% 24%)`. Przezroczystość: `rgb(0 0 0 / 50%)` albo hex z 8 znakami. Zadbaj o **kontrast** tekstu z tłem (min. 4.5:1).",
        ["`px` — piksele (ramki, cienie).", "`rem` — wielokrotność rozmiaru czcionki `html` (domyślnie 16px): najlepsza do czcionek i odstępów.", "`em` — wielokrotność czcionki rodzica.", "`%` — procent rodzica.", "`vw` / `vh` — procent szerokości / wysokości okna (`100dvh` uwzględnia pasek przeglądarki w telefonie).", "`fr` — część wolnego miejsca w Grid."],
      ],
      syntax: [
        {
          title: "Zapisy kolorów i jednostek",
          lang: "css",
          code: `
.box {
  color: #1d1d1f;                    /* ❶ hex */
  background: rgb(29 92 84 / 15%);   /* ❷ rgb z przezroczystością */
  border: 2px solid hsl(173 52% 24%);/* ❸ hsl: odcień, nasycenie, jasność */
  font-size: 1.125rem;               /* ❹ 18px przy domyślnych 16px */
  padding: 1em;                      /* ❺ względem czcionki tego elementu */
  width: 50%;                        /* ❻ połowa rodzica */
  min-height: 50vh;                  /* ❼ połowa wysokości okna */
}`,
          legend: [["❶", "#RRGGBB"], ["❷", "ostatnia wartość = przezroczystość"], ["❸", "łatwo robić jaśniejsze i ciemniejsze odcienie"], ["❹", "rem — skaluje się z ustawieniami użytkownika"], ["❺", "em"], ["❻", "%"], ["❼", "vh"]],
        },
      ],
      try: {
        html: `<div class="box">Pudełko</div>`,
        css: `.box {
  background: hsl(173 52% 24%);
  color: white;
  padding: 1rem;
  width: 50%;
}`,
        task: "Zmień jasność w `hsl` z 24% na 85% i kolor tekstu na ciemny. Ustaw szerokość `30vw` i zmień rozmiar okna.",
      },
    },
    {
      id: "typografia",
      title: "Typografia i Google Fonts",
      keywords: ["font", "font-family", "google fonts", "font-size", "font-weight", "line-height", "text-align", "letter-spacing"],
      theory: [
        "Czcionkę ustaw raz na `body` (dziedziczy się), a nagłówkom możesz dać inną. Zawsze podawaj czcionki zapasowe, a na końcu rodzinę ogólną (`sans-serif`, `serif`, `monospace`).",
        "Google Fonts: wybierz czcionkę na fonts.google.com → „Get embed code” → wklej `<link>` do `<head>` (przed swoim CSS) → użyj nazwy w `font-family`.",
        "Czytelność: tekst ~16–18px, `line-height` 1.5–1.7, szerokość akapitu do ~70 znaków (`max-width: 65ch`).",
      ],
      syntax: [
        {
          title: "Czcionki z Google Fonts",
          lang: "html",
          code: `
<head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Space+Grotesk:wght@700&display=swap"
        rel="stylesheet" />                <!-- ❶ -->
  <link rel="stylesheet" href="css/style.css" />  <!-- ❷ -->
</head>`,
          legend: [["❶", "kod z Google Fonts — tylko potrzebne grubości (wght)"], ["❷", "twój CSS po czcionkach"]],
        },
        {
          title: "Właściwości tekstu",
          lang: "css",
          code: `
body {
  font-family: "Inter", system-ui, sans-serif;  /* ❶ */
  font-size: 1rem;
  line-height: 1.6;                              /* ❷ */
  color: #1d1d1f;
}
h1, h2 {
  font-family: "Space Grotesk", sans-serif;
  font-weight: 700;                              /* ❸ */
  letter-spacing: -0.02em;
}
p { max-width: 65ch; }                           /* ❹ */
.center { text-align: center; }                  /* ❺ */
a { text-decoration: none; }
.upper { text-transform: uppercase; }`,
          legend: [["❶", "lista czcionek: pierwsza dostępna wygrywa"], ["❷", "interlinia bez jednostki = mnożnik rozmiaru"], ["❸", "grubość: 400 normalna, 700 pogrubiona"], ["❹", "ch = szerokość znaku „0”; ogranicza długość linii"], ["❺", "left, center, right, justify"]],
        },
      ],
      try: {
        html: `<h1>Moje portfolio</h1>
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>`,
        css: `@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap");

body {
  font-family: "Inter", sans-serif;
}`,
        task: "Ustaw `line-height: 1.7`, `max-width: 60ch` dla akapitu i wycentruj nagłówek. (W pliku projektu czcionkę dodaj przez `<link>`, tu przez `@import`).",
      },
    },
    {
      id: "box-model",
      title: "Model pudełkowy (box model)",
      keywords: ["box model", "margin", "padding", "border", "box-sizing", "border-box", "zapadanie marginesów", "width"],
      theory: [
        "Każdy element to prostokątne pudełko z warstwami (od środka): **content** (treść) → **padding** (wewnętrzny odstęp) → **border** (ramka) → **margin** (zewnętrzny odstęp).",
        "Domyślnie (`box-sizing: content-box`) `width` dotyczy tylko treści, więc padding i border **powiększają** element. Z `box-sizing: border-box` `width` obejmuje też padding i border — dużo łatwiej liczyć, dlatego ustawia się to dla wszystkich elementów.",
        "**Zapadanie marginesów**: pionowe marginesy dwóch sąsiednich bloków nie sumują się — wygrywa większy.",
      ],
      syntax: [
        {
          title: "Warstwy i skróty",
          lang: "css",
          code: `
*, *::before, *::after { box-sizing: border-box; }  /* ❶ */

.card {
  width: 300px;
  padding: 16px;                   /* ❷ wszystkie strony */
  border: 2px solid #ddd;          /* ❸ grubość styl kolor */
  margin: 0 auto 24px;             /* ❹ góra | prawo-lewo | dół */
  border-radius: 12px;
}
/* skróty margin/padding — zgodnie z ruchem wskazówek zegara: */
margin: 10px;                /* wszystkie */
margin: 10px 20px;           /* pion | poziom */
margin: 10px 20px 30px;      /* góra | poziom | dół */
margin: 10px 20px 30px 40px; /* góra prawo dół lewo */`,
          legend: [["❶", "reset: width obejmuje padding i border (zawsze na początku pliku)"], ["❷", "wewnętrzny odstęp — tło go wypełnia"], ["❸", "style ramki: solid, dashed, dotted, none"], ["❹", "auto w poziomie centruje blok o ustalonej szerokości"]],
        },
        {
          title: "Obliczenie szerokości",
          lang: "css",
          code: `
p {
  width: 200px; padding: 5px; border: 2px solid; margin: 10px;
}
/* content-box: 200 + 2×5 + 2×2 = 214px pudełka, z marginesem 234px */
/* border-box:  200px pudełka (treść ma 186px), z marginesem 220px  */`,
          explain: "Przelicz własne przykłady w zakładce **Narzędzia → Box model**.",
        },
      ],
      mistakes: [
        { lang: "css", bad: ".col { width: 50%; padding: 20px; }  /* dwie kolumny się nie mieszczą */", good: "* { box-sizing: border-box; }\n.col { width: 50%; padding: 20px; }", why: "Bez border-box padding dodaje się do 50% i suma przekracza 100%." },
      ],
      try: {
        html: `<div class="box">Pudełko</div>
<div class="box">Drugie pudełko</div>`,
        css: `.box {
  width: 200px;
  padding: 20px;
  border: 5px solid #1d5c54;
  margin: 20px;
  background: #e3f1ef;
}`,
        task: "Zbadaj pudełko w DevTools (prawy klik → Zbadaj → zakładka Computed). Dodaj `box-sizing: border-box` i porównaj szerokość. Sprawdź, ile wynosi odstęp między pudełkami (zapadanie marginesów).",
      },
    },
    {
      id: "display-position",
      title: "display i position",
      keywords: ["display", "block", "inline", "inline-block", "none", "position", "relative", "absolute", "fixed", "sticky", "z-index"],
      theory: [
        ["`display: block` — nowa linia, pełna szerokość, działa width/height.", "`display: inline` — w linii tekstu, width/height nie działają.", "`display: inline-block` — w linii, ale z width/height.", "`display: none` — element znika (nie zajmuje miejsca).", "`display: flex` / `grid` — układ dzieci (moduł M4)."],
        ["`position: static` — domyślnie, normalny przepływ.", "`relative` — przesunięcie względem własnego miejsca; staje się punktem odniesienia dla dzieci `absolute`.", "`absolute` — wyjęty z przepływu, względem najbliższego przodka z position ≠ static.", "`fixed` — przyklejony do okna (np. przycisk „do góry”).", "`sticky` — jak relative, a po przewinięciu przykleja się (np. nagłówek)."],
        "`z-index` ustala, co jest na wierzchu (działa dla elementów z position ≠ static).",
      ],
      syntax: [
        {
          title: "Plakietka w rogu karty",
          lang: "css",
          code: `
.card {
  position: relative;          /* ❶ punkt odniesienia */
}
.card .badge {
  position: absolute;          /* ❷ */
  top: 8px;
  right: 8px;                  /* ❸ */
  z-index: 1;
}
.site-header {
  position: sticky;            /* ❹ */
  top: 0;
}
.hidden { display: none; }     /* ❺ */`,
          legend: [["❶", "rodzic z relative"], ["❷", "dziecko absolute liczy pozycję od rodzica"], ["❸", "odległość od prawej i górnej krawędzi rodzica"], ["❹", "nagłówek przykleja się do góry przy przewijaniu"], ["❺", "klasa do ukrywania (JS może ją przełączać)"]],
        },
      ],
      try: {
        html: `<div class="card">
  <span class="badge">NOWE</span>
  <h3>Projekt</h3>
  <p>Opis projektu</p>
</div>`,
        css: `.card { position: relative; width: 240px; padding: 16px; border: 1px solid #ccc; border-radius: 12px; }
.badge { position: absolute; top: 8px; right: 8px; background: #c2410c; color: white; padding: 2px 8px; border-radius: 999px; font-size: 12px; }`,
        task: "Usuń `position: relative` z `.card` i zobacz, gdzie „ucieknie” plakietka. Potem przenieś ją do lewego dolnego rogu.",
      },
    },
    {
      id: "zmienne",
      title: "Zmienne CSS (custom properties)",
      keywords: ["zmienne", "var", "custom properties", "root", "motyw", "dark mode"],
      theory: [
        "Zmienne CSS przechowują wartości, których używasz wielokrotnie (kolory, odstępy, czcionki). Definiujesz je zwykle w `:root` (cała strona), a odczytujesz funkcją `var()`. Zmiana w jednym miejscu zmienia całą stronę — idealne do spójnej palety i ciemnego motywu.",
      ],
      syntax: [
        {
          title: "Paleta strony i ciemny motyw",
          lang: "css",
          code: `
:root {                                    /* ❶ */
  --color-bg: #f7f7f5;
  --color-text: #1d1d1f;
  --color-accent: #1d5c54;
  --radius: 12px;
  --space: 16px;
}
[data-theme="dark"] {                      /* ❷ */
  --color-bg: #15171c;
  --color-text: #e8e8ea;
}
body {
  background: var(--color-bg);             /* ❸ */
  color: var(--color-text);
}
.btn {
  background: var(--color-accent);
  border-radius: var(--radius);
  padding: calc(var(--space) / 2) var(--space);  /* ❹ */
  color: var(--color-btn-text, white);     /* ❺ */
}`,
          legend: [["❶", "definicje: nazwa zaczyna się od --"], ["❷", "nadpisanie zmiennych, gdy <html data-theme=\"dark\">"], ["❸", "odczyt wartości"], ["❹", "calc() liczy na zmiennych"], ["❺", "druga wartość = zapasowa, gdy zmiennej nie ma"]],
          explain: "Przełączanie motywu w JS: `document.documentElement.dataset.theme = \"dark\"` (moduł M7).",
        },
      ],
      try: {
        html: `<button class="btn">Przycisk</button>
<p>Tekst na tle.</p>`,
        css: `:root {
  --bg: #f7f7f5;
  --text: #1d1d1f;
  --accent: #1d5c54;
}
body { background: var(--bg); color: var(--text); }
.btn { background: var(--accent); color: white; border: 0; padding: 8px 16px; border-radius: 8px; }`,
        task: "Zmień tylko wartości zmiennych tak, żeby strona była ciemna z pomarańczowym akcentem.",
      },
    },
    {
      id: "tla-ramki",
      title: "Tła, ramki, cienie i zaokrąglenia",
      keywords: ["background", "gradient", "border-radius", "box-shadow", "opacity", "background-image", "object-fit"],
      theory: [
        "Tło może być kolorem, obrazem albo gradientem. `background-size: cover` wypełnia obrazem cały element. Cień `box-shadow` i zaokrąglenie `border-radius` nadają kartom głębię. Nie przesadzaj — spójność i umiar dają lepszy efekt niż wiele efektów naraz.",
      ],
      syntax: [
        {
          title: "Karta z obrazem w tle",
          lang: "css",
          code: `
.hero {
  background-image: linear-gradient(rgb(0 0 0 / 45%), rgb(0 0 0 / 45%)),
                    url("../img/hero.jpg");      /* ❶ */
  background-size: cover;                        /* ❷ */
  background-position: center;
  color: white;
}
.card {
  border-radius: 12px;                           /* ❸ */
  box-shadow: 0 4px 16px rgb(0 0 0 / 10%);       /* ❹ x y rozmycie kolor */
}
.avatar {
  border-radius: 50%;                            /* ❺ koło */
  width: 120px; height: 120px;
  object-fit: cover;                             /* ❻ */
}`,
          legend: [["❶", "przyciemnienie gradientem nałożonym na zdjęcie (czytelny tekst)"], ["❷", "obraz pokrywa cały element"], ["❸", "zaokrąglone rogi"], ["❹", "miękki cień"], ["❺", "50% = okrąg"], ["❻", "obraz w <img> wypełnia ramkę bez zniekształcenia"]],
          explain: "Ścieżka w `url()` w pliku CSS jest liczona względem **pliku CSS**, nie HTML — stąd `../img/`.",
        },
      ],
      try: {
        html: `<div class="hero"><h1>Cześć, jestem Jan</h1></div>
<img class="avatar" src="https://picsum.photos/id/64/300/300" alt="Zdjęcie profilowe">`,
        css: `.hero {
  background-image: linear-gradient(rgb(0 0 0 / 45%), rgb(0 0 0 / 45%)), url("https://picsum.photos/id/1015/800/300");
  background-size: cover;
  background-position: center;
  color: white;
  padding: 60px 24px;
  border-radius: 12px;
}
.avatar { width: 120px; height: 120px; object-fit: cover; }`,
        task: "Zrób z avatara koło z białą ramką 4px i cieniem.",
        solution: `.avatar {
  width: 120px; height: 120px; object-fit: cover;
  border-radius: 50%;
  border: 4px solid white;
  box-shadow: 0 4px 16px rgb(0 0 0 / 20%);
}`,
        solutionFile: "css",
      },
    },
  ],
  flashcards: [
    ["Z czego składa się reguła CSS?", "Selektor + blok deklaracji `{ właściwość: wartość; }`."],
    ["Który sposób dołączania CSS jest zalecany i dlaczego?", "Zewnętrzny plik przez `<link>` — jeden plik dla wszystkich podstron, łatwe utrzymanie."],
    ["`nav a` a `nav > a`?", "`nav a` — każdy link wewnątrz nav na dowolnej głębokości; `nav > a` — tylko bezpośrednie dzieci."],
    ["Kolejność rozstrzygania konfliktów w CSS?", "Istotność (`!important`) → specyficzność → kolejność w kodzie (późniejsza wygrywa)."],
    ["Specyficzność `#menu .item a`?", "(1,1,1) — czyli 111."],
    ["Które właściwości się dziedziczą?", "Głównie tekstowe: `color`, `font-*`, `line-height`, `text-align`. Pudełkowe (margin, border, background) nie."],
    ["Czym różni się `rem` od `em`?", "`rem` liczy się od czcionki `html` (stała baza), `em` od czcionki rodzica / elementu."],
    ["Warstwy box modelu od środka?", "content → padding → border → margin."],
    ["Co robi `box-sizing: border-box`?", "`width` obejmuje treść + padding + border, więc padding nie powiększa elementu."],
    ["Co to zapadanie marginesów?", "Pionowe marginesy sąsiednich bloków nie sumują się — wygrywa większy."],
    ["`margin: 10px 20px` oznacza…", "10px góra i dół, 20px lewo i prawo."],
    ["Względem czego pozycjonuje się `position: absolute`?", "Względem najbliższego przodka z position innym niż static (inaczej względem strony)."],
    ["`fixed` a `sticky`?", "fixed — zawsze w tym samym miejscu okna; sticky — normalnie w przepływie, przykleja się po przewinięciu."],
    ["Jak zdefiniować i użyć zmienną CSS?", "`:root { --accent: #1d5c54; }` i `color: var(--accent);`"],
    ["Jak zrobić okrągły avatar?", "`border-radius: 50%` + równa szerokość i wysokość + `object-fit: cover`."],
    ["Kolejność pseudoklas linków?", "LVHA: `:link`, `:visited`, `:hover`, `:active`."],
  ],
  quiz: [
    { q: "Jaka jest specyficzność selektora `.nav .item a`?", options: ["(0,2,1)", "(1,0,1)", "(0,1,2)", "(0,2,0)"], answer: 0 },
    { q: "Jaki kolor będzie miał tekst?", code: "#intro { color: green; }\n.lead { color: blue; }\np { color: red; }\n\n<p id=\"intro\" class=\"lead\">Tekst</p>", lang: "css", options: ["red", "blue", "green", "czarny"], answer: 2, explain: "ID (1,0,0) wygrywa z klasą i elementem, niezależnie od kolejności." },
    { q: "Dwie reguły mają tę samą specyficzność. Która wygrywa?", options: ["Pierwsza w pliku", "Ostatnia w pliku", "Krótsza", "Losowa"], answer: 1 },
    { q: "width: 200px; padding: 10px; border: 5px; box-sizing: content-box. Szerokość pudełka (bez margin)?", options: ["200px", "215px", "230px", "250px"], answer: 2, explain: "200 + 2×10 + 2×5 = 230px." },
    { q: "To samo z `box-sizing: border-box`?", options: ["200px", "230px", "170px", "210px"], answer: 0 },
    { q: "Bloki mają `margin-bottom: 30px` i `margin-top: 20px`. Jaki jest odstęp między nimi?", options: ["50px", "30px", "20px", "10px"], answer: 1, explain: "Pionowe marginesy się zapadają — wygrywa większy." },
    { q: "Który selektor wybierze tylko linki bezpośrednio w nav?", options: ["nav a", "nav > a", "nav + a", "nav ~ a"], answer: 1 },
    { q: "Która właściwość się dziedziczy?", options: ["margin", "border", "color", "padding"], answer: 2 },
    { q: "Jak odczytać zmienną CSS `--main`?", options: ["$main", "var(--main)", "@main", "--main()"], answer: 1 },
    { q: "Którego `position` użyjesz dla nagłówka, który przykleja się do góry przy przewijaniu?", options: ["relative", "absolute", "sticky", "static"], answer: 2 },
    { q: "`a:hover` to przykład:", options: ["pseudoelementu", "pseudoklasy", "selektora atrybutu", "selektora id"], answer: 1 },
    { q: "Co oznacza `1.5rem` przy domyślnych ustawieniach przeglądarki?", options: ["15px", "24px", "1.5px", "150%"], answer: 1, explain: "1rem = 16px, więc 1.5rem = 24px." },
  ],
});
