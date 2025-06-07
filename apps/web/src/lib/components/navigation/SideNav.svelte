<script lang="ts">
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { navigationState } from '$lib/stores/navigation';
  import { slide, fade } from 'svelte/transition';
  
  interface MenuItem {
    icon: string;
    label: string;
    href: string;
    children?: MenuItem[];
  }
  
  const menuItems: MenuItem[] = [
    { icon: '📖', label: 'Alle konsepter', href: '/oppslagsverk' },
    { icon: '📐', label: 'Geometri', href: '/oppslagsverk/geometri' },
    { icon: '🔢', label: 'Algebra', href: '/oppslagsverk/algebra' },
    { icon: '📊', label: 'Statistikk', href: '/oppslagsverk/statistikk' },
    { icon: '🎯', label: 'Læreplanmål', href: '/laereplanmal' },
  ];
  
  $: collapsed = $navigationState.sideNavCollapsed;
  $: mobileOpen = $navigationState.mobileMenuOpen;
  
  function toggleCollapse() {
    navigationState.toggleSideNav();
  }
  
  function navigateTo(href: string) {
    goto(href);
    navigationState.closeMobileMenu();
  }
  
  function isActive(href: string): boolean {
    return $page.url.pathname === href || $page.url.pathname.startsWith(href + '/');
  }
  
  // Log for debugging
  console.log('SideNav mounted - collapsed:', collapsed, 'mobileOpen:', mobileOpen);
  
  // Handle escape key to close mobile menu
  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape' && mobileOpen) {
      navigationState.closeMobileMenu();
    }
  }
</script>

<svelte:window on:keydown={handleKeydown} />

<aside 
  class="side-nav"
  class:collapsed
  class:mobile-open={mobileOpen}
