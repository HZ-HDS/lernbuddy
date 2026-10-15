/* Lernbuddy – Werkzeuge zum Ausprobieren
   Jede Methode bekommt ein interaktives Werkzeug. Die Eingaben bleiben nur auf dem Gerät.
   Beispielinhalte stammen bevorzugt aus dem Profilfach Gesundheit und Biologie. */

const UEBUNG_TYP = {
  abruf: "braindump", braindump: "braindump",
  leitner: "karten", partnerabfrage: "karten", schluesselwort: "karten", verteilt: "karten", akronyme: "karten",
  pomodoro: "timer", sandwich: "timer",
  feynman: "erklaeren", ldl: "erklaeren", elaboration: "erklaeren", tps: "erklaeren", puzzle: "erklaeren",
  vergleichstabelle: "tabelle",
  conceptmap: "netz", mindmap: "netz", lernlandkarte: "netz", advance: "netz",
  checkliste: "ampel", ampel: "ampel", kompetenzraster: "ampel",
  fehleranalyse: "fehler", ueberschlag: "fehler",
  ki: "ki"
};

const UEBUNG_NAME = {
  braindump: "Brain Dump mit Timer", karten: "Karteikarten üben", timer: "Konzentriert arbeiten mit Timer",
  erklaeren: "Erklären und Lücken finden", tabelle: "Vergleichstabelle anlegen", netz: "Begriffsnetz bauen",
  ampel: "Ich-kann-Liste mit Ampel", fehler: "Fehler analysieren", ki: "KI-Anfrage bauen", schritte: "Schritt für Schritt ausprobieren"
};

const BEISPIELE = {
  karten: "Wo findet die Zellatmung statt? | In den Mitochondrien\nWas bedeutet semipermeabel? | Halbdurchlässig: Nur bestimmte Teilchen können die Membran passieren\nWelche Aufgabe haben Ribosomen? | Proteinbiosynthese, also der Aufbau von Proteinen\nWas ist Osmose? | Diffusion von Wasser durch eine semipermeable Membran\nWelches Organell enthält die Erbinformation? | Der Zellkern",
  braindump: "Regulation des Blutzuckerspiegels",
  erklaeren: "Warum wird ein Salatblatt in Salzwasser schlapp?",
  tabelle: { spalten: ["Aktive Immunisierung", "Passive Immunisierung"], kriterien: ["Was wird gespritzt?", "Wer bildet die Antikörper?", "Wann setzt der Schutz ein?", "Wie lange hält der Schutz?", "Wann wird sie eingesetzt?"] },
  netz: [["Blutzucker", "steigt nach dem Essen und regt an", "Bauchspeicheldrüse"], ["Bauchspeicheldrüse", "schüttet aus", "Insulin"], ["Insulin", "senkt", "Blutzucker"]],
  ampel: "Ich kann den Aufbau einer Tierzelle zeichnen und beschriften.\nIch kann die Aufgaben der Zellorganellen erklären.\nIch kann Pflanzen- und Tierzelle vergleichen.\nIch kann Diffusion und Osmose unterscheiden.\nIch kann den Bau der Biomembran beschreiben.",
  fehler: { stelle: "Ich habe für den Verschiebungsvektor A − E statt E − A gerechnet.", regel: "Lageänderung = Endlage minus Anfangslage." }
};

const W_ESC = (t) => String(t == null ? "" : t).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
let W_TIMER = null;
function wStopTimer() { if (W_TIMER) { clearInterval(W_TIMER); W_TIMER = null; } }
function wZeit(sek) { const m = Math.floor(sek / 60), s = sek % 60; return `${m}:${String(s).padStart(2, "0")}`; }
function wTimer(anzeige, minuten, fertig) {
  wStopTimer();
  const ende = Date.now() + minuten * 60000;
  const tick = () => {
    const rest = Math.max(0, Math.round((ende - Date.now()) / 1000));
    anzeige.textContent = wZeit(rest);
    if (rest <= 0) { wStopTimer(); fertig && fertig(); }
  };
  tick(); W_TIMER = setInterval(tick, 500);
}

