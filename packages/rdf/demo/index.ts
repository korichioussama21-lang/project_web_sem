/**
 * RDF Module Demo
 * Demonstrates RDF loading, statistics, and export
 */

import { RDFManager } from '../src';

async function main() {
    console.log('=== RDF I/O & Statistics Demo ===\n');

    const manager = new RDFManager();

    // Example RDF data (Turtle format)
    const turtleData = `
@prefix : <http://example.org/> .
@prefix foaf: <http://xmlns.com/foaf/0.1/> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .

:Alice a foaf:Person ;
    foaf:name "Alice" ;
    foaf:age 30 ;
    foaf:knows :Bob .

:Bob a foaf:Person ;
    foaf:name "Bob" ;
    foaf:age 25 .
  `.trim();

    console.log('1. Loading Turtle data...');
    await manager.load(turtleData, 'turtle');
    console.log('   ✓ Loaded\n');

    console.log('2. Graph Statistics:');
    const stats = manager.getStats();
    console.log(`   - Total triples: ${stats.totalTriples}`);
    console.log(`   - Unique subjects: ${stats.uniqueSubjects}`);
    console.log(`   - Unique predicates: ${stats.uniquePredicates}`);
    console.log(`   - Unique objects: ${stats.uniqueObjects}`);
    console.log(`   - Literals: ${stats.literalCount}`);
    console.log(`   - IRIs: ${stats.iriCount}\n`);

    console.log('   Top predicates:');
    stats.topPredicates.slice(0, 5).forEach((p, i) => {
        console.log(`   ${i + 1}. ${p.predicate} (${p.count} occurrences)`);
    });
    console.log();

    console.log('3. Export to N-Triples...');
    const ntriples = await manager.export('n-triples');
    console.log('   ✓ Exported\n');
    console.log('   Preview:');
    console.log(ntriples.split('\n').slice(0, 3).map(line => `   ${line}`).join('\n'));
    console.log('   ...\n');

    console.log('4. Round-trip test...');
    manager.clear();
    await manager.load(ntriples, 'n-triples');
    const stats2 = manager.getStats();
    console.log(`   ✓ Re-loaded ${stats2.totalTriples} triples`);
    console.log(`   ✓ Round-trip ${stats.totalTriples === stats2.totalTriples ? 'SUCCESS' : 'FAILED'}\n`);

    console.log('=== Demo completed successfully ===');
}

main().catch(console.error);
