# WDAI — Notatki z literatury

Najważniejsze rzeczy do tematów z sylabusa, do których nie ma aktualnych slajdów.
To własne opracowanie na podstawie literatury z sylabusa (**react.dev**, **MDN**) oraz oficjalnej dokumentacji
narzędzi (Redux, Express, Bootstrap, Vitest, Angular). Książki Ducketta i Dickeya obejmują głównie HTML/CSS
i stos MEAN. Mikroserwisów nie ma w liście lektur, więc ta część opiera się na powszechnie przyjętych opracowaniach architektury.

| § | Temat | Moduł | Sylabus |
|---|---|---|---|
| 1 | React | M8 | Lab 4, W: 3, W3, U1 |
| 2 | Stan: podnoszenie, Context, reducer, Redux Toolkit | M9 | W: 3, U2 |
| 3 | Monolit vs mikroserwisy | M11 | Lab 5, W: 4, W5 |
| 4 | REST vs SOAP (i GraphQL) | M1, M11 | W: 2, W5 |
| 5 | HTTP: metody i kody statusu | M1 | W: 2, W5 |
| 6 | WebSockety | M7 | U2 |
| 7 | Node.js + Express | M11 | Lab 5, U3 |
| 8 | Bootstrap | M5 | W: 3 |
| 9 | TypeScript + Angular (przegląd) | M10 | W: 3, W3 |
| 10 | Testowanie aplikacji | M12 | W: 5 |
| 11 | Pytania kontrolne | wszystkie | kolokwium, odpowiedź ustna |

---

## 1. React (react.dev)

### 1.1 Czym jest

- **Biblioteka do budowania interfejsów z komponentów.** Komponent to funkcja JS, która zwraca znaczniki (JSX).
- **Deklaratywność:** opisujesz, *jak UI ma wyglądać dla danego stanu*, a React sam aktualizuje DOM.
- React porównuje nowy wynik renderu z poprzednim i zmienia w DOM tylko to, co się zmieniło.
- Do nowego projektu: **Vite** (`npm create vite@latest app -- --template react`) albo framework (np. Next.js).

### 1.2 Myślenie w React (5 kroków z react.dev)

1. Podziel UI na **hierarchię komponentów** (jeden komponent = jedna odpowiedzialność).
2. Zbuduj **wersję statyczną** (tylko props, bez stanu).
3. Znajdź **minimalny, kompletny stan** (czego nie da się wyliczyć z innych danych).
4. Ustal, **gdzie stan ma żyć**: w najbliższym wspólnym rodzicu komponentów, które go używają.
5. Dodaj **przepływ danych w drugą stronę**: rodzic przekazuje dzieciom funkcje, które zmieniają stan.

### 1.3 JSX: zasady

```jsx
export default function Profile({ user }) {
  return (
    <>                                            {/* jeden element nadrzędny (Fragment) */}
      <h1 className="title">{user.name}</h1>      {/* className zamiast class */}
      <img src={user.avatar} alt={user.name} style={{ width: 80 }} />  {/* {} = wyrażenie JS */}
      <label htmlFor="bio">Bio</label>            {/* htmlFor zamiast for */}
      <textarea id="bio" />                       {/* każdy tag musi być zamknięty */}
    </>
  );
}
```

- Nazwy komponentów **z wielkiej litery** (`<Profile />`), tagi HTML z małej.
- Atrybuty w camelCase (`onClick`, `tabIndex`); `style` przyjmuje obiekt.

### 1.4 Props

```jsx
function Avatar({ person, size = 100 }) {           // destrukturyzacja + wartość domyślna
  return <img src={person.url} alt={person.name} width={size} />;
}

function Card({ children }) {                       // children = zawartość między tagami
  return <div className="card">{children}</div>;
}

<Card><Avatar person={p} size={50} /></Card>
```

- Props są **tylko do odczytu**: komponent nie zmienia własnych props.
- Dane płyną **z góry na dół** (od rodzica do dziecka).

### 1.5 Renderowanie warunkowe i listy

```jsx
{isLoggedIn ? <Panel /> : <Login />}
{messages.length > 0 && <Badge count={messages.length} />}   // uwaga: 0 && ... wyrenderuje "0"

<ul>
  {todos.map((t) => <li key={t.id}>{t.text}</li>)}
</ul>
```

