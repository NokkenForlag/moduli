import { writable, derived } from 'svelte/store';
import { browser } from '$app/environment';

export type BaseTheme = 'light' | 'dark' | 'reader';
export type TemporalTheme = 'exam-week' | 'celebration';
export type Theme = BaseTheme | TemporalTheme;

interface ThemeState {
  base: BaseTheme;
  temporal?: {
    theme: TemporalTheme;
    expires: string; // ISO string for JSON serialization
    reason?: string;
  };
}

function createThemeStore() {
  // Initialize from localStorage
  let initial: ThemeState = { base: 'light' };
  
  if (browser) {
    const saved = localStorage.getItem('moduli-theme');
    if (saved) {
      try {
        initial = JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved theme:', e);
      }
    }
  }
  
  const { subscribe, set, update } = writable<ThemeState>(initial);
  
  // Derived store for the active theme
  const active = derived(
    { subscribe },
    $state => {
      if ($state.temporal && new Date($state.temporal.expires) > new Date()) {
        return $state.temporal.theme;
      }
      return $state.base;
    }
  );
  
  function saveAndApply(state: ThemeState) {
    if (browser) {
      localStorage.setItem('moduli-theme', JSON.stringify(state));
      const activeTheme = state.temporal && new Date(state.temporal.expires) > new Date() 
        ? state.temporal.theme 
        : state.base;
      document.documentElement.setAttribute('data-theme', activeTheme);
    }
  }
  
  // Subscribe to changes
  subscribe(state => saveAndApply(state));
  
  return {
    subscribe: active.subscribe,
    active,
    
    setBase(theme: BaseTheme) {
      update(state => {
        state.base = theme;
        return state;
      });
    },
    
    toggle() {
      update(state => {
        state.base = state.base === 'light' ? 'dark' : 'light';
        return state;
      });
    },
    
    setTemporal(theme: TemporalTheme, hours: number = 24, reason?: string) {
      update(state => {
        state.temporal = {
          theme,
          expires: new Date(Date.now() + hours * 60 * 60 * 1000).toISOString(),
          reason
        };
        return state;
      });
    },
    
    clearTemporal() {
      update(state => {
        delete state.temporal;
        return state;
      });
    },
    
    checkExpiry() {
      update(state => {
        if (state.temporal && new Date(state.temporal.expires) <= new Date()) {
          delete state.temporal;
        }
        return state;
      });
    }
  };
}

export const theme = createThemeStore();

// Auto-check expiry
if (browser) {
  // Initial check
  theme.checkExpiry();
  
  // Check every minute
  setInterval(() => theme.checkExpiry(), 60000);
  
  // Check when tab becomes visible
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
      theme.checkExpiry();
    }
  });
}