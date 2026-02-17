/**
 * SPARQL Module Demo
 */

import { QueryManager } from '../src';
import { RDFStore } from '@kg/core';

async function main() {
    console.log('=== SPARQL Query Engine Demo ===\n');

    const store = new RDFStore();
    const queryManager = new QueryManager();

    // Load sample data
    const data = `
@prefix : <http://example.org/> .
@prefix foaf: <http://xmlns.com/foaf/0.1/> .

:Alice foaf:name "Alice" ; foaf:age 30 .
:Bob foaf:name "Bob" ; foaf:age 25 .
  `;

    console.log('1. Loading RDF data...');
    await store.load(data, 'turtle');
    console.log('   ✓ Loaded\n');

    console.log('2. Query validation:');
    const query1 = `
    PREFIX foaf: <http://xmlns.com/foaf/0.1/>
    SELECT ?name ?age
    WHERE {
      ?person foaf:name ?name .
      ?person foaf:age ?age .
    }
  `;

    const validation = queryManager.validate(query1);
    console.log(`   Query is ${validation.valid ? 'VALID' : 'INVALID'}`);
    if (validation.error) {
        console.log(`   Error: ${validation.error}`);
    }
    console.log();

    console.log('3. Executing SELECT query...');
    try {
        const result = await queryManager.execute(query1, store);
        console.log(`   Type: ${result.type}`);
        console.log(`   Variables: ${result.variables?.join(', ')}`);
        console.log(`   Results: ${result.bindings?.length || 0} bindings`);
        console.log(`   Execution time: ${result.executionTime}ms\n`);
    } catch (error: any) {
        console.log(`   Error: ${error.message}\n`);
    }

    console.log('4. Query history:');
    const history = queryManager.getHistory();
    console.log(`   Total queries: ${history.length}\n`);

    console.log('=== Demo completed ===');
}

main().catch(console.error);
