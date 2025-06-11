<!-- apps/web/src/routes/+page.svelte -->
<script lang="ts">
  import { MainLayout, TopNav, Button, Input, Toast, ThemeToggle } from '@moduli/ui';

  let showToast = false;
  let inputValue = '';

  function handleShowToast() {
    showToast = true;
  }
</script>

<MainLayout>
  <TopNav slot="header" />

  <div class="space-y-8">
    <!-- Hero Section -->
    <section class="text-center py-12">
      <h1 class="text-5xl font-bold text-text mb-4">Velkommen til Moduli</h1>
      <p class="text-xl text-textSecondary max-w-2xl mx-auto">
        En moderne matematisk læringsplattform bygget med Svelte og Tailwind CSS
      </p>
    </section>

    <!-- Theme Demo -->
    <section class="glass p-8 rounded-xl">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl font-semibold text-text">Theme System</h2>
        <ThemeToggle />
      </div>
      <p class="text-textSecondary">
        Prøv å bytte tema med knappen til høyre. Vi støtter dark, light, cosmic og ocean themes.
      </p>
    </section>

    <!-- Component Examples -->
    <section class="space-y-6">
      <h2 class="text-2xl font-semibold text-text mb-4">UI Komponenter</h2>

      <!-- Buttons -->
      <div class="glass p-6 rounded-xl space-y-4">
        <h3 class="text-lg font-medium text-text mb-3">Buttons</h3>
        <div class="flex flex-wrap gap-3">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
        </div>
        <div class="flex flex-wrap gap-3">
          <Button size="small">Small</Button>
          <Button size="medium">Medium</Button>
          <Button size="large">Large</Button>
        </div>
        <div class="flex flex-wrap gap-3">
          <Button loading>Loading</Button>
          <Button disabled>Disabled</Button>
        </div>
      </div>

      <!-- Input -->
      <div class="glass p-6 rounded-xl space-y-4">
        <h3 class="text-lg font-medium text-text mb-3">Form Elements</h3>
        <div class="max-w-md space-y-4">
          <Input label="Navn" placeholder="Skriv inn navnet ditt" bind:value={inputValue} />
          <Input
            label="E-post"
            type="email"
            placeholder="din@epost.no"
            helperText="Vi deler aldri e-posten din"
          />
          <Input
            label="Passord"
            type="password"
            placeholder="••••••••"
            error
            helperText="Passordet må være minst 8 tegn"
          />
        </div>
      </div>

      <!-- Toast -->
      <div class="glass p-6 rounded-xl">
        <h3 class="text-lg font-medium text-text mb-3">Toast Notifications</h3>
        <div class="flex gap-3">
          <Button on:click={handleShowToast}>Show Toast</Button>
          <Button variant="secondary" on:click={() => (showToast = false)}>Hide Toast</Button>
        </div>
      </div>
    </section>
  </div>
</MainLayout>

{#if showToast}
  <Toast type="success" message="Dette er en suksessmelding!" onClose={() => (showToast = false)} />
{/if}

<style>
  /* Page-specific styles if needed */
  :global(.space-y-8 > * + *) {
    margin-top: 2rem;
  }

  :global(.space-y-6 > * + *) {
    margin-top: 1.5rem;
  }

  :global(.space-y-4 > * + *) {
    margin-top: 1rem;
  }
</style>
