// Minimal graf-implementasjon for Moduli

export interface GraphNode {
  id: string;
  title: string;
  type: 'concept' | 'task' | 'collection';
  data?: Record<string, any>;
}

export interface GraphEdge {
  from: string;
  to: string;
  type: 'prerequisite-for' | 'related-to' | 'part-of' | 'leads-to';
  weight?: number;
}

export interface Graph {
  nodes: Map<string, GraphNode>;
  edges: GraphEdge[];
}

export function createGraph(): Graph {
  return {
    nodes: new Map(),
    edges: []
  };
}

export function addNode(graph: Graph, node: GraphNode): void {
  graph.nodes.set(node.id, node);
}

export function addEdge(graph: Graph, edge: GraphEdge): void {
  // Validate that nodes exist
  if (!graph.nodes.has(edge.from) || !graph.nodes.has(edge.to)) {
    console.warn(`Edge references non-existent node: ${edge.from} -> ${edge.to}`);
    return;
  }
  graph.edges.push(edge);
}

export function getNeighbors(graph: Graph, nodeId: string, direction: 'in' | 'out' | 'both' = 'out'): GraphNode[] {
  const neighbors: GraphNode[] = [];
  
  for (const edge of graph.edges) {
    if (direction === 'out' && edge.from === nodeId) {
      const neighbor = graph.nodes.get(edge.to);
      if (neighbor) neighbors.push(neighbor);
    } else if (direction === 'in' && edge.to === nodeId) {
      const neighbor = graph.nodes.get(edge.from);
      if (neighbor) neighbors.push(neighbor);
    } else if (direction === 'both') {
      if (edge.from === nodeId) {
        const neighbor = graph.nodes.get(edge.to);
        if (neighbor) neighbors.push(neighbor);
      }
      if (edge.to === nodeId) {
        const neighbor = graph.nodes.get(edge.from);
        if (neighbor) neighbors.push(neighbor);
      }
    }
  }
  
  return neighbors;
}

// Enkel topologisk sortering for prerequisite-relasjoner
export function topologicalSort(graph: Graph): string[] {
  const visited = new Set<string>();
  const result: string[] = [];
  
  function visit(nodeId: string) {
    if (visited.has(nodeId)) return;
    visited.add(nodeId);
    
    // Besøk alle avhengigheter først
    const dependencies = graph.edges
      .filter(e => e.to === nodeId && e.type === 'prerequisite-for')
      .map(e => e.from);
    
    for (const dep of dependencies) {
      visit(dep);
    }
    
    result.push(nodeId);
  }
  
  // Start med alle noder
  for (const nodeId of graph.nodes.keys()) {
    visit(nodeId);
  }
  
  return result;
}
