# Snapshot Workflow for AI-assistert utvikling

## 🎯 Hvorfor snapshots er kritisk

AI-assistenter som Claude starter hver sesjon uten kontekst fra tidligere samtaler. Dette betyr at hvert møte med AI krever en "bootstrap"-prosess hvor vi må:

1. **Reetablere prosjektforståelse** - Hva er dette prosjektet?
2. **Gjenoppta teknisk kontekst** - Hvilke valg er tatt og hvorfor?
3. **Synkronisere status** - Hva er gjort vs. hva gjenstår?
4. **Fokusere arbeidet** - Hva skal vi jobbe med nå?

Uten god snapshot-prosedyre vil hver AI-sesjon starte på scratch, som fører til:

- ❌ Inkonsistente anbefalinger
- ❌ Gjentatte forklaringer av samme konsepter
- ❌ Tap av prosjektspesifikke konvensjoner
- ❌ Ineffektiv tidsbruk

## 📸 Hva består et snapshot av?

### 1. **Strukturell oversikt** (`tree.md`)

Viser faktisk mappestruktur og filer, gir AI umiddelbar forståelse av:

- Prosjektorganisering
- Hvilke packages som finnes
- Navnekonvensjoner
- Teknologivalg (via filtyper)

### 2. **Checkpoint-dokumenter**

Oppsummerer:

- Hva som ble gjort i forrige sesjon
- Tekniske beslutninger
- Åpne punkter
- Neste steg

### 3. **Konfigurasjonskonkekst**

Kritiske config-filer som definerer prosjektet:

- `pnpm-workspace.yaml`
- `package.json`
- `tsconfig.base.json`
- Package-spesifikke configs

### 4. **Endringsoversikt**

Git-historikk og diff siden sist:

- Hvilke commits er gjort
- Hvilke filer er endret
- Nye dependencies

## 🛠️ Kommandoer for snapshot-generering

### Basis tree-generering

```bash
# Standard tree med ekskludering av build-artifacts
tree -I 'node_modules|.git|dist|.svelte-kit|build|coverage' > .ai/context/tree.md

# Mer detaljert med filstørrelser
tree -h -I 'node_modules|.git|dist|.svelte-kit' > .ai/context/tree-detailed.md

# Kun struktur (ingen filer)
tree -d -I 'node_modules|.git' > .ai/context/tree-dirs-only.md

# Datostemplet versjon for historikk
tree -I 'node_modules|.git|dist|.svelte-kit|build|coverage' > .ai/context/tree-$(date +%Y%m%d).md
```

### Alias for rask snapshot

Legg til i din `~/.zshrc` eller `~/.bashrc`:

```bash
# Initialize Moduli AI structure
alias moduli-init='
  echo "🛠️ Initializing Moduli AI structure..." &&
  mkdir -p .ai/{context,checkpoints,templates} &&
  mkdir -p docs/{checkpoints,process} &&
  mkdir -p tools/ai-context &&
  echo "✅ Moduli AI folders initialized"
'

# Full Moduli snapshot
alias moduli-snapshot='
  echo "📸 Generating Moduli snapshot..." &&
  TIMESTAMP=$(date +%Y%m%d-%H%M) &&
  tree -I "node_modules|.git|dist|.svelte-kit|build|coverage" > .ai/context/tree-$TIMESTAMP.md &&
  ln -sf tree-$TIMESTAMP.md .ai/context/current-tree.md &&
  git log --oneline --no-merges -10 > .ai/context/recent-commits.md &&
  git status --porcelain > .ai/context/working-changes.md &&
  echo "✅ Snapshot saved to .ai/context/ (linked as current-tree.md)"
'

# Vis endringer siden checkpoint
alias moduli-changes='
  echo "📊 Changes since last checkpoint:" &&
  echo "\n🔸 Recent commits (no merges):" &&
  git log --oneline --no-merges --since="2 days ago" &&
  echo "\n🔸 Modified files:" &&
  git diff --name-only HEAD~10 | sort | uniq &&
  echo "\n🔸 Working directory status:" &&
  git status -s
'

# Eksporter komplett kontekst
alias moduli-export='
  TIMESTAMP=$(date +%Y%m%d-%H%M) &&
  EXPORT_DIR="moduli-context-$TIMESTAMP" &&
  mkdir -p "$EXPORT_DIR"/{ai,docs} &&
  cp -r .ai/context/* "$EXPORT_DIR/ai/" &&
  cp -r docs/checkpoints "$EXPORT_DIR/docs/" 2>/dev/null || true &&
  cp pnpm-workspace.yaml "$EXPORT_DIR/" &&
  cp package.json "$EXPORT_DIR/" &&
  cp tsconfig.base.json "$EXPORT_DIR/" 2>/dev/null || true &&
  tree -I "node_modules|.git" > "$EXPORT_DIR/tree-full.md" &&
  tar -czf "$EXPORT_DIR.tar.gz" "$EXPORT_DIR" &&
  rm -rf "$EXPORT_DIR" &&
  echo "✅ Context exported to $EXPORT_DIR.tar.gz (includes AI context & checkpoints)"
'

# Quick status for AI
alias moduli-status='
  echo "🏗️  Moduli Project Status" &&
  echo "========================" &&
  echo "\n📦 Workspace packages:" &&
  pnpm ls -r --depth 0 2>/dev/null || echo "No packages initialized yet" &&
  echo "\n🌳 Top-level structure:" &&
  tree -L 2 -d -I "node_modules|.git" &&
  echo "\n📝 Recent activity:" &&
  git log --oneline -5
'
```

