import { readFileSync } from 'fs';

const cache = new Map();

function consistentReadSync(filename) {

  /* check if we've seen this file before */
  if (cache.has(filename)) {
    // cache hit: behaves synchronously
    return cache.get(filename);
  } else {
    // cache miss: behaves asynchronously
    const data = readFileSync(filename, 'utf8');
    cache.set(filename, data);
    return data;
  }
}

/**
 * Creates a new object that acts as a notifier, allowing us to set multiple
 * listeners for a file read operation.
 * All the listeners will be invoked at once when the read operation completes
 * and the data is available.
 * 
 * Each reader features their independent set of listeners (i.e. actions
 * that will be performed when the data is ready)
 */
function createFileReader(filename, listeners) {
  const data = consistentReadSync(filename);
  for (const listener of listeners) {
    listener(data);
  }
}

createFileReader('data.txt',
  [(data) => {
    console.log(`First call data: ${data}`);

    createFileReader('data.txt', [(data) => console.log(`Second call data: ${data}`)]);
  }]);
