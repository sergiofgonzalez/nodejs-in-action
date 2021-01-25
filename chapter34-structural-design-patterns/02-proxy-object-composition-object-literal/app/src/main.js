import { StackCalculator } from './lib/stack-calculator.js';
import { createSafeCalculator } from './lib/safe-calculator.js';

const calculator = new StackCalculator();
const safeCalculator = createSafeCalculator(calculator);
console.log(safeCalculator.peekValue());
safeCalculator.clear();

safeCalculator.putValue(0);
safeCalculator.putValue(0);
safeCalculator.divide();