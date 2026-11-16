# WDAI — Mockup strony do nauki

Szkice wszystkich ekranów aplikacji. Przy każdym są:
- **co gdzie jest** (numery na szkicu ①②③),
- **jak działa** (zachowanie po kliknięciu, zapis, stany),
- **jakiej składni uczy** (HTML / CSS / JS / React / Express), z krótkim przykładem.

Powiązane dokumenty: [PROJEKT.md](PROJEKT.md) (zakres, plan), [NOTATKI.md](NOTATKI.md) (teoria).

---

## 0. Założenia projektowe

### 0.1 Idea nauki

Każdy moduł prowadzi przez ten sam cykl:

```
  TEORIA ──► SKŁADNIA ──► SPRÓBUJ ──► FISZKI ──► QUIZ ──► ✔ odhaczone
  (czytam)   (kod z       (zmieniam   (pamięć)   (spr.)   (postęp)
              objaśn.)     kod, widzę
                           wynik)
```

Najważniejszy element to **blok składni z objaśnieniami**: kod, a obok podpisane fragmenty („to jest selektor”, „to jest props”).
Do tego **piaskownica** (edytor + podgląd), w której zmieniasz kod i od razu widzisz efekt.

### 0.2 Kolory, typografia, odstępy (design tokens)

| Token | Jasny | Ciemny | Do czego |
|---|---|---|---|
| `--bg` | `#f7f7f5` | `#15171c` | tło strony |
| `--surface` | `#ffffff` | `#1e2128` | karty, panele |
| `--text` | `#1d1d1f` | `#e8e8ea` | tekst |
| `--muted` | `#6b6f76` | `#9a9fa8` | opisy, podpisy |
| `--accent` | `#2a7f74` | `#4fc1b0` | linki, przyciski, postęp |
| `--html` | `#e34c26` | `#ff7a59` | znacznik tematu HTML |
| `--css` | `#2965f1` | `#6c9bff` | znacznik tematu CSS |
| `--js` | `#b8860b` | `#f0c94a` | znacznik tematu JS |
| `--react` | `#0a7ea4` | `#61dafb` | znacznik tematu React |
| `--server` | `#3c873a` | `#7bc96f` | znacznik tematu Node/Express |
| `--ok` / `--bad` | `#1f8a4c` / `#c0392b` | `#4ccf7f` / `#ff6b5e` | poprawna / błędna odpowiedź |

- Tekst: systemowy bezszeryfowy (`system-ui`), 16 px, interlinia 1.6. Kod: `ui-monospace`, 14 px.
- Odstępy w skali 4 px: 4 / 8 / 12 / 16 / 24 / 32 / 48.
- Zaokrąglenia: 8 px (przyciski), 12 px (karty).

```css
:root {
  --bg: #f7f7f5; --surface: #fff; --text: #1d1d1f; --accent: #2a7f74;
  --space-2: 8px; --space-4: 16px; --radius: 12px;
}
[data-theme="dark"] { --bg: #15171c; --surface: #1e2128; --text: #e8e8ea; --accent: #4fc1b0; }
```

**Uczy:** zmiennych CSS (`--nazwa`, `var()`), selektora atrybutu `[data-theme="dark"]`.

### 0.3 Breakpointy (mobile-first)

| Szerokość | Układ |
|---|---|
| < 768 px (telefon) | jedna kolumna, menu chowane pod przyciskiem ☰, dolny pasek skrótów |
| ≥ 768 px (tablet) | menu boczne zwinięte do ikon, treść w jednej kolumnie |
| ≥ 1024 px (desktop) | menu boczne z nazwami + treść + prawa kolumna (spis treści / postęp) |

---

## 1. Szkielet każdej strony (layout)

### Desktop (≥ 1024 px)

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ ① WDAI·nauka          ② [🔍 Szukaj tematu, np. "flexbox"...]     ③ ☀/☾   ④ 42% │
├───────────────┬──────────────────────────────────────────────┬───────────────┤
│ ⑤ NAWIGACJA   │ ⑥ GŁÓWNA TREŚĆ  <main>                        │ ⑦ PANEL BOCZNY│
│               │                                              │   <aside>     │
│ ⌂ Start       │   (zmienia się na każdej podstronie)         │               │
│ ▤ Plan        │                                              │  Na tej       │
│ ▣ Moduły      │                                              │  stronie:     │
│   M1 HTTP     │                                              │  • Teoria     │
│   M2 HTML5 ✔  │                                              │  • Składnia   │
│   M3 CSS      │                                              │  • Spróbuj    │
│   ...         │                                              │               │
│ ⧉ Fiszki      │                                              │  Postęp       │
│ ? Quiz        │                                              │  ███████░ 70% │
│ ☑ Zadania     │                                              │               │
│ ⚒ Narzędzia   │                                              │               │
│ ✉ Kontakt     │                                              │               │
├───────────────┴──────────────────────────────────────────────┴───────────────┤
│ ⑧ © 2026 Imię Nazwisko · WDAI 2026/27 · Źródła: sylabus, MDN, react.dev        │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Telefon (< 768 px)

