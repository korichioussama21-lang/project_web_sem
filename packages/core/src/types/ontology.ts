/**
 * Ontology Types - OWL/RDFS structures
 */

/**
 * OWL/RDFS Class
 */
export interface ClassNode {
    uri: string;
    label?: string;
    comment?: string;
    deprecated?: boolean;
    subClassOf: string[]; // Parent class URIs
    equivalentClass?: string[];
    disjointWith?: string[];
    children: ClassNode[]; // For hierarchical display
}

/**
 * Property types in OWL
 */
export type PropertyType =
    | 'ObjectProperty'
    | 'DatatypeProperty'
    | 'AnnotationProperty'
    | 'Property'; // RDFS property

/**
 * OWL/RDFS Property
 */
export interface PropertyNode {
    uri: string;
    label?: string;
    comment?: string;
    type: PropertyType;
    domain: string[]; // Class URIs
    range: string[]; // Class URIs or datatype URIs
    subPropertyOf: string[]; // Parent property URIs
    inverseOf?: string;
    functional?: boolean;
    inverseFunctional?: boolean;
    transitive?: boolean;
    symmetric?: boolean;
    children: PropertyNode[]; // For hierarchical display
}

/**
 * Ontology Structure (complete view)
 */
export interface OntologyStructure {
    uri?: string; // Ontology IRI
    version?: string;
    imports: string[]; // Imported ontology URIs
    classes: ClassNode[];
    properties: PropertyNode[];
    classHierarchy: ClassNode; // Root node (typically owl:Thing)
    propertyHierarchy: PropertyNode; // Root node
}

/**
 * Ontology Metrics
 */
export interface OntologyMetrics {
    totalClasses: number;
    totalObjectProperties: number;
    totalDatatypeProperties: number;
    totalAnnotationProperties: number;
    maxDepth: number; // Maximum class hierarchy depth
    axiomCount: number;
}
