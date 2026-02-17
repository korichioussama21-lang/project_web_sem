# Sample SPARQL Queries

Collection of example SPARQL queries for testing.

## Basic SELECT Queries

### Query 1: List all people

```sparql
PREFIX foaf: <http://xmlns.com/foaf/0.1/>

SELECT ?person ?name
WHERE {
  ?person a foaf:Person .
  ?person foaf:name ?name .
}
```

### Query 2: People who know each other

```sparql
PREFIX foaf: <http://xmlns.com/foaf/0.1/>

SELECT ?person1 ?name1 ?person2 ?name2
WHERE {
  ?person1 foaf:name ?name1 .
  ?person1 foaf:knows ?person2 .
  ?person2 foaf:name ?name2 .
}
```

### Query 3: Students and their courses (University ontology)

```sparql
PREFIX : <http://example.org/university#>

SELECT ?student ?name ?course
WHERE {
  ?student a :Student .
  ?student :hasName ?name .
  ?student :enrolledIn ?course .
}
```

## CONSTRUCT Queries

### Query 4: Create inverse knows relationship

```sparql
PREFIX foaf: <http://xmlns.com/foaf/0.1/>

CONSTRUCT {
  ?person2 foaf:knows ?person1 .
}
WHERE {
  ?person1 foaf:knows ?person2 .
}
```

### Query 5: Extract class hierarchy

```sparql
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

CONSTRUCT {
  ?subClass rdfs:subClassOf ?superClass .
}
WHERE {
  ?subClass rdfs:subClassOf ?superClass .
}
```

## ASK Queries

### Query 6: Does Alice know Bob?

```sparql
PREFIX : <http://example.org/foaf#>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>

ASK {
  :Alice foaf:knows :Bob .
}
```

### Query 7: Are there any graduate students?

```sparql
PREFIX : <http://example.org/university#>

ASK {
  ?student a :GraduateStudent .
}
```

## Advanced Queries

### Query 8: Filter by age

```sparql
PREFIX foaf: <http://xmlns.com/foaf/0.1/>

SELECT ?person ?name ?age
WHERE {
  ?person foaf:name ?name .
  ?person foaf:age ?age .
  FILTER (?age > 25)
}
ORDER BY DESC(?age)
```

### Query 9: Optional email addresses

```sparql
PREFIX foaf: <http://xmlns.com/foaf/0.1/>

SELECT ?name ?email
WHERE {
  ?person foaf:name ?name .
  OPTIONAL { ?person foaf:mbox ?email }
}
```

### Query 10: Count people by location

```sparql
PREFIX foaf: <http://xmlns.com/foaf/0.1/>

SELECT ?location (COUNT(?person) AS ?count)
WHERE {
  ?person a foaf:Person .
  ?person foaf:based_near ?location .
}
GROUP BY ?location
ORDER BY DESC(?count)
```

## Reasoning Test Queries

### Query 11: All descendants of Person class

```sparql
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX : <http://example.org/university#>

SELECT ?class
WHERE {
  ?class rdfs:subClassOf* :Person .
}
```

### Query 12: Transitive parent relationships

```sparql
PREFIX : <http://example.org/family#>

SELECT ?person ?ancestor
WHERE {
  ?person :hasParent+ ?ancestor .
}
```
