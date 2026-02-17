# Module: Visualization & Desktop UI

**Membre D - Interface Utilisateur & Visualisation de Graphes**  
**Documentation officielle du module**

---

## 🎯 Responsabilités

Tu es responsable de **toute l'interface utilisateur** et de la **visualisation de graphes RDF**.

### Fonctionnalités obligatoires

1. **Application Desktop (Electron)**
   - Fenêtre principale de l'application
   - Menu (Fichier, Édition, Affichage, Aide)
   - Barre d'outils
   - Intégration de tous les modules

2. **Visualisation de Graphes**
   - Afficher les triplets RDF sous forme de graphe (nœuds + arêtes)
   - Interaction : zoom, pan, sélection de nœuds
   - Différents algorithmes de disposition (layout):
     - Force-directed (force)
     - Hierarchical (tree)
     - Grid (optionnel)

3. **Interface des modules**
   - Panneau RDF : import/export, stats
   - Panneau Ontologie : hiérarchie de classes/propriétés
   - Panneau SPARQL : éditeur de requêtes, résultats
   - Panneau Raisonnement : activer/désactiver, mode, triplets inférés

4. **Features optionnelles (retenues)**
   - Thème sombre/clair (switch dans les paramètres)

---

## 📦 Livrables attendus

### Structure du module (`packages/visualization/` + `apps/desktop/`)

```
packages/visualization/
├── src/
│   ├── components/
│   │   ├── GraphView/
│   │   │   ├── GraphView.tsx        # Composant principal
│   │   │   ├── GraphControls.tsx    # Zoom, pan, layouts
│   │   │   └── NodeRenderer.tsx
│   │   ├── RDFPanel/
│   │   │   ├── RDFPanel.tsx
│   │   │   └── StatsDisplay.tsx
│   │   ├── OntologyPanel/
│   │   │   ├── OntologyPanel.tsx
│   │   │   └── ClassTree.tsx
│   │   ├── SPARQLPanel/
│   │   │   ├── SPARQLPanel.tsx
│   │   │   ├── QueryEditor.tsx      # Monaco editor
│   │   │   └── ResultsTable.tsx
│   │   └── ReasoningPanel/
│   │       ├── ReasoningPanel.tsx
│   │       └── InferredTriplesView.tsx
│   ├── graph/
│   │   ├── GraphMapper.ts           # RDF → Cytoscape data
│   │   └── LayoutManager.ts
│   ├── theme/
│   │   ├── ThemeProvider.tsx
│   │   ├── darkTheme.ts
│   │   └── lightTheme.ts
│   └── index.ts
└── package.json

apps/desktop/
├── src/
│   ├── main/
│   │   ├── main.ts                  # Electron main process
│   │   └── menu.ts
│   ├── renderer/
│   │   ├── App.tsx                  # React app principale
│   │   ├── index.tsx
│   │   └── index.html
│   └── preload.ts
├── electron-builder.json
├── package.json
└── tsconfig.json
```

### Composant principal : `GraphView`

```typescript
import React, { useEffect, useRef } from 'react';
import cytoscape from 'cytoscape';

interface GraphViewProps {
  triples: Triple[];
  layout: 'force' | 'hierarchical' | 'grid';
}

export const GraphView: React.FC<GraphViewProps> = ({ triples, layout }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cyRef = useRef<cytoscape.Core>();

  useEffect(() => {
    if (!containerRef.current) return;

    // Convertir triplets RDF → éléments Cytoscape
    const elements = GraphMapper.triplesToElements(triples);

    // Initialiser Cytoscape
    cyRef.current = cytoscape({
      container: containerRef.current,
      elements,
      style: [
        {
          selector: 'node',
          style: {
            'background-color': '#0074D9',
            'label': 'data(label)',
          },
        },
        {
          selector: 'edge',
          style: {
            'line-color': '#ccc',
            'target-arrow-color': '#ccc',
            'target-arrow-shape': 'triangle',
            'label': 'data(label)',
          },
        },
      ],
      layout: { name: layout },
    });
  }, [triples, layout]);

  return <div ref={containerRef} style={{ width: '100%', height: '600px' }} />;
};
```

