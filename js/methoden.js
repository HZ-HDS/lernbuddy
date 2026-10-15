/* Lernbuddy – Methodenpool
   ------------------------------------------------------------------
   So ergänzt ihr eine Methode:
   - id: kurzer Name ohne Leerzeichen
   - passtZu: Problem-ID (siehe zuordnung.js) → 1 = passt etwas, 2 = passt gut, 3 = passt sehr gut
   - vorlieben: allein, gemeinsam, visuell, sprachlich, sprechen, schreiben, plan, frei, kurz, lang, digital, papier
   - evidenz: "gut" (gut belegt), "teilweise" (teilweise belegt), "wenig" (wenig erforscht)
   - handout: optional; fehlt es, wird nur die Kurzbeschreibung gezeigt
   ------------------------------------------------------------------ */

/* Einordnung nach der Arbeitsordnung der Zukunftswerkstatt (Übungsheft DS1, M3) */
const TYPEN = {
  methode:   "Lernmethode",
  technik:   "Lerntechnik",
  ressource: "Ressource",
  sol:       "Planen & Organisieren"
};

/* Lernstrategien: Was tue ich grundsätzlich, um zu lernen? (DS1, M3) */
const STRATEGIEN = [
  ["Auswählen und reduzieren", "Wenn ein Text oder Stoffgebiet umfangreich ist und unklar ist, was wichtig ist."],
  ["Abrufen", "Wenn etwas bekannt wirkt, aber ohne Vorlage nicht sicher verfügbar ist."],
  ["Verteilt wiederholen", "Wenn Gelerntes nach einigen Tagen nicht mehr sicher sitzt."],
  ["Erklären und verknüpfen", "Wenn einzelne Teile bekannt sind, ihre Beziehungen aber noch unsicher sind."],
  ["Strukturieren und visualisieren", "Wenn der Überblick fehlt oder ein Zusammenhang sichtbar werden soll."],
  ["Darstellungen wechseln und übersetzen", "Wenn ein Zusammenhang nur in einer Darstellung sicher ist."],
  ["Anwenden und variieren", "Wenn ein Beispiel gelingt, aber unklar ist, ob das Können bei Veränderungen trägt."],
  ["Vergleichen und unterscheiden", "Wenn ähnliche Begriffe, Verfahren oder Kriterien vermischt werden."],
  ["Überprüfen und reflektieren", "Wenn Fehler wiederkehren oder unklar ist, ob das Vorgehen funktioniert."]
];

const KATEGORIEN = {
  kognitiv:     "Kognitiv",
  metakognitiv: "Metakognitiv / SRL",
  ressourcen:   "Zeit & Ressourcen",
  sol:          "SOL",
  kooperativ:   "Kooperativ",
  mnemo:        "Mnemotechnik"
};

const EVIDENZ = { gut: "gut belegt", teilweise: "teilweise belegt", wenig: "wenig erforscht" };

const KI_HINWEIS = "Nutzt für die Schule euren fobizz-Zugang: Er ist datenschutzkonform für Schülerinnen und Schüler. Andere Tools haben eigene Altersgrenzen, zum Beispiel ChatGPT ab 13 Jahren und unter 18 nur mit Einverständnis der Eltern, Claude erst ab 18. Gib keine persönlichen Daten ein und lade keine Unterlagen mit Namen anderer hoch.";

