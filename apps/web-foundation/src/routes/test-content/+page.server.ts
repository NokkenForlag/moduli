import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  return {
    message: "Test content page",
    timestamp: new Date().toISOString()
  };
};
