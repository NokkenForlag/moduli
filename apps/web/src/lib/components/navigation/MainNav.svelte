<script lang="ts">
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { navigationState } from '$lib/stores/navigation';
  import ThemeToggle from '../theme/ThemeToggle.svelte';
  
  // Reactive statements for active tab
  $: isOppslagsverk = $page.url.pathname.startsWith('/oppslagsverk');
  $: isUtforskning = $page.url.pathname.startsWith('/utforskning');
  
  function handleMobileMenuToggle() {
    navigationState.toggleMobileMenu();
  }
  
  function navigateTo(path: string) {
    goto(path);
    navigationState.closeMobileMenu();
  }
</script>

<nav class="main-nav">
  <!-- Mobile menu toggle -->
  <button 
    class="icon-btn mobile-menu-toggle" 
    on:click={handleMobileMenuToggle}
    aria-label="Åpne meny"
    aria-expanded={$navigationState.mobileMenuOpen}
  >
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <line x1="3" y1="12" x2="21" y2="12"></line>
      <line x1="3" y1="6" x2="21" y2="6"></line>
      <line x1="3" y1="18" x2="21" y2="18"></line>
    </svg>
  </button>
  
  <!-- Brand -->
  <div class="nav-brand">
    <a href="/" on:click|preventDefault={() => navigateTo('/')}>
      📐 Moduli
    </a>
  </div>
  
  <!-- Navigation tabs -->
  <div class="nav-tabs">
    <button 
      class="nav-tab"
      class:active={isOppslagsverk}
      on:click={() => navigateTo('/oppslagsverk')}
    >
      <span class="tab-icon">📚</span>
      <span class="tab-label">Oppslagsverk</span>
    </button>
    
    <button 
      class="nav-tab"
      class:active={isUtforskning}
      on:click={() => navigateTo('/utforskning')}
    >
      <span class="tab-icon">🔍</span>
      <span class="tab-label">Utforskning</span>
    </button>
  </div>
  
  <!-- Actions -->
  <div class="nav-actions">
    <ThemeToggle />
    
    <button class="icon-btn" aria-label="Innstillinger">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="3"></circle>
        <path d="M12 1v6m0 6v6m11-11h-6m-6 0H1"></path>
      </svg>
    </button>
    
    <button class="user-avatar" aria-label="Brukermeny">
      <span class="avatar-initial">B</span>
    </button>
  </div>
</nav>

<style>
  .main-nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: var(--nav-top-height);
    background: var(--color-surface-elevated);
    border-bottom: 1px solid var(--color-border);
    display: flex;
    align-items: center;
    padding: 0 var(--space-lg);
    z-index: var(--z-fixed);
    backdrop-filter: blur(8px);
  }
  
  .mobile-menu-toggle {
    display: none;
    margin-right: var(--space-md);
  }
  
  @media (max-width: 768px) {
    .mobile-menu-toggle {
      display: flex;
      width: 2.5rem;
      height: 2.5rem;
      border-radius: var(--radius-full);
      align-items: center;
      justify-content: center;
      background: transparent;
      border: none;
      color: var(--color-text-secondary);
      cursor: pointer;
      transition: all var(--transition-fast);
    }
    
    .mobile-menu-toggle:hover {
      background: var(--color-surface-hover);
      color: var(--color-text);
    }
  }
  
  .nav-brand {
    display: flex;
    align-items: center;
    margin-right: var(--space-xl);
  }
  
  .nav-brand a {
    font-weight: 600;
    font-size: var(--font-size-lg);
    color: var(--color-text);
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: var(--space-xs);
  }
  
  .nav-tabs {
    display: flex;
    gap: var(--space-xs);
    flex: 1;
  }
  
  .nav-tab {
    display: flex;
    align-items: center;
    gap: var(--space-xs);
    padding: var(--space-sm) var(--space-md);
    border-radius: var(--radius-md);
    background: transparent;
    border: none;
    color: var(--color-text-secondary);
    font-weight: 500;
    font-size: var(--font-size-base);
    font-family: inherit;
    cursor: pointer;
    transition: all var(--transition-fast);
  }
  
  .nav-tab:hover {
    background: var(--color-surface-hover);
    color: var(--color-text);
  }
  
  .nav-tab.active {
    background: var(--color-primary-soft);
    color: var(--color-primary);
  }
  
  .tab-icon {
    font-size: 1.25rem;
  }
  
  .nav-actions {
    display: flex;
    align-items: center;
    gap: var(--space-md);
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
  
  .user-avatar {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: var(--radius-full);
    background: var(--color-primary);
    color: white;
    border: 2px solid var(--color-border);
    cursor: pointer;
    transition: all var(--transition-fast);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
  }
  
  .user-avatar:hover {
    border-color: var(--color-primary);
    transform: scale(1.05);
  }
  
  /* Mobile responsiveness */
  @media (max-width: 768px) {
    .mobile-menu-toggle {
      display: flex;
    }
    
    .nav-tabs {
      display: none;
    }
    
    .nav-brand {
      margin-right: auto;
    }
  }
  
  /* Desktop - hide hamburger menu */
  @media (min-width: 769px) {
    .mobile-menu-toggle {
      display: none !important;
    }
  }
  
  @media (max-width: 480px) {
    .main-nav {
      padding: 0 var(--space-md);
    }
    
    .tab-label {
      display: none;
    }
  }
</style>