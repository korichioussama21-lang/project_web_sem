/**
 * SPARQL Query Types
 */

import { Triple } from './rdf';

/**
 * SPARQL Query types
 */
export type QueryType = 'SELECT' | 'CONSTRUCT' | 'ASK' | 'DESCRIBE';

/**
 * Variable binding (for SELECT results)
 */
export interface Binding {
    [variable: string]: string | number | boolean; // Variable name → value
}

/**
 * SPARQL Query Result
 */
export interface QueryResult {
    type: QueryType;

    // SELECT results
    variables?: string[]; // Variable names (without ?)
    bindings?: Binding[]; // Array of variable bindings

    // CONSTRUCT/DESCRIBE results
    triples?: Triple[];

    // ASK results
    boolean?: boolean;

    // Metadata
    executionTime?: number; // milliseconds
    count?: number; // Number of results
}

/**
 * Query History Entry
 */
export interface QueryHistoryEntry {
    id: string;
    query: string;
    timestamp: Date;
    result: QueryResult;
    error?: string;
}

/**
 * SPARQL Endpoint Configuration
 */
export interface SPARQLEndpoint {
    url: string;
    type: 'local' | 'remote';
    authentication?: {
        username: string;
        password: string;
    };
}
