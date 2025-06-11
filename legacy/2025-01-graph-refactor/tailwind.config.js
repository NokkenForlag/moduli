// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{html,js,svelte,ts}',
    '../../packages/ui/src/**/*.{html,js,svelte,ts}'
  ],
  theme: {
    extend: {
      // Use CSS variables for all theme values
      colors: {
        // Core colors
        background: 'var(--color-background)',
        surface: 'var(--color-surface)',
        surfaceHover: 'var(--color-surfaceHover)',
        
        // Text colors
        text: 'var(--color-text)',
        textSecondary: 'var(--color-textSecondary)',
        textMuted: 'var(--color-textMuted)',
        
        // Border colors
        border: 'var(--color-border)',
        borderHover: 'var(--color-borderHover)',
        
        // Accent colors
        primary: 'var(--color-primary)',
        primaryHover: 'var(--color-primaryHover)',
        primaryText: 'var(--color-primaryText)',
        
        // Semantic colors
        success: 'var(--color-success)',
        warning: 'var(--color-warning)',
        error: 'var(--color-error)',
      },
      
      // Spacing using CSS variables
      spacing: {
        'px': 'var(--spacing-px)',
        '0': 'var(--spacing-0)',
        '0.5': 'var(--spacing-0.5)',
        '1': 'var(--spacing-1)',
        '2': 'var(--spacing-2)',
        '3': 'var(--spacing-3)',
        '4': 'var(--spacing-4)',
        '5': 'var(--spacing-5)',
        '6': 'var(--spacing-6)',
        '8': 'var(--spacing-8)',
        '10': 'var(--spacing-10)',
        '12': 'var(--spacing-12)',
        '16': 'var(--spacing-16)',
        '20': 'var(--spacing-20)',
      },
      
      // Border radius
      borderRadius: {
        'sm': 'var(--radius-sm)',
        'DEFAULT': 'var(--radius-DEFAULT)',
        'md': 'var(--radius-md)',
        'lg': 'var(--radius-lg)',
        'xl': 'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)',
        'full': 'var(--radius-full)',
      },
      
      // Font families
      fontFamily: {
        sans: 'var(--font-sans)',
        display: 'var(--font-display)',
        mono: 'var(--font-mono)',
      },
      
      // Shadows
      boxShadow: {
        'sm': 'var(--shadow-sm)',
        'DEFAULT': 'var(--shadow-DEFAULT)',
        'md': 'var(--shadow-md)',
        'lg': 'var(--shadow-lg)',
        'xl': 'var(--shadow-xl)',
        'glow': 'var(--shadow-glow)',
      },
      
      // Blur values for backdrop-filter
      blur: {
        'sm': 'var(--blur-sm)',
        'md': 'var(--blur-md)',
        'lg': 'var(--blur-lg)',
        'xl': 'var(--blur-xl)',
      },
      
      // Animation timing
      transitionDuration: {
        'fast': 'var(--duration-fast)',
        'normal': 'var(--duration-normal)',
        'slow': 'var(--duration-slow)',
      },
      
      // Easing functions
      transitionTimingFunction: {
        'default': 'var(--easing-default)',
        'in': 'var(--easing-in)',
        'out': 'var(--easing-out)',
      },
      
      // Z-index scale
      zIndex: {
        '0': '0',
        '10': '10',
        '20': '20',
        '30': '30',
        '40': '40',
        '50': '50',
      },
    },
  },
  plugins: [],
}