<script lang="ts">
  import { onMount } from 'svelte';
  
  let mounted = false;
  
  onMount(() => {
    mounted = true;
  });
</script>

<div 
  class="fixed inset-0 z-canvas pointer-events-none overflow-hidden"
  aria-hidden="true"
>
  <!-- Animated gradient background -->
  <div class="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 animate-gradient" />
  
  <!-- Floating orbs for depth -->
  {#if mounted}
    <div class="absolute top-20 left-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-float" />
    <div class="absolute bottom-20 right-20 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-float-delayed" />
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-2xl animate-pulse" />
  {/if}
</div>

<style>
  @keyframes gradient {
    0%, 100% { transform: rotate(0deg) scale(1); }
    50% { transform: rotate(180deg) scale(1.1); }
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0) translateX(0); }
    33% { transform: translateY(-30px) translateX(20px); }
    66% { transform: translateY(20px) translateX(-20px); }
  }
  
  @keyframes float-delayed {
    0%, 100% { transform: translateY(0) translateX(0); }
    33% { transform: translateY(30px) translateX(-20px); }
    66% { transform: translateY(-20px) translateX(20px); }
  }
  
  .animate-gradient {
    animation: gradient 20s ease-in-out infinite;
  }
  
  .animate-float {
    animation: float 15s ease-in-out infinite;
  }
  
  .animate-float-delayed {
    animation: float-delayed 20s ease-in-out infinite;
  }
</style>