# @kg/core

Core package for Knowledge Graph Desktop application.

## Description

This package provides:

- **Shared TypeScript types** for RDF, OWL, SPARQL, and reasoning
- **Interfaces** that all modules must implement
- **Base RDFStore** implementation using rdflib.js
- **Utility functions** for namespaces and URIs

## Installation

```bash
npm install
npm run build
```

## Usage

```typescript
import { RDFStore, Triple, IRDFStore } from '@kg/core';

// Create a store
const store = new RDFStore();

// Load RDF data
await store.load(turtleData, 'turtle');

// Get statistics
const stats = store.getStats();
console.log(`Loaded ${stats.totalTriples} triples`);

// Get all triples
const triples = store.getTriples();
```

## Exported Types

### RDF

- `Triple`, `Quad`, `NamedNode`, `BlankNode`, `Literal`
- `RDFFormat`, `GraphStats`, `PrefixMap`

### Ontology

- `ClassNode`, `PropertyNode`, `OntologyStructure`

### SPARQL

- `QueryType`, `QueryResult`, `Binding`, `QueryHistoryEntry`

### Reasoning

- `ReasoningMode`, `InferredTriple`, `ReasoningConfig`, `ReasoningResult`

### Graph (Visualization)

- `GraphNode`, `GraphEdge`, `GraphData`, `LayoutAlgorithm`

## Interfaces

All modules must implement these interfaces:

- `IRDFStore` - RDF data management (Membre A)
- `IOntologyStore` - Ontology management (Membre B)
- `IQueryEngine` - SPARQL queries (Membre C)
- `IReasoningEngine` - Reasoning (Responsable)

## License

MIT
