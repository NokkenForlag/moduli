---
id: r1-grenseverdi
title: Grenseverdi
description: Konseptet om hva som skjer når vi nærmer oss et punkt
tags: ["kalkulus","grenser"]
difficulty: 3
type: concept
relations:
  - to: r1-kontinuitet
    type: prerequisite-for
  - to: r1-derivasjon
    type: prerequisite-for
  - to: c1-kalkulus
    type: part-of
---
# Grenseverdi

Grenseverdien av en funksjon $f(x)$ når $x$ nærmer seg $a$ er verdien som $f(x)$ nærmer seg når $x$ kommer vilkårlig nær $a$.

## Definisjon
$$\lim_{x \to a} f(x) = L$$

betyr at for enhver $\epsilon > 0$ finnes det en $\delta > 0$ slik at:
$$0 < |x - a| < \delta \Rightarrow |f(x) - L| < \epsilon$$

## Regneregler
- $\lim_{x \to a} [f(x) + g(x)] = \lim_{x \to a} f(x) + \lim_{x \to a} g(x)$
- $\lim_{x \to a} [f(x) \cdot g(x)] = \lim_{x \to a} f(x) \cdot \lim_{x \to a} g(x)$