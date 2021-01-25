'use strict';

console.log(`typeof 42: '${ typeof 42 }'`);
console.log(`typeof 42n: '${ typeof 42n }'`);
console.log(`typeof 'abc': '${ typeof 'abc' }'`);
console.log(`typeof true: '${ typeof true }'`);
console.log(`typeof undefined: '${ typeof undefined }'`);
console.log(`typeof null: '${ typeof null }'`);
console.log(`typeof {'a': 1}: '${ typeof {'a': 1} }'`);
console.log(`typeof [1, 2, 3]: '${ typeof [1, 2, 3] }'`);
console.log(`typeof function hello() {}: '${ typeof function hello() {} }'`);

console.log(`typeof (() => {}): '${ typeof (() => {}) }'`);