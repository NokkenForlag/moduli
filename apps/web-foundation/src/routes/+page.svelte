<script lang="ts">
  import { browser } from '$app/environment';
  import { testFoundation, applyTheme, themes } from '@moduli/core';
  import GradientBackground from '$lib/components/GradientBackground.svelte';
  import ConceptCard from '$lib/components/ConceptCard.svelte';
  
  let currentTheme = $state('dark');
  let testResult = $state('');
  let foundationReady = $state(false);
  
  // Initialize when in browser
  $effect(() => {
    if (browser && !foundationReady) {
      applyTheme(currentTheme);
      testFoundation().then(() => {
        testResult = '✅ Foundation is working!';
        foundationReady = true;
      });
    }
  });
  
  function cycleTheme() {
    const themeNames = Object.keys(themes);
    const currentIndex = themeNames.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % themeNames.length;
    currentTheme = themeNames[nextIndex];
    applyTheme(currentTheme);
  }
  
  // Rest of your existing data...
  const statusItems = [
    // ... existing items ...
  ];
  
  const foundationModules = [
    // ... existing modules ...
  ];
</script>

<!-- Rest of template remains the same -->
<div class="min-h-screen text-text-primary">
  <GradientBackground />
  
  <div class="relative z-content">
    <!-- Header -->
    <header class="glass-md border-b border-white/10 px-6 py-4 sticky top-0 z-topnav">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold">Moduli Foundation</h1>
          <p class="text-sm text-text-muted">
            {#if foundationReady}
              {testResult}
            {:else}
              Initialiserer...
            {/if}
          </p>
        </div>
        
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
    
    <!-- Hero Section -->
    <section class="container mx-auto px-6 py-16 text-center">
      <h2 class="text-4xl md:text-5xl font-bold mb-4">
        En solid foundation for Moduli
      </h2>
      <p class="text-xl text-text-secondary max-w-2xl mx-auto">
        Minimal arkitektur med fokus på ytelse, fleksibilitet og utvikleropplevelse.
        Bygget med moderne web-teknologi.
      </p>
    </section>
    
    <!-- Foundation Modules -->
    <main class="container mx-auto px-6 pb-16">
      <h3 class="text-2xl font-bold mb-8">Foundation Moduler</h3>
      
      <div class="grid gap-6 md:grid-cols-2">
        {#each foundationModules as module}
          <ConceptCard 
            concept={module}
            onClick={() => console.log('Module:', module.id)}
          />
        {/each}
      </div>
      
      <!-- Next Steps -->
      <div class="mt-16 glass-lg rounded-2xl p-8">
        <h3 class="text-2xl font-bold mb-6">Neste Steg</h3>
        
        <div class="grid gap-4 md:grid-cols-3">
          <div class="glass-sm rounded-lg p-4">
            <h4 class="font-semibold text-text-primary mb-2">📊 Graf-visualisering</h4>
            <p class="text-sm text-text-secondary">
              Canvas eller SVG-basert visualisering av konsept-relasjoner
            </p>
          </div>
          
          <div class="glass-sm rounded-lg p-4">
            <h4 class="font-semibold text-text-primary mb-2">🗂️ Collections</h4>
            <p class="text-sm text-text-secondary">
              Organisering av konsepter i samlinger og læringsveier
            </p>
          </div>
          
          <div class="glass-sm rounded-lg p-4">
            <h4 class="font-semibold text-text-primary mb-2">📝 Markdown Content</h4>
            <p class="text-sm text-text-secondary">
              Opprette faktiske konsept-filer med matematisk innhold
            </p>
          </div>
        </div>
      </div>
      
      <!-- Quick Links -->
      <div class="mt-8 flex gap-4 justify-center">
        <a href="/demo" class="px-6 py-3 rounded-lg bg-accent text-white hover:bg-accent-hover transition-colors">
          Se Component Demo
        </a>
        <a href="https://github.com/Nokken/moduli" class="px-6 py-3 rounded-lg glass-sm hover:bg-white/10 transition-glass">
          GitHub Repository
        </a>
      </div>
    </main>
  </div>
</div>