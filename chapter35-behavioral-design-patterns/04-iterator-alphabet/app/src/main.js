import { createAlphabetIterator } from './lib/alphabet-iterator.js';

const iterator = createAlphabetIterator();

let iterationResult = iterator.next();
while (!iterationResult.done) {
  console.log(iterationResult.value);
  iterationResult = iterator.next();
}