/* Ściąga JS — składnia i najważniejsze metody w jednym miejscu.
   kind: "skladnia", "metoda", "wlasciwosc", "globalne"
   example = kod JS (uruchamiany w podglądzie; console.log pokazuje się pod spodem)
   html = opcjonalny HTML potrzebny do przykładu; preview: false = bez podglądu */
WDAI.refJs = [
  {
    id: "zmienne",
    title: "Zmienne i typy",
    intro: "Przechowywanie wartości. Domyślnie const, let gdy wartość się zmienia.",
    items: [
      { tag: "const", kind: "skladnia", desc: "Stała referencja — nie można przypisać nowej wartości. Domyślny wybór. Obiekt/tablicę z const nadal można modyfikować.", example: `const name = "Ola";
const list = [];
list.push("HTML");      // OK — zmieniamy zawartość
console.log(name, list);` },
      { tag: "let", kind: "skladnia", desc: "Zmienna, którą można przypisać ponownie (liczniki, stan). Widoczna tylko w bloku `{}`.", example: `let count = 0;
count = count + 1;
count++;
console.log(count); // 2` },
      { tag: "typy danych", kind: "skladnia", desc: "Proste: string, number, boolean, undefined, null. Wszystko inne to obiekty (także tablice i funkcje). `typeof` sprawdza typ.", example: `console.log(typeof "tekst", typeof 42, typeof true);
console.log(typeof undefined, typeof null, typeof [1, 2]);  // null i tablica → "object"
console.log(Array.isArray([1, 2]));` },
      { tag: "`tekst ${x}`", kind: "skladnia", desc: "Template literal — tekst w odwrotnych apostrofach, wstawki `${wyrażenie}`, wiele linii.", example: "const name = \"Ola\";\nconst points = 7;\nconsole.log(`${name} ma ${points} pkt (${points * 10}%)`);" },
      { tag: "null / undefined", kind: "skladnia", desc: "`undefined` — brak wartości (zmienna bez przypisania, brak właściwości). `null` — celowo „pusto”.", example: `let x;
const user = { name: "Ola" };
console.log(x, user.age, null);` },
    ],
  },
  {
    id: "operatory",
    title: "Operatory",
    intro: "Porównania, logika i skróty.",
    items: [
      { tag: "=== / !==", kind: "skladnia", desc: "Porównanie wartości i typu. Zawsze używaj === zamiast == (które zamienia typy).", example: `console.log(5 === 5, 5 === "5", 5 == "5");
console.log("a" !== "b");` },
      { tag: "&& || !", kind: "skladnia", desc: "I, LUB, NIE. `a || b` zwraca pierwszą prawdziwą wartość (wartość domyślna), `a && b` — b, jeśli a jest prawdziwe.", example: `const age = 20, hasTicket = true;
console.log(age >= 18 && hasTicket);
const name = "" || "Gość";
console.log(name, !true);` },
      { tag: "?? i ?.", kind: "skladnia", desc: "`a ?? b` — b tylko gdy a jest null/undefined (bezpieczne dla 0 i \"\"). `obj?.prop` — nie rzuca błędu, gdy obj jest null.", example: `const qty = 0;
console.log(qty || 10, qty ?? 10);
const user = null;
console.log(user?.name, user?.address?.city);` },
      { tag: "warunek ? a : b", kind: "skladnia", desc: "Operator trójargumentowy — krótki if zwracający wartość.", example: `const points = 42;
const result = points >= 40 ? "zdane" : "niezdane";
console.log(result);` },
      { tag: "% ++ += ...", kind: "skladnia", desc: "`%` reszta z dzielenia (parzystość), `++` / `--` zwiększ/zmniejsz o 1, `+=` dodaj do zmiennej, `...` spread (rozłożenie tablicy/obiektu).", example: `console.log(10 % 3, 8 % 2 === 0);
let s = 5; s += 10; s++;
console.log(s, [...[1, 2], 3]);` },
    ],
  },
  {
    id: "sterowanie",
    title: "Warunki i pętle",
    intro: "Wybór ścieżki i powtarzanie.",
    items: [
      { tag: "if / else if / else", kind: "skladnia", desc: "Wykonuje pierwszy blok, którego warunek jest prawdziwy.", example: `const grade = 4.5;
if (grade >= 5) console.log("bardzo dobry");
else if (grade >= 4) console.log("dobry");
else console.log("słabiej");` },
      { tag: "switch", kind: "skladnia", desc: "Porównuje jedną wartość z wieloma przypadkami (===). Nie zapomnij `break`.", example: `const mode = "desc";
switch (mode) {
  case "asc": console.log("rosnąco"); break;
  case "desc": console.log("malejąco"); break;
  default: console.log("oryginalnie");
}` },
      { tag: "for", kind: "skladnia", desc: "Pętla z licznikiem: start; warunek; krok.", example: `for (let i = 1; i <= 3; i++) {
  console.log("Ćwiczenie " + i);
}` },
      { tag: "for…of", kind: "skladnia", desc: "Po WARTOŚCIACH tablicy (lub tekstu, NodeList). Najczytelniejsza pętla po tablicy.", example: `for (const fruit of ["jabłko", "gruszka"]) {
  console.log(fruit);
}` },
      { tag: "for…in", kind: "skladnia", desc: "Po KLUCZACH obiektu.", example: `const car = { brand: "Fiat", price: 27000 };
for (const key in car) console.log(key, car[key]);` },
      { tag: "while / break / continue", kind: "skladnia", desc: "`while` — dopóki warunek prawdziwy. `break` przerywa pętlę, `continue` przechodzi do następnego obrotu.", example: `let n = 0;
while (true) {
  n++;
  if (n === 2) continue;
  if (n > 4) break;
  console.log(n);
}` },
    ],
  },
  {
    id: "funkcje",
    title: "Funkcje",
    intro: "Nazwany kawałek kodu do wielokrotnego użycia.",
    items: [
      { tag: "function", kind: "skladnia", desc: "Deklaracja funkcji z parametrami; `return` zwraca wynik (bez return → undefined).", example: `function add(a, b) {
  return a + b;
}
console.log(add(2, 3));` },
      { tag: "() => {}", kind: "skladnia", desc: "Funkcja strzałkowa. Przy jednym wyrażeniu bez klamer zwraca je automatycznie.", example: `const square = (x) => x * x;
const greet = (name) => {
  return "Cześć, " + name;
};
console.log(square(4), greet("Ola"));` },
      { tag: "parametr domyślny / ...rest", kind: "skladnia", desc: "Wartość domyślna, gdy argumentu brak; `...nums` zbiera wszystkie argumenty w tablicę.", example: `const hello = (name = "Gość") => "Cześć, " + name;
const sum = (...nums) => nums.reduce((s, n) => s + n, 0);
console.log(hello(), sum(1, 2, 3));` },
      { tag: "callback", kind: "skladnia", desc: "Funkcja przekazana jako argument i wywołana później (zdarzenia, timery, map). Przekazuj funkcję, nie jej wywołanie!", example: `function doTwice(fn) { fn(); fn(); }
doTwice(() => console.log("hej"));
setTimeout(() => console.log("po 0.5 s"), 500);` },
      { tag: "domknięcie (closure)", kind: "skladnia", desc: "Funkcja wewnętrzna „pamięta” zmienne funkcji, w której powstała.", example: `function counter() {
  let c = 0;
  return () => ++c;
}
const next = counter();
console.log(next(), next(), next());` },
    ],
  },
  {
    id: "tablice",
    title: "Tablice",
    intro: "Listy wartości i metody do ich przetwarzania.",
    items: [
      { tag: "[] / length / [i]", kind: "skladnia", desc: "Tablica, jej długość i dostęp po indeksie (od 0). `at(-1)` — ostatni element.", example: `const arr = ["a", "b", "c"];
console.log(arr.length, arr[0], arr.at(-1));` },
      { tag: "push / pop / unshift / shift", kind: "metoda", desc: "Dodaj/usuń na końcu (push/pop) i na początku (unshift/shift). Zmieniają tablicę.", example: `const a = [2, 3];
a.push(4); a.unshift(1);
console.log(a);
a.pop(); a.shift();
console.log(a);` },
      { tag: "map()", kind: "metoda", desc: "Nowa tablica z przekształconym każdym elementem.", example: `const prices = [10, 20, 30];
console.log(prices.map((p) => p * 1.23));
console.log([{ t: "A" }, { t: "B" }].map((x) => x.t));` },
      { tag: "filter()", kind: "metoda", desc: "Nowa tablica tylko z elementami spełniającymi warunek.", example: `const ages = [11, 34, 8, 23, 51];
console.log(ages.filter((a) => a >= 18));` },
      { tag: "find() / findIndex()", kind: "metoda", desc: "Pierwszy pasujący element (lub undefined) / jego indeks (lub -1).", example: `const users = [{ id: 1, name: "Ola" }, { id: 2, name: "Jan" }];
console.log(users.find((u) => u.id === 2));
console.log(users.findIndex((u) => u.name === "Ola"));` },
      { tag: "reduce()", kind: "metoda", desc: "Zwija tablicę do jednej wartości (suma, średnia, obiekt). Drugi argument = wartość startowa.", example: `const cart = [{ price: 10, qty: 2 }, { price: 5, qty: 4 }];
const total = cart.reduce((sum, it) => sum + it.price * it.qty, 0);
console.log(total);` },
      { tag: "forEach()", kind: "metoda", desc: "Wykonaj funkcję dla każdego elementu. Nic nie zwraca (do tworzenia nowej tablicy użyj map).", example: `["HTML", "CSS"].forEach((t, i) => console.log(i, t));` },
      { tag: "some() / every() / includes()", kind: "metoda", desc: "Czy któryś / czy wszystkie spełniają warunek; czy tablica zawiera wartość.", example: `const n = [2, 4, 7];
console.log(n.some((x) => x % 2), n.every((x) => x > 0), n.includes(4));` },
      { tag: "sort()", kind: "metoda", desc: "Sortuje i ZMIENIA tablicę. Liczby: `(a, b) => a - b`. Teksty: `a.localeCompare(b)`. Sortuj kopię `[...arr]`, żeby zachować oryginał.", example: `const nums = [10, 9, 1];
console.log([...nums].sort(), [...nums].sort((a, b) => a - b));
const names = ["Żaneta", "Adam", "Ola"];
console.log([...names].sort((a, b) => a.localeCompare(b)));` },
      { tag: "slice() / splice()", kind: "metoda", desc: "`slice(start, koniec)` — kopia fragmentu (bez zmian). `splice(od, ile, ...nowe)` — wycina/wstawia i zmienia tablicę.", example: `const a = ["a", "b", "c", "d"];
console.log(a.slice(0, 2));
a.splice(1, 2, "X");
console.log(a);` },
      { tag: "join() / split()", kind: "metoda", desc: "Tablica → tekst (join) i tekst → tablica (split).", example: `console.log(["a", "b", "c"].join(", "));
console.log("HTML,CSS,JS".split(","));` },
    ],
  },
  {
    id: "teksty-liczby",
    title: "Teksty i liczby",
    intro: "Najczęstsze operacje na stringach, liczbach i Math.",
    items: [
      { tag: "toUpperCase / toLowerCase / trim", kind: "metoda", desc: "Wielkie/małe litery, usunięcie spacji z brzegów.", example: `console.log("  Ala ma Kota  ".trim().toLowerCase());` },
      { tag: "includes / startsWith", kind: "metoda", desc: "Czy tekst zawiera fragment / zaczyna się od. Do wyszukiwania bez wielkości liter porównuj `toLowerCase()`.", example: `const title = "iPhone 9";
console.log(title.toLowerCase().includes("phone"), title.startsWith("i"));` },
      { tag: "replace / replaceAll / slice", kind: "metoda", desc: "Zamiana fragmentu tekstu; wycinek tekstu.", example: `console.log("a-b-c".replaceAll("-", " "), "JavaScript".slice(0, 4));` },
      { tag: "padStart()", kind: "metoda", desc: "Dopełnia tekst z lewej do danej długości (np. 05 sekund).", example: `console.log(String(5).padStart(2, "0"), \`3:\${String(7).padStart(2, "0")}\`);` },
      { tag: "Number() / parseInt()", kind: "globalne", desc: "Tekst → liczba. Wartości z pól formularza są zawsze tekstem!", example: `console.log("8" + 2, Number("8") + 2, parseInt("12px"));
console.log(Number("abc"), Number.isNaN(Number("abc")));` },
      { tag: "toFixed()", kind: "metoda", desc: "Liczba → tekst z określoną liczbą miejsc po przecinku.", example: `console.log((3.14159).toFixed(2), (10).toFixed(2));` },
      { tag: "Math", kind: "globalne", desc: "`random()` [0,1), `floor` w dół, `ceil` w górę, `round`, `max`, `min`, `abs`.", example: `console.log(Math.floor(4.7), Math.ceil(4.1), Math.round(4.5));
console.log(Math.max(3, 9, 2), Math.min(...[5, 1, 8]));
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
console.log(randomInt(1, 6));` },
    ],
  },
  {
    id: "obiekty",
    title: "Obiekty, klasy i JSON",
    intro: "Dane jako pary klucz: wartość.",
    items: [
      { tag: "{ klucz: wartość }", kind: "skladnia", desc: "Obiekt; dostęp kropką lub nawiasem (gdy klucz w zmiennej). Można dodawać i usuwać właściwości.", example: `const user = { name: "Ola", age: 21 };
const key = "age";
user.city = "Kraków";
console.log(user.name, user[key], user);` },
      { tag: "destrukturyzacja", kind: "skladnia", desc: "Wyciąganie wartości z obiektu/tablicy do zmiennych w jednej linii.", example: `const { name, age = 18 } = { name: "Jan" };
const [first, second] = ["a", "b"];
console.log(name, age, first, second);` },
      { tag: "{ ...obj }", kind: "skladnia", desc: "Kopia obiektu (spread), z możliwością nadpisania pól. Oryginał bez zmian.", example: `const product = { title: "Laptop", price: 3999 };
const sale = { ...product, price: 3599 };
console.log(product.price, sale.price);` },
      { tag: "Object.keys / values / entries", kind: "globalne", desc: "Tablica kluczy, wartości albo par [klucz, wartość].", example: `const o = { a: 1, b: 2 };
console.log(Object.keys(o), Object.values(o), Object.entries(o));` },
      { tag: "metoda i this", kind: "skladnia", desc: "Funkcja w obiekcie to metoda; `this` wskazuje obiekt.", example: `const cart = {
  items: [5, 10],
  total() { return this.items.reduce((s, x) => s + x, 0); },
};
console.log(cart.total());` },
      { tag: "class", kind: "skladnia", desc: "Szablon obiektów: `constructor`, metody, `extends`/`super`, pola prywatne `#`, gettery `get`.", example: `class Stopwatch {
  #seconds = 0;
  tick() { this.#seconds++; }
  get time() { return this.#seconds + "s"; }
}
const sw = new Stopwatch();
sw.tick(); sw.tick();
console.log(sw.time);` },
      { tag: "JSON.stringify / JSON.parse", kind: "globalne", desc: "Obiekt → tekst JSON (do localStorage, wysyłki) i z powrotem.", example: `const text = JSON.stringify({ theme: "dark", size: 18 });
console.log(text);
console.log(JSON.parse(text).theme);` },
    ],
  },
  {
    id: "dom",
    title: "DOM — elementy strony",
    intro: "Szukanie, zmiana, tworzenie i usuwanie elementów HTML.",
    items: [
      { tag: "querySelector / querySelectorAll", kind: "metoda", desc: "Pierwszy pasujący element (lub null) / wszystkie (NodeList) — po selektorze CSS.", html: `<ul><li class="item">A</li><li class="item">B</li></ul>`, example: `const first = document.querySelector(".item");
const all = document.querySelectorAll(".item");
console.log(first.textContent, all.length);` },
      { tag: "getElementById", kind: "metoda", desc: "Element po id (bez #).", html: `<p id="msg">Cześć</p>`, example: `console.log(document.getElementById("msg").textContent);` },
      { tag: "textContent / innerHTML", kind: "wlasciwosc", desc: "Tekst elementu (bezpieczne) / kod HTML (tylko zaufane dane — ryzyko XSS).", html: `<p id="a"></p><p id="b"></p>`, example: `document.querySelector("#a").textContent = "<b>jako tekst</b>";
document.querySelector("#b").innerHTML = "<b>jako HTML</b>";` },
      { tag: "classList", kind: "wlasciwosc", desc: "`add`, `remove`, `toggle`, `contains` — zmiana klas (wygląd zdefiniowany w CSS).", html: `<style>.dark{background:#1d1d1f;color:#fff;padding:6px}</style><p id="p">Akapit</p>`, example: `const p = document.querySelector("#p");
p.classList.add("dark");
console.log(p.classList.contains("dark"), p.classList.toggle("dark"));` },
      { tag: "style / dataset / setAttribute", kind: "wlasciwosc", desc: "Styl inline (camelCase), atrybuty `data-*`, dowolny atrybut.", html: `<button id="b" data-price="99">Kup</button>`, example: `const b = document.querySelector("#b");
b.style.backgroundColor = "gold";
console.log(b.dataset.price);
b.setAttribute("title", "Dodaj do koszyka");` },
      { tag: "createElement / append", kind: "metoda", desc: "Utwórz element, ustaw treść, dodaj do rodzica. Wzorzec renderowania listy z tablicy.", html: `<ul id="list"></ul>`, example: `const ul = document.querySelector("#list");
["HTML", "CSS", "JS"].forEach((t) => {
  const li = document.createElement("li");
  li.textContent = t;
  ul.append(li);
});` },
      { tag: "remove / replaceChildren", kind: "metoda", desc: "Usuń element / wyczyść (lub zastąp) wszystkie dzieci przed ponownym renderem.", html: `<ul id="l"><li>stary 1</li><li>stary 2</li></ul><p id="x">do usunięcia</p>`, example: `document.querySelector("#x").remove();
const li = document.createElement("li");
li.textContent = "nowy";
document.querySelector("#l").replaceChildren(li);` },
      { tag: "closest()", kind: "metoda", desc: "Najbliższy przodek pasujący do selektora (przydatne w delegowaniu zdarzeń).", html: `<div class="card"><button id="b">Usuń</button></div>`, example: `const card = document.querySelector("#b").closest(".card");
console.log(card.className);` },
    ],
  },
  {
    id: "zdarzenia",
    title: "Zdarzenia",
    intro: "Reagowanie na kliknięcia, pisanie, klawisze, formularze.",
    items: [
      { tag: "addEventListener", kind: "metoda", desc: "Podpina funkcję do zdarzenia (`click`, `input`, `change`, `submit`, `keydown`…). Przekazuj funkcję, nie jej wywołanie.", html: `<button id="btn">Kliknij</button>`, example: `let clicks = 0;
document.querySelector("#btn").addEventListener("click", () => {
  clicks++;
  console.log("kliknięcia:", clicks);
});` },
      { tag: "event (e)", kind: "wlasciwosc", desc: "Obiekt zdarzenia: `e.target` (element źródłowy), `e.currentTarget` (z listenerem), `e.key`/`e.code` (klawisz).", html: `<input id="i" placeholder="pisz…">`, example: `document.querySelector("#i").addEventListener("input", (e) => {
  console.log("wartość:", e.target.value);
});` },
      { tag: "keydown: e.key / e.code", kind: "wlasciwosc", desc: "Klawiatura: `e.key` = znak (\"a\", \"Enter\", \"ArrowRight\"), `e.code` = fizyczny klawisz (\"Space\", \"KeyA\").", html: `<p>Kliknij tu i naciśnij klawisz</p>`, example: `document.addEventListener("keydown", (e) => {
  console.log(e.key, e.code);
});` },
      { tag: "submit + preventDefault", kind: "metoda", desc: "Obsługa formularza bez przeładowania strony; `FormData` zbiera pola z `name`.", html: `<form id="f"><input name="email" value="ola@x.pl"><button>Wyślij</button></form>`, example: `document.querySelector("#f").addEventListener("submit", (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target));
  console.log(data);
});` },
      { tag: "delegowanie zdarzeń", kind: "skladnia", desc: "Jeden listener na rodzicu + `e.target.closest()` — obsługuje też elementy dodane później.", html: `<ul id="l"><li>A <button>✕</button></li><li>B <button>✕</button></li></ul>`, example: `document.querySelector("#l").addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (btn) btn.closest("li").remove();
});` },
      { tag: "removeEventListener", kind: "metoda", desc: "Odłącza funkcję — trzeba podać TĘ SAMĄ funkcję (nie anonimową).", example: `function onKey(e) { console.log(e.key); }
document.addEventListener("keydown", onKey);
document.removeEventListener("keydown", onKey);
console.log("odłączono");` },
    ],
  },
  {
    id: "async",
    title: "Czas i asynchroniczność",
    intro: "Timery, Promise, async/await i fetch.",
    items: [
      { tag: "setTimeout", kind: "globalne", desc: "Uruchom funkcję raz po czasie (ms). Zwraca id do `clearTimeout`.", example: `console.log("start");
setTimeout(() => console.log("po 1 s"), 1000);` },
      { tag: "setInterval / clearInterval", kind: "globalne", desc: "Uruchamiaj co określony czas; zatrzymaj przez `clearInterval(id)`.", example: `let n = 0;
const id = setInterval(() => {
  n++;
  console.log("tick", n);
  if (n === 3) clearInterval(id);
}, 500);` },
      { tag: "Promise", kind: "globalne", desc: "Obiekt przyszłego wyniku: `resolve` → `.then`, `reject` → `.catch`.", example: `const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
wait(500).then(() => console.log("minęło 0.5 s"));` },
      { tag: "async / await", kind: "skladnia", desc: "Wygodny zapis Promise: w funkcji `async` piszesz `await`, a błędy łapiesz `try/catch`.", example: `const wait = (ms) => new Promise((r) => setTimeout(r, ms));
async function run() {
  console.log("czekam…");
  await wait(500);
  console.log("gotowe");
}
run();` },
      { tag: "fetch (GET)", kind: "globalne", desc: "Pobranie danych z API. Sprawdź `res.ok` (fetch nie rzuca błędu przy 404), dane przez `await res.json()`.", example: `const res = await fetch("https://dummyjson.com/products?limit=3");
if (!res.ok) throw new Error("HTTP " + res.status);
const data = await res.json();
console.log(data.products.map((p) => p.title));` },
      { tag: "fetch (POST)", kind: "globalne", desc: "Wysłanie JSON: metoda, nagłówek Content-Type i body jako tekst.", example: `const res = await fetch("https://dummyjson.com/products/add", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ title: "Nowy" }),
});
console.log(res.status, await res.json());` },
      { tag: "try / catch / throw", kind: "skladnia", desc: "Łapanie błędów, żeby strona się nie wysypała; `throw new Error()` zgłasza własny.", example: `try {
  JSON.parse("to nie JSON");
} catch (err) {
  console.log("Błąd:", err.message);
} finally {
  console.log("koniec");
}` },
      { tag: "Promise.all", kind: "globalne", desc: "Kilka zapytań równolegle — czeka na wszystkie.", example: `const urls = ["https://dummyjson.com/products/1", "https://dummyjson.com/products/2"];
const results = await Promise.all(urls.map((u) => fetch(u).then((r) => r.json())));
console.log(results.map((p) => p.title));` },
    ],
  },
  {
    id: "magazyn",
    title: "localStorage i canvas",
    intro: "Zapamiętywanie danych w przeglądarce i rysowanie.",
    items: [
      { tag: "localStorage", kind: "globalne", desc: "Trwały magazyn tekstu: `setItem`, `getItem` (null, gdy brak), `removeItem`. Obiekty przez JSON.", example: `localStorage.setItem("theme", "dark");
console.log(localStorage.getItem("theme"), localStorage.getItem("brak"));
const scores = JSON.parse(localStorage.getItem("scores") ?? "[]");
console.log(scores);`, preview: false },
      { tag: "canvas getContext('2d')", kind: "metoda", desc: "Rysowanie: `fillStyle`, `fillRect`, `clearRect`, `fillText`, `drawImage`, `arc`.", html: `<canvas id="c" width="220" height="90" style="border:1px solid #ccc"></canvas>`, example: `const ctx = document.querySelector("#c").getContext("2d");
ctx.fillStyle = "#8ecae6";
ctx.fillRect(0, 0, 220, 90);
ctx.fillStyle = "#fb8500";
ctx.beginPath(); ctx.arc(50, 45, 20, 0, Math.PI * 2); ctx.fill();
ctx.fillStyle = "#000"; ctx.font = "16px sans-serif";
ctx.fillText("Wynik: 3", 120, 25);` },
      { tag: "requestAnimationFrame", kind: "globalne", desc: "Pętla animacji/gry: update → clear → draw → requestAnimationFrame(loop).", html: `<canvas id="c" width="220" height="80" style="background:#8ecae6"></canvas>`, example: `const ctx = document.querySelector("#c").getContext("2d");
let x = 0;
function loop() {
  x = (x + 2) % 220;
  ctx.clearRect(0, 0, 220, 80);
  ctx.fillStyle = "#fb8500";
  ctx.fillRect(x, 30, 20, 20);
  requestAnimationFrame(loop);
}
loop();` },
      { tag: "console", kind: "globalne", desc: "`log` (wartości), `table` (tablica obiektów), `error`, `warn` — podstawowe debugowanie.", example: `console.log("wartość", 42, { a: 1 });
console.error("coś poszło nie tak");` },
    ],
  },
];

