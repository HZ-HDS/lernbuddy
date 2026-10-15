/* Lernbuddy – Reflexion, Feedback und Verbesserungsvorschläge
   Grundlage: SRL-Zyklus (planen – durchführen – reflektieren) und DS2 der Zukunftswerkstatt:
   Frage 7 prüft das eigene Können; das Ergebnis ist die Information für den nächsten Durchgang. */

const PRUEF_WEGE = [
  "Brain Dump ohne Unterlagen",
  "Aufgabe ohne Musterlösung gelöst",
  "Jemandem erklärt und Rückfragen beantwortet",
  "Karteikarten ohne Nachschauen",
  "Generalprobe / Probeklausur",
  "Veränderte Aufgabe gelöst"
];

const ERGEBNISSE = {
  sicher:    { titel: "Gelingt sicher",       satz: "Ich kann es jetzt ohne Hilfe." },
  teilweise: { titel: "Gelingt teilweise",    satz: "Manches klappt, an einigen Stellen hakt es noch." },
  nicht:     { titel: "Gelingt noch nicht",   satz: "Ohne Hilfe klappt es noch nicht." }
};

const PLAN_TREUE = { ganz: "Ja, ganz", teilweise: "Teilweise", kaum: "Kaum" };

const HINDERNISSE = {
  ablenkung:  "Ablenkung, z. B. Handy",
  zeit:       "Zu wenig Zeit",
  motivation: "Keine Lust",
  unklar:     "Unklar, was ich lernen soll",
  material:   "Material fehlte",
  muede:      "Zu müde",
  zuviel:     "Plan war zu voll"
};

const ZUVERSICHT = ["sehr unsicher", "eher unsicher", "geht so", "eher zuversichtlich", "sehr zuversichtlich"];

/* Was bei welchem Hindernis hilft */
const HINDERNIS_TIPP = {
  ablenkung:  { titel: "Ablenkungen vorher ausschalten", text: "Leg das Handy vor dem Lernen in einen anderen Raum und nutze den Fokus-Modus. Kurze, feste Blöcke helfen, dranzubleiben.", methoden: ["ablenkung", "pomodoro"] },
  zeit:       { titel: "Lernzeiten fest einplanen", text: "Trage Lernzeiten wie Termine in deinen Wochenplan ein und entscheide, was wirklich wichtig ist.", methoden: ["wochenplan", "eisenhower"] },
  motivation: { titel: "Motivation stärken", text: "Kleine Ziele, die du sicher erreichst, ein Lernpartner und eine Belohnung helfen beim Dranbleiben.", methoden: ["smart", "tandem", "lernvertrag"] },
  unklar:     { titel: "Klarheit schaffen", text: "Kläre zuerst, was verlangt wird und was du dafür können musst. Prüfe dann deinen Stand mit einer Ich-kann-Liste.", methoden: ["checkliste", "ampel"] },
  material:   { titel: "Material vorher bereitlegen", text: "Lege alles bereit, bevor du anfängst. Fehlt dir etwas, frag früh bei Mitschülerinnen oder der Lehrkraft nach.", methoden: [] },
  muede:      { titel: "Eine bessere Lernzeit finden", text: "Lerne zu einer Tageszeit, in der du fit bist, und plane Pausen ein. Ausreichend Schlaf hilft dem Gehirn beim Festigen.", methoden: ["umgebung"] },
  zuviel:     { titel: "Den Plan realistischer machen", text: "Plane weniger pro Tag oder mehr Lerntage. Ein Plan, den du einhältst, ist besser als ein perfekter Plan.", methoden: ["rueckwaerts"] }
};

