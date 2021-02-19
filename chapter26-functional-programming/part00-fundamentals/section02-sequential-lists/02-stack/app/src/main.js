import { createStack } from './lib/stack.js';

const stack = createStack();

console.log(stack.isEmpty());

stack.push(1);
console.log(`isEmpty?`, stack.isEmpty());
console.log(`peek:`, stack.peek());

stack.push(2);
console.log(`peek:`, stack.peek());
console.log(`pop:`, stack.pop());
console.log(`pop:`, stack.pop());
console.log(`isEmpty?`, stack.isEmpty());
console.log(`pop:`, stack.pop());

