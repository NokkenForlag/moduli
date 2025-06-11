<script lang="ts">
  // Dummy data
  const categories = [
    { icon: '📐', title: 'Geometri', count: 42, href: '/oppslagsverk/geometri' },
    { icon: '🔢', title: 'Algebra', count: 38, href: '/oppslagsverk/algebra' },
    { icon: '📊', title: 'Statistikk', count: 27, href: '/oppslagsverk/statistikk' },
    { icon: '📏', title: 'Trigonometri', count: 19, href: '/oppslagsverk/trigonometri' },
    { icon: '∫', title: 'Kalkulus', count: 31, href: '/oppslagsverk/kalkulus' },
    { icon: '🎲', title: 'Sannsynlighet', count: 22, href: '/oppslagsverk/sannsynlighet' }
  ];
</script>

<div class="oppslagsverk">
  <header class="page-header">
    <h1>📚 Oppslagsverk</h1>
    <p class="lead">
      Utforsk matematiske konsepter organisert etter tema. 
      Hvert konsept inneholder forklaringer, eksempler og interaktive oppgaver.
    </p>
  </header>
  
  <section class="search-section">
    <div class="search-wrapper">
      <input 
        type="search" 
        placeholder="Søk etter konsepter..." 
        class="search-input"
      />
      <button class="search-button">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.35-4.35"></path>
        </svg>
      </button>
    </div>
  </section>
  
  <section class="categories">
    <h2>Kategorier</h2>
    <div class="category-grid">
      {#each categories as category}
        <a href={category.href} class="category-card">
          <span class="category-icon">{category.icon}</span>
          <h3>{category.title}</h3>
          <p class="category-count">{category.count} konsepter</p>
        </a>
      {/each}
    </div>
  </section>
  
  <section class="recent-section">
    <h2>Nylig besøkte</h2>
    <p class="empty-state">
      Du har ikke besøkt noen konsepter ennå. Start med å utforske en kategori ovenfor!
    </p>
  </section>
</div>

<style>
  .oppslagsverk {
    max-width: 100%;
  }
  
  .page-header {
    margin-bottom: var(--space-2xl);
  }
  
  h1 {
    font-size: var(--font-size-3xl);
    margin-bottom: var(--space-md);
  }
  
  .lead {
    font-size: var(--font-size-lg);
    color: var(--color-text-secondary);
    max-width: 60ch;
  }
  
  .search-section {
    margin-bottom: var(--space-2xl);
  }
  
  .search-wrapper {
    display: flex;
    max-width: 600px;
    background: var(--color-surface-elevated);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    overflow: hidden;
    transition: all var(--transition-fast);
  }
  
  .search-wrapper:focus-within {
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px var(--color-primary-soft);
  }
  
  .search-input {
    flex: 1;
    padding: var(--space-md) var(--space-lg);
    border: none;
    background: transparent;
    font-size: var(--font-size-base);
    font-family: inherit;
    color: var(--color-text);
  }
  
  .search-input::placeholder {
    color: var(--color-text-tertiary);
  }
  
  .search-button {
    padding: 0 var(--space-lg);
    background: transparent;
    border: none;
    color: var(--color-text-secondary);
    cursor: pointer;
    transition: color var(--transition-fast);
  }
  
  .search-button:hover {
    color: var(--color-primary);
  }
  
  .categories {
    margin-bottom: var(--space-2xl);
  }
  
  h2 {
    font-size: var(--font-size-xl);
    margin-bottom: var(--space-lg);
  }
  
  .category-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: var(--space-lg);
  }
  
  .category-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: var(--space-xl);
    background: var(--color-surface-elevated);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    text-decoration: none;
    color: var(--color-text);
    text-align: center;
    transition: all var(--transition-fast);
  }
  
  .category-card:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
    border-color: var(--color-primary);
  }
  
  .category-icon {
    font-size: 3rem;
    margin-bottom: var(--space-md);
  }
  
  .category-card h3 {
    font-size: var(--font-size-lg);
    margin-bottom: var(--space-xs);
  }
  
  .category-count {
    color: var(--color-text-secondary);
    font-size: var(--font-size-sm);
  }
  
  .empty-state {
    padding: var(--space-2xl);
    text-align: center;
    color: var(--color-text-tertiary);
    background: var(--color-surface-secondary);
    border-radius: var(--radius-lg);
  }
  
  @media (max-width: 768px) {
    .category-grid {
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    }
    
    .category-card {
      padding: var(--space-lg);
    }
    
    .category-icon {
      font-size: 2rem;
    }
  }
</style>