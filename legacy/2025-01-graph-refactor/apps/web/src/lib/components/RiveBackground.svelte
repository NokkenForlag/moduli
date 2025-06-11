<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';
  
  export let src = '/assets/rive/graph/background.riv';
  export let stateMachine = 'State Machine 1';
  export let artboard = 'Artboard';
  export let animations: string[] = [];
  
  let canvas: HTMLCanvasElement;
  let rive: any;
  let riveInstance: any;
  
  onMount(async () => {
    if (!browser) return;
    
    try {
      // Dynamically import Rive to avoid SSR issues
      const RiveModule = await import('@rive-app/canvas');
      rive = RiveModule.default;
      
      // Load and instantiate the Rive file
      riveInstance = new rive.Rive({
        src,
        canvas,
        artboard,
        stateMachines: stateMachine ? [stateMachine] : undefined,
        animations: animations.length > 0 ? animations : undefined,
        autoplay: true,
        onLoad: () => {
          // Resize canvas to fit container
          resizeCanvas();
          riveInstance.play();
        },
      });
      
      // Handle resize
      window.addEventListener('resize', resizeCanvas);
    } catch (error) {
      console.error('Failed to load Rive:', error);
    }
  });
  
  onDestroy(() => {
    if (browser) {
      window.removeEventListener('resize', resizeCanvas);
      if (riveInstance) {
        riveInstance.cleanup();
      }
    }
  });
  
  function resizeCanvas() {
    if (!canvas) return;
    
    const { width, height } = canvas.getBoundingClientRect();
    canvas.width = width * window.devicePixelRatio;
    canvas.height = height * window.devicePixelRatio;
    
    if (riveInstance) {
      riveInstance.resizeDrawingSurfaceToCanvas();
    }
  }
</script>

<div class="rive-background">
  <canvas 
    bind:this={canvas}
    class="rive-canvas"
    aria-hidden="true"
  />
</div>

<style>
  .rive-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    pointer-events: none;
    overflow: hidden;
  }
  
  .rive-canvas {
    width: 100%;
    height: 100%;
    opacity: 0.8;
    
    /* Add subtle animation for entrance */
    animation: fadeIn 1s ease-out;
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 0.8;
    }
  }
  
  /* Reduce motion for accessibility */
  @media (prefers-reduced-motion: reduce) {
    .rive-canvas {
      animation: none;
      opacity: 0.4;
    }
  }
  
  /* Performance optimization for mobile */
  @media (max-width: 768px) {
    .rive-canvas {
      opacity: 0.6;
    }
  }
</style>