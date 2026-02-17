# @kg/reasoning

Reasoning Engine module for Knowledge Graph Desktop.

## Responsable

**Responsable** - See [Member Documentation](../../docs/members/01-core-reasoning.md)

## Features

- ✅ RDFS reasoning
- ✅ OWL RL reasoning
- ✅ Configurable modes
- ✅ Enable/disable toggle
- ✅ Inferred triples tracking
- ✅ Consistency checking

## Installation

```bash
npm install
npm run build
```

## Usage

```typescript
import { ReasoningEngine } from '@kg/reasoning';
import { RDFStore } from '@kg/core';

const store = new RDFStore();
const reasoner = new ReasoningEngine();

// Configure
reasoner.configure({
  enabled: true,
  mode: 'RDFS',
  includeInferred: true,
});

// Perform inference
const result = await reasoner.infer(store);
console.log(`Inferred ${result.totalInferences} triples`);
```

## Demo

```bash
npm run demo
```

## License

MIT
