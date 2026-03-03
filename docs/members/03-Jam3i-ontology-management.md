# Module: Ontology Management

**Membre B - Gestion des Ontologies OWL/RDFS**  
**Documentation officielle du module**

---

## 🎯 Responsabilités

Tu es responsable de **toute la gestion des ontologies** (OWL et RDFS).

### Fonctionnalités obligatoires

1. **Import d'ontologies**
   - Charger OWL (OWL 2)
   - Charger RDFS

2. **Extraction de structure**
   - Lister toutes les classes (`owl:Class`, `rdfs:Class`)
   - Lister toutes les propriétés (`owl:ObjectProperty`, `owl:DatatypeProperty`, `rdf:Property`)
   - Extraire domaines et ranges (`rdfs:domain`, `rdfs:range`)

3. **Hiérarchies**
   - Construire la hiérarchie de classes (`rdfs:subClassOf`)
   - Construire la hiérarchie de propriétés (`rdfs:subPropertyOf`)
   - Afficher sous forme d'arbre (pour l'UI)

4. **Visualisation**
   - Fournir une structure sérialisable pour l'affichage UI
   - Format JSON : classes avec enfants, propriétés avec domaine/range

---

## 📦 Livrables attendus

### Structure du module (`packages/ontology/`)

```
packages/ontology/
├── src/
│   ├── loaders/
│   │   ├── OWLLoader.ts
│   │   └── RDFSLoader.ts
│   ├── extractors/
│   │   ├── ClassExtractor.ts
│   │   └── PropertyExtractor.ts
│   ├── hierarchy/
│   │   ├── ClassHierarchy.ts
│   │   └── PropertyHierarchy.ts
│   ├── OntologyManager.ts    # Classe principale
│   └── index.ts
├── demo/
│   └── index.ts              # Démo standalone
├── tests/
│   └── ontology.test.ts
├── package.json
├── tsconfig.json
└── README.md
```

### Classe principale : `OntologyManager`

```typescript
import { IOntologyStore, OntologyStructure, ClassNode, PropertyNode } from '@kg/core';

export class OntologyManager implements IOntologyStore {
  async loadOntology(data: string, format: 'owl' | 'rdfs'): Promise<void> {
    // Ton implémentation
  }

  getClasses(): ClassNode[] {
    // Retourne toutes les classes avec leurs métadonnées
  }

  getProperties(): PropertyNode[] {
    // Retourne toutes les propriétés
  }

  getClassHierarchy(): ClassNode {
    // Retourne l'arbre de classes (racine = owl:Thing ou rdfs:Resource)
  }

  getPropertyHierarchy(): PropertyNode {
    // Retourne l'arbre de propriétés
  }

  getStructure(): OntologyStructure {
    return {
      classes: this.getClasses(),
      properties: this.getProperties(),
      classHierarchy: this.getClassHierarchy(),
      propertyHierarchy: this.getPropertyHierarchy(),
    };
  }
}
```

### Types attendus (définis dans `@kg/core`)

```typescript
// À utiliser depuis @kg/core (défini par le Responsable)
export interface ClassNode {
  uri: string;
  label?: string;
  comment?: string;
  subClassOf: string[]; // URIs des parents
  children: ClassNode[]; // Pour affichage hiérarchique
}

export interface PropertyNode {
  uri: string;
  label?: string;
  comment?: string;
  type: 'ObjectProperty' | 'DatatypeProperty' | 'AnnotationProperty' | 'Property';
  domain: string[]; // URIs des classes
  range: string[]; // URIs des classes ou datatypes
  subPropertyOf: string[];
  children: PropertyNode[];
}
```

---

## 🔒 Restrictions & Contraintes

### ❌ Ce que tu NE dois PAS faire

