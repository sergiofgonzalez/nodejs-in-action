enum Operator {
  Add = 'add',
  Subtract = 'subtract',
  Multiply = 'multiply',
  Divide = 'divide',
  Modulo = 'modulo'
}

// type alias for the operation function
type Operation = (x: number, y: number) => number;

// empty array of tuples [Operator, Operation]
const operations: [Operator, Operation][] = [];

// definition of add operation, conforms to `Operation` type
const add = (x: number, y: number) => x + y;

// create the first association between operator and operation
operations.push([Operator.Add, add]);

// same for subtraction, etc.
const subtract = (x: number, y: number) => x - y;
const multiply = (x: number, y: number) => x * y;
const divide = (x: number, y: number) => x / y;

operations.push(
  [Operator.Subtract, subtract],
  [Operator.Multiply, multiply],
  [Operator.Divide, divide]);

// now we define the calculator function
const calculator = function (first: number, second: number, op: Operator) {
  const tuple = operations.find(tpl => tpl[0] === op);
  if (tuple) {
    const operation = tuple[1];
    const result = operation(first, second);
    return result;
  } else {
    throw new Error(`Unexpected unknown operation: ${ op }`);
  }
};

/* testing */
console.log(calculator(4, 6, Operator.Add));
console.log(calculator(13, 3, Operator.Subtract));
console.log(calculator(2, 5, Operator.Multiply));
console.log(calculator(70, 7, Operator.Divide));


// we add the module function
const modulo = (x: number, y: number) => x % y;
operations.push([Operator.Modulo, modulo]);

console.log(calculator(14, 3, Operator.Modulo));