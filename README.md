# Knowledge Graph Desktop Application

Application desktop pour la gestion de graphes de connaissances (RDF/OWL) avec requêtes SPARQL et raisonnement sémantique.

## 🏗️ Architecture

Ce projet est organisé en mono-repo avec 5 modules principaux :

```
knowledge-graph-desktop/
├── packages/
│   ├── core/           # Types partagés + interfaces (Responsable)
│   ├── rdf/            # Gestion RDF I/O & stats (Membre A)
│   ├── ontology/       # Gestion ontologies OWL/RDFS (Membre B)
│   ├── sparql/         # Moteur de requêtes SPARQL (Membre C)
│   ├── reasoning/      # Moteur de raisonnement (Responsable)
│   └── visualization/  # Interface UI + graphe (Membre D)
└── apps/
    └── desktop/        # Application Electron principale
```

## 👥 Équipe (5 membres)

| Rôle            | Module(s)           | Documentation                                                                    |
| --------------- | ------------------- | -------------------------------------------------------------------------------- |
| **Responsable** | Core + Reasoning    | [docs/members/01-core-reasoning.md](docs/members/01-core-reasoning.md)           |
| **Membre A**    | RDF I/O & Stats     | [docs/members/02-rdf-io-stats.md](docs/members/02-rdf-io-stats.md)               |
| **Membre B**    | Ontology Management | [docs/members/03-ontology-management.md](docs/members/03-ontology-management.md) |
| **Membre C**    | SPARQL Engine       | [docs/members/04-sparql-engine.md](docs/members/04-sparql-engine.md)             |
| **Membre D**    | Visualization & UI  | [docs/members/05-visualization-ui.md](docs/members/05-visualization-ui.md)       |

## 🚀 Installation

```bash
# Installation des dépendances
npm install

# Développement
npm run dev

# Build
npm run build

# Tests
npm test

# Démos par module
npm run demo:rdf
npm run demo:ontology
npm run demo:sparql
npm run demo:reasoning
npm run demo:viz
```

## ✨ Fonctionnalités

### Obligatoires

- ✅ Gestion graphes RDF (Turtle, RDF/XML, N-Triples)
- ✅ Gestion ontologies (OWL, RDFS)
- ✅ Requêtes SPARQL (SELECT, CONSTRUCT, ASK)
- ✅ Raisonnement (RDFS + OWL RL/EL/QL/DL)
- ✅ Visualisation interactive

### Optionnelles (retenues)

- ✅ Auto-complétion + coloration SPARQL
- ✅ Export résultats (CSV, JSON, XML)
- ✅ Thème sombre/clair

## 📚 Stack Technique

- **Desktop**: Electron + TypeScript
- **UI**: React + Cytoscape.js
- **RDF/SPARQL**: rdflib.js + SPARQL.js
- **Reasoning**: Apache Jena (sidecar)
- **Build**: npm workspaces + TypeScript

## 📖 Documentation

- [Architecture détaillée](docs/architecture.md)
- [Guide de contribution](docs/CONTRIBUTING.md)
- [Documentation par membre](docs/members/)

## 📄 License

MIT
