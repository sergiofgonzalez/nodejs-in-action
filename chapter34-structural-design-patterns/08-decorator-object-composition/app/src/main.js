import { StackCalculator } from './lib/stack-calculator.js';
import { EnhancedCalculator } from './lib/enhanced-calculator.js';

const calculator = new StackCalculator();
const enhancedCalculator = new EnhancedCalculator(calculator);

enhancedCalculator.putValue(4);
enhancedCalculator.putValue(3);
console.log(enhancedCalculator.add());

enhancedCalculator.putValue(2);
console.log(enhancedCalculator.multiply());

enhancedCalculator.putValue(0);

try {
  enhancedCalculator.divide();
} catch (err) {
  console.error(`No can do: ${ err.message }!`);
}


