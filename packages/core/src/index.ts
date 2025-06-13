// Browser-safe exports for @moduli/core
export * from './graph.js';
export * from './theme.js';

// Test function
export async function testFoundation() {
  console.log('🎯 Moduli Foundation Test');
  
  const { createGraph, addNode, addEdge, getNeighbors } = await import('./graph.js');
  
  const graph = createGraph();
  addNode(graph, { id: 'test1', title: 'Test 1', type: 'concept' });
  addNode(graph, { id: 'test2', title: 'Test 2', type: 'concept' });
  addEdge(graph, { from: 'test1', to: 'test2', type: 'related-to' });
  
  const neighbors = getNeighbors(graph, 'test1');
  console.log('Neighbors of test1:', neighbors);
  
  const { applyTheme, themes } = await import('./theme.js');
  console.log('Available themes:', Object.keys(themes));
  applyTheme('dark');
  
  console.log('✅ Foundation test complete!');
}