/* „Jak zrobić…?” dla JS */
WDAI.refJsGoals = [
  { goal: "Znaleźć element na stronie", code: "const btn = document.querySelector(\"#start\");", see: ["querySelector / querySelectorAll"] },
  { goal: "Zmienić tekst elementu", code: "title.textContent = \"Nowy tytuł\";", see: ["textContent / innerHTML"] },
  { goal: "Zareagować na kliknięcie", code: "btn.addEventListener(\"click\", () => {\n  console.log(\"klik!\");\n});", see: ["addEventListener"] },
  { goal: "Pokazać / ukryć element", code: "menu.classList.toggle(\"hidden\");\n// albo: menu.hidden = !menu.hidden;", see: ["classList"] },
  { goal: "Odczytać wartość z pola", code: "const min = Number(minInput.value);\nconst upper = upperCheckbox.checked;", see: ["Number() / parseInt()", "event (e)"] },
  { goal: "Obsłużyć formularz bez przeładowania", code: "form.addEventListener(\"submit\", (e) => {\n  e.preventDefault();\n});", see: ["submit + preventDefault"] },
  { goal: "Dodać elementy z tablicy na stronę", code: "list.replaceChildren();\nitems.forEach((t) => {\n  const li = document.createElement(\"li\");\n  li.textContent = t;\n  list.append(li);\n});", see: ["createElement / append", "remove / replaceChildren"] },
  { goal: "Zrobić coś co sekundę (stoper, zegar)", code: "const id = setInterval(() => {\n  seconds++;\n}, 1000);\n// stop: clearInterval(id);", see: ["setInterval / clearInterval"] },
  { goal: "Sformatować czas „3min 48s”", code: "const m = Math.floor(s / 60);\nconst text = m > 0 ? `${m}min ${s % 60}s` : `${s}s`;", see: ["Math", "`tekst ${x}`"] },
  { goal: "Wylosować liczbę z przedziału", code: "const n = Math.floor(Math.random() * (max - min + 1)) + min;", see: ["Math"] },
  { goal: "Pobrać dane z API", code: "const res = await fetch(url);\nconst data = await res.json();", see: ["fetch (GET)", "async / await"] },
  { goal: "Przefiltrować listę po wpisanej frazie", code: "const q = input.value.toLowerCase();\nconst hits = items.filter((p) => p.title.toLowerCase().includes(q));", see: ["filter()", "includes / startsWith"] },
  { goal: "Posortować alfabetycznie (kopię)", code: "const sorted = [...items].sort((a, b) => a.title.localeCompare(b.title));", see: ["sort()"] },
  { goal: "Policzyć sumę / średnią", code: "const sum = nums.reduce((s, n) => s + n, 0);\nconst avg = sum / nums.length;", see: ["reduce()"] },
  { goal: "Zapamiętać ustawienie po odświeżeniu", code: "localStorage.setItem(\"theme\", \"dark\");\nconst theme = localStorage.getItem(\"theme\") ?? \"light\";", see: ["localStorage"] },
  { goal: "Zareagować na klawisz (np. spację)", code: "document.addEventListener(\"keydown\", (e) => {\n  if (e.code === \"Space\") jump();\n});", see: ["keydown: e.key / e.code"] },
  { goal: "Pętla gry w canvas", code: "function loop() {\n  update();\n  draw();\n  requestAnimationFrame(loop);\n}", see: ["requestAnimationFrame", "canvas getContext('2d')"] },
  { goal: "Obsłużyć błąd, żeby strona działała dalej", code: "try {\n  // ryzykowny kod\n} catch (err) {\n  status.textContent = err.message;\n}", see: ["try / catch / throw"] },
];
