<!-- packages/ui/src/components/content/MarkdownContent.svelte -->
<script lang="ts">
  import { cn } from '../../lib/cn';
  
  export let content: string = '';
  export let className: string = '';
</script>

<div class={cn('markdown-content', className)}>
  {@html content}
</div>

<style>
  .markdown-content {
    line-height: 1.7;
    color: var(--color-text);
  }
  
  /* Headings */
  .markdown-content :global(h1) {
    font-size: 2.25rem;
    font-weight: 700;
    margin-top: 2rem;
    margin-bottom: 1rem;
    color: var(--color-text);
  }
  
  .markdown-content :global(h2) {
    font-size: 1.875rem;
    font-weight: 600;
    margin-top: 1.75rem;
    margin-bottom: 0.75rem;
    color: var(--color-text);
  }
  
  .markdown-content :global(h3) {
    font-size: 1.5rem;
    font-weight: 600;
    margin-top: 1.5rem;
    margin-bottom: 0.5rem;
    color: var(--color-text);
  }
  
  /* Paragraphs and text */
  .markdown-content :global(p) {
    margin-bottom: 1rem;
    color: var(--color-textSecondary);
  }
  
  .markdown-content :global(strong) {
    font-weight: 600;
    color: var(--color-text);
  }
  
  /* Links */
  .markdown-content :global(a) {
    color: var(--color-primary);
    text-decoration: underline;
    text-underline-offset: 2px;
    transition: color var(--duration-fast);
  }
  
  .markdown-content :global(a:hover) {
    color: var(--color-primaryHover);
  }
  
  /* Lists */
  .markdown-content :global(ul),
  .markdown-content :global(ol) {
    margin-bottom: 1rem;
    padding-left: 1.5rem;
    color: var(--color-textSecondary);
  }
  
  .markdown-content :global(li) {
    margin-bottom: 0.25rem;
  }
  
  /* Code */
  .markdown-content :global(code) {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    padding: 0.125rem 0.375rem;
    border-radius: var(--radius-sm);
    font-family: var(--font-mono);
    font-size: 0.875em;
    color: var(--color-text);
  }
  
  .markdown-content :global(pre) {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    padding: 1rem;
    border-radius: var(--radius-md);
    overflow-x: auto;
    margin-bottom: 1rem;
  }
  
  .markdown-content :global(pre code) {
    background: transparent;
    border: none;
    padding: 0;
    font-size: 0.875rem;
    line-height: 1.5;
  }
  
  /* Blockquotes */
  .markdown-content :global(blockquote) {
    border-left: 4px solid var(--color-primary);
    padding-left: 1rem;
    margin: 1rem 0;
    font-style: italic;
    color: var(--color-textSecondary);
  }
  
  /* Tables */
  .markdown-content :global(table) {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 1rem;
  }
  
  .markdown-content :global(th),
  .markdown-content :global(td) {
    border: 1px solid var(--color-border);
    padding: 0.5rem;
    text-align: left;
  }
  
  .markdown-content :global(th) {
    background: var(--color-surface);
    font-weight: 600;
    color: var(--color-text);
  }
  
  /* Math blocks */
  .markdown-content :global(.math-block) {
    overflow-x: auto;
    margin: 1rem 0;
    padding: 1rem;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
  }
  
  /* Images */
  .markdown-content :global(img) {
    max-width: 100%;
    height: auto;
    border-radius: var(--radius-md);
    margin: 1rem 0;
  }
</style>