/* M2 — HTML5 */
WDAI.modules.push({
  id: "m2",
  code: "M2",
  tech: "html",
  title: "HTML5 — struktura, semantyka, formularze",
  short: "HTML5",
  lab: "Lab 1–2",
  syllabus: "W1",
  intro: "HTML opisuje, czym jest każdy fragment strony: nagłówkiem, akapitem, menu, formularzem. Dobrze napisany HTML to połowa punktów w Projekcie 1 (struktura, semantyka, formularz, galeria).",
  topics: [
    {
      id: "struktura",
      title: "Szkielet dokumentu",
      keywords: ["doctype", "head", "body", "meta", "charset", "viewport", "title", "link", "script"],
      theory: [
        "Każda strona ma ten sam szkielet. `<head>` zawiera informacje **o** stronie (kodowanie, tytuł karty, podłączone pliki) — nie jest wyświetlany. `<body>` zawiera to, co widzi użytkownik.",
        "Element HTML to zwykle **znacznik otwierający**, **treść** i **znacznik zamykający**: `<p>tekst</p>`. Niektóre elementy są **puste** i nie mają zamknięcia: `<img>`, `<br>`, `<meta>`, `<link>`, `<input>`.",
      ],
      syntax: [
        {
          title: "Minimalny szablon HTML5",
          lang: "html",
          code: `
<!DOCTYPE html>                          <!-- ❶ -->
<html lang="pl">                         <!-- ❷ -->
  <head>
    <meta charset="UTF-8" />             <!-- ❸ -->
    <meta name="viewport" content="width=device-width, initial-scale=1" />  <!-- ❹ -->
    <title>Moje portfolio</title>        <!-- ❺ -->
    <link rel="stylesheet" href="css/style.css" />  <!-- ❻ -->
    <script src="js/app.js" defer></script>         <!-- ❼ -->
  </head>
  <body>
    <h1>Cześć!</h1>                      <!-- ❽ -->
  </body>
</html>`,
          legend: [
            ["❶", "deklaracja: to dokument HTML5 (bez niej przeglądarka włącza tryb zgodności)"],
            ["❷", "korzeń dokumentu; `lang` = język treści (ważne dla czytników ekranu i tłumacza)"],
            ["❸", "kodowanie znaków — bez tego polskie litery mogą się zepsuć"],
            ["❹", "obowiązkowe dla telefonów: szerokość strony = szerokość ekranu"],
            ["❺", "tytuł na karcie przeglądarki i w wynikach Google"],
            ["❻", "podłączenie arkusza CSS"],
            ["❼", "podłączenie JS; `defer` = uruchom po wczytaniu całego HTML"],
            ["❽", "widoczna treść strony"],
          ],
          explain: "W VS Code wpisz `!` i naciśnij Tab — edytor wstawi gotowy szablon (Emmet).",
        },
      ],
      mistakes: [
        { lang: "html", bad: "<head>\n  <h1>Tytuł</h1>\n</head>", good: "<body>\n  <h1>Tytuł</h1>\n</body>", why: "Widoczna treść zawsze idzie do `<body>`. W `<head>` są tylko informacje o stronie." },
        { lang: "html", bad: "<script src=\"app.js\"></script>  <!-- w head, bez defer -->", good: "<script src=\"app.js\" defer></script>", why: "Bez `defer` skrypt uruchomi się, zanim powstanie HTML, więc `document.querySelector` zwróci `null`." },
      ],
      try: {
        html: `<h1>Moja pierwsza strona</h1>
<p>To jest akapit. Zmień ten tekst i zobacz podgląd.</p>`,
        css: ``,
        js: ``,
        task: "Dodaj drugi nagłówek `<h2>` z tytułem „O mnie” i pod nim akapit o sobie.",
        solution: `<h1>Moja pierwsza strona</h1>
<p>To jest akapit.</p>
<h2>O mnie</h2>
<p>Studiuję informatykę i uczę się tworzyć strony.</p>`,
        solutionFile: "html",
      },
    },
    {
      id: "tekst",
      title: "Nagłówki, akapity i formatowanie tekstu",
      keywords: ["h1", "h2", "p", "strong", "em", "br", "hr", "blockquote", "pre", "code", "komentarz"],
      theory: [
        "Nagłówki `<h1>`–`<h6>` tworzą **hierarchię** jak spis treści: jeden `<h1>` na stronie (główny tytuł), pod nim `<h2>` dla sekcji, `<h3>` dla podsekcji. Nie wybieraj nagłówka ze względu na rozmiar — rozmiar zmienisz w CSS.",
        "`<strong>` oznacza ważny tekst (domyślnie pogrubiony), `<em>` — akcent (kursywa). `<b>` i `<i>` tylko zmieniają wygląd bez znaczenia, dlatego lepiej używać `<strong>` i `<em>`.",
      ],
      syntax: [
        {
          title: "Tekst w praktyce",
          lang: "html",
          code: `
<h1>Portfolio Jana</h1>                      <!-- ❶ -->
<h2>O mnie</h2>
<p>Jestem <strong>studentem</strong> i lubię <em>frontend</em>.</p>  <!-- ❷ -->
<p>Pierwsza linia<br />druga linia</p>       <!-- ❸ -->
<hr />                                       <!-- ❹ -->
<blockquote cite="https://developer.mozilla.org">
  <p>Cytat z dokumentacji.</p>
</blockquote>                                <!-- ❺ -->
<p>Użyj funkcji <code>console.log()</code>.</p>  <!-- ❻ -->
<pre>tekst    zachowuje
    spacje i entery</pre>                    <!-- ❼ -->
<!-- to jest komentarz, nie widać go na stronie -->  <!-- ❽ -->`,
          legend: [
            ["❶", "jeden h1 na stronę, dalej h2, h3… bez przeskakiwania poziomów"],
            ["❷", "strong = ważne, em = akcent"],
            ["❸", "wymuszone złamanie linii (używaj rzadko — akapity to osobne <p>)"],
            ["❹", "linia pozioma / zmiana tematu"],
            ["❺", "dłuższy cytat"],
            ["❻", "fragment kodu w tekście"],
            ["❼", "tekst preformatowany — zachowuje spacje"],
            ["❽", "komentarz HTML"],
          ],
        },
      ],
      mistakes: [
        { lang: "html", bad: "<h4>Mały tytuł sekcji</h4>  <!-- bo h2 był za duży -->", good: "<h2 class=\"section-title\">Tytuł sekcji</h2>", why: "Poziom nagłówka wynika ze struktury, a rozmiar ustawiasz w CSS." },
      ],
      try: {
        html: `<h1>Przepis na naleśniki</h1>
<p>Szybki przepis na <strong>pyszne</strong> naleśniki.</p>
<h2>Składniki</h2>
<p>Mąka, mleko, jajka.</p>`,
        task: "Dodaj sekcję `<h2>Przygotowanie</h2>` z dwoma akapitami i wyróżnij jedno słowo przez `<em>`.",
      },
    },
    {
      id: "linki-obrazy",
      title: "Linki i obrazy",
      keywords: ["a", "href", "img", "src", "alt", "target", "figure", "figcaption", "kotwica"],
      theory: [
        "Link `<a href=\"...\">` może prowadzić do innej strony (adres bezwzględny `https://…`), do pliku w projekcie (adres względny `kontakt.html`, `../index.html`) albo do miejsca na tej samej stronie (`#id`).",
        "Obraz `<img>` musi mieć `src` (ścieżka) i **`alt`** (opis dla niewidomych i gdy obraz się nie wczyta). W Projekcie 1 sensowny `alt` jest wymagany. Obraz czysto dekoracyjny dostaje `alt=\"\"`.",
      ],
      syntax: [
        {
          title: "Rodzaje linków",
          lang: "html",
          code: `
<a href="kontakt.html">Kontakt</a>                    <!-- ❶ -->
<a href="../index.html">Wróć do startu</a>            <!-- ❷ -->
<a href="https://developer.mozilla.org" target="_blank" rel="noopener">MDN</a>  <!-- ❸ -->
<a href="#galeria">Przejdź do galerii</a>             <!-- ❹ -->
<section id="galeria">...</section>
<a href="mailto:jan@example.com">Napisz do mnie</a>   <!-- ❺ -->`,
          legend: [
            ["❶", "względny: plik w tym samym folderze"],
            ["❷", "`../` = folder wyżej"],
            ["❸", "bezwzględny; `target=\"_blank\"` otwiera w nowej karcie, `rel=\"noopener\"` dla bezpieczeństwa"],
            ["❹", "kotwica: przewija do elementu o `id=\"galeria\"`"],
            ["❺", "otwiera program pocztowy"],
          ],
        },
        {
          title: "Obraz z podpisem",
          lang: "html",
          code: `
<figure>                                             <!-- ❶ -->
  <img src="img/gory.jpg"
       alt="Tatry o zachodzie słońca"
       width="800" height="533" loading="lazy" />    <!-- ❷ ❸ ❹ -->
  <figcaption>Wakacje w Zakopanem, 2025</figcaption> <!-- ❺ -->
</figure>`,
          legend: [
            ["❶", "figure = ilustracja powiązana z treścią"],
            ["❷", "alt opisuje, CO jest na obrazie (nie „obrazek1”)"],
            ["❸", "width/height rezerwują miejsce — strona nie „skacze” przy ładowaniu"],
            ["❹", "loading=\"lazy\" = wczytaj, gdy użytkownik dojdzie do obrazu"],
            ["❺", "widoczny podpis"],
          ],
        },
      ],
      mistakes: [
        { lang: "html", bad: "<img src=\"C:\\Users\\jan\\Desktop\\foto.jpg\">", good: "<img src=\"img/foto.jpg\" alt=\"Opis zdjęcia\">", why: "Ścieżka z dysku nie zadziała na serwerze ani na GitHub Pages. Używaj ścieżek względnych do plików w projekcie i zawsze dodawaj `alt`." },
      ],
      try: {
        html: `<nav>
  <a href="#o-mnie">O mnie</a> |
  <a href="https://developer.mozilla.org/pl/" target="_blank" rel="noopener">MDN</a>
</nav>
<figure>
  <img src="https://picsum.photos/id/1018/400/250" alt="Górski krajobraz z jeziorem" width="400" height="250">
  <figcaption>Przykładowe zdjęcie</figcaption>
</figure>
<h2 id="o-mnie" style="margin-top:600px">O mnie</h2>`,
        task: "Dodaj drugi obraz (np. `https://picsum.photos/id/1025/400/250`) z własnym opisem w `alt` i `<figcaption>`.",
      },
    },
    {
      id: "listy-tabele",
      title: "Listy i tabele",
      keywords: ["ul", "ol", "li", "dl", "table", "tr", "th", "td", "thead", "tbody", "colspan", "caption"],
      theory: [
        "`<ul>` to lista punktowana (kolejność nieważna — np. menu), `<ol>` numerowana (kolejność ważna — np. kroki), `<dl>` lista definicji (termin + opis).",
        "Tabela służy **tylko do danych tabelarycznych** (cennik, plan zajęć), nigdy do układania strony. Wiersze to `<tr>`, komórki nagłówkowe `<th>`, zwykłe `<td>`.",
      ],
      syntax: [
        {
          title: "Listy",
          lang: "html",
          code: `
<ul>                       <!-- ❶ -->
  <li>HTML</li>
  <li>CSS</li>
</ul>
<ol>                       <!-- ❷ -->
  <li><a href="cw1.html">Ćwiczenie 1</a></li>
  <li><a href="cw2.html">Ćwiczenie 2</a></li>
</ol>
<dl>                       <!-- ❸ -->
  <dt>HTML</dt>
  <dd>Język znaczników opisujący strukturę.</dd>
</dl>`,
          legend: [["❶", "punktowana"], ["❷", "numerowana — idealna na listę ćwiczeń z Lab 1"], ["❸", "dt = termin, dd = opis"]],
        },
        {
          title: "Tabela z nagłówkiem",
          lang: "html",
          code: `
<table>
  <caption>Lista produktów</caption>      <!-- ❶ -->
  <thead>                                 <!-- ❷ -->
    <tr>
      <th>Nr.</th><th>Nazwa produktu</th><th>Cena</th><th>Ilość</th>
    </tr>
  </thead>
  <tbody>                                 <!-- ❸ -->
    <tr><td>1</td><td>Klawiatura</td><td>149 zł</td><td>3</td></tr>
    <tr><td>2</td><td colspan="2">Produkt wycofany</td><td>0</td></tr>  <!-- ❹ -->
  </tbody>
</table>`,
          legend: [["❶", "podpis tabeli"], ["❷", "część nagłówkowa"], ["❸", "dane"], ["❹", "colspan scala komórki w poziomie (rowspan — w pionie)"]],
        },
        {
          title: "Obramowanie tabeli w CSS",
          lang: "css",
          code: `
table { border-collapse: collapse; }   /* ❶ */
th, td { border: 1px solid #999; padding: 6px 10px; }  /* ❷ */
th { background: #eee; text-align: left; }`,
          legend: [["❶", "łączy podwójne ramki komórek w jedną linię"], ["❷", "ramka i odstęp w każdej komórce"]],
        },
      ],
      mistakes: [
        { lang: "html", bad: "<table>\n  <tr><td>menu</td><td>treść strony</td></tr>\n</table>", good: "<nav>menu</nav>\n<main>treść strony</main>", why: "Układ strony robimy w CSS (Grid/Flex), a nie tabelą." },
      ],
      try: {
        html: `<table>
  <thead>
    <tr><th>Nr.</th><th>Nazwa produktu</th><th>Cena produktu</th><th>Ilość sztuk</th></tr>
  </thead>
  <tbody>
    <tr><td>1</td><td>Mysz</td><td>59 zł</td><td>10</td></tr>
  </tbody>
</table>`,
        css: `table { border-collapse: collapse; }
th, td { border: 1px solid #999; padding: 6px 10px; }`,
        task: "Dodaj jeszcze 4 produkty. Usuń `border-collapse` i zobacz różnicę.",
      },
    },
    {
      id: "semantyka",
      title: "Semantyka: header, nav, main, section, article, footer",
      keywords: ["semantyka", "header", "nav", "main", "section", "article", "aside", "footer", "div", "span", "blokowe", "liniowe"],
      theory: [
        "Znaczniki **semantyczne** mówią, czym jest dany fragment strony. Przeglądarka, czytnik ekranu i Google rozumieją, gdzie jest menu, a gdzie treść. Strona zbudowana z samych `<div>` to „div soup”.",
        ["`<header>` — nagłówek strony lub sekcji (logo, tytuł).", "`<nav>` — główna nawigacja (linki między podstronami).", "`<main>` — główna, unikalna treść (jeden na stronę).", "`<section>` — tematyczna sekcja z nagłówkiem.", "`<article>` — samodzielna treść (wpis, karta projektu).", "`<aside>` — treść poboczna (ramka, reklamy, spis treści).", "`<footer>` — stopka (autor, kontakt)."],
        "`<div>` (blokowy) i `<span>` (liniowy) nie mają znaczenia — używaj ich tylko do grupowania pod stylowanie. **Elementy blokowe** (`div`, `p`, `h1`, `section`) zaczynają się od nowej linii i zajmują całą szerokość. **Liniowe** (`span`, `a`, `strong`, `img`) płyną w tekście.",
      ],
      syntax: [
        {
          title: "Szkielet podstrony do Projektu 1",
          lang: "html",
          code: `
<body>
  <header class="site-header">                    <!-- ❶ -->
    <a href="index.html" class="logo">Jan Kowalski</a>
    <nav aria-label="Główna nawigacja">           <!-- ❷ -->
      <ul>
        <li><a href="index.html" aria-current="page">Home</a></li>
        <li><a href="galeria.html">Galeria</a></li>
        <li><a href="kontakt.html">Kontakt</a></li>
      </ul>
    </nav>
  </header>

  <main>                                          <!-- ❸ -->
    <section id="o-mnie">                         <!-- ❹ -->
      <h2>O mnie</h2>
      <p>...</p>
    </section>
    <section id="projekty">
      <h2>Projekty</h2>
      <article class="project">                   <!-- ❺ -->
        <h3>Strona przepisów</h3>
        <p>...</p>
      </article>
    </section>
  </main>

  <footer>© 2026 Jan Kowalski</footer>            <!-- ❻ -->
</body>`,
          legend: [
            ["❶", "nagłówek strony — taki sam na każdej podstronie"],
            ["❷", "menu; aria-current oznacza bieżącą stronę"],
            ["❸", "tylko ta część zmienia się między podstronami"],
            ["❹", "sekcja tematyczna z własnym nagłówkiem"],
            ["❺", "samodzielna jednostka treści (karta projektu)"],
            ["❻", "stopka z imieniem i nazwiskiem (wymóg Projektu 1)"],
          ],
          explain: "Wymóg Projektu 1: nagłówek, nawigacja i stopka są identyczne na każdej podstronie, a zmienia się tylko `<main>`.",
        },
      ],
      mistakes: [
        { lang: "html", bad: "<div class=\"header\">\n  <div class=\"menu\">...</div>\n</div>\n<div class=\"content\">...</div>", good: "<header>\n  <nav>...</nav>\n</header>\n<main>...</main>", why: "Semantyczne znaczniki = lepsza dostępność, SEO i czytelniejszy kod (i punkty w Projekcie 1)." },
      ],
      try: {
        html: `<header>
  <strong>Moja strona</strong>
  <nav>
    <a href="#">Home</a> <a href="#">Galeria</a> <a href="#">Kontakt</a>
  </nav>
</header>
<main>
  <h1>Witaj!</h1>
</main>
<footer>© 2026 Imię Nazwisko</footer>`,
        css: `header, main, footer { padding: 12px; border: 2px dashed #999; margin: 6px 0; }
nav a { margin-right: 8px; }`,
        task: "Dodaj do `<main>` dwie `<section>` z nagłówkami `<h2>` i jeden `<article>` w drugiej sekcji.",
      },
    },
    {
      id: "formularze",
      title: "Formularze",
      keywords: ["form", "input", "label", "select", "option", "textarea", "button", "submit", "radio", "checkbox", "fieldset", "name"],
      theory: [
        "Formularz zbiera dane od użytkownika. Każde pole powinno mieć **`<label>`** połączony przez `for` z `id` pola — kliknięcie etykiety zaznacza pole, a czytnik ekranu ją odczyta. `placeholder` to tylko podpowiedź i **nie zastępuje** etykiety.",
        "Atrybut `name` to nazwa, pod którą wartość zostanie wysłana (i pod którą odczytasz ją w JS przez `FormData`).",
        ["`type=\"text\"`, `email`, `password`, `number`, `tel`, `url`, `date`, `color`, `range`, `search` — pola tekstowe i specjalne.", "`type=\"checkbox\"` — wiele zaznaczeń; `type=\"radio\"` — jeden wybór z grupy o tej samej `name`.", "`<select>` + `<option>` — lista rozwijana; `<textarea>` — tekst wieloliniowy.", "`<button type=\"submit\">` wysyła formularz, `type=\"button\"` nic nie robi bez JS, `type=\"reset\"` czyści."],
      ],
      syntax: [
        {
          title: "Formularz kontaktowy (wymagania Projektu 1)",
          lang: "html",
          code: `
<form action="#" method="post" class="contact-form">      <!-- ❶ -->
  <label for="email">E-mail</label>                       <!-- ❷ -->
  <input id="email" name="email" type="email"
         placeholder="jan@example.com" required />        <!-- ❸ -->

  <label for="topic">Temat</label>
  <select id="topic" name="topic" required>               <!-- ❹ -->
    <option value="">— wybierz —</option>
    <option value="wspolpraca">Współpraca</option>
    <option value="pytanie">Pytanie</option>
    <option value="inne">Inne</option>
  </select>

  <label for="msg">Wiadomość</label>
  <textarea id="msg" name="message" rows="5"
            placeholder="Twoja wiadomość..." required></textarea>  <!-- ❺ -->

  <button type="submit">Wyślij</button>                   <!-- ❻ -->
</form>`,
          legend: [
            ["❶", "action = dokąd wysłać, method = GET lub POST"],
            ["❷", "etykieta połączona z polem: for = id pola"],
            ["❸", "type=\"email\" sprawdza format adresu; required = pole obowiązkowe"],
            ["❹", "lista wyboru; pusta pierwsza opcja + required wymusza wybór"],
            ["❺", "pole wieloliniowe (ma znacznik zamykający!)"],
            ["❻", "przycisk wysyłający"],
          ],
        },
        {
          title: "Radio, checkbox i grupowanie",
          lang: "html",
          code: `
<fieldset>                                     <!-- ❶ -->
  <legend>Preferowany kontakt</legend>
  <label><input type="radio" name="contact" value="mail" checked /> e-mail</label>  <!-- ❷ -->
  <label><input type="radio" name="contact" value="tel" /> telefon</label>
</fieldset>

<label>
  <input type="checkbox" name="newsletter" />  <!-- ❸ -->
  Chcę dostawać newsletter
</label>`,
          legend: [["❶", "fieldset + legend grupują powiązane pola"], ["❷", "ta sama `name` = można wybrać tylko jedno; `checked` = domyślnie zaznaczone"], ["❸", "label może też OTACZAĆ pole — wtedy nie trzeba for/id"]],
        },
      ],
      mistakes: [
        { lang: "html", bad: "<input type=\"text\" placeholder=\"E-mail\">", good: "<label for=\"email\">E-mail</label>\n<input id=\"email\" type=\"email\" name=\"email\">", why: "Placeholder znika przy pisaniu i nie jest etykietą. Do e-maila użyj `type=\"email\"`." },
      ],
      try: {
        html: `<form>
  <label for="email">E-mail</label>
  <input id="email" name="email" type="email" placeholder="jan@example.com" required>
  <button type="submit">Wyślij</button>
</form>`,
        css: `form { display: flex; flex-direction: column; gap: 8px; max-width: 320px; }
input, select, textarea, button { padding: 8px; font: inherit; }`,
        task: "Dodaj `<select>` z tematem (3 opcje) i `<textarea>` na wiadomość — każde z etykietą. Kliknij „Wyślij” z pustym polem i zobacz komunikat przeglądarki.",
      },
    },
    {
      id: "walidacja",
      title: "Walidacja formularza w HTML",
      keywords: ["required", "minlength", "maxlength", "pattern", "min", "max", "invalid", "walidacja"],
      theory: [
        "Przeglądarka sama sprawdzi dane, zanim wyśle formularz — wystarczą atrybuty. To 0.5 pkt w Projekcie 1 (wymaganie dodatkowe).",
        ["`required` — pole nie może być puste.", "`type=\"email\"` / `url` / `number` — sprawdza format.", "`minlength` / `maxlength` — długość tekstu.", "`min` / `max` / `step` — zakres liczby lub daty.", "`pattern` — wyrażenie regularne, np. kod pocztowy.", "`title` — opis wymogu pokazany w komunikacie."],
        "W CSS możesz stylować pola błędne przez `:invalid` albo lepiej `:user-invalid` (dopiero po interakcji użytkownika).",
      ],
      syntax: [
        {
          title: "Atrybuty walidacji",
          lang: "html",
          code: `
<input type="text" name="name" required minlength="2" maxlength="40" />   <!-- ❶ -->
<input type="number" name="age" min="16" max="120" />                     <!-- ❷ -->
<input type="text" name="zip" pattern="[0-9]{2}-[0-9]{3}"
       title="Format: 00-000" placeholder="30-059" />                     <!-- ❸ -->`,
          legend: [["❶", "obowiązkowe, od 2 do 40 znaków"], ["❷", "liczba z zakresu"], ["❸", "wzór: 2 cyfry, myślnik, 3 cyfry; title = podpowiedź w komunikacie"]],
        },
        {
          title: "Wygląd błędnych pól",
          lang: "css",
          code: `
input:user-invalid,                  /* ❶ */
textarea:user-invalid {
  border-color: #c0392b;
  background: #fdf1ef;
}
input:valid { border-color: #1f8a4c; }  /* ❷ */`,
          legend: [["❶", "czerwona ramka dopiero po tym, jak użytkownik coś wpisał lub próbował wysłać"], ["❷", "zielona, gdy dane są poprawne"]],
        },
      ],
      try: {
        html: `<form>
  <label for="zip">Kod pocztowy</label>
  <input id="zip" name="zip" pattern="[0-9]{2}-[0-9]{3}" title="Format: 00-000" required>
  <button>Sprawdź</button>
</form>`,
        css: `form { display: flex; gap: 8px; align-items: center; }
input { padding: 8px; border: 2px solid #999; border-radius: 6px; }
input:user-invalid { border-color: #c0392b; }
input:valid { border-color: #1f8a4c; }`,
        task: "Dodaj pole „Wiek” (`type=\"number\"`) z zakresem 16–120 i sprawdź, co się dzieje po wpisaniu 10.",
      },
    },
    {
      id: "multimedia",
      title: "Wideo, audio i obrazy responsywne",
      keywords: ["video", "audio", "source", "controls", "picture", "srcset", "iframe", "youtube"],
      theory: [
        "`<video>` i `<audio>` odtwarzają multimedia bez wtyczek. `controls` pokazuje przyciski, `muted` + `autoplay` pozwala na autostart (bez dźwięku), `poster` to obrazek przed odtworzeniem. Projekt 1 wymaga przynajmniej jednego `<video>`.",
        "Film z YouTube osadzasz przez `<iframe>` (YouTube → Udostępnij → Umieść).",
        "`srcset` i `<picture>` pozwalają podać różne wersje obrazu dla różnych ekranów — telefon pobierze mniejszy plik.",
      ],
      syntax: [
        {
          title: "Wideo z kilkoma formatami",
          lang: "html",
          code: `
<video controls width="640" poster="img/okladka.jpg">   <!-- ❶ -->
  <source src="video/film.webm" type="video/webm" />   <!-- ❷ -->
  <source src="video/film.mp4" type="video/mp4" />
  Twoja przeglądarka nie obsługuje wideo.              <!-- ❸ -->
</video>

<audio controls src="audio/muzyka.mp3"></audio>`,
          legend: [["❶", "controls = przyciski; poster = obraz przed startem"], ["❷", "przeglądarka wybierze pierwszy format, który obsługuje"], ["❸", "tekst zastępczy"]],
        },
        {
          title: "Obraz responsywny",
          lang: "html",
          code: `
<img src="img/foto-800.jpg"
     srcset="img/foto-400.jpg 400w, img/foto-800.jpg 800w, img/foto-1600.jpg 1600w"
     sizes="(max-width: 600px) 100vw, 50vw"
     alt="Widok na Kraków" />                    <!-- ❶ ❷ -->

<picture>                                      <!-- ❸ -->
  <source media="(max-width: 600px)" srcset="img/kadr-pionowy.jpg" />
  <img src="img/kadr-poziomy.jpg" alt="Rynek w Krakowie" />
</picture>`,
          legend: [["❶", "srcset: dostępne pliki i ich szerokości (w)"], ["❷", "sizes: jak szeroko obraz będzie wyświetlony"], ["❸", "picture: zupełnie inny kadr dla małych ekranów"]],
        },
      ],
      try: {
        html: `<video controls width="360"
  src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm"></video>`,
        task: "Dodaj atrybuty `muted autoplay loop` i zobacz, co się zmieni.",
      },
    },
    {
      id: "atrybuty-dostepnosc",
      title: "Atrybuty globalne i dostępność",
      keywords: ["id", "class", "data", "aria", "title", "tabindex", "dostępność", "accessibility", "lang"],
      theory: [
        ["`id` — unikalny identyfikator (jeden na stronę): kotwice, `label for`, JS.", "`class` — grupa elementów do stylowania (wiele klas po spacji).", "`data-*` — własne dane dla JS, np. `data-price=\"99\"` (w JS: `el.dataset.price`).", "`title` — dymek po najechaniu.", "`hidden` — ukrywa element."],
        "**Dostępność (a11y)**: strona ma działać z klawiatury i czytnikiem ekranu. Używaj prawdziwych `<button>` i `<a>` (nie klikalnych `<div>`), dawaj `alt` obrazom, `label` polom, `aria-label` przyciskom z samą ikoną.",
      ],
      syntax: [
        {
          title: "Atrybuty w praktyce",
          lang: "html",
          code: `
<article id="projekt-1" class="card card--featured"
         data-category="web" data-year="2026">        <!-- ❶ ❷ ❸ -->
  <h3>Strona przepisów</h3>
</article>

<button type="button" aria-label="Zamknij menu">✕</button>   <!-- ❹ -->
<button type="button" aria-expanded="false" aria-controls="menu">Menu</button>  <!-- ❺ -->
<p hidden>Ten tekst jest ukryty.</p>                          <!-- ❻ -->`,
          legend: [["❶", "id — unikalny"], ["❷", "dwie klasy naraz"], ["❸", "dane dla JavaScriptu (dataset)"], ["❹", "opis przycisku z samą ikoną dla czytnika ekranu"], ["❺", "stan menu (rozwinięte?) dla czytnika ekranu"], ["❻", "ukryty element"]],
        },
      ],
      mistakes: [
        { lang: "html", bad: "<div class=\"btn\" onclick=\"menu()\">Menu</div>", good: "<button type=\"button\" class=\"btn\">Menu</button>", why: "`<div>` nie działa z klawiatury (Tab, Enter). `<button>` ma to wbudowane." },
      ],
    },
  ],
  flashcards: [
    ["Co robi `<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">`?", "Ustawia szerokość strony równą szerokości ekranu urządzenia — bez tego telefon pokaże pomniejszoną wersję desktopową."],
    ["Gdzie umieszczasz `<title>` i `<link rel=\"stylesheet\">`?", "W `<head>`."],
    ["Do czego służy `defer` w `<script>`?", "Skrypt pobiera się równolegle i uruchamia dopiero po wczytaniu całego HTML."],
    ["`<strong>` a `<b>`?", "`<strong>` oznacza ważność (semantyka), `<b>` tylko pogrubia."],
    ["Ile `<h1>` powinno być na stronie?", "Jeden — główny tytuł. Dalej h2, h3… bez przeskakiwania poziomów."],
    ["Jak zrobić link do sekcji na tej samej stronie?", "Nadaj sekcji `id=\"galeria\"` i użyj `<a href=\"#galeria\">`."],
    ["Po co atrybut `alt` w `<img>`?", "Opisuje obraz dla czytników ekranu i gdy obraz się nie wczyta. Wymagany w Projekcie 1."],
    ["Jak scalić dwie komórki tabeli w poziomie?", "`<td colspan=\"2\">`"],
    ["Wymień 7 znaczników semantycznych", "`header`, `nav`, `main`, `section`, `article`, `aside`, `footer`."],
    ["Element blokowy a liniowy?", "Blokowy zaczyna się od nowej linii i zajmuje całą szerokość (div, p). Liniowy płynie w tekście (span, a, strong)."],
    ["Jak połączyć `<label>` z polem?", "`<label for=\"email\">` + `<input id=\"email\">` — albo umieścić input wewnątrz label."],
    ["Czy placeholder może zastąpić label?", "Nie. Placeholder znika przy pisaniu i nie jest etykietą pola."],
    ["Radio czy checkbox do wyboru jednej opcji z kilku?", "Radio — wszystkie z tą samą `name`."],
    ["Jakie atrybuty walidacji zna HTML?", "`required`, `type` (email, url, number), `minlength`, `maxlength`, `min`, `max`, `step`, `pattern`."],
    ["`:invalid` a `:user-invalid`?", "`:invalid` działa od razu, `:user-invalid` dopiero po interakcji użytkownika — lepsze do stylowania błędów."],
    ["Jak pokazać przyciski odtwarzacza w `<video>`?", "Atrybut `controls`."],
    ["Do czego służą atrybuty `data-*`?", "Przechowują własne dane w elemencie; w JS odczytasz je przez `element.dataset`."],
  ],
  quiz: [
    { q: "Który znacznik powinien zawierać widoczną treść strony?", options: ["<head>", "<body>", "<meta>", "<html> bez body"], answer: 1 },
    { q: "Co się stanie bez `<meta charset=\"UTF-8\">`?", options: ["Nic", "Polskie znaki mogą się wyświetlać błędnie", "Strona się nie otworzy", "CSS przestanie działać"], answer: 1 },
    { q: "Który element najlepiej oznacza główną nawigację?", options: ["<div class=\"nav\">", "<menu>", "<nav>", "<header>"], answer: 2 },
    { q: "Który zapis linku otworzy stronę w nowej karcie?", code: "", options: ["<a href=\"x.html\" new>", "<a href=\"x.html\" target=\"_blank\">", "<a href=\"x.html\" open=\"tab\">", "<a target=\"x.html\">"], answer: 1 },
    { q: "Co jest NIE tak w tym kodzie?", code: "<img src=\"img/kot.jpg\">", lang: "html", options: ["Brak znacznika zamykającego", "Brak atrybutu alt", "Zła ścieżka", "Nic"], answer: 1 },
    { q: "Który atrybut scala komórki tabeli w pionie?", options: ["colspan", "rowspan", "merge", "span"], answer: 1 },
    { q: "Która para zapewnia działanie kliknięcia w etykietę?", options: ["<label name=\"x\"> + <input name=\"x\">", "<label for=\"x\"> + <input id=\"x\">", "<label id=\"x\"> + <input for=\"x\">", "<label class=\"x\"> + <input class=\"x\">"], answer: 1 },
    { q: "Jak zrobić grupę opcji, z której można wybrać tylko jedną?", options: ["checkbox z tą samą name", "radio z tą samą name", "radio z różnymi name", "select multiple"], answer: 1 },
    { q: "Który element jest liniowy (inline)?", options: ["<section>", "<p>", "<span>", "<div>"], answer: 2 },
    { q: "Co zrobi przeglądarka przy próbie wysłania tego formularza z pustym polem?", code: "<form>\n  <input name=\"email\" type=\"email\" required>\n  <button>Wyślij</button>\n</form>", lang: "html", options: ["Wyśle pusty formularz", "Pokaże komunikat i nie wyśle", "Wyczyści formularz", "Zgłosi błąd w konsoli"], answer: 1 },
    { q: "Który atrybut pozwala sprawdzić format przez wyrażenie regularne?", options: ["regex", "match", "pattern", "format"], answer: 2 },
    { q: "Do czego NIE powinno się używać tabeli?", options: ["Cennika", "Planu zajęć", "Układu całej strony", "Wyników meczu"], answer: 2 },
  ],
});
