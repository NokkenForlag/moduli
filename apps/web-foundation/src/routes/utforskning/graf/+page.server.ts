import type { PageServerLoad } from './$types';
import { getAllConceptIds, loadConcepts, extractRelations } from '@moduli/content';
import { createGraph, addNode, addEdge } from '@moduli/core';
import type { Graph, GraphNode, GraphEdge } from '@moduli/core';
import type { Concept } from '@moduli/content';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
  try {
    // Get all concept IDs
    const conceptIds = await getAllConceptIds();
    
    if (conceptIds.length === 0) {
      return {
        graph: {
          nodes: [],
          edges: []
        },
        collections: []
      };
    }
    
    // Load all concepts
    const concepts = await loadConcepts(conceptIds);
    
    // Create graph
    const graph = createGraph();
    
    // Group concepts by type for collections
    const collections: Array<{
      id: string;
      title: string;
      description?: string;
      count: number;
      icon?: string;
    }> = [];
    
    // Add nodes
    concepts.forEach((concept: Concept) => {
      const node: GraphNode = {
        id: concept.meta.id,
        title: concept.meta.title,
        type: (concept.meta as any).type || 'concept',
        data: {
          description: concept.meta.description,
          difficulty: concept.meta.difficulty,
          tags: concept.meta.tags || [],
          // Store full concept data for later use
          concept: concept.meta
        }
      };
      
      addNode(graph, node);
      
      // Track collections
      if (node.type === 'collection') {
        collections.push({
          id: node.id,
          title: node.title,
          description: node.data?.description,
          count: 0, // Will update later
          icon: node.id.includes('kalkulus') ? '📐' : '📚'
        });
      }
    });
    
    // Extract and add edges
    const relations = extractRelations(concepts);
    relations.forEach((relation: { from: string; to: string; type: string }) => {
      const edge: GraphEdge = {
        from: relation.from,
        to: relation.to,
        type: relation.type as GraphEdge['type']
      };
      addEdge(graph, edge);
      
      // Update collection counts
      if (relation.type === 'part-of') {
        const collection = collections.find(c => c.id === relation.to);
        if (collection) {
          collection.count++;
        }
      }
    });
    
    // Convert Map to array for serialization
    const serializedGraph = {
      nodes: Array.from(graph.nodes.values()),
      edges: graph.edges
    };
    
    // Sort collections by ID
    collections.sort((a, b) => a.id.localeCompare(b.id));
    
    console.log('Graph data prepared:', {
      nodeCount: serializedGraph.nodes.length,
      edgeCount: serializedGraph.edges.length,
      collections: collections.length
    });
    
    return {
      graph: serializedGraph,
      collections
    };
  } catch (err) {
    console.error('Failed to load graph data:', err);
    throw error(500, 'Failed to load graph data');
  }
};