// packages/ui/src/theme/utils.ts
import type { Theme } from '@moduli/types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Kombinerer clsx og tailwind-merge for optimal class-håndtering
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Glass-morphism presets
export const glass = {
  // Base glass styles med ulike intensiteter
  base: (intensity: 'subtle' | 'medium' | 'strong' = 'medium') => {
    const styles = {
      subtle: 'bg-white/5 backdrop-blur-sm border border-white/10',
      medium: 'bg-white/10 backdrop-blur-md border border-white/20',
      strong: 'bg-white/20 backdrop-blur-lg border border-white/30'
    };
    return styles[intensity];
  },

  // Surface variants for forskjellige komponenter
  surface: {
    primary: 'bg-surface/80 backdrop-blur-xl border border-border/50',
    secondary: 'bg-surface/60 backdrop-blur-lg border border-border/30',
    overlay: 'bg-background/90 backdrop-blur-2xl border border-border/20',
    hover: 'hover:bg-surfaceHover/80 transition-colors duration-200'
  },

  // Elevation via shadow og z-index
  elevation: {
    low: 'shadow-sm z-10',
    medium: 'shadow-md z-20',
    high: 'shadow-lg z-30',
    modal: 'shadow-2xl z-50'
  },

  // Animasjoner for glass-effekter
  animation: {
    fadeIn: 'animate-fadeIn',
    slideUp: 'animate-slideUp',
    scaleIn: 'animate-scaleIn'
  }
};

// Layout-spesifikke styles
export const layout = {
  topbar: cn(
    glass.surface.primary,
    glass.elevation.high,
    'fixed top-0 left-0 right-0 h-16',
    'px-4 flex items-center justify-between'
  ),
  
  sidebar: cn(
    glass.surface.secondary,
    glass.elevation.medium,
    'fixed left-0 top-16 bottom-0 w-64',
    'p-4 overflow-y-auto'
  ),
  
  contentBar: cn(
    glass.surface.secondary,
    glass.elevation.low,
    'fixed right-0 top-16 bottom-0 w-80',
    'p-4 overflow-y-auto'
  ),
  
  mainContent: cn(
    'ml-64 mr-80 mt-16 min-h-screen',
    'p-8'
  ),
  
  card: cn(
    glass.surface.primary,
    glass.elevation.low,
    'rounded-xl p-6 mb-4',
    'transition-all duration-200',
    'hover:shadow-md hover:scale-[1.01]'
  ),
  
  button: {
    base: cn(
      'px-4 py-2 rounded-lg font-medium',
      'transition-all duration-200',
      'focus:outline-none focus:ring-2'
    ),
    primary: cn(
      'bg-primary text-primaryText',
      'hover:bg-primaryHover',
      'focus:ring-primary/50'
    ),
    secondary: cn(
      glass.base('subtle'),
      'hover:bg-white/20',
      'focus:ring-white/50'
    ),
    ghost: cn(
      'hover:bg-white/10',
      'focus:ring-white/30'
    )
  }
};

// Typography utilities basert på theme
export const typography = {
  h1: 'text-4xl font-display font-bold tracking-tight',
  h2: 'text-3xl font-display font-semibold',
  h3: 'text-2xl font-display font-semibold',
  h4: 'text-xl font-sans font-semibold',
  body: 'text-base font-sans',
  small: 'text-sm font-sans',
  code: 'font-mono text-sm'
};

// Spacing utilities som matcher theme tokens
export const spacing = {
  section: 'mb-8',
  group: 'mb-4',
  element: 'mb-2',
  compact: 'mb-1',
  
  pad: {
    xs: 'p-2',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
    xl: 'p-8'
  }
};

// State-baserte utilities
export const state = {
  disabled: 'opacity-50 cursor-not-allowed',
  loading: 'animate-pulse',
  error: 'border-error text-error',
  success: 'border-success text-success',
  warning: 'border-warning text-warning'
};

// Responsive utilities
export const responsive = {
  hideOnMobile: 'hidden md:block',
  hideOnDesktop: 'md:hidden',
  stack: 'flex flex-col md:flex-row',
  center: 'flex items-center justify-center'
};

// Helper for å bygge component classes
export function componentClasses(
  base: string,
  variants?: Record<string, string>,
  conditions?: Record<string, boolean>
) {
  const classes = [base];
  
  if (variants) {
    Object.entries(variants).forEach(([key, value]) => {
      if (value) classes.push(value);
    });
  }
  
  if (conditions) {
    Object.entries(conditions).forEach(([className, condition]) => {
      if (condition) classes.push(className);
    });
  }
  
  return cn(...classes);
}

// Theme-aware color utilities
export function getThemeColor(color: keyof Theme['colors'], opacity?: number): string {
  if (opacity) {
    return `rgb(var(--color-${color}-rgb) / ${opacity})`;
  }
  return `var(--color-${color})`;
}

// Glass blur utilities for dynamic blur
export function getBlur(level: keyof Theme['glass']['blur']): string {
  return `var(--blur-${level})`;
}

// Shadow utilities
export function getShadow(level: keyof Theme['shadows']): string {
  return `var(--shadow-${level})`;
}