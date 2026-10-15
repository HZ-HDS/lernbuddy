/* Lernbuddy – PDF-Erzeugung mit pdf-lib (lokal in js/vendor, MIT-Lizenz)
   Erzeugt das Abschluss-PDF und die Handout-PDFs direkt im Browser. Es werden keine Daten verschickt. */

const PDF_FARBEN = {
  ink: [0.17, 0.2, 0.21], soft: [0.37, 0.42, 0.43], line: [0.88, 0.9, 0.87],
  plan: [0.14, 0.47, 0.48], planTint: [0.89, 0.95, 0.94],
  tun: [0.23, 0.52, 0.31], tunTint: [0.9, 0.95, 0.91],
  refl: [0.7, 0.35, 0.17], sunTint: [0.99, 0.95, 0.84], reflTint: [0.99, 0.93, 0.87]
};

/* Zeichen, die die Standardschrift nicht kennt, ersetzen */
const PDF_ERSATZ = { "→": "->", "←": "<-", "↔": "<->", "≈": "~", "−": "-", "Δ": "Delta ", "λ": "lambda", "⃗": "", "≤": "<=", "≥": ">=", "✓": "", " ": " ", " ": " " };

class LernPDF {
  constructor(skala) { this.seiten = []; this.s = skala || 1; }

  async start() {
    const { PDFDocument, StandardFonts } = PDFLib;
    this.doc = await PDFDocument.create();
    this.f = await this.doc.embedFont(StandardFonts.Helvetica);
    this.fb = await this.doc.embedFont(StandardFonts.HelveticaBold);
    this.W = 595.28; this.H = 841.89; this.M = 50;
    this.neueSeite();
    return this;
  }

  rgb(c) { return PDFLib.rgb(c[0], c[1], c[2]); }

  sauber(text, font) {
    let out = "";
    for (const ch of String(text == null ? "" : text).replace(/\r/g, "")) {
      const r = PDF_ERSATZ[ch] !== undefined ? PDF_ERSATZ[ch] : ch;
      try { font.widthOfTextAtSize(r, 10); out += r; } catch (e) { out += "?"; }
    }
    return out;
  }

  neueSeite() {
    this.p = this.doc.addPage([this.W, this.H]);
    this.seiten.push(this.p);
    this.y = this.H - this.M;
    const kopf = this.sauber(`${SCHULE.name} ${SCHULE.ort} · Zukunftswerkstatt · Lernbuddy`, this.f);
    this.p.drawText(kopf, { x: this.M, y: this.H - 30, size: 8, font: this.f, color: this.rgb(PDF_FARBEN.soft) });
    this.p.drawLine({ start: { x: this.M, y: this.H - 36 }, end: { x: this.W - this.M, y: this.H - 36 }, thickness: 0.5, color: this.rgb(PDF_FARBEN.line) });
    this.y = this.H - 60;
  }

  platz(h) { if (this.y - h < this.M + 20) this.neueSeite(); }

  umbrechen(text, font, size, breite) {
    const zeilen = [];
    this.sauber(text, font).split("\n").forEach((absatz) => {
      let zeile = "";
      absatz.split(/\s+/).filter(Boolean).forEach((wort) => {
        const test = zeile ? zeile + " " + wort : wort;
        if (font.widthOfTextAtSize(test, size) <= breite) zeile = test;
        else {
          if (zeile) zeilen.push(zeile);
          while (font.widthOfTextAtSize(wort, size) > breite && wort.length > 1) {
            let n = wort.length; while (n > 1 && font.widthOfTextAtSize(wort.slice(0, n), size) > breite) n--;
            zeilen.push(wort.slice(0, n)); wort = wort.slice(n);
          }
          zeile = wort;
        }
      });
      zeilen.push(zeile);
    });
    return zeilen;
  }

  text(text, o = {}) {
    const size = (o.size || 10) * this.s, font = o.bold ? this.fb : this.f, x = this.M + (o.einzug || 0);
    const breite = (o.breite || (this.W - 2 * this.M)) - (o.einzug || 0);
    const lh = size * (o.zeile || 1.38);
    this.umbrechen(text, font, size, breite).forEach((z) => {
      this.platz(lh);
      this.p.drawText(z, { x, y: this.y - size, size, font, color: this.rgb(o.farbe || PDF_FARBEN.ink) });
      this.y -= lh;
    });
    this.y -= o.danach != null ? o.danach : 4;
  }

