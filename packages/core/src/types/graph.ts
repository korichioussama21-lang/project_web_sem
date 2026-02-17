/**
 * Graph Types - For visualization
 */

/**
 * Graph Node (for visualization)
 */
export interface GraphNode {
    id: string; // URI or blank node ID
    label: string; // Display label
    type: 'resource' | 'literal' | 'class' | 'property';
    uri?: string; // Full URI
    properties?: Record<string, string[]>; // Additional properties
    inferred?: boolean; // Whether this node comes from reasoning
}

/**
 * Graph Edge (for visualization)
 */
export interface GraphEdge {
    id: string;
    source: string; // Source node ID
    target: string; // Target node ID
    label: string; // Predicate label
    predicate: string; // Full predicate URI
    inferred?: boolean; // Whether this edge is inferred
}

/**
 * Graph Data (for visualization libraries like Cytoscape)
 */
export interface GraphData {
    nodes: GraphNode[];
    edges: GraphEdge[];
}

/**
 * Layout Algorithm
 */
export type LayoutAlgorithm = 'force' | 'hierarchical' | 'grid' | 'circular' | 'breadthfirst';

/**
 * Graph View Configuration
 */
export interface GraphViewConfig {
    layout: LayoutAlgorithm;
    showLiterals: boolean;
    showInferred: boolean;
    maxNodes?: number; // Limit for performance
    highlightedNodes?: string[]; // Node IDs to highlight
}
