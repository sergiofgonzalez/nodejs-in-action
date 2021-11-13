# TypeScript: Chapter 22 &mdash; Workshop: Dependency Injection in TypeScript
> TBD

## Contents

## Introduction

**Generics** aim to allow developers to write dynamic and reusable *generic* pueces of code with types that are *unknown* when writing the code, but will be specified later, when using these generic pieces of code.

**Conditional types** allows you to use logic in the TypeScript's type system, so that it can be checked at *compile time*. This will enable you to move type logic from runtime to compilation time. It will also enable you to write more complex types, and model more complex relationships between types.

## Generics

Generics help you write code that has types that are unknown at development time, but that will be known when the code is used.

Consider the following snippet that defines a function `identity()` that returns the same argument it receives:

```typescript
function identity(x: number): number {
  return x;
}
```

If we wanted to implement a similar function for strings, we will need to define a different function:

```typescript
function identityString(x: string): string {
  return x;
}
```

This approach is not scalable, as we would need to do the same for all types we want to support.

A possible approach would be to turn off TypeScript type system and use `any` as the type of the parameter:

```typescript
function identity(x: any): any {
  return x;
}
```

The problem here is that we will lose all type safety when using the value returned from the function:

```typescript
const num = identity(1.234e3);
const str = identity('foo');

num.toFixed(); // -> OK: 1234
str.toFixed(); // -> Runtime Error: str.toFixed() is not a function
```

Generics address this problem by letting you define a *placeholder* for the type. Thus, you will be able to write a single function that works for each and every type without losing any of the TypeScript's type safety goodness:

```typescript
function identity<T>(x: T): T {
  return x;
}

const num = identity(1.234e3);
const str = identity('foo');

num.toFixed(); // -> OK: 1234
str.toFixed(); // -> Compile time err: toFixed() does not exist on type 'foo'
```

### Generic interfaces

Generic interfaces are interfaces that have some additional type, not previously known to the author of the interface, *attached* to them.

For example, when you create an array in TypeScript you're using a generic interface `Array<T>`:

```typescript
interface Array<T> {
  length: number;
  [index: number]: T; // remember index types?
  toString(): string;
  toLocaleString(): string;
  pop(): T | undefined;
  push(...items: T[]): number;
  concat(...items: ConcatArray<T>[]): T[];
  ...
}
```

| EXAMPLE: |
| :------- |
| See [02: Generics and Conditional Types &mdash; Hello, Generic interfaces!](02-hello-generic-interfaces) for a runnable example. |

### Generic types

Generics can also be used in plain types:

```typescript
type Dictionary<T> = Record<String,V>;
```


### Generic classes

Generics in classes are specified at the class declaration:

```typescript
class Box<T> {
  #value: T;

  constructor(value: T) {
    this.#value = value;
  }

  get value(): T {
    return this.#value;
  }
}
```

Methods in the class can add their own generic placeholders, which will apply to the method scope:

```typescript
class Box<T> {
  #value: T;
...

  map<U>(mapper: (value: T) => U): U {
    return mapper(this.#value);
  }
}
```

| EXAMPLE: |
| :------- |
| See [03: Hello, Generic classes!](03-hello-generic-classes) for a runnable example. |


### Generic functions

Generics in functions are defined in the function declaration:

```typescript
function identity<T>(item: T): T {
  return item;
}
```

Generics, just like variables, have scopes and you can use generics at multiple levels:

```typescript
function map<T, U>(fn: (item: T) => U) {
  return (items: T[]) => {
    return items.map(fn);
  };
}
```

The function above map accepts a function that transforms an individual item of type `T` to another element of type `U`, and returns a function that will accept an array of elements of type `T` and that will apply the function given as argument to each of the elements of the array.

For example:

```typescript
const lengthify = map((x: string) => x.length);
const words = ['hello', 'to', 'jason', 'isaacs'];
console.log(lengthify(words)); // 5, 2, 5, 6
```

Note how in the implementation of the `map` function, we're using the `T` placeholder in the inner function which is returned from `map`.

| EXAMPLE: |
| :------- |
| See [05: Generic functions](05-generic-functions) for a runnable example. |

### Generic constraints (384)

### Generic defaults

## Conditional types

## Summary

## You know you've mastered this chapter when...

## Exercises, code examples, and mini-projects

### [01: Hello, Generics!](01-hello-generics)
Illustrates the basics of generics by writing a function with type safety on and that works for any type.

### [02: Generics and Conditional Types &mdash; Hello, Generic interfaces!](02-hello-generic-interfaces)
Illustrates how to create and implement a generic interface, namely a simple array with `length`, `push`, and `pop` methods.

### [03: Hello, Generic classes!](03-hello-generic-classes)
A simple example illustrating how to create classes with generic placeholder types and methods using their own generic placeholder types.

### [04: A Generic Set Class](04-generic-set-class)
Illustrates how to implement a *Set* class with a generic type placeholder

### [05: Generic functions](05-generic-functions)
Illustrates how to implement a generic function, and how generic placeholders can be used in inner functions.


## ToDo
