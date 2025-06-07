<script lang="ts">
  import { navigationState } from '$lib/stores/navigation';
  import type { Breadcrumb } from '$lib/stores/navigation';
  
  $: breadcrumbs = $navigationState.breadcrumbs;
  
  let bookmarked = false;
  
  function toggleBookmark() {
    bookmarked = !bookmarked;
    // TODO: Implement bookmark persistence
  }
</script>

{#if breadcrumbs.length > 0}
  <header class="content-header">
    <nav class="breadcrumbs" aria-label="Brødsmulesti">
      {#each breadcrumbs as crumb, i}
        {#if i > 0}
          <span class="breadcrumb-separator" aria-hidden="true">›</span>
        {/if}
        
        {#if crumb.href && i < breadcrumbs.length - 1}
          <a href={crumb.href} class="breadcrumb-link">
            {#if crumb.icon}<span class="breadcrumb-icon">{crumb.icon}</span>{/if}
            {crumb.label}
          </a>
        {:else}
          <span class="breadcrumb-current" aria-current="page">
            {#if crumb.icon}<span class="breadcrumb-icon">{crumb.icon}</span>{/if}
            {crumb.label}
          </span>
        {/if}
      {/each}
    </nav>
    
    <div class="header-actions">
      <button 
        class="bookmark-btn"
        class:bookmarked
        on:click={toggleBookmark}
        aria-label={bookmarked ? 'Fjern bokmerke' : 'Legg til bokmerke'}
        title={bookmarked ? 'Fjern bokmerke' : 'Legg til bokmerke'}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill={bookmarked ? 'currentColor' : 'none'} stroke="currentColor" stroke-width="2">
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
        </svg>
      </button>
    </div>
  </header>
{/if}

<style>
  .content-header {
    height: var(--content-header-height);
    padding: 0 var(--space-lg);
    border-bottom: 1px solid var(--color-border);
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: var(--color-surface);
    position: sticky;
    top: var(--nav-top-height);
    z-index: var(--z-raised);
  }
  
  .breadcrumbs {
    display: flex;
    align-items: center;
    gap: var(--space-xs);
    font-size: var(--font-size-sm);
    color: var(--color-text-secondary);
    overflow: hidden;
    flex: 1;
  }
  
  .breadcrumb-separator {
    opacity: 0.5;
    flex-shrink: 0;
  }
  
  .breadcrumb-link {
    color: inherit;
    text-decoration: none;
    transition: color var(--transition-fast);
    display: flex;
    align-items: center;
    gap: var(--space-xs);
    white-space: nowrap;
    min-width: 0;
  }
  
  .breadcrumb-link:hover {
    color: var(--color-primary);
  }
  
  .breadcrumb-current {
    color: var(--color-text);
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: var(--space-xs);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .breadcrumb-icon {
    flex-shrink: 0;
  }
  
  .header-actions {
    display: flex;
    align-items: center;
    gap: var(--space-md);
    margin-left: var(--space-lg);
  }
  
  .bookmark-btn {
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
  
  .bookmark-btn:hover {
    background: var(--color-surface-hover);
    color: var(--color-text);
  }
  
  .bookmark-btn.bookmarked {
    color: var(--color-warning);
  }
  
  /* Mobile responsiveness */
  @media (max-width: 768px) {
    .content-header {
      padding: 0 var(--space-md);
    }
    
    .breadcrumbs {
      font-size: var(--font-size-xs);
    }
    
    /* Hide intermediate breadcrumbs on mobile, show only first and last */
    @media (max-width: 480px) {
      .breadcrumb-link:not(:first-child),
      .breadcrumb-separator:not(:last-of-type) {
        display: none;
      }
      
      .breadcrumb-separator:last-of-type {
        display: flex;
      }
    }
  }
</style>