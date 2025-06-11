<!-- packages/ui/src/components/feedback/Loading.svelte -->
<script lang="ts">
  import { cn } from "../../lib/cn";

  export let size: "small" | "medium" | "large" = "medium";
  export let centered = true;
  export let text: string = "";
</script>

<div
  class={cn(
    centered && "flex flex-col items-center justify-center p-8",
    "text-center",
  )}
>
  <div class={cn("spinner", `spinner-${size}`)} />

  {#if text}
    <p class="mt-4 text-textSecondary">
      {text}
    </p>
  {/if}
</div>

<style>
  .spinner {
    border: 3px solid var(--color-border);
    border-radius: 50%;
    border-top-color: var(--color-primary);
    animation: spin 1s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;
  }

  .spinner-small {
    width: 1.5rem;
    height: 1.5rem;
    border-width: 2px;
  }

  .spinner-medium {
    width: 2.5rem;
    height: 2.5rem;
  }

  .spinner-large {
    width: 3.5rem;
    height: 3.5rem;
    border-width: 4px;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
</style>
