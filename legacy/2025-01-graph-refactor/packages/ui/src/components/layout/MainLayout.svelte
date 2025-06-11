<!-- packages/ui/src/components/layout/MainLayout.svelte -->
<script lang="ts">
  // Simple layout component
</script>

<div class="main-layout">
  {#if $$slots.header}
    <header class="layout-header">
      <slot name="header" />
    </header>
  {/if}

  <main class="layout-main">
    <slot />
  </main>
</div>

<style>
  .main-layout {
    min-height: 100vh;
    background: var(--color-background);
    color: var(--color-text);
  }

  .layout-header {
    position: sticky;
    top: 0;
    z-index: 40;
  }

  .layout-main {
    padding-top: 4rem; /* Account for fixed nav */
    min-height: 100vh;
  }
</style>
