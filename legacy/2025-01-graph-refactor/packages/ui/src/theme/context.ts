import { getContext } from 'svelte';
import type { Readable, Writable } from 'svelte/store';
import type { Theme, ThemeMode } from '@moduli/types';

export interface ThemeContext {
  mode: Writable<ThemeMode>;
  current: Readable<Theme>;
  setTheme: (mode: ThemeMode) => void;
  setCustomTheme: (theme: Theme | null) => void;
}

export function getTheme(): ThemeContext {
  const context = getContext<ThemeContext>('theme');
  
  if (!context) {
    throw new Error(
      'Theme context not found. Make sure to wrap your app with <ThemeProvider>'
    );
  }
  
  return context;
}