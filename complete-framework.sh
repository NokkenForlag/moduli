#!/bin/bash
# complete-framework.sh - Fullfører framework-strukturen

echo "📁 Oppretter resterende filer..."

# Lag FAQ
cat > docs/framework/guides/faq.md << 'EOF'
# Ofte stilte spørsmål

## Generelt

**Q: Hvor lang tid tar det å lage et konsept?**
A: Med minimal mal: 5-30 min. Standard: 30-60 min. Komplett: 2-4 timer.

**Q: Må jeg bruke alle tokens?**
A: Nei, bruk kun de 30 kjernetokens + relevante utvidede.

**Q: Kan jeg gjenbruke innhold fra andre konsepter?**
A: Referer heller enn å kopiere. Bruk relasjoner aktivt.

## Teknisk

**Q: Hvordan validerer jeg konseptet mitt?**
A: Kjør `npm run validate:concept [sti-til-konsept]`

**Q: Hva hvis relasjons-ID ikke finnes ennå?**
A: Bruk placeholder (f.eks. "TODO-X-Y-Z") og marker for oppfølging.

## Pedagogisk

**Q: Hvordan vet jeg riktig vanskelighetsgrad?**
A: Se på forkunnskapene og test med målgruppen når mulig.

**Q: Må alle oppgavetyper være med?**
A: Ja, følg 40/25/20/15 fordelingen for balansert læring.

Se [author-guide.md](./author-guide.md) for flere detaljer.
EOF

# Lag advanced guide
cat > docs/framework/guides/advanced-guide.md << 'EOF'
# Avansert guide

For erfarne forfattere som vil utnytte rammeverket fullt ut.

## Avanserte konsepter

### Sammensatte relasjoner
- Sykliske avhengigheter
- Valgfrie forkunnskaper
- Parallelle læringsstier

### Rike oppgavetyper
- Flertrinns utforskninger
- Prosjektbaserte oppgaver
- Tverrfaglige koblinger

### AI-optimalisering
- Semantisk merking for bedre søk
- Metadata for adaptiv læring
- Trigger-basert differensiering

## Verktøy for viderekomne

- Graf-analyse av konseptnettverk
- Automatisk oppgavegenerering
- A/B-testing av innhold

[Kommer snart - under utvikling]
EOF

# Lag konsept-full.yaml
cat > docs/framework/templates/konsept-full.yaml << 'EOF'
# Full mal for omfattende konsepter
# For dyptgående moduler med alle features

# [Inkluderer alt fra standard + følgende]

# === UTVIDET METADATA ===
extendedMetadata:
  keywords: ["nøkkelord1", "nøkkelord2"]
  crossCurricular: ["fysikk", "økonomi"]
  culturalNotes: "Relevans i ulike kulturer"
  historicalContext: "Matematikkhistorisk bakgrunn"

# === MULTIMODALE RESSURSER ===
resources:
  videos:
    - id: "intro-video"
      url: "videos/linear-intro.mp4"
      duration: "3:45"
      purpose: "Motivasjon og oversikt"
      
  interactives:
    - id: "parameter-explorer"
      type: "geogebra"
      embed: "https://geogebra.org/..."
      
  animations:
    - id: "slope-animation"
      file: "animations/slope.json"
      tool: "rive"

# === FORSKNINGSBASERT ===
research:
  commonDifficulties:
    - source: "Tall, 2019"
      finding: "70% strever med parametertolkning"
      intervention: "Fargebasert differensiering"
      
  effectiveStrategies:
    - source: "Niss & Højgaard, 2011"
      strategy: "Kompetanseorientert"
      implementation: "Fokus på modellering"

# [Fortsetter med flere seksjoner...]
EOF

# Lag validation guide
cat > docs/framework/reference/validation.md << 'EOF'
# Valideringsregler

## Teknisk validering

### YAML-struktur
- Gyldig YAML-syntaks
- Påkrevde felter til stede
- Korrekte datatyper

### Relasjoner
- Alle ID-er eksisterer
- Ingen sykliske avhengigheter
- Logiske koblinger

### Tokens
- Følger token-syntaks
- Bruker gyldige tokens
- Konsistent bruk

## Pedagogisk validering

### Innholdsstruktur
- Klar progresjon
- Passende lengde
- Varierte eksempler

### Oppgavekvalitet
- Følger fordeling (40/25/20/15)
- Gradert vanskelighet
- Tydelige instruksjoner

### Differensiering
- Konkrete støttetiltak
- Realistiske utvidelser
- Inkluderende design

## Sjekkliste

```bash
# Automatisk validering
npm run validate:all

# Manuell sjekk
- [ ] Les gjennom som elev
- [ ] Test oppgaver
- [ ] Verifiser lenker
- [ ] Sjekk bilder/media
```
EOF

# Lag semantic search guide
cat > docs/framework/reference/semantic-search.md << 'EOF'
# Semantisk søk i Moduli

## Hvordan det fungerer

Moduli bruker tokens og metadata for intelligent søk:

1. **Konseptindeksering**: Alle tokens og relasjoner indekseres
2. **Semantisk matching**: Søk forstår kontekst, ikke bare nøkkelord
3. **Relasjonsbasert ranking**: Nærliggende konsepter prioriteres

## Søkeoptimalisering

### For forfattere
- Bruk beskrivende titler
- Merk med relevante tokens
- Definer klare relasjoner
- Inkluder synonymer i metadata

### Eksempel
```yaml
searchOptimization:
  synonyms: ["lineær", "førstegradsfunksjon", "rett linje"]
  relatedTerms: ["stigningstall", "konstantledd", "y=ax+b"]
  commonQueries: ["hvordan finne stigningstall", "hva er lineær funksjon"]
```

## AI-integrasjon

AI-assistenten bruker søk for å:
- Finne relevante konsepter
- Foreslå læringsstier
- Identifisere kunnskapshull
- Anbefale differensiering
EOF

# Lag graph integration guide
cat > docs/framework/reference/graph-integration.md << 'EOF'
# Graf-integrasjon

## Konseptgrafen

Alle konsepter danner en kunnskapsgraf:

```
[Variabler] --enables--> [Funksjoner] --enables--> [Derivasjon]
     |                         |
  requires                 requires  
     |                         |
[Tallforståelse]    [Koordinatsystem]
```

## Datastruktur

```typescript
interface ConceptNode {
  id: string;
  title: string;
  position: { x: number; y: number };
  level: number;
  strand: string;
  connections: {
    requires: string[];
    enables: string[];
    relatedTo: string[];
  };
}
```

## Visualisering med Rive

Graf-eksporten genererer:
- Noder med størrelse basert på kompleksitet
- Farger basert på strand (algebra=blå, geometri=grønn)
- Linjer med ulik tykkelse for relasjonstype
- Interaktiv navigering

## Bruksområder

1. **Navigasjon**: Visuell oversikt
2. **Planlegging**: Se læringsstier
3. **Diagnostikk**: Identifiser hull
4. **Adaptiv**: Foreslå neste steg
EOF

# Oppdater hovedstruktur
echo "📊 Oppretter strukturoversikt..."
tree -I 'node_modules|dist' docs/framework > docs/framework/STRUCTURE.md

echo "✅ Ferdig! Framework-struktur komplett."
echo ""
echo "Neste steg:"
echo "1. Gjennomgå alle filer"
echo "2. Tilpass til prosjektets behov"
echo "3. Start innholdsproduksjon med malene"
