# Module: SPARQL Query Engine

**Membre C - Moteur de Requêtes SPARQL**  
**Documentation officielle du module**

---

## 🎯 Responsabilités

Tu es responsable du **moteur de requêtes SPARQL** et de l'affichage des résultats.

### Fonctionnalités obligatoires

1. **Exécution de requêtes SPARQL**
   - `SELECT` : retourne des bindings (variables → valeurs)
   - `CONSTRUCT` : retourne un graphe RDF
   - `ASK` : retourne un booléen

2. **Affichage des résultats**
   - SELECT → tableau (colonnes = variables, lignes = bindings)
   - CONSTRUCT → graphe RDF (triplets)
   - ASK → vrai/faux

3. **Historique des requêtes**
   - Sauvegarder les requêtes exécutées
   - Réexécuter une requête depuis l'historique
   - Effacer l'historique

4. **Features optionnelles (retenues)**
   - Auto-complétion SPARQL (préfixes, variables)
   - Coloration syntaxique (éditeur Monaco ou CodeMirror)
   - Export résultats (CSV, JSON, XML)

---

## 📦 Livrables attendus

### Structure du module (`packages/sparql/`)

```
packages/sparql/
├── src/
│   ├── engine/
│   │   ├── SPARQLEngine.ts      # Moteur principal
│   │   ├── SelectQuery.ts
│   │   ├── ConstructQuery.ts
│   │   └── AskQuery.ts
│   ├── formatters/
│   │   ├── TableFormatter.ts    # SELECT → tableau
│   │   ├── GraphFormatter.ts    # CONSTRUCT → triplets
│   │   └── BooleanFormatter.ts  # ASK → bool
│   ├── exporters/
│   │   ├── CSVExporter.ts       # SELECT → CSV
│   │   ├── JSONExporter.ts      # Tous types → JSON
│   │   └── XMLExporter.ts       # SELECT → SPARQL XML Results
│   ├── history/
│   │   └── QueryHistory.ts
│   ├── autocomplete/
│   │   └── SPARQLCompleter.ts   # Auto-complétion
│   ├── QueryManager.ts          # Classe principale
│   └── index.ts
├── demo/
│   └── index.ts                 # Démo standalone
├── tests/
│   └── sparql.test.ts
├── package.json
├── tsconfig.json
└── README.md
```

### Classe principale : `QueryManager`

```typescript
import { IQueryEngine, QueryResult, QueryType } from '@kg/core';

export class QueryManager implements IQueryEngine {
  async execute(query: string): Promise<QueryResult> {
    const type = this.detectQueryType(query);

    switch (type) {
      case 'SELECT':
        return this.executeSelect(query);
      case 'CONSTRUCT':
        return this.executeConstruct(query);
      case 'ASK':
        return this.executeAsk(query);
      default:
        throw new Error(`Unsupported query type: ${type}`);
    }
  }

  private async executeSelect(query: string): Promise<QueryResult> {
    // Ton implémentation
    return {
      type: 'SELECT',
      variables: ['name', 'age'],
      bindings: [
        { name: 'Alice', age: '30' },
        { name: 'Bob', age: '25' },
      ],
    };
  }

  private async executeConstruct(query: string): Promise<QueryResult> {
    // Retourne un graphe RDF (triplets)
    return {
      type: 'CONSTRUCT',
      triples: [...],
    };
  }

  private async executeAsk(query: string): Promise<QueryResult> {
    return {
      type: 'ASK',
      boolean: true,
    };
  }

  // Historique
  getHistory(): QueryHistoryEntry[] {
    return this.history;
  }

  saveToHistory(query: string, result: QueryResult): void {
    // Sauvegarde dans l'historique
  }

  clearHistory(): void {
    this.history = [];
  }

  // Export
  async exportResult(result: QueryResult, format: 'csv' | 'json' | 'xml'): Promise<string> {
    // Ton implémentation
  }
}
```

### Types attendus (définis dans `@kg/core`)

```typescript
export type QueryType = 'SELECT' | 'CONSTRUCT' | 'ASK' | 'DESCRIBE';

export interface QueryResult {
  type: QueryType;
  // Pour SELECT
  variables?: string[];
  bindings?: Record<string, string>[];
  // Pour CONSTRUCT
  triples?: Triple[];
  // Pour ASK
  boolean?: boolean;
  // Métadonnées
  executionTime?: number;
}

export interface QueryHistoryEntry {
  id: string;
  query: string;
  timestamp: Date;
  result: QueryResult;
}
```

---

## 🔒 Restrictions & Contraintes

### ❌ Ce que tu NE dois PAS faire

