export interface GraphNode {
    id: string;
    title: string;
    type: 'concept' | 'hub' | 'exploration';
    tags: string[];
    position?: {
        x: number;
        y: number;
    };
    metadata: {
        difficulty: number;
        completed?: boolean;
        locked?: boolean;
    };
}
export interface GraphEdge {
    id: string;
    source: string;
    target: string;
    type: 'prerequisite' | 'enables' | 'related';
    metadata?: {
        strength?: number;
        bidirectional?: boolean;
    };
}
export interface GraphState {
    nodes: Map<string, GraphNode>;
    edges: Map<string, GraphEdge>;
    layout: 'force' | 'hierarchical' | 'radial';
    viewport: {
        x: number;
        y: number;
        zoom: number;
    };
    selection: Set<string>;
}
//# sourceMappingURL=graph.d.ts.map