/**
 * Reasoning Module Demo
 */

import { ReasoningEngine } from '../src';
import { RDFStore } from '@kg/core';

async function main() {
    console.log('=== Reasoning Engine Demo ===\n');

    const store = new RDFStore();
    const reasoner = new ReasoningEngine();

    // Sample data with class hierarchy
    const data = `
@prefix : <http://example.org/> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .

:Person a rdfs:Class .
:Student rdfs:subClassOf :Person .
:GraduateStudent rdfs:subClassOf :Student .

:alice a :GraduateStudent .
  `;

    console.log('1. Loading RDF data...');
    await store.load(data, 'turtle');
    const stats1 = store.getStats();
    console.log(`   ✓ Loaded ${stats1.totalTriples} triples\n`);

    console.log('2. Configuring reasoning (RDFS mode)...');
    reasoner.configure({
        enabled: true,
        mode: 'RDFS',
        includeInferred: true,
    });
    console.log('   ✓ Configured\n');

    console.log('3. Performing inference...');
    const result = await reasoner.infer(store);
    console.log(`   ✓ Inferred ${result.totalInferences} new triples`);
    console.log(`   ✓ Execution time: ${result.executionTime}ms`);
    console.log(`   ✓ Consistency: ${result.consistencyCheck ? 'OK' : 'FAILED'}\n`);

    console.log('4. Inferred triples:');
    result.inferredTriples.slice(0, 5).forEach((triple, i) => {
        const subj = triple.subject.value.split('#').pop();
        const pred = triple.predicate.value.split('#').pop();
        const obj = (triple.object as any).value.split('#').pop();
        console.log(`   ${i + 1}. ${subj} ${pred} ${obj}`);
        if (triple.rule) {
            console.log(`      (rule: ${triple.rule})`);
        }
    });
    console.log();

    console.log('5. Toggle reasoning OFF...');
    reasoner.setEnabled(false);
    console.log(`   ✓ Reasoning disabled\n`);

    console.log('=== Demo completed ===');
}

main().catch(console.error);
