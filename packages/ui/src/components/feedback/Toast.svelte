<!-- packages/ui/src/components/feedback/Toast.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  
  export let type: 'success' | 'error' | 'info' | 'warning' = 'info';
  export let message: string;
  export let duration = 3000;
  export let onClose: () => void = () => {};
  
  const icons = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ'
  };
  
  onMount(() => {
    if (duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  });
</script>

<div class="toast toast-{type}">
  <span class="toast-icon">{icons[type]}</span>
  <p class="toast-message">{message}</p>
  <button class="toast-close" on:click={onClose}>✕</button>
</div>

<style>
  .toast {
    position: fixed;
    top: 5rem;
    right: 1rem;
    min-width: 300px;
    max-width: 500px;
    padding: 1rem 1.5rem;
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    background: rgba(23, 23, 23, 0.9);
    backdrop-filter: blur(12px);
    border: 2px solid;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
    animation: slideIn 200ms ease-out;
    z-index: 100;
  }
  
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  .toast-icon {
    font-size: 1.5rem;
    flex-shrink: 0;
  }
  
  .toast-message {
    flex: 1;
    margin: 0;
    font-weight: 500;
  }
  
  .toast-close {
    background: none;
    border: none;
    color: inherit;
    font-size: 1.25rem;
    cursor: pointer;
    padding: 0.25rem;
    opacity: 0.7;
    transition: opacity 200ms;
  }
  
  .toast-close:hover {
    opacity: 1;
  }
  
  /* Type variants */
  .toast-success {
    border-color: var(--color-success);
    color: var(--color-success);
  }
  
  .toast-error {
    border-color: var(--color-error);
    color: var(--color-error);
  }
  
  .toast-warning {
    border-color: var(--color-warning);
    color: var(--color-warning);
  }
  
  .toast-info {
    border-color: var(--color-primary);
    color: var(--color-primary);
  }
</style>