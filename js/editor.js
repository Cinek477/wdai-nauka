/* =========================================================
   Edytor piaskownicy: podpowiedzi, skróty Emmet i domykanie
   - HTML: znaczniki po "<", atrybuty w znaczniku, wartości w type="…"
           skrót + Tab: p → <p></p>, div.card, li*3, section#id
           wpisanie ">" w <tag> dopisuje </tag>
   - CSS:  właściwości, wartości po ":", pseudoklasy, reguły @
   - JS:   słowa kluczowe, obiekty, metody po kropce, szablony (for, fetchjson…)
   - nawiasy i cudzysłowy domykają się same, Enter zachowuje wcięcie
   Klawisze: ↑↓ wybór, Enter/Tab wstaw, Esc zamknij, Ctrl+Spacja pokaż.
   ========================================================= */
(function () {
  "use strict";
  const W = window.WDAI;
  const H = () => W.hints;
  const CARET = "$0";
  const PAIRS = { "(": ")", "[": "]", "{": "}", '"': '"', "'": "'", "`": "`" };
  const CLOSERS = new Set([")", "]", "}", '"', "'", "`"]);

  // małe litery bez polskich znaków: „Odstęp” → „odstep”
  const norm = (s) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/ł/g, "l");

  const enabled = () => {
    try { return localStorage.getItem("wdai:hints") !== "off"; } catch { return true; }
  };
  W.setHintsEnabled = (on) => {
    try { localStorage.setItem("wdai:hints", on ? "on" : "off"); } catch { /* brak dostępu */ }
  };

  /* ---------- Kontekst: co podpowiadać w miejscu kursora ---------- */
  function htmlContext(before) {
    const lt = before.lastIndexOf("<");
    const gt = before.lastIndexOf(">");
    if (lt > gt) {
      const inside = before.slice(lt + 1);
      if (/^\/?[\w-]*$/.test(inside)) {
        const closing = inside.startsWith("/");
        const prefix = closing ? inside.slice(1) : inside;
        return {
          prefix,
          items: Object.entries(H().html.tags).map(([t, d]) => ({
            label: t, kind: "znacznik", desc: d,
            insert: closing ? `${t}>` : (H().html.tpl[t] || (H().html.void.includes(t) ? `${t}${CARET} />` : `${t}>${CARET}</${t}>`)),
          })),
          force: true,
        };
      }
      const val = inside.match(/([\w-:]+)="([^"]*)$/);
      if (val) {
        const list = H().html.values[val[1]] || [];
        return { prefix: val[2], items: list.map((v) => ({ label: v, kind: "wartość", desc: `${val[1]}="${v}"`, insert: v })), force: true };
      }
      const prefix = (inside.match(/[\w-:]*$/) || [""])[0];
      return {
        prefix,
        items: Object.entries(H().html.attrs).map(([a, d]) => ({
          label: a, kind: "atrybut", desc: d,
          insert: H().html.boolean.includes(a) ? a : (a === "data-" ? `data-${CARET}=""` : `${a}="${CARET}"`),
        })),
        force: /\s$/.test(before),
      };
    }
    return null;
  }

  function cssContext(before) {
    const clean = before.replace(/\/\*[\s\S]*?\*\//g, "");
    let depth = 0;
    for (const ch of clean) { if (ch === "{") depth++; else if (ch === "}") depth = Math.max(0, depth - 1); }
    const atM = clean.match(/@([\w-]*)$/);
    if (atM) return { prefix: atM[1], items: H().css.at.map((a) => ({ label: a.split(/[ ({]/)[0], kind: "reguła @", desc: a.split("\n")[0].replace(CARET, "…"), insert: a })), force: true };

    const lastOpen = Math.max(clean.lastIndexOf("{"), clean.lastIndexOf(";"), clean.lastIndexOf("}"));
    const decl = clean.slice(lastOpen + 1);
    if (depth > 0 && !/[{]/.test(decl)) {
      const colon = decl.indexOf(":");
      if (colon > -1) {
        const prop = decl.slice(0, colon).trim();
        const values = H().css.props[prop];
        if (values) {
          const vInfo = H().css.valueInfo || {};
          const prefix = (decl.slice(colon + 1).match(/[\w-#.()$"]*$/) || [""])[0];
          return {
            prefix,
            items: values.map((v) => ({ label: v.replace(CARET, "…"), kind: "wartość", desc: vInfo[v] ? `${vInfo[v]}` : prop, insert: v })),
            force: /:\s*$/.test(decl),
          };
        }
        return null;
      }
      if (colon === -1) {
        const info = H().css.info || {};
        // prefiks może być polskim słowem (np. „odstęp”) — szukamy też po słowach kluczowych
        const prefix = (decl.match(/[\p{L}\w-]*$/u) || [""])[0];
        return {
          prefix,
          items: Object.keys(H().css.props).map((p) => ({
            label: p, kind: "właściwość",
            desc: info[p]?.[0] || H().css.props[p].slice(0, 3).join(" | "),
            keys: info[p]?.[1] || "",
            insert: `${p}: ${CARET};`,
          })),
        };
      }
    }
    const ps = clean.match(/[\w)\]*-]:(:?[\w-]*)$/);
    if (ps) return { prefix: ps[1], items: H().css.pseudo.map((p) => ({ label: p.replace(CARET, "…"), kind: "pseudoklasa", desc: "", insert: p })), force: true };
    if (depth === 0) {
      const prefix = (clean.match(/(?:^|[\s,>+~])([a-z][\w-]*)$/) || [])[1];
      if (prefix) return { prefix, items: Object.entries(H().html.tags).map(([t, d]) => ({ label: t, kind: "selektor", desc: d, insert: t })) };
    }
    return null;
  }

  function jsContext(before) {
    const line = before.slice(before.lastIndexOf("\n") + 1);
    if (/\/\//.test(line.replace(/(["'`]).*?\1/g, ""))) return null;          // komentarz
    const quotes = (line.match(/["'`]/g) || []).length;
    if (quotes % 2 === 1) return null;                                       // w napisie
    const J = H().js;
    const mem = before.match(/([\w$]+)\.([\w$]*)$/);
    if (mem) {
      const obj = mem[1];
      const key = /^(e|ev|evt|event)$/.test(obj) ? "e" : /^(res|response)$/.test(obj) ? "res" : obj;
      const members = J.members[key] || J.generic;
      return {
        prefix: mem[2],
        items: Object.entries(members).map(([m, d]) => {
          const isFn = J.methods.includes(m) && !["length", "ok", "status"].includes(m);
          return { label: isFn ? `${m}()` : m, kind: isFn ? "metoda" : "właściwość", desc: d, insert: isFn ? `${m}(${CARET})` : m };
        }),
        force: true,
      };
    }
    const word = before.match(/[\w$]+$/);
    if (!word) return null;
    const items = [
      ...Object.entries(J.snippets).map(([k, [d, tpl]]) => ({ label: k, kind: "szablon", desc: d, insert: tpl })),
      ...Object.entries(J.globals).map(([g, d]) => ({ label: g, kind: "obiekt", desc: d, insert: J.methods.includes(g) || ["fetch", "setTimeout", "setInterval", "clearInterval", "clearTimeout", "alert", "requestAnimationFrame", "parseInt", "structuredClone"].includes(g) ? `${g}(${CARET})` : g })),
      ...J.keywords.map((k) => ({ label: k, kind: "słowo kluczowe", desc: "", insert: k })),
    ];
    return { prefix: word[0], items };
  }

  const contextFor = (lang, before) =>
    lang === "html" ? htmlContext(before) : lang === "css" ? cssContext(before) : (lang === "js" || lang === "jsx") ? jsContext(before) : null;

  /* ---------- Emmet (HTML): skrót + Tab ---------- */
  function emmet(before) {
    const m = before.match(/(?:^|[\s>])([a-z][a-z0-9]*)((?:[.#][\w-]+)*)(?:\*(\d+))?$/i);
    if (!m || !H().html.tags[m[1].toLowerCase()]) return null;
    const tag = m[1].toLowerCase();
    const classes = [...m[2].matchAll(/\.([\w-]+)/g)].map((x) => x[1]);
    const id = (m[2].match(/#([\w-]+)/) || [])[1];
    const attrs = `${id ? ` id="${id}"` : ""}${classes.length ? ` class="${classes.join(" ")}"` : ""}`;
    const n = Math.min(Number(m[3] || 1), 20);
    const isVoid = H().html.void.includes(tag);
    const one = (first) => isVoid ? `<${tag}${attrs}${first && tag === "img" ? ` src="${CARET}" alt=""` : ""} />` : `<${tag}${attrs}>${first ? CARET : ""}</${tag}>`;
    const body = Array.from({ length: n }, (_, i) => one(i === 0)).join("\n");
    return { length: m[0].length - (/^[\s>]/.test(m[0]) ? 1 : 0), text: body };
  }

  /* ---------- Edytor ---------- */
  W.enhanceEditor = function (ta, { getLang }) {
    const wrap = ta.parentElement;
    const box = document.createElement("ul");
    box.className = "ac-list";
    box.setAttribute("role", "listbox");
    box.hidden = true;
    wrap.append(box);

    let items = [];
    let active = 0;
    let prefixLen = 0;
    let suppress = false;

    const before = () => ta.value.slice(0, ta.selectionStart);
    const indentOf = (text) => (text.slice(text.lastIndexOf("\n") + 1).match(/^\s*/) || [""])[0];

    // wstaw tekst w miejsce [from, to]; $0 = pozycja kursora; nowe linie dostają wcięcie bieżącej linii
    function insert(text, from, to) {
      const ind = indentOf(ta.value.slice(0, from));
      let t = text.replace(/\n/g, "\n" + ind);
      let caret = t.indexOf(CARET);
      t = t.replace(CARET, "");
      if (caret === -1) caret = t.length;
      ta.setRangeText(t, from, to, "end");
      ta.selectionStart = ta.selectionEnd = from + caret;
      suppress = true;
      ta.dispatchEvent(new Event("input", { bubbles: true }));
      suppress = false;
    }

    function close() { box.hidden = true; items = []; }

    function caretXY() {
      const cs = getComputedStyle(ta);
      const lh = parseFloat(cs.lineHeight);
      const probe = document.createElement("span");
      probe.style.cssText = `font:${cs.font};position:absolute;visibility:hidden;white-space:pre`;
      probe.textContent = "MMMMMMMMMM";
      document.body.append(probe);
      const cw = probe.getBoundingClientRect().width / 10;
      probe.remove();
      const b = before();
      const line = b.split("\n").length - 1;
      const col = b.length - b.lastIndexOf("\n") - 1;
      const pad = parseFloat(cs.paddingLeft);
      return { x: pad + col * cw - ta.scrollLeft, y: parseFloat(cs.paddingTop) + (line + 1) * lh - ta.scrollTop };
    }

    function render() {
      box.innerHTML = items.map((it, i) => `
        <li role="option" data-i="${i}" aria-selected="${i === active}">
          <code>${W.esc(it.label)}</code><span class="ac-kind">${W.esc(it.kind)}</span>
          ${it.desc ? `<span class="ac-desc">${W.esc(it.desc)}</span>` : ""}
        </li>`).join("");
      const { x, y } = caretXY();
      box.hidden = false;
      const maxX = wrap.clientWidth - box.offsetWidth - 4;
      box.style.left = `${Math.max(4, Math.min(x, maxX))}px`;
      const below = y + 4;
      box.style.top = below + box.offsetHeight > wrap.clientHeight && y > box.offsetHeight + 30
        ? `${y - box.offsetHeight - 26}px` : `${below}px`;
      box.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: "nearest" });
    }

    function suggest(forceOpen = false) {
      if (!enabled() || !W.hints) return close();
      const ctx = contextFor(getLang(), before());
      if (!ctx) return close();
      const p = norm(ctx.prefix);
      if (!p && !ctx.force && !forceOpen) return close();
      const starts = ctx.items.filter((it) => norm(it.label).startsWith(p));
      const contains = p ? ctx.items.filter((it) => norm(it.label).includes(p)) : [];
      // polskie słowa kluczowe (od 2 liter): „odstep” → margin, padding, gap…
      const byWord = p.length >= 2
        ? ctx.items.filter((it) => it.keys && norm(it.keys).split(" ").some((k) => k.startsWith(p)))
            .sort((a, b) => a.label.length - b.label.length)        // najpierw ogólne: gap, margin, padding
        : [];
      const seen = new Set();
      items = [...starts, ...contains, ...byWord].filter((it) => !seen.has(it.label) && seen.add(it.label)).slice(0, 9);
      if (!items.length || (items.length === 1 && norm(items[0].label) === p && !items[0].insert.includes(CARET))) return close();
      prefixLen = ctx.prefix.length;
      active = 0;
      render();
    }

    function accept(i = active) {
      const it = items[i];
      if (!it) return;
      const end = ta.selectionStart;
      // nie dubluj domknięć, które już stoją za kursorem (np. ="" albo ())
      let to = end;
      const after = ta.value.slice(end);
      if (it.insert.endsWith(")") && after.startsWith(")")) to++;
      close();
      insert(it.insert, end - prefixLen, to);
    }

    // szuka otwartego znacznika tuż przed kursorem: <tag …
    const openTagBefore = (b) => {
      const m = b.match(/<([a-zA-Z][\w-]*)(?:\s[^<>]*)?$/);
      return m && !b.endsWith("/") && !H().html.void.includes(m[1].toLowerCase()) ? m[1] : null;
    };

    ta.addEventListener("input", (e) => {
      if (suppress) return;
      // zapasowe domykanie znacznika (telefon, IME) — gdy ">" przyszedł bez keydown
      if (e.data === ">" && getLang() === "html") {
        const s = ta.selectionStart;
        const tag = openTagBefore(ta.value.slice(0, s - 1));
        if (tag && !ta.value.slice(s).startsWith(`</${tag}>`)) {
          close();
          return insert(`${CARET}</${tag}>`, s, s);
        }
      }
      suggest();
    });
    ta.addEventListener("blur", () => setTimeout(close, 150));
    ta.addEventListener("scroll", () => { if (!box.hidden) render(); });
    box.addEventListener("mousedown", (e) => {
      e.preventDefault();
      const li = e.target.closest("li[data-i]");
      if (li) accept(Number(li.dataset.i));
    });

    ta.addEventListener("keydown", (e) => {
      const lang = getLang();
      const { selectionStart: s, selectionEnd: en, value } = ta;

      // lista podpowiedzi otwarta
      if (!box.hidden) {
        if (e.key === "ArrowDown") { e.preventDefault(); active = (active + 1) % items.length; return render(); }
        if (e.key === "ArrowUp") { e.preventDefault(); active = (active - 1 + items.length) % items.length; return render(); }
        if (e.key === "Enter" || e.key === "Tab") { e.preventDefault(); return accept(); }
        if (e.key === "Escape") { e.preventDefault(); return close(); }
      }
      if (e.key === " " && e.ctrlKey) { e.preventDefault(); return suggest(true); }

      // Tab: Emmet w HTML, inaczej wcięcie
      if (e.key === "Tab" && !e.shiftKey) {
        e.preventDefault();
        if (lang === "html" && s === en) {
          const em = emmet(value.slice(0, s));
          if (em) return insert(em.text, s - em.length, s);
        }
        return insert("  ", s, en);
      }

      // Enter: zachowaj wcięcie; między {} lub ><  rozsuń na 3 linie
      if (e.key === "Enter" && s === en && !e.shiftKey) {
        const prev = value[s - 1];
        const next = value[s];
        if ((prev === "{" && next === "}") || (prev === "[" && next === "]") || (prev === ">" && value.slice(s, s + 2) === "</")) {
          e.preventDefault();
          return insert("\n  " + CARET + "\n", s, s);
        }
        e.preventDefault();
        return insert("\n", s, s);
      }

      // przeskocz domknięcie, jeśli to ten sam znak
      if (CLOSERS.has(e.key) && s === en && value[s] === e.key && !e.ctrlKey) {
        e.preventDefault();
        ta.selectionStart = ta.selectionEnd = s + 1;
        return;
      }

      // domykanie nawiasów i cudzysłowów
      if (PAIRS[e.key] && !e.ctrlKey && !e.metaKey) {
        const isQuote = `"'\``.includes(e.key);
        const prevCh = value[s - 1] || "";
        const nextCh = value[s] || "";
        if (s !== en) {                                     // otocz zaznaczenie
          e.preventDefault();
          return insert(e.key + value.slice(s, en) + PAIRS[e.key], s, en);
        }
        if (isQuote && (/\w/.test(prevCh) || /\w/.test(nextCh))) return;   // apostrof w słowie
        if (!isQuote && /\w/.test(nextCh)) return;
        e.preventDefault();
        return insert(e.key + CARET + PAIRS[e.key], s, s);
      }

      // Backspace w pustej parze usuwa oba znaki
      if (e.key === "Backspace" && s === en && s > 0 && PAIRS[value[s - 1]] === value[s]) {
        e.preventDefault();
        return insert("", s - 1, s + 1);
      }

      // HTML: ">" po <tag …> dopisuje </tag>
      if (e.key === ">" && lang === "html" && s === en) {
        const tag = openTagBefore(value.slice(0, s));
        if (tag) {
          e.preventDefault();
          close();
          return insert(`>${CARET}</${tag}>`, s, s);
        }
      }
    });

    return { refresh: () => suggest() };
  };
})();
