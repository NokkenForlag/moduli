<!-- packages/ui/src/components/navigation/TopNav.svelte -->
<script lang="ts">
  import ThemeToggle from '../theme/ThemeToggle.svelte';
  
  const navItems = [
    { href: '/oppslagsverk', label: 'Oppslagsverk', icon: '📚' },
    { href: '/utforskning', label: 'Utforskning', icon: '🔍' },
    { href: '/r1', label: 'R1 Matematikk', icon: '∫' },
    { href: '/laeringssti', label: 'Min læringssti', icon: '🛤️' },
  ];
</script>

<nav class="top-nav">
  <div class="nav-container">
    <!-- Logo -->
    <a href="/" class="logo">
      <span class="logo-icon">📐</span>
      <span class="logo-text">MODULI</span>
    </a>
    
    <!-- Navigation -->
    <div class="nav-items">
      {#each navItems as item}
        <a href={item.href} class="nav-item">
          <span class="nav-icon">{item.icon}</span>
          <span class="nav-label">{item.label}</span>
        </a>
      {/each}
    </div>
    
    <!-- Actions -->
    <div class="nav-actions">
      <ThemeToggle />
      <button class="user-avatar">KR</button>
    </div>
  </div>
</nav>

<style>
  .top-nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 4rem;
    background: rgba(23, 23, 23, 0.9);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--color-border);
    z-index: 50;
  }
  
  .nav-container {
    max-width: 1200px;
    margin: 0 auto;
    height: 100%;
    padding: 0 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  .logo {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    text-decoration: none;
    color: var(--color-text);
    font-weight: 600;
    font-size: 1.25rem;
  }
  
  .logo-icon {
    font-size: 1.5rem;
    transition: transform 200ms;
  }
  
  .logo:hover .logo-icon {
    transform: rotate(15deg);
  }
  
  .nav-items {
    display: flex;
    gap: 0.25rem;
  }
  
  .nav-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    text-decoration: none;
    color: var(--color-textSecondary);
    font-weight: 500;
    transition: all 200ms;
  }
  
  .nav-item:hover {
    background: rgba(255, 255, 255, 0.05);
    color: var(--color-text);
  }
  
  .nav-icon {
    font-size: 1.125rem;
  }
  
  .nav-actions {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
  
  .user-avatar {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    background: var(--color-primary);
    color: white;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid transparent;
    cursor: pointer;
    transition: all 200ms;
  }
  
  .user-avatar:hover {
    border-color: var(--color-primary);
    background: transparent;
    color: var(--color-primary);
  }
  
  /* Hide labels on mobile */
  @media (max-width: 768px) {
    .nav-label {
      display: none;
    }
  }
</style>