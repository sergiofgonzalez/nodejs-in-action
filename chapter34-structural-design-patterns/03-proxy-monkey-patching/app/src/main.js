import { StackCalculator } from './lib/stack-calculator.js';
import { patchToSafeCalculator } from './lib/safe-calculator.js';

const calculator = new StackCalculator();
const safeCalculator = patchToSafeCalculator(calculator);
console.log(safeCalculator.peekValue());
safeCalculator.clear();

safeCalculator.putValue(0);
safeCalculator.putValue(0);
try {
  safeCalculator.divide();
} catch (err) {
  console.log(`${ err.message } : This was to be expected!`);
}


/* monkey patching is dangerous, because the original object is mutated */
safeCalculator.putValue(3);
safeCalculator.putValue(0);
try {
  safeCalculator.divide();
} catch (err) {
  console.log(`${ err.message } : This was to unexpected on the original instance!`);
}
