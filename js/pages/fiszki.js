/* Fiszki: odwracanie, ocena „umiem / nie umiem”, tasowanie */
WDAI.ready(() => {
  const W = WDAI;
  const sel = W.$("#f-mod");
  const card = W.$("#card");

  sel.innerHTML = `<option value="all">Wszystkie moduły</option>` +
    W.modules.map((m) => `<option value="${m.id}">${W.esc(m.code)} · ${W.esc(m.short)}</option>`).join("");
  sel.value = W.param("m") && W.module(W.param("m")) ? W.param("m") : "all";
  if (W.param("tryb") === "nie") W.$('input[name="mode"][value="nie"]').checked = true;

  // wszystkie fiszki z kluczem do zapisu stanu
  const all = W.modules.flatMap((m) => m.flashcards.map(([q, a], i) => ({ key: `${m.id}-${i}`, m, q, a })));
  let deck = [];
  let i = 0;

  const shuffle = (arr) => {               // Fisher–Yates
    const a = [...arr];
    for (let k = a.length - 1; k > 0; k--) {
      const j = Math.floor(Math.random() * (k + 1));
      [a[k], a[j]] = [a[j], a[k]];
    }
    return a;
  };

  function build() {
    const mode = W.$('input[name="mode"]:checked').value;
    const flash = W.store.get().flash;
    deck = all.filter((c) => (sel.value === "all" || c.m.id === sel.value) && (mode === "all" || flash[c.key] === "unknown"));
    i = 0;
    show();
  }

  function show() {
    card.classList.remove("flipped");
    const flash = W.store.get().flash;
    const known = deck.filter((c) => flash[c.key] === "known").length;
    const unknown = deck.filter((c) => flash[c.key] === "unknown").length;
    W.$("#summary").textContent = `W tej talii: umiem ${known} · nie umiem ${unknown} · nieocenione ${deck.length - known - unknown}`;
    if (!deck.length) {
      W.$("#f-q").textContent = "Brak fiszek w tym trybie. Brawo!";
      W.$("#f-a").textContent = "";
      W.$("#f-tag").textContent = "";
      W.$("#pos").textContent = "0 / 0";
      return;
    }
    const c = deck[i];
    W.$("#f-tag").textContent = `${c.m.code} · ${c.m.short}`;
    W.$("#f-tag").parentElement.dataset.tech = c.m.tech;
    W.$("#f-q").innerHTML = W.fmt(c.q);
    W.$("#f-a").innerHTML = W.fmt(c.a);
    W.$("#pos").textContent = `${i + 1} / ${deck.length}${flash[c.key] ? (flash[c.key] === "known" ? " · umiem" : " · nie umiem") : ""}`;
  }

  const go = (d) => { if (deck.length) { i = (i + d + deck.length) % deck.length; show(); } };
  const rate = (val) => {
    if (!deck.length) return;
    W.store.update((s) => { s.flash[deck[i].key] = val; });
    go(1);
  };

  card.addEventListener("click", () => card.classList.toggle("flipped"));
  W.$("#prev").addEventListener("click", () => go(-1));
  W.$("#next").addEventListener("click", () => go(1));
  W.$("#yes").addEventListener("click", () => rate("known"));
  W.$("#no").addEventListener("click", () => rate("unknown"));
  W.$("#shuffle").addEventListener("click", () => { deck = shuffle(deck); i = 0; show(); });
  W.$("#filters").addEventListener("change", build);

  document.addEventListener("keydown", (e) => {
    if (e.target.closest("input, select, textarea")) return;
    if (e.code === "Space" && e.target !== card) { e.preventDefault(); card.classList.toggle("flipped"); }
    if (e.key === "ArrowRight") go(1);
    if (e.key === "ArrowLeft") go(-1);
    if (e.key === "1") rate("unknown");
    if (e.key === "2") rate("known");
  });

  build();
});
