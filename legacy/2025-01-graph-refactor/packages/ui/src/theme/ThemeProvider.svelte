<!-- packages/ui/src/theme/ThemeProvider.svelte -->
<script lang="ts">
  import { onMount } from "svelte";

  // Dark theme CSS variables
  const darkTheme = `
    --color-background: #0a0a0a;
    --color-surface: #171717;
    --color-surfaceHover: #262626;
    --color-text: #fafafa;
    --color-textSecondary: #d4d4d4;
    --color-textMuted: #a3a3a3;
    --color-border: #404040;
    --color-borderHover: #525252;
    --color-primary: #3b82f6;
    --color-primaryHover: #2563eb;
    --color-primaryText: #fafafa;
    --color-success: #10b981;
    --color-warning: #f59e0b;
    --color-error: #ef4444;
    
    --blur-sm: 4px;
    --blur-md: 12px;
    --blur-lg: 24px;
    --blur-xl: 40px;
    
    --spacing-1: 0.25rem;
    --spacing-2: 0.5rem;
    --spacing-3: 0.75rem;
    --spacing-4: 1rem;
    --spacing-6: 1.5rem;
    --spacing-8: 2rem;
    
    --radius-sm: 0.125rem;
    --radius-md: 0.375rem;
    --radius-lg: 0.5rem;
    --radius-xl: 0.75rem;
    --radius-2xl: 1rem;
    --radius-full: 9999px;
    
    --font-sans: 'Inter', system-ui, -apple-system, sans-serif;
    --font-display: 'Manrope', 'Inter', system-ui, sans-serif;
    --font-mono: 'JetBrains Mono', 'Consolas', monospace;
    
    --duration-fast: 150ms;
    --duration-normal: 200ms;
    --duration-slow: 300ms;
    
    --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
    --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
    --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
    --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1);
  `;

  onMount(() => {
    console.log("ThemeProvider mounted, setting CSS variables");

    // Set CSS variables on root
    const root = document.documentElement;
    root.setAttribute("style", darkTheme);

    // Add theme class
    document.body.classList.add("theme-dark");
  });
</script>

<div class="theme-provider">
  <slot />
</div>

<style>
  .theme-provider {
    min-height: 100vh;
    background: var(--color-background);
    color: var(--color-text);
    font-family: var(--font-sans);
  }

  :global(body) {
    margin: 0;
    padding: 0;
  }

  /* Glass effects */
  :global(.glass) {
    background: rgba(23, 23, 23, 0.8);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(64, 64, 64, 0.5);
  }

  :global(.glass-sm) {
    background: rgba(23, 23, 23, 0.6);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    border: 1px solid rgba(64, 64, 64, 0.3);
  }

  /* Basic button styles */
  :global(button) {
    cursor: pointer;
    transition: all 200ms;
  }

  /* Ensure Tailwind utilities work */
  :global(.rounded-xl) {
    border-radius: var(--radius-xl);
  }

  :global(.p-8) {
    padding: var(--spacing-8);
  }

  :global(.mb-4) {
    margin-bottom: var(--spacing-4);
  }

  :global(.text-text) {
    color: var(--color-text);
  }

  :global(.text-textSecondary) {
    color: var(--color-textSecondary);
  }

  :global(.bg-primary) {
    background-color: var(--color-primary);
  }
</style>
