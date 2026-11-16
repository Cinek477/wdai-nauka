# WDAI — Strona do nauki (projekt)

Plan aplikacji webowej do nauki przedmiotu **Wprowadzenie do Aplikacji Internetowych**
(Informatyka, semestr 3, **2026/2027**, kod WIINFS.Ii4.08695.26).
Dokument opisuje **co** i **jak** zbudujemy. Kodu strony jeszcze nie ma.

> **Zasada:** zakres wyznacza **sylabus 2026/27** i bieżące materiały z laboratoriów.
> Z wykładów z 2022 bierzemy tylko treści nadal aktualne; przestarzałe pominęliśmy.
> Wiedza z literatury do tematów bez slajdów (React, Redux, mikroserwisy, REST/SOAP, WebSockety, Bootstrap, testy) jest w [NOTATKI.md](NOTATKI.md).
> Szkice ekranów z opisem działania i składni są w [MOCKUP.md](MOCKUP.md).

---

## 0. Przedmiot według sylabusa

| | |
|---|---|
| Godziny | Wykład 14 h + laboratorium 14 h (7 spotkań po 2 h); łącznie 90 h pracy, w tym ~35 h samodzielnej nauki |
| Zaliczenie | **Ocena końcowa = ocena z laboratorium** (ćwiczenia cząstkowe + mini projekt) |
| Weryfikacja | aktywność, ćwiczenia, kolokwium (ustne/pisemne), projekt, odpowiedź ustna; zaliczenie przez zaprezentowanie rozwiązania |
| Nieobecności | 1 nieusprawiedliwiona OK, każda kolejna −1 stopień, >3 = brak zaliczenia; można odrobić z inną grupą |
| Literatura obowiązkowa | J. Duckett „HTML i CSS. Zaprojektuj i zbuduj witrynę WWW”, **MDN**, **W3Schools**, **react.dev** |
| Literatura dodatkowa | J. Dickey „Nowoczesne aplikacje internetowe. MongoDB, Express, Angular, Node.js” |

### Treści programowe

| Laboratorium | Wykład |
|---|---|
| 1. HTML, CSS: prosta statyczna strona (mikro projekt) | 1. Podstawy HTML, CSS, JS |
| 2. Mikro projekt, ciąg dalszy | 2. SPA, HTTP, REST, architektura aplikacji internetowej |
| 3. JS | 3. Frameworki: **Bootstrap, React, React + Redux, Angular** |
| 4. **Podstawy React** | 4. Architektura serwera, **mikroserwisy** |
| 5. **Serwer, mikroserwisy**, mini projekt | 5. **Testowanie aplikacji** |
| 6. Mini projekt | |
| 7. Mini projekt | |

### Efekty uczenia się

| Kod | Treść |
|---|---|
| W1 | Technologie budowy aplikacji: HTML5, CSS3 |
| W2 | JavaScript i jego **wieloparadygmatowość** (imperatywny, obiektowy, funkcyjny, zdarzeniowy) |
| W3 | **Komponentowe** środowiska tworzenia aplikacji w JS |
| W4 | Architektura **SPA** |
| W5 | **Serwer monolityczny vs mikroserwisy**, HTTP, **REST, SOAP** |
| U1 | Zaprojektować i zbudować aplikację SPA we frameworku komponentowym |
| U2 | Programowanie **reaktywne, asynchroniczne, WebSockety** |
| U3 | Zbudować podstawową aplikację serwerową |

**Wniosek:** główny framework na labach to **React** (lab 4 + react.dev w literaturze).
Angular jest tylko w przeglądzie frameworków na wykładzie. Mini projekt najpewniej będzie SPA + serwer (U1 + U3).

## 1. Źródła

