# 05: TypeScript functions &mdash; Fibonacci sequence using closures
> illustrates how to implement the Fibonacci sequence using closures instead of recursion.

## Description

The Fibonacci sequence is a series of numbers on which the next number is the sum of the two previous two numbers: [0, 1, 1, 2, 3, 5, 8, 13, 21, ...].


In this example, you have to write a function that will return the next value in the Fibonacci sequence each time it is called.

The implementation is as follows:

```typescript
export const fibonacci = function (): () => number {
  let next = 0;
  let inc = 1;
  let current = 0;
  return (): number  => {
    [current, next, inc] = [next, inc, next + inc];
    return current;
  };
};
```

That is, we define an anonymous function expression that we assign to a variable `fibonacci`.

The function expression is declared as a function, that takes no arguments and returns a function that takes no arguments and returns a number.

```typescript
function (): () => number { ... }
```

Note that we can also use array functions for that definition, and that the syntax becomes a bit difficult to read:

```typescript
const fibonacci = (): () => number => {
  ...
}
```

In the implementation, we return a function to obtain the next number in the sequence. That function is a closure over the three pieces of information needed to maintain state and return the correct number.

```typescript
export const fibonacci = (): () => number => {
  let next = 0;
  let inc = 1;
  let current = 0;
  return (): number  => {
    [current, next, inc] = [next, inc, next + inc];
    return current;
  };
};
```

Note also how we use tuples to perform a very succinct swapping of variables:

```typescript
[current, next, inc] = [next, inc, next + inc]
```