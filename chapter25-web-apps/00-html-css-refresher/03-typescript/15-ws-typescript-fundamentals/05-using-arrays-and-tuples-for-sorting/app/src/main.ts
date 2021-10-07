/* sorting numbers */
const numbers: number[] = [];

for (let i = 0; i < 100; i++) {
  numbers.push(Math.random());
}

console.log(numbers);

let numTimesComparedWasCalled = 0;
numbers.sort((first, second) => {
  numTimesComparedWasCalled++;
  if (first < second) {
    return -1;
  } else if (first === second) {
    return 0;
  } else {
    return 1;
  }
});

console.log(numbers);
console.log('Num comparisons:', numTimesComparedWasCalled);

/* sorting Persons with a Schwartzian transform */
interface Person {
  firstName: string;
  lastName: string;
}

let getFullNameUsageCount = 0;
function getFullName(person: Person) {
  getFullNameUsageCount++;
  return `${ person.firstName } ${ person.lastName }`;
}

const programmers: Person[] = [
  { firstName: 'Donald', lastName: 'Knuth'},
  { firstName: 'Barbara', lastName: 'Liskow'},
  { firstName: 'Lars', lastName: 'Bak'},
  { firstName: 'Guido', lastName: 'Van Rossum'},
  { firstName: 'Anders', lastName: 'Hejslberg'},
  { firstName: 'Edsger', lastName: 'Dijkstra'},
  { firstName: 'Brandon', lastName: 'Eich'},
  { firstName: 'Bjarne', lastName: 'Stroustrup'},
  { firstName: 'Brian', lastName: 'Kernighan'},
  { firstName: 'Dennis', lastName: 'Ritchie'}
];

// naive, inefficient approach
// note: we use slice() to create a shallow copy, so that the
// original array is left untouched
function naiveSortPersons(persons: Person[]): Person[] {
  return persons.slice().sort((first, second) => {
    const firstFullName = getFullName(first);
    const secondFullName = getFullName(second);
    return firstFullName.localeCompare(secondFullName);
  });
}

console.log(`BEFORE: `, programmers);
console.log(`AFTER : `, programmers);
let startTS = process.hrtime.bigint();
console.log(`SORTED: `, naiveSortPersons(programmers));
let endTS = process.hrtime.bigint();
console.log(`getFullName Usage Count:`, getFullNameUsageCount);
console.log(`Process took ${ endTS - startTS } nanos`);

// Schwartz transform
getFullNameUsageCount = 0;
function schwartzSortPersons(persons: Person[]): Person[] {
  const tuples: [Person, string][] = persons.map(p => [p, getFullName(p)]);
  tuples.sort((first, second) => {
    return first[1].localeCompare(second[1]);
  });
  return tuples.map(p => p[0]);
}

console.log(`BEFORE: `, programmers);
console.log(`AFTER : `, programmers);
startTS = process.hrtime.bigint();
console.log(`SORTED: `, schwartzSortPersons(programmers));
endTS = process.hrtime.bigint();
console.log(`getFullName Usage Count:`, getFullNameUsageCount);
console.log(`Process took ${ endTS - startTS } nanos`);
