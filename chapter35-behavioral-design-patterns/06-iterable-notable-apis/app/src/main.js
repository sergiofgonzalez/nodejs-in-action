import { Matrix } from './lib/matrix.js';
import { MatrixKeyValue } from './lib/matrix-key-value.js';
import { DelayedRandomInt } from './lib/delayed-random-int.js';
import { Readable } from 'stream';
import { MatrixStr } from './lib/matrix-str.js';
import { createAlphabetIterator } from './lib/alphabet-iterator.js';

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
const matrixArray = Array.from(matrix2x2);
console.log(matrixArray);

/* Some notable Node.js APIs that accept iterables: Readable.from */
const matrix3x3Str = new MatrixStr([
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
]);

Readable.from(matrix3x3Str)
  .pipe(process.stdout);

/*
  All these APIs require an iterable and not an iterator.
  In order to fix this, you just need to implement the
  @@iterator in the *iterator* object itself
*/

// this fails
try {
  for (const letter of createAlphabetIterator()) {
    console.log(letter);
  }
} catch (err) {
  console.error(`ERROR: ${ err.message }`);
}

const alphabetIterable = {
  [Symbol.iterator]() {
    return createAlphabetIterator();
  }
};

for (const letter of alphabetIterable) {
  console.log(letter);
}