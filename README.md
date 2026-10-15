# Lernbuddy – Hilde-Domin-Schule Herrenberg

Interaktive Website zum Thema „Lernen lernen“ für die Zukunftswerkstatt der Eingangsklasse Berufliches Gymnasium (SGGG).
Reines HTML/CSS/JavaScript, ohne Server, Anmeldung oder externe Dienste. Läuft auf GitHub Pages.

## Dateien
- `index.html` – die Seite
- `css/style.css` – Gestaltung
- `js/zuordnung.js` – Schulname, Fächer, Lernprobleme, Ablauf (von Lehrkräften bearbeitbar)
- `js/methoden.js` – Methodenpool (von Lehrkräften bearbeitbar)
- `js/app.js` – Programmlogik

## Lokal ansehen
`index.html` im Browser öffnen.

## Stand
Fertig: alle sechs Etappen abgeschlossen. Anleitung zum Veröffentlichen auf GitHub Pages siehe Dokument „Lernbuddy auf GitHub Pages veröffentlichen“.
- Fach & Lernzeit, Lernproblem, Vorlieben, Methoden, Ziel & Zeit, Ausprobieren, Reflexion, Feedback & Abschluss
- Reflexion mit Überprüfung ohne Hilfe, Methodenbewertung, Planumsetzung, Zuversicht und Pflichtfragen
- Wertschätzendes Feedback und konkrete Verbesserungsvorschläge (`js/reflexion.js`)
- Abschluss-PDF und Handout-PDFs (`js/pdf.js`, erzeugt mit pdf-lib im Browser, keine Daten werden verschickt)
- Inhaltlich abgestimmt mit den Übungsheften DS1 und DS2 der Zukunftswerkstatt

## Dateien zum Bearbeiten für Lehrkräfte
- `js/zuordnung.js` – Fächer, Lernprobleme, Fragen, Empfehlungslogik, Lernzeitplan
- `js/methoden.js` – Methodenpool
- `js/handouts.js` – Handouts
- `js/reflexion.js` – Reflexionsfragen und Feedback-Regeln

## Drittsoftware
`js/vendor/pdf-lib.min.js` – pdf-lib 1.17.1, MIT-Lizenz (siehe `js/vendor/pdf-lib-LICENSE.md`)
