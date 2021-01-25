import { StackCalculator } from './lib/stack-calculator.js';
import { SafeCalculator } from './lib/safe-calculator.js';

const calculator = new StackCalculator();
calculator.putValue(3);
calculator.putValue(2);
console.log(calculator.multiply());

calculator.putValue(2);
console.log(calculator.divide());

calculator.putValue(0);
console.log(calculator.divide()); // Infinity!

console.log(`======== safeCalculator `);
const safeCalculator = new SafeCalculator(calculator);
console.log(safeCalculator.peekValue());
safeCalculator.clear();

safeCalculator.putValue(0);
safeCalculator.putValue(0);
console.log(safeCalculator.divide());