/* Feedback aus allen Eingaben erzeugen */
function erstelleFeedback(st) {
  const r = st.refl || {};
  const gewaehlt = (st.methoden || []).map((id) => METHODEN.find((m) => m.id === id)).filter(Boolean);
  const staerken = [];
  const vorschlaege = [];

  /* ---- Das hast du gut gemacht ---- */
  staerken.push("Du hast dein Lernen bewusst geplant, ausprobiert und reflektiert. Genau das ist selbstreguliertes Lernen.");
  if (st.ziel && st.ziel.s) staerken.push("Du hast dir ein konkretes Ziel gesetzt.");
  if (st.plan && (st.plan.themen || "").trim()) staerken.push("Du hast einen Lernzeitplan mit verteilten Wiederholungen erstellt.");
  const gutBelegt = gewaehlt.filter((m) => m.evidenz === "gut");
  if (gutBelegt.length) staerken.push(`Mit ${gutBelegt.map((m) => m.name).join(" und ")} hast du Methoden gewählt, deren Wirkung gut belegt ist.`);
  if (Object.keys(st.uebungen || {}).some((k) => Object.keys(st.uebungen[k] || {}).length)) staerken.push("Du hast die Methoden direkt an deinem Stoff ausprobiert.");
  if (r.pruefung || (r.pruefChips || []).length) staerken.push("Du hast geprüft, ob du es ohne Hilfe kannst, statt dich nur auf ein gutes Gefühl zu verlassen.");
  if (r.plan === "ganz") staerken.push("Du hast deinen Plan eingehalten. Das ist eine echte Leistung.");
  if (r.ergebnis === "sicher") staerken.push("Du kannst es jetzt ohne Hilfe. Das ist dein Erfolg!");
  if (r.ergebnis === "teilweise") staerken.push("Du hast Fortschritte gemacht und weißt jetzt genauer, wo es noch hakt.");
  if ((r.anders || "").trim()) staerken.push("Du weißt, was du beim nächsten Mal anders machen willst.");

  /* ---- Verbesserungsvorschläge ---- */
  const bewertung = r.bewertung || {};
  const schwach = gewaehlt.filter((m) => bewertung[m.id] && bewertung[m.id] <= 2);

  if (r.ergebnis === "sicher") {
    vorschlaege.push({ titel: "Festigen statt vergessen", text: "Wiederhole das Thema in drei bis sieben Tagen noch einmal ohne Unterlagen. So sitzt es auch noch bei der Klassenarbeit.", methoden: ["verteilt", "leitner"] });
    vorschlaege.push({ titel: "Dein Können erweitern", text: "Probiere eine veränderte Aufgabe oder eine andere Darstellung aus. Trägt dein Können auch dann?", methoden: ["interleaving", "loesungsbeispiele"] });
  } else if (r.ergebnis) {
    vorschlaege.push({ titel: "Weitersteuern statt aufgeben", text: "Dein Ergebnis ist eine wichtige Information für den nächsten Durchgang. Bestimme dein Lernproblem noch einmal genauer: Liegt es am Behalten, an den Zusammenhängen oder am Übertragen auf neue Aufgaben?", methoden: [] });
    const e = empfehlen(st.probleme || [], st.eigenes || "", st.antworten || {}, st.zeitraum, st.anlass);
    const lernProbleme = (st.probleme || []).filter((id) => (PROBLEME.find((p) => p.id === id) || {}).gruppe === "lernen");
    const kandidaten = [...e.start, ...e.ergaenzend].filter((x) => !(st.methoden || []).includes(x.m.id));
    const passend = kandidaten.filter((x) => !lernProbleme.length || x.problemTreffer.some((p) => lernProbleme.includes(p)));
    const alternativen = (passend.length ? passend : kandidaten).map((x) => x.m.id).slice(0, 3);
    if (alternativen.length) vorschlaege.push({ titel: "Probiere eine andere Methode", text: "Diese Methoden passen ebenfalls zu deinem Lernproblem:", methoden: alternativen });
  }
  schwach.forEach((m) => vorschlaege.push({ titel: `${m.name} hat dir wenig geholfen`, text: "Prüfe, ob die Methode wirklich zu deinem Lernproblem passt. Manche Methoden brauchen auch etwas Übung, bevor sie wirken. Lies dazu noch einmal das Handout.", methoden: [m.id] }));

  const abrufIds = ["abruf", "braindump", "leitner", "partnerabfrage", "verteilt"];
  if (gewaehlt.length && !gewaehlt.some((m) => abrufIds.includes(m.id))) {
    vorschlaege.push({ titel: "Abrufen einbauen", text: "Ergänze deine Methoden um Abrufübungen. Dich selbst ohne Unterlagen abzufragen gehört zu den wirksamsten Lernstrategien.", methoden: ["braindump", "abruf"] });
  }
  if (r.plan === "teilweise" || r.plan === "kaum") {
    (r.hindernisse || []).forEach((h) => { if (HINDERNIS_TIPP[h]) vorschlaege.push(HINDERNIS_TIPP[h]); });
    if (!(r.hindernisse || []).length) vorschlaege.push({ titel: "Hindernisse erkennen", text: "Überlege, was dich vom Plan abgehalten hat. Nur wenn du das Hindernis kennst, kannst du die Umsetzung besser organisieren.", methoden: ["lerntagebuch"] });
  }
  if (r.ziel === "nein" || r.ziel === "teilweise") vorschlaege.push({ titel: "Dein Ziel anpassen", text: "Prüfe, ob dein Ziel realistisch war. Teile es in kleinere Etappen auf, die du sicher erreichst.", methoden: ["smart"] });
  if (!(st.ziel && st.ziel.s)) vorschlaege.push({ titel: "Ein klares Ziel setzen", text: "Formuliere beim nächsten Mal ein SMART-Ziel. Dann weißt du genau, woran du deinen Erfolg erkennst.", methoden: ["smart"] });
  if (!r.pruefung && !(r.pruefChips || []).length) vorschlaege.push({ titel: "Ohne Hilfe überprüfen", text: "Plane immer eine Überprüfung ohne Unterlagen ein, zum Beispiel einen Brain Dump oder eine Probeaufgabe. Erst dann weißt du, ob du es selbst kannst.", methoden: ["braindump", "checkliste"] });
  if (r.zuversicht && r.zuversicht <= 2) vorschlaege.push({ titel: "Sicherheit gewinnen", text: "Eine Generalprobe unter echten Bedingungen und eine ehrliche Ich-kann-Liste geben dir Sicherheit. Wenn dich Prüfungen stark belasten, sprich mit deiner Lehrkraft oder der Beratung an der Schule.", methoden: ["checkliste", "partnerabfrage"] });
  if (!(st.wenn || "").trim()) vorschlaege.push({ titel: "Einen festen Startpunkt festlegen", text: "Ein Wenn-dann-Plan legt fest, wann und wo du anfängst. Das hilft nachweislich gegen Aufschieben.", methoden: ["wenndann"] });
  if ((st.methoden || []).includes("ki") || (st.uebungen && st.uebungen.ki && Object.keys(st.uebungen.ki).length)) {
    vorschlaege.push({ titel: "KI bewusst einsetzen", text: "Hilfe ist noch kein Lernen. Prüfe nach jeder KI-Hilfe ohne KI, was du selbst kannst.", methoden: ["ki"] });
  }

  /* Doppelte Titel entfernen, höchstens sechs Vorschläge */
  const gesehen = new Set();
  const liste = vorschlaege.filter((v) => !gesehen.has(v.titel) && gesehen.add(v.titel))
    .map((v) => ({ ...v, methoden: (v.methoden || []).filter((id) => typeof id === "string" && METHODEN.some((m) => m.id === id)) }))
    .slice(0, 6);

  const weiter = {
    sicher:    "Es gelingt sicher. Festige das Gelernte mit einer späteren Wiederholung und nimm dir dann das nächste Thema oder eine schwierigere Aufgabe vor.",
    teilweise: "Es gelingt teilweise. Bestimme genau, welcher Teil noch hakt, und starte damit einen neuen, kürzeren Durchgang.",
    nicht:     "Es gelingt noch nicht. Das ist kein Scheitern, sondern eine Information. Prüfe dein Lernproblem neu, wähle ein anderes Vorgehen und hol dir gezielt Hilfe."
  }[r.ergebnis] || "";

  return { staerken, vorschlaege: liste, weiter };
}
