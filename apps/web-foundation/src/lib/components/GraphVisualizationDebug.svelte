<script lang="ts">
  import { onMount } from 'svelte';
  import * as d3 from 'd3';
  import type { Graph } from '@moduli/core';

  interface Props {
    graph: Graph;
    width?: number;
    height?: number;
  }

  let { graph, width = 800, height = 600 }: Props = $props();

  let svgElement = $state<SVGElement>();
  let debugInfo = $state({
    mounted: false,
    svgFound: false,
    nodeCount: 0,
    edgeCount: 0,
    d3Version: '',
    error: ''
  });

  $effect(() => {
    debugInfo.nodeCount = graph?.nodes?.size || 0;
    debugInfo.edgeCount = graph?.edges?.length || 0;
  });

  $effect(() => {
    // Din eksisterende onMount kode her, men med $effect
  });
</script>

<!-- Rest of template remains the same -->

<div class="p-4 bg-gray-800 rounded">
  <h3 class="text-lg mb-2">Graph Debug Info</h3>
  <pre class="text-xs text-gray-400">{JSON.stringify(debugInfo, null, 2)}</pre>
  
  <svg
    bind:this={svgElement}
    {width}
    {height}
    class="mt-4 border border-gray-600 bg-gray-900"
  >
    <!-- D3 content here -->
  </svg>
</div>