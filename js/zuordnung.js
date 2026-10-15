/* Lernbuddy – Schule, Fächer, Lernprobleme, Ablauf und Empfehlungslogik
   Lehrkräfte können hier Probleme ergänzen oder umformulieren.
   icon: Name eines Symbols aus ICONS in app.js */

/* impressum und datenschutz: Links zu den Seiten der Schulhomepage eintragen.
   Leer lassen = die Links werden nicht angezeigt. */
const SCHULE = {
  name: "Hilde-Domin-Schule",
  ort: "Herrenberg",
  impressum: "",
  datenschutz: ""
};

/* Fächer – das Profilfach steht vorn und kommt in den Handout-Beispielen bevorzugt vor */
const PROFILFACH = "Gesundheit und Biologie";
const FAECHER = [
  "Gesundheit und Biologie", "Mathematik", "Deutsch", "Englisch", "Spanisch",
  "Chemie", "Physik", "Wirtschaftslehre", "Sozialmanagement",
  "Sondergebiete der Ernährung", "Sondergebiete der Biowissenschaften",
  "Informationstechnik", "Religion", "Ethik", "Musik", "Kunst", "Sport"
];

/* Wofür lernst du gerade? */
const ANLAESSE = [
  { id: "ka",          titel: "Klassenarbeit vorbereiten", satz: "Es gibt einen konkreten Termin." },
  { id: "wiederholen", titel: "Allgemein wiederholen",     satz: "Ich will Stoff festigen, ohne festen Termin." },
  { id: "luecken",     titel: "Lücken füllen",             satz: "Mir fehlt etwas aus früheren Themen." },
  { id: "verstehen",   titel: "Neues Thema verstehen",     satz: "Wir haben gerade etwas Neues angefangen." }
];

const ZEITRAUM_LABEL = {
  knapp:  "weniger als eine Woche",
  mittel: "ein bis drei Wochen",
  viel:   "mehr als drei Wochen"
};

const SCHRITTE = [
  { id: "start",     titel: "Fach & Lernzeit", phase: "planen" },
  { id: "problem",   titel: "Problem",         phase: "planen" },
  { id: "vorlieben", titel: "Vorlieben",       phase: "planen" },
  { id: "methoden",  titel: "Methoden",        phase: "tun" },
  { id: "ziel",      titel: "Ziel & Zeit",     phase: "planen" },
  { id: "ueben",     titel: "Ausprobieren",    phase: "tun" },
  { id: "reflexion", titel: "Reflexion",       phase: "refl" },
  { id: "abschluss", titel: "Abschluss",       phase: "refl" }
];

/* Lernprobleme in zwei Gruppen:
   "lernen"    – eine Lücke zwischen dem, was ich können soll, und dem, was ich schon kann
   "umsetzung" – das Lernen findet nicht so statt, wie ich es mir vornehme */
const PROBLEM_GRUPPEN = {
  lernen:    "Beim Verstehen und Behalten",
  umsetzung: "Beim Anfangen und Dranbleiben"
};