| Materiał | Co z niego bierzemy |
|---|---|
| Sylabus 2026/27 | program, efekty, zaliczenie (**wiążący**) |
| Lab 1, Projekt 1, Lab 3 (2025) | zadania i punktacja (**wiążące**) |
| Literatura z sylabusa | React, Redux, serwer, mikroserwisy, testy itd. → [NOTATKI.md](NOTATKI.md) |
| Wykład M. Jarosza | HTML, CSS, priorytet stylów, JS, DOM |
| W1–W3 (2022) | architektura, HTTP, SPA, HTML5, semantyka, formularze, CSS, kaskada, box model, Flexbox, Grid, RWD |
| W4 (2022) | JS: typy, `let`/`const`, pętle, funkcje, zdarzenia, DOM, tablice, JSON, fetch, Promise, `async`/`await` |
| W5–W6 (2022) | idee: po co frameworki, MVVM, komponenty, TypeScript, usługi i DI, routing, Observable |
| W7 (2022) | rola backendu w SPA, Node.js, Express, REST API |

**Brak materiałów do:** Lab 2, Lab 4 (React), Lab 5–7 (wg sylabusa: mikro projekt cd., React, serwer, mini projekt).

## 2. Cel

1. Uczyć się zgodnie z sylabusem, w rytmie laboratoriów, i śledzić postępy.
2. Sama aplikacja jest **ćwiczeniem** i rośnie razem z przedmiotem:
   - **wersja 1 — vanilla HTML/CSS/JS** (Lab 1–3, mikro projekt): spełnia wymagania Projektu 1,
   - **wersja 2 — React** (Lab 4): ten sam front przepisany na komponenty,
   - **wersja 3 — React + serwer Express (REST)** (Lab 5–7): kandydat na **mini projekt** (SPA + serwer = U1 + U3),
     jeśli prowadzący dopuści własny temat.

## 3. Technologia

| Wersja | Stos |
|---|---|
| 1 | HTML5, CSS3 (Flex/Grid, media queries, zmienne), JavaScript (moduły ES); localStorage; GitHub Pages |
| 2 | React (komponenty funkcyjne, hooki), Vite, React Router; opcjonalnie Redux Toolkit |
| 3 | Node.js + Express (REST API, JSON), plik JSON lub prosta baza; testy: Vitest + React Testing Library, testy API |

Narzędzia: VS Code + Live Server + Prettier (Lab 1), Git + GitHub, DevTools.

## 4. Mapa strony

```
Start          postęp, bieżący etap, skróty
Plan           plan nauki według laboratoriów
Moduł          notatki + checklista tematów
Fiszki         pytanie → odpowiedź, „umiem / nie umiem”
Quiz           pytania z wyjaśnieniami (przygotowanie do kolokwium i odpowiedzi ustnej)
Zadania        checklisty Lab 1, Projekt 1, Lab 3 (+ mini projekt) z punktacją
Narzędzia      kalkulatory: specyficzność CSS, box model
Kontakt        formularz (wymóg Projektu 1)
```

W wersji 1 każda pozycja to osobny plik HTML ze wspólnym `<header>`, `<nav>` i `<footer>`.
W wersji 2 to trasy React Routera w jednej aplikacji SPA.

## 5. Moduły nauki (według sylabusa)

