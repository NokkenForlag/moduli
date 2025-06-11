// packages/ui/src/lib/animations.ts

// Animation class names
export const animations = {
  // Fade animations
  fadeIn: 'animate-fade-in',
  fadeOut: 'animate-fade-out',
  
  // Slide animations
  slideUp: 'animate-slide-up',
  slideDown: 'animate-slide-down',
  slideLeft: 'animate-slide-left',
  slideRight: 'animate-slide-right',
  
  // Scale animations
  scaleIn: 'animate-scale-in',
  scaleOut: 'animate-scale-out',
  
  // Special effects
  pulse: 'animate-pulse',
  spin: 'animate-spin',
  bounce: 'animate-bounce',
  float: 'animate-float',
  
  // Glass morphism transitions
  glassIn: 'animate-glass-in',
  glassOut: 'animate-glass-out',
};

// Animation duration modifiers
export const duration = {
  fast: 'duration-150',
  normal: 'duration-200',
  slow: 'duration-300',
  slower: 'duration-500',
  slowest: 'duration-700',
};

// Animation delay modifiers
export const delay = {
  none: 'delay-0',
  fast: 'delay-75',
  normal: 'delay-150',
  slow: 'delay-300',
  slower: 'delay-500',
  slowest: 'delay-700',
};

// Easing functions
export const easing = {
  default: 'ease-in-out',
  in: 'ease-in',
  out: 'ease-out',
  linear: 'ease-linear',
};

// Transition utilities
export const transitions = {
  // Property specific transitions
  all: 'transition-all',
  colors: 'transition-colors',
  opacity: 'transition-opacity',
  shadow: 'transition-shadow',
  transform: 'transition-transform',
  
  // Common combinations
  fade: 'transition-opacity duration-200 ease-in-out',
  slide: 'transition-transform duration-200 ease-out',
  scale: 'transition-transform duration-150 ease-in-out',
  glass: 'transition-all duration-300 ease-in-out',
};

// Helper to create staggered animations
export function stagger(baseClass: string, index: number, delayMs: number = 100): string {
  return `${baseClass} delay-[${index * delayMs}ms]`;
}

// Helper to create enter/exit animation pairs
export function createAnimationPair(enterClass: string, exitClass: string) {
  return {
    enter: enterClass,
    exit: exitClass,
    toggle: (isEntering: boolean) => isEntering ? enterClass : exitClass,
  };
}

// Common animation pairs
export const animationPairs = {
  fade: createAnimationPair(animations.fadeIn, animations.fadeOut),
  scale: createAnimationPair(animations.scaleIn, animations.scaleOut),
  slideUp: createAnimationPair(animations.slideUp, 'animate-slide-up-reverse'),
  glass: createAnimationPair(animations.glassIn, animations.glassOut),
};