const PROBLEME = [
  { id: "zusammenhang", gruppe: "lernen", titel: "Zusammenhänge sind unklar",   satz: "Ich kann Begriffe einzeln erklären, aber nicht, wie sie zusammenwirken.", icon: "netz" },
  { id: "abruf",        gruppe: "lernen", titel: "Wiedererkennen, aber nicht abrufen", satz: "Beim Lesen kenne ich alles, ohne Vorlage fällt es mir nicht ein.", icon: "suche" },
  { id: "vergessen",    gruppe: "lernen", titel: "Ich vergesse schnell",        satz: "Ich lerne, aber nach ein paar Tagen ist es weg.",                       icon: "wolke" },
  { id: "transfer",     gruppe: "lernen", titel: "Musteraufgabe ja, neue Aufgabe nein", satz: "Bei einer veränderten Aufgabe weiß ich nicht, wie ich anfange.", icon: "pfeil" },
  { id: "vermischen",   gruppe: "lernen", titel: "Ich vermische Ähnliches",     satz: "Ähnliche Begriffe, Verfahren oder Kriterien bringe ich durcheinander.", icon: "tausch" },
  { id: "fehler",       gruppe: "lernen", titel: "Immer dieselben Fehler",      satz: "Ich rechne oder schreibe drauflos und prüfe mein Ergebnis kaum.",       icon: "haken" },
  { id: "ueberblick",   gruppe: "lernen", titel: "Mir fehlt der Überblick",     satz: "Ich weiß nicht, was alles zum Thema gehört und wie es geordnet ist.",  icon: "raster" },
  { id: "vorwissen",    gruppe: "lernen", titel: "Fehlendes Vorwissen",         satz: "Mir fehlt Wissen aus früheren Themen.",                                 icon: "puzzle" },
  { id: "grundlagen",   gruppe: "lernen", titel: "Grundlagen fehlen",           satz: "Mir fehlen Grundlagen, auf denen alles aufbaut.",                       icon: "stapel" },

  { id: "motivation",   gruppe: "umsetzung", titel: "Keine Motivation",         satz: "Ich kann mich kaum aufraffen anzufangen.",                              icon: "akku" },
  { id: "interesse",    gruppe: "umsetzung", titel: "Kein Interesse am Fach",   satz: "Das Fach sagt mir nichts. Ich sehe keinen Sinn darin.",                icon: "auge" },
  { id: "zeit",         gruppe: "umsetzung", titel: "Keine Zeit",               satz: "Ich schaffe nicht alles oder teile meine Zeit schlecht ein.",          icon: "uhr" },
  { id: "aufschieben",  gruppe: "umsetzung", titel: "Ich schiebe auf",          satz: "Ich fange immer erst kurz vor knapp an.",                               icon: "sanduhr" },
  { id: "konzentration",gruppe: "umsetzung", titel: "Konzentration",            satz: "Ich lasse mich schnell ablenken, z. B. vom Handy.",                     icon: "ziel" },
  { id: "angst",        gruppe: "umsetzung", titel: "Prüfungsangst",            satz: "In Prüfungen ist mein Kopf plötzlich leer.",                            icon: "welle" },
  { id: "anfangen",     gruppe: "umsetzung", titel: "Weiß nicht, wie anfangen", satz: "Der Stoff ist zu viel. Ich weiß nicht, wo ich starte.",                 icon: "fahne" }
];

/* Selbsttest zu Lernvorlieben. Jede Antwort setzt höchstens ein Merkmal.
   Merkmale passen zu "vorlieben" in methoden.js. */
const FRAGEN = [
  { id: "sozial",  frage: "Wie lernst du am liebsten?",
    optionen: [["allein", "Allein"], ["gemeinsam", "Mit anderen"], ["", "Beides"]] },
  { id: "darstellung", frage: "Was hilft dir beim Verstehen eher?",
    optionen: [["visuell", "Bilder, Skizzen, Grafiken"], ["sprachlich", "Texte und Erklärungen"], ["", "Beides"]] },
  { id: "ausdruck", frage: "Wie verarbeitest du Stoff lieber?",
    optionen: [["sprechen", "Laut erklären, darüber reden"], ["schreiben", "Aufschreiben"], ["", "Beides"]] },
  { id: "struktur", frage: "Wie gehst du beim Lernen vor?",
    optionen: [["plan", "Mit klarem Plan"], ["frei", "Lieber frei und kreativ"], ["", "Mal so, mal so"]] },
  { id: "takt", frage: "Wie lange kannst du dich gut am Stück konzentrieren?",
    optionen: [["kurz", "Bis etwa 30 Minuten"], ["lang", "45 Minuten und länger"], ["", "Ganz unterschiedlich"]] },
  { id: "medium", frage: "Womit arbeitest du lieber?",
    optionen: [["digital", "iPad und digital"], ["papier", "Papier und Stift"], ["", "Beides"]] }
];

