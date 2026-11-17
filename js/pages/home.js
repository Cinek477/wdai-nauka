/* Strona startowa */
WDAI.ready(() => {
  const W = WDAI;
  const s = W.store.get();
  const root = W.$("#home");

  // pierwszy nieukończony temat: najpierw przewodnik Lab 3, potem moduły po kolei
  const order = [...W.modules.filter((m) => m.guide), ...W.modules.filter((m) => !m.guide)];
  let nextM = null, nextT = null;
  for (const m of order) {
    const t = m.topics.find((x) => !W.isDone(m, x));
    if (t) { nextM = m; nextT = t; break; }
  }

  const unknown = Object.values(s.flash).filter((v) => v === "unknown").length;
  const lab3 = W.tasks.find((t) => t.id === "lab3");
  const lab3Done = lab3.items.filter((i) => s.tasks[`lab3.${i.id}`]);
  const lab3Pts = lab3Done.reduce((sum, i) => sum + (i.pts || 0), 0);
  const quizzes = Object.entries(s.quiz).filter(([, v]) => v?.last);

  const card = (m) => {
    const st = W.moduleStats(m);
    return `<a class="card module-card" data-tech="${m.tech}" href="modul.html?id=${m.id}">
      <small>${W.esc(m.code)} · ${m.guide ? "PRZEWODNIK" : W.techName[m.tech]}</small>
      <strong>${W.esc(m.title)}</strong>
      <div class="bar"><span style="width:${st.pct}%"></span></div>
      <span class="muted" style="font-size:.85rem">${st.done === st.total ? "Ukończony ✔" : `${st.done} / ${st.total} tematów`}</span>
    </a>`;
  };

  root.innerHTML = `
    <section class="hero" aria-labelledby="h-hero">
      <span style="opacity:.85;font-size:.9rem">Teraz: Lab 3 — JavaScript</span>
      <h1 id="h-hero">${nextT ? `Kontynuuj: ${W.esc(nextT.title)}` : "Wszystko opanowane — czas na quiz!"}</h1>
      ${nextM ? `<span style="opacity:.85">${W.esc(nextM.code)} · ${W.esc(nextM.title)}</span>
      <div class="bar"><span style="width:${W.moduleStats(nextM).pct}%"></span></div>
      <a class="btn" href="modul.html?id=${nextM.id}#${nextT.id}">Przejdź do lekcji →</a>` : `<a class="btn" href="quiz.html">Rozwiąż quiz</a>`}
    </section>

    <section aria-labelledby="h-today">
      <h2 id="h-today" style="margin-bottom:12px">Na dziś</h2>
      <div class="grid-cards">
        <a class="card module-card" data-tech="js" href="modul.html?id=lab3">
          <small>LAB 3 · PRZEWODNIK</small>
          <strong>Stoper, generator haseł, API, gra</strong>
          <span class="muted" style="font-size:.9rem">Plan, potrzebna składnia i szkielety z TODO</span>
        </a>
        <a class="card module-card" data-tech="gen" href="fiszki.html${unknown ? "?tryb=nie" : ""}">
          <small>FISZKI</small>
          <strong>${unknown ? `${unknown} do powtórki` : "Powtórz fiszki"}</strong>
          <span class="muted" style="font-size:.9rem">${unknown ? "oznaczone „nie umiem”" : "sprawdź, co pamiętasz"}</span>
        </a>
        <a class="card module-card" data-tech="js" href="zadania.html">
          <small>ZADANIA · LAB 3</small>
          <strong>${lab3Done.length} / ${lab3.items.length} ćwiczenia</strong>
          <span class="muted" style="font-size:.9rem">${lab3Pts.toFixed(1)} / ${lab3.max.toFixed(1)} pkt</span>
        </a>
      </div>
    </section>

    <section aria-labelledby="h-guides">
      <h2 id="h-guides" style="margin-bottom:12px">Przewodniki</h2>
      <div class="grid-cards">${W.modules.filter((m) => m.guide).map(card).join("")}</div>
    </section>

    <section aria-labelledby="h-mods">
      <div class="row" style="margin-bottom:12px">
        <h2 id="h-mods">Moduły</h2>
        <label class="spacer muted" for="filter" style="font-size:.9rem">Pokaż</label>
        <select id="filter">
          <option value="all">Wszystkie</option>
          <option value="progress">W trakcie</option>
          <option value="done">Ukończone</option>
          <option value="todo">Nierozpoczęte</option>
        </select>
      </div>
      <div class="grid-cards" id="mod-grid"></div>
    </section>

    ${quizzes.length ? `<section class="card" aria-labelledby="h-quiz">
      <h2 id="h-quiz" style="font-size:1.1rem;margin-bottom:8px">Twoje quizy</h2>
      <ul style="margin:0;padding-left:18px">${quizzes.map(([id, v]) => {
        const m = W.module(id);
        return `<li>${W.esc(m ? m.short : "Wszystkie moduły")}: ostatnio ${v.last}, najlepiej ${v.best}</li>`;
      }).join("")}</ul>
    </section>` : ""}

    <section class="card" aria-labelledby="h-help">
      <h2 id="h-help" style="font-size:1.1rem;margin-bottom:8px">Jak się uczyć z tej aplikacji</h2>
      <ol style="margin:0;padding-left:20px">
        <li><strong>Teoria</strong> — przeczytaj krótko, o co chodzi.</li>
        <li><strong>Składnia</strong> — najedź na numer ❶ w legendzie, a podświetli się fragment kodu.</li>
        <li><strong>Spróbuj</strong> — zmieniaj kod w piaskownicy i od razu patrz na podgląd i konsolę.</li>
        <li><strong>Opanowane</strong> — odhacz temat; postęp zapisuje się w przeglądarce.</li>
        <li><strong>Fiszki i quiz</strong> — sprawdź, co zapamiętałeś.</li>
      </ol>
    </section>`;

  const grid = W.$("#mod-grid");
  const mods = W.modules.filter((m) => !m.guide);
  const render = (mode) => {
    const list = mods.filter((m) => {
      const st = W.moduleStats(m);
      if (mode === "done") return st.done === st.total;
      if (mode === "progress") return st.done > 0 && st.done < st.total;
      if (mode === "todo") return st.done === 0;
      return true;
    });
    grid.innerHTML = list.length ? list.map(card).join("") : '<p class="muted">Brak modułów w tej kategorii.</p>';
  };
  W.$("#filter").addEventListener("change", (e) => render(e.target.value));
  render("all");
});
