<script lang="ts">
  import type { PageData } from './$types';
  export let data: PageData;

  // Mock concept data
  const concept = {
    id: data.id || 'unknown',
    title: 'Konsept Tittel',
    content: '# Konsept Innhold\n\nDette er et eksempel på konseptinnhold.',
    relatedConcepts: []
  };
</script>

<div class="container">
  <article class="concept">
    <h1>{concept.title}</h1>
    <div class="content">
      <p>Konsept ID: {concept.id}</p>
      <p>Innholdet kommer snart...</p>
    </div>
  </article>
</div>

<style>
  .container {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
  }

  .concept h1 {
    font-size: 2rem;
    margin-bottom: 2rem;
  }

  .content {
    line-height: 1.6;
  }
</style>
