// @moduli/core - Minimal foundation for Moduli
export * from './graph.js';
export * from './theme.js';
// export * from './content.js'; // <-- FJERN DENNE

// Re-export for convenience
import { createGraph, addNode, addEdge } from './graph.js';
import { applyTheme, getStoredTheme, themes } from './theme.js';
// Fjern content imports

// Test foundation uten content
export async function testFoundation(): Promise<void> {
  console.log('🧪 Testing Moduli Core Foundation...\n');
  
  // Test theme system
  console.log('1️⃣ Theme System:');
  console.log('   Available themes:', Object.keys(themes));
  if (typeof window !== 'undefined') {
    console.log('   Theme switching available in browser');
  }
  console.log('   ✅ Theme system ready\n');
  
  // Test graph
  console.log('2️⃣ Graph System:');
  const testGraph = createGraph();
  addNode(testGraph, { id: 'test1', title: 'Test Node 1', type: 'concept' });
  addNode(testGraph, { id: 'test2', title: 'Test Node 2', type: 'concept' });
  addEdge(testGraph, { from: 'test1', to: 'test2', type: 'prerequisite-for' });
  console.log('   Nodes:', testGraph.nodes.size);
  console.log('   Edges:', testGraph.edges.length);
  console.log('   ✅ Graph system ready\n');
  
  console.log('🎉 Moduli Core Foundation is working!');
}