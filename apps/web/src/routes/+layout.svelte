<script lang="ts">
  import '../app.css';
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { theme } from '$lib/stores/theme';
  import { navigationState } from '$lib/stores/navigation';
  import MainNav from '$lib/components/navigation/MainNav.svelte';
  import SideNav from '$lib/components/navigation/SideNav.svelte';
  import ContentHeader from '$lib/components/navigation/ContentHeader.svelte';
  
  // Prevent SSR/hydration issues
  let mounted = false;
  
  onMount(() => {
    mounted = true;
    
    // Check for expired temporal themes
    theme.checkExpiry();
    
    // Set initial breadcrumbs based on current route
    updateBreadcrumbs($page.url.pathname);
  });
  
  // Update breadcrumbs when route changes
  $: if (mounted && $page.url.pathname) {
    updateBreadcrumbs($page.url.pathname);
  }
  
  function updateBreadcrumbs(pathname: string) {
    const segments = pathname.split('/').filter(Boolean);
    const breadcrumbs = [
      { label: 'Hjem', href: '/', icon: '🏠' }
    ];
    
    let currentPath = '';
    for (const segment of segments) {
      currentPath += `/${segment}`;
      
      // Map route segments to readable labels
      const label = segmentToLabel(segment);
      const icon = segmentToIcon(segment);
      
      breadcrumbs.push({
        label,
        href: currentPath,
        ...(icon && { icon })
      });
    }
    
    navigationState.setBreadcrumbs(breadcrumbs);
  }
  
  function segmentToLabel(segment: string): string {
    const labelMap: Record<string, string> = {
      'oppslagsverk': 'Oppslagsverk',
      'utforskning': 'Utforskning',
      'ui-demo': 'UI Demo',
      'geometri': 'Geometri',
      'algebra': 'Algebra',
      'statistikk': 'Statistikk',
      'laereplanmal': 'Læreplanmål'
    };
    
    return labelMap[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);
  }
  
  function segmentToIcon(segment: string): string | undefined {
    const iconMap: Record<string, string> = {
      'oppslagsverk': '📚',
      'utforskning': '🔍',
      'ui-demo': '🎨',
      'geometri': '📐',
      'algebra': '🔢',
      'statistikk': '📊',
      'laereplanmal': '🎯'
    };
    
    return iconMap[segment];
  }
</script>

<svelte:head>
  <!-- Prevent theme flicker -->
  <script>
    // This runs before Svelte hydration
    try {
      const saved = localStorage.getItem('moduli-theme');
      if (saved) {
        const state = JSON.parse(saved);
        const theme = state.temporal && new Date(state.temporal.expires) > new Date() 
          ? state.temporal.theme 
          : state.base;
        document.documentElement.setAttribute('data-theme', theme);
      }
    } catch (e) {
      // Fail silently
    }
  </script>
</svelte:head>

<div class="app" data-theme={$theme}>
  <MainNav />
  
  <div class="app-body">
    {#if mounted}
      <SideNav />
    {/if}
    
    <div 
      class="content-area"
      data-nav-collapsed={$navigationState.sideNavCollapsed}
    >
      <ContentHeader />
      
      <main class="content-container">
        <slot />
      </main>
    </div>
  </div>
</div>

<style>
  :global(html) {
    scroll-behavior: smooth;
  }
  
  :global(body) {
    margin: 0;
    min-height: 100vh;
    overflow-x: hidden;
  }
  
  .app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-color: var(--color-surface);
    color: var(--color-text);
    transition: background-color var(--transition-base), color var(--transition-base);
  }
  
  .app-body {
    display: flex;
    flex: 1;
    padding-top: var(--nav-top-height);
    position: relative;
  }
  
  .content-area {
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-left: var(--nav-side-width-open);
    transition: margin-left var(--transition-base);
    min-width: 0; /* Prevent flex child from overflowing */
  }
  
  .content-area[data-nav-collapsed="true"] {
    margin-left: var(--nav-side-width-closed);
  }
  
  .content-container {
    flex: 1;
    padding: var(--space-lg);
    max-width: var(--content-max-width);
    margin: 0 auto;
    width: 100%;
  }
  
  /* Mobile responsiveness */
  @media (max-width: 768px) {
    .content-area {
      margin-left: 0;
    }
    
    .content-container {
      padding: var(--space-md);
    }
  }
  
  /* Focus visible only on keyboard navigation */
  :global(*:focus) {
    outline: none;
  }
  
  :global(*:focus-visible) {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
    border-radius: var(--radius-sm);
  }
  
  /* Selection color */
  :global(::selection) {
    background: var(--color-primary-soft);
    color: var(--color-primary);
  }
  
  /* Custom scrollbar */
  :global(::-webkit-scrollbar) {
    width: 8px;
    height: 8px;
  }
  
  :global(::-webkit-scrollbar-track) {
    background: transparent;
  }
  
  :global(::-webkit-scrollbar-thumb) {
    background: var(--color-border);
    border-radius: var(--radius-full);
    transition: background var(--transition-fast);
  }
  
  :global(::-webkit-scrollbar-thumb:hover) {
    background: var(--color-text-tertiary);
  }
  
  :global(.app[data-theme]) {
    opacity: 1;
  }
  
  :global(.app:not([data-theme])) {
    opacity: 0;
  }
  
  /* Reduced motion support */
  @media (prefers-reduced-motion: reduce) {
    :global(*) {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
</style>