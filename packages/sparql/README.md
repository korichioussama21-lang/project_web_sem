# @kg/sparql

SPARQL Query Engine module for Knowledge Graph Desktop.

## Responsable

**Membre C** - See [Member Documentation](../../docs/members/04-sparql-engine.md)

## Features

- ✅ Execute SELECT, CONSTRUCT, ASK queries
- ✅ Query validation
- ✅ Query history
- ✅ Result export (CSV, JSON, XML)
- ✅ Auto-completion support (optional)

## Installation

```bash
npm install
npm run build
```

## Usage

```typescript
import { QueryManager } from '@kg/sparql';
import { RDFStore } from '@kg/core';

const store = new RDFStore();
const queryManager = new QueryManager();

// Execute query
const result = await queryManager.execute(sparqlQuery, store);
console.log(result.bindings);

// Export results
const csv = await queryManager.exportResult(result, 'csv');
```

## Demo

```bash
npm run demo
```

## License

MIT
