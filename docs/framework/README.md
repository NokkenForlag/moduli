# Moduli Konseptrammeverk v4.1

## 🎯 Oversikt

Moduli Konseptrammeverk er et strukturert system for å utvikle AI-klart matematisk læringsinnhold med pedagogisk dybde og semantisk navigerbarhet.

## 🚀 Tre kjerneprinsipp

### 1. **AI som aktiv fagassistent**
Innholdet struktureres slik at AI kan:
- 🔍 **Søke**: Finne relevante konsepter basert på semantiske relasjoner
- 💬 **Utdype**: Forklare faginnhold med forståelse for objektegenskaper
- 🧠 **Veilede**: Støtte problemløsning uten å gi direkte svar

→ [Les mer om AI-integrasjon](./reference/ai-integration.md)

### 2. **Tofaset innholdsstruktur**
- 📖 **Faginnhold**: Klare, forklarende tekster om matematiske objekter
- 🧩 **Oppgavebank**: Separate samlinger med pedagogisk merkede oppgaver

→ [Se mappestruktur for konsepter](./guides/content-structure.md)

### 3. **Matematiske objekter som entiteter**
Alle konsepter definerer eksplisitt:
- **Egenskaper**: Hva objektet kan og er
- **Relasjoner**: Hvordan det henger sammen med andre objekter
- **Anvendelser**: Når og hvordan objektet brukes

→ [Utforsk objektbiblioteket](./reference/objektbibliotek.yaml)

## 📚 Dokumentasjon

### For innholdsutviklere

| Nivå | Tid | Guide | Mal |
|------|-----|-------|-----|
| **Nivå 1: Kom i gang** | 5 min | [Quick Start](./guides/quick-start.md) | [Minimal mal](./templates/konsept-minimal.yaml) |
| **Nivå 2: Standard** | 30 min | [Forfatterguide](./guides/author-guide.md) | [Standard mal](./templates/konsept-standard.yaml) |
| **Nivå 3: Avansert** | 2+ timer | [Komplett guide](./guides/advanced-guide.md) | [Full mal](./templates/konsept-full.yaml) |

### For systemutviklere

- 🏗️ [Arkitektur og design](../architecture/)
- 🔧 [API-dokumentasjon](../api/)
- 📊 [Graf-integrasjon](./reference/graph-integration.md)
- 🧪 [Validering og testing](./reference/validation.md)

### For AI-systemer

- 🤖 [AI-integrasjonsguide](./reference/ai-integration.md)
- 🏷️ [Token-referanse](./reference/tokens.yaml)
- 🔍 [Semantisk søk](./reference/semantic-search.md)

## 📁 Rammeverkets struktur

```
framework/
├── README.md                    # Denne filen
├── guides/                      # Veiledninger
│   ├── quick-start.md          # 5-minutters intro
│   ├── author-guide.md         # For innholdsutviklere
│   ├── reviewer-guide.md       # For faggranskere
│   └── content-structure.md    # Mappestruktur
├── templates/                   # Maler
│   ├── konsept-minimal.yaml    # Minimal mal (5 felt)
│   ├── konsept-standard.yaml   # Standard mal
│   ├── konsept-full.yaml       # Komplett mal
│   └── oppgavebank.yaml        # Mal for oppgaver
├── reference/                   # Referansedokumenter
│   ├── objektbibliotek.yaml    # Matematiske objekter
│   ├── tokens.yaml             # Token-definisjon (30+89)
│   ├── ai-integration.md       # AI-dokumentasjon
│   ├── validation.md           # Valideringsregler
│   └── graph-integration.md    # Graf-struktur
└── versions/                    # Versjonshistorikk
    └── v4.1/
        └── checkpoint.md        # Release notes
```

## 🛠️ Verktøy

### Validering
```bash
# Valider et konsept
node ../../tools/content-validator/validate.js mitt-konsept.yaml
```

### Graf-eksport
```bash
# Generer graf-struktur for visualisering
node ../../tools/graph-tools/export.js
```

### AI-kontekst
```bash
# Generer kontekst for AI-assistenter
node ../../tools/ai-context/generate.js
```

## 🔄 Versjonering

- **Nåværende versjon**: v4.1
- **Status**: Produksjonsklar
- **Siste oppdatering**: 2025-06-07

### Versjonshistorikk
- [v4.1](./versions/v4.1/checkpoint.md) - AI-integrasjon og objektbibliotek
- [v4.0](./versions/v4.0/) - Grunnleggende rammeverk
- [v3.x](./versions/v3/) - Legacy (arkivert)

## 🚦 Kom i gang

1. **Les** → [Quick Start Guide](./guides/quick-start.md)
2. **Velg** → [Riktig mal](./templates/)
3. **Skriv** → Ditt første konsept
4. **Valider** → Med verktøyene
5. **Del** → Via pull request

## 📞 Support

- **Spørsmål**: Se [FAQ](./guides/faq.md)
- **Problemer**: Opprett issue i GitHub
- **Diskusjon**: #moduli-innhold i Slack

## 📄 Lisens

Moduli Konseptrammeverk er utviklet av Nøkken Forlag AS.
Se [LICENSE](../../LICENSE) for detaljer.

---

*For AI-assistenter: Start med [AI-integrasjonsguiden](./reference/ai-integration.md)*