import Graph from 'graphology';
import type { ConceptId, Concept, ConceptRelation, GraphNode, GraphEdge } from '@moduli/types';

export class GraphBuilder {
  private graph: Graph;

  constructor() {
    this.graph = new Graph({ multi: false, type: 'directed' });
  }

  addConcept(concept: Concept): void {
    this.graph.addNode(concept.id, {
      ...concept,
      label: concept.title,
    } as GraphNode);
  }

  addRelation(relation: ConceptRelation): void {
    const { from, to, type, weight = 1 } = relation;
    
    if (!this.graph.hasNode(from) || !this.graph.hasNode(to)) {
      console.warn(`Cannot add relation: missing node(s) ${from} or ${to}`);
      return;
    }

    this.graph.addEdge(from, to, {
      ...relation,
      weight,
      label: type,
    } as GraphEdge);
  }

  getGraph(): Graph {
    return this.graph;
  }

  getConcept(id: ConceptId): GraphNode | null {
    if (!this.graph.hasNode(id)) return null;
    return this.graph.getNodeAttributes(id) as GraphNode;
  }

  getNeighbors(id: ConceptId): ConceptId[] {
    if (!this.graph.hasNode(id)) return [];
    return this.graph.neighbors(id);
  }

  getIncomingEdges(id: ConceptId): ConceptRelation[] {
    if (!this.graph.hasNode(id)) return [];
    
    const edges: ConceptRelation[] = [];
    this.graph.forEachInEdge(id, (edge, attributes, source) => {
      edges.push({
        from: source,
        to: id,
        type: attributes.type,
        weight: attributes.weight,
      });
    });
    
    return edges;
  }

  getOutgoingEdges(id: ConceptId): ConceptRelation[] {
    if (!this.graph.hasNode(id)) return [];
    
    const edges: ConceptRelation[] = [];
    this.graph.forEachOutEdge(id, (edge, attributes, source, target) => {
      edges.push({
        from: id,
        to: target,
        type: attributes.type,
        weight: attributes.weight,
      });
    });
    
    return edges;
  }

  findPath(from: ConceptId, to: ConceptId): ConceptId[] | null {
    // Simple BFS implementation
    if (!this.graph.hasNode(from) || !this.graph.hasNode(to)) return null;
    
    const visited = new Set<string>();
    const queue: Array<{ node: string; path: string[] }> = [{ node: from, path: [from] }];
    
    while (queue.length > 0) {
      const { node, path } = queue.shift()!;
      
      if (node === to) return path;
      
      if (visited.has(node)) continue;
      visited.add(node);
      
      this.graph.forEachOutNeighbor(node, (neighborId: string) => {
        if (!visited.has(neighborId)) {
          queue.push({ node: neighborId, path: [...path, neighborId] });
        }
      });
    }
    
    return null;
  }

  toJSON() {
    return {
      nodes: this.graph.nodes().map(id => ({
        id,
        ...this.graph.getNodeAttributes(id)
      })),
      edges: this.graph.edges().map(id => ({
        id,
        source: this.graph.source(id),
        target: this.graph.target(id),
        ...this.graph.getEdgeAttributes(id)
      }))
    };
  }
}