- **`key`** musi być unikalny wśród rodzeństwa i **stabilny** (najlepiej id z danych).
- Nie używaj indeksu jako klucza, jeśli lista może się przestawiać, filtrować albo zmieniać.
- Nie generuj kluczy losowo w trakcie renderu.

### 1.6 Komponenty muszą być czyste

- Ten sam input (props, stan) zawsze daje ten sam JSX.
- W trakcie renderu **nie zmieniaj** zmiennych spoza komponentu i nie wykonuj efektów ubocznych (fetch, zmiana DOM).
- Efekty uboczne robi się w **obsłudze zdarzeń**, a w ostateczności w `useEffect`.
- `<StrictMode>` w trybie deweloperskim renderuje komponenty dwa razy, żeby wyłapać nieczyste komponenty.

### 1.7 Zdarzenia

```jsx
<button onClick={() => setCount(count + 1)}>+1</button>   // przekazujesz funkcję
<button onClick={handleClick}>OK</button>                  // NIE handleClick() — to wywołanie od razu

<form onSubmit={(e) => { e.preventDefault(); save(); }}>
```

### 1.8 Stan: `useState`

```jsx
const [count, setCount] = useState(0);
```

- **Stan to migawka.** W danym renderze `count` ma stałą wartość, a `setCount` planuje **nowy render**.
- Kilka aktualizacji z rzędu: użyj **funkcji aktualizującej**.

```jsx
setCount(count + 1); setCount(count + 1);          // wynik: +1 (obie widzą tę samą migawkę)
setCount((c) => c + 1); setCount((c) => c + 1);    // wynik: +2
```

- **Nie mutuj** obiektów i tablic w stanie. Twórz nowe:

```jsx
setUser({ ...user, name: "Ola" });                    // obiekt
setTodos([...todos, newTodo]);                        // dodanie
setTodos(todos.filter((t) => t.id !== id));           // usunięcie
setTodos(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));  // zmiana
```

- **Zasady struktury stanu:** grupuj powiązane dane; unikaj sprzeczności (np. `isSending` + `isSent` → jedno `status`); **nie trzymaj w stanie tego, co da się wyliczyć** (np. `fullName` z `first` + `last`); nie duplikuj danych (trzymaj `selectedId` zamiast kopii obiektu); unikaj głębokiego zagnieżdżenia.

### 1.9 Formularze kontrolowane

```jsx
function Search() {
  const [query, setQuery] = useState("");
  return <input value={query} onChange={(e) => setQuery(e.target.value)} />;
}
```

`value` z obu stron: stan steruje inputem, a input zmienia stan.

### 1.10 Efekty: `useEffect`

**Efekt służy do synchronizacji z systemem zewnętrznym** (API, timer, WebSocket, DOM spoza Reacta).

```jsx
useEffect(() => {
  let ignore = false;
  fetch(`/api/modules/${id}`)
    .then((r) => r.json())
    .then((data) => { if (!ignore) setModule(data); });
  return () => { ignore = true; };                   // sprzątanie (cleanup)
}, [id]);                                            // tablica zależności
```

| Zależności | Kiedy efekt się uruchamia |
|---|---|
| brak tablicy | po każdym renderze |
| `[]` | raz, po zamontowaniu |
| `[id]` | po zamontowaniu i po każdej zmianie `id` |

- **Cleanup** (funkcja zwracana) uruchamia się przed kolejnym efektem i przy odmontowaniu: `clearInterval`, `ws.close()`, anulowanie zapytania.
- **Nie potrzebujesz efektu**, żeby wyliczyć dane z props/stanu (licz w trakcie renderu) ani żeby obsłużyć kliknięcie (rób to w handlerze).

### 1.11 Zasady hooków

- Wywołuj hooki **tylko na najwyższym poziomie** komponentu (nie w `if`, pętli, funkcji wewnętrznej).
- Wywołuj je **tylko w komponentach** i we własnych hookach (`useCoś`).

```jsx
function useLocalStorage(key, initial) {             // własny hook
  const [value, setValue] = useState(() => JSON.parse(localStorage.getItem(key)) ?? initial);
  useEffect(() => localStorage.setItem(key, JSON.stringify(value)), [key, value]);
  return [value, setValue];
}
```

### 1.12 Inne hooki i narzędzia

