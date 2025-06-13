<script lang="ts">
  interface Collection {
    id: string;
    title: string;
    description?: string;
    count: number;
    icon?: string;
  }

  interface Props {
    collections?: Collection[];
    isOpen?: boolean;
  }

  let { collections = [], isOpen = true }: Props = $props();
  
  let expandedCollections = $state<Set<string>>(new Set());

  function toggleCollection(id: string) {
    const newExpanded = new Set(expandedCollections);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    expandedCollections = newExpanded;
  }
</script>

<!-- Rest of template remains the same -->

<aside 
  class="fixed left-0 top-0 h-full w-64 glass-xl border-r border-border/50 transition-transform duration-300 z-sidebar"
  class:translate-x-0={isOpen}
  class:-translate-x-full={!isOpen}
>
  <div class="flex flex-col h-full">
    <!-- Header -->
    <div class="p-4 border-b border-border/30">
      <div class="flex items-center justify-between">
        <h2 class="text-lg font-semibold text-primary">Moduli</h2>
        <button
          on:click={() => isOpen = !isOpen}
          class="p-1.5 rounded-lg hover:bg-surface/50 transition-colors"
          aria-label="Toggle sidebar"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 overflow-y-auto p-4 space-y-6">
      <!-- Fixed navigation sections -->
      {#each navSections as section}
        <div>
          <button
            on:click={() => toggleSection(section.title)}
            class="flex items-center justify-between w-full text-sm font-medium text-text-muted hover:text-text transition-colors mb-2"
          >
            <span>{section.title}</span>
            <svg 
              class="w-4 h-4 transition-transform duration-200"
              class:rotate-180={expandedSections.has(section.title)}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {#if expandedSections.has(section.title)}
            <ul transition:slide={{ duration: 200 }} class="space-y-1">
              {#each section.items as item}
                <li>
                  <a
                    href={item.href}
                    class="flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all
                           hover:bg-surface/50 hover:translate-x-1
                           {$page.url.pathname === item.href ? 'bg-primary/10 text-primary' : 'text-text-muted'}"
                  >
                    <span class="flex items-center gap-2">
                      {#if item.icon}
                        <span class="text-base">{item.icon}</span>
                      {/if}
                      {item.label}
                    </span>
                    {#if item.badge}
                      <span class="px-2 py-0.5 text-xs rounded-full bg-primary/20 text-primary">
                        {item.badge}
                      </span>
                    {/if}
                  </a>
                </li>
              {/each}
            </ul>
          {/if}
        </div>
      {/each}

      <!-- Collections section -->
      <div>
        <button
          on:click={() => toggleSection('Samlinger')}
          class="flex items-center justify-between w-full text-sm font-medium text-text-muted hover:text-text transition-colors mb-2"
        >
          <span>Samlinger</span>
          <svg 
            class="w-4 h-4 transition-transform duration-200"
            class:rotate-180={expandedSections.has('Samlinger')}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        {#if expandedSections.has('Samlinger')}
          <div transition:slide={{ duration: 200 }} class="space-y-3">
            {#each Object.entries(groupedCollections) as [level, levelCollections]}
              <div>
                <h4 class="text-xs font-medium text-text-muted uppercase tracking-wider mb-1 px-3">
                  Nivå {level}
                </h4>
                <ul class="space-y-1">
                  {#each levelCollections as collection}
                    <li>
                      <a
                        href="/samling/{collection.id}"
                        class="flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all
                               hover:bg-surface/50 hover:translate-x-1
                               {$page.url.pathname === `/samling/${collection.id}` ? 'bg-primary/10 text-primary' : 'text-text-muted'}"
                      >
                        <span class="flex items-center gap-2">
                          {#if collection.icon}
                            <span class="text-base">{collection.icon}</span>
                          {/if}
                          <span class="truncate">{collection.title}</span>
                        </span>
                        {#if collection.count}
                          <span class="text-xs text-text-muted">
                            {collection.count}
                          </span>
                        {/if}
                      </a>
                    </li>
                  {/each}
                </ul>
              </div>
            {/each}
          </div>
        {/if}
      </div>
    </nav>

    <!-- Footer with theme switcher -->
    <div class="p-4 border-t border-border/30">
      <div class="flex items-center justify-between text-sm text-text-muted">
        <span>Theme</span>
        <button
          class="p-1.5 rounded-lg hover:bg-surface/50 transition-colors"
          on:click={() => {
            // Theme switching logic here
            // You can import and use applyTheme from @moduli/core
          }}
        >
          🎨
        </button>
      </div>
    </div>
  </div>
</aside>

<!-- Sidebar toggle button when closed -->
{#if !isOpen}
  <button
    on:click={() => isOpen = true}
    class="fixed left-4 top-4 p-2 rounded-lg glass-md hover:glass-lg transition-all z-sidebar"
    aria-label="Open sidebar"
  >
    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  </button>
{/if}

<style>
  .z-sidebar {
    z-index: var(--z-sidebar);
  }
</style>