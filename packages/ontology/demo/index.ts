/**
 * Ontology Module Demo
 */

import { OntologyManager } from '../src';

async function main() {
    console.log('=== Ontology Management Demo ===\n');

    const manager = new OntologyManager();

    // TODO: Load a real ontology (e.g., Pizza ontology)
    console.log('1. Loading OWL ontology...');
    await manager.loadOntology('', 'owl');
    console.log('   ✓ Loaded\n');

    console.log('2. Ontology Structure:');
    const structure = manager.getStructure();
    console.log(`   - Classes: ${structure.classes.length}`);
    console.log(`   - Properties: ${structure.properties.length}\n`);

    console.log('3. Class Hierarchy:');
    const hierarchy = manager.getClassHierarchy();
    console.log(`   ${hierarchy.label}`);
    hierarchy.children.forEach((child) => {
        console.log(`   ├── ${child.label || child.uri}`);
    });
    console.log();

    console.log('=== Demo completed ===');
}

main().catch(console.error);