| Hook | Do czego |
|---|---|
| `useRef` | wartość, której zmiana **nie** powoduje renderu; dostęp do elementu DOM (`ref={inputRef}`) |
| `useReducer` | złożona logika stanu w jednej funkcji (patrz §2) |
| `useContext` | dane dostępne dla całego poddrzewa bez przekazywania props (patrz §2) |
| `useMemo` / `useCallback` | zapamiętanie kosztownego wyniku / funkcji (optymalizacja) |

### 1.13 Routing w SPA (React Router)

```jsx
<BrowserRouter>
  <nav><Link to="/">Start</Link> <Link to="/quiz">Quiz</Link></nav>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/modul/:id" element={<Module />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
</BrowserRouter>

// w Module:
const { id } = useParams();
const navigate = useNavigate();      // navigate("/quiz")
```

Routing w SPA zmienia adres URL i widok **bez przeładowania strony** (History API).
Dzięki temu działają zakładki, linki i przyciski wstecz/dalej.

---

## 2. Stan aplikacji: podnoszenie, Context, reducer, Redux

### 2.1 Podnoszenie stanu

Gdy dwa komponenty muszą mieć ten sam stan, przenieś go do **najbliższego wspólnego rodzica**
i przekaż w dół przez props (wartość + funkcję zmieniającą).

### 2.2 Context: unikanie „prop drilling”

```jsx
const ThemeContext = createContext("light");

<ThemeContext value={theme}>           {/* w starszych wersjach: <ThemeContext.Provider value=...> */}
  <App />
</ThemeContext>

const theme = useContext(ThemeContext);  // w dowolnym potomku
```

Dobre do danych „globalnych”: motyw, zalogowany użytkownik, język.

### 2.3 `useReducer`

```jsx
function reducer(state, action) {
  switch (action.type) {
    case "added":   return [...state, action.todo];
    case "deleted": return state.filter((t) => t.id !== action.id);
    default: throw new Error("Nieznana akcja " + action.type);
  }
}
const [todos, dispatch] = useReducer(reducer, []);
dispatch({ type: "added", todo });
```

Reducer to **czysta funkcja** `(stan, akcja) => nowyStan`. To ta sama idea, na której opiera się Redux.

### 2.4 Redux: zasady

1. **Jedno źródło prawdy:** cały globalny stan w jednym **store**.
2. **Stan tylko do odczytu:** zmienia się wyłącznie przez wysłanie **akcji** (`{ type, payload }`).
3. **Zmiany przez czyste funkcje:** **reducery** liczą nowy stan z poprzedniego i akcji.

Przepływ jest **jednokierunkowy**: UI → `dispatch(akcja)` → reducer → nowy stan w store → UI się przerysowuje.

**Kiedy Redux:** dużo stanu współdzielonego przez wiele odległych komponentów, częste i złożone aktualizacje,
potrzeba narzędzi do debugowania (Redux DevTools). W małej aplikacji wystarczy `useState` + Context.

### 2.5 Redux Toolkit (zalecany sposób pisania Reduxa)

```js
import { configureStore, createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchModules = createAsyncThunk("modules/fetch", async () => {
  const res = await fetch("/api/modules");
  return res.json();
});

const modulesSlice = createSlice({
  name: "modules",
  initialState: { items: [], status: "idle" },
  reducers: {
    toggleTopic(state, action) {                     // Immer: „mutacja” jest bezpieczna
      const m = state.items.find((x) => x.id === action.payload.moduleId);
      m.done[action.payload.index] = !m.done[action.payload.index];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchModules.pending, (state) => { state.status = "loading"; })
      .addCase(fetchModules.fulfilled, (state, action) => {
        state.status = "ready";
        state.items = action.payload;
      });
  },
});

export const { toggleTopic } = modulesSlice.actions;
export const store = configureStore({ reducer: { modules: modulesSlice.reducer } });
```

```jsx
// React-Redux
<Provider store={store}><App /></Provider>

const items = useSelector((s) => s.modules.items);
const dispatch = useDispatch();
dispatch(toggleTopic({ moduleId: "m8", index: 0 }));
```

### 2.6 Programowanie reaktywne (U2)

- **Reaktywność:** program reaguje na **strumienie** zdarzeń i danych (kliknięcia, dane z serwera, wiadomości WebSocket, timery).
- **Observable** (RxJS) to strumień wartości w czasie. Subskrybent dostaje `next`, `error`, `complete`. Operatory (`map`, `filter`, `debounceTime`) tworzą nowe strumienie. Subskrypcję trzeba zakończyć (`unsubscribe`).
- Porównanie: **Promise** = jedna przyszła wartość, **Observable** = 0…∞ wartości, leniwy (rusza dopiero po subskrypcji).
- W React podobną rolę pełni model „stan → render”: zmiana stanu automatycznie przerysowuje UI.

