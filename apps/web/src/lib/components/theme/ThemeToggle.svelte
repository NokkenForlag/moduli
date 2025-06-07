<script lang="ts">
  import { theme } from '$lib/stores/theme';
  
  function handleToggle() {
    theme.toggle();
  }
</script>

<button 
  class="theme-toggle icon-btn" 
  on:click={handleToggle}
  aria-label="Bytt tema"
  title="Bytt mellom lyst og mørkt tema"
>
  <!-- Sol ikon -->
  <svg class="theme-icon sun" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <circle cx="12" cy="12" r="5"></circle>
    <line x1="12" y1="1" x2="12" y2="3"></line>
    <line x1="12" y1="21" x2="12" y2="23"></line>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
    <line x1="1" y1="12" x2="3" y2="12"></line>
    <line x1="21" y1="12" x2="23" y2="12"></line>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
  </svg>
  
  <!-- Måne ikon -->
  <svg class="theme-icon moon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
  </svg>
</button>

<style>
  .theme-toggle {
    position: relative;
  }
  
  .icon-btn {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: var(--radius-full);
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    color: var(--color-text-secondary);
    cursor: pointer;
    transition: all var(--transition-fast);
  }
  
  .icon-btn:hover {
    background: var(--color-surface-hover);
    color: var(--color-text);
  }
  
  .theme-icon {
    position: absolute;
    transition: transform var(--transition-base), opacity var(--transition-base);
  }
  
  /* Light theme shows sun, hides moon */
  :global([data-theme="light"]) .theme-icon.moon {
    transform: scale(0);
    opacity: 0;
  }
  
  :global([data-theme="light"]) .theme-icon.sun {
    transform: scale(1);
    opacity: 1;
  }
  
  /* Dark theme shows moon, hides sun */
  :global([data-theme="dark"]) .theme-icon.sun {
    transform: scale(0);
    opacity: 0;
  }
  
  :global([data-theme="dark"]) .theme-icon.moon {
    transform: scale(1);
    opacity: 1;
  }
  
  /* Reduced motion */
  @media (prefers-reduced-motion: reduce) {
    .theme-icon {
      transition: none;
    }
  }
</style>