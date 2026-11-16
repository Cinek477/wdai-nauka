/* =========================================================
   WDAI — nauka · wspólny silnik aplikacji
   - zapis postępu (localStorage)
   - kolorowanie składni (własny tokenizer)
   - nagłówek, nawigacja, wyszukiwarka, motyw
   - piaskownica (edytor + podgląd w iframe)
   ========================================================= */

window.WDAI = window.WDAI || { modules: [] };

(function () {
  "use strict";
  const W = window.WDAI;

  /* ---------- 1. Zapis postępu ---------- */
  const KEY = "wdai:v1";
  const empty = () => ({ topics: {}, flash: {}, quiz: {}, tasks: {}, theme: null, start: null });

  function load() {
    try {
      return { ...empty(), ...(JSON.parse(localStorage.getItem(KEY)) ?? {}) };
    } catch {
      return empty();
    }
  }
  let state = load();

  W.store = {
    get: () => state,
    save() {
      try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* tryb prywatny */ }
    },
    update(fn) { fn(state); this.save(); },
    reset() { state = empty(); this.save(); },
  };

  /* ---------- 2. Pomocnicze ---------- */
  W.esc = (s) => String(s ?? "")
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");

  // `kod` -> <code>, **pogrubienie** -> <strong>
  W.fmt = (s) => W.esc(s)
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");

  W.$ = (sel, root = document) => root.querySelector(sel);
  W.$$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  W.param = (name) => new URLSearchParams(location.search).get(name);
  W.module = (id) => W.modules.find((m) => m.id === id);

  W.techName = { html: "HTML", css: "CSS", js: "JS", react: "REACT", server: "SERWER", bs: "BOOTSTRAP", gen: "OGÓLNE" };

  /* ---------- 3. Postęp ---------- */
  W.topicKey = (m, t) => `${m.id}.${t.id}`;
  W.isDone = (m, t) => !!state.topics[W.topicKey(m, t)];
  W.moduleStats = (m) => {
    const total = m.topics.length;
    const done = m.topics.filter((t) => W.isDone(m, t)).length;
    return { done, total, pct: total ? Math.round((done / total) * 100) : 0 };
  };
  W.overall = () => {
    const ms = W.modules.filter((m) => !m.guide);
    const total = ms.reduce((s, m) => s + m.topics.length, 0);
    const done = ms.reduce((s, m) => s + W.moduleStats(m).done, 0);
    return { done, total, pct: total ? Math.round((done / total) * 100) : 0 };
  };

  /* ---------- 4. Kolorowanie składni ----------
     Skaner: na każdej pozycji próbuje reguł po kolei (flaga "y" = dopasowanie
     dokładnie od tej pozycji). Pierwsza pasująca reguła wygrywa. */
  const JS_KW = "const|let|var|function|return|if|else|for|while|do|switch|case|break|continue|new|class|extends|import|from|export|default|async|await|try|catch|finally|throw|typeof|instanceof|in|of|this|null|undefined|true|false|super|static|get|set|yield|delete|void|interface|type|implements|private|public|protected|readonly|enum|as";

  const RULES = {
    js: [
      ["comment", /\/\/[^\n]*|\/\*[\s\S]*?\*\//y],
      ["string", /`(?:\\[\s\S]|[^`\\])*`|"(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*'/y],
      ["keyword", new RegExp(`\\b(?:${JS_KW})\\b`, "y")],
      ["number", /\b\d+(?:\.\d+)?\b/y],
      ["func", /[A-Za-z_$][\w$]*(?=\s*\()/y],
      ["prop", /(?<=\.)[A-Za-z_$#][\w$]*/y],
      ["plain", /[A-Za-z_$][\w$]*/y],
      ["punct", /=>|[{}()[\];,]/y],
    ],
    html: [
      ["comment", /<!--[\s\S]*?-->/y],
      ["keyword", /<!DOCTYPE[^>]*>/iy],
      ["tag", /<\/?[A-Za-z][\w-]*|\/?>/y],
      ["string", /"[^"]*"|'[^']*'/y],
      ["attr", /[\w\-:@[\]().*#]+(?==)/y],
      ["plain", /[^<"'\s=]+/y],
    ],
    css: [
      ["comment", /\/\*[\s\S]*?\*\//y],
      ["string", /"[^"\n]*"|'[^'\n]*'/y],
      ["keyword", /@[\w-]+|!important/y],
      ["selector", /[^\s{};@][^{};]*?(?=\s*\{)/y],
      ["prop", /--?[\w-]+(?=\s*:)|[a-z-]+(?=\s*:(?!hover|focus|active|visited|root|not|is|nth|first|last|before|after|user|checked))/y],
      ["number", /-?\d*\.?\d+(?:px|rem|em|%|vh|vw|dvh|fr|s|ms|deg)?/y],
      ["func", /[\w-]+(?=\()/y],
      ["plain", /[\w-]+/y],
      ["punct", /[{}:;,()]/y],
    ],
    json: [
      ["prop", /"(?:\\.|[^"\\])*"(?=\s*:)/y],
      ["string", /"(?:\\.|[^"\\])*"/y],
      ["keyword", /\b(?:true|false|null)\b/y],
      ["number", /-?\d+(?:\.\d+)?/y],
      ["punct", /[{}[\],:]/y],
    ],
    bash: [
      ["comment", /#[^\n]*/y],
      ["string", /"[^"]*"|'[^']*'/y],
      ["func", /(?<=^|\n)\s*[\w.-]+/y],
      ["attr", /--?[\w-]+/y],
      ["plain", /[^\s"'#]+/y],
    ],
    http: [
      ["keyword", /\b(?:GET|POST|PUT|PATCH|DELETE|HEAD|OPTIONS)\b/y],
      ["number", /\b[1-5]\d\d\b/y],
      ["prop", /(?<=^|\n)[\w-]+(?=:)/y],
      ["string", /HTTP\/[\d.]+/y],
      ["comment", /<-[^\n]*/y],
      ["plain", /[^\s]+?(?=\s|$)/y],
    ],
  };
  RULES.jsx = [
    RULES.js[0], RULES.js[1],
    ["tag", /<\/?[A-Za-z][\w.]*|\/>|<>|<\/>/y],
    ["attr", /\b[a-z][\w-]*(?==)/y],
    ...RULES.js.slice(2),
  ];
  RULES.ts = RULES.js;
  RULES.xml = RULES.html;

  W.highlight = function (code, lang = "js") {
    const rules = RULES[lang];
    if (!rules) return W.esc(code);
    let out = "";
    let i = 0;
    while (i < code.length) {
      let matched = false;
      for (const [type, re] of rules) {
        re.lastIndex = i;
        const m = re.exec(code);
        if (m && m[0].length) {
          const text = W.esc(m[0]);
          out += type === "plain" ? text : `<span class="tok-${type}">${text}</span>`;
          i += m[0].length;
          matched = true;
          break;
        }
      }
      if (!matched) { out += W.esc(code[i]); i++; }
    }
    // numerki ❶–❿ wyróżniamy zawsze (także w komentarzach)
    return out.replace(/[❶-❿]/g, (c) => `<span class="tok-marker">${c}</span>`);
  };

  W.codeBlock = (code, lang) =>
    `<pre class="code" data-lang="${lang}"><code>${W.highlight(code.replace(/^\n/, "").replace(/\s+$/, ""), lang)}</code></pre>`;

  /* ---------- 5. Motyw ---------- */
  function applyTheme() {
    const t = state.theme ?? (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    document.documentElement.dataset.theme = t;
    const btn = W.$("#theme-btn");
    if (btn) btn.setAttribute("aria-label", t === "dark" ? "Włącz jasny motyw" : "Włącz ciemny motyw");
  }
  applyTheme();

  /* ---------- 6. Nagłówek i nawigacja ---------- */
  const ICON = {
    moon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>',
    menu: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16"/></svg>',
  };

  function renderHeader() {
    const h = W.$("#site-header");
    if (!h) return;
    const o = W.overall();
    h.innerHTML = `
      <button class="icon-btn menu-btn" id="menu-btn" aria-label="Otwórz menu" aria-expanded="false" aria-controls="site-nav">${ICON.menu}</button>
      <a class="logo" href="index.html">WDAI<span>·</span>nauka</a>
      <div class="search" role="search">
        <label for="search" class="sr-only">Szukaj tematu</label>
        <input id="search" type="search" placeholder="Szukaj: flexbox, useState, 404…" autocomplete="off">
        <ul class="search-results" id="search-results" hidden></ul>
      </div>
      <div class="header-progress" title="Postęp całego przedmiotu">
        <span>Postęp</span>
        <div class="bar" style="width:90px"><span style="width:${o.pct}%"></span></div>
        <strong>${o.pct}%</strong>
      </div>
      <button class="icon-btn" id="theme-btn" aria-label="Przełącz motyw">${ICON.moon}</button>`;

    W.$("#theme-btn").addEventListener("click", () => {
      W.store.update((s) => { s.theme = document.documentElement.dataset.theme === "dark" ? "light" : "dark"; });
      applyTheme();
    });
    W.$("#menu-btn").addEventListener("click", (e) => {
      const nav = W.$("#site-nav");
      const open = nav.classList.toggle("open");
      e.currentTarget.setAttribute("aria-expanded", String(open));
    });
    setupSearch();
    applyTheme();
  }

  function renderNav() {
    const nav = W.$("#site-nav");
    if (!nav) return;
    const page = document.body.dataset.page;
    const current = W.param("id");
    const link = (href, label, active, extra = "") =>
      `<li><a href="${href}"${active ? ' aria-current="page"' : ""}>${label}${extra}</a></li>`;

    const mods = W.modules.filter((m) => !m.guide).map((m) => {
      const st = W.moduleStats(m);
      const done = st.total && st.done === st.total ? '<span class="done-mark" aria-label="ukończony">✔</span>' : "";
      return link(`modul.html?id=${m.id}`, `${m.code} ${W.esc(m.short)}`, page === "modul" && current === m.id, done);
    }).join("");
    const guides = W.modules.filter((m) => m.guide).map((m) =>
      link(`modul.html?id=${m.id}`, W.esc(m.short), page === "modul" && current === m.id)).join("");

    nav.innerHTML = `<ul>
      ${link("index.html", "Start", page === "home")}
      <li class="nav-label">ŚCIĄGI</li>
      ${link("sciaga.html", "Ściąga HTML", page === "sciaga-html")}
      ${link("sciaga-css.html", "Ściąga CSS", page === "sciaga-css")}
      <li class="nav-label">PRZEWODNIKI</li>${guides}
      <li class="nav-label">MODUŁY</li>${mods}
      <li class="nav-label">ĆWICZ</li>
      ${link("fiszki.html", "Fiszki", page === "fiszki")}
      ${link("quiz.html", "Quiz", page === "quiz")}
      ${link("zadania.html", "Zadania i punkty", page === "zadania")}
    </ul>`;
  }

  /* ---------- 7. Wyszukiwarka ---------- */
  function setupSearch() {
    const input = W.$("#search");
    const list = W.$("#search-results");
    const index = W.modules.flatMap((m) => m.topics.map((t) => ({
      m, t,
      hay: `${m.title} ${t.title} ${(t.keywords || []).join(" ")}`.toLowerCase(),
    })));

    input.addEventListener("input", () => {
      const q = input.value.trim().toLowerCase();
      if (q.length < 2) { list.hidden = true; return; }
      const hits = index.filter((x) => x.hay.includes(q)).slice(0, 10);
      list.innerHTML = hits.length
        ? hits.map((x) => `<li><a href="modul.html?id=${x.m.id}#${x.t.id}">${W.esc(x.t.title)}<small>${x.m.code} · ${W.esc(x.m.title)}</small></a></li>`).join("")
        : '<li class="muted" style="padding:8px 10px">Brak wyników</li>';
      list.hidden = false;
    });
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") { const a = W.$("a", list); if (a) location.href = a.href; }
      if (e.key === "Escape") { list.hidden = true; input.blur(); }
    });
    document.addEventListener("click", (e) => { if (!e.target.closest(".search")) list.hidden = true; });
  }

  /* ---------- 8. Piaskownica ----------
     mode: "web" (HTML/CSS/JS), "react" (JSX przez Babel), "bootstrap" */
  const CDN = {
    react: '<script src="https://unpkg.com/react@18.3.1/umd/react.development.js"><\/script>' +
           '<script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.development.js"><\/script>' +
           '<script src="https://unpkg.com/@babel/standalone@7.26.0/babel.min.js"><\/script>',
    bootstrap: '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">' +
               '<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"><\/script>',
  };
  let pgCounter = 0;

  function consoleBridge(id) {
    return `<script>(function(){var send=function(t,a){try{parent.postMessage({__pg:${id},type:t,args:a.map(function(x){if(typeof x==="object"){try{return JSON.stringify(x)}catch(e){return String(x)}}return String(x)})},"*")}catch(e){}};["log","info","warn","error"].forEach(function(k){var o=console[k];console[k]=function(){var a=[].slice.call(arguments);send(k,a);o.apply(console,a)}});addEventListener("error",function(e){send("error",[e.message])});addEventListener("unhandledrejection",function(e){send("error",[String(e.reason)])})})()<\/script>`;
  }

  function buildDoc(files, mode, id) {
    const base = "<style>body{font-family:system-ui,sans-serif;margin:16px;color:#1d1d1f}</style>";
    const head = consoleBridge(id) + (mode === "bootstrap" ? CDN.bootstrap : "") + (mode === "react" ? CDN.react : "");
    if (mode === "react") {
      return `<!doctype html><html lang="pl"><head><meta charset="utf-8">${head}${base}<style>${files.css || ""}</style></head><body>${files.html || '<div id="root"></div>'}
<script type="text/babel" data-presets="react">
const { useState, useEffect, useRef, useReducer, useMemo, useCallback, createContext, useContext } = React;
${files.js || ""}
<\/script></body></html>`;
    }
    return `<!doctype html><html lang="pl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">${head}${mode === "bootstrap" ? "" : base}<style>${files.css || ""}</style></head><body>${files.html || ""}<script>${files.js || ""}<\/script></body></html>`;
  }

  W.playground = function (el, ex) {
    const id = ++pgCounter;
    const mode = ex.mode || "web";
    const original = { html: ex.html || "", css: ex.css || "", js: ex.js || "" };
    const files = { ...original };
    const tabs = mode === "react" ? [["js", "JSX (App)"], ["css", "CSS"], ["html", "HTML"]]
      : [["html", "HTML"], ["css", "CSS"], ["js", "JS"]];
    // domyślnie otwórz JS, jeśli przykład go ma; inaczej pierwszy niepusty plik
    let active = original.js ? "js" : (tabs.find(([k]) => original[k])?.[0] || tabs[0][0]);
    const langOf = (k) => (k === "js" ? (mode === "react" ? "jsx" : "js") : k);

    el.classList.add("playground");
    el.innerHTML = `
      <div class="pg-tabs" role="tablist" aria-label="Pliki przykładu">
        ${tabs.map(([k, l]) => `<button role="tab" data-file="${k}" aria-selected="${k === active}">${l}</button>`).join("")}
        <span class="spacer muted" style="font-size:.8rem">${mode === "react" ? "React 18 + Babel" : mode === "bootstrap" ? "Bootstrap 5.3" : "HTML · CSS · JS"}</span>
        ${W.enhanceEditor ? `<label class="row pg-hints" style="gap:4px;font-size:.8rem" title="Ctrl+Spacja — pokaż podpowiedzi; w HTML: skrót + Tab (np. p, div.card, li*3)">
          <input type="checkbox" data-act="hints" ${localStorage.getItem("wdai:hints") === "off" ? "" : "checked"}> Podpowiedzi</label>` : ""}
        <button class="btn btn-sm" data-act="run">Uruchom ponownie</button>
        <button class="btn btn-sm" data-act="reset">Reset</button>
      </div>
      <div class="pg-body">
        <div class="pg-editor-wrap">
          <pre class="code pg-hl" aria-hidden="true"><code></code></pre>
          <textarea class="pg-editor" spellcheck="false" autocapitalize="off" aria-label="Edytor kodu"></textarea>
        </div>
        <div class="pg-preview">
          <iframe title="Podgląd na żywo" sandbox="allow-scripts allow-modals allow-same-origin allow-forms"></iframe>
          <pre class="pg-console" aria-live="polite"></pre>
        </div>
      </div>
      ${ex.task ? `<div class="pg-task">
        <strong>Zadanie: ${W.fmt(ex.task)}</strong>
        ${ex.hint ? `<details><summary>Podpowiedź</summary><p>${W.fmt(ex.hint)}</p></details>` : ""}
        ${ex.solution ? `<details><summary>Rozwiązanie</summary>${W.codeBlock(ex.solution, langOf(ex.solutionFile || "js"))}</details>` : ""}
      </div>` : ""}`;

    const ta = W.$("textarea", el);
    const hl = W.$(".pg-hl code", el);
    const iframe = W.$("iframe", el);
    const cons = W.$(".pg-console", el);

    const paint = () => { hl.innerHTML = W.highlight(ta.value + "\n", langOf(active)); };
    const sync = () => { W.$(".pg-hl", el).scrollTop = ta.scrollTop; W.$(".pg-hl", el).scrollLeft = ta.scrollLeft; };
    const run = () => { cons.textContent = ""; iframe.srcdoc = buildDoc(files, mode, id); };
    const show = (k) => {
      active = k;
      ta.value = files[k];
      W.$$('[role="tab"]', el).forEach((b) => b.setAttribute("aria-selected", String(b.dataset.file === k)));
      paint();
    };

    let timer;
    ta.addEventListener("input", () => {
      files[active] = ta.value;
      paint();
      clearTimeout(timer);
      timer = setTimeout(run, 400);              // debounce: uruchom 400 ms po ostatnim znaku
    });
    ta.addEventListener("scroll", sync);
    if (W.enhanceEditor) {
      // podpowiedzi, Emmet i domykanie (js/editor.js)
      W.enhanceEditor(ta, { getLang: () => langOf(active) });
      el.addEventListener("change", (e) => {
        if (e.target.matches('[data-act="hints"]')) W.setHintsEnabled(e.target.checked);
      });
    } else {
      ta.addEventListener("keydown", (e) => {
        if (e.key === "Tab" && !e.shiftKey) {       // Tab wstawia 2 spacje
          e.preventDefault();
          const { selectionStart: s, selectionEnd: en } = ta;
          ta.setRangeText("  ", s, en, "end");
          ta.dispatchEvent(new Event("input"));
        }
      });
    }
    el.addEventListener("click", (e) => {
      const tab = e.target.closest('[role="tab"]');
      if (tab) show(tab.dataset.file);
      const act = e.target.closest("[data-act]")?.dataset.act;
      if (act === "run") run();
      if (act === "reset") { Object.assign(files, original); show(active); run(); }
    });
    window.addEventListener("message", (e) => {
      if (e.data?.__pg !== id) return;
      cons.textContent += `${e.data.type === "log" ? "›" : e.data.type + ":"} ${e.data.args.join(" ")}\n`;
      cons.scrollTop = cons.scrollHeight;
    });

    show(active);
    run();
  };

  /* ---------- 9. Start strony ---------- */
  W.ready = (fn) => {
    const go = () => { renderHeader(); renderNav(); fn?.(); };
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", go);
    else go();
  };
  W.refreshChrome = () => { renderHeader(); renderNav(); };
})();