```js
import { fromEvent, map, filter, debounceTime } from "rxjs";

fromEvent(input, "input")
  .pipe(map((e) => e.target.value), debounceTime(300), filter((q) => q.length > 2))
  .subscribe((q) => search(q));
```

---

## 3. Architektura serwera: monolit vs mikroserwisy

### 3.1 Definicje

- **Monolit:** cała aplikacja (UI/API, logika, dostęp do danych) to **jedna jednostka wdrożeniowa**, zwykle z jedną bazą danych.
- **Mikroserwisy:** aplikacja to zestaw **małych, niezależnie wdrażanych usług**. Każda odpowiada za jeden obszar biznesowy (np. użytkownicy, zamówienia, płatności), ma **własne dane** i komunikuje się z innymi przez sieć (HTTP/REST, gRPC, kolejki komunikatów).

### 3.2 Porównanie

| | Monolit | Mikroserwisy |
|---|---|---|
| Wdrożenie | całość naraz | każda usługa osobno |
| Skalowanie | cała aplikacja | tylko obciążone usługi |
| Technologie | jeden stos | każda usługa może mieć inny |
| Baza danych | wspólna | osobna na usługę (*database per service*) |
| Komunikacja | wywołania funkcji w procesie | sieć (wolniejsza, zawodna) |
| Awaria | może położyć całość | izolowana (jeśli dobrze zaprojektowane) |
| Złożoność | mała na starcie, rośnie z kodem | duża od początku: sieć, monitoring, spójność danych |
| Zespoły | jeden kod dla wszystkich | zespół na usługę |
| Testowanie | prostsze end-to-end | trudniejsze integracyjne |

### 3.3 Najważniejsze wzorce

| Wzorzec | Na czym polega |
|---|---|
| **API Gateway** | jeden punkt wejścia dla klientów; przekierowuje żądania do usług, robi uwierzytelnianie i limity |
| **Database per service** | usługa nie sięga do bazy innej usługi, tylko do jej API |
| **Service discovery** | usługi znajdują się nawzajem dynamicznie (adresy się zmieniają) |
| **Komunikacja asynchroniczna** | zdarzenia przez brokera (np. RabbitMQ, Kafka) zamiast łańcucha wywołań HTTP |
| **Circuit breaker** | gdy usługa nie odpowiada, przestajemy ją odpytywać i zwracamy odpowiedź awaryjną |
| **Konteneryzacja** | każda usługa w kontenerze (Docker), orkiestracja (Kubernetes) |

### 3.4 Kiedy co

- Mały projekt, mały zespół, nowy produkt → **monolit** (dobrze podzielony na moduły).
- Duży system, wiele zespołów, różne potrzeby skalowania → **mikroserwisy**.
- Częsta praktyka: zacząć od monolitu i wydzielać usługi, gdy pojawi się realna potrzeba.

### 3.5 Przykład dla naszej aplikacji

```
            ┌──────────────┐
 React SPA ─┤ API Gateway  ├─ /api/modules → content-service (moduły, quiz)  ─ baza A
            │  :3000       ├─ /api/results → results-service (wyniki)        ─ baza B
            └──────────────┘─ /api/auth    → auth-service (logowanie, JWT)   ─ baza C
```

---

## 4. REST vs SOAP (i GraphQL)

### 4.1 REST (Representational State Transfer)

Styl architektury API oparty o HTTP:
- **Zasoby** identyfikowane przez URI: `/api/modules`, `/api/modules/m8`.
- **Metody HTTP** określają operację (GET, POST, PUT, PATCH, DELETE).
- **Bezstanowość:** każde żądanie zawiera wszystko, czego serwer potrzebuje (np. token); serwer nie pamięta sesji między żądaniami.
- **Reprezentacje:** zwykle JSON.
- **Kody statusu** mówią o wyniku (§5).
- Architektura **klient–serwer**, możliwość cache'owania, interfejs jednolity.

**Dobre praktyki nazewnictwa:** rzeczowniki w liczbie mnogiej (`/users`, nie `/getUsers`), zagnieżdżenie relacji
(`/users/5/orders`), filtrowanie przez parametry (`/products?category=laptop&sort=price`), wersjonowanie (`/api/v1/...`).

