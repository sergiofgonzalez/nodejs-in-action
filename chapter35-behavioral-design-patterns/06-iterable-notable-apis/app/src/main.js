import { Matrix } from './lib/matrix.js';
import { MatrixKeyValue } from './lib/matrix-key-value.js';
import { DelayedRandomInt } from './lib/delayed-random-int.js';
// import { createAlphabetIterator } from './lib/alphabet-iterator.js';

const matrix2x2 = new Matrix([
  [1, 2],
  [3, 4]
]);

/* you can iterate over an iterable using for...of */
for (const elem of matrix2x2) {
  console.log(elem);
}

/* you can get the elements of an iterable in an array using the spread operator */
const flattened = [...matrix2x2];
console.log(`flattened: ${ flattened }`);

/* destructuring also works with iterables */
const [a11, a12, a21, a22] = matrix2x2;
console.log(`a11: ${ a11 }`);
console.log(`a12: ${ a12 }`);
console.log(`a21: ${ a21 }`);
console.log(`a22: ${ a22 }`);

/* Some notable JavaScript APIs that accept iterables: the Map */
// note that the Iterable is required to return a key-value pair
const mapFromIterable = new Map([
  [1, 'one'],
  [2, 'two']
]);
console.log(mapFromIterable);

const matrixKeyValue2x2 = new MatrixKeyValue([
  [1, 2],
  [3, 4]
]);
const mapFromMatrixKeyValue = new Map(matrixKeyValue2x2);
console.log(mapFromMatrixKeyValue);

// this won't work as the iterator returned by the iterable does
// not provide a key-value structure
try {
  new Map(matrix2x2);
} catch (err) {
  console.error(`ERROR: ${ err.message }`);
}

/* Some notable JavaScript APIs that accept iterables: the Set */
const setFromMatrix = new Set(matrix2x2);
console.log(setFromMatrix);

/* Some notable JavaScript APIs that accept iterables: Promise.all */
// This is how the DelayedRandomInt works (I know it's a bit far-fetched!)
// const delayedRandomInt = new DelayedRandomInt(4);
// const [ p1, p2, p3, p4 ] = delayedRandomInt;
// Promise.all([ p1, p2, p3, p4 ])
//   .then((res) => console.log(`done: ${ res }`));
Promise.all(new DelayedRandomInt(3))
  .then((results) => console.log(`Promise.all results: ${ results }`));

Promise.race(new DelayedRandomInt(10))
  .then((result) => console.log(`Promise.race result: ${ result }`));


/* Some notable JavaScript APIs that accept iterables: Array.from */
