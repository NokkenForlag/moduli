<script lang="ts">
  import { browser } from '$app/environment';
  import { goto } from '$app/navigation';
  import { createGraph, addNode, addEdge } from '@moduli/core';
  import type { Graph, GraphNode } from '@moduli/core';
  import GraphVisualization from '$lib/components/GraphVisualization.svelte';
  import ConceptCard from '$lib/components/ConceptCard.svelte';
  import type { PageData } from './$types';

  // Props using Svelte 5
  interface Props {
    data: PageData;
  }
  
  let { data }: Props = $props();

  // Debug logging
  console.log('Graf page loaded');
  console.log('Data from server:', data);
  console.log('Nodes:', data?.graph?.nodes?.length);
  console.log('Edges:', data?.graph?.edges?.length);

  // Svelte 5 state
  let graph = $state<Graph | null>(null);
  let filteredGraph = $state<Graph | null>(null);
  let selectedNode = $state<GraphNode | null>(null);
  let showDetails = $state(false);
  let activeFilter = $state('all');
  let windowWidth = $state(1200);
  let windowHeight = $state(720);
  let initialized = $state(false);

  // Initialize graph when in browser
  $effect(() => {
    if (browser && !initialized && data?.graph) {
      console.log('Initializing graph in browser');
      
      // Update window dimensions
      windowWidth = window.innerWidth;
      windowHeight = window.innerHeight - 80;
      
      // Create graph
      const g = createGraph();
      
      // Add nodes
      data.graph.nodes.forEach(node => {
        addNode(g, node);
      });
      
      // Add edges
      data.graph.edges.forEach(edge => {
        addEdge(g, edge);
      });
      
      graph = g;
      filteredGraph = g;
      initialized = true;
      
      console.log('Graph initialized:', g.nodes.size, 'nodes,', g.edges.length, 'edges');
    }
  });

  // Filter functions
  function filterGraph(filter: string) {
  console.log('filterGraph called with:', filter);
    if (!graph) return;
    
    activeFilter = filter;
    
    if (filter === 'all') {
      filteredGraph = graph;
      return;
    }

    const newGraph = createGraph();
    
    for (const [id, node] of graph.nodes) {
      if (node.type === filter) {
        addNode(newGraph, node);
      }
    }
    
    graph.edges.forEach(edge => {
      if (newGraph.nodes.has(edge.from) && newGraph.nodes.has(edge.to)) {
        addEdge(newGraph, edge);
      }
    });
    
    filteredGraph = newGraph;
  }

  function handleNodeClick(node: GraphNode) {
    selectedNode = node;
    showDetails = true;
  }

  function navigateToConcept(id: string) {
    goto(`/konsept/${id}`);
  }

  // Derived values
  const nodesByType = $derived({
    all: data?.graph?.nodes?.length || 0,
    concept: data?.graph?.nodes?.filter(n => n.type === 'concept').length || 0,
    task: data?.graph?.nodes?.filter(n => n.type === 'task').length || 0,
    collection: data?.graph?.nodes?.filter(n => n.type === 'collection').length || 0
  });
</script>

<!-- Resten av template forblir den samme -->
<div class="flex flex-col h-screen">
  <!-- Header -->
  <header class="glass-lg border-b border-border/50 px-6 py-4 z-topnav">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-primary">Kunnskapsgraf</h1>
        <p class="text-sm text-text-muted mt-1">Utforsk sammenhenger mellom konsepter</p>
      </div>
      
      <div class="flex items-center gap-4">
        <!-- Filter buttons -->
        <div class="flex gap-2">
          <button 
            onclick={() => filterGraph('all')}
            class="px-3 py-1.5 rounded-lg text-sm transition-all {activeFilter === 'all' ? 'glass-md' : 'glass-sm hover:glass-md'}"
          >
            Alle ({nodesByType.all})
          </button>
          <button 
            onclick={() => filterGraph('concept')}
            class="px-3 py-1.5 rounded-lg text-sm transition-all {activeFilter === 'concept' ? 'glass-md' : 'glass-sm hover:glass-md'}"
          >
            Konsepter ({nodesByType.concept})
          </button>
          <button 
            onclick={() => filterGraph('task')}
            class="px-3 py-1.5 rounded-lg text-sm transition-all {activeFilter === 'task' ? 'glass-md' : 'glass-sm hover:glass-md'}"
          >
            Oppgaver ({nodesByType.task})
          </button>
          <button 
            onclick={() => filterGraph('collection')}
            class="px-3 py-1.5 rounded-lg text-sm transition-all {activeFilter === 'collection' ? 'glass-md' : 'glass-sm hover:glass-md'}"
          >
            Samlinger ({nodesByType.collection})
          </button>
        </div>
      </div>
    </div>
  </header>

  <!-- Debug info -->
  {#if browser && import.meta.env.DEV}
    <div class="absolute top-20 left-4 p-2 bg-gray-800 text-white text-xs rounded z-50 space-y-1">
      <p>Browser: {browser}</p>
      <p>Initialized: {initialized}</p>
      <p>Graph: {graph ? `${graph.nodes.size} nodes` : 'null'}</p>
      <p>FilteredGraph: {filteredGraph ? `${filteredGraph.nodes.size} nodes` : 'null'}</p>
      <p>Window: {windowWidth}x{windowHeight}</p>
    </div>
  {/if}

  <!-- Main content -->
  <main class="flex-1 relative overflow-hidden">
    {#if filteredGraph && browser}
      <GraphVisualization
        graph={filteredGraph}
        width={windowWidth}
        height={windowHeight}
        onNodeClick={handleNodeClick}
      />
    {:else if !browser}
      <div class="flex items-center justify-center h-full">
        <p class="text-text-muted">Laster klient...</p>
      </div>
    {:else}
      <div class="flex items-center justify-center h-full">
        <p class="text-text-muted">Ingen graf-data</p>
      </div>
    {/if}

    <!-- Selected node details - samme som før -->
    {#if showDetails && selectedNode}
      <!-- ... existing detail panel ... -->
    {/if}
  </main>
</div>

<style>
  .z-topnav {
    z-index: var(--z-topnav);
  }
</style>