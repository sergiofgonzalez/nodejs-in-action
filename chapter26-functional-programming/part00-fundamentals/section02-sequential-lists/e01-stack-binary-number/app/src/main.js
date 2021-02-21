import { createStack } from './lib/stack.js';

const stack = createStack();

if (process.argv.length !== 3 || isNaN(Number(process.argv[2]))) {
  console.log(`Send a number as argument and I will convert it to its binary rep`);
  process.exit(0);
}

let num = BigInt(process.argv[2]);

let remainder = num % 2n;
num = num / 2n;

stack.push(remainder);

while (num !== 0n) {
  const remainder = num % 2n;
  num = num / 2n;
  stack.push(remainder);
}

let binStr = '';
while (!stack.isEmpty()) {
  binStr += stack.pop();
}

console.log(`${ process.argv[2] } = ${ binStr }`);
