#!/bin/bash
# split-framework-docs.sh

echo "🔧 Splitter framework-dokumentasjon..."

# Backup original
cp docs/framework/README.md docs/framework/README.md.backup

# Create directories
mkdir -p docs/framework/{guides,templates,reference}
mkdir -p .ai/instructions

# Extract and save quick-start.md
echo "📄 Oppretter quick-start.md..."
cat > docs/framework/guides/quick-start.md << 'EOF'
# 🚀 Rask start med Moduli-konsepter

## Steg 1: Minimal konsept (5 min)

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
  requires: ["n-1-3"]  # Tallmønstre
  enables: ["a-2-1"]   # Ligninger
```

## Steg 2: Legg til faginnhold

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

## Steg 3: Separat oppgavebank

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

## Neste steg

→ [Les forfatterguiden](./author-guide.md) for mer detaljer
EOF

# Extract konsept-minimal.yaml
echo "📄 Oppretter konsept-minimal.yaml..."
sed -n '/# Minimal mal - kun det essensielle/,/^---$/p' docs/framework/README.md.backup | sed '$d' > docs/framework/templates/konsept-minimal.yaml

# Extract objektbibliotek.yaml  
echo "📄 Oppretter objektbibliotek.yaml..."
sed -n '/# Bibliotek over matematiske objekter/,/^---$/p' docs/framework/README.md.backup | sed '$d' > docs/framework/reference/objektbibliotek.yaml

# Extract AI instructions to separate file
echo "📄 Oppretter AI-integrasjon..."
sed -n '/## 🤖 AI-integrasjon i Moduli/,/^---$/p' docs/framework/README.md.backup | sed '$d' > docs/framework/reference/ai-integration.md

# Create content structure guide
echo "📄 Oppretter content-structure.md..."
cat > docs/framework/guides/content-structure.md << 'EOF'
# Mappestruktur for konsepter

## Standard struktur

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

## Navnekonvensjoner

- **ID-format**: `[strand]-[nivå]-[nummer]`
  - `a` = algebra
  - `g` = geometri
  - `n` = tall
  - `s` = statistikk

## Filtyper

- `.yaml` - Strukturert metadata og oppgaver
- `.md` - Faglig innhold og forklaringer  
- `.json` - Genererte indekser (ikke rediger manuelt)
EOF

# Create author guide placeholder
echo "📄 Oppretter author-guide.md..."
cat > docs/framework/guides/author-guide.md << 'EOF'
# Forfatterguide

> TODO: Flytt innhold fra eksempler/guide-forfatter.md

## Innhold kommer snart

Denne guiden vil dekke:
- Beste praksis for konseptskriving
- Pedagogiske retningslinjer
- Vanlige feil å unngå
- Eksempler på god praksis
EOF

# Replace original README with modular version
echo "📄 Oppdaterer README.md..."
cp docs/framework/README.md.backup docs/framework/README-original.md
# (Her ville du kopiert inn den modulære versjonen)

# Create AI instructions for .ai folder
echo "📄 Oppretter .ai/instructions/..."
cp docs/framework/reference/ai-integration.md .ai/instructions/ai-integration-guide.md

echo "✅ Ferdig! Sjekk filene:"
echo ""
find docs/framework -name "*.md" -o -name "*.yaml" | sort
echo ""
echo "Backup lagret som: docs/framework/README-original.md"
