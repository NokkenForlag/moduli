<!-- packages/ui/src/components/form/Button.svelte -->
<script lang="ts">
  export let variant: 'primary' | 'secondary' | 'ghost' | 'danger' = 'primary';
  export let size: 'small' | 'medium' | 'large' = 'medium';
  export let disabled: boolean = false;
  export let loading: boolean = false;
  export let type: 'button' | 'submit' | 'reset' = 'button';
  
  let className = '';
  export { className as class };
  
  // Build class string
  $: buttonClass = `btn btn-${variant} btn-${size} ${className} ${disabled ? 'disabled' : ''} ${loading ? 'loading' : ''}`;
</script>

<button
  {type}
  class={buttonClass}
  {disabled}
  on:click
>
  {#if loading}
    <span class="spinner" />
  {/if}
  <slot />
</button>

<style>
  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 200ms;
    border: 1px solid transparent;
    position: relative;
  }
  
  /* Sizes */
  .btn-small {
    padding: 0.375rem 0.75rem;
    font-size: 0.875rem;
  }
  
  .btn-medium {
    padding: 0.5rem 1rem;
    font-size: 1rem;
  }
  
  .btn-large {
    padding: 0.625rem 1.5rem;
    font-size: 1.125rem;
  }
  
  /* Variants */
  .btn-primary {
    background-color: var(--color-primary);
    color: white;
  }
  
  .btn-primary:hover:not(.disabled) {
    background-color: var(--color-primaryHover);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  }
  
  .btn-secondary {
    background: rgba(255, 255, 255, 0.1);
    color: var(--color-text);
    border-color: var(--color-border);
    backdrop-filter: blur(4px);
  }
  
  .btn-secondary:hover:not(.disabled) {
    background: rgba(255, 255, 255, 0.15);
    border-color: var(--color-borderHover);
  }
  
  .btn-ghost {
    background: transparent;
    color: var(--color-textSecondary);
  }
  
  .btn-ghost:hover:not(.disabled) {
    background: rgba(255, 255, 255, 0.05);
    color: var(--color-text);
  }
  
  .btn-danger {
    background-color: var(--color-error);
    color: white;
  }
  
  .btn-danger:hover:not(.disabled) {
    filter: brightness(1.1);
    transform: translateY(-1px);
  }
  
  /* States */
  .btn.disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  .btn:active:not(.disabled) {
    transform: translateY(0);
  }
  
  .btn:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }
  
  /* Loading spinner */
  .spinner {
    width: 1em;
    height: 1em;
    border: 2px solid currentColor;
    border-right-color: transparent;
    border-radius: 50%;
    animation: spin 0.75s linear infinite;
  }
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
  
  .btn.loading {
    color: transparent;
  }
  
  .btn.loading .spinner {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
</style>