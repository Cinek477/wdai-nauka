# WDAI — nauka

Aplikacja webowa do nauki przedmiotu **Wprowadzenie do Aplikacji Internetowych** (2026/27).
Napisana w czystym **HTML, CSS i JavaScript**, bez bibliotek i bez budowania.

## Co jest w środku

- **Lekcje** (M1 Architektura i HTTP, M2 HTML5, M3 CSS, M4 Layout i RWD, M6 JS: język, M7 JS w przeglądarce):
  teoria → składnia z kolorowaniem i ponumerowaną legendą → częste błędy → **piaskownica** (edytor + podgląd na żywo + konsola).
- **Przewodnik po Lab 3**: plan, potrzebna składnia, szkielety z TODO i podpowiedzi — bez gotowych rozwiązań.
- **Fiszki** („umiem / nie umiem”, tasowanie, skróty klawiszowe).
- **Quiz** z wyjaśnieniami i zapisem najlepszego wyniku.
- **Zadania i punkty** — checklisty wymagań z Lab 1, Projektu 1 i Lab 3.
- Postęp zapisuje się w `localStorage`; jasny i ciemny motyw.

## Uruchomienie

Wystarczy dowolny serwer plików statycznych, np. w VS Code: prawy klik na `index.html` → **Open with Live Server**.

Albo z terminala:

```bash
npx serve .
```

## Struktura

```
index.html, modul.html, fiszki.html, quiz.html, zadania.html
css/style.css          wspólne style (zmienne, Grid, mobile-first)
js/core.js             postęp, kolorowanie składni, nawigacja, piaskownica
js/data/*.js           treść modułów, przewodnik Lab 3, zadania
js/pages/*.js          logika poszczególnych stron
PROJEKT.md             plan projektu według sylabusa
NOTATKI.md             notatki z literatury (React, Redux, mikroserwisy, REST/SOAP, testy…)
MOCKUP.md              szkice ekranów z opisem działania
```

## Plan dalszej pracy

Kolejne moduły (Bootstrap, React, Redux, serwer Node/Express, testy) i przewodnik po mikro projekcie — zgodnie z [PROJEKT.md](PROJEKT.md).
