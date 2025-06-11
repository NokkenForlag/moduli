import Graph from 'graphology';
import forceAtlas2 from 'graphology-layout-forceatlas2';

export class LayoutManager {
  applyForceLayout(graph: Graph): void {
    // Apply ForceAtlas2 layout
    forceAtlas2.assign(graph, {
      iterations: 100,
      settings: {
        gravity: 1,
        scalingRatio: 10,
        barnesHutOptimize: true,
      }
    });
  }

  getPositions(graph: Graph): Map<string, { x: number; y: number }> {
    const positions = new Map();
    
    graph.forEachNode((node, attributes) => {
      positions.set(node, {
        x: attributes.x || 0,
        y: attributes.y || 0
      });
    });
    
    return positions;
  }

  setPositions(graph: Graph, positions: Map<string, { x: number; y: number }>): void {
    positions.forEach((pos, nodeId) => {
      if (graph.hasNode(nodeId)) {
        graph.mergeNodeAttributes(nodeId, pos);
      }
    });
  }
}
