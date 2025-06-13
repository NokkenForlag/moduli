---
id: r1-kontinuitet
title: Kontinuitet
description: Funksjoner uten brudd eller hopp
tags: ["kalkulus","funksjoner"]
difficulty: 3
type: concept
relations:
  - to: r1-derivasjon
    type: prerequisite-for
  - to: r1-integrasjon
    type: related-to
  - to: c1-kalkulus
    type: part-of
---
# Kontinuitet

En funksjon $f$ er kontinuerlig i et punkt $a$ hvis:
1. $f(a)$ er definert
2. $\lim_{x \to a} f(x)$ eksisterer
3. $\lim_{x \to a} f(x) = f(a)$

## Typer diskontinuitet
- **Hoppsdiskontinuitet**: Venstre- og høyregrense eksisterer men er ulike
- **Fjernbar diskontinuitet**: Grensen eksisterer men $f(a)$ mangler eller er ulik grensen
- **Essensiell diskontinuitet**: Minst én ensidig grense eksisterer ikke