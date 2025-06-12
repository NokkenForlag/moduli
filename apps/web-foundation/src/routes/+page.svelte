<script lang="ts">
  import { onMount } from 'svelte';
  import { testFoundation, applyTheme, themes } from '@moduli/core';
  import GradientBackground from '$lib/components/GradientBackground.svelte';
  import ConceptCard from '$lib/components/ConceptCard.svelte';
  
  let currentTheme = 'dark';
  let testResult = '';
  let foundationReady = false;
  
  onMount(async () => {
    applyTheme(currentTheme);
    await testFoundation();
    testResult = '✅ Foundation is working!';
    foundationReady = true;
  });
  
  function switchTheme(theme: string) {
    currentTheme = theme;
    applyTheme(theme);
  }
  
  // Foundation status som "konsepter"
  const foundationModules = [
    {
      id: 'theme-system',
      title: 'Theme System',
      description: 'Fire temaer med CSS-variabler og live switching. Glass morphism effekter fungerer på tvers av alle komponenter.',
      tags: ['css', 'themes', 'ui'],
      difficulty: 1,
      relations: [
        { to: 'glass-morphism', type: 'related-to' },
        { to: 'css-variables', type: 'part-of' }
      ]
    },
    {
      id: 'graph-system',
      title: 'Graf System',
      description: 'Datastruktur for nodes og edges med topologisk sortering. Klar for visualisering og traversering.',
      tags: ['graph', 'data', 'algoritmer'],
      difficulty: 3,
      relations: [
        { to: 'concept-relations', type: 'leads-to' },
        { to: 'visualization', type: 'prerequisite-for' }
      ]
    },
    {
      id: 'content-system',
      title: 'Content System',
      description: 'Markdown loader med YAML frontmatter. Server-side parsing for optimal ytelse.',
      tags: ['markdown', 'content', 'yaml'],
      difficulty: 2,
      relations: [
        { to: 'concept-loader', type: 'part-of' },
        { to: 'server-rendering', type: 'related-to' }
      ]
    },
    {
      id: 'ui-components',
      title: 'UI Components',
      description: 'Modulære Svelte-komponenter med glass morphism. ConceptCard implementert og klar.',
      tags: ['svelte', 'components', 'ui'],
      difficulty: 2,
      relations: [
        { to: 'conceptcard', type: 'part-of' },
        { to: 'sidebar-nav', type: 'leads-to' }
      ]
    }
  ];
</script>

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