const WERKZEUGE = {

  /* ---------- Karteikarten mit drei Fächern ---------- */
  karten(el, d, save) {
    d.karten = d.karten || [];
    const zeichne = () => {
      const offen = d.karten.slice().sort((a, b) => a.box - b.box);
      const k = offen[0];
      const zaehl = [1, 2, 3].map((f) => d.karten.filter((x) => x.box === f).length);
      el.innerHTML = `
        <div class="w-row"><label class="fld grow"><span>Eine Karte pro Zeile: Frage | Antwort</span>
          <textarea id="w-karten" rows="4" placeholder="Was ist Osmose? | Diffusion von Wasser durch eine semipermeable Membran">${W_ESC(d.karten.map((x) => x.f + " | " + x.a).join("\n"))}</textarea></label></div>
        <div class="btn-row"><button type="button" class="btn btn-tun" id="w-uebernehmen">Karten übernehmen</button>
          <button type="button" class="btn btn-ghost" id="w-beispiel">Beispielkarten aus GuB laden</button></div>
        ${d.karten.length ? `<div class="faecher">${zaehl.map((n, i) => `<span class="fach-box f${i + 1}"><strong>${n}</strong> Fach ${i + 1}</span>`).join("")}</div>
        <div class="karte" id="w-karte"><span class="small muted">Fach ${k.box}</span><p class="kf">${W_ESC(k.f)}</p>
          <p class="ka" id="w-antwort" hidden>${W_ESC(k.a)}</p>
          <div class="btn-row" id="w-k1"><button type="button" class="btn btn-plan" id="w-zeigen">Erst selbst antworten, dann aufdecken</button></div>
          <div class="btn-row" id="w-k2" hidden><button type="button" class="btn btn-tun" id="w-gewusst">Gewusst</button><button type="button" class="btn btn-ghost" id="w-nicht">Noch nicht</button></div></div>
        <p class="small muted">Gewusst: Die Karte wandert ein Fach weiter. Noch nicht: zurück in Fach 1. Fach 1 kommt immer zuerst dran.</p>` : ""}`;
      el.querySelector("#w-uebernehmen").onclick = () => {
        const alt = Object.fromEntries(d.karten.map((x) => [x.f, x.box]));
        d.karten = el.querySelector("#w-karten").value.split("\n").map((z) => z.split("|")).filter((p) => p[0] && p[0].trim())
          .map(([f, a]) => ({ f: f.trim(), a: (a || "").trim(), box: alt[f.trim()] || 1 }));
        save(); zeichne();
      };
      el.querySelector("#w-beispiel").onclick = () => { el.querySelector("#w-karten").value = BEISPIELE.karten; el.querySelector("#w-uebernehmen").click(); };
      if (!k) return;
      el.querySelector("#w-zeigen").onclick = () => { el.querySelector("#w-antwort").hidden = false; el.querySelector("#w-k1").hidden = true; el.querySelector("#w-k2").hidden = false; };
      el.querySelector("#w-gewusst").onclick = () => { k.box = Math.min(3, k.box + 1); d.karten.push(d.karten.splice(d.karten.indexOf(k), 1)[0]); save(); zeichne(); };
      el.querySelector("#w-nicht").onclick = () => { k.box = 1; d.karten.push(d.karten.splice(d.karten.indexOf(k), 1)[0]); save(); zeichne(); };
    };
    zeichne();
  },

  /* ---------- Brain Dump ---------- */
  braindump(el, d, save) {
    el.innerHTML = `
      <label class="fld"><span>Thema</span><input id="w-thema" value="${W_ESC(d.thema || "")}" placeholder="z. B. ${BEISPIELE.braindump}"></label>
      <div class="timer-row"><span class="timer" id="w-uhr">5:00</span>
        <button type="button" class="btn btn-tun" data-min="5">5 Minuten starten</button><button type="button" class="btn btn-ghost" data-min="10">10 Minuten</button></div>
      <label class="fld"><span>Schreibe alles auf, was du weißt, ohne nachzuschauen.</span><textarea id="w-text" rows="7">${W_ESC(d.text || "")}</textarea></label>
      <label class="fld"><span>Jetzt vergleichen: Was fehlte oder war falsch? Das ist dein Lernauftrag.</span><textarea id="w-luecken" rows="3">${W_ESC(d.luecken || "")}</textarea></label>`;
    const uhr = el.querySelector("#w-uhr");
    el.querySelectorAll("[data-min]").forEach((b) => b.onclick = () => wTimer(uhr, +b.dataset.min, () => { uhr.textContent = "Zeit um! Jetzt vergleichen."; }));
    [["w-thema", "thema"], ["w-text", "text"], ["w-luecken", "luecken"]].forEach(([id, k]) => el.querySelector("#" + id).oninput = (e) => { d[k] = e.target.value; save(); });
  },

  /* ---------- Pomodoro-Timer ---------- */
  timer(el, d, save) {
    d.runden = d.runden || 0;
    el.innerHTML = `
      <label class="fld"><span>Meine Aufgabe für diesen Block</span><input id="w-aufgabe" value="${W_ESC(d.aufgabe || "")}" placeholder="z. B. fünf Aufgaben zur Osmose lösen"></label>
      <div class="timer-row"><span class="timer big" id="w-uhr">25:00</span>
        <button type="button" class="btn btn-tun" id="w-start">25 Minuten lernen</button><button type="button" class="btn btn-ghost" id="w-pause">5 Minuten Pause</button></div>
      <p class="runden" id="w-runden"></p>
      <label class="fld"><span>Ablenkende Gedanken hier notieren und weiterarbeiten</span><textarea id="w-notiz" rows="2">${W_ESC(d.notiz || "")}</textarea></label>`;
    const uhr = el.querySelector("#w-uhr"), runden = () => { el.querySelector("#w-runden").textContent = `Geschaffte Blöcke: ${d.runden}${d.runden >= 4 ? " – Zeit für eine längere Pause!" : ""}`; };
    el.querySelector("#w-start").onclick = () => wTimer(uhr, 25, () => { d.runden++; save(); runden(); uhr.textContent = "Geschafft! Pause"; });
    el.querySelector("#w-pause").onclick = () => wTimer(uhr, 5, () => { uhr.textContent = "Weiter geht's"; });
    el.querySelector("#w-aufgabe").oninput = (e) => { d.aufgabe = e.target.value; save(); };
    el.querySelector("#w-notiz").oninput = (e) => { d.notiz = e.target.value; save(); };
    runden();
  },

  /* ---------- Erklären (Feynman, Lernen durch Erklären) ---------- */
  erklaeren(el, d, save) {
    el.innerHTML = `
      <label class="fld"><span>Was erklärst du?</span><input id="w-thema" value="${W_ESC(d.thema || "")}" placeholder="z. B. ${BEISPIELE.erklaeren}"></label>
      <label class="fld"><span>Erkläre es so einfach, dass es jemand ohne Vorwissen versteht. Nicht nachschauen!</span><textarea id="w-text" rows="6">${W_ESC(d.text || "")}</textarea></label>
      <p class="small muted" id="w-woerter"></p>
      <label class="fld"><span>Wo bist du ins Stocken gekommen? Das schlägst du jetzt nach.</span><textarea id="w-stocken" rows="2">${W_ESC(d.stocken || "")}</textarea></label>
      <label class="fld"><span>Dein Vergleich aus dem Alltag</span><input id="w-vergleich" value="${W_ESC(d.vergleich || "")}" placeholder="z. B. Die Membran ist wie ein Sieb …"></label>
      <div class="prompt"><p id="w-prompt"></p><button type="button" class="btn btn-ghost copy" data-target="w-prompt">KI-Anfrage kopieren</button></div>`;
    const upd = () => {
      const n = (d.text || "").trim().split(/\s+/).filter(Boolean).length;
      el.querySelector("#w-woerter").textContent = n ? `${n} Wörter` : "";
      el.querySelector("#w-prompt").textContent = `Hier ist meine Erklärung zum Thema „${d.thema || "[Thema]"}“: ${d.text ? "„" + d.text.trim() + "“" : "[meine Erklärung]"}. Markiere höchstens zwei Stellen, die fachlich unklar oder unvollständig sind, und stelle mir dazu Rückfragen. Formuliere die Erklärung nicht für mich neu.`;
    };
    [["w-thema", "thema"], ["w-text", "text"], ["w-stocken", "stocken"], ["w-vergleich", "vergleich"]].forEach(([id, k]) => el.querySelector("#" + id).oninput = (e) => { d[k] = e.target.value; save(); upd(); });
    upd();
  },

  /* ---------- Vergleichstabelle ---------- */
  tabelle(el, d, save) {
    d.spalten = d.spalten || ["", ""]; d.zeilen = d.zeilen || [{ k: "", w: ["", ""] }];
    const zeichne = () => {
      el.innerHTML = `<div class="tab-wrap"><table class="vtab"><thead><tr><th>Kriterium</th>${d.spalten.map((s, i) => `<th><input data-s="${i}" value="${W_ESC(s)}" placeholder="${i ? "B" : "A"}" aria-label="Spalte ${i + 1}"></th>`).join("")}</tr></thead>
        <tbody>${d.zeilen.map((z, r) => `<tr><th><input data-k="${r}" value="${W_ESC(z.k)}" placeholder="Kriterium" aria-label="Kriterium ${r + 1}"></th>${z.w.map((w, c) => `<td><textarea data-r="${r}" data-c="${c}" rows="2" aria-label="Zeile ${r + 1}, Spalte ${c + 1}">${W_ESC(w)}</textarea></td>`).join("")}</tr>`).join("")}</tbody></table></div>
        <div class="btn-row"><button type="button" class="btn btn-ghost" id="w-zeile">Kriterium hinzufügen</button><button type="button" class="btn btn-ghost" id="w-beispiel">Beispiel: aktive und passive Immunisierung</button></div>
        <p class="small muted">Fülle die Tabelle Zeile für Zeile aus, nicht Spalte für Spalte. So vermischst du die Kriterien nicht.</p>`;
      el.querySelectorAll("[data-s]").forEach((i) => i.oninput = () => { d.spalten[+i.dataset.s] = i.value; save(); });
      el.querySelectorAll("[data-k]").forEach((i) => i.oninput = () => { d.zeilen[+i.dataset.k].k = i.value; save(); });
      el.querySelectorAll("[data-r]").forEach((i) => i.oninput = () => { d.zeilen[+i.dataset.r].w[+i.dataset.c] = i.value; save(); });
      el.querySelector("#w-zeile").onclick = () => { d.zeilen.push({ k: "", w: d.spalten.map(() => "") }); save(); zeichne(); };
      el.querySelector("#w-beispiel").onclick = () => { d.spalten = BEISPIELE.tabelle.spalten.slice(); d.zeilen = BEISPIELE.tabelle.kriterien.map((k) => ({ k, w: ["", ""] })); save(); zeichne(); };
    };
    zeichne();
  },

  /* ---------- Begriffsnetz ---------- */
  netz(el, d, save) {
    d.kanten = d.kanten || [];
    const zeichne = () => {
      el.innerHTML = `<p class="small muted">Verbinde zwei Begriffe mit einer Beziehung. Jede Verbindung muss sich als Satz lesen lassen.</p>
        <div class="netz-form"><input id="w-a" placeholder="Begriff A" aria-label="Begriff A"><input id="w-r" placeholder="Beziehung, z. B. „schüttet aus“" aria-label="Beziehung"><input id="w-b" placeholder="Begriff B" aria-label="Begriff B">
          <button type="button" class="btn btn-tun" id="w-add">Verbinden</button></div>
        <ul class="kanten">${d.kanten.map((k, i) => `<li><span class="kb">${W_ESC(k[0])}</span><span class="kr">${W_ESC(k[1])}</span><span class="kb">${W_ESC(k[2])}</span><button type="button" class="x" data-del="${i}" aria-label="Verbindung löschen">×</button></li>`).join("") || '<li class="muted small">Noch keine Verbindungen.</li>'}</ul>
        <div class="btn-row"><button type="button" class="btn btn-ghost" id="w-beispiel">Beispiel: Blutzucker-Regelkreis beginnen</button></div>
        <p class="small muted">Ergänze das Beispiel selbst: Wie wirkt Glukagon? Welche Rolle spielt die Leber?</p>`;
      el.querySelector("#w-add").onclick = () => {
        const a = el.querySelector("#w-a").value.trim(), r = el.querySelector("#w-r").value.trim(), b = el.querySelector("#w-b").value.trim();
        if (!a || !r || !b) return; d.kanten.push([a, r, b]); save(); zeichne(); el.querySelector("#w-a").focus();
      };
      el.querySelectorAll("[data-del]").forEach((x) => x.onclick = () => { d.kanten.splice(+x.dataset.del, 1); save(); zeichne(); });
      el.querySelector("#w-beispiel").onclick = () => { d.kanten = BEISPIELE.netz.map((k) => k.slice()); save(); zeichne(); };
    };
    zeichne();
  },

  /* ---------- Ampel-Liste ---------- */
  ampel(el, d, save) {
    d.items = d.items || [];
    const zeichne = () => {
      const z = { rot: 0, gelb: 0, gruen: 0 }; d.items.forEach((i) => { if (z[i.s] !== undefined) z[i.s]++; });
      el.innerHTML = `<label class="fld"><span>Deine Ich-kann-Sätze, einer pro Zeile</span>
          <textarea id="w-saetze" rows="4" placeholder="Ich kann …">${W_ESC(d.items.map((i) => i.t).join("\n"))}</textarea></label>
        <div class="btn-row"><button type="button" class="btn btn-tun" id="w-ok">Übernehmen</button><button type="button" class="btn btn-ghost" id="w-beispiel">Beispiel: Klassenarbeit Zelle</button></div>
        <p class="small muted">Teste dich zu jedem Satz mit einer kleinen Aufgabe. Dann markiere ehrlich.</p>
        <ul class="ampel-liste">${d.items.map((it, i) => `<li><span>${W_ESC(it.t)}</span><span class="ampel-btns" role="group" aria-label="Einschätzung">
          ${["rot", "gelb", "gruen"].map((f) => `<button type="button" class="a-${f}" data-i="${i}" data-f="${f}" aria-pressed="${it.s === f}" aria-label="${f === "gruen" ? "kann ich sicher" : f === "gelb" ? "teilweise" : "kann ich noch nicht"}"></button>`).join("")}</span></li>`).join("")}</ul>
        ${d.items.length ? `<p class="ampel-sum"><span class="dot a-gruen"></span>${z.gruen} sicher <span class="dot a-gelb"></span>${z.gelb} teilweise <span class="dot a-rot"></span>${z.rot} noch nicht</p>
        ${z.rot ? `<p class="note">Fang mit den roten Punkten an. Prüfe dich in ein paar Tagen erneut.</p>` : ""}` : ""}`;
      el.querySelector("#w-ok").onclick = () => {
        const alt = Object.fromEntries(d.items.map((i) => [i.t, i.s]));
        d.items = el.querySelector("#w-saetze").value.split("\n").map((t) => t.trim()).filter(Boolean).map((t) => ({ t, s: alt[t] || "" }));
        save(); zeichne();
      };
      el.querySelector("#w-beispiel").onclick = () => { el.querySelector("#w-saetze").value = BEISPIELE.ampel; el.querySelector("#w-ok").click(); };
      el.querySelectorAll("[data-f]").forEach((b) => b.onclick = () => { d.items[+b.dataset.i].s = b.dataset.f; save(); zeichne(); });
    };
    zeichne();
  },

  /* ---------- Fehleranalyse ---------- */
  fehler(el, d, save) {
    const URSACHEN = ["Wissen fehlte", "Begriffe oder Verfahren verwechselt", "Falsch übertragen", "Ergebnis nicht geprüft", "Einheiten nicht beachtet", "Flüchtigkeitsfehler"];
    d.ursachen = d.ursachen || [];
    el.innerHTML = `
      <label class="fld"><span>1 · Wo genau ist der Fehler?</span><textarea id="w-stelle" rows="2" placeholder="z. B. ${W_ESC(BEISPIELE.fehler.stelle)}">${W_ESC(d.stelle || "")}</textarea></label>
      <div class="fld"><span>2 · Was ist die Ursache?</span><div class="chips-select">${URSACHEN.map((u) => `<button type="button" data-u="${W_ESC(u)}" aria-pressed="${d.ursachen.includes(u)}">${u}</button>`).join("")}</div></div>
      <label class="fld"><span>3 · Meine Regel, damit es nicht wieder passiert</span><input id="w-regel" value="${W_ESC(d.regel || "")}" placeholder="z. B. ${W_ESC(BEISPIELE.fehler.regel)}"></label>
      <label class="fld"><span>4 · Neuer, ähnlicher Fall: selbst gelöst?</span><textarea id="w-neu" rows="2" placeholder="Notiere die Aufgabe und dein Ergebnis.">${W_ESC(d.neu || "")}</textarea></label>
      <p class="small muted">Tipp für Rechenaufgaben: Schätze vorher die Größenordnung und prüfe danach die Einheit. Ein Radfahrer mit 1800 km/h kann nicht stimmen.</p>`;
    el.querySelectorAll("[data-u]").forEach((b) => b.onclick = () => { const u = b.dataset.u; d.ursachen = d.ursachen.includes(u) ? d.ursachen.filter((x) => x !== u) : [...d.ursachen, u]; b.setAttribute("aria-pressed", d.ursachen.includes(u)); save(); });
    [["w-stelle", "stelle"], ["w-regel", "regel"], ["w-neu", "neu"]].forEach(([id, k]) => el.querySelector("#" + id).oninput = (e) => { d[k] = e.target.value; save(); });
  },

  /* ---------- KI-Anfrage bauen (nach M6) ---------- */
  ki(el, d, save, ctx) {
    const HILFE = ["Stelle mir Rückfragen", "Gib mir nur einen Hinweis", "Markiere höchstens zwei unklare Stellen", "Erstelle mir neue Übungsaufgaben", "Frag mich ab, eine Frage nach der anderen"];
    const NICHT = ["Gib mir nicht die Lösung", "Formuliere meinen Text nicht neu", "Verrate die Antwort erst, wenn ich darum bitte"];
    d.soll = d.soll != null ? d.soll : (ctx.fach ? `In ${ctx.fach} soll ich …` : "");
    d.problem = d.problem != null ? d.problem : (ctx.problemText || "");
    d.hilfe = d.hilfe || [HILFE[0]]; d.nicht = d.nicht || [NICHT[0]];
    el.innerHTML = `
      <label class="fld"><span>1 · Was soll ich lernen oder können?</span><input id="w-soll" value="${W_ESC(d.soll)}"></label>
      <label class="fld"><span>2 · Was ist mein konkretes Lernproblem?</span><input id="w-problem" value="${W_ESC(d.problem)}"></label>
      <div class="fld"><span>3 · Welche Hilfe möchte ich?</span><div class="chips-select" id="w-hilfe">${HILFE.map((h) => `<button type="button" data-h="${h}" aria-pressed="${d.hilfe.includes(h)}">${h}</button>`).join("")}</div></div>
      <div class="fld"><span>4 · Was soll die KI nicht übernehmen?</span><div class="chips-select" id="w-nicht">${NICHT.map((h) => `<button type="button" data-n="${h}" aria-pressed="${d.nicht.includes(h)}">${h}</button>`).join("")}</div></div>
      <div class="prompt"><p id="w-prompt"></p><button type="button" class="btn btn-ghost copy" data-target="w-prompt">Anfrage kopieren</button></div>
      <p class="small muted">Füge die Anfrage in fobizz ein. Prüfe danach ohne KI, was du selbst kannst.</p>`;
    const upd = () => {
      el.querySelector("#w-prompt").textContent = [d.soll, d.problem ? `Mein Lernproblem: ${d.problem}` : "", d.hilfe.join(". "), d.nicht.join(". ")]
        .map((x) => x.trim()).filter(Boolean).map((x) => /[.!?…]$/.test(x) ? x : x + ".").join(" ");
    };
    el.querySelector("#w-soll").oninput = (e) => { d.soll = e.target.value; save(); upd(); };
    el.querySelector("#w-problem").oninput = (e) => { d.problem = e.target.value; save(); upd(); };
    const toggle = (key, attr) => el.querySelectorAll(`[data-${attr}]`).forEach((b) => b.onclick = () => {
      const v = b.dataset[attr]; d[key] = d[key].includes(v) ? d[key].filter((x) => x !== v) : [...d[key], v];
      b.setAttribute("aria-pressed", d[key].includes(v)); save(); upd();
    });
    toggle("hilfe", "h"); toggle("nicht", "n");
    upd();
  },

  /* ---------- Schritte aus dem Handout ---------- */
  schritte(el, d, save, ctx) {
    const s = (ctx.m.handout && ctx.m.handout.schritte) || [];
    d.done = d.done || []; d.notizen = d.notizen || [];
    el.innerHTML = `<ol class="schritt-liste">${s.map((t, i) => `<li class="${d.done[i] ? "done" : ""}">
        <label class="check"><input type="checkbox" data-i="${i}" ${d.done[i] ? "checked" : ""}> ${W_ESC(t)}</label>
        <input class="notiz" data-n="${i}" value="${W_ESC(d.notizen[i] || "")}" placeholder="Notiz (optional)" aria-label="Notiz zu Schritt ${i + 1}"></li>`).join("")}</ol>
      <p class="small muted" id="w-stand"></p>`;
    const stand = () => { const n = d.done.filter(Boolean).length; el.querySelector("#w-stand").textContent = `${n} von ${s.length} Schritten erledigt${n === s.length && n ? ". Stark!" : ""}`; };
    el.querySelectorAll("[data-i]").forEach((c) => c.onchange = () => { d.done[+c.dataset.i] = c.checked; c.closest("li").classList.toggle("done", c.checked); save(); stand(); });
    el.querySelectorAll("[data-n]").forEach((c) => c.oninput = () => { d.notizen[+c.dataset.n] = c.value; save(); });
    stand();
  }
};
