/* Zadania: checklisty wymagań z punktacją */
WDAI.ready(() => {
  const W = WDAI;
  const box = W.$("#tasks");
  const key = (t, it) => `${t.id}.${it.id}`;

  // grupa bez punktów za elementy (gra) liczy się proporcjonalnie do wykonanych wymagań
  const earned = (t) => {
    const checked = W.store.get().tasks;
    const done = t.items.filter((it) => checked[key(t, it)]);
    if (t.items.some((it) => it.pts)) return done.reduce((s, it) => s + (it.pts || 0), 0);
    return null;
  };

  function header(t) {
    const e = earned(t);
    const done = t.items.filter((it) => W.store.get().tasks[key(t, it)]).length;
    return e === null
      ? `${done} / ${t.items.length} wymagań · max ${t.max.toFixed(1)} pkt`
      : `${e.toFixed(1)} / ${t.max.toFixed(1)} pkt`;
  }

  function total() {
    const graded = W.tasks.filter((t) => earned(t) !== null);
    const sum = graded.reduce((s, t) => s + earned(t), 0);
    const max = W.tasks.reduce((s, t) => s + t.max, 0);
    W.$("#total").textContent = `${sum.toFixed(1)} / ${max.toFixed(1)} pkt`;
  }

  box.innerHTML = W.tasks.map((t, n) => `
    <details class="task-group" ${n === 0 || t.id.startsWith("lab3") ? "open" : ""} data-task="${t.id}">
      <summary><strong>${W.esc(t.title)}</strong><span class="spacer muted" data-head="${t.id}">${header(t)}</span></summary>
      ${t.note ? `<p class="muted" style="font-size:.9rem">${W.esc(t.note)}</p>` : ""}
      ${t.items.map((it) => `
        <div class="task-item">
          <label>
            <input type="checkbox" data-key="${key(t, it)}" ${W.store.get().tasks[key(t, it)] ? "checked" : ""}>
            <span>${W.fmt(it.text)}</span>
          </label>
          ${it.pts ? `<span class="pts">${it.pts.toFixed(1)}</span>` : ""}
          ${it.link ? `<a href="${it.link}" style="white-space:nowrap;font-size:.9rem">lekcja →</a>` : ""}
        </div>`).join("")}
    </details>`).join("");

  box.addEventListener("change", (e) => {
    const cb = e.target.closest("input[data-key]");
    if (!cb) return;
    W.store.update((s) => { s.tasks[cb.dataset.key] = cb.checked; });
    const t = W.tasks.find((x) => x.id === cb.dataset.key.split(".")[0]);
    W.$(`[data-head="${t.id}"]`).textContent = header(t);
    total();
  });

  total();
});