```
┌────────────────────────────┐
│ ☰  WDAI·nauka      ☾   42% │  ← ① ③ ④, ☰ otwiera ⑤ jako wysuwany panel
├────────────────────────────┤
│                            │
│  ⑥ GŁÓWNA TREŚĆ            │  ← ⑦ panel boczny przenosi się
│                            │     pod treść (lub znika)
│                            │
├────────────────────────────┤
│  ⌂     ▤     ⧉     ?    ☑  │  ← dolny pasek skrótów
└────────────────────────────┘
```

| Nr | Element | Jak działa | Składnia, której uczy |
|---|---|---|---|
| ① | Logo | link do Startu | `<header>`, `<a href>` |
| ② | Wyszukiwarka | filtruje tematy ze wszystkich modułów na żywo, Enter otwiera pierwszy wynik | `<input type="search">`, zdarzenie `input`, `filter` + `includes` |
| ③ | Przełącznik motywu | zmienia `data-theme` na `<html>` i zapisuje wybór | `classList`/`dataset`, `localStorage` |
| ④ | Postęp ogólny | % odhaczonych tematów ze wszystkich modułów | `reduce`, `<progress>` |
| ⑤ | Nawigacja | aktywna strona podświetlona; ✔ przy ukończonych modułach | `<nav>`, `aria-current="page"`, Flexbox (kolumna) |
| ⑥ | Treść | zmienia się zależnie od strony | `<main>` |
| ⑦ | Panel boczny | spis treści strony (kotwice) + postęp modułu | `<aside>`, linki `#id`, `position: sticky` |
| ⑧ | Stopka | stała na każdej stronie (wymóg Projektu 1) | `<footer>` |

**Układ w CSS Grid:**

```css
.page {
  display: grid;
  grid-template-areas: "header" "main" "footer";        /* telefon */
  min-height: 100dvh;
}
@media (min-width: 1024px) {
  .page {
    grid-template-columns: 220px 1fr 240px;
    grid-template-areas:
      "header header header"
      "nav    main   aside"
      "footer footer footer";
  }
}
header { grid-area: header; }  nav { grid-area: nav; }
main   { grid-area: main; }    aside { grid-area: aside; position: sticky; top: 16px; }
```

**Uczy:** `grid-template-areas`, media queries, mobile-first, `position: sticky`.

---

## 2. Start (`index.html`)

```
┌──────────────────────────────────────────────────────────────┐
│ ① Cześć! Jesteś na etapie 3: Lab 3 — JavaScript              │
│    ████████████░░░░░░░░  42% całego przedmiotu               │
│    [ ▶ Kontynuuj: M7 JS w przeglądarce ]                     │
├──────────────────────────────────────────────────────────────┤
│ ② Na dziś                                                    │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐          │
│  │ 📖 Lekcja    │ │ ⧉ 12 fiszek  │ │ ☑ Lab 3      │          │
│  │ M7: fetch    │ │ do powtórki  │ │ 2/4 zadania  │          │
│  │ i async      │ │ „nie umiem”  │ │ 2.0/5.0 pkt  │          │
│  └──────────────┘ └──────────────┘ └──────────────┘          │
├──────────────────────────────────────────────────────────────┤
│ ③ Moduły                                     [Wszystkie ▾]   │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐         │
│  │HTTP   M1 │ │HTML  M2  │ │CSS   M3  │ │CSS   M4  │         │
│  │Architekt.│ │HTML5     │ │Podstawy  │ │Layout    │         │
│  │███████ ✔ │ │███████ ✔ │ │█████░░   │ │██░░░░░   │         │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘         │
│  ┌──────────┐ ┌──────────┐ ...                               │
├──────────────────────────────────────────────────────────────┤
│ ④ Ostatnie wyniki quizu: M2 8/8 · M3 5/7 · M4 4/6            │
└──────────────────────────────────────────────────────────────┘
```

