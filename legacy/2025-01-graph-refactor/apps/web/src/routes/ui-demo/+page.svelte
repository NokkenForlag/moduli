<script lang="ts">
  // Import components when they exist
  // import { Button, Loading } from '@moduli/ui';

  let loading = false;
</script>

<div class="container">
  <h1>UI Component Demo</h1>

  <section>
    <h2>Buttons</h2>
    <div class="demo-row">
      <button class="btn btn-primary">Primary Button</button>
      <button class="btn btn-secondary">Secondary Button</button>
      <button class="btn" disabled>Disabled Button</button>
    </div>
  </section>

  <section>
    <h2>Loading States</h2>
    <div class="demo-row">
      <button class="btn btn-primary" on:click={() => (loading = !loading)}>
        Toggle Loading
      </button>
      {#if loading}
        <div class="spinner"></div>
      {/if}
    </div>
  </section>

  <section>
    <h2>Cards</h2>
    <div class="demo-row">
      <div class="card">
        <h3>Card Title</h3>
        <p>This is a card component example.</p>
      </div>
    </div>
  </section>
</div>

<style>
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
  }

  section {
    margin-bottom: 3rem;
  }

  h2 {
    margin-bottom: 1rem;
  }

  .demo-row {
    display: flex;
    gap: 1rem;
    align-items: center;
  }

  .btn-secondary {
    background: transparent;
    color: var(--color-primary);
    border: 1px solid var(--color-primary);
  }

  .btn-secondary:hover {
    background: var(--color-primary);
    color: white;
  }

  .btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
</style>
