<script lang="ts">
  import '../app.css';
  import { onMount } from 'svelte';
  import { getStoredTheme, applyTheme } from '@moduli/core';
  import GradientBackground from '$lib/components/GradientBackground.svelte';
  import SidebarNav from '$lib/components/SidebarNav.svelte';
  import type { LayoutData } from './$types';

  export let data: LayoutData;

  let sidebarOpen = true;

  onMount(() => {
    // Apply stored theme on mount
    const theme = getStoredTheme();
    applyTheme(theme);
  });
</script>

<div class="min-h-screen relative">
  <!-- Animated gradient background -->
  <GradientBackground />
  
  <!-- Sidebar navigation -->
  <SidebarNav bind:isOpen={sidebarOpen} collections={data?.collections || []} />
  
  <!-- Main content area -->
  <div 
    class="transition-all duration-300"
    class:ml-64={sidebarOpen}
    class:ml-0={!sidebarOpen}
  >
    <slot />
  </div>
</div>