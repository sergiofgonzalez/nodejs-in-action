# TypeScript: Chapter 16 &mdash; Workshop: TypeScript Functions
> TypeScript functions

## Contents
+ First steps into TypeScript type system: type annotationes and type inference

### The `function` keyword

The simplest way to create a function in TypeScript is:

```typescript
function sayHello(): void {
  console.log(`Hello, world!`);
}
```

A parameter is a placeholder for a value that is passed into the function. In TypeScript, parameters should have their type annotated:

```typescript
function getGreeting(name: string): string {
  return `Hello, ${ name }!`;
}
```

The following code invokes `getGreeting` function with an argument `'world'` and collects the result in a variable, which will implicitly be bound to the return type of the function:

```typescript
const greeting = getGreeting('world');
```

| NOTE: |
| :---- |
| It is common to use the terms argument and parameter interchangeably. Strictly speaking, argument is the value passed to a function, while parameter refers to the placeholder found in the function definition. |

TypeScript allows you define optional parameters with `?` as in:

```typescript
function getGreeting(name?: string): string {
  return `Hello, ${ name ?? 'stranger' }!`;
}
```

The code above can be greatly simplified using *default parameters*:

```typescript
function getGreeting(name?: string = 'stranger'): string {
  return `Hello, ${ name }!`;
}
```

### Rest parameters

The *spread operator** (`...`) can be used as the final parameter to a function. This will take all arguments passed into the function and place them in an array:

```typescript
function sum(num1: number, num2: number, ...restNums: number[]): number {
  let total = num1 + num2;
  for (num in restNums) {
    total += num;
  }
  return total;
}
```

The function can then be called with a variable number of arguments:

```typescript
sum(1, 2, 3, 4, 5, 6, 7, 8, 9, 10); // -> 55
```

Note that only the first two arguments are required, and the rest will be optional. Note also that the variable arguments are annotated as an array of the elements that we expect (`number[]` in this case).

Note also, that this would be slightly different in the signature and invocation if we would require an array as third argument, but not in the implementation:

```typescript
function sum(num1: number, num2: number, restNums: number[]): number {
  let total = num1 + num2;
  for (num in restNums) {
    total += num;
  }
  return total;
}

sum(1, 2, [3, 4, 5, 6, 7, 8, 9, 10]); // -> 55
```

In this case, using the *spread operator* gives us better developer experience, but that might not be always the case.

### Returning multiple values and destructuring return types

