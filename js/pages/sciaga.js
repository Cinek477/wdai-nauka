/* Ściągi HTML i CSS — wspólny skrypt.
   Którą ściągę pokazać, mówi <body data-ref="html|css">. */
WDAI.ready(() => {
  const W = WDAI;
  const type = document.body.dataset.ref === "css" ? "css" : "html";

  const CONFIG = {
    html: {
      data: W.refHtml,
      lang: "html",
      kinds: {
        blok: "blokowy",
        linia: "liniowy",
        pusty: "pusty — bez zamknięcia",
        head: "w <head>",
        atrybut: "atrybut / składnia",
      },
      chips: [["blok", "Blokowe"], ["linia", "Liniowe"], ["pusty", "Puste (bez zamknięcia)"], ["head", "Tylko w <head>"], ["atrybut", "Atrybuty i encje"]],
      doc: (it) => it.example,
    },
    css: {
      data: W.refCss,
      lang: "css",
      kinds: {
        selektor: "selektor",
        wlasciwosc: "właściwość",
        wartosc: "wartość / funkcja",
        regula: "reguła @ / kaskada",
        jednostka: "jednostka",
      },
      chips: [["selektor", "Selektory"], ["wlasciwosc", "Właściwości"], ["wartosc", "Wartości i funkcje"], ["regula", "Reguły @"], ["jednostka", "Jednostki"]],
      // .b = szare pudełko używane w przykładach
      doc: (it) => `<style>.b{background:#e3f1ef;border:1px solid #2a9d8f;padding:6px 10px;border-radius:4px}</style><style>${it.example}</style>${it.html || ""}`,
    },
  };
  const cfg = CONFIG[type];
  const list = W.$("#ref-list");
  const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "el";

  const items = cfg.data.flatMap((cat) => cat.items.map((it, i) => ({
    ...it,
    cat,
    key: `${cat.id}-${i}`,
    anchor: `${cat.id}-${slug(it.tag)}-${i}`,
    hay: `${it.tag} ${it.desc} ${(it.attrs || []).join(" ")} ${cat.title}`.toLowerCase(),
  })));

  /* --- filtry rodzaju i kategorie --- */
  W.$("#ref-kinds").innerHTML = `<span class="muted ref-label">Rodzaj:</span><button class="chip" aria-pressed="true" data-kind="all">Wszystkie</button>` +
    cfg.chips.map(([k, label]) => `<button class="chip" aria-pressed="false" data-kind="${k}">${W.esc(label)}</button>`).join("");
  W.$("#ref-cats").innerHTML = `<span class="muted ref-label">Przejdź do:</span>` +
    cfg.data.map((c) => `<a class="chip chip-link" href="#cat-${c.id}">${W.esc(c.title)}</a>`).join("");

  /* --- lista --- */
  const itemHtml = (it) => `
    <article class="ref-item card ref-${type}" id="${it.anchor}" data-key="${it.key}">
      <div class="ref-info">
        <div class="row" style="gap:8px">
          <h3 class="ref-tag"><code>${W.esc(it.tag)}</code></h3>
          <span class="kind kind-${it.kind}">${W.esc(cfg.kinds[it.kind])}</span>
        </div>
        <p>${W.fmt(it.desc)}</p>
        ${it.attrs ? `<p class="ref-attrs"><span class="muted">Atrybuty:</span> ${it.attrs.map((a) => `<code>${W.esc(a)}</code>`).join(" ")}</p>` : ""}
      </div>
      <div class="ref-code">
        <div class="syntax">
          <div class="syntax-head"><span class="lang">${cfg.lang}</span><button class="btn btn-sm spacer" data-copy="${it.key}">Kopiuj</button></div>
          ${W.codeBlock(it.example, cfg.lang)}
          ${type === "css" && it.html && it.preview !== false ? `<details class="ref-html"><summary>HTML przykładu</summary>${W.codeBlock(it.html, "html")}</details>` : ""}
        </div>
        ${it.preview === false ? "" : `<details class="ref-preview" data-preview="${it.key}"><summary>Podgląd na żywo</summary></details>`}
      </div>
    </article>`;

  list.innerHTML = cfg.data.map((cat) => `
    <section class="ref-cat" id="cat-${cat.id}" aria-labelledby="h-${cat.id}">
      <h2 id="h-${cat.id}">${W.esc(cat.title)}</h2>
      <p class="muted" style="margin:4px 0 14px">${W.fmt(cat.intro)}</p>
      <div class="ref-items">${items.filter((it) => it.cat === cat).map(itemHtml).join("")}</div>
    </section>`).join("");

  /* --- filtrowanie: fraza + rodzaj --- */
  let kind = "all";
  function filter() {
    const q = W.$("#ref-q").value.trim().toLowerCase();
    let shown = 0;
    items.forEach((it) => {
      const ok = (kind === "all" || it.kind === kind) && (!q || it.hay.includes(q));
      W.$(`[data-key="${it.key}"]`, list).hidden = !ok;
      if (ok) shown++;
    });
    W.$$(".ref-cat", list).forEach((sec) => {
      sec.hidden = !W.$$(".ref-item", sec).some((el) => !el.hidden);
    });
    W.$("#ref-count").textContent = `Pokazano ${shown} z ${items.length}`;
  }
  W.$("#ref-q").addEventListener("input", filter);
  W.$("#ref-kinds").addEventListener("click", (e) => {
    const chip = e.target.closest("[data-kind]");
    if (!chip) return;
    kind = chip.dataset.kind;
    W.$$("#ref-kinds [data-kind]").forEach((b) => b.setAttribute("aria-pressed", String(b === chip)));
    filter();
  });
  filter();

  /* --- kopiowanie przykładu --- */
  list.addEventListener("click", async (e) => {
    const btn = e.target.closest("[data-copy]");
    if (!btn) return;
    const it = items.find((x) => x.key === btn.dataset.copy);
    try {
      await navigator.clipboard.writeText(it.example.trim());
      btn.textContent = "Skopiowano ✓";
    } catch {
      btn.textContent = "Zaznacz ręcznie";
    }
    setTimeout(() => (btn.textContent = "Kopiuj"), 1500);
  });

  /* --- podgląd: iframe tworzony dopiero po rozwinięciu --- */
  list.addEventListener("toggle", (e) => {
    const det = e.target;
    if (!det.matches?.(".ref-preview") || !det.open || W.$("iframe", det)) return;
    const it = items.find((x) => x.key === det.dataset.preview);
    const frame = document.createElement("iframe");
    frame.title = `Podgląd: ${it.tag}`;
    frame.setAttribute("sandbox", "allow-scripts allow-modals allow-forms");
    frame.srcdoc = `<!doctype html><html lang="pl"><head><meta charset="utf-8"><style>
      body{font-family:system-ui,sans-serif;margin:12px;color:#1d1d1f;line-height:1.5}
      img,video,iframe{max-width:100%} table{border-collapse:collapse} td,th{padding:4px 8px}
      input,select,textarea,button{font:inherit;margin:2px 0}</style></head><body>${cfg.doc(it)}</body></html>`;
    det.append(frame);
  }, true);

  if (location.hash) requestAnimationFrame(() => document.getElementById(location.hash.slice(1))?.scrollIntoView({ behavior: "instant" }));
});