### 4.2 SOAP (Simple Object Access Protocol)

- **Protokół** (nie styl) wymiany komunikatów w **XML**.
- Komunikat to **koperta** (`Envelope`) z `Header` i `Body`.
- Kontrakt usługi opisuje plik **WSDL** (jakie operacje, jakie typy).
- Zwykle przez HTTP POST; standardy bezpieczeństwa i transakcji (WS-Security, WS-*).
- Używany w systemach korporacyjnych, bankowych i administracji.

```xml
<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope">
  <soap:Body>
    <GetModule><Id>m8</Id></GetModule>
  </soap:Body>
</soap:Envelope>
```

### 4.3 Porównanie

| | REST | SOAP |
|---|---|---|
| Typ | styl architektoniczny | protokół |
| Format | dowolny, zwykle JSON | tylko XML |
| Kontrakt | opcjonalny (np. OpenAPI) | obowiązkowy WSDL |
| Transport | HTTP | HTTP, SMTP i inne |
| Operacje | metody HTTP na zasobach | wywołania operacji (RPC) |
| Wydajność | lżejszy, łatwo cache'ować | cięższy (XML, koperta) |
| Typowe użycie | web, mobile, SPA, mikroserwisy | systemy korporacyjne, finanse |

### 4.4 GraphQL (dla porównania)

Jeden endpoint i **klient sam określa, jakie pola chce dostać** (brak nadmiaru i niedoboru danych).
Wymaga schematu typów po stronie serwera.

---

## 5. HTTP: metody i kody statusu (MDN)

### 5.1 Metody

| Metoda | Do czego | Bezpieczna* | Idempotentna** |
|---|---|---|---|
| GET | pobranie zasobu | tak | tak |
| HEAD | jak GET, ale tylko nagłówki | tak | tak |
| POST | utworzenie / wysłanie danych | nie | **nie** |
| PUT | zastąpienie całego zasobu | nie | tak |
| PATCH | częściowa zmiana | nie | nie (zwykle) |
| DELETE | usunięcie | nie | tak |
| OPTIONS | jakie metody są dozwolone (np. CORS preflight) | tak | tak |

\* nie zmienia stanu serwera. \** wielokrotne wykonanie daje ten sam efekt co jednorazowe.

### 5.2 Kody statusu

| Klasa | Znaczenie | Najważniejsze |
|---|---|---|
| 1xx | informacyjne | 101 Switching Protocols (np. WebSocket) |
| 2xx | sukces | **200 OK**, **201 Created**, **204 No Content** |
| 3xx | przekierowanie | 301 Moved Permanently, 302 Found, 304 Not Modified |
| 4xx | błąd klienta | **400 Bad Request**, **401 Unauthorized** (brak uwierzytelnienia), **403 Forbidden** (brak uprawnień), **404 Not Found**, 409 Conflict, 422 Unprocessable Content, 429 Too Many Requests |
| 5xx | błąd serwera | **500 Internal Server Error**, 502 Bad Gateway, 503 Service Unavailable |

### 5.3 Nagłówki, które warto znać

`Content-Type`, `Accept`, `Authorization: Bearer <token>`, `Cache-Control`, `Set-Cookie` / `Cookie`, `Location` (przy 201/3xx),
`Access-Control-Allow-Origin` (CORS: przeglądarka blokuje zapytania do innej domeny, jeśli serwer na to nie pozwoli).

---

## 6. WebSockety (MDN)

- **Stałe, dwukierunkowe (full-duplex) połączenie** klient–serwer w jednym połączeniu TCP.
- Zaczyna się od zwykłego żądania HTTP z nagłówkiem `Upgrade: websocket`; serwer odpowiada **101 Switching Protocols**.
- Adresy `ws://` i `wss://` (szyfrowane).
- Zastosowania: czat, powiadomienia na żywo, gry wieloosobowe, kursy giełdowe, wspólna edycja.

| Technika | Kierunek | Opis |
|---|---|---|
| Polling | klient → serwer | klient pyta co X sekund (marnuje zapytania) |
| Long polling | klient → serwer | serwer trzyma żądanie, aż ma dane |
| Server-Sent Events | serwer → klient | jednokierunkowy strumień przez HTTP |
| **WebSocket** | **w obie strony** | stałe połączenie, niskie opóźnienia |

