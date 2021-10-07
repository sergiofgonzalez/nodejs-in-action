# 06: TypeScript Fundamentals &mdash; Making a calculator function
> illustrates how define a function that take the operands and operation as parameters

## Exercise 1.06

In this exercise we will create a calculator function that will receive the operands as arguments, as well as a reference to the operation will be applied to the operands. It will return the result of applying the received operation  on the arguments.

That is, the function usage will be as follows.

```typescript
calculator(2, 3, Operator.Add); // -> 5
```

To prevent hardcoding the operations in the calculator function, the operation (i.e. `Operator.Add`) will be used as a reference to a function that will perform the operation (e.g. `(x, y) => x + y`).


1. Define an `enum` to hold all the operators that our calculator function will support:

```typescript
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
```

2. Define a *type alias* for the function that will perform the calculation:

```typescript
type Operation = (x: number, y: number) => number;
```

3. Create an empty array of tuples `[Operator, Operation]`. This will be used to associate each supported operator with the corresponding function that performs the operation:

```typescript
// empty array of tuples [Operator, Operation]
const operations: [Operator, Operation][] = [];
```

4. Create the first operation `add()` that satisfies the `Operation` type and performs the addition of the given operands:

```typescript
const add = (x: number, y: number) => x + y;
```

5. Create the tuple that associates `Operator.Add` with the recently created function and append it to the array:

```typescript
operations.push([Operator.Add, add]);
```

6. Repeat steps *4* and *5* to define the remaining operation functions and associations.

7. Define an implement the calculator function:

```typescript
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
```

8. Validate that the function works as expected with the following tests:

```typescript
console.log(calculator(4, 6, Operator.Add));
console.log(calculator(13, 3, Operator.Subtract));
console.log(calculator(2, 5, Operator.Multiply));
console.log(calculator(70, 7, Operator.Divide));
```

9. Extend the existing functionality creating a *modulo* function. Validate that it works as expected.


| NOTE: |
| :---- |
| See how using functions as arguments let us enhance the existing functionality in a clean way without affecting any of the existing code. |
