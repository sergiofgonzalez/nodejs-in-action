import { count, increment } from './counter.js';

console.log(count);
increment();
console.log(count);

// TypeError: Assignment to constant variable
count++; // eslint also catches this one