  titel(t, unter) {
    this.text(t, { size: 20, bold: true, farbe: PDF_FARBEN.plan, zeile: 1.2, danach: 2 });
    if (unter) this.text(unter, { size: 9.5, farbe: PDF_FARBEN.soft, danach: 10 });
  }

  abschnitt(t, farbe) {
    this.platz(34);
    this.y -= 5 * this.s;
    this.text(t.toUpperCase(), { size: 8.5, bold: true, farbe: farbe || PDF_FARBEN.plan, danach: 3 });
  }

  liste(items, o = {}) {
    items.filter(Boolean).forEach((it, i) => {
      const size = (o.size || 10) * this.s, lh = size * 1.38;
      const marke = o.nummern ? `${i + 1}.` : "•";
      const zeilen = this.umbrechen(it, this.f, size, this.W - 2 * this.M - 16 - (o.einzug || 0));
      zeilen.forEach((z, k) => {
        this.platz(lh);
        if (k === 0) this.p.drawText(marke, { x: this.M + (o.einzug || 0), y: this.y - size, size, font: o.nummern ? this.fb : this.f, color: this.rgb(o.farbe || PDF_FARBEN.tun) });
        this.p.drawText(z, { x: this.M + 16 + (o.einzug || 0), y: this.y - size, size, font: this.f, color: this.rgb(PDF_FARBEN.ink) });
        this.y -= lh;
      });
      this.y -= 2;
    });
    this.y -= 3;
  }

  /* Farbiger Kasten: Inhalt wird vorher vermessen */
  kasten(teile, hinter) {
    const pad = 9, breite = this.W - 2 * this.M - 2 * pad;
    const hoehe = teile.reduce((h, t) => h + this.umbrechen(t.text, t.bold ? this.fb : this.f, (t.size || 10) * this.s, breite).length * (t.size || 10) * this.s * 1.38 + 4, 0) + 2 * pad - 4;
    if (hoehe < this.H - 2 * this.M - 40) this.platz(hoehe + 6);
    const yTop = this.y, seite = this.p;
    if (hoehe < this.H - 2 * this.M - 40) {
      this.p.drawRectangle({ x: this.M, y: yTop - hoehe, width: this.W - 2 * this.M, height: hoehe, color: this.rgb(hinter || PDF_FARBEN.sunTint) });
    }
    this.y -= pad;
    teile.forEach((t) => this.text(t.text, { ...t, einzug: pad, breite: this.W - 2 * this.M - pad }));
    this.y = (this.p === seite ? Math.min(this.y, yTop - hoehe) : this.y) - 8;
  }

  tabelle(zeilen, spalte1) {
    const size = 9.5, lh = size * 1.35, x2 = this.M + spalte1, b2 = this.W - this.M - x2;
    zeilen.forEach(([a, b]) => {
      const za = this.umbrechen(a, this.fb, size, spalte1 - 8), zb = this.umbrechen(b, this.f, size, b2);
      const h = Math.max(za.length, zb.length) * lh + 6;
      this.platz(h);
      za.forEach((z, i) => this.p.drawText(z, { x: this.M, y: this.y - size - i * lh, size, font: this.fb, color: this.rgb(PDF_FARBEN.ink) }));
      zb.forEach((z, i) => this.p.drawText(z, { x: x2, y: this.y - size - i * lh, size, font: this.f, color: this.rgb(PDF_FARBEN.ink) }));
      this.y -= h;
      this.p.drawLine({ start: { x: this.M, y: this.y + 3 }, end: { x: this.W - this.M, y: this.y + 3 }, thickness: 0.4, color: this.rgb(PDF_FARBEN.line) });
    });
    this.y -= 6;
  }

  async fertig() {
    const n = this.seiten.length;
    this.seiten.forEach((s, i) => s.drawText(`Seite ${i + 1} von ${n}`, { x: this.W - this.M - 60, y: 28, size: 8, font: this.f, color: this.rgb(PDF_FARBEN.soft) }));
    return this.doc.save();
  }
}

async function pdfSpeichern(bytes, name) {
  const blob = new Blob([bytes], { type: "application/pdf" });
  /* In der Claude-Vorschau läuft der Download über die Plattform, sonst normal über den Browser */
  if (window.claude && typeof window.claude.use === "function") {
    const dl = await window.claude.use("downloads").catch(() => null);
    if (dl) { await dl.save({ filename: name, data: blob }); return; }
  }
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = name; a.rel = "noopener";
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 60000);
}

