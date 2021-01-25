import { readFile } from 'fs';

const cache = new Map();

function inconsistentRead(filename, cb) {
  
  /* check if we've seen this file before */
  if (cache.has(filename)) {
    // cache hit: behaves synchronously
    cb(cache.get(filename));
  } else {
    // cache miss: behaves asynchronously
    readFile(filename, 'utf8', (err, data) => {
      if (err) {
        console.error(`ERROR: ${ err.message }`);
        process.exit(1);
      }
      cache.set(filename, data);
      cb(data);
    });
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
function createFileReader(filename) {
  const listeners = [];
  inconsistentRead(filename, value => {
    listeners.forEach(listener => listener(value));
  });

  return {
    /***
     * provides a function that will accept a callback (listener)
     * that will be invoked when the data is ready
     */
    onDataReady: listener => listeners.push(listener)
  };
}

const reader1 = createFileReader('data.txt');
reader1.onDataReady(data => { 
  console.log(`First call data: ${ data }`); 

  const reader2 = createFileReader('data.txt');
  reader2.onDataReady(data => { console.log(`Second call data: ${ data }`); } );
});

