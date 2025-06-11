// packages/ui/src/lib/responsive.ts

// Breakpoint values (matching Tailwind defaults)
export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

// Visibility utilities
export const visibility = {
  // Hide on specific breakpoints
  hideOnMobile: 'hidden sm:block',
  hideOnTablet: 'hidden md:block lg:hidden',
  hideOnDesktop: 'block lg:hidden',
  
  // Show only on specific breakpoints
  mobileOnly: 'block sm:hidden',
  tabletOnly: 'hidden md:block lg:hidden',
  desktopOnly: 'hidden lg:block',
};

// Layout utilities
export const layout = {
  // Stack on mobile, row on desktop
  stackOnMobile: 'flex flex-col md:flex-row',
  stackOnTablet: 'flex flex-col lg:flex-row',
  
  // Grid responsive
  gridMobile1: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  gridMobile2: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  
  // Container widths
  container: 'w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
  containerSmall: 'w-full max-w-3xl mx-auto px-4 sm:px-6',
  containerLarge: 'w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8',
};

// Spacing utilities
export const spacing = {
  // Padding responsive
  paddingMobile: 'p-4 md:p-6 lg:p-8',
  paddingTablet: 'p-6 lg:p-8 xl:p-10',
  
  // Margin responsive
  marginMobile: 'm-4 md:m-6 lg:m-8',
  gapMobile: 'gap-4 md:gap-6 lg:gap-8',
};

// Text utilities
export const text = {
  // Font size responsive
  headingMobile: 'text-2xl md:text-3xl lg:text-4xl',
  subheadingMobile: 'text-xl md:text-2xl lg:text-3xl',
  bodyMobile: 'text-sm md:text-base lg:text-lg',
  
  // Line height responsive
  tightMobile: 'leading-tight md:leading-snug',
  relaxedMobile: 'leading-relaxed md:leading-loose',
};

// Helper to check if we're on a mobile device
export function isMobile(): boolean {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < breakpoints.md;
}

// Helper to check if we're on a tablet device
export function isTablet(): boolean {
  if (typeof window === 'undefined') return false;
  return window.innerWidth >= breakpoints.md && window.innerWidth < breakpoints.lg;
}

// Helper to check if we're on a desktop device
export function isDesktop(): boolean {
  if (typeof window === 'undefined') return false;
  return window.innerWidth >= breakpoints.lg;
}

// Media query strings for use in JS
export const mediaQueries = {
  sm: `(min-width: ${breakpoints.sm}px)`,
  md: `(min-width: ${breakpoints.md}px)`,
  lg: `(min-width: ${breakpoints.lg}px)`,
  xl: `(min-width: ${breakpoints.xl}px)`,
  '2xl': `(min-width: ${breakpoints['2xl']}px)`,
  
  // Common combinations
  mobile: `(max-width: ${breakpoints.md - 1}px)`,
  tablet: `(min-width: ${breakpoints.md}px) and (max-width: ${breakpoints.lg - 1}px)`,
  desktop: `(min-width: ${breakpoints.lg}px)`,
  
  // Orientation
  portrait: '(orientation: portrait)',
  landscape: '(orientation: landscape)',
  
  // Hover capability
  hover: '(hover: hover)',
  touch: '(hover: none)',
};