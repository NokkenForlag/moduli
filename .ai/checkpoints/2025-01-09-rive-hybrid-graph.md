# 📸 Checkpoint: Rive Hybrid Graf-arkitektur

**Dato**: 2025-01-09  
**Sesjonsfokus**: #graph #rive #architecture

## ✅ Hva vi har oppnådd

### 1. **Arkitekturbeslutning: Hybrid grafmotor**
- ✅ Rive brukes for **visuell presentasjon** av noder og interaksjon
- ✅ Graphology/JS håndterer **graf-struktur og layout-algoritmer**
- ✅ All fagdata kommer fra **Markdown/YAML backend**
- ✅ Ingen hardkoding av innhold i Rive-filer

### 2. **Teknisk design**
```
Markdown → GraphBuilder → LayoutEngine → RiveNodes
(Data)     (Struktur)    (Posisjon)    (Visuals)
```

### 3. **Rive Data Bindings**
- Bruker Rive's nye data binding API for clean separasjon
- Sender hele objekter til Rive: `rive.setData({ node: fullNodeObject })`
- Skalerer til 200+ konsepter

### 4. **Implementeringsplan**
- Uke 1: Grunnleggende hybrid med 10 konsepter
- Fokus på RiveNodePool og GraphBuilder
- Clear separasjon mellom data og presentasjon

## 📁 Filer opprettet/endret

```
packages/graph/
├── src/
│   ├── core/
│   │   └── GraphBuilder.ts
│   ├── layout/
│   │   ├── LayoutManager.ts
│   │   └── LayoutCache.ts
│   └── render/
│       └── RiveNodePool.ts (med data bindings)
└── package.json

apps/web/src/lib/components/graph/
└── HybridGraph.svelte
```

## 🎯 Neste steg (ikke i denne sesjonen)

1. Implementere og teste graf-komponenter
2. Designe graph-node.riv med data bindings
3. Koble til faktiske konseptdata fra Markdown

## 💡 Viktige lærdommer

- **Data bindings** i Rive er game-changer for skalerbarhet
- **Hybrid arkitektur** gir best av begge verdener
- **Tydelig separasjon** mellom data og visualisering er kritisk

---

# 🚀 Initial Prompt for Neste Sesjon

```markdown
# Moduli-sesjon: R1 Konseptoppbygging

## Kontekst
- **Forrige checkpoint**: Rive Hybrid Graf-arkitektur
- **Fokus**: #content #r1 #relational-structure
- **Mål**: Bygge modulære R1-konsepter med relasjonell struktur

## Vedlagt
- [ ] Moduli konseptrammeverk v4.1
- [ ] R1 læreplan (REA3022)
- [ ] Graf-arkitektur beslutning (ADR-001)

## Status
Vi har landet på hybrid graf-arkitektur hvor Rive visualiserer mens backend 
håndterer data. Nå skal vi bygge selve innholdet - R1-konseptene som skal 
fungere både i hierarkisk navigasjon og graf-visualisering.

## Oppgave
Jeg trenger hjelp med å:

1. **Strukturere R1-faget** i modulære konsepter (ikke kapitler!)
2. **Designe YAML-frontmatter** som støtter:
   - Relasjonelle koblinger (prerequisites, enables)
   - Kompetansemål-mapping (REA3022)
   - Multiple navigasjonsveier
   - Kobling til oppgaver/animasjoner

3. **Lage 2-3 eksempelkonsepter** som viser:
   - Korrekt fil- og mappestruktur
   - Rik relasjonell metadata
   - God faglig oppdeling
   - Hvordan samme konsept kan nås fra ulike veier

## Spesifikke behov
- Konseptene skal kunne vises i **hierarkisk fagvisning** (R1-siden)
- Men også fungere som **noder i kunnskapsgrafen**
- YAML må være fremtidsrettet for AI-veiledning og adaptive læringsstier

## R1 Hovedområder (fra læreplan)
1. Derivasjon og derivasjonsregler
2. Funksjonsdrøfting
3. Integrasjon
4. Differensiallikninger
5. Vektorer i planet og rommet
6. [Andre relevante områder]

Kan du hjelpe meg designe en robust struktur som starter med 
derivasjon-området?
```

## 🎯 Eksempel-konsepter for R1 (preview for neste sesjon)

### Konsept 1: Grenseverdier
```yaml
---
id: "r1-grenser-grunnleggende"
title: "Grenseverdier"
ingress: "Grenseverdier beskriver hva som skjer når vi nærmer oss et punkt"
competency_goals: 
  - "REA3022-01"  # utforske og beskrive egenskapene til funksjoner
level: "r1"
difficulty: 3
tags:
  - "grenser"
  - "analyse"
  - "grunnleggende-konsept"

# Relasjonell struktur
prerequisites:
  - id: "funksjoner-kontinuitet"
    type: "must-understand"
    reason: "Grenser krever forståelse av funksjoners oppførsel"

enables:
  - id: "r1-derivasjon-definisjon"
    type: "direct"
    reason: "Derivasjon defineres via grenseverdi"
  - id: "r1-kontinuitet-diskontinuitet"
    type: "concept"
    reason: "Grenser avgjør kontinuitet"

related_concepts:
  - id: "r1-asymproter"
    type: "application"
  - id: "uendelig-små-størrelser"
    type: "historical"

# Navigasjonsstruktur
navigation:
  parent: "r1-analyse-grunnlag"
  order: 1
  alternate_paths:
    - "fra-funksjoner/avanserte-egenskaper"
    - "matematisk-analyse/grunnleggende"

# Pedagogisk metadata
representations: ["grafisk", "algebraisk", "numerisk"]
common_misconceptions:
  - "Grenseverdi må være lik funksjonsverdien"
  - "Grenser eksisterer alltid"
cognitive_demands: ["abstraksjon", "visualisering"]
---

# Grenseverdier

[Innhold kommer her...]
```

### Konsept 2: Derivasjonsdefinisjon
```yaml
---
id: "r1-derivasjon-definisjon"
title: "Derivasjonens definisjon"
ingress: "Derivasjon måler momentan endringshastighet via grenseverdier"
competency_goals: 
  - "REA3022-02"  # bruke derivasjon til å analysere funksjoner
level: "r1"
difficulty: 4
tags:
  - "derivasjon"
  - "definisjon"
  - "grenseverdi-anvendelse"

prerequisites:
  - id: "r1-grenser-grunnleggende"
    type: "must-understand"
    reason: "Derivasjon defineres som grenseverdi"
  - id: "funksjoner-graf"
    type: "helpful"
    reason: "Grafisk forståelse av stigningstall"

enables:
  - id: "r1-derivasjonsregler-potens"
    type: "direct"
  - id: "r1-derivasjonsregler-sum"
    type: "direct"
  - id: "r1-tangent-normaler"
    type: "application"

# Ulike læringsstier
learning_paths:
  from_physics:
    previous: ["fysikk-hastighet-akselerasjon"]
    emphasis: "hastighet som derivert av posisjon"
  from_geometry:
    previous: ["sekant-tangent"]
    emphasis: "tangent som grense av sekanter"
  from_algebra:
    previous: ["differanskvotient"]
    emphasis: "algebraisk manipulasjon"

# Koblinger til ressurser
resources:
  animations:
    - id: "sekant-til-tangent"
      type: "rive"
      path: "/assets/rive/r1/derivasjon-definisjon.riv"
  exercises:
    - category: "grunnleggende"
      count: 10
      auto_generate: true
    - category: "bevis"
      count: 3
---

# Derivasjonens definisjon

[Innhold kommer her...]