```js
// klient (przeglądarka)
const ws = new WebSocket("ws://localhost:3000");
ws.addEventListener("open", () => ws.send(JSON.stringify({ type: "join", room: "wdai" })));
ws.addEventListener("message", (e) => console.log(JSON.parse(e.data)));
ws.addEventListener("close", () => console.log("rozłączono"));
```

```js
// serwer (Node, biblioteka ws)
import { WebSocketServer } from "ws";
const wss = new WebSocketServer({ port: 3000 });
wss.on("connection", (socket) => {
  socket.on("message", (msg) => {
    for (const client of wss.clients) client.send(msg.toString());   // rozgłoszenie do wszystkich
  });
});
```

W React połączenie otwiera się w `useEffect`, a zamyka w cleanup (`return () => ws.close()`).

---

## 7. Node.js + Express

### 7.1 Node.js

- **Środowisko uruchomieniowe JavaScriptu poza przeglądarką** (silnik V8).
- **Jednowątkowa pętla zdarzeń + nieblokujące I/O:** operacje plikowe i sieciowe nie blokują programu, tylko zgłaszają wynik callbackiem lub Promise. Dzięki temu jeden proces obsługuje wiele połączeń.
- Dobre do: API, aplikacji czasu rzeczywistego, mikroserwisów, narzędzi CLI. Słabsze do ciężkich obliczeń CPU.
- **npm:** `npm init -y` tworzy `package.json`; `npm install express` dodaje zależność; `node_modules` nie trafia do repo (`.gitignore`).
- **Stos MEAN** (książka Dickeya): MongoDB + Express + Angular + Node. **MERN** to to samo z React zamiast Angulara.

### 7.2 Express

```js
import express from "express";
import cors from "cors";

const app = express();

// middleware: funkcje (req, res, next) w łańcuchu przed trasą
app.use(cors());                          // pozwala na zapytania z frontu z innego portu
app.use(express.json());                  // parsuje body JSON → req.body
app.use((req, res, next) => {             // własny middleware: logowanie
  console.log(req.method, req.url);
  next();                                 // przekazanie dalej
});

// router: grupowanie tras
const router = express.Router();
router.get("/", (req, res) => res.json(modules));
router.get("/:id", (req, res) => {
  const m = modules.find((x) => x.id === req.params.id);    // parametr ścieżki
  if (!m) return res.status(404).json({ error: "Nie znaleziono" });
  res.json(m);
});
router.post("/", (req, res) => {
  if (!req.body.title) return res.status(400).json({ error: "Brak tytułu" });   // walidacja
  const m = { id: crypto.randomUUID(), ...req.body };
  modules.push(m);
  res.status(201).json(m);
});
app.use("/api/modules", router);

// parametry zapytania: /api/search?q=react → req.query.q

// obsługa błędów: middleware z 4 argumentami, na końcu
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Błąd serwera" });
});

app.listen(process.env.PORT ?? 3000);
```

### 7.3 Autentykacja

| Sposób | Jak działa |
|---|---|
| **Sesja + cookie** | serwer przechowuje sesję, przeglądarka wysyła identyfikator w ciasteczku |
| **Token (JWT)** | serwer wydaje podpisany token, klient wysyła go w `Authorization: Bearer ...`; serwer nie trzyma stanu (pasuje do REST i mikroserwisów) |

- **Uwierzytelnianie** (kim jesteś) ≠ **autoryzacja** (co ci wolno, np. role admin/edytor/czytelnik).
- Hasła przechowuje się jako **hash** (np. bcrypt), nigdy jawnym tekstem.
- Sekrety trzymaj w zmiennych środowiskowych (`.env` w `.gitignore`).

### 7.4 Backend-as-a-Service

Gotowy backend w chmurze (np. **Firebase**: baza, uwierzytelnianie, hosting).
Szybki start bez własnego serwera, ale mniejsza kontrola i uzależnienie od dostawcy.

---

## 8. Bootstrap

- Framework CSS z gotowym **systemem siatki**, **komponentami** i **klasami pomocniczymi**. Wersja 5 nie wymaga jQuery.
- Podłączenie: CDN (link CSS + skrypt JS bundle) albo `npm install bootstrap`.

### 8.1 Siatka (12 kolumn, mobile-first)

