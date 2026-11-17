/* M5 — Bootstrap */
WDAI.modules.push({
  id: "m5",
  code: "M5",
  tech: "bs",
  title: "Bootstrap — gotowe style i siatka",
  short: "Bootstrap",
  lab: "Wykład 3",
  syllabus: "W3",
  intro: "Bootstrap to framework CSS: gotowa siatka 12 kolumn, komponenty (przyciski, karty, menu, formularze) i klasy pomocnicze. Zamiast pisać CSS, dopisujesz klasy w HTML. Piaskownice mają podłączony Bootstrap 5.3.",
  topics: [
    {
      id: "podlaczenie",
      title: "Czym jest Bootstrap i jak go podłączyć",
      keywords: ["bootstrap", "cdn", "framework css", "podłączenie", "bundle"],
      theory: [
        "Bootstrap to zbiór gotowych klas CSS (i trochę JS do interaktywnych komponentów). Wygląd budujesz, dopisując klasy w HTML, np. `class=\"btn btn-primary\"`. Wersja 5 nie wymaga jQuery.",
        "**Plusy:** szybki prototyp, responsywność „z pudełka”, spójny wygląd. **Minusy:** strony wyglądają podobnie, dużo nieużywanego CSS, trudniej o własny styl. Własny CSS możesz dopisać po Bootstrapie — nadpisze jego reguły.",
      ],
      syntax: [
        {
          title: "Podłączenie przez CDN",
          lang: "html",
          code: `
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1" />   <!-- ❶ -->
  <link rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" />  <!-- ❷ -->
  <link rel="stylesheet" href="css/style.css" />                          <!-- ❸ -->
</head>
<body>
  ...
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>  <!-- ❹ -->
</body>`,
          legend: [["❶", "viewport — bez niego siatka nie zadziała na telefonie"], ["❷", "CSS Bootstrapa"], ["❸", "własny CSS PO Bootstrapie — może go nadpisać"], ["❹", "JS do menu, modali, rozwijanych elementów (bundle zawiera Popper)"]],
          explain: "W projekcie z npm: `npm install bootstrap`, a w JS `import \"bootstrap/dist/css/bootstrap.min.css\"`.",
        },
      ],
      try: {
        mode: "bootstrap",
        html: `<div class="container py-4">
  <h1 class="text-primary">Cześć, Bootstrap!</h1>
  <p class="lead">Ten tekst ma klasę lead.</p>
  <button class="btn btn-primary">Przycisk</button>
</div>`,
        task: "Zmień `btn-primary` na `btn-success`, a potem `btn-outline-danger`. Dodaj drugi przycisk `btn btn-secondary ms-2`.",
      },
    },
    {
      id: "siatka",
      title: "Kontener i siatka 12 kolumn",
      keywords: ["container", "row", "col", "siatka", "grid", "12 kolumn", "g-3", "gutter"],
      theory: [
        "Układ budujesz z trzech poziomów: `.container` (wyśrodkowany kontener z marginesami) → `.row` (wiersz) → `.col-*` (kolumny). Wiersz ma **12 jednostek** szerokości: `col-6` = połowa, `col-4` = jedna trzecia, `col-3` = ćwiartka.",
        "`.col` bez liczby dzieli miejsce po równo. Odstępy między kolumnami: klasa `g-*` na `.row` (`g-3`, `gx-2`, `gy-4`). `.container-fluid` zajmuje całą szerokość.",
      ],
      syntax: [
        {
          title: "Siatka",
          lang: "html",
          code: `
<div class="container">                 <!-- ❶ -->
  <div class="row g-3">                 <!-- ❷ -->
    <div class="col-8">Treść (8/12)</div>     <!-- ❸ -->
    <div class="col-4">Bok (4/12)</div>
  </div>
  <div class="row">
    <div class="col">1/3</div>          <!-- ❹ -->
    <div class="col">1/3</div>
    <div class="col">1/3</div>
  </div>
</div>`,
          legend: [["❶", "kontener: max szerokość + wyśrodkowanie"], ["❷", "wiersz; g-3 = odstępy między kolumnami"], ["❸", "liczby w wierszu sumują się do 12"], ["❹", "col bez liczby = równy podział"]],
        },
      ],
      try: {
        mode: "bootstrap",
        html: `<div class="container py-3">
  <div class="row g-2">
    <div class="col-8"><div class="p-3 bg-primary-subtle border">col-8</div></div>
    <div class="col-4"><div class="p-3 bg-warning-subtle border">col-4</div></div>
  </div>
</div>`,
        task: "Dodaj drugi wiersz z czterema równymi kolumnami (`col-3` albo `col`).",
      },
    },
    {
      id: "breakpointy",
      title: "Responsywność: breakpointy",
      keywords: ["breakpoint", "col-md", "col-lg", "responsywność", "sm", "md", "lg", "xl", "xxl", "mobile-first"],
      theory: [
        "Bootstrap jest **mobile-first**. Klasa z prefiksem rozmiaru działa **od tego rozmiaru w górę**: `col-12 col-md-6 col-lg-4` = telefon: pełna szerokość, tablet: pół, komputer: jedna trzecia.",
        ["`sm` ≥ 576px", "`md` ≥ 768px", "`lg` ≥ 992px", "`xl` ≥ 1200px", "`xxl` ≥ 1400px"],
        "To samo działa dla klas pomocniczych: `d-none d-md-block` (ukryte na telefonie, widoczne od tabletu), `text-center text-md-start`.",
      ],
      syntax: [
        {
          title: "Karty responsywne",
          lang: "html",
          code: `
<div class="row g-3">
  <div class="col-12 col-md-6 col-lg-4">A</div>    <!-- ❶ -->
  <div class="col-12 col-md-6 col-lg-4">B</div>
  <div class="col-12 col-md-12 col-lg-4">C</div>
</div>
<p class="d-none d-md-block">Widać od tabletu</p>  <!-- ❷ -->
<p class="d-md-none">Tylko na telefonie</p>        <!-- ❸ -->`,
          legend: [["❶", "telefon 12/12, od md 6/12, od lg 4/12"], ["❷", "ukryte, a od md widoczne"], ["❸", "widoczne, a od md ukryte"]],
          explain: "Odpowiednik w czystym CSS to media queries z `min-width` (M4).",
        },
      ],
      try: {
        mode: "bootstrap",
        html: `<div class="container py-3">
  <div class="row g-3">
    <div class="col-12 col-sm-6 col-lg-3"><div class="p-3 border bg-light">1</div></div>
    <div class="col-12 col-sm-6 col-lg-3"><div class="p-3 border bg-light">2</div></div>
    <div class="col-12 col-sm-6 col-lg-3"><div class="p-3 border bg-light">3</div></div>
    <div class="col-12 col-sm-6 col-lg-3"><div class="p-3 border bg-light">4</div></div>
  </div>
</div>`,
        task: "Zmieniaj szerokość podglądu (przeciągnij granicę okna) i obserwuj. Ustaw tak, żeby od `md` były 3 kolumny, a od `xl` 4.",
      },
    },
    {
      id: "klasy-pomocnicze",
      title: "Klasy pomocnicze (utilities)",
      keywords: ["m-", "p-", "mt-3", "px-2", "d-flex", "justify-content", "text-center", "bg-", "text-", "rounded", "shadow", "fw-bold"],
      theory: [
        "Zamiast pisać CSS, dopisujesz krótkie klasy. Skala odstępów to **0–5** (0, 0.25rem, 0.5rem, 1rem, 1.5rem, 3rem) i `auto`.",
        ["**Odstępy:** `m`/`p` + strona (`t` góra, `b` dół, `s` start/lewo, `e` koniec/prawo, `x` poziomo, `y` pionowo) + rozmiar: `mt-3`, `px-2`, `mb-0`, `mx-auto`.", "**Flex:** `d-flex`, `justify-content-between`, `align-items-center`, `gap-2`, `flex-column`, `flex-wrap`.", "**Tekst:** `text-center`, `fw-bold`, `fs-4`, `text-uppercase`, `text-muted`.", "**Kolory:** `text-primary`, `bg-success`, `bg-light`, `text-bg-dark`, `border-danger`.", "**Inne:** `rounded`, `rounded-circle`, `shadow`, `border`, `w-100`, `img-fluid` (obraz responsywny), `d-none`."],
      ],
      syntax: [
        {
          title: "Pasek z klasami pomocniczymi",
          lang: "html",
          code: `
<div class="d-flex justify-content-between align-items-center p-3 mb-3 bg-light rounded shadow-sm">  <!-- ❶ -->
  <span class="fw-bold fs-5 text-primary">Logo</span>        <!-- ❷ -->
  <div class="d-flex gap-2">                                   <!-- ❸ -->
    <a class="btn btn-sm btn-outline-secondary" href="#">Home</a>
    <a class="btn btn-sm btn-primary" href="#">Kontakt</a>
  </div>
</div>
<img src="foto.jpg" class="img-fluid rounded" alt="Opis" />   <!-- ❹ -->`,
          legend: [["❶", "flex + rozsunięcie + wyśrodkowanie w pionie + padding + margines dolny + tło + zaokrąglenie + cień"], ["❷", "pogrubienie, rozmiar, kolor"], ["❸", "odstęp między przyciskami"], ["❹", "obraz nigdy szerszy niż rodzic"]],
        },
      ],
      mistakes: [
        { lang: "html", bad: "<div class=\"margin-top-3 center\">", good: "<div class=\"mt-3 text-center\">", why: "Klasy Bootstrapa mają konkretne, skrócone nazwy — sprawdzaj w dokumentacji." },
      ],
      try: {
        mode: "bootstrap",
        html: `<div class="container py-3">
  <div class="p-3 border">Pudełko</div>
</div>`,
        task: "Zrób z pudełka: tło `bg-info-subtle`, zaokrąglenie, cień, tekst wyśrodkowany i pogrubiony, margines górny 4.",
        solution: `<div class="container py-3">
  <div class="p-3 border mt-4 bg-info-subtle rounded shadow text-center fw-bold">Pudełko</div>
</div>`,
        solutionFile: "html",
      },
    },
    {
      id: "komponenty",
      title: "Komponenty: przyciski, karty, alerty",
      keywords: ["btn", "card", "alert", "badge", "komponenty", "list-group"],
      theory: [
        "Komponenty to gotowe zestawy klas o ustalonej strukturze HTML. Najczęstsze: **przyciski** (`btn btn-*`), **karty** (`card` → `card-body`, `card-title`, `card-text`, `card-img-top`), **alerty** (`alert alert-*`), **odznaki** (`badge`), **listy** (`list-group`).",
        "Warianty kolorów: `primary`, `secondary`, `success`, `danger`, `warning`, `info`, `light`, `dark` — wspólne dla wszystkich komponentów.",
      ],
      syntax: [
        {
          title: "Karta projektu",
          lang: "html",
          code: `
<div class="card" style="width: 18rem;">                      <!-- ❶ -->
  <img src="https://picsum.photos/id/180/400/200" class="card-img-top" alt="Laptop" />
  <div class="card-body">                                     <!-- ❷ -->
    <h5 class="card-title">Strona przepisów <span class="badge text-bg-success">nowe</span></h5>
    <p class="card-text">Projekt w HTML i CSS.</p>
    <a href="#" class="btn btn-primary">Zobacz</a>              <!-- ❸ -->
  </div>
</div>
<div class="alert alert-warning mt-3" role="alert">Termin mija w piątek!</div>  <!-- ❹ -->`,
          legend: [["❶", "karta — ramka, tło, zaokrąglenie"], ["❷", "treść karty z odstępami"], ["❸", "przycisk w wariancie primary"], ["❹", "alert z kolorem ostrzeżenia"]],
        },
      ],
      try: {
        mode: "bootstrap",
        html: `<div class="container py-3">
  <div class="row g-3">
    <div class="col-12 col-md-6">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Projekt 1</h5>
          <p class="card-text">Statyczna strona WWW.</p>
          <a href="#" class="btn btn-primary">Zobacz</a>
        </div>
      </div>
    </div>
  </div>
</div>`,
        task: "Dodaj drugą kartę ze zdjęciem (`card-img-top`) i odznaką `badge`. Pod kartami dodaj zielony alert.",
      },
    },
    {
      id: "navbar",
      title: "Navbar — responsywne menu",
      keywords: ["navbar", "menu", "hamburger", "collapse", "navbar-expand-lg", "nav-link"],
      theory: [
        "`navbar` to gotowe menu, które na telefonie chowa się pod przyciskiem (hamburger), a od wybranego breakpointu rozwija w poziomie (`navbar-expand-lg`). Rozwijanie działa dzięki JS Bootstrapa (`data-bs-toggle=\"collapse\"`) — bez pisania własnego kodu.",
      ],
      syntax: [
        {
          title: "Menu strony",
          lang: "html",
          code: `
<nav class="navbar navbar-expand-lg bg-body-tertiary">                <!-- ❶ -->
  <div class="container">
    <a class="navbar-brand" href="#">Jan Kowalski</a>
    <button class="navbar-toggler" type="button"
            data-bs-toggle="collapse" data-bs-target="#menu"
            aria-controls="menu" aria-expanded="false" aria-label="Menu">  <!-- ❷ -->
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="menu">                  <!-- ❸ -->
      <ul class="navbar-nav ms-auto">                                  <!-- ❹ -->
        <li class="nav-item"><a class="nav-link active" aria-current="page" href="#">Home</a></li>
        <li class="nav-item"><a class="nav-link" href="#">Galeria</a></li>
        <li class="nav-item"><a class="nav-link" href="#">Kontakt</a></li>
      </ul>
    </div>
  </div>
</nav>`,
          legend: [["❶", "od lg menu w poziomie, poniżej — schowane"], ["❷", "przycisk hamburgera; data-bs-target wskazuje id menu"], ["❸", "zawartość chowana na małych ekranach"], ["❹", "ms-auto dosuwa linki do prawej"]],
        },
      ],
      try: {
        mode: "bootstrap",
        html: `<nav class="navbar navbar-expand-sm bg-dark" data-bs-theme="dark">
  <div class="container">
    <a class="navbar-brand" href="#">Logo</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#m" aria-controls="m" aria-expanded="false" aria-label="Menu">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="m">
      <ul class="navbar-nav ms-auto">
        <li class="nav-item"><a class="nav-link active" href="#">Home</a></li>
        <li class="nav-item"><a class="nav-link" href="#">Kontakt</a></li>
      </ul>
    </div>
  </div>
</nav>`,
        task: "Zwęź podgląd poniżej 576px i kliknij hamburger. Dodaj link „Galeria” i zmień `navbar-expand-sm` na `navbar-expand-lg`.",
      },
    },
    {
      id: "formularze",
      title: "Formularze w Bootstrapie",
      keywords: ["form-control", "form-label", "form-select", "form-check", "mb-3", "walidacja", "was-validated"],
      theory: [
        "Polom dajesz klasy: `form-label` (etykieta), `form-control` (input, textarea), `form-select` (select), `form-check` + `form-check-input` (checkbox/radio). Odstęp między grupami: `mb-3`.",
        "Walidacja: Bootstrap koloruje pola `:invalid`, gdy formularz ma klasę `was-validated`; komunikat w `invalid-feedback`.",
      ],
      syntax: [
        {
          title: "Formularz kontaktowy",
          lang: "html",
          code: `
<form class="needs-validation" novalidate>
  <div class="mb-3">                                          <!-- ❶ -->
    <label for="email" class="form-label">E-mail</label>
    <input type="email" class="form-control" id="email" required />   <!-- ❷ -->
    <div class="invalid-feedback">Podaj poprawny e-mail.</div>        <!-- ❸ -->
  </div>
  <div class="mb-3">
    <label for="topic" class="form-label">Temat</label>
    <select class="form-select" id="topic" required>
      <option value="">— wybierz —</option><option>Pytanie</option>
    </select>
  </div>
  <div class="form-check mb-3">
    <input class="form-check-input" type="checkbox" id="rodo" required />
    <label class="form-check-label" for="rodo">Zgoda</label>
  </div>
  <button class="btn btn-primary">Wyślij</button>
</form>`,
          legend: [["❶", "grupa pola z odstępem"], ["❷", "form-control — pełna szerokość, ładny wygląd"], ["❸", "komunikat widoczny, gdy pole jest błędne i formularz ma was-validated"]],
          explain: "Włączenie podświetlania: w JS na submit `form.classList.add(\"was-validated\")` i `e.preventDefault()`, gdy `!form.checkValidity()`.",
        },
      ],
      try: {
        mode: "bootstrap",
        html: `<form class="container py-3" id="f" novalidate style="max-width:420px">
  <div class="mb-3">
    <label for="email" class="form-label">E-mail</label>
    <input type="email" class="form-control" id="email" required>
    <div class="invalid-feedback">Podaj poprawny e-mail.</div>
  </div>
  <button class="btn btn-primary">Wyślij</button>
</form>`,
        js: `const f = document.querySelector("#f");
f.addEventListener("submit", (e) => {
  e.preventDefault();
  f.classList.add("was-validated");
  if (f.checkValidity()) console.log("OK, wysłano");
});`,
        task: "Dodaj `<textarea class=\"form-control\" required>` z etykietą i komunikatem błędu. Wyślij pusty formularz.",
      },
    },
  ],
  flashcards: [
    ["Czym jest Bootstrap?", "Frameworkiem CSS z gotową siatką, komponentami i klasami pomocniczymi."],
    ["Trzy poziomy siatki Bootstrapa?", "`.container` → `.row` → `.col-*`."],
    ["Ile jednostek ma wiersz siatki?", "12."],
    ["Co oznacza `col-12 col-md-6`?", "Telefon: pełna szerokość; od 768px (md): połowa."],
    ["Breakpointy Bootstrapa?", "sm 576, md 768, lg 992, xl 1200, xxl 1400 (px, od tej szerokości w górę)."],
    ["Co znaczy `mt-3`?", "margin-top w skali 3 (1rem)."],
    ["Co znaczy `px-2`?", "padding poziomo (lewo i prawo) w skali 2."],
    ["Jak wyśrodkować blok poziomo?", "`mx-auto` (przy ustalonej szerokości)."],
    ["Jak zrobić flex z rozsuniętymi elementami?", "`d-flex justify-content-between align-items-center`."],
    ["Jak ukryć element tylko na telefonie?", "`d-none d-md-block`."],
    ["Klasa responsywnego obrazu?", "`img-fluid`."],
    ["Klasy pola tekstowego i selecta?", "`form-control` i `form-select`; etykieta `form-label`."],
    ["Po co plik `bootstrap.bundle.min.js`?", "Do komponentów interaktywnych: rozwijane menu (collapse), modale, dropdowny."],
    ["Plusy i minusy Bootstrapa?", "Plusy: szybkość, responsywność, spójność. Minusy: podobny wygląd stron, nadmiar CSS."],
  ],
  quiz: [
    { q: "Ile kolumn ma siatka Bootstrapa?", options: ["10", "12", "16", "24"], answer: 1 },
    { q: "Co da `col-6 col-lg-3` na ekranie 1200px?", options: ["Pół szerokości", "Ćwierć szerokości", "Pełna szerokość", "Jedna trzecia"], answer: 1, explain: "lg działa od 992px — 3/12 = ćwierć." },
    { q: "Co da `col-6 col-lg-3` na telefonie (400px)?", options: ["Pół szerokości", "Ćwierć", "Pełna szerokość", "Ukryte"], answer: 0 },
    { q: "Która klasa dodaje margines dolny?", options: ["mt-3", "mb-3", "pb-3", "md-3"], answer: 1 },
    { q: "Która klasa ukrywa element na telefonie, a pokazuje od tabletu?", options: ["d-md-none", "d-none d-md-block", "hidden-md", "d-block d-md-none"], answer: 1 },
    { q: "Jak zbudować kartę?", options: ["<div class=\"card\"><div class=\"card-body\">…", "<card><body>…", "<div class=\"box\">…", "<section class=\"bs-card\">…"], answer: 0 },
    { q: "Co jest potrzebne, żeby hamburger w navbarze rozwijał menu?", options: ["Własny JS", "bootstrap.bundle.min.js i data-bs-toggle=\"collapse\"", "jQuery", "Nic"], answer: 1 },
    { q: "Gdzie podłączyć własny CSS, żeby nadpisywał Bootstrapa?", options: ["Przed Bootstrapem", "Po Bootstrapie", "W body", "Nie da się"], answer: 1 },
    { q: "Która klasa robi responsywny obraz?", options: ["img-responsive", "img-fluid", "w-auto", "img-100"], answer: 1 },
  ],
});