1. **Pas de SPARQL UPDATE (au début)**  
   → `INSERT`, `DELETE` sont optionnels (à faire seulement si temps disponible)

2. **Pas de fédération (SPARQL 1.1 Federation)**  
   → Pas de requêtes sur plusieurs endpoints distants

3. **Pas d'optimisation avancée**  
   → Pas besoin de plan de requête optimisé (perf "best effort")

4. **Pas de raisonnement**  
   → Le raisonnement est géré par le module Reasoning (activé avant requête)

### ✅ Ce que tu DOIS garantir

1. **Requêtes SPARQL 1.1 valides**  
   → Support des opérateurs : `FILTER`, `OPTIONAL`, `UNION`, `ORDER BY`, `LIMIT`

2. **Gestion d'erreurs claire**  
   → Requête mal formée → message d'erreur explicite (ligne + colonne si possible)

3. **Performance acceptable**  
   → Requête sur 10,000 triplets en < 1 seconde (pour requêtes simples)

4. **Export fidèle**  
   → CSV/JSON/XML doivent être conformes aux standards (SPARQL Results Format)

---

## 📋 Critères d'acceptation (Definition of Done)

### Exécution

- [ ] SELECT : retourne bindings corrects
- [ ] CONSTRUCT : retourne graphe RDF correct
- [ ] ASK : retourne booléen correct
- [ ] Gestion d'erreurs : requête invalide → message clair

### Affichage

- [ ] SELECT : tableau avec colonnes = variables, lignes = résultats
- [ ] CONSTRUCT : liste de triplets (sujet, prédicat, objet)
- [ ] ASK : affichage "true" ou "false"

### Historique

- [ ] Sauvegarde automatique après chaque requête
- [ ] Réexécution depuis historique fonctionne
- [ ] Effacement de l'historique fonctionne

### Optionnels (retenus)

- [ ] Auto-complétion : préfixes (`rdf:`, `rdfs:`, `owl:`)
- [ ] Auto-complétion : variables (`?name`, `?age`)
- [ ] Coloration syntaxique : keywords (`SELECT`, `WHERE`), variables, URIs
- [ ] Export CSV : conforme RFC 4180
- [ ] Export JSON : conforme SPARQL JSON Results Format
- [ ] Export XML : conforme SPARQL Query Results XML Format

### Démo

- [ ] Script `npm run demo:sparql` exécutable
- [ ] Démo exécute 1 SELECT, 1 CONSTRUCT, 1 ASK
- [ ] Démo exporte résultat SELECT en CSV

---

## 🛠️ Technologies recommandées

### Bibliothèques SPARQL

1. **sparqljs** (recommandé pour parsing)

   ```bash
   npm install sparqljs
   ```

   - Parser SPARQL vers AST (Abstract Syntax Tree)
   - Génération de requêtes SPARQL depuis code

2. **rdflib.js** (pour exécution)
   - Moteur SPARQL intégré : `store.query()`

3. **Exemple : exécuter SELECT**

```typescript
import { Parser } from 'sparqljs';
import { graph, SPARQLToQuery } from 'rdflib';

export class SPARQLEngine {
  async executeSelect(query: string, store: any): Promise<QueryResult> {
    const parser = new Parser();
    const parsed = parser.parse(query);

    // Utiliser rdflib pour exécuter
    const results = store.query(query);

    return {
      type: 'SELECT',
      variables: results.vars,
      bindings: results.results,
    };
  }
}
```

### Auto-complétion & Coloration

1. **Monaco Editor** (recommandé)

   ```bash
   npm install monaco-editor
   ```

   - Éditeur de VS Code (web)
   - Support custom languages

2. **CodeMirror 6** (alternative)
   - Plus léger
   - Support SPARQL via extensions

---

## 📚 Ressources

### Spécifications

