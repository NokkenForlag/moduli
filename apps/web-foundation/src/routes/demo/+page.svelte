<script lang="ts">
  import { onMount } from 'svelte';
  import { applyTheme, themes } from '@moduli/core';
  import type { ConceptMeta } from '@moduli/core';
  import GradientBackground from '$lib/components/GradientBackground.svelte';
  import ConceptCard from '$lib/components/ConceptCard.svelte';
  
  let currentTheme = 'dark';
  
  onMount(() => {
    applyTheme(currentTheme);
  });
  
  function switchTheme(theme: string) {
    currentTheme = theme;
    applyTheme(theme);
  }
  
  // Test konsepter
  const testConcepts: Partial<ConceptMeta>[] = [
    {
      id: 'r1-grenseverdi',
      title: 'Grenseverdi',
      description: 'Grenseverdier er fundamentale i kalkulus og beskriver hva som skjer med en funksjon når vi nærmer oss et bestemt punkt.',
      tags: ['grenser', 'funksjoner', 'kalkulus'],
      difficulty: 3,
      relations: [
        { to: 'r1-kontinuitet', type: 'prerequisite-for' },
        { to: 'r1-derivasjon', type: 'prerequisite-for' },
        { to: 'r1-ubestemte-former', type: 'related-to' }
      ]
    },
    {
      id: 'r1-derivasjon',
      title: 'Derivasjon',
      description: 'Den deriverte av en funksjon beskriver momentan endringshastighet og er grunnleggende for analyse av funksjoner.',
      tags: ['derivasjon', 'analyse', 'kalkulus'],
      difficulty: 4,
      relations: [
        { to: 'r1-kjerneregelen', type: 'leads-to' },
        { to: 'r1-produktregelen', type: 'leads-to' },
        { to: 'r1-optimering', type: 'prerequisite-for' }
      ]
    },
    {
      id: 'r1-kontinuitet',
      title: 'Kontinuitet',
      description: 'En funksjon er kontinuerlig hvis den ikke har brudd eller hopp. Dette er en forutsetning for mange viktige teoremer.',
      tags: ['kontinuitet', 'funksjoner'],
      difficulty: 2,
      relations: [
        { to: 'r1-grenseverdi', type: 'related-to' },
        { to: 'r1-skjæringssetningen', type: 'prerequisite-for' }
      ]
    },
    {
      id: 'r1-integral',
      title: 'Integrasjon',
      description: 'Integrasjon er den inverse operasjonen til derivasjon og brukes til å finne arealer under kurver.',
      tags: ['integral', 'areal', 'antideriverte'],
      difficulty: 5,
      relations: [
        { to: 'r1-derivasjon', type: 'related-to' },
        { to: 'r1-areal-under-kurve', type: 'leads-to' },
        { to: 'r1-volum-rotasjon', type: 'leads-to' },
        { to: 'r1-substitusjon', type: 'part-of' },
        { to: 'r1-delvis-integrasjon', type: 'part-of' }
      ]
    },
    {
      id: 'r1-komplekse-tall',
      title: 'Komplekse tall',
      description: 'Tall på formen a + bi hvor i² = -1. Utvider tallsystemet og har viktige anvendelser.',
      tags: ['komplekse tall', 'algebra'],
      difficulty: 1
    }
  ];
  
  function handleCardClick(concept: Partial<ConceptMeta>) {
    console.log('Clicked:', concept.id);
    // Her kan du navigere til konseptet
    // goto(`/konsept/${concept.id}`);
  }
</script>

<div class="min-h-screen text-text-primary">
  <GradientBackground />
  
  <div class="relative z-content">
    <!-- Header -->
    <header class="glass-md border-b border-white/10 px-6 py-4 sticky top-0 z-topnav">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold">ConceptCard Demo</h1>
          <p class="text-sm text-text-muted">Vis konsepter med ulike egenskaper</p>
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
    
    <!-- Content -->
    <main class="container mx-auto px-6 py-12">
      <!-- Grid layout for cards -->
      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {#each testConcepts as concept}
          <ConceptCard 
            {concept} 
            onClick={() => handleCardClick(concept)}
          />
        {/each}
      </div>
      
      <!-- Single card showcase -->
      <div class="mt-12">
        <h2 class="text-2xl font-bold mb-6">Fokusert visning</h2>
        <div class="max-w-md">
          <ConceptCard 
            concept={testConcepts[0]}
            href="/konsept/r1-grenseverdi"
          />
        </div>
      </div>
      
      <!-- Empty state -->
      <div class="mt-12">
        <h2 class="text-2xl font-bold mb-6">Tom tilstand</h2>
        <div class="max-w-md">
          <ConceptCard concept={{}} />
        </div>
      </div>
    </main>
  </div>
</div>