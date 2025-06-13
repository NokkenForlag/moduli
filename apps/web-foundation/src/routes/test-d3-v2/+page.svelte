<script lang="ts">
  import { browser } from '$app/environment';
  import * as d3 from 'd3';
  
  let svgElement = $state<SVGElement>();
  let rendered = $state(false);
  
  $effect(() => {
    if (browser && svgElement && !rendered) {
      console.log('Drawing with D3...');
      
      const svg = d3.select(svgElement);
      
      // Clear any existing content
      svg.selectAll("*").remove();
      
      // Draw circle
      svg.append('circle')
         .attr('cx', 100)
         .attr('cy', 100)
         .attr('r', 40)
         .attr('fill', 'red')
         .attr('stroke', 'white')
         .attr('stroke-width', 2);
      
      // Draw rect
      svg.append('rect')
         .attr('x', 200)
         .attr('y', 50)
         .attr('width', 100)
         .attr('height', 100)
         .attr('fill', 'blue')
         .attr('stroke', 'white')
         .attr('stroke-width', 2);
         
      // Draw text
      svg.append('text')
         .attr('x', 200)
         .attr('y', 200)
         .attr('text-anchor', 'middle')
         .text('D3 + Svelte 5!')
         .style('fill', 'white')
         .style('font-size', '20px');
         
      rendered = true;
      console.log('D3 rendering complete');
    }
  });
</script>

<div class="p-8">
  <h1 class="text-2xl mb-4">D3 + Svelte 5 Test</h1>
  
  <div class="mb-4 text-sm space-y-1">
    <p>Browser: {browser}</p>
    <p>SVG Element: {svgElement ? 'Ready' : 'Not ready'}</p>
    <p>Rendered: {rendered}</p>
  </div>
  
  {#if browser}
    <svg bind:this={svgElement} width="400" height="300" class="border-2 border-gray-600 bg-gray-900">
      <!-- D3 will render here -->
    </svg>
  {:else}
    <div class="w-[400px] h-[300px] border-2 border-gray-600 bg-gray-900 flex items-center justify-center">
      <p class="text-gray-500">Loading on client...</p>
    </div>
  {/if}
</div>