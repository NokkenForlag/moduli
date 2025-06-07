# Moduli Konseptrammeverk v4.1

## 📁 Filstruktur

```
moduli-rammeverk/
├── README.md                    # Denne filen
├── quick-start.md              # Kom raskt i gang
├── ai-instructions.md          # AI-systemets rolle og bruk
├── maler/
│   ├── konsept-minimal.yaml    # Enkel mal for rask start
│   ├── konsept-standard.yaml   # Full mal med alle felter
│   └── oppgavebank.yaml        # Mal for oppgavesamlinger
├── struktur/
│   ├── tokens-kjerne.yaml      # 30 essensielle tokens
│   ├── tokens-full.yaml        # Alle 89 tokens
│   └── objektbibliotek.yaml    # Matematiske objektdefinisjoner
├── eksempler/
│   ├── a-1-1-variabler/
│   │   ├── konsept.md          # Faginnhold
│   │   ├── oppgaver.yaml       # Oppgavebank
│   │   └── metadata.yaml       # Konseptmetadata
│   └── guide-forfatter.md      # Veiledning for forfattere
└── verktoy/
    ├── validate-concept.js     # Valideringsskript
    └── graph-export.js         # Eksporter til graf
```

---

# README.md

## 🎯 Moduli Konseptrammeverk v4.1

Et strukturert system for å utvikle AI-klart matematisk læringsinnhold med pedagogisk dybde og semantisk navigerbarhet.

### 🚀 Tre kjerneprinsipp

#### 1. **AI som aktiv fagassistent**

Innholdet struktureres slik at AI kan:

- 🔍 **Søke**: Finne relevante konsepter basert på semantiske relasjoner
- 💬 **Utdype**: Forklare faginnhold med forståelse for objektegenskaper
- 🧠 **Veilede**: Støtte problemløsning uten å gi direkte svar

#### 2. **Tofaset innholdsstruktur**

- 📖 **Faginnhold**: Klare, forklarende tekster om matematiske objekter
- 🧩 **Oppgavebank**: Separate samlinger med pedagogisk merkede oppgaver

#### 3. **Matematiske objekter som entiteter**

Alle konsepter definerer eksplisitt:

- **Egenskaper**: Hva objektet kan og er
- **Relasjoner**: Hvordan det henger sammen med andre objekter
- **Anvendelser**: Når og hvordan objektet brukes

### 📚 For innholdsutviklere

#### Nivå 1: Kom i gang (5 min)

```bash
# 1. Kopier minimal mal
cp maler/konsept-minimal.yaml mitt-konsept.yaml

# 2. Fyll ut de 5 obligatoriske feltene

# 3. Valider
node verktoy/validate-concept.js mitt-konsept.yaml
```

Se [quick-start.md](./quick-start.md) for detaljer.

#### Nivå 2: Standard konsept (30 min)

- Bruk `konsept-standard.yaml` for full struktur
- Definer matematiske objekter eksplisitt
- Legg til pedagogiske tokens

#### Nivå 3: Komplett modul (2+ timer)

- Separat faginnhold (`.md`) og oppgavebank (`.yaml`)
- Rike relasjoner og metadata
- AI-optimaliserte søkeord og objektbeskrivelser

### 🤖 For AI-systemer

Se [ai-instructions.md](./ai-instructions.md) for:

- Hvordan parse konseptstrukturen
- Regler for oppgavegenerering
- Veiledningsprinsipper for problemløsning

### 📊 For systemutviklere

#### Graf-eksport

```javascript
// Generer graf-struktur for Rive/visualisering
node verktoy/graph-export.js
// Output: graph.json med noder og relasjoner
```

#### Metadata-tilgang

Alle konsepter eksponerer:

- `objects`: Matematiske objekter med egenskaper
- `relations`: Eksplisitte koblinger
- `prerequisites` / `enables`: Avhengigheter
- `aiMetadata`: Spesifikke AI-hint

---

# quick-start.md

## 🚀 Rask start med Moduli-konsepter

### Steg 1: Minimal konsept (5 min)

```yaml
# mitt-konsept.yaml
id: "a-1-1"
title: "Variabler"
level: 8
strand: algebra

# Matematisk objekt (NYTT!)
mathematicalObject:
  type: "symbol"
  represents: "unknown quantity"
  properties:
    - "can take different values"
    - "consistent within expression"

# Enkle læringsmål
learningGoals:
  - "Forstå at {var:x} representerer et tall"
  - "Beregne {expr:2x+3} når {value:x=5}"

# Basis relasjoner
relations:
  requires: ["n-1-3"] # Tallmønstre
  enables: ["a-2-1"] # Ligninger
```

### Steg 2: Legg til faginnhold

```markdown
# variabler.md

## Hva er en variabel?

En **variabel** er et symbol (ofte en bokstav som {var:x}) som
representerer et ukjent eller varierende tall.

### Objektegenskaper

- Kan ha forskjellige verdier
- Samme symbol = samme verdi i ett uttrykk
- Kan manipuleres som tall

### Eksempel

Hvis {var:x} = 5, så er {expr:2x+3} = 2·5 + 3 = 13.
```

