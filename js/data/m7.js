/* M7 — JavaScript w przeglądarce */
WDAI.modules.push({
  id: "m7",
  code: "M7",
  tech: "js",
  title: "JavaScript w przeglądarce: DOM, zdarzenia, async",
  short: "JS w przeglądarce",
  lab: "Lab 3",
  syllabus: "W2, U2",
  intro: "Jak JavaScript zmienia stronę: wyszukuje elementy, reaguje na kliknięcia, tworzy elementy z danych, pobiera dane z API i zapamiętuje ustawienia. To wszystko, czego potrzebujesz do Lab 3 i do punktów za JS w Projekcie 1.",
  topics: [
    {
      id: "dolaczanie",
      title: "Dołączanie skryptu i konsola",
      keywords: ["script", "defer", "module", "console", "devtools", "DOMContentLoaded"],
      theory: [
        "Skrypt dołączasz w `<head>` z atrybutem `defer` — wtedy uruchomi się po zbudowaniu całego HTML i `document.querySelector` znajdzie elementy. Alternatywa: `type=\"module\"` (też odroczony).",
        "**DOM** (Document Object Model) to drzewo obiektów, które przeglądarka tworzy z HTML. JavaScript zmienia DOM, a przeglądarka od razu przerysowuje stronę.",
        "Konsola w DevTools (F12) to najważniejsze narzędzie: pokazuje błędy (czerwone) i wyniki `console.log`.",
      ],
      syntax: [
        {
          title: "Poprawne dołączenie",
          lang: "html",
          code: `
<head>
  <script src="js/app.js" defer></script>       <!-- ❶ -->
</head>`,
          legend: [["❶", "defer: pobieraj równolegle, uruchom po wczytaniu HTML"]],
        },
        {
          title: "Pierwszy skrypt",
          lang: "js",
          code: `
console.log("Skrypt działa!");                 // ❶
const title = document.querySelector("h1");    // ❷
title.textContent = "Zmienione przez JS";      // ❸
console.log(title);                            // ❹`,
          legend: [["❶", "wypisanie w konsoli"], ["❷", "znajdź element w DOM"], ["❸", "zmień jego tekst"], ["❹", "podgląd elementu w konsoli"]],
        },
      ],
      mistakes: [
        { lang: "js", bad: "// skrypt w <head> bez defer\ndocument.querySelector(\"h1\").textContent = \"x\";\n// TypeError: Cannot set properties of null", good: "<script src=\"app.js\" defer></script>", why: "Bez `defer` skrypt uruchamia się, zanim powstanie `<h1>`, więc querySelector zwraca `null`." },
      ],
      try: {
        html: `<h1>Tytuł z HTML</h1>`,
        js: `const h1 = document.querySelector("h1");
h1.textContent = "Tytuł z JavaScriptu";
console.log("gotowe");`,
        task: "Zmień też kolor nagłówka przez `h1.style.color = \"tomato\"`.",
      },
    },
    {
      id: "wyszukiwanie",
      title: "Wyszukiwanie elementów",
      keywords: ["querySelector", "querySelectorAll", "getElementById", "getElementsByClassName", "closest", "NodeList"],
      theory: [
        "`querySelector(selektorCSS)` zwraca **pierwszy** pasujący element (albo `null`), `querySelectorAll` — **wszystkie** (NodeList, po której przejdziesz `forEach` lub `for…of`). Używasz tych samych selektorów co w CSS.",
        "Starsze metody: `getElementById(\"id\")` (bez #), `getElementsByClassName`, `getElementsByTagName` — zwracają „żywe” kolekcje. W nowym kodzie wystarczą `querySelector`/`querySelectorAll`.",
      ],
      syntax: [
        {
          title: "Metody wyszukiwania",
          lang: "js",
          code: `
const form = document.querySelector("#contact");         // ❶
const firstCard = document.querySelector(".card");       // ❷
const cards = document.querySelectorAll(".card");        // ❸
cards.forEach((card) => console.log(card.textContent));
const evens = document.querySelectorAll("ul li:nth-child(even)");  // ❹
const byId = document.getElementById("contact");         // ❺
const inside = form.querySelector("input[type=email]");  // ❻
const parentCard = inside.closest(".card");              // ❼`,
          legend: [["❶", "po id (z #)"], ["❷", "pierwszy z klasą"], ["❸", "wszystkie — NodeList"], ["❹", "dowolny selektor CSS"], ["❺", "po id (bez #)"], ["❻", "szukanie wewnątrz elementu"], ["❼", "najbliższy przodek pasujący do selektora (lub null)"]],
        },
      ],
      try: {
        html: `<ul>
  <li class="item">HTML</li>
  <li class="item">CSS</li>
  <li class="item">JS</li>
</ul>`,
        js: `const items = document.querySelectorAll(".item");
console.log("Liczba elementów:", items.length);`,
        task: "Przejdź po `items` pętlą i wypisz tekst każdego. Ostatniemu elementowi zmień tekst na „JavaScript”.",
        solution: `const items = document.querySelectorAll(".item");
items.forEach((li) => console.log(li.textContent));
items[items.length - 1].textContent = "JavaScript";`,
      },
    },
    {
      id: "modyfikacja",
      title: "Zmiana treści, klas, stylów i atrybutów",
      keywords: ["textContent", "innerHTML", "classList", "add", "remove", "toggle", "style", "setAttribute", "dataset", "hidden"],
      theory: [
        "`textContent` ustawia sam tekst (bezpieczne). `innerHTML` wstawia kod HTML — **nie wstawiaj tak tekstu od użytkownika**, bo to dziura bezpieczeństwa (XSS).",
        "Wygląd najlepiej zmieniać przez **klasy** (`classList.add/remove/toggle`), a style trzymać w CSS. `element.style.x` używaj do wartości liczonych w JS (np. pozycja, szerokość paska).",
        "Atrybuty: `getAttribute`/`setAttribute`, wiele z nich także jako właściwości (`img.src`, `input.value`, `a.href`). Atrybuty `data-*` czytasz przez `dataset`.",
      ],
      syntax: [
        {
          title: "Modyfikacja elementu",
          lang: "js",
          code: `
const box = document.querySelector(".box");

box.textContent = "Nowy tekst";                 // ❶
box.innerHTML = "<strong>Pogrubiony</strong>";  // ❷

box.classList.add("active");                    // ❸
box.classList.remove("hidden");
box.classList.toggle("dark");                   // ❹
console.log(box.classList.contains("active"));  // true

box.style.backgroundColor = "#e3f1ef";          // ❺
box.style.setProperty("--progress", "70%");

const img = document.querySelector("img");
img.src = "img/kot.jpg";                        // ❻
img.setAttribute("alt", "Kot śpi na kanapie");
console.log(box.dataset.price);                 // ❼ <div data-price="99">
box.hidden = true;                              // ❽`,
          legend: [["❶", "sam tekst — bezpieczne"], ["❷", "kod HTML — tylko z zaufanego źródła"], ["❸", "dodanie klasy (wygląd zdefiniowany w CSS)"], ["❹", "toggle: dodaje, jeśli nie ma; usuwa, jeśli jest"], ["❺", "styl inline: nazwy w camelCase"], ["❻", "zmiana atrybutu"], ["❼", "atrybut data-price"], ["❽", "ukrycie elementu"]],
        },
      ],
      mistakes: [
        { lang: "js", bad: "list.innerHTML += `<li>${userInput}</li>`;", good: "const li = document.createElement(\"li\");\nli.textContent = userInput;\nlist.append(li);", why: "Tekst użytkownika w innerHTML może zawierać złośliwy kod. textContent go nie wykona." },
      ],
      try: {
        html: `<div class="box">Kliknij przycisk</div>
<button id="btn">Przełącz motyw</button>`,
        css: `.box { padding: 20px; border-radius: 8px; background: #eee; margin-bottom: 10px; }
.box.dark { background: #1d1d1f; color: white; }`,
        js: `const box = document.querySelector(".box");
document.querySelector("#btn").addEventListener("click", () => {
  box.classList.toggle("dark");
});`,
        task: "Po każdym kliknięciu zmieniaj też tekst boksu na „Ciemny” albo „Jasny” — sprawdź `classList.contains(\"dark\")`.",
        solution: `const box = document.querySelector(".box");
document.querySelector("#btn").addEventListener("click", () => {
  box.classList.toggle("dark");
  box.textContent = box.classList.contains("dark") ? "Ciemny" : "Jasny";
});`,
      },
    },
    {
      id: "tworzenie",
      title: "Tworzenie i usuwanie elementów (renderowanie z danych)",
      keywords: ["createElement", "append", "appendChild", "remove", "replaceChildren", "render", "innerHTML = \"\""],
      theory: [
        "Nowy element tworzysz `document.createElement(\"tag\")`, ustawiasz mu treść i klasy, a potem dodajesz do strony: `rodzic.append(el)` (lub starsze `appendChild`). Usuwasz `el.remove()`.",
        "Typowy wzorzec (Lab 3, ćw. 3): masz **tablicę danych** → funkcja `render()` **czyści** kontener i tworzy element dla każdego obiektu. Po każdej zmianie danych (filtr, sortowanie) wywołujesz `render()` ponownie.",
      ],
      syntax: [
        {
          title: "Render listy z tablicy",
          lang: "js",
          code: `
const products = [
  { title: "Mysz", price: 59 },
  { title: "Monitor", price: 899 },
];
const list = document.querySelector("#products");

function render(items) {
  list.replaceChildren();                       // ❶ albo: list.innerHTML = "";
  items.forEach((p) => {
    const li = document.createElement("li");    // ❷
    li.className = "product";                   // ❸
    li.textContent = \`\${p.title} — \${p.price} zł\`;
    const btn = document.createElement("button");
    btn.textContent = "Usuń";
    btn.addEventListener("click", () => li.remove());  // ❹
    li.append(btn);                             // ❺
    list.append(li);
  });
}
render(products);`,
          legend: [["❶", "wyczyść stare elementy przed ponownym renderem"], ["❷", "nowy element w pamięci (jeszcze niewidoczny)"], ["❸", "klasa do stylowania"], ["❹", "usunięcie elementu ze strony"], ["❺", "dodanie dziecka — dopiero teraz element jest widoczny"]],
        },
        {
          title: "Tabela z danych",
          lang: "js",
          code: `
function renderTable(rows) {
  const tbody = document.querySelector("tbody");
  tbody.innerHTML = "";
  for (const row of rows) {
    const tr = document.createElement("tr");
    const img = document.createElement("img");
    img.src = row.thumbnail;
    img.alt = row.title;
    const cells = [img, row.title, row.description];   // ❶
    for (const value of cells) {
      const td = document.createElement("td");
      td.append(value);                                // ❷
      tr.append(td);
    }
    tbody.append(tr);
  }
}`,
          legend: [["❶", "zawartość kolejnych kolumn"], ["❷", "append przyjmuje element albo tekst"]],
        },
      ],
      try: {
        html: `<ul id="todo"></ul>`,
        js: `const tasks = ["Lab 1", "Projekt 1", "Lab 3"];
const ul = document.querySelector("#todo");

function render() {
  ul.replaceChildren();
  tasks.forEach((t) => {
    const li = document.createElement("li");
    li.textContent = t;
    ul.append(li);
  });
}
render();`,
        task: "Dodaj do HTML pole tekstowe i przycisk „Dodaj”. Po kliknięciu dopisz tekst do tablicy `tasks` i wywołaj `render()`.",
        hint: "`tasks.push(input.value)`, potem `render()` i `input.value = \"\"`.",
      },
    },
    {
      id: "zdarzenia",
      title: "Zdarzenia (events)",
      keywords: ["addEventListener", "removeEventListener", "click", "input", "change", "keydown", "submit", "event", "target", "key", "code"],
      theory: [
        "Zdarzenie to coś, co się stało: kliknięcie, wpisanie znaku, naciśnięcie klawisza, wysłanie formularza. Reagujesz na nie przez `element.addEventListener(\"typ\", funkcja)`. Funkcja dostaje obiekt **event** z informacjami (`target` — element źródłowy, `key` — klawisz itd.).",
        ["`click` — kliknięcie; `dblclick` — podwójne.", "`input` — każda zmiana tekstu w polu (na żywo); `change` — zatwierdzona zmiana (select, checkbox).", "`submit` — wysłanie formularza (na `<form>`).", "`keydown` / `keyup` — klawiatura: `e.key` (\"a\", \"Enter\", \"ArrowRight\") lub `e.code` (\"Space\", \"KeyA\").", "`mouseenter` / `mouseleave`, `scroll`, `resize`, `DOMContentLoaded`, `load`."],
        "Funkcję usuniesz przez `removeEventListener` z tą samą referencją — dlatego do usuwania nie używaj funkcji anonimowej. Starego `onclick=\"...\"` w HTML nie używaj.",
      ],
      syntax: [
        {
          title: "Obsługa zdarzeń",
          lang: "js",
          code: `
const btn = document.querySelector("#start");
function handleClick(event) {                       // ❶
  console.log("kliknięto", event.target);
}
btn.addEventListener("click", handleClick);         // ❷
btn.removeEventListener("click", handleClick);      // ❸

const search = document.querySelector("#search");
search.addEventListener("input", (e) => {           // ❹
  console.log("wpisano:", e.target.value);
});

document.addEventListener("keydown", (e) => {       // ❺
  if (e.code === "Space") {
    e.preventDefault();                             // nie przewijaj strony
    console.log("spacja!");
  }
  if (e.key === "Escape") console.log("Esc");
});`,
          legend: [["❶", "funkcja obsługi dostaje obiekt zdarzenia"], ["❷", "rejestracja — przekazujesz funkcję, nie jej wywołanie"], ["❸", "wyrejestrowanie wymaga tej samej funkcji"], ["❹", "input — reakcja na każdy znak"], ["❺", "klawiatura na całym dokumencie (np. sterowanie w grze)"]],
        },
      ],
      mistakes: [
        { lang: "html", bad: "<button onclick=\"start()\">Start</button>", good: "<button id=\"start\">Start</button>\n<script>\n  start.addEventListener(\"click\", start);\n</script>", why: "Atrybuty onclick mieszają HTML z JS i pozwalają podpiąć tylko jedną funkcję. Używaj addEventListener." },
        { lang: "js", bad: "if (e.keyCode === 32) { }", good: "if (e.code === \"Space\") { }", why: "`keyCode` jest przestarzały. Używaj `e.key` (znak) albo `e.code` (fizyczny klawisz)." },
      ],
      try: {
        html: `<input id="name" placeholder="Wpisz imię">
<p id="out">Cześć!</p>`,
        js: `const input = document.querySelector("#name");
const out = document.querySelector("#out");

input.addEventListener("input", (e) => {
  out.textContent = \`Cześć, \${e.target.value}!\`;
});`,
        task: "Dodaj licznik znaków pod polem („5 / 20”) i ustaw `maxlength=\"20\"` w HTML.",
      },
    },
    {
      id: "delegowanie",
      title: "Propagacja, delegowanie i domyślne akcje",
      keywords: ["bubbling", "propagacja", "stopPropagation", "preventDefault", "delegowanie", "closest", "currentTarget"],
      theory: [
        "Zdarzenie po wystąpieniu na elemencie **wędruje w górę** do rodziców (bąbelkowanie, bubbling). Dzięki temu możesz podpiąć **jeden** listener na rodzicu i rozpoznać przez `e.target.closest(...)`, który element kliknięto — to **delegowanie zdarzeń**. Działa także dla elementów dodanych później.",
        "`e.stopPropagation()` zatrzymuje wędrówkę w górę. `e.preventDefault()` blokuje domyślną akcję przeglądarki (przejście po linku, wysłanie formularza, przewinięcie spacją). `e.target` to element kliknięty, `e.currentTarget` — ten, na którym jest listener.",
      ],
      syntax: [
        {
          title: "Delegowanie na liście",
          lang: "js",
          code: `
const list = document.querySelector("#list");     // ❶

list.addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-action]");  // ❷
  if (!btn) return;                                // ❸
  const item = btn.closest("li");
  if (btn.dataset.action === "delete") item.remove();     // ❹
  if (btn.dataset.action === "done") item.classList.toggle("done");
});

document.querySelector("a.no-go").addEventListener("click", (e) => {
  e.preventDefault();                              // ❺
});`,
          legend: [["❶", "listener tylko na rodzicu"], ["❷", "znajdź przycisk, nawet gdy kliknięto ikonę w środku"], ["❸", "kliknięcie poza przyciskiem — ignoruj"], ["❹", "akcja zależna od data-action"], ["❺", "zablokuj domyślne przejście po linku"]],
        },
      ],
      try: {
        html: `<ul id="list">
  <li>Zadanie A <button data-action="done">✔</button> <button data-action="delete">✕</button></li>
  <li>Zadanie B <button data-action="done">✔</button> <button data-action="delete">✕</button></li>
</ul>`,
        css: `.done { text-decoration: line-through; opacity: .6; }`,
        js: `document.querySelector("#list").addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-action]");
  if (!btn) return;
  const li = btn.closest("li");
  if (btn.dataset.action === "delete") li.remove();
  if (btn.dataset.action === "done") li.classList.toggle("done");
});`,
        task: "Dodaj przycisk, który tworzy nowe `<li>` z tymi samymi przyciskami — zobacz, że działają bez dodawania kolejnych listenerów.",
      },
    },
    {
      id: "formularze-js",
      title: "Obsługa formularza w JS",
      keywords: ["submit", "FormData", "value", "checked", "checkValidity", "reportValidity", "preventDefault", "walidacja"],
      theory: [
        "Nasłuchuj zdarzenia `submit` na `<form>` (nie `click` na przycisku — submit działa też po Enterze). `e.preventDefault()` zatrzymuje przeładowanie strony.",
        "Wartości: `input.value` (tekst, zawsze string — liczby zamień przez `Number()`), `checkbox.checked` (true/false), `select.value`. Całość naraz: `Object.fromEntries(new FormData(form))` — klucze z atrybutów `name`.",
        "`form.checkValidity()` sprawdza reguły HTML (required, pattern…), a `reportValidity()` dodatkowo pokazuje komunikaty. Własny komunikat ustawisz przez `input.setCustomValidity(\"tekst\")`.",
      ],
      syntax: [
        {
          title: "Wysłanie formularza",
          lang: "js",
          code: `
const form = document.querySelector("#contact");
const status = document.querySelector("#status");

form.addEventListener("submit", (e) => {
  e.preventDefault();                                // ❶
  if (!form.checkValidity()) {                       // ❷
    form.reportValidity();
    return;
  }
  const data = Object.fromEntries(new FormData(form));  // ❸ { email, topic, message }
  console.log(data);
  status.textContent = \`Dziękujemy, \${data.email}!\`;  // ❹
  form.reset();                                      // ❺
});

const pass = form.querySelector("#pass2");
pass.addEventListener("input", () => {               // ❻
  const same = pass.value === form.querySelector("#pass").value;
  pass.setCustomValidity(same ? "" : "Hasła muszą być takie same");
});`,
          legend: [["❶", "bez przeładowania strony"], ["❷", "reguły z HTML"], ["❸", "wszystkie pola z atrybutem name jako obiekt"], ["❹", "komunikat dla użytkownika"], ["❺", "wyczyść pola"], ["❻", "własna reguła walidacji; pusty tekst = poprawne"]],
        },
      ],
      try: {
        html: `<form id="f">
  <label>E-mail <input name="email" type="email" required></label>
  <label>Wiek <input name="age" type="number" min="16" required></label>
  <label><input name="newsletter" type="checkbox"> Newsletter</label>
  <button>Wyślij</button>
</form>
<p id="status"></p>`,
        css: `form { display: grid; gap: 8px; max-width: 300px; }`,
        js: `const form = document.querySelector("#f");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form));
  console.log(data);
});`,
        task: "Wyświetl w `#status` komunikat z e-mailem. Zwróć uwagę, że niezaznaczony checkbox w ogóle nie trafia do FormData.",
      },
    },
    {
      id: "timery",
      title: "Timery: setTimeout i setInterval",
      keywords: ["setTimeout", "setInterval", "clearInterval", "clearTimeout", "stoper", "zegar", "Date"],
      theory: [
        "`setTimeout(fn, ms)` uruchamia funkcję raz po czasie, `setInterval(fn, ms)` — co określony czas. Obie zwracają identyfikator, którym zatrzymasz timer (`clearTimeout` / `clearInterval`).",
        "Zegar zrobisz przez `new Date()` i `toLocaleTimeString()`. Stoper (Lab 3) to licznik sekund zwiększany co 1000 ms + formatowanie.",
      ],
      syntax: [
        {
          title: "Szkielet stopera",
          lang: "js",
          code: `
let seconds = 0;
let timerId = null;                               // ❶

function start() {
  if (timerId !== null) return;                   // ❷
  timerId = setInterval(() => {
    seconds++;
    render();
  }, 1000);                                       // ❸
}
function stop() {
  clearInterval(timerId);                         // ❹
  timerId = null;
}
function reset() { stop(); seconds = 0; render(); }

function render() { /* wypisz czas w formacie "Xmin Ys" */ }

const clock = () => new Date().toLocaleTimeString("pl-PL");  // ❺
setTimeout(() => console.log("minęły 2 s"), 2000);            // ❻`,
          legend: [["❶", "zapamiętaj identyfikator timera"], ["❷", "nie uruchamiaj drugiego interwału, gdy już działa"], ["❸", "co 1000 ms = co sekundę"], ["❹", "zatrzymanie"], ["❺", "aktualna godzina"], ["❻", "jednorazowo po czasie"]],
          explain: "Formatowanie czasu przećwiczyłeś w M6 → Funkcje (`formatTime`). Lab 3 zrób już samodzielnie.",
        },
      ],
      try: {
        html: `<p id="clock"></p>`,
        js: `const out = document.querySelector("#clock");
function tick() {
  out.textContent = new Date().toLocaleTimeString("pl-PL");
}
tick();
setInterval(tick, 1000);`,
        task: "Dodaj przycisk „Pauza”, który zatrzymuje zegar (`clearInterval`) i „Wznów”.",
      },
    },
    {
      id: "async",
      title: "Asynchroniczność: Promise i async/await",
      keywords: ["promise", "async", "await", "then", "catch", "asynchroniczny", "callback hell", "Promise.all"],
      theory: [
        "Operacje trwające dłużej (sieć, timery) są **asynchroniczne** — JS nie czeka, tylko wykonuje dalszy kod, a wynik przychodzi później. Dawniej używano callbacków, co prowadziło do „callback hell” (zagnieżdżanie).",
        "**Promise** (obietnica) to obiekt reprezentujący przyszły wynik: kończy się powodzeniem (`resolve` → `.then`) albo błędem (`reject` → `.catch`).",
        "`async`/`await` to wygodniejszy zapis tego samego: w funkcji `async` piszesz `await obietnica`, a kod wygląda jak zwykły, synchroniczny. Błędy łapiesz `try/catch`.",
      ],
      syntax: [
        {
          title: "Promise i async/await",
          lang: "js",
          code: `
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));  // ❶

wait(1000)
  .then(() => console.log("po 1 s"))       // ❷
  .catch((err) => console.error(err));

async function run() {                      // ❸
  try {
    console.log("start");
    await wait(500);                        // ❹
    console.log("po 0.5 s");
  } catch (err) {
    console.error(err);                     // ❺
  }
}
run();

const [a, b] = await Promise.all([fetch("/a.json"), fetch("/b.json")]);  // ❻`,
          legend: [["❶", "własna obietnica: resolve po czasie"], ["❷", "then — gdy się uda; catch — gdy błąd"], ["❸", "funkcja async zawsze zwraca Promise"], ["❹", "await czeka na wynik (tylko w async lub w module)"], ["❺", "błąd z await trafia do catch"], ["❻", "kilka zapytań równolegle"]],
        },
      ],
      try: {
        js: `const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function countdown() {
  for (let i = 3; i > 0; i--) {
    console.log(i);
    await wait(1000);
  }
  console.log("Start!");
}
countdown();`,
        task: "Przepisz odliczanie na wersję z `.then()` dla 2 kroków i porównaj czytelność.",
      },
    },
    {
      id: "fetch",
      title: "fetch: pobieranie danych z API",
      keywords: ["fetch", "api", "json", "dummyjson", "res.ok", "status", "POST", "filtrowanie", "sortowanie"],
      theory: [
        "`fetch(url)` wysyła żądanie HTTP i zwraca Promise z obiektem **Response**. Treść odczytujesz przez `await res.json()` (lub `res.text()`). Uwaga: fetch **nie zgłasza błędu przy 404/500** — sprawdź `res.ok`.",
        "Dane z API zwykle zapisujesz w zmiennej, a widok budujesz funkcją `render()`. Filtrowanie i sortowanie robisz na **kopii** oryginalnej tablicy, żeby dało się wrócić do „oryginalnej kolejności” (Lab 3).",
      ],
      syntax: [
        {
          title: "Pobranie i wyświetlenie",
          lang: "js",
          code: `
let allProducts = [];                                     // ❶

async function loadProducts() {
  const status = document.querySelector("#status");
  status.textContent = "Ładowanie…";                      // ❷
  try {
    const res = await fetch("https://dummyjson.com/products");
    if (!res.ok) throw new Error(\`HTTP \${res.status}\`);   // ❸
    const data = await res.json();                        // ❹
    allProducts = data.products.slice(0, 30);             // ❺
    status.textContent = "";
    render(allProducts);
  } catch (err) {
    status.textContent = "Nie udało się pobrać danych: " + err.message;  // ❻
  }
}
loadProducts();`,
          legend: [["❶", "oryginalne dane — nie zmieniamy ich"], ["❷", "stan ładowania"], ["❸", "fetch nie rzuca błędu przy 404 — robimy to sami"], ["❹", "odczyt JSON (też asynchroniczny)"], ["❺", "pierwsze 30 elementów"], ["❻", "stan błędu dla użytkownika"]],
        },
        {
          title: "Wysłanie danych (POST)",
          lang: "js",
          code: `
const res = await fetch("https://dummyjson.com/products/add", {
  method: "POST",                                    // ❶
  headers: { "Content-Type": "application/json" },   // ❷
  body: JSON.stringify({ title: "Nowy produkt" }),   // ❸
});
console.log(res.status, await res.json());`,
          legend: [["❶", "metoda HTTP"], ["❷", "informacja, że wysyłamy JSON"], ["❸", "dane jako tekst JSON"]],
        },
      ],
      mistakes: [
        { lang: "js", bad: "const data = fetch(url).json();", good: "const res = await fetch(url);\nconst data = await res.json();", why: "fetch zwraca Promise — trzeba poczekać na odpowiedź, a potem na odczyt JSON." },
        { lang: "js", bad: "allProducts.sort(...);  // oryginał zmieniony na zawsze", good: "const sorted = [...allProducts].sort(...);", why: "sort zmienia tablicę. Sortuj kopię, żeby zachować oryginalną kolejność." },
      ],
      try: {
        html: `<p id="status"></p>
<ul id="list"></ul>`,
        js: `async function load() {
  const res = await fetch("https://dummyjson.com/products?limit=5");
  const data = await res.json();
  const ul = document.querySelector("#list");
  data.products.forEach((p) => {
    const li = document.createElement("li");
    li.textContent = \`\${p.title} — \${p.price} $\`;
    ul.append(li);
  });
}
load();`,
        task: "Dodaj obsługę błędu (`try/catch` + `res.ok`) i komunikat „Ładowanie…”. Sprawdź błąd, psując adres.",
        hint: "Same ćwiczenia z Lab 3 (tabela, filtr, sortowanie) zrób samodzielnie — wszystkie potrzebne elementy masz w tym module.",
      },
    },
    {
      id: "localstorage",
      title: "localStorage — zapamiętywanie danych",
      keywords: ["localStorage", "sessionStorage", "setItem", "getItem", "removeItem", "JSON", "preferencje", "motyw", "wyniki"],
      theory: [
        "`localStorage` przechowuje dane w przeglądarce na stałe (po zamknięciu karty też). Każda strona (domena) ma osobny magazyn. `sessionStorage` działa tak samo, ale tylko do zamknięcia karty.",
        "Przechowuje **tylko tekst** — obiekty i tablice zapisuj przez `JSON.stringify`, a odczytuj `JSON.parse`. Gdy klucza nie ma, `getItem` zwraca `null`. Zastosowania: motyw, ustawienia, tablica wyników w grze (Lab 3), szkic formularza.",
      ],
      syntax: [
        {
          title: "Zapis ustawień i wyników",
          lang: "js",
          code: `
localStorage.setItem("theme", "dark");                 // ❶
const theme = localStorage.getItem("theme") ?? "light"; // ❷
document.documentElement.dataset.theme = theme;

function saveScore(score) {
  const scores = JSON.parse(localStorage.getItem("scores") ?? "[]");  // ❸
  scores.push(score);
  scores.sort((a, b) => b - a);
  localStorage.setItem("scores", JSON.stringify(scores.slice(0, 5)));  // ❹
}

localStorage.removeItem("theme");                      // ❺`,
          legend: [["❶", "zapis tekstu pod kluczem"], ["❷", "odczyt; null, gdy brak → wartość domyślna"], ["❸", "tablica zapisana jako JSON"], ["❹", "top 5 wyników"], ["❺", "usunięcie klucza"]],
        },
      ],
      try: {
        html: `<button id="theme">Przełącz motyw</button>
<p>Odśwież podgląd (przycisk „Uruchom ponownie”) — motyw zostanie zapamiętany.</p>`,
        css: `body.dark { background: #1d1d1f; color: white; }`,
        js: `const KEY = "demo-theme";
if (localStorage.getItem(KEY) === "dark") document.body.classList.add("dark");

document.querySelector("#theme").addEventListener("click", () => {
  const dark = document.body.classList.toggle("dark");
  localStorage.setItem(KEY, dark ? "dark" : "light");
});`,
        task: "Dodaj licznik odwiedzin: przy każdym uruchomieniu zwiększ liczbę w localStorage i wyświetl „Odwiedziny: N”.",
      },
    },
    {
      id: "canvas",
      title: "Canvas i pętla gry",
      keywords: ["canvas", "getContext", "fillRect", "drawImage", "requestAnimationFrame", "gra", "sprite", "kolizja", "grawitacja"],
      theory: [
        "`<canvas>` to obszar do rysowania pikseli z JS przez kontekst 2D: prostokąty, koła, tekst, obrazy (sprite'y).",
        "Gra działa w **pętli**: co klatkę aktualizujesz stan (pozycje, prędkości, kolizje), czyścisz canvas i rysujesz wszystko od nowa. Pętlę napędza `requestAnimationFrame(loop)` (~60 klatek/s, zatrzymuje się na nieaktywnej karcie).",
        "Fizyka w prostych grach: prędkość rośnie o grawitację co klatkę, pozycja rośnie o prędkość. Kolizja dwóch prostokątów to sprawdzenie, czy zachodzą na siebie w osi X i Y.",
      ],
      syntax: [
        {
          title: "Szkielet pętli gry",
          lang: "js",
          code: `
const canvas = document.querySelector("#game");
const ctx = canvas.getContext("2d");               // ❶
const player = { x: 60, y: 100, w: 30, h: 30, vy: 0 };
const GRAVITY = 0.4;

document.addEventListener("keydown", (e) => {
  if (e.code === "Space") { e.preventDefault(); player.vy = -7; }  // ❷
});

function update() {                                // ❸
  player.vy += GRAVITY;
  player.y += player.vy;
  if (player.y + player.h > canvas.height) player.y = canvas.height - player.h;
}
function draw() {                                  // ❹
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#f4a261";
  ctx.fillRect(player.x, player.y, player.w, player.h);
  ctx.fillStyle = "#000";
  ctx.font = "16px sans-serif";
  ctx.fillText("Wynik: 0", canvas.width - 90, 24);
}
function loop() {
  update();
  draw();
  requestAnimationFrame(loop);                     // ❺
}
requestAnimationFrame(loop);

const hit = (a, b) =>                              // ❻
  a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;`,
          legend: [["❶", "kontekst rysowania 2D"], ["❷", "skok: ujemna prędkość = w górę"], ["❸", "logika: fizyka i kolizje"], ["❹", "rysowanie: najpierw czyść, potem rysuj"], ["❺", "kolejna klatka"], ["❻", "kolizja dwóch prostokątów (AABB)"]],
          explain: "Obraz rysujesz przez `ctx.drawImage(img, x, y, w, h)`. Obrót postaci: `ctx.save(); ctx.translate(x, y); ctx.rotate(kąt); ctx.drawImage(...); ctx.restore();`. Grę z Lab 3 zbuduj sam, na tym szkielecie.",
        },
      ],
      try: {
        html: `<canvas id="game" width="320" height="240"></canvas>
<p>Kliknij podgląd i naciskaj spację.</p>`,
        css: `canvas { background: #8ecae6; display: block; }`,
        js: `const canvas = document.querySelector("#game");
const ctx = canvas.getContext("2d");
const p = { x: 60, y: 60, w: 24, h: 24, vy: 0 };

document.addEventListener("keydown", (e) => {
  if (e.code === "Space") { e.preventDefault(); p.vy = -6; }
});

function loop() {
  p.vy += 0.35;
  p.y += p.vy;
  if (p.y > canvas.height - p.h) { p.y = canvas.height - p.h; p.vy = 0; }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#fb8500";
  ctx.fillRect(p.x, p.y, p.w, p.h);
  requestAnimationFrame(loop);
}
loop();`,
        task: "Dodaj przeszkodę (prostokąt), która przesuwa się od prawej do lewej i wraca na start. Przy kolizji wypisz „Game over” w konsoli.",
      },
    },
  ],
  flashcards: [
    ["Czym jest DOM?", "Drzewo obiektów tworzone przez przeglądarkę z HTML. JS zmienia DOM, a strona się przerysowuje."],
    ["`querySelector` a `querySelectorAll`?", "Pierwszy pasujący element (lub null) vs wszystkie (NodeList)."],
    ["`textContent` a `innerHTML`?", "textContent ustawia sam tekst (bezpieczne), innerHTML wstawia kod HTML (ryzyko XSS przy danych od użytkownika)."],
    ["Co robi `classList.toggle(\"open\")`?", "Dodaje klasę, jeśli jej nie ma, usuwa, jeśli jest; zwraca true/false."],
    ["Jak utworzyć i dodać element?", "`const li = document.createElement(\"li\")`, ustawić treść, potem `rodzic.append(li)`."],
    ["Co trzeba zrobić przed ponownym renderem listy?", "Wyczyścić kontener: `el.replaceChildren()` albo `el.innerHTML = \"\"`."],
    ["Dlaczego `addEventListener(\"click\", f())` jest błędem?", "f() wywołuje funkcję od razu. Trzeba przekazać samą funkcję: `f`."],
    ["Zdarzenie `input` a `change`?", "input — przy każdej zmianie znaku; change — po zatwierdzeniu zmiany (np. wybór w select)."],
    ["`e.key` a `e.code`?", "key — znak (\"a\", \"Enter\"), code — fizyczny klawisz (\"KeyA\", \"Space\")."],
    ["Na czym polega delegowanie zdarzeń?", "Jeden listener na rodzicu; dzięki bąbelkowaniu i `e.target.closest()` obsługuje też dzieci dodane później."],
    ["`preventDefault` a `stopPropagation`?", "preventDefault blokuje domyślną akcję przeglądarki, stopPropagation — przekazanie zdarzenia do rodziców."],
    ["Jak pobrać wszystkie pola formularza jako obiekt?", "`Object.fromEntries(new FormData(form))`."],
    ["Jak zatrzymać `setInterval`?", "`clearInterval(id)` — id zwrócone przez setInterval."],
    ["Co zwraca `fetch()`?", "Promise z obiektem Response; dane: `await res.json()`."],
    ["Czy fetch rzuca błąd przy 404?", "Nie. Trzeba sprawdzić `res.ok` / `res.status`."],
    ["Do czego służy `await`?", "Czeka na wynik Promise wewnątrz funkcji async (lub modułu)."],
    ["Jak zapisać tablicę w localStorage?", "`localStorage.setItem(k, JSON.stringify(arr))`, odczyt: `JSON.parse(localStorage.getItem(k) ?? \"[]\")`."],
    ["Czym napędzasz pętlę gry w canvas?", "`requestAnimationFrame(loop)`."],
    ["Kolejność w każdej klatce gry?", "update (fizyka, kolizje) → clearRect → draw → requestAnimationFrame."],
  ],
  quiz: [
    { q: "Dlaczego ten kod rzuca błąd, gdy skrypt jest w <head> bez defer?", code: "document.querySelector(\"#btn\").addEventListener(\"click\", go);", lang: "js", options: ["Zła nazwa zdarzenia", "Element jeszcze nie istnieje — querySelector zwraca null", "Brak średnika", "addEventListener nie istnieje"], answer: 1 },
    { q: "Która metoda zwróci wszystkie elementy z klasą card?", options: ["getElementById(\"card\")", "querySelector(\".card\")", "querySelectorAll(\".card\")", "getElement(\".card\")"], answer: 2 },
    { q: "Co jest nie tak?", code: "btn.addEventListener(\"click\", start());", lang: "js", options: ["Nic", "start wywoła się od razu, a nie po kliknięciu", "Zła nazwa zdarzenia", "Brak preventDefault"], answer: 1 },
    { q: "Co wypisze konsola po kliknięciu w <span> wewnątrz <button id=\"b\">?", code: "b.addEventListener(\"click\", (e) => {\n  console.log(e.currentTarget.id);\n});", lang: "js", options: ["undefined", "b", "span", "błąd"], answer: 1, explain: "currentTarget to element z listenerem; target to span." },
    { q: "Jak zatrzymać przeładowanie strony przy wysyłaniu formularza?", options: ["return false w HTML", "e.stopPropagation()", "e.preventDefault() w zdarzeniu submit", "form.stop()"], answer: 2 },
    { q: "Co zwraca `fetch(url)`?", options: ["Obiekt JSON", "Tekst odpowiedzi", "Promise", "Tablicę"], answer: 2 },
    { q: "Co wypisze kod?", code: "console.log(\"A\");\nsetTimeout(() => console.log(\"B\"), 0);\nconsole.log(\"C\");", lang: "js", options: ["A B C", "A C B", "B A C", "C B A"], answer: 1, explain: "Callback z setTimeout trafia do kolejki i wykona się po bieżącym kodzie." },
    { q: "Co przechowuje localStorage?", options: ["Dowolne obiekty", "Tylko tekst", "Tylko liczby", "Pliki"], answer: 1 },
    { q: "Co zwróci `localStorage.getItem(\"brak\")`, gdy klucza nie ma?", options: ["undefined", "\"\"", "null", "błąd"], answer: 2 },
    { q: "Którą funkcją zrobisz płynną pętlę animacji?", options: ["while (true)", "setTimeout(loop, 0)", "requestAnimationFrame(loop)", "loop.repeat()"], answer: 2 },
    { q: "Jak bezpiecznie wstawić tekst wpisany przez użytkownika?", options: ["el.innerHTML = text", "el.textContent = text", "document.write(text)", "el.outerHTML = text"], answer: 1 },
    { q: "Po co sortować kopię `[...products].sort()`?", options: ["Szybciej działa", "Żeby zachować oryginalną kolejność", "sort nie działa na oryginale", "Wymaga tego fetch"], answer: 1 },
  ],
});
