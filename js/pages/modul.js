/* Strona lekcji: modul.html?id=m7#fetch */
WDAI.ready(() => {
  const W = WDAI;
  const root = W.$("#lesson");
  const m = W.module(W.param("id")) || W.modules[0];
  document.title = `${m.title} — WDAI nauka`;

  /* --- budowanie HTML --- */
  const theoryHtml = (items) => items.map((x) =>
    Array.isArray(x)
      ? `<ul>${x.map((li) => `<li>${W.fmt(li)}</li>`).join("")}</ul>`
      : `<p>${W.fmt(x)}</p>`).join("");

  const syntaxHtml = (s, ti, si) => `
    <figure class="syntax" style="margin:0" data-syntax="${ti}-${si}">
      <div class="syntax-head">
        <strong>${W.esc(s.title || "Składnia")}</strong>
        <span class="lang">${W.esc(s.lang)}</span>
        <button class="btn btn-sm spacer" data-copy="${ti}-${si}">Kopiuj</button>
      </div>
      <div class="syntax-body ${s.legend ? "has-legend" : ""}">
        ${W.codeBlock(s.code, s.lang)}
        ${s.legend ? `<dl class="legend">${s.legend.map(([mk, txt]) =>
          `<div data-mk="${mk}"><dt><span class="mk">${mk}</span></dt><dd>${W.fmt(txt)}</dd></div>`).join("")}</dl>` : ""}
      </div>
      ${s.explain ? `<figcaption class="syntax-explain">${W.fmt(s.explain)}</figcaption>` : ""}
    </figure>`;

  const mistakesHtml = (list) => list.map((x) => `
    <div class="mistake">
      <div class="bad"><strong>✗ Źle</strong>${W.codeBlock(x.bad, x.lang || "js")}</div>
      <div class="good"><strong>✓ Dobrze</strong>${W.codeBlock(x.good, x.lang || "js")}</div>
    </div>
    <p class="muted" style="margin-top:-6px">${W.fmt(x.why)}</p>`).join("");

  const topicHtml = (t, ti) => `
    <section class="topic" id="${t.id}" aria-labelledby="h-${t.id}">
      <div class="row">
        <span class="section-label">TEMAT ${ti + 1} / ${m.topics.length}</span>
        <label class="spacer row" style="gap:6px;font-size:.9rem">
          <input type="checkbox" data-topic="${t.id}" ${W.isDone(m, t) ? "checked" : ""}> Opanowane
        </label>
      </div>
      <h2 id="h-${t.id}">${W.esc(t.title)}</h2>
      <span class="section-label">TEORIA</span>
      <div class="theory">${theoryHtml(t.theory || [])}</div>
      ${t.syntax?.length ? `<span class="section-label">SKŁADNIA</span>${t.syntax.map((s, si) => syntaxHtml(s, ti, si)).join("")}` : ""}
      ${t.mistakes?.length ? `<span class="section-label">CZĘSTE BŁĘDY</span>${mistakesHtml(t.mistakes)}` : ""}
      ${t.tip ? `<div class="tip"><strong>Wskazówka:</strong> ${W.fmt(t.tip)}</div>` : ""}
      ${t.try ? `<span class="section-label">SPRÓBUJ</span><div data-pg="${ti}"><p class="muted">Piaskownica wczyta się po przewinięciu…</p></div>` : ""}
    </section>`;

  const stats = W.moduleStats(m);
  root.innerHTML = `
    <header class="row" style="align-items:flex-start;flex-direction:column;gap:12px" data-tech="${m.tech}">
      <div class="row">
        <span class="tag">${m.guide ? "PRZEWODNIK" : W.techName[m.tech]}</span>
        <span class="muted" style="font-size:.9rem">${W.esc(m.lab)} · efekty: ${W.esc(m.syllabus)}</span>
      </div>
      <h1>${W.esc(m.code)} · ${W.esc(m.title)}</h1>
      <p style="max-width:70ch">${W.fmt(m.intro)}</p>
      <div class="row" style="width:100%">
        <div class="bar" style="width:240px"><span id="mod-bar" style="width:${stats.pct}%"></span></div>
        <span class="muted" id="mod-count">${stats.done} / ${stats.total} tematów</span>
        <a class="btn spacer" href="fiszki.html?m=${m.id}">Fiszki modułu</a>
        <a class="btn btn-primary" href="quiz.html?m=${m.id}">Quiz modułu</a>
      </div>
    </header>

    <section class="card" aria-labelledby="h-topics">
      <h2 id="h-topics" style="font-size:1.1rem;margin-bottom:10px">Tematy</h2>
      <ol class="topic-list">
        ${m.topics.map((t) => `<li><label>
          <input type="checkbox" data-topic="${t.id}" ${W.isDone(m, t) ? "checked" : ""}>
          <a href="#${t.id}">${W.esc(t.title)}</a></label></li>`).join("")}
      </ol>
    </section>

    <div class="lesson-layout">
      <div>${m.topics.map(topicHtml).join("")}</div>
      <aside class="toc" aria-label="Spis treści">
        <strong>Na tej stronie</strong>
        <ol>${m.topics.map((t) => `<li><a href="#${t.id}">${W.esc(t.title)}</a></li>`).join("")}</ol>
      </aside>
    </div>

    ${lessonNav()}`;

  function lessonNav() {
    const list = W.modules;
    const i = list.indexOf(m);
    const prev = list[i - 1];
    const next = list[i + 1];
    return `<nav class="lesson-nav" aria-label="Poprzedni i następny moduł">
      ${prev ? `<a class="btn" href="modul.html?id=${prev.id}">← ${W.esc(prev.short)}</a>` : ""}
      ${next ? `<a class="btn btn-primary spacer" href="modul.html?id=${next.id}">${W.esc(next.short)} →</a>` : ""}
    </nav>`;
  }

  /* --- postęp: oba checkboxy danego tematu zsynchronizowane --- */
  root.addEventListener("change", (e) => {
    const box = e.target.closest("input[data-topic]");
    if (!box) return;
    const t = m.topics.find((x) => x.id === box.dataset.topic);
    W.store.update((s) => { s.topics[W.topicKey(m, t)] = box.checked; });
    W.$$(`input[data-topic="${t.id}"]`, root).forEach((b) => (b.checked = box.checked));
    const st = W.moduleStats(m);
    W.$("#mod-bar").style.width = `${st.pct}%`;
    W.$("#mod-count").textContent = `${st.done} / ${st.total} tematów`;
    W.refreshChrome();
  });

  /* --- kopiowanie kodu i podświetlanie numerków --- */
  root.addEventListener("click", async (e) => {
    const btn = e.target.closest("[data-copy]");
    if (!btn) return;
    const [ti, si] = btn.dataset.copy.split("-").map(Number);
    const code = m.topics[ti].syntax[si].code.trim();
    try {
      await navigator.clipboard.writeText(code);
      btn.textContent = "Skopiowano ✓";
    } catch {
      btn.textContent = "Zaznacz i skopiuj ręcznie";
    }
    setTimeout(() => (btn.textContent = "Kopiuj"), 1500);
  });

  const mark = (item, on) => {
    const fig = item.closest(".syntax");
    item.classList.toggle("active", on);
    W.$$(".tok-marker", fig).forEach((s) => {
      if (s.textContent === item.dataset.mk) s.classList.toggle("flash", on);
    });
  };
  root.addEventListener("mouseover", (e) => {
    const item = e.target.closest(".legend [data-mk]");
    if (item) mark(item, true);
  });
  root.addEventListener("mouseout", (e) => {
    const item = e.target.closest(".legend [data-mk]");
    if (item && !item.contains(e.relatedTarget)) mark(item, false);
  });

  /* --- piaskownice ładowane dopiero przy przewinięciu --- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      io.unobserve(en.target);
      W.playground(en.target, m.topics[Number(en.target.dataset.pg)].try);
    });
  }, { rootMargin: "300px" });
  W.$$("[data-pg]", root).forEach((el) => io.observe(el));

  // przewiń do #tematu po zbudowaniu strony (natychmiast, bez płynnego przewijania)
  if (location.hash) {
    requestAnimationFrame(() => {
      document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView({ behavior: "instant" });
    });
  }
});
