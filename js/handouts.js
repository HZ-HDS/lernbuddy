/* Lernbuddy – Handouts zu allen Methoden
   ------------------------------------------------------------------
   Jedes Handout hat dieselbe Struktur:
   definition · gut · weniger · schritte · beispiel {fach, text} · ki {ideen, tools, prompts, grenzen}
   Die Zuordnung erfolgt über die id aus methoden.js.
   Zielgruppe: Zukunftswerkstatt, Eingangsklasse Berufliches Gymnasium (SGGG).
   Inhaltlich abgestimmt mit den Übungsheften DS1 und DS2 der Zukunftswerkstatt.
   ------------------------------------------------------------------ */

const KI_STANDARD = "fobizz über euren Schulzugang (datenschutzkonform) oder ein anderer KI-Assistent";

const HANDOUTS = {

  /* ======================= KOGNITIV ======================= */

  feynman: {
    definition: "Bei der Feynman-Technik erklärst du ein Thema so einfach, dass es jemand ohne Vorwissen versteht, zum Beispiel ein Kind aus der fünften Klasse. Stellen, an denen du ins Stocken gerätst oder Fachwörter brauchst, zeigen dir genau, was du noch nicht verstanden hast. Benannt ist die Methode nach dem Physiker Richard Feynman.",
    gut: ["Komplizierte Zusammenhänge wirklich verstehen statt auswendig lernen", "Prüfen, ob du ein Thema erklären kannst, bevor die Klassenarbeit kommt", "Vorbereitung auf mündliche Prüfungen und Präsentationen"],
    weniger: ["Für reine Fakten wie Vokabeln oder Jahreszahlen", "Wenn du das Thema noch gar nicht kennst: erst einlesen"],
    schritte: [
      "Schreibe das Thema oben auf ein leeres Blatt.",
      "Erkläre es schriftlich oder laut in einfachen Worten, ohne in die Unterlagen zu schauen.",
      "Markiere die Stellen, an denen du hängen bleibst oder Fachwörter nicht erklären kannst.",
      "Schließe diese Lücken mit deinen Unterlagen.",
      "Erkläre das Thema noch einmal, jetzt kürzer und mit einem Vergleich aus dem Alltag."
    ],
    beispiel: { fach: "Gesundheit und Biologie (Profilfach)",
      text: "Thema Osmose: Du erklärst einer imaginären Fünftklässlerin, warum ein Salatblatt in Salzwasser schlapp wird. Beim Erklären merkst du, dass du nicht sagen kannst, warum Wasser durch die Membran wandert, das Salz aber nicht. Genau das schlägst du nach. Im zweiten Durchgang vergleichst du die Membran mit einem Sieb, das nur kleine Teilchen durchlässt." },
    ki: {
      ideen: ["KI spielt eine neugierige Person ohne Vorwissen und stellt Rückfragen zu deiner Erklärung.", "KI zeigt dir, wo deine Erklärung fachlich ungenau ist.", "KI schlägt dir passende Alltagsvergleiche vor, die du dann selbst prüfst."],
      tools: [KI_STANDARD + " als Gesprächspartner", "Sprachmemo-App auf dem iPad, um deine Erklärung aufzunehmen und anzuhören"],
      prompts: [
        "Du bist eine neugierige Schülerin aus der 5. Klasse ohne Vorwissen. Ich erkläre dir gleich das Thema [Thema]. Unterbrich mich mit einfachen Warum-Fragen, wenn etwas unklar ist. Am Ende sagst du mir, welche Stelle du am wenigsten verstanden hast.",
        "Hier ist meine Erklärung zu [Thema]: [Text]. Prüfe sie fachlich für die Eingangsklasse eines beruflichen Gymnasiums. Nenne Fehler und Lücken, aber formuliere die Erklärung nicht für mich neu."
      ],
      grenzen: "Wenn die KI dir die Erklärung schreibt, lernst du nichts. Die Technik wirkt nur, wenn du selbst erklärst. Vergleiche der KI können schief sein: Prüfe, ob sie wirklich passen."
    }
  },

  abruf: {
    definition: "Bei Abrufübungen holst du Wissen aktiv aus dem Gedächtnis, statt es nur erneut zu lesen. Du testest dich selbst, zum Beispiel mit Fragen, Karteikarten oder einem leeren Blatt. Jeder Abruf stärkt die Erinnerung, und deine Lücken werden sichtbar. In der Forschung heißt das Testing-Effekt.",
    gut: ["Fakten, Fachbegriffe und Abläufe festigen", "Vorbereitung auf Klassenarbeiten", "Prüfen, was du wirklich kannst, statt dich auf ein gutes Gefühl zu verlassen"],
    weniger: ["Als allererster Schritt bei völlig neuem Stoff: erst verstehen, dann abrufen", "Wenn du sofort nachschaust, ohne vorher selbst zu antworten"],
    schritte: [
      "Lerne einen Abschnitt und lege das Material dann weg.",
      "Schreibe alles auf, was du noch weißt, oder beantworte Fragen aus dem Gedächtnis.",
      "Vergleiche mit dem Material und markiere Lücken in einer anderen Farbe.",
      "Lerne gezielt die Lücken nach.",
      "Wiederhole den Abruf nach etwa 1, 3 und 7 Tagen."
    ],
    beispiel: { fach: "Gesundheit und Biologie (Profilfach)",
      text: "Thema Zellaufbau: Nach dem Lernen zeichnest du aus dem Gedächtnis eine Tierzelle auf ein leeres Blatt, beschriftest die Zellorganellen und notierst zu jedem seine Aufgabe. Dann vergleichst du mit dem Schulbuch. Fehlt das Endoplasmatische Retikulum oder hast du Mitochondrien und Ribosomen verwechselt? Genau das lernst du nach. Zwei Tage später zeichnest du die Zelle erneut, ohne nachzuschauen." },
    ki: {
      ideen: ["KI erstellt aus deinen Unterlagen Übungsfragen mit steigender Schwierigkeit.", "KI fragt dich im Chat ab, eine Frage nach der anderen, und gibt dir Rückmeldung.", "KI vergleicht deine Notizen aus dem Gedächtnis mit dem Material und zeigt dir Lücken."],
      tools: [KI_STANDARD + " als Abfrage-Partner", "NotebookLM: erstellt Quizfragen und Karteikarten direkt aus hochgeladenen Unterlagen", "Anki oder Quizlet für digitale Karteikarten"],
      prompts: [
        "Ich bereite mich auf eine Klassenarbeit in [Fach] zum Thema [Thema] vor. Stelle mir nacheinander 10 Fragen zu diesem Material: [Text einfügen]. Stelle immer nur eine Frage und warte auf meine Antwort. Gib mir dann kurz Rückmeldung und erkläre Fehler. Beginne leicht und werde schwieriger.",
        "Diese Notizen habe ich aus dem Gedächtnis aufgeschrieben: [Notizen]. Vergleiche sie mit diesem Material: [Material]. Nenne mir nur, was fehlt oder falsch ist. Verrate mir die Lösung noch nicht, sondern gib mir Hinweise."
      ],
      grenzen: "KI-Fragen können fachlich falsch sein oder am Unterricht vorbeigehen. Prüfe die Antworten mit deinen Unterlagen. Lass dir keine fertigen Lösungen geben: Der Lerneffekt entsteht nur, wenn du selbst abrufst."
    }
  },

  verteilt: {
    definition: "Beim verteilten Wiederholen lernst du denselben Stoff in mehreren kurzen Einheiten mit Abständen dazwischen, statt alles auf einmal. Die Abstände werden mit der Zeit größer, zum Beispiel nach 1, 3 und 7 Tagen. Weil du zwischendurch etwas vergisst, muss dein Gehirn beim Wiederholen mehr arbeiten, und das Wissen bleibt länger.",
    gut: ["Stoff, den du langfristig brauchst, zum Beispiel Grundlagen für das Abitur", "Vokabeln, Fachbegriffe, Formeln", "Wenn du merkst, dass Gelerntes nach wenigen Tagen weg ist"],
    weniger: ["Wenn die Klassenarbeit morgen ist: Dann hilft nur noch gezieltes Abrufen", "Wenn du den Stoff noch nicht verstanden hast"],
    schritte: [
      "Teile den Stoff in kleine Portionen auf.",
      "Lerne die erste Portion und trage Wiederholungstermine in deinen Kalender ein: nach 1, 3 und 7 Tagen.",
      "Wiederhole an diesen Tagen kurz, am besten mit Abrufen statt Lesen.",
      "Was du nicht mehr weißt, wiederholst du früher noch einmal.",
      "Starte mit neuen Portionen, während die alten weiterlaufen."
    ],
    beispiel: { fach: "Englisch",
      text: "Für die nächste Diskussion im Unterricht lernst du 30 Redemittel wie „I see your point, but …“. Statt sie am Abend vorher alle zu pauken, übst du am Montag 10 neue, am Dienstag wiederholst du sie und lernst 10 weitere, am Donnerstag wiederholst du alle 20 und lernst die letzten 10. In der folgenden Woche wiederholst du alle 30 noch zweimal." },
    ki: {
      ideen: ["KI erstellt dir einen Wiederholungsplan bis zur Klassenarbeit.", "KI erstellt für jede Wiederholung neue Fragen, damit du nicht nur dieselben Antworten auswendig lernst."],
      tools: ["Anki: plant die Wiederholungsabstände automatisch", KI_STANDARD + " für den Wiederholungsplan", "Kalender-App mit Erinnerungen"],
      prompts: [
        "Meine Klassenarbeit in [Fach] ist am [Datum]. Diese Themen kommen dran: [Liste]. Ich kann an [Wochentage] je [Minuten] Minuten lernen. Erstelle mir einen Plan mit verteiltem Wiederholen: Jedes Thema soll mindestens dreimal mit größer werdenden Abständen drankommen."
      ],
      grenzen: "Ein Plan von der KI hilft nur, wenn er zu deinem echten Alltag passt. Trage die Termine selbst ein und passe den Plan an, wenn etwas dazwischenkommt."
    }
  },

  interleaving: {
    definition: "Beim Interleaving mischst du verschiedene Aufgabentypen oder Themen beim Üben, statt einen Typ nach dem anderen abzuarbeiten. Das fühlt sich schwerer an. Du lernst dabei aber zu erkennen, welche Art von Aufgabe vor dir liegt und welcher Lösungsweg passt. Genau das brauchst du in der Klassenarbeit.",
    gut: ["Mathe und Naturwissenschaften mit verschiedenen Aufgabentypen", "Vorbereitung auf gemischte Klassenarbeiten", "Wenn du bei Übungen alles kannst, in der Arbeit aber nicht weißt, wie du anfangen sollst"],
    weniger: ["Ganz am Anfang eines neuen Themas: Erst einen Aufgabentyp sicher üben", "Für Fächer, in denen es kaum unterschiedliche Aufgabentypen gibt"],
    schritte: [
      "Sammle Aufgaben zu zwei bis vier Themen, die du schon grundsätzlich kannst.",
      "Mische sie, sodass nie zwei gleiche Aufgabentypen hintereinander kommen.",
      "Frage dich vor jeder Aufgabe: Welcher Typ ist das? Woran erkenne ich ihn?",
      "Löse die Aufgabe und kontrolliere sofort.",
      "Notiere, welche Aufgabentypen du verwechselt hast."
    ],
    beispiel: { fach: "Mathematik",
      text: "Statt zehn Aufgaben zu linearen Funktionen und danach zehn zu quadratischen Funktionen zu rechnen, mischst du: Nullstelle einer Geraden, Scheitelpunkt einer Parabel, Schnittpunkt zweier Geraden, wieder eine Parabel. Vor jeder Aufgabe entscheidest du zuerst, welches Verfahren passt, zum Beispiel die Mitternachtsformel oder das Gleichsetzen." },
    ki: {
      ideen: ["KI erstellt gemischte Übungsblätter aus mehreren Themen.", "KI erklärt dir, woran du einen Aufgabentyp erkennst, wenn du ihn verwechselt hast."],
      tools: [KI_STANDARD + " für gemischte Aufgaben", "GeoGebra zum Kontrollieren von Funktionsaufgaben"],
      prompts: [
        "Erstelle mir 8 gemischte Übungsaufgaben für die Eingangsklasse zu diesen Themen: [Themen]. Mische die Aufgabentypen und nenne die Themen nicht dazu. Gib mir die Lösungen erst, wenn ich darum bitte."
      ],
      grenzen: "KI rechnet nicht immer richtig. Kontrolliere Lösungen mit deinem Schulbuch oder GeoGebra und frag nach, wenn etwas nicht stimmt."
    }
  },

  elaboration: {
    definition: "Bei Elaborationsfragen fragst du dich zu jedem Inhalt: Warum ist das so? Wie hängt das mit dem zusammen, was ich schon weiß? Was wäre ein Beispiel aus meinem Leben? Durch diese Fragen verknüpfst du Neues mit Bekanntem. Verknüpftes Wissen verstehst du besser und behältst es länger.",
    gut: ["Theorien und Modelle verstehen", "Fächer, die dich wenig interessieren: Der Alltagsbezug macht sie greifbarer", "Fehlendes Vorwissen gezielt aufdecken"],
    weniger: ["Für reine Merkfakten ohne Zusammenhang, zum Beispiel einzelne Vokabeln", "Wenn du die Grundlagen noch gar nicht kennst"],
    schritte: [
      "Lies einen Abschnitt und wähle eine zentrale Aussage aus.",
      "Frage dich: Warum ist das so?",
      "Frage dich: Wie hängt das mit etwas zusammen, das ich schon kenne?",
      "Finde ein eigenes Beispiel aus deinem Alltag.",
      "Schreibe die Antworten in zwei bis drei Sätzen auf und prüfe sie mit deinen Unterlagen."
    ],
    beispiel: { fach: "Gesundheit und Biologie (Profilfach)",
      text: "Thema Salutogenese nach Antonovsky: Du liest, dass das Kohärenzgefühl aus Verstehbarkeit, Handhabbarkeit und Bedeutsamkeit besteht. Warum soll das gesund halten? Wo erlebe ich das selbst? Du merkst: Vor einer Klassenarbeit bin ich weniger gestresst, wenn ich verstehe, was drankommt, einen Plan habe und weiß, wofür ich lerne. Damit hast du alle drei Bestandteile mit deinem Leben verbunden." },
    ki: {
      ideen: ["KI stellt dir Warum-Fragen zu deinem Material, die du selbst beantwortest.", "KI gibt dir Rückmeldung, ob deine Erklärung fachlich stimmt."],
      tools: [KI_STANDARD, "NotebookLM für Fragen direkt zu deinen Unterlagen"],
      prompts: [
        "Stelle mir zu diesem Text 5 Warum- und Wie-Fragen, die mich zum Nachdenken bringen: [Text]. Stelle immer nur eine Frage. Gib mir nach meiner Antwort Rückmeldung, ob sie fachlich stimmt, und frag gegebenenfalls nach."
      ],
      grenzen: "Die Beispiele aus deinem Alltag musst du selbst finden. Dann bleibt das Wissen hängen. KI-Beispiele sind oft allgemein und passen nicht zu dir."
    }
  },

  cornell: {
    definition: "Die Cornell-Methode teilt eine Heftseite in drei Bereiche: rechts die Mitschrift, links eine schmale Spalte für Stichworte und Fragen, unten eine kurze Zusammenfassung. So wird deine Mitschrift direkt zur Lernhilfe. Du kannst die rechte Seite abdecken und dich mit den Fragen links selbst abfragen.",
    gut: ["Mitschrift im Unterricht oder beim Lesen von Fachtexten", "Wenn deine Notizen unübersichtlich sind", "Wenn du später schnell wiederholen willst"],
    weniger: ["Für Themen, die du besser zeichnest, etwa Abläufe oder Zusammenhänge: Dann eine Concept Map", "Wenn du die Fragen und die Zusammenfassung nie ausfüllst"],
    schritte: [
      "Teile die Seite: rechts etwa zwei Drittel Mitschrift, links ein Drittel Fragenspalte, unten ein Streifen für die Zusammenfassung.",
      "Schreibe im Unterricht rechts in Stichworten mit.",
      "Formuliere noch am selben Tag links Fragen und Schlüsselbegriffe zur Mitschrift.",
      "Fasse unten die Seite in zwei bis drei Sätzen zusammen.",
      "Zum Lernen deckst du die rechte Seite ab und beantwortest die Fragen links."
    ],
    beispiel: { fach: "Wirtschaftslehre",
      text: "Thema Preisbildung am Markt: Rechts notierst du Angebot, Nachfrage, Gleichgewichtspreis und das Beispiel aus dem Unterricht. Links schreibst du Fragen wie „Was passiert mit dem Preis, wenn die Nachfrage steigt?“. Unten fasst du zusammen: Der Preis bildet sich dort, wo angebotene und nachgefragte Menge gleich sind." },
    ki: {
      ideen: ["KI schlägt dir Fragen für die linke Spalte vor, wenn du sie aus deiner Mitschrift ableiten lässt.", "KI prüft, ob deine Zusammenfassung das Wichtigste enthält."],
      tools: ["GoodNotes oder Notability mit Cornell-Vorlage auf dem iPad", KI_STANDARD + " zur Kontrolle"],
      prompts: [
        "Hier ist meine Mitschrift: [Text]. Schlage mir 5 Fragen für die Fragenspalte einer Cornell-Notiz vor. Prüfe außerdem meine Zusammenfassung: [Zusammenfassung]. Fehlt etwas Wichtiges?"
      ],
      grenzen: "Formuliere zuerst eigene Fragen und nutze die KI nur zum Vergleich. Sonst fehlt dir genau der Schritt, in dem du lernst."
    }
  },

  mindmap: {
    definition: "Eine Mindmap ordnet ein Thema bildlich: In der Mitte steht das Hauptthema, davon gehen Äste mit Unterthemen und feinere Zweige mit Details ab. Du arbeitest mit Schlüsselwörtern, Farben und kleinen Symbolen. Eine Mindmap eignet sich gut, um Ideen zu sammeln und einen Überblick zu bekommen.",
    gut: ["Ideen sammeln, zum Beispiel für einen Aufsatz oder eine Präsentation", "Überblick über ein Thema vor dem Lernen", "Wenn du nicht weißt, wo du anfangen sollst"],
    weniger: ["Für Ursache-Wirkungs-Zusammenhänge: Dafür ist eine Concept Map besser", "Als einzige Lernmethode: Wiederhole den Inhalt danach aktiv"],
    schritte: [
      "Schreibe das Thema in die Mitte eines Blattes im Querformat.",
      "Zeichne für jedes Unterthema einen Hauptast und beschrifte ihn mit einem Schlüsselwort.",
      "Ergänze Zweige mit Details, Beispielen und Fachbegriffen.",
      "Nutze Farben für die Hauptäste und kleine Symbole.",
      "Prüfe am Ende: Fehlt ein wichtiger Aspekt?"
    ],
    beispiel: { fach: "Ethik",
      text: "Thema „Was ist ein gutes Leben?“: In der Mitte steht die Frage. Die Hauptäste heißen Glück, Gesundheit, Beziehungen, Freiheit und Sinn. An den Ast Glück hängst du die Positionen aus dem Unterricht, an Beziehungen eigene Beispiele. Die Mindmap nutzt du anschließend als Gliederung für deine Erörterung." },
    ki: {
      ideen: ["KI nennt dir Aspekte, die in deiner Mindmap noch fehlen.", "KI hilft, eine Mindmap in eine Gliederung für einen Text zu übertragen."],
      tools: ["MindNode oder SimpleMind auf dem iPad", "GoodNotes oder Freeform für handgezeichnete Mindmaps", KI_STANDARD + " für Ergänzungen"],
      prompts: [
        "Ich habe eine Mindmap zum Thema [Thema] mit diesen Ästen: [Liste]. Welche wichtigen Aspekte fehlen für die Eingangsklasse? Nenne nur Stichworte, keine fertigen Texte."
      ],
      grenzen: "Erstelle die Mindmap zuerst selbst. Wenn die KI sie für dich anlegt, sparst du dir genau das Nachdenken, das beim Lernen hilft."
    }
  },

  conceptmap: {
    definition: "In einer Concept Map verbindest du Fachbegriffe mit Pfeilen. Anders als bei der Mindmap beschriftest du jeden Pfeil mit der Beziehung, etwa „transportiert“, „besteht aus“ oder „führt zu“. So wird sichtbar, wie Inhalte zusammenhängen, und du merkst schnell, wo dir das Verständnis fehlt.",
    gut: ["Systeme und Abläufe mit vielen Teilen verstehen", "Grundlagen und Vorwissen ordnen", "Wiederholung vor einer Klassenarbeit"],
    weniger: ["Für einfache Listen ohne Zusammenhänge", "Wenn du die Fachbegriffe noch gar nicht kennst"],
    schritte: [
      "Sammle 10 bis 15 zentrale Begriffe zum Thema.",
      "Lege den wichtigsten Begriff oben oder in die Mitte.",
      "Verbinde Begriffe mit Pfeilen und beschrifte jeden Pfeil mit einem Verb.",
      "Lies jede Verbindung als Satz: Ergibt das einen richtigen Satz?",
      "Vergleiche mit dem Schulbuch und ergänze fehlende Verbindungen."
    ],
    beispiel: { fach: "Gesundheit und Biologie (Profilfach)",
      text: "Thema Herz-Kreislauf-System: Du verbindest Herz, Arterien, Venen, Kapillaren, Lunge, Körpergewebe, Sauerstoff und Kohlenstoffdioxid. Ein Pfeil lautet „Herz pumpt Blut in Arterien“, ein anderer „In den Kapillaren gibt das Blut Sauerstoff an das Gewebe ab“. Beim Lesen merkst du, dass du Lungen- und Körperkreislauf vermischt hast. Das korrigierst du." },
    ki: {
      ideen: ["KI prüft, ob deine Verbindungen fachlich stimmen.", "KI nennt dir Begriffe, die in deiner Map fehlen."],
      tools: ["Freeform, GoodNotes oder Excalidraw zum Zeichnen", KI_STANDARD + " zur Kontrolle"],
      prompts: [
        "Hier sind die Verbindungen meiner Concept Map zum Thema [Thema], jeweils als Satz: [Liste]. Prüfe jede Verbindung fachlich. Sag mir, welche falsch oder ungenau sind, und gib mir einen Hinweis statt der Lösung."
      ],
      grenzen: "Die KI sieht deine Zeichnung nicht immer richtig. Schreib ihr die Verbindungen als Sätze auf und prüfe ihre Rückmeldung mit dem Schulbuch."
    }
  },

  exzerpt: {
    definition: "Beim Exzerpieren hältst du die wichtigsten Aussagen eines Textes in eigenen Worten fest, mit Quellenangabe. Eine Zusammenfassung ist kürzer und gibt den Kern wieder. Beides hilft vor allem dann, wenn du danach mit deinem Text weiterarbeitest, ihn etwa als Grundlage zum Abfragen nutzt.",
    gut: ["Lange Sachtexte für Referate oder Hausarbeiten aufbereiten", "Texte für eine Textanalyse oder Erörterung erschließen", "Lernzettel vorbereiten"],
    weniger: ["Wenn du nur abschreibst statt umzuformulieren", "Als alleinige Vorbereitung auf eine Klassenarbeit: Dazu kommt Abrufen"],
    schritte: [
      "Lies den Text einmal ganz und notiere das Thema.",
      "Lies ihn Abschnitt für Abschnitt und schreibe zu jedem die Kernaussage in eigenen Worten auf.",
      "Notiere die Quelle und bei Zitaten die Seitenzahl.",
      "Fasse den ganzen Text in fünf bis sieben Sätzen zusammen.",
      "Formuliere zwei Fragen zum Text, mit denen du dich später abfragst."
    ],
    beispiel: { fach: "Deutsch",
      text: "Du bereitest eine Erörterung zum Thema Handynutzung an Schulen vor. Aus einem Zeitungsartikel exzerpierst du die drei Hauptargumente der Autorin mit Belegen und Zeilenangaben. In deiner Zusammenfassung stellst du ihre Position in fünf Sätzen dar. Das Exzerpt nutzt du später als Material für deine Argumentation." },
    ki: {
      ideen: ["KI vergleicht deine Zusammenfassung mit dem Originaltext und sagt dir, was fehlt.", "KI hilft dir, die Struktur eines schwierigen Textes zu erkennen."],
      tools: [KI_STANDARD, "NotebookLM für Fragen zu langen Texten"],
      prompts: [
        "Hier ist ein Text: [Text]. Und hier ist meine Zusammenfassung: [Zusammenfassung]. Prüfe, ob ich die Kernaussagen richtig und vollständig wiedergegeben habe. Schreibe die Zusammenfassung nicht für mich neu."
      ],
      grenzen: "KI-Zusammenfassungen klingen gut, lassen aber oft Wichtiges weg oder erfinden Inhalte. Eine Zusammenfassung von der KI ersetzt nicht das eigene Lesen. Bei Hausarbeiten und Referaten gelten außerdem die Regeln eurer Lehrkraft zum Einsatz von KI."
    }
  },

  sq3r: {
    definition: "SQ3R ist eine Lesemethode für Fachtexte in fünf Schritten: Survey (Überblick), Question (Fragen), Read (Lesen), Recite (Wiedergeben) und Review (Wiederholen). Du liest nicht einfach drauflos, sondern mit Fragen im Kopf. Dadurch liest du aufmerksamer und behältst mehr.",
    gut: ["Lange oder schwierige Fachtexte und Schulbuchkapitel", "Wenn du beim Lesen abschweifst", "Wenn du nach dem Lesen nicht mehr weißt, was drinstand"],
    weniger: ["Für kurze Texte: Da reichen Lesen und Wiedergeben", "Für literarische Texte, bei denen es um Deutung geht"],
    schritte: [
      "Survey: Überfliege Überschriften, Bilder, fett Gedrucktes und die Zusammenfassung.",
      "Question: Mache aus jeder Überschrift eine Frage.",
      "Read: Lies Abschnitt für Abschnitt und suche Antworten auf deine Fragen.",
      "Recite: Sag oder schreibe nach jedem Abschnitt die Antwort aus dem Gedächtnis auf.",
      "Review: Beantworte am Ende alle Fragen noch einmal, ohne in den Text zu schauen."
    ],
    beispiel: { fach: "Religion",
      text: "Thema Menschenwürde: Du überfliegst einen Text mit den Zwischenüberschriften „Biblische Wurzeln“, „Artikel 1 des Grundgesetzes“ und „Menschenwürde in der Pflege“. Daraus machst du Fragen wie „Was hat Artikel 1 mit der Bibel zu tun?“. Nach jedem Abschnitt beantwortest du die Frage mit geschlossenem Buch. Am Ende kannst du alle drei Fragen beantworten." },
    ki: {
      ideen: ["KI hilft dir, aus Überschriften gute Fragen zu formulieren.", "KI prüft deine Antworten aus dem Gedächtnis gegen den Text."],
      tools: ["NotebookLM: Fragen direkt zum hochgeladenen Text", KI_STANDARD],
      prompts: [
        "Hier ist ein Fachtext: [Text]. Ich habe nach SQ3R diese Fragen formuliert: [Fragen]. Ich beantworte sie jetzt aus dem Gedächtnis: [Antworten]. Sag mir, welche Antworten stimmen und wo ich nochmal in den Text schauen sollte."
      ],
      grenzen: "Lass dir den Text nicht von der KI zusammenfassen, bevor du ihn gelesen hast. Dann überspringst du die Schritte, die SQ3R wirksam machen."
    }
  },

  /* ======================= METAKOGNITIV / SRL ======================= */

  smart: {
    definition: "Ein SMART-Ziel ist ein Lernziel, das spezifisch, messbar, attraktiv, realistisch und terminiert ist. Aus „Ich muss mehr für Spanisch tun“ wird ein konkretes Vorhaben, das du überprüfen kannst. Klare Ziele erleichtern das Anfangen und machen deinen Fortschritt sichtbar.",
    gut: ["Zu Beginn einer Lernphase oder vor einer Klassenarbeit", "Wenn du dich nicht aufraffen kannst oder nicht weißt, wo du anfangen sollst", "Um ein großes Ziel in Etappen zu zerlegen"],
    weniger: ["Wenn das Ziel nur „eine gute Note“ lautet: Die Note hast du nicht direkt in der Hand, dein Lernverhalten schon"],
    schritte: [
      "Schreibe dein Ziel so auf, wie es dir einfällt.",
      "S – spezifisch: Welches Thema, welche Fähigkeit genau?",
      "M – messbar: Woran erkennst du, dass du es geschafft hast?",
      "A – attraktiv: Warum ist dir das wichtig?",
      "R – realistisch: Passt es in deine Woche? Wenn nicht, mach es kleiner.",
      "T – terminiert: Bis wann? Prüfe am Termin, ob du das Ziel erreicht hast und woran es lag."
    ],
    beispiel: { fach: "Spanisch",
      text: "Vorher: „Ich will in Spanisch besser werden.“ Als SMART-Ziel: „Bis Freitag in zwei Wochen kann ich die 60 Vokabeln der aktuellen Lektion ohne Hilfe ins Spanische übersetzen. Dafür übe ich montags, mittwochs und freitags je 15 Minuten mit Karteikarten. Am Freitag teste ich mich selbst und will mindestens 50 richtig haben, weil ich im mündlichen Teil frei sprechen möchte.“" },
    ki: {
      ideen: ["KI hilft dir, ein vages Ziel in ein SMART-Ziel umzuformulieren.", "KI zerlegt ein großes Ziel in Wochenetappen.", "KI prüft, ob dein Ziel realistisch ist, wenn du ihr deine verfügbare Zeit nennst."],
      tools: [KI_STANDARD + " als Coach für die Zielformulierung", "Erinnerungen, Microsoft To Do oder Google Tasks für Teilziele mit Termin"],
      prompts: [
        "Hilf mir, aus diesem Lernziel ein SMART-Ziel zu machen: [Ziel]. Stelle mir zu jedem Buchstaben S, M, A, R und T eine Frage und warte jeweils auf meine Antwort. Formuliere am Ende das fertige Ziel in einem Satz.",
        "Mein Ziel: [SMART-Ziel]. Ich habe pro Woche etwa [Anzahl] Stunden Zeit zum Lernen. Teile das Ziel in Wochenetappen auf und sag mir ehrlich, ob es realistisch ist."
      ],
      grenzen: "Die KI kennt deinen Alltag, deine Stärken und euren Unterricht nicht. Entscheide selbst, was realistisch ist. Ein Ziel, das die KI für dich schreibt, ohne dass du selbst nachdenkst, motiviert kaum."
    }
  },

  lerntagebuch: {
    definition: "In einem Lerntagebuch hältst du nach jeder Lerneinheit kurz fest, was du gelernt hast, was schwierig war und wie du weitermachst. Leitfragen helfen dir dabei. So beobachtest du dein eigenes Lernen und erkennst, welche Strategien bei dir funktionieren. Das ist der Kern des selbstregulierten Lernens.",
    gut: ["Nach jeder Lerneinheit und nach jeder Klassenarbeit", "Wenn du nicht weißt, warum es nicht läuft", "Um Fortschritte sichtbar zu machen und motiviert zu bleiben"],
    weniger: ["Wenn du nur aufschreibst, was du gemacht hast, ohne zu bewerten", "Als lange Pflichtübung: Fünf Minuten reichen"],
    schritte: [
      "Lege ein Heft oder eine Notiz auf dem iPad an.",
      "Notiere nach dem Lernen Datum, Fach und Dauer.",
      "Beantworte drei Fragen: Was habe ich gelernt? Was war schwierig? Was mache ich als Nächstes?",
      "Bewerte deine Konzentration und dein Verständnis von 1 bis 5.",
      "Lies einmal pro Woche deine Einträge und ziehe eine Schlussfolgerung."
    ],
    beispiel: { fach: "Naturwissenschaften (Chemie)",
      text: "Thema Atombau: Nach der Lerneinheit schreibst du: „45 Minuten, Schalenmodell und Valenzelektronen. Schwierig: wie viele Elektronen auf welche Schale passen. Verständnis 3 von 5. Nächstes Mal: zuerst die Regel aufschreiben, dann fünf Elemente selbst zeichnen.“ Am Wochenende siehst du: Abends nach dem Sport war deine Konzentration immer schlecht. Du verlegst das Lernen auf den Nachmittag." },
    ki: {
      ideen: ["KI stellt dir am Ende der Lerneinheit Reflexionsfragen.", "KI hilft dir, in mehreren Einträgen Muster zu erkennen."],
      tools: ["Notizen-App oder GoodNotes auf dem iPad", KI_STANDARD + " als Reflexionspartner"],
      prompts: [
        "Ich habe gerade [Dauer] Minuten [Fach] gelernt. Stell mir nacheinander drei kurze Reflexionsfragen zu meinem Lernen: was gut lief, was schwierig war und was ich ändern will. Warte jeweils auf meine Antwort und fasse am Ende meine nächsten Schritte in zwei Sätzen zusammen."
      ],
      grenzen: "Dein Lerntagebuch gehört dir. Gib der KI keine persönlichen Informationen, die du nicht teilen möchtest. Die Schlussfolgerungen ziehst am besten du selbst."
    }
  },

  checkliste: {
    definition: "Eine Selbsttest-Checkliste listet alle Inhalte einer Klassenarbeit als Ich-kann-Sätze auf. Du prüfst bei jedem Satz ehrlich, ob du es schon kannst, am besten mit einer kleinen Testaufgabe. So siehst du genau, was noch fehlt. Unsicherheit wird zu einer überschaubaren Liste.",
    gut: ["Ein bis zwei Wochen vor der Klassenarbeit", "Bei Prüfungsangst: Klarheit über den Stand beruhigt", "Um die Lernzeit gezielt auf Lücken zu verteilen"],
    weniger: ["Wenn du nur abhakst, ohne dich wirklich zu testen", "Wenn die Themen der Klassenarbeit unklar sind: dann erst nachfragen"],
    schritte: [
      "Schreibe alle Themen der Klassenarbeit auf. Nutze dafür Hefteinträge und Hinweise der Lehrkraft.",
      "Formuliere zu jedem Thema einen Ich-kann-Satz.",
      "Teste dich zu jedem Satz mit einer kurzen Aufgabe.",
      "Markiere: sicher, unsicher oder kann ich nicht.",
      "Plane die Lernzeit zuerst für die unsicheren Punkte und prüfe die Liste nach einigen Tagen erneut."
    ],
    beispiel: { fach: "Gesundheit und Biologie (Profilfach)",
      text: "Klassenarbeit zum Thema Ernährung: Deine Liste lautet unter anderem „Ich kann die Aufgaben von Kohlenhydraten, Fetten und Proteinen erklären“, „Ich kann den Energiebedarf berechnen“ und „Ich kann eine Ernährungsempfehlung begründen“. Beim Testen merkst du: Die Berechnung klappt nicht. Darauf konzentrierst du dich in den nächsten zwei Lerneinheiten." },
    ki: {
      ideen: ["KI formuliert aus deinen Themen Ich-kann-Sätze.", "KI erstellt zu jedem Ich-kann-Satz eine kurze Testaufgabe."],
      tools: [KI_STANDARD, "Notizen-App mit Checklisten-Funktion"],
      prompts: [
        "Diese Themen kommen in meiner Klassenarbeit in [Fach] dran: [Liste]. Formuliere daraus Ich-kann-Sätze und gib mir zu jedem eine kurze Testaufgabe. Die Lösungen bekomme ich erst, wenn ich darum bitte."
      ],
      grenzen: "Die KI weiß nicht, was eure Lehrkraft wirklich abfragt. Gleiche die Liste mit deinem Heft und den Hinweisen aus dem Unterricht ab."
    }
  },

  wenndann: {
    definition: "Ein Wenn-dann-Plan legt genau fest, wann, wo und wie du etwas tust: „Wenn Situation X eintritt, dann mache ich Y.“ Die Entscheidung ist damit schon vorher gefallen, und du musst dich nicht jedes Mal neu aufraffen. In der Forschung heißen solche Pläne Implementierungsintentionen. Sie helfen nachweislich gegen Aufschieben.",
    gut: ["Gegen Aufschieben", "Um feste Lerngewohnheiten aufzubauen", "Für typische Störungen: Wenn mein Handy vibriert, dann …"],
    weniger: ["Wenn der Plan zu vage bleibt, etwa „Wenn ich Zeit habe, lerne ich“", "Für zu viele Vorhaben auf einmal: Beginne mit ein bis zwei Plänen"],
    schritte: [
      "Wähle ein Ziel, zum Beispiel regelmäßig lernen.",
      "Suche eine feste Situation im Alltag, die sicher eintritt.",
      "Formuliere: Wenn [Situation], dann [konkrete Handlung].",
      "Plane auch für ein Hindernis: Wenn [Störung], dann [Reaktion].",
      "Schreib die Pläne auf und prüfe nach einer Woche, ob sie funktionieren."
    ],
    beispiel: { fach: "Sport",
      text: "In Sporttheorie lernst du die Trainingsprinzipien. Dein Plan: „Wenn ich dienstags vom Training nach Hause komme und geduscht habe, dann lerne ich 20 Minuten Sporttheorie am Schreibtisch.“ Dazu ein Plan für das Hindernis: „Wenn ich zu müde bin, dann mache ich wenigstens zehn Minuten Karteikarten.“" },
    ki: {
      ideen: ["KI hilft dir, vage Vorsätze in konkrete Wenn-dann-Pläne umzuformulieren.", "KI fragt nach typischen Hindernissen und schlägt Gegenpläne vor."],
      tools: [KI_STANDARD, "Erinnerungen-App mit Ortshinweis oder Uhrzeit"],
      prompts: [
        "Mein Vorsatz ist: [Vorsatz]. Hilf mir, daraus zwei konkrete Wenn-dann-Pläne zu machen. Frag mich zuerst nach meinem Tagesablauf und nach typischen Hindernissen."
      ],
      grenzen: "Nur du kennst deinen Alltag. Prüfe, ob die Situation wirklich regelmäßig eintritt, sonst funktioniert der Plan nicht."
    }
  },

  lernvertrag: {
    definition: "In einem Lernvertrag mit dir selbst hältst du schriftlich fest, was du bis wann schaffen willst, wie du vorgehst und womit du dich belohnst. Die Unterschrift macht das Vorhaben verbindlicher. Noch stärker wirkt der Vertrag, wenn eine Lernpartnerin oder ein Lernpartner mit unterschreibt und nachfragt.",
    gut: ["Wenn dir Motivation fehlt oder du Vorhaben oft aufgibst", "Für Lernvorhaben über mehrere Wochen", "Zusammen mit einem Lerntandem"],
    weniger: ["Wenn die Ziele unrealistisch sind: Dann führt der Vertrag zu Frust", "Als einziges Mittel ohne konkreten Plan"],
    schritte: [
      "Formuliere ein konkretes Ziel mit Termin.",
      "Schreibe auf, wann und wie du lernst.",
      "Lege eine Belohnung fest, die du dir erst nach dem Erreichen gönnst.",
      "Unterschreibe, am besten zusammen mit einer Person, die nachfragen darf.",
      "Prüfe am Termin, ob du den Vertrag eingehalten hast, und passe ihn bei Bedarf an."
    ],
    beispiel: { fach: "Naturwissenschaften (Physik)",
      text: "„Ich, Lena, kann bis zur Klassenarbeit am Ende des Monats Aufgaben zur gleichförmigen Bewegung sicher lösen. Dafür rechne ich jeden Montag und Donnerstag je fünf Aufgaben aus dem Buch. Mein Lernpartner Jonas fragt mich jeden Freitag nach meinem Stand. Wenn ich alle Termine schaffe, gehe ich am Wochenende nach der Arbeit ins Kino.“" },
    ki: {
      ideen: ["KI hilft dir, einen Vertrag mit realistischen Zielen zu formulieren.", "KI erinnert dich an die Bausteine eines guten Vertrags."],
      tools: [KI_STANDARD, "Notizen-App oder Papier zum Unterschreiben"],
      prompts: [
        "Hilf mir, einen Lernvertrag mit mir selbst zu schreiben. Mein Ziel: [Ziel] bis [Termin]. Frag mich nacheinander nach Vorgehen, Lernzeiten, Belohnung und einer Person, die mich unterstützt. Formuliere den Vertrag am Ende kurz in der Ich-Form."
      ],
      grenzen: "Der Vertrag wirkt nur, wenn er von dir kommt. Nutze die KI zum Strukturieren, nicht um Ziele für dich festzulegen."
    }
  },

  ampel: {
    definition: "Bei der Ampel-Selbsteinschätzung markierst du jedes Thema mit einer Farbe: Grün heißt „kann ich sicher“, Gelb „teilweise“, Rot „kann ich noch nicht“. So siehst du auf einen Blick, wo du stehst und wo du anfangen solltest. Wiederholst du die Einschätzung nach einigen Tagen, wird dein Fortschritt sichtbar.",
    gut: ["Zu Beginn der Vorbereitung auf eine Klassenarbeit", "Wenn du nicht weißt, wo du anfangen sollst", "Bei Prüfungsangst: Rot wird mit der Zeit zu Gelb und Grün"],
    weniger: ["Wenn du nur nach Gefühl einschätzt: Prüfe dich mit einer kleinen Aufgabe", "Für sehr kleine Themen ohne Unterpunkte"],
    schritte: [
      "Liste alle Themen oder Kompetenzen auf.",
      "Teste dich zu jedem Thema kurz, zum Beispiel mit einer Aufgabe.",
      "Markiere jedes Thema grün, gelb oder rot.",
      "Lerne zuerst die roten, dann die gelben Themen.",
      "Wiederhole die Ampel nach einigen Tagen und vergleiche."
    ],
    beispiel: { fach: "Gesundheit und Biologie (Profilfach)",
      text: "Thema Immunsystem: Unspezifische Abwehr ist grün. Die Aufgaben von Fresszellen und B-Zellen sind gelb, weil du sie manchmal verwechselst. Das Prinzip der Impfung ist rot. Du beginnst mit der Impfung und erklärst sie einer Mitschülerin. Eine Woche später ist sie gelb, die Abwehrzellen sind grün." },
    ki: {
      ideen: ["KI stellt dir zu jedem Thema eine Testfrage, damit du nicht nur nach Gefühl einschätzt.", "KI erstellt aus deiner Ampel einen Lernplan."],
      tools: [KI_STANDARD, "GoodNotes oder Notizen-App mit farbigen Markierungen"],
      prompts: [
        "Meine Themen für [Fach]: [Liste]. Stelle mir zu jedem Thema eine kurze Testfrage. Ordne meine Antworten danach als grün, gelb oder rot ein und begründe kurz. Erstelle mir dann eine Reihenfolge zum Lernen."
      ],
      grenzen: "Ob ein Thema wirklich grün ist, zeigt sich erst, wenn du es ohne Hilfe kannst. Eine KI-Einschätzung ist nur ein Hinweis."
    }
  },

  /* ======================= ZEIT & RESSOURCEN ======================= */

  pomodoro: {
    definition: "Die Pomodoro-Technik teilt Lernzeit in feste Blöcke: 25 Minuten konzentriert arbeiten, dann 5 Minuten Pause. Nach vier Blöcken folgt eine längere Pause von 15 bis 30 Minuten. Kurze, überschaubare Einheiten erleichtern das Anfangen und schützen vor Ablenkung. Der Name kommt von einer Küchenuhr in Tomatenform.",
    gut: ["Wenn du aufschiebst, weil dir eine Aufgabe zu groß erscheint", "Wenn du dich leicht ablenken lässt", "Für Übungsaufgaben, Vokabeln und Zusammenfassungen"],
    weniger: ["Für Aufgaben, die langes Eindenken brauchen: Verlängere die Blöcke dann auf 45 bis 50 Minuten", "Wenn du gerade gut im Fluss bist: Dann arbeite ruhig weiter"],
    schritte: [
      "Wähle eine konkrete Aufgabe aus.",
      "Lege das Handy in einen anderen Raum oder schalte den Fokus-Modus ein.",
      "Stelle einen Timer auf 25 Minuten und arbeite nur an dieser Aufgabe.",
      "Kommt ein ablenkender Gedanke, notiere ihn auf einem Zettel und arbeite weiter.",
      "Mach 5 Minuten Pause: aufstehen, trinken, nicht ans Handy.",
      "Nach vier Runden machst du eine längere Pause. Notiere, wie viele Blöcke du geschafft hast."
    ],
    beispiel: { fach: "Mathematik",
      text: "Vorbereitung auf die Klassenarbeit zu quadratischen Funktionen. Block 1: fünf Aufgaben zur Scheitelpunktform. Block 2: Nullstellen mit der Mitternachtsformel. Block 3: Fehler aus Block 1 und 2 nacharbeiten. Block 4: eine alte Klassenarbeitsaufgabe unter Zeitdruck. Nach rund zwei Stunden hast du konzentriert gearbeitet und siehst genau, was du geschafft hast." },
    ki: {
      ideen: ["KI teilt deinen Lernstoff in Pakete auf, die jeweils in 25 Minuten machbar sind.", "KI erstellt für jeden Block eine passende Übungsaufgabe.", "Nach der Lerneinheit hilft dir KI beim Auswerten, was gut lief."],
      tools: [KI_STANDARD + " zum Planen der Blöcke", "Fokus-Modus und Bildschirmzeit auf dem iPad, die Timer-App", "Pomodoro-Apps wie Forest oder Focus To-Do"],
      prompts: [
        "Ich habe heute 2 Stunden für [Fach] zum Thema [Thema]. Mein Material: [Liste]. Teile das in vier Blöcke zu je 25 Minuten auf. Jeder Block soll eine klare Aufgabe haben, bei der ich am Ende prüfen kann, ob ich sie geschafft habe.",
        "Ich habe gerade [Anzahl] Pomodoro-Blöcke geschafft. Erledigt habe ich: [Liste]. Abgelenkt hat mich: [Liste]. Stell mir drei kurze Fragen, damit ich meine nächste Lerneinheit verbessern kann."
      ],
      grenzen: "Der Chat mit der KI kann selbst zur Ablenkung werden. Plane mit der KI vor dem ersten Block, nicht währenddessen."
    }
  },

  eisenhower: {
    definition: "Die Eisenhower-Matrix sortiert Aufgaben in vier Felder nach zwei Fragen: Ist es wichtig? Ist es dringend? Wichtiges und Dringendes erledigst du sofort. Wichtiges, aber nicht Dringendes planst du fest ein. Dringendes, aber Unwichtiges hältst du kurz. Was weder wichtig noch dringend ist, lässt du weg.",
    gut: ["Wenn viele Aufgaben gleichzeitig anstehen", "Wenn du das Gefühl hast, keine Zeit zu haben", "Für die Wochenplanung neben Schule, Job und Hobbys"],
    weniger: ["Für eine einzelne große Aufgabe: Dann besser in Schritte zerlegen", "Wenn du alles als wichtig und dringend einstufst"],
    schritte: [
      "Schreibe alle Aufgaben der Woche auf.",
      "Zeichne vier Felder: wichtig und dringend, wichtig und nicht dringend, dringend und nicht wichtig, weder noch.",
      "Ordne jede Aufgabe einem Feld zu.",
      "Trage die wichtigen, nicht dringenden Aufgaben als feste Termine ein.",
      "Streiche oder verkürze Aufgaben aus dem vierten Feld."
    ],
    beispiel: { fach: "Fächerübergreifend",
      text: "In deiner Woche stehen an: GuB-Klassenarbeit am Donnerstag, Deutsch-Referat in drei Wochen, Schicht im Nebenjob, Serie weiterschauen und eine Nachricht im Klassenchat beantworten. Die Klassenarbeit ist wichtig und dringend. Das Referat ist wichtig, aber nicht dringend: Du planst zwei feste Termine dafür ein. Den Chat beantwortest du kurz. Die Serie verschiebst du aufs Wochenende." },
    ki: {
      ideen: ["KI hilft beim Einordnen, wenn du unsicher bist.", "KI erstellt aus der Matrix einen Wochenplan."],
      tools: [KI_STANDARD, "Microsoft To Do, Erinnerungen oder Notion mit Prioritäten"],
      prompts: [
        "Das sind meine Aufgaben diese Woche mit Fristen: [Liste]. Ordne sie in eine Eisenhower-Matrix ein und begründe kurz. Frag nach, wenn du nicht weißt, wie wichtig mir etwas ist."
      ],
      grenzen: "Was für dich wichtig ist, entscheidest du. Die KI kann nur nach Fristen gehen und kennt deine Prioritäten nicht."
    }
  },

  rueckwaerts: {
    definition: "Beim Rückwärtsplanen startest du beim Termin der Klassenarbeit und planst zurück bis heute: Wann muss welches Thema sitzen, wann wiederholst du, wann testest du dich? Einen Puffer für Unvorhergesehenes planst du gleich mit ein. So siehst du früh, ob die Zeit reicht, und vermeidest das Lernen in letzter Minute.",
    gut: ["Sobald der Termin einer Klassenarbeit feststeht", "Bei mehreren Prüfungen kurz hintereinander", "Wenn du sonst erst kurz vor knapp anfängst"],
    weniger: ["Wenn nur noch ein bis zwei Tage bleiben: Dann gezielt die wichtigsten Lücken schließen"],
    schritte: [
      "Trage den Termin der Klassenarbeit ein.",
      "Plane den Tag davor als Puffer und für leichtes Wiederholen.",
      "Plane davor eine Probeklausur oder einen großen Selbsttest.",
      "Verteile die Themen rückwärts auf die verbleibenden Tage.",
      "Plane für jedes Thema mindestens eine Wiederholung ein und hake Erledigtes ab."
    ],
    beispiel: { fach: "Gesundheit und Biologie (Profilfach)",
      text: "Die Klassenarbeit zum Thema Zelle ist in drei Wochen. Der Tag davor ist Puffer. Fünf Tage vorher machst du eine Probeklausur mit alten Aufgaben. In der zweiten Woche wiederholst du Membran und Stofftransport. In der ersten Woche lernst du Zellorganellen sowie den Vergleich von Pflanzen- und Tierzelle. Schon heute weißt du, was am Mittwoch dran ist." },
    ki: {
      ideen: ["KI erstellt einen Rückwärtsplan aus Termin, Themen und deiner verfügbaren Zeit.", "KI passt den Plan an, wenn etwas dazwischenkommt."],
      tools: [KI_STANDARD, "Kalender-App auf dem iPad", "Der Lernzeitplaner im Lernbuddy (folgt)"],
      prompts: [
        "Meine Klassenarbeit in [Fach] ist am [Datum]. Themen: [Liste]. Ich kann an diesen Tagen lernen: [Tage und Zeiten]. Erstelle mir einen Rückwärtsplan mit einem Puffertag, einem Selbsttest und Wiederholungen für jedes Thema."
      ],
      grenzen: "Die KI kennt deine Termine und deine Energie nicht. Passe den Plan an deinen Alltag an und trage ihn selbst in den Kalender ein."
    }
  },

  wochenplan: {
    definition: "In einem Wochenplan trägst du feste Lernzeiten wie Termine ein, neben Unterricht, Nebenjob, Sport und Freizeit. Du siehst, wie viel Zeit wirklich bleibt, und Lernen bekommt einen festen Platz. Am Ende der Woche prüfst du, was geklappt hat, und passt den Plan an.",
    gut: ["Wenn du das Gefühl hast, nie Zeit zu haben", "Um regelmäßiges Lernen zur Gewohnheit zu machen", "Bei vielen Verpflichtungen neben der Schule"],
    weniger: ["Wenn der Plan zu voll ist und keine Pausen enthält", "Wenn du ihn nie anschaust: Hänge ihn sichtbar auf oder nutze Erinnerungen"],
    schritte: [
      "Trage alle festen Termine der Woche ein: Unterricht, Arbeit, Sport, Familie.",
      "Suche freie Zeitfenster und markiere drei bis fünf feste Lernzeiten.",
      "Lege für jede Lernzeit Fach und Aufgabe fest.",
      "Plane auch bewusst freie Zeit ein.",
      "Prüfe am Sonntag: Was hat geklappt? Was ändere ich?"
    ],
    beispiel: { fach: "Sondergebiete der Ernährung",
      text: "Du arbeitest dienstags und samstags im Nebenjob und hast mittwochs Training. Feste Lernzeiten: Montag 16 bis 17 Uhr GuB, Donnerstag 15 bis 16 Uhr Ernährung, Freitag 14 bis 14.30 Uhr Vokabeln. Am Donnerstag wiederholst du die Nährstoffgruppen und die Empfehlungen der Deutschen Gesellschaft für Ernährung. Am Sonntag siehst du: Freitag klappt nie. Du verschiebst die Vokabeln auf den Montagabend." },
    ki: {
      ideen: ["KI hilft dir, aus deinen Terminen einen realistischen Wochenplan zu bauen.", "KI schlägt dir bei Überlastung vor, was du verschieben kannst."],
      tools: ["Kalender-App auf dem iPad mit wiederkehrenden Terminen", KI_STANDARD],
      prompts: [
        "Hier sind meine festen Termine diese Woche: [Liste]. Ich möchte etwa [Stunden] Stunden lernen, verteilt auf [Fächer]. Schlage mir einen Wochenplan mit festen Lernzeiten vor. Plane auch Pausen und freie Abende ein."
      ],
      grenzen: "Gib der KI nur die Termine, keine privaten Details. Ob ein Plan funktioniert, merkst du erst beim Ausprobieren."
    }
  },

  umgebung: {
    definition: "Deine Lernumgebung beeinflusst, wie gut du dich konzentrierst. Ein fester Lernplatz, der aufgeräumt, ruhig und gut beleuchtet ist und an dem alles griffbereit liegt, signalisiert deinem Gehirn: Jetzt wird gelernt. Wer immer am selben Platz lernt, kommt schneller in die Arbeit.",
    gut: ["Bei Konzentrationsproblemen", "Wenn du oft im Bett oder vor dem Fernseher lernst", "Um eine Lernroutine aufzubauen"],
    weniger: ["Wenn du zu Hause keinen ruhigen Platz hast: Dann eine Bibliothek oder einen freien Raum in der Schule nutzen"],
    schritte: [
      "Wähle einen festen Platz zum Lernen, nicht das Bett.",
      "Räume alles weg, was du für die aktuelle Aufgabe nicht brauchst.",
      "Lege Material, Getränk und Stifte bereit, bevor du anfängst.",
      "Sorge für gutes Licht und frische Luft.",
      "Nutze den Platz möglichst nur zum Lernen."
    ],
    beispiel: { fach: "Musik",
      text: "Du lernst Musiktheorie, also Intervalle und Akkorde, bisher auf dem Sofa mit laufendem Fernseher. Neu: Am Schreibtisch liegen nur Heft, Notenblatt und das iPad mit einer Gehörbildungs-App. Die Kopfhörer nutzt du nur für die Hörübungen, nicht für Musik nebenbei. Nach einer Woche merkst du, dass du Intervalle schneller erkennst." },
    ki: {
      ideen: ["KI gibt dir Tipps, wie du deinen Lernplatz mit wenig Aufwand verbesserst.", "KI hilft dir, eine Startroutine für das Lernen zu entwickeln."],
      tools: [KI_STANDARD, "Fokus-Modus auf dem iPad"],
      prompts: [
        "Ich lerne meistens [Ort] und werde oft abgelenkt durch [Ablenkungen]. Gib mir fünf konkrete, kostenlose Ideen, wie ich meine Lernumgebung verbessern kann, und eine kurze Routine für den Start ins Lernen."
      ],
      grenzen: "Allgemeine Tipps passen nicht immer zu deiner Wohnsituation. Probiere aus, was bei dir funktioniert."
    }
  },

  ablenkung: {
    definition: "Schon ein Handy, das in Sichtweite liegt, kann die Aufmerksamkeit binden. Ablenkungen zu reduzieren heißt, Störquellen vor dem Lernen auszuschalten, statt ihnen währenddessen zu widerstehen. Dazu gehören das Handy in einem anderen Raum, ausgeschaltete Benachrichtigungen und nur die Apps, die du wirklich brauchst.",
    gut: ["Wenn du beim Lernen ständig aufs Handy schaust", "Wenn du am iPad lernst und zwischen Apps hin- und herspringst", "In Kombination mit Pomodoro"],
    weniger: ["Wenn du das Handy wirklich brauchst, etwa für Vokabel-Apps: Dann nur diese App und Fokus-Modus"],
    schritte: [
      "Leg das Handy in einen anderen Raum oder in eine Tasche außer Sichtweite.",
      "Aktiviere auf dem iPad den Fokus-Modus „Lernen“ mit erlaubten Apps.",
      "Schließe alle Tabs und Apps, die du nicht brauchst.",
      "Sag Mitbewohnern oder Familie, wann du lernst.",
      "Notiere nach dem Lernen, wie oft du abgelenkt warst, und vergleiche über die Woche."
    ],
    beispiel: { fach: "Informationstechnik (IT)",
      text: "Du übst Tabellenkalkulation am iPad und wechselst immer wieder zu Instagram. Du richtest einen Fokus-Modus ein, in dem nur Numbers oder Excel, die Dateien-App und der Browser erlaubt sind. Das Handy liegt in der Küche. Nach 30 Minuten hast du drei Aufgaben zu Formeln gelöst, statt wie sonst eine." },
    ki: {
      ideen: ["KI erklärt dir, wie du Fokus-Modus und Bildschirmzeit auf dem iPad einrichtest.", "KI hilft dir, Ablenkungen in deinem Lerntagebuch auszuwerten."],
      tools: ["Fokus-Modus und Bildschirmzeit auf dem iPad", "Forest-App", KI_STANDARD + " für Anleitungen"],
      prompts: [
        "Erkläre mir Schritt für Schritt, wie ich auf dem iPad einen Fokus-Modus zum Lernen einrichte, in dem nur bestimmte Apps erlaubt sind und Benachrichtigungen stumm sind."
      ],
      grenzen: "Auch ein KI-Chat kann ablenken. Nutze ihn gezielt für eine Aufgabe und schließe ihn danach."
    }
  },

  /* ======================= SOL ======================= */

  lernlandkarte: {
    definition: "Eine Lernlandkarte zeigt alle Themen einer Unterrichtseinheit als Landkarte: Stationen, Wege und Ziele. Du siehst, was zusammengehört, in welcher Reihenfolge du vorgehen kannst und wo du gerade stehst. Die Landkarte gibt dir Orientierung, wenn der Stoff unüberschaubar wirkt.",
    gut: ["Zu Beginn einer neuen Unterrichtseinheit", "Wenn du nicht weißt, wo du anfangen sollst", "Um Lücken in den Grundlagen sichtbar zu machen"],
    weniger: ["Für sehr kleine Themen", "Wenn du die Karte einmal zeichnest und dann nicht mehr nutzt"],
    schritte: [
      "Sammle alle Themen der Einheit aus Heft, Buch oder Kompetenzraster.",
      "Ordne sie als Stationen auf einem Blatt an, die Grundlagen am Anfang.",
      "Verbinde die Stationen mit Wegen, die zeigen, was aufeinander aufbaut.",
      "Markiere, welche Stationen du schon erreicht hast.",
      "Plane deine nächsten zwei Stationen."
    ],
    beispiel: { fach: "Sondergebiete der Biowissenschaften",
      text: "Thema Mikroorganismen: Deine Karte beginnt mit der Station „Was sind Bakterien, Viren und Pilze?“, führt über „Aufbau einer Bakterienzelle“ und „Wachstum und Vermehrung“ bis zur Station „Nutzen und Gefahren im Alltag“. Du markierst die ersten zwei Stationen als erreicht und siehst, dass dir der Unterschied zwischen Bakterien und Viren als Grundlage noch fehlt." },
    ki: {
      ideen: ["KI hilft dir, die Themen einer Einheit sinnvoll zu ordnen.", "KI zeigt dir, welche Grundlagen ein Thema voraussetzt."],
      tools: ["Freeform oder GoodNotes zum Zeichnen", KI_STANDARD],
      prompts: [
        "Das sind die Themen unserer Unterrichtseinheit in [Fach]: [Liste]. In welcher Reihenfolge bauen sie aufeinander auf? Welche Grundlagen brauche ich für jedes Thema? Antworte als einfache Liste, die ich in eine Lernlandkarte übertragen kann."
      ],
      grenzen: "Eure Lehrkraft kann Themen anders anordnen als die KI. Gleiche die Karte mit dem Unterricht ab."
    }
  },

  sandwich: {
    definition: "Beim Sandwich-Prinzip wechseln sich zwei Arten von Phasen ab: In der einen nimmst du Neues auf, etwa durch einen Vortrag, einen Text oder ein Video. In der anderen verarbeitest du es selbst, etwa durch Zusammenfassen, Anwenden oder Diskutieren. Wie bei einem Sandwich liegen die Schichten übereinander. So bleibst du aktiv und konzentriert.",
    gut: ["Für längere Lerneinheiten ab 45 Minuten", "Wenn deine Konzentration beim reinen Zuhören oder Lesen schnell nachlässt", "Beim Lernen mit Erklärvideos"],
    weniger: ["Für sehr kurze Lerneinheiten", "Wenn die Verarbeitungsphasen ausgelassen werden"],
    schritte: [
      "Teile den Stoff in drei bis vier kleine Abschnitte.",
      "Nimm den ersten Abschnitt auf: Lies ihn oder schau ein Video, höchstens 15 Minuten.",
      "Verarbeite ihn: Fasse ihn zusammen, beantworte Fragen oder wende ihn an.",
      "Wiederhole den Wechsel für jeden Abschnitt.",
      "Verbinde am Ende alle Abschnitte in einer kurzen Übersicht."
    ],
    beispiel: { fach: "Deutsch",
      text: "Thema Kommunikationsmodell nach Schulz von Thun: Du schaust ein zehnminütiges Erklärvideo zu den vier Seiten einer Nachricht. Danach analysierst du einen Satz aus deinem Alltag, etwa „Die Ampel ist grün“, nach allen vier Seiten. Dann liest du den Buchabschnitt zum Vier-Ohren-Modell und schreibst zu einem kurzen Dialog, mit welchem Ohr jemand hört." },
    ki: {
      ideen: ["KI erstellt Verarbeitungsaufgaben zu einem Video oder Text.", "KI prüft deine Lösungen der Verarbeitungsphasen."],
      tools: [KI_STANDARD, "NotebookLM für Fragen zu Texten", "Erklärvideos der Lehrkraft oder aus seriösen Quellen"],
      prompts: [
        "Ich lerne gerade [Thema] nach dem Sandwich-Prinzip. Hier ist der Inhalt des ersten Abschnitts: [Text]. Gib mir zwei kurze Aufgaben zum Verarbeiten: eine zum Wiedergeben und eine zum Anwenden auf ein Alltagsbeispiel."
      ],
      grenzen: "Die Verarbeitung musst du selbst leisten. Wenn die KI die Aufgaben auch löst, fehlt die wichtigste Schicht des Sandwichs."
    }
  },

  advance: {
    definition: "Ein Advance Organizer ist eine Vorschau auf ein neues Thema, bevor du die Details lernst: eine Übersicht, eine Grafik oder ein kurzer Text mit den wichtigsten Begriffen und Zusammenhängen. Er dient als Gerüst, an das du die Details später hängst. Das Konzept geht auf den Lernpsychologen David Ausubel zurück.",
    gut: ["Zu Beginn eines neuen Themas", "Wenn dir Vorwissen fehlt", "Wenn dir ein Thema zu groß und unübersichtlich vorkommt"],
    weniger: ["Als Ersatz für das eigentliche Lernen", "Wenn die Übersicht zu detailliert ist"],
    schritte: [
      "Verschaffe dir einen Überblick: Inhaltsverzeichnis, Überschriften, Zusammenfassung des Kapitels.",
      "Notiere die fünf bis acht wichtigsten Begriffe.",
      "Zeichne eine einfache Übersicht, wie sie zusammenhängen.",
      "Überlege: Was weiß ich schon dazu?",
      "Lerne danach die Details und hänge sie an die Übersicht."
    ],
    beispiel: { fach: "Naturwissenschaften (Chemie)",
      text: "Bevor ihr das Periodensystem im Detail behandelt, erstellst du eine Übersicht: Es gibt Perioden (Zeilen) und Hauptgruppen (Spalten), Metalle stehen links, Nichtmetalle rechts, Edelgase ganz rechts. Dazu notierst du, dass die Stellung im Periodensystem etwas mit dem Atombau zu tun hat. Wenn ihr später Valenzelektronen behandelt, weißt du sofort, wo das hingehört." },
    ki: {
      ideen: ["KI erstellt dir eine kurze Vorschau auf ein Thema mit den wichtigsten Begriffen.", "KI fragt dich nach deinem Vorwissen und verknüpft die Vorschau damit."],
      tools: [KI_STANDARD, "Schulbuch: Kapitelübersicht und Zusammenfassung"],
      prompts: [
        "Wir beginnen im Fach [Fach] das Thema [Thema] in der Eingangsklasse eines beruflichen Gymnasiums. Gib mir eine kurze Vorschau mit höchstens acht Kernbegriffen und wie sie zusammenhängen. Frag mich danach, was ich schon über das Thema weiß."
      ],
      grenzen: "Die Vorschau der KI kann von eurem Unterricht abweichen. Vergleiche sie mit dem Inhaltsverzeichnis eures Buchs."
    }
  },

  kompetenzraster: {
    definition: "Ein Kompetenzraster beschreibt in Stufen, was du am Ende einer Einheit können sollst, vom Einstieg bis zur Expertenstufe. Mit einem Lernplan legst du selbst fest, wie du jede Stufe erreichst: mit welchen Aufgaben, Materialien und bis wann. So übernimmst du Verantwortung für dein Lernen und siehst deinen Fortschritt.",
    gut: ["Für längere Unterrichtseinheiten", "Wenn Grundlagen fehlen und du stufenweise aufbauen musst", "In Phasen selbstorganisierten Lernens"],
    weniger: ["Wenn das Raster zu viele Stufen und Kompetenzen hat", "Ohne regelmäßige Selbstüberprüfung"],
    schritte: [
      "Lies das Kompetenzraster und markiere, wo du gerade stehst.",
      "Wähle die nächste Stufe als Ziel.",
      "Plane Aufgaben und Material für diese Stufe.",
      "Lege einen Termin fest und überprüfe dich dann selbst.",
      "Markiere erreichte Stufen und plane die nächste."
    ],
    beispiel: { fach: "Englisch",
      text: "Kompetenz „einen Kommentar schreiben“: Stufe 1 heißt, eine Meinung mit einem Grund nennen. Stufe 2: zwei Argumente mit Beispielen. Stufe 3: Gegenargumente aufgreifen und Redemittel sicher nutzen. Du stehst auf Stufe 2. Dein Plan: Bis nächste Woche lernst du zehn Redemittel für Gegenargumente und schreibst einen Kommentar zum Thema Social Media, den du mit der Checkliste prüfst." },
    ki: {
      ideen: ["KI erstellt Übungsaufgaben passend zu deiner Stufe.", "KI gibt dir Rückmeldung zu deinem Text anhand der Kriterien der Stufe."],
      tools: [KI_STANDARD, "Kompetenzraster eurer Lehrkraft"],
      prompts: [
        "Hier ist mein Text: [Text]. Gib mir Rückmeldung anhand dieser Kriterien: [Kriterien der Stufe]. Nenne zuerst, was schon gut ist, dann höchstens drei Verbesserungen. Schreib den Text nicht für mich um."
      ],
      grenzen: "Bei Texten für die Bewertung gelten die Regeln eurer Lehrkraft zum Einsatz von KI. Rückmeldung holen ist etwas anderes, als den Text schreiben zu lassen."
    }
  },

  /* ======================= KOOPERATIV ======================= */

  tps: {
    definition: "Think-Pair-Share läuft in drei Phasen ab: Erst denkst du allein über eine Frage nach (Think). Dann tauschst du dich mit einer Partnerin oder einem Partner aus (Pair). Zum Schluss stellt ihr eure Ergebnisse der Gruppe oder Klasse vor (Share). Jede Person ist zuerst selbst aktiv, und im Austausch werden die Gedanken genauer.",
    gut: ["Für Fragen ohne eindeutige Antwort", "Um Vorwissen zu aktivieren", "Wenn du dich in großen Gruppen nicht traust, etwas zu sagen"],
    weniger: ["Wenn die Think-Phase übersprungen wird", "Für reine Faktenfragen mit einer einzigen Antwort"],
    schritte: [
      "Think: Denke drei bis fünf Minuten allein nach und notiere Stichworte.",
      "Pair: Stellt euch eure Gedanken gegenseitig vor und ergänzt sie.",
      "Einigt euch auf die zwei wichtigsten Punkte.",
      "Share: Stellt sie der Gruppe vor.",
      "Notiere am Ende, was du durch den Austausch Neues gelernt hast."
    ],
    beispiel: { fach: "Ethik",
      text: "Dilemma: Darf eine Pflegekraft einer Bewohnerin die Wahrheit über ihre Diagnose verschweigen, wenn die Familie darum bittet? Jede Person notiert zuerst allein Argumente. Zu zweit merkt ihr, dass ihr unterschiedliche Werte gewichtet: Ehrlichkeit und Schutz. In der Klasse stellt ihr beide Positionen mit Begründung vor." },
    ki: {
      ideen: ["KI kann als zusätzlicher Gesprächspartner Gegenargumente liefern, wenn du allein übst.", "KI hilft, eigene Notizen vor dem Austausch zu ordnen."],
      tools: [KI_STANDARD],
      prompts: [
        "Ich habe zu dieser Frage nachgedacht: [Frage]. Meine Gedanken: [Notizen]. Nenne mir zwei Gegenargumente oder Perspektiven, an die ich nicht gedacht habe. Formuliere sie als Fragen an mich."
      ],
      grenzen: "Der Austausch mit echten Menschen ist der Kern der Methode. KI ersetzt die Pair-Phase nicht, sie kann sie höchstens vorbereiten."
    }
  },

  puzzle: {
    definition: "Beim Gruppenpuzzle wird ein Thema in Teile zerlegt. Jede Person einer Stammgruppe übernimmt einen Teil und erarbeitet ihn in einer Expertengruppe mit anderen, die denselben Teil haben. Zurück in der Stammgruppe erklärt jede Person ihren Teil den anderen. Am Ende kennen alle das ganze Thema.",
    gut: ["Für Themen, die sich in gleichwertige Teile zerlegen lassen", "Um Verantwortung für einen Teil zu übernehmen", "Wenn dich ein Fach wenig interessiert: Als Expertin oder Experte wirst du gebraucht"],
    weniger: ["Für Themen, die stark aufeinander aufbauen", "Wenn Expertinnen und Experten ihren Teil nicht gut vorbereiten"],
    schritte: [
      "Bildet Stammgruppen mit so vielen Personen, wie es Teilthemen gibt.",
      "Jede Person übernimmt ein Teilthema.",
      "In der Expertengruppe erarbeitet ihr das Teilthema gemeinsam und plant, wie ihr es erklärt.",
      "Zurück in der Stammgruppe erklärt jede Person ihr Teilthema.",
      "Prüft euch zum Schluss gegenseitig mit Fragen zu allen Teilen."
    ],
    beispiel: { fach: "Gesundheit und Biologie (Profilfach)",
      text: "Thema Nährstoffe: In der Stammgruppe übernimmt eine Person Kohlenhydrate, eine Fette, eine Proteine und eine Vitamine und Mineralstoffe. In den Expertengruppen erarbeitet ihr Aufbau, Aufgaben im Körper und Vorkommen in Lebensmitteln und gestaltet ein Infoblatt. Zurück in der Stammgruppe erklärt jede Person ihren Nährstoff. Am Ende stellt ihr gemeinsam einen gesunden Tagesplan zusammen." },
    ki: {
      ideen: ["KI hilft dir als Expertin oder Experte, deinen Teil verständlich aufzubereiten.", "KI erstellt Kontrollfragen für die Stammgruppe."],
      tools: [KI_STANDARD, "Keynote oder Pages für das Infoblatt", "NotebookLM für Material"],
      prompts: [
        "Ich bin Experte für [Teilthema] in einem Gruppenpuzzle zum Thema [Thema]. Hier ist mein Material: [Text]. Hilf mir, die drei wichtigsten Punkte für meine Gruppe herauszufinden, und erstelle drei Kontrollfragen. Ich formuliere die Erklärung selbst."
      ],
      grenzen: "Prüfe Fakten aus der KI mit dem Material eurer Lehrkraft. Deine Gruppe verlässt sich auf deine Erklärung."
    }
  },

  tandem: {
    definition: "Ein Lerntandem besteht aus zwei Personen, die sich regelmäßig zu festen Zeiten zum Lernen treffen. Ihr erklärt euch gegenseitig Stoff, fragt euch ab und erinnert euch an eure Ziele. Die Verabredung macht verbindlich, und beide profitieren: Wer erklärt, lernt dabei selbst, und wer zuhört, bekommt eine neue Perspektive.",
    gut: ["Wenn dir allein die Motivation fehlt", "Gegen Aufschieben durch feste Verabredungen", "Um Lücken in den Grundlagen gemeinsam zu schließen"],
    weniger: ["Wenn die Treffen zum Plaudern werden: Legt vorher Aufgaben fest", "Wenn einer immer nur erklärt und der andere nur zuhört"],
    schritte: [
      "Sucht euch eine Person mit ähnlichem Ziel.",
      "Vereinbart feste Termine, zum Beispiel zweimal pro Woche 45 Minuten.",
      "Legt vor jedem Treffen fest, was ihr bearbeitet.",
      "Wechselt euch beim Erklären und Abfragen ab.",
      "Beendet jedes Treffen mit dem Satz: Bis zum nächsten Mal mache ich …"
    ],
    beispiel: { fach: "Mathematik",
      text: "Aylin kann Gleichungen gut umformen, Max hat Lücken aus der Mittelstufe. Sie treffen sich montags und donnerstags in der Mittagspause. Aylin erklärt Max das Lösen von Gleichungen, Max fragt Aylin dafür Fachbegriffe in GuB ab. Am Ende rechnen beide drei Aufgaben allein und kontrollieren sich gegenseitig." },
    ki: {
      ideen: ["KI erstellt Abfragefragen und Aufgaben für eure Treffen.", "KI hilft, wenn ihr zu zweit bei einer Frage nicht weiterkommt."],
      tools: [KI_STANDARD, "Gemeinsame Notiz oder geteilter Kalender"],
      prompts: [
        "Wir sind ein Lerntandem für [Fach] und treffen uns 45 Minuten zum Thema [Thema]. Erstelle uns einen Ablauf für das Treffen mit Erklärphase, gegenseitigem Abfragen und einer Aufgabe für jeden. Gib uns zehn Abfragefragen ohne Lösungen."
      ],
      grenzen: "Wenn ihr die KI fragt, bevor ihr selbst nachgedacht habt, verliert das Tandem seinen Sinn. Erst gemeinsam überlegen, dann nachfragen."
    }
  },

  placemat: {
    definition: "Bei der Placemat-Methode sitzt eine Gruppe von drei bis vier Personen um ein großes Blatt. Es ist in ein Mittelfeld und so viele Außenfelder geteilt, wie es Personen gibt. Jede Person schreibt zuerst still ihre Gedanken in ihr Feld. Dann lest ihr reihum und einigt euch im Mittelfeld auf das Wichtigste.",
    gut: ["Vorwissen und Ideen sammeln", "Wenn alle zu Wort kommen sollen, auch stillere Personen", "Zum Einstieg in ein neues Thema"],
    weniger: ["Für Themen, zu denen niemand etwas weiß", "Wenn das Mittelfeld nur eine Liste aller Ideen wird"],
    schritte: [
      "Teilt ein großes Blatt in ein Mittelfeld und Außenfelder für jede Person.",
      "Jede Person schreibt drei bis fünf Minuten still in ihr Feld.",
      "Dreht das Blatt, sodass jede Person die Notizen der anderen lesen kann.",
      "Diskutiert und einigt euch auf die drei bis fünf wichtigsten Punkte.",
      "Tragt sie ins Mittelfeld ein und stellt sie vor."
    ],
    beispiel: { fach: "Sozialmanagement",
      text: "Frage: Welche Bedürfnisse haben Menschen, die in einer Pflegeeinrichtung leben? Jede Person notiert eigene Ideen, zum Beispiel Sicherheit, Kontakt zur Familie oder selbst entscheiden können. Im Mittelfeld ordnet ihr die Ideen den Stufen der Bedürfnispyramide nach Maslow zu und wählt die drei wichtigsten für eure Präsentation aus." },
    ki: {
      ideen: ["KI kann nach der Placemat-Runde weitere Perspektiven ergänzen.", "Digitale Placemat auf einem geteilten Board."],
      tools: ["Freeform oder ein geteiltes Whiteboard auf dem iPad", KI_STANDARD + " für Ergänzungen danach"],
      prompts: [
        "Unsere Gruppe hat zu der Frage [Frage] diese Punkte gesammelt: [Liste]. Welche wichtige Perspektive fehlt noch? Nenne höchstens zwei Ergänzungen und begründe sie kurz."
      ],
      grenzen: "Nutzt die KI erst nach eurer eigenen Runde. Die stille Denkphase jeder Person ist der Kern der Methode."
    }
  },

  ldl: {
    definition: "Beim Lernen durch Lehren bereitest du ein Thema so vor, dass du es anderen beibringen kannst, etwa einer Mitschülerin, deiner Lerngruppe oder der Klasse. Schon die Vorbereitung zwingt dich, den Stoff zu ordnen und wirklich zu verstehen. Beim Erklären und bei den Rückfragen merkst du, wo du noch unsicher bist.",
    gut: ["Wenn du ein Thema tief verstehen willst", "Wenn dich ein Fach wenig interessiert: Die Rolle als Lehrende motiviert", "Um Grundlagen zu festigen"],
    weniger: ["Wenn du das Thema selbst noch gar nicht verstanden hast", "Wenn du nur vorliest, statt zu erklären"],
    schritte: [
      "Wähle ein überschaubares Thema.",
      "Lerne es und plane eine Erklärung von fünf bis zehn Minuten mit Beispiel.",
      "Bereite zwei Fragen vor, mit denen du prüfst, ob dein Publikum es verstanden hat.",
      "Erkläre das Thema und beantworte Rückfragen.",
      "Notiere, bei welchen Fragen du unsicher warst, und schlage sie nach."
    ],
    beispiel: { fach: "Gesundheit und Biologie (Profilfach)",
      text: "Thema Blutbestandteile: Du erklärst deiner Lerngruppe rote und weiße Blutkörperchen, Blutplättchen und Blutplasma. Als Bild nutzt du den Vergleich mit einer Stadt: Lieferwagen, Polizei, Reparaturtrupp und Straßen. Bei der Frage, warum Blutplättchen keinen Zellkern haben, gerätst du ins Stocken. Das schlägst du nach und erklärst es beim nächsten Treffen." },
    ki: {
      ideen: ["KI spielt dein Publikum und stellt typische Rückfragen.", "KI prüft deine geplante Erklärung auf Fehler."],
      tools: [KI_STANDARD, "Keynote für eine kurze Präsentation"],
      prompts: [
        "Ich erkläre gleich meiner Lerngruppe das Thema [Thema]. Hier ist meine geplante Erklärung: [Text]. Stelle mir fünf Fragen, die Mitschülerinnen und Mitschüler wahrscheinlich stellen würden. Weise mich auf fachliche Fehler hin."
      ],
      grenzen: "Prüfe die fachliche Rückmeldung der KI mit dem Schulbuch. Du trägst die Verantwortung dafür, dass deine Erklärung stimmt."
    }
  },

  partnerabfrage: {
    definition: "Bei der Partnerabfrage fragt ihr euch zu zweit gegenseitig ab, ohne in die Unterlagen zu schauen. Eine Person fragt, die andere antwortet aus dem Gedächtnis, dann wird gewechselt. Das ist Abrufüben zu zweit: Es ist wirksam, macht mehr Spaß als allein, und ihr gebt euch direkt Rückmeldung.",
    gut: ["Vor Klassenarbeiten zum Festigen", "Bei Prüfungsangst: Antworten unter Beobachtung üben", "Für Fachbegriffe, Vokabeln, Abläufe"],
    weniger: ["Wenn ihr beide den Stoff noch nicht gelernt habt", "Wenn ihr nur Ja-Nein-Fragen stellt"],
    schritte: [
      "Bereitet jeweils zehn Fragen mit Lösungen vor.",
      "Person A fragt, Person B antwortet ohne Unterlagen.",
      "A gibt kurz Rückmeldung und nennt bei Fehlern die richtige Antwort.",
      "Wechselt die Rollen.",
      "Notiert die Fragen, die nicht geklappt haben, und fragt sie am Ende noch einmal ab."
    ],
    beispiel: { fach: "Spanisch",
      text: "Thema Verbkonjugation im Präsens: Lea nennt ein Verb und eine Person, zum Beispiel „tener, nosotros“, und Tim antwortet „tenemos“. Nach zehn Verben wird gewechselt. Unregelmäßige Verben, die nicht sitzen, kommen auf einen Zettel und werden am Ende noch einmal abgefragt. Zum Schluss bildet jede Person drei eigene Sätze." },
    ki: {
      ideen: ["KI erstellt Abfragelisten mit Lösungen für euch beide.", "KI erklärt euch Fehler, bei denen ihr unsicher seid."],
      tools: [KI_STANDARD, "Quizlet oder Anki mit geteilten Kartensätzen"],
      prompts: [
        "Erstelle zwei Listen mit je 10 Abfragefragen und Lösungen zum Thema [Thema] in [Fach] für die Eingangsklasse. Liste A für Person A, Liste B für Person B, ohne Überschneidungen."
      ],
      grenzen: "Kontrolliert die Lösungen der KI kurz mit euren Unterlagen, bevor ihr sie zum Abfragen nutzt."
    }
  },

  /* ======================= MNEMOTECHNIKEN ======================= */

  loci: {
    definition: "Bei der Loci-Methode legst du Begriffe in Gedanken an festen Orten eines Weges ab, den du gut kennst, zum Beispiel in deiner Wohnung oder auf dem Schulweg. Zu jedem Begriff stellst du dir ein auffälliges Bild an diesem Ort vor. Beim Erinnern gehst du den Weg im Kopf ab und sammelst die Begriffe wieder ein. Die Methode ist schon aus der Antike bekannt.",
    gut: ["Listen und Reihenfolgen", "Gliederungen für Referate und mündliche Prüfungen", "Begriffe, die keinen logischen Zusammenhang haben"],
    weniger: ["Um Zusammenhänge zu verstehen: Die Methode hilft nur beim Merken", "Für sehr lange Listen ohne Übung"],
    schritte: [
      "Wähle einen Weg mit festen Stationen, den du gut kennst.",
      "Lege die Reihenfolge der Stationen fest.",
      "Verknüpfe jeden Begriff mit einer Station durch ein lebendiges, gern übertriebenes Bild.",
      "Gehe den Weg im Kopf zwei- bis dreimal ab.",
      "Teste dich: Sage die Begriffe in der richtigen Reihenfolge auf."
    ],
    beispiel: { fach: "Gesundheit und Biologie (Profilfach)",
      text: "Thema Verdauung: An der Haustür steht ein riesiger Mund, der kaut. Im Flur hängt eine lange Rutsche, die Speiseröhre. In der Küche brodelt ein Topf mit Säure, der Magen. Im Wohnzimmer liegt ein langer, verknoteter Gartenschlauch, der Dünndarm. Im Bad steht ein Wassereimer, der Dickdarm, der dem Brei Wasser entzieht. So kannst du die Reihenfolge der Verdauungsorgane sicher aufsagen." },
    ki: {
      ideen: ["KI hilft dir, einprägsame Bilder für schwierige Begriffe zu finden.", "KI fragt dich die Reihenfolge ab."],
      tools: [KI_STANDARD],
      prompts: [
        "Ich will mir diese Begriffe in dieser Reihenfolge mit der Loci-Methode merken: [Liste]. Mein Weg hat diese Stationen: [Stationen]. Schlage mir zu jedem Begriff ein auffälliges, lustiges Bild an der passenden Station vor."
      ],
      grenzen: "Eigene Bilder merkst du dir besser als fremde. Nimm die Vorschläge der KI nur als Anregung."
    }
  },

  akronyme: {
    definition: "Bei Akronymen und Merksätzen bildest du aus den Anfangsbuchstaben von Begriffen ein neues Wort oder einen Satz. Statt einer Liste merkst du dir nur ein Wort oder einen Satz, aus dem du die Begriffe wieder ableitest. Diese Eselsbrücken helfen besonders bei Aufzählungen und Reihenfolgen.",
    gut: ["Aufzählungen und Reihenfolgen", "Kurz vor der Klassenarbeit, um Listen sicher abrufen zu können", "In Kombination mit Verstehen"],
    weniger: ["Wenn du die Begriffe dahinter nicht verstehst", "Für zu viele Eselsbrücken auf einmal: Dann verwechselst du sie"],
    schritte: [
      "Schreibe die Begriffe auf, die du dir merken willst.",
      "Unterstreiche die Anfangsbuchstaben.",
      "Bilde daraus ein Wort oder einen Satz, der dir leicht im Kopf bleibt.",
      "Sage dir die Eselsbrücke und die Begriffe dahinter mehrmals auf.",
      "Teste dich nach einem Tag: Kannst du alle Begriffe ableiten?"
    ],
    beispiel: { fach: "Sondergebiete der Ernährung",
      text: "Die fettlöslichen Vitamine merkst du dir mit „EDEKA“: E, D, K und A. Daraus leitest du ab, dass diese Vitamine im Körper gespeichert werden können und mit etwas Fett aufgenommen werden sollten. Deshalb kommt in den Karottensalat ein Schuss Öl. Alle anderen Vitamine sind wasserlöslich." },
    ki: {
      ideen: ["KI schlägt dir mehrere Merksätze vor, aus denen du den besten auswählst.", "KI erklärt dir die Bedeutung hinter der Liste."],
      tools: [KI_STANDARD],
      prompts: [
        "Ich muss mir diese Begriffe in dieser Reihenfolge merken: [Liste]. Schlage mir fünf verschiedene, einprägsame deutsche Merksätze vor, deren Wörter mit den Anfangsbuchstaben beginnen."
      ],
      grenzen: "Prüfe, ob die Eselsbrücke wirklich zu den richtigen Begriffen führt. Ein lustiger Satz hilft nichts, wenn er einen Begriff vertauscht."
    }
  },

  geschichte: {
    definition: "Bei der Geschichtenmethode verknüpfst du Begriffe, die du dir merken willst, zu einer kurzen, lebendigen Geschichte. Je bildhafter, lustiger oder absurder sie ist, desto besser bleibt sie hängen. Beim Erinnern spielst du die Geschichte im Kopf ab und findest dabei die Begriffe wieder.",
    gut: ["Listen von Begriffen", "Wenn du dir Dinge gut bildlich vorstellen kannst", "Wenn trockener Stoff lebendiger werden soll"],
    weniger: ["Zum Verstehen von Zusammenhängen", "Wenn die Geschichte komplizierter ist als die Liste"],
    schritte: [
      "Schreibe die Begriffe in der richtigen Reihenfolge auf.",
      "Mach aus jedem Begriff ein Bild oder eine Figur.",
      "Verbinde die Bilder zu einer Handlung, in der eins zum nächsten führt.",
      "Erzähle dir die Geschichte zweimal laut.",
      "Teste dich: Erzähle die Geschichte und nenne dabei die Fachbegriffe."
    ],
    beispiel: { fach: "Kunst",
      text: "Die sieben Farbkontraste nach Itten: Ein Maler malt eine Leinwand in reinem Rot, Gelb und Blau (Farbe-an-sich-Kontrast). Plötzlich geht das Licht aus und nur eine Taschenlampe leuchtet (Hell-Dunkel-Kontrast). Er friert und zündet ein Feuer an (Kalt-Warm-Kontrast). Neben dem roten Feuer wächst grünes Gras (Komplementärkontrast) … So geht die Geschichte weiter bis zum siebten Kontrast." },
    ki: {
      ideen: ["KI hilft dir, eine Geschichte zu entwerfen, die du dann selbst ausschmückst.", "KI fragt dich die Begriffe ab, nachdem du die Geschichte erzählt hast."],
      tools: [KI_STANDARD, "Sprachmemo-App: Geschichte aufnehmen und anhören"],
      prompts: [
        "Ich muss mir diese Begriffe in dieser Reihenfolge merken: [Liste]. Schreibe mir den Anfang einer kurzen, lustigen Geschichte mit den ersten drei Begriffen. Den Rest denke ich mir selbst aus."
      ],
      grenzen: "Eine eigene Geschichte merkst du dir am besten. Lass die KI nur anfangen, nicht die ganze Geschichte schreiben."
    }
  },

  schluesselwort: {
    definition: "Bei der Schlüsselwortmethode verbindest du ein neues Wort, oft eine Vokabel oder einen Fachbegriff, mit einem ähnlich klingenden Wort, das du schon kennst. Daraus machst du ein Bild, das beide Bedeutungen verbindet. Wenn du das Wort hörst, erinnert dich der Klang an das Bild, und das Bild an die Bedeutung.",
    gut: ["Vokabeln in Englisch und Spanisch", "Schwierige Fachbegriffe, zum Beispiel aus dem Lateinischen", "Wörter, die du dir immer wieder nicht merken kannst"],
    weniger: ["Für Wörter, zu denen dir kein ähnlicher Klang einfällt", "Als einzige Methode: Kombiniere sie mit Abrufübungen"],
    schritte: [
      "Sprich das neue Wort laut aus.",
      "Suche ein deutsches Wort, das ähnlich klingt: das Schlüsselwort.",
      "Stelle dir ein Bild vor, das das Schlüsselwort mit der Bedeutung verbindet.",
      "Zeichne das Bild oder beschreibe es in einem Satz.",
      "Teste dich: Wort hören, Bild abrufen, Bedeutung nennen."
    ],
    beispiel: { fach: "Englisch",
      text: "Du kannst dir „nuisance“, auf Deutsch Ärgernis, nicht merken. Es klingt wie „Nuss“. Dein Bild: Eine harte Nuss steckt in deinem Schuh und drückt bei jedem Schritt. Das ist ein echtes Ärgernis. Beim nächsten Mal hörst du „nuisance“, denkst an die Nuss im Schuh und weißt die Bedeutung." },
    ki: {
      ideen: ["KI schlägt dir ähnlich klingende deutsche Wörter und Bilder vor.", "KI erstellt eine Abfrage für deine Schlüsselwortbilder."],
      tools: [KI_STANDARD, "Anki: Bild oder Satz auf die Rückseite der Karte"],
      prompts: [
        "Ich lerne diese [Englisch/Spanisch]-Vokabeln: [Liste mit Bedeutung]. Schlage mir zu jeder Vokabel ein deutsches Wort vor, das ähnlich klingt, und ein lustiges Bild, das Klang und Bedeutung verbindet."
      ],
      grenzen: "Die KI trifft die Aussprache nicht immer richtig. Prüfe, ob das Schlüsselwort für dich wirklich ähnlich klingt."
    }
  },

  leitner: {
    definition: "Der Leitner-Karteikasten hat mehrere Fächer, meist fünf. Neue Karteikarten kommen in Fach 1, das du täglich übst. Weißt du die Antwort, wandert die Karte ein Fach weiter und wird seltener wiederholt. Weißt du sie nicht, geht sie zurück in Fach 1. So übst du genau das, was du noch nicht kannst, und wiederholst automatisch verteilt.",
    gut: ["Fachbegriffe, Vokabeln, Definitionen", "Langfristiges Lernen über Wochen", "Kurze tägliche Lerneinheiten"],
    weniger: ["Für komplexe Zusammenhänge, die nicht auf eine Karte passen", "Wenn du die Karten nur liest, statt die Antwort vorher selbst zu sagen"],
    schritte: [
      "Schreibe auf die Vorderseite eine Frage oder einen Begriff, auf die Rückseite die Antwort.",
      "Alle neuen Karten kommen in Fach 1.",
      "Übe Fach 1 täglich, Fach 2 alle zwei Tage, Fach 3 einmal pro Woche und so weiter.",
      "Richtig beantwortet: Karte ein Fach weiter. Falsch: zurück in Fach 1.",
      "Karten im letzten Fach kannst du sicher."
    ],
    beispiel: { fach: "Gesundheit und Biologie (Profilfach)",
      text: "Für die Fachbegriffe aus dem Thema Zelle legst du 40 Karten an, etwa „Mitochondrium: Funktion?“ oder „Was bedeutet semipermeabel?“. Täglich übst du zehn Minuten Fach 1. Nach zwei Wochen liegen 25 Karten in Fach 3 und höher. Die fünf Karten, die immer wieder in Fach 1 landen, erklärst du dir zusätzlich mit der Feynman-Technik." },
    ki: {
      ideen: ["KI erstellt aus deinen Unterlagen Karteikarten mit Frage und Antwort.", "KI formuliert schwierige Karten so um, dass du sie besser verstehst."],
      tools: ["Anki: digitaler Leitner-Kasten mit automatischen Abständen", "Quizlet", "NotebookLM: Karteikarten aus Unterlagen", KI_STANDARD],
      prompts: [
        "Erstelle aus diesem Material 20 Karteikarten im Format Frage – Antwort für die Eingangsklasse: [Text]. Die Antworten sollen kurz sein, höchstens zwei Sätze. Gib sie als Liste aus, die ich in Anki importieren kann."
      ],
      grenzen: "KI-Karten können Fehler enthalten. Prüfe jede Karte mit deinen Unterlagen. Karten, die du selbst schreibst, behältst du außerdem besser."
    }
  },
  /* ======================= ERGÄNZT AUS DER ZUKUNFTSWERKSTATT ======================= */

  loesungsbeispiele: {
    definition: "Beim Lernen mit Lösungsbeispielen arbeitest du eine Musterlösung nicht nur durch, sondern erkennst ihre Lösungsstruktur und überträgst sie. Du erklärst das Beispiel, verdeckst es, rekonstruierst es selbst, löst einen ähnlichen Fall und vergleichst. So wird aus bloßem Nachvollziehen eigenes Können.",
    gut: ["Wenn du eine Musteraufgabe verstehst, eine veränderte Aufgabe aber nicht lösen kannst", "Für Rechenverfahren in Mathematik, Physik und Chemie", "Zu Beginn eines neuen Aufgabentyps"],
    weniger: ["Wenn du die Lösung nur abschreibst oder Zahlen austauschst", "Wenn du schon sicher bist: Dann gemischte Aufgaben üben"],
    schritte: [
      "Lies die Musterlösung und erkläre jeden Schritt in eigenen Worten: Warum wird das hier gemacht?",
      "Verdecke die Lösung und rekonstruiere sie selbst.",
      "Löse eine ähnliche Aufgabe mit anderen Werten.",
      "Übertrage die Struktur auf einen veränderten Fall, etwa mit anderen Größen.",
      "Vergleiche mit der Musterlösung: Wo bin ich abgewichen und warum?"
    ],
    beispiel: { fach: "Physik",
      text: "Musteraufgabe: Aus zwei Orten und zwei Zeitpunkten bestimmst du zuerst Δs und Δt und berechnest dann die mittlere Geschwindigkeit v = Δs / Δt. Du erklärst die Schritte, verdeckst die Lösung und rechnest sie nach. Dann löst du dieselbe Aufgabe mit anderen Werten. Zum Schluss überträgst du die Struktur auf eine mittlere Temperaturänderungsrate: ΔT / Δt. Die Struktur bleibt gleich, nur die Größen ändern sich." },
    ki: {
      ideen: ["KI erstellt dir zu einer Musterlösung ähnliche und leicht veränderte Aufgaben.", "KI stellt dir Rückfragen zu deiner Erklärung der Lösungsschritte."],
      tools: [KI_STANDARD, "Schulbuch und Musterlösungen der Lehrkraft"],
      prompts: [
        "Hier ist eine Musterlösung: [Lösung]. Ich habe sie nachvollzogen. Gib mir zuerst eine Aufgabe mit derselben Struktur und anderen Werten, danach eine Aufgabe mit veränderten Größen. Gib mir keine Lösung, sondern frag mich nach meinem ersten Schritt."
      ],
      grenzen: "Wenn die KI die neue Aufgabe gleich mitlöst, übst du nur Nachvollziehen. Löse selbst und lass dir höchstens einen Hinweis geben."
    }
  },

  fehleranalyse: {
    definition: "Bei der systematischen Fehleranalyse korrigierst du einen Fehler nicht nur, sondern findest seine Ursache. Du bestimmst die Fehlerstelle, fragst, warum es dazu kam, korrigierst und löst dann einen neuen, ähnlichen Fall selbst. So verhinderst du, dass derselbe Fehler wiederkommt.",
    gut: ["Wenn Fehler immer wiederkehren", "Nach einer zurückgegebenen Klassenarbeit", "Wenn eine Korrektur allein nicht erklärt, warum etwas schiefging"],
    weniger: ["Für einzelne Flüchtigkeitsfehler", "Wenn du nur die richtige Lösung abschreibst"],
    schritte: [
      "Finde die Stelle, an der der Fehler entsteht.",
      "Bestimme die Ursache: Wissen gefehlt, verwechselt, falsch übertragen, nicht geprüft?",
      "Korrigiere den Fehler und formuliere eine Regel für dich.",
      "Löse einen neuen, ähnlichen Fall ohne Hilfe.",
      "Führe eine Fehlerliste und schau sie vor der nächsten Klassenarbeit an."
    ],
    beispiel: { fach: "Mathematik",
      text: "Vektorgeometrie: Du hast dreimal den Verschiebungsvektor falsch berechnet. Die Fehlerstelle: Du rechnest A − E statt E − A. Die Ursache: Du verwechselst, ob du aus zwei Lagen eine Lageänderung bestimmst oder aus Lage und Lageänderung eine neue Lage. Deine Regel: „Lageänderung = Endlage minus Anfangslage.“ Dann löst du zwei neue Aufgaben und fragst dich vorher jeweils, welcher der beiden Übergänge gerade gefragt ist." },
    ki: {
      ideen: ["KI hilft dir, die Fehlerursache zu finden, indem sie Rückfragen stellt.", "KI erstellt dir einen neuen Fall, an dem du deine Regel prüfst."],
      tools: [KI_STANDARD, "Eine Fehlerliste in der Notizen-App"],
      prompts: [
        "Hier ist meine Rechnung mit einem Fehler: [Rechnung]. Sag mir nicht, wo der Fehler ist. Stelle mir Fragen, mit denen ich die Fehlerstelle und die Ursache selbst finde. Weise mich nur auf den ersten Fehler hin."
      ],
      grenzen: "Die Ursache musst du selbst verstehen, sonst kommt der Fehler wieder. Lass dir den Fehler nicht einfach markieren und korrigieren."
    }
  },

  braindump: {
    definition: "Beim Brain Dump schreibst du ohne Unterlagen alles auf, was du zu einem Thema weißt, auf ein leeres Blatt. Danach vergleichst du mit deinen Unterlagen und markierst Lücken und Fehler in einer anderen Farbe. Das ist eine der einfachsten Formen des Abrufens und zeigt schnell, was wirklich sitzt.",
    gut: ["Zum Start einer Lerneinheit, um den Stand zu prüfen", "Wenn dir beim Lesen alles bekannt vorkommt", "Kurz vor einer Klassenarbeit"],
    weniger: ["Bei völlig neuem Stoff", "Wenn du danach nicht vergleichst"],
    schritte: [
      "Nimm ein leeres Blatt und schreibe das Thema oben hin.",
      "Stelle einen Timer auf 5 bis 10 Minuten.",
      "Schreibe oder zeichne alles auf, was dir einfällt, ohne nachzuschauen.",
      "Vergleiche mit deinen Unterlagen und markiere Fehlendes und Falsches in einer anderen Farbe.",
      "Lerne die markierten Stellen nach und wiederhole den Brain Dump nach zwei Tagen."
    ],
    beispiel: { fach: "Gesundheit und Biologie (Profilfach)",
      text: "Thema Regulation des Blutzuckerspiegels: Du schreibst in acht Minuten alles auf, was du weißt: Insulin, Glukagon, Bauchspeicheldrüse, Leber. Beim Vergleich mit dem Hefteintrag merkst du, dass du die Wirkung von Glukagon auf die Leber nicht notiert hast und der Regelkreis fehlt. Das ist dein Lernauftrag für heute." },
    ki: {
      ideen: ["KI vergleicht deinen Brain Dump mit dem Material und nennt Lücken.", "KI stellt dir Fragen zu den Lücken, statt sie zu erklären."],
      tools: [KI_STANDARD, "Papier oder GoodNotes"],
      prompts: [
        "Das habe ich ohne Unterlagen zum Thema [Thema] aufgeschrieben: [Brain Dump]. Hier ist das Material aus dem Unterricht: [Material]. Nenne mir nur die Punkte, die fehlen oder falsch sind, als Stichworte. Erkläre sie noch nicht."
      ],
      grenzen: "Vergleiche zuerst selbst mit deinen Unterlagen. Die KI ist eine zweite Kontrolle, kein Ersatz für den Blick in dein Heft."
    }
  },

  vergleichstabelle: {
    definition: "In einer Vergleichstabelle stellst du zwei oder mehr Dinge nach festen Kriterien gegenüber, zum Beispiel Begriffe, Verfahren oder Positionen. Jedes Kriterium bekommt eine eigene Zeile. So vermischst du keine Kriterien mehr und siehst Gemeinsamkeiten und Unterschiede auf einen Blick.",
    gut: ["Für Vergleichsaufgaben in Klassenarbeiten", "Wenn du ähnliche Begriffe verwechselst", "Um Positionen oder Theorien gegenüberzustellen"],
    weniger: ["Für Abläufe und Ursache-Wirkungs-Ketten: Dafür eine Skizze oder Concept Map", "Wenn die Kriterien fehlen und nur Stichworte gesammelt werden"],
    schritte: [
      "Lege fest, was du vergleichst: die Spalten.",
      "Lege die Vergleichskriterien fest: die Zeilen.",
      "Fülle die Tabelle Zeile für Zeile aus, nicht Spalte für Spalte.",
      "Markiere die wichtigsten Unterschiede.",
      "Formuliere aus der Tabelle zwei bis drei Sätze, die den Vergleich zusammenfassen."
    ],
    beispiel: { fach: "Gesundheit und Biologie (Profilfach)",
      text: "Aktive und passive Immunisierung: Die Spalten sind aktiv und passiv. Die Zeilen sind die Kriterien: Was wird gespritzt? Wer bildet die Antikörper? Wann setzt der Schutz ein? Wie lange hält er? Wann wird sie eingesetzt? Weil du Zeile für Zeile vergleichst, vermischst du die Kriterien nicht mehr und kannst die Unterschiede begründen." },
    ki: {
      ideen: ["KI schlägt dir sinnvolle Vergleichskriterien vor.", "KI prüft deine ausgefüllte Tabelle auf Fehler."],
      tools: [KI_STANDARD, "Numbers, Pages oder Papier"],
      prompts: [
        "Ich vergleiche [A] und [B] im Fach [Fach]. Schlage mir fünf sinnvolle Vergleichskriterien vor, aber fülle die Tabelle nicht aus. Danach prüfst du meine ausgefüllte Tabelle: [Tabelle]."
      ],
      grenzen: "Eine fertige Tabelle von der KI ist schnell gemacht, aber du lernst nichts dabei. Fülle sie selbst aus und lass sie nur prüfen."
    }
  },

  ueberschlag: {
    definition: "Beim Überschlag schätzt du vor dem Rechnen ab, in welcher Größenordnung das Ergebnis liegen müsste. Beim Einheitencheck prüfst du, ob die Einheiten zusammenpassen und das Ergebnis sinnvoll ist. Beides zusammen schützt dich vor dem Schema „Formel suchen – Zahlen einsetzen – rechnen“, bei dem unsinnige Ergebnisse unbemerkt bleiben.",
    gut: ["In Physik, Chemie und Mathematik bei Sachaufgaben", "Wenn du Ergebnisse vom Taschenrechner ungeprüft übernimmst", "Beim Umstellen von Formeln"],
    weniger: ["Für Aufgaben ohne Zahlen oder Größen"],
    schritte: [
      "Lies die Aufgabe und überlege: Welche Größe wird gesucht, in welcher Einheit?",
      "Schätze die Größenordnung des Ergebnisses ab.",
      "Bringe alle Größen auf passende Einheiten.",
      "Rechne und prüfe: Passt die Einheit des Ergebnisses?",
      "Vergleiche mit deiner Schätzung. Weicht das Ergebnis stark ab, suche den Fehler."
    ],
    beispiel: { fach: "Physik",
      text: "Ben berechnet die Geschwindigkeit eines Radfahrers und erhält etwa 1,8 · 10³ km/h. Mit einem Überschlag wäre ihm sofort aufgefallen, dass ein Radfahrer eher 15 bis 30 km/h fährt. Der Einheitencheck zeigt den Fehler: Er hat Meter durch Sekunden geteilt und das Ergebnis direkt als km/h angegeben, ohne umzurechnen." },
    ki: {
      ideen: ["KI fragt dich vor dem Rechnen nach einer Schätzung und nach den Einheiten.", "KI erzeugt Aufgaben, bei denen du nur die Größenordnung abschätzen sollst."],
      tools: [KI_STANDARD, "Taschenrechner erst nach der Schätzung"],
      prompts: [
        "Ich kann die Formel einsetzen, verliere aber beim Umstellen und bei den Einheiten den Überblick. Gib mir nicht die Lösung. Frage mich zuerst nach einer sinnvollen Größenordnung, dann nach den Einheiten und anschließend nach meinem Umformungsschritt. Weise mich nur auf den ersten Fehler hin."
      ],
      grenzen: "Auch die KI kann sich verrechnen. Gerade deshalb ist deine eigene Schätzung die beste Kontrolle."
    }
  },

  ki: {
    definition: "KI kann eine hilfreiche Lernressource sein, wenn du sie gezielt nutzt. Ein KI-Modell ruft kein gesichertes Wissen ab, sondern erzeugt Antworten aus Mustern. Plausibel heißt deshalb nicht automatisch richtig. Wichtig ist vor allem: Hilfe ist noch kein Lernen. Nutze KI so, dass du selbst abrufst, erklärst, strukturierst, rechnest, schreibst oder entscheidest.",
    gut: ["Für Rückfragen zu deiner eigenen Erklärung", "Für begrenztes Feedback, zum Beispiel nur den ersten Fehler", "Für neue Übungsaufgaben und Varianten", "Für einen Hinweis, wenn du feststeckst"],
    weniger: ["Wenn die KI eine Aufgabe komplett löst oder deinen Text neu schreibt", "Für Fakten, die du nicht überprüfen kannst", "Als Ersatz für die Überprüfung ohne Hilfe"],
    schritte: [
      "Sag, was du lernen oder können sollst.",
      "Beschreibe dein konkretes Lernproblem.",
      "Sag, welche Art von Hilfe du möchtest: Rückfragen, Hinweis, Feedback, neue Aufgabe.",
      "Sag, was die KI nicht übernehmen soll, zum Beispiel: Gib mir nicht die Lösung.",
      "Prüfe wichtige Fakten mit deinen Unterlagen und teste dich danach ohne KI."
    ],
    beispiel: { fach: "Gesundheit und Biologie (Profilfach)",
      text: "Du sollst mithilfe eines Regelkreises erläutern, wie der Blutzuckerspiegel reguliert wird. Die Begriffe kennst du, den Zusammenhang noch nicht sicher. Du schreibst eine eigene Erklärung und bittest die KI: „Prüfe meine Erklärung nur auf fehlende Beziehungen zwischen Insulin, Glukagon, Leber und Blutzucker. Stelle mir dazu Rückfragen. Formuliere die Erklärung nicht für mich neu.“ Danach zeichnest du den Regelkreis ohne Vorlage." },
    ki: {
      ideen: ["Rückfragen statt Antworten anfordern.", "Feedback begrenzen: höchstens zwei Stellen markieren lassen.", "Bei langen Gesprächen neue Themen in einem neuen Chat beginnen, weil die KI frühere Details weniger beachtet."],
      tools: ["fobizz über euren Schulzugang (datenschutzkonform)", "NotebookLM für Fragen zu eigenen Unterlagen (Altersgrenzen beachten)"],
      prompts: [
        "Ich soll [Anforderung]. Mein Lernproblem: [Lernproblem]. Gib mir nicht die Lösung. Stelle mir stattdessen eine Frage, mit der ich meinen Fehler selbst finde.",
        "Markiere höchstens zwei Stellen, an denen meine Erklärung fachlich unklar oder unvollständig ist. Stelle mir dazu Rückfragen. Formuliere die Erklärung nicht für mich neu: [Erklärung]"
      ],
      grenzen: "Bittest du nur „Verbessere meinen Text“, schreibt die KI ihn oft komplett neu. Dann weißt du weder, was unklar war, noch ob du es jetzt selbst kannst."
    }
  }
};

/* Handouts den Methoden zuordnen */
METHODEN.forEach((m) => { if (HANDOUTS[m.id]) m.handout = HANDOUTS[m.id]; });
