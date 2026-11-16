/* M1 — Architektura aplikacji webowych i HTTP */
WDAI.modules.push({
  id: "m1",
  code: "M1",
  tech: "gen",
  title: "Architektura aplikacji webowych i HTTP",
  short: "Architektura i HTTP",
  lab: "Wykład 2",
  syllabus: "W4, W5",
  intro: "Jak przeglądarka rozmawia z serwerem, czym jest żądanie HTTP i czym różni się strona statyczna od SPA. To podstawa, żeby rozumieć, co dzieje się „pod spodem” każdej strony, którą piszesz.",
  topics: [
    {
      id: "klient-serwer",
      title: "Klient i serwer",
      keywords: ["przeglądarka", "serwer www", "architektura"],
      theory: [
        "Aplikacja webowa działa w modelu **klient–serwer**. **Klient** to przeglądarka: wysyła żądania, wyświetla odpowiedzi i obsługuje użytkownika. **Serwer** to program, który przechowuje albo generuje zasoby (HTML, CSS, JS, obrazy, dane JSON) i odsyła je w odpowiedzi.",
        "Gdy wpisujesz adres strony, przeglądarka pobiera najpierw plik HTML. Potem czyta go i dla każdego zasobu, który HTML wskazuje (`<link>`, `<script>`, `<img>`), wysyła **osobne żądanie**.",
        ["**HTML** opisuje strukturę i treść (co jest nagłówkiem, co akapitem).", "**CSS** opisuje wygląd (kolory, układ, czcionki).", "**JavaScript** dodaje zachowanie (reakcje na kliknięcia, pobieranie danych)."],
      ],
      syntax: [
        {
          title: "Co się dzieje po wpisaniu adresu",
          lang: "http",
          code: `
GET /index.html HTTP/1.1        <- ❶ przeglądarka prosi o stronę
Host: moja-strona.pl

HTTP/1.1 200 OK                 <- ❷ serwer odpowiada: OK
Content-Type: text/html

<!DOCTYPE html> ... <link href="style.css"> ... <script src="app.js">

GET /style.css HTTP/1.1         <- ❸ osobne żądanie po CSS
GET /app.js HTTP/1.1            <- ❸ i po JS`,
          legend: [["❶", "żądanie (request) od klienta"], ["❷", "odpowiedź (response) serwera z kodem statusu"], ["❸", "każdy plik podlinkowany w HTML to kolejne żądanie"]],
          explain: "Otwórz DevTools (F12) → zakładka **Network** i odśwież dowolną stronę: zobaczysz listę wszystkich żądań.",
        },
      ],
      tip: "Statyczna strona (Projekt 1) to po prostu pliki HTML/CSS/JS, które serwer oddaje bez zmian. Dlatego można ją za darmo hostować na GitHub Pages.",
    },
    {
      id: "http-metody",
      title: "Metody HTTP i kody statusu",
      keywords: ["GET", "POST", "PUT", "DELETE", "200", "404", "500", "status"],
      theory: [
        "Każde żądanie ma **metodę**, która mówi, co chcemy zrobić z zasobem, oraz **adres** (URL). Odpowiedź ma **kod statusu**, który mówi, jak poszło.",
        ["`GET` — pobierz dane (np. stronę, listę produktów).", "`POST` — wyślij nowe dane (np. formularz, nowy komentarz).", "`PUT` / `PATCH` — zmień istniejący zasób (całość / część).", "`DELETE` — usuń zasób.", "`HEAD` — jak GET, ale tylko nagłówki, bez treści."],
        "Kody statusu: **2xx** sukces (200 OK, 201 Created, 204 No Content), **3xx** przekierowanie (301, 304), **4xx** błąd klienta (400 Bad Request, 401 brak logowania, 403 brak uprawnień, 404 Not Found), **5xx** błąd serwera (500).",
      ],
      syntax: [
        {
          title: "Budowa żądania i odpowiedzi",
          lang: "http",
          code: `
POST /api/messages HTTP/1.1      <- ❶ metoda, ścieżka, wersja
Host: example.com                <- ❷ nagłówki: Nazwa: wartość
Content-Type: application/json

{"email":"jan@example.com"}      <- ❸ ciało (body) — opcjonalne

HTTP/1.1 201 Created             <- ❹ wersja i kod statusu
Content-Type: application/json

{"id":7,"email":"jan@example.com"}`,
          legend: [["❶", "linia startowa żądania"], ["❷", "nagłówki opisują żądanie (typ danych, cookies, autoryzacja)"], ["❸", "dane wysyłane do serwera"], ["❹", "linia startowa odpowiedzi: 201 = utworzono"]],
        },
      ],
      mistakes: [
        { lang: "http", bad: "GET /api/delete-user?id=5", good: "DELETE /api/users/5", why: "GET służy tylko do odczytu. Operacje zmieniające dane robimy metodami POST/PUT/PATCH/DELETE." },
      ],
      try: {
        html: `<p>Otwórz konsolę pod podglądem — zobaczysz status i nagłówki odpowiedzi.</p>`,
        js: `fetch("https://dummyjson.com/products/1")
  .then((res) => {
    console.log("status:", res.status, res.statusText);
    console.log("Content-Type:", res.headers.get("Content-Type"));
    return res.json();
  })
  .then((data) => console.log("tytuł produktu:", data.title));`,
        task: "Zmień adres na `https://dummyjson.com/products/99999` i sprawdź, jaki kod statusu dostaniesz.",
        hint: "Produkt o takim id nie istnieje, więc serwer odpowie kodem z grupy 4xx.",
      },
    },
    {
      id: "typy-aplikacji",
      title: "Strona statyczna, SSR, SPA, PWA",
      keywords: ["spa", "ssr", "pwa", "statyczna", "single page"],
      theory: [
        ["**Strona statyczna** — pliki HTML są gotowe i zawsze takie same. To strona internetowa, a nie aplikacja (np. Projekt 1).", "**Server-side rendering (SSR)** — serwer generuje nowy HTML dla każdego adresu (np. sklep z bazą produktów).", "**Single Page Application (SPA)** — przeglądarka pobiera jedną stronę, a potem JavaScript pobiera tylko dane (JSON) i podmienia fragmenty widoku bez przeładowania. Przykład: Gmail.", "**PWA (Progressive Web App)** — aplikacja webowa, którą można „zainstalować”, działa offline."],
        "**Plusy SPA:** szybkość po pierwszym załadowaniu, wrażenie aplikacji desktopowej, ten sam backend (API) dla wielu klientów. **Minusy:** trudniejsze SEO, cięższy pierwszy start, więcej JavaScriptu.",
        "W nowoczesnej architekturze **backend nie generuje HTML-a**, tylko udostępnia **REST API** zwracające JSON, a frontend (np. React) buduje z tego widok.",
      ],
      syntax: [
        {
          title: "Zasada SPA w miniaturze",
          lang: "js",
          code: `
// ❶ strona jest już załadowana — pobieramy tylko DANE
const res = await fetch("/api/products");
const products = await res.json();

// ❷ podmieniamy fragment strony bez przeładowania
document.querySelector("#lista").innerHTML =
  products.map((p) => \`<li>\${p.title}</li>\`).join("");`,
          legend: [["❶", "żądanie po JSON, a nie po nowy HTML"], ["❷", "JavaScript sam buduje widok z danych"]],
        },
      ],
    },
    {
      id: "rest-json",
      title: "REST API i JSON",
      keywords: ["rest", "api", "json", "crud", "endpoint"],
      theory: [
        "**REST** to styl projektowania API opartego na HTTP: **zasoby** mają adresy (`/api/products/5`), a **metoda HTTP** mówi, co z nimi zrobić. Serwer nie pamięta stanu między żądaniami (bezstanowość).",
        "**JSON** (JavaScript Object Notation) to tekstowy format wymiany danych. Wygląda jak obiekt JS, ale klucze i napisy muszą być w podwójnych cudzysłowach, a nie wolno w nim pisać funkcji ani komentarzy.",
      ],
      syntax: [
        {
          title: "Operacje CRUD w REST",
          lang: "http",
          code: `
GET    /api/products        <- ❶ lista (Read)
GET    /api/products/5      <- ❷ jeden element (Read)
POST   /api/products        <- ❸ dodaj (Create)  → 201
PUT    /api/products/5      <- ❹ zmień (Update)
DELETE /api/products/5      <- ❺ usuń (Delete)   → 204`,
          legend: [["❶", "kolekcja: rzeczownik w liczbie mnogiej"], ["❷", "konkretny zasób: id w ścieżce"], ["❸", "nowy zasób, dane w body"], ["❹", "aktualizacja"], ["❺", "usunięcie"]],
        },
        {
          title: "JSON",
          lang: "json",
          code: `
{
  "id": 5,
  "title": "Laptop",
  "price": 3999.99,
  "tags": ["elektronika", "komputer"],
  "available": true,
  "producer": { "name": "Dell", "country": null }
}`,
          explain: "Dozwolone typy: napis, liczba, `true`/`false`, `null`, tablica, obiekt. W JS zamieniasz tekst na obiekt przez `JSON.parse()`, a obiekt na tekst przez `JSON.stringify()`.",
        },
      ],
      mistakes: [
        { lang: "json", bad: "{ name: 'Jan', } // komentarz", good: "{ \"name\": \"Jan\" }", why: "W JSON klucze i napisy muszą być w podwójnych cudzysłowach, bez przecinka na końcu i bez komentarzy." },
      ],
    },
  ],
  flashcards: [
    ["Za co odpowiada przeglądarka w modelu klient–serwer?", "Wysyła żądania, wyświetla odpowiedzi (HTML/CSS/JS) i obsługuje interakcję użytkownika."],
    ["Której metody HTTP użyjesz do pobrania danych?", "`GET`"],
    ["Co oznacza kod 404?", "Not Found — zasób nie istnieje."],
    ["Co oznacza kod 201?", "Created — utworzono nowy zasób (np. po POST)."],
    ["401 a 403?", "401: brak uwierzytelnienia (nie zalogowano). 403: zalogowany, ale bez uprawnień."],
    ["Czym jest SPA?", "Aplikacja jednej strony: po pierwszym załadowaniu JS pobiera tylko dane i podmienia widok bez przeładowania."],
    ["Główne wady SPA?", "Trudniejsze SEO i cięższy pierwszy start."],
    ["Jak zamienić tekst JSON na obiekt JS?", "`JSON.parse(tekst)`; w drugą stronę `JSON.stringify(obiekt)`."],
    ["Czym różni się strona statyczna od aplikacji webowej?", "Strona statyczna zawsze wygląda tak samo. Aplikacja webowa dostarcza usługę i reaguje na użytkownika, zwykle komunikując się z serwerem."],
  ],
  quiz: [
    { q: "Która metoda HTTP służy do usunięcia zasobu?", options: ["GET", "POST", "DELETE", "HEAD"], answer: 2 },
    { q: "Serwer odpowiedział kodem 500. Co to znaczy?", options: ["Nie znaleziono strony", "Błąd po stronie serwera", "Sukces", "Brak uprawnień"], answer: 1, explain: "5xx to błędy serwera, 4xx to błędy klienta." },
    { q: "Ile żądań HTTP wyśle przeglądarka dla strony HTML z jednym plikiem CSS i jednym JS?", options: ["1", "2", "3", "zależy od serwera"], answer: 2, explain: "HTML + CSS + JS = 3 osobne żądania." },
    { q: "Który zapis to poprawny JSON?", options: ["{ name: \"Jan\" }", "{ \"name\": 'Jan' }", "{ \"name\": \"Jan\" }", "{ \"name\": \"Jan\", }"], answer: 2 },
    { q: "Co charakteryzuje SPA?", options: ["Serwer generuje nowy HTML dla każdego kliknięcia", "Po pierwszym załadowaniu pobierane są tylko dane", "Nie używa JavaScriptu", "Działa tylko offline"], answer: 1 },
    { q: "Jaki kod zwykle zwraca poprawne utworzenie zasobu przez POST?", options: ["200", "201", "204", "301"], answer: 1 },
    { q: "Projekt 1 (strona z plików HTML/CSS) to przykład:", options: ["SPA", "SSR", "strony statycznej", "PWA"], answer: 2 },
  ],
});
