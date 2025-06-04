# AI Context Directory

Denne mappen inneholder aktiv kontekst for AI-assistert utvikling av Moduli.

## 📁 Filstruktur

| Fil                     | Beskrivelse                              | Oppdateres                  |
| ----------------------- | ---------------------------------------- | --------------------------- |
| `current-tree.md`       | Symlink til siste tree snapshot          | Ved `moduli-snapshot`       |
| `tree-YYYYMMDD-HHMM.md` | Historiske snapshots av prosjektstruktur | Ved hver snapshot           |
| `recent-commits.md`     | Siste 10 commits (ekskl. merges)         | Ved `moduli-snapshot`       |
| `working-changes.md`    | Git status snapshot                      | Ved `moduli-snapshot`       |
| `current-status.md`     | Detaljert prosjektstatus                 | Manuelt med `moduli-status` |
| `last-checkpoint.md`    | Symlink til siste checkpoint             | Ved ny checkpoint           |

## 🚀 Quick Start

```bash
# Generer komplett snapshot
moduli-snapshot

# Sjekk prosjektstatus
moduli-status > .ai/context/current-status.md

# Se endringer siden sist
moduli-changes
```

## 📋 Bruk i AI-prompts

### Minimal kontekst

```markdown
#context Prosjektstruktur:
[Lim inn relevante deler fra current-tree.md]
```

### Full kontekst

```markdown
#snapshot Status:
[Lim inn current-status.md]

#context Struktur:
[Lim inn current-tree.md]

#changes Endringer:
[Lim inn recent-commits.md]
```

## 🔧 Vedlikehold

- **Daglig**: Kjør `moduli-snapshot` før AI-sesjoner
- **Ukentlig**: Rydd i gamle tree-\*.md filer
- **Ved milestone**: Lag checkpoint i `.ai/checkpoints/`

## 🤖 Automatisering

For auto-snapshot ved commit, legg til i `.git/hooks/pre-commit`:

```bash
#!/bin/sh
# Auto-snapshot store endringer
if [ $(git diff --cached --name-only | wc -l) -gt 10 ]; then
  moduli-snapshot
  echo "📸 Auto-snapshot created due to large commit"
fi
```

## 📚 Se også

- `.ai/README.md` - Hovedguide for AI-samarbeid
- `.ai/checkpoints/` - Historiske checkpoints
- `.ai/templates/` - Maler for nye sesjoner

---

_Generert av Moduli AI Workflow System_
