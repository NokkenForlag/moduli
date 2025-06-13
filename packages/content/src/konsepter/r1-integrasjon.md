---
id: r1-integrasjon
title: Integrasjon
description: Areal under kurver og antideriverte
tags: ["kalkulus","integralregning"]
difficulty: 4
type: concept
relations:
  - to: r1-areal-volum
    type: leads-to
  - to: c1-kalkulus
    type: part-of
---
# Integrasjon

Integrasjon er den inverse operasjonen til derivasjon. Det bestemte integralet gir arealet under en kurve.

## Fundamentalteoremet
Hvis $F'(x) = f(x)$, så:
$$\int_a^b f(x)\,dx = F(b) - F(a)$$

## Integrasjonsteknikker
- Substitusjon: $\int f(g(x))g'(x)\,dx = \int f(u)\,du$
- Delvis integrasjon: $\int u\,dv = uv - \int v\,du$