const METHODEN = [
  /* ---------------- Kognitiv ---------------- */
  { id: "feynman", name: "Feynman-Technik", kategorie: "kognitiv", typ: "methode", evidenz: "teilweise", dauer: "15–30 Min.", sozial: "allein oder zu zweit",
    kurz: "Erkläre ein Thema so einfach, dass es eine Person ohne Vorwissen versteht. Wo du stockst, liegt deine Lücke.",
    passtZu: { zusammenhang: 3, grundlagen: 3, vorwissen: 2, vergessen: 2, interesse: 1 }, vorlieben: ["sprechen", "schreiben", "allein"] },

  { id: "abruf", name: "Abrufübungen", kategorie: "kognitiv", typ: "methode", evidenz: "gut", dauer: "10–20 Min.", sozial: "allein",
    kurz: "Hole Wissen aktiv aus dem Gedächtnis, statt es nochmal zu lesen: mit Fragen, Karteikarten oder einem leeren Blatt.",
    passtZu: { abruf: 3, vergessen: 3, angst: 2, vorwissen: 1, grundlagen: 1 }, vorlieben: ["allein", "schreiben", "kurz"] },

  { id: "verteilt", name: "Verteiltes Wiederholen", kategorie: "kognitiv", typ: "methode", evidenz: "gut", dauer: "mehrmals 15–20 Min.", sozial: "allein",
    kurz: "Verteile das Lernen auf mehrere kurze Einheiten über Tage, statt alles an einem Abend zu lernen.",
    passtZu: { vergessen: 3, zeit: 1, aufschieben: 1, angst: 1 }, vorlieben: ["plan", "kurz"] },

  { id: "interleaving", name: "Interleaving", kategorie: "kognitiv", typ: "methode", evidenz: "teilweise", dauer: "20–40 Min.", sozial: "allein",
    kurz: "Mische verschiedene Aufgabentypen beim Üben. So lernst du zu erkennen, welcher Lösungsweg wann passt.",
    passtZu: { vermischen: 2, transfer: 3, vergessen: 2, angst: 1 }, vorlieben: ["allein"] },

  { id: "elaboration", name: "Elaborationsfragen", kategorie: "kognitiv", typ: "technik", evidenz: "teilweise", dauer: "15–20 Min.", sozial: "allein",
    kurz: "Frag bei jedem Inhalt: Warum ist das so? Wie hängt das mit dem zusammen, was ich schon weiß?",
    passtZu: { zusammenhang: 2, interesse: 2, vorwissen: 2, grundlagen: 2, vergessen: 2 }, vorlieben: ["sprachlich", "schreiben"] },

  { id: "cornell", name: "Cornell-Notizen", kategorie: "kognitiv", typ: "methode", evidenz: "teilweise", dauer: "im Unterricht + 10 Min.", sozial: "allein",
    kurz: "Notizen in drei Bereichen: Mitschrift, Stichworte und Fragen am Rand, Zusammenfassung unten.",
    passtZu: { abruf: 1, konzentration: 1, vergessen: 1, anfangen: 1, grundlagen: 1 }, vorlieben: ["schreiben", "plan", "papier"] },

  { id: "mindmap", name: "Mindmap", kategorie: "kognitiv", typ: "technik", evidenz: "teilweise", dauer: "15–25 Min.", sozial: "allein",
    kurz: "Ordne ein Thema um einen Mittelpunkt mit Ästen und Unterästen. Gut zum Sammeln und für den Überblick.",
    passtZu: { ueberblick: 3, anfangen: 2, vorwissen: 2, interesse: 1 }, vorlieben: ["visuell", "frei", "papier"] },

  { id: "conceptmap", name: "Concept Map", kategorie: "kognitiv", typ: "technik", evidenz: "teilweise", dauer: "20–30 Min.", sozial: "allein oder zu zweit",
    kurz: "Verbinde Begriffe mit beschrifteten Pfeilen. So siehst du, wie Inhalte zusammenhängen.",
    passtZu: { vermischen: 1, zusammenhang: 3, ueberblick: 1, grundlagen: 3, vorwissen: 3, anfangen: 1 }, vorlieben: ["visuell", "plan"] },

  { id: "exzerpt", name: "Zusammenfassen & Exzerpieren", kategorie: "kognitiv", typ: "technik", evidenz: "wenig", dauer: "20–40 Min.", sozial: "allein",
    kurz: "Fasse einen Text in eigenen Worten zusammen. Wirkt am besten, wenn du danach damit weiterarbeitest.",
    passtZu: { anfangen: 1, grundlagen: 1 }, vorlieben: ["sprachlich", "schreiben", "lang"] },

  { id: "sq3r", name: "SQ3R-Lesemethode", kategorie: "kognitiv", typ: "methode", evidenz: "teilweise", dauer: "30–45 Min.", sozial: "allein",
    kurz: "Lies Fachtexte in fünf Schritten: Überblick, Fragen, Lesen, Wiedergeben, Wiederholen.",
    passtZu: { konzentration: 2, anfangen: 2, grundlagen: 1 }, vorlieben: ["sprachlich", "plan", "lang"] },

  /* ---------------- Metakognitiv / SRL ---------------- */
  { id: "smart", name: "SMART-Ziele", kategorie: "metakognitiv", typ: "sol", evidenz: "teilweise", dauer: "10 Min.", sozial: "allein",
    kurz: "Formuliere Lernziele spezifisch, messbar, attraktiv, realistisch und mit Termin.",
    passtZu: { motivation: 3, aufschieben: 2, anfangen: 2, zeit: 1 }, vorlieben: ["plan", "schreiben"] },

  { id: "lerntagebuch", name: "Lerntagebuch", kategorie: "metakognitiv", typ: "methode", evidenz: "teilweise", dauer: "5–10 Min.", sozial: "allein",
    kurz: "Notiere nach jeder Lerneinheit: Was habe ich gelernt? Was war schwer? Was mache ich als Nächstes?",
    passtZu: { fehler: 1, motivation: 1, konzentration: 1, angst: 1, vergessen: 1 }, vorlieben: ["schreiben", "allein"] },

  { id: "checkliste", name: "Selbsttest-Checkliste", kategorie: "metakognitiv", typ: "technik", evidenz: "teilweise", dauer: "10 Min.", sozial: "allein",
    kurz: "Liste alle Themen der Klassenarbeit auf und prüfe für jedes ehrlich: Kann ich das schon?",
    passtZu: { fehler: 1, angst: 3, anfangen: 1, vergessen: 1 }, vorlieben: ["plan", "allein"] },

  { id: "wenndann", name: "Wenn-dann-Pläne", kategorie: "metakognitiv", typ: "sol", evidenz: "gut", dauer: "5 Min.", sozial: "allein",
    kurz: "Lege fest, wann und wo du lernst: „Wenn ich nach der Schule gegessen habe, dann …“",
    passtZu: { aufschieben: 3, motivation: 2, konzentration: 1 }, vorlieben: ["plan"] },

  { id: "lernvertrag", name: "Lernvertrag mit mir selbst", kategorie: "metakognitiv", typ: "sol", evidenz: "wenig", dauer: "10 Min.", sozial: "allein oder mit Lernpartner",
    kurz: "Halte schriftlich fest, was du bis wann schaffst und womit du dich danach belohnst.",
    passtZu: { motivation: 2, aufschieben: 2 }, vorlieben: ["plan", "schreiben"] },

  { id: "ampel", name: "Ampel-Selbsteinschätzung", kategorie: "metakognitiv", typ: "technik", evidenz: "teilweise", dauer: "5–10 Min.", sozial: "allein",
    kurz: "Markiere jedes Thema grün, gelb oder rot. So weißt du sofort, wo du anfangen musst.",
    passtZu: { ueberblick: 1, anfangen: 2, angst: 2, grundlagen: 1 }, vorlieben: ["visuell", "allein"] },

  /* ---------------- Zeit & Ressourcen ---------------- */
  { id: "pomodoro", name: "Pomodoro-Technik", kategorie: "ressourcen", typ: "sol", evidenz: "wenig", dauer: "25 Min. + 5 Min. Pause", sozial: "allein",
    kurz: "Lerne 25 Minuten konzentriert, dann 5 Minuten Pause. Nach vier Runden eine längere Pause.",
    passtZu: { konzentration: 3, aufschieben: 3, motivation: 1 }, vorlieben: ["kurz", "plan"] },

  { id: "eisenhower", name: "Eisenhower-Matrix", kategorie: "ressourcen", typ: "sol", evidenz: "wenig", dauer: "10 Min.", sozial: "allein",
    kurz: "Sortiere Aufgaben in vier Felder nach wichtig und dringend. So erkennst du, was zuerst dran ist.",
    passtZu: { zeit: 3, anfangen: 1 }, vorlieben: ["visuell", "plan"] },

  { id: "rueckwaerts", name: "Lernzeitplan rückwärts", kategorie: "ressourcen", typ: "sol", evidenz: "teilweise", dauer: "15 Min.", sozial: "allein",
    kurz: "Starte beim Prüfungstermin und plane rückwärts, wann welches Thema sitzen muss. Mit Puffer.",
    passtZu: { zeit: 3, aufschieben: 2, anfangen: 2, angst: 1 }, vorlieben: ["plan"] },

  { id: "wochenplan", name: "Wochenplan", kategorie: "ressourcen", typ: "sol", evidenz: "teilweise", dauer: "10 Min. pro Woche", sozial: "allein",
    kurz: "Trage feste Lernzeiten wie Termine in deinen Wochenplan ein, neben Schule, Job und Freizeit.",
    passtZu: { zeit: 3, aufschieben: 1 }, vorlieben: ["plan", "visuell"] },

  { id: "umgebung", name: "Lernumgebung gestalten", kategorie: "ressourcen", typ: "sol", evidenz: "teilweise", dauer: "einmalig 15 Min.", sozial: "allein",
    kurz: "Richte dir einen festen Lernplatz ein: aufgeräumt, ruhig, gutes Licht, alles griffbereit.",
    passtZu: { konzentration: 3, motivation: 1 }, vorlieben: ["allein"] },

  { id: "ablenkung", name: "Ablenkungen reduzieren", kategorie: "ressourcen", typ: "sol", evidenz: "teilweise", dauer: "laufend", sozial: "allein",
    kurz: "Handy außer Sichtweite, Benachrichtigungen aus, nur die nötigen Apps offen.",
    passtZu: { konzentration: 3, zeit: 1 }, vorlieben: ["allein", "digital"] },

  /* ---------------- SOL ---------------- */
  { id: "lernlandkarte", name: "Lernlandkarte", kategorie: "sol", typ: "technik", evidenz: "wenig", dauer: "20 Min.", sozial: "allein",
    kurz: "Zeichne alle Themen einer Einheit als Landkarte und markiere, wo du gerade stehst.",
    passtZu: { ueberblick: 3, anfangen: 3, grundlagen: 2, vorwissen: 2 }, vorlieben: ["visuell", "frei"] },

  { id: "sandwich", name: "Sandwich-Prinzip", kategorie: "sol", typ: "methode", evidenz: "wenig", dauer: "45–90 Min.", sozial: "allein und gemeinsam",
    kurz: "Wechsle zwischen Phasen, in denen du Neues aufnimmst, und Phasen, in denen du es selbst verarbeitest.",
    passtZu: { konzentration: 2, motivation: 1 }, vorlieben: ["kurz", "plan"] },

  { id: "advance", name: "Advance Organizer", kategorie: "sol", typ: "technik", evidenz: "teilweise", dauer: "10–15 Min.", sozial: "allein",
    kurz: "Verschaffe dir vor dem Lernen einen Überblick über das ganze Thema, als Gerüst für die Details.",
    passtZu: { ueberblick: 2, vorwissen: 2, anfangen: 2, interesse: 1 }, vorlieben: ["visuell", "sprachlich"] },

  { id: "kompetenzraster", name: "Lernplan mit Kompetenzraster", kategorie: "sol", typ: "methode", evidenz: "wenig", dauer: "15 Min.", sozial: "allein",
    kurz: "Ein Raster zeigt, was du am Ende können sollst. Du planst selbst, wie du jede Stufe erreichst.",
    passtZu: { grundlagen: 2, anfangen: 2, angst: 1 }, vorlieben: ["plan", "allein"] },

  /* ---------------- Kooperativ ---------------- */
  { id: "tps", name: "Think-Pair-Share", kategorie: "kooperativ", typ: "methode", evidenz: "teilweise", dauer: "10–20 Min.", sozial: "zu zweit, dann Gruppe",
    kurz: "Erst allein nachdenken, dann mit einer Partnerin oder einem Partner austauschen, dann in der Gruppe vorstellen.",
    passtZu: { interesse: 2, motivation: 1, vorwissen: 1 }, vorlieben: ["gemeinsam", "sprechen", "kurz"] },

  { id: "puzzle", name: "Gruppenpuzzle", kategorie: "kooperativ", typ: "methode", evidenz: "teilweise", dauer: "60–90 Min.", sozial: "Gruppe",
    kurz: "Jede Person wird Expertin für einen Teil und bringt ihn den anderen bei.",
    passtZu: { interesse: 2, motivation: 2 }, vorlieben: ["gemeinsam", "sprechen", "lang"] },

  { id: "tandem", name: "Lerntandem", kategorie: "kooperativ", typ: "ressource", evidenz: "teilweise", dauer: "regelmäßig 30–45 Min.", sozial: "zu zweit",
    kurz: "Lernt zu zweit zu festen Zeiten, erklärt euch gegenseitig Stoff und fragt euch ab.",
    passtZu: { zusammenhang: 1, motivation: 3, aufschieben: 2, grundlagen: 2, interesse: 1 }, vorlieben: ["gemeinsam", "sprechen"] },

  { id: "placemat", name: "Placemat", kategorie: "kooperativ", typ: "methode", evidenz: "wenig", dauer: "15–20 Min.", sozial: "Gruppe (3–4)",
    kurz: "Jede Person schreibt ihre Gedanken in ein Feld des Blattes. In der Mitte einigt ihr euch auf das Wichtigste.",
    passtZu: { interesse: 1, vorwissen: 1 }, vorlieben: ["gemeinsam", "schreiben"] },

  { id: "ldl", name: "Lernen durch Lehren", kategorie: "kooperativ", typ: "methode", evidenz: "teilweise", dauer: "30–45 Min.", sozial: "zu zweit oder Gruppe",
    kurz: "Bereite ein Thema so vor, dass du es anderen beibringen kannst. Beim Erklären lernst du selbst am meisten.",
    passtZu: { zusammenhang: 2, interesse: 2, grundlagen: 2, motivation: 2, vergessen: 1 }, vorlieben: ["gemeinsam", "sprechen"] },

  { id: "partnerabfrage", name: "Partnerabfrage", kategorie: "kooperativ", typ: "methode", evidenz: "gut", dauer: "10–15 Min.", sozial: "zu zweit",
    kurz: "Fragt euch gegenseitig ab, ohne in die Unterlagen zu schauen. Abrufen zu zweit.",
    passtZu: { abruf: 2, vergessen: 2, angst: 2, motivation: 1 }, vorlieben: ["gemeinsam", "sprechen", "kurz"] },

  /* ---------------- Mnemotechniken ---------------- */
  { id: "loci", name: "Loci-Methode", kategorie: "mnemo", typ: "technik", evidenz: "teilweise", dauer: "15–20 Min.", sozial: "allein",
    kurz: "Lege Begriffe in Gedanken an festen Orten eines bekannten Weges ab und gehe ihn später wieder ab.",
    passtZu: { vergessen: 3 }, vorlieben: ["visuell", "frei"] },

  { id: "akronyme", name: "Akronyme & Merksätze", kategorie: "mnemo", typ: "technik", evidenz: "teilweise", dauer: "5–10 Min.", sozial: "allein",
    kurz: "Bilde aus Anfangsbuchstaben ein Wort oder einen Satz, um dir Reihenfolgen und Listen zu merken.",
    passtZu: { vergessen: 2 }, vorlieben: ["sprachlich", "kurz"] },

  { id: "geschichte", name: "Geschichtenmethode", kategorie: "mnemo", typ: "technik", evidenz: "teilweise", dauer: "10–15 Min.", sozial: "allein",
    kurz: "Verknüpfe Begriffe zu einer lebendigen, gern absurden Geschichte. Bilder bleiben besser hängen als Listen.",
    passtZu: { vergessen: 2, interesse: 1 }, vorlieben: ["visuell", "sprachlich", "frei"] },

  { id: "schluesselwort", name: "Schlüsselwortmethode", kategorie: "mnemo", typ: "technik", evidenz: "teilweise", dauer: "5 Min. pro Begriff", sozial: "allein",
    kurz: "Verbinde ein Fremdwort mit einem ähnlich klingenden deutschen Wort und einem Bild. Gut für Vokabeln.",
    passtZu: { vergessen: 2 }, vorlieben: ["visuell", "sprachlich"] },

  { id: "leitner", name: "Leitner-Karteikasten", kategorie: "mnemo", typ: "methode", evidenz: "gut", dauer: "täglich 10–15 Min.", sozial: "allein",
    kurz: "Karteikarten wandern nach jeder richtigen Antwort ein Fach weiter und werden seltener wiederholt.",
    passtZu: { abruf: 2, vergessen: 3, angst: 1, zeit: 1 }, vorlieben: ["kurz", "plan", "papier", "digital"] },
  /* ---------------- Ergänzt aus den Übungsheften der Zukunftswerkstatt ---------------- */
  { id: "loesungsbeispiele", name: "Lernen mit Lösungsbeispielen", kategorie: "kognitiv", typ: "methode", evidenz: "gut", dauer: "20–30 Min.", sozial: "allein",
    kurz: "Beispiel verstehen, verdecken, selbst rekonstruieren, einen ähnlichen Fall lösen und vergleichen.",
    passtZu: { transfer: 3, grundlagen: 1, vorwissen: 1 }, vorlieben: ["allein", "schreiben", "plan"] },

  { id: "fehleranalyse", name: "Systematische Fehleranalyse", kategorie: "metakognitiv", typ: "methode", evidenz: "teilweise", dauer: "15–20 Min.", sozial: "allein oder zu zweit",
    kurz: "Fehlerstelle finden, Ursache bestimmen, korrigieren und einen neuen ähnlichen Fall selbst lösen.",
    passtZu: { fehler: 3, transfer: 1, angst: 1 }, vorlieben: ["allein", "schreiben", "plan"] },

  { id: "braindump", name: "Brain Dump / leeres Blatt", kategorie: "kognitiv", typ: "technik", evidenz: "gut", dauer: "5–10 Min.", sozial: "allein",
    kurz: "Schreibe ohne Unterlagen alles auf, was du zu einem Thema weißt. Dann vergleichen und Lücken markieren.",
    passtZu: { abruf: 3, vergessen: 2, angst: 1, anfangen: 1 }, vorlieben: ["allein", "schreiben", "kurz"] },

  { id: "vergleichstabelle", name: "Vergleichstabelle", kategorie: "kognitiv", typ: "technik", evidenz: "teilweise", dauer: "10–20 Min.", sozial: "allein",
    kurz: "Lege Kriterien fest und vergleiche zwei oder mehr Dinge Zeile für Zeile.",
    passtZu: { vermischen: 3, ueberblick: 1, zusammenhang: 1 }, vorlieben: ["visuell", "schreiben", "plan"] },

  { id: "ueberschlag", name: "Überschlag & Einheitencheck", kategorie: "metakognitiv", typ: "technik", evidenz: "teilweise", dauer: "2–5 Min. pro Aufgabe", sozial: "allein",
    kurz: "Schätze vor dem Rechnen die Größenordnung ab und prüfe danach Einheit und Sinn des Ergebnisses.",
    passtZu: { fehler: 3 }, vorlieben: ["allein", "kurz"] },

  { id: "ki", name: "KI gezielt nutzen", kategorie: "ressourcen", typ: "ressource", evidenz: "teilweise", dauer: "nach Bedarf", sozial: "allein",
    kurz: "Rückfragen, begrenztes Feedback, Varianten oder einen Hinweis anfordern, ohne dass die KI das Lernen übernimmt.",
    passtZu: {}, vorlieben: ["digital"] }
];
