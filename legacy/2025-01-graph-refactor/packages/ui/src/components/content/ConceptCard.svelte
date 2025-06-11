<!-- packages/ui/src/components/content/ConceptCard.svelte -->
<script lang="ts">
  import { cn } from "../../lib/cn";
  import { glass, components, typography } from "../../theme/styles";

  export let id: string;
  export let title: string;
  export let description: string = "";
  export let href: string = `/konsept/${id}`;
  export let tags: string[] = [];
  export let difficulty: number | undefined = undefined;
  export let estimatedTime: number | undefined = undefined;
</script>

<a
  {href}
  class={cn(
    components.card.base,
    components.card.hover,
    "block cursor-pointer",
  )}
>
  <div class="flex items-start justify-between mb-3">
    <h3 class={cn(typography.h4, "text-text")}>
      {title}
    </h3>
    {#if difficulty}
      <span
        class={cn(
          "px-2 py-1 rounded-full text-xs font-medium",
          glass.sm,
          difficulty <= 2 && "text-success border-success/30",
          difficulty === 3 && "text-warning border-warning/30",
          difficulty >= 4 && "text-error border-error/30",
        )}
      >
        Nivå {difficulty}
      </span>
    {/if}
  </div>

  {#if description}
    <p class={cn(typography.body, "text-textSecondary mb-4")}>
      {description}
    </p>
  {/if}

  <div class="flex items-center justify-between">
    {#if tags.length > 0}
      <div class="flex flex-wrap gap-2">
        {#each tags as tag}
          <span
            class={cn(
              "px-2 py-1 rounded-md text-xs",
              glass.sm,
              "text-textMuted",
            )}
          >
            {tag}
          </span>
        {/each}
      </div>
    {/if}

    {#if estimatedTime}
      <span class="text-xs text-textMuted flex items-center gap-1">
        <svg
          class="w-3 h-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        {estimatedTime} min
      </span>
    {/if}
  </div>
</a>
