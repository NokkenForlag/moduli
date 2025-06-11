// packages/ui/src/index.ts

// Theme exports
export * from './theme';
export { default as ThemeProvider } from './theme/ThemeProvider.svelte';

// Store exports
export { themeStore } from './stores/theme';

// Utility exports
export { cn } from './lib/cn';
export * as animations from './lib/animations';
export * as responsive from './lib/responsive';

// Component exports
// Feedback
export { default as Toast } from './components/feedback/Toast.svelte';

// Theme
export { default as ThemeToggle } from './components/theme/ThemeToggle.svelte';

// Form
export { default as Button } from './components/form/Button.svelte';
export { default as Input } from './components/form/Input.svelte';

// Navigation
export { default as TopNav } from './components/navigation/TopNav.svelte';

// Layout
export { default as MainLayout } from './components/layout/MainLayout.svelte';

// Re-export types
export type { Theme, ThemeMode, ThemeColors } from '@moduli/types';