## 📋 Anbefalt arbeidsflyt ved ny AI-sesjon

### 0. **Første gang setup** (kun én gang)

```bash
# Initialiser AI-struktur hvis den ikke finnes
moduli-init

# Legg aliaser i ~/.zshrc eller ~/.bashrc
echo '[kopier alle aliaser hit]' >> ~/.zshrc
source ~/.zshrc
```

### 1. **Generer fersk kontekst** (1 min)

```bash
cd moduli
moduli-snapshot
moduli-status > .ai/context/current-status.md
```

### 2. **Strukturer din prompt** (2-3 min)

Bruk denne malen:

```markdown
# Moduli-sesjon: [YYYY-MM-DD]

## Kontekst

- **Forrige checkpoint:** [navn eller "første sesjon"]
- **Fokus:** #[tag] - [beskrivelse]
- **Mål:** [Hva skal oppnås denne sesjonen]

## Vedlagt kontekst

#context Prosjektstruktur:
[Lim inn relevante deler av tree.md]

#snapshot Teknisk status:

- Monorepo med pnpm workspaces
- TypeScript strict mode
- Graf-arkitektur for innhold
- Hovedteknologier: SvelteKit 5, Tailwind CSS v4
- [Andre relevante tekniske punkter]

#changes Endringer siden sist:
[Output fra moduli-changes eller manuell liste]

## Oppgave

[Detaljert beskrivelse av hva som skal gjøres]

## Spesifikke spørsmål/blokkere

[Eventuelle konkrete problemer som trenger løsning]
```

### 3. **Bruk konsistente tags**

- `#context` - Strukturell informasjon
- `#snapshot` - Teknisk oppsummering
- `#changes` - Hva som er nytt
- `#maintrack` - Hovedarkitektur
- `#debug` - Feilsøking
- `#feature` - Ny funksjonalitet
- `#refactor` - Omstrukturering

### 4. **Vedlegg relevante filer**

Hvis du jobber med spesifikke filer, lim inn:

- Hele filen hvis liten (<100 linjer)
- Relevante utdrag hvis stor
- Alltid inkluder filstien

## 🤖 Automatiseringsforslag

### Tool-script: `moduli-ai-context`

Opprett `tools/ai-context/generate.js`:

