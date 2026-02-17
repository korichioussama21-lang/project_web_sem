/**
 * Graph Mapper - Convert RDF triples to Cytoscape graph format
 */

import { Triple, GraphNode, GraphEdge, GraphData } from '@kg/core';
import { getLocalName } from '@kg/core';

export class GraphMapper {
    /**
     * Convert RDF triples to Cytoscape graph data
     */
    static triplesToGraphData(triples: Triple[]): GraphData {
        const nodes = new Map<string, GraphNode>();
        const edges: GraphEdge[] = [];

        for (const triple of triples) {
            const subjId = this.getNodeId(triple.subject);
            const objId = this.getNodeId(triple.object);
            const predId = triple.predicate.value;

            // Add subject node
            if (!nodes.has(subjId)) {
                nodes.set(subjId, this.createNode(triple.subject));
            }

            // Add object node
            if (!nodes.has(objId)) {
                nodes.set(objId, this.createNode(triple.object));
            }

            // Add edge
            edges.push({
                id: `${subjId}-${predId}-${objId}`,
                source: subjId,
                target: objId,
                label: getLocalName(predId),
                predicate: predId,
            });
        }

        return {
            nodes: Array.from(nodes.values()),
            edges,
        };
    }

    private static getNodeId(term: any): string {
        return term.value;
    }

    private static createNode(term: any): GraphNode {
        const id = term.value;
        const label = term.type === 'Literal' ? term.value : getLocalName(id);

        return {
            id,
            label: label.length > 30 ? label.substring(0, 30) + '...' : label,
            type: term.type === 'Literal' ? 'literal' : 'resource',
            uri: term.type !== 'Literal' ? id : undefined,
        };
    }
}
