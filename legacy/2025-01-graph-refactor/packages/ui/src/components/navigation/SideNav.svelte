<!-- packages/ui/src/components/navigation/SideNav.svelte -->
<script lang="ts">
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import { cn } from "../../lib/cn";
  import { layout, components, glass } from "../../theme/styles";
  export let collapsed = false;

  interface MenuItem {
    icon: string;
    label: string;
    href: string;
    children?: MenuItem[];
  }

  // Default menu items
  const defaultMenuItems: MenuItem[] = [
    { icon: "📖", label: "Alle konsepter", href: "/oppslagsverk" },
    { icon: "📐", label: "Geometri", href: "/oppslagsverk/geometri" },
    { icon: "🔢", label: "Algebra", href: "/oppslagsverk/algebra" },
    { icon: "📊", label: "Statistikk", href: "/oppslagsverk/statistikk" },
    { icon: "🎯", label: "Læreplanmål", href: "/laereplanmal" },
  ];

  // R1 specific menu items
  const r1MenuItems: MenuItem[] = [
    { icon: "🏠", label: "R1 Oversikt", href: "/r1" },
    {
      icon: "🎯",
      label: "Grenser og kontinuitet",
      href: "/r1#grenser-og-kontinuitet",
    },
    { icon: "📈", label: "Derivasjon", href: "/r1#derivasjon-grunnlag" },
    { icon: "📊", label: "Funksjonsanalyse", href: "/r1#funksjonsanalyse" },
    { icon: "📉", label: "Integrasjon", href: "/r1#integrasjon" },
    {
      icon: "➗",
      label: "Differensiallikninger",
      href: "/r1#differensiallikninger",
    },
    { icon: "📐", label: "Vektorer", href: "/r1#vektorer-geometri" },
  ];

  $: menuItems = $page.url.pathname.startsWith("/r1")
    ? r1MenuItems
    : defaultMenuItems;
  $: currentSection = getCurrentSection($page.url.pathname);

  function getCurrentSection(pathname: string): string {
    if (pathname.startsWith("/r1")) return "R1 Matematikk";
    if (pathname.startsWith("/oppslagsverk")) return "Oppslagsverk";
    if (pathname.startsWith("/utforskning")) return "Utforskning";
    return "";
  }

  function isActive(href: string): boolean {
    return (
      $page.url.pathname === href || $page.url.pathname.startsWith(href + "/")
    );
  }

  function navigateTo(href: string) {
    goto(href);
  }
</script>

<aside
  class={cn(
    "fixed left-0 top-16 bottom-0 z-40",
    "bg-[var(--surface-base)] backdrop-blur-md",
    "border-r border-[var(--border-subtle)]",
    "transition-all duration-200",
    "overflow-y-auto",
    collapsed ? "w-16" : "w-64 lg:w-72",
  )}
>
  <!-- Collapse toggle -->
  <button
    class={cn(
      "absolute -right-3 top-4",
      "w-6 h-6 rounded-full",
      "bg-[var(--surface-elevated)] backdrop-blur-sm",
      "border border-[var(--border-default)]",
      "flex items-center justify-center",
      "hover:bg-[var(--surface-hover)]",
      "transition-all duration-150",
      "z-10",
    )}
    on:click={() => (collapsed = !collapsed)}
    aria-label={collapsed ? "Utvid meny" : "Minimer meny"}
  >
    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d={collapsed ? "M9 5l7 7-7 7" : "M15 19l-7-7 7-7"}
      />
    </svg>
  </button>

  <!-- Section header -->
  {#if !collapsed && currentSection}
    <div class="px-6 py-4 border-b border-[var(--border-subtle)]">
      <h2
        class="text-sm font-semibold uppercase tracking-wider text-[var(--text-tertiary)]"
      >
        {currentSection}
      </h2>
    </div>
  {/if}

  <!-- Navigation items -->
  <nav class="p-4 space-y-1">
    {#each menuItems as item}
      <button
        class={cn(
          "w-full flex items-center gap-3",
          "px-3 py-2 rounded-lg",
          "text-[var(--text-secondary)]",
          "hover:bg-[var(--surface-hover)]",
          "hover:text-[var(--text-primary)]",
          "transition-all duration-150",
          isActive(item.href) && [
            "bg-[var(--surface-active)]",
            "text-[var(--text-primary)]",
            "shadow-sm",
            "border-l-2 border-[var(--accent-primary)]",
          ],
          collapsed && "justify-center",
        )}
        on:click={() => navigateTo(item.href)}
        title={collapsed ? item.label : undefined}
      >
        <span class="text-xl flex-shrink-0">{item.icon}</span>
        {#if !collapsed}
          <span class="font-medium">{item.label}</span>
        {/if}
      </button>
    {/each}

    {#if $page.url.pathname.startsWith("/r1") && !collapsed}
      <div class="my-4 h-px bg-[var(--border-subtle)]" />

      <button
        class={cn(
          "w-full flex items-center gap-3",
          "px-3 py-2 rounded-lg",
          "text-[var(--text-secondary)]",
          "hover:bg-[var(--surface-hover)]",
          "transition-all duration-150",
        )}
        on:click={() => navigateTo("/r1/oppgaver")}
      >
        <span class="text-xl">✏️</span>
        <span class="font-medium">Øvingsoppgaver</span>
      </button>

      <button
        class={cn(
          "w-full flex items-center gap-3",
          "px-3 py-2 rounded-lg",
          "text-[var(--text-secondary)]",
          "hover:bg-[var(--surface-hover)]",
          "transition-all duration-150",
        )}
        on:click={() => navigateTo("/r1/eksamen")}
      >
        <span class="text-xl">📝</span>
        <span class="font-medium">Eksamensoppgaver</span>
      </button>
    {/if}
  </nav>

  <!-- Footer -->
  <div
    class={cn(
      "absolute bottom-0 left-0 right-0",
      "p-4 border-t border-[var(--border-subtle)]",
    )}
  >
    <div
      class={cn(
        "flex items-center gap-2",
        "text-sm text-[var(--text-tertiary)]",
        collapsed && "justify-center",
      )}
    >
      <span class="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
      {#if !collapsed}
        <span>AI-assistent aktiv</span>
      {/if}
    </div>
  </div>
</aside>

<style>
  /* Custom scrollbar */
  aside::-webkit-scrollbar {
    width: 4px;
  }

  aside::-webkit-scrollbar-track {
    background: transparent;
  }

  aside::-webkit-scrollbar-thumb {
    background-color: var(--border-default);
    border-radius: 2px;
  }

  aside::-webkit-scrollbar-thumb:hover {
    background-color: var(--border-strong);
  }
</style>