### Steg 3: Separat oppgavebank

```yaml
# variabler-oppgaver.yaml
oppgaver:
  utforskning:
    - id: "var-1"
      prompt: "Finn mønsteret i tallrekken 3, 5, 7..."
      hint: "Se på differansen mellom tallene"
      token: "{task:explore}"

  øving:
    - id: "var-2"
      prompt: "Beregn {expr:3x+2} når {value:x=4}"
      answer: 14
      token: "{task:practice}"
```

---

# ai-instructions.md

## 🤖 AI-integrasjon i Moduli

### Oversikt

Som AI-assistent i Moduli har du tre hovedroller:

1. **Innholdsveileder** - Hjelpe brukere finne relevante konsepter
2. **Faglig assistent** - Utdype og forklare matematiske objekter
3. **Problemløsningsveileder** - Guide uten å gi fasit

### 1. Innholdsveileder

#### Semantisk søk

```python
# Pseudo-kode for konseptsøk
def find_relevant_concepts(query):
    # 1. Identifiser matematiske objekter i spørsmålet
    objects = extract_mathematical_objects(query)

    # 2. Søk i objektbiblioteket
    relevant = search_by_properties(objects)

    # 3. Følg relasjoner
    expanded = follow_relations(relevant, depth=2)

    return rank_by_relevance(expanded)
```

#### Eksempel-dialog

**Bruker**: "Hvordan regner jeg ut omkretsen?"
**AI**: "Jeg fant disse relevante konseptene:

- 📐 Omkrets av rektangel (g-2-1)
- 🔄 Omkrets av sirkel (g-3-2)
- 📏 Måleenheter (n-4-1)

Hvilket område er du interessert i?"

### 2. Faglig assistent

#### Objektbasert forklaring

Når du forklarer konsepter:

1. Start med objektets **grunnleggende egenskaper**
2. Vis **konkrete eksempler**
3. Koble til **relaterte objekter**

```markdown
**Bruker**: "Hva er en funksjon?"

**AI**: "En funksjon er et matematisk objekt som:

**Egenskaper**:

- Tar inn én verdi (input)
- Gir ut én verdi (output)
- Samme input → alltid samme output

**Eksempel**:
f(x) = 2x + 3

- Input x = 5 → Output = 13
- Input x = 0 → Output = 3

**Relatert til**:

- Variabler (input/output er variable)
- Grafer (visuell representasjon)
- Ligninger (når f(x) = noe)"
```

### 3. Problemløsningsveileder

#### Veiledningsprinsipper

**ALDRI**:

- ❌ Gi direkte svar
- ❌ Løse oppgaven for eleven
- ❌ Si "det er lett" eller minimere utfordringen

**ALLTID**:

- ✅ Still oppklarende spørsmål
- ✅ Pek på relevante objektegenskaper
- ✅ Foreslå strategier, ikke løsninger

#### Eksempel-veiledning

```markdown
**Bruker**: "Hvordan finner jeg x i 2x + 3 = 11?"

**AI**: "Godt spørsmål! La oss tenke på hva vi vet om ligninger:

🤔 **Refleksjonsspørsmål**:

- Hva betyr likhetstegnet i en ligning?
- Hva skjer hvis du gjør det samme på begge sider?

💡 **Hint om strategi**:
Ligninger er som vekter i balanse. Kan du gjøre noe
for å isolere x på én side?"

[Hvis eleven strever]

**AI**: "Prøv dette:

1. Hva kan du gjøre for å bli kvitt '+3'?
2. Husk: gjør det samme på begge sider!"
```

### Token-basert oppgavehåndtering

```yaml
# Oppgavetyper og AI-respons
tokens:
  "{task:explore}":
    approach: "open_ended"
    guidance: "encourage_patterns"
    avoid: "direct_answers"

  "{task:practice}":
    approach: "verify_steps"
    guidance: "confirm_process"
    feedback: "specific_errors"

  "{task:connect}":
    approach: "highlight_relations"
    guidance: "compare_representations"

  "{task:transfer}":
    approach: "scaffold_adaptation"
    guidance: "find_similarities"
    avoid: "solve_for_them"
```

### Objektbibliotek-integrasjon

Når du møter et matematisk konsept:

1. **Identifiser objekttype** fra `objektbibliotek.yaml`
2. **Hent egenskaper** for kontekstuell forståelse
3. **Følg relasjoner** for helhetlig svar

```yaml
# Eksempel fra objektbibliotek
variabel:
  type: "symbol"
  properties:
    - "representerer ukjent størrelse"
    - "kan ha ulike verdier"
    - "konsistent i samme kontekst"
  operations:
    - "addisjon/subtraksjon"
    - "multiplikasjon/divisjon"
  generalizes: ["konkrete tall"]
  enables: ["funksjoner", "ligninger"]
```

### Praktiske retningslinjer

#### Søkestrategi