1. **Pas de raisonnement**  
   → Ne pas inférer de nouvelles classes/propriétés (c'est le rôle du Reasoning module)

2. **Pas de validation OWL complète**  
   → Pas besoin de vérifier toutes les contraintes OWL (sauf si feature optionnelle activée)

3. **Pas de requêtes SPARQL**  
   → Utilise directement le graphe RDF fourni par le module RDF

4. **Pas de visualisation**  
   → Tu fournis la structure JSON, c'est le module Visualization qui affiche

### ✅ Ce que tu DOIS garantir

1. **Hiérarchies correctes**  
   → `rdfs:subClassOf` doit être transitif (A subClassOf B, B subClassOf C → A descendant de C)

2. **Gestion des cycles**  
   → Détecter et gérer les hiérarchies cycliques (erreur ou avertissement)

3. **Support classes anonymes**  
   → Gérer les restrictions OWL (`owl:Restriction`, `owl:allValuesFrom`, etc.)

4. **Labels multilingues**  
   → Extraire `rdfs:label` et `rdfs:comment` (supporter `@en`, `@fr`, etc.)

---

## 📋 Critères d'acceptation (Definition of Done)

### Import

- [ ] OWL : charge correctement `samples/pizza.owl`
- [ ] RDFS : charge correctement une ontologie RDFS simple
- [ ] Détection automatique du formalisme (OWL vs RDFS)

### Extraction

- [ ] Liste complète des classes (incluant `owl:Thing`)
- [ ] Liste complète des propriétés (ObjectProperty + DatatypeProperty)
- [ ] Domaines et ranges correctement extraits

### Hiérarchies

- [ ] Hiérarchie de classes : structure arborescente correcte
- [ ] Hiérarchie de propriétés : structure arborescente correcte
- [ ] Gestion des classes sans parents (racines multiples)
- [ ] Détection de cycles (erreur claire)

### Démo

- [ ] Script `npm run demo:ontology` exécutable
- [ ] Démo charge `pizza.owl` → affiche classes → affiche hiérarchie
- [ ] Output console : arbre de classes formaté (indentation)

---

## 🛠️ Technologies recommandées

### Bibliothèques

1. **rdflib.js** (recommandé)
   - Utilise le même store que le module RDF
   - Requêtes sur le graphe avec `store.match()`

2. **Exemple : extraire les classes**

```typescript
import { graph, Namespace, sym } from 'rdflib';

const OWL = Namespace('http://www.w3.org/2002/07/owl#');
const RDFS = Namespace('http://www.w3.org/2000/01/rdf-schema#');

export class ClassExtractor {
  extractClasses(store: any): ClassNode[] {
    const classes: ClassNode[] = [];

    // Trouver toutes les classes OWL
    const owlClasses = store.match(null, RDF('type'), OWL('Class'));

    owlClasses.forEach((stmt: any) => {
      const classUri = stmt.subject.value;
      const label = this.getLabel(store, classUri);
      const subClassOf = this.getSubClassOf(store, classUri);

      classes.push({
        uri: classUri,
        label,
        subClassOf,
        children: [],
      });
    });

    return classes;
  }

  private getLabel(store: any, uri: string): string | undefined {
    const labels = store.match(sym(uri), RDFS('label'), null);
    return labels[0]?.object.value;
  }
}
```

---

## 📚 Ressources

### Spécifications

- [OWL 2 Primer](https://www.w3.org/TR/owl2-primer/)
- [RDFS Specification](https://www.w3.org/TR/rdf-schema/)
- [OWL 2 Web Ontology Language](https://www.w3.org/TR/owl2-overview/)

### Tutoriels

- [Ontology Development 101](https://protege.stanford.edu/publications/ontology_development/ontology101.pdf)
- [Working with OWL in JavaScript](https://www.w3.org/community/rdfjs/)

### Ontologies de test

- [Pizza Ontology](https://protege.stanford.edu/ontologies/pizza/pizza.owl)
- [FOAF Vocabulary](http://xmlns.com/foaf/spec/)
- [Dublin Core](https://www.dublincore.org/specifications/dublin-core/dcmi-terms/)

---

## 🧪 Tests requis

### Test : Hiérarchie de classes

```typescript
describe('Ontology Class Hierarchy', () => {
  it('should build correct class hierarchy', async () => {
    const manager = new OntologyManager();
    await manager.loadOntology(pizzaOwl, 'owl');

    const hierarchy = manager.getClassHierarchy();

    // owl:Thing devrait être la racine
    expect(hierarchy.uri).toContain('Thing');

    // Pizza devrait être un enfant de Thing
    const pizza = hierarchy.children.find((c) => c.uri.includes('Pizza'));
    expect(pizza).toBeDefined();

    // MargheritaPizza devrait être un enfant de Pizza
    const margherita = pizza!.children.find((c) => c.uri.includes('Margherita'));
    expect(margherita).toBeDefined();
  });
});
```

---

## 🤝 Interfaces avec autres modules

### Fournit à (exports)

- **Core** : implémentation de `IOntologyStore`
- **Visualization (Membre D)** : structure JSON pour affichage hiérarchique
- **Reasoning (Responsable)** : métadonnées d'ontologie pour inférences

### Dépend de (imports)

- **Core** : types `IOntologyStore`, `ClassNode`, `PropertyNode`
- **RDF (Membre A)** : utilise le graphe RDF chargé

### Règle d'or

❗ **Ton module utilise le graphe RDF via `IRDFStore`, mais ne dépend pas directement du module RDF de Membre A**  
→ Passe par l'abstraction fournie par Core

---

## ⚠️ Points d'attention

1. **Restrictions OWL**  
   → Les classes anonymes (restrictions) sont complexes ; limite-toi aux classes nommées au début

2. **Hiérarchies multiples**  
   → Une classe peut avoir plusieurs parents (`MultipleInheritance`)

3. **Labels manquants**  
   → Si pas de `rdfs:label`, utilise l'URI local (ex: `#Pizza` → "Pizza")

4. **Propriétés sans domain/range**  
   → Certaines propriétés n'ont pas de domaine/range explicite (c'est normal)

5. **OWL 2 vs OWL 1**  
   → Supporte OWL 2 (plus récent), mais la plupart des ontologies sont OWL 1 (compatibles)

---

## 📊 Exemple de démo attendue

```bash
$ npm run demo:ontology

=== Ontology Management Demo ===

1. Loading OWL ontology: samples/pizza.owl
   ✓ Loaded in 189ms

2. Ontology Statistics:
   - Classes: 100
   - Object Properties: 12
   - Datatype Properties: 3
   - Annotation Properties: 2

3. Class Hierarchy:
   owl:Thing
   ├── Food
   │   ├── Pizza
   │   │   ├── MargheritaPizza
   │   │   ├── AmericanaPizza
   │   │   └── VegetarianPizza
   │   └── PizzaTopping
   │       ├── CheeseTopping
   │       └── MeatTopping
   └── Country
       ├── Italy
       └── America

4. Top Properties:
   - hasTopping (domain: Pizza, range: PizzaTopping)
   - hasIngredient (domain: Food, range: Food)
   - hasBase (domain: Pizza, range: PizzaBase)

=== Demo completed successfully ===
```

---

## 🎨 Format JSON pour UI (exemple)

```json
{
  "classes": [
    {
      "uri": "http://example.org/pizza#Pizza",
      "label": "Pizza",
      "comment": "A dish...",
      "subClassOf": ["http://example.org/pizza#Food"],
      "children": [
        {
          "uri": "http://example.org/pizza#MargheritaPizza",
          "label": "Margherita",
          "subClassOf": ["http://example.org/pizza#Pizza"],
          "children": []
        }
      ]
    }
  ],
  "properties": [
    {
      "uri": "http://example.org/pizza#hasTopping",
      "label": "has topping",
      "type": "ObjectProperty",
      "domain": ["http://example.org/pizza#Pizza"],
      "range": ["http://example.org/pizza#PizzaTopping"],
      "subPropertyOf": [],
      "children": []
    }
  ]
}
```

---

## 📞 Support

**Questions fréquentes** :

- "Comment extraire les classes ?" → `store.match(null, rdf:type, owl:Class)`
- "Comment gérer les restrictions OWL ?" → commence par les ignorer (feature avancée)
- "Quelle ontologie utiliser pour tester ?" → Pizza Ontology (classique)

**Contact** : Responsable du projet (Membre coordinateur)

---

**Date de livraison** : cf. planning général  
**Revue de code** : obligatoire avant merge dans `main`
