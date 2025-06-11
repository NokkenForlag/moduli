import type { ConceptMetadata, Collection } from '@moduli/types';
import { error } from '@sveltejs/kit';

// I produksjon ville dette hente fra API/database
// For nå hardkoder vi eller bruker dynamic imports

export async function loadConcept(id: string): Promise<{
  metadata: ConceptMetadata;
  content: string;
}> {
  try {
    // Simuler API-kall eller les fra build-time genererte filer
    const concepts = await loadAllConcepts();
    const concept = concepts.find(c => c.metadata.id === id);
    
    if (!concept) {
      throw error(404, `Konsept ${id} ikke funnet`);
    }
    
    return concept;
  } catch (e) {
    throw error(500, 'Kunne ikke laste konsept');
  }
}

export async function loadCollection(id: string): Promise<Collection> {
  // Simuler lasting av collection
  const collections: Record<string, Collection> = {
    'r1-matematikk': {
      id: 'r1-matematikk',
      title: 'Matematikk R1',
      description: 'Realfagsmatematikk med fokus på analyse og modellering',
      clusters: [
        'grenser-og-kontinuitet',
        'derivasjon-grunnlag',
        'funksjonsanalyse',
        'eksponential-logaritme',
        'vektorer-geometri',
        'modellering'
      ]
    },
    'grenser-og-kontinuitet': {
      id: 'grenser-og-kontinuitet',
      title: 'Grenser og kontinuitet',
      parent: 'r1-matematikk',
      concepts: [
        'r1-grenseverdi-funksjon',
        'funksjoner-kontinuerlig'
      ]
    },
    'derivasjon-grunnlag': {
      id: 'derivasjon-grunnlag',
      title: 'Derivasjon',
      parent: 'r1-matematikk',
      concepts: [
        'r1-differenskvotient',
        'r1-derivasjon-definisjon'
      ]
    }
  };
  
  const collection = collections[id];
  if (!collection) {
    throw error(404, `Collection ${id} ikke funnet`);
  }
  
  return collection;
}

// Midlertidig: Hardkodet data
async function loadAllConcepts() {
  return [
    {
      metadata: {
        id: 'r1-grenseverdi-funksjon',
        title: 'Grenseverdier for funksjoner',
        ingress: 'Grenseverdier beskriver funksjoners oppførsel når vi nærmer oss et punkt',
        course: 'r1-matematikk',
        cluster: 'grenser-og-kontinuitet',
        difficulty: 3,
        estimated_time: 30,
        tags: ['grenseverdi', 'analyse', 'grunnleggende']
      },
      content: `
# Grenseverdier for funksjoner

## Hva er en grenseverdi?

Når vi studerer funksjoner, er vi ofte interessert i hva som skjer når $x$ nærmer seg en bestemt verdi. Grenseverdien forteller oss hvilken verdi $f(x)$ nærmer seg, selv om funksjonen kanskje ikke er definert i det punktet.

## Intuitiv forståelse

Tenk deg at du zoomer inn på grafen til en funksjon rundt et punkt. Grenseverdien er den $y$-verdien grafen ser ut til å nærme seg.

## Notasjon

Vi skriver:
$$\\lim_{x \\to a} f(x) = L$$

Dette leses som "grenseverdien til $f(x)$ når $x$ går mot $a$ er lik $L$".
      `
    },
    {
      metadata: {
        id: 'r1-derivasjon-definisjon',
        title: 'Derivasjonens definisjon',
        ingress: 'Fra gjennomsnittlig til momentan endringshastighet',
        course: 'r1-matematikk',
        cluster: 'derivasjon-grunnlag',
        difficulty: 4,
        estimated_time: 45,
        tags: ['derivasjon', 'grenseverdi', 'endringshastighet']
      },
      content: `
# Derivasjonens definisjon

## Fra endring til endringshastighet

Tenk deg at du kjører bil. Speedometeret viser din hastighet *akkurat nå* - ikke gjennomsnittsfarten for hele turen. Dette er essensen av derivasjon: momentan endringshastighet.

## Differenskvotienten

Gjennomsnittlig endringshastighet mellom to punkter:

$$\\text{Differenskvotient} = \\frac{f(x + h) - f(x)}{h}$$

## Grensen gir deriverten

Den deriverte i punktet $x = a$:

$$f'(a) = \\lim_{h \\to 0} \\frac{f(a + h) - f(a)}{h}$$
      `
    }
  ];
}
