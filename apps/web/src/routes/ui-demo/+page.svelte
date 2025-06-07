<script lang="ts">
  import { onMount } from 'svelte';
  import { theme } from '$lib/stores/theme';
  import { navigationState } from '$lib/stores/navigation';
  
  // Demo data
  const components = [
    {
      title: '🎨 Tema-system',
      description: 'Støtter lyse og mørke temaer med OKLCH-farger for optimal kontrast og smooth overganger. Temporære temaer for spesielle hendelser.'
    },
    {
      title: '📱 Responsiv navigasjon',
      description: 'Adaptiv layout som fungerer på alle skjermstørrelser. Kollapsbar sidemeny og mobile-first design.'
    },
    {
      title: '🔄 State management',
      description: 'Persistent lagring av brukerpreferanser. Automatisk synkronisering mellom faner og vinduer.'
    }
  ];
  
  const nextSteps = [
    {
      title: 'Konseptvisning',
      description: 'Implementer visning av matematiske konsepter med støtte for LaTeX, interaktive eksempler og differensiering.'
    },
    {
      title: 'Graf-navigasjon',
      description: 'Visuell navigering i kunnskapsgrafen med Rive-animasjoner og dynamiske læringsveier.'
    },
    {
      title: 'Oppgavebibliotek',
      description: 'Interaktive oppgaver med sanntidsvalidering, hints og progressiv veiledning.'
    }
  ];
  
  // Demo: temporal theme
  function activateExamTheme() {
    theme.setTemporal('exam-week', 1, 'Testing eksamensmodus');
    alert('Eksamensmodus aktivert for 1 time!');
  }
  
  function clearTemporalTheme() {
    theme.clearTemporal();
  }
  
  onMount(() => {
    // Set breadcrumbs is already handled by layout
  });
</script>

<div class="demo-page">
  <section class="demo-section">
    <h1>Moduli UI Demo</h1>
    <p class="lead">
      Interaktiv demonstrasjon av komponentbiblioteket og responsive designmønstre.
    </p>
  </section>
  
  <section class="demo-section">
    <h2>📦 Komponenter</h2>
    <div class="demo-grid">
      {#each components as component}
        <article class="demo-card">
          <h3>{component.title}</h3>
          <p>{component.description}</p>
        </article>
      {/each}
    </div>
  </section>
  
  <section class="demo-section">
    <h2>🎯 Tema-testing</h2>
    <div class="theme-controls">
      <button class="btn btn-primary" on:click={() => theme.toggle()}>
        Bytt mellom lyst/mørkt tema
      </button>
      <button class="btn btn-secondary" on:click={activateExamTheme}>
        Aktiver eksamensmodus (temporal)
      </button>
      <button class="btn btn-tertiary" on:click={clearTemporalTheme}>
        Fjern temporært tema
      </button>
    </div>
  </section>
  
  <section class="demo-section">
    <h2>🧪 Test responsivitet</h2>
    <p>Dra i nettleservinduet for å teste responsive breakpoints:</p>
    <ul class="breakpoint-list">
      <li>📱 <strong>Mobil:</strong> &lt; 768px - Skjult sidemeny, hamburgermeny</li>
      <li>💻 <strong>Tablet:</strong> 768px - 1024px - Kollapsbar sidemeny</li>
      <li>🖥️ <strong>Desktop:</strong> &gt; 1024px - Full navigasjon synlig</li>
    </ul>
  </section>
  
  <section class="demo-section">
    <h2>🚀 Neste steg</h2>
    <div class="demo-grid">
      {#each nextSteps as step}
        <article class="demo-card">
          <h3>{step.title}</h3>
          <p>{step.description}</p>
        </article>
      {/each}
    </div>
  </section>
</div>

<style>
  .demo-page {
    max-width: 100%;
  }
  
  .demo-section {
    margin-bottom: var(--space-2xl);
  }
  
  h1 {
    font-size: var(--font-size-3xl);
    margin-bottom: var(--space-md);
    color: var(--color-text);
  }
  
  h2 {
    font-size: var(--font-size-2xl);
    margin-bottom: var(--space-lg);
    color: var(--color-text);
  }
  
  h3 {
    font-size: var(--font-size-lg);
    margin-bottom: var(--space-sm);
    color: var(--color-text);
  }
  
  .lead {
    font-size: var(--font-size-lg);
    color: var(--color-text-secondary);
    line-height: var(--line-height-base);
  }
  
  .demo-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: var(--space-lg);
    margin-top: var(--space-lg);
  }
  
  .demo-card {
    background: var(--color-surface-elevated);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: var(--space-lg);
    box-shadow: var(--shadow-sm);
    transition: all var(--transition-fast);
  }
  
  .demo-card:hover {
    box-shadow: var(--shadow-md);
    transform: translateY(-2px);
  }
  
  .demo-card p {
    color: var(--color-text-secondary);
    line-height: var(--line-height-base);
  }
  
  .theme-controls {
    display: flex;
    gap: var(--space-md);
    flex-wrap: wrap;
    margin-top: var(--space-md);
  }
  
  .btn {
    padding: var(--space-sm) var(--space-lg);
    border-radius: var(--radius-md);
    border: none;
    font-size: var(--font-size-base);
    font-weight: 500;
    cursor: pointer;
    transition: all var(--transition-fast);
    font-family: inherit;
  }
  
  .btn-primary {
    background: var(--color-primary);
    color: white;
  }
  
  .btn-primary:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }
  
  .btn-secondary {
    background: var(--color-surface-elevated);
    color: var(--color-text);
    border: 1px solid var(--color-border);
  }
  
  .btn-secondary:hover {
    background: var(--color-surface-hover);
  }
  
  .btn-tertiary {
    background: transparent;
    color: var(--color-text-secondary);
    text-decoration: underline;
  }
  
  .btn-tertiary:hover {
    color: var(--color-text);
  }
  
  .breakpoint-list {
    list-style: none;
    padding: 0;
    margin-top: var(--space-md);
  }
  
  .breakpoint-list li {
    margin-bottom: var(--space-sm);
    padding-left: var(--space-lg);
    position: relative;
  }
  
  .breakpoint-list li::before {
    content: attr(data-icon);
    position: absolute;
    left: 0;
  }
  
  @media (max-width: 768px) {
    .demo-grid {
      grid-template-columns: 1fr;
    }
    
    .theme-controls {
      flex-direction: column;
    }
    
    .btn {
      width: 100%;
    }
  }
</style>