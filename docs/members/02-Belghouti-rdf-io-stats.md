# Module: RDF I/O & Statistics

**Membre A - Gestion des Graphes RDF**  
**Documentation officielle du module**

---

## 🎯 Responsabilités

Tu es responsable de **toute la couche I/O RDF** et des **statistiques de graphe**.

### Fonctionnalités obligatoires

1. **Import RDF**
   - Charger des fichiers Turtle (`.ttl`)
   - Charger des fichiers RDF/XML (`.rdf`, `.owl`)
   - Charger des fichiers N-Triples (`.nt`)

2. **Export RDF**
   - Exporter vers Turtle
   - Exporter vers RDF/XML
   - Exporter vers N-Triples

3. **Statistiques de graphe**
   - Nombre total de triplets
   - Nombre de sujets uniques
   - Nombre de prédicats uniques
   - Nombre d'objets uniques
   - Répartition littéraux vs ressources (IRI)
   - Top 10 prédicats les plus fréquents

---

## 📦 Livrables attendus

### Structure du module (`packages/rdf/`)

```
packages/rdf/
├── src/
│   ├── loaders/
│   │   ├── TurtleLoader.ts
│   │   ├── RDFXMLLoader.ts
│   │   └── NTriplesLoader.ts
│   ├── exporters/
│   │   ├── TurtleExporter.ts
│   │   ├── RDFXMLExporter.ts
│   │   └── NTriplesExporter.ts
│   ├── stats/
│   │   └── GraphStatistics.ts
│   ├── RDFManager.ts        # Classe principale
│   └── index.ts
├── demo/
│   └── index.ts             # Démo standalone
├── tests/
│   └── rdf.test.ts
├── package.json
├── tsconfig.json
└── README.md
```

### Classe principale : `RDFManager`

```typescript
import { IRDFStore, GraphStats, RDFFormat } from '@kg/core';

export class RDFManager implements IRDFStore {
  async load(data: string, format: RDFFormat): Promise<void> {
    // Ton implémentation
  }

  async loadFromFile(filePath: string): Promise<void> {
    // Auto-détection du format basée sur l'extension
  }

  async export(format: RDFFormat): Promise<string> {
    // Ton implémentation
  }

  getStats(): GraphStats {
    return {
      totalTriples: 0,
      uniqueSubjects: 0,
      uniquePredicates: 0,
      uniqueObjects: 0,
      literalCount: 0,
      iriCount: 0,
      topPredicates: [],
    };
  }

  getTriples(): Triple[] {
    // Retourne tous les triplets
  }

  clear(): void {
    // Vide le store
  }
}
```

---

## 🔒 Restrictions & Contraintes

### ❌ Ce que tu NE dois PAS faire

1. **Pas de raisonnement**  
   → Le raisonnement est géré par le module Reasoning (Responsable)

2. **Pas de requêtes SPARQL**  
   → Les requêtes sont gérées par le module SPARQL (Membre C)

3. **Pas de visualisation**  
   → La visualisation est gérée par le module Visualization (Membre D)

4. **Pas de gestion d'ontologies**  
   → Les ontologies sont gérées par le module Ontology (Membre B)

### ✅ Ce que tu DOIS garantir

1. **Round-trip fiable**  
   → Charger un fichier `.ttl` puis l'exporter en `.ttl` doit donner un résultat équivalent (isomorphe)

2. **Gestion d'erreurs robuste**  
   → Fichiers mal formés → erreur claire avec message explicite

3. **Performance acceptable**  
   → Charger 10,000 triplets en < 2 secondes

