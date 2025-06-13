<script lang="ts">
  import { browser } from '$app/environment';
  import * as d3 from 'd3';
  import type { Graph, GraphNode, GraphEdge } from '@moduli/core';

  // Extend types for D3 simulation
  interface SimulationNode extends GraphNode, d3.SimulationNodeDatum {}
  interface SimulationLink extends d3.SimulationLinkDatum<SimulationNode> {
    type: GraphEdge['type'];
  }

  // Props using Svelte 5 $props rune
  interface Props {
    graph: Graph;
    width?: number;
    height?: number;
    onNodeClick?: (node: GraphNode) => void;
  }
  
  let { 
    graph, 
    width = 800, 
    height = 600, 
    onNodeClick 
  }: Props = $props();

  // Svelte 5 state
  let svgElement = $state<SVGElement>();
  let initialized = $state(false);
  
  // D3 selections and simulation (not reactive)
  let svg: d3.Selection<SVGElement, unknown, null, undefined>;
  let g: d3.Selection<SVGGElement, unknown, null, undefined>;
  let simulation: d3.Simulation<SimulationNode, SimulationLink>;
  let zoom: d3.ZoomBehavior<SVGElement, unknown>;

  // Convert to D3-compatible format - using $derived for reactivity
  const nodes = $derived(Array.from(graph.nodes.values()).map(n => ({ ...n } as SimulationNode)));
  const links = $derived(graph.edges.map(e => ({
    source: e.from,
    target: e.to,
    type: e.type
  } as SimulationLink)));

  // Node colors based on type
  const nodeColors = {
    concept: 'var(--color-primary)',
    task: 'var(--color-secondary)',
    collection: 'var(--color-tertiary)'
  };

  // Edge colors based on type
  const edgeColors = {
    'prerequisite-for': 'var(--color-error)',
    'related-to': 'var(--color-primary-muted)',
    'part-of': 'var(--color-secondary)',
    'leads-to': 'var(--color-success)'
  };

  // Track previous node/link count to detect changes
  let prevNodeCount = $state(0);
  let prevLinkCount = $state(0);

  // Re-initialize when graph changes
  $effect(() => {
    if (browser && svgElement && graph) {
      const currentNodeCount = nodes.length;
      const currentLinkCount = links.length;
      
      // Check if graph has changed
      if (currentNodeCount !== prevNodeCount || currentLinkCount !== prevLinkCount) {
        console.log('Graph changed:', {
          nodes: `${prevNodeCount} → ${currentNodeCount}`,
          links: `${prevLinkCount} → ${currentLinkCount}`
        });
        
        prevNodeCount = currentNodeCount;
        prevLinkCount = currentLinkCount;
        
        // Re-initialize the graph
        initializeGraph();
      }
    }
  });
  
  // Cleanup on destroy
  $effect(() => {
    return () => {
      if (simulation) {
        console.log('Cleaning up: stopping simulation');
        simulation.stop();
      }
    };
  });

  function initializeGraph() {
    if (!svgElement || nodes.length === 0) {
      console.log('Cannot initialize: no SVG or no nodes');
      return;
    }
    
    console.log('Initializing D3 graph with', nodes.length, 'nodes and', links.length, 'links');
    
    // Stop existing simulation if any
    if (simulation) {
      simulation.stop();
    }
    
    // Initialize or get svg selection
    if (!svg) {
      svg = d3.select(svgElement as SVGElement);
      
      // Setup zoom behavior (only once)
      zoom = d3.zoom<SVGElement, unknown>()
        .scaleExtent([0.1, 4])
        .on('zoom', (event) => {
          if (g) g.attr('transform', event.transform);
        });
      
      svg.call(zoom);
    }
    
    // Clear existing graph elements
    svg.selectAll("defs").remove();
    svg.selectAll("g").remove();
    
    // Create new g element
    g = svg.append('g');
    
    // Create arrow markers for directed edges
    const defs = svg.append('defs');
    
    Object.entries(edgeColors).forEach(([type, color]) => {
      defs.append('marker')
        .attr('id', `arrow-${type}`)
        .attr('viewBox', '0 -5 10 10')
        .attr('refX', 25)
        .attr('refY', 0)
        .attr('markerWidth', 8)
        .attr('markerHeight', 8)
        .attr('orient', 'auto')
        .append('path')
        .attr('d', 'M0,-5L10,0L0,5')
        .attr('fill', color)
        .attr('opacity', 0.6);
    });

    // Add glass morphism filter
    const filter = defs.append('filter')
      .attr('id', 'blur');
    
    filter.append('feGaussianBlur')
      .attr('in', 'SourceGraphic')
      .attr('stdDeviation', '0.5');

    // Setup force simulation with new nodes
    simulation = d3.forceSimulation<SimulationNode, SimulationLink>(nodes)
      .force('link', d3.forceLink<SimulationNode, SimulationLink>(links)
        .id(d => d.id)
        .distance(100))
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(40));

    // Create links
    const link = g.append('g')
      .attr('class', 'links')
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke', d => edgeColors[d.type] || 'var(--color-border)')
      .attr('stroke-opacity', 0.6)
      .attr('stroke-width', 2)
      .attr('marker-end', d => `url(#arrow-${d.type})`);

    // Create node groups
    const node = g.append('g')
      .attr('class', 'nodes')
      .selectAll<SVGGElement, SimulationNode>('g')
      .data(nodes)
      .join('g')
      .attr('cursor', 'pointer')
      .call(d3.drag<SVGGElement, SimulationNode>()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended));

    // Add circles for nodes
    node.append('circle')
      .attr('r', 30)
      .attr('fill', d => nodeColors[d.type])
      .attr('fill-opacity', 0.8)
      .attr('stroke', 'var(--color-border)')
      .attr('stroke-width', 2)
      .attr('filter', 'url(#blur)');

    // Add labels
    node.append('text')
      .text(d => d.title)
      .attr('text-anchor', 'middle')
      .attr('dy', '0.35em')
      .attr('fill', 'var(--color-text)')
      .attr('font-size', '12px')
      .attr('pointer-events', 'none')
      .style('user-select', 'none');

    // Node hover effects
    node.on('mouseenter', function(event, d) {
      d3.select(this).select('circle')
        .transition()
        .duration(200)
        .attr('r', 35)
        .attr('fill-opacity', 1);
    })
    .on('mouseleave', function(event, d) {
      d3.select(this).select('circle')
        .transition()
        .duration(200)
        .attr('r', 30)
        .attr('fill-opacity', 0.8);
    })
    .on('click', (event, d) => {
      if (onNodeClick) {
        onNodeClick(d);
      }
    });

    // Update positions on simulation tick
    simulation.on('tick', () => {
      link
        .attr('x1', d => (d.source as SimulationNode).x!)
        .attr('y1', d => (d.source as SimulationNode).y!)
        .attr('x2', d => (d.target as SimulationNode).x!)
        .attr('y2', d => (d.target as SimulationNode).y!);

      node.attr('transform', d => `translate(${d.x},${d.y})`);
    });

    initialized = true;
  }

  // Drag functions
  function dragstarted(event: d3.D3DragEvent<SVGGElement, SimulationNode, SimulationNode>) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    event.subject.fx = event.subject.x;
    event.subject.fy = event.subject.y;
  }

  function dragged(event: d3.D3DragEvent<SVGGElement, SimulationNode, SimulationNode>) {
    event.subject.fx = event.x;
    event.subject.fy = event.y;
  }

  function dragended(event: d3.D3DragEvent<SVGGElement, SimulationNode, SimulationNode>) {
    if (!event.active) simulation.alphaTarget(0);
    event.subject.fx = null;
    event.subject.fy = null;
  }

  // Zoom controls (exposed functions)
  function zoomIn() {
    if (svg && zoom) {
      svg.transition().call(zoom.scaleBy, 1.2);
    }
  }

  function zoomOut() {
    if (svg && zoom) {
      svg.transition().call(zoom.scaleBy, 0.8);
    }
  }

  function resetZoom() {
    if (svg && zoom) {
      svg.transition().call(zoom.transform, d3.zoomIdentity);
    }
  }
