/* Ściąga CSS — co robi każda właściwość i selektor, w jednym miejscu.
   kind: "selektor", "wlasciwosc", "wartosc" (wartość / funkcja), "regula" (@media, @keyframes…), "jednostka"
   example = kod CSS, html = przykładowy HTML do podglądu (klasa .b = szare pudełko).
   preview: false = bez podglądu */
WDAI.refCss = [
  {
    id: "selektory",
    title: "Selektory",
    intro: "Wskazują, do których elementów zastosować styl. Najczęściej stylujemy po klasach.",
    items: [
      { tag: "element", kind: "selektor", desc: "Wszystkie elementy danego typu, np. każdy akapit. Specyficzność (0,0,1).", example: `p { color: #1d5c54; }`, html: `<p>Akapit 1</p><p>Akapit 2</p>` },
      { tag: ".klasa", kind: "selektor", desc: "Elementy z danym `class`. Podstawowy sposób stylowania. Specyficzność (0,1,0).", example: `.highlight { background: gold; }`, html: `<p>Zwykły</p><p class="highlight">Z klasą highlight</p>` },
      { tag: "#id", kind: "selektor", desc: "Element o danym `id` (unikalny). Bardzo silny — (1,0,0) — więc w CSS używaj go rzadko.", example: `#intro { font-weight: 700; }`, html: `<p id="intro">Element z id="intro"</p><p>Inny</p>` },
      { tag: "*", kind: "selektor", desc: "Selektor uniwersalny — wszystkie elementy. Specyficzność 0. Najczęściej w resecie `box-sizing`.", example: `* { box-sizing: border-box; margin: 0; }`, preview: false },
      { tag: "A, B", kind: "selektor", desc: "Grupowanie: ta sama reguła dla kilku selektorów (przecinek).", example: `h1, h2, .title { color: #c2410c; }`, html: `<h1>h1</h1><h2>h2</h2><p class="title">.title</p>` },
      { tag: "A B", kind: "selektor", desc: "Potomek: B na dowolnej głębokości wewnątrz A (spacja).", example: `nav a { color: white; background: #1d5c54; padding: 4px; }`, html: `<nav><a href="#">w nav</a> <span><a href="#">też w nav</a></span></nav><a href="#">poza nav</a>` },
      { tag: "A > B", kind: "selektor", desc: "Bezpośrednie dziecko: tylko B, którego rodzicem jest A.", example: `ul > li { color: #c2410c; }`, html: `<ul><li>dziecko ul<ol><li>wnuk (nie dotyczy)</li></ol></li></ul>` },
      { tag: "A + B / A ~ B", kind: "selektor", desc: "`+` — pierwszy sąsiad B zaraz po A; `~` — wszyscy kolejni sąsiedzi B po A.", example: `h2 + p { font-weight: 700; }
h2 ~ p { color: #2152c4; }`, html: `<h2>Nagłówek</h2><p>pierwszy po h2</p><p>kolejny</p>` },
      { tag: "[atrybut]", kind: "selektor", desc: "Po atrybucie: `[required]` (ma atrybut), `[type=\"email\"]` (równy), `[href^=\"https\"]` (zaczyna się od), `[href$=\".pdf\"]` (kończy się na), `[class*=\"col-\"]` (zawiera).", example: `input[required] { border: 2px solid #c0392b; }
a[href$=".pdf"]::after { content: " (PDF)"; }`, html: `<input required placeholder="wymagane"> <input placeholder="opcjonalne"><br><a href="cv.pdf">CV</a>` },
      { tag: ":hover :focus :active", kind: "selektor", desc: "Stany interakcji: najechanie myszą, fokus (kliknięcie, Tab), moment kliknięcia. Kolejność dla linków: LVHA.", example: `.btn:hover { background: #1d5c54; color: white; }
.btn:active { transform: scale(0.95); }
input:focus { outline: 3px solid gold; }`, html: `<button class="btn">Najedź i kliknij</button> <input placeholder="kliknij">` },
      { tag: ":focus-visible", kind: "selektor", desc: "Fokus widoczny tylko przy nawigacji klawiaturą (nie po kliknięciu myszą). Nie usuwaj obrysu bez zamiennika — to ważne dla dostępności.", example: `button:focus-visible { outline: 3px solid #c2410c; outline-offset: 2px; }`, html: `<button>Wejdź tu Tabem</button>` },
      { tag: ":first-child :last-child :nth-child()", kind: "selektor", desc: "Pozycja wśród rodzeństwa. `nth-child(2)` — drugi, `(odd)`/`(even)` — nieparzyste/parzyste, `(3n)` — co trzeci.", example: `li:first-child { font-weight: 700; }
li:nth-child(even) { background: #eee; }
li:last-child { color: #c0392b; }`, html: `<ul><li>1</li><li>2</li><li>3</li><li>4</li><li>5</li></ul>` },
      { tag: ":not() :is()", kind: "selektor", desc: "`:not(x)` — wszystko oprócz x. `:is(a, b)` — skrót dla wielu selektorów naraz.", example: `li:not(:last-child) { border-bottom: 1px solid #ccc; }
:is(h1, h2) span { color: #c2410c; }`, html: `<ul><li>a</li><li>b</li><li>c (bez linii)</li></ul><h2>Tytuł <span>wyróżniony</span></h2>` },
      { tag: ":checked :disabled :invalid", kind: "selektor", desc: "Stany formularza: zaznaczony checkbox/radio, wyłączone pole, pole z błędem walidacji (`:user-invalid` — dopiero po interakcji).", example: `input:checked + label { font-weight: 700; color: #1a6e3e; }
input:disabled { opacity: 0.4; }
input:invalid { border-color: #c0392b; }`, html: `<input type="checkbox" id="c" checked><label for="c">Zaznaczony</label><br><input disabled value="wyłączone"> <input type="email" value="zly-mail">` },
      { tag: "::before ::after", kind: "selektor", desc: "Pseudoelementy — wirtualna treść przed/po zawartości elementu. Wymagają `content`. Dobre do ikonek, dekoracji, cudzysłowów.", example: `.req::after { content: " *"; color: #c0392b; }
.tip::before { content: "💡 "; }`, html: `<label class="req">E-mail</label><p class="tip">Wskazówka</p>` },
      { tag: "::first-letter ::placeholder ::selection", kind: "selektor", desc: "Pierwsza litera akapitu, tekst placeholdera w polu, zaznaczony tekst.", example: `p::first-letter { font-size: 2em; color: #c2410c; }
input::placeholder { color: #999; font-style: italic; }
::selection { background: gold; }`, html: `<p>Zaznacz ten tekst myszą.</p><input placeholder="placeholder">` },
    ],
  },
  {
    id: "kaskada",
    title: "Kaskada i dziedziczenie",
    intro: "Co się dzieje, gdy kilka reguł ustawia tę samą właściwość.",
    items: [
      { tag: "kolejność reguł", kind: "regula", desc: "Konflikt rozstrzyga: 1) `!important`, 2) specyficzność selektora (id > klasa > element), 3) kolejność — przy remisie wygrywa późniejsza reguła.", example: `p { color: red; }
p { color: blue; }      /* wygrywa — późniejsza */
.lead { color: green; } /* wygrywa z p — wyższa specyficzność */`, html: `<p>zwykły p</p><p class="lead">p.lead</p>` },
      { tag: "!important", kind: "wartosc", desc: "Wymusza deklarację ponad kaskadą. Ostateczność — utrudnia późniejsze zmiany.", example: `.alert { color: white !important; }`, preview: false },
      { tag: "inherit / initial / unset", kind: "wartosc", desc: "`inherit` — weź wartość od rodzica; `initial` — wartość domyślną CSS; `unset` — dziedzicz, jeśli właściwość dziedziczna, w przeciwnym razie initial.", example: `a { color: inherit; }   /* link w kolorze tekstu wokół */`, html: `<p style="color:#c2410c">Tekst i <a href="#">link w tym samym kolorze</a></p>` },
    ],
  },
  {
    id: "kolory-tla",
    title: "Kolory i tła",
    intro: "Kolor tekstu, tła, gradienty i przezroczystość.",
    items: [
      { tag: "color", kind: "wlasciwosc", desc: "Kolor tekstu (dziedziczy się). Zapisy: `#1d5c54`, `rgb(29 92 84)`, `hsl(173 52% 24%)`, nazwa `tomato`. Zadbaj o kontrast z tłem.", example: `.a { color: #1d5c54; }
.b2 { color: rgb(194 65 12); }
.c { color: hsl(220 70% 45%); }`, html: `<p class="a">hex</p><p class="b2">rgb</p><p class="c">hsl</p>` },
      { tag: "background-color", kind: "wlasciwosc", desc: "Kolor tła elementu (wypełnia też padding).", example: `.box { background-color: #e3f1ef; padding: 12px; }`, html: `<div class="box">Tło</div>` },
      { tag: "background-image", kind: "wlasciwosc", desc: "Obraz lub gradient w tle. Kilka warstw oddzielasz przecinkiem — pierwsza jest na wierzchu.", example: `.hero {
  background-image: linear-gradient(rgb(0 0 0 / 50%), rgb(0 0 0 / 50%)),
                    url("https://picsum.photos/id/1015/600/200");
  background-size: cover;
  color: white; padding: 40px;
}`, html: `<div class="hero">Tekst na zdjęciu</div>` },
      { tag: "background-size / position / repeat", kind: "wlasciwosc", desc: "`cover` — pokryj cały element, `contain` — zmieść cały obraz; `center` — wyśrodkuj; `no-repeat` — nie powtarzaj.", example: `.box {
  height: 120px;
  background: url("https://picsum.photos/id/237/200/200") center / contain no-repeat #eee;
}`, html: `<div class="box"></div>` },
      { tag: "linear-gradient() / radial-gradient()", kind: "wartosc", desc: "Gradienty jako wartość tła: kierunek lub kąt i lista kolorów.", example: `.l { background: linear-gradient(90deg, #1d5c54, #e9c46a); }
.r { background: radial-gradient(circle, #f4a261, #264653); }
.l, .r { height: 50px; margin: 6px 0; }`, html: `<div class="l"></div><div class="r"></div>` },
      { tag: "opacity", kind: "wlasciwosc", desc: "Przezroczystość całego elementu z zawartością (0–1). Żeby przezroczyste było tylko tło, użyj koloru z alfą: `rgb(0 0 0 / 50%)`.", example: `.half { opacity: 0.5; }`, html: `<p class="b">opacity 1</p><p class="b half">opacity 0.5</p>` },
    ],
  },
  {
    id: "tekst",
    title: "Tekst i czcionki",
    intro: "Typografia: czcionki, rozmiary, odstępy i wyrównanie.",
    items: [
      { tag: "font-family", kind: "wlasciwosc", desc: "Lista czcionek — użyta zostaje pierwsza dostępna; na końcu rodzina ogólna (`sans-serif`, `serif`, `monospace`). Google Fonts podłączasz przez <link> w HTML.", example: `body { font-family: "Inter", system-ui, sans-serif; }
code { font-family: ui-monospace, monospace; }`, html: `<p>Tekst bezszeryfowy i <code>kod</code></p>` },
      { tag: "font-size", kind: "wlasciwosc", desc: "Rozmiar czcionki. Najlepiej `rem` (względem ustawień użytkownika); `clamp()` daje płynny rozmiar.", example: `.s { font-size: 0.875rem; }
.l { font-size: 1.5rem; }
.fluid { font-size: clamp(1rem, 4vw, 2rem); }`, html: `<p class="s">0.875rem</p><p class="l">1.5rem</p><p class="fluid">clamp — zmień szerokość</p>` },
      { tag: "font-weight / font-style", kind: "wlasciwosc", desc: "Grubość (400 normalna, 700 pogrubiona, 100–900) i kursywa (`italic`).", example: `.w { font-weight: 700; }
.i { font-style: italic; }`, html: `<p class="w">700</p><p class="i">italic</p>` },
      { tag: "line-height", kind: "wlasciwosc", desc: "Wysokość linii (interlinia). Najlepiej bez jednostki: 1.5–1.7 dla tekstu.", example: `.tight { line-height: 1; }
.loose { line-height: 1.8; }`, html: `<p class="b tight">Ciasna interlinia. Ciasna interlinia. Ciasna interlinia. Ciasna interlinia.</p><p class="b loose">Luźna interlinia. Luźna interlinia. Luźna interlinia. Luźna interlinia.</p>` },
      { tag: "text-align", kind: "wlasciwosc", desc: "Wyrównanie tekstu w bloku: `left`, `center`, `right`, `justify`.", example: `.c { text-align: center; }
.r { text-align: right; }`, html: `<p class="b c">center</p><p class="b r">right</p>` },
      { tag: "text-decoration", kind: "wlasciwosc", desc: "Podkreślenie, przekreślenie lub ich brak (`none` usuwa podkreślenie linków).", example: `a { text-decoration: none; }
a:hover { text-decoration: underline wavy #c2410c; }
.old { text-decoration: line-through; }`, html: `<a href="#">Najedź na link</a><p class="old">przekreślone</p>` },
      { tag: "text-transform / letter-spacing", kind: "wlasciwosc", desc: "Wielkie/małe litery (`uppercase`, `capitalize`) i odstęp między literami.", example: `.label { text-transform: uppercase; letter-spacing: 0.1em; font-size: 0.8rem; }`, html: `<p class="label">etykieta sekcji</p>` },
      { tag: "white-space / text-overflow", kind: "wlasciwosc", desc: "`nowrap` — bez łamania linii. Z `overflow: hidden` i `text-overflow: ellipsis` tekst kończy się wielokropkiem.", example: `.cut {
  width: 180px; white-space: nowrap;
  overflow: hidden; text-overflow: ellipsis;
}`, html: `<p class="b cut">Bardzo długi tytuł, który się nie mieści w ramce</p>` },
      { tag: "max-width: 65ch", kind: "jednostka", desc: "`ch` = szerokość znaku „0”. Ograniczenie akapitu do ~65 znaków poprawia czytelność.", example: `p { max-width: 40ch; }`, html: `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>` },
    ],
  },
  {
    id: "box",
    title: "Model pudełkowy i wymiary",
    intro: "Każdy element to pudełko: treść → padding → border → margin.",
    items: [
      { tag: "width / height", kind: "wlasciwosc", desc: "Szerokość i wysokość treści (albo całego pudełka przy `border-box`). Nie działają na elementy liniowe.", example: `.box { width: 200px; height: 60px; }`, html: `<div class="b box">200 × 60</div>` },
      { tag: "min-/max-width, min-/max-height", kind: "wlasciwosc", desc: "Granice rozmiaru. `max-width: 100%` nie pozwala wyjść poza rodzica; `min-height: 100vh` — co najmniej wysokość okna.", example: `.box { width: 100%; max-width: 300px; }
img { max-width: 100%; height: auto; }`, html: `<div class="b box">max 300px</div>` },
      { tag: "padding", kind: "wlasciwosc", desc: "Wewnętrzny odstęp między treścią a ramką (tło go wypełnia). Skróty jak margin: 1–4 wartości.", example: `.box { padding: 8px 24px; }`, html: `<div class="b box">pion 8px, poziom 24px</div>` },
      { tag: "margin", kind: "wlasciwosc", desc: "Zewnętrzny odstęp od innych elementów. 4 wartości: góra prawo dół lewo. `margin: 0 auto` centruje blok o ustalonej szerokości. Pionowe marginesy sąsiadów się zapadają.", example: `.box { width: 150px; margin: 10px auto; }`, html: `<div class="b box">wyśrodkowany</div>` },
      { tag: "border", kind: "wlasciwosc", desc: "Ramka: grubość, styl (`solid`, `dashed`, `dotted`), kolor. Osobno: `border-top`, `border-left`…", example: `.a { border: 2px solid #1d5c54; }
.d { border: 2px dashed #c2410c; }
.t { border-bottom: 3px solid gold; }`, html: `<p class="a">solid</p><p class="d">dashed</p><p class="t">tylko dół</p>` },
      { tag: "border-radius", kind: "wlasciwosc", desc: "Zaokrąglenie rogów. `50%` przy kwadracie daje koło, `999px` — „pigułkę”.", example: `.r { border-radius: 12px; }
.pill { border-radius: 999px; }
.circle { width: 60px; height: 60px; border-radius: 50%; }`, html: `<div class="b r">12px</div><br><span class="b pill">pigułka</span><div class="b circle"></div>` },
      { tag: "box-sizing", kind: "wlasciwosc", desc: "`border-box` — width obejmuje padding i ramkę (łatwiejsze liczenie). `content-box` (domyślny) — padding i ramka powiększają element.", example: `.c { box-sizing: content-box; width: 150px; padding: 20px; border: 5px solid; }
.bb { box-sizing: border-box; width: 150px; padding: 20px; border: 5px solid; }`, html: `<div class="c">content-box: 200px</div><div class="bb">border-box: 150px</div>` },
      { tag: "box-shadow", kind: "wlasciwosc", desc: "Cień: przesunięcie x, y, rozmycie, (rozszerzenie), kolor. `inset` — cień do środka.", example: `.card { box-shadow: 0 4px 16px rgb(0 0 0 / 15%); padding: 16px; border-radius: 10px; }`, html: `<div class="card">Karta z cieniem</div>` },
      { tag: "outline", kind: "wlasciwosc", desc: "Obrys poza ramką — nie zajmuje miejsca. Używany do pokazania fokusu.", example: `.o { outline: 3px solid gold; outline-offset: 4px; }`, html: `<button class="o">outline</button>` },
      { tag: "overflow", kind: "wlasciwosc", desc: "Co z treścią, która się nie mieści: `visible` (wystaje), `hidden` (ucina), `auto` (pasek przewijania w razie potrzeby), `scroll`.", example: `.box { height: 60px; overflow: auto; }`, html: `<div class="b box">Linia 1<br>Linia 2<br>Linia 3<br>Linia 4<br>Linia 5</div>` },
      { tag: "aspect-ratio", kind: "wlasciwosc", desc: "Proporcje elementu, np. `16 / 9` dla wideo, `1` dla kwadratu — wysokość liczy się sama.", example: `.v { width: 200px; aspect-ratio: 16 / 9; background: #264653; }`, html: `<div class="v"></div>` },
      { tag: "object-fit", kind: "wlasciwosc", desc: "Jak obraz/wideo wypełnia swoje pudełko: `cover` (wypełnij, przytnij), `contain` (zmieść całość), `fill` (rozciągnij).", example: `img { width: 120px; height: 120px; }
.cover { object-fit: cover; }
.contain { object-fit: contain; background: #eee; }`, html: `<img class="cover" src="https://picsum.photos/id/1025/300/150" alt=""> <img class="contain" src="https://picsum.photos/id/1025/300/150" alt="">` },
    ],
  },
  {
    id: "pozycja",
    title: "Wyświetlanie i pozycjonowanie",
    intro: "Jak element zachowuje się w przepływie strony i gdzie się znajduje.",
    items: [
      { tag: "display", kind: "wlasciwosc", desc: "`block` (nowa linia, pełna szerokość), `inline` (w linii, bez width/height), `inline-block` (w linii, z wymiarami), `none` (znika), `flex`, `grid`.", example: `.ib { display: inline-block; width: 80px; }
.none { display: none; }`, html: `<span class="b ib">1</span><span class="b ib">2</span><span class="b none">niewidoczny</span><span class="b ib">3</span>` },
      { tag: "visibility", kind: "wlasciwosc", desc: "`hidden` ukrywa element, ale zostawia puste miejsce (w przeciwieństwie do `display: none`).", example: `.ghost { visibility: hidden; }`, html: `<span class="b">A</span> <span class="b ghost">B</span> <span class="b">C</span>` },
      { tag: "position: relative", kind: "wartosc", desc: "Przesunięcie (top/left) względem własnego miejsca; miejsce w przepływie zostaje. Najczęściej jako punkt odniesienia dla dzieci `absolute`.", example: `.r { position: relative; top: 10px; left: 20px; }`, html: `<div class="b">zwykły</div><div class="b r">relative</div><div class="b">zwykły</div>` },
      { tag: "position: absolute", kind: "wartosc", desc: "Wyjęty z przepływu; pozycja względem najbliższego przodka z `position` innym niż static.", example: `.card { position: relative; height: 80px; }
.badge { position: absolute; top: 6px; right: 6px; background: #c2410c; color: white; padding: 2px 8px; }`, html: `<div class="b card">Karta<span class="badge">NOWE</span></div>` },
      { tag: "position: fixed", kind: "wartosc", desc: "Przyklejony do okna przeglądarki — nie przewija się (np. przycisk „do góry”, baner cookies).", example: `.fab { position: fixed; right: 12px; bottom: 12px; }`, html: `<button class="fab">↑ Do góry</button><p>Przewiń…</p>`.concat("<p>tekst</p>".repeat(12)) },
      { tag: "position: sticky", kind: "wartosc", desc: "Normalnie w przepływie, a po przewinięciu do progu (`top`) przykleja się. Typowe dla nagłówków.", example: `h3 { position: sticky; top: 0; background: gold; margin: 0; }`, html: `<h3>Przyklejony nagłówek</h3>`.concat("<p>Przewiń podgląd…</p>".repeat(12)) },
      { tag: "top / right / bottom / left / inset", kind: "wlasciwosc", desc: "Odległości dla elementów pozycjonowanych. `inset: 0` = wszystkie cztery naraz (np. nakładka na cały rodzic).", example: `.wrap { position: relative; height: 80px; }
.overlay { position: absolute; inset: 0; background: rgb(0 0 0 / 40%); }`, html: `<div class="b wrap">Treść<div class="overlay"></div></div>` },
      { tag: "z-index", kind: "wlasciwosc", desc: "Kolejność warstw — wyższy na wierzchu. Działa dla elementów z `position` innym niż static (i w flex/grid).", example: `.a, .c { position: absolute; width: 80px; height: 50px; }
.a { background: #e76f51; z-index: 2; }
.c { background: #2a9d8f; left: 50px; top: 20px; z-index: 1; }`, html: `<div style="position:relative;height:80px"><div class="a"></div><div class="c"></div></div>` },
      { tag: "float / clear", kind: "wlasciwosc", desc: "Opływanie tekstem (np. zdjęcie w artykule). Do układania strony używaj Flex/Grid, nie float.", example: `img { float: left; margin: 0 12px 6px 0; }`, html: `<img src="https://picsum.photos/id/1062/80/80" alt=""><p>Tekst opływa obraz z prawej strony. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>` },
    ],
  },
  {
    id: "flex",
    title: "Flexbox",
    intro: "Układ w jednym wymiarze (wiersz lub kolumna). display: flex ustawiasz na rodzicu.",
    items: [
      { tag: "display: flex", kind: "wartosc", desc: "Włącza flexbox: bezpośrednie dzieci ustawiają się w wierszu.", example: `.row { display: flex; }`, html: `<div class="row"><div class="b">1</div><div class="b">2</div><div class="b">3</div></div>` },
      { tag: "flex-direction", kind: "wlasciwosc", desc: "Kierunek osi głównej: `row` (domyślnie), `column`, `row-reverse`, `column-reverse`.", example: `.col { display: flex; flex-direction: column; }`, html: `<div class="col"><div class="b">1</div><div class="b">2</div><div class="b">3</div></div>` },
      { tag: "justify-content", kind: "wlasciwosc", desc: "Rozkład wzdłuż osi głównej: `flex-start`, `center`, `flex-end`, `space-between`, `space-around`, `space-evenly`.", example: `.row { display: flex; justify-content: space-between; }`, html: `<div class="row"><div class="b">1</div><div class="b">2</div><div class="b">3</div></div>` },
      { tag: "align-items", kind: "wlasciwosc", desc: "Wyrównanie w osi poprzecznej: `stretch` (domyślnie), `flex-start`, `center`, `flex-end`, `baseline`.", example: `.row { display: flex; align-items: center; height: 100px; background: #eee; }`, html: `<div class="row"><div class="b">mały</div><div class="b" style="padding:30px 8px">duży</div></div>` },
      { tag: "flex-wrap", kind: "wlasciwosc", desc: "`wrap` — elementy przechodzą do nowej linii, gdy brakuje miejsca.", example: `.row { display: flex; flex-wrap: wrap; gap: 6px; }
.row > * { width: 90px; }`, html: `<div class="row"><div class="b">1</div><div class="b">2</div><div class="b">3</div><div class="b">4</div><div class="b">5</div><div class="b">6</div></div>` },
      { tag: "gap", kind: "wlasciwosc", desc: "Odstęp między elementami flex/grid (bez marginesów). Dwie wartości: wiersze i kolumny.", example: `.row { display: flex; gap: 20px; }`, html: `<div class="row"><div class="b">1</div><div class="b">2</div><div class="b">3</div></div>` },
      { tag: "flex (grow shrink basis)", kind: "wlasciwosc", desc: "Na dziecku: jak dzieli miejsce. `flex: 1` — rośnij równo; `flex: 0 0 200px` — stałe 200px; `flex: 1 1 220px` — od 220px, rośnij i kurcz się.", example: `.row { display: flex; gap: 6px; }
.side { flex: 0 0 100px; }
.main { flex: 1; }`, html: `<div class="row"><div class="b side">stałe 100px</div><div class="b main">flex: 1 — reszta</div></div>` },
      { tag: "order / align-self", kind: "wlasciwosc", desc: "Na dziecku: `order` zmienia kolejność wyświetlania, `align-self` wyrównuje jeden element inaczej.", example: `.row { display: flex; align-items: flex-start; height: 80px; }
.last { order: -1; }
.down { align-self: flex-end; }`, html: `<div class="row"><div class="b">1</div><div class="b down">2 (na dole)</div><div class="b last">3 (pierwszy)</div></div>` },
      { tag: "margin-left: auto", kind: "wartosc", desc: "Sztuczka we flexie: auto-margines zabiera całe wolne miejsce, więc odpycha element na koniec.", example: `nav { display: flex; gap: 10px; }
.logo { margin-right: auto; font-weight: 700; }`, html: `<nav><span class="logo">Logo</span><a href="#">Home</a><a href="#">Kontakt</a></nav>` },
    ],
  },
  {
    id: "grid",
    title: "CSS Grid",
    intro: "Układ w dwóch wymiarach: kolumny i wiersze.",
    items: [
      { tag: "display: grid", kind: "wartosc", desc: "Włącza siatkę na rodzicu. Dzieci wypełniają kolejne komórki.", example: `.g { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 6px; }`, html: `<div class="g"><div class="b">1</div><div class="b">2</div><div class="b">3</div><div class="b">4</div></div>` },
      { tag: "grid-template-columns", kind: "wlasciwosc", desc: "Szerokości kolumn: px, %, `fr` (część wolnego miejsca), `auto`. Np. `200px 1fr` — menu i treść.", example: `.g { display: grid; grid-template-columns: 100px 1fr 2fr; gap: 6px; }`, html: `<div class="g"><div class="b">100px</div><div class="b">1fr</div><div class="b">2fr</div></div>` },
      { tag: "repeat() / minmax()", kind: "wartosc", desc: "`repeat(3, 1fr)` — 3 równe kolumny. `minmax(150px, 1fr)` — co najmniej 150px.", example: `.g { display: grid; grid-template-columns: repeat(4, minmax(60px, 1fr)); gap: 6px; }`, html: `<div class="g"><div class="b">1</div><div class="b">2</div><div class="b">3</div><div class="b">4</div></div>` },
      { tag: "auto-fill / auto-fit", kind: "wartosc", desc: "Tyle kolumn, ile się zmieści — responsywna galeria bez media queries.", example: `.g {
  display: grid; gap: 6px;
  grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
}`, html: `<div class="g"><div class="b">1</div><div class="b">2</div><div class="b">3</div><div class="b">4</div><div class="b">5</div><div class="b">6</div><div class="b">7</div></div>` },
      { tag: "grid-template-rows", kind: "wlasciwosc", desc: "Wysokości wierszy. `auto 1fr auto` — nagłówek i stopka wg treści, środek rozciągnięty.", example: `.g { display: grid; grid-template-rows: 30px 80px; gap: 6px; }`, html: `<div class="g"><div class="b">30px</div><div class="b">80px</div></div>` },
      { tag: "grid-column / grid-row", kind: "wlasciwosc", desc: "Ile komórek zajmuje element: `span 2` albo od linii do linii `1 / 3`. `1 / -1` = cała szerokość.", example: `.g { display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; }
.wide { grid-column: span 2; }
.full { grid-column: 1 / -1; }`, html: `<div class="g"><div class="b wide">span 2</div><div class="b">1</div><div class="b full">1 / -1</div></div>` },
      { tag: "grid-template-areas / grid-area", kind: "wlasciwosc", desc: "Układ strony rysowany nazwami obszarów; dzieci przypisujesz przez `grid-area`.", example: `.page {
  display: grid; gap: 4px;
  grid-template-columns: 80px 1fr;
  grid-template-areas: "head head" "nav main" "foot foot";
}
header { grid-area: head; } nav { grid-area: nav; }
main { grid-area: main; } footer { grid-area: foot; }`, html: `<div class="page"><header class="b">header</header><nav class="b">nav</nav><main class="b">main</main><footer class="b">footer</footer></div>` },
      { tag: "place-items", kind: "wlasciwosc", desc: "Skrót `align-items` + `justify-items`. `place-items: center` wyśrodkowuje zawartość komórki w obu osiach.", example: `.g { display: grid; place-items: center; height: 100px; background: #eee; }`, html: `<div class="g"><div class="b">środek</div></div>` },
    ],
  },
  {
    id: "rwd",
    title: "Responsywność i jednostki",
    intro: "Dopasowanie strony do ekranu telefonu, tabletu i komputera.",
    items: [
      { tag: "@media (min-width)", kind: "regula", desc: "Style warunkowe. Mobile-first: baza dla telefonu, a od danej szerokości w górę dodajesz układ dla większych ekranów. Wymaga <meta viewport> w HTML.", example: `.g { display: grid; grid-template-columns: 1fr; gap: 6px; }
@media (min-width: 400px) {
  .g { grid-template-columns: repeat(3, 1fr); }
}`, html: `<div class="g"><div class="b">1</div><div class="b">2</div><div class="b">3</div></div><p>Zmień szerokość podglądu (przeciągnij róg).</p>` },
      { tag: "@media (prefers-color-scheme)", kind: "regula", desc: "Reaguje na motyw systemu (jasny/ciemny).", example: `@media (prefers-color-scheme: dark) {
  body { background: #15171c; color: #e8e8ea; }
}`, preview: false },
      { tag: "@media (prefers-reduced-motion)", kind: "regula", desc: "Użytkownik prosi o mniej animacji — wyłącz lub ogranicz ruch.", example: `@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; transition: none !important; }
}`, preview: false },
      { tag: "@media print", kind: "regula", desc: "Style tylko do wydruku (np. ukryj menu).", example: `@media print { nav, footer { display: none; } }`, preview: false },
      { tag: "px / rem / em / %", kind: "jednostka", desc: "`px` — stałe piksele; `rem` — względem czcionki <html> (16px); `em` — względem czcionki elementu; `%` — względem rodzica.", example: `.a { width: 50%; padding: 1em; font-size: 1.25rem; border: 1px solid; }`, html: `<div class="a">50% rodzica, padding 1em, czcionka 1.25rem</div>` },
      { tag: "vw / vh / dvh", kind: "jednostka", desc: "Procent szerokości / wysokości okna. `100dvh` uwzględnia zmieniający się pasek przeglądarki w telefonie.", example: `.hero { min-height: 60vh; display: grid; place-items: center; background: #e3f1ef; }`, html: `<div class="hero">60vh</div>` },
      { tag: "clamp() / min() / max()", kind: "wartosc", desc: "`clamp(min, idealna, max)` — płynna wartość w granicach. `min(100%, 600px)` — mniejsza z wartości.", example: `h1 { font-size: clamp(1.25rem, 6vw, 2.5rem); }
.box { width: min(100%, 250px); }`, html: `<h1>Płynny nagłówek</h1><div class="b box">min(100%, 250px)</div>` },
    ],
  },
  {
    id: "zmienne",
    title: "Zmienne i funkcje",
    intro: "Wartości wielokrotnego użytku i obliczenia.",
    items: [
      { tag: "--zmienna / var()", kind: "wartosc", desc: "Zmienna CSS (custom property): definiujesz w `:root`, czytasz przez `var()`. Druga wartość w var() to wartość zapasowa.", example: `:root { --accent: #c2410c; --radius: 10px; }
.btn { background: var(--accent); border-radius: var(--radius); color: white; border: 0; padding: 8px 14px; }
.ghost { color: var(--nieistnieje, gray); }`, html: `<button class="btn">Przycisk</button><p class="ghost">wartość zapasowa</p>` },
      { tag: ":root", kind: "selektor", desc: "Korzeń dokumentu (<html>) — miejsce na zmienne globalne.", example: `:root { --space: 16px; }`, preview: false },
      { tag: "calc()", kind: "wartosc", desc: "Obliczenia na różnych jednostkach: `calc(100% - 80px)`, `calc(var(--space) * 2)`.", example: `.box { width: calc(100% - 60px); }`, html: `<div class="b box">100% − 60px</div>` },
      { tag: "url()", kind: "wartosc", desc: "Ścieżka do pliku (obraz, czcionka). Liczona względem pliku CSS, nie HTML (stąd często `../img/`).", example: `.hero { background-image: url("../img/hero.jpg"); }`, preview: false },
      { tag: "@import / @font-face", kind: "regula", desc: "`@import` dołącza inny plik CSS (np. Google Fonts). `@font-face` definiuje własną czcionkę z pliku.", example: `@import url("https://fonts.googleapis.com/css2?family=Inter&display=swap");
@font-face {
  font-family: "MojaCzcionka";
  src: url("../fonts/moja.woff2") format("woff2");
}`, preview: false },
    ],
  },
  {
    id: "efekty",
    title: "Efekty: przejścia, transformacje, animacje",
    intro: "Ruch i wizualne dodatki. Używaj z umiarem.",
    items: [
      { tag: "transition", kind: "wlasciwosc", desc: "Płynna zmiana właściwości (np. przy :hover): właściwość, czas, krzywa, opóźnienie. Ustawiasz na stylu zwykłym, nie na :hover.", example: `.btn { background: #1d5c54; color: white; border: 0; padding: 10px 16px; transition: background 0.3s ease, transform 0.3s; }
.btn:hover { background: #c2410c; transform: translateY(-3px); }`, html: `<button class="btn">Najedź</button>` },
      { tag: "transform", kind: "wlasciwosc", desc: "Przesunięcie `translate()`, obrót `rotate()`, skala `scale()`, pochylenie `skew()` — bez wpływu na układ innych elementów.", example: `.t1 { transform: translateX(30px); }
.t2 { transform: rotate(10deg); }
.t3 { transform: scale(1.2); }`, html: `<div class="b t1">translate</div><br><div class="b t2" style="width:100px">rotate</div><br><div class="b t3" style="width:100px">scale</div>` },
      { tag: "@keyframes / animation", kind: "regula", desc: "Animacja z klatkami kluczowymi: nazwa, czas, krzywa, liczba powtórzeń (`infinite`), kierunek (`alternate`).", example: `@keyframes bounce {
  from { transform: translateY(0); }
  to   { transform: translateY(-20px); }
}
.ball { width: 40px; height: 40px; border-radius: 50%; background: #e76f51;
        animation: bounce 0.5s ease-in-out infinite alternate; margin-top: 24px; }`, html: `<div class="ball"></div>` },
      { tag: "filter", kind: "wlasciwosc", desc: "Efekty graficzne: `blur()`, `grayscale()`, `brightness()`, `contrast()`, `drop-shadow()`.", example: `img { width: 90px; }
.g { filter: grayscale(1); }
.bl { filter: blur(3px); }`, html: `<img src="https://picsum.photos/id/1011/180/120" alt=""> <img class="g" src="https://picsum.photos/id/1011/180/120" alt=""> <img class="bl" src="https://picsum.photos/id/1011/180/120" alt="">` },
      { tag: "cursor", kind: "wlasciwosc", desc: "Kształt kursora: `pointer` (rączka nad klikalnym), `not-allowed`, `grab`, `text`.", example: `.p { cursor: pointer; }
.n { cursor: not-allowed; }`, html: `<span class="b p">pointer</span> <span class="b n">not-allowed</span>` },
    ],
  },
];
