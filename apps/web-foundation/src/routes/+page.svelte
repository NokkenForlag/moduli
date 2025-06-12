<script lang="ts">
  import { onMount } from 'svelte';
  import { testFoundation, applyTheme, themes } from '@moduli/core';
  
  let currentTheme = 'dark';
  let testResult = '';
  
  onMount(async () => {
    // Apply initial theme
    applyTheme(currentTheme);
    
    // Run foundation test
    console.log('Running foundation test...');
    await testFoundation();
    testResult = '✅ Foundation is working!';
  });
  
  function switchTheme(theme: string) {
    currentTheme = theme;
    applyTheme(theme);
  }
</script>

<div class="min-h-screen bg-neutral-950 text-text-primary">
  <!-- Rive Canvas placeholder -->
  <div class="fixed inset-0 z-canvas bg-gradient-to-br from-purple-900/20 to-blue-900/20"></div>
  
  <!-- Main content -->
  <div class="relative z-content">
    <!-- Simple top bar -->
    <header class="glass-md border-b border-white/10 px-6 py-4 sticky top-0 z-topnav">
      <div class="flex items-center justify-between">
        <h1 class="text-2xl font-bold">Moduli Foundation</h1>
        
        <!-- Theme switcher -->
        <div class="flex gap-2">
          {#each Object.keys(themes) as theme}
            <button
              on:click={() => switchTheme(theme)}
              class="px-3 py-1 rounded-md transition-glass {currentTheme === theme ? 'bg-accent text-white' : 'glass-sm hover:bg-white/10'}"
            >
              {theme}
            </button>
          {/each}
        </div>
      </div>
    </header>
    
    <!-- Content -->
    <main class="container mx-auto px-6 py-12">
      <div class="glass-lg rounded-2xl p-8 shadow-xl max-w-2xl mx-auto">
        <h2 class="text-3xl font-bold mb-4">Foundation Test</h2>
        
        <div class="space-y-4 text-text-secondary">
          <p>Dette er en minimal test av Moduli Core Foundation.</p>
          
          <div class="glass-sm rounded-lg p-4">
            <p class="font-mono">{testResult}</p>
          </div>
          
          <div class="grid gap-4 mt-8">
            <div class="glass-sm rounded-lg p-4 transition-glass hover:bg-white/5">
              <h3 class="font-semibold text-text-primary mb-2">✅ Theme System</h3>
              <p class="text-sm">CSS variabler og glass morphism fungerer</p>
            </div>
            
            <div class="glass-sm rounded-lg p-4 transition-glass hover:bg-white/5">
              <h3 class="font-semibold text-text-primary mb-2">✅ Graf System</h3>
              <p class="text-sm">Nodes, edges og traversering klar</p>
            </div>
            
            <div class="glass-sm rounded-lg p-4 transition-glass hover:bg-white/5">
              <h3 class="font-semibold text-text-primary mb-2">✅ Content System</h3>
              <p class="text-sm">Markdown med YAML frontmatter</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</div>

<style>
  /* Additional component styles if needed */
</style>