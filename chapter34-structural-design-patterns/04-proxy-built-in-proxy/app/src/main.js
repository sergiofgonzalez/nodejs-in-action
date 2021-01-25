import { StackCalculator } from './lib/stack-calculator.js';
import { safeCalculatorHandler } from './lib/safe-calculator.js';

const calculator = new StackCalculator();
const safeCalculator = new Proxy(calculator, safeCalculatorHandler);
console.log(`safeCalculator instanceOf StackCalculator: ${ safeCalculator instanceof StackCalculator }`);

safeCalculator.putValue(0);
safeCalculator.putValue(0);
safeCalculator.divide();


