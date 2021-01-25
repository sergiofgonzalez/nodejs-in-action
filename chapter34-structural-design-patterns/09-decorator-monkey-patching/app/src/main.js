import { StackCalculator } from './lib/stack-calculator.js';
import { patchCalculator } from './lib/patch-calculator.js';

const calculator = new StackCalculator();
const patchedCalculator = patchCalculator(calculator);

patchedCalculator.putValue(4);
patchedCalculator.putValue(3);
console.log(patchedCalculator.add());

patchedCalculator.putValue(2);
console.log(patchedCalculator.multiply());

patchedCalculator.putValue(0);

try {
  patchedCalculator.divide();
} catch (err) {
  console.error(`No can do: ${ err.message }!`);
}

console.log(patchedCalculator instanceof StackCalculator);

