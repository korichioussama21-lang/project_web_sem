# Module: Core + Reasoning Engine

**Responsable du projet**  
**Documentation officielle du module**

---

## 🎯 Responsabilités

En tant que **responsable**, tu gères deux aspects critiques :

### 1. **Core** (Infrastructure partagée)

- Définir les **types TypeScript** partagés par tous les modules
- Créer les **interfaces** que chaque module doit respecter
- Gérer le **stockage RDF** centralisé (wrapper autour de rdflib.js)
- Définir les **conventions d'erreurs** et logging
- Coordonner l'**intégration** des 5 modules

### 2. **Reasoning Engine** (Moteur de raisonnement)

- Implémenter le raisonnement **RDFS**
- Implémenter le raisonnement **OWL RL** (profil recommandé)
- Interface UI : **activer/désactiver** le raisonnement
- Interface UI : **sélection du formalisme** (RDFS, OWL RL, etc.)
- Afficher les **triplets inférés** séparément des triplets assertés

---

## 📦 Livrables attendus

### Core (`packages/core/`)

#### Fichiers obligatoires

```
packages/core/
├── src/
│   ├── types/
│   │   ├── rdf.ts           # Quad, NamedNode, Literal, Triple
│   │   ├── graph.ts         # GraphStats, RDFGraph
│   │   ├── ontology.ts      # Class, Property, Hierarchy
│   │   ├── query.ts         # QueryResult, QueryType
│   │   └── reasoning.ts     # ReasoningMode, InferredTriple
│   ├── interfaces/
│   │   ├── IRDFStore.ts
│   │   ├── IOntologyStore.ts
│   │   ├── IQueryEngine.ts
│   │   └── IReasoningEngine.ts
│   ├── store/
│   │   └── RDFStore.ts      # Implémentation centrale (rdflib wrapper)
│   └── index.ts
├── package.json
├── tsconfig.json
└── README.md
```

#### Interfaces clés à définir

**`IRDFStore`**

```typescript
export interface IRDFStore {
  load(data: string, format: RDFFormat): Promise<void>;
  export(format: RDFFormat): Promise<string>;
  getStats(): GraphStats;
  getTriples(): Triple[];
  clear(): void;
}
```

**`IReasoningEngine`**

```typescript
export interface IReasoningEngine {
  setMode(mode: ReasoningMode): void;
  enableReasoning(enabled: boolean): void;
  infer(store: IRDFStore): Promise<InferredTriple[]>;
  getSupportedModes(): ReasoningMode[];
}
```

### Reasoning (`packages/reasoning/`)

#### Fichiers obligatoires

```
packages/reasoning/
├── src/
│   ├── engines/
│   │   ├── RDFSReasoner.ts    # Raisonnement RDFS
│   │   └── OWLRLReasoner.ts   # Raisonnement OWL RL
│   ├── ReasoningEngine.ts     # Orchestrateur principal
│   ├── JenaSidecar.ts         # Bridge vers Apache Jena (local)
│   └── index.ts
├── demo/
│   └── index.ts               # Démo standalone
├── package.json
└── README.md
```

---

## 🔒 Restrictions & Contraintes

### ❌ Ce que tu NE dois PAS faire

1. **Pas d'OWL DL complet**  
   → Trop complexe ; limite-toi à **RDFS + OWL RL**

2. **Pas de raisonnement "maison" complet**  
   → Utilise **Apache Jena en sidecar** (fiable, académiquement accepté)

3. **Pas d'optimisation prématurée**  
   → Priorise **correctness** > performance

4. **Pas de features optionnelles hors scope**  
   → Uniquement : thème sombre/clair, auto-complétion SPARQL, export résultats

### ✅ Ce que tu DOIS garantir

1. **Indépendance des modules**  
   → Chaque module ne doit dépendre que de `@kg/core`, jamais d'un autre module étudiant

2. **Contrats API clairs**  
   → Interfaces documentées avec JSDoc + exemples

3. **Gestion d'erreurs robuste**  
   → Toutes les fonctions async doivent gérer les erreurs proprement

4. **Tests d'intégration**  
   → Script `demo:reasoning` qui :
   - Charge RDF + ontologie
   - Active raisonnement
   - Affiche triplets inférés
   - Vérifie que #triplets augmente

