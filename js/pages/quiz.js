/* Quiz: losowe pytania, natychmiastowa ocena, wyjaśnienia, najlepszy wynik */
WDAI.ready(() => {
  const W = WDAI;
  const sel = W.$("#q-mod");
  const box = W.$("#quiz");

  sel.innerHTML = `<option value="all">Wszystkie moduły</option>` +
    W.modules.map((m) => `<option value="${m.id}">${W.esc(m.code)} · ${W.esc(m.short)}</option>`).join("");
  if (W.param("m") && W.module(W.param("m"))) sel.value = W.param("m");

  let questions = [];
  let i = 0;
  let score = 0;
  let wrong = [];
  let timerId = null;
  let seconds = 0;

  const shuffle = (arr) => {
    const a = [...arr];
    for (let k = a.length - 1; k > 0; k--) {
      const j = Math.floor(Math.random() * (k + 1));
      [a[k], a[j]] = [a[j], a[k]];
    }
    return a;
  };

  function start(pool) {
    const n = Number(W.$("#q-n").value);
    questions = shuffle(pool).slice(0, n);
    i = 0; score = 0; wrong = []; seconds = 0;
    clearInterval(timerId);
    timerId = setInterval(() => {
      seconds++;
      const t = W.$("#q-time");
      if (t) t.textContent = `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
    }, 1000);
    showQuestion();
  }

  function poolFor(id) {
    return W.modules
      .filter((m) => id === "all" || m.id === id)
      .flatMap((m) => m.quiz.map((q) => ({ ...q, m })));
  }

  function showQuestion() {
    const q = questions[i];
    box.innerHTML = `
      <div class="row" style="margin-bottom:14px">
        <strong>Pytanie ${i + 1} z ${questions.length}</strong>
        <div class="bar" style="flex:1;min-width:120px"><span style="width:${(i / questions.length) * 100}%"></span></div>
        <span class="muted" id="q-time" style="font-family:var(--font-mono)">0:00</span>
      </div>
      <section class="card" style="display:flex;flex-direction:column;gap:14px">
        <span class="tag" data-tech="${q.m.tech}">${W.esc(q.m.code)} · ${W.esc(q.m.short)}</span>
        <h2 style="font-size:1.2rem">${W.fmt(q.q)}</h2>
        ${q.code ? W.codeBlock(q.code, q.lang || "js") : ""}
        <div class="options">
          ${q.options.map((o, k) => `<button class="option" data-k="${k}"><span>${String.fromCharCode(65 + k)}) ${W.esc(o)}</span><span class="mark"></span></button>`).join("")}
        </div>
        <div id="explain"></div>
      </section>`;
  }

  box.addEventListener("click", (e) => {
    const opt = e.target.closest(".option");
    if (opt && !opt.disabled) return answer(Number(opt.dataset.k));
    if (e.target.closest("#next-q")) {
      i++;
      return i < questions.length ? showQuestion() : finish();
    }
    if (e.target.closest("#retry-wrong")) start(wrong);
    if (e.target.closest("#retry-all")) start(poolFor(sel.value));
  });

  function answer(k) {
    const q = questions[i];
    const opts = W.$$(".option", box);
    opts.forEach((b) => (b.disabled = true));
    opts[q.answer].classList.add("correct");
    W.$(".mark", opts[q.answer]).textContent = "✔ poprawna";
    if (k === q.answer) score++;
    else {
      opts[k].classList.add("wrong");
      W.$(".mark", opts[k]).textContent = "✗ Twój wybór";
      wrong.push(q);
    }
    W.$("#explain").innerHTML = `
      ${q.explain ? `<div class="tip"><strong>Wyjaśnienie:</strong> ${W.fmt(q.explain)}</div>` : ""}
      <div class="row" style="margin-top:12px">
        <a href="modul.html?id=${q.m.id}" class="muted">Lekcja: ${W.esc(q.m.short)}</a>
        <button class="btn btn-primary spacer" id="next-q">${i + 1 < questions.length ? "Dalej →" : "Zobacz wynik"}</button>
      </div>`;
    W.$("#next-q").focus();
  }

  function finish() {
    clearInterval(timerId);
    const key = sel.value;
    const result = `${score}/${questions.length}`;
    W.store.update((s) => {
      const prev = s.quiz[key];
      const prevBest = prev ? Number(prev.best.split("/")[0]) / Number(prev.best.split("/")[1]) : -1;
      s.quiz[key] = { last: result, best: score / questions.length >= prevBest ? result : prev.best };
    });
    const best = W.store.get().quiz[key].best;
    const pct = Math.round((score / questions.length) * 100);
    box.innerHTML = `
      <section class="card" style="display:flex;flex-direction:column;gap:12px">
        <h2>Wynik: ${score} / ${questions.length} (${pct}%)</h2>
        <p class="muted">Najlepszy wynik w tym zestawie: ${best} · czas ${Math.floor(seconds / 60)} min ${seconds % 60} s</p>
        ${wrong.length ? `<div><strong>Do powtórki:</strong><ul>${wrong.map((q) =>
          `<li><a href="modul.html?id=${q.m.id}">${W.esc(q.m.short)}</a>: ${W.fmt(q.q)}</li>`).join("")}</ul></div>` : "<p>Bezbłędnie! 🎉</p>"}
        <div class="row">
          ${wrong.length ? '<button class="btn btn-primary" id="retry-wrong">Powtórz błędne</button>' : ""}
          <button class="btn" id="retry-all">Nowy quiz</button>
        </div>
      </section>`;
  }

  W.$("#setup").addEventListener("submit", (e) => {
    e.preventDefault();
    start(poolFor(sel.value));
  });
  start(poolFor(sel.value));
});