---

## 🔒 Restrictions & Contraintes

### ❌ Ce que tu NE dois PAS faire

1. **Pas de logique métier RDF/SPARQL**  
   → Tu consommes les modules RDF, Ontology, SPARQL, Reasoning (ne réimplémente pas leur logique)

2. **Pas d'animations complexes**  
   → Priorise stabilité et lisibilité > animations fancy

3. **Pas de features UI "bonus"**  
   → Uniquement les features spécifiées (pas de 3D, pas de VR 😄)

### ✅ Ce que tu DOIS garantir

1. **Réactivité**  
   → L'UI ne doit jamais freeze (max 16ms par frame = 60 FPS)

2. **Accessibilité**  
   → Boutons avec labels clairs, navigation au clavier

3. **Gestion d'erreurs UI**  
   → Afficher les erreurs des modules (RDF, SPARQL, etc.) de manière claire

4. **Performance**  
   → Visualiser 1000 nœuds sans lag (pour très gros graphes, afficher un sous-ensemble)

---

## 📋 Critères d'acceptation (Definition of Done)

### Application Desktop

- [ ] L'app Electron démarre avec `npm run dev`
- [ ] Menu File : Open RDF, Save, Export, Quit
- [ ] Menu View : Toggle Dark/Light Theme

### Visualisation

- [ ] Graphe s'affiche correctement (nœuds = ressources, arêtes = prédicats)
- [ ] Zoom in/out fonctionne (molette souris)
- [ ] Pan (déplacement) fonctionne (drag & drop)
- [ ] Sélection de nœud affiche les détails (URI, propriétés)
- [ ] Switch layout : force → hierarchical fonctionne

### Panels

- [ ] RDF Panel : boutons import/export, affichage stats
- [ ] Ontology Panel : arbre de classes cliquable
- [ ] SPARQL Panel : éditeur + bouton "Execute" + affichage résultats
- [ ] Reasoning Panel : toggle ON/OFF + sélecteur mode + liste triplets inférés

### Thème

- [ ] Thème clair par défaut
- [ ] Switch vers thème sombre fonctionne
- [ ] Préférence sauvegardée (localStorage)

### Démo

- [ ] Script `npm run demo:viz` lance l'app avec données de démo
- [ ] Charger `samples/pizza.ttl` → visualiser → exécuter requête SPARQL → activer raisonnement

---

## 🛠️ Technologies recommandées

### Desktop (Electron)

```bash
npm install electron
npm install --save-dev electron-builder
```

### UI Framework (React)

```bash
npm install react react-dom
npm install --save-dev @types/react @types/react-dom
```

### Graph Visualization (Cytoscape.js)

```bash
npm install cytoscape
npm install --save-dev @types/cytoscape
```

### SPARQL Editor (Monaco)

```bash
npm install monaco-editor
npm install --save-dev monaco-editor-webpack-plugin
```

### Théming

```bash
npm install @emotion/react @emotion/styled
# ou
npm install styled-components
```

---

## 📚 Ressources

### Electron

