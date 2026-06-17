# TT Coach 🏓

Mobile Web-App, die Tischtennisspielern hilft, gezielt einzelne Techniken zu
verbessern – mit kurzer Erklärung und Video je Technik.

**Status:** MVP / Prototyp (Videos noch als Platzhalter).

## Was die App kann
- Willkommens-Screen mit kurzer Einführung
- Burger-Menü mit Kategorien: **Vorhand, Rückhand, Aufschläge, Abwehr**
- Kategorie → Liste der Techniken → Detailseite (Video-Platzhalter, Erklärung, Übungen)
- Mobile-first, dunkles Design, als PWA installierbar

## Lokal ausprobieren
Einfach `index.html` im Browser öffnen.
Oder für die saubere PWA-Variante einen kleinen Server starten:

```bash
python -m http.server 8000
# danach http://localhost:8000 öffnen
# am Handy im selben WLAN: http://<PC-IP>:8000
```

## Projektstruktur
| Datei         | Inhalt                                                   |
|---------------|----------------------------------------------------------|
| `index.html`  | Grundgerüst & Views                                      |
| `styles.css`  | Komplettes Design                                        |
| `app.js`      | Navigation (Menü → Kategorie → Technik → Detail)         |
| `data.js`     | **Alle Inhalte** – hier neue Techniken ergänzen          |
| `manifest.json` | PWA-Konfiguration                                      |

## Neue Technik hinzufügen
In `data.js` ein neues Objekt ins `TECHNIQUES`-Array einfügen und Felder
ausfüllen (`name`, `category`, `side`, `level`, `description`, `keyPoints`,
`drills`). Echtes Video später bei `videoUrl` eintragen – der Platzhalter wird
dann automatisch durch den Player ersetzt.

## Ideen / Backlog
- Mehr Techniken (Ziel: ~15–20)
- Echte Videos einbinden
- Favoriten / „gemeistert"-Markierung
- Trainingspläne