| Nr | Element | Jak działa | Składnia |
|---|---|---|---|
| ① | Baner „gdzie jestem” | wylicza bieżący etap z planu i pierwszy nieukończony moduł; przycisk otwiera go | `find`, szablony stringów `` `${}` `` |
| ② | Karty „Na dziś” | lekcja = pierwszy nieukończony temat; fiszki = liczba „nie umiem”; zadania = punkty z bieżącego labu | `filter().length`, `reduce` |
| ③ | Siatka modułów | karta = moduł; kolor paska = technologia; filtr: wszystkie / w trakcie / ukończone | Grid `repeat(auto-fill, minmax(200px, 1fr))`, generowanie DOM z tablicy |
| ④ | Wyniki quizu | 3 ostatnie wyniki z `localStorage` | `slice(-3)`, `JSON.parse` |

```js
// ③ generowanie kart modułów
const grid = document.querySelector("#modules");
grid.replaceChildren(
  ...modules.map((m) => {
    const card = document.createElement("a");
    card.href = `modul.html?id=${m.id}`;
    card.className = `card card--${m.tech}`;          // card--css, card--react...
    card.innerHTML = `<small>${m.id.toUpperCase()}</small><h3></h3><progress max="100"></progress>`;
    card.querySelector("h3").textContent = m.title;   // tekst wstawiamy bezpiecznie
    card.querySelector("progress").value = percentOf(m);
    return card;
  })
);
```

---

## 3. Plan (`plan.html`)

```
┌──────────────────────────────────────────────────────────────┐
│ Plan nauki 2026/27                    Start zajęć: [📅 ...]   │
├──────────────────────────────────────────────────────────────┤
│ ● ① Etap 1 · Lab 1: HTML, CSS                  ✔ ukończony    │
│ │    M1 Architektura ✔  M2 HTML5 ✔  M3 CSS ✔                  │
│ │    ☑ Lab 1 (5.0/5.0 pkt)                                   │
│ │                                                            │
│ ● ② Etap 2 · Lab 2: mikro projekt              ◐ w trakcie    │
│ │    M4 Layout i RWD (60%)  M5 Bootstrap (0%)                 │
│ │    ☐ Projekt 1 (8.5/15 pkt)                                 │
│ │    ▸ Rozwiń szczegóły                                      │
│ │                                                            │
│ ○ ③ Etap 3 · Lab 3: JavaScript                 ○ przed nami   │
│ │    ...                                                     │
│ ○ ④ Etap 4 · Lab 4: React                                    │
│ ○ ⑤ Etap 5 · Lab 5: serwer, mikroserwisy                     │
│ ○ ⑥ Etap 6–7 · mini projekt                                  │
└──────────────────────────────────────────────────────────────┘
```

| Element | Jak działa | Składnia |
|---|---|---|
| Oś czasu | etap ma stan: ukończony / w trakcie / przed nami (z postępu modułów) | `<ol>`, pseudo-element `::before` (kropki i linia) |
| „Rozwiń szczegóły” | pokazuje cele etapu i listę tematów | `<details>` + `<summary>` (bez JS!) |
| Data startu | po ustawieniu daty przy etapach pokazują się daty spotkań (co tydzień) | `<input type="date">`, obiekt `Date` |

```css
/* oś czasu z kropkami */
.timeline li { position: relative; padding-left: 32px; border-left: 2px solid var(--muted); }
.timeline li::before {
  content: ""; position: absolute; left: -7px; top: 4px;
  width: 12px; height: 12px; border-radius: 50%; background: var(--surface);
  border: 2px solid var(--accent);
}
.timeline li.done::before { background: var(--accent); }
```

**Uczy:** `position: relative/absolute`, `::before`, `border-radius: 50%`.

---

## 4. Moduł / lekcja (`modul.html?id=m8`) — najważniejszy ekran

