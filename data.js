// Technik-Datenbank für die Tischtennis-App.
// Neue Techniken einfach als Objekt ergänzen — die App baut Übersicht & Detail automatisch.
//
// Felder:
//   id          eindeutiger Schlüssel (kebab-case)
//   name        Anzeigename
//   category    "Grundschläge" | "Aufschläge" | "Rückschlag" | "Fortgeschritten"
//   side        "Vorhand" | "Rückhand" | "Beide"
//   level       "Anfänger" | "Fortgeschritten" | "Profi"
//   summary     ein Satz für die Übersichtskachel
//   description kurzer Erklärungstext
//   keyPoints   Liste: "Worauf achten?"
//   drills      Liste: konkrete Übungen
//   videoUrl    leer lassen ("") -> zeigt Platzhalter

const TECHNIQUES = [
  {
    id: "vh-konter",
    name: "Vorhand Konter",
    category: "Grundschläge",
    side: "Vorhand",
    level: "Anfänger",
    summary: "Der kontrollierte Grundschlag für die Vorhandseite.",
    description:
      "Der Vorhand-Konter ist die Basis fast aller Vorhandschläge. Du triffst den Ball im höchsten Punkt und spielst flach und kontrolliert über das Netz. Ziel ist ein gleichmäßiger Ballwechsel ohne viel Rotation.",
    keyPoints: [
      "Schläger leicht geschlossen, Treffpunkt vor dem Körper",
      "Bewegung kommt aus Unterarm und leichter Körperdrehung",
      "Ball im höchsten Punkt treffen, nicht hinterherlaufen",
      "Locker bleiben — nicht verkrampfen",
    ],
    drills: [
      "100 Bälle Vorhand-Konter diagonal mit Partner oder Roboter",
      "Konter gegen die Wand: Rhythmus und Kontrolle finden",
    ],
    videoUrl: "",
  },
  {
    id: "rh-konter",
    name: "Rückhand Konter",
    category: "Grundschläge",
    side: "Rückhand",
    level: "Anfänger",
    summary: "Stabiler Block- und Konterschlag vor dem Körper.",
    description:
      "Beim Rückhand-Konter spielst du den Ball kompakt vor dem Körper. Die Bewegung ist klein und kontrolliert — ideal für schnelle Ballwechsel am Tisch.",
    keyPoints: [
      "Ellbogen vor dem Bauch als festes Drehzentrum",
      "Kurze Bewegung aus dem Unterarm",
      "Handgelenk stabil halten",
      "Früher Treffpunkt direkt nach dem Aufspringen",
    ],
    drills: [
      "Rückhand-Konter diagonal über die Mitte",
      "Wechsel Block/Konter mit Partner steigern",
    ],
    videoUrl: "",
  },
  {
    id: "vh-topspin",
    name: "Vorhand Topspin",
    category: "Grundschläge",
    side: "Vorhand",
    level: "Fortgeschritten",
    summary: "Der wichtigste Angriffsschlag mit viel Überschnitt.",
    description:
      "Der Vorhand-Topspin erzeugt durch eine schnelle Aufwärtsbewegung viel Überschnitt. Der Ball fliegt mit hohem Bogen sicher übers Netz und springt beim Gegner schnell ab. Das ist dein Haupt-Angriffswerkzeug.",
    keyPoints: [
      "Tief in die Knie, Gewicht aufs hintere Bein",
      "Beschleunigung von unten nach oben/vorne",
      "Ball streifen statt schlagen — Rotation vor Tempo",
      "Gewichtsverlagerung vom hinteren aufs vordere Bein",
    ],
    drills: [
      "Topspin gegen Block: 50 Bälle am Stück sicher aufs Tisch",
      "Topspin aus der Vorhand-Ecke mit Beinarbeit",
    ],
    videoUrl: "https://www.youtube.com/watch?v=woT6NgJymBk",
  },
  {
    id: "rh-topspin",
    name: "Rückhand Topspin",
    category: "Grundschläge",
    side: "Rückhand",
    level: "Fortgeschritten",
    summary: "Angriff aus der Rückhand — kompakt und gefährlich.",
    description:
      "Der Rückhand-Topspin wird vor allem aus dem Handgelenk und Unterarm gespielt. Trotz kleiner Bewegung lässt sich viel Rotation erzeugen — perfekt, um aus der Rückhand Druck aufzubauen.",
    keyPoints: [
      "Ellbogen leicht anheben, Schläger nach unten/vorne führen",
      "Explosiver Einsatz des Handgelenks im Treffmoment",
      "Oberkörper leicht mitdrehen",
      "Treffpunkt knapp nach dem höchsten Punkt",
    ],
    drills: [
      "Rückhand-Topspin gegen Unterschnitt-Anspiel",
      "Rückhand-Topspin im Wechsel mit Block",
    ],
    videoUrl: "",
  },
  {
    id: "aufschlag-unterschnitt",
    name: "Kurzer Unterschnitt-Aufschlag",
    category: "Aufschläge",
    side: "Vorhand",
    level: "Anfänger",
    summary: "Kurzer Aufschlag, der den Gegner am Angriff hindert.",
    description:
      "Ein kurzer Unterschnitt-Aufschlag springt zweimal auf der gegnerischen Tischhälfte und macht es dem Gegner schwer, direkt anzugreifen. Grundlage für die eigene Aufschlag-Angriff-Kombination.",
    keyPoints: [
      "Ball flach und nah am Netz aufsetzen",
      "Schläger im Treffmoment fast waagerecht, Ball unten streifen",
      "Erster Aufsprung kurz hinter dem eigenen Netz",
      "Bewegung antäuschen für mehr Wirkung",
    ],
    drills: [
      "10 Aufschläge auf ein Ziel-Blatt kurz am Netz",
      "Kurz/lang variieren bei gleicher Bewegung",
    ],
    videoUrl: "",
  },
  {
    id: "aufschlag-seitschnitt",
    name: "Seitschnitt-Aufschlag",
    category: "Aufschläge",
    side: "Vorhand",
    level: "Fortgeschritten",
    summary: "Aufschlag mit Seitwärtsdrall, der den Ball ausbrechen lässt.",
    description:
      "Beim Seitschnitt-Aufschlag streifst du den Ball seitlich. Der Ball bricht für den Gegner unerwartet zur Seite aus und erschwert einen sauberen Rückschlag.",
    keyPoints: [
      "Schläger seitlich am Ball vorbeiführen",
      "Handgelenk peitschend einsetzen",
      "Schnittrichtung durch Schlägerstellung steuern",
      "Mit kurzen und langen Varianten kombinieren",
    ],
    drills: [
      "Seitschnitt nach links und rechts gezielt platzieren",
      "Aufschlag + 3. Ball Vorhand-Topspin üben",
    ],
    videoUrl: "",
  },
  {
    id: "schupfen",
    name: "Schupfen (kurz & lang)",
    category: "Rückschlag",
    side: "Beide",
    level: "Anfänger",
    summary: "Kontrollierter Rückschlag gegen Unterschnitt am Tisch.",
    description:
      "Beim Schupfen gibst du dem Ball Unterschnitt zurück und hältst ihn flach und kurz. Eine sichere Antwort auf kurze Unterschnitt-Aufschläge, mit der du das Tempo aus dem Ballwechsel nimmst.",
    keyPoints: [
      "Schläger offen, unter den Ball gehen",
      "Treffpunkt früh, direkt über dem Tisch",
      "Kurz halten: wenig Bewegung, viel Gefühl",
      "Lange Variante flach und schnell als Überraschung",
    ],
    drills: [
      "Kurz schupfen auf die Vorhand-Ecke des Gegners",
      "Kurz/lang mischen, um den Gegner zu binden",
    ],
    videoUrl: "",
  },
  {
    id: "flip",
    name: "Flip (Banane)",
    category: "Rückschlag",
    side: "Rückhand",
    level: "Profi",
    summary: "Aggressiver Angriff gegen kurze Bälle über dem Tisch.",
    description:
      "Der Flip - oft als 'Banane' bezeichnet - ist ein Angriffsschlag gegen kurze Bälle direkt über dem Tisch. Mit Handgelenkseinsatz erzeugst du Topspin und übernimmst sofort die Initiative.",
    keyPoints: [
      "Bein unter den Tisch, nah an den Ball heran",
      "Schläger unter/hinter den Ball bringen",
      "Explosiver Handgelenkseinsatz nach vorne-oben",
      "Über die Seite spielen für die typische Bananen-Kurve",
    ],
    drills: [
      "Flip gegen kurzen Unterschnitt-Aufschlag",
      "Flip + Folgeball: nach dem Angriff sofort weiter unter Druck",
    ],
    videoUrl: "",
  },
];

