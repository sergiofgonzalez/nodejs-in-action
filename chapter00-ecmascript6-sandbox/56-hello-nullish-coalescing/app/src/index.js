'use strict';

let leftHand = 0;

let value = leftHand || 'default';
console.log(`value: ${ value }`);

value = leftHand ?? 'default';
console.log(`value: ${ value }`);

