/* M8 — React: podstawy (Lab 4) */
WDAI.modules.push({
  id: "m8",
  code: "M8",
  tech: "react",
  title: "React — podstawy",
  short: "React",
  lab: "Lab 4",
  syllabus: "W3, U1",
  intro: "React to biblioteka do budowania interfejsu z komponentów. Zamiast ręcznie zmieniać DOM (jak w M7) opisujesz, JAK widok ma wyglądać dla danego stanu, a React sam aktualizuje stronę. Na podstawie react.dev. Piaskownice uruchamiają prawdziwy React 18.",
  topics: [
    {
      id: "czym-jest",
      title: "Czym jest React i jak zacząć",
      keywords: ["react", "vite", "spa", "komponent", "deklaratywny", "npm create vite"],
      theory: [
        "W czystym JS (M7) sam szukasz elementów i je zmieniasz (imperatywnie: „znajdź, zmień, dodaj”). W React opisujesz widok jako funkcję stanu (**deklaratywnie**): zmieniasz dane, a React przelicza, co się zmieniło, i aktualizuje tylko te fragmenty strony.",
        "Aplikacja React to **drzewo komponentów**. Komponent to zwykła funkcja JavaScript, która zwraca znaczniki zapisane w **JSX**. Nazwa komponentu zaczyna się wielką literą.",
        "Nowy projekt tworzysz narzędziem **Vite** (szybki serwer deweloperski i budowanie). Gotowa aplikacja to SPA — jedna strona HTML, w której React podmienia widoki.",
      ],
      syntax: [
        {
          title: "Nowy projekt (terminal)",
          lang: "bash",
          code: `
npm create vite@latest moja-apka -- --template react   # ❶
cd moja-apka
npm install                                            # ❷
npm run dev                                            # ❸ http://localhost:5173`,
          legend: [["❶", "szablon projektu React"], ["❷", "pobranie zależności do node_modules"], ["❸", "serwer z podglądem na żywo"]],
        },
        {
          title: "Najmniejsza aplikacja",
          lang: "jsx",
          code: `
// src/main.jsx
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
createRoot(document.getElementById("root")).render(<App />);   // ❶

// src/App.jsx
export default function App() {                                 // ❷
  return <h1>Cześć, React!</h1>;                                 // ❸
}`,
          legend: [["❶", "React przejmuje <div id=\"root\"> z index.html"], ["❷", "komponent = funkcja z nazwą wielką literą"], ["❸", "zwraca JSX — HTML w JavaScripcie"]],
          explain: "W piaskownicy importów nie ma — React jest dostępny globalnie, a hooki (useState…) są już wyciągnięte.",
        },
      ],
      try: {
        mode: "react",
        js: `function App() {
  return <h1>Cześć, React!</h1>;
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);`,
        task: "Zmień nagłówek na swoje imię i dodaj pod nim akapit `<p>` z opisem.",
        hint: "Komponent może zwrócić tylko jeden element nadrzędny — owiń h1 i p w `<>…</>` (Fragment).",
        solution: `function App() {
  return (
    <>
      <h1>Cześć, jestem Ola</h1>
      <p>Uczę się Reacta.</p>
    </>
  );
}`,
      },
    },
    {
      id: "jsx",
      title: "JSX — zasady",
      keywords: ["jsx", "className", "fragment", "wyrażenie", "{}", "htmlFor", "style"],
      theory: [
        "JSX wygląda jak HTML, ale to JavaScript. Kilka różnic, o które łatwo się potknąć:",
        ["Komponent zwraca **jeden** element nadrzędny — w razie potrzeby owiń wszystko w Fragment `<>…</>`.", "`className` zamiast `class`, `htmlFor` zamiast `for`.", "Każdy znacznik musi być zamknięty: `<img />`, `<br />`, `<input />`.", "Atrybuty i zdarzenia w camelCase: `onClick`, `tabIndex`.", "`{}` wstawia wyrażenie JavaScript: zmienną, wynik funkcji, obliczenie.", "`style` przyjmuje obiekt: `style={{ color: \"red\", fontSize: 20 }}`."],
      ],
      syntax: [
        {
          title: "JSX w praktyce",
          lang: "jsx",
          code: `
function Profile() {
  const name = "Ola";
  const avatar = "https://picsum.photos/id/64/80/80";
  return (
    <>                                                    {/* ❶ */}
      <h1 className="title">Cześć, {name}!</h1>           {/* ❷ ❸ */}
      <img src={avatar} alt={"Avatar " + name} />         {/* ❹ */}
      <p style={{ color: "#1d5c54", fontSize: 18 }}>      {/* ❺ */}
        Wynik: {2 + 3} pkt
      </p>
      <label htmlFor="mail">E-mail</label>                {/* ❻ */}
      <input id="mail" />
    </>
  );
}`,
          legend: [["❶", "Fragment — jeden element nadrzędny bez dodatkowego diva"], ["❷", "className zamiast class"], ["❸", "{name} — wstawienie zmiennej"], ["❹", "atrybut z wartością z JS; zamknięty <img />"], ["❺", "style jako obiekt (podwójne klamry), nazwy w camelCase"], ["❻", "htmlFor zamiast for"]],
        },
      ],
      mistakes: [
        { lang: "jsx", bad: "return (\n  <h1>Tytuł</h1>\n  <p>Tekst</p>\n);", good: "return (\n  <>\n    <h1>Tytuł</h1>\n    <p>Tekst</p>\n  </>\n);", why: "Komponent może zwrócić tylko jeden element nadrzędny." },
        { lang: "jsx", bad: "<div class=\"card\"><img src=\"a.jpg\"></div>", good: "<div className=\"card\"><img src=\"a.jpg\" alt=\"\" /></div>", why: "W JSX: className i zamknięte znaczniki puste." },
      ],
      try: {
        mode: "react",
        js: `function Card() {
  const title = "Strona przepisów";
  const year = 2026;
  return (
    <div className="card">
      <h2>{title}</h2>
      <p>Rok: {year}</p>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Card />);`,
        css: `.card { border: 1px solid #ddd; border-radius: 12px; padding: 16px; max-width: 260px; }`,
        task: "Dodaj zmienną `tags = [\"HTML\", \"CSS\"]` i wyświetl `tags.join(\", \")` w akapicie. Nadaj tytułowi kolor przez `style`.",
      },
    },
    {
      id: "props",
      title: "Komponenty i props",
      keywords: ["props", "komponent", "children", "destrukturyzacja", "rodzic", "dziecko"],
      theory: [
        "Komponenty składasz jak klocki: jeden komponent używa drugiego jak znacznika HTML. Dane przekazujesz z rodzica do dziecka przez **props** (właściwości) — tak jak atrybuty w HTML.",
        "Props są **tylko do odczytu** — komponent nie zmienia własnych props. Specjalny prop `children` to zawartość wpisana między znacznikami komponentu.",
      ],
      syntax: [
        {
          title: "Przekazywanie danych",
          lang: "jsx",
          code: `
function Avatar({ src, name, size = 80 }) {            // ❶ ❷
  return <img src={src} alt={name} width={size} />;
}

function Card({ title, children }) {                   // ❸
  return (
    <div className="card">
      <h3>{title}</h3>
      {children}
    </div>
  );
}

function App() {
  return (
    <Card title="Ola">                                 {/* ❹ */}
      <Avatar src="https://picsum.photos/id/64/80/80" name="Ola" size={60} />
      <p>Studentka informatyki</p>
    </Card>
  );
}`,
          legend: [["❶", "props odbierasz jako obiekt — wygodnie przez destrukturyzację"], ["❷", "wartość domyślna, gdy rodzic jej nie poda"], ["❸", "children = to, co jest między <Card> i </Card>"], ["❹", "użycie komponentu jak znacznika; liczby i JS w {}"]],
        },
      ],
      try: {
        mode: "react",
        js: `function ProductCard({ title, price }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>{price} zł</p>
    </div>
  );
}

function App() {
  return (
    <div className="grid">
      <ProductCard title="Mysz" price={59} />
      <ProductCard title="Monitor" price={899} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);`,
        css: `.grid { display: flex; gap: 12px; }
.card { border: 1px solid #ddd; border-radius: 10px; padding: 12px; }`,
        task: "Dodaj prop `available` (true/false) i wyświetl „Brak w magazynie”, gdy jest false. Dodaj trzeci produkt.",
        hint: "`{!available && <p>Brak w magazynie</p>}`",
      },
    },
    {
      id: "listy-warunki",
      title: "Listy, key i renderowanie warunkowe",
      keywords: ["map", "key", "lista", "warunek", "&&", "ternary", "renderowanie warunkowe"],
      theory: [
        "Listę elementów tworzysz z tablicy przez `map()` — tak jak w M7, ale zwracasz JSX. Każdy element listy potrzebuje atrybutu **`key`**: unikalnego i stałego (najlepiej id z danych). Dzięki niemu React wie, który element się zmienił.",
        "Warunki w JSX: `warunek ? <A /> : <B />` (jedno albo drugie) oraz `warunek && <A />` (pokaż albo nic). Uwaga: `0 && …` wyświetli „0”, więc przy liczbach porównuj jawnie (`count > 0 && …`).",
      ],
      syntax: [
        {
          title: "Lista i warunki",
          lang: "jsx",
          code: `
const tasks = [
  { id: 1, text: "Lab 1", done: true },
  { id: 2, text: "Lab 3", done: false },
];

function TaskList() {
  if (tasks.length === 0) return <p>Brak zadań</p>;       // ❶
  return (
    <ul>
      {tasks.map((t) => (
        <li key={t.id}>                                   {/* ❷ */}
          {t.done ? "✔" : "○"} {t.text}                    {/* ❸ */}
          {!t.done && <strong> — do zrobienia</strong>}    {/* ❹ */}
        </li>
      ))}
    </ul>
  );
}`,
          legend: [["❶", "wczesny return — zwykły if przed JSX"], ["❷", "key z id danych"], ["❸", "operator ? : — jedno albo drugie"], ["❹", "&& — pokaż tylko gdy warunek prawdziwy"]],
        },
      ],
      mistakes: [
        { lang: "jsx", bad: "{items.map((it, i) => <li key={i}>{it.text}</li>)}", good: "{items.map((it) => <li key={it.id}>{it.text}</li>)}", why: "Indeks jako key psuje stan, gdy lista się sortuje, filtruje lub zmienia. Używaj stałego id." },
        { lang: "jsx", bad: "{count && <span>{count} nowych</span>}  // dla 0 wyświetli „0”", good: "{count > 0 && <span>{count} nowych</span>}", why: "0 jest falsy, ale React wyświetla liczbę 0. Porównuj jawnie." },
      ],
      try: {
        mode: "react",
        js: `const products = [
  { id: 1, title: "Mysz", price: 59, qty: 10 },
  { id: 2, title: "Klawiatura", price: 149, qty: 0 },
  { id: 3, title: "Monitor", price: 899, qty: 3 },
];

function App() {
  return (
    <ul>
      {products.map((p) => (
        <li key={p.id}>{p.title} — {p.price} zł</li>
      ))}
    </ul>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);`,
        task: "Dla produktów z `qty === 0` dopisz „(brak)” na czerwono. Pokaż tylko produkty tańsze niż 500 zł (`filter` przed `map`).",
      },
    },
    {
      id: "zdarzenia",
      title: "Zdarzenia",
      keywords: ["onClick", "onChange", "onSubmit", "zdarzenie", "event", "preventDefault", "handler"],
      theory: [
        "Zdarzenia podpinasz atrybutami w camelCase: `onClick`, `onChange`, `onSubmit`, `onKeyDown`. Przekazujesz **funkcję** — nie jej wywołanie. Gdy potrzebujesz argumentu, owiń w funkcję strzałkową.",
        "Funkcja dostaje obiekt zdarzenia `e` (jak w M7): `e.target.value`, `e.preventDefault()`.",
      ],
      syntax: [
        {
          title: "Obsługa zdarzeń",
          lang: "jsx",
          code: `
function Buttons() {
  function handleClick() {                                  // ❶
    alert("Kliknięto!");
  }
  return (
    <>
      <button onClick={handleClick}>Klik</button>           {/* ❷ */}
      <button onClick={() => alert("Usuń 7")}>Usuń</button>  {/* ❸ */}
      <form onSubmit={(e) => { e.preventDefault(); alert("wysłano"); }}>  {/* ❹ */}
        <input onChange={(e) => console.log(e.target.value)} />           {/* ❺ */}
        <button>Wyślij</button>
      </form>
    </>
  );
}`,
          legend: [["❶", "funkcja obsługi wewnątrz komponentu"], ["❷", "przekazujesz funkcję — bez nawiasów"], ["❸", "gdy potrzebny argument: funkcja strzałkowa"], ["❹", "formularz bez przeładowania strony"], ["❺", "onChange w React działa przy każdym znaku (jak input w DOM)"]],
        },
      ],
      mistakes: [
        { lang: "jsx", bad: "<button onClick={handleClick()}>Klik</button>", good: "<button onClick={handleClick}>Klik</button>", why: "Z nawiasami funkcja wykona się od razu przy renderze, a nie po kliknięciu." },
      ],
      try: {
        mode: "react",
        js: `function App() {
  return (
    <button onClick={() => console.log("klik!")}>Kliknij</button>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);`,
        task: "Dodaj pole tekstowe, które przy każdym znaku wypisuje w konsoli wpisaną wartość (`onChange`).",
      },
    },
    {
      id: "usestate",
      title: "Stan: useState",
      keywords: ["useState", "stan", "state", "setter", "migawka", "re-render", "aktualizacja funkcyjna"],
      theory: [
        "**Stan** to pamięć komponentu: dane, które się zmieniają (licznik, wpisany tekst, otwarte menu). Tworzysz go hookiem `useState(wartośćPoczątkowa)`, który zwraca parę: aktualną wartość i funkcję do jej zmiany.",
        "Zwykła zmienna nie wystarczy: zmiana zwykłej zmiennej nie przerysuje widoku, a przy następnym renderze i tak się wyzeruje. Wywołanie funkcji ustawiającej (`setCount`) zapamiętuje nową wartość i **renderuje komponent ponownie**.",
        "Stan to **migawka**: w jednym renderze wartość jest stała. Gdy nowy stan zależy od poprzedniego, użyj aktualizacji funkcyjnej `setCount(c => c + 1)`.",
      ],
      syntax: [
        {
          title: "Licznik",
          lang: "jsx",
          code: `
function Counter() {
  const [count, setCount] = useState(0);                 // ❶ ❷ ❸
  return (
    <>
      <p>Licznik: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>        {/* ❹ */}
      <button onClick={() => setCount((c) => Math.max(0, c - 1))}>−1</button>  {/* ❺ */}
      <button onClick={() => setCount(0)}>Reset</button>
    </>
  );
}`,
          legend: [["❶", "count — aktualna wartość (tylko do odczytu)"], ["❷", "setCount — zmienia stan i powoduje ponowny render"], ["❸", "wartość początkowa — tylko przy pierwszym renderze"], ["❹", "nowa wartość wprost"], ["❺", "aktualizacja funkcyjna — liczy z najnowszej wartości"]],
        },
      ],
      mistakes: [
        { lang: "jsx", bad: "let count = 0;\n<button onClick={() => count++}>+1</button>", good: "const [count, setCount] = useState(0);\n<button onClick={() => setCount(count + 1)}>+1</button>", why: "Zmiana zwykłej zmiennej nie przerysuje widoku." },
        { lang: "jsx", bad: "setCount(count + 1);\nsetCount(count + 1);  // +1, nie +2", good: "setCount((c) => c + 1);\nsetCount((c) => c + 1);  // +2", why: "Obie linie widzą tę samą migawkę count." },
      ],
      try: {
        mode: "react",
        js: `function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>Licznik: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Counter />);`,
        task: "Dodaj przycisk „−1”, który nie zejdzie poniżej 0, i przycisk „Reset”. Licznik większy niż 10 pokaż na czerwono.",
        hint: "`setCount((c) => Math.max(0, c - 1))` oraz `style={{ color: count > 10 ? \"red\" : \"black\" }}`.",
      },
    },
    {
      id: "stan-obiekty",
      title: "Stan z obiektami i tablicami",
      keywords: ["niemutowalność", "spread", "dodaj do listy", "usuń z listy", "map", "filter", "kopia"],
      theory: [
        "Obiektów i tablic w stanie **nie zmieniasz bezpośrednio** (`push`, `obj.x = …`) — React nie zauważy zmiany. Zawsze tworzysz **nową** tablicę/obiekt i przekazujesz ją do settera.",
        ["Dodanie: `setItems([...items, nowy])`.", "Usunięcie: `setItems(items.filter((x) => x.id !== id))`.", "Zmiana jednego: `setItems(items.map((x) => x.id === id ? { ...x, done: !x.done } : x))`.", "Obiekt: `setUser({ ...user, name: \"Ala\" })`."],
      ],
      syntax: [
        {
          title: "Lista zadań (todo)",
          lang: "jsx",
          code: `
function Todo() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");

  const add = () => {
    if (!text.trim()) return;
    setTasks([...tasks, { id: Date.now(), text, done: false }]);     // ❶
    setText("");
  };
  const toggle = (id) =>
    setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));  // ❷
  const remove = (id) => setTasks(tasks.filter((t) => t.id !== id));          // ❸

  return (/* … input + lista z przyciskami … */ null);
}`,
          legend: [["❶", "nowa tablica: stare elementy + nowy"], ["❷", "nowa tablica z jednym zmienionym obiektem (kopia ze spread)"], ["❸", "nowa tablica bez usuniętego"]],
        },
      ],
      mistakes: [
        { lang: "jsx", bad: "tasks.push(newTask);\nsetTasks(tasks);", good: "setTasks([...tasks, newTask]);", why: "push zmienia tę samą tablicę — React porównuje referencje i nie widzi zmiany." },
      ],
      try: {
        mode: "react",
        js: `function Todo() {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Lab 1", done: true },
    { id: 2, text: "Lab 3", done: false },
  ]);
  const [text, setText] = useState("");

  const add = () => {
    if (!text.trim()) return;
    setTasks([...tasks, { id: Date.now(), text, done: false }]);
    setText("");
  };

  return (
    <div>
      <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Nowe zadanie" />
      <button onClick={add}>Dodaj</button>
      <ul>
        {tasks.map((t) => (
          <li key={t.id} style={{ textDecoration: t.done ? "line-through" : "none" }}>
            {t.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Todo />);`,
        task: "Dodaj przy każdym zadaniu przyciski „✔” (przełącza done) i „✕” (usuwa). Pod listą pokaż „Zrobione: X / Y”.",
        hint: "toggle przez `map` + spread, usuwanie przez `filter`; licznik: `tasks.filter((t) => t.done).length`.",
      },
    },
    {
      id: "formularze",
      title: "Formularze kontrolowane",
      keywords: ["formularz", "value", "onChange", "kontrolowany", "input", "select", "checkbox", "walidacja"],
      theory: [
        "W React wartość pola trzymasz w stanie: `value={stan}` + `onChange={(e) => setStan(e.target.value)}`. To **pole kontrolowane** — stan jest jedynym źródłem prawdy, więc łatwo walidować, czyścić i pokazywać podgląd na żywo.",
        "Checkbox: `checked={stan}` i `e.target.checked`. Kilka pól naraz: jeden obiekt w stanie i atrybut `name` pola.",
      ],
      syntax: [
        {
          title: "Formularz kontaktowy",
          lang: "jsx",
          code: `
function Contact() {
  const [form, setForm] = useState({ email: "", topic: "", agree: false });  // ❶
  const [sent, setSent] = useState(false);

  const update = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });      // ❷
  };
  const submit = (e) => {
    e.preventDefault();
    if (!form.email.includes("@")) return alert("Zły e-mail");              // ❸
    setSent(true);
  };

  if (sent) return <p>Dziękujemy, {form.email}!</p>;
  return (
    <form onSubmit={submit}>
      <input name="email" value={form.email} onChange={update} />          {/* ❹ */}
      <select name="topic" value={form.topic} onChange={update}>
        <option value="">— temat —</option><option>Pytanie</option>
      </select>
      <label><input type="checkbox" name="agree" checked={form.agree} onChange={update} /> Zgoda</label>
      <button disabled={!form.agree}>Wyślij</button>                        {/* ❺ */}
    </form>
  );
}`,
          legend: [["❶", "wszystkie pola w jednym obiekcie stanu"], ["❷", "[name] — dynamiczny klucz z atrybutu name pola"], ["❸", "własna walidacja"], ["❹", "value + onChange = pole kontrolowane"], ["❺", "przycisk aktywny dopiero po zaznaczeniu zgody"]],
        },
      ],
      try: {
        mode: "react",
        js: `function App() {
  const [name, setName] = useState("");
  return (
    <div>
      <label>Imię: <input value={name} onChange={(e) => setName(e.target.value)} /></label>
      <p>Cześć, {name || "nieznajomy"}!</p>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);`,
        task: "Dodaj licznik znaków („5 / 20”) i blokadę powyżej 20 znaków. Dodaj przycisk „Wyczyść”.",
      },
    },
    {
      id: "useeffect",
      title: "useEffect i pobieranie danych",
      keywords: ["useEffect", "fetch", "efekt", "zależności", "cleanup", "api", "ładowanie", "błąd"],
      theory: [
        "`useEffect(funkcja, [zależności])` uruchamia kod **po** wyrenderowaniu — do synchronizacji z „światem zewnętrznym”: pobierania danych z API, timerów, nasłuchiwania zdarzeń okna.",
        ["`[]` — raz, po pierwszym renderze (np. pobranie danych na start).", "`[id]` — po pierwszym renderze i po każdej zmianie `id`.", "bez tablicy — po każdym renderze (rzadko potrzebne)."],
        "Funkcja zwrócona z efektu to **sprzątanie** (cleanup): zatrzymanie timera, odłączenie listenera. Nie używaj efektu do liczenia wartości z props/stanu — licz je zwyczajnie w trakcie renderu.",
      ],
      syntax: [
        {
          title: "Pobranie listy z API",
          lang: "jsx",
          code: `
function Products() {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("loading");          // ❶

  useEffect(() => {                                          // ❷
    fetch("https://dummyjson.com/products?limit=5")
      .then((res) => res.json())
      .then((data) => { setItems(data.products); setStatus("ready"); })
      .catch(() => setStatus("error"));
  }, []);                                                    // ❸

  if (status === "loading") return <p>Ładowanie…</p>;       // ❹
  if (status === "error") return <p>Błąd pobierania</p>;
  return <ul>{items.map((p) => <li key={p.id}>{p.title}</li>)}</ul>;
}

function Clock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);                          // ❺
  }, []);
  return <p>{now.toLocaleTimeString("pl-PL")}</p>;
}`,
          legend: [["❶", "stan ładowania: loading / ready / error"], ["❷", "efekt uruchamia się po renderze"], ["❸", "[] — tylko raz na start"], ["❹", "osobny widok dla każdego stanu"], ["❺", "sprzątanie: zatrzymaj timer, gdy komponent znika"]],
        },
      ],
      mistakes: [
        { lang: "jsx", bad: "function App() {\n  const [d, setD] = useState([]);\n  fetch(url).then(r => r.json()).then(setD);  // w trakcie renderu!\n}", good: "useEffect(() => {\n  fetch(url).then(r => r.json()).then(setD);\n}, []);", why: "fetch w trakcie renderu → setD → nowy render → kolejny fetch… nieskończona pętla." },
      ],
      try: {
        mode: "react",
        js: `function Products() {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=30")
      .then((res) => res.json())
      .then((data) => setItems(data.products));
  }, []);

  const visible = items.filter((p) => p.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <div>
      <input placeholder="Szukaj…" value={query} onChange={(e) => setQuery(e.target.value)} />
      <p>Znaleziono: {visible.length}</p>
      <ul>{visible.map((p) => <li key={p.id}>{p.title}</li>)}</ul>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Products />);`,
        task: "To Lab 3 ćw. 3 w wersji React! Dodaj `<select>` sortowania (rosnąco, malejąco, oryginalnie) i komunikat „Ładowanie…”.",
        hint: "Sortuj kopię: `[...visible].sort((a, b) => a.title.localeCompare(b.title))`. Filtrowanych danych nie trzymaj w stanie — licz je w renderze.",
      },
    },
    {
      id: "podnoszenie-stanu",
      title: "Podnoszenie stanu i przepływ danych",
      keywords: ["podnoszenie stanu", "lifting state", "rodzic", "callback", "onChange prop", "thinking in react"],
      theory: [
        "Gdy dwa komponenty muszą korzystać z tego samego stanu, przenieś go do **najbliższego wspólnego rodzica**. Rodzic przekazuje dzieciom wartość (props) i funkcję do jej zmiany (prop z callbackiem, np. `onSelect`).",
        "Dane płyną **z góry na dół** (props), a zdarzenia **z dołu do góry** (callbacki). Tak wygląda cała aplikacja React.",
        "„Myślenie w React” (react.dev): 1) podziel UI na komponenty, 2) zrób wersję statyczną, 3) znajdź minimalny stan, 4) ustal, gdzie stan ma żyć, 5) dodaj przepływ zdarzeń w górę.",
      ],
      syntax: [
        {
          title: "Wspólny stan w rodzicu",
          lang: "jsx",
          code: `
function SearchBar({ query, onQueryChange }) {                 // ❶
  return <input value={query} onChange={(e) => onQueryChange(e.target.value)} />;
}
function List({ items, query }) {
  return <ul>{items.filter((t) => t.includes(query)).map((t) => <li key={t}>{t}</li>)}</ul>;
}
function App() {
  const [query, setQuery] = useState("");                      // ❷
  const items = ["HTML", "CSS", "JavaScript", "React"];
  return (
    <>
      <SearchBar query={query} onQueryChange={setQuery} />     {/* ❸ */}
      <List items={items} query={query} />                     {/* ❹ */}
    </>
  );
}`,
          legend: [["❶", "dziecko nie ma własnego stanu — dostaje wartość i callback"], ["❷", "stan w najbliższym wspólnym rodzicu"], ["❸", "w dół: wartość; w górę: funkcja zmiany"], ["❹", "drugie dziecko czyta ten sam stan"]],
        },
      ],
      try: {
        mode: "react",
        js: `function SearchBar({ query, onQueryChange }) {
  return <input placeholder="Filtruj…" value={query} onChange={(e) => onQueryChange(e.target.value)} />;
}

function List({ items, query }) {
  const q = query.toLowerCase();
  return <ul>{items.filter((t) => t.toLowerCase().includes(q)).map((t) => <li key={t}>{t}</li>)}</ul>;
}

function App() {
  const [query, setQuery] = useState("");
  const items = ["HTML", "CSS", "JavaScript", "React", "Redux"];
  return (
    <div>
      <SearchBar query={query} onQueryChange={setQuery} />
      <List items={items} query={query} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);`,
        task: "Dodaj trzeci komponent `<Counter count={…} />`, który pokazuje liczbę pasujących elementów — dane bierze z tego samego stanu.",
      },
    },
    {
      id: "router-czystosc",
      title: "Zasady hooków, czystość i React Router",
      keywords: ["hooki", "zasady hooków", "czystość", "strictmode", "react router", "routing", "spa", "useParams", "Link"],
      theory: [
        "**Zasady hooków**: wywołuj `useState`, `useEffect` itd. tylko na najwyższym poziomie komponentu (nie w `if`, pętli ani funkcji wewnętrznej) i tylko w komponentach lub własnych hookach (`useCoś`).",
        "**Komponenty muszą być czyste**: dla tych samych props i stanu zwracają ten sam JSX i w trakcie renderu nie zmieniają niczego poza sobą. Efekty uboczne robisz w obsłudze zdarzeń albo w `useEffect`. `<StrictMode>` w trybie deweloperskim renderuje dwukrotnie, żeby wyłapać błędy.",
        "**React Router** dodaje do SPA podstrony pod różnymi adresami bez przeładowania strony (History API): `<Routes>` i `<Route path element>`, linki `<Link to>`, parametry `useParams()`. Instalacja: `npm install react-router-dom`.",
      ],
      syntax: [
        {
          title: "Routing w aplikacji Vite",
          lang: "jsx",
          code: `
import { BrowserRouter, Routes, Route, Link, useParams } from "react-router-dom";

function Module() {
  const { id } = useParams();                          // ❶
  return <h2>Moduł {id}</h2>;
}

export default function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Start</Link> <Link to="/modul/m8">React</Link>   {/* ❷ */}
      </nav>
      <Routes>
        <Route path="/" element={<h1>Start</h1>} />                  {/* ❸ */}
        <Route path="/modul/:id" element={<Module />} />
        <Route path="*" element={<p>404 — nie ma takiej strony</p>} />
      </Routes>
    </BrowserRouter>
  );
}`,
          legend: [["❶", "parametr z adresu /modul/:id"], ["❷", "Link zmienia adres bez przeładowania strony"], ["❸", "ścieżka → komponent; * łapie resztę"]],
        },
        {
          title: "Własny hook",
          lang: "jsx",
          code: `
function useLocalStorage(key, initial) {                       // ❶
  const [value, setValue] = useState(() => JSON.parse(localStorage.getItem(key)) ?? initial);
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));          // ❷
  }, [key, value]);
  return [value, setValue];
}
// użycie: const [theme, setTheme] = useLocalStorage("theme", "light");`,
          legend: [["❶", "własny hook = funkcja use… korzystająca z innych hooków"], ["❷", "zapisuj przy każdej zmianie wartości"]],
        },
      ],
      mistakes: [
        { lang: "jsx", bad: "if (isOpen) {\n  const [x, setX] = useState(0);\n}", good: "const [x, setX] = useState(0);\nif (isOpen) { /* … */ }", why: "Hooki muszą być wywoływane zawsze w tej samej kolejności — nie w warunkach." },
      ],
    },
  ],
  flashcards: [
    ["Czym jest komponent w React?", "Funkcją JS z nazwą wielką literą, która zwraca JSX."],
    ["Czym różni się React od ręcznej zmiany DOM?", "Opisujesz deklaratywnie, jak widok ma wyglądać dla danego stanu; React sam aktualizuje DOM."],
    ["`class` w JSX to…", "`className` (a `for` to `htmlFor`)."],
    ["Jak zwrócić dwa elementy z komponentu?", "Owiń je we Fragment `<>…</>`."],
    ["Czym są props?", "Dane przekazywane od rodzica do dziecka; tylko do odczytu."],
    ["Co to `children`?", "Zawartość wpisana między znacznikami komponentu."],
    ["Po co `key` w listach?", "Żeby React rozpoznał elementy przy zmianach; ma być unikalny i stały (id z danych)."],
    ["Co zwraca `useState(0)`?", "Parę `[wartość, funkcjaUstawiająca]`."],
    ["Dlaczego zwykła zmienna nie wystarczy zamiast stanu?", "Jej zmiana nie powoduje ponownego renderu i zeruje się przy każdym renderze."],
    ["Kiedy `setCount(c => c + 1)` zamiast `setCount(count + 1)`?", "Gdy nowa wartość zależy od poprzedniej (np. kilka aktualizacji z rzędu)."],
    ["Jak dodać element do tablicy w stanie?", "`setItems([...items, nowy])` — nowa tablica, bez push."],
    ["Jak usunąć element z tablicy w stanie?", "`setItems(items.filter((x) => x.id !== id))`."],
    ["Co to pole kontrolowane?", "Pole z `value={stan}` i `onChange`, które zmienia stan."],
    ["Do czego służy `useEffect`?", "Do synchronizacji z zewnętrznym światem po renderze: fetch, timery, listenery."],
    ["Co znaczy `[]` w useEffect?", "Uruchom efekt tylko raz, po pierwszym renderze."],
    ["Co robi funkcja zwracana z useEffect?", "Sprzątanie: np. clearInterval, odłączenie listenera."],
    ["Na czym polega podnoszenie stanu?", "Przeniesieniu wspólnego stanu do najbliższego rodzica i przekazaniu go dzieciom przez props + callback."],
    ["Zasady hooków?", "Tylko na najwyższym poziomie komponentu (nie w if/pętli) i tylko w komponentach lub własnych hookach."],
    ["Czym tworzysz nowy projekt React?", "`npm create vite@latest nazwa -- --template react`."],
  ],
  quiz: [
    { q: "Co jest nie tak w tym JSX?", code: "return (\n  <h1>Tytuł</h1>\n  <p>Tekst</p>\n);", lang: "jsx", options: ["Nic", "Dwa elementy nadrzędne — brak Fragmentu", "Brak className", "Brak key"], answer: 1 },
    { q: "Jak w JSX nadać klasę CSS?", options: ["class=\"card\"", "className=\"card\"", "cssClass=\"card\"", "style=\"card\""], answer: 1 },
    { q: "Co wyświetli licznik (start 0) po jednym kliknięciu?", code: "<button onClick={() => {\n  setCount(count + 1);\n  setCount(count + 1);\n}}>+</button>", lang: "jsx", options: ["0", "1", "2", "błąd"], answer: 1, explain: "Obie linie widzą tę samą migawkę count = 0." },
    { q: "Co jest nie tak?", code: "<button onClick={handleClick()}>Klik</button>", lang: "jsx", options: ["Nic", "Funkcja wywoła się od razu przy renderze", "Brak preventDefault", "onClick pisze się małymi literami"], answer: 1 },
    { q: "Który zapis poprawnie dodaje zadanie do stanu?", options: ["tasks.push(t); setTasks(tasks)", "setTasks([...tasks, t])", "setTasks(tasks + t)", "tasks = [...tasks, t]"], answer: 1 },
    { q: "Co jest najlepszym `key` dla elementu listy?", options: ["indeks z map", "Math.random()", "id z danych", "tekst elementu, zawsze"], answer: 2 },
    { q: "Kiedy uruchomi się efekt z tablicą zależności `[id]`?", options: ["Tylko raz", "Po każdym renderze", "Po pierwszym renderze i przy każdej zmianie id", "Nigdy"], answer: 2 },
    { q: "Dlaczego fetch wewnątrz ciała komponentu (poza useEffect) z setState jest błędem?", options: ["fetch nie działa w React", "Powoduje nieskończoną pętlę renderów", "Jest wolniejszy", "Nie da się użyć await"], answer: 1 },
    { q: "Dwa komponenty-rodzeństwo potrzebują tego samego stanu. Co robisz?", options: ["Kopiuję stan w obu", "Podnoszę stan do wspólnego rodzica", "Używam zmiennej globalnej", "Używam localStorage"], answer: 1 },
    { q: "Co wyświetli `{count && <span>nowe</span>}` dla count = 0?", options: ["Nic", "0", "nowe", "false"], answer: 1, explain: "0 jest falsy, ale React wyświetla liczbę 0. Użyj `count > 0 && …`." },
    { q: "Która zasada hooków jest prawdziwa?", options: ["Można je wywoływać w if", "Tylko na najwyższym poziomie komponentu", "Tylko w klasach", "Tylko w useEffect"], answer: 1 },
  ],
});
