import { useState, useRef } from "react";

const STORAGE_KEY = "immolotse_fc_v4";

const flashcards = {
  "Entrepreneurship": [
    { id:"E1", q:"Was sind die 4 Perspektiven auf Entrepreneurship?", desc:"Entrepreneurship kann aus 4 Blickwinkeln betrachtet werden.", a:"• Ökonomische Funktion\n• Verhaltensweise — kompromisslose Chancensuche\n• Persönlichkeitsmerkmal — Integrität, Beharrlichkeit, Selbstdisziplin\n• Situationsbezogen — Gründung neuer Organisationen" },
    { id:"E2", q:"Was unterscheidet Entrepreneur vs. Unternehmer?", desc:"Beide führen ein Unternehmen — aber mit fundamental unterschiedlichen Zielen.", a:"Entrepreneur: neues Geschäftsmodell, hohes Risiko, eigenes Kapital, Disruption\n\nUnternehmer: führt bestehendes Modell weiter, Fokus Effizienz & Stabilität" },
    { id:"E3", q:"Was unterscheidet Entrepreneurship von Leadership?", desc:"Der entscheidende Unterschied liegt im persönlichen Risiko.", a:"Entrepreneur: setzt eigenes Kapital UND eigene Existenz ein\n\nLeader/Manager: setzt nur seine Karriere ein — nicht sein Kapital" },
    { id:"E4", q:"Was sind die 7 Aufgabenbereiche eines Unternehmers?", desc:"7 übergeordnete Verantwortungsbereiche — nicht nur das operative Tagesgeschäft.", a:"1. Vision und Werte\n2. Strategie und Positionierung\n3. Externe Energie organisieren\n4. Permanente Müllentsorgung\n5. Umsetzung sichern\n6. Entwicklung eigener Persönlichkeit\n7. Übergabe des Unternehmens" },
    { id:"E5", q:"Was sind die 7 Charaktereigenschaften des Entrepreneurial Mindset?", desc:"Erfolgreiche Entrepreneurs teilen diese 7 Eigenschaften.", a:"1. Visionäres Denken\n2. Risikobereitschaft und Mut\n3. Umsetzungsstärke\n4. Kreativität und Problemlösungskompetenz\n5. Durchhaltevermögen/Resilienz\n6. Netzwerkfähigkeit und Kommunikation\n7. Lernbereitschaft und Selbstreflexion" },
    { id:"E6", q:"Was sind die 3 Hauptursachen des Scheiterns?", desc:"10% scheitern im 1. Jahr, 70% zwischen Jahr 1-4, nur 10% erfolgreich.", a:"1. Kein Markt (No Market Need)\n2. Geldmangel\n3. Kein richtiges Team" },
    { id:"E7", q:"Was sind die 4 Merkmale eines Start-ups?", desc:"Laut Austria Start-up Monitor.", a:"1. Innovation\n2. Hohes Wachstumspotenzial\n3. Skalierbarkeit\n4. Temporärer Zustand" },
    { id:"E8", q:"Was sind die 7 Bestandteile eines Businessplans?", desc:"Pflicht wenn man Kapital von Banken, Förderungen oder Investoren braucht.", a:"1. Executive Summary\n2. Geschäftsidee & Produkt\n3. Marktanalyse\n4. Marketing & Vertrieb\n5. Organisation & Team\n6. Finanzplanung (Break-Even!)\n7. Risiken & Chancen" },
    { id:"E9", q:"Digital vs. Technology vs. Social Entrepreneurship?", desc:"3 moderne Formen des Entrepreneurships mit unterschiedlichem Fokus.", a:"Technology: Technologie als Grundlage (KI, Biotech)\n\nDigital: Geschäftsmodell basiert auf digitalen Technologien\n\nSocial: gesellschaftliches Problem lösen, Mission first — Profit second (Too Good To Go)" },
    { id:"E10", q:"Industrielle Revolutionen — Schlüsselpersonen?", desc:"Die Geschichte des Unternehmertums von der 1. bis 4. Revolution.", a:"1. Revolution: Hargreaves, Watt, Stephenson\n2. Revolution: Ford (Fordismus), Toyoda (Just-in-Time/Kaizen), Taylor (Taylorismus)\n3. Revolution: Zuse, Gates, Jobs, Zuckerberg\n4. Revolution: KI, Digitalisierung" },
    { id:"E11", q:"Fordismus vs. Toyotismus — Unterschied?", desc:"Zwei grundlegend verschiedene Produktionsphilosophien.", a:"Fordismus: Massenproduktion, Fließband, große Lager\n\nToyotismus:\n• Just-in-Time (kein Lager)\n• Jidoka (Maschinen stoppen bei Fehler)\n• Kaizen (alle verbessern mit!)\n\nKaizen = Gegenteil von Taylorismus!" },
  ],
  "Finanzierung & Gründung": [
    { id:"F1", q:"Was sind die 6 Phasen des Gründungsprozesses?", desc:"Jedes Unternehmen durchläuft diese 6 Phasen.", a:"1. Ideenfindung/Konzeption\n2. Planungsphase\n3. Gründungsphase\n4. Markteintritt/Startphase\n5. Wachstumsphase/Skalierung\n6. Reifephase/Stabilisierung" },
    { id:"F2", q:"Was ist das Greiner-Wachstumsmodell?", desc:"Unternehmen wachsen in Phasen — jede endet mit einer Krise. Krisen sind NORMAL!", a:"Kreativität → Führungskrise\nFührung → Autonomiekrise\nDelegation → Kontrollkrise\nKoordination → Bürokratiekrise\nKollaboration → Komplexitätskrise\n\nImmolotse: steckt in der Führungskrise!" },
    { id:"F3", q:"Was ist der Unterschied Liquidität vs. Rentabilität?", desc:"Klassische Prüfungsfalle! Profitabel aber illiquid ist möglich.", a:"Liquidität = Zahlungsfähigkeit (Geld auf dem Konto)\n\nRentabilität = Profitabilität (Gewinn > Ausgaben)\n\nWarum profitabel aber illiquid?\nKunde zahlt in 60 Tagen, Lieferant muss sofort bezahlt werden → Liquiditätslücke!\n\n'Gewinn ist eine Meinung, Cash ist eine Tatsache.'" },
    { id:"F4", q:"Was sind die 3 Investorentypen?", desc:"Je nach Wachstumsphase eignen sich unterschiedliche Investoren.", a:"Business Angel: frühe Phase, Kapital + Erfahrung + Netzwerk\n\nVenture Capital: Wachstumsphase, will aggressive Skalierung\n\nCrowdfunding: viele kleine Geldgeber\n\nWandeldarlehen: FK heute → später in Anteile umgewandelt. Du behältst vorerst volle Kontrolle!" },
    { id:"F5", q:"Was sind Lohnnebenkosten und die SVS-Falle?", desc:"Zwei kritische Zahlen für Gründer.", a:"Lohnnebenkosten: ~28%\n• DB: 3,9%\n• DZ: 0,39%\n• Kommunalsteuer: 3%\n• SV Dienstgeberanteil: ~21%\n\nSVS-Nachzahlung im 3. Jahr!\nNeugründer zahlen Mindestbeiträge → im 3. Jahr kommt Nachzahlung für Jahr 1!\n\nFaustregel: 30-50% zurücklegen!" },
    { id:"F6", q:"Was ist Lean Startup (Build-Measure-Learn)?", desc:"Risiken minimieren, früh lernen — Produkte schnell und ressourcenschonend entwickeln.", a:"Build: MVP bauen (kleinstmögliche testbare Version)\nMeasure: Daten sammeln\nLearn: War die Annahme richtig? Anpassen!\n→ Zyklus wiederholen!\n\nImmolotse MVP: rein digital → Feedback 'zu wenig' → Pivot zu Vor-Ort!" },
    { id:"F7", q:"Was ist der Unterschied EK vs. FK vs. Mezzanin?", desc:"3 grundlegende Finanzierungsformen.", a:"Eigenkapital: Investor wird Gesellschafter, hat Mitsprache\n\nFremdkapital: Darlehen, keine Mitsprache, Zinsen\n\nMezzaninkapital: Mischform, verbessert Kreditwürdigkeit\n\nWandeldarlehen: FK heute → Anteile später" },
    { id:"F8", q:"Was ist Freemium?", desc:"Geschäftsmodell: Basisversion kostenlos, Premium kostenpflichtig.", a:"Basis: kostenlos\nPremium: kostenpflichtig\n\nMonetarisierung: Abos, Upgrades, Werbung\n\nBeispiele: Spotify, Dropbox, LinkedIn\n\nImmolotse: kein Freemium aktuell — aber kostenlose Marktpreiseinschätzung als Lead-Magnet möglich" },
  ],
  "Innovationsmanagement": [
    { id:"I1", q:"Was sind die 9 Bausteine des Business Model Canvas?", desc:"Visuelles Werkzeug — zerlegt Geschäftsmodell auf einer Seite.", a:"LINKS:\nSchlüsselpartner, Schlüsselaktivitäten,\nSchlüsselressourcen, Kostenstruktur\n\nMITTE: Wertangebot\n\nRECHTS:\nKundenbeziehungen, Kanäle,\nKundensegmente, Einnahmequellen" },
    { id:"I2", q:"Was sind die 4 Grundfragen des St. Galler Navigators?", desc:"55 Muster aus 250+ Modellen. Innovation durch Rekombination!", a:"Who? — Zielkunden?\nWhat? — Wertangebot?\nHow? — Wertschöpfung?\nWhy? — Erlösmodell?" },
    { id:"I3", q:"Was sind die 6 Phasen des Stage-Gate-Prozesses?", desc:"Bei jedem Gate: weitermachen oder stoppen?", a:"1. Voranalyse\n2. Detailanalyse\n3. Entwicklung (Time-to-Market!)\n4. Tests\n5. Produktion & Markteinführung\n6. Nachlaufphase" },
    { id:"I4", q:"Was sind die 4 Aktionen des ERRC-Rasters?", desc:"Blue Ocean Werkzeug: Value Innovation — Kosten senken UND Nutzen steigern gleichzeitig.", a:"E — Eliminate: Was weglassen?\nR — Reduce: Was reduzieren?\nR — Raise: Was steigern?\nC — Create: Was neu schaffen?\n\nImmolotse: Eliminiert Provision, Kreiert Fixpreismodell!" },
    { id:"I5", q:"Was sind die 3 Bedingungen für einen Hidden Champion?", desc:"Prof. Hermann Simon. Lehre: Fokus vor Diversifikation!", a:"1. Nr. 1 oder 2 weltweit/Europa\n2. Umsatz über 1 Mrd. €\n3. Geringer Bekanntheitsgrad\n\nMerkmal: Sortiment tief statt breit!" },
    { id:"I6", q:"Was sind die 4 Felder der Ansoff-Matrix?", desc:"4 Wachstumsstrategien nach steigendem Risiko.", a:"Marktdurchdringung — besteh./besteh. (geringstes Risiko)\nProduktentwicklung — neu/besteh.\nMarktentwicklung — besteh./neu\nDiversifikation — neu/neu (höchstes Risiko)" },
    { id:"I7", q:"Was sind die 3 Schutzrechte und ihre Schutzdauer?", desc:"Geschäftsmodelle nicht patentierbar! Für Immolotse: Marke!", a:"Patent: max. 20 Jahre\nGebrauchsmuster: 10 Jahre, kein Prüfverfahren\nMarkenrecht: unbegrenzt (je 10 Jahre)\n\nVerletzung → Unterlassung, Schadenersatz, Beseitigung" },
    { id:"I8", q:"Was sind die 3 Innovationsarten?", desc:"Innovation ist nicht gleich Innovation — 3 Typen nach Aufwand und Wirkung.", a:"Inkrementell: kleine Verbesserungen\n\nStrategisch: hoher Aufwand, Bedürfnis noch nicht bewusst\n\nDurchbruch: völlig neue Art Bedürfnisse zu befriedigen\n\n+ Geschäftsmodellinnovation ← Immolotse!" },
    { id:"I9", q:"Was ist Intrapreneurship?", desc:"Unternehmerisches Handeln innerhalb eines Unternehmens.", a:"Mitarbeiter handeln wie Unternehmer — ohne persönliches Risiko\n\nÖsterreich: 65% scheitern, Hauptgrund: interner Widerstand!\n78% sagen: Management-Mitwirkung entscheidend\n\nBeispiel: Google Gmail durch 20%-Zeit" },
  ],
  "Opportunity Recognition": [
    { id:"O1", q:"Was ist eine unternehmerische Opportunity?", desc:"Nicht jede Idee ist eine Opportunity — sie hat spezifische Merkmale.", a:"Situation in der ein neues Angebot GEWINNBRINGEND in den Markt eingeführt werden kann.\n\nBraucht neue Zweck-Mittel-Kombination!\n\nKennzeichen:\n• Oft lange verborgen\n• Entstehen durch Umfeldänderungen\n• Gehen stets vorüber!\n• Mit Risiken verbunden" },
    { id:"O2", q:"Was ist das Window of Opportunity?", desc:"Zeitspanne in der eine Gelegenheit verfolgt werden kann — geht IMMER vorüber!", a:"Immolotse Window:\n• KI-Tools günstig verfügbar\n• Noch kein direkter Wettbewerber\n• Beide zusammen = einzigartiger Moment\n\nLäuft gerade ab — je länger gewartet wird, desto wahrscheinlicher ein Nachahmer!" },
    { id:"O3", q:"Was ist Entrepreneurial Alertness?", desc:"Fähigkeit Opportunities zu erkennen ohne aktiv danach zu suchen.", a:"Non-Alert: ignoriert Informationen, wertet sie ab\n\nAlert: nutzt mentale Schemata um Chancen automatisch zu erkennen\n\nImmolotse: Alert — Pain Points der Verkäufer erkannt, die Makler jahrelang ignorierten (weil sie davon profitieren!)" },
    { id:"O4", q:"Was ist funktionale Fixierung?", desc:"Kognitive Verzerrung die Innovation blockiert.", a:"Wir sehen Konzepte nur in ihrer traditionellen Funktion → Alternativen werden übersehen.\n\nDrucker's Candle Problem: Objekte auf ungewohnte Weise nutzen können.\n\nImmolotse: Makler = funktionale Fixierung (nur Provision). Du hast sie überwunden!" },
    { id:"O5", q:"Was ist der Unterschied Idee vs. Invention vs. Innovation?", desc:"Drei oft verwechselte Begriffe.", a:"Idee: Einfall — noch nicht umgesetzt\n\nInvention: neue Erfindung — unabhängig von Anwendung\n\nInnovation: DURCHGESETZTE Erfindung — erst wenn am Markt erfolgreich!\n\nImmolotse: aktuell Invention → wird zur Innovation sobald kommerziell erfolgreich" },
    { id:"O6", q:"Was ist Technology Push vs. Technology Pull?", desc:"Zwei Wege wie Innovation entsteht.", a:"Technology Push: Technologie sucht Markt\n'Wir haben KI — wofür nutzen wir sie?'\n\nTechnology Pull: Marktbedürfnis zieht Entwicklung\n'Kunden haben Problem — welche Technologie löst es?'\n\nImmolotse: primär Pull (Pain Points zuerst) mit Push-Elementen (KI-Kompetenz vorhanden)" },
  ],
  "Strategic Marketing": [
    { id:"M1", q:"Was sind Porters 5 Forces?", desc:"Analysiert Branchenattraktivität — je schwächer alle 5, desto profitabler.", a:"1. Wettbewerbsintensität\n2. Bedrohung neue Wettbewerber\n3. Bedrohung Ersatzprodukte\n4. Verhandlungsmacht Kunden\n5. Verhandlungsmacht Lieferanten\n\nImmolotse: Neue Wettbewerber = hohe Bedrohung! Willhaben = hohe Lieferantenmacht!" },
    { id:"M2", q:"Was sind die 6 Buchstaben der PESTLE-Analyse?", desc:"Analysiert das Makro-Umfeld.", a:"P — Political\nE — Economic\nS — Social-cultural\nT — Technological\nL — Legal\nE — Environmental" },
    { id:"M3", q:"Was bedeutet VRIO?", desc:"Bewertet ob eine Ressource nachhaltigen Wettbewerbsvorteil schafft.", a:"V — Valuable\nR — Rare\nI — Inimitable\nO — Organized\n\nV✅R✅I❌ = nur vorübergehend\nV✅R✅I✅O✅ = nachhaltig\n\nImmolotse Marke+Erfahrung = nachhaltig!" },
    { id:"M4", q:"Was sind die 4 SWOT-Strategien?", desc:"SWOT allein ist keine Strategie — die Kombination ergibt Optionen.", a:"SO — Stärken nutzen für Chancen\nST — Stärken gegen Bedrohungen\nWO — Schwächen abbauen für Chancen\nWT — Schwächen minimieren gegen Bedrohungen" },
    { id:"M5", q:"Was sind die 7 Ps des Marketing-Mix?", desc:"4 Ps erweitert für Dienstleistungen auf 7 Ps.", a:"Product, Price, Place, Promotion\n\n+ für Dienstleistungen:\nPeople — wer liefert?\nProcess — wie läuft es ab?\nPhysical Evidence — sichtbare Qualitätshinweise" },
    { id:"M6", q:"Was sind die 6 Kriterien einer guten Value Proposition?", desc:"Alle 6 müssen erfüllt sein.", a:"1. Einzigartig\n2. Relevant\n3. Glaubhaft\n4. Machbar\n5. Kommunizierbar (2 Sätze!)\n6. Nachhaltig" },
    { id:"M7", q:"Was sind die 6 Schritte im CRM-Prozess?", desc:"Schritt 1 (Ziele!) wichtiger als Schritt 5 (Software)!", a:"1. Kundenziele definieren\n2. Kundendaten erfassen\n3. Kunden segmentieren\n4. Maßnahmen ableiten\n5. CRM-System auswählen\n6. Analyse & Kontrolle" },
    { id:"M8", q:"Was sind die 4 Perspektiven der Balanced Scorecard?", desc:"Übersetzt Strategie in messbare Kennzahlen — nicht nur Finanzkennzahlen!", a:"1. Finanzen\n2. Kunden\n3. Prozesse\n4. Lernen & Entwicklung" },
    { id:"M9", q:"Was sind Porters 3 Wettbewerbsstrategien?", desc:"Man muss sich entscheiden — sonst 'stuck in the middle'.", a:"1. Kostenführerschaft (Hofer, Ikea)\n2. Differenzierung (Apple, Tesla)\n3. Fokussierung — enge Nische\n\nImmolotse: focused differentiator" },
    { id:"M10", q:"Was ist Blue Ocean vs. Red Ocean?", desc:"Strategie um neue Märkte zu schaffen statt in bestehenden zu kämpfen.", a:"Red Ocean: bestehender Markt, viel Konkurrenz\n\nBlue Ocean: neuer Markt, du definierst die Spielregeln\n\nValue Innovation: Kosten senken UND Nutzen steigern gleichzeitig!\n\nImmolotse = Blue Ocean!" },
  ],
  "Design Thinking": [
    { id:"D1", q:"Was sind die 5 Phasen des Design Thinking?", desc:"ITERATIV — Rücksprünge sind kein Fehler, sondern der Plan!", a:"1. Empathize — Nutzer verstehen\n2. Define — POV + HMW\n3. Ideation — Quantität vor Qualität!\n4. Prototyping — so einfach wie möglich\n5. Testing — kann zurück zu jeder Phase!" },
    { id:"D2", q:"Was sind die 5 Phasen der Customer Journey?", desc:"Weg des Kunden aus seiner Perspektive.", a:"1. Awareness\n2. Consideration\n3. Decision\n4. Use/Experience\n5. Loyalty" },
    { id:"D3", q:"Was ist das POV-Format und die HMW-Frage?", desc:"Define-Phase: klare menschliche Problemformulierung.", a:'POV: "[Nutzer] braucht [Bedürfnis], weil [Insight]."\n\nHMW: "Wie könnten wir...?"\n\nImmolotse: "Jonas braucht günstige professionelle Vermarktung, weil er Geld für sein Eigenheim braucht."' },
    { id:"D4", q:"Design Thinking vs. klassischer Innovationsprozess?", desc:"Beide haben 5 Phasen — klassische Prüfungsfalle!", a:"Design Thinking: nutzerzentriert, iterativ\n\nInnovationsprozess: produktorientiert, linear\n1. Ideenfindung\n2. Konzept & Planung\n3. Entwicklung\n4. Tests\n5. Produktion & Markteinführung" },
    { id:"D5", q:"Was ist Open vs. Closed Innovation?", desc:"Wie offen ist das Unternehmen für externe Innovationsquellen?", a:"Closed: alle Ideen intern\n\nOpen: Ideen auch von außen\n\nCrowdsourcing: Auslagerung an große externe Gruppe\n• Intermediäre Plattformen\n• Unternehmenseigene (BMW)\n• Crowdfunding\n\nImmolotse: aktuell Closed" },
    { id:"D6", q:"Was ist eine Persona?", desc:"Macht abstrakte Zielgruppen greifbar und konkret.", a:"Fiktiver aber realistischer Profiltyp eines idealen Kunden.\n\nInhalte:\n• Demografie (Alter, Beruf, Einkommen)\n• Verhaltensweisen\n• Pains (Probleme)\n• Gains (Wünsche)\n• Motivation\n\nImmolotse Persona: Jonas, 35, Erbe, braucht schnellen Verkauf" },
  ],
  "Personal & Teams": [
    { id:"P1", q:"Was sind die 9 Belbin-Teamrollen?", desc:"9 gleichwertige Rollen. Abwesenheit einer Rolle schwächt das Team!", a:"Handlungsorientiert:\nMacher, Umsetzer, Perfektionist\n\nKommunikationsorientiert:\nKoordinator, Teamarbeiter, Wegbegleiter\n\nWissensorientiert:\nErfinder, Beobachter, Spezialist" },
    { id:"P2", q:"Was sind die 4 Schindler-Positionen?", desc:"4 Positionen in jeder Gruppe — Gamma entscheidet wer Alpha bleibt!", a:"Alpha — führt, gibt Richtung vor\nBeta — Fachwissen, Nummer 2\nGamma — folgt Alpha, stabilisiert\nOmega — hinterfragt (konstruktiv wertvoll!)" },
    { id:"P3", q:"Was bedeutet PERMA?", desc:"Martin Seligman (2018) — 5 Säulen des Wohlbefindens.", a:"P — Positive Emotions\nE — Engagement (Flow)\nR — Relationships\nM — Meaning (Sinn)\nA — Accomplishment (Erfolge feiern!)" },
    { id:"P4", q:"Was sind Kotters 8 Stufen des Change-Managements?", desc:"Berücksichtigt menschlichen Widerstand.", a:"1. Dringlichkeit erzeugen\n2. Führungskoalition aufbauen\n3. Vision entwickeln\n4. Vision kommunizieren\n5. Mitarbeiter befähigen\n6. Schnelle Erfolge\n7. Konsolidieren\n8. In Kultur verankern" },
    { id:"P5", q:"Was sind die Greiner-Wachstumsphasen?", desc:"Krisen sind NORMAL — Immolotse: Führungskrise!", a:"Kreativität → Führungskrise\nFührung → Autonomiekrise\nDelegation → Kontrollkrise\nKoordination → Bürokratiekrise\nKollaboration → Komplexitätskrise" },
    { id:"P6", q:"Was kosten Fehlbesetzung und Fluktuation?", desc:"Für Start-ups existenzbedrohend.", a:"Fehlbesetzung: 30.000 — 140.000€\nFluktuation: ø 14.900€ pro Stelle\n\nHauptursache: faule Kompromisse!" },
    { id:"P7", q:"Was sind die 4 Kulturtypen nach Deal & Kennedy?", desc:"4 Kulturen nach Risikograd und Feedback-Geschwindigkeit.", a:"Machokultur — hoch/schnell\nRisikokultur — hoch/langsam\nVerhaltenskultur — gering/langsam\nArbeits- & Spaßkultur — gering/schnell ← Immolotse!" },
    { id:"P8", q:"Was sind die 6 Kategorien des St. Galler Modells?", desc:"Unternehmen als komplexes offenes System.", a:"Umweltsphären\nInteraktionsthemen\nAnspruchsgruppen\nOrdnungsmomente (Strategie, Struktur, Kultur)\nProzesse\nEntwicklungsmodi" },
    { id:"P9", q:"Was sind die 5 Phasen der Personalentwicklung?", desc:"Phase 4 ist das Hauptproblem!", a:"1. Bedarfsschätzung\n2. PE-Plan\n3. Durchführung\n4. Transfersicherung ← HAUPTPROBLEM!\n5. Erfolgskontrolle" },
    { id:"P10", q:"Was sind die 3 Karrierelaufbahnen?", desc:"Alle 3 sind gleichwertig — von Anfang an klären!", a:"Führungslaufbahn: Personalverantwortung\nProjektlaufbahn: Projektverantwortung\nExpertenlaufbahn: Fachverantwortung" },
  ],
  "Teams & Organisation": [
    { id:"T1", q:"Was ist der Unterschied Team vs. Gruppe?", desc:"Merksatz: Gruppe = gemeinsam da. Team = gemeinsam dran.", a:"Team:\n• EIN gemeinsames Ziel\n• Gemeinsame Verantwortung\n• Hohe Synergien\n\nGruppe:\n• Individuelle Ziele\n• Jeder für sich\n• Geringe Synergien" },
    { id:"T2", q:"Was sind die 4 Organisationsstrukturen?", desc:"4 grundlegende Formen mit eigenen Vor- und Nachteilen.", a:"Einlinien: ein Chef ✅klar / ❌lange Wege\nMehrlinien: mehrere Chefs ✅schnell / ❌Konflikte\nFunktional: nach Funktion ✅Spezialisierung / ❌Abteilungsdenken\nDivisional: nach Produkt/Region ✅Kundennähe / ❌Doppelarbeit\nMatrix: Kombination ✅flexibel / ❌Machtkämpfe" },
    { id:"T3", q:"Was ist Scrum?", desc:"Agiles Framework für iteratives Arbeiten.", a:"Rollen:\n• Product Owner — Was?\n• Scrum Master — Wie?\n• Entwicklungsteam — setzt um\n\nSprint-Ablauf:\n1. Sprint Planning\n2. Daily Scrum\n3. Sprint Review\n4. Retrospektive" },
    { id:"T4", q:"Was ist ein Pivot?", desc:"Strategische Kursänderung basierend auf Erkenntnissen — kein Scheitern!", a:"Kursänderung bei:\n• Zielgruppe\n• Kernfunktion\n• Geschäftsmodell\n• Vertriebsweg\n\nImmolotse Pivot: von rein digital → digital + Vor-Ort nach Feedback" },
    { id:"T5", q:"Was ist Schumpeters schöpferische Zerstörung?", desc:"Innovation als Motor wirtschaftlicher Entwicklung.", a:"Innovationen zerstören bestehende Strukturen — schaffen aber Raum für Neues.\n\nImmolotse = Schöpferische Zerstörung:\nZerstört Maklermodell im Privatverkäufer-Segment, schafft neuen Markt!" },
    { id:"T6", q:"Was ist eine Szenario-Analyse?", desc:"Verschiedene mögliche Zukunftsentwicklungen systematisch betrachten.", a:"1. Schlüsselkräfte identifizieren\n2. 3 Szenarien:\n   • Best Case\n   • Worst Case\n   • Realistisch\n3. Auswirkungen analysieren\n4. Strategien ableiten" },
  ],
  "Steuern": [
    { id:"S1", q:"Was sind die 7 Einkunftsarten (EStG)?", desc:"Betrieblich (§21-23) und außerbetrieblich (§25-29).", a:"§21 Land- und Forstwirtschaft\n§22 Selbständige Arbeit\n§23 Gewerbebetrieb (Auffangtatbestand!)\n§25 Nichtselbständige Arbeit\n§27 Kapitalvermögen (KESt 27,5%)\n§28 Vermietung & Verpachtung\n§29 Sonstige Einkünfte\n\nNicht steuerbar: Lotto, Erbschaft, Schenkungen" },
    { id:"S2", q:"Was sind die ESt-Stufensätze?", desc:"Jede Stufe SEPARAT berechnen! Durchschnittssatz immer niedriger als Grenzsteuersatz.", a:"0 — 13.308€ → 0%\n13.308 — 21.612€ → 20%\n21.612 — 30.000€ → 30%\n30.000 — 60.000€ → 41%\n60.000 — 90.000€ → 48%\n90.000 — 1 Mio€ → 50%\nüber 1 Mio€ → 55%" },
    { id:"S3", q:"ESt-Stufenrechnung bei 30.000€?", desc:"Jede Stufe einzeln berechnen und addieren.", a:"Stufe 1: 0€\nStufe 2: 8.304 × 20% = 1.660,80€\nStufe 3: 8.388 × 30% = 2.516,40€\nGesamt: 4.177,20€\nDurchschnittssatz: 13,92%" },
    { id:"S4", q:"Was sind die Spekulationsfristen?", desc:"Nach Ablauf der Frist: steuerfrei!", a:"Bewegliche Güter (Krypto): 1 Jahr\nImmobilien: 10 Jahre\nHauptwohnsitz: steuerfrei bei mind. 2 Jahre selbst bewohnt\n\nBei Erbschaft zählt Datum des Erblassers!" },
    { id:"S5", q:"Was sind die 3 Gewinnermittlungsarten?", desc:"Thesaurierung nur bei Bilanzierungspflicht möglich!", a:"Betriebsvermögensvergleich:\nGmbH, doppelte Buchführung, Thesaurierung ✅\n\nEAR: Einzelunternehmen, Zu-/Abflussprinzip\n\nKleinunternehmerpauschalierung (<35.000€):\n45% Handel / 20% Dienstleistung!" },
    { id:"S6", q:"Was sind die USt-Steuersätze?", desc:"Zahllast = USt − VSt.", a:"20% — Dienstleistungen, Elektronik, Kleidung\n10% — Lebensmittel, Bücher, Vermietung\n13% — Hotels, Wein ab Hof, Flüge\n\nReverse Charge: B2B EU → Empfänger schuldet Steuer" },
    { id:"S7", q:"Was ist die Arbeitsrecht-Hierarchie?", desc:"Eiserne Regel: NUR VERBESSERN, nie verschlechtern!", a:"1. Gesetz\n2. Kollektivvertrag\n3. Betriebsvereinbarung\n4. Dienstvertrag\n\n5W Urlaub (Gesetz) → 6W KV ✅ → 4W DV ❌ VERBOTEN!" },
    { id:"S8", q:"Was ist Reverse Charge?", desc:"Umkehr der Steuerschuldnerschaft bei B2B EU-Dienstleistungen.", a:"Gilt wenn: B2B Dienstleistung + verschiedene EU-Länder + beide UID-Nummer\n\nLeistender stellt Rechnung OHNE USt\nEmpfänger versteuert selbst\n\nAuch in Österreich: Bauleistungen zwischen Unternehmen!" },
  ],
  "Rechtsformen & M&A": [
    { id:"R1", q:"Rechtsformen: Haftung im Vergleich", desc:"Haftung ist der wichtigste Entscheidungsfaktor.", a:"Einzelunternehmen: persönlich, unbeschränkt ⚠️\nGesbR: gesamtschuldnerisch ⚠️\nOG: persönlich, unbeschränkt ⚠️\nKG: Kompl. unbeschränkt / Komm. beschränkt\nGmbH: nur Gesellschaftsvermögen ✅\nFlexCo: nur Gesellschaftsvermögen ✅" },
    { id:"R2", q:"Rechtsformen: Kapital & Steuer", desc:"Kapitalgesellschaften: KÖSt + Thesaurierung möglich!", a:"EU/GesbR/OG/KG: kein Mindestkapital, ESt\n\nGmbH: min. 10.000€ (seit 2023!)\nKÖSt 23% + KESt 27,5% ✅\n\nFlexCo: min. 1€/Gesellschafter\nKÖSt 23% + KESt 27,5% ✅" },
    { id:"R3", q:"FlexCo vs. GmbH — wichtigste Unterschiede?", desc:"FlexCo seit 1.1.2024 — speziell für Start-ups.", a:"Mindestbetrag: 1€ (statt 70€)\nAnteilsübertragung: kein Notariatsakt!\nUnternehmenswertanteile für Mitarbeiter\n(Dividende ohne Stimmrechte)\nGeneralversammlung schriftlich möglich" },
    { id:"R4", q:"Was ist der Unterschied Asset Deal vs. Share Deal?", desc:"Für Immolotse → Share Deal!", a:"Asset Deal: einzelne Vermögenswerte\n✅ keine Altlasten / ❌ aufwendig\n\nShare Deal: Anteile kaufen\n✅ einfacher / ❌ übernimmt Schulden\n\nImmolotse: Share Deal — Wert liegt in Marke, nicht Maschinen" },
    { id:"R5", q:"Was ist Good Leaver vs. Bad Leaver?", desc:"Ohne Gesellschaftervertrag kein Schutz!", a:"Good Leaver: fairer Austritt → fairer Marktwert\n\nBad Leaver: Betrug, Vertragsbruch → 1€ oder stark reduziert\n+ Wettbewerbsverbot" },
    { id:"R6", q:"Was ist Due Diligence?", desc:"Unternehmens-Check vor Kauf oder Investition.", a:"Geprüft wird:\n• Buchhaltung & Zahlen\n• Verträge\n• Schulden\n• Patente & Marken\n• Kundenstruktur\n• Team & Abhängigkeiten" },
    { id:"R7", q:"Was sind die Merkmale der GesbR?", desc:"Gesellschaft nach bürgerlichem Recht — prüfungsrelevant!", a:"• Min. 2 Personen\n• KEINE eigene Rechtspersönlichkeit\n• Nicht parteifähig\n• Haftung: gesamtschuldnerisch\n• Kein Mindestkapital\n• Kann Gelegenheitsgesellschaft sein\n• Außerordentliche Maßnahmen: Einstimmigkeit!" },
  ],
  "Rechnungswesen": [
    { id:"RW1", q:"Was sind die 5 Teilgebiete des Rechnungswesens?", desc:"Bilanz und GuV extern. Die anderen 3 intern.", a:"Bilanz — Was habe ich/schulde? (Stichtag)\nGuV — Gewinn/Verlust? (Zeitraum)\nKosten-/Leistungsrechnung — wirtschaftlich?\nInvestitionsrechnung — lohnt sich?\nFinanzrechnung — zahlungsfähig?" },
    { id:"RW2", q:"Was sind die Kontenklassen 4, 6, 7, 8, 9?", desc:"Alle Salden laufen im GuV-Konto (9090) zusammen.", a:"4: Betriebliche Erträge (Umsätze)\n6: Personalaufwand\n7: Sonstiger betrieblicher Aufwand\n8: Neutral (Zinsen)\n9: Abschluss (GuV = 9090)" },
    { id:"RW3", q:"Was sind die wichtigsten Kennzahlen-Formeln?", desc:"Quicktest: 4 Kennzahlen, Noten 1-5.", a:"ROI = (Gewinn / Investition) × 100\nROA = (EBIT / Gesamtkapital) × 100\nEigenmittelquote = (EK / GK) × 100\nCashflow = Jahresüberschuss + Abschreibungen\nRunway = Kapital / monatl. Burn Rate\nConversion = (Conversions / Kontakte) × 100" },
    { id:"RW4", q:"Quicktest Note 1 — welche Grenzen?", desc:"Note 1 = sehr gut, Note 5 = kritisch.", a:"Eigenmittelquote: ≥ 30%\nSchuldentilgungsdauer: ≤ 3 Jahre\nCashflow %: ≥ 10%\nGesamtkapitalrentabilität: ≥ 15%" },
    { id:"RW5", q:"Was sind die 3 Unternehmensbewertungsmethoden?", desc:"Für Immolotse → DCF!", a:"Substanzwert: Vermögen − Schulden (Liquidation)\n\nErtragswert: zukünftige Gewinne (KMU)\n\nDCF: zukünftige Cashflows (Start-ups) ← Immolotse!" },
    { id:"RW6", q:"Was ist der GuV-Aufbau?", desc:"Gesamtkostenverfahren — Jahresüberschuss fließt in die Bilanz.", a:"+ Umsatzerlöse\n+ Andere Erträge\n− Materialaufwand\n− Personalaufwand\n− Sonstige Aufwendungen\n− Abschreibungen\n= EBIT\n+/− Finanzergebnis\n= EGT − Steuern\n= Jahresüberschuss" },
    { id:"RW7", q:"Was ist die Bilanz-Struktur?", desc:"Aktiva = Passiva IMMER! Bilanzgleichgewicht.", a:"AKTIVA (Mittelverwendung):\n• Anlagevermögen\n• Umlaufvermögen\n• Liquide Mittel\n\nPASSIVA (Mittelherkunft):\n• Eigenkapital\n• Fremdkapital langfristig\n• Fremdkapital kurzfristig" },
    { id:"RW8", q:"Was ist Cash Burn Rate und Runway?", desc:"Kritisch für Start-ups — wie lange reicht das Kapital?", a:"Burn Rate: wie viel pro Monat 'verbrannt' wird\n\nRunway = Kapital / monatliche Netto-Burn-Rate\n\nBeispiel: 50.000€ / 3.000€ = 16 Monate\n\nMerke: Kapital suchen BEVOR du es dringend brauchst!" },
  ],
};

