# Mappestruktur for konsepter

## Standard struktur

```
konsepter/
├── a-1-1-variabler/
│   ├── metadata.yaml      # Konseptmetadata
│   ├── innhold.md        # Faglig innhold
│   ├── oppgaver.yaml     # Oppgavebank
│   └── notater.md        # Interne notater (valgfritt)
├── g-2-3-pytagoras/
│   ├── metadata.yaml
│   ├── innhold.md
│   ├── oppgaver.yaml
│   └── visualiseringer/  # Bilder/animasjoner
└── index.json            # Generert konseptindeks
```

## Navnekonvensjoner

- **ID-format**: `[strand]-[nivå]-[nummer]`
  - `a` = algebra
  - `g` = geometri
  - `n` = tall
  - `s` = statistikk

## Filtyper

- `.yaml` - Strukturert metadata og oppgaver
- `.md` - Faglig innhold og forklaringer  
- `.json` - Genererte indekser (ikke rediger manuelt)
