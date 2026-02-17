# @kg/ontology

Ontology Management module for Knowledge Graph Desktop.

## Responsable

**Membre B** - See [Member Documentation](../../docs/members/03-ontology-management.md)

## Features

- ✅ Load OWL/RDFS ontologies
- ✅ Extract classes and properties
- ✅ Build class hierarchy
- ✅ Build property hierarchy
- ✅ Domain/range extraction

## Installation

```bash
npm install
npm run build
```

## Usage

```typescript
import { OntologyManager } from '@kg/ontology';

const manager = new OntologyManager();

// Load ontology
await manager.loadOntology(owlData, 'owl');

// Get classes
const classes = manager.getClasses();

// Get hierarchy
const hierarchy = manager.getClassHierarchy();
```

## Demo

```bash
npm run demo
```

## License

MIT
