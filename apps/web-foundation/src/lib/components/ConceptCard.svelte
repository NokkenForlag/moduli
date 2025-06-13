<script lang="ts">
  import type { ConceptMeta } from '@moduli/content';

  interface Props {
    concept: Partial<ConceptMeta>;
    href?: string;
    onClick?: () => void;
  }

  let { concept, href, onClick }: Props = $props();

  // Destrukturer alle properties med defaults
  const id = concept.id || '';
  const title = concept.title || 'Untitled';
  const description = concept.description || '';
  const difficulty = concept.difficulty ?? 3;
  const tags = concept.tags ?? [];
  const relations = concept.relations ?? [];
  
  function handleClick(e: MouseEvent) {
    if (onClick) {
      e.preventDefault();
      onClick();
    }
  }

  const hasRelations = relations.length > 0;
  
  const difficultyLabels = {
    1: 'Veldig lett',
    2: 'Lett',
    3: 'Middels',  
    4: 'Vanskelig',
    5: 'Veldig vanskelig'
  };
  
  const difficultyLabel = difficultyLabels[difficulty as keyof typeof difficultyLabels] || 'Ukjent';
  
  const relationIcons = {
    'prerequisite-for': '📋',
    'related-to': '🔗',
    'part-of': '📦',
    'leads-to': '➡️'
  };
</script>

<article 
  class="concept-card glass-lg rounded-2xl p-6 transition-all hover:scale-[1.02] hover:shadow-2xl cursor-pointer"
  class:clickable={href || onClick}
  onclick={handleClick}
  onkeydown={(e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onClick?.();
    }
  }}
  role={onClick ? 'button' : 'article'}
  tabindex={onClick ? 0 : -1}
>
  <!-- Header -->
  <div class="flex items-start justify-between mb-4">
    <div class="flex-1">
      <h3 class="text-xl font-semibold text-text-primary mb-1">
        {#if href}
          <a {href} class="hover:text-accent transition-colors">
            {title}
          </a>
        {:else}
          {title}
        {/if}
      </h3>
      
      {#if id}
        <p class="text-sm text-text-muted font-mono">{id}</p>
      {/if}
    </div>
    
    <!-- Difficulty badge -->
    <div class="flex flex-col items-end gap-1">
      <span class="text-xs text-text-muted">{difficultyLabel}</span>
      <div class="flex gap-1">
        {#each Array(5) as _, i}
          <div 
            class="w-2 h-2 rounded-full transition-all"
            class:opacity-20={i >= difficulty}
            class:scale-125={i < difficulty}
            class:bg-white={i >= difficulty}
            class:bg-green-500={i < difficulty && difficulty <= 2}
            class:bg-yellow-500={i < difficulty && difficulty === 3}
            class:bg-orange-500={i < difficulty && difficulty === 4}
            class:bg-red-500={i < difficulty && difficulty >= 5}
          ></div>
        {/each}
      </div>
    </div>
  </div>
  
  <!-- Description -->
  {#if description}
    <p class="text-text-secondary mb-4 line-clamp-2">
      {description}
    </p>
  {/if}
  
  <!-- Tags -->
  {#if tags.length > 0}
    <div class="flex flex-wrap gap-2 mb-4">
      {#each tags as tag}
        <span class="px-2 py-1 text-xs rounded-full bg-accent/20 text-accent">
          #{tag}
        </span>
      {/each}
    </div>
  {/if}
  
  <!-- Relations -->
  {#if hasRelations}
    <div class="border-t border-white/10 pt-4 mt-4">
      <p class="text-xs text-text-muted mb-2 uppercase tracking-wider">Relasjoner</p>
      <div class="flex flex-wrap gap-2">
        {#each relations.slice(0, 3) as relation}
          <span class="text-sm text-text-secondary flex items-center gap-1">
            <span class="text-accent">{relationIcons[relation.type] || '•'}</span>
            <span class="font-mono text-xs">{relation.to}</span>
          </span>
        {/each}
        {#if relations.length > 3}
          <span class="text-sm text-text-muted">+{relations.length - 3} til</span>
        {/if}
      </div>
    </div>
  {/if}
</article>

<style>
  .concept-card {
    /* Ekstra glass morphism effekter */
    backdrop-filter: blur(16px);
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .concept-card:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.15);
  }
  
  .clickable {
    cursor: pointer;
  }
  
  /* Limit description lines */
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>