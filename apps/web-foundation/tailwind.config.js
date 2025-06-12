/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: 'var(--color-bg-primary)',
          secondary: 'var(--color-bg-secondary)',
          tertiary: 'var(--color-bg-tertiary)'
        },
        text: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          muted: 'var(--color-text-muted)'
        },
        accent: {
          DEFAULT: 'var(--color-accent)',
          hover: 'var(--color-accent-hover)'
        }
      },
      zIndex: {
        canvas: 'var(--z-canvas)',
        content: 'var(--z-content)',
        sidebar: 'var(--z-sidebar)',
        topnav: 'var(--z-topnav)',
        modal: 'var(--z-modal)'
      }
    }
  }
};