4. **Statistiques exactes**  
   → Les chiffres doivent être corrects (vérifiables avec d'autres outils RDF)

---

## 📋 Critères d'acceptation (Definition of Done)

### Import

- [ ] Turtle : charge correctement `samples/pizza.ttl`
- [ ] RDF/XML : charge correctement `samples/foaf.rdf`
- [ ] N-Triples : charge correctement `samples/dbpedia.nt`
- [ ] Gestion d'erreurs : fichier mal formé → erreur claire
- [ ] Auto-détection format basée sur extension (`.ttl`, `.rdf`, `.nt`)

### Export

- [ ] Export Turtle : syntaxe valide (vérifiable avec `rapper` ou autre parser)
- [ ] Export RDF/XML : syntaxe valide (vérifiable avec `riot`)
- [ ] Export N-Triples : syntaxe valide
- [ ] Round-trip : `load(file) → export() → load() → export()` donne le même graphe

### Statistiques

- [ ] Compte correct du nombre de triplets
- [ ] Compte correct des sujets/prédicats/objets uniques
- [ ] Distinction correcte littéraux vs IRI
- [ ] Top prédicates : liste triée par fréquence décroissante

### Démo

- [ ] Script `npm run demo:rdf` exécutable
- [ ] Démo charge un fichier → affiche stats → exporte → recharge → compare
- [ ] Output console clair et lisible

---

## 🛠️ Technologies recommandées

### Bibliothèques RDF (choix recommandés)

1. **rdflib.js** (recommandé)

   ```bash
   npm install rdflib
   ```

   - Mature, bien maintenu
   - Support Turtle, RDF/XML, N-Triples
   - Utilisé par Solid Project (Tim Berners-Lee)

2. **N3.js** (alternative)
   ```bash
   npm install n3
   ```

   - Très rapide
   - Excellent support Turtle
   - Bon pour les gros fichiers

### Exemple d'utilisation (rdflib.js)

```typescript
import { graph, parse, serialize } from 'rdflib';

export class TurtleLoader {
  async load(data: string): Promise<void> {
    const store = graph();
    parse(data, store, 'https://example.org/', 'text/turtle');
    // ... stocker dans RDFStore
  }
}
```

---

## 📚 Ressources

### Spécifications RDF

- [RDF 1.1 Primer](https://www.w3.org/TR/rdf11-primer/)
- [Turtle Specification](https://www.w3.org/TR/turtle/)
- [RDF/XML Specification](https://www.w3.org/TR/rdf-syntax-grammar/)
- [N-Triples Specification](https://www.w3.org/TR/n-triples/)

### Bibliothèques

- [rdflib.js Documentation](https://linkeddata.github.io/rdflib.js/doc/)
- [N3.js Documentation](https://github.com/rdfjs/N3.js)

### Outils de validation

- [Apache Jena `riot`](https://jena.apache.org/documentation/io/) : valider syntaxe RDF
- [RDF Translator](http://rdf-translator.appspot.com/) : convertir entre formats

---

## 🧪 Tests requis

### Round-trip test (critique)

```typescript
describe('RDF Round-trip', () => {
  it('should preserve graph structure', async () => {
    const manager = new RDFManager();

    // 1. Charger le fichier original
    await manager.loadFromFile('samples/pizza.ttl');
    const stats1 = manager.getStats();

    // 2. Exporter en Turtle
    const exported = await manager.export('turtle');

    // 3. Recharger l'export
    manager.clear();
    await manager.load(exported, 'turtle');
    const stats2 = manager.getStats();

    // 4. Vérifier l'isomorphisme
    expect(stats1.totalTriples).toBe(stats2.totalTriples);
    expect(stats1.uniqueSubjects).toBe(stats2.uniqueSubjects);
  });
});
```

---

## 🤝 Interfaces avec autres modules

### Fournit à (exports)

- **Core** : implémentation de `IRDFStore`
- **SPARQL (Membre C)** : graphe RDF pour exécuter les requêtes
- **Reasoning (Responsable)** : graphe RDF pour inférer de nouveaux triplets
- **Visualization (Membre D)** : triplets pour affichage

### Dépend de (imports)

- **Core uniquement** : types `IRDFStore`, `GraphStats`, `RDFFormat`, `Triple`

### Règle d'or

❗ **Ton module ne doit dépendre d'AUCUN autre module étudiant**  
→ Seulement de `@kg/core` (géré par le Responsable)

---

## ⚠️ Points d'attention

1. **Encodage**  
   → Toujours utiliser UTF-8 pour les fichiers RDF

2. **Namespaces**  
   → Préserver les préfixes (ex: `rdf:`, `rdfs:`, `owl:`) lors de l'export Turtle

3. **Blank nodes**  
   → Gérer correctement les nœuds anonymes (`_:b0`, `_:b1`, etc.)

4. **Gros fichiers**  
   → Si un fichier fait > 1 million de triplets, afficher un avertissement

5. **URIs invalides**  
   → Valider que les URIs sont bien formées (pas d'espaces, etc.)

---

## 📊 Exemple de démo attendue

```bash
$ npm run demo:rdf

=== RDF I/O & Statistics Demo ===

1. Loading Turtle file: samples/pizza.ttl
   ✓ Loaded in 234ms

2. Graph Statistics:
   - Total triples: 945
   - Unique subjects: 100
   - Unique predicates: 12
   - Unique objects: 234
   - Literals: 89
   - IRIs: 145

   Top predicates:
   1. rdf:type (245 occurrences)
   2. rdfs:subClassOf (123 occurrences)
   3. pizza:hasTopping (89 occurrences)

3. Export to RDF/XML
   ✓ Exported in 145ms

4. Re-import exported RDF/XML
   ✓ Loaded in 198ms

5. Verify round-trip
   ✓ Graph structure preserved (945 triples)

=== Demo completed successfully ===
```

---

## 📞 Support

**Questions fréquentes** :

- "Quelle lib RDF choisir ?" → `rdflib.js` (recommandé)
- "Comment gérer les blank nodes ?" → voir [RDF spec](https://www.w3.org/TR/rdf11-concepts/#section-blank-nodes)
- "Mon export Turtle est invalide" → valider avec `riot` (Jena)

**Contact** : Responsable du projet (Membre coordinateur)

---

**Date de livraison** : cf. planning général  
**Revue de code** : obligatoire avant merge dans `main`