```
┌──────────────────────────────────────────────────────────────┐
│ ① [REACT] M8 · React: podstawy          Lab 4 · W3, U1        │
│    ██████░░░░ 6/10 tematów            [Fiszki] [Quiz]        │
├──────────────────────────────────────────────────────────────┤
│ ② Tematy                                                     │
│   ☑ JSX — zasady                                             │
│   ☑ Komponenty i props                                       │
│   ☐ Stan: useState            ← kliknięcie przewija do sekcji│
│   ...                                                        │
├──────────────────────────────────────────────────────────────┤
│ ③ TEORIA                                                     │
│   Stan to migawka. W danym renderze wartość jest stała,      │
│   a setter planuje nowy render...                            │
│   ┌ 💡 Zapamiętaj ──────────────────────────────────────┐    │
│   │ Nie mutuj obiektów w stanie — twórz nowe.            │    │
│   └──────────────────────────────────────────────────────┘    │
├──────────────────────────────────────────────────────────────┤
│ ④ SKŁADNIA                                    [📋 Kopiuj]    │
│  ┌──────────────────────────────────────┬─────────────────┐  │
│  │ const [count, setCount] = useState(0);│ ❶ zmienna stanu │  │
│  │        ❶      ❷             ❸         │ ❷ funkcja zmiany│  │
│  │                                       │ ❸ wartość pocz. │  │
│  │ <button onClick={() =>                │ ❹ przekazujemy  │  │
│  │   setCount((c) => c + 1)}>            │   FUNKCJĘ, nie  │  │
│  │         ❹          ❺                  │   wywołanie     │  │
│  │   +1                                  │ ❺ aktualizacja  │  │
│  │ </button>                             │   funkcyjna     │  │
│  └──────────────────────────────────────┴─────────────────┘  │
│   ⚠ Częsty błąd:  onClick={setCount(count + 1)}  → pętla     │
├──────────────────────────────────────────────────────────────┤
│ ⑤ SPRÓBUJ                         [HTML][CSS][JS]  [↺ Reset] │
│  ┌─────────────────────────────┬──────────────────────────┐  │
│  │ edytor kodu                  │ podgląd na żywo (iframe) │  │
│  │                              │   [ +1 ]   Licznik: 3    │  │
│  └─────────────────────────────┴──────────────────────────┘  │
│  🎯 Zadanie: dodaj przycisk „−1”, który nie zejdzie poniżej 0 │
│     [Pokaż podpowiedź]  [Pokaż rozwiązanie]                  │
├──────────────────────────────────────────────────────────────┤
│ ⑥ [☐ Oznacz temat jako opanowany]     [◀ Poprzedni][Następny ▶]│
└──────────────────────────────────────────────────────────────┘
```

| Nr | Element | Jak działa | Składnia |
|---|---|---|---|
| ① | Nagłówek modułu | znacznik technologii (kolor), powiązanie z sylabusem, pasek postępu, skróty do fiszek i quizu modułu | `URLSearchParams` (odczyt `?id=m8`), `find` |
| ② | Lista tematów | checkbox odhacza temat (zapis w `localStorage`), kliknięcie nazwy przewija do sekcji | `<input type="checkbox">`, `scrollIntoView`, zdarzenie `change` |
| ③ | Teoria | krótki tekst + ramka „Zapamiętaj” | `<section>`, `<aside class="tip">` |
| ④ | **Blok składni** | kod z numerami ❶❷❸ i legendą obok; najechanie na numer podświetla fragment kodu i opis; „Kopiuj” kopiuje kod; ramka „Częsty błąd” | `<pre><code>`, `<dl>` (legenda), `data-*`, `mouseenter`, `navigator.clipboard.writeText` |
| ⑤ | **Piaskownica** | 3 zakładki (HTML/CSS/JS); podgląd odświeża się 300 ms po ostatnim wpisaniu znaku; „Reset” przywraca przykład; mini zadanie z podpowiedzią i rozwiązaniem | `<iframe srcdoc>` z `sandbox`, `setTimeout`/`clearTimeout` (debounce), `<details>` |
| ⑥ | Nawigacja lekcji | oznaczenie tematu; przejście do poprzedniego / następnego | `findIndex`, linki |

```js
// ④ podświetlanie fragmentu składni po najechaniu na legendę
document.querySelectorAll("[data-mark]").forEach((el) => {
  el.addEventListener("mouseenter", () => {
    document.querySelectorAll(`[data-mark="${el.dataset.mark}"]`)
      .forEach((x) => x.classList.add("highlight"));
  });
  el.addEventListener("mouseleave", () => {
    document.querySelectorAll(".highlight").forEach((x) => x.classList.remove("highlight"));
  });
});

// ⑤ podgląd na żywo z opóźnieniem (debounce)
let timer;
editor.addEventListener("input", () => {
  clearTimeout(timer);
  timer = setTimeout(() => {
    preview.srcdoc = `<style>${css.value}</style>${html.value}<script>${js.value}<\/script>`;
  }, 300);
});
```

### 4.1 Szablon bloku składni dla każdej technologii

Każdy moduł ma 2–4 takie bloki. Przykłady treści:

