import type { PageServerLoad } from './$types';
import { loadCollection } from '@moduli/content';

export const load: PageServerLoad = async () => {
  // Last inn konsepter for hver cluster
  const clusterData = await Promise.all([
    loadClusterWithConcepts('grenser-og-kontinuitet'),
    loadClusterWithConcepts('derivasjon-grunnlag')
  ]);
  
  return {
    clusters: clusterData.filter(Boolean)
  };
};

async function loadClusterWithConcepts(clusterId: string) {
  try {
    const collection = await loadCollection(clusterId);
    
    // Simuler lasting av konseptmetadata
    const concepts = await Promise.all(
      (collection.concepts || []).map(async (conceptId) => {
        // I produksjon ville dette laste faktisk metadata
        return {
          id: conceptId,
          title: getConceptTitle(conceptId),
          ingress: getConceptIngress(conceptId),
          difficulty: 3,
          estimated_time: 30,
          tags: ['grunnleggende']
        };
      })
    );
    
    return {
      id: clusterId,
      title: collection.title,
      concepts
    };
  } catch (e) {
    console.error(`Kunne ikke laste cluster ${clusterId}:`, e);
    return null;
  }
}

// Midlertidige hjelpefunksjoner
function getConceptTitle(id: string): string {
  const titles: Record<string, string> = {
    'r1-grenseverdi-funksjon': 'Grenseverdier for funksjoner',
    'funksjoner-kontinuerlig': 'Kontinuerlige funksjoner',
    'r1-differenskvotient': 'Differenskvotienten',
    'r1-derivasjon-definisjon': 'Derivasjonens definisjon'
  };
  return titles[id] || id;
}

function getConceptIngress(id: string): string {
  const ingresses: Record<string, string> = {
    'r1-grenseverdi-funksjon': 'Grenseverdier beskriver funksjoners oppførsel når vi nærmer oss et punkt',
    'funksjoner-kontinuerlig': 'Grunnleggende om kontinuitet',
    'r1-differenskvotient': 'Gjennomsnittlig endringshastighet',
    'r1-derivasjon-definisjon': 'Fra gjennomsnittlig til momentan endringshastighet'
  };
  return ingresses[id] || '';
}