```python
# Prioritering ved konseptsøk
1. Eksakte treff på objektnavn
2. Treff på egenskaper
3. Treff via relasjoner
4. Fuzzy match på beskrivelser
```

#### Tone og språk

- 🗣️ **Vennlig og støttende** - aldri nedlatende
- 🎯 **Presis men tilgjengelig** - unngå unødvendig sjargong
- 🔄 **Tilpass nivået** - se på `level` i metadata

#### Differensiering

```markdown
# Les diff-tokens for tilpasning

{diff:support} → Gi mer konkrete eksempler
{diff:extend} → Utfordre med generalisering
{diff:visual} → Bruk diagrammer/figurer
```

---

# konsept-minimal.yaml

```yaml
# Minimal mal - kun det essensielle
id: "XX-Y-Z"
title: "Konsepttittel"
level: 8 # klassetrinn
strand: algebra # number|algebra|geometry|statistics|calculus

# NYTT: Matematisk objekt (obligatorisk)
mathematicalObject:
  type: "navn på objekttype"
  represents: "hva objektet representerer"
  properties:
    - "egenskap 1"
    - "egenskap 2"

# Læringsmål
learningGoals:
  - "Eleven kan..."
  - "Eleven forstår..."

# Relasjoner
relations:
  requires: ["id-1", "id-2"] # Forkunnskaper
  enables: ["id-3", "id-4"] # Muliggjør

# Basis oppgavefordeling
taskDistribution:
  exploration: 40
  practice: 25
  connection: 20
  transfer: 15
```

---

# objektbibliotek.yaml

```yaml
# Bibliotek over matematiske objekter
objects:
  tall:
    category: "grunnleggende"
    properties:
      - "representerer mengde"
      - "kan ordnes på tallinje"
      - "har aritmetiske egenskaper"
    operations: ["addisjon", "subtraksjon", "multiplikasjon", "divisjon"]
    specialCases: ["null", "negative", "desimaler", "brøk"]
    enables: ["variabler", "funksjoner", "måling"]

  variabel:
    category: "algebraisk"
    properties:
      - "symbolsk representasjon"
      - "kan ha ulike verdier"
      - "følger algebraiske regler"
    generalizes: ["tall"]
    enables: ["uttrykk", "ligninger", "funksjoner"]

  funksjon:
    category: "relasjonell"
    properties:
      - "mapper input til output"
      - "deterministisk"
      - "kan visualiseres som graf"
    requires: ["variabel", "koordinatsystem"]
    types: ["lineær", "kvadratisk", "eksponentiell"]

  ligning:
    category: "relasjonell"
    properties:
      - "påstand om likhet"
      - "kan løses"
      - "har løsningsmengde"
    requires: ["variabel", "likhet"]
    types: ["lineær", "kvadratisk", "system"]

  geometrisk_figur:
    category: "romlig"
    properties:
      - "har form og størrelse"
      - "kan måles"
      - "har symmetriegenskaper"
    subtypes:
      polygon: ["trekant", "firkant", "mangekant"]
      kurve: ["sirkel", "ellipse", "parabel"]
    measurements: ["omkrets", "areal", "vinkel"]

  vektor:
    category: "romlig"
    properties:
      - "har størrelse og retning"
      - "kan adderes"
      - "kan skaleres"
    requires: ["koordinatsystem", "tall"]
    enables: ["transformasjoner", "fysikk-modellering"]

# Relasjonstyper mellom objekter
relationTypes:
  generalizes: "Er en generalisering av"
  specializes: "Er et spesialtilfelle av"
  requires: "Forutsetter forståelse av"
  enables: "Muliggjør forståelse av"
  represents: "Representerer"
  transforms: "Transformerer"
```

---

# Mappestruktur for konsepter

```
konsepter/
├── a-1-1-variabler/
│   ├── metadata.yaml      # Konseptmetadata
│   ├── innhold.md        # Faglig innhold
│   ├── oppgaver.yaml     # Oppgavebank
│   └── notater.md        # Interne notater (valgfritt)
├── g-2-3-pytagoras/
│   ├── metadata.yaml
│   ├── innhold.md
│   ├── oppgaver.yaml
│   └── visualiseringer/  # Bilder/animasjoner
└── index.json            # Generert konseptindeks
```

## Avsluttende kommentar

Denne v4.1 reflekterer tydeligere:

1. **AI-rollen** er eksplisitt definert med konkrete eksempler
2. **Tofaset struktur** med separate filer for innhold og oppgaver
3. **Matematiske objekter** som førsteklasses entiteter med egenskaper

Rammeverket er nå:

- ✅ Enklere å starte med (minimal mal)
- ✅ Tydeligere om AI-integrasjon
- ✅ Bedre strukturert for skalering
- ✅ Klar for graf-visualisering via objektrelasjoner

**Anbefaling**: Dette er klar for v4.1 checkpoint. Fremtidige forbedringer (v4.2+) kan inkludere:

- Interaktiv konseptbygger
- AI-genererte oppgaveforslag
- Automatisk graf-layout fra relasjoner
