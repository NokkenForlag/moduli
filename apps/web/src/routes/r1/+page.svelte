<script lang="ts">
  import type { PageData } from './$types';
  
  export let data: PageData;
  
  // Temporary mock data
  const concepts = [
    {
      id: 'r1-grenseverdi-funksjon',
      title: 'Grenseverdi for funksjoner',
      description: 'Lær om grenseverdier og hvordan de brukes i kalkulus',
      tags: ['grenser', 'funksjoner', 'kalkulus'],
      difficulty: 'medium'
    },
    {
      id: 'r1-derivasjon-definisjon',
      title: 'Derivasjon - definisjon',
      description: 'Forstå den formelle definisjonen av derivasjon',
      tags: ['derivasjon', 'kalkulus'],
      difficulty: 'hard'
    },
    {
      id: 'r1-differenskvotient',
      title: 'Differenskvotient',
      description: 'Grunnleggende konsept for å forstå derivasjon',
      tags: ['derivasjon', 'rate of change'],
      difficulty: 'medium'
    }
  ];
</script>

<div class="container">
  <header class="page-header">
    <h1>R1 Matematikk</h1>
    <p>Grunnleggende matematikk for videregående</p>
  </header>
  
  <div class="concepts-grid">
    {#each concepts as concept}
      <a href="/r1/konsept/{concept.id}" class="concept-card">
        <h3>{concept.title}</h3>
        <p>{concept.description}</p>
        <div class="tags">
          {#each concept.tags as tag}
            <span class="tag">{tag}</span>
          {/each}
        </div>
        <span class="difficulty difficulty-{concept.difficulty}">
          {concept.difficulty}
        </span>
      </a>
    {/each}
  </div>
</div>

<style>
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
  }
  
  .page-header {
    margin-bottom: 3rem;
  }
  
  .page-header h1 {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }
  
  .page-header p {
    font-size: 1.25rem;
    color: var(--color-text-secondary);
  }
  
  .concepts-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
  }
  
  .concept-card {
    display: block;
    padding: 1.5rem;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: 0.5rem;
    text-decoration: none;
    color: inherit;
    transition: all 0.2s;
  }
  
  .concept-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  .concept-card h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
  
  .concept-card p {
    color: var(--color-text-secondary);
    margin-bottom: 1rem;
  }
  
  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }
  
  .tag {
    font-size: 0.75rem;
    padding: 0.25rem 0.5rem;
    background: #e5e5e5;
    border-radius: 0.25rem;
  }
  
  .difficulty {
    font-size: 0.75rem;
    text-transform: uppercase;
    font-weight: 600;
  }
  
  .difficulty-easy { color: #10b981; }
  .difficulty-medium { color: #f59e0b; }
  .difficulty-hard { color: #ef4444; }
</style>
