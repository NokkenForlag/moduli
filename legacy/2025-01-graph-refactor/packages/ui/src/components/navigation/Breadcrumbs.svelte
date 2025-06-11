<script lang="ts">
  export let items: Array<{ label: string; href?: string }> = [];
</script>

<nav class="breadcrumbs">
  {#each items as item, i}
    {#if item.href}
      <a href={item.href}>{item.label}</a>
    {:else}
      <span>{item.label}</span>
    {/if}
    {#if i < items.length - 1}
      <span class="separator">/</span>
    {/if}
  {/each}
</nav>

<style>
  .breadcrumbs {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
    color: var(--color-text-secondary, #666);
  }

  a {
    color: var(--color-primary, #0066cc);
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  .separator {
    opacity: 0.5;
  }
</style>