| # | Moduł | Tematy | Sylabus | Materiały |
|---|---|---|---|---|
| M1 | Architektura aplikacji webowych | klient–serwer, HTTP (metody, kody statusu, nagłówki), statyczna / SSR / SPA / PWA, plusy i minusy SPA, REST + JSON, SOAP | W: 2 • W4, W5 | W1, NOTATKI §4–5 |
| M2 | HTML5 | struktura dokumentu, tagi, listy, tabele, linki, semantyka, formularze i walidacja, media, dostępność (`alt`, `label`) | L: 1–2, W: 1 • W1 | Lab 1, Projekt 1, W1–W2, Jarosz |
| M3 | CSS: podstawy | dołączanie, selektory, kaskada i specyficzność, zmienne, box model, `box-sizing`, pozycjonowanie | L: 1–2, W: 1 • W1 | W2–W3, Jarosz |
| M4 | Layout i RWD | Flexbox, Grid, media queries, mobile-first, viewport, obrazy responsywne, transition/transform | L: 1–2 • W1 | W3 |
| M5 | Bootstrap | grid 12-kolumnowy, breakpointy, komponenty, klasy pomocnicze | W: 3 | NOTATKI §8 |
| M6 | JavaScript: język | typy, `let`/`const`, zakres, funkcje i funkcje strzałkowe, obiekty i klasy, tablice (`map`/`filter`/`find`/`some`/`reduce`), destrukturyzacja, spread, moduły ES, JSON; paradygmaty: imperatywny, obiektowy, funkcyjny, zdarzeniowy | L: 3, W: 1 • W2 | W4, MDN |
| M7 | JS w przeglądarce i asynchroniczność | DOM, zdarzenia i propagacja, `defer`, Promise, `async`/`await`, fetch, localStorage, timery, canvas + `requestAnimationFrame`, WebSocket | L: 3 • U2 | Lab 3, W4, NOTATKI §6 |
| M8 | React: podstawy | Vite, JSX, komponenty, props, `useState`, zdarzenia, listy i `key`, renderowanie warunkowe, formularze kontrolowane, `useEffect` + fetch, React Router | L: 4, W: 3 • W3, U1 | NOTATKI §1 |
| M9 | Stan i programowanie reaktywne | podnoszenie stanu, Context, `useReducer`, Redux Toolkit, React-Redux; idea Observable | W: 3 • U2 | NOTATKI §2, W6 (idea Observable) |
| M10 | Angular i TypeScript (przegląd) | po co frameworki, MVVM, TypeScript (typy, interfejsy, klasy), Angular: komponenty, wiązanie danych, usługi i DI, routing | W: 3 • W3 | W5–W6 (idee), NOTATKI §9 |
| M11 | Serwer i mikroserwisy | Node.js (pętla zdarzeń, npm), Express (routing, middleware, REST CRUD), monolit vs mikroserwisy, API gateway, autentykacja (sesja vs token) | L: 5, W: 4 • W5, U3 | W7, NOTATKI §3, §7 |
| M12 | Testowanie aplikacji | piramida testów, testy jednostkowe, testy komponentów, testy API, E2E | W: 5 | NOTATKI §10 |

Każdy moduł w aplikacji ma: **notatki**, **checklistę tematów**, **fiszki** i **pytania do quizu**.

## 6. Plan nauki (według laboratoriów)

Daty dopiszemy, gdy będzie znany harmonogram zajęć.

| Etap | Laboratorium | Moduły | Zadania | Wersja aplikacji |
|---|---|---|---|---|
| 1 | Lab 1: HTML, CSS | M1, M2, M3 | Lab 1 (5 pkt), start Projektu 1 | v1: szkielet podstron |
| 2 | Lab 2: mikro projekt | M4, (M5) | Projekt 1: formularz, galeria, wygląd, RWD, publikacja | v1: layout, RWD, Pages |
| 3 | Lab 3: JS | M6, M7 | Lab 3 ćwiczenia (5 pkt), zadanie domowe (5 pkt), JS w Projekcie 1 | v1: fiszki, quiz, postęp |
| 4 | Lab 4: React | M8, M9 | ćwiczenia z React (treść nieznana) | v2: przepisanie na React |
| 5 | Lab 5: serwer, mikroserwisy | M11 | serwer Express + REST | v3: API |
| 6–7 | Lab 6–7: mini projekt | M10, M12, powtórka | mini projekt (specyfikacja nieznana) | v3: integracja, testy, prezentacja |

## 7. Funkcje aplikacji

| Funkcja | Opis | Konstrukcje, które ćwiczy |
|---|---|---|
| Plan nauki | Etapy powiązane z labami i modułami | generowanie DOM z tablicy / `map` w JSX |
| Notatki modułu | Treść i przykłady kodu | semantyczny HTML, `<details>`, `<pre><code>` |
| Checklista tematów | Odhaczanie, pasek postępu | checkbox, `<progress>`, localStorage / `useState` |
| Fiszki | Odwracanie, „umiem / nie umiem”, tasowanie | `classList.toggle` / stan, transform, transition |
| Quiz | Pytania, wynik, wyjaśnienia, najlepszy wynik | tablice, zdarzenia, JSON |
| Zadania | Checklisty z punktami | `filter` + `reduce` |
| Narzędzia | Kalkulatory specyficzności i box modelu | formularze, obliczenia, walidacja |
| Motyw jasny/ciemny | Przełącznik zapamiętywany | zmienne CSS, `data-theme`, localStorage |
| Kontakt | Formularz z walidacją | `required`, `type="email"`, `<label>`, `preventDefault` |
| API wyników *(v3)* | Zapis wyników quizu na serwerze | fetch POST, Express, REST, kody statusu |

