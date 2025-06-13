<script lang="ts">
  import { browser } from '$app/environment';
  
  let mounted = $state(false);
  let initCount = $state(0);
  
  // Svelte 5 way - runs after component is connected to DOM
  $effect(() => {
    if (browser) {
      console.log('Effect running, browser:', browser);
      mounted = true;
      initCount++;
    }
  });
</script>

<div class="p-8">
  <h1 class="text-2xl mb-4">Svelte 5 Test</h1>
  <p>Browser: {browser}</p>
  <p>Mounted (state): {mounted}</p>
  <p>Init count: {initCount}</p>
  
  {#if browser}
    <p class="mt-4 text-green-500">✓ Client-side rendered</p>
  {:else}
    <p class="mt-4 text-yellow-500">⚠ Server-side rendered</p>
  {/if}
</div>