```html
<div class="container">
  <div class="row g-3">                        <!-- g-3: odstępy między kolumnami -->
    <div class="col-12 col-md-6 col-lg-4">A</div>   <!-- telefon: 12/12, tablet: 6/12, desktop: 4/12 -->
    <div class="col-12 col-md-6 col-lg-4">B</div>
    <div class="col-12 col-md-12 col-lg-4">C</div>
  </div>
</div>
```

| Breakpoint | Prefiks | Od szerokości |
|---|---|---|
| bardzo małe | (brak) | < 576px |
| small | `sm` | ≥ 576px |
| medium | `md` | ≥ 768px |
| large | `lg` | ≥ 992px |
| extra large | `xl` | ≥ 1200px |
| extra extra large | `xxl` | ≥ 1400px |

Klasa z prefiksem działa **od tego breakpointu w górę** (mobile-first).

### 8.2 Komponenty i klasy pomocnicze

```html
<nav class="navbar navbar-expand-lg bg-body-tertiary">...</nav>

<div class="card" style="width: 18rem;">
  <img src="..." class="card-img-top" alt="..." />
  <div class="card-body">
    <h5 class="card-title">Moduł M8</h5>
    <p class="card-text">React: podstawy</p>
    <a href="#" class="btn btn-primary">Ucz się</a>
  </div>
</div>

<div class="d-flex justify-content-between align-items-center p-3 mb-2 bg-light rounded">...</div>
```

- Odstępy: `m-*`, `p-*`, `mt-3`, `px-2` (skala 0–5).
- Flex: `d-flex`, `justify-content-*`, `align-items-*`.
- Widoczność: `d-none d-md-block` (ukryte na telefonie, widoczne od md).
- Komponenty: navbar, card, button, alert, modal, form-control, table, badge.
- W React są gotowe komponenty w bibliotece **React-Bootstrap**.

**Plusy:** szybkie prototypowanie, responsywność „z pudełka”, spójny wygląd.
**Minusy:** strony wyglądają podobnie, duży CSS, jeśli nie usuniesz nieużywanych stylów.

---

## 9. TypeScript + Angular (przegląd)

### 9.1 TypeScript

- **JavaScript + statyczne typy**, kompilowany do JS. Błędy typów wychodzą przed uruchomieniem.

```ts
let title: string = "React";
let scores: number[] = [5, 7];
let pair: [string, number] = ["m8", 7];             // krotka
type Status = "idle" | "loading" | "ready";         // unia literałów

interface Module {
  id: string;
  title: string;
  topics: string[];
  done?: boolean[];                                 // opcjonalne
}

function percent(done: number, total: number): number {
  return Math.round((done / total) * 100);
}

function first<T>(items: T[]): T | undefined {      // generyk
  return items[0];
}
```

### 9.2 Angular w skrócie

- Pełny **framework** (Google) w TypeScript. W zestawie: router, HTTP, formularze, DI, CLI (`ng new`, `ng serve`, `ng generate component`).
- **Komponent** = klasa TS + szablon HTML + style.
- **Wiązanie danych:** `{{ wartość }}` (interpolacja), `[prop]="wyrażenie"` (właściwość), `(click)="metoda()"` (zdarzenie), `[(ngModel)]` (dwukierunkowe).
- **Usługi + wstrzykiwanie zależności (DI):** logika i dostęp do danych poza komponentem.
- **Signals** do reaktywnego stanu; RxJS do strumieni (np. HttpClient zwraca Observable).

```ts
@Component({
  selector: "app-counter",
  template: `
    <p>Licznik: {{ count() }}</p>
    <button (click)="inc()">+1</button>
    @if (count() > 5) { <p>Dużo!</p> }
  `,
})
export class CounterComponent {
  count = signal(0);
  inc() { this.count.update((c) => c + 1); }
}
```

### 9.3 React vs Angular

| | React | Angular |
|---|---|---|
| Typ | biblioteka UI | kompletny framework |
| Język | JS lub TS, JSX | TypeScript, szablony HTML |
| Routing, HTTP, formularze | osobne biblioteki | wbudowane |
| Stan | `useState`, Context, Redux | signals, usługi, RxJS |
| Wiązanie danych | jednokierunkowe | jedno- i dwukierunkowe |
| Krzywa nauki | łagodniejsza | bardziej stroma |

**MVVM** (idea za Angularem): **Model** (dane), **View** (szablon), **ViewModel** (stan widoku + logika prezentacji),
połączone automatycznym **wiązaniem danych**.