>
  <!-- Collapse toggle button (desktop only) -->
  <button 
    class="collapse-toggle"
    on:click={toggleCollapse}
    aria-label={collapsed ? 'Utvid meny' : 'Minimer meny'}
    title={collapsed ? 'Utvid meny' : 'Minimer meny'}
  >
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polyline points={collapsed ? '9 18 15 12 9 6' : '15 18 9 12 15 6'}></polyline>
    </svg>
  </button>
  
  <!-- Navigation content -->
  <nav class="nav-content">
    {#each menuItems as item}
      <button
        class="nav-item"
        class:active={isActive(item.href)}
        on:click={() => navigateTo(item.href)}
      >
        <span class="nav-icon">{item.icon}</span>
        {#if !collapsed}
          <span class="nav-label" transition:slide|local={{ duration: 200, axis: 'x' }}>
            {item.label}
          </span>
        {/if}
      </button>
    {/each}
  </nav>
  
  <!-- AI Status indicator -->
  <div class="nav-footer">
    <div class="ai-status">
      <span class="status-dot"></span>
      {#if !collapsed}
        <span transition:slide|local={{ duration: 200, axis: 'x' }}>
          AI-assistent aktiv
        </span>
      {/if}
    </div>
  </div>
</aside>

<!-- Mobile overlay -->
{#if mobileOpen}
  <button 
    class="mobile-overlay"
    on:click={() => navigationState.closeMobileMenu()}
    transition:fade={{ duration: 200 }}
    aria-label="Lukk meny"
    tabindex="0"
  >
    <span class="visually-hidden">Klikk for å lukke menyen</span>
  </button>
{/if}

<style>
  .side-nav {
    position: fixed;
    left: 0;
    top: 3.5rem; /* Fallback */
    top: var(--nav-top-height, 3.5rem);
    bottom: 0;
    width: 16rem; /* Fallback */
    width: var(--nav-side-width-open, 16rem);
    background: #f9fafb; /* Fallback */
    background: var(--color-surface-secondary, #f9fafb);
    border-right: 1px solid #e5e7eb; /* Fallback */
    border-right: 1px solid var(--color-border, #e5e7eb);
    display: flex;
    flex-direction: column;
    transition: width 250ms ease-out;
    transition: width var(--transition-base, 250ms ease-out);
    z-index: 20;
    z-index: var(--z-sticky, 20);
  }
  
  .side-nav.collapsed {
    width: 4rem; /* Fallback */
    width: var(--nav-side-width-closed, 4rem);
  }
  
  .collapse-toggle {
    position: absolute;
    right: -12px;
    top: 1.5rem; /* Fallback */
    top: var(--space-lg, 1.5rem);
    width: 24px;
    height: 24px;
    border-radius: 9999px; /* Fallback */
    border-radius: var(--radius-full, 9999px);
    background: white; /* Fallback */
    background: var(--color-surface-elevated, white);
    border: 1px solid #e5e7eb; /* Fallback */
    border: 1px solid var(--color-border, #e5e7eb);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 150ms ease-out;
    transition: all var(--transition-fast, 150ms ease-out);
    z-index: 1;
  }
  
  .collapse-toggle:hover {
    background: #eef2ff; /* Fallback */
    background: var(--color-primary-soft, #eef2ff);
    border-color: #4f46e5; /* Fallback */
    border-color: var(--color-primary, #4f46e5);
  }
  
  .nav-content {
    flex: 1;
    padding: 1rem; /* Fallback */
    padding: var(--space-md, 1rem);
    overflow-y: auto;
    overflow-x: hidden;
  }
  
  .nav-item {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 0.75rem; /* Fallback */
    gap: var(--space-sm, 0.75rem);
    padding: 0.75rem 1rem; /* Fallback */
    padding: var(--space-sm, 0.75rem) var(--space-md, 1rem);
    border-radius: 0.5rem; /* Fallback */
    border-radius: var(--radius-md, 0.5rem);
    background: transparent;
    border: none;
    color: #6b7280; /* Fallback */
    color: var(--color-text-secondary, #6b7280);
    font-size: 1rem; /* Fallback */
    font-size: var(--font-size-base, 1rem);
    font-family: inherit;
    text-align: left;
    cursor: pointer;
    transition: all 150ms ease-out;
    transition: all var(--transition-fast, 150ms ease-out);
    margin-bottom: 0.5rem; /* Fallback */
    margin-bottom: var(--space-xs, 0.5rem);
    position: relative;
    overflow: hidden;
  }
  
  .nav-item:hover {
    background: #f3f4f6; /* Fallback */
    background: var(--color-surface-hover, #f3f4f6);
    color: #111827; /* Fallback */
    color: var(--color-text, #111827);
  }
  
  .nav-item.active {
    background: #eef2ff; /* Fallback */
    background: var(--color-primary-soft, #eef2ff);
    color: #4f46e5; /* Fallback */
    color: var(--color-primary, #4f46e5);
  }
  
  .nav-item.active::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 3px;
    background: #4f46e5; /* Fallback */
    background: var(--color-primary, #4f46e5);
  }
  
  .nav-icon {
    font-size: 1.25rem;
    flex-shrink: 0;
    width: 1.25rem;
    text-align: center;
  }
  
  .nav-label {
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .nav-footer {
    padding: 1rem; /* Fallback */
    padding: var(--space-md, 1rem);
    border-top: 1px solid #e5e7eb; /* Fallback */
    border-top: 1px solid var(--color-border, #e5e7eb);
  }
  
  .ai-status {
    display: flex;
    align-items: center;
    gap: 0.5rem; /* Fallback */
    gap: var(--space-xs, 0.5rem);
    font-size: 0.875rem; /* Fallback */
    font-size: var(--font-size-sm, 0.875rem);
    color: #6b7280; /* Fallback */
    color: var(--color-text-secondary, #6b7280);
    padding: 0.75rem; /* Fallback */
    padding: var(--space-sm, 0.75rem);
  }
  
  .collapsed .ai-status {
    justify-content: center;
    padding: 0.5rem; /* Fallback */
    padding: var(--space-xs, 0.5rem);
  }
  
  .status-dot {
    width: 8px;
    height: 8px;
    border-radius: 9999px; /* Fallback */
    border-radius: var(--radius-full, 9999px);
    background: #10b981; /* Fallback */
    background: var(--color-success, #10b981);
    animation: pulse 2s ease-in-out infinite;
    flex-shrink: 0;
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
  
  /* Mobile styles */
  @media (max-width: 768px) {
    .side-nav {
      transform: translateX(-100%);
      width: 16rem; /* Fallback */
      width: var(--nav-side-width-open, 16rem);
      box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1); /* Fallback */
      box-shadow: var(--shadow-xl);
    }
    
    .side-nav.mobile-open {
      transform: translateX(0);
    }
    
    .collapse-toggle {
      display: none;
    }
  }
  
  .mobile-overlay {
    display: none;
  }
  
  @media (max-width: 768px) {
    .mobile-overlay {
      display: block;
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.5);
      z-index: 19; /* One less than side-nav */
      border: none;
      padding: 0;
      cursor: pointer;
    }
  }
  
  /* Accessibility helper */
  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
  
  /* Scrollbar styling */
  .nav-content::-webkit-scrollbar {
    width: 4px;
  }
  
  .nav-content::-webkit-scrollbar-track {
    background: transparent;
  }
  
  .nav-content::-webkit-scrollbar-thumb {
    background: #e5e7eb; /* Fallback */
    background: var(--color-border, #e5e7eb);
    border-radius: 9999px; /* Fallback */
    border-radius: var(--radius-full, 9999px);
  }
  
  /* Hide labels when collapsed */
  .collapsed .nav-label {
    display: none;
  }
  
  /* Center items when collapsed */
  .collapsed .nav-item {
    justify-content: center;
    padding: 0.75rem; /* Fallback */
    padding: var(--space-sm, 0.75rem);
  }
</style>