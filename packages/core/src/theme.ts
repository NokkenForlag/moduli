// Minimal theme system for Moduli
export interface Theme {
  name: string;
  colors: {
    // Backgrounds med /80 opacity som standard
    bgPrimary: string;
    bgSecondary: string;
    bgTertiary: string;
    
    // Text
    textPrimary: string;
    textSecondary: string;
    textMuted: string;
    
    // Accents
    accent: string;
    accentHover: string;
    
    // Semantic
    success: string;
    warning: string;
    error: string;
  };
  blur: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
}

export const themes: Record<string, Theme> = {
  light: {
    name: 'light',
    colors: {
      bgPrimary: 'rgb(255 255 255 / 0.7)',   // white/70
      bgSecondary: 'rgb(249 250 251 / 0.7)', // gray-50/70
      bgTertiary: 'rgb(243 244 246 / 0.6)',  // gray-100/60
      textPrimary: 'rgb(17 24 39 / 0.9)',    // gray-900/90
      textSecondary: 'rgb(55 65 81 / 0.8)',  // gray-700/80
      textMuted: 'rgb(107 114 128 / 0.7)',   // gray-500/70
      accent: 'rgb(79 70 229)',               // indigo-600
      accentHover: 'rgb(67 56 202)',          // indigo-700
      success: 'rgb(16 185 129)',             // emerald-500
      warning: 'rgb(245 158 11)',             // amber-500
      error: 'rgb(239 68 68)'                 // red-500
    },
    blur: {
      sm: '4px',
      md: '8px', 
      lg: '12px',
      xl: '16px'
    }
  },
  
  dark: {
    name: 'dark',
    colors: {
      bgPrimary: 'rgb(10 10 10 / 0.6)',      // neutral-950/60 - mer transparent
      bgSecondary: 'rgb(23 23 23 / 0.6)',    // neutral-900/60
      bgTertiary: 'rgb(38 38 38 / 0.5)',     // neutral-800/50
      textPrimary: 'rgb(250 250 250 / 0.9)', // neutral-50/90
      textSecondary: 'rgb(229 229 229 / 0.8)', // neutral-200/80
      textMuted: 'rgb(163 163 163 / 0.7)',   // neutral-400/70
      accent: 'rgb(99 102 241)',              // indigo-500
      accentHover: 'rgb(79 70 229)',          // indigo-600
      success: 'rgb(34 197 94)',              // green-500
      warning: 'rgb(251 146 60)',             // orange-400
      error: 'rgb(239 68 68)'                 // red-500
    },
    blur: {
      sm: '4px',
      md: '8px', 
      lg: '16px',
      xl: '24px'
    }
  },
  
  cosmic: {
    name: 'cosmic',
    colors: {
      bgPrimary: 'rgb(13 7 30 / 0.5)',       // Deep purple - mer transparent
      bgSecondary: 'rgb(25 15 45 / 0.5)',    
      bgTertiary: 'rgb(38 23 68 / 0.4)',     
      textPrimary: 'rgb(237 233 254 / 0.9)', 
      textSecondary: 'rgb(196 181 253 / 0.8)',
      textMuted: 'rgb(139 92 246 / 0.7)',    
      accent: 'rgb(168 85 247)',              // purple-500
      accentHover: 'rgb(147 51 234)',         // purple-600
      success: 'rgb(52 211 153)',             // emerald-400
      warning: 'rgb(251 191 36)',             // amber-400
      error: 'rgb(248 113 113)'               // red-400
    },
    blur: {
      sm: '6px',
      md: '12px',
      lg: '20px', 
      xl: '30px'
    }
  },
  
  ocean: {
    name: 'ocean',
    colors: {
      bgPrimary: 'rgb(7 15 30 / 0.5)',       // Deep blue - mer transparent
      bgSecondary: 'rgb(15 23 42 / 0.5)',    
      bgTertiary: 'rgb(30 41 59 / 0.4)',     
      textPrimary: 'rgb(240 249 255 / 0.9)', 
      textSecondary: 'rgb(186 230 253 / 0.8)',
      textMuted: 'rgb(125 211 252 / 0.7)',   
      accent: 'rgb(56 189 248)',              // sky-400
      accentHover: 'rgb(14 165 233)',         // sky-500
      success: 'rgb(45 212 191)',             // teal-400
      warning: 'rgb(252 211 77)',             // yellow-300
      error: 'rgb(251 113 133)'               // rose-400
    },
    blur: {
      sm: '4px',
      md: '10px',
      lg: '18px',
      xl: '28px'
    }
  }
};

export function getCSSVariables(theme: Theme): Record<string, string> {
  return {
    '--color-bg-primary': theme.colors.bgPrimary,
    '--color-bg-secondary': theme.colors.bgSecondary,
    '--color-bg-tertiary': theme.colors.bgTertiary,
    '--color-text-primary': theme.colors.textPrimary,
    '--color-text-secondary': theme.colors.textSecondary,
    '--color-text-muted': theme.colors.textMuted,
    '--color-accent': theme.colors.accent,
    '--color-accent-hover': theme.colors.accentHover,
    '--color-success': theme.colors.success,
    '--color-warning': theme.colors.warning,
    '--color-error': theme.colors.error,
    '--blur-sm': theme.blur.sm,
    '--blur-md': theme.blur.md,
    '--blur-lg': theme.blur.lg,
    '--blur-xl': theme.blur.xl
  };
}

export function applyTheme(themeName: string): void {
  const theme = themes[themeName];
  if (!theme) {
    console.warn(`Theme '${themeName}' not found`);
    return;
  }
  
  // Only apply in browser environment
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return;
  }
  
  const cssVars = getCSSVariables(theme);
  const root = document.documentElement;
  
  Object.entries(cssVars).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
  
  // Lagre theme preference
  localStorage.setItem('moduli-theme', themeName);
}

export function getStoredTheme(): string {
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') return 'dark';
  return localStorage.getItem('moduli-theme') || 'dark';
}