const pdfDatum = (d) => d.toLocaleDateString("de-DE", { day: "numeric", month: "long", year: "numeric" });
const pdfDateiname = (t) => t.toLowerCase().replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

/* ---------- Handout auf eine Seite schreiben ---------- */
function pdfHandoutSeite(pdf, m) {
  const h = m.handout;
  pdf.titel(m.name, `${TYPEN[m.typ]} · ${KATEGORIEN[m.kategorie]} · ${m.dauer} · ${m.sozial} · Wirksamkeit: ${EVIDENZ[m.evidenz]}`);
  if (!h) { pdf.text(m.kurz); return; }
  pdf.abschnitt("Definition"); pdf.text(h.definition);
  pdf.abschnitt("Einsatzmöglichkeiten");
  pdf.text("Gut geeignet", { bold: true, size: 9.5, danach: 2 }); pdf.liste(h.gut, { size: 9.5 });
  pdf.text("Weniger geeignet", { bold: true, size: 9.5, danach: 2 }); pdf.liste(h.weniger, { size: 9.5, farbe: PDF_FARBEN.refl });
  pdf.abschnitt("Vorgehen"); pdf.liste(h.schritte, { nummern: true, size: 9.5 });
  pdf.abschnitt("Beispiel aus dem Unterricht");
  pdf.kasten([{ text: h.beispiel.fach, bold: true, size: 9.5 }, { text: h.beispiel.text, size: 9.5 }], PDF_FARBEN.sunTint);
  pdf.abschnitt("So unterstützt KI diese Methode");
  pdf.liste(h.ki.ideen, { size: 9.5 });
  pdf.text("Nützliche Tools: " + h.ki.tools.join(" · "), { size: 9.5 });
  h.ki.prompts.forEach((pr) => pdf.kasten([{ text: "Prompt zum Kopieren", bold: true, size: 8.5, farbe: PDF_FARBEN.plan }, { text: pr, size: 9 }], PDF_FARBEN.planTint));
  pdf.text("Grenzen: " + h.ki.grenzen, { size: 9.5 });
  pdf.text(KI_HINWEIS, { size: 8, farbe: PDF_FARBEN.soft });
}

async function pdfHandouts(liste, dateiname) {
  const pdf = await new LernPDF(0.86).start();
  liste.forEach((m, i) => { if (i > 0) pdf.neueSeite(); pdfHandoutSeite(pdf, m); });
  return pdfSpeichern(await pdf.fertig(), dateiname || `handout-${pdfDateiname(liste[0].name)}.pdf`);
}

