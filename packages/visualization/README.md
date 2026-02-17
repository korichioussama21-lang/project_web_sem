# @kg/visualization

Graph Visualization module for Knowledge Graph Desktop.

## Responsable

**Membre D** - See [Member Documentation](../../docs/members/05-visualization-ui.md)

## Features

- ✅ RDF to Cytoscape graph mapping
- ✅ React components (GraphView, etc.)
- ✅ Multiple layout algorithms
- ✅ Interactive graph (zoom, pan, select)
- ✅ Dark/Light theme support

## Installation

```bash
npm install
npm run build
```

## Usage

```typescript
import { GraphMapper } from '@kg/visualization';

const triples = store.getTriples();
const graphData = GraphMapper.triplesToGraphData(triples);

// Use with Cytoscape or React component
```

## License

MIT
