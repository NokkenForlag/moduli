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
