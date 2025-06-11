// Export stores
export { viewSelector } from './stores/view-selector';

// Export view configurations
export { studentView } from './views/student';

// Export types
export interface ViewConfig {
  id: string;
  name: string;
  features: string[];
  layout: {
    sidebar: boolean;
    header: boolean;
  };
}
