<script lang="ts">
  import type { PageData } from './$types';
  export let data: PageData;

  const concept = data.concept || {
    id: 'unknown',
    title: 'Konsept ikke funnet',
    content: 'Innhold mangler'
  };
</script>

<div class="container">
  <nav class="breadcrumbs">
    <a href="/">Hjem</a> /
    <a href="/r1">R1 Matematikk</a> /
    <span>{concept.title}</span>
  </nav>

  <article>
    <h1>{concept.title}</h1>
    <div class="content">
      {@html concept.content}
    </div>
  </article>
</div>

<style>
  .container {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
  }

  .breadcrumbs {
    margin-bottom: 2rem;
    color: var(--color-text-secondary);
  }

  .breadcrumbs a {
    color: var(--color-primary);
    text-decoration: none;
  }

  .breadcrumbs a:hover {
    text-decoration: underline;
  }

  article h1 {
    font-size: 2.5rem;
    margin-bottom: 2rem;
  }

  .content {
    line-height: 1.6;
  }
</style>
