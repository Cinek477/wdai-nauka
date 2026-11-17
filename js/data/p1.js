/* Przewodnik: Projekt 1 — statyczna strona WWW (mikro projekt), krok po kroku.
   Klocki i szkielety do uzupełnienia — stronę budujesz sam. */
WDAI.modules.push({
  id: "projekt1",
  code: "PROJEKT 1",
  guide: true,
  tech: "html",
  title: "Projekt 1 — mikro projekt krok po kroku",
  short: "Projekt 1: przewodnik",
  lab: "Lab 1–2 (+ JS z Lab 3)",
  syllabus: "W1, U1",
  intro: "Statyczna strona WWW za 15 pkt: struktura i nawigacja (2), formularz (1.5), galeria i media (1.5), wygląd (5 × 1), dodatkowo walidacja (0.5), publikacja (0.5), responsywność (2) i JavaScript (2). Każdy krok mówi, które wymaganie spełnia, jakiej składni potrzebujesz (z linkami do lekcji) i daje szkielet do uzupełnienia. Projekt piszesz sam — swoim tematem i treścią.",
  topics: [
    {
      id: "plan",
      title: "0. Plan: temat, punktacja, foldery",
      keywords: ["projekt 1", "temat", "portfolio", "punktacja", "struktura folderów", "wymagania"],
      theory: [
        "**Temat:** domyślnie osobiste portfolio / wizytówka (można później rozbudować o blog i projekty). Własny temat (hobby, wydarzenie, produkt, film, gra) jest OK, jeśli ma porównywalny zakres — w razie wątpliwości zapytaj prowadzącego.",
        "**Punktacja (15 pkt):**",
        ["Struktura i nawigacja — 2.0: ≥3 podstrony, wspólny `<nav>`, `<footer>` z imieniem i nazwiskiem, semantyka, spójny nagłówek/stopka.", "Formularz kontaktowy — 1.5: `type=\"email\"`, `<select>` ≥3 opcje, `<textarea>`, submit, każde pole z `<label>`.", "Galeria i media — 1.5: kilka obrazów z sensownym `alt`, układ Grid/Flex, ≥1 `<video>`.", "Wygląd — 5 × 1.0: typografia, kolory i kontrast, layout i odstępy, spójność, dopracowanie.", "Dodatkowe — walidacja 0.5, publikacja 0.5, responsywność 2.0, JavaScript 2.0."],
        "Możesz wykorzystać to, co zrobiłeś na Lab 1: artykuł → sekcja „O mnie”, tabela → CV/doświadczenie, kwadraty → galeria/projekty, `style.css` → początek stylów.",
      ],
      syntax: [
        {
          title: "Struktura folderów",
          lang: "bash",
          code: `
Projekt_1/
  index.html        # Home (strona główna)
  galeria.html      # Galeria / Projekty
  kontakt.html      # Kontakt z formularzem
  css/
    style.css       # JEDEN wspólny arkusz dla wszystkich podstron
  js/
    app.js          # JavaScript (motyw, menu, formularz…)
  img/              # zdjęcia (małe litery, bez spacji i polskich znaków!)
  video/            # film do galerii (albo osadzenie z YouTube)`,
          explain: "Nazwy plików pisz małymi literami, bez spacji i polskich znaków (`moje-zdjecie.jpg`). GitHub Pages rozróżnia wielkość liter — `Foto.JPG` ≠ `foto.jpg`.",
        },
      ],
      tip: "Postęp odhaczaj w zakładce **Zadania i punkty** → Projekt 1. Każde wymaganie ma tam link do odpowiedniego kroku tego przewodnika.",
    },
    {
      id: "szkielet",
      title: "1. Szkielet podstron i nawigacja (2 pkt)",
      keywords: ["szkielet", "podstrony", "nav", "footer", "header", "main", "semantyka", "aria-current", "struktura"],
      theory: [
        "**Wymaganie:** ≥3 podstrony z działającą wspólną nawigacją, stopka z imieniem i nazwiskiem, znaczniki semantyczne; nagłówek, nawigacja i stopka identyczne na każdej podstronie — zmienia się tylko `<main>`.",
        "**Składnia:** szablon HTML5 i semantyka ([M2 → Szkielet](modul.html?id=m2#struktura), [M2 → Semantyka](modul.html?id=m2#semantyka)), linki ([M2 → Linki](modul.html?id=m2#linki-obrazy)).",
        ["Zrób `index.html` ze szkieletem poniżej i sprawdź go w przeglądarce.", "Skopiuj plik jako `galeria.html` i `kontakt.html` — zmień `<title>`, treść `<main>` i to, który link ma `aria-current=\"page\"`.", "Kliknij każdy link na każdej podstronie — wszystkie mają działać."],
      ],
      syntax: [
        {
          title: "Szablon każdej podstrony",
          lang: "html",
          code: `
<!DOCTYPE html>
<html lang="pl">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />  <!-- ❶ -->
    <title>Home — Imię Nazwisko</title>                                    <!-- ❷ -->
    <link rel="stylesheet" href="css/style.css" />
    <script src="js/app.js" defer></script>
  </head>
  <body>
    <header class="site-header">                                           <!-- ❸ -->
      <a href="index.html" class="logo">Imię Nazwisko</a>
      <nav aria-label="Główna nawigacja">
        <ul class="nav-links">
          <li><a href="index.html" aria-current="page">Home</a></li>      <!-- ❹ -->
          <li><a href="galeria.html">Galeria</a></li>
          <li><a href="kontakt.html">Kontakt</a></li>
        </ul>
      </nav>
    </header>

    <main>                                                                 <!-- ❺ -->
      <h1>Tytuł podstrony</h1>
    </main>

    <footer class="site-footer">© 2026 Imię Nazwisko</footer>              <!-- ❻ -->
  </body>
</html>`,
          legend: [["❶", "obowiązkowe pod responsywność (2 pkt)"], ["❷", "inny tytuł na każdej podstronie"], ["❸", "nagłówek identyczny wszędzie"], ["❹", "aria-current wskazuje BIEŻĄCĄ podstronę — przenieś go na każdej stronie"], ["❺", "jedyna część, która się zmienia"], ["❻", "stopka z imieniem i nazwiskiem — wymóg"]],
        },
      ],
      mistakes: [
        { lang: "html", bad: "<div class=\"menu\">\n  <div><a href=\"index.html\">Home</a></div>\n</div>", good: "<nav aria-label=\"Główna nawigacja\">\n  <ul><li><a href=\"index.html\">Home</a></li></ul>\n</nav>", why: "Semantyka jest oceniana — menu to `<nav>`, lista linków to `<ul>`." },
        { lang: "html", bad: "<a href=\"C:/Users/jan/Projekt_1/galeria.html\">", good: "<a href=\"galeria.html\">", why: "Ścieżki bezwzględne z dysku nie zadziałają u prowadzącego ani na GitHub Pages." },
      ],
      try: {
        html: `<header class="site-header">
  <a href="#" class="logo">Imię Nazwisko</a>
  <nav aria-label="Główna nawigacja">
    <ul class="nav-links">
      <li><a href="#" aria-current="page">Home</a></li>
      <li><a href="#">Galeria</a></li>
      <li><a href="#">Kontakt</a></li>
    </ul>
  </nav>
</header>
<main>
  <h1>Tytuł podstrony</h1>
</main>
<footer class="site-footer">© 2026 Imię Nazwisko</footer>`,
        css: `body { margin: 0; font-family: system-ui, sans-serif; }
header, main, footer { padding: 12px 16px; }
header, footer { background: #eee; }`,
        task: "Wpisz swoje imię i nazwisko, wymyśl nazwę strony i dodaj w `<main>` jedną `<section>` z nagłówkiem `<h2>`.",
      },
    },
    {
      id: "style",
      title: "2. Wspólny CSS: paleta, czcionki, podstawy (wygląd)",
      keywords: ["style.css", "paleta", "kolory", "zmienne", "google fonts", "typografia", "reset", "kontrast"],
      theory: [
        "**Wymaganie (wygląd 5 × 1 pkt):** czytelna typografia z hierarchią nagłówków, spójna paleta z dobrym kontrastem, sensowne odstępy, ten sam styl na wszystkich podstronach, brak niedokończonych elementów.",
        "**Składnia:** [M3 → Zmienne](modul.html?id=m3#zmienne), [M3 → Typografia](modul.html?id=m3#typografia), [M3 → Box model](modul.html?id=m3#box-model). Gotowe cele: [Ściąga CSS → Jak zrobić…?](sciaga-css.html).",
        ["Wybierz **2–3 kolory**: tło, tekst, akcent (np. z coolors.co). Wpisz je jako zmienne — zmienisz paletę w jednym miejscu.", "Wybierz **1–2 czcionki** z Google Fonts (np. jedna na nagłówki, druga na tekst).", "Ustal rozmiary nagłówków, interlinię i maksymalną szerokość tekstu."],
      ],
      syntax: [
        {
          title: "Początek style.css",
          lang: "css",
          code: `
/* 1. Reset */
*, *::before, *::after { box-sizing: border-box; }             /* ❶ */
body { margin: 0; }
img, video { max-width: 100%; height: auto; display: block; }  /* ❷ */

/* 2. Paleta i stałe — TU wpisz swoje kolory */
:root {
  --bg: #f7f7f5;          /* tło */
  --text: #1d1d1f;        /* tekst */
  --accent: #1d5c54;      /* akcent: linki, przyciski */
  --radius: 12px;
  --font-body: "Inter", system-ui, sans-serif;
  --font-head: "Space Grotesk", sans-serif;
}

/* 3. Typografia */
body {
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-body);
  font-size: 1rem;
  line-height: 1.6;                                            /* ❸ */
}
h1, h2, h3 { font-family: var(--font-head); line-height: 1.2; }
h1 { font-size: clamp(2rem, 5vw, 3rem); }                      /* ❹ */
h2 { font-size: 1.6rem; }
p { max-width: 65ch; }                                         /* ❺ */
a { color: var(--accent); }`,
          legend: [["❶", "width obejmuje padding i ramkę — łatwiejszy layout"], ["❷", "obrazy i wideo nigdy nie wyjdą poza ekran"], ["❸", "interlinia = czytelność"], ["❹", "płynny rozmiar nagłówka"], ["❺", "krótsze linie tekstu łatwiej się czyta"]],
          explain: "Czcionki: na fonts.google.com wybierz krój → „Get embed code” → wklej `<link>` do `<head>` KAŻDEJ podstrony, przed `style.css`.",
        },
      ],
      mistakes: [
        { lang: "css", bad: "body { background: #222; color: #444; }  /* ciemny na ciemnym */", good: "body { background: #222; color: #eee; }", why: "Kontrast tekstu z tłem jest oceniany. Sprawdzaj go w DevTools (podgląd koloru pokazuje współczynnik, min. 4.5)." },
      ],
      try: {
        html: `<h1>Imię Nazwisko</h1>
<h2>O mnie</h2>
<p>Studiuję informatykę i tworzę strony internetowe. Lubię góry i fotografię.</p>
<a href="#">Zobacz moje projekty</a>`,
        css: `@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Space+Grotesk:wght@700&display=swap");

:root {
  --bg: #f7f7f5;
  --text: #1d1d1f;
  --accent: #1d5c54;
}
body {
  background: var(--bg);
  color: var(--text);
  font-family: "Inter", sans-serif;
  line-height: 1.6;
}
h1, h2 { font-family: "Space Grotesk", sans-serif; }
a { color: var(--accent); }`,
        task: "Zmień tylko wartości zmiennych tak, żeby pasowały do Twojego tematu. Sprawdź kontrast tekstu.",
      },
    },
    {
      id: "layout",
      title: "3. Layout: nagłówek, menu, treść, stopka",
      keywords: ["layout", "flex", "grid", "navbar", "stopka na dole", "kontener", "sticky footer"],
      theory: [
        "**Wymaganie:** strona ma layout oparty o Flexbox lub Grid; elementy nie nachodzą na siebie, mają sensowne odstępy (layout i odstępy — 1 pkt).",
        "**Składnia:** [M4 → Flexbox](modul.html?id=m4#flex-kontener), [M4 → Grid](modul.html?id=m4#grid), [M4 → Wzorce](modul.html?id=m4#wzorce).",
        ["Nagłówek: logo z lewej, linki z prawej (flex).", "Cała strona: grid z trzema wierszami — stopka zawsze na dole, nawet przy krótkiej treści.", "Treść w kontenerze o ograniczonej szerokości, wyśrodkowanym."],
      ],
      syntax: [
        {
          title: "Layout strony",
          lang: "css",
          code: `
body {
  display: grid;
  grid-template-rows: auto 1fr auto;          /* ❶ */
  min-height: 100dvh;
}

.site-header {
  display: flex;                               /* ❷ */
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 16px 24px;
}
.nav-links {
  display: flex; gap: 20px;
  list-style: none; margin: 0; padding: 0;     /* ❸ */
}
.nav-links a { text-decoration: none; }
.nav-links a[aria-current="page"] { font-weight: 700; border-bottom: 2px solid currentColor; }  /* ❹ */

main {
  width: min(100% - 32px, 1100px);             /* ❺ */
  margin-inline: auto;
  padding-block: 32px;
}
.site-footer { padding: 24px; text-align: center; }`,
          legend: [["❶", "header i footer wg treści, main zabiera resztę — stopka zawsze na dole"], ["❷", "logo i menu w jednym rzędzie, rozsunięte"], ["❸", "lista bez kropek i wcięć"], ["❹", "wyróżnienie bieżącej podstrony"], ["❺", "kontener: pełna szerokość z marginesem 16px, ale maks. 1100px"]],
        },
      ],
      try: {
        html: `<header class="site-header">
  <a href="#" class="logo">Imię Nazwisko</a>
  <nav><ul class="nav-links">
    <li><a href="#" aria-current="page">Home</a></li>
    <li><a href="#">Galeria</a></li>
    <li><a href="#">Kontakt</a></li>
  </ul></nav>
</header>
<main><h1>Treść</h1><p>Krótka treść — a stopka i tak jest na dole.</p></main>
<footer class="site-footer">© 2026 Imię Nazwisko</footer>`,
        css: `body { margin: 0; font-family: system-ui, sans-serif; display: grid; grid-template-rows: auto 1fr auto; min-height: 100vh; }
.site-header { display: flex; align-items: center; justify-content: space-between; padding: 16px 24px; background: #1d5c54; }
.site-header a { color: white; text-decoration: none; }
.nav-links { display: flex; gap: 20px; list-style: none; margin: 0; padding: 0; }
main { width: min(100% - 32px, 900px); margin-inline: auto; }
.site-footer { padding: 16px; text-align: center; background: #eee; }`,
        task: "Wyróżnij bieżący link (`[aria-current=\"page\"]`) pogrubieniem i podkreśleniem. Dodaj efekt `:hover` dla linków.",
      },
    },
    {
      id: "home",
      title: "4. Strona główna: hero i sekcje",
      keywords: ["home", "strona główna", "hero", "sekcje", "karty", "o mnie", "projekty", "pierwsze wrażenie"],
      theory: [
        "**Wymaganie:** Home to najważniejsza strona — ma robić dobre pierwsze wrażenie i pasować do tematu. Typowo: duży baner (hero) z tytułem i przyciskiem, potem 2–3 sekcje (o mnie, umiejętności/projekty, wezwanie do kontaktu).",
        "**Składnia:** [M3 → Tła](modul.html?id=m3#tla-ramki), [M4 → Wzorce](modul.html?id=m4#wzorce), [M2 → Semantyka](modul.html?id=m2#semantyka).",
      ],
      syntax: [
        {
          title: "Hero i siatka kart",
          lang: "html",
          code: `
<main>
  <section class="hero">                                  <!-- ❶ -->
    <h1>Cześć, jestem Ola</h1>
    <p>Studentka informatyki. Tworzę proste i czytelne strony.</p>
    <a class="btn" href="galeria.html">Zobacz projekty</a>
  </section>

  <section id="o-mnie">
    <h2>O mnie</h2>
    <p>...</p>
  </section>

  <section id="projekty">
    <h2>Projekty</h2>
    <div class="cards">                                   <!-- ❷ -->
      <article class="card">
        <img src="img/projekt1.jpg" alt="Zrzut ekranu strony z przepisami" />
        <h3>Strona przepisów</h3>
        <p>HTML i CSS.</p>
      </article>
      <!-- kolejne karty -->
    </div>
  </section>
</main>`,
          legend: [["❶", "hero — pierwsze, co widzi użytkownik"], ["❷", "karty w siatce (CSS poniżej)"]],
        },
        {
          title: "CSS hero i kart",
          lang: "css",
          code: `
.hero {
  display: grid; place-items: center; text-align: center; gap: 12px;
  min-height: 60vh; padding: 48px 16px; border-radius: var(--radius);
  background: linear-gradient(rgb(0 0 0 / 45%), rgb(0 0 0 / 45%)), url("../img/hero.jpg") center / cover;  /* ❶ */
  color: white;
}
.btn {
  display: inline-block; padding: 12px 20px; border-radius: 8px;
  background: var(--accent); color: white; text-decoration: none;
  transition: transform 0.2s;
}
.btn:hover { transform: translateY(-2px); }
section + section { margin-top: 48px; }                    /* ❷ */
.cards { display: grid; gap: 20px; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); }  /* ❸ */
.card { background: white; border-radius: var(--radius); padding: 16px; box-shadow: 0 4px 16px rgb(0 0 0 / 8%); }
.card img { border-radius: 8px; aspect-ratio: 16 / 9; object-fit: cover; width: 100%; }`,
          legend: [["❶", "zdjęcie przyciemnione gradientem — biały tekst jest czytelny; ścieżka względem pliku CSS"], ["❷", "odstęp między sekcjami"], ["❸", "karty same układają się w kolumny"]],
        },
      ],
      try: {
        html: `<section class="hero">
  <h1>Cześć, jestem Ola</h1>
  <p>Tworzę proste i czytelne strony.</p>
  <a class="btn" href="#">Zobacz projekty</a>
</section>`,
        css: `body { margin: 0; font-family: system-ui, sans-serif; }
.hero {
  display: grid; place-items: center; text-align: center; gap: 8px;
  min-height: 50vh; padding: 32px 16px; color: white;
  background: linear-gradient(rgb(0 0 0 / 45%), rgb(0 0 0 / 45%)), url("https://picsum.photos/id/1018/1200/600") center / cover;
}
.btn { padding: 10px 18px; border-radius: 8px; background: #1d5c54; color: white; text-decoration: none; }`,
        task: "Pod hero dodaj sekcję „Projekty” z trzema kartami w siatce `auto-fill` (obraz, tytuł, opis).",
      },
    },
    {
      id: "kontakt",
      title: "5. Kontakt: formularz i walidacja (1.5 + 0.5 pkt)",
      keywords: ["formularz", "kontakt", "label", "email", "select", "textarea", "submit", "walidacja", "required", "placeholder"],
      theory: [
        "**Wymaganie (1.5 pkt):** pole `type=\"email\"`, `<select>` z ≥3 opcjami, `<textarea>`, przycisk wysyłania; **każde pole z `<label>`** (placeholder pomocniczo, ale nie zamiast etykiety).",
        "**Dodatkowe (0.5 pkt):** walidacja przez HTML — `required`, odpowiednie typy, `minlength`, `pattern`… i czytelna informacja o błędzie.",
        "**Składnia:** [M2 → Formularze](modul.html?id=m2#formularze), [M2 → Walidacja](modul.html?id=m2#walidacja), [Ściąga HTML → Formularze](sciaga.html#cat-formularze).",
      ],
      syntax: [
        {
          title: "Formularz spełniający wymagania",
          lang: "html",
          code: `
<form class="contact-form" action="#" method="post">
  <div class="field">
    <label for="email">E-mail</label>                                   <!-- ❶ -->
    <input id="email" name="email" type="email"
           placeholder="jan@example.com" required />                    <!-- ❷ -->
  </div>
  <div class="field">
    <label for="topic">Temat</label>
    <select id="topic" name="topic" required>                           <!-- ❸ -->
      <option value="">— wybierz —</option>
      <option value="wspolpraca">Współpraca</option>
      <option value="pytanie">Pytanie</option>
      <option value="inne">Inne</option>
    </select>
  </div>
  <div class="field">
    <label for="msg">Wiadomość</label>
    <textarea id="msg" name="message" rows="6" minlength="10"
              placeholder="Twoja wiadomość…" required></textarea>         <!-- ❹ -->
  </div>
  <button type="submit">Wyślij</button>                                <!-- ❺ -->
</form>`,
          legend: [["❶", "etykieta połączona z polem przez for/id — wymóg"], ["❷", "type=email + required = walidacja"], ["❸", "≥3 opcje; pusta pierwsza + required wymusza wybór"], ["❹", "minimum 10 znaków"], ["❺", "przycisk wysyłania"]],
        },
        {
          title: "Wygląd formularza i błędów",
          lang: "css",
          code: `
.contact-form { display: grid; gap: 16px; max-width: 520px; }
.field { display: grid; gap: 6px; }
input, select, textarea {
  font: inherit; padding: 10px 12px;
  border: 1px solid #c9c9c4; border-radius: 8px;
}
input:focus-visible, select:focus-visible, textarea:focus-visible {
  outline: 3px solid var(--accent); outline-offset: 1px;
}
:is(input, select, textarea):user-invalid { border-color: #c0392b; background: #fdf1ef; }  /* ❶ */
button { justify-self: start; padding: 10px 20px; border: 0; border-radius: 8px;
         background: var(--accent); color: white; font: inherit; cursor: pointer; }`,
          legend: [["❶", "czerwone dopiero po interakcji — czytelna informacja o błędzie"]],
        },
      ],
      try: {
        html: `<form class="contact-form">
  <div class="field">
    <label for="email">E-mail</label>
    <input id="email" name="email" type="email" placeholder="jan@example.com" required>
  </div>
  <button type="submit">Wyślij</button>
</form>`,
        css: `body { font-family: system-ui, sans-serif; }
.contact-form { display: grid; gap: 14px; max-width: 380px; }
.field { display: grid; gap: 4px; }
input, select, textarea { font: inherit; padding: 8px 10px; border: 1px solid #bbb; border-radius: 8px; }
:is(input, select, textarea):user-invalid { border-color: #c0392b; background: #fdf1ef; }
button { justify-self: start; padding: 8px 18px; border: 0; border-radius: 8px; background: #1d5c54; color: white; }`,
        task: "Uzupełnij formularz o `<select>` (≥3 opcje) i `<textarea>` z etykietami. Wyślij pusty i zobacz komunikaty.",
      },
    },
    {
      id: "galeria",
      title: "6. Galeria i wideo (1.5 pkt)",
      keywords: ["galeria", "zdjęcia", "grid", "alt", "video", "object-fit", "aspect-ratio", "youtube", "figure"],
      theory: [
        "**Wymaganie:** kilka obrazów, każdy z **sensownym** `alt` (co jest na zdjęciu, nie „zdjecie1”); układ Grid lub Flex, który dopasowuje się do miejsca; przynajmniej jeden `<video>`.",
        "**Składnia:** [M4 → Grid](modul.html?id=m4#grid), [M2 → Wideo](modul.html?id=m2#multimedia), [M2 → Obrazy](modul.html?id=m2#linki-obrazy).",
        "Zdjęcia zmniejsz przed wrzuceniem (np. do 1200px szerokości, squoosh.app) — strona będzie szybsza. Film: własny plik `.mp4` (mały!) albo osadzenie z YouTube przez `<iframe>` — ale wymóg mówi o `<video>`, więc dodaj przynajmniej jeden.",
      ],
      syntax: [
        {
          title: "Galeria",
          lang: "html",
          code: `
<section>
  <h2>Galeria</h2>
  <div class="gallery">                                                <!-- ❶ -->
    <figure>
      <img src="img/tatry.jpg" alt="Morskie Oko otoczone szczytami Tatr" loading="lazy" />  <!-- ❷ -->
      <figcaption>Morskie Oko, lipiec 2025</figcaption>
    </figure>
    <!-- kolejne figure -->
  </div>
</section>

<section>
  <h2>Film</h2>
  <video controls width="720" poster="img/okladka.jpg">               <!-- ❸ -->
    <source src="video/film.mp4" type="video/mp4" />
    Twoja przeglądarka nie obsługuje wideo.
  </video>
</section>`,
          legend: [["❶", "kontener siatki"], ["❷", "alt opisuje treść zdjęcia; lazy = szybsze ładowanie"], ["❸", "controls = przyciski; poster = obraz przed startem"]],
        },
        {
          title: "CSS galerii",
          lang: "css",
          code: `
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));   /* ❶ */
  gap: 12px;
}
.gallery figure { margin: 0; }
.gallery img {
  width: 100%; aspect-ratio: 4 / 3; object-fit: cover;           /* ❷ */
  border-radius: 8px;
  transition: transform 0.3s;
}
.gallery img:hover { transform: scale(1.03); }
.gallery figcaption { font-size: 0.9rem; opacity: 0.8; margin-top: 4px; }
video { width: 100%; max-width: 720px; border-radius: 8px; }`,
          legend: [["❶", "tyle kolumn, ile się zmieści — galeria sama się zawija"], ["❷", "wszystkie zdjęcia równej wielkości, bez zniekształceń"]],
        },
      ],
      try: {
        html: `<div class="gallery">
  <figure><img src="https://picsum.photos/id/1015/600/400" alt="Rzeka w górskiej dolinie"><figcaption>Dolina</figcaption></figure>
  <figure><img src="https://picsum.photos/id/1016/600/400" alt="Skalisty kanion o zachodzie"><figcaption>Kanion</figcaption></figure>
  <figure><img src="https://picsum.photos/id/1018/600/400" alt="Góry nad jeziorem"><figcaption>Jezioro</figcaption></figure>
  <figure><img src="https://picsum.photos/id/1019/600/400" alt="Wybrzeże z falami"><figcaption>Morze</figcaption></figure>
</div>
<video controls src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm"></video>`,
        css: `body { font-family: system-ui, sans-serif; }
.gallery { display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; }
.gallery figure { margin: 0; }
.gallery img { width: 100%; display: block; }
video { width: 100%; max-width: 400px; margin-top: 12px; }`,
        task: "Zamień kolumny na `repeat(auto-fill, minmax(150px, 1fr))`, dodaj `aspect-ratio: 1` i `object-fit: cover` obrazom oraz zaokrąglenie.",
      },
    },
    {
      id: "rwd",
      title: "7. Responsywność i menu mobilne (2 pkt)",
      keywords: ["responsywność", "rwd", "media queries", "mobile-first", "hamburger", "menu mobilne", "telefon", "tablet"],
      theory: [
        "**Wymaganie (2 pkt):** poprawny, czytelny układ na telefonie, tablecie i komputerze. Sprawdzaj w DevTools: **Ctrl+Shift+M** i szerokości 375px, 768px, 1280px.",
        "**Składnia:** [M4 → Media queries](modul.html?id=m4#media-queries), [M4 → Responsywne elementy](modul.html?id=m4#rwd-elementy).",
        ["Bez `<meta name=\"viewport\">` nic nie zadziała — sprawdź, czy jest na każdej podstronie.", "Obrazy i wideo: `max-width: 100%` (już w resecie).", "Galeria z `auto-fill` jest responsywna sama.", "Menu: na telefonie linki pod przyciskiem ☰ (pokazuje je JS — krok 8) albo po prostu w kolumnie/zawinięte.", "Nic nie może wystawać poza ekran w poziomie (brak poziomego paska przewijania)."],
      ],
      syntax: [
        {
          title: "Menu mobilne (mobile-first)",
          lang: "css",
          code: `
/* telefon: przycisk widoczny, linki schowane */
.menu-toggle { display: inline-flex; }                 /* ❶ */
.nav-links { display: none; flex-direction: column; gap: 12px; }
.nav-links.open { display: flex; }                     /* ❷ */
.site-header { flex-wrap: wrap; }
nav { flex-basis: 100%; }                               /* ❸ */

/* od tabletu: zwykłe menu w poziomie */
@media (min-width: 768px) {                             /* ❹ */
  .menu-toggle { display: none; }
  .nav-links { display: flex; flex-direction: row; }
  nav { flex-basis: auto; }
}`,
          legend: [["❶", "przycisk ☰ tylko na telefonie"], ["❷", "klasę open dodaje JS po kliknięciu"], ["❸", "otwarte menu pod logo, na całą szerokość"], ["❹", "od 768px menu zawsze widoczne w poziomie"]],
        },
        {
          title: "Przycisk w HTML (w <header>)",
          lang: "html",
          code: `
<button class="menu-toggle" type="button"
        aria-expanded="false" aria-controls="nav-links"
        aria-label="Otwórz menu">☰</button>              <!-- ❶ -->
<nav aria-label="Główna nawigacja">
  <ul class="nav-links" id="nav-links">...</ul>
</nav>`,
          legend: [["❶", "prawdziwy <button>; aria-expanded mówi czytnikowi ekranu, czy menu jest otwarte"]],
        },
      ],
      try: {
        html: `<header class="site-header">
  <a href="#" class="logo">Imię Nazwisko</a>
  <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="nav-links" aria-label="Otwórz menu">☰</button>
  <nav><ul class="nav-links" id="nav-links">
    <li><a href="#">Home</a></li><li><a href="#">Galeria</a></li><li><a href="#">Kontakt</a></li>
  </ul></nav>
</header>`,
        css: `body { margin: 0; font-family: system-ui, sans-serif; }
.site-header { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; padding: 12px 16px; background: #1d5c54; }
.site-header a { color: white; text-decoration: none; }
.menu-toggle { font-size: 1.4rem; background: none; border: 0; color: white; cursor: pointer; }
.nav-links { display: none; flex-direction: column; gap: 10px; list-style: none; margin: 10px 0 0; padding: 0; }
.nav-links.open { display: flex; }
nav { flex-basis: 100%; }
@media (min-width: 500px) {
  .menu-toggle { display: none; }
  .nav-links { display: flex; flex-direction: row; gap: 20px; margin: 0; }
  nav { flex-basis: auto; }
}`,
        js: `const btn = document.querySelector(".menu-toggle");
const links = document.querySelector("#nav-links");
btn.addEventListener("click", () => {
  const open = links.classList.toggle("open");
  btn.setAttribute("aria-expanded", String(open));
});`,
        task: "Zwęź podgląd poniżej 500px i kliknij ☰. Zmień ikonę na ✕, gdy menu jest otwarte.",
        hint: "`btn.textContent = open ? \"✕\" : \"☰\";`",
      },
    },
    {
      id: "javascript",
      title: "8. JavaScript: sensowna funkcja (2 pkt)",
      keywords: ["javascript", "localStorage", "motyw", "dark mode", "formularz js", "show hide", "filtr galerii", "zegar"],
      theory: [
        "**Wymaganie (2 pkt):** co najmniej jedna sensowna interakcja pasująca do tematu. Zwykłe przechodzenie między podstronami linkami **nie** jest funkcjonalnością JS.",
        "**Pomysły (wybierz 1–2 i zrób porządnie):**",
        ["**Motyw jasny/ciemny** zapamiętany w localStorage — działa na wszystkich podstronach.", "**Menu mobilne** ☰ (z kroku 7).", "**Obsługa formularza**: komunikat „Dziękujemy, …” zamiast przeładowania, licznik znaków.", "**Galeria**: filtr kategorii albo powiększenie zdjęcia po kliknięciu (lightbox).", "**Pokaż/ukryj**: rozwijane sekcje, „czytaj więcej”.", "Zegar, licznik dni do wydarzenia, losowy cytat."],
        "**Składnia:** [M7 → Zdarzenia](modul.html?id=m7#zdarzenia), [M7 → Zmiana klas](modul.html?id=m7#modyfikacja), [M7 → localStorage](modul.html?id=m7#localstorage), [M7 → Formularze w JS](modul.html?id=m7#formularze-js), [Ściąga JS](sciaga-js.html).",
      ],
      syntax: [
        {
          title: "Motyw zapamiętany w localStorage",
          lang: "js",
          code: `
// js/app.js — dołączony z defer na KAŻDEJ podstronie
const root = document.documentElement;
const saved = localStorage.getItem("theme");             // ❶
if (saved) root.dataset.theme = saved;

const themeBtn = document.querySelector("#theme-toggle");
themeBtn?.addEventListener("click", () => {               // ❷
  const next = root.dataset.theme === "dark" ? "light" : "dark";
  root.dataset.theme = next;                              // ❸
  localStorage.setItem("theme", next);                   // ❹
});`,
          legend: [["❶", "przy wejściu na stronę odczytaj zapamiętany motyw"], ["❷", "?. — nie wysypie się na podstronie bez przycisku"], ["❸", "<html data-theme=\"dark\">"], ["❹", "zapamiętaj wybór"]],
          explain: "W CSS: `[data-theme=\"dark\"] { --bg: #15171c; --text: #e8e8ea; }` — reszta stylów korzysta ze zmiennych, więc kolory zmienią się wszędzie.",
        },
        {
          title: "Obsługa formularza kontaktowego",
          lang: "js",
          code: `
const form = document.querySelector(".contact-form");
form?.addEventListener("submit", (e) => {
  e.preventDefault();                                     // ❶
  if (!form.checkValidity()) return form.reportValidity();
  const data = Object.fromEntries(new FormData(form));   // ❷
  const msg = document.createElement("p");
  msg.className = "form-ok";
  msg.textContent = \`Dziękuję, wiadomość od \${data.email} została zapisana.\`;  // ❸
  form.replaceWith(msg);
});`,
          legend: [["❶", "bez przeładowania strony"], ["❷", "wartości pól jako obiekt"], ["❸", "komunikat zamiast formularza (textContent — bezpiecznie)"]],
        },
      ],
      try: {
        html: `<button id="theme-toggle">Zmień motyw</button>
<h1>Moja strona</h1>
<p>Odśwież podgląd („Uruchom ponownie”) — motyw zostanie zapamiętany.</p>`,
        css: `:root { --bg: #f7f7f5; --text: #1d1d1f; }
[data-theme="dark"] { --bg: #15171c; --text: #e8e8ea; }
body { background: var(--bg); color: var(--text); font-family: system-ui, sans-serif; transition: background .3s, color .3s; }`,
        js: `const root = document.documentElement;
const saved = localStorage.getItem("p1-theme");
if (saved) root.dataset.theme = saved;

document.querySelector("#theme-toggle").addEventListener("click", () => {
  const next = root.dataset.theme === "dark" ? "light" : "dark";
  root.dataset.theme = next;
  localStorage.setItem("p1-theme", next);
});`,
        task: "Zmień tekst przycisku na „🌙 Ciemny” / „☀️ Jasny” zależnie od motywu (także po odświeżeniu).",
      },
    },
    {
      id: "publikacja",
      title: "9. Publikacja na GitHub Pages (0.5 pkt)",
      keywords: ["github pages", "publikacja", "hosting", "git", "push", "repozytorium"],
      theory: [
        "**Wymaganie:** działająca strona dostępna publicznie, np. przez GitHub Pages (darmowe dla publicznych repozytoriów).",
        ["Wyślij projekt do repozytorium na GitHubie (`git add`, `git commit`, `git push`).", "Na GitHubie: **Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: `main`, folder `/ (root)`** → Save.", "Po 1–2 minutach strona działa pod `https://TWOJ-LOGIN.github.io/NAZWA-REPO/`.", "Strona główna musi nazywać się `index.html` i leżeć w głównym folderze repo (albo ustaw folder w Pages).", "Sprawdź na telefonie i w trybie incognito; otwórz konsolę — zero czerwonych błędów."],
      ],
      syntax: [
        {
          title: "Wysłanie zmian",
          lang: "bash",
          code: `
git add .
git commit -m "Projekt 1: galeria i formularz"
git push`,
        },
      ],
      mistakes: [
        { lang: "html", bad: "<img src=\"IMG/Foto.JPG\">  <!-- a plik to img/foto.jpg -->", good: "<img src=\"img/foto.jpg\" alt=\"…\">", why: "Windows nie rozróżnia wielkości liter, ale GitHub Pages tak — lokalnie działa, online obrazek znika." },
      ],
    },
    {
      id: "checklista",
      title: "10. Checklista przed oddaniem",
      keywords: ["checklista", "oddanie", "sprawdzenie", "walidator", "lighthouse", "błędy", "przed oddaniem"],
      theory: [
        "**Struktura (2 pkt):**",
        ["Są ≥3 podstrony i każdy link w menu działa na każdej z nich.", "Nagłówek, menu i stopka są identyczne; `aria-current` wskazuje bieżącą stronę.", "Użyte `header`, `nav`, `main`, `section`/`article`, `footer`; jeden `h1` na stronę.", "Stopka zawiera imię i nazwisko."],
        "**Formularz i galeria (3 pkt):**",
        ["Email `type=\"email\"`, select ≥3 opcje, textarea, submit; każde pole ma `<label for>`.", "Każdy obraz ma sensowny `alt`; galeria w Grid/Flex; jest `<video>`."],
        "**Wygląd (5 pkt):**",
        ["Spójna paleta (zmienne CSS), dobry kontrast, 1–2 czcionki, wyraźna hierarchia nagłówków.", "Odstępy z sensem, nic nie nachodzi, brak „lorem ipsum” i pustych sekcji, wszystkie podstrony w tym samym stylu."],
        "**Dodatkowe (5 pkt):**",
        ["Walidacja: `required`, typy pól, komunikat o błędzie.", "Strona działa na GitHub Pages (link w README repozytorium).", "Telefon 375px / tablet 768px / komputer 1280px — bez poziomego przewijania, menu działa.", "JS: przynajmniej jedna sensowna funkcja, zero błędów w konsoli."],
        "**Narzędzia kontroli:** walidator HTML validator.w3.org (wklej adres strony), DevTools → Lighthouse (zakładka Accessibility), DevTools → Ctrl+Shift+M (rozmiary ekranu), konsola (F12).",
      ],
      tip: "Odhacz wszystko w zakładce **Zadania i punkty** — zobaczysz, ile punktów masz już pewnych.",
    },
  ],
  flashcards: [
    ["Ile podstron minimum ma mieć Projekt 1?", "3 (np. Home, Galeria, Kontakt)."],
    ["Co musi być w stopce?", "Imię i nazwisko autora."],
    ["Co zmienia się między podstronami, a co jest wspólne?", "Zmienia się `<main>`; nagłówek, nawigacja i stopka są identyczne."],
    ["Jakie pola musi mieć formularz kontaktowy?", "`input type=\"email\"`, `<select>` z ≥3 opcjami, `<textarea>`, przycisk submit — każde pole z `<label>`."],
    ["Czy placeholder może zastąpić label?", "Nie — placeholder pomocniczo, label obowiązkowo."],
    ["Co musi być w galerii?", "Kilka obrazów z sensownym alt, układ Grid/Flex i ≥1 `<video>`."],
    ["Za co są dodatkowe punkty?", "Walidacja 0.5, publikacja 0.5, responsywność 2, JavaScript 2."],
    ["Czy przechodzenie linkami między podstronami to „funkcja JS”?", "Nie — potrzebna sensowna interakcja (motyw, menu, formularz, filtr…)."],
    ["Jak włączyć GitHub Pages?", "Settings → Pages → Deploy from a branch → main, / (root) → Save."],
    ["Dlaczego obrazek działa lokalnie, a na Pages nie?", "Różna wielkość liter w nazwie pliku/ścieżce — Pages ją rozróżnia."],
    ["Jak stopka zawsze na dole przy krótkiej treści?", "`body { display: grid; grid-template-rows: auto 1fr auto; min-height: 100dvh; }`"],
    ["Za co jest 5 pkt w kategorii wygląd?", "Typografia, kolory i kontrast, layout i odstępy, spójność, dopracowanie — po 1 pkt."],
  ],
  quiz: [
    { q: "Który link poprawnie prowadzi do podstrony w tym samym folderze?", options: ["<a href=\"C:/projekt/galeria.html\">", "<a href=\"galeria.html\">", "<a href=\"/galeria\">", "<a src=\"galeria.html\">"], answer: 1 },
    { q: "Formularz ma pola z placeholderami, ale bez <label>. Czy spełnia wymagania?", options: ["Tak", "Nie — każde pole musi mieć label", "Tak, jeśli ma required", "Tylko dla email"], answer: 1 },
    { q: "Który alt jest sensowny?", options: ["alt=\"zdjecie1\"", "alt=\"obrazek\"", "alt=\"Morskie Oko otoczone szczytami Tatr\"", "brak alt"], answer: 2 },
    { q: "Co NIE jest funkcjonalnością JS w rozumieniu Projektu 1?", options: ["Motyw w localStorage", "Menu mobilne ☰", "Przejście linkiem do innej podstrony", "Filtr galerii"], answer: 2 },
    { q: "Ile punktów jest za responsywność?", options: ["0.5", "1", "2", "5"], answer: 2 },
    { q: "Co dzieje się bez <meta name=\"viewport\">?", options: ["Nic", "Telefon pokazuje pomniejszoną wersję desktopową", "Strona się nie ładuje", "Znika CSS"], answer: 1 },
    { q: "Który zapis da galerię, która sama dopasuje liczbę kolumn?", options: ["grid-template-columns: 300px 300px 300px", "grid-template-columns: repeat(auto-fill, minmax(220px, 1fr))", "display: block", "float: left"], answer: 1 },
    { q: "Gdzie podłączyć wspólny plik CSS?", options: ["Tylko w index.html", "W <head> każdej podstrony", "Na końcu body", "W stopce"], answer: 1 },
  ],
});
