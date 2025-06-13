import type { LayoutServerLoad } from './$types';
import { getAllConceptIds, loadConcepts } from '@moduli/content';
import type { Concept } from '@moduli/content';

export const load: LayoutServerLoad = async () => {
  try {
    // Get all concept IDs
    const conceptIds = await getAllConceptIds();
    
    if (conceptIds.length === 0) {
      return {
        collections: []
      };
    }

    // Load all concepts
    const concepts = await loadConcepts(conceptIds);

    // Extract collections and count members
    const collectionsMap = new Map<string, { 
      id: string; 
      title: string; 
      count: number;
      icon?: string;
    }>();

    // First pass: find all collections
    concepts.forEach((concept: Concept) => {
      if ((concept.meta as any).type === 'collection') {
        collectionsMap.set(concept.meta.id, {
          id: concept.meta.id,
          title: concept.meta.title,
          count: 0,
          icon: concept.meta.id.includes('kalkulus') ? '📐' : '📚'
        });
      }
    });

    // Second pass: count members
    concepts.forEach((concept: Concept) => {
      if (concept.meta.relations) {
        concept.meta.relations.forEach((rel: any) => {
          if (rel.type === 'part-of' && collectionsMap.has(rel.to)) {
            const collection = collectionsMap.get(rel.to)!;
            collection.count++;
          }
        });
      }
    });

    const collections = Array.from(collectionsMap.values())
      .sort((a, b) => a.id.localeCompare(b.id));

    return {
      collections
    };
  } catch (err) {
    console.error('Failed to load collections:', err);
    return {
      collections: []
    };
  }
};
