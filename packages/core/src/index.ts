/**
 * Core Package - Shared types and interfaces
 * 
 * This package defines all shared types, interfaces, and base implementations
 * used across the Knowledge Graph Desktop application.
 */

// RDF Types
export * from './types/rdf';
export * from './types/ontology';
export * from './types/query';
export * from './types/reasoning';
export * from './types/graph';

// Interfaces
export * from './interfaces';

// Store implementation
export * from './store/RDFStore';

// Utilities
export * from './utils/namespaces';
export * from './utils/uri';
