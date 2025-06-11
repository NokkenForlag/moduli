<!-- packages/ui/src/components/form/Input.svelte -->
<script lang="ts">
  export let value: string = '';
  export let placeholder: string = '';
  export let disabled: boolean = false;
  export let error: boolean = false;
  export let label: string = '';
  export let helperText: string = '';
  export let required: boolean = false;
  export let id: string = `input-${Math.random().toString(36).slice(2, 9)}`;
  
  let className = '';
  export { className as class };
</script>

<div class="input-wrapper">
  {#if label}
    <label for={id} class="input-label" class:error>
      {label}
      {#if required}
        <span class="required">*</span>
      {/if}
    </label>
  {/if}
  
  <div class="input-container">
    <input
      {id}
      type="text"
      bind:value
      {placeholder}
      {disabled}
      {required}
      class="input {className}"
      class:error
      class:disabled
      on:input
      on:change
      on:blur
      on:focus
      {...$$restProps}
    />
  </div>
  
  {#if helperText}
    <p class="helper-text" class:error>
      {helperText}
    </p>
  {/if}
</div>

<style>
  .input-wrapper {
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
  }
  
  .input-label {
    display: block;
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--color-textSecondary);
  }
  
  .input-label.error {
    color: var(--color-error);
  }
  
  .required {
    color: var(--color-error);
    margin-left: 0.125rem;
  }
  
  .input-container {
    position: relative;
  }
  
  .input {
    width: 100%;
    padding: 0.625rem 1rem;
    border-radius: 0.5rem;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid var(--color-border);
    color: var(--color-text);
    font-size: 1rem;
    transition: all 200ms;
  }
  
  .input::placeholder {
    color: var(--color-textMuted);
  }
  
  .input:hover:not(.disabled) {
    border-color: var(--color-borderHover);
  }
  
  .input:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
  
  .input.error {
    border-color: var(--color-error);
  }
  
  .input.error:focus {
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
  }
  
  .input.disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  .helper-text {
    font-size: 0.875rem;
    color: var(--color-textMuted);
    margin: 0;
  }
  
  .helper-text.error {
    color: var(--color-error);
  }
</style>