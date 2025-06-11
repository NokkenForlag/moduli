<!-- apps/web/src/routes/+layout.svelte -->
<script lang="ts">
  import '../app.css';
  import { ThemeProvider } from '@moduli/ui';
</script>

<ThemeProvider>
  <div class="min-h-screen antialiased">
    <slot />
  </div>
</ThemeProvider>

<style>
  /* Ensure smooth theme transitions */
  :global(html) {
    scroll-behavior: smooth;
  }
  
  /* Disable transitions on initial load */
  :global(.preload *) {
    transition: none !important;
    -webkit-transition: none !important;
  }
</style>

<svelte:head>
  <script>
    // Remove preload class after page load
    window.addEventListener('load', () => {
      document.body.classList.remove('preload');
    });
    
    // Add preload class initially
    document.body.classList.add('preload');
  </script>
</svelte:head>