# Knowledge Graph Desktop App

Main Electron application that integrates all modules.

## Installation

```bash
npm install
npm run build
```

## Development

```bash
npm run dev
```

## Building

```bash
npm run build
```

This will create platform-specific installers in the `out/` directory.

## Architecture

The desktop app integrates:

- `@kg/core` - Core types and store
- `@kg/rdf` - RDF I/O
- `@kg/ontology` - Ontology management
- `@kg/sparql` - SPARQL queries
- `@kg/reasoning` - Reasoning engine
- `@kg/visualization` - Graph visualization

## License

MIT
