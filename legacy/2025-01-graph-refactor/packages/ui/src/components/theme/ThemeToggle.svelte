<!-- packages/ui/src/components/theme/ThemeToggle.svelte -->
<script lang="ts">
  let currentTheme = "dark";

  function toggleTheme() {
    const themes = ["dark", "light", "cosmic", "ocean"];
    const currentIndex = themes.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % themes.length;
    currentTheme = themes[nextIndex];

    // For now, just log the change
    console.log("Theme changed to:", currentTheme);
  }

  $: themeIcon =
    {
      dark: "🌙",
      light: "☀️",
      cosmic: "✨",
      ocean: "🌊",
    }[currentTheme] || "🌙";
</script>

<button class="theme-toggle" on:click={toggleTheme} aria-label="Bytt tema">
  <span class="theme-icon">{themeIcon}</span>
</button>

<style>
  .theme-toggle {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid var(--color-border);
    cursor: pointer;
    transition: all 200ms;
    font-size: 1.25rem;
  }

  .theme-toggle:hover {
    background: rgba(255, 255, 255, 0.15);
    border-color: var(--color-borderHover);
    transform: scale(1.05);
  }

  .theme-toggle:active {
    transform: scale(0.95);
  }

  .theme-icon {
    display: inline-block;
    transition: transform 200ms;
  }

  .theme-toggle:hover .theme-icon {
    transform: rotate(15deg);
  }
</style>
