// packages/ui/src/theme/styles.ts
import { cn } from '../lib/cn';

// Glass morphism base styles
export const glass = {
  base: 'backdrop-blur-md bg-white/10 border border-white/20',
  sm: 'backdrop-blur-sm bg-white/5 border border-white/10',
  md: 'backdrop-blur-md bg-white/10 border border-white/20',
  lg: 'backdrop-blur-lg bg-white/20 border border-white/30',
  xl: 'backdrop-blur-xl bg-white/30 border border-white/40',
  
  // Surface variants
  surface: {
    base: 'glass backdrop-blur-md bg-surface/80 border-border/50',
    elevated: 'glass backdrop-blur-lg bg-surfaceHover/90 border-border/60 shadow-lg',
    overlay: 'glass backdrop-blur-xl bg-background/95 border-border/30 shadow-xl',
  },
  
  // Interactive states
  interactive: 'transition-all duration-200 hover:border-borderHover hover:shadow-md',
};

// Layout component styles
export const layout = {
  // Main container
  root: 'min-h-screen bg-background text-text',
  container: 'relative z-10 w-full max-w-screen-2xl mx-auto',
  
  // Navigation
  topNav: cn(
    'fixed top-0 left-0 right-0 z-50 h-16',
    glass.surface.elevated,
    'transition-all duration-300'
  ),
  
  sideNav: cn(
    'fixed left-0 top-16 bottom-0 z-40 w-64',
    glass.surface.base,
    'transition-all duration-300',
    'overflow-y-auto'
  ),
  
  contentBar: cn(
    'fixed right-0 top-16 bottom-0 z-30 w-80',
    glass.surface.base,
    'transition-all duration-300',
    'overflow-y-auto'
  ),
  
  // Main content area
  main: 'relative min-h-screen pt-16 transition-all duration-300',
  mainWithSidebar: 'pl-64',
  mainWithContentBar: 'pr-80',
  mainPadded: 'p-6 lg:p-8',
};

// Component styles
export const components = {
  // Cards
  card: {
    base: cn(
      glass.surface.base,
      'rounded-xl p-6',
      'transition-all duration-200'
    ),
    hover: 'hover:shadow-lg hover:border-primary/30 hover:scale-[1.02]',
    interactive: cn(
      glass.surface.base,
      glass.interactive,
      'rounded-xl p-6 cursor-pointer'
    ),
  },
  
  // Buttons
  button: {
    base: cn(
      'inline-flex items-center justify-center',
      'px-4 py-2 rounded-lg font-medium',
      'transition-all duration-200',
      'focus:outline-none focus:ring-2 focus:ring-primary/50'
    ),
    
    variants: {
      primary: cn(
        'bg-primary text-primaryText',
        'hover:bg-primaryHover',
        'shadow-md hover:shadow-lg'
      ),
      secondary: cn(
        glass.sm,
        'hover:bg-white/20',
        'text-text'
      ),
      ghost: cn(
        'hover:bg-white/10',
        'text-textSecondary hover:text-text'
      ),
    },
    
    sizes: {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    },
  },
  
  // Form elements
  input: {
    base: cn(
      'w-full px-4 py-2 rounded-lg',
      glass.surface.base,
      'text-text placeholder:text-textMuted',
      'focus:outline-none focus:ring-2 focus:ring-primary/50',
      'transition-all duration-200'
    ),
    error: 'border-error focus:ring-error/50',
    success: 'border-success focus:ring-success/50',
  },
  
  // Navigation items
  navItem: {
    base: cn(
      'flex items-center gap-3 px-3 py-2 rounded-lg',
      'text-textSecondary hover:text-text',
      'hover:bg-white/10',
      'transition-all duration-200'
    ),
    active: cn(
      'bg-primary/10 text-primary',
      'hover:bg-primary/20'
    ),
  },
  
  // Badges
  badge: {
    base: cn(
      'inline-flex items-center px-2.5 py-0.5 rounded-full',
      'text-xs font-medium'
    ),
    variants: {
      default: cn(glass.sm, 'text-textSecondary'),
      primary: 'bg-primary/20 text-primary',
      success: 'bg-success/20 text-success',
      warning: 'bg-warning/20 text-warning',
      error: 'bg-error/20 text-error',
    },
  },
};

// Typography styles
export const typography = {
  h1: 'text-4xl font-bold font-display tracking-tight',
  h2: 'text-3xl font-semibold font-display',
  h3: 'text-2xl font-semibold font-display',
  h4: 'text-xl font-semibold',
  h5: 'text-lg font-semibold',
  
  body: 'text-base leading-relaxed',
  small: 'text-sm',
  tiny: 'text-xs',
  
  lead: 'text-lg text-textSecondary',
  muted: 'text-textMuted',
  
  link: cn(
    'text-primary hover:text-primaryHover',
    'underline-offset-4 hover:underline',
    'transition-colors duration-200'
  ),
  
  code: cn(
    'font-mono text-sm',
    'px-1.5 py-0.5 rounded',
    glass.sm
  ),
};

// Utility styles
export const utils = {
  // Spacing
  section: 'mb-8',
  group: 'mb-6',
  stack: 'space-y-4',
  
  // Borders
  divider: 'border-t border-border',
  
  // States
  disabled: 'opacity-50 cursor-not-allowed pointer-events-none',
  loading: 'animate-pulse',
  
  // Focus
  focusRing: 'focus:outline-none focus:ring-2 focus:ring-primary/50',
  
  // Shadows
  glow: 'shadow-[0_0_20px_rgba(var(--color-primary-rgb),0.3)]',
};

// Helper to build component classes
export function componentClass(
  base: string | string[],
  options?: {
    variant?: string;
    size?: string;
    className?: string;
    conditions?: Record<string, boolean>;
  }
): string {
  const classes = Array.isArray(base) ? base : [base];
  
  if (options?.variant) classes.push(options.variant);
  if (options?.size) classes.push(options.size);
  if (options?.className) classes.push(options.className);
  
  if (options?.conditions) {
    Object.entries(options.conditions).forEach(([className, condition]) => {
      if (condition) classes.push(className);
    });
  }
  
  return cn(...classes);
}