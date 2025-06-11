// packages/ui/src/theme/index.ts

// Export tokens
export * from './tokens';

// Export specific items from themes to avoid conflicts
export { 
  themes, 
  defaultTheme, 
  generateCSSVariables,
  getTheme as getThemeConfig  // Rename to avoid conflict
} from './themes';

// Export context
export { 
  getTheme as getThemeContext,  // Rename to avoid conflict
  type ThemeContext 
} from './context';

// Export styles
export * from './styles';

// Export ThemeProvider component
export { default as ThemeProvider } from './ThemeProvider.svelte';

// Re-export types from @moduli/types for convenience
export type { Theme, ThemeMode, ThemeColors } from '@moduli/types';