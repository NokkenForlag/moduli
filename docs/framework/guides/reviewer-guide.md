# Reviewer-guide for Moduli-konsepter

## 🎯 Formål

Som reviewer sikrer du at alle konsepter holder høy pedagogisk og faglig kvalitet før publisering. Denne guiden gir deg verktøy og sjekklister for effektiv kvalitetssikring.

## 👤 Hvem kan være reviewer?

- **Fageksperter**: Matematikklærere og fagdidaktikere
- **Innholdsutviklere**: Erfarne forfattere i teamet
- **Tekniske reviewere**: For struktur og metadata
- **Elev-testere**: For forståelighet (anbefalt tillegg)

## 🔍 Review-prosessen

### 1. Forberedelse (5 min)

```bash
# Hent konseptet som skal reviewes
git checkout feature/konsept-a-3-2

# Valider teknisk struktur først
node tools/content-validator/validate.js packages/content/src/concepts/a-3-2/
```

### 2. Strukturell gjennomgang (10 min)

#### Filstruktur-sjekk
```
a-3-2-lineære-funksjoner/
├── metadata.yaml      ✓ Finnes og er gyldig YAML?
├── innhold.md        ✓ Finnes og følger mal?
├── oppgaver.yaml     ✓ Finnes med riktig fordeling?
└── visualiseringer/  ? Hvis relevant
```

#### Metadata-validering
```yaml
# Sjekk at disse feltene er korrekte:
id:          # Følger navnekonvensjon?
level:       # Riktig klassetrinn?
strand:      # Riktig fagområde?

mathematicalObject:
  type:      # Finnes i objektbiblioteket?
  properties: # Er disse korrekte?

relations:
  requires:  # Eksisterer disse ID-ene?
  enables:   # Er koblingene logiske?
```

### 3. Faglig gjennomgang (20-30 min)

#### Matematisk korrekthet

| Område | Sjekkliste |
|--------|------------|
| **Definisjoner** | □ Presise og korrekte? |
| **Notasjon** | □ Standard og konsistent? |
| **Eksempler** | □ Feilfrie beregninger? |
| **Forklaringer** | □ Logisk holdbare? |
| **Visualiseringer** | □ Støtter de teksten? |

#### Pedagogisk kvalitet

##### Progresjon
- [ ] Starter med kjent kontekst?
- [ ] Bygger gradvis abstraksjon?
- [ ] Naturlige overganger?
- [ ] Passe tempo?

##### Forståelighet
- [ ] Språk tilpasset målgruppen?
- [ ] Forklaringer er komplette?
- [ ] Eksempler er relevante?
- [ ] Ingen logiske hull?

##### Motivasjon
- [ ] Tydelig "hvorfor"?
- [ ] Engasjerende kontekst?
- [ ] Viser anvendelser?

### 4. Oppgavegjennomgang (15-20 min)

#### Fordeling (40/25/20/15)
```yaml
# Sjekk at oppgavebanken følger:
utforskning: 40%  # Åpne, undersøkende
øving: 25%        # Ferdighetstrening  
kobling: 20%      # Representasjoner
overføring: 15%   # Anvendelse
```

#### Kvalitetskriterier per oppgavetype

**Utforskningsoppgaver** ({task:explore})
- [ ] Ingen opplagt løsningsmetode
- [ ] Flere gyldige tilnærminger
- [ ] Bygger intuisjon
- [ ] Gode hint (ikke løsninger)

**Øvingsoppgaver** ({task:practice})
- [ ] Gradvis vanskelighetsgrad
- [ ] Dekker alle delkunnskaper
- [ ] Variasjon i kontekst
- [ ] Klare svar

**Koblingsoppgaver** ({task:connect})
- [ ] Minst 2 representasjoner
- [ ] Tydelige overganger
- [ ] Fremmer helhetssyn

**Overføringsoppgaver** ({task:transfer})
- [ ] Ny kontekst
- [ ] Krever tilpasning
- [ ] Tester dyp forståelse

### 5. Differensiering (10 min)

#### Støttetiltak
- [ ] Dekker vanlige utfordringer?
- [ ] Konkrete og anvendbare?
- [ ] Gradvis avtrapning?

#### Utvidelser
- [ ] Naturlige generaliseringer?
- [ ] Utfordrende men oppnåelige?
- [ ] Kobler til videre konsepter?

## 📝 Review-kommentarer

### Kommentarmal

```markdown
## Review av [konsept-id]: [tittel]

**Reviewer**: [navn]
**Dato**: [YYYY-MM-DD]
**Status**: Godkjent / Må revideres / Avvist

### Styrker
- [Punkt 1]
- [Punkt 2]

### Må fikses (blokkerende)
1. **[Problem]**: [Beskrivelse]
   - Forslag: [Løsning]

### Bør vurderes (ikke-blokkerende)
- [Forbedringspunkt 1]
- [Forbedringspunkt 2]

### Faglig vurdering
[Kommentar om matematisk korrekthet og pedagogisk kvalitet]

### Testresultat (hvis utført)
- Testet med: [målgruppe]
- Observasjoner: [funn]
```

### Konstruktiv tilbakemelding

**DO:**
- ✅ Vær spesifikk: "I eksempel 2, linje 3..."
- ✅ Gi løsningsforslag: "Vurder å..."
- ✅ Anerkjenn styrker: "Bra forklaring av..."
- ✅ Prioriter: Skill "må" fra "bør"

**DON'T:**
- ❌ Generelle kommentarer: "Kunne vært bedre"
- ❌ Personangrep: "Du forstår ikke..."
- ❌ Mikromanage: Fokuser på substans
- ❌ Ignorere kontekst: Husk målgruppen

## 🛠️ Verktøy for reviewere

### Automatisk validering
```bash
# Kjør full validering
npm run validate:concept packages/content/src/concepts/[id]/

# Sjekk relasjoner
npm run check:relations [id]

# Valider tokens
npm run check:tokens packages/content/src/concepts/[id]/innhold.md
```

### Sjekkliste-generator
```bash
# Generer review-sjekkliste
npm run review:checklist [id] > review-[id].md
```

## 📊 Review-statistikk

Hold oversikt over:
- Gjennomsnittlig review-tid
- Vanlige problemer
- Godkjenningsrate
- Revisjonsrunder

## 🚨 Røde flagg

Vær spesielt oppmerksom på:

1. **Matematiske feil** - Aldri akseptabelt
2. **Brutte avhengigheter** - Manglende forkunnskaper
3. **Dårlig progresjon** - For store hopp
4. **Manglende differensiering** - Ekskluderer elever
5. **Feil tokenbruk** - Bryter AI-integrasjon

## 🎯 Mål for review

En god review:
- **Sikrer kvalitet** uten å kvele kreativitet
- **Gir konstruktiv** tilbakemelding
- **Respekterer** forfatterens tid
- **Fokuserer** på elevens læring

## 📚 Ressurser

- [Forfatterguide](./author-guide.md)
- [Kvalitetskriterier](../reference/quality-criteria.md)
- [Eksempelreviews](../examples/reviews/)
- [Objektbibliotek](../reference/objektbibliotek.yaml)

---

*Takk for at du bidrar til kvalitet! Din innsats former elevers matematikkforståelse.* 🌟