## 8. Pokazowe konstrukcje językowe

Więcej przykładów do React, Redux, Express, WebSocketów i testów jest w [NOTATKI.md](NOTATKI.md).

### 8.1 HTML: szkielet podstrony (v1)

```html
<!DOCTYPE html>
<html lang="pl">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>WDAI — Plan nauki</title>
    <link rel="stylesheet" href="css/style.css" />
    <script type="module" src="js/app.js"></script>  <!-- moduły ES są domyślnie odroczone (jak defer) -->
  </head>
  <body>
    <header>
      <h1>WDAI — nauka</h1>
      <nav aria-label="Główna nawigacja">
        <a href="index.html" aria-current="page">Start</a>
        <a href="plan.html">Plan</a>
        <a href="quiz.html">Quiz</a>
      </nav>
    </header>
    <main>
      <section aria-labelledby="etap1">
        <h2 id="etap1">Etap 1</h2>
        <article class="card">...</article>
      </section>
    </main>
    <footer>Imię Nazwisko</footer>
  </body>
</html>
```

### 8.2 HTML: formularz z walidacją (Projekt 1)

```html
<form id="contact">
  <label for="email">E-mail</label>
  <input id="email" name="email" type="email" placeholder="jan@example.com" required />

  <label for="topic">Temat</label>
  <select id="topic" name="topic" required>
    <option value="">— wybierz —</option>
    <option>Błąd w notatkach</option>
    <option>Pytanie do quizu</option>
    <option>Inne</option>
  </select>

  <label for="msg">Wiadomość</label>
  <textarea id="msg" name="msg" placeholder="Twoja wiadomość" minlength="10" required></textarea>

  <button type="submit">Wyślij</button>
</form>
```

### 8.3 CSS: zmienne, motyw, Grid + mobile-first

```css
:root { --bg: #fafafa; --text: #1d1d1f; --accent: #2a9d8f; }
[data-theme="dark"] { --bg: #16181d; --text: #e8e8e8; }

*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; background: var(--bg); color: var(--text); }

.page { display: grid; grid-template-areas: "header" "main" "footer"; min-height: 100dvh; }

@media (min-width: 768px) {
  .page {
    grid-template-columns: 220px 1fr;
    grid-template-areas: "header header" "nav main" "footer footer";
  }
}

.cards { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 1rem; }
nav { display: flex; flex-wrap: wrap; gap: 0.5rem; }

.flashcard { transition: transform 0.4s ease; }
.flashcard.flipped { transform: rotateY(180deg); }

@media (prefers-reduced-motion: reduce) { .flashcard { transition: none; } }
```

### 8.4 JS: język i paradygmaty (M6)

```js
// const domyślnie, let gdy wartość się zmienia
const modules = [];
modules.push({ id: "m6" });        // OK: const blokuje przypisanie, nie zawartość

// typy proste przez wartość, obiekty przez referencję
const a = { n: 1 };
const b = a;
b.n = 2;                           // a.n === 2
const c = structuredClone(a);      // głęboka kopia

// for...in: klucze, for...of: wartości
const car = { marka: "Fiat", cena: 27000 };
for (const key in car) console.log(key, car[key]);
for (const [key, value] of Object.entries(car)) console.log(key, value);

// destrukturyzacja, spread, szablony stringów, parametry domyślne, ?. i ??
const { marka, rocznik = 2020 } = car;
const all = [...modules, { id: "m7" }];
const label = (m, prefix = "Moduł") => `${prefix} ${m.id}`;
const title = data?.module?.title ?? "Bez tytułu";

// paradygmat funkcyjny: funkcje czyste + metody tablic
const percent = (done, total) => Math.round((done / total) * 100);
const passed = results.filter((r) => r.score >= 5).map((r) => r.module);

// paradygmat obiektowy: klasa
class Quiz {
  #answers = [];                                   // pole prywatne
  constructor(questions) { this.questions = questions; }
  answer(i) { this.#answers.push(i); }
  get score() {
    return this.questions.filter((q, i) => q.answer === this.#answers[i]).length;
  }
}

// moduły ES
export const KEY = "wdai-progress";
import { KEY } from "./storage.js";
```

