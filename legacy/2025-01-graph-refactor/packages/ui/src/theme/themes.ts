// packages/ui/src/theme/themes.ts
import type { Theme, ThemeMode } from '@moduli/types';
import { tokens } from './tokens';

// Theme definitions using tokens
export const themes: Record<ThemeMode, Theme> = {
  dark: {
    name: 'dark',
    colors: {
      // Backgrounds
      background: tokens.colors.neutral[950],
      surface: `${tokens.colors.neutral[900]}${Math.round(tokens.glass.opacity.medium * 255).toString(16)}`,
      surfaceHover: `${tokens.colors.neutral[800]}${Math.round(tokens.glass.opacity.medium * 255).toString(16)}`,
      
      // Text
      text: tokens.colors.neutral[100],
      textSecondary: tokens.colors.neutral[300],
      textMuted: tokens.colors.neutral[400],
      
      // Borders
      border: `${tokens.colors.neutral[800]}${Math.round(tokens.glass.opacity.high * 255).toString(16)}`,
      borderHover: `${tokens.colors.neutral[700]}${Math.round(tokens.glass.opacity.high * 255).toString(16)}`,
      
      // Accent colors
      primary: tokens.colors.accent[500],
      primaryHover: tokens.colors.accent[600],
      primaryText: tokens.colors.neutral[50],
      
      // Semantic colors
      success: tokens.colors.success[500],
      warning: tokens.colors.warning[500],
      error: tokens.colors.error[500],
    },
    glass: tokens.glass,
    spacing: tokens.spacing,
    radius: tokens.radius,
    typography: tokens.typography,
    animation: tokens.animation,
    shadows: {
      ...tokens.shadows,
      // Dark theme specific shadows
      glow: '0 0 24px rgba(139, 92, 246, 0.3)',
    },
  },
  
  light: {
    name: 'light',
    colors: {
      // Backgrounds
      background: tokens.colors.neutral[50],
      surface: `${tokens.colors.neutral[100]}${Math.round(tokens.glass.opacity.medium * 255).toString(16)}`,
      surfaceHover: `${tokens.colors.neutral[200]}${Math.round(tokens.glass.opacity.medium * 255).toString(16)}`,
      
      // Text
      text: tokens.colors.neutral[900],
      textSecondary: tokens.colors.neutral[700],
      textMuted: tokens.colors.neutral[500],
      
      // Borders
      border: `${tokens.colors.neutral[300]}${Math.round(tokens.glass.opacity.high * 255).toString(16)}`,
      borderHover: `${tokens.colors.neutral[400]}${Math.round(tokens.glass.opacity.high * 255).toString(16)}`,
      
      // Accent colors
      primary: tokens.colors.accent[600],
      primaryHover: tokens.colors.accent[700],
      primaryText: tokens.colors.neutral[50],
      
      // Semantic colors
      success: tokens.colors.success[600],
      warning: tokens.colors.warning[600],
      error: tokens.colors.error[600],
    },
    glass: tokens.glass,
    spacing: tokens.spacing,
    radius: tokens.radius,
    typography: tokens.typography,
    animation: tokens.animation,
    shadows: {
      ...tokens.shadows,
      // Light theme specific shadows
      sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
      md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
      xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
      glow: '0 0 24px rgba(124, 58, 237, 0.2)',
    },
  },
  
  cosmic: {
    name: 'cosmic',
    colors: {
      // Backgrounds with purple tint
      background: '#0a0015',
      surface: `#1a0f2e${Math.round(tokens.glass.opacity.medium * 255).toString(16)}`,
      surfaceHover: `#2d1b4e${Math.round(tokens.glass.opacity.medium * 255).toString(16)}`,
      
      // Text
      text: '#e0d5ff',
      textSecondary: '#b794f6',
      textMuted: '#9f7aea',
      
      // Borders
      border: `#44337a${Math.round(tokens.glass.opacity.high * 255).toString(16)}`,
      borderHover: `#553c9a${Math.round(tokens.glass.opacity.high * 255).toString(16)}`,
      
      // Accent colors
      primary: '#8b5cf6',
      primaryHover: '#7c3aed',
      primaryText: '#ffffff',
      
      // Semantic colors
      success: tokens.colors.success[500],
      warning: tokens.colors.warning[500],
      error: tokens.colors.error[500],
    },
    glass: tokens.glass,
    spacing: tokens.spacing,
    radius: tokens.radius,
    typography: tokens.typography,
    animation: tokens.animation,
    shadows: {
      ...tokens.shadows,
      glow: '0 0 40px rgba(168, 85, 247, 0.4)',
    },
  },
  
  ocean: {
    name: 'ocean',
    colors: {
      // Ocean blue theme
      background: '#051219',
      surface: `#0a1929${Math.round(tokens.glass.opacity.medium * 255).toString(16)}`,
      surfaceHover: `#132f4c${Math.round(tokens.glass.opacity.medium * 255).toString(16)}`,
      
      // Text
      text: '#e3f2fd',
      textSecondary: '#90caf9',
      textMuted: '#64b5f6',
      
      // Borders
      border: `#1e3a5f${Math.round(tokens.glass.opacity.high * 255).toString(16)}`,
      borderHover: `#2c5282${Math.round(tokens.glass.opacity.high * 255).toString(16)}`,
      
      // Accent colors
      primary: '#0ea5e9',
      primaryHover: '#0284c7',
      primaryText: '#ffffff',
      
      // Semantic colors
      success: tokens.colors.success[500],
      warning: tokens.colors.warning[500],
      error: tokens.colors.error[500],
    },
    glass: tokens.glass,
    spacing: tokens.spacing,
    radius: tokens.radius,
    typography: tokens.typography,
    animation: tokens.animation,
    shadows: {
      ...tokens.shadows,
      glow: '0 0 30px rgba(14, 165, 233, 0.3)',
    },
  },
};

// Default theme
export const defaultTheme = themes.dark;

// Get theme by name
export function getTheme(mode: ThemeMode): Theme {
  return themes[mode] || defaultTheme;
}

// Helper to generate CSS variables from theme
export function generateCSSVariables(theme: Theme): string {
  const vars: string[] = [];
  
  // Colors
  Object.entries(theme.colors).forEach(([key, value]) => {
    vars.push(`--color-${key}: ${value};`);
  });
  
  // Glass effects
  Object.entries(theme.glass.blur).forEach(([key, value]) => {
    vars.push(`--blur-${key}: ${value};`);
  });
  Object.entries(theme.glass.opacity).forEach(([key, value]) => {
    vars.push(`--opacity-${key}: ${value};`);
  });
  
  // Spacing
  Object.entries(theme.spacing).forEach(([key, value]) => {
    vars.push(`--spacing-${key}: ${value};`);
  });
  
  // Radius
  Object.entries(theme.radius).forEach(([key, value]) => {
    vars.push(`--radius-${key}: ${value};`);
  });
  
  // Typography
  vars.push(`--font-sans: ${theme.typography.fontFamily.sans.join(', ')};`);
  vars.push(`--font-mono: ${theme.typography.fontFamily.mono.join(', ')};`);
  vars.push(`--font-display: ${theme.typography.fontFamily.display.join(', ')};`);
  
  // Animation
  Object.entries(theme.animation.duration).forEach(([key, value]) => {
    vars.push(`--duration-${key}: ${value};`);
  });
  
  // Shadows
  Object.entries(theme.shadows).forEach(([key, value]) => {
    vars.push(`--shadow-${key}: ${value};`);
  });
  
  return vars.join('\n  ');
}