```javascript
#!/usr/bin/env node
import { execSync } from "child_process";
import { writeFileSync, readFileSync, existsSync } from "fs";
import { join } from "path";

const AI_DIR = ".ai/context";
const timestamp = new Date().toISOString().split("T")[0];

// Ensure directories exist
execSync(`mkdir -p ${AI_DIR}`);

// Generate tree
console.log("🌳 Generating project tree...");
execSync(
  `tree -I 'node_modules|.git|dist|.svelte-kit|build' > ${AI_DIR}/tree-${timestamp}.md`,
);

// Get git status
console.log("📊 Collecting git information...");
const gitLog = execSync("git log --oneline -10").toString();
const gitStatus = execSync("git status --porcelain").toString();
const gitDiff = execSync(
  'git diff --name-only HEAD~5 2>/dev/null || echo "No previous commits"',
).toString();

// Read workspace info
console.log("📦 Reading workspace configuration...");
const workspaceConfig = readFileSync("pnpm-workspace.yaml", "utf-8");
const packageJson = JSON.parse(readFileSync("package.json", "utf-8"));

// Find last checkpoint
const checkpointDir = "docs/checkpoints";
let lastCheckpoint = "None";
if (existsSync(checkpointDir)) {
  const checkpoints = execSync(
    `ls -t ${checkpointDir}/*.md 2>/dev/null | head -1`,
  )
    .toString()
    .trim();
  if (checkpoints) {
    lastCheckpoint = checkpoints.split("/").pop().replace(".md", "");
  }
}

// Generate context document
const contextDoc = `# AI Context Snapshot
Generated: ${new Date().toISOString()}

## 🎯 Project Overview
- **Name:** ${packageJson.name}
- **Version:** ${packageJson.version}
- **Last checkpoint:** ${lastCheckpoint}

## 📦 Workspace Structure
\`\`\`yaml
${workspaceConfig}
\`\`\`

## 📊 Recent Git Activity
### Last 10 commits:
\`\`\`
${gitLog}
\`\`\`

### Working directory changes:
\`\`\`
${gitStatus || "Working directory clean"}
\`\`\`

### Files changed in last 5 commits:
\`\`\`
${gitDiff}
\`\`\`

## 🛠️ Installed Dependencies
${Object.entries(packageJson.devDependencies || {})
  .map(([name, version]) => `- ${name}: ${version}`)
  .join("\n")}

## 📋 Available Scripts
${Object.entries(packageJson.scripts || {})
  .map(([name, script]) => `- \`pnpm ${name}\`: ${script}`)
  .join("\n")}
`;

writeFileSync(join(AI_DIR, `context-${timestamp}.md`), contextDoc);
writeFileSync(join(AI_DIR, "latest-context.md"), contextDoc);

console.log(`✅ AI context generated at ${AI_DIR}/context-${timestamp}.md`);
console.log(`📎 Also available at ${AI_DIR}/latest-context.md`);
```

Gjør scriptet kjørbart:

```bash
chmod +x tools/ai-context/generate.js
```

Legg til i `package.json`:

```json
{
  "scripts": {
    "ai:context": "node tools/ai-context/generate.js",
    "ai:prepare": "pnpm ai:context && echo 'Ready for AI session!'"
  }
}
```

## 📌 Best practices oppsummert

1. **Start alltid med fersk kontekst** - Ikke anta at gammel tree.md er korrekt
2. **Vær spesifikk om endringer** - AI kan ikke se git history
3. **Inkluder tekniske valg** - Påminn om konvensjoner og patterns
4. **Bruk konsistente tags** - Hjelper AI kategorisere forespørselen
5. **Lagre checkpoints jevnlig** - Minst ved slutten av hver økt
6. **Hold kontekst konsis** - For mye informasjon kan forvirre
7. **Vedlikehold current-tree.md** - Symlink til siste snapshot for enkel referanse

## 📁 Anbefalt .ai/context/ struktur

Opprett en `README.md` i `.ai/context/` for teamdokumentasjon:

```markdown
# AI Context Directory

Denne mappen inneholder aktiv kontekst for AI-assistert utvikling.

## Filer:

- `current-tree.md` - Symlink til siste tree snapshot
- `tree-YYYYMMDD-HHMM.md` - Historiske snapshots
- `recent-commits.md` - Siste 10 commits (oppdateres ved snapshot)
- `working-changes.md` - Git status snapshot
- `current-status.md` - Output fra moduli-status

## Bruk:

1. Kjør `moduli-snapshot` før AI-sesjon
2. Referer til `current-tree.md` i prompts
3. Bruk `moduli-status > .ai/context/current-status.md` for detaljert status

## Automatisk oppdatering:

Vurder git pre-commit hook for auto-snapshot ved større endringer.
```

---

_Sist oppdatert: 2025-06-04_
