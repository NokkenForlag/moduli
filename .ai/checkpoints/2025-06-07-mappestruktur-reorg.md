# Checkpoint: Mappestruktur-reorganisering

**Dato:** 2025-06-07  
**Type:** Strukturell refaktorering  
**Status:** ✅ Delvis implementert - krever oppfølging

## Sammendrag

Reorganisering av Moduli-prosjektets mappestruktur for tydeligere ansvarsdeling mellom dokumentasjon, AI-verktøy og innhold. Hovedrammeverket er flyttet til `docs/framework/`, men flere komponenter må fortsatt separeres og organiseres.

## Bakgrunn

Målet var å skille:
- **packages/content**: Selve læringsinnholdet
- **.ai/**: AI-relatert arbeidsstøtte
- **docs/**: Langtidsdokumentasjon og referanse

## Utført arbeid

### ✅ Implementert

1. **Opprettet ny mappestruktur**
   ```
   docs/framework/
   ├── README.md          # Hovedrammeverk v4.1 (flyttet hit)
   ├── guides/           # Tom - venter innhold
   ├── reference/        # Tom - venter innhold  
   ├── templates/        # Tom - venter maler
   └── versions/
       └── v4.1/
           └── checkpoint.md  # Kopiert fra .ai/checkpoints/
   ```

2. **Flyttet hovedrammeverk**
   - Fra: `packages/content/rammeverk.md`
   - Til: `docs/framework/README.md`
   - Inneholder nå hele v4.1 inkludert:
     - quick-start.md (inline)
     - ai-instructions.md (inline)
     - konsept-minimal.yaml (inline)
     - objektbibliotek.yaml (inline)

3. **Bevart checkpoint-historikk**
   ```
   .ai/checkpoints/
   ├── 2025-06-04-dev-environment-setup.md
   └── 2025-06-06-konseptrammeverk-v4.1.md
   ```

### ❌ Ikke implementert

1. **packages/content/README.md** - Tom, mangler peker til docs/framework/
2. **Separering av inline-filer** - Alt ligger fortsatt samlet i docs/framework/README.md
3. **AI-instruksjoner** - .ai/instructions/ er tom
4. **Maler og tokens** - Ikke flyttet til dedikerte filer

## Mappestruktur etter reorganisering

```
.
├── .ai/
│   ├── checkpoints/             ✅ Historiske snapshots
│   ├── context/                 ✅ Arbeidskontext (delvis)
│   ├── instructions/            ❌ Tom
│   └── templates/               ✅ Sesjonsmal
├── docs/
│   ├── framework/               ✅ Hovedlokasjon
│   │   ├── README.md           ✅ Komplett v4.1
│   │   ├── guides/             ❌ Tom
│   │   ├── reference/          ❌ Tom
│   │   ├── templates/          ❌ Tom
│   │   └── versions/v4.1/      ✅ Checkpoint
│   └── [andre mapper]
└── packages/
    └── content/
        ├── README.md            ❌ Tom
        └── src/                 ✅ Konseptfiler
```

## Neste steg

### Umiddelbart (fase 1)
1. **Opprett packages/content/README.md**
   ```markdown
   # Content Package
   
   For rammeverk og veiledninger, se:
   → [Moduli Konseptrammeverk](../../docs/framework/)
   
   Dette pakken inneholder selve læringsinnholdet.
   ```

2. **Splitt docs/framework/README.md**
   - `docs/framework/guides/quick-start.md`
   - `docs/framework/reference/ai-integration.md`
   - `docs/framework/templates/konsept-minimal.yaml`
   - `docs/framework/templates/konsept-standard.yaml`
   - `docs/framework/reference/objektbibliotek.yaml`
   - `docs/framework/reference/tokens.yaml`

3. **Opprett .ai/instructions/claude-instructions.md**
   - Flytt AI-spesifikke deler fra framework
   - Legg til praktiske eksempler

### Kort sikt (fase 2)
1. **Oppdater alle interne lenker**
2. **Lag index-filer** for hver hovedmappe
3. **Generer navigasjonstre** for dokumentasjon
4. **Implementer build-skript** for å holde struktur synkronisert

### Validering
- [ ] Alle lenker fungerer
- [ ] Ingen dupliserte filer
- [ ] Klar ansvarsdeling mellom mapper
- [ ] AI kan navigere strukturen

## Konklusjon

Reorganiseringen er påbegynt med hovedrammeverket flyttet til riktig lokasjon. Strukturen er etablert, men innholdet må fortsatt separeres i individuelle filer for bedre vedlikehold og navigering.

**Status**: Grunnstruktur ✅ | Filseparering ❌ | Dokumentasjon ⚠️

**Anbefaling**: Fullfør fase 1 før innholdsproduksjon starter for å unngå forvirring om autoritative kilder.

## Referanser

- Forrige checkpoint: `2025-06-06-konseptrammeverk-v4.1.md`
- Hovedrammeverk: `docs/framework/README.md`
- Original plan: Strukturrevisjon-diskusjon 2025-06-07

---

*Checkpoint opprettet av: AI-assistent*  
*Godkjent av: [pending]*