---

## 10. Testowanie aplikacji

### 10.1 Piramida testów

```
        /\        E2E — mało, wolne, testują całość w przeglądarce (Playwright, Cypress)
       /  \
      /----\      Integracyjne — komponenty z zależnościami, API + baza (React Testing Library, Supertest)
     /      \
    /--------\    Jednostkowe — dużo, szybkie, pojedyncze funkcje (Vitest, Jest)
```

| Rodzaj | Co sprawdza | Przykład |
|---|---|---|
| Jednostkowe | jedna funkcja w izolacji | `percent(3, 4) === 75` |
| Komponentów | komponent tak, jak widzi go użytkownik | kliknięcie odwraca fiszkę |
| API / integracyjne | endpoint z prawdziwym routingiem | `POST /api/results` zwraca 201 |
| E2E | cały scenariusz w przeglądarce | użytkownik rozwiązuje quiz i widzi wynik |
| Manualne / akceptacyjne | zgodność z wymaganiami | lista wymagań Projektu 1 |

### 10.2 Struktura testu: AAA

**Arrange** (przygotuj dane) → **Act** (wykonaj) → **Assert** (sprawdź).

### 10.3 Vitest (testy jednostkowe)

```js
import { describe, it, expect } from "vitest";
import { percent } from "./progress.js";

describe("percent", () => {
  it("liczy procent", () => {
    const done = 3, total = 4;          // Arrange
    const result = percent(done, total); // Act
    expect(result).toBe(75);             // Assert
  });
});
```

### 10.4 React Testing Library

Zasada: **testuj tak, jak używa aplikacji człowiek**. Szukaj elementów po roli i tekście (`getByRole`, `getByLabelText`),
a nie po klasach CSS czy szczegółach implementacji.

```jsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

it("odwraca fiszkę po kliknięciu", async () => {
  render(<Flashcard front="Pytanie" back="Odpowiedź" />);
  await userEvent.click(screen.getByRole("button", { name: "Pytanie" }));
  expect(screen.getByText("Odpowiedź")).toBeInTheDocument();
});
```

### 10.5 Test API (Supertest)

```js
import request from "supertest";
import { app } from "./app.js";

it("POST /api/results tworzy wynik", async () => {
  const res = await request(app).post("/api/results").send({ module: "m8", score: 7 });
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
});
```

### 10.6 Inne pojęcia

- **Mock / stub:** podmiana zależności (np. `fetch`) na kontrolowaną atrapę.
- **Pokrycie kodu (coverage):** jaki procent kodu wykonały testy. Pomocne, ale nie gwarantuje jakości.
- **TDD:** najpierw test (czerwony), potem kod (zielony), na koniec refaktor.
- **CI:** testy uruchamiane automatycznie przy każdym pushu (np. GitHub Actions).

---

## 11. Pytania kontrolne

**React**
1. Czym różnią się props od stanu?
2. Dlaczego `setCount(count + 1)` dwa razy z rzędu zwiększa licznik tylko o 1?
3. Do czego służy `key` w listach i dlaczego indeks bywa złym kluczem?
4. Kiedy użyć `useEffect`, a kiedy policzyć wartość w trakcie renderu?
5. Co robi funkcja zwracana z `useEffect`?
6. Jakie są zasady hooków?
7. Co to znaczy, że komponent musi być czysty?

**Stan / Redux**
8. Wymień 3 zasady Reduxa.
9. Kiedy wystarczy Context, a kiedy warto użyć Reduxa?
10. Czym różni się Promise od Observable?

**Serwer / architektura**
11. Podaj 3 zalety i 3 wady mikroserwisów względem monolitu.
12. Do czego służy API Gateway?
13. Czym REST różni się od SOAP (format, kontrakt, typ)?
14. Które metody HTTP są idempotentne?
15. 401 vs 403: jaka różnica?
16. Czym jest middleware w Expressie?
17. Dlaczego Node.js dobrze radzi sobie z wieloma połączeniami?
18. Kiedy WebSocket zamiast zwykłego fetch?

**Bootstrap / Angular / testy**
19. Co oznacza `col-12 col-md-6`?
20. Wymień 4 rodzaje wiązania danych w Angularze.
21. Narysuj piramidę testów i podaj narzędzie dla każdego poziomu.
22. Co oznacza AAA w testach?