- [SPARQL 1.1 Query Language](https://www.w3.org/TR/sparql11-query/)
- [SPARQL 1.1 Update](https://www.w3.org/TR/sparql11-update/)
- [SPARQL Query Results JSON Format](https://www.w3.org/TR/sparql11-results-json/)
- [SPARQL Query Results XML Format](https://www.w3.org/TR/rdf-sparql-XMLres/)

### Tutoriels

- [SPARQL by Example](https://www.w3.org/2009/Talks/0615-qbe/)
- [Learn SPARQL](https://www.learnsparql.com/)

### Outils de test

- [SPARQL Playground](https://www.sparql.org/)
- [Yasgui](https://triply.cc/docs/yasgui) - SPARQL IDE web

---

## 🧪 Tests requis

### Test : Requête SELECT

```typescript
describe('SPARQL SELECT', () => {
  it('should execute simple SELECT query', async () => {
    const manager = new QueryManager();

    const query = `
      PREFIX foaf: <http://xmlns.com/foaf/0.1/>
      SELECT ?name ?email
      WHERE {
        ?person foaf:name ?name .
        ?person foaf:mbox ?email .
      }
    `;

    const result = await manager.execute(query);

    expect(result.type).toBe('SELECT');
    expect(result.variables).toEqual(['name', 'email']);
    expect(result.bindings).toBeInstanceOf(Array);
  });
});
```

### Test : Export CSV

```typescript
describe('SPARQL Export', () => {
  it('should export SELECT result to CSV', async () => {
    const result: QueryResult = {
      type: 'SELECT',
      variables: ['name', 'age'],
      bindings: [
        { name: 'Alice', age: '30' },
        { name: 'Bob', age: '25' },
      ],
    };

    const csv = await manager.exportResult(result, 'csv');

    expect(csv).toContain('name,age');
    expect(csv).toContain('Alice,30');
    expect(csv).toContain('Bob,25');
  });
});
```

---

## 🤝 Interfaces avec autres modules

### Fournit à (exports)

- **Core** : implémentation de `IQueryEngine`
- **Visualization (Membre D)** : résultats formatés pour affichage
- **Desktop app** : historique de requêtes

### Dépend de (imports)

- **Core** : types `IQueryEngine`, `QueryResult`, `QueryType`
- **RDF (Membre A)** : graphe RDF pour exécuter les requêtes (via `IRDFStore`)

### Règle d'or

❗ **Ton module reçoit le graphe RDF via `IRDFStore`, mais ne dépend pas directement du module RDF de Membre A**  
→ Utilise l'abstraction fournie par Core

---

## ⚠️ Points d'attention

1. **Préfixes**  
   → Gérer les préfixes standards (`rdf:`, `rdfs:`, `owl:`, `foaf:`, etc.)

2. **Variables**  
   → Les variables commencent par `?` ou `$` en SPARQL

3. **FILTER**  
   → Support des opérateurs : `=`, `!=`, `<`, `>`, `<=`, `>=`, `&&`, `||`, `!`

4. **OPTIONAL**  
   → Les bindings peuvent avoir des valeurs manquantes (undefined)

5. **Gros résultats**  
   → Si SELECT retourne > 10,000 résultats, afficher un avertissement (pagination recommandée)

---

## 📊 Exemple de démo attendue

```bash
$ npm run demo:sparql

=== SPARQL Query Engine Demo ===

1. Loading RDF data: samples/foaf.ttl
   ✓ Loaded 234 triples

2. Query 1: SELECT
   Query:
     SELECT ?name ?email
     WHERE {
       ?person foaf:name ?name .
       ?person foaf:mbox ?email .
     }

   Results (3 bindings):
   ┌─────────┬───────────────────────┐
   │ name    │ email                 │
   ├─────────┼───────────────────────┤
   │ Alice   │ alice@example.com     │
   │ Bob     │ bob@example.com       │
   │ Charlie │ charlie@example.com   │
   └─────────┴───────────────────────┘

   ✓ Executed in 45ms

3. Query 2: ASK
   Query:
     ASK {
       ?person foaf:name "Alice" .
     }

   Result: true
   ✓ Executed in 12ms

4. Export to CSV
   ✓ Exported SELECT result to output/results.csv

5. Query History
   - Total queries: 2
   - Last query: ASK { ?person foaf:name "Alice" . }

=== Demo completed successfully ===
```

---

## 🎨 Format JSON Export (exemple)

### SELECT → JSON (SPARQL Results Format)

```json
{
  "head": {
    "vars": ["name", "email"]
  },
  "results": {
    "bindings": [
      {
        "name": { "type": "literal", "value": "Alice" },
        "email": { "type": "uri", "value": "mailto:alice@example.com" }
      },
      {
        "name": { "type": "literal", "value": "Bob" },
        "email": { "type": "uri", "value": "mailto:bob@example.com" }
      }
    ]
  }
}
```

---

## 📞 Support

**Questions fréquentes** :

- "Quelle lib SPARQL utiliser ?" → `rdflib.js` (moteur intégré)
- "Comment parser les requêtes ?" → `sparqljs`
- "Comment implémenter l'auto-complétion ?" → Monaco Editor + custom language definition

**Contact** : Responsable du projet (Membre coordinateur)

---

**Date de livraison** : cf. planning général  
**Revue de code** : obligatoire avant merge dans `main`