const VORLIEBEN_LABEL = {
  allein: "allein", gemeinsam: "mit anderen", visuell: "Bilder & Skizzen", sprachlich: "Texte",
  sprechen: "Sprechen", schreiben: "Schreiben", plan: "klarer Plan", frei: "frei & kreativ",
  kurz: "kurze Einheiten", lang: "lange Einheiten", digital: "digital", papier: "Papier"
};

/* Zusatzpunkte je nach Lernzeit und Anlass */
const ZEIT_BONUS = {
  knapp: ["abruf", "braindump", "pomodoro", "eisenhower", "checkliste", "partnerabfrage", "rueckwaerts"],
  viel:  ["verteilt", "leitner", "wochenplan", "kompetenzraster", "tandem"]
};
const ANLASS_BONUS = {
  ka:          ["checkliste", "rueckwaerts", "abruf", "braindump"],
  wiederholen: ["verteilt", "leitner", "abruf", "partnerabfrage"],
  luecken:     ["lernlandkarte", "ampel", "conceptmap", "tandem", "loesungsbeispiele"],
  verstehen:   ["advance", "elaboration", "feynman", "sq3r", "conceptmap"]
};

/* Vorschläge, wenn nur ein eigenes Problem eingetragen wurde */
const ALLGEMEIN = ["smart", "abruf", "verteilt", "pomodoro", "tandem", "lerntagebuch"];

/* Fester Rahmen nach dem SRL-Zyklus: je ein Planungs- und ein Reflexionsbaustein */
const RAHMEN = {
  planen: ["smart", "wenndann", "rueckwaerts"],
  reflektieren: ["lerntagebuch", "ampel", "checkliste"]
};

/* Verbleibende Lernzeit aus einem Datum berechnen */
function zeitraumAusDatum(datum) {
  if (!datum) return "";
  const tage = Math.ceil((new Date(datum + "T12:00:00") - new Date()) / 86400000);
  if (isNaN(tage)) return "";
  return tage < 7 ? "knapp" : tage <= 21 ? "mittel" : "viel";
}

/* Empfehlungslogik:
   Punkte = 2 × Passung zum Problem + passende Vorlieben + Evidenz (gut 2, teilweise 1)
            + Bonus für Lernzeit und Anlass */
function empfehlen(probleme, eigenes, antworten, zeitraum, anlass) {
  const tags = Object.values(antworten || {}).filter(Boolean);
  const ev = { gut: 2, teilweise: 1, wenig: 0 };
  const nurEigenes = probleme.length === 0 && (eigenes || "").trim().length > 0;
  const liste = METHODEN.map((m) => {
    const problemTreffer = probleme.filter((p) => m.passtZu[p]);
    let passung = problemTreffer.reduce((s, p) => s + m.passtZu[p], 0);
    if (nurEigenes && ALLGEMEIN.includes(m.id)) passung = 2;
    const vorliebenTreffer = m.vorlieben.filter((v) => tags.includes(v));
    const zeit = (ZEIT_BONUS[zeitraum] || []).includes(m.id) ? 1 : 0;
    const anlassPasst = (ANLASS_BONUS[anlass] || []).includes(m.id) ? 1 : 0;
    const punkte = passung * 2 + vorliebenTreffer.length + ev[m.evidenz] + zeit + anlassPasst;
    return { m, passung, punkte, problemTreffer, vorliebenTreffer, zeit, anlassPasst };
  }).filter((x) => x.passung > 0)
    .sort((a, b) => b.punkte - a.punkte || ev[b.m.evidenz] - ev[a.m.evidenz]);

  const top = liste.slice(0, 6);
  const ids = top.map((x) => x.m.id);
  const rahmen = {
    planen: RAHMEN.planen.find((id) => !ids.includes(id)),
    reflektieren: RAHMEN.reflektieren.find((id) => !ids.includes(id))
  };
  return { start: top.slice(0, 3), ergaenzend: top.slice(3, 6), rahmen };
}

/* ------------------------------------------------------------------
   Lernzeitplan: rückwärts vom Termin, mit verteiltem Wiederholen,
   Generalprobe und Puffertag (nach DS3: diagnostizieren, priorisieren,
   zeitlich planen, aktiv üben, Generalprobe)
   ------------------------------------------------------------------ */
