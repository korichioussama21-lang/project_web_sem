/**
 * RDF Manager - Main class for RDF I/O and statistics
 * Implements IRDFStore from @kg/core
 */

import { RDFStore } from '@kg/core';

export class RDFManager extends RDFStore {
    constructor() {
        super();
    }

    // Additional RDF-specific methods can be added here
    // The base implementation from RDFStore already provides:
    // - load(), loadFromFile()
    // - export(), exportToFile()
    // - getStats()
    // - getTriples()
    // - addTriple(), removeTriple()
    // - clear()
    // - getPrefixes(), registerPrefix()
}
