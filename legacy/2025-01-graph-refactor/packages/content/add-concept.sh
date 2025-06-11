#!/bin/bash
# Hjelpescript for å legge til nye konsepter

if [ $# -lt 2 ]; then
    echo "Bruk: ./add-concept.sh <konsept-id> <tittel> [cluster]"
    echo "Eksempel: ./add-concept.sh r1-tangentlinje 'Tangentlinjer' derivasjon-grunnlag"
    exit 1
fi

ID=$1
TITLE=$2
CLUSTER=${3:-"derivasjon-grunnlag"}

cat > src/concepts/$ID.md << MD
---
id: "$ID"
title: "$TITLE"
ingress: "TODO: Legg til ingress"
version: "1.0"
last_updated: "$(date +%Y-%m-%d)"

course: "r1-matematikk"
cluster: "$CLUSTER"
difficulty: 3
estimated_time: 30
tags: ["TODO"]

dependencies:
  prerequisites: []
  enables: []
---

# $TITLE

TODO: Legg til innhold...
MD

echo "✅ Opprettet src/concepts/$ID.md"
echo "Husk å:"
echo "1. Oppdatere dependencies"
echo "2. Legge til i relevant collection"
echo "3. Kjøre 'pnpm validate' for å sjekke"
