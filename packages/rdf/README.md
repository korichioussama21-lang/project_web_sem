# @kg/rdf

RDF I/O and Statistics module for Knowledge Graph Desktop.

## Responsable

**Membre A** - See [Member Documentation](../../docs/members/02-rdf-io-stats.md)

## Features

- ✅ Load RDF (Turtle, RDF/XML, N-Triples)
- ✅ Export RDF (Turtle, RDF/XML, N-Triples)
- ✅ Graph statistics
- ✅ Auto-format detection
- ✅ Round-trip support

## Installation

```bash
npm install
npm run build
```

## Usage

```typescript
import { RDFManager } from '@kg/rdf';

const manager = new RDFManager();

// Load from file
await manager.loadFromFile('data.ttl');

// Get statistics
const stats = manager.getStats();
console.log(`Loaded ${stats.totalTriples} triples`);

// Export
const ntriples = await manager.export('n-triples');
```

## Demo

```bash
npm run demo
```

## Testing

```bash
npm test
```

## License

MIT
