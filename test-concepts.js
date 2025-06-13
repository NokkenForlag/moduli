import fs from 'fs';
import path from 'path';

// Test concepts for Moduli - Calculus theme
const concepts = [
  {
    id: 'r1-funksjoner',
    title: 'Funksjoner',
    description: 'Grunnleggende forståelse av funksjoner og deres egenskaper',
    tags: ['grunnleggende', 'algebra'],
    difficulty: 2,
    relations: [
      { to: 'r1-grenseverdi', type: 'prerequisite-for' },
      { to: 'r1-kontinuitet', type: 'prerequisite-for' }
    ],
    content: `
# Funksjoner

En funksjon er en relasjon mellom to mengder hvor hvert element i den første mengden (definisjonsmengden) er tilordnet nøyaktig ett element i den andre mengden (verdimengden).

## Notasjon
Vi skriver $f: A \\to B$ for å indikere at $f$ er en funksjon fra mengde $A$ til mengde $B$.

## Viktige egenskaper
- **Injektiv** (en-til-en): Forskjellige input gir forskjellige output
- **Surjektiv** (på): Alle elementer i verdimengden blir truffet
- **Bijektiv**: Både injektiv og surjektiv
`
  },
  {
    id: 'r1-grenseverdi',
    title: 'Grenseverdi',
    description: 'Konseptet om hva som skjer når vi nærmer oss et punkt',
    tags: ['kalkulus', 'grenser'],
    difficulty: 3,
    relations: [
      { to: 'r1-kontinuitet', type: 'prerequisite-for' },
      { to: 'r1-derivasjon', type: 'prerequisite-for' },
      { to: 'c1-kalkulus', type: 'part-of' }
    ],
    content: `
# Grenseverdi

Grenseverdien av en funksjon $f(x)$ når $x$ nærmer seg $a$ er verdien som $f(x)$ nærmer seg når $x$ kommer vilkårlig nær $a$.

## Definisjon
$$\\lim_{x \\to a} f(x) = L$$

betyr at for enhver $\\epsilon > 0$ finnes det en $\\delta > 0$ slik at:
$$0 < |x - a| < \\delta \\Rightarrow |f(x) - L| < \\epsilon$$

## Regneregler
- $\\lim_{x \\to a} [f(x) + g(x)] = \\lim_{x \\to a} f(x) + \\lim_{x \\to a} g(x)$
- $\\lim_{x \\to a} [f(x) \\cdot g(x)] = \\lim_{x \\to a} f(x) \\cdot \\lim_{x \\to a} g(x)$
`
  },
  {
    id: 'r1-kontinuitet',
    title: 'Kontinuitet',
    description: 'Funksjoner uten brudd eller hopp',
    tags: ['kalkulus', 'funksjoner'],
    difficulty: 3,
    relations: [
      { to: 'r1-derivasjon', type: 'prerequisite-for' },
      { to: 'r1-integrasjon', type: 'related-to' },
      { to: 'c1-kalkulus', type: 'part-of' }
    ],
    content: `
# Kontinuitet

En funksjon $f$ er kontinuerlig i et punkt $a$ hvis:
1. $f(a)$ er definert
2. $\\lim_{x \\to a} f(x)$ eksisterer
3. $\\lim_{x \\to a} f(x) = f(a)$

## Typer diskontinuitet
- **Hoppsdiskontinuitet**: Venstre- og høyregrense eksisterer men er ulike
- **Fjernbar diskontinuitet**: Grensen eksisterer men $f(a)$ mangler eller er ulik grensen
- **Essensiell diskontinuitet**: Minst én ensidig grense eksisterer ikke
`
  },
  {
    id: 'r1-derivasjon',
    title: 'Derivasjon',
    description: 'Momentan endringsrate og tangenter',
    tags: ['kalkulus', 'differensialregning'],
    difficulty: 4,
    relations: [
      { to: 'r1-integrasjon', type: 'related-to' },
      { to: 'r1-kjerneregelen', type: 'leads-to' },
      { to: 'r1-optimering', type: 'leads-to' },
      { to: 'c1-kalkulus', type: 'part-of' }
    ],
    content: `
# Derivasjon

Den deriverte av en funksjon $f$ i et punkt $a$ er den momentane endringsraten:

$$f'(a) = \\lim_{h \\to 0} \\frac{f(a+h) - f(a)}{h}$$

## Derivasjonsregler
- $(x^n)' = nx^{n-1}$
- $(e^x)' = e^x$
- $(\\ln x)' = \\frac{1}{x}$
- $(\\sin x)' = \\cos x$
- $(\\cos x)' = -\\sin x$

## Anvendelser
- Finne tangentlinjer
- Bestemme ekstremalpunkter
- Analysere funksjoners vekst
`
  },
  {
    id: 'r1-integrasjon',
    title: 'Integrasjon',
    description: 'Areal under kurver og antideriverte',
    tags: ['kalkulus', 'integralregning'],
    difficulty: 4,
    relations: [
      { to: 'r1-areal-volum', type: 'leads-to' },
      { to: 'c1-kalkulus', type: 'part-of' }
    ],
    content: `
# Integrasjon

Integrasjon er den inverse operasjonen til derivasjon. Det bestemte integralet gir arealet under en kurve.

## Fundamentalteoremet
Hvis $F'(x) = f(x)$, så:
$$\\int_a^b f(x)\\,dx = F(b) - F(a)$$

## Integrasjonsteknikker
- Substitusjon: $\\int f(g(x))g'(x)\\,dx = \\int f(u)\\,du$
- Delvis integrasjon: $\\int u\\,dv = uv - \\int v\\,du$
`
  },
  {
    id: 'r1-kjerneregelen',
    title: 'Kjerneregelen',
    description: 'Derivasjon av sammensatte funksjoner',
    tags: ['kalkulus', 'derivasjon'],
    difficulty: 4,
    relations: [
      { to: 'r1-implisitt-derivasjon', type: 'leads-to' }
    ],
    content: `
# Kjerneregelen

For sammensatte funksjoner $f(g(x))$:
$$(f \\circ g)'(x) = f'(g(x)) \\cdot g'(x)$$

## Eksempel
La $h(x) = \\sin(x^2)$. Da er:
$$h'(x) = \\cos(x^2) \\cdot 2x = 2x\\cos(x^2)$$
`
  },
  {
    id: 'r1-optimering',
    title: 'Optimering',
    description: 'Finne maksimum og minimum',
    tags: ['kalkulus', 'anvendt'],
    difficulty: 4,
    relations: [
      { to: 't1-optimeringsproblemer', type: 'leads-to' }
    ],
    content: `
# Optimering

Bruk derivasjon til å finne ekstremalpunkter:
1. Finn kritiske punkter hvor $f'(x) = 0$
2. Bruk andrederiverte-testen: 
   - $f''(x) > 0$ → minimum
   - $f''(x) < 0$ → maksimum
`
  },
  {
    id: 'c1-kalkulus',
    title: 'Kalkulus',
    description: 'Samling av grunnleggende kalkuluskonsepter',
    tags: ['samling'],
    difficulty: 3,
    type: 'collection',
    relations: [],
    content: `
# Kalkulus - Samling

Denne samlingen dekker grunnleggende konsepter i kalkulus:
- Grenseverdier
- Kontinuitet  
- Derivasjon
- Integrasjon
`
  },
  {
    id: 't1-grenseverdi-oppgaver',
    title: 'Grenseverdi-oppgaver',
    description: 'Praktiske oppgaver for grenseverdier',
    tags: ['oppgaver', 'kalkulus'],
    difficulty: 3,
    type: 'task',
    relations: [],
    content: `
# Oppgaver - Grenseverdier

1. Finn $\\lim_{x \\to 2} (x^2 - 4)/(x - 2)$
2. Beregn $\\lim_{x \\to 0} \\sin(x)/x$
3. Bestem $\\lim_{x \\to \\infty} (1 + 1/x)^x$
`
  },
  {
    id: 't1-optimeringsproblemer',
    title: 'Optimeringsproblemer',
    description: 'Praktiske optimeringsproblemer',
    tags: ['oppgaver', 'anvendt'],
    difficulty: 4,
    type: 'task',
    relations: [],
    content: `
# Oppgaver - Optimering

1. En bonde har 100m gjerde. Finn dimensjonene som gir maksimalt areal.
2. Finn punktet på parabelen $y = x^2$ som er nærmest punktet $(3, 0)$.
`
  }
];

// Create content directory
const contentDir = path.join(process.cwd(), 'content', 'konsepter');
if (!fs.existsSync(contentDir)) {
  fs.mkdirSync(contentDir, { recursive: true });
}

// Generate markdown files
concepts.forEach(concept => {
  const frontmatter = `---
id: ${concept.id}
title: ${concept.title}
description: ${concept.description}
tags: ${JSON.stringify(concept.tags)}
difficulty: ${concept.difficulty}
type: ${concept.type || 'concept'}
relations:${concept.relations.length === 0 ? ' []' : '\n' + concept.relations.map(r => `  - to: ${r.to}\n    type: ${r.type}`).join('\n')}
---`;

  const fullContent = frontmatter + '\n' + concept.content.trim();
  const filepath = path.join(contentDir, `${concept.id}.md`);
  
  fs.writeFileSync(filepath, fullContent);
  console.log(`Created: ${filepath}`);
});

console.log(`\n✅ Created ${concepts.length} test concepts in ${contentDir}`);
