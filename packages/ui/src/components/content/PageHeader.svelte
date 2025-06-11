<!-- packages/ui/src/components/content/PageHeader.svelte -->
<script lang="ts">
  import { cn } from '../../lib/cn';
  import { glass, typography } from '../../theme/styles';
  
  export let title: string;
  export let description: string = '';
  export let variant: 'default' | 'hero' = 'default';
</script>

<header class={cn(
  'mb-8',
  variant === 'hero' && [
    glass.surface.elevated,
    'p-8 rounded-2xl',
    'border border-border'
  ]
)}>
  <h1 class={cn(
    typography.h1,
    'text-text mb-2',
    variant === 'hero' && 'text-center'
  )}>
    {title}
  </h1>
  
  {#if description}
    <p class={cn(
      typography.lead,
      'text-textSecondary',
      variant === 'hero' && 'text-center max-w-2xl mx-auto'
    )}>
      {description}
    </p>
  {/if}
  
  {#if $$slots.actions}
    <div class={cn(
      'mt-6 flex gap-3',
      variant === 'hero' && 'justify-center'
    )}>
      <slot name="actions" />
    </div>
  {/if}
</header>