### 8.5 JS: DOM i zdarzenia (M7)

```js
function renderTopics(module, progress) {
  const list = document.querySelector("#topics");
  list.replaceChildren();                                // wyczyszczenie listy

  module.topics.forEach((topic, i) => {
    const li = document.createElement("li");
    const box = document.createElement("input");
    box.type = "checkbox";
    box.checked = progress[module.id]?.[i] === true;
    box.addEventListener("change", () => {
      progress[module.id] = { ...progress[module.id], [i]: box.checked };
      saveProgress(progress);
    });
    li.append(box, ` ${topic}`);                          // tekst, nie HTML: bezpieczne wobec XSS
    list.append(li);
  });
}

// delegowanie zdarzeń: jeden listener na rodzicu dzięki propagacji
document.querySelector("#quiz").addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-option]");
  if (btn) checkAnswer(Number(btn.dataset.option));
});

// klawiatura
document.addEventListener("keydown", (e) => {
  if (e.code === "Space") flipCard();
  if (e.key === "ArrowRight") nextCard();
});

// formularz
document.querySelector("#contact").addEventListener("submit", (e) => {
  e.preventDefault();
  const form = e.currentTarget;
  if (!form.checkValidity()) return form.reportValidity();
  const data = Object.fromEntries(new FormData(form));
  console.log(data);
  form.reset();
});
```

### 8.6 JS: asynchroniczność i localStorage (M7)

```js
async function getJSON(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

try {
  const data = await getJSON("data/modules.json");      // top-level await w module ES
  render(data);
} catch (err) {
  showError(err.message);
}

// równoległe zapytania
const [modules, tasks] = await Promise.all([getJSON("data/modules.json"), getJSON("data/tasks.json")]);

// localStorage
const KEY = "wdai-progress";
export function loadProgress() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) ?? {};
  } catch {
    return {};
  }
}
export const saveProgress = (p) => localStorage.setItem(KEY, JSON.stringify(p));
```

## 9. Struktura repozytorium

```
WDAI - NAUKA/
├── PROJEKT.md               ← ten dokument
├── NOTATKI.md               wiedza z literatury (React, Redux, mikroserwisy, ...)
├── README.md
├── v1-vanilla/              Lab 1–3, mikro projekt (GitHub Pages)
│   ├── index.html, plan.html, modul.html, fiszki.html, quiz.html,
│   │   zadania.html, narzedzia.html, kontakt.html
│   ├── css/style.css
│   ├── js/ (app.js, storage.js, data.js)
│   └── img/
├── v2-react/                Lab 4 (Vite + React)
└── v3-server/               Lab 5–7 (Express REST API + testy)
```

Materiałów PDF z zajęć **nie wrzucamy** do repozytorium (prawa autorskie prowadzących).

## 10. Etapy realizacji

1. **v1 szkielet**: podstrony, wspólny nav/footer, `style.css` (Grid/Flex).
2. **v1 treść**: `data.js` z modułami M1–M12 (najpierw te z etapów 1–3).
3. **v1 interakcje**: checklisty, postęp, fiszki, quiz, motyw.
4. **v1 RWD + formularz + publikacja** (GitHub Pages) → spełnia wymagania Projektu 1.
5. **v2 React** po Lab 4: komponenty, React Router, (Redux Toolkit).
6. **v3 serwer** po Lab 5: Express REST, front z v2 korzysta z API.
7. **Testy** (M12) i przygotowanie prezentacji (zaliczenie przez zaprezentowanie rozwiązania).

## 11. Do ustalenia

- Harmonogram laboratoriów, termin Projektu 1, data kolokwium (wtedy dopiszemy daty).
- Treść Lab 2, Lab 4 i specyfikacja mini projektu: gdy się pojawią, aktualizujemy moduły i plan.
- Czy prowadzący dopuszcza tę aplikację jako mini projekt (temat własny).
- Repozytorium: nazwa (propozycja `wdai-nauka`); publiczne (wymagane przez darmowe GitHub Pages) czy prywatne.
