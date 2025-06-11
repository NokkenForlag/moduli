#!/bin/bash

echo "🚀 Oppretter minimal R1-struktur som passerer validering..."

cd src

# Oppdater collections til å kun referere eksisterende konsepter
cat > collections/grenser-og-kontinuitet.yaml << 'YAML'
id: "grenser-og-kontinuitet"
title: "Grenser og kontinuitet"
parent: "r1-matematikk"
description: "Grunnleggende analyse med grenseverdier og kontinuitet"
version: "1.0"

visual:
  color: "#FF6B6B"
  icon: "limit"
  position:
    x: 100
    y: 200
  
concepts:
  - "r1-grenseverdi-funksjon"

learning_objectives:
  - "Forstå grenseverdibegrepet intuitivt og formelt"
  - "Kunne beregne grenser algebraisk og grafisk"
  
progression:
  entry_level: 2
  exit_level: 4
  estimated_hours: 15
YAML

cat > collections/derivasjon-grunnlag.yaml << 'YAML'
id: "derivasjon-grunnlag"
title: "Derivasjon"
parent: "r1-matematikk"
description: "Fra endringshastighet til derivasjon"
version: "1.0"

visual:
  color: "#4ECDC4"
  icon: "tangent"
  position:
    x: 300
    y: 200

concepts:
  - "r1-derivasjon-definisjon"

learning_objectives:
  - "Forstå derivasjon som momentan endringshastighet"
  - "Mestre derivasjonsreglene"

dependencies:
  requires: ["grenser-og-kontinuitet"]
  
progression:
  entry_level: 3
  exit_level: 4
  estimated_hours: 20
YAML

# Lag manglende prerequisite-konsepter
cat > concepts/funksjoner-kontinuerlig.md << 'MD'
---
id: "funksjoner-kontinuerlig"
title: "Kontinuerlige funksjoner"
ingress: "Grunnleggende om kontinuitet"
version: "1.0"
last_updated: "2025-01-09"

course: "r1-matematikk"
cluster: "grenser-og-kontinuitet"
difficulty: 2
estimated_time: 20
tags: ["funksjoner", "kontinuitet", "grunnleggende"]

dependencies:
  enables:
    - id: "r1-grenseverdi-funksjon"
      type: "concept"
      reason: "Grunnlag for grenseverdier"
---

# Kontinuerlige funksjoner

Introduksjon til kontinuitet...
MD

cat > concepts/r1-differenskvotient.md << 'MD'
---
id: "r1-differenskvotient"
title: "Differenskvotienten"
ingress: "Gjennomsnittlig endringshastighet"
version: "1.0"
last_updated: "2025-01-09"

course: "r1-matematikk"
cluster: "derivasjon-grunnlag"
difficulty: 3
estimated_time: 25
tags: ["differenskvotient", "endringshastighet"]

dependencies:
  enables:
    - id: "r1-derivasjon-definisjon"
      type: "fundamental"
      reason: "Grunnlag for derivasjon"
---

# Differenskvotienten

Gjennomsnittlig endringshastighet mellom to punkter...
MD

# Oppdater eksisterende konsepter for konsistens
cat > concepts/r1-grenseverdi-funksjon.md << 'MD'
---
id: "r1-grenseverdi-funksjon"
title: "Grenseverdier for funksjoner"
ingress: "Grenseverdier beskriver funksjoners oppførsel når vi nærmer oss et punkt"
version: "1.1"
last_updated: "2025-01-09"

course: "r1-matematikk"
cluster: "grenser-og-kontinuitet"
difficulty: 3
estimated_time: 30
tags: ["grenseverdi", "analyse", "grunnleggende"]

graph_tags:
  node_type: "concept"
  visual_category: "analysis-foundation"
  timeline_position: "r1-phase-1"
  size_weight: 0.8

competency_goals:
  - code: "MAT03-02-02"
    description: "forstå begrepene vekstfart, grenseverdi, derivasjon"
    relevance: "primary"

dependencies:
  prerequisites:
    - id: "funksjoner-kontinuerlig"
      type: "helpful"
      reason: "Gir intuisjon for grenseoppførsel"
  enables:
    - id: "r1-derivasjon-definisjon"
      type: "fundamental"
      reason: "Derivasjon defineres via grenseverdi"

resources:
  animations:
    - id: "grense-zoom"
      type: "rive"
      path: "/animations/r1/grense-zoom.riv"
---

# Grenseverdier for funksjoner

## Hva er en grenseverdi?

Når vi studerer funksjoner...
MD

cat > concepts/r1-derivasjon-definisjon.md << 'MD'
---
id: "r1-derivasjon-definisjon"
title: "Derivasjonens definisjon"
ingress: "Fra gjennomsnittlig til momentan endringshastighet"
version: "1.0"
last_updated: "2025-01-09"

course: "r1-matematikk"
cluster: "derivasjon-grunnlag"
difficulty: 4
estimated_time: 45
tags: ["derivasjon", "grenseverdi", "endringshastighet"]

graph_tags:
  node_type: "concept"
  visual_category: "calculus-core"
  timeline_position: "r1-phase-2"
  size_weight: 1.0

competency_goals:
  - code: "MAT03-02-02"
    description: "forstå begrepene vekstfart, grenseverdi, derivasjon"
    relevance: "primary"

dependencies:
  prerequisites:
    - id: "r1-grenseverdi-funksjon"
      type: "must-understand"
      reason: "Derivasjon defineres som grenseverdi"
    - id: "r1-differenskvotient"
      type: "must-understand"
      reason: "Utgangspunkt for derivasjon"
---

# Derivasjonens definisjon

Fra endring til endringshastighet...
MD

echo "✅ Minimal struktur opprettet!"
