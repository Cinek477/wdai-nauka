/* Przewodnik: Lab 3 — krok po kroku (bez gotowych rozwiązań) */
WDAI.modules.push({
  id: "lab3",
  code: "LAB 3",
  guide: true,
  tech: "js",
  title: "Lab 3 — przewodnik krok po kroku",
  short: "Lab 3: przewodnik",
  lab: "Lab 3",
  syllabus: "W2, U2",
  intro: "Lab 3 to ćwiczenia za 5 pkt (stoper, generator haseł, dane z API) i zadanie domowe za 5 pkt (gra w canvas). Ten przewodnik nie daje gotowców: dla każdego ćwiczenia masz plan, potrzebną składnię z linkami do lekcji, szkielet z TODO i podpowiedzi. Kod piszesz sam.",
  topics: [
    {
      id: "przygotowanie",
      title: "0. Przygotowanie folderu",
      keywords: ["lab 3", "folder", "struktura", "index"],
      theory: [
        "Utwórz w repozytorium folder `Lab_03`. Tak jak w Lab 1 zrób `index.html` z nagłówkiem i listą numerowaną linków do podstron z ćwiczeniami. Każde ćwiczenie to osobny folder albo para plików HTML + JS.",
        "Otwieraj strony przez **Live Server** (prawy klik → Open with Live Server). Zawsze miej otwartą konsolę (F12), bo tam zobaczysz błędy.",
        ["Do zrobienia: stoper (0.5 pkt), generator haseł (1.5 pkt), tabela z API (1.5 pkt), filtr + sortowanie (1.5 pkt).", "Zadanie domowe: gra w canvas (5 pkt) — wg opisu w PDF Lab 3."],
      ],
      syntax: [
        {
          title: "Proponowana struktura",
          lang: "bash",
          code: `
Lab_03/
  index.html            # lista linków do ćwiczeń
  stoper/index.html     # + stoper/app.js
  hasla/index.html      # + hasla/app.js
  api/index.html        # + api/app.js
  gra/index.html        # + gra/game.js + gra/assets/`,
        },
        {
          title: "Szablon każdego ćwiczenia",
          lang: "html",
          code: `
<!DOCTYPE html>
<html lang="pl">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Lab 3 — Stoper</title>
    <script src="app.js" defer></script>     <!-- ❶ -->
  </head>
  <body>
    <main>
      <h1>Stoper</h1>
      <!-- elementy ćwiczenia -->
    </main>
  </body>
</html>`,
          legend: [["❶", "defer — skrypt zadziała, gdy HTML już istnieje"]],
        },
      ],
    },
    {
      id: "stoper",
      title: "1. Stoper (0.5 pkt)",
      keywords: ["stoper", "setInterval", "clearInterval", "start", "stop", "reset", "format czasu"],
      theory: [
        "**Wymagania:** przyciski „start”, „stop”, „reset”; czas w formacie „3min 48s”, a poniżej minuty „51s”.",
        "**Potrzebna składnia:** zdarzenia `click` (M7 → Zdarzenia), `setInterval`/`clearInterval` (M7 → Timery), formatowanie czasu `Math.floor` i `%` (M6 → Funkcje), `textContent` (M7 → Zmiana treści).",
        ["**Krok 1.** HTML: element na czas (np. `<p id=\"time\">0s</p>`) i trzy przyciski z id.", "**Krok 2.** Stan: zmienna z liczbą sekund i zmienna z id interwału (na start `null`).", "**Krok 3.** Funkcja `render()`, która wpisuje sformatowany czas do `<p>`.", "**Krok 4.** start: jeśli interwał już działa — nic nie rób; inaczej `setInterval` co 1000 ms (zwiększ sekundy, wywołaj render).", "**Krok 5.** stop: `clearInterval` i wyzeruj id. reset: stop + sekundy = 0 + render.", "**Krok 6.** Przetestuj przypadki z listy poniżej."],
      ],
      syntax: [
        {
          title: "Szkielet do uzupełnienia",
          lang: "js",
          code: `
const timeEl = document.querySelector("#time");
let seconds = 0;
let intervalId = null;

function format(total) {
  // TODO: zwróć "51s" albo "3min 48s"
}

function render() {
  timeEl.textContent = format(seconds);
}

document.querySelector("#start").addEventListener("click", () => {
  // TODO: zabezpiecz przed podwójnym startem, uruchom setInterval
});

document.querySelector("#stop").addEventListener("click", () => {
  // TODO
});

document.querySelector("#reset").addEventListener("click", () => {
  // TODO
});

render();`,
        },
      ],
      mistakes: [
        { lang: "js", bad: "start.addEventListener(\"click\", () => {\n  setInterval(tick, 1000);\n});  // 2 kliknięcia = 2x szybszy stoper", good: "if (intervalId !== null) return;\nintervalId = setInterval(tick, 1000);", why: "Każde kliknięcie start tworzy nowy interwał. Sprawdź, czy już działa." },
      ],
      tip: "Testy: 0 → „0s”; 59 → „59s”; 60 → „1min 0s”; 228 → „3min 48s”. Kliknij start 3 razy — czas ma rosnąć o 1 na sekundę. Stop zatrzymuje, start wznawia od tej samej wartości.",
      try: {
        html: `<p>Sprawdź swoją funkcję formatującą (konsola):</p>`,
        js: `function format(total) {
  // twój kod
}

[0, 51, 59, 60, 228].forEach((s) => console.log(s, "→", format(s)));`,
        task: "Napisz `format` tak, żeby wszystkie przypadki testowe dawały poprawny wynik.",
        hint: "Minuty to `Math.floor(total / 60)`, sekundy to `total % 60`. Jeśli minut jest 0, zwróć same sekundy.",
      },
    },
    {
      id: "hasla",
      title: "2. Generator haseł (1.5 pkt)",
      keywords: ["generator haseł", "Math.random", "checkbox", "input number", "alert", "losowanie"],
      theory: [
        "**Wymagania:** pola: minimalna długość, maksymalna długość, checkbox „wielkie litery”, checkbox „znaki specjalne”, przycisk „Wygeneruj hasło”. Wynik pokazujesz przez `alert()`.",
        "**Potrzebna składnia:** formularze i `input.value` / `checkbox.checked` (M7 → Obsługa formularza), `Number()`, `Math.random()` i `Math.floor()`, pętla `for` (M6 → Pętle), sklejanie tekstu.",
        ["**Krok 1.** HTML: dwa `<input type=\"number\">` i dwa checkboxy — każde z `<label>`, do tego przycisk.", "**Krok 2.** Po kliknięciu odczytaj wartości. Pamiętaj, że `value` to tekst — zamień przez `Number()`.", "**Krok 3.** Walidacja: liczby dodatnie, min ≤ max. Jeśli coś jest źle, pokaż komunikat i przerwij (`return`).", "**Krok 4.** Zbuduj pulę znaków: zawsze małe litery (+ cyfry), dodaj wielkie i specjalne, jeśli zaznaczone.", "**Krok 5.** Wylosuj długość z przedziału [min, max] (włącznie!).", "**Krok 6.** W pętli dobieraj losowy znak z puli i doklejaj go do hasła. Na końcu `alert(hasło)`."],
      ],
      syntax: [
        {
          title: "Losowanie — klocki do wykorzystania",
          lang: "js",
          code: `
Math.random();                         // ❶ liczba z [0, 1)
Math.floor(Math.random() * 10);        // ❷ całkowita 0..9

function randomInt(min, max) {         // ❸ całkowita z [min, max] włącznie
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const pool = "abc" + "XYZ";            // ❹ łączenie tekstów
const ch = pool[randomInt(0, pool.length - 1)];  // ❺ losowy znak

const upper = document.querySelector("#upper").checked;  // ❻ true/false
const min = Number(document.querySelector("#min").value); // ❼`,
          legend: [["❶", "losowa liczba ułamkowa"], ["❷", "losowa liczba całkowita"], ["❸", "przedział z obiema granicami"], ["❹", "pula znaków to zwykły string"], ["❺", "znak pod losowym indeksem"], ["❻", "stan checkboxa"], ["❼", "value z inputa to tekst — zamień na liczbę"]],
        },
        {
          title: "Pule znaków",
          lang: "js",
          code: `
const LOWER = "abcdefghijklmnopqrstuvwxyz";
const UPPER = LOWER.toUpperCase();
const DIGITS = "0123456789";
const SPECIAL = "!@#$%^&*()-_=+[]{};:,.?";`,
        },
      ],
      mistakes: [
        { lang: "js", bad: "const len = minInput.value + 2;  // \"8\" + 2 = \"82\"", good: "const len = Number(minInput.value) + 2;  // 10", why: "Wartości z pól formularza to tekst. Przed obliczeniami zamień je na liczby." },
      ],
      tip: "Testy: min 8, max 8 → zawsze 8 znaków; bez checkboxów → brak wielkich liter i znaków specjalnych; min 12, max 5 → komunikat o błędzie zamiast hasła.",
      try: {
        js: `function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// sprawdź, czy randomInt(3, 5) zwraca tylko 3, 4, 5
const counts = { 3: 0, 4: 0, 5: 0 };
for (let i = 0; i < 1000; i++) counts[randomInt(3, 5)]++;
console.log(counts);`,
        task: "Napisz funkcję `pick(pool)`, która zwraca losowy znak z napisu `pool`, i wypisz 10 losowych znaków z `\"abc123\"`.",
      },
    },
    {
      id: "api-tabela",
      title: "3a. Dane z API w tabeli (1.5 pkt)",
      keywords: ["fetch", "dummyjson", "tabela", "products", "async", "await", "render"],
      theory: [
        "**Wymagania:** pobierz dane z `https://dummyjson.com/products` i wyświetl **pierwsze 30** produktów w tabeli z kolumnami: zdjęcie, tytuł, opis.",
        "**Potrzebna składnia:** `fetch` + `async/await` (M7 → fetch), tworzenie elementów (M7 → Tworzenie elementów), tabela HTML (M2 → Listy i tabele), `slice` (M6 → Tablice).",
        ["**Krok 1.** HTML: `<table>` z `<thead>` (3 nagłówki) i pustym `<tbody>`. Element na komunikat ładowania.", "**Krok 2.** Funkcja `async load()`: fetch, sprawdź `res.ok`, `await res.json()`.", "**Krok 3.** Sprawdź w konsoli, jak wygląda odpowiedź (`console.log(data)`) — produkty są w `data.products`. Pole ze zdjęciem: `thumbnail`.", "**Krok 4.** Zapisz 30 pierwszych w zmiennej globalnej (przyda się w 3b).", "**Krok 5.** Funkcja `render(lista)`: wyczyść tbody i dla każdego produktu utwórz `<tr>` z trzema `<td>` (w pierwszej `<img>` z `alt`).", "**Krok 6.** Obsłuż błąd sieci komunikatem dla użytkownika."],
      ],
      syntax: [
        {
          title: "Szkielet",
          lang: "js",
          code: `
let products = [];                      // oryginalne 30 produktów
const tbody = document.querySelector("tbody");

async function load() {
  // TODO: fetch, res.ok, res.json(), products = ...slice(0, 30), render(products)
}

function render(list) {
  tbody.replaceChildren();
  // TODO: dla każdego produktu utwórz wiersz: img (thumbnail), title, description
}

load();`,
        },
      ],
      tip: "Zobacz, co zwraca API: otwórz adres w przeglądarce albo zrób `console.log(data)`. Dodaj obrazkom CSS `width: 80px`, a tabeli `border-collapse: collapse`.",
      try: {
        js: `async function peek() {
  const res = await fetch("https://dummyjson.com/products");
  const data = await res.json();
  console.log("klucze odpowiedzi:", Object.keys(data));
  console.log("liczba produktów:", data.products.length);
  console.log("pierwszy produkt:", data.products[0]);
}
peek();`,
        task: "Uruchom i obejrzyj strukturę danych. Wypisz same tytuły pierwszych 30 produktów (`slice` + `map`).",
      },
    },
    {
      id: "filtr-sort",
      title: "3b. Filtrowanie i sortowanie (1.5 pkt)",
      keywords: ["filtr", "sortowanie", "select", "input", "filter", "sort", "localeCompare", "oryginalna kolejność"],
      theory: [
        "**Wymagania:** nad tabelą `<input>` do filtrowania po wpisanej frazie, a obok `<select>` z sortowaniem: rosnąco, malejąco, oryginalna kolejność.",
        "**Potrzebna składnia:** zdarzenia `input` i `change` (M7 → Zdarzenia), `filter` + `includes` + `toLowerCase`, `sort` z `localeCompare` na **kopii** tablicy (M6 → Tablice).",
        ["**Krok 1.** HTML: `<input type=\"search\">` i `<select>` z trzema `<option value=\"...\">` (każde z `<label>`).", "**Krok 2.** Jedna funkcja `update()`: odczytaj frazę i tryb sortowania.", "**Krok 3.** Filtruj oryginalną tablicę: zostaw produkty, których tytuł (lub opis) zawiera frazę — bez względu na wielkość liter.", "**Krok 4.** Jeśli tryb ≠ oryginalna: posortuj **kopię** wyniku po tytule; dla malejąco odwróć porównanie.", "**Krok 5.** `render(wynik)`.", "**Krok 6.** Wywołuj `update()` na zdarzeniu `input` w polu i `change` w selekcie."],
      ],
      syntax: [
        {
          title: "Klocki do wykorzystania",
          lang: "js",
          code: `
const q = "Phone".toLowerCase();
"iPhone 9".toLowerCase().includes(q);            // ❶ true

const copy = [...list];                           // ❷
copy.sort((a, b) => a.title.localeCompare(b.title));   // ❸ A→Z
copy.sort((a, b) => b.title.localeCompare(a.title));   // ❹ Z→A

select.addEventListener("change", update);        // ❺
input.addEventListener("input", update);`,
          legend: [["❶", "wyszukiwanie bez względu na wielkość liter"], ["❷", "kopia — oryginał zachowuje kolejność"], ["❸", "rosnąco alfabetycznie"], ["❹", "malejąco: zamień a i b"], ["❺", "przekazujesz funkcję, nie jej wynik"]],
        },
      ],
      mistakes: [
        { lang: "js", bad: "products.sort(...);  // oryginalna kolejność przepada", good: "const sorted = [...filtered].sort(...);", why: "„Oryginalna kolejność” zadziała tylko wtedy, gdy nie posortujesz tablicy źródłowej." },
      ],
      tip: "Testy: wpisz „phone” → tylko pasujące; wyczyść pole → znowu 30; ustaw malejąco i wpisz frazę → wynik dalej posortowany; wybierz „oryginalna” → kolejność jak z API.",
      try: {
        js: `const items = [
  { title: "Laptop" }, { title: "iPhone 9" }, { title: "Apple Watch" }, { title: "Mascara" },
];

function update(query, mode) {
  // TODO: filter po query (bez wielkości liter) + sort wg mode: "asc" | "desc" | "none"
}

console.log(update("", "asc"));
console.log(update("a", "desc"));
console.log(update("phone", "none"));`,
        task: "Napisz `update`, która zwraca przefiltrowaną i posortowaną tablicę. Sprawdź, czy `items` po wywołaniach zachowuje oryginalną kolejność.",
      },
    },
    {
      id: "gra-plan",
      title: "Zadanie domowe: gra — plan i architektura",
      keywords: ["gra", "canvas", "stan gry", "ekran powitalny", "game over", "assety", "architektura"],
      theory: [
        "Gra to największe zadanie Lab 3 (5 pkt). Podziel ją na małe etapy i po każdym sprawdzaj, czy działa. Najważniejsza decyzja: gra ma **stany** i w każdej klatce robi coś innego zależnie od stanu.",
        ["`start` — ekran powitalny, czekamy na spację.", "`playing` — fizyka, przeszkody, wynik.", "`falling` — po kolizji postać spada do ziemi (wymaganie z PDF).", "`over` — ekran „Game Over” z najlepszym i ostatnim wynikiem + przycisk „Zagraj ponownie”."],
        ["**Etap 1.** Canvas + pętla `requestAnimationFrame` + tło na całą planszę.", "**Etap 2.** Postać ze sprite'a, grawitacja, skok spacją.", "**Etap 3.** Animacja lotu (podmiana klatek sprite'a) i pochylenie zależne od prędkości.", "**Etap 4.** Przeszkody z losową przerwą, przesuwanie, usuwanie poza ekranem.", "**Etap 5.** Kolizje, liczenie wyniku, wynik w prawym górnym rogu.", "**Etap 6.** Stany: start → playing → falling → over → start.", "**Etap 7.** Top 5 wyników w localStorage, muzyka i dźwięki.", "**Etap 8 (bonus).** Boosty lub animacja rekordu — wg PDF."],
      ],
      syntax: [
        {
          title: "Maszyna stanów w pętli",
          lang: "js",
          code: `
let state = "start";              // ❶ "start" | "playing" | "falling" | "over"

function update() {
  if (state === "playing") { /* fizyka, przeszkody, kolizje, wynik */ }
  if (state === "falling") { /* tylko grawitacja aż do ziemi, potem state = "over" */ }
}

function draw() {
  drawBackground();               // ❷ zawsze
  drawPipes();
  drawBird();
  if (state === "start") drawStartScreen();
  if (state === "over") drawGameOver();
  drawScore();
}

document.addEventListener("keydown", (e) => {
  if (e.code !== "Space") return;
  e.preventDefault();
  if (state === "start") { resetGame(); state = "playing"; }  // ❸
  if (state === "playing") flap();
});

function loop() { update(); draw(); requestAnimationFrame(loop); }
requestAnimationFrame(loop);`,
          legend: [["❶", "jedna zmienna decyduje, co robi gra"], ["❷", "rysowanie od tyłu do przodu: tło → przeszkody → postać → napisy"], ["❸", "spacja robi różne rzeczy w różnych stanach"]],
        },
      ],
      tip: "Podstawy canvas, pętli i kolizji: M7 → Canvas i pętla gry. Zapis wyników: M7 → localStorage.",
    },
    {
      id: "gra-grafika",
      title: "Gra: obrazy, sprite'y, obrót i dźwięk",
      keywords: ["drawImage", "sprite", "Image", "animacja", "rotate", "save", "restore", "Audio", "dźwięk", "muzyka"],
      theory: [
        "Obraz do canvas wczytujesz przez `new Image()` i ustawienie `src`. Rysować możesz dopiero, gdy się wczyta (zdarzenie `load`) — najprościej uruchomić pętlę po wczytaniu wszystkich obrazów.",
        "**Animacja sprite'a**: masz kilka klatek (osobne pliki albo jedna taśma). Co kilka klatek gry zmieniasz indeks klatki i rysujesz odpowiedni obraz.",
        "**Obrót** w canvas: zapisz stan (`save`), przesuń układ do środka postaci (`translate`), obróć (`rotate`, kąt w radianach), narysuj obraz przesunięty o połowę rozmiaru, przywróć stan (`restore`).",
        "**Dźwięk**: `new Audio(\"plik.mp3\")`, `.play()`, `.pause()`, `.loop = true`. Przeglądarki blokują dźwięk przed pierwszą interakcją użytkownika — uruchom muzykę dopiero po naciśnięciu spacji.",
      ],
      syntax: [
        {
          title: "Klocki grafiki i dźwięku",
          lang: "js",
          code: `
function loadImage(src) {                                  // ❶
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.src = src;
  });
}
const frames = await Promise.all([                         // ❷
  loadImage("assets/bird-up.png"),
  loadImage("assets/bird-mid.png"),
  loadImage("assets/bird-down.png"),
]);

let tick = 0;
const frame = frames[Math.floor(tick++ / 6) % frames.length];  // ❸

const angle = Math.max(-0.4, Math.min(1.2, bird.vy * 0.08));   // ❹
ctx.save();
ctx.translate(bird.x + bird.w / 2, bird.y + bird.h / 2);       // ❺
ctx.rotate(angle);
ctx.drawImage(frame, -bird.w / 2, -bird.h / 2, bird.w, bird.h);
ctx.restore();                                                  // ❻

const music = new Audio("assets/music.mp3");               // ❼
music.loop = true;
music.play();          // wywołaj w obsłudze spacji, nie od razu
const hitSound = new Audio("assets/hit.mp3");
hitSound.currentTime = 0; hitSound.play();                  // ❽`,
          legend: [["❶", "wczytanie obrazu jako Promise"], ["❷", "poczekaj na wszystkie obrazy przed startem pętli"], ["❸", "zmiana klatki co 6 klatek gry"], ["❹", "kąt z prędkości, ograniczony z obu stron"], ["❺", "obrót wokół środka postaci"], ["❻", "przywróć układ, żeby obrót nie wpłynął na resztę"], ["❼", "muzyka w pętli"], ["❽", "dźwięk od początku przy każdym uderzeniu"]],
        },
      ],
    },
    {
      id: "gra-logika",
      title: "Gra: przeszkody, wynik, Game Over i top 5",
      keywords: ["przeszkody", "rury", "losowa przerwa", "wynik", "kolizja", "top 5", "localStorage", "restart"],
      theory: [
        "Przeszkody trzymaj w tablicy obiektów `{ x, gapY, passed }`. Co jakiś czas (np. co 90 klatek albo gdy ostatnia przeszkoda minie dany punkt) dodaj nową z losową pozycją przerwy. W każdej klatce przesuń wszystkie w lewo i usuń te, które wyszły poza ekran (`filter`).",
        "**Wynik**: gdy przeszkoda minie postać (`pipe.x + width < bird.x`) i nie była jeszcze policzona (`!pipe.passed`) — zwiększ wynik i ustaw `passed = true`.",
        "**Kolizja**: każda przeszkoda to dwa prostokąty (górna i dolna część). Sprawdź kolizję postaci z oboma (funkcja `hit` z M7) oraz z ziemią.",
        "**Top 5**: po końcu gry odczytaj tablicę wyników z localStorage, dodaj nowy, posortuj malejąco, utnij do 5 i zapisz. Na ekranie Game Over pokaż najlepszy (pierwszy z tablicy) i ostatni wynik.",
      ],
      syntax: [
        {
          title: "Klocki logiki",
          lang: "js",
          code: `
const GAP = 140;                                     // ❶
let pipes = [];

function spawnPipe() {
  const gapY = randomInt(80, canvas.height - 80 - GAP);   // ❷
  pipes.push({ x: canvas.width, gapY, passed: false });
}

function updatePipes() {
  pipes.forEach((p) => (p.x -= SPEED));
  pipes = pipes.filter((p) => p.x + PIPE_W > 0);    // ❸
  for (const p of pipes) {
    if (!p.passed && p.x + PIPE_W < bird.x) {       // ❹
      p.passed = true;
      score++;
    }
  }
}

const topRect = (p) => ({ x: p.x, y: 0, w: PIPE_W, h: p.gapY });             // ❺
const bottomRect = (p) => ({ x: p.x, y: p.gapY + GAP, w: PIPE_W, h: canvas.height });

function saveScore(s) {                              // ❻
  const best = JSON.parse(localStorage.getItem("top5") ?? "[]");
  best.push(s);
  best.sort((a, b) => b - a);
  localStorage.setItem("top5", JSON.stringify(best.slice(0, 5)));
}`,
          legend: [["❶", "stała wielkość przerwy"], ["❷", "losowa pozycja przerwy (randomInt z ćwiczenia 2)"], ["❸", "usuń przeszkody poza ekranem"], ["❹", "punkt za każdą minioną przeszkodę, liczony raz"], ["❺", "prostokąty kolizji górnej i dolnej części"], ["❻", "top 5 w localStorage"]],
          explain: "Przycisk „Zagraj ponownie” możesz zrobić jako prawdziwy `<button>` nałożony na canvas (`position: absolute`) i pokazywany przez `hidden = false` w stanie over.",
        },
      ],
      tip: "Kolejność rysowania przeszkody z obrazka: górną część narysuj odwróconą (`ctx.scale(1, -1)` w `save/restore`) albo użyj osobnego obrazka.",
    },
  ],
  flashcards: [
    ["Jak zabezpieczyć stoper przed podwójnym startem?", "Sprawdź, czy id interwału nie jest null; jeśli działa — `return`."],
    ["Jak sformatować 228 s jako „3min 48s”?", "`Math.floor(228 / 60)` = 3, `228 % 60` = 48."],
    ["Jak wylosować liczbę całkowitą z [min, max] włącznie?", "`Math.floor(Math.random() * (max - min + 1)) + min`."],
    ["Jakiego typu jest `input.value`?", "Zawsze string — liczby zamień przez `Number()`."],
    ["Jak sprawdzić, czy checkbox jest zaznaczony?", "`checkbox.checked` (true/false)."],
    ["Gdzie w odpowiedzi dummyjson są produkty?", "`data.products`; zdjęcie: `thumbnail`."],
    ["Jak filtrować bez względu na wielkość liter?", "Porównuj `tekst.toLowerCase().includes(fraza.toLowerCase())`."],
    ["Jak posortować teksty malejąco?", "`arr.sort((a, b) => b.title.localeCompare(a.title))`."],
    ["Dlaczego sortujesz kopię?", "Żeby zachować oryginalną kolejność (opcja w selekcie)."],
    ["Jakie stany ma gra?", "start → playing → falling → over (→ start)."],
    ["Jak obrócić obraz w canvas wokół środka?", "`save` → `translate(środek)` → `rotate(kąt)` → `drawImage(-w/2, -h/2)` → `restore`."],
    ["Dlaczego muzyka nie gra od razu po wejściu na stronę?", "Przeglądarka blokuje dźwięk do pierwszej interakcji — uruchom `play()` po naciśnięciu spacji."],
    ["Jak liczyć punkt raz za przeszkodę?", "Flaga `passed` w obiekcie przeszkody."],
  ],
  quiz: [
    { q: "Co wypisze kod?", code: "const min = document.querySelector(\"#min\"); // wartość 8\nconsole.log(min.value + 2);", lang: "js", options: ["10", "82", "NaN", "błąd"], answer: 1, explain: "value to tekst — \"8\" + 2 = \"82\"." },
    { q: "Który zapis da liczbę całkowitą od 1 do 6 (kostka)?", options: ["Math.random() * 6", "Math.floor(Math.random() * 6)", "Math.floor(Math.random() * 6) + 1", "Math.round(Math.random() * 6)"], answer: 2 },
    { q: "Stoper: co się stanie po trzykrotnym kliknięciu start bez zabezpieczenia?", options: ["Nic", "Czas leci 3× szybciej", "Stoper się zatrzyma", "Błąd"], answer: 1 },
    { q: "Jak uzyskać pierwsze 30 elementów tablicy?", options: ["arr.splice(30)", "arr.slice(0, 30)", "arr.slice(30)", "arr.first(30)"], answer: 1 },
    { q: "Które zdarzenie selecta wywoła sortowanie po wyborze opcji?", options: ["click", "input", "change", "submit"], answer: 2 },
    { q: "Po co flaga `passed` w obiekcie przeszkody?", options: ["Do kolizji", "Żeby punkt był liczony tylko raz", "Do rysowania", "Do usuwania"], answer: 1 },
    { q: "Co robi `pipes.filter((p) => p.x + PIPE_W > 0)`?", options: ["Dodaje przeszkody", "Usuwa przeszkody, które wyszły poza lewą krawędź", "Sortuje przeszkody", "Przesuwa przeszkody"], answer: 1 },
  ],
});