/* ---------- Abschluss-PDF ---------- */
async function pdfAbschluss(st, fb) {
  const pdf = await new LernPDF().start();
  const r = st.refl || {};
  const name = (id, liste) => (liste.find((x) => x.id === id) || {}).titel || id;
  pdf.titel("Mein Lernprozess", `Erstellt am ${pdfDatum(new Date())}`);

  pdf.abschnitt("Ausgangslage");
  const anlass = (ANLAESSE.find((a) => a.id === st.anlass) || {}).titel || "";
  const termin = st.anlass === "ka" ? (st.datum ? pdfDatum(new Date(st.datum + "T12:00:00")) : (ZEITRAUM_LABEL[st.zeitraum] ? "in " + ZEITRAUM_LABEL[st.zeitraum] : "")) : "";
  const vorlieben = Object.values(st.antworten || {}).filter(Boolean).map((v) => VORLIEBEN_LABEL[v]).filter(Boolean);
  pdf.tabelle([
    ["Fach", st.fach || "-"],
    ["Anlass", anlass + (termin ? ` (${termin})` : "")],
    ["Lernprobleme", [...(st.probleme || []).map((id) => name(id, PROBLEME)), (st.eigenes || "").trim()].filter(Boolean).join(", ") || "-"],
    ["Vorlieben", vorlieben.join(", ") || "-"]
  ], 120);

  pdf.abschnitt("Gewählte Methoden", PDF_FARBEN.tun);
  const gewaehlt = (st.methoden || []).map((id) => METHODEN.find((m) => m.id === id)).filter(Boolean);
  if (gewaehlt.length) pdf.liste(gewaehlt.map((m) => `${m.name} (${TYPEN[m.typ]}): ${m.kurz}${r.bewertung && r.bewertung[m.id] ? ` Meine Bewertung: ${r.bewertung[m.id]} von 5.` : ""}`));
  else pdf.text("Keine Methode ausgewählt.");

  const z = st.ziel || {};
  if (z.s) {
    pdf.abschnitt("Mein SMART-Ziel");
    const t = z.t ? pdfDatum(new Date(z.t + "T12:00:00")) : "[Termin]";
    pdf.kasten([{ text: `Bis ${t} will ich ${z.s}. ${z.m ? `Ich merke es daran, dass ${z.m}. ` : ""}${z.a ? `Das ist mir wichtig, ${z.a}.` : ""}` }], PDF_FARBEN.sunTint);
  }

  if (st.plan && (st.plan.themen || "").trim()) {
    pdf.abschnitt("Mein Lernzeitplan");
    const plan = lernplan({ themen: st.plan.themen.split("\n"), tage: st.plan.tage, minuten: st.plan.minuten, datum: st.datum, zeitraum: st.zeitraum, anlass: st.anlass });
    plan.hinweise.forEach((h) => pdf.text(h, { size: 9, farbe: PDF_FARBEN.refl }));
    pdf.tabelle(plan.termine.map((t) => [t.datum.toLocaleDateString("de-DE", { weekday: "short", day: "numeric", month: "numeric" }) + ` · ${st.plan.minuten} Min.`, t.aufgaben.map((a) => a.text).join("; ")]), 110);
  }
  if ((st.wenn || "").trim() || (st.bedingungen || []).length) {
    pdf.abschnitt("Damit es wirklich passiert");
    if ((st.wenn || "").trim()) pdf.text(`Wenn ${st.wenn.trim()} dann ${(st.dann || "").trim()}`);
    if ((st.bedingungen || []).length) pdf.text("Erledigt: " + st.bedingungen.join(" · "), { size: 9.5 });
  }

  pdf.abschnitt("Meine Reflexion", PDF_FARBEN.refl);
  pdf.tabelle([
    ["Überprüfung ohne Hilfe", [...(r.pruefChips || []), r.pruefung].filter(Boolean).join("; ") || "-"],
    ["Ergebnis", ERGEBNISSE[r.ergebnis] ? ERGEBNISSE[r.ergebnis].titel : "-"],
    ["Plan eingehalten", PLAN_TREUE[r.plan] || "-"],
    ["Hindernisse", (r.hindernisse || []).map((h) => HINDERNISSE[h]).join(", ") || "-"],
    ["Ziel erreicht", { ja: "Ja", teilweise: "Teilweise", nein: "Nein" }[r.ziel] || "-"],
    ["Zuversicht", r.zuversicht ? ZUVERSICHT[r.zuversicht - 1] : "-"],
    ["Das hat gut funktioniert", r.gut || "-"],
    ["Das war schwierig", r.schwer || "-"],
    ["Das mache ich anders", r.anders || "-"]
  ], 140);

  pdf.abschnitt("Das hast du gut gemacht", PDF_FARBEN.tun);
  pdf.liste(fb.staerken);
  pdf.abschnitt("Verbesserungsvorschläge", PDF_FARBEN.refl);
  fb.vorschlaege.forEach((v) => {
    const meth = v.methoden.map((id) => (METHODEN.find((m) => m.id === id) || {}).name).filter(Boolean);
    pdf.kasten([{ text: v.titel, bold: true }, { text: v.text + (meth.length ? ` Passende Methoden: ${meth.join(", ")}.` : ""), size: 9.5 }], PDF_FARBEN.reflTint);
  });
  if (fb.weiter) { pdf.abschnitt("So steuerst du weiter"); pdf.text(fb.weiter); }
  if ((r.naechster || "").trim()) {
    pdf.abschnitt("Mein nächster Lernschritt", PDF_FARBEN.tun);
    pdf.kasten([{ text: "Ich steuere mein Lernen selbst, indem ich " + r.naechster.trim() }], PDF_FARBEN.tunTint);
  }
  return pdfSpeichern(await pdf.fertig(), `mein-lernprozess-${pdfDateiname(st.fach || "lernbuddy")}.pdf`);
}