</script>

<div class="relative w-full h-full bg-surface/30 rounded-lg overflow-hidden glass-lg">
  {#if browser}
    <svg
      bind:this={svgElement}
      {width}
      {height}
      class="w-full h-full"
    >
      <!-- Graph elements will be appended here by d3 -->
    </svg>
    
    <!-- Zoom controls -->
    <div class="absolute bottom-4 right-4 flex flex-col gap-2">
      <button
        onclick={zoomIn}
        class="p-2 rounded-lg glass-md hover:glass-lg transition-all"
        aria-label="Zoom in"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
        </svg>
      </button>
      <button
        onclick={zoomOut}
        class="p-2 rounded-lg glass-md hover:glass-lg transition-all"
        aria-label="Zoom out"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
        </svg>
      </button>
      <button
        onclick={resetZoom}
        class="p-2 rounded-lg glass-md hover:glass-lg transition-all"
        aria-label="Reset zoom"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      </button>
    </div>
  {:else}
    <div class="flex items-center justify-center h-full">
      <p class="text-text-muted">Loading graph...</p>
    </div>
  {/if}
</div>

<style>
  :global(.glass-lg) {
    backdrop-filter: blur(16px);
    background-color: var(--color-bg-tertiary);
  }
  
  :global(.glass-md) {
    backdrop-filter: blur(8px);
    background-color: var(--color-bg-secondary);
  }
</style>