TypeScript will only allow you to return one value. However, you can simulate returning multiple arguments returning a tuple, an array or an object.
This will provide the DX (developer's experience) that you're returning multiple values. Especially because you will be able to annotate the return type given the structure of what you are returning.

Consider the following function that classifies a variable number of numbers according to their parity:

```typescript
function paritySort(...numbers: number[]): { evens: number[], odd: number[] } => {
  return {
    evens: numbers.filter(n % 2 === 0),
    odds: numbers.filter(n % 2 !== 0)
  };
}
```

Pay special attention at the annotation of the return type, that gives information about the specific structure of the object you're returning.

The function result can be destructured using the following syntax:

```typescript
const { evens, odds } = paritySort(1, 2, 3, 4);
```

## Function expressions

Function expressions in TypeScript include type annotations:

```typescript
const myFunction = function (name: string): string {
  return `Hello, ${ name }!`;
}
```

| NOTE: |
| :---- |
| Function experssions can be named or anonymous. Note that anonymous function expressions cannot be invoked recursively. |

## Arrow functions (lambdas)

An arrow function is a more compact syntax for function definition, that brings with it also a more consistent behavior for the `this` keyword.

```typescript
const myFunction = (name: string): string => {
  return `Hello, ${ name }!`;
}
```

### Understanding `this`
The use of `this` in languages such as C++ or Java is pretty straightforward. However, in JavaScript/TypeScript the `this` keyword points to the runtime of the current function, and it is a source of frustration for programmers.

Consider the following simple example, in which `this` will behave as expected:

```typescript
const person = {
  name: 'Jason Isaacs',
  sayHello: function() {
    return `Hello to ${ this.name }`;
  }
};

console.log(person.sayHello()); // Hello to Jason Isaacs
```

Now, consider the following example, in which we use a similar approach to get a reference to a property defined in the enclosing object:

```typescript
const arrayFilter = {
  max: 3,
  filter: function (...numbers: number[]) {
    return numbers.filter(function (val) {
      return val <= this.max; // ERROR: an outer value of `this` is shadowed by this container
    });
  }
};
```

In this case, as the function passed to `Array.filter()` creates a new scope, `this` will not have access to the `max` property.

Fortunately for us, TypeScript is capable of detecting this mistake, and won't let us run the program.


JavaScript attempted to solve the previous issue with the introduction of arrow functions. That is, if we do:

```typescript
const arrayFilter = {
  max: 3,
  filter: function (...numbers: number[]) {
    return numbers.filter((val) => {
      return val <= this.max;
    });
  }
};

console.log(arrayFilter.filter(1, 2, 3, 4)); // -> [1, 2, 3]
```

This works because arrow functions do not create a new `this` context.

Now consider a slight variation of the previous code, in which we also use an arrow function for the `filter` method of our object:

```typescript
const arrayFilter = {
  max: 3,
  filter: (...numbers: number[]) => {
    return numbers.filter((val) => {
      return val <= this.max; // ERROR: The containing arrow function captures the global value of 'this'
    });
  }
};
```

This code will also fail to compile, because we need a `this` context in place to access the `max` property.

This is confusing, and it's the reason `this` is dreaded in TypeScript more than in other languages, even when the compiler is able to catch errors that would go unnoticed in JavaScript

The recommendation is:
> When you are programming with `this`, use function expressions for object and class methods, and arrow functions for any callbacks you use within the methods.

### Closures and scope

In TypeScript (as well as in JavaScript), when a function is declared it creates a context that *encloses* any variables of the outer scope. Those variables will remain accessible even after the outer scope is no longer active. This is called a closure.

Consider the following block of code:

```typescript
const outer = (): void => {
  const hello = 'Hello';
  let world; // undefined
  const inner = (): void => {
    const world = 'world!';
    console.log(`${ hello } ${ world }`); // Hello world!
  };
  inner();
  console.log(`${ hello } ${ world }`); // -> Hello undefined
};
```

The second `console.log()` statement will print 'Hello undefined' because the `const world = 'world!'` in the inner function creates a new variable completely unrelated with the `world` variable defined in the outer scope.

Note that we can read and modify variables from `inner()`. If we slightly modify the `inner()` function to drop the constant definition we will get:

```typescript
const outer = (): void => {
  const hello = 'Hello';
  let world;
  const inner = (): void => {
    world = 'world!'; // modifies the outer scope `world` variable
    console.log(`${ hello } ${ world }`); // Hello world!
  };
  inner();
  console.log(`${ hello } ${ world }`); // -> Hello world!
};
```
### Currying (150)

Currying is a functional programming technique in which a function is applied multiple argument lists of a single argument instead of just one list with multiple arguments.

The following example is a regular, **non-curried** function that calculates the sum of two numbers:

```typescript
function sum(x: number, y: number): number {
  return x + y;
}

sum(2, 3); // -> 5
```

The equivalent **curried** function can be written and invoked as follows:

```typescript
function curriedSum(x: number): (y: number) => number {
  return (y: number): number => {
    return x + y;
  };
}

curriedSum(2)(3); // -> 5
```

What happens in the **curried function** is that you get two traditional function invocations back to back. The first function takes a single `number` parameter named `x` and returns a function value that takes another `number` parameter `y`.

Note that you can get a reference to the second function:

```typescript
const twoPlus = curriedSum(2);
twoPlus(3); // -> 5
```

The previous example can be written more concisely with arrow functions:

```typescript
const curriedSum = (x: number): ((y: number) => number) =>
  (y: number): number => x + y;
```

And ever more concisely if we let TypeScript infer the types for us:

```typescript
const curriedSum = (x: number) => (y: number) => x + y;
```

Currying is a powerful technique for *caching* partially applied functions. It also provides a great DX (developer's experience) as it is easy for the user to get reference to individual functions.


## Unit testing with `ts-jest`

## Error handling

## Summary

## You know you've mastered this chapter when...

## Exercises, code examples, and mini-projects

### [01: Getting started with functions in TypeScript](01-hello-functions)
Illustrates how a program can be simplified by creating the same program with and without functions. In the example, logic to calculate the average and standard deviation of an array of numbers is created.

### [02: Comparing number arrays](02-comparing-number-arrays)
Illustrates how to create a function that compares arrays.

### [03: Writing arrow functions](03-writing-arrow-functions)
Illustrates how to write and use arrow functions by creating a function that combines the arguments it receives into a function.

### [04: Using `this` in an object](04-using-this-in-an-object)
Illustrates the use of `this` in object literals with properties and methods by creating an `account` object literal to model the status of a debt.

### [05: Fibonacci sequence using closures](05-fibonacci-using-closures)
Illustrates how to implement the Fibonacci sequence using closures instead of recursion.

### [06: Factory pattern using closures](06-factory-pattern-using-closures)
Illustrates how to implement the *Factory pattern* using closures.

### [07: Hello, currying!](07-hello-currying)
Illustrates how to write a *curried* function.

### [08: Refactoring into curried functions](08-refactoring-into-curried-functions)
Illustrates how to refactor functions with multiple arguments into curried functions and its benefits.

### [09: Refactoring JavaScript into TypeScript](09-refactoring-js-into-ts)
An example illustrating how to rewrite a pure JavaScript code into TypeScript.

### [10: TypeScript functions &mdash; `import` and `export`](10-import-and-export)
Refactoring a program into a module and importing the functions from it.

## ToDo

