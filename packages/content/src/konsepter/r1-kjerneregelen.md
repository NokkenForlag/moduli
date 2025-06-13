---
id: r1-kjerneregelen
title: Kjerneregelen
description: Derivasjon av sammensatte funksjoner
tags: ["kalkulus","derivasjon"]
difficulty: 4
type: concept
relations:
  - to: r1-implisitt-derivasjon
    type: leads-to
---
# Kjerneregelen

For sammensatte funksjoner $f(g(x))$:
$$(f \circ g)'(x) = f'(g(x)) \cdot g'(x)$$

## Eksempel
La $h(x) = \sin(x^2)$. Da er:
$$h'(x) = \cos(x^2) \cdot 2x = 2x\cos(x^2)$$