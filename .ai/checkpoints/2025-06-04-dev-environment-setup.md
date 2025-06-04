# Checkpoint: 2025-06-04-dev-environment-setup

## 🧭 Prosjektkontekst

**Moduli** er en matematisk læringsplattform utviklet av Nøkken Forlag AS, som går fra hierarkisk til **graf-basert innholdsarkitektur**.

**Arbeidsspor:** `#maintrack` - Etablering av grunnleggende monorepo-struktur og utviklingskonvensjoner for Moduli v2.

## ✅ Hva er fullført

### Mappestruktur

- ✅ Komplett monorepo-struktur opprettet under `moduli/`
- ✅ Alle hovedmapper: `apps/`, `packages/`, `docs/`, `tools/`
- ✅ Undermapper for graf-arkitektur inkludert:
  - `packages/graph/` for algoritmer
  - `packages/content/` for konsepter og collections
  - `apps/web/` for SvelteKit-app

### Utviklingskonvensjoner

- ✅ **Husky** git hooks konfigurert (v9+)
- ✅ **Lint-staged** med ESM-format og async funksjoner
- ✅ **ESLint** v9 med flat config (`eslint.config.js`)
- ✅ **Prettier** integrert med lint-staged
- ✅ **Commitlint** med Moduli-spesifikke typer:
  - Standard: `feat`, `fix`, `docs`, `chore`, etc.
  - Moduli: `content`, `graph`, `ui`
- ✅ **pnpm workspace** konfigurert

### Konfigurasjonsfiler

- ✅ `pnpm-workspace.yaml`
- ✅ `package.json` med scripts
- ✅ `tsconfig.base.json`
- ✅ `.gitignore` og `.npmrc`
- ✅ `commitlint.config.js`
- ✅ `lint-staged.config.js`
- ✅ `eslint.config.js`

### Første commit

- ✅ `fix(workspace): pass filenames to prettier in lint-staged`

## ⚠️ Åpenstående punkter

1. **TypeScript setup**: `tsconfig.json` mangler i packages
2. **Prettier config**: `.prettierrc` ikke opprettet enda
3. **VS Code settings**: `.vscode/settings.json` er tom
4. **Innhold**: Ingen faktiske `.ts` eller `.md` filer enda
5. **Dependencies**: Ingen packages har egen `package.json`

## 🚀 Neste anbefalte steg

### Prioritet 1: Grunnleggende packages

1. Initialiser `packages/types`:
   ```bash
   cd packages/types && pnpm init
   ```
2. Opprett første TypeScript types
3. Sett opp `tsconfig.json` per package

### Prioritet 2: SvelteKit app

```bash
cd apps/web
pnpm create svelte@latest . --template skeleton-typescript
```

### Prioritet 3: Prettier og VS Code

- Opprett `.prettierrc` i root
- Konfigurer `.vscode/settings.json`

## 📌 Startprompt for ny sesjon

```markdown
# Moduli-sesjon: [YYYY-MM-DD]

## Kontekst

- **Forrige checkpoint:** 2025-06-04-dev-environment-setup
- **Fokus:** #[tag] - [kort beskrivelse]
- **Mål:** [Konkret leveranse denne sesjonen]

## Status

Moduli monorepo er satt opp med full utviklingskonvensjon:

- Mappestruktur for graf-arkitektur etablert
- Husky, ESLint, Prettier, commitlint fungerer
- Første commit gjennomført
- Ingen TypeScript-filer eller packages initialisert enda

## Oppgave

[Beskriv hva som skal gjøres]

## Vedlagt

- [ ] tree.md (hvis nødvendig)
- [ ] Relevante config-filer
```

## 🧭 Snapshot og videre kontekst

For å sikre at fremtidige sesjoner starter med god forståelse av prosjektets struktur og fremdrift, anbefales det å lagre et "snapshot" av repoet per checkpoint. Dette er kritisk fordi AI-assistenter som Claude ikke har tilgang til tidligere samtaler.

### Hvorfor snapshots er viktig

AI-assistenter starter hver sesjon uten minne om tidligere arbeid. Et godt snapshot gir:

- Umiddelbar forståelse av prosjektstruktur
- Kontekst om tekniske valg og konvensjoner
- Oversikt over hva som er implementert vs. planlagt
- Grunnlag for konsistente anbefalinger

### Bruk av tree.md og kontekstmapper

**Generer alltid oppdatert `tree.md` før ny sesjon:**

```bash
tree -I 'node_modules|.git|dist|.svelte-kit' > .ai/context/tree.md
```

**Organiser kontekst i `.ai/context/`:**

```bash
# Generer fersk tree direkte i context
tree -I 'node_modules|.git|dist|.svelte-kit' > .ai/context/current-tree.md

# Kopier andre relevante filer
cp pnpm-workspace.yaml .ai/context/
cp -r packages/*/package.json .ai/context/packages/ 2>/dev/null || true
```

### Best practice for effektiv kontekst

Ved oppstart av ny sesjon, inkluder:

1. **Strukturell kontekst** med `#context` tag:

   ```markdown
   #context Her er nåværende struktur fra tree.md:
   [lim inn relevante deler av tree.md]
   ```

2. **Teknisk status** med `#snapshot` tag:

   ```markdown
   #snapshot Teknisk oppsummering:

   - Monorepo med pnpm workspaces
   - TypeScript strict mode
   - Graf-arkitektur implementert i: [liste paths]
   - Packages initialisert: [liste]
   ```

3. **Endringer siden sist:**

   ```markdown
   Nye paths opprettet:

   - packages/graph/src/algorithms/
   - apps/web/src/routes/

   Oppdaterte dependencies:

   - Added: @moduli/types workspace dependency
   ```

4. **Spesifikk arbeidsøkt-kontekst:**
   - Hvilke filer du jobber med
   - Eventuelle feilmeldinger eller blokkere
   - Designbeslutninger som må huskes

### Kommandoer for rask kontekst-generering

```bash
# Full snapshot
alias moduli-snapshot='tree -I "node_modules|.git|dist|.svelte-kit" > .ai/context/tree-$(date +%Y%m%d).md && echo "Snapshot saved!"'

# Vis endringer siden forrige checkpoint
alias moduli-changes='git log --oneline --since="1 day ago" && echo -e "\nEndrede filer:" && git diff --name-only HEAD~5'

# Eksporter aktiv kontekst
alias moduli-export='tar -czf moduli-context-$(date +%Y%m%d).tar.gz .ai/context/'
```

---

**Checkpoint opprettet:** 2025-06-04 20:45  
**Neste review:** Ved oppstart av neste sesjon
