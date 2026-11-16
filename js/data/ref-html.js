/* Ściąga HTML — co robi każdy znacznik, w jednym miejscu.
   kind: "blok" (blokowy), "linia" (liniowy), "pusty" (bez znacznika zamykającego), "head" (tylko w <head>), "atrybut"
   preview: false = nie pokazuj podglądu (np. elementy z <head>) */
WDAI.refHtml = [
  {
    id: "struktura",
    title: "Struktura dokumentu",
    intro: "Szkielet każdej strony i elementy w <head>, których nie widać, ale bez których strona działa źle.",
    items: [
      { tag: "<!DOCTYPE html>", kind: "head", desc: "Deklaracja na samej górze pliku: to dokument HTML5. Bez niej przeglądarka włącza tryb zgodności (quirks mode) i inaczej liczy CSS.", example: `<!DOCTYPE html>`, preview: false },
      { tag: "<html>", kind: "blok", desc: "Korzeń dokumentu — zawiera <head> i <body>. Atrybut `lang` podaje język treści (czytniki ekranu, tłumacz, dzielenie wyrazów).", attrs: ["lang=\"pl\""], example: `<html lang="pl">
  <head>...</head>
  <body>...</body>
</html>`, preview: false },
      { tag: "<head>", kind: "head", desc: "Informacje o stronie: kodowanie, tytuł, podłączone style i skrypty. Nic z <head> nie jest wyświetlane w treści strony.", example: `<head>
  <meta charset="UTF-8" />
  <title>Moja strona</title>
</head>`, preview: false },
      { tag: "<body>", kind: "blok", desc: "Cała widoczna treść strony.", example: `<body>
  <h1>Witaj!</h1>
</body>`, preview: false },
      { tag: "<meta charset>", kind: "pusty", desc: "Kodowanie znaków. `UTF-8` = poprawne polskie litery. Powinno być pierwszym elementem w <head>.", example: `<meta charset="UTF-8" />`, preview: false },
      { tag: "<meta name=\"viewport\">", kind: "pusty", desc: "Mówi telefonom, że strona ma szerokość ekranu. Bez tego media queries nie działają poprawnie na telefonie.", example: `<meta name="viewport" content="width=device-width, initial-scale=1" />`, preview: false },
      { tag: "<meta name=\"description\">", kind: "pusty", desc: "Krótki opis strony pokazywany w wynikach wyszukiwania (SEO).", example: `<meta name="description" content="Portfolio studenta informatyki AGH" />`, preview: false },
      { tag: "<title>", kind: "head", desc: "Tytuł na karcie przeglądarki, w zakładkach i w wynikach Google. Każda podstrona powinna mieć własny.", example: `<title>Galeria — Jan Kowalski</title>`, preview: false },
      { tag: "<link>", kind: "pusty", desc: "Podłącza zewnętrzne zasoby: arkusz CSS, ikonę strony (favicon), czcionki Google.", attrs: ["rel", "href"], example: `<link rel="stylesheet" href="css/style.css" />
<link rel="icon" href="img/favicon.png" />`, preview: false },
      { tag: "<script>", kind: "blok", desc: "Kod JavaScript — w pliku (`src`) albo wewnątrz. `defer` = uruchom po wczytaniu HTML; `type=\"module\"` = moduł ES (też odroczony).", attrs: ["src", "defer", "type=\"module\""], example: `<script src="js/app.js" defer></script>`, preview: false },
      { tag: "<style>", kind: "head", desc: "Blok CSS wpisany bezpośrednio w dokument. Lepiej trzymać style w osobnym pliku przez <link>.", example: `<style>
  body { font-family: sans-serif; }
</style>`, preview: false },
      { tag: "<noscript>", kind: "blok", desc: "Treść pokazywana tylko wtedy, gdy JavaScript jest wyłączony.", example: `<noscript>Włącz JavaScript, aby korzystać z quizu.</noscript>`, preview: false },
    ],
  },
  {
    id: "semantyka",
    title: "Układ strony i semantyka",
    intro: "Znaczniki mówiące, czym jest dany fragment strony. Używaj ich zamiast samych <div> (wymóg Projektu 1).",
    items: [
      { tag: "<header>", kind: "blok", desc: "Nagłówek strony lub sekcji: logo, tytuł, często nawigacja.", example: `<header>
  <a href="index.html">Jan Kowalski</a>
  <nav>...</nav>
</header>` },
      { tag: "<nav>", kind: "blok", desc: "Główna nawigacja — zestaw linków do podstron lub sekcji.", attrs: ["aria-label"], example: `<nav aria-label="Główna nawigacja">
  <a href="index.html" aria-current="page">Home</a>
  <a href="galeria.html">Galeria</a>
  <a href="kontakt.html">Kontakt</a>
</nav>` },
      { tag: "<main>", kind: "blok", desc: "Główna, unikalna treść strony. Jeden na stronę. To jedyna część, która zmienia się między podstronami.", example: `<main>
  <h1>Galeria</h1>
  <p>Moje zdjęcia z wakacji.</p>
</main>` },
      { tag: "<section>", kind: "blok", desc: "Tematyczna sekcja treści, zwykle z własnym nagłówkiem.", example: `<section id="o-mnie">
  <h2>O mnie</h2>
  <p>Studiuję informatykę.</p>
</section>` },
      { tag: "<article>", kind: "blok", desc: "Samodzielna treść, która ma sens wyjęta z kontekstu: wpis na blogu, karta projektu, komentarz.", example: `<article>
  <h3>Strona przepisów</h3>
  <p>Projekt w HTML i CSS.</p>
</article>` },
      { tag: "<aside>", kind: "blok", desc: "Treść poboczna, powiązana z główną: ramka z ciekawostką, spis treści, reklama.", example: `<aside>
  <strong>Ciekawostka:</strong> HTML stworzył Tim Berners-Lee.
</aside>` },
      { tag: "<footer>", kind: "blok", desc: "Stopka strony lub sekcji: autor, prawa autorskie, kontakt (w Projekcie 1: imię i nazwisko).", example: `<footer>© 2026 Jan Kowalski</footer>` },
      { tag: "<h1> … <h6>", kind: "blok", desc: "Nagłówki od najważniejszego (h1) do najmniej ważnego (h6). Jeden h1 na stronę, potem h2 dla sekcji, h3 dla podsekcji — bez przeskakiwania poziomów.", example: `<h1>Portfolio</h1>
<h2>Projekty</h2>
<h3>Strona przepisów</h3>` },
      { tag: "<div>", kind: "blok", desc: "Uniwersalny blok bez znaczenia — tylko do grupowania elementów pod stylowanie (np. kontener grid). Gdy pasuje znacznik semantyczny, użyj go.", example: `<div class="cards">
  <div class="card">1</div>
  <div class="card">2</div>
</div>` },
      { tag: "<span>", kind: "linia", desc: "Uniwersalny element liniowy bez znaczenia — do wyróżnienia fragmentu tekstu stylem.", example: `<p>Cena: <span class="price">99 zł</span></p>` },
      { tag: "<address>", kind: "blok", desc: "Dane kontaktowe autora lub właściciela strony.", example: `<address>
  <a href="mailto:jan@example.com">jan@example.com</a>
</address>` },
    ],
  },
  {
    id: "tekst",
    title: "Tekst",
    intro: "Akapity, wyróżnienia, cytaty i fragmenty kodu.",
    items: [
      { tag: "<p>", kind: "blok", desc: "Akapit tekstu. Każdy akapit to osobny <p> (nie łam tekstu przez <br>).", example: `<p>To jest pierwszy akapit.</p>
<p>A to drugi.</p>` },
      { tag: "<br>", kind: "pusty", desc: "Złamanie linii wewnątrz tekstu (adres, wiersz). Nie używaj do robienia odstępów — od tego jest CSS.", example: `<p>ul. Kawiory 21<br />30-055 Kraków</p>` },
      { tag: "<hr>", kind: "pusty", desc: "Zmiana tematu, rysowana jako pozioma linia.", example: `<p>Część pierwsza.</p>
<hr />
<p>Część druga.</p>` },
      { tag: "<strong>", kind: "linia", desc: "Tekst ważny (domyślnie pogrubiony). Ma znaczenie dla czytników ekranu.", example: `<p><strong>Uwaga:</strong> termin mija w piątek.</p>` },
      { tag: "<em>", kind: "linia", desc: "Akcent, nacisk w zdaniu (domyślnie kursywa).", example: `<p>To jest <em>naprawdę</em> ważne.</p>` },
      { tag: "<b> / <i>", kind: "linia", desc: "Tylko wygląd (pogrubienie / kursywa) bez dodatkowego znaczenia, np. nazwa produktu, termin obcy. Gdy chodzi o ważność — <strong>/<em>.", example: `<p>Program <b>VS Code</b> to <i>open source</i>.</p>` },
      { tag: "<mark>", kind: "linia", desc: "Zaznaczenie jak zakreślaczem — np. szukana fraza w wynikach.", example: `<p>Wyniki dla: <mark>flexbox</mark></p>` },
      { tag: "<small>", kind: "linia", desc: "Drobny druk: przypisy, informacje prawne.", example: `<p><small>Ceny zawierają VAT.</small></p>` },
      { tag: "<del> / <ins>", kind: "linia", desc: "Tekst usunięty (przekreślony) i dodany (podkreślony) — np. stara i nowa cena.", example: `<p>Cena: <del>199 zł</del> <ins>149 zł</ins></p>` },
      { tag: "<s>", kind: "linia", desc: "Treść nieaktualna, już nieprawdziwa (przekreślenie).", example: `<p><s>Bilety dostępne</s> Wyprzedane!</p>` },
      { tag: "<sub> / <sup>", kind: "linia", desc: "Indeks dolny i górny: wzory chemiczne, potęgi, przypisy.", example: `<p>H<sub>2</sub>O, E = mc<sup>2</sup></p>` },
      { tag: "<code>", kind: "linia", desc: "Fragment kodu w tekście (czcionka o stałej szerokości).", example: `<p>Użyj <code>console.log()</code>, aby wypisać wartość.</p>` },
      { tag: "<pre>", kind: "blok", desc: "Tekst preformatowany — zachowuje spacje i entery. Z <code> do bloków kodu.", example: `<pre><code>function hello() {
  return "cześć";
}</code></pre>` },
      { tag: "<kbd>", kind: "linia", desc: "Klawisz lub skrót klawiszowy.", example: `<p>Zapisz plik: <kbd>Ctrl</kbd> + <kbd>S</kbd></p>` },
      { tag: "<blockquote>", kind: "blok", desc: "Dłuższy cytat (blokowy). `cite` = adres źródła.", attrs: ["cite"], example: `<blockquote cite="https://developer.mozilla.org">
  <p>HTML to podstawowy budulec sieci.</p>
</blockquote>` },
      { tag: "<q>", kind: "linia", desc: "Krótki cytat w zdaniu — przeglądarka sama dodaje cudzysłów.", example: `<p>Mówi się, że <q>praktyka czyni mistrza</q>.</p>` },
      { tag: "<cite>", kind: "linia", desc: "Tytuł dzieła (książki, filmu, artykułu).", example: `<p>Polecam <cite>HTML i CSS</cite> Jona Ducketta.</p>` },
      { tag: "<abbr>", kind: "linia", desc: "Skrót; `title` podaje pełną nazwę (dymek po najechaniu).", attrs: ["title"], example: `<p><abbr title="Cascading Style Sheets">CSS</abbr> odpowiada za wygląd.</p>` },
      { tag: "<time>", kind: "linia", desc: "Data lub godzina; `datetime` w formacie zrozumiałym dla maszyn.", attrs: ["datetime"], example: `<p>Kolokwium: <time datetime="2026-12-14">14 grudnia</time></p>` },
      { tag: "<!-- komentarz -->", kind: "atrybut", desc: "Komentarz — nie wyświetla się na stronie (ale widać go w źródle!).", example: `<!-- TODO: dodać galerię -->`, preview: false },
    ],
  },
  {
    id: "listy",
    title: "Listy",
    intro: "Punktowane, numerowane i listy definicji. Menu nawigacyjne to też zwykle lista.",
    items: [
      { tag: "<ul>", kind: "blok", desc: "Lista nieuporządkowana (punktowana) — kolejność nie ma znaczenia.", example: `<ul>
  <li>HTML</li>
  <li>CSS</li>
  <li>JavaScript</li>
</ul>` },
      { tag: "<ol>", kind: "blok", desc: "Lista uporządkowana (numerowana) — kroki, ranking. `start` = od której liczby, `reversed` = odliczanie, `type` = 1, a, A, i, I.", attrs: ["start", "reversed", "type"], example: `<ol>
  <li><a href="cw1.html">Ćwiczenie 1</a></li>
  <li><a href="cw2.html">Ćwiczenie 2</a></li>
</ol>
<ol type="a" start="3"><li>c</li><li>d</li></ol>` },
      { tag: "<li>", kind: "blok", desc: "Element listy — tylko wewnątrz <ul> lub <ol>. Może zawierać zagnieżdżoną listę.", example: `<ul>
  <li>Frontend
    <ul><li>React</li><li>Angular</li></ul>
  </li>
</ul>` },
      { tag: "<dl> <dt> <dd>", kind: "blok", desc: "Lista definicji: <dt> termin, <dd> jego opis. Dobra do słowniczka lub danych „nazwa: wartość”.", example: `<dl>
  <dt>HTML</dt>
  <dd>Język znaczników — struktura strony.</dd>
  <dt>CSS</dt>
  <dd>Arkusze stylów — wygląd strony.</dd>
</dl>` },
    ],
  },
  {
    id: "linki-media",
    title: "Linki, obrazy i multimedia",
    intro: "Odnośniki, zdjęcia, wideo, dźwięk i osadzanie treści z innych stron.",
    items: [
      { tag: "<a>", kind: "linia", desc: "Link. `href` = dokąd: inna strona, plik w projekcie, sekcja (#id), e-mail, telefon. `target=\"_blank\"` otwiera w nowej karcie (dodaj `rel=\"noopener\"`). `download` = pobierz plik.", attrs: ["href", "target", "rel", "download"], example: `<a href="kontakt.html">Kontakt</a>
<a href="#galeria">Do galerii</a>
<a href="https://developer.mozilla.org" target="_blank" rel="noopener">MDN</a>
<a href="mailto:jan@example.com">Napisz</a>
<a href="tel:+48123456789">Zadzwoń</a>
<a href="cv.pdf" download>Pobierz CV</a>` },
      { tag: "<img>", kind: "pusty", desc: "Obraz. `alt` = opis dla niewidomych i gdy obraz się nie wczyta (obowiązkowy!). `width`/`height` rezerwują miejsce, `loading=\"lazy\"` wczytuje dopiero przy przewinięciu.", attrs: ["src", "alt", "width", "height", "loading"], example: `<img src="https://picsum.photos/id/1018/300/180"
     alt="Górskie jezioro o świcie" width="300" height="180" loading="lazy" />` },
      { tag: "<figure> / <figcaption>", kind: "blok", desc: "Ilustracja (obraz, wykres, kod) z widocznym podpisem.", example: `<figure>
  <img src="https://picsum.photos/id/1025/240/160" alt="Pies w kocu" />
  <figcaption>Mój pies Burek</figcaption>
</figure>` },
      { tag: "<picture> / <source>", kind: "blok", desc: "Różne obrazy dla różnych warunków (szerokość ekranu, format). Przeglądarka wybiera pierwszy pasujący <source>, a <img> jest zapasowy.", example: `<picture>
  <source media="(max-width: 600px)" srcset="https://picsum.photos/id/1015/300/300" />
  <img src="https://picsum.photos/id/1015/500/250" alt="Rzeka w górach" />
</picture>` },
      { tag: "<video>", kind: "blok", desc: "Wideo. `controls` = przyciski, `poster` = obraz przed startem, `autoplay muted loop` = autostart w pętli bez dźwięku. Wymagane w Projekcie 1.", attrs: ["src", "controls", "poster", "autoplay", "muted", "loop"], example: `<video controls width="300"
  src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm"></video>` },
      { tag: "<audio>", kind: "blok", desc: "Dźwięk z odtwarzaczem (`controls`).", attrs: ["src", "controls", "loop"], example: `<audio controls
  src="https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3"></audio>` },
      { tag: "<iframe>", kind: "blok", desc: "Osadza inną stronę w ramce: film z YouTube, mapę Google. `title` opisuje zawartość.", attrs: ["src", "title", "width", "height", "allowfullscreen"], example: `<iframe width="300" height="170" title="Mapa"
  src="https://www.openstreetmap.org/export/embed.html?bbox=19.90,50.05,19.96,50.08"></iframe>` },
      { tag: "<canvas>", kind: "blok", desc: "Płótno do rysowania pikseli z JavaScriptu (gry, wykresy). Bez JS jest puste.", attrs: ["width", "height"], example: `<canvas id="c" width="200" height="80" style="border:1px solid #999"></canvas>
<script>
  const ctx = document.getElementById("c").getContext("2d");
  ctx.fillStyle = "#1d5c54";
  ctx.fillRect(20, 20, 160, 40);
</script>` },
      { tag: "<svg>", kind: "blok", desc: "Grafika wektorowa wpisana w HTML — ikony i ilustracje ostre w każdym rozmiarze.", example: `<svg width="80" height="80" viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="40" fill="#e76f51" />
</svg>` },
    ],
  },
  {
    id: "tabele",
    title: "Tabele",
    intro: "Tylko do danych w wierszach i kolumnach (cennik, plan, wyniki) — nigdy do układu strony.",
    items: [
      { tag: "<table>", kind: "blok", desc: "Tabela danych. Obramowanie i odstępy dodajesz w CSS (`border-collapse: collapse`).", example: `<table border="1">
  <tr><th>Produkt</th><th>Cena</th></tr>
  <tr><td>Mysz</td><td>59 zł</td></tr>
</table>` },
      { tag: "<caption>", kind: "blok", desc: "Tytuł tabeli — pierwszy element w <table>.", example: `<table border="1">
  <caption>Cennik</caption>
  <tr><td>Mysz</td><td>59 zł</td></tr>
</table>` },
      { tag: "<thead> <tbody> <tfoot>", kind: "blok", desc: "Części tabeli: nagłówek, dane, podsumowanie. Porządkują kod i ułatwiają stylowanie.", example: `<table border="1">
  <thead><tr><th>Produkt</th><th>Cena</th></tr></thead>
  <tbody><tr><td>Mysz</td><td>59</td></tr><tr><td>Monitor</td><td>899</td></tr></tbody>
  <tfoot><tr><td>Razem</td><td>958</td></tr></tfoot>
</table>` },
      { tag: "<tr>", kind: "blok", desc: "Wiersz tabeli (table row).", example: `<table border="1"><tr><td>A</td><td>B</td></tr></table>` },
      { tag: "<th>", kind: "blok", desc: "Komórka nagłówkowa (domyślnie pogrubiona, wyśrodkowana). `scope=\"col\"`/`\"row\"` mówi, czego dotyczy.", attrs: ["scope", "colspan", "rowspan"], example: `<table border="1">
  <tr><th scope="col">Imię</th><th scope="col">Ocena</th></tr>
  <tr><td>Ola</td><td>5</td></tr>
</table>` },
      { tag: "<td>", kind: "blok", desc: "Zwykła komórka z danymi. `colspan` scala kolumny, `rowspan` scala wiersze.", attrs: ["colspan", "rowspan"], example: `<table border="1">
  <tr><td colspan="2">Scalone 2 kolumny</td></tr>
  <tr><td rowspan="2">Scalone 2 wiersze</td><td>A</td></tr>
  <tr><td>B</td></tr>
</table>` },
    ],
  },
  {
    id: "formularze",
    title: "Formularze",
    intro: "Zbieranie danych od użytkownika. Każde pole potrzebuje <label> i atrybutu name.",
    items: [
      { tag: "<form>", kind: "blok", desc: "Formularz. `action` = dokąd wysłać, `method` = GET (dane w adresie) lub POST (w treści żądania). `novalidate` wyłącza walidację przeglądarki.", attrs: ["action", "method", "novalidate"], example: `<form action="#" method="post">
  <label for="n">Imię</label>
  <input id="n" name="name" required />
  <button>Wyślij</button>
</form>` },
      { tag: "<label>", kind: "linia", desc: "Etykieta pola. `for` = id pola (kliknięcie etykiety zaznacza pole). Można też objąć pole etykietą. Placeholder NIE zastępuje etykiety.", attrs: ["for"], example: `<label for="email">E-mail</label>
<input id="email" type="email" />

<label><input type="checkbox" /> Akceptuję regulamin</label>` },
      { tag: "<input type=\"text\">", kind: "pusty", desc: "Jednoliniowe pole tekstowe. `name` = nazwa wysyłanej wartości, `placeholder` = podpowiedź, `value` = wartość startowa.", attrs: ["name", "placeholder", "value", "required", "minlength", "maxlength", "pattern"], example: `<input type="text" name="city" placeholder="np. Kraków" />` },
      { tag: "<input type=\"email\">", kind: "pusty", desc: "Adres e-mail — przeglądarka sprawdza format, telefon pokazuje klawiaturę z @.", example: `<input type="email" name="email" placeholder="jan@example.com" required />` },
      { tag: "<input type=\"password\">", kind: "pusty", desc: "Hasło — znaki są ukryte.", attrs: ["minlength", "autocomplete"], example: `<input type="password" name="pass" minlength="8" />` },
      { tag: "<input type=\"number\">", kind: "pusty", desc: "Liczba ze strzałkami. `min`, `max`, `step` ograniczają wartość. W JS wartość i tak jest tekstem!", attrs: ["min", "max", "step"], example: `<input type="number" name="age" min="16" max="120" value="20" />` },
      { tag: "<input type=\"tel\"> / \"url\" / \"search\"", kind: "pusty", desc: "Telefon (klawiatura numeryczna), adres URL (sprawdza format), pole wyszukiwania (z przyciskiem czyszczenia).", example: `<input type="tel" placeholder="123 456 789" />
<input type="url" placeholder="https://..." />
<input type="search" placeholder="Szukaj..." />` },
      { tag: "<input type=\"date\"> / \"time\"", kind: "pusty", desc: "Wybór daty lub godziny z kalendarzem. Są też `datetime-local`, `month`, `week`.", attrs: ["min", "max"], example: `<input type="date" min="2026-01-01" />
<input type="time" />` },
      { tag: "<input type=\"checkbox\">", kind: "pusty", desc: "Pole wyboru tak/nie — można zaznaczyć wiele. `checked` = zaznaczone na start. W JS: `.checked`.", attrs: ["checked", "name", "value"], example: `<label><input type="checkbox" name="news" checked /> Newsletter</label>
<label><input type="checkbox" name="rodo" /> Zgoda RODO</label>` },
      { tag: "<input type=\"radio\">", kind: "pusty", desc: "Wybór jednej opcji z grupy — wszystkie przyciski grupy mają tę samą `name`.", attrs: ["name", "value", "checked"], example: `<label><input type="radio" name="size" value="s" /> S</label>
<label><input type="radio" name="size" value="m" checked /> M</label>
<label><input type="radio" name="size" value="l" /> L</label>` },
      { tag: "<input type=\"range\"> / \"color\"", kind: "pusty", desc: "Suwak liczbowy (`min`, `max`, `step`) i próbnik koloru.", example: `<input type="range" min="0" max="100" value="40" />
<input type="color" value="#1d5c54" />` },
      { tag: "<input type=\"file\">", kind: "pusty", desc: "Wybór pliku z dysku. `accept` ogranicza typy, `multiple` pozwala wybrać kilka.", attrs: ["accept", "multiple"], example: `<input type="file" accept="image/*" multiple />` },
      { tag: "<input type=\"hidden\">", kind: "pusty", desc: "Pole niewidoczne dla użytkownika, ale wysyłane z formularzem (widać je w kodzie strony!).", example: `<input type="hidden" name="source" value="kontakt" />`, preview: false },
      { tag: "<textarea>", kind: "linia", desc: "Wieloliniowe pole tekstowe. `rows` = wysokość w liniach. Ma znacznik zamykający, a wartość startowa jest między znacznikami.", attrs: ["rows", "cols", "placeholder", "maxlength"], example: `<label for="msg">Wiadomość</label>
<textarea id="msg" name="message" rows="4" placeholder="Twoja wiadomość..."></textarea>` },
      { tag: "<select> / <option>", kind: "linia", desc: "Lista rozwijana. `value` opcji jest wysyłane, `selected` = wybrana na start. Pusta pierwsza opcja + `required` wymusza wybór. `multiple` = wybór wielu.", attrs: ["name", "required", "multiple"], example: `<label for="topic">Temat</label>
<select id="topic" name="topic" required>
  <option value="">— wybierz —</option>
  <option value="praca">Współpraca</option>
  <option value="pytanie">Pytanie</option>
  <option value="inne">Inne</option>
</select>` },
      { tag: "<optgroup>", kind: "blok", desc: "Grupuje opcje w <select> pod nagłówkiem.", example: `<select>
  <optgroup label="Frontend"><option>HTML</option><option>CSS</option></optgroup>
  <optgroup label="Backend"><option>Node.js</option></optgroup>
</select>` },
      { tag: "<datalist>", kind: "blok", desc: "Podpowiedzi do zwykłego pola tekstowego (połączenie przez `list`) — można wybrać albo wpisać własne.", example: `<input list="langs" placeholder="Język..." />
<datalist id="langs">
  <option value="JavaScript"></option>
  <option value="TypeScript"></option>
  <option value="Python"></option>
</datalist>` },
      { tag: "<button>", kind: "linia", desc: "Przycisk. `type=\"submit\"` (domyślnie w formularzu) wysyła, `type=\"button\"` nic nie robi bez JS, `type=\"reset\"` czyści pola.", attrs: ["type", "disabled"], example: `<button type="submit">Wyślij</button>
<button type="button">Pokaż więcej</button>
<button type="reset">Wyczyść</button>
<button disabled>Niedostępny</button>` },
      { tag: "<fieldset> / <legend>", kind: "blok", desc: "Grupuje powiązane pola z podpisem (np. grupa radio).", example: `<fieldset>
  <legend>Preferowany kontakt</legend>
  <label><input type="radio" name="c" checked /> e-mail</label>
  <label><input type="radio" name="c" /> telefon</label>
</fieldset>` },
      { tag: "<output>", kind: "linia", desc: "Miejsce na wynik obliczenia z formularza.", example: `<form oninput="wynik.value = Number(a.value) + Number(b.value)">
  <input name="a" type="number" value="2" /> +
  <input name="b" type="number" value="3" /> =
  <output name="wynik">5</output>
</form>` },
      { tag: "<progress> / <meter>", kind: "linia", desc: "<progress> — postęp zadania (np. wysyłanie). <meter> — wartość w znanym zakresie (np. zajęte miejsce na dysku).", attrs: ["value", "max", "min", "low", "high"], example: `<label>Postęp: <progress value="70" max="100">70%</progress></label><br />
<label>Dysk: <meter value="0.8" low="0.5" high="0.75">80%</meter></label>` },
      { tag: "Atrybuty walidacji", kind: "atrybut", desc: "`required` (obowiązkowe), `minlength`/`maxlength` (długość), `min`/`max`/`step` (liczby, daty), `pattern` (wyrażenie regularne), `type` (format). Przeglądarka nie wyśle błędnego formularza.", example: `<form>
  <input name="zip" pattern="[0-9]{2}-[0-9]{3}" title="Format: 00-000" placeholder="30-059" required />
  <button>Sprawdź</button>
</form>` },
    ],
  },
  {
    id: "interaktywne",
    title: "Elementy interaktywne",
    intro: "Rozwijane bloki i okna dialogowe wbudowane w HTML.",
    items: [
      { tag: "<details> / <summary>", kind: "blok", desc: "Rozwijany blok bez JavaScriptu. <summary> to widoczny nagłówek, reszta rozwija się po kliknięciu. `open` = rozwinięty na start.", attrs: ["open"], example: `<details>
  <summary>Pokaż odpowiedź</summary>
  <p>Specyficzność #id to (1,0,0).</p>
</details>` },
      { tag: "<dialog>", kind: "blok", desc: "Okno dialogowe (modal). Otwierasz w JS przez `dialog.showModal()`, zamykasz `close()` albo formularzem z `method=\"dialog\"`.", example: `<button onclick="document.getElementById('d').showModal()">Otwórz</button>
<dialog id="d">
  <p>Czy na pewno?</p>
  <form method="dialog"><button>Zamknij</button></form>
</dialog>` },
    ],
  },
  {
    id: "atrybuty",
    title: "Atrybuty globalne",
    intro: "Atrybuty, które możesz dodać do (prawie) każdego elementu.",
    items: [
      { tag: "id", kind: "atrybut", desc: "Unikalny identyfikator — jeden taki na stronie. Do kotwic (#id), połączenia z <label for>, wyszukiwania w JS.", example: `<section id="kontakt">...</section>
<a href="#kontakt">Kontakt</a>`, preview: false },
      { tag: "class", kind: "atrybut", desc: "Klasy do stylowania i JS. Kilka klas oddzielasz spacją.", example: `<div class="card card--featured">...</div>`, preview: false },
      { tag: "style", kind: "atrybut", desc: "Styl CSS wpisany w element (inline). Używaj wyjątkowo — style trzymaj w pliku CSS.", example: `<p style="color: tomato;">Czerwony tekst</p>` },
      { tag: "title", kind: "atrybut", desc: "Dymek z podpowiedzią po najechaniu myszą.", example: `<button title="Zapisz zmiany">💾</button>` },
      { tag: "lang", kind: "atrybut", desc: "Język treści elementu (gdy inny niż strony).", example: `<p>Po angielsku: <span lang="en">Hello world</span></p>`, preview: false },
      { tag: "hidden", kind: "atrybut", desc: "Ukrywa element (jak `display: none`). JS może go przełączać: `el.hidden = false`.", example: `<p hidden>Tego nie widać.</p>
<p>A to widać.</p>` },
      { tag: "data-*", kind: "atrybut", desc: "Własne dane dla JavaScriptu. `data-price=\"99\"` odczytasz jako `el.dataset.price`.", example: `<button data-product-id="7" data-price="99">Do koszyka</button>`, preview: false },
      { tag: "tabindex", kind: "atrybut", desc: "Kolejność i możliwość fokusu klawiaturą. `0` = dostępny w naturalnej kolejności, `-1` = tylko z JS.", example: `<div tabindex="0">Można na mnie wejść Tabem</div>` },
      { tag: "aria-label / aria-*", kind: "atrybut", desc: "Opis dla czytników ekranu, np. przycisk z samą ikoną. `aria-current=\"page\"` = bieżąca strona, `aria-expanded` = stan menu.", example: `<button aria-label="Zamknij menu">✕</button>
<a href="index.html" aria-current="page">Home</a>` },
      { tag: "contenteditable", kind: "atrybut", desc: "Pozwala edytować treść elementu bezpośrednio na stronie.", example: `<p contenteditable="true">Kliknij i zmień ten tekst.</p>` },
      { tag: "draggable", kind: "atrybut", desc: "Element można przeciągać (Drag and Drop API w JS).", example: `<div draggable="true" style="padding:8px;background:#e3f1ef">Przeciągnij mnie</div>` },
    ],
  },
  {
    id: "encje",
    title: "Znaki specjalne (encje)",
    intro: "Znaki, które w HTML mają specjalne znaczenie albo trudno je wpisać.",
    items: [
      { tag: "&lt; &gt; &amp;", kind: "atrybut", desc: "Znaki <, > i & w treści. Bez encji przeglądarka mogłaby uznać je za początek znacznika.", example: `<p>Warunek: a &lt; b &amp;&amp; b &gt; c</p>` },
      { tag: "&nbsp;", kind: "atrybut", desc: "Twarda spacja — nie pozwala złamać linii (np. „10 zł”, „w domu”).", example: `<p>Cena: 10&nbsp;zł</p>` },
      { tag: "&copy; &quot; &rarr;", kind: "atrybut", desc: "©, cudzysłów \" i strzałka →. W UTF-8 możesz też wpisać znaki wprost.", example: `<p>&copy; 2026 · &quot;cytat&quot; · Dalej &rarr;</p>` },
    ],
  },
];
