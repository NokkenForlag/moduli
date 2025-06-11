// packages/ui/src/stores/theme.ts
import { writable, derived, get } from 'svelte/store';
import type { ThemeMode, Theme } from '@moduli/types';
import { themes, getTheme } from '../theme/themes';

// Constants
const STORAGE_KEY = 'moduli-theme-preference';
const DEFAULT_THEME: ThemeMode = 'dark';

// Check if we're in a browser environment
const isBrowser = typeof window !== 'undefined';

// Get system color scheme preference
function getSystemPreference(): ThemeMode {
  if (!isBrowser) return DEFAULT_THEME;
  
  if (window.matchMedia('(prefers-color-scheme: light)').matches) {
    return 'light';
  }
  
  return 'dark';
}

// Get initial theme from localStorage or system preference
function getInitialTheme(): ThemeMode {
  if (!isBrowser) return DEFAULT_THEME;
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && stored in themes) {
      return stored as ThemeMode;
    }
  } catch (e) {
    console.warn('Failed to read theme from localStorage:', e);
  }
  
  return getSystemPreference();
}

// Create the main theme mode store
const themeMode = writable<ThemeMode>(getInitialTheme());

// Create derived store for the full theme object
const currentTheme = derived(themeMode, $mode => getTheme($mode));

// Subscribe to system theme changes
if (isBrowser) {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  
  // Only update if user hasn't set a manual preference
  const handleChange = (e: MediaQueryListEvent) => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      themeMode.set(e.matches ? 'dark' : 'light');
    }
  };
  
  // Modern browsers
  if (mediaQuery.addEventListener) {
    mediaQuery.addEventListener('change', handleChange);
  } else {
    // Legacy browsers
    mediaQuery.addListener(handleChange);
  }
}

// Persist theme changes to localStorage
themeMode.subscribe(mode => {
  if (!isBrowser) return;
  
  try {
    localStorage.setItem(STORAGE_KEY, mode);
  } catch (e) {
    console.warn('Failed to save theme to localStorage:', e);
  }
});

// Helper functions
function setTheme(mode: ThemeMode) {
  themeMode.set(mode);
}

function toggleTheme() {
  themeMode.update(mode => {
    const modes: ThemeMode[] = ['dark', 'light', 'cosmic', 'ocean'];
    const currentIndex = modes.indexOf(mode);
    const nextIndex = (currentIndex + 1) % modes.length;
    return modes[nextIndex];
  });
}

function cycleTheme(modes?: ThemeMode[]) {
  const themesToCycle = modes || ['dark', 'light', 'cosmic', 'ocean'];
  
  themeMode.update(mode => {
    const currentIndex = themesToCycle.indexOf(mode);
    const nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % themesToCycle.length;
    return themesToCycle[nextIndex];
  });
}

function resetToSystem() {
  if (!isBrowser) return;
  
  // Remove stored preference
  localStorage.removeItem(STORAGE_KEY);
  
  // Set to system preference
  themeMode.set(getSystemPreference());
}

// Export store and helpers
export const themeStore = {
  // Stores (using subscribe pattern)
  subscribe: themeMode.subscribe,
  mode: { subscribe: themeMode.subscribe },
  current: { subscribe: currentTheme.subscribe },
  theme: { subscribe: currentTheme.subscribe },
  
  // Actions
  set: setTheme,
  toggle: toggleTheme,
  cycle: cycleTheme,
  resetToSystem,
  
  // Getters
  getMode: () => get(themeMode),
  getTheme: () => get(currentTheme),
  
  // Utils
  isSystemPreference: () => {
    if (!isBrowser) return false;
    return !localStorage.getItem(STORAGE_KEY);
  },
  
  getAvailableThemes: () => Object.keys(themes) as ThemeMode[],
};