| Moduł | Fragment kodu | Podpisane części |
|---|---|---|
| M2 HTML | `<a href="kontakt.html" title="Napisz">Kontakt</a>` | znacznik otwierający, atrybut, wartość, treść, znacznik zamykający |
| M3 CSS | `nav a:hover { color: var(--accent); }` | selektor potomka, pseudoklasa, właściwość, wartość, zmienna |
| M4 Flex | `display:flex; justify-content:center; align-items:center;` | kontener, oś główna, oś poprzeczna |
| M4 Grid | `grid-template-columns: repeat(3, 1fr);` | funkcja `repeat`, liczba kolumn, jednostka `fr` |
| M6 JS | `const total = items.reduce((sum, x) => sum + x.pts, 0);` | deklaracja, metoda tablicy, akumulator, element, wartość początkowa |
| M7 async | `const res = await fetch(url); if (!res.ok) throw ...` | `await`, Promise, sprawdzenie statusu, wyjątek |
| M8 React | `{items.map((i) => <Item key={i.id} {...i} />)}` | wyrażenie JSX, `map`, `key`, spread props |
| M9 Redux | `dispatch(toggleTopic({ moduleId, index }))` | dispatch, kreator akcji, payload |
| M11 Express | `app.get("/api/modules/:id", (req, res) => ...)` | metoda HTTP, ścieżka, parametr, handler, `req`/`res` |
| M12 Testy | `expect(percent(3, 4)).toBe(75);` | asercja, wywołanie, matcher |

---

## 5. Fiszki (`fiszki.html`)

```
┌──────────────────────────────────────────────────────────────┐
│ ① Moduł: [Wszystkie ▾]  Tryb: (•) wszystkie ( ) tylko „nie umiem” │
│                                         [🔀 Tasuj]   7 / 24  │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│        ┌──────────────────────────────────────────┐          │
│        │  [CSS]                                   │          │
│        │                                          │          │
│   ②    │   Jaka jest specyficzność #ser p ?       │          │
│        │                                          │          │
│        │          (kliknij lub spacja)            │          │
│        └──────────────────────────────────────────┘          │
│               ↻ obrót 3D → tył: „101 (ID 100 + element 1)”   │
│                                                              │
│   ③   [◀ Poprzednia]   [✗ Nie umiem]  [✓ Umiem]   [Następna ▶] │
├──────────────────────────────────────────────────────────────┤
│ ④ Sesja: ✓ 5   ✗ 2   ░ 17 zostało                             │
└──────────────────────────────────────────────────────────────┘
```

| Nr | Element | Jak działa | Składnia |
|---|---|---|---|
| ① | Filtry | wybór modułu i trybu; tasowanie | `<select>`, `<input type="radio">`, tasowanie Fisher–Yates |
| ② | Karta | klik albo **spacja** odwraca kartę animacją 3D | `transform: rotateY(180deg)`, `backface-visibility`, `transition`, `keydown` + `e.code` |
| ③ | Ocena | „Umiem / Nie umiem” zapisuje stan karty i przechodzi dalej; strzałki ← → przełączają karty | `localStorage`, `e.key === "ArrowRight"` |
| ④ | Podsumowanie | liczniki sesji | `filter().length` |

```css
.card3d { perspective: 1000px; }
.card3d__inner { transition: transform 0.5s; transform-style: preserve-3d; }
.card3d.flipped .card3d__inner { transform: rotateY(180deg); }
.card3d__front, .card3d__back { backface-visibility: hidden; position: absolute; inset: 0; }
.card3d__back { transform: rotateY(180deg); }
```

```js
// tasowanie Fisher–Yates
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];               // zamiana przez destrukturyzację
  }
  return a;
}
```

---

## 6. Quiz (`quiz.html`)

```
┌──────────────────────────────────────────────────────────────┐
│ ① Quiz: [M8 React ▾]   Pytań: [10 ▾]   [▶ Start]             │
├──────────────────────────────────────────────────────────────┤
│ ② Pytanie 3 z 10                    ███░░░░░░░    ⏱ 0:42     │
│                                                              │
│   Co wyświetli licznik po kliknięciu?                        │
│   ┌──────────────────────────────────────────┐               │
│   │ setCount(count + 1);                     │  ← pytania    │
│   │ setCount(count + 1);                     │    z kodem    │
│   └──────────────────────────────────────────┘               │
│                                                              │
│ ③ ( A ) 0                                                    │
│   ( B ) 1        ✔ poprawna                                  │
│   ( C ) 2        ✗ Twój wybór                                │
│   ( D ) błąd                                                 │
│                                                              │
│ ④ ┌ Wyjaśnienie ────────────────────────────────────────┐    │
│   │ Obie linie widzą tę samą migawkę count = 0.          │    │
│   │ Użyj setCount(c => c + 1). → NOTATKI §1.8            │    │
│   └──────────────────────────────────────────────────────┘    │
│                                         [Dalej ▶]            │
├──────────────────────────────────────────────────────────────┤
│ ⑤ WYNIK: 8/10 (80%) · najlepszy: 9/10                         │
│   Do powtórki: useEffect (pyt. 6), key (pyt. 9) [Powtórz błędne]│
└──────────────────────────────────────────────────────────────┘
```

