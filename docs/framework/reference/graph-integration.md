# Graf-integrasjon

## Konseptgrafen

Alle konsepter danner en kunnskapsgraf:

```
[Variabler] --enables--> [Funksjoner] --enables--> [Derivasjon]
     |                         |
  requires                 requires  
     |                         |
[Tallforståelse]    [Koordinatsystem]
```

## Datastruktur

```typescript
interface ConceptNode {
  id: string;
  title: string;
  position: { x: number; y: number };
  level: number;
  strand: string;
  connections: {
    requires: string[];
    enables: string[];
    relatedTo: string[];
  };
}
```

## Visualisering med Rive

Graf-eksporten genererer:
- Noder med størrelse basert på kompleksitet
- Farger basert på strand (algebra=blå, geometri=grønn)
- Linjer med ulik tykkelse for relasjonstype
- Interaktiv navigering

## Bruksområder

1. **Navigasjon**: Visuell oversikt
2. **Planlegging**: Se læringsstier
3. **Diagnostikk**: Identifiser hull
4. **Adaptiv**: Foreslå neste steg
