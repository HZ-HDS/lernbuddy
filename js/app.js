/* Lernbuddy – App-Logik (Etappe 2: Startseite, Navigation, Problemauswahl) */
(function () {
  "use strict";

  /* ---------- Speichern (nur lokal im Browser) ---------- */
  const KEY = "lernbuddy-v1";
  const store = {
    load() { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; } },
    save(s) { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) { /* z. B. privater Modus */ } },
    clear() { try { localStorage.removeItem(KEY); } catch (e) {} }
  };
  const leer = () => ({ schritt: 0, fach: "", anlass: "", datum: "", zeitraum: "", probleme: [], eigenes: "", antworten: {}, methoden: [],
    ziel: {}, plan: { tage: [1, 3, 5], minuten: 25, themen: "" }, wenn: "", dann: "", bedingungen: [], uebungen: {}, aktiv: "", refl: {}, verlauf: [] });
  let state = Object.assign(leer(), store.load());
  if (!state.antworten || typeof state.antworten !== "object") state.antworten = {};
  if (!Array.isArray(state.methoden)) state.methoden = [];
  (function reparieren() {
    const d = leer();
    ["ziel", "plan", "uebungen", "refl"].forEach((k) => { if (!state[k] || typeof state[k] !== "object") state[k] = d[k]; });
    if (!Array.isArray(state.plan.tage)) state.plan.tage = d.plan.tage;
    if (!Array.isArray(state.bedingungen)) state.bedingungen = [];
    if (!Array.isArray(state.verlauf)) state.verlauf = [];
  })();
  const speichern = () => store.save(state);

  const $ = (s, el = document) => el.querySelector(s);
  const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  /* ---------- Symbole ---------- */
  const P = {
    akku: '<rect x="2" y="7" width="17" height="10" rx="2"/><path d="M22 11v2"/><path d="M5 10v4"/>',
    auge: '<path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12z"/><circle cx="12" cy="12" r="3"/><path d="M4 4l16 16"/>',
    puzzle: '<path d="M4 8h4a2 2 0 1 1 4 0h4v4a2 2 0 1 1 0 4v4H4z"/>',
    stapel: '<path d="M12 3 2 8l10 5 10-5z"/><path d="M2 12.5l10 5 10-5"/><path d="M2 17l10 5 10-5"/>',
    uhr: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    sanduhr: '<path d="M7 3h10v3l-5 6-5-6z"/><path d="M7 21h10v-3l-5-6-5 6z"/>',
    ziel: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
    welle: '<path d="M2 7c2-3 4-3 6 0s4 3 6 0 4-3 6 0"/><path d="M2 12c2-3 4-3 6 0s4 3 6 0 4-3 6 0"/><path d="M2 17c2-3 4-3 6 0s4 3 6 0 4-3 6 0"/>',
    wolke: '<path d="M7 18h10a4 4 0 0 0 0-8 6 6 0 0 0-11.5 1.5A3.3 3.3 0 0 0 7 18z"/>',
    fahne: '<path d="M5 21V4"/><path d="M5 4h11l-2 4 2 4H5"/>',
    kompass: '<circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/>',
    haken: '<path d="M5 12l5 5 9-10"/>',
    leute: '<circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M3 20c0-3 3-5 6-5s6 2 6 5"/><path d="M15.5 14.5c3 0 5.5 1.7 5.5 4.5"/>',
    kalender: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
    raster: '<rect x="3" y="3" width="8" height="8" rx="1.5"/><rect x="13" y="3" width="8" height="8" rx="1.5"/><rect x="3" y="13" width="8" height="8" rx="1.5"/><rect x="13" y="13" width="8" height="8" rx="1.5"/>',
    pfeil: '<path d="M4 12h14M13 6l6 6-6 6"/>',
    netz: '<circle cx="5" cy="6" r="2"/><circle cx="19" cy="6" r="2"/><circle cx="12" cy="18" r="2"/><path d="M7 6h10M6 8l5 8M18 8l-5 8"/>',
    suche: '<circle cx="11" cy="11" r="6"/><path d="M20 20l-4.5-4.5"/>',
    tausch: '<path d="M4 8h13l-3-3M20 16H7l3 3"/>'
  };
  const icon = (n) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[n] || ""}</svg>`;
  document.querySelectorAll("[data-icon]").forEach((el) => { el.innerHTML = icon(el.dataset.icon); });

  /* ---------- Schulname ---------- */
  if (typeof SCHULE !== "undefined") {
    document.querySelectorAll("[data-schule]").forEach((el) => { el.textContent = `${SCHULE.name} ${SCHULE.ort}`; });
  }

  /* ---------- Impressum & Datenschutz ---------- */
  (function rechtliches() {
    const el = document.getElementById("rechtliches");
    if (!el || typeof SCHULE === "undefined") return;
    const links = [["Impressum", SCHULE.impressum], ["Datenschutz", SCHULE.datenschutz]].filter(([, u]) => /^https?:\/\//.test(u || ""));
    if (!links.length) return;
    el.innerHTML = links.map(([t, u]) => `<a href="${esc(u)}" target="_blank" rel="noopener">${t}</a>`).join(" · ");
    el.hidden = false;
  })();

  /* ---------- Navigation ---------- */
  const VIEWS = ["start", "buddy", "bibliothek", "lehrkraefte"];
  function route() {
    const dlg = document.getElementById("handout");
    if (dlg && dlg.open) { if (dlg.close) dlg.close(); else dlg.removeAttribute("open"); }
    const h = decodeURIComponent(location.hash.slice(1)) || "start";
    const view = VIEWS.includes(h) ? h : "start";
    document.querySelectorAll("[data-view]").forEach((v) => { v.hidden = v.dataset.view !== view; });
    document.querySelectorAll(".nav a").forEach((a) => {
      if (a.getAttribute("href") === "#" + view) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });
    if (VIEWS.includes(h)) window.scrollTo(0, 0);
    else { const t = document.getElementById(h); if (t) t.scrollIntoView(); }
    if (view === "buddy") renderBuddy();
  }
  window.addEventListener("hashchange", route);

  /* ---------- SRL-Kreislauf ---------- */
  const PHASEN = {
    planen: { titel: "Planen", wann: "Vor dem Lernen", farbe: "var(--plan)",
      fragen: ["Was genau will ich können, und bis wann?", "Welche Strategie passt zu diesem Stoff?", "Wie viel Zeit plane ich ein?"] },
    tun: { titel: "Durchführen", wann: "Während des Lernens", farbe: "var(--tun)",
      fragen: ["Ich wende meine Strategie an.", "Verstehe ich es noch, oder muss ich anders vorgehen?", "Bin ich noch konzentriert?"] },
    refl: { titel: "Reflektieren", wann: "Nach dem Lernen", farbe: "var(--refl)",
      fragen: ["Habe ich mein Ziel erreicht?", "Was hat geholfen, was nicht?", "Was mache ich beim nächsten Mal anders?"] }
  };
  function zyklus() {
    const svg = $("#cycle-svg"); if (!svg) return;
    const C = 150, R = 105, W = 36;
    const pt = (r, a) => { const t = (a * Math.PI) / 180; return [C + r * Math.cos(t), C + r * Math.sin(t)]; };
    const arc = (a0, a1, rev) => {
      const [x0, y0] = pt(R, rev ? a1 : a0), [x1, y1] = pt(R, rev ? a0 : a1);
      return `M${x0.toFixed(1)} ${y0.toFixed(1)} A${R} ${R} 0 0 ${rev ? 0 : 1} ${x1.toFixed(1)} ${y1.toFixed(1)}`;
    };
    const teile = [["planen", -86, 26, false], ["tun", 34, 146, true], ["refl", 154, 266, false]];
    let html = "";
    teile.forEach(([id, a0, a1, rev]) => {
      const f = PHASEN[id].farbe;
      const tip = pt(R, a1 + 6), b1 = pt(R + 23, a1 - 1), b2 = pt(R - 23, a1 - 1);
      html += `<g class="arc" data-phase="${id}" role="button" tabindex="0" aria-label="${PHASEN[id].titel}">
        <path id="arc-${id}" d="${arc(a0, a1, rev)}" fill="none" stroke="${f}" stroke-width="${W}"/>
        <polygon points="${[tip, b1, b2].map((p) => p.map((n) => n.toFixed(1)).join(",")).join(" ")}" fill="${f}"/>
        <text font-size="14" font-weight="700" style="fill:var(--on-accent);font-family:var(--font-display)" dominant-baseline="central">
          <textPath href="#arc-${id}" startOffset="50%" text-anchor="middle">${PHASEN[id].titel}</textPath></text></g>`;
    });
    html += `<text x="150" y="143" text-anchor="middle" style="fill:var(--ink);font-family:var(--font-display)" font-size="34" font-weight="800">SRL</text>
      <text x="150" y="168" text-anchor="middle" style="fill:var(--ink-soft)" font-size="12">Lernen als Kreislauf</text>`;
    svg.innerHTML = html;
    const waehle = (id) => {
      svg.querySelectorAll(".arc").forEach((g) => { g.style.opacity = g.dataset.phase === id ? 1 : 0.45; });
      const p = PHASEN[id], panel = $("#cycle-panel");
      panel.style.setProperty("--phase", p.farbe);
      panel.innerHTML = `<span class="eyebrow">${p.wann}</span><h3 style="color:${p.farbe}">${p.titel}</h3>
        <ul>${p.fragen.map((f) => `<li>${f}</li>`).join("")}</ul>`;
    };
    svg.querySelectorAll(".arc").forEach((g) => {
      g.addEventListener("click", () => waehle(g.dataset.phase));
      g.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); waehle(g.dataset.phase); } });
    });
    waehle("planen");
  }

  /* ---------- Vier Lernschritte (Karten) ---------- */
  const LERNSCHRITTE = [
    { t: "Aufnehmen", v: "Dein Arbeitsgedächtnis hält nur wenige Dinge gleichzeitig fest, etwa vier Informationseinheiten.",
      h: "Teile den Stoff in kleine Portionen. Leg das Handy weg: Jede Ablenkung belegt einen der wenigen Plätze." },
    { t: "Verknüpfen", v: "Neues bleibt hängen, wenn du es mit dem verbindest, was du schon weißt.",
      h: "Frag dich bei jedem neuen Begriff: Warum ist das so? Wo kenne ich das schon her? Was wäre ein Beispiel aus meinem Alltag?" },
    { t: "Festigen", v: "Das Gehirn festigt Gelerntes in Pausen und vor allem im Schlaf.",
      h: "Lieber vier Tage je 30 Minuten als einmal vier Stunden. Die Nacht vor der Klausur ist zum Schlafen da." },
    { t: "Abrufen", v: "Jedes Mal, wenn du etwas aus dem Gedächtnis holst, wird die Erinnerung stärker.",
      h: "Buch zu, aufschreiben, was du noch weißt, dann vergleichen. Das ist anstrengender als Lesen, aber viel wirksamer." }
  ];
  function karten() {
    const box = $("#flips"); if (!box) return;
    box.innerHTML = LERNSCHRITTE.map((k, i) => `<button type="button" class="flip" aria-pressed="false">
      <span class="side" data-s="v"><span class="num">${i + 1}</span><h3>${k.t}</h3><span>${k.v}</span><span class="turn">Antippen: Was heißt das für mich?</span></span>
      <span class="side" data-s="h" hidden><span class="num">${i + 1}</span><h3>Für dich heißt das</h3><span>${k.h}</span><span class="turn">Zurück</span></span></button>`).join("");
    box.querySelectorAll(".flip").forEach((b) => b.addEventListener("click", () => {
      const back = b.getAttribute("aria-pressed") !== "true";
      b.setAttribute("aria-pressed", back); b.classList.toggle("is-back", back);
      b.querySelector('[data-s="v"]').hidden = back; b.querySelector('[data-s="h"]').hidden = !back;
    }));
  }

  /* ---------- Vergessenskurve ---------- */
  function kurve() {
    const svg = $("#kurve-svg"); if (!svg) return;
    const X = (t) => 50 + (t / 7) * 450, Y = (r) => 190 - r * 165;
    const ohne = (t) => 0.2 + 0.8 * Math.exp(-t / 0.9);
    const WDH = [1, 3, 6], S = [0.9, 2.2, 4.5, 9];
    const mit = (t) => { let i = 0; while (i < WDH.length && t >= WDH[i]) i++; const t0 = i ? WDH[i - 1] : 0; return 0.2 + 0.8 * Math.exp(-(t - t0) / S[i]); };
    const linie = (f) => { let d = ""; for (let t = 0; t <= 7.0001; t += 0.02) { const x = X(t).toFixed(1), y = Y(f(t)).toFixed(1); d += (d ? " L" : "M") + x + " " + y; } return d; };
    let modus = "ohne";
    const zeichne = () => {
      let g = `<line x1="50" y1="190" x2="500" y2="190" stroke="var(--line)"/><line x1="50" y1="25" x2="50" y2="190" stroke="var(--line)"/>`;
      for (let d = 0; d <= 7; d++) g += `<text x="${X(d)}" y="208" text-anchor="middle">${d === 0 ? "Tag 0" : d}</text>`;
      g += `<text x="44" y="${Y(1) + 4}" text-anchor="end">100 %</text><text x="44" y="194" text-anchor="end">0</text>`;
      g += `<text x="58" y="18">Behalten</text>`;
      const aktiv = modus === "ohne" ? ohne : mit, anders = modus === "ohne" ? mit : ohne;
      g += `<path d="${linie(anders)}" fill="none" stroke="var(--ink-soft)" stroke-width="1.5" stroke-dasharray="4 4" opacity=".45"/>`;
      g += `<path d="${linie(aktiv)}" fill="none" stroke="${modus === "ohne" ? "var(--refl)" : "var(--tun)"}" stroke-width="3.5" stroke-linejoin="round"/>`;
      if (modus === "mit") WDH.forEach((w, i) => { g += `<circle cx="${X(w)}" cy="${Y(1)}" r="5" fill="var(--tun)"/><text x="${X(w)}" y="${Y(1) - 10}" text-anchor="middle">${i + 1}. Wdh.</text>`; });
      svg.innerHTML = g;
      $("#kurve-text").textContent = modus === "ohne"
        ? "Ohne Wiederholung ist schon nach ein bis zwei Tagen ein großer Teil vergessen."
        : "Jede Wiederholung holt das Wissen zurück, und danach vergisst du langsamer. Deshalb lohnt es sich, über mehrere Tage verteilt zu lernen.";
      $("#kurve-ohne").setAttribute("aria-pressed", modus === "ohne");
      $("#kurve-mit").setAttribute("aria-pressed", modus === "mit");
    };
    $("#kurve-ohne").addEventListener("click", () => { modus = "ohne"; zeichne(); });
    $("#kurve-mit").addEventListener("click", () => { modus = "mit"; zeichne(); });
    zeichne();
  }

  /* ---------- Hilft das beim Lernen? ---------- */
  const MYTHEN = [
    { q: "Den Text mehrmals durchlesen", hilft: false, a: "Der Text wirkt danach vertraut, aber Wiedererkennen ist nicht dasselbe wie Können. Mehrfaches Lesen bringt in Studien wenig." },
    { q: "Mich selbst abfragen, ohne nachzuschauen", hilft: true, a: "Abrufübungen gehören zu den wirksamsten Lernstrategien überhaupt." },
    { q: "Den Stoff auf mehrere Tage verteilen", hilft: true, a: "Verteiltes Lernen ist deutlich wirksamer als alles an einem Abend zu lernen." },
    { q: "Wichtiges farbig markieren", hilft: false, a: "Markieren allein bringt kaum etwas. Es hilft erst, wenn du mit dem Markierten weiterarbeitest, zum Beispiel Fragen dazu formulierst." },
    { q: "Nur nach meinem Lerntyp lernen, z. B. ausschließlich visuell", hilft: false, a: "Für feste Lerntypen gibt es keinen wissenschaftlichen Beleg. Besser: Inhalte auf mehreren Wegen verarbeiten, z. B. Text plus Skizze." },
    { q: "Verschiedene Aufgabentypen mischen statt blockweise üben", hilft: true, a: "So lernst du zu erkennen, welcher Lösungsweg passt. Das wirkt besonders in Mathe und den Naturwissenschaften." }
  ];
  function mythen() {
    const box = $("#myths"); if (!box) return;
    let richtig = 0, beantwortet = 0;
    const score = () => { $("#myth-score").textContent = beantwortet ? `${richtig} von ${beantwortet} richtig eingeschätzt.` : ""; };
    box.innerHTML = MYTHEN.map((m, i) => `<div class="myth" data-i="${i}">
      <div class="myth-q"><strong>${m.q}</strong>
      <div class="myth-btns"><button type="button" data-v="1">Hilft viel</button><button type="button" data-v="0">Hilft wenig</button></div></div>
      <p class="myth-a" hidden></p></div>`).join("");
    box.querySelectorAll(".myth").forEach((el) => {
      const m = MYTHEN[el.dataset.i];
      el.querySelectorAll("button").forEach((b) => b.addEventListener("click", () => {
        if (el.classList.contains("answered")) return;
        const ok = (b.dataset.v === "1") === m.hilft;
        el.classList.add("answered");
        b.classList.add(ok ? "pick-right" : "pick-wrong");
        const a = el.querySelector(".myth-a");
        a.hidden = false;
        a.innerHTML = `<strong>${ok ? "Richtig." : "Nicht ganz."}</strong> ${m.a}`;
        beantwortet++; if (ok) richtig++; score();
      }));
    });
  }


  /* ---------- Sieben Fragen (Zukunftswerkstatt, DS1) ---------- */
  const BERATUNG = [
    { schritt: "Anforderung und Lernstand klären", fragen: [
      ["Was wird von mir verlangt?", "Aufgabe, Operator, Gegenstand und geforderte Darstellungsform klären.", "Nicht nur Begriffe nennen, sondern die Regulation mithilfe eines Regelkreises erläutern."],
      ["Was muss ich dafür wissen, verstehen und können?", "Aus der Anforderung das erforderliche Können erschließen.", "Insulin, Glukagon, Bauchspeicheldrüse und Leber kennen, ihre Wirkungen verstehen, Ursache und Wirkung verknüpfen, einen Regelkreis darstellen."],
      ["Was kann ich davon schon?", "Den eigenen Lernstand möglichst konkret einschätzen.", "„Die einzelnen Begriffe kann ich erklären.“"]] },
    { schritt: "Lernproblem bestimmen", fragen: [
      ["Wo liegt mein Lernproblem?", "Die konkrete Lücke oder Schwierigkeit bestimmen.", "„Ich kann noch nicht sicher erklären, wie die Bestandteile zusammenwirken, und bekomme den Regelkreis ohne Vorlage nicht aufgebaut.“"]] },
    { schritt: "Passendes Vorgehen wählen", fragen: [
      ["Welche Lernstrategie passt dazu?", "Eine grundlegende Lernhandlung auswählen.", "Erklären und verknüpfen sowie strukturieren und visualisieren, nicht noch mehr Einzelbegriffe auswendig lernen."],
      ["Welche Methode, Technik oder Ressource nutze ich konkret?", "Das Vorgehen und die passenden Hilfsmittel festlegen.", "Eine Concept Map oder Regelkreisskizze erstellen, den Zusammenhang einer Mitschülerin erklären, KI höchstens für Rückfragen nutzen."]] },
    { schritt: "Können ohne Hilfe überprüfen", fragen: [
      ["Woran prüfe ich, ob ich es jetzt selbst kann?", "Das eigene Können durch eine eigene Leistung überprüfen.", "Ohne Vorlage einen Regelkreis zeichnen und die Regulation einer anderen Person nachvollziehbar erläutern."]] }
  ];
  function fragen() {
    const box = $("#fragen"); if (!box) return;
    let n = 0;
    box.innerHTML = `<p class="beispiel-auftrag"><span class="chip">Beispiel aus Gesundheit und Biologie</span> „Erläutern Sie mithilfe eines Regelkreises, wie der Blutzuckerspiegel reguliert wird.“</p>` +
      BERATUNG.map((b, i) => `<div class="frage-schritt"><span class="fs-nr">Schritt ${i + 1}</span><h3>${b.schritt}</h3>
        ${b.fragen.map(([f, h, bsp]) => { n++; return `<details class="frage"><summary><span class="fn">${n}</span>${f}</summary>
          <p class="small muted">${h}</p><p class="small"><strong>Im Beispiel:</strong> ${bsp}</p></details>`; }).join("")}</div>`).join("");
  }
  function strategienListe() {
    const dl = $("#strategien"); if (!dl || typeof STRATEGIEN === "undefined") return;
    dl.innerHTML = STRATEGIEN.map(([n, w]) => `<div><dt>${n}</dt><dd>${w}</dd></div>`).join("");
  }

  /* ---------- Lernbuddy ---------- */
  const PHASE_BTN = { planen: "btn-plan", tun: "btn-tun", refl: "btn-refl" };
  const PHASE_NAME = { planen: "Planen", tun: "Durchführen", refl: "Reflektieren" };
  const PHASE_TAG = { planen: "tag-plan", tun: "tag-tun", refl: "tag-refl" };
  const hatAuswahl = () => state.probleme.length > 0 || state.eigenes.trim().length > 0;
  const beantwortet = () => FRAGEN.filter((f) => Object.prototype.hasOwnProperty.call(state.antworten, f.id)).length;
  const methode = (id) => METHODEN.find((m) => m.id === id);
  const problemName = (id) => (PROBLEME.find((p) => p.id === id) || {}).titel || id;

  function kopf(phase, titel, text) {
    return `<div class="sec-head"><span class="phase-tag ${PHASE_TAG[phase]}">${PHASE_NAME[phase]}</span>
      <h2>${titel}</h2>${text ? `<p class="muted">${text}</p>` : ""}</div>`;
  }

  function weiterStatus() {
    const s = SCHRITTE[state.schritt];
    const b = $("#btn-weiter");
    if (s.id === "start") b.disabled = !state.fach || !state.anlass || (state.anlass === "ka" && !state.zeitraum);
    else if (s.id === "problem") b.disabled = !hatAuswahl();
    else if (s.id === "vorlieben") b.disabled = beantwortet() < FRAGEN.length;
    else if (s.id === "methoden") b.disabled = state.methoden.length === 0;
    else if (s.id === "reflexion") { b.disabled = reflFehlt().length > 0; b.textContent = "Zu meinem Feedback"; return; }
    else b.disabled = false;
  }

  /* Schritt 1: Fach & Lernzeit */
  function tageBis(datum) {
    const t = Math.ceil((new Date(datum + "T12:00:00") - new Date()) / 86400000);
    return isNaN(t) ? null : t;
  }
  function schrittStart(body) {
    const zeitBlock = () => {
      if (state.anlass !== "ka") return "";
      const t = state.datum ? tageBis(state.datum) : null;
      const info = t === null ? "" : t < 0 ? "Das Datum liegt in der Vergangenheit." : t === 0 ? "Die Klassenarbeit ist heute." : `Noch ${t} Tag${t === 1 ? "" : "e"} bis zur Klassenarbeit.`;
      return `<div class="field-group"><h3>Wann ist die Klassenarbeit?</h3>
        <div class="date-row"><label for="ka-datum" class="small muted">Datum</label><input type="date" id="ka-datum" value="${esc(state.datum)}"></div>
        <p class="small muted">${info || "Datum noch unklar? Schätze die Zeit:"}</p>
        <div class="opts" role="group" aria-label="Verbleibende Zeit">${Object.entries(ZEITRAUM_LABEL).map(([k, t]) =>
          `<button type="button" data-zeit="${k}" aria-pressed="${state.zeitraum === k}">${t[0].toUpperCase() + t.slice(1)}</button>`).join("")}</div></div>`;
    };
    const zeichne = () => {
      body.innerHTML = `<div class="sec">
        ${kopf("planen", "Worum geht es gerade?", "Wähle das Fach und wofür du lernst. Danach geht es um dein Lernproblem.")}
        <div class="field-group"><h3>Fach</h3>
          <div class="chips-select" role="group" aria-label="Fach">${FAECHER.map((f) =>
            `<button type="button" data-fach="${esc(f)}" aria-pressed="${state.fach === f}">${esc(f)}${f === PROFILFACH ? ' <span class="pf">Profilfach</span>' : ""}</button>`).join("")}</div></div>
        <div class="field-group"><h3>Wofür lernst du?</h3>
          <div class="anlass">${ANLAESSE.map((a) => `<button type="button" class="problem anlass-btn" data-anlass="${a.id}" aria-pressed="${state.anlass === a.id}">
            <strong>${esc(a.titel)}</strong><span class="s">${esc(a.satz)}</span></button>`).join("")}</div></div>
        ${zeitBlock()}</div>`;
      body.querySelectorAll("[data-fach]").forEach((b) => b.addEventListener("click", () => { state.fach = b.dataset.fach; speichern(); zeichne(); }));
      body.querySelectorAll("[data-anlass]").forEach((b) => b.addEventListener("click", () => {
        state.anlass = b.dataset.anlass; if (state.anlass !== "ka") { state.zeitraum = ""; } speichern(); zeichne();
      }));
      body.querySelectorAll("[data-zeit]").forEach((b) => b.addEventListener("click", () => { state.zeitraum = b.dataset.zeit; speichern(); zeichne(); }));
      const d = $("#ka-datum");
      if (d) d.addEventListener("change", () => { state.datum = d.value; state.zeitraum = zeitraumAusDatum(d.value) || state.zeitraum; speichern(); zeichne(); });
      weiterStatus();
    };
    zeichne();
  }

  /* Schritt 2: Problem */
  function schrittProblem(body) {
    const karte = (p) => `<button type="button" class="problem" data-id="${p.id}" aria-pressed="${state.probleme.includes(p.id)}">
        <span class="pi">${icon(p.icon)}</span><strong>${esc(p.titel)}</strong><span class="s">${esc(p.satz)}</span></button>`;
    body.innerHTML = `<div class="sec">
      ${kopf("planen", "Wo liegt dein Lernproblem?", "Ein Lernproblem ist die Lücke zwischen dem, was du können sollst, und dem, was du schon sicher kannst. Tippe alles an, was auf dich zutrifft.")}
      ${Object.entries(PROBLEM_GRUPPEN).map(([g, t]) => `<div class="group"><h3 class="group-h">${t}</h3>
        <div class="problems">${PROBLEME.filter((p) => p.gruppe === g).map(karte).join("")}</div></div>`).join("")}
      <div class="own"><label for="eigenes-problem">Etwas anderes? Beschreibe dein Problem in eigenen Worten.</label>
        <textarea id="eigenes-problem" placeholder="z. B. Ich verstehe die Aufgabenstellungen in Mathe oft nicht.">${esc(state.eigenes)}</textarea></div>
      <p class="count" id="auswahl-zahl" aria-live="polite"></p></div>`;
    const zahl = () => {
      const n = state.probleme.length + (state.eigenes.trim() ? 1 : 0);
      $("#auswahl-zahl").textContent = n ? `${n} ausgewählt` : "";
      weiterStatus();
    };
    body.querySelectorAll(".problem").forEach((b) => b.addEventListener("click", () => {
      const id = b.dataset.id, an = !state.probleme.includes(id);
      state.probleme = an ? [...state.probleme, id] : state.probleme.filter((x) => x !== id);
      b.setAttribute("aria-pressed", an); speichern(); zahl();
    }));
    $("#eigenes-problem").addEventListener("input", (e) => { state.eigenes = e.target.value; speichern(); zahl(); });
    zahl();
  }

  /* Schritt 2: Vorlieben */
  function schrittVorlieben(body) {
    body.innerHTML = `<div class="sec">
      ${kopf("planen", "Wie lernst du am liebsten?", "Sieben kurze Fragen. Es gibt kein Richtig oder Falsch.")}
      <aside class="hint"><strong>Gut zu wissen:</strong> Vielleicht hast du schon von Lerntypen gehört, etwa vom „visuellen Lerntyp“. Dass man besser lernt, wenn man nur nach seinem Typ lernt, ist wissenschaftlich nicht belegt. Deine Antworten hier sind Vorlieben. Sie helfen dabei, unter den wirksamen Methoden die auszuwählen, die dir liegen.</aside>
      <div class="questions">${FRAGEN.map((f, i) => `<fieldset class="q" data-f="${f.id}"><legend><span class="qn">${i + 1}</span>${f.frage}</legend>
        <div class="opts">${f.optionen.map(([v, t]) => `<button type="button" data-v="${v}" aria-pressed="${state.antworten[f.id] === v}">${t}</button>`).join("")}</div></fieldset>`).join("")}</div>
      <p class="count" id="frage-zahl" aria-live="polite"></p></div>`;
    const zahl = () => {
      const n = beantwortet();
      $("#frage-zahl").textContent = n < FRAGEN.length ? `${n} von ${FRAGEN.length} beantwortet` : "Alle Fragen beantwortet. Weiter zu deinen Methoden!";
      weiterStatus();
    };
    body.querySelectorAll(".q").forEach((fs) => fs.querySelectorAll("button").forEach((b) => b.addEventListener("click", () => {
      state.antworten[fs.dataset.f] = b.dataset.v; speichern();
      fs.querySelectorAll("button").forEach((x) => x.setAttribute("aria-pressed", x === b));
      zahl();
    })));
    zahl();
  }

  /* Schritt 3: Methoden */
  function karte(x) {
    const m = x.m, gewaehlt = state.methoden.includes(m.id);
    const warum = [];
    if (x.problemTreffer.length) warum.push(`<span><strong>Hilft bei:</strong> ${x.problemTreffer.map(problemName).join(", ")}</span>`);
    if (x.vorliebenTreffer.length) warum.push(`<span><strong>Passt zu dir:</strong> ${x.vorliebenTreffer.map((v) => VORLIEBEN_LABEL[v]).join(", ")}</span>`);
    if (x.zeit || x.anlassPasst) warum.push(`<span><strong>Passt zu deinem Anlass</strong>${x.zeit ? " und deiner Lernzeit" : ""}</span>`);
    return `<article class="mcard${gewaehlt ? " is-picked" : ""}" data-id="${m.id}">
      <div class="mcard-top"><span class="k">${TYPEN[m.typ]} · ${KATEGORIEN[m.kategorie]}</span><span class="ev ev-${m.evidenz}">${EVIDENZ[m.evidenz]}</span></div>
      <h3>${esc(m.name)}</h3><p>${esc(m.kurz)}</p>
      ${warum.length ? `<p class="why">${warum.join("")}</p>` : ""}
      <p class="small muted">${esc(m.dauer)} · ${esc(m.sozial)}</p>
      <div class="mcard-btns">
        <button type="button" class="btn pick" aria-pressed="${gewaehlt}">${gewaehlt ? "Ausgewählt" : "Auswählen"}</button>
        <button type="button" class="btn btn-ghost info" data-handout="${m.id}">${m.handout ? "Handout" : "Info"}</button>
      </div></article>`;
  }

  function schrittMethoden(body) {
    const e = empfehlen(state.probleme, state.eigenes, state.antworten, state.zeitraum, state.anlass);
    const rahmen = (id, rolle) => id ? karte({ m: methode(id), problemTreffer: [], vorliebenTreffer: [], zeit: 0, rolle }) : "";
    const probleme = [state.fach, (ANLAESSE.find((a) => a.id === state.anlass) || {}).titel].filter(Boolean).concat(state.probleme.map(problemName));
    if (state.eigenes.trim()) probleme.push("Eigenes Problem");
    body.innerHTML = `<div class="sec">
      ${kopf("tun", "Deine passenden Methoden", "Wähle eine oder mehrere Methoden aus, die du ausprobieren willst. Unter „Handout“ findest du die ausführliche Anleitung.")}
      <div class="chips">${probleme.map((t) => `<span class="chip">${esc(t)}</span>`).join("")}</div>
      <div class="group"><h3 class="group-h">Starte damit</h3><div class="mgrid">${e.start.map(karte).join("")}</div></div>
      ${e.ergaenzend.length ? `<div class="group"><h3 class="group-h">Ergänzend</h3><div class="mgrid">${e.ergaenzend.map(karte).join("")}</div></div>` : ""}
      <div class="group"><h3 class="group-h">Dein fester Rahmen</h3>
        <p class="muted small">Selbstreguliertes Lernen heißt: vorher planen und hinterher reflektieren. Diese zwei Bausteine gehören immer dazu.</p>
        <div class="mgrid">${rahmen(e.rahmen.planen)}${rahmen(e.rahmen.reflektieren)}</div></div>
      <p class="small muted">Alle ${METHODEN.length} Methoden findest du unter <a href="#bibliothek">Methoden</a>.</p>
      <p class="count" id="methoden-zahl" aria-live="polite"></p></div>`;
    const zahl = () => {
      const n = state.methoden.length;
      $("#methoden-zahl").textContent = n ? `${n} Methode${n > 1 ? "n" : ""} ausgewählt` : "";
      weiterStatus();
    };
    body.querySelectorAll(".mcard .pick").forEach((b) => b.addEventListener("click", () => {
      const card = b.closest(".mcard"), id = card.dataset.id, an = !state.methoden.includes(id);
      state.methoden = an ? [...state.methoden, id] : state.methoden.filter((x) => x !== id);
      speichern();
      body.querySelectorAll(`.mcard[data-id="${id}"]`).forEach((c) => {
        c.classList.toggle("is-picked", an);
        const p = c.querySelector(".pick"); p.setAttribute("aria-pressed", an); p.textContent = an ? "Ausgewählt" : "Auswählen";
      });
      zahl();
    }));
    zahl();
  }

  /* Schritt 5: Ziel & Zeit */
  const datumLang = (d) => d.toLocaleDateString("de-DE", { weekday: "long", day: "numeric", month: "long" });
  const datumKurz = (d) => d.toLocaleDateString("de-DE", { weekday: "short", day: "numeric", month: "numeric" });
  const BEISPIEL_ZIEL = {
    "Gesundheit und Biologie": { s: "die Regulation des Blutzuckerspiegels mit einem Regelkreis erläutern", m: "ich den Regelkreis ohne Vorlage zeichne und ihn einer Mitschülerin erkläre", themen: "Bau der Zelle\nZellorganellen und ihre Aufgaben\nBiomembran\nStofftransport: Diffusion und Osmose" },
    Mathematik: { s: "Aufgaben zu quadratischen Funktionen sicher lösen", m: "ich fünf gemischte Aufgaben ohne Hilfe richtig löse", themen: "Scheitelpunktform\nNullstellen\nSchnittpunkte\nAnwendungsaufgaben" }
  };
  const SOL_CHECKS = ["Material liegt bereit", "Handy außer Sichtweite", "Fester Lernplatz", "Lernpartner/in gefragt", "Termine im Kalender eingetragen"];

  function schrittZiel(body) {
    const bsp = BEISPIEL_ZIEL[state.fach] || { s: "…", m: "…", themen: "Thema 1\nThema 2\nThema 3" };
    const z = state.ziel, pl = state.plan;
    if (!z.t && state.datum) z.t = state.datum;
    body.innerHTML = `<div class="sec">
      ${kopf("planen", "Dein Ziel und dein Zeitplan", "Ein klares Ziel und feste Lernzeiten machen aus einem guten Vorsatz einen Plan, der wirklich stattfindet.")}
      <div class="panel"><h3><span class="pn">1</span>Mein SMART-Ziel</h3>
        <div class="form-grid">
          <label class="fld"><span>Was genau will ich können? <em>spezifisch</em></span><input id="ziel-s" value="${esc(z.s || "")}" placeholder="z. B. ${esc(bsp.s)}"></label>
          <label class="fld"><span>Woran merke ich, dass ich es kann? <em>messbar</em></span><input id="ziel-m" value="${esc(z.m || "")}" placeholder="z. B. ${esc(bsp.m)}"></label>
          <label class="fld"><span>Warum ist mir das wichtig? <em>attraktiv</em></span><input id="ziel-a" value="${esc(z.a || "")}" placeholder="z. B. weil ich im Profilfach sicherer werden will"></label>
          <label class="fld"><span>Bis wann? <em>terminiert</em></span><input type="date" id="ziel-t" value="${esc(z.t || "")}"></label>
        </div>
        <label class="check"><input type="checkbox" id="ziel-r" ${z.r ? "checked" : ""}> Das ist realistisch und passt in meine Woche. <em class="muted small">realistisch</em></label>
        <p class="ziel-satz" id="ziel-satz" aria-live="polite"></p></div>

      <div class="panel"><h3><span class="pn">2</span>Mein Lernzeitplan</h3>
        <label class="fld"><span>Welche Themen muss ich lernen? Eines pro Zeile, das Wichtigste zuerst.</span>
          <textarea id="plan-themen" rows="4" placeholder="${esc(bsp.themen)}">${esc(pl.themen || "")}</textarea></label>
        <div class="fld"><span>An welchen Tagen lerne ich?</span>
          <div class="chips-select" id="plan-tage">${[1, 2, 3, 4, 5, 6, 0].map((d) => `<button type="button" data-tag="${d}" aria-pressed="${pl.tage.includes(d)}">${WOCHENTAGE[d]}</button>`).join("")}</div></div>
        <div class="fld"><span>Wie lange pro Lerneinheit?</span>
          <div class="chips-select" id="plan-min">${[15, 25, 45].map((m) => `<button type="button" data-min="${m}" aria-pressed="${pl.minuten === m}">${m} Minuten</button>`).join("")}</div></div>
        <div id="plan-out" aria-live="polite"></div></div>

      <div class="panel"><h3><span class="pn">3</span>Damit es wirklich passiert</h3>
        <p class="small muted">Ein Wenn-dann-Plan legt fest, wann und wo du anfängst. Das hilft nachweislich gegen Aufschieben.</p>
        <div class="wenn-dann"><label class="fld"><span>Wenn …</span><input id="wenn" value="${esc(state.wenn || "")}" placeholder="ich montags nach der Schule gegessen habe,"></label>
          <label class="fld"><span>dann …</span><input id="dann" value="${esc(state.dann || "")}" placeholder="lerne ich 25 Minuten am Schreibtisch."></label></div>
        <div class="chips-select" id="sol-checks">${SOL_CHECKS.map((c) => `<button type="button" data-c="${esc(c)}" aria-pressed="${state.bedingungen.includes(c)}">${esc(c)}</button>`).join("")}</div></div>
    </div>`;

    const satz = () => {
      const t = z.t ? datumLang(new Date(z.t + "T12:00:00")) : "[Termin]";
      $("#ziel-satz").innerHTML = z.s
        ? `<strong>Mein Ziel:</strong> Bis ${esc(t)} will ich ${esc(z.s)}. ${z.m ? `Ich merke es daran, dass ${esc(z.m)}. ` : ""}${z.a ? `Das ist mir wichtig, ${esc(z.a)}.` : ""}`
        : `<span class="muted">Hier entsteht dein Ziel als Satz.</span>`;
    };
    const plan = () => {
      const r = lernplan({ themen: (pl.themen || "").split("\n"), tage: pl.tage, minuten: pl.minuten, datum: state.datum, zeitraum: state.zeitraum, anlass: state.anlass });
      const out = $("#plan-out");
      if (!(pl.themen || "").trim()) { out.innerHTML = `<p class="small muted">Trage deine Themen ein. Dann entsteht hier dein Plan.</p>`; return; }
      const kopfzeile = state.anlass === "ka"
        ? `Plan bis zur Klassenarbeit am ${datumLang(r.ende)}${r.geschaetzt ? " (geschätzt)" : ""}`
        : `Plan für die nächsten zwei Wochen`;
      out.innerHTML = `<h4 class="plan-h">${kopfzeile}</h4>
        ${r.hinweise.map((h) => `<p class="note">${esc(h)}</p>`).join("")}
        <ol class="plan">${r.termine.map((t) => `<li class="plan-${t.art}"><span class="pd">${datumKurz(t.datum)}</span>
          <span class="pa">${t.aufgaben.map((a) => `<span class="pt pt-${a.typ}">${esc(a.text)}</span>`).join("")}</span></li>`).join("")}</ol>
        <p class="small muted">Jedes Thema kommt dreimal dran: verstehen, nach etwa zwei Tagen abrufen, einige Tage später nochmal abrufen. So wiederholst du verteilt.</p>`;
    };
    [["ziel-s", "s"], ["ziel-m", "m"], ["ziel-a", "a"], ["ziel-t", "t"]].forEach(([id, k]) =>
      $("#" + id).addEventListener("input", (e) => { z[k] = e.target.value; speichern(); satz(); }));
    $("#ziel-r").addEventListener("change", (e) => { z.r = e.target.checked; speichern(); });
    $("#plan-themen").addEventListener("input", (e) => { pl.themen = e.target.value; speichern(); plan(); });
    body.querySelectorAll("[data-tag]").forEach((b) => b.addEventListener("click", () => {
      const d = +b.dataset.tag; pl.tage = pl.tage.includes(d) ? pl.tage.filter((x) => x !== d) : [...pl.tage, d];
      b.setAttribute("aria-pressed", pl.tage.includes(d)); speichern(); plan();
    }));
    body.querySelectorAll("[data-min]").forEach((b) => b.addEventListener("click", () => {
      pl.minuten = +b.dataset.min; body.querySelectorAll("[data-min]").forEach((x) => x.setAttribute("aria-pressed", x === b)); speichern(); plan();
    }));
    $("#wenn").addEventListener("input", (e) => { state.wenn = e.target.value; speichern(); });
    $("#dann").addEventListener("input", (e) => { state.dann = e.target.value; speichern(); });
    body.querySelectorAll("[data-c]").forEach((b) => b.addEventListener("click", () => {
      const c = b.dataset.c; state.bedingungen = state.bedingungen.includes(c) ? state.bedingungen.filter((x) => x !== c) : [...state.bedingungen, c];
      b.setAttribute("aria-pressed", state.bedingungen.includes(c)); speichern();
    }));
    satz(); plan();
  }

  /* Schritt 6: Ausprobieren */
  function schrittUeben(body) {
    if (typeof wStopTimer === "function") wStopTimer();
    const ids = state.methoden.filter((id) => methode(id));
    const auswahl = [...ids, "ki"].filter((id, i, a) => a.indexOf(id) === i);
    if (!state.aktiv || !auswahl.includes(state.aktiv)) state.aktiv = auswahl[0];
    const m = methode(state.aktiv);
    const typ = UEBUNG_TYP[m.id] || "schritte";
    body.innerHTML = `<div class="sec">
      ${kopf("tun", "Ausprobieren", ids.length ? "Probiere deine Methoden direkt an deinem eigenen Stoff aus, zum Beispiel für die nächste Klassenarbeit. Kein eigenes Material zur Hand? Dann übe mit dem Beispiel." : "Du hast noch keine Methode ausgewählt. Geh einen Schritt zurück oder probiere den KI-Baukasten aus.")}
      <div class="chips-select" role="tablist" aria-label="Methode wählen">${auswahl.map((id) => `<button type="button" role="tab" data-u="${id}" aria-pressed="${id === state.aktiv}">${esc(methode(id).name)}</button>`).join("")}</div>
      <div class="panel werkzeug">
        <div class="w-kopf"><div><span class="k-label">${esc(UEBUNG_NAME[typ])}</span><h3>${esc(m.name)}</h3></div>
          <button type="button" class="btn btn-ghost" data-handout="${m.id}">Handout</button></div>
        <div id="w-box"></div></div>
    </div>`;
    body.querySelectorAll("[data-u]").forEach((b) => b.addEventListener("click", () => { state.aktiv = b.dataset.u; speichern(); schrittUeben(body); }));
    const daten = state.uebungen[m.id] || (state.uebungen[m.id] = {});
    const ctx = { m, fach: state.fach, problemText: state.probleme.map((id) => (PROBLEME.find((p) => p.id === id) || {}).satz).filter(Boolean).join(" ") };
    WERKZEUGE[typ]($("#w-box"), daten, speichern, ctx);
  }

  /* Schritt 7: Reflexion */
  const reflFehlt = () => {
    const r = state.refl, f = [];
    if (!r.ergebnis) f.push("dein Ergebnis bei der Überprüfung");
    if (!(r.gut || "").trim()) f.push("was gut funktioniert hat");
    if (!(r.anders || "").trim()) f.push("was du beim nächsten Mal anders machst");
    return f;
  };
  function schrittReflexion(body) {
    const r = state.refl;
    r.pruefChips = r.pruefChips || []; r.hindernisse = r.hindernisse || []; r.bewertung = r.bewertung || {}; r.wieder = r.wieder || {};
    const gewaehlt = state.methoden.map(methode).filter(Boolean);
    const z = state.ziel || {};
    const opt = (gruppe, wert, text, aktiv, klasse) => `<button type="button" data-g="${gruppe}" data-v="${wert}" aria-pressed="${aktiv}" class="${klasse || ""}">${text}</button>`;
    body.innerHTML = `<div class="sec">
      ${kopf("refl", "Wie lief dein Lernen?", "Reflexion ist der wichtigste Schritt: Erst wenn du prüfst, was funktioniert hat, kannst du dein Lernen gezielt verbessern. Nimm dir dafür fünf Minuten.")}

      <div class="panel"><h3><span class="pn">1</span>Kann ich es jetzt ohne Hilfe?</h3>
        <p class="small muted">Frage 7: Woran prüfe ich, ob ich es jetzt selbst kann? Prüfe dich durch eine eigene Leistung, ohne Unterlagen und ohne KI.</p>
        <div class="chips-select">${PRUEF_WEGE.map((w) => `<button type="button" data-pw="${esc(w)}" aria-pressed="${r.pruefChips.includes(w)}">${esc(w)}</button>`).join("")}</div>
        <label class="fld"><span>So habe ich mich überprüft (optional genauer)</span><input id="r-pruefung" value="${esc(r.pruefung || "")}" placeholder="z. B. Regelkreis ohne Vorlage gezeichnet und Lea erklärt"></label>
        <div class="ergebnis" role="group" aria-label="Ergebnis">${Object.entries(ERGEBNISSE).map(([k, e]) =>
          `<button type="button" class="erg erg-${k}" data-g="ergebnis" data-v="${k}" aria-pressed="${r.ergebnis === k}"><strong>${e.titel}</strong><span>${e.satz}</span></button>`).join("")}</div></div>

      <div class="panel"><h3><span class="pn">2</span>Wie gut haben meine Methoden geholfen?</h3>
        ${gewaehlt.length ? `<ul class="bewerten">${gewaehlt.map((m) => `<li><span class="bw-name">${esc(m.name)}</span>
          <span class="sterne" role="group" aria-label="Bewertung ${esc(m.name)}">${[1, 2, 3, 4, 5].map((n) => `<button type="button" data-bw="${m.id}" data-n="${n}" aria-pressed="${(r.bewertung[m.id] || 0) >= n}" aria-label="${n} von 5"></button>`).join("")}</span>
          <span class="wieder" role="group" aria-label="Wieder nutzen?">${["ja", "vielleicht", "nein"].map((w) => `<button type="button" data-wd="${m.id}" data-v="${w}" aria-pressed="${r.wieder[m.id] === w}">${w === "ja" ? "Wieder nutzen" : w === "vielleicht" ? "Vielleicht" : "Eher nicht"}</button>`).join("")}</span></li>`).join("")}</ul>`
          : `<p class="muted small">Du hast keine Methode ausgewählt.</p>`}</div>

      <div class="panel"><h3><span class="pn">3</span>Habe ich meinen Plan umgesetzt?</h3>
        <div class="chips-select">${Object.entries(PLAN_TREUE).map(([k, t]) => opt("plan", k, t, r.plan === k)).join("")}</div>
        <div class="fld" id="r-hind-box" ${r.plan && r.plan !== "ganz" ? "" : "hidden"}><span>Was hat mich gehindert?</span>
          <div class="chips-select">${Object.entries(HINDERNISSE).map(([k, t]) => `<button type="button" data-h="${k}" aria-pressed="${r.hindernisse.includes(k)}">${t}</button>`).join("")}</div></div></div>

      <div class="panel"><h3><span class="pn">4</span>Ziel und Zuversicht</h3>
        ${z.s ? `<p class="ziel-satz small">Mein Ziel: ${esc(z.s)}</p>` : ""}
        <div class="fld"><span>Habe ich mein Ziel erreicht?</span><div class="chips-select">${[["ja", "Ja"], ["teilweise", "Teilweise"], ["nein", "Noch nicht"]].map(([k, t]) => opt("ziel", k, t, r.ziel === k)).join("")}</div></div>
        <div class="fld"><span>Wie zuversichtlich bin ich für die nächste Prüfung?</span>
          <div class="skala" role="group" aria-label="Zuversicht">${ZUVERSICHT.map((t, i) => opt("zuversicht", i + 1, t, r.zuversicht === i + 1)).join("")}</div></div></div>

      <div class="panel"><h3><span class="pn">5</span>Meine Gedanken <em class="pflicht">Pflicht</em></h3>
        <label class="fld"><span>Was hat gut funktioniert?</span><textarea id="r-gut" rows="2">${esc(r.gut || "")}</textarea></label>
        <label class="fld"><span>Was war schwierig?</span><textarea id="r-schwer" rows="2">${esc(r.schwer || "")}</textarea></label>
        <label class="fld"><span>Was mache ich beim nächsten Mal anders?</span><textarea id="r-anders" rows="2">${esc(r.anders || "")}</textarea></label></div>
      <p class="note" id="r-fehlt" aria-live="polite"></p>
    </div>`;

    const fehlt = () => {
      const f = reflFehlt(), el = $("#r-fehlt");
      el.hidden = !f.length;
      el.textContent = f.length ? `Damit du dein Feedback bekommst, fehlt noch: ${f.join(", ")}.` : "";
      weiterStatus();
    };
    body.querySelectorAll("[data-pw]").forEach((b) => b.addEventListener("click", () => {
      const w = b.dataset.pw; r.pruefChips = r.pruefChips.includes(w) ? r.pruefChips.filter((x) => x !== w) : [...r.pruefChips, w];
      b.setAttribute("aria-pressed", r.pruefChips.includes(w)); speichern();
    }));
    body.querySelectorAll("[data-g]").forEach((b) => b.addEventListener("click", () => {
      const g = b.dataset.g, v = g === "zuversicht" ? +b.dataset.v : b.dataset.v;
      r[g] = v; speichern();
      body.querySelectorAll(`[data-g="${g}"]`).forEach((x) => x.setAttribute("aria-pressed", x === b));
      if (g === "plan") $("#r-hind-box").hidden = v === "ganz";
      fehlt();
    }));
    body.querySelectorAll("[data-h]").forEach((b) => b.addEventListener("click", () => {
      const h = b.dataset.h; r.hindernisse = r.hindernisse.includes(h) ? r.hindernisse.filter((x) => x !== h) : [...r.hindernisse, h];
      b.setAttribute("aria-pressed", r.hindernisse.includes(h)); speichern();
    }));
    body.querySelectorAll("[data-bw]").forEach((b) => b.addEventListener("click", () => {
      const id = b.dataset.bw, n = +b.dataset.n; r.bewertung[id] = n; speichern();
      body.querySelectorAll(`[data-bw="${id}"]`).forEach((x) => x.setAttribute("aria-pressed", +x.dataset.n <= n));
    }));
    body.querySelectorAll("[data-wd]").forEach((b) => b.addEventListener("click", () => {
      const id = b.dataset.wd; r.wieder[id] = b.dataset.v; speichern();
      body.querySelectorAll(`[data-wd="${id}"]`).forEach((x) => x.setAttribute("aria-pressed", x === b));
    }));
    [["r-pruefung", "pruefung"], ["r-gut", "gut"], ["r-schwer", "schwer"], ["r-anders", "anders"]].forEach(([id, k]) =>
      $("#" + id).addEventListener("input", (e) => { r[k] = e.target.value; speichern(); fehlt(); }));
    fehlt();
  }

  /* Schritt 8: Feedback & Abschluss */
  function schrittAbschluss(body) {
    const fb = erstelleFeedback(state), r = state.refl;
    const mName = (id) => (methode(id) || {}).name || id;
    const verlauf = state.verlauf || [];
    body.innerHTML = `<div class="sec">
      ${kopf("refl", "Dein Feedback", "Hier siehst du, was dir schon gut gelingt und wie du dein Lernen weiter verbessern kannst.")}
      <div class="panel lob"><h3>Das hast du gut gemacht</h3>
        <ul class="staerken">${fb.staerken.map((s) => `<li>${esc(s)}</li>`).join("")}</ul></div>

      <div class="group"><h3 class="group-h">Deine Verbesserungsvorschläge</h3>
        <div class="vorschlaege">${fb.vorschlaege.map((v, i) => `<div class="vorschlag"><span class="vn">${i + 1}</span><div><h4>${esc(v.titel)}</h4><p>${esc(v.text)}</p>
          ${v.methoden.length ? `<div class="chips">${v.methoden.map((id) => `<button type="button" class="chip chip-btn" data-handout="${id}">${esc(mName(id))}</button>`).join("")}</div>` : ""}</div></div>`).join("")}</div></div>

      ${fb.weiter ? `<div class="panel weiter"><span class="k-label">So steuerst du weiter</span><p>${esc(fb.weiter)}</p></div>` : ""}

      <div class="panel"><h3>Mein nächster Lernschritt</h3>
        <label class="fld"><span>Ich steuere mein Lernen selbst, indem ich …</span>
          <textarea id="r-naechster" rows="2" placeholder="z. B. am Montag die Concept Map ohne Vorlage zeichne und am Mittwoch die Karteikarten wiederhole.">${esc(r.naechster || "")}</textarea></label></div>

      <div class="panel"><h3>Alles auf einen Blick</h3>
        <dl class="summary">
          <div><dt>Fach</dt><dd>${esc(state.fach || "–")}</dd></div>
          <div><dt>Lernprobleme</dt><dd>${esc(state.probleme.map((id) => (PROBLEME.find((p) => p.id === id) || {}).titel).filter(Boolean).join(", ") || "–")}</dd></div>
          <div><dt>Methoden</dt><dd>${esc(state.methoden.map(mName).join(", ") || "–")}</dd></div>
          <div><dt>Ergebnis</dt><dd>${esc(ERGEBNISSE[r.ergebnis] ? ERGEBNISSE[r.ergebnis].titel : "–")}</dd></div>
        </dl>
        <div class="btn-row"><button type="button" class="btn btn-refl" id="btn-pdf">Abschluss-PDF herunterladen</button>
          <button type="button" class="btn btn-ghost" id="btn-neu">Neuen Durchgang starten</button></div>
        <p class="small muted" id="pdf-status" aria-live="polite">Das PDF enthält Ausgangslage, Methoden, Ziel, Zeitplan, Reflexion, Feedback und deinen nächsten Schritt.</p></div>

      ${verlauf.length ? `<div class="panel"><h3>Deine bisherigen Durchgänge</h3><ol class="verlauf">${verlauf.map((v) => `<li><span class="pd">${esc(v.datum)}</span><span>${esc(v.fach || "")}: ${esc(v.methoden.join(", ") || "ohne Methode")}</span><span class="erg-pill erg-${v.ergebnis}">${esc(ERGEBNISSE[v.ergebnis] ? ERGEBNISSE[v.ergebnis].titel : "")}</span></li>`).join("")}</ol>
        <p class="small muted">Vergleiche: Welche Methoden haben bei dir am besten funktioniert?</p></div>` : ""}
    </div>`;

    $("#r-naechster").addEventListener("input", (e) => { r.naechster = e.target.value; speichern(); });
    $("#btn-pdf").addEventListener("click", async () => {
      const s = $("#pdf-status");
      if (typeof PDFLib === "undefined") { s.textContent = "Die PDF-Funktion konnte nicht geladen werden. Lade die Seite neu."; return; }
      s.textContent = "PDF wird erstellt …";
      try { await pdfAbschluss(state, erstelleFeedback(state)); s.textContent = "Fertig. Das PDF findest du in deinen Downloads oder in der Dateien-App."; }
      catch (e) { s.textContent = e && e.code === "declined" ? "Download abgebrochen." : "Das PDF konnte nicht erstellt werden: " + (e && e.message || e); }
    });
    const neu = $("#btn-neu"); let t = null;
    neu.addEventListener("click", () => {
      if (!neu.dataset.armed) { neu.dataset.armed = "1"; neu.textContent = "Wirklich neu starten? Nochmal tippen"; t = setTimeout(() => { delete neu.dataset.armed; neu.textContent = "Neuen Durchgang starten"; }, 4000); return; }
      clearTimeout(t);
      state.verlauf = [...(state.verlauf || []), { datum: new Date().toLocaleDateString("de-DE"), fach: state.fach, methoden: state.methoden.map(mName), ergebnis: r.ergebnis || "" }].slice(-10);
      Object.assign(state, { schritt: 1, probleme: [], eigenes: "", methoden: [], ziel: {}, refl: {}, aktiv: "" });
      state.plan.themen = "";
      speichern(); renderBuddy(); window.scrollTo(0, 0);
    });
  }

  function schrittPlatzhalter(body, s) {
    const gewaehlt = state.methoden.map((id) => (methode(id) || {}).name).filter(Boolean);
    body.innerHTML = `<div class="sec">${kopf(s.phase, s.titel)}
      <div class="placeholder"><h3>Dieser Schritt ist noch im Aufbau.</h3>
        <p class="muted">Hier geht es bald weiter. Deine gewählten Methoden sind gespeichert:</p>
        <div class="chips">${gewaehlt.map((t) => `<span class="chip">${esc(t)}</span>`).join("") || '<span class="muted">Noch keine Methode gewählt.</span>'}</div></div></div>`;
  }

  function renderBuddy() {
    state.schritt = Math.min(Math.max(state.schritt, 0), SCHRITTE.length - 1);
    const i = state.schritt, s = SCHRITTE[i];
    $("#stepper").innerHTML = SCHRITTE.map((st, k) =>
      `<li class="p-${st.phase} ${k < i ? "done" : k === i ? "current" : ""}" ${k === i ? 'aria-current="step"' : ""}>
        <span class="bar"></span><span class="lbl">${st.titel}</span></li>`).join("");
    $("#step-caption").textContent = `Schritt ${i + 1} von ${SCHRITTE.length} · ${s.titel} · Phase: ${PHASE_NAME[s.phase]}`;
    const body = $("#step-body");
    const weiter = $("#btn-weiter");
    weiter.className = "btn " + PHASE_BTN[s.phase];
    weiter.textContent = "Weiter";
    weiter.hidden = i === SCHRITTE.length - 1;
    $("#btn-zurueck").disabled = i === 0;
    if (s.id === "start") schrittStart(body);
    else if (s.id === "problem") schrittProblem(body);
    else if (s.id === "vorlieben") schrittVorlieben(body);
    else if (s.id === "methoden") schrittMethoden(body);
    else if (s.id === "ziel") schrittZiel(body);
    else if (s.id === "ueben") schrittUeben(body);
    else if (s.id === "reflexion") schrittReflexion(body);
    else if (s.id === "abschluss") schrittAbschluss(body);
    else schrittPlatzhalter(body, s);
    weiterStatus();
  }

  function gehe(delta) {
    state.schritt = Math.min(Math.max(state.schritt + delta, 0), SCHRITTE.length - 1);
    speichern(); renderBuddy(); window.scrollTo(0, 0);
  }

  function buddyInit() {
    $("#btn-weiter").addEventListener("click", () => gehe(1));
    $("#btn-zurueck").addEventListener("click", () => gehe(-1));
    const reset = $("#btn-reset"); let timer = null;
    reset.addEventListener("click", () => {
      if (reset.dataset.armed) {
        clearTimeout(timer); delete reset.dataset.armed; reset.textContent = "Eingaben löschen";
        store.clear(); state = leer(); renderBuddy();
      } else {
        reset.dataset.armed = "1"; reset.textContent = "Wirklich löschen? Nochmal tippen";
        timer = setTimeout(() => { delete reset.dataset.armed; reset.textContent = "Eingaben löschen"; }, 4000);
      }
    });
  }

  /* ---------- Handout ---------- */
  function handoutHTML(m) {
    const meta = `<div class="h-meta"><span>${TYPEN[m.typ]}</span><span>${KATEGORIEN[m.kategorie]}</span><span>${esc(m.dauer)}</span><span>${esc(m.sozial)}</span><span class="ev ev-${m.evidenz}">${EVIDENZ[m.evidenz]}</span></div>`;
    if (!m.handout) {
      return `<span class="eyebrow">Methode</span><h2 id="handout-titel">${esc(m.name)}</h2>${meta}
        <p class="h-def">${esc(m.kurz)}</p>
        <div class="placeholder"><p class="muted">Das ausführliche Handout mit Vorgehen, Fachbeispiel und KI-Tipps wird gerade erstellt.</p></div>`;
    }
    const h = m.handout;
    return `<span class="eyebrow">Handout</span><h2 id="handout-titel">${esc(m.name)}</h2>${meta}
      <section class="h-sec"><h3>Definition</h3><p class="h-def">${esc(h.definition)}</p></section>
      <section class="h-sec"><h3>Einsatzmöglichkeiten</h3><div class="h-two">
        <div class="h-good"><strong>Gut geeignet</strong><ul>${h.gut.map((t) => `<li>${esc(t)}</li>`).join("")}</ul></div>
        <div class="h-less"><strong>Weniger geeignet</strong><ul>${h.weniger.map((t) => `<li>${esc(t)}</li>`).join("")}</ul></div></div></section>
      <section class="h-sec"><h3>Vorgehen</h3><ol class="h-steps">${h.schritte.map((t) => `<li>${esc(t)}</li>`).join("")}</ol></section>
      <section class="h-sec"><h3>Beispiel aus dem Unterricht</h3><div class="h-example"><span class="chip">${esc(h.beispiel.fach)}</span><p>${esc(h.beispiel.text)}</p></div></section>
      <section class="h-sec h-ki"><h3>So unterstützt dich KI</h3>
        <ul>${h.ki.ideen.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
        <strong>Nützliche Tools</strong><ul>${h.ki.tools.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
        <strong>Prompts zum Kopieren</strong>
        ${h.ki.prompts.map((p, i) => `<div class="prompt"><p id="pr-${m.id}-${i}">${esc(p)}</p><button type="button" class="btn btn-ghost copy" data-target="pr-${m.id}-${i}">Kopieren</button></div>`).join("")}
        <p class="h-limit"><strong>Grenzen:</strong> ${esc(h.ki.grenzen)}</p>
        <p class="small muted">${esc(KI_HINWEIS)}</p></section>
      <div class="btn-row"><button type="button" class="btn btn-plan" data-pdf="${m.id}">Handout als PDF</button><span class="small muted" data-pdf-status></span></div>`;
  }

  function handoutInit() {
    const dlg = $("#handout"), body = $("#handout-body");
    document.addEventListener("click", (e) => {
      const t = e.target.closest("[data-handout]");
      if (t) {
        const m = methode(t.dataset.handout); if (!m) return;
        body.innerHTML = handoutHTML(m); body.scrollTop = 0;
        if (typeof dlg.showModal === "function") dlg.showModal(); else dlg.setAttribute("open", "");
        return;
      }
      const pdfBtn = e.target.closest("[data-pdf]");
      if (pdfBtn) {
        const status = pdfBtn.parentElement.querySelector("[data-pdf-status]");
        const melde = (t) => { if (status) status.textContent = t; };
        if (typeof PDFLib === "undefined") { melde("Die PDF-Funktion konnte nicht geladen werden."); return; }
        const id = pdfBtn.dataset.pdf;
        const liste = id === "alle" ? METHODEN : [methode(id)];
        melde("PDF wird erstellt …");
        pdfHandouts(liste, id === "alle" ? "lernbuddy-alle-handouts.pdf" : undefined)
          .then(() => melde("Fertig. Das PDF liegt in deinen Downloads."))
          .catch((err) => melde(err && err.code === "declined" ? "Download abgebrochen." : "Fehler: " + (err && err.message || err)));
        return;
      }
      const c = e.target.closest(".copy");
      if (c) {
        const el = document.getElementById(c.dataset.target), text = el.textContent;
        const fertig = () => { c.textContent = "Kopiert"; setTimeout(() => { c.textContent = "Kopieren"; }, 1800); };
        const markieren = () => { const r = document.createRange(); r.selectNodeContents(el); const s = getSelection(); s.removeAllRanges(); s.addRange(r); c.textContent = "Markiert – jetzt kopieren"; };
        try { navigator.clipboard.writeText(text).then(fertig, markieren); } catch (err) { markieren(); }
      }
    });
    const zu = () => { if (dlg.close) dlg.close(); else dlg.removeAttribute("open"); };
    $("#handout-close").addEventListener("click", zu);
    dlg.addEventListener("click", (e) => { if (e.target === dlg) zu(); });
  }

  /* ---------- Methodenbibliothek ---------- */
  function bibliothek() {
    const filter = $("#filter"), lib = $("#lib"); if (!filter) return;
    let aktiv = "alle";
    const zeige = () => {
      filter.querySelectorAll("button").forEach((b) => b.setAttribute("aria-pressed", b.dataset.k === aktiv));
      lib.innerHTML = METHODEN.filter((m) => aktiv === "alle" || m.typ === aktiv || m.kategorie === aktiv).map((m) =>
        `<button type="button" class="lib-item" data-handout="${m.id}"><span class="k">${TYPEN[m.typ]} · ${KATEGORIEN[m.kategorie]}</span><strong>${esc(m.name)}</strong>
          <span class="small muted">${esc(m.kurz)}</span>
          <span class="lib-foot"><span class="ev ev-${m.evidenz}">${EVIDENZ[m.evidenz]}</span>${m.handout ? '<span class="badge">Handout</span>' : ""}</span></button>`).join("");
    };
    filter.innerHTML = `<button type="button" data-k="alle">Alle (${METHODEN.length})</button>` +
      Object.entries(TYPEN).map(([k, n]) => `<button type="button" data-k="${k}">${n}</button>`).join("") +
      ["kooperativ", "mnemo"].map((k) => `<button type="button" data-k="${k}">${KATEGORIEN[k][0].toUpperCase() + KATEGORIEN[k].slice(1)}</button>`).join("");
    filter.querySelectorAll("button").forEach((b) => b.addEventListener("click", () => { aktiv = b.dataset.k; zeige(); }));
    zeige();
  }

  zyklus(); karten(); kurve(); mythen(); fragen(); strategienListe(); buddyInit(); handoutInit(); bibliothek(); route();
})();