| Nr | Element | Jak działa | Składnia |
|---|---|---|---|
| ① | Ustawienia | wybór modułu (lub „wszystkie”) i liczby pytań; losowanie | `sort` + `slice`, `<select>` |
| ② | Pasek postępu + czas | licznik czasu od startu | `setInterval`, `<progress>` |
| ③ | Odpowiedzi | po wyborze blokada przycisków, kolorowanie poprawnej i błędnej | delegowanie zdarzeń (`closest`), `disabled`, `classList` |
| ④ | Wyjaśnienie | pokazuje się po odpowiedzi; link do notatek | `hidden` → `false` |
| ⑤ | Wynik | zapis najlepszego wyniku modułu; lista błędnych z opcją powtórki | `Math.max`, `localStorage`, `filter` |

**Rodzaje pytań** (żeby ćwiczyć składnię, nie tylko definicje):
- „Co wypisze ten kod?” (fragment JS/React),
- „Znajdź błąd” (np. brak `key`, mutacja stanu, `onClick={f()}`),
- „Uzupełnij lukę” (np. `grid-template-___: repeat(3, 1fr)`),
- „Który kod HTTP?” (201, 204, 404...),
- klasyczne pytania definicyjne.

---

## 7. Zadania (`zadania.html`)

```
┌──────────────────────────────────────────────────────────────┐
│ Zadania i punktacja                    Razem: 15.5 / 30 pkt  │
├──────────────────────────────────────────────────────────────┤
│ ▾ Lab 1 — Ćwiczenia HTML/CSS                     5.0 / 5.0 ✔  │
│     ☑ Setup: repo, VS Code, Live Server, Prettier            │
│     ☑ Ćw. 1 Artykuł                              1.0         │
│     ☑ Ćw. 2 Tabela produktów                     2.0         │
│     ☑ Ćw. 3 Kwadraty                             2.0         │
│ ▾ Projekt 1 — Statyczna strona                  8.5 / 15.0   │
│     ☑ Struktura i nawigacja                      2.0         │
│     ☐ Formularz kontaktowy                       1.5  [→ M2] │
│     ...                                                      │
│ ▸ Lab 3 — Ćwiczenia JS                          2.0 / 5.0    │
│ ▸ Lab 3 — Zadanie domowe: gra w canvas          0.0 / 5.0    │
│ ▸ Mini projekt                                  (brak specyfikacji) │
└──────────────────────────────────────────────────────────────┘
```

| Element | Jak działa | Składnia |
|---|---|---|
| Grupy zadań | zwijane sekcje; nagłówek liczy punkty | `<details open>`, `reduce` |
| Pozycja | checkbox + punkty + link do modułu, który uczy potrzebnej składni | `<label>` z `<input>`, `toFixed(1)` |
| Suma | aktualizuje się po każdej zmianie | zdarzenie `change` na całej liście (delegowanie) |

```js
const earned = task.items
  .filter((item) => checked[`${task.id}.${item.id}`])
  .reduce((sum, item) => sum + item.pts, 0);
header.textContent = `${earned.toFixed(1)} / ${task.max.toFixed(1)}`;
```

---

## 8. Narzędzia (`narzedzia.html`)

### 8.1 Kalkulator specyficzności

```
┌──────────────────────────────────────────────────────────────┐
│ Selektor: [ #menu .item a:hover          ]                    │
│                                                              │
│   ID      KLASY/ATRYB./PSEUDOKL.     ELEMENTY/PSEUDOEL.       │
│  ┌───┐        ┌───┐                     ┌───┐                 │
│  │ 1 │        │ 2 │                     │ 1 │   = 121         │
│  └───┘        └───┘                     └───┘                 │
│  #menu     .item, :hover                  a                   │
│                                                              │
│ Porównaj z: [ nav ul li a ]  → 0-0-4 = 4  ⇒ wygrywa pierwszy  │
└──────────────────────────────────────────────────────────────┘
```

### 8.2 Kalkulator box modelu

```
┌──────────────────────────────────────────────────────────────┐
│ width [200] padding [5] border [2] margin [10]               │
│ box-sizing: (•) content-box ( ) border-box                   │
│                                                              │
│   ┌──────────── margin 10 ─────────────┐                     │
│   │ ┌────────── border 2 ────────────┐ │                     │
│   │ │ ┌──────── padding 5 ─────────┐ │ │                     │
│   │ │ │      content 200 × auto    │ │ │                     │
│   │ │ └────────────────────────────┘ │ │                     │
│   │ └────────────────────────────────┘ │                     │
│   └────────────────────────────────────┘                     │
│   Szerokość pudełka: 214 px · z marginesem: 234 px           │
└──────────────────────────────────────────────────────────────┘
```

