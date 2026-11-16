/* M6 — JavaScript: język */
WDAI.modules.push({
  id: "m6",
  code: "M6",
  tech: "js",
  title: "JavaScript — język",
  short: "JS: język",
  lab: "Lab 3",
  syllabus: "W2",
  intro: "Składnia JavaScriptu: zmienne, warunki, pętle, funkcje, tablice, obiekty i klasy. Wszystkie przykłady uruchomisz w piaskownicy — wynik pojawia się w konsoli pod podglądem.",
  topics: [
    {
      id: "zmienne",
      title: "Zmienne i typy danych",
      keywords: ["let", "const", "var", "typeof", "string", "number", "boolean", "null", "undefined", "template literal"],
      theory: [
        "Zmienne tworzysz przez `const` (nie da się przypisać ponownie) albo `let` (wartość się zmienia, np. licznik). Domyślnie używaj `const`. `var` to stary sposób — ma dziwny zasięg (hoisting), nie używaj go.",
        "Typy proste: `string` (tekst), `number` (liczby całkowite i ułamki), `boolean` (`true`/`false`), `undefined` (brak wartości), `null` (celowo pusto), `bigint`, `symbol`. Wszystko inne to **obiekty** (także tablice i funkcje).",
        "Typy proste kopiuje się **przez wartość**, obiekty i tablice **przez referencję** — dwie zmienne mogą wskazywać ten sam obiekt.",
      ],
      syntax: [
        {
          title: "Deklaracje i typy",
          lang: "js",
          code: `
const name = "Ola";            // ❶ string
let age = 20;                  // ❷ number — let, bo się zmieni
age = age + 1;
const isStudent = true;        // boolean
let score;                     // ❸ undefined
const empty = null;            // celowo pusto

console.log(typeof name);      // ❹ "string"
console.log(typeof age);       // "number"

const msg = \`Cześć \${name}, masz \${age} lat\`;  // ❺ template literal
console.log(msg);

const a = { n: 1 };
const b = a;                   // ❻ ta sama referencja
b.n = 2;
console.log(a.n);              // 2`,
          legend: [["❶", "const — stała referencja"], ["❷", "let — gdy wartość się zmienia"], ["❸", "zmienna bez wartości"], ["❹", "typeof sprawdza typ"], ["❺", "odwrotne apostrofy + `${…}` wstawiają wartości do tekstu"], ["❻", "obiekty kopiuje się przez referencję"]],
        },
      ],
      mistakes: [
        { lang: "js", bad: "const count = 0;\ncount++;  // TypeError", good: "let count = 0;\ncount++;", why: "`const` nie pozwala na ponowne przypisanie. Do liczników używaj `let`." },
        { lang: "js", bad: "const text = \"Wynik: \" + a + \" pkt z \" + b;", good: "const text = `Wynik: ${a} pkt z ${b}`;", why: "Template literal jest czytelniejszy niż sklejanie plusami." },
      ],
      try: {
        html: `<p>Wynik zobaczysz w konsoli poniżej.</p>`,
        js: `const name = "Ola";
let points = 7;
console.log(\`\${name} ma \${points} pkt\`);
console.log(typeof points);`,
        task: "Dodaj zmienną `max = 10` i wypisz procent: „Ola ma 70%”. Użyj `Math.round()`.",
        solution: `const name = "Ola";
let points = 7;
const max = 10;
console.log(\`\${name} ma \${Math.round((points / max) * 100)}%\`);`,
      },
    },
    {
      id: "operatory",
      title: "Operatory i porównania",
      keywords: ["===", "==", "truthy", "falsy", "&&", "||", "??", "?.", "ternary", "operator"],
      theory: [
        "Zawsze porównuj przez `===` i `!==` (sprawdzają też typ). `==` próbuje zamieniać typy i daje zaskoczenia (`0 == \"\"` jest `true`).",
        "**Falsy** (traktowane jak false): `false`, `0`, `\"\"`, `null`, `undefined`, `NaN`. Wszystko inne jest **truthy** — także `\"0\"`, `[]` i `{}`.",
        ["`a && b` — jeśli a jest truthy, zwraca b (np. „zrób, jeśli”).", "`a || b` — pierwsza truthy wartość (wartość domyślna).", "`a ?? b` — b tylko gdy a jest `null`/`undefined` (bezpieczniejsze niż `||` dla 0 i \"\").", "`obj?.prop` — nie wyrzuci błędu, gdy obj jest null.", "`warunek ? a : b` — krótki if (operator trójargumentowy)."],
      ],
      syntax: [
        {
          title: "Porównania i operatory logiczne",
          lang: "js",
          code: `
console.log(5 === "5");     // ❶ false (różne typy)
console.log(5 == "5");      // true — unikaj ==

const qty = 0;
console.log(qty || 10);     // ❷ 10 — bo 0 jest falsy
console.log(qty ?? 10);     // ❸ 0 — bo 0 to nie null/undefined

const user = null;
console.log(user?.name);    // ❹ undefined zamiast błędu

const age = 19;
const label = age >= 18 ? "dorosły" : "niepełnoletni";  // ❺
console.log(label);

console.log(10 % 3);        // ❻ 1 — reszta z dzielenia`,
          legend: [["❶", "=== sprawdza typ i wartość"], ["❷", "|| bierze pierwszą truthy"], ["❸", "?? reaguje tylko na null/undefined"], ["❹", "optional chaining"], ["❺", "warunek ? jeśli prawda : jeśli fałsz"], ["❻", "modulo — np. parzystość: n % 2 === 0"]],
        },
      ],
      try: {
        js: `console.log(0 == "");
console.log(0 === "");
console.log("" || "domyślny");
console.log("" ?? "domyślny");`,
        task: "Przewidź wyniki przed uruchomieniem. Następnie napisz wyrażenie, które dla liczby `n` wypisze „parzysta” lub „nieparzysta”.",
        solution: `const n = 7;
console.log(n % 2 === 0 ? "parzysta" : "nieparzysta");`,
      },
    },
    {
      id: "warunki-petle",
      title: "Warunki i pętle",
      keywords: ["if", "else", "switch", "for", "while", "for of", "for in", "break", "continue", "pętla"],
      theory: [
        "`if / else if / else` wybiera ścieżkę, `switch` porównuje jedną wartość z wieloma przypadkami (nie zapomnij `break`).",
        ["`for (let i = 0; i < n; i++)` — klasyczna pętla z licznikiem.", "`for (const x of tablica)` — po **wartościach** tablicy (najczytelniejsza).", "`for (const key in obiekt)` — po **kluczach** obiektu.", "`while (warunek)` — dopóki warunek jest prawdziwy.", "`break` przerywa pętlę, `continue` przechodzi do następnego obrotu."],
      ],
      syntax: [
        {
          title: "Warunki",
          lang: "js",
          code: `
const points = 42;
if (points >= 45) {                // ❶
  console.log("5.0");
} else if (points >= 40) {
  console.log("4.5");
} else {
  console.log("poniżej 4.5");
}

const day = "sob";
switch (day) {                     // ❷
  case "sob":
  case "nd":
    console.log("weekend");
    break;                         // ❸
  default:
    console.log("dzień roboczy");
}`,
          legend: [["❶", "sprawdzane od góry, wykona się pierwszy pasujący blok"], ["❷", "porównanie jednej wartości (przez ===)"], ["❸", "bez break wykonają się kolejne przypadki"]],
        },
        {
          title: "Pętle",
          lang: "js",
          code: `
for (let i = 1; i <= 3; i++) {          // ❶
  console.log("Ćwiczenie " + i);
}

const fruits = ["jabłko", "gruszka"];
for (const fruit of fruits) {           // ❷
  console.log(fruit);
}

const car = { brand: "Fiat", price: 27000 };
for (const key in car) {                // ❸
  console.log(key, car[key]);
}

let n = 0;
while (n < 3) { n++; }                  // ❹`,
          legend: [["❶", "start; warunek; krok"], ["❷", "for…of — wartości tablicy"], ["❸", "for…in — klucze obiektu"], ["❹", "while — gdy nie znasz liczby powtórzeń"]],
        },
      ],
      mistakes: [
        { lang: "js", bad: "for (const i in [10, 20]) console.log(i);  // \"0\", \"1\"", good: "for (const x of [10, 20]) console.log(x);  // 10, 20", why: "`for…in` daje klucze (indeksy jako tekst), a do wartości tablicy służy `for…of`." },
      ],
      try: {
        js: `for (let i = 1; i <= 15; i++) {
  console.log(i);
}`,
        task: "FizzBuzz: dla liczb podzielnych przez 3 wypisz „Fizz”, przez 5 „Buzz”, przez 3 i 5 „FizzBuzz”, w pozostałych przypadkach liczbę.",
        hint: "Najpierw sprawdź podzielność przez 15 (czyli przez 3 i 5), dopiero potem przez 3 i 5 osobno.",
        solution: `for (let i = 1; i <= 15; i++) {
  if (i % 15 === 0) console.log("FizzBuzz");
  else if (i % 3 === 0) console.log("Fizz");
  else if (i % 5 === 0) console.log("Buzz");
  else console.log(i);
}`,
      },
    },
    {
      id: "funkcje",
      title: "Funkcje",
      keywords: ["function", "arrow", "strzałkowa", "return", "parametr", "domyślny", "rest", "zasięg", "scope", "domknięcie", "closure", "callback"],
      theory: [
        "Funkcja to nazwany fragment kodu, który można wywołać wiele razy. Przyjmuje **parametry** i może **zwrócić** wynik przez `return` (bez return zwraca `undefined`).",
        "Trzy zapisy: **deklaracja** `function nazwa() {}`, **wyrażenie** `const nazwa = function () {}` i **funkcja strzałkowa** `const nazwa = () => {}`. Strzałkowa z jednym wyrażeniem zwraca je bez `return`.",
        "Funkcję można przekazać jako argument innej funkcji (**callback**) — tak działają `addEventListener`, `setTimeout`, `map`. Zmienne `let`/`const` widać tylko w bloku `{}`, w którym je zadeklarowano (**zasięg blokowy**).",
      ],
      syntax: [
        {
          title: "Sposoby zapisu",
          lang: "js",
          code: `
function add(a, b) {                     // ❶ deklaracja
  return a + b;
}
const multiply = function (a, b) {       // ❷ wyrażenie funkcyjne
  return a * b;
};
const square = (x) => x * x;             // ❸ strzałkowa, zwraca x*x
const greet = (name = "Gość") => {       // ❹ parametr domyślny
  return \`Cześć, \${name}!\`;
};
const sum = (...nums) => nums.reduce((s, n) => s + n, 0);  // ❺ rest

console.log(add(2, 3), square(4), greet(), sum(1, 2, 3));

setTimeout(() => console.log("po 1 s"), 1000);   // ❻ callback`,
          legend: [["❶", "deklaracja — można wywołać przed jej definicją"], ["❷", "funkcja przypisana do zmiennej"], ["❸", "krótki zapis: jedno wyrażenie = automatyczny return"], ["❹", "wartość domyślna, gdy argumentu brak"], ["❺", "...nums zbiera wszystkie argumenty w tablicę"], ["❻", "przekazujemy funkcję, która wykona się później"]],
        },
        {
          title: "Domknięcie (closure)",
          lang: "js",
          code: `
function createCounter() {
  let count = 0;                 // ❶
  return () => {
    count++;                     // ❷
    return count;
  };
}
const next = createCounter();
console.log(next(), next(), next());  // 1 2 3`,
          legend: [["❶", "zmienna lokalna funkcji zewnętrznej"], ["❷", "funkcja wewnętrzna „pamięta” count nawet po zakończeniu createCounter"]],
        },
      ],
      mistakes: [
        { lang: "js", bad: "const double = (x) => { x * 2 };\ndouble(3); // undefined", good: "const double = (x) => x * 2;\n// albo: (x) => { return x * 2; }", why: "Z nawiasami klamrowymi funkcja strzałkowa potrzebuje `return`." },
        { lang: "js", bad: "btn.addEventListener(\"click\", handle());", good: "btn.addEventListener(\"click\", handle);", why: "`handle()` wywołuje funkcję od razu i przekazuje jej wynik. Przekaż samą funkcję." },
      ],
      try: {
        js: `const formatTime = (seconds) => {
  // zwróć np. "3min 48s" albo "51s"
};

console.log(formatTime(51));
console.log(formatTime(228));`,
        task: "Uzupełnij `formatTime` (przyda się w Lab 3 — stoper): dla czasu poniżej minuty zwróć „51s”, w przeciwnym razie „3min 48s”.",
        hint: "Minuty: `Math.floor(seconds / 60)`, sekundy: `seconds % 60`.",
        solution: `const formatTime = (seconds) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return m > 0 ? \`\${m}min \${s}s\` : \`\${s}s\`;
};`,
      },
    },
    {
      id: "tablice",
      title: "Tablice i ich metody",
      keywords: ["array", "tablica", "push", "pop", "map", "filter", "find", "reduce", "sort", "some", "every", "includes", "slice", "splice", "forEach", "spread"],
      theory: [
        "Tablica to uporządkowana lista: `[1, 2, 3]`. Indeksy liczymy od 0, długość to `.length`.",
        ["Zmieniają tablicę: `push` (dodaj na koniec), `pop` (usuń z końca), `unshift`/`shift` (początek), `splice` (wytnij/wstaw), `sort`, `reverse`.", "Tworzą nową tablicę: `map` (przekształć każdy), `filter` (zostaw pasujące), `slice` (wycinek), `concat`, spread `[...a, ...b]`.", "Zwracają wartość: `find` (pierwszy pasujący element lub undefined), `findIndex`, `indexOf`, `includes` (true/false), `some` / `every` (czy któryś / czy wszystkie), `reduce` (zsumuj do jednej wartości)."],
        "Metody `map`, `filter`, `find`, `reduce` przyjmują funkcję (callback), która dostaje element, a dalej opcjonalnie indeks i całą tablicę.",
      ],
      syntax: [
        {
          title: "Najważniejsze metody",
          lang: "js",
          code: `
const products = [
  { title: "Mysz", price: 59, qty: 10 },
  { title: "Klawiatura", price: 149, qty: 0 },
  { title: "Monitor", price: 899, qty: 3 },
];

const titles = products.map((p) => p.title);              // ❶
const available = products.filter((p) => p.qty > 0);       // ❷
const monitor = products.find((p) => p.title === "Monitor"); // ❸
const total = products.reduce((sum, p) => sum + p.price * p.qty, 0);  // ❹
const anyEmpty = products.some((p) => p.qty === 0);        // ❺
const byPrice = [...products].sort((a, b) => a.price - b.price);  // ❻
const byName = [...products].sort((a, b) => a.title.localeCompare(b.title));  // ❼

console.log(titles, available.length, monitor.price, total, anyEmpty);
console.log(byPrice.map((p) => p.title), byName.map((p) => p.title));`,
          legend: [["❶", "map — nowa tablica wyników (tu: same tytuły)"], ["❷", "filter — tylko elementy spełniające warunek"], ["❸", "find — pierwszy pasujący (lub undefined)"], ["❹", "reduce — akumulator + element, wartość startowa 0"], ["❺", "some — czy przynajmniej jeden spełnia warunek"], ["❻", "sort liczb: (a, b) => a - b; [...] = kopia, bo sort zmienia oryginał"], ["❼", "sort tekstów z polskimi znakami: localeCompare"]],
        },
        {
          title: "Dodawanie, usuwanie, wycinanie",
          lang: "js",
          code: `
const arr = ["a", "b", "c", "d"];
arr.push("e");                 // ❶ ["a","b","c","d","e"]
arr.pop();                     // usuwa "e"
console.log(arr.slice(1, 3));  // ❷ ["b","c"] — oryginał bez zmian
arr.splice(1, 2, "X");         // ❸ arr = ["a","X","d"]
console.log(arr.includes("X"), arr.indexOf("d"));  // true 2
const merged = [...arr, ...["y", "z"]];            // ❹`,
          legend: [["❶", "push/pop — koniec tablicy"], ["❷", "slice(start, koniec bez) — kopia fragmentu"], ["❸", "splice(od, ile usunąć, co wstawić) — zmienia tablicę"], ["❹", "spread łączy tablice"]],
        },
      ],
      mistakes: [
        { lang: "js", bad: "[10, 9, 1].sort();  // [1, 10, 9]", good: "[10, 9, 1].sort((a, b) => a - b);  // [1, 9, 10]", why: "Bez funkcji porównującej `sort` porównuje elementy jako tekst." },
        { lang: "js", bad: "const doubled = nums.forEach((n) => n * 2);  // undefined", good: "const doubled = nums.map((n) => n * 2);", why: "`forEach` nic nie zwraca. Do tworzenia nowej tablicy służy `map`." },
      ],
      try: {
        js: `const students = [
  { name: "Ola", grade: 5 },
  { name: "Adam", grade: 3 },
  { name: "Ewa", grade: 4.5 },
  { name: "Jan", grade: 2 },
];

// 1. imiona osób, które zdały (ocena >= 3)
// 2. średnia ocen
// 3. lista posortowana malejąco po ocenie`,
        task: "Rozwiąż 3 zadania z komentarzy przy pomocy `filter` + `map`, `reduce` i `sort`.",
        solution: `const passed = students.filter((s) => s.grade >= 3).map((s) => s.name);
const avg = students.reduce((sum, s) => sum + s.grade, 0) / students.length;
const sorted = [...students].sort((a, b) => b.grade - a.grade);
console.log(passed, avg.toFixed(2), sorted);`,
      },
    },
    {
      id: "obiekty",
      title: "Obiekty i destrukturyzacja",
      keywords: ["obiekt", "object", "klucz", "destrukturyzacja", "spread", "Object.keys", "Object.entries", "metoda", "this"],
      theory: [
        "Obiekt przechowuje dane jako pary **klucz: wartość**. Dostęp: `obj.klucz` albo `obj[\"klucz\"]` (gdy klucz jest w zmiennej). Wartością może być funkcja — wtedy to **metoda**, a `this` wskazuje obiekt.",
        "**Destrukturyzacja** wyciąga wartości do zmiennych w jednej linii. **Spread** `{ ...obj }` kopiuje obiekt (płytko) — tak tworzy się zmodyfikowaną kopię bez zmieniania oryginału.",
      ],
      syntax: [
        {
          title: "Praca z obiektami",
          lang: "js",
          code: `
const user = {
  name: "Ola",
  age: 21,
  skills: ["HTML", "CSS"],
  hello() { return \`Cześć, jestem \${this.name}\`; },  // ❶
};

console.log(user.name, user["age"]);           // ❷
const key = "skills";
console.log(user[key]);

user.city = "Kraków";                          // ❸
delete user.age;

const { name, city = "brak" } = user;          // ❹
const [first] = user.skills;                   // ❺
const updated = { ...user, name: "Ala" };      // ❻

console.log(Object.keys(user));                // ❼
for (const [k, v] of Object.entries(user)) console.log(k, v);
console.log(user.hello(), name, first, updated.name);`,
          legend: [["❶", "metoda; this = ten obiekt"], ["❷", "dostęp kropką lub nawiasami"], ["❸", "dodanie i usunięcie właściwości"], ["❹", "destrukturyzacja obiektu z wartością domyślną"], ["❺", "destrukturyzacja tablicy"], ["❻", "kopia z jedną zmienioną wartością"], ["❼", "tablica kluczy; entries = pary [klucz, wartość]"]],
        },
      ],
      try: {
        js: `const product = { id: 1, title: "Laptop", price: 3999, tags: ["it", "promo"] };

// wyciągnij title i price destrukturyzacją
// utwórz kopię z ceną obniżoną o 10%
// wypisz wszystkie klucze`,
        task: "Wykonaj 3 polecenia z komentarzy.",
        solution: `const { title, price } = product;
const sale = { ...product, price: price * 0.9 };
console.log(title, price, sale.price, Object.keys(product));`,
      },
    },
    {
      id: "klasy",
      title: "Klasy (programowanie obiektowe)",
      keywords: ["class", "constructor", "extends", "super", "getter", "private", "new", "obiektowy"],
      theory: [
        "Klasa to szablon do tworzenia obiektów o tych samych polach i metodach. `constructor` wykonuje się przy `new`. `extends` tworzy klasę pochodną (dziedziczenie), a `super()` wywołuje konstruktor rodzica.",
        "Pola z `#` są **prywatne** — niedostępne spoza klasy. `get` tworzy właściwość liczoną (getter).",
      ],
      syntax: [
        {
          title: "Klasa i dziedziczenie",
          lang: "js",
          code: `
class Stopwatch {
  #seconds = 0;                       // ❶
  #timer = null;

  constructor(label) {                // ❷
    this.label = label;
  }
  start() {
    if (this.#timer) return;
    this.#timer = setInterval(() => this.#seconds++, 1000);
  }
  stop() { clearInterval(this.#timer); this.#timer = null; }
  get time() { return this.#seconds; } // ❸
}

class LapStopwatch extends Stopwatch { // ❹
  laps = [];
  lap() { this.laps.push(this.time); }
}

const sw = new LapStopwatch("Bieg");   // ❺
sw.start();
setTimeout(() => { sw.lap(); sw.stop(); console.log(sw.label, sw.laps); }, 2100);`,
          legend: [["❶", "pola prywatne"], ["❷", "konstruktor — ustawia stan początkowy"], ["❸", "getter: sw.time bez nawiasów"], ["❹", "dziedziczy wszystko po Stopwatch"], ["❺", "new tworzy obiekt (instancję)"]],
        },
      ],
      try: {
        js: `class BankAccount {
  #balance = 0;
  deposit(amount) { /* ... */ }
  withdraw(amount) { /* ... */ }
  get balance() { return this.#balance; }
}

const acc = new BankAccount();
acc.deposit(100);
acc.withdraw(30);
console.log(acc.balance); // 70`,
        task: "Uzupełnij metody. `withdraw` ma rzucić błąd (`throw new Error(\"Brak środków\")`), gdy kwota przekracza saldo.",
        solution: `class BankAccount {
  #balance = 0;
  deposit(amount) { this.#balance += amount; }
  withdraw(amount) {
    if (amount > this.#balance) throw new Error("Brak środków");
    this.#balance -= amount;
  }
  get balance() { return this.#balance; }
}`,
      },
    },
    {
      id: "json-moduly",
      title: "JSON i moduły ES",
      keywords: ["JSON", "stringify", "parse", "import", "export", "module", "moduł"],
      theory: [
        "`JSON.stringify(obiekt)` zamienia obiekt na tekst JSON (np. do zapisu w localStorage lub wysłania na serwer), a `JSON.parse(tekst)` zamienia tekst z powrotem na obiekt.",
        "**Moduły ES** dzielą kod na pliki: `export` udostępnia funkcję/zmienną, `import` ją pobiera. W HTML: `<script type=\"module\" src=\"app.js\">` (moduły są automatycznie odroczone jak `defer`). Uwaga: moduły nie działają po otwarciu pliku z dysku (`file://`) — potrzebny serwer, np. Live Server.",
      ],
      syntax: [
        {
          title: "JSON",
          lang: "js",
          code: `
const settings = { theme: "dark", fontSize: 18 };
const text = JSON.stringify(settings);     // ❶ '{"theme":"dark","fontSize":18}'
const back = JSON.parse(text);             // ❷ znów obiekt
console.log(text, back.theme);
console.log(JSON.stringify(settings, null, 2));  // ❸ ładnie sformatowany`,
          legend: [["❶", "obiekt → tekst"], ["❷", "tekst → obiekt"], ["❸", "wcięcie 2 spacje (do podglądu)"]],
        },
        {
          title: "Moduły",
          lang: "js",
          code: `
// utils.js
export const formatPrice = (n) => \`\${n.toFixed(2)} zł\`;   // ❶
export default function sum(a, b) { return a + b; }       // ❷

// app.js
import sum, { formatPrice } from "./utils.js";           // ❸
console.log(formatPrice(sum(10, 5.5)));

// index.html:  <script type="module" src="app.js"></script>   ❹`,
          legend: [["❶", "eksport nazwany"], ["❷", "eksport domyślny (jeden na plik)"], ["❸", "import domyślnego bez klamer, nazwanych w klamrach; ścieżka z ./ i .js"], ["❹", "type=\"module\" w HTML"]],
        },
      ],
    },
    {
      id: "bledy",
      title: "Obsługa błędów",
      keywords: ["try", "catch", "finally", "throw", "Error", "błąd", "wyjątek", "debug", "console"],
      theory: [
        "`try { } catch (err) { }` łapie błąd, żeby strona się nie „wysypała”. `finally` wykonuje się zawsze. `throw new Error(\"opis\")` zgłasza własny błąd.",
        "Debugowanie: `console.log()` (wartości), `console.table()` (tablice obiektów), `console.error()`, a w DevTools → Sources możesz postawić breakpoint lub wpisać w kodzie `debugger;`.",
      ],
      syntax: [
        {
          title: "try / catch",
          lang: "js",
          code: `
function parseAge(text) {
  const age = Number(text);
  if (Number.isNaN(age)) throw new Error("To nie jest liczba");  // ❶
  return age;
}

try {                                    // ❷
  console.log(parseAge("20"));
  console.log(parseAge("abc"));
} catch (err) {                          // ❸
  console.error("Błąd:", err.message);
} finally {
  console.log("koniec");                 // ❹
}
console.table([{ a: 1, b: 2 }, { a: 3, b: 4 }]);  // ❺`,
          legend: [["❶", "zgłoszenie błędu"], ["❷", "kod, który może się nie udać"], ["❸", "obsługa: err.message = opis"], ["❹", "zawsze na końcu"], ["❺", "tabelka w konsoli"]],
        },
      ],
    },
    {
      id: "paradygmaty",
      title: "JS jako język wieloparadygmatowy",
      keywords: ["paradygmat", "imperatywny", "funkcyjny", "obiektowy", "zdarzeniowy", "deklaratywny"],
      theory: [
        "Sylabus (efekt W2) wymaga rozumienia, że JavaScript łączy kilka **paradygmatów**, czyli stylów programowania:",
        ["**Imperatywny** — krok po kroku mówisz, JAK coś zrobić (pętla for, zmienne).", "**Funkcyjny** — budujesz wynik z czystych funkcji bez modyfikowania danych (`map`, `filter`, `reduce`, funkcje jako argumenty).", "**Obiektowy** — dane i operacje w obiektach i klasach (`class`, `this`, dziedziczenie przez prototypy).", "**Zdarzeniowy (event-driven)** — kod uruchamia się w reakcji na zdarzenia (kliknięcie, odpowiedź serwera)."],
        "JS jest też **asynchroniczny**: długie operacje (sieć, timery) nie blokują strony, a wynik przychodzi później (callback, Promise, async/await — moduł M7).",
      ],
      syntax: [
        {
          title: "To samo zadanie w trzech stylach",
          lang: "js",
          code: `
const prices = [10, 25, 40];

// ❶ imperatywnie
let total1 = 0;
for (let i = 0; i < prices.length; i++) total1 += prices[i] * 1.23;

// ❷ funkcyjnie
const total2 = prices.map((p) => p * 1.23).reduce((s, p) => s + p, 0);

// ❸ obiektowo
class Cart {
  constructor(items) { this.items = items; }
  totalGross() { return this.items.reduce((s, p) => s + p * 1.23, 0); }
}
const total3 = new Cart(prices).totalGross();

// ❹ zdarzeniowo
document.addEventListener("click", () => console.log("klik!"));

console.log(total1.toFixed(2), total2.toFixed(2), total3.toFixed(2));`,
          legend: [["❶", "jak liczyć: pętla i zmienna"], ["❷", "co policzyć: przekształcenia danych"], ["❸", "dane + zachowanie w obiekcie"], ["❹", "reakcja na zdarzenie (kliknij podgląd)"]],
        },
      ],
      try: {
        js: `const prices = [10, 25, 40];
let total = 0;
for (let i = 0; i < prices.length; i++) total += prices[i] * 1.23;
console.log(total.toFixed(2));
document.addEventListener("click", () => console.log("klik!"));`,
        task: "Kliknij w podgląd i zobacz zdarzenie w konsoli. Przepisz liczenie na wersję funkcyjną.",
      },
    },
  ],
  flashcards: [
    ["`let` a `const`?", "`const` — nie można przypisać ponownie (domyślny wybór). `let` — wartość się zmienia (np. licznik)."],
    ["Czy `const arr = []` można modyfikować przez `push`?", "Tak. `const` blokuje ponowne przypisanie, a nie zawartość tablicy lub obiektu."],
    ["Wymień wartości falsy", "`false`, `0`, `\"\"`, `null`, `undefined`, `NaN`."],
    ["`===` a `==`?", "`===` porównuje typ i wartość; `==` zamienia typy. Używaj `===`."],
    ["`||` a `??`?", "`||` zastępuje każdą falsy (też 0 i \"\"), `??` tylko null/undefined."],
    ["`for…of` a `for…in`?", "`for…of` — wartości (tablice), `for…in` — klucze (obiekty)."],
    ["Kiedy funkcja strzałkowa zwraca wynik bez `return`?", "Gdy ciało to jedno wyrażenie bez nawiasów klamrowych: `x => x * 2`."],
    ["Czym jest callback?", "Funkcją przekazaną jako argument, wywoływaną później (np. w `addEventListener`, `map`, `setTimeout`)."],
    ["`map` a `forEach`?", "`map` zwraca nową tablicę wyników, `forEach` tylko wykonuje funkcję (zwraca undefined)."],
    ["Jak posortować liczby rosnąco?", "`arr.sort((a, b) => a - b)` — bez funkcji sortuje jak tekst."],
    ["Co zwraca `find`, gdy nic nie pasuje?", "`undefined`."],
    ["Jak policzyć sumę cen w tablicy obiektów?", "`items.reduce((sum, it) => sum + it.price, 0)`."],
    ["`slice` a `splice`?", "`slice` zwraca kopię fragmentu (nie zmienia tablicy). `splice` wycina/wstawia i zmienia oryginał."],
    ["Jak skopiować obiekt ze zmianą jednego pola?", "`const copy = { ...obj, name: \"Nowa\" }`."],
    ["Co robi `JSON.stringify` i `JSON.parse`?", "stringify: obiekt → tekst JSON; parse: tekst → obiekt."],
    ["Do czego służy `#` przed polem klasy?", "Pole prywatne — dostępne tylko wewnątrz klasy."],
    ["Wymień 4 paradygmaty obecne w JS", "Imperatywny, funkcyjny, obiektowy, zdarzeniowy."],
    ["Co robi template literal?", "Tekst w odwrotnych apostrofach z wstawkami `${wyrażenie}` i wieloma liniami."],
  ],
  quiz: [
    { q: "Co wypisze kod?", code: "console.log(typeof [1, 2, 3]);", lang: "js", options: ["array", "object", "list", "undefined"], answer: 1, explain: "Tablice to obiekty. Do sprawdzenia tablicy służy `Array.isArray()`." },
    { q: "Co wypisze kod?", code: "const a = [1, 2];\nconst b = a;\nb.push(3);\nconsole.log(a.length);", lang: "js", options: ["2", "3", "błąd", "undefined"], answer: 1, explain: "a i b wskazują tę samą tablicę." },
    { q: "Wynik `[10, 9, 1].sort()`?", options: ["[1, 9, 10]", "[10, 9, 1]", "[1, 10, 9]", "[9, 10, 1]"], answer: 2, explain: "Bez funkcji porównującej elementy są sortowane jak teksty." },
    { q: "Co wypisze kod?", code: "console.log(0 || \"brak\", 0 ?? \"brak\");", lang: "js", options: ["brak brak", "0 0", "brak 0", "0 brak"], answer: 2 },
    { q: "Która metoda zwraca PIERWSZY element spełniający warunek?", options: ["filter", "find", "map", "some"], answer: 1 },
    { q: "Co jest nie tak?", code: "const double = (x) => { x * 2 };\nconsole.log(double(4));", lang: "js", options: ["Nic, wypisze 8", "Wypisze undefined — brak return", "Błąd składni", "Wypisze NaN"], answer: 1 },
    { q: "Co wypisze kod?", code: "const total = [5, 10, 15].reduce((s, n) => s + n, 0);\nconsole.log(total);", lang: "js", options: ["30", "[5,10,15]", "0", "15"], answer: 0 },
    { q: "Co wypisze pętla?", code: "for (const x in [\"a\", \"b\"]) console.log(x);", lang: "js", options: ["a, b", "0, 1", "błąd", "undefined"], answer: 1, explain: "for…in zwraca klucze (indeksy)." },
    { q: "Które zdanie o `const` jest prawdziwe?", options: ["Obiektu z const nie można zmieniać", "Nie można przypisać nowej wartości do zmiennej", "const działa jak var", "const można zadeklarować bez wartości"], answer: 1 },
    { q: "Co wypisze kod?", code: "const { a, c = 5 } = { a: 1, b: 2 };\nconsole.log(a, c);", lang: "js", options: ["1 2", "1 5", "1 undefined", "błąd"], answer: 1 },
    { q: "Co zwróci `[1, 2, 3].map((n) => n * 2)`?", options: ["undefined", "[2, 4, 6]", "6", "[1, 2, 3]"], answer: 1 },
    { q: "Który paradygmat reprezentuje `addEventListener`?", options: ["imperatywny", "funkcyjny", "zdarzeniowy", "logiczny"], answer: 2 },
  ],
});