const ALL_CARDS = Object.values(flashcards).flat();
const TOTAL = ALL_CARDS.length;

function loadKnown() {
  try { const r = localStorage.getItem(STORAGE_KEY); return r ? new Set(JSON.parse(r)) : new Set(); }
  catch { return new Set(); }
}
function saveKnown(k) { try { localStorage.setItem(STORAGE_KEY, JSON.stringify([...k])); } catch {} }

export default function App() {
  const [known, setKnown] = useState(loadKnown);
  const [cat, setCat] = useState(null);
  const [deck, setDeck] = useState([]);
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [sessionRight, setSessionRight] = useState(0);
  const [sessionWrong, setSessionWrong] = useState(0);
  const [phase, setPhase] = useState("pick");
  const [showReset, setShowReset] = useState(false);
  const touchStartX = useRef(null);

  const updateKnown = (s) => { saveKnown(s); setKnown(new Set(s)); };

  function startCat(c) {
    setCat(c);
    const unk = flashcards[c].filter(x => !known.has(x.id));
    if (!unk.length) { setPhase("empty"); return; }
    setDeck([...unk].sort(() => Math.random() - 0.5));
    setIdx(0); setFlipped(false); setSessionRight(0); setSessionWrong(0);
    setPhase("card");
  }

  function mark(correct) {
    const card = deck[idx];
    const next = new Set(known);
    if (correct) { next.add(card.id); setSessionRight(r => r+1); }
    else { next.delete(card.id); setSessionWrong(w => w+1); }
    updateKnown(next);
    if (idx + 1 >= deck.length) setPhase("done");
    else { setIdx(i => i+1); setFlipped(false); }
  }

  function confirmReset() {
    updateKnown(new Set()); setCat(null); setPhase("pick"); setShowReset(false);
  }

  // Touch swipe for flip
  function onTouchStart(e) { touchStartX.current = e.touches[0].clientX; }
  function onTouchEnd(e) {
    if (touchStartX.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(diff) > 40) setFlipped(f => !f);
  }

  const totalKnown = known.size;
  const pct = Math.round(totalKnown / TOTAL * 100);
  const card = phase === "card" && deck[idx];
  const catTotal = cat ? flashcards[cat].length : 0;
  const catKnown = cat ? flashcards[cat].filter(x => known.has(x.id)).length : 0;
  const catUnknown = catTotal - catKnown;
  const co = { bg:"#f0f4f8", dark:"#1a3a5c", mid:"#2e6da4", green:"#16a34a", red:"#dc2626" };

  return (
    <div style={{ fontFamily:"system-ui,sans-serif", background:co.bg, minHeight:"100vh", padding:"10px", maxWidth:"600px", margin:"0 auto" }}>

      {/* Reset modal */}
      {showReset && (
        <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.55)", zIndex:100, display:"flex", alignItems:"center", justifyContent:"center", padding:"20px" }}>
          <div style={{ background:"white", borderRadius:"16px", padding:"26px 22px", maxWidth:"320px", width:"100%", textAlign:"center" }}>
            <div style={{ fontSize:"32px", marginBottom:"10px" }}>🗑️</div>
            <h3 style={{ color:co.dark, marginBottom:"8px", fontSize:"16px" }}>Fortschritt zurücksetzen?</h3>
            <p style={{ color:"#666", fontSize:"13px", marginBottom:"18px" }}>Alle {totalKnown} gelernten Karten werden zurückgesetzt.</p>
            <div style={{ display:"flex", gap:"10px" }}>
              <button onClick={() => setShowReset(false)} style={{ flex:1, padding:"11px", background:"#f0f4f8", border:"none", borderRadius:"10px", fontWeight:"600", cursor:"pointer" }}>Abbrechen</button>
              <button onClick={confirmReset} style={{ flex:1, padding:"11px", background:"#fee2e2", color:co.red, border:"none", borderRadius:"10px", fontWeight:"600", cursor:"pointer" }}>Zurücksetzen</button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div style={{ textAlign:"center", marginBottom:"10px" }}>
        <h1 style={{ color:co.dark, fontSize:"18px", margin:"0 0 2px" }}>🎓 Immolotse Karteikarten</h1>
        <p style={{ color:"#999", fontSize:"11px", margin:0 }}>{TOTAL} Karten · 11 Blöcke</p>
      </div>

      {/* Stats bar */}
      <div style={{ background:"white", borderRadius:"12px", padding:"10px 12px", marginBottom:"10px", boxShadow:"0 2px 8px rgba(0,0,0,0.06)", display:"flex", alignItems:"center", gap:"8px" }}>
        <div style={{ flex:1 }}>
          <div style={{ fontSize:"11px", fontWeight:"600", color:co.dark }}>{pct}% ({totalKnown}/{TOTAL})</div>
          <div style={{ background:"#dde6f0", borderRadius:"6px", height:"5px", marginTop:"3px", overflow:"hidden" }}>
            <div style={{ background:co.green, height:"100%", width:pct+"%", borderRadius:"6px", transition:"width 0.4s" }} />
          </div>
        </div>
        <div style={{ textAlign:"center" }}><div style={{ fontSize:"16px", fontWeight:"700", color:co.green }}>{totalKnown}</div><div style={{ fontSize:"9px", color:"#888" }}>✅</div></div>
        <div style={{ textAlign:"center" }}><div style={{ fontSize:"16px", fontWeight:"700", color:co.red }}>{TOTAL-totalKnown}</div><div style={{ fontSize:"9px", color:"#888" }}>❌</div></div>
        <button onClick={() => setShowReset(true)} style={{ background:"#fee2e2", color:co.red, border:"none", borderRadius:"8px", padding:"7px 10px", fontSize:"11px", fontWeight:"600", cursor:"pointer" }}>🗑️</button>
      </div>

      {/* Categories */}
      <div style={{ display:"flex", flexWrap:"wrap", gap:"6px", justifyContent:"center", marginBottom:"10px" }}>
        {Object.keys(flashcards).map(name => {
          const t = flashcards[name].length;
          const k = flashcards[name].filter(x => known.has(x.id)).length;
          const u = t - k;
          const done = u === 0;
          const active = cat === name && phase === "card";
          return (
            <button key={name} onClick={() => startCat(name)} style={{
              padding:"5px 10px", paddingRight:"20px",
              border:`2px solid ${active ? co.mid : co.dark}`,
              borderRadius:"20px", background: active ? co.mid : (done ? "#dcfce7" : "white"),
              color: active ? "white" : (done ? co.green : co.dark),
              fontSize:"11px", cursor:"pointer", fontWeight:"500", position:"relative"
            }}>
              {name}
              <span style={{ position:"absolute", top:"-6px", right:"-6px", background: done ? co.green : co.red, color:"white", borderRadius:"10px", fontSize:"9px", padding:"1px 4px", fontWeight:"700" }}>
                {done ? "✓" : u}
              </span>
            </button>
          );
        })}
      </div>

      {/* Pick */}
      {phase === "pick" && (
        <div style={{ textAlign:"center", background:"white", borderRadius:"16px", padding:"28px 16px", boxShadow:"0 4px 16px rgba(0,0,0,0.08)", flex:1, display:"flex", flexDirection:"column", justifyContent:"center" }}>
          <div style={{ fontSize:"32px", marginBottom:"8px" }}>👆</div>
          <div style={{ color:co.dark, fontWeight:"600", fontSize:"15px" }}>Wähle eine Kategorie</div>
          <div style={{ color:"#888", fontSize:"12px", marginTop:"4px" }}>Nur offene Karten werden angezeigt</div>
        </div>
      )}

      {/* Empty */}
      {phase === "empty" && (
        <div style={{ textAlign:"center", background:"#dcfce7", borderRadius:"16px", padding:"28px 16px", flex:1, display:"flex", flexDirection:"column", justifyContent:"center" }}>
          <div style={{ fontSize:"32px", marginBottom:"8px" }}>🎉</div>
          <div style={{ color:co.green, fontWeight:"700", fontSize:"16px" }}>Alle Karten gelernt!</div>
          <div style={{ color:co.green, fontSize:"12px", marginTop:"4px" }}>Wähle eine andere Kategorie.</div>
        </div>
      )}

      {/* Card */}
      {phase === "card" && card && (
        <div style={{ display:"flex", flexDirection:"column", gap:"8px" }}>
          {/* Progress */}
          <div>
            <div style={{ background:"#dde6f0", borderRadius:"6px", height:"4px", overflow:"hidden" }}>
              <div style={{ background:co.mid, height:"100%", width:(idx/deck.length*100)+"%", transition:"width 0.3s", borderRadius:"6px" }} />
            </div>
            <div style={{ textAlign:"center", fontSize:"10px", color:"#888", marginTop:"3px" }}>
              {idx+1}/{deck.length} — {cat} ({catKnown}/{catTotal})
            </div>
          </div>

          {/* CARD — fixed height 220px, always leaves room for buttons */}
          <div
            onClick={() => setFlipped(f => !f)}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            style={{ cursor:"pointer", perspective:"1000px", height:"220px", flexShrink:0 }}
          >
            <div style={{ position:"relative", height:"100%", transformStyle:"preserve-3d", transition:"transform 0.4s", transform: flipped ? "rotateY(180deg)" : "none" }}>
              {/* Front */}
              <div style={{ position:"absolute", width:"100%", height:"100%", backfaceVisibility:"hidden", background:"white", borderRadius:"14px", padding:"16px", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", textAlign:"center", boxShadow:"0 4px 16px rgba(0,0,0,0.09)", border:"2px solid #dde6f0" }}>
                <div style={{ fontSize:"9px", fontWeight:"600", textTransform:"uppercase", letterSpacing:"1px", color:"#bbb", marginBottom:"8px" }}>Frage</div>
                <div style={{ fontSize:"14px", fontWeight:"700", color:co.dark, lineHeight:"1.4" }}>{card.q}</div>
                <div style={{ fontSize:"10px", color:"#ccc", marginTop:"10px" }}>Tippe zum Umdrehen</div>
              </div>
              {/* Back */}
              <div style={{ position:"absolute", width:"100%", height:"100%", backfaceVisibility:"hidden", background:co.dark, borderRadius:"14px", padding:"12px 14px", display:"flex", flexDirection:"column", transform:"rotateY(180deg)", boxShadow:"0 4px 16px rgba(0,0,0,0.12)", overflow:"hidden" }}>
                <div style={{ fontSize:"9px", fontWeight:"600", textTransform:"uppercase", letterSpacing:"1px", color:"rgba(255,255,255,0.4)", marginBottom:"3px" }}>Antwort</div>
                <div style={{ fontSize:"9px", color:"rgba(255,255,255,0.55)", fontStyle:"italic", marginBottom:"5px", paddingBottom:"5px", borderBottom:"1px solid rgba(255,255,255,0.15)", lineHeight:"1.3", flexShrink:0 }}>{card.desc}</div>
                <div style={{ fontSize:"11px", color:"white", lineHeight:"1.55", whiteSpace:"pre-line", overflow:"auto", flex:1 }}>{card.a}</div>
              </div>
            </div>
          </div>

          {/* Buttons — fixed below card */}
          {!flipped ? (
            <button onClick={() => setFlipped(true)} style={{ width:"100%", background:co.dark, color:"white", border:"none", borderRadius:"12px", padding:"14px", fontSize:"15px", fontWeight:"600", cursor:"pointer" }}>
              Antwort zeigen 👁️
            </button>
          ) : (
            <div style={{ display:"flex", gap:"10px" }}>
              <button onClick={() => mark(false)} style={{ flex:1, background:"#fee2e2", color:co.red, border:"none", borderRadius:"12px", padding:"14px", fontSize:"15px", fontWeight:"700", cursor:"pointer" }}>
                ❌ Nochmal
              </button>
              <button onClick={() => mark(true)} style={{ flex:1, background:"#dcfce7", color:co.green, border:"none", borderRadius:"12px", padding:"14px", fontSize:"15px", fontWeight:"700", cursor:"pointer" }}>
                ✅ Gewusst
              </button>
            </div>
          )}
        </div>
      )}

      {/* Done */}
      {phase === "done" && (
        <div style={{ textAlign:"center", background:"white", borderRadius:"16px", padding:"28px 16px", boxShadow:"0 4px 16px rgba(0,0,0,0.09)", flex:1, display:"flex", flexDirection:"column", justifyContent:"center" }}>
          <h2 style={{ color:co.dark, fontSize:"18px", marginBottom:"6px" }}>
            {sessionWrong === 0 ? "🏆 Gemeistert!" : "Runde fertig!"}
          </h2>
          <div style={{ fontSize:"48px", fontWeight:"700", color:co.mid, margin:"12px 0" }}>
            {deck.length ? Math.round(sessionRight/deck.length*100) : 100}%
          </div>
          <p style={{ color:"#888", fontSize:"13px", marginBottom:"16px" }}>{sessionRight} gewusst · {sessionWrong} nochmal</p>
          <div style={{ display:"flex", gap:"10px", justifyContent:"center" }}>
            <button onClick={() => startCat(cat)} style={{ background:co.dark, color:"white", border:"none", borderRadius:"10px", padding:"12px 20px", fontSize:"13px", fontWeight:"600", cursor:"pointer" }}>🔄 Nochmal</button>
            {catUnknown > 0 && (
              <button onClick={() => startCat(cat)} style={{ background:"#fee2e2", color:co.red, border:"none", borderRadius:"10px", padding:"12px 20px", fontSize:"13px", fontWeight:"600", cursor:"pointer" }}>❌ {catUnknown} offene</button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
