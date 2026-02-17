/**
 * Reasoning Types - Inference engine configuration
 */

import { Triple } from './rdf';

/**
 * Reasoning modes/formalisms
 */
export type ReasoningMode =
    | 'RDFS' // RDF Schema reasoning
    | 'OWL_RL' // OWL 2 RL profile
    | 'OWL_EL' // OWL 2 EL profile
    | 'OWL_QL' // OWL 2 QL profile
    | 'OWL_DL' // OWL 2 DL (full)
    | 'NONE'; // No reasoning

/**
 * Inferred Triple (with provenance)
 */
export interface InferredTriple extends Triple {
    inferred: true;
    rule?: string; // Inference rule used (e.g., "rdfs:subClassOf transitivity")
    source?: Triple[]; // Source triples that led to this inference
}

/**
 * Reasoning Configuration
 */
export interface ReasoningConfig {
    enabled: boolean;
    mode: ReasoningMode;
    includeInferred: boolean; // Whether to include inferred triples in query results
    maxInferences?: number; // Limit number of inferences (performance)
}

/**
 * Reasoning Result
 */
export interface ReasoningResult {
    inferredTriples: InferredTriple[];
    totalInferences: number;
    executionTime: number; // milliseconds
    consistencyCheck: boolean; // Whether ontology is consistent
    errors?: string[];
}

/**
 * Supported reasoner engines
 */
export type ReasonerEngine = 'jena' | 'pellet' | 'hermit' | 'elk' | 'built-in';
