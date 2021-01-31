import { createLazyBuffer } from './lib/create-lazy-buffer.js';

const lazyBuffer = createLazyBuffer(25);
const eagerBuffer = Buffer.alloc(25);

console.log(`typeof lazyBuffer:`, typeof lazyBuffer);
console.log(`typeof eagerBuffer:`, typeof eagerBuffer);

// console.log(`lazyBuffer.prototype:`, lazyBuffer.prototype);
// console.log(`eagerBuffer.prototype:`, eagerBuffer.prototype);


// /* test it behaves like a normal buffer */
// console.log(`lazyBuffer.length:`, lazyBuffer.length);
// console.log(`eagerBuffer.length:`, eagerBuffer.length);

// eagerBuffer.write('Hello, world!!!', 'utf8');
// lazyBuffer.write('Hello, world!!!', 'utf8');

// console.log(`lazyBuffer.length:`, lazyBuffer.length);
// console.log(`eagerBuffer.length:`, eagerBuffer.length);

// console.log(`lazyBuffer contents:`, lazyBuffer.toString('utf8'));
// console.log(`eagerBuffer contents:`, eagerBuffer.toString('utf8'));

/*
  Note however that duck-typing does not work 100% well, as internally some of the
  methods check the underlying type.
  For example, the following fails with The "target" argument must be an instance of Buffer or Uint8Array. Received an instance of Buffer
*/
eagerBuffer.copy(lazyBuffer, 16, 7, 5);
console.log(`lazyBuffer contents:`, lazyBuffer.toString('utf8'));
console.log(`eagerBuffer contents:`, eagerBuffer.toString('utf8'));

