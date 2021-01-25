'use strict';

/* Arrays, strings, maps and sets are iterables */
const arr = [100, 200, 300];
for (let val of arr)
  console.log(`arr value: ${ val }`);

const msg = 'Hello';
for (let val of msg)
  console.log(`msg value: ${ val }`);

const map = new Map();
map.set('one', 'uno');
map.set('two', 'dos');
map.set('three', 'tres');

for (let val of map)
  console.log(`map val: ${ val }`);

const set = new Set();
set.add('a');
set.add('b');
set.add('c');

for (let val of set)
  console.log(`set val: ${ val }`);

  
/* Consuming an iterator with spread into an array */
const letters = [...set];
console.log(`letters: ${ letters }`);

/* Consuming an iterator with spread into a function */
function doSomething(val) {
  console.log(`arguments.length: ${ arguments.length }`);
  console.log(`val: ${ val }`);
}

doSomething(...set);


/* as arrays are iterable you can shallow copy them using the spread operator */
const arrCopy = [...arr];
console.log(`arrCopy: ${ arrCopy }`);


/* Maps can be more effectively traversed using array destructuring... */
for (let [engNumber, spaNumber] of map)
  console.log(`engNumber: ${ engNumber }; spaNumber: ${ spaNumber }`);

/* ...or would let you iterate only over the keys or values... */
for (let key of map.keys())
  console.log(`key: ${ key }`);

for (let val of map.values())
  console.log(`val: ${ val }`);

/* ...or even make it explicit that we will iterate over both keys and values */
for (let [key, value] of map.entries())
  console.log(`key: ${ key }; value: ${ value }`);