// ---------------------------------------------------------------------------
// ÜBUNGEN – der eigentliche Mehrwert der App.
// Bewusst eine EIGENE Liste (nicht in die Technik eingebettet): Eine Übung
// verweist über "techniqueIds" auf eine oder mehrere Techniken. Heute zeigen
// wir sie auf der Technikseite; später lässt sich daraus problemlos eine
// übungs-zentrische Navigation bauen, ohne die Daten umzubauen.
//
// Felder:
//   id           eindeutiger Schlüssel
//   title        Name der Übung
//   techniqueIds welche Technik(en) sie trainiert -> Verweis auf TECHNIQUES.id
//   level        "Anfänger" | "Fortgeschritten" | "Profi"
//   setup        Was man braucht, z.B. "Mit Partner", "Am Roboter", "Allein"
//   goal         ein Satz: Was bringt die Übung?
//   steps        Ablauf in Schritten
//   tips         Tipps / Worauf achten
//   videoUrl     leer ("") -> Platzhalter; später euer eigenes Video

const EXERCISES = [
  {
    id: "vh-ts-konstanz",
    title: "VH-Topspin auf Block – Konstanz",
    techniqueIds: ["vh-topspin"],
    level: "Fortgeschritten",
    setup: "Mit Partner",
    goal: "Sicherheit und gleichmäßige Rotation im Vorhand-Topspin entwickeln.",
    steps: [
      "Partner blockt jeden Ball ruhig in deine Vorhand (diagonal).",
      "Du spielst Topspin – Ziel: 20 Bälle am Stück sicher auf den Tisch.",
      "Schaffst du 20, steigere auf 30. Tempo zweitrangig, erst Sicherheit.",
    ],
    tips: [
      "Nicht hauen – den Ball streifen, Rotation vor Tempo.",
      "Nach jedem Schlag locker in die Grundstellung zurück.",
    ],
    videoUrl: "",
  },
  {
    id: "vh-ts-unterschnitt",
    title: "VH-Topspin gegen Unterschnitt",
    techniqueIds: ["vh-topspin"],
    level: "Fortgeschritten",
    setup: "Mit Partner",
    goal: "Den ersten Angriff gegen geschnittene Bälle sicher aufziehen.",
    steps: [
      "Partner schupft dir den Ball lang in die Vorhand.",
      "Du ziehst mit viel Aufwärtsbewegung Topspin auf.",
      "10 Wiederholungen, dann Partner wechselt Platzierung leicht.",
    ],
    tips: [
      "Tiefer in die Knie gehen und mehr von unten nach oben arbeiten.",
      "Schläger etwas offener als gegen Block.",
    ],
    videoUrl: "",
  },
  {
    id: "vh-ts-fallback",
    title: "Falkenberg (Topspin + Beinarbeit)",
    techniqueIds: ["vh-topspin", "rh-topspin"],
    level: "Profi",
    setup: "Mit Partner",
    goal: "Topspin mit schneller Beinarbeit kombinieren – Klassiker im Training.",
    steps: [
      "Partner spielt fest: 1) Rückhand, 2) Mitte (VH umlaufen), 3) Vorhand.",
      "Du spielst RH-Topspin, dann umspringen VH-Topspin aus der Mitte, dann VH-Topspin außen.",
      "Im Kreis wiederholen, sauber statt schnell starten.",
    ],
    tips: [
      "Erst langsam einlaufen lassen, Tempo später steigern.",
      "Aktiv mit kleinen Schritten arbeiten, nicht nur mit dem Arm strecken.",
    ],
    videoUrl: "",
  },
  {
    id: "vh-konter-rhythmus",
    title: "Konter-Rhythmus diagonal",
    techniqueIds: ["vh-konter"],
    level: "Anfänger",
    setup: "Mit Partner",
    goal: "Gefühl und gleichmäßigen Rhythmus im Vorhand-Konter aufbauen.",
    steps: [
      "Beide spielen locker Vorhand-Konter diagonal.",
      "Ziel: 30 Bälle am Stück ohne Fehler halten.",
      "Danach bewusst etwas schneller, aber kontrolliert.",
    ],
    tips: [
      "Ball früh im höchsten Punkt nehmen.",
      "Locker bleiben, kleine Bewegung aus dem Unterarm.",
    ],
    videoUrl: "",
  },
];

