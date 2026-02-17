# Contributing Guide

Guide de contribution pour le projet Knowledge Graph Desktop.

## 🎯 Processus général

1. **Assigner un membre à chaque module** (déjà fait)
2. **Créer une branche** pour votre module
3. **Implémenter les fonctionnalités**
4. **Tester localement** avec le script de démo
5. **Soumettre une Pull Request**
6. **Code review** par le responsable
7. **Merge** dans `main`

## 🌿 Stratégie de branches

### Branches principales

- `main` : branche stable, production-ready
- `develop` : intégration continue

### Branches par module

- `feature/rdf` : module RDF (Membre A)
- `feature/ontology` : module Ontology (Membre B)
- `feature/sparql` : module SPARQL (Membre C)
- `feature/reasoning` : module Reasoning (Responsable)
- `feature/visualization` : module Visualization (Membre D)

### Convention de nommage

```
feature/<module-name>/<feature-description>
fix/<module-name>/<bug-description>
docs/<topic>
```

Exemples :

- `feature/rdf/turtle-parser`
- `fix/sparql/query-validation`
- `docs/api-reference`

## 📝 Standards de code

### TypeScript

- **Strict mode** activé
- **Pas de `any`** dans les APIs publiques
- **JSDoc** pour toutes les fonctions publiques
- **Interfaces** pour tous les types complexes

### Nommage

- Classes : `PascalCase` (ex: `RDFManager`)
- Fonctions/méthodes : `camelCase` (ex: `loadFromFile`)
- Constantes : `UPPER_SNAKE_CASE` (ex: `DEFAULT_FORMAT`)
- Fichiers : `PascalCase.ts` pour classes, `camelCase.ts` pour utilitaires

### Organisation des fichiers

```
packages/<module>/
├── src/
│   ├── <MainClass>.ts
│   ├── utils/
│   ├── types/
│   └── index.ts
├── demo/
│   └── index.ts
├── tests/
│   └── <module>.test.ts
├── package.json
├── tsconfig.json
└── README.md
```

## ✅ Checklist avant Pull Request

### Code

- [ ] Le code compile sans erreur (`npm run build`)
- [ ] Aucun warning TypeScript
- [ ] Respect des conventions de nommage
- [ ] JSDoc pour toutes les fonctions publiques

### Tests

- [ ] Le script de démo fonctionne (`npm run demo:<module>`)
- [ ] Les tests unitaires passent (`npm test`)
- [ ] Couverture de code > 70% (si applicable)

### Documentation

- [ ] README.md à jour
- [ ] Exemples d'utilisation dans le README
- [ ] Commentaires pour le code complexe

### Intégration

- [ ] Le module s'intègre avec `@kg/core`
- [ ] Aucune dépendance directe vers d'autres modules étudiants
- [ ] Les types exportés sont compatibles

## 🔍 Code Review

### Critères de validation

1. **Functionality** : le code fait ce qu'il doit faire
2. **Readability** : le code est compréhensible
3. **Testability** : le code peut être testé
4. **Performance** : pas de goulots d'étranglement évidents
5. **Security** : pas de vulnérabilités

### Processus

1. Créer une Pull Request sur GitHub
2. Assigner le **Responsable** comme reviewer
3. Adresser les commentaires
4. Obtenir l'approbation
5. Merge dans `main`

## 🐛 Gestion des bugs

### Signaler un bug

1. Créer une **Issue** sur GitHub
2. Template :
   ```
   **Module** : (RDF, Ontology, SPARQL, Reasoning, Visualization)
   **Description** : (courte description)
   **Steps to reproduce** :
   1. ...
   2. ...
   **Expected** : (comportement attendu)
   **Actual** : (comportement observé)
   **Logs** : (logs/erreurs)
   ```

### Corriger un bug

1. Créer une branche `fix/<module>/<bug-name>`
2. Corriger + ajouter un test de non-régression
3. Pull Request

## 📊 Milestones

### Milestone 1 : Structure (Semaine 1)

- [x] Setup du mono-repo
- [x] Création des 5 modules
- [x] Documentation par membre

### Milestone 2 : Core + RDF (Semaines 2-3)

- [ ] Core : types et interfaces finalisés
- [ ] RDF : load/export fonctionnels
- [ ] RDF : statistiques complètes

### Milestone 3 : Ontology + SPARQL (Semaines 4-5)

- [ ] Ontology : extraction classes/propriétés
- [ ] Ontology : hiérarchies
- [ ] SPARQL : SELECT/CONSTRUCT/ASK

### Milestone 4 : Reasoning + Viz (Semaines 6-7)

- [ ] Reasoning : RDFS + OWL RL
- [ ] Visualization : graphe interactif
- [ ] UI : intégration des modules

### Milestone 5 : Finalization (Semaine 8)

- [ ] Tests d'intégration
- [ ] Documentation utilisateur
- [ ] Build final
- [ ] Préparation démo

## 🤝 Communication

### Réunions

- **Hebdomadaire** : 30 minutes
- **Ordre du jour** : progrès, blocages, next steps

### Outils

- **GitHub Issues** : tracking des tâches
- **Pull Requests** : revue de code
- **Discussion** : questions générales
- **Discord/Slack** : communication rapide (si applicable)

## 📚 Ressources

### Documentation technique

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Electron Documentation](https://www.electronjs.org/docs/latest)
- [RDF Primer](https://www.w3.org/TR/rdf11-primer/)
- [SPARQL Specification](https://www.w3.org/TR/sparql11-query/)

### Outils

- [VS Code](https://code.visualstudio.com/) : éditeur recommandé
- [GitHub Desktop](https://desktop.github.com/) : GUI pour Git
- [Postman](https://www.postman.com/) : tester les SPARQL endpoints (si applicable)

## ❓ FAQ

**Q: Puis-je utiliser une bibliothèque externe ?**  
A: Oui, mais demander l'approbation du Responsable via une Issue GitHub.

**Q: Mon module dépend d'un autre module étudiant ?**  
A: ❌ Non autorisé. Passer par `@kg/core` uniquement.

**Q: Quelle version de Node.js ?**  
A: Node.js 18+ (LTS recommandé)

**Q: Comment tester mon module ?**  
A: `npm run demo:<module>` dans le dossier racine.

**Q: Puis-je modifier le Core ?**  
A: Oui, mais **coordonner avec le Responsable** (propriétaire du Core).

---

**Responsable du projet** : [Nom du responsable]  
**Contact** : [Email ou Discord]