| Narzędzie | Jak działa | Składnia |
|---|---|---|
| Specyficzność | liczy na żywo przy każdym znaku; podświetla, która część selektora do czego się liczy | wyrażenia regularne (`match`), zdarzenie `input` |
| Box model | rysunek zmienia proporcje razem z liczbami | `<input type="number">`, `element.style.setProperty`, warunki `if` |

---

## 9. Kontakt (`kontakt.html`) — wymóg Projektu 1

```
┌──────────────────────────────────────────────────────────────┐
│ Zgłoś błąd lub zaproponuj pytanie                            │
│                                                              │
│ E-mail *                                                     │
│ [ jan@example.com                        ]                   │
│   ⚠ Podaj poprawny adres e-mail              ← komunikat     │
│ Temat *                                                      │
│ [ — wybierz —                          ▾ ]                   │
│ Wiadomość * (min. 10 znaków)                    12 / 500     │
│ [                                        ]                   │
│ [                                        ]                   │
│                                  [ Wyślij ]                  │
│ ✔ Dziękujemy! Wiadomość zapisana.             ← po wysłaniu  │
└──────────────────────────────────────────────────────────────┘
```

| Element | Jak działa | Składnia |
|---|---|---|
| Pola | każde z `<label>`; walidacja HTML (`required`, `type="email"`, `minlength`) | atrybuty walidacji, `:invalid`, `:user-invalid` w CSS |
| Licznik znaków | aktualizuje się przy pisaniu | zdarzenie `input`, `value.length` |
| Wysyłanie | `preventDefault`; v1: zapis do `localStorage`; v3: `POST /api/messages` | `FormData`, `Object.fromEntries`, `fetch` POST |

```css
input:user-invalid, textarea:user-invalid { border-color: var(--bad); }  /* dopiero po interakcji */
```

---

## 10. Stany ekranów (każdy ekran musi je mieć)

```
 ŁADOWANIE                 PUSTO                     BŁĄD
┌──────────────────┐     ┌──────────────────┐     ┌──────────────────┐
│ ░░░░░░░░░░░░     │     │      📭           │     │  ⚠ Nie udało się │
│ ░░░░░░░          │     │ Brak fiszek „nie │     │  pobrać danych   │
│ ░░░░░░░░░░       │     │ umiem”. Brawo!   │     │  (HTTP 503)      │
│ (szkielet)       │     │ [Wszystkie]      │     │  [Spróbuj ponownie]│
└──────────────────┘     └──────────────────┘     └──────────────────┘
```

**Uczy:** obsługi `try/catch` przy `fetch`, renderowania warunkowego, animacji `@keyframes` (szkielet).

```js
async function loadModules() {
  view.render("loading");
  try {
    const data = await getJSON("data/modules.json");
    view.render(data.length ? "list" : "empty", data);
  } catch (err) {
    view.render("error", err.message);
  }
}
```

---

## 11. Wersja 2 — ten sam układ w React

Ekrany zostają **takie same**. Zmienia się to, jak są zbudowane.

### 11.1 Drzewo komponentów

```
<App>                               stan globalny: motyw, postęp (Context lub Redux)
├── <Header>                        ① ② ③ ④
│   ├── <SearchBox />               useState(query)
│   ├── <ThemeToggle />             useContext(ThemeContext)
│   └── <ProgressBadge />
├── <Sidebar />                     ⑤ <NavLink> z React Router
├── <Routes>                        ⑥
│   ├── "/"            → <HomePage>       → <ModuleCard> × n
│   ├── "/plan"        → <PlanPage>       → <Stage> × n
│   ├── "/modul/:id"   → <ModulePage>     useParams()
│   │                      ├── <TopicList />
│   │                      ├── <Theory />
│   │                      ├── <SyntaxBlock code legend />   ← ❶❷❸
│   │                      └── <Playground initial task />
│   ├── "/fiszki"      → <FlashcardsPage> → <Flashcard front back />
│   ├── "/quiz"        → <QuizPage>       → <Question /> <Result />
│   ├── "/zadania"     → <TasksPage>      → <TaskGroup> × n
│   └── "*"            → <NotFound />
└── <Footer />                      ⑧
```

### 11.2 Jak dane płyną

