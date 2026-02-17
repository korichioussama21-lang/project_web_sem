/**
 * URI Utilities
 */

/**
 * Extract local name from URI
 * @example getLocalName('http://example.org/pizza#Margherita') => 'Margherita'
 */
export function getLocalName(uri: string): string {
    // Try # first, then /
    const hashIndex = uri.lastIndexOf('#');
    if (hashIndex !== -1) {
        return uri.slice(hashIndex + 1);
    }

    const slashIndex = uri.lastIndexOf('/');
    if (slashIndex !== -1) {
        return uri.slice(slashIndex + 1);
    }

    return uri;
}

/**
 * Extract namespace from URI
 * @example getNamespace('http://example.org/pizza#Margherita') => 'http://example.org/pizza#'
 */
export function getNamespace(uri: string): string {
    const hashIndex = uri.lastIndexOf('#');
    if (hashIndex !== -1) {
        return uri.slice(0, hashIndex + 1);
    }

    const slashIndex = uri.lastIndexOf('/');
    if (slashIndex !== -1) {
        return uri.slice(0, slashIndex + 1);
    }

    return uri;
}

/**
 * Check if string is a valid URI
 */
export function isValidURI(str: string): boolean {
    try {
        new URL(str);
        return true;
    } catch {
        return false;
    }
}

/**
 * Generate a blank node ID
 */
let blankNodeCounter = 0;
export function generateBlankNodeId(): string {
    return `_:b${blankNodeCounter++}`;
}