---

## 📋 Critères d'acceptation (Definition of Done)

### Core

- [ ] Tous les types sont exportés depuis `@kg/core`
- [ ] Les 4 interfaces (`IRDFStore`, `IOntologyStore`, `IQueryEngine`, `IReasoningEngine`) sont définies
- [ ] `RDFStore` implémente `IRDFStore` avec `rdflib.js`
- [ ] Documentation JSDoc complète
- [ ] Tests unitaires pour `RDFStore`

### Reasoning

- [ ] RDFS reasoning fonctionne (ex: `rdfs:subClassOf` transitive)
- [ ] OWL RL reasoning fonctionne (ex: `owl:inverseOf`, `owl:TransitiveProperty`)
- [ ] UI : toggle ON/OFF raisonnement
- [ ] UI : sélecteur de mode (RDFS, OWL RL)
- [ ] Affichage diff "assertés vs inférés" dans l'UI
- [ ] Script `npm run demo:reasoning` exécutable
- [ ] Démo charge `samples/family.ttl` + ontologie → affiche inférences

### Intégration

- [ ] Les 5 modules compilent ensemble sans erreur
- [ ] Script `npm run build` réussit
- [ ] Script `npm run dev` lance l'app Electron
- [ ] Smoke test : charger RDF → requête SPARQL → activer raisonnement → visualiser

---

## 🛠️ Technologies recommandées

### Pour Core

- **rdflib.js** : store RDF en mémoire
- **RDF/JS spec** : types Quad, NamedNode, Literal

### Pour Reasoning

- **Apache Jena Fuseki** (sidecar local) : reasoner RDFS + OWL
- **child_process** : lancer Jena depuis Electron
- Alternative JS pure : **rdflib-rs** (bindings Rust), mais moins fiable

### Communication Jena ↔ Electron

```typescript
// Exemple simplifié
import { spawn } from 'child_process';

class JenaSidecar {
  async infer(triples: string): Promise<string> {
    const jena = spawn('java', ['-jar', 'jena-reasoner.jar']);
    // ... pipe stdin/stdout
  }
}
```

---

## 📚 Ressources

### RDF/Core

- [RDF/JS spec](https://rdf.js.org/)
- [rdflib.js documentation](https://linkeddata.github.io/rdflib.js/doc/)

### Reasoning

- [RDFS specification](https://www.w3.org/TR/rdf-schema/)
- [OWL 2 Profiles](https://www.w3.org/TR/owl2-profiles/)
- [Apache Jena Reasoners](https://jena.apache.org/documentation/inference/)

### Integration

- [TypeScript Handbook - Modules](https://www.typescriptlang.org/docs/handbook/modules.html)
- [npm workspaces](https://docs.npmjs.com/cli/v8/using-npm/workspaces)

---

## 🤝 Coordination avec les autres membres

### Dépendances entrantes

- **Membre A (RDF)** : implémente `IRDFStore`
- **Membre B (Ontology)** : implémente `IOntologyStore`
- **Membre C (SPARQL)** : implémente `IQueryEngine`
- **Membre D (Viz)** : consomme tous les types

### Responsabilités de coordination

- **Code reviews** : valider que chaque module respecte les interfaces
- **Résolution de conflits** : arbitrer si deux modules ont besoin de features incompatibles
- **Documentation centrale** : maintenir `docs/architecture.md`

---

## ⚠️ Points d'attention

1. **Sidecar Jena** : assure-toi que Java est installé localement (JDK 11+)
2. **Performance** : le raisonnement OWL peut être lent sur gros graphes (> 10k triplets)
3. **UI reasoning toggle** : doit être **réactif** (pas de freeze de l'interface)
4. **Diff inférés/assertés** : utilise des couleurs différentes dans la visualisation

---

## 📞 Support

Si un membre bloque sur l'intégration, c'est **ta responsabilité** de débloquer.

**Questions fréquentes** :

- "Comment utiliser `IRDFStore` ?" → voir `packages/core/README.md`
- "Jena ne démarre pas" → vérifier `JAVA_HOME`
- "Trop de triplets inférés" → limiter à 1000 dans l'UI (pagination)

---

**Date de livraison** : cf. planning général  
**Revue de code** : obligatoire avant merge dans `main`