```
 progress (stan w <App> lub w Redux store)
     │  props / useSelector
     ▼
 <ModulePage> ──► <TopicList topics done onToggle>
                         │  użytkownik klika checkbox
                         ▼
                  onToggle(i)  ──►  dispatch(toggleTopic) / setProgress(...)
                         │
                         ▼
                  nowy stan → React przerysowuje <TopicList> i <ProgressBadge>
```

### 11.3 Przykład: `SyntaxBlock`

```jsx
function SyntaxBlock({ code, legend }) {
  const [active, setActive] = useState(null);           // który numer jest podświetlony
  return (
    <div className="syntax">
      <pre><code>{code}</code></pre>
      <dl>
        {legend.map((item, i) => (
          <div key={i}
               className={active === i ? "highlight" : ""}
               onMouseEnter={() => setActive(i)}
               onMouseLeave={() => setActive(null)}>
            <dt>{i + 1}</dt>
            <dd>{item}</dd>
          </div>
        ))}
      </dl>
      <button onClick={() => navigator.clipboard.writeText(code)}>Kopiuj</button>
    </div>
  );
}
```

**Uczy:** props, `useState`, `map` + `key`, zdarzenia, renderowanie warunkowe klasy.

---

## 12. Wersja 3 — serwer (Express) i przepływ danych

```
 PRZEGLĄDARKA (React SPA)                    SERWER (Node + Express)          DANE
┌───────────────────────┐   GET /api/modules     ┌──────────────────────┐   ┌─────────────┐
│ <HomePage>            │ ─────────────────────► │ router modules       │──►│ modules.json│
│   useEffect(fetch...) │ ◄───────────────────── │ res.json(modules)    │   └─────────────┘
│                       │   200 OK  [JSON]       │                      │
│ <QuizPage>            │   POST /api/results    │ router results       │   ┌─────────────┐
│   onFinish → fetch    │ ─────────────────────► │ walidacja → 400/201  │──►│ results.json│
│                       │ ◄───────────────────── │                      │   └─────────────┘
│                       │   201 Created          │ middleware: cors,    │
│                       │                        │ json, logger, błędy  │
└───────────────────────┘                        └──────────────────────┘
```

| Endpoint | Ekran, który go używa | Kody |
|---|---|---|
| `GET /api/modules` | Start, Plan | 200 |
| `GET /api/modules/:id` | Moduł | 200, 404 |
| `GET /api/modules/:id/quiz` | Quiz | 200, 404 |
| `POST /api/results` | Quiz (wynik) | 201, 400 |
| `GET /api/results?module=m8` | Start (ostatnie wyniki) | 200 |
| `POST /api/messages` | Kontakt | 201, 400 |

**Uczy:** REST, metody i kody HTTP, middleware, `fetch` z `method: "POST"`, `useEffect`.

---

## 13. Mapa: gdzie w aplikacji ćwiczysz daną składnię

| Składnia | Gdzie |
|---|---|
| Semantyczny HTML (`header`, `nav`, `main`, `aside`, `footer`, `section`) | szkielet każdej strony (§1) |
| Formularze i walidacja | Kontakt (§9), Narzędzia (§8), ustawienia quizu (§6) |
| `<details>`, `<progress>`, `<dl>` | Plan (§3), Zadania (§7), blok składni (§4) |
| Zmienne CSS, motyw | tokeny (§0.2), przełącznik ③ |
| Grid | layout (§1), siatka modułów (§2) |
| Flexbox | nawigacja, karty, przyciski fiszek |
| Media queries, mobile-first | layout (§1), dolny pasek na telefonie |
| Pozycjonowanie, pseudo-elementy | oś czasu (§3), panel sticky (§1) |
| Transform / transition / perspective | fiszki (§5) |
| DOM: tworzenie i zmiana elementów | siatka modułów (§2), lista tematów (§4) |
| Zdarzenia, delegowanie, klawiatura | quiz (§6), fiszki (§5), zadania (§7) |
| Metody tablic (`map`, `filter`, `find`, `reduce`, `sort`) | Start, Zadania, Quiz |
| `localStorage` + JSON | postęp, motyw, wyniki, fiszki |
| `fetch`, `async/await`, `try/catch` | stany ekranów (§10), v3 (§12) |
| Timery, debounce | piaskownica (§4), czas quizu (§6) |
| Wyrażenia regularne | kalkulator specyficzności (§8) |
| React: komponenty, props, stan, efekty, router | v2 (§11) |
| Redux / Context | postęp globalny (§11.2) |
| Express, REST, kody HTTP | v3 (§12) |
| Testy | `percent()`, `shuffle()`, `<Flashcard>`, `POST /api/results` (NOTATKI §10) |
