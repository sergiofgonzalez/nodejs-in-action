'use strict';

/* There is no magic in the substack pattern: only that Functions are objects */

function sayHello() {
  console.log(`Hello to Jasom Isaacs`);
}

console.log(`sayHello.name: `, sayHello.name);
console.log(`sayHello.length (number of args): `, sayHello.length);

sayHello.variant = (personName) => { console.log(`Hello to ${ personName ?? 'Jason Isaacs' }`); };

sayHello.variant('Idris Elba');

/* functions can also hold custom (non-function) properties */
sayHello.counter = 0;

console.log(`sayHello.counter: `, sayHello.counter);