const WOCHENTAGE = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];
const GESCHAETZTE_TAGE = { knapp: 5, mittel: 14, viel: 28 };

function lernplan({ themen, tage, minuten, datum, zeitraum, anlass, heute }) {
  const start = heute ? new Date(heute) : new Date();
  start.setHours(12, 0, 0, 0);
  let ende, geschaetzt = false;
  if (anlass === "ka" && datum) ende = new Date(datum + "T12:00:00");
  else { ende = new Date(start); ende.setDate(ende.getDate() + (GESCHAETZTE_TAGE[zeitraum] || 14)); geschaetzt = anlass === "ka"; }
  const liste = themen.map((t) => t.trim()).filter(Boolean);
  const kap = { 15: 1, 25: 2, 45: 3 }[minuten] || 2;
  const termine = [];
  for (let d = new Date(start); d < ende; d.setDate(d.getDate() + 1)) {
    if (tage.includes(d.getDay())) termine.push({ datum: new Date(d), aufgaben: [], art: "lernen" });
  }
  const hinweise = [];
  if (!termine.length) return { termine, hinweise: ["An den gewählten Wochentagen bleibt bis zum Termin keine Lernzeit. Wähle mehr Tage."], ende, geschaetzt };

  const istKA = anlass === "ka";
  if (istKA && termine.length >= 2) {
    termine[termine.length - 1].art = "puffer";
    termine[termine.length - 1].aufgaben.push({ typ: "puffer", text: "Puffer: nur leicht wiederholen, Unterlagen packen, früh schlafen" });
  }
  if (istKA && termine.length >= 4) {
    termine[termine.length - 2].art = "generalprobe";
    termine[termine.length - 2].aufgaben.push({ typ: "generalprobe", text: "Generalprobe: Probeklausur ohne Unterlagen und mit Zeitlimit, danach Fehler auswerten" });
  }
  const frei = termine.filter((t) => t.art === "lernen");
  const tagDiff = (a, b) => Math.round((b - a) / 86400000);
  const platziere = (aufgabe, abIndex, abDatum) => {
    for (let i = abIndex; i < frei.length; i++) {
      if (abDatum && tagDiff(abDatum, frei[i].datum) < 0) continue;
      if (frei[i].aufgaben.length < kap) { frei[i].aufgaben.push(aufgabe); return i; }
    }
    return -1;
  };
  let zuViel = false;
  liste.forEach((thema) => {
    const i0 = platziere({ typ: "lernen", text: `${thema}: verstehen und lernen` }, 0);
    if (i0 < 0) { zuViel = true; return; }
    const d1 = new Date(frei[i0].datum); d1.setDate(d1.getDate() + 2);
    const i1 = platziere({ typ: "abruf", text: `${thema}: 1. Abruf ohne Unterlagen` }, i0 + 1, d1);
    if (i1 < 0) { zuViel = true; return; }
    const d2 = new Date(frei[i1].datum); d2.setDate(d2.getDate() + 4);
    if (platziere({ typ: "abruf", text: `${thema}: 2. Abruf und Lücken schließen` }, i1 + 1, d2) < 0) {
      if (platziere({ typ: "abruf", text: `${thema}: 2. Abruf und Lücken schließen` }, i1 + 1) < 0) zuViel = true;
    }
  });
  frei.forEach((t) => { if (!t.aufgaben.length) t.aufgaben.push({ typ: "mix", text: "Gemischt üben: Aufgaben aus allen bisherigen Themen" }); });
  if (zuViel) hinweise.push("Für alle Themen reicht die Zeit nicht ganz. Wähle mehr Lerntage, längere Einheiten oder setze Prioritäten.");
  if (istKA && termine.length < 4) hinweise.push("Es bleiben nur wenige Lerntermine. Konzentriere dich auf Abrufen und die wichtigsten Lücken.");
  return { termine, hinweise, ende, geschaetzt };
}
