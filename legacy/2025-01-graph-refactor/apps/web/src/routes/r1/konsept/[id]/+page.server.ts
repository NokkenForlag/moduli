import type { PageServerLoad } from './$types';
import { loadConcept } from '@moduli/content';

export const load: PageServerLoad = async ({ params }) => {
  const concept = await loadConcept(params.id);
  
  // TODO: Finn forrige/neste konsept basert på learning path
  
  return {
    concept,
    previousConcept: null,
    nextConcept: null
  };
};
