/**
 * Standard RDF/OWL Namespaces
 */

export const NAMESPACES = {
    RDF: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
    RDFS: 'http://www.w3.org/2000/01/rdf-schema#',
    OWL: 'http://www.w3.org/2002/07/owl#',
    XSD: 'http://www.w3.org/2001/XMLSchema#',
    FOAF: 'http://xmlns.com/foaf/0.1/',
    DC: 'http://purl.org/dc/elements/1.1/',
    DCTERMS: 'http://purl.org/dc/terms/',
    SKOS: 'http://www.w3.org/2004/02/skos/core#',
} as const;

/**
 * Standard prefix mappings
 */
export const STANDARD_PREFIXES: Record<string, string> = {
    rdf: NAMESPACES.RDF,
    rdfs: NAMESPACES.RDFS,
    owl: NAMESPACES.OWL,
    xsd: NAMESPACES.XSD,
    foaf: NAMESPACES.FOAF,
    dc: NAMESPACES.DC,
    dcterms: NAMESPACES.DCTERMS,
    skos: NAMESPACES.SKOS,
};

/**
 * Get full URI from prefixed name
 * @example expandPrefix('rdf:type') => 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type'
 */
export function expandPrefix(prefixed: string, customPrefixes?: Record<string, string>): string {
    const [prefix, localName] = prefixed.split(':');
    if (!localName) return prefixed; // Not a prefixed name

    const prefixes = { ...STANDARD_PREFIXES, ...customPrefixes };
    const namespace = prefixes[prefix];

    if (!namespace) {
        throw new Error(`Unknown prefix: ${prefix}`);
    }

    return namespace + localName;
}

/**
 * Get prefixed name from full URI
 * @example compactURI('http://www.w3.org/1999/02/22-rdf-syntax-ns#type') => 'rdf:type'
 */
export function compactURI(uri: string, customPrefixes?: Record<string, string>): string {
    const prefixes = { ...STANDARD_PREFIXES, ...customPrefixes };

    for (const [prefix, namespace] of Object.entries(prefixes)) {
        if (uri.startsWith(namespace)) {
            return `${prefix}:${uri.slice(namespace.length)}`;
        }
    }

    return uri; // No matching prefix
}