- [Electron Documentation](https://www.electronjs.org/docs/latest)
- [Electron + React Tutorial](https://www.electronjs.org/docs/latest/tutorial/tutorial-prerequisites)

### Cytoscape.js

- [Cytoscape.js Documentation](https://js.cytoscape.org/)
- [Cytoscape Layouts](https://js.cytoscape.org/#layouts)
- [Cytoscape Style](https://js.cytoscape.org/#style)

### React + TypeScript

- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)

### Monaco Editor

- [Monaco Editor Samples](https://microsoft.github.io/monaco-editor/playground.html)

---

## 🧪 Tests requis

### Test : Conversion RDF → Cytoscape

```typescript
describe('GraphMapper', () => {
  it('should convert triples to Cytoscape elements', () => {
    const triples: Triple[] = [
      {
        subject: 'http://example.org/Alice',
        predicate: 'http://xmlns.com/foaf/0.1/knows',
        object: 'http://example.org/Bob',
      },
    ];

    const elements = GraphMapper.triplesToElements(triples);

    expect(elements.nodes).toHaveLength(2); // Alice, Bob
    expect(elements.edges).toHaveLength(1); // knows
    expect(elements.nodes[0].data.id).toBe('http://example.org/Alice');
  });
});
```

---

## 🤝 Interfaces avec autres modules

### Consomme (imports)

- **Core** : tous les types (`Triple`, `QueryResult`, etc.)
- **RDF (Membre A)** : `RDFManager` pour import/export/stats
- **Ontology (Membre B)** : `OntologyManager` pour hiérarchies
- **SPARQL (Membre C)** : `QueryManager` pour requêtes
- **Reasoning (Responsable)** : `ReasoningEngine` pour inférences

### Fournit (exports)

- Composants React réutilisables (`GraphView`, `SPARQLPanel`, etc.)

---

## ⚠️ Points d'attention

1. **URIs longues**  
   → Afficher seulement la partie locale dans les labels (ex: `#Alice` au lieu de `http://example.org#Alice`)

2. **Gros graphes**  
   → Si > 1000 nœuds, afficher un avertissement + option "afficher un sous-graphe"

3. **Layout hierarchical**  
   → Nécessite de détecter la racine du graphe (classe `owl:Thing` ou nœud sans parent)

4. **Couleurs**  
   → Classes vs Instances : utiliser des couleurs différentes
   → Triplets inférés vs assertés : utiliser des couleurs différentes

5. **Electron packaging**  
   → Assure-toi que le build final fonctionne (pas seulement dev mode)

---

## 📊 Exemple de démo attendue

```bash
$ npm run demo:viz

[Electron] Starting Knowledge Graph Desktop App...
[INFO] Loading sample data: samples/pizza.ttl
[INFO] Loaded 945 triples

=== Application Window ===

Menu Bar:
  File | Edit | View | Help

Sidebar (Left):
  📁 RDF
  📊 Ontology
  🔍 SPARQL
  🧠 Reasoning

Main View (Center):
  [Graph visualization with 100 nodes, 245 edges]
  Layout: Force-directed
  Zoom: 100%

Bottom Panel:
  Stats: 945 triples | 100 subjects | 12 predicates

=== Interaction Demo ===
1. Click on node "Pizza"
   → Shows details: URI, type, properties

2. Execute SPARQL query:
   SELECT ?pizza WHERE { ?pizza a :Pizza }
   → Results table: 23 pizzas

3. Enable Reasoning (RDFS)
   → Graph updated: +134 inferred triples
   → Inferred edges shown in green

4. Switch to dark theme
   → UI colors updated

=== Demo completed ===
```

---

## 🎨 Mapping RDF → Graphe Visuel

### Règles de conversion

| RDF Element         | Graph Element           | Style      |
| ------------------- | ----------------------- | ---------- |
| Sujet (IRI)         | Node                    | Bleu       |
| Objet (IRI)         | Node                    | Bleu       |
| Objet (Literal)     | Node                    | Vert       |
| Prédicat            | Edge (label)            | Gris       |
| Classe (`rdf:type`) | Node (shape: `hexagon`) | Orange     |
| Triplet inféré      | Edge (dashed)           | Vert clair |

### Exemple : Cytoscape data format

```javascript
{
  nodes: [
    { data: { id: 'Alice', label: 'Alice', type: 'resource' } },
    { data: { id: 'Bob', label: 'Bob', type: 'resource' } },
  ],
  edges: [
    {
      data: {
        id: 'e1',
        source: 'Alice',
        target: 'Bob',
        label: 'knows',
        inferred: false
      }
    },
  ]
}
```

---

## 📞 Support

**Questions fréquentes** :

- "Comment intégrer Monaco ?" → voir [Monaco + Electron guide](https://github.com/microsoft/monaco-editor/blob/main/docs/integrate-electron.md)
- "Comment détecter le format RDF ?" → utilise `RDFManager.loadFromFile()` (auto-détection)
- "Cytoscape est lent" → limite le nombre de nœuds affichés (< 1000)

**Contact** : Responsable du projet (Membre coordinateur)

---

**Date de livraison** : cf. planning général  
**Revue de code** : obligatoire avant merge dans `main`
