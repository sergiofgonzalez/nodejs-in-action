# TypeScript: Chapter 22 &mdash; Workshop: Generics and Conditional Types
> an introduction to advanced types

## Contents
+ Introducing generics
+ Generics constraints
+ Generics defaults
+ Conditional types

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

### Constraining generic placeholders

TypeScript allows you to constrain a generic placeholder to some subset of types.

The snippet above defines a `getLength()` that will work for any kind of array or strings, but not for other types.

```typescript
function getLength<T extends any[] | string>(x: T): number {
  return x.length;
}
```

In the following example we define a function that accepts a generic argument of either `Date` or `number`:

```typescript
function toDate<T extends Date | number>(x: T): Date {
  if (x instanceof Date) {
    return x;
  }
  return new Date(x);
}
```

| NOTE: |
| :---- |
| Note that `x instanceof type` is a great way to instrospect about the type of an object. |


| EXAMPLE: |
| :------- |
| See [06: Hello, generic constraints](06-hello-generic-constraints) for a runnable example. See also [07: A generic memoize function](07-generic-memoize) for a comprehensive example using constraints, utility types, etc.|

### Generic defaults

Generic defaults are used when you want to allow for generics, but you don't want to make them mandatory and instead want to provide sensible defaults that could be overridden as needed.

The following snippet illustrates how to do that

```typescript
interface Identifiable<Id extends string | number = number> {
  id: Id;
}

interface Person extends Identifiable {
  name: string;
  age: number;
}

interface Car extends Identifiable<string> {
  make: string;
}

const p: Person = {
  id: 1,
  age: 55,
  name: 'Jason Isaacs'
};

const c: Car = {
  id: 'W12',
  make: 'Mercedes'
};
```

This is extensively used in React components, in which they allow you to declare a component with properties and state, but only if you need it:

```typescript
interface Component<P = {}, S = {}> {
  ...
}
```

This is a custom example illustrating this approach with generic defaults:

```typescript
interface Component<P = {}, S = {}> {
  id: string;
  update() : void;
  properties?: P;
  state?: S;
}

const mySpanComponent: Component = {
  id: 'span1',
  update: () => { console.log(`${ mySpanComponent.id } has been updated`); }
};

mySpanComponent.update();

const myButtonComponent: Component<{ color: string, label: string }, { isDisabled: boolean, isPressed: boolean }> = {
  id: 'btn1',
  properties: {
    color: 'blue',
    label: 'Press me!'
  },
  state: {
    isDisabled: false,
    isPressed: false
  },
  update: () => { console.log(`${ myButtonComponent.id } has been updated`); }
};
```

See how the interface defines generic defaults for the types `P` and `S` that model the properties and state of the component. Then, simple components, don't need to use them and their use is very simple, while more complicated ones can provide their own properties and status.

| EXAMPLE: |
| :------- |
| See [08: Hello, generic defaults!](08-hello-generic-defaults) for a runnable example. |

## Conditional types

Conditional types let you create type definitions with logic baked into them. It lets you use syntax such as `T extends U ? X : Y`.

Consider the following snippet, which defines a type for non-null values:

```typescript
type NotNull<T> = T extends null | undefined ? never : T;
```

The type definition then can be used in functions as seen below, where we define a `isNotNull` function that takes a generic element and returns a `NotNull<T>`.

```typescript
function isNotNull<T>(x: T): x is NotNull<T> {
  return x !== null && x !== undefined;
}

const items = [1, 2, null, 3, undefined, 4];

const nonNullItems = items.filter(isNotNull); // -> [1, 2, 3, 4]
```

Note the return type of the function is annotated as `x is NotNull<T>`. This is type guard: a expression that performs a runtime check to guarantee that the type in some scope (See [More on type guards](#more-on-type-guards) section below).

The function `isNotNull()` is our type predicate, and we're telling the system that `isNotNull()` will return `true` when `x` is of type `NotNull<T>` for some `T`.

Note that the use case above is only an example, and a proper `NonNullable<T>` type is provided by TypeScript itself:

```typescript
/* There's already a built-in type for that anyways */

function isNotNullable<T>(x: T): x is NonNullable<T> {
  return x !== null && x !== undefined;
}

console.log(items.filter(isNotNullable));
```

| EXAMPLE: |
| :------- |
| See [09: Hello, conditional types!](09-hello-conditional-types) for a runnable example on the example above, and also on type guards. |

Apart from the `is` keyword for type predicated, TypeScript also features the `infer` keyword which lets you infer the type of a type from another type:

```typescript
type ArrayItem<T extends any[]> = T extends Array<infer U> ? U : never;
```

The previous snippet let us access the inner type of an array via the wrapping array.

For example:

```typescript
type ExtractedPerson = ArrayItem<Team>; // ExtractedPerson == Person

function processPerson(p: ExtractedPerson) {
  console.log(`${ p.name } (${ p.age })`);
}

const actors: Team = [
  { name: 'Jason Isaacs', age: 57 },
  { name: 'Idris Elba', age: 52 }];

for (const p of actors) {
  processPerson(p);
}
```

| NOTE: |
| :---- |
| The previous definition is equivalent to `ArrayItem<T extends any[]> = T[number]`. |


That type of construct is also be useful to *unbox* a type that does not come from an array:

```typescript
type PromiseValueType<T> = T extends Promise<infer U> ? U : never;

console.log(`\n=== unboxing a promise with infer`);
type PromisedPerson = Promise<Person>;
type UnpromisedPerson = PromiseValueType<PromisedPerson>; /* it is a Person */

function printPersonInfo(p: UnpromisedPerson) {
  console.log(p.name);
  console.log(p.age);
}
```

Note that something like:

```typescript
type IncorrectPromiseValueType<T> = T extends Promise<any> ? U : never;
```
will not do the unboxing, that is, if you don't use `infer`, the type `IncorrectPromiseValueType<Promise<Person>>` will be `Promise<Person>` and not `Person`.

### More on type guards

Consider the following example that defines two distinct types and a function that randomly returns an object of either type:

```typescript
interface Fish {
  swim(): void;
}

interface Bird {
  fly(): void;
}


function getSmallPet(): Fish | Bird {
  const randomBoolean = Math.random() < 0.5;
  if (randomBoolean) {
    return {
      swim: () => { console.log(`swim()`); }
    };
  } else {
    return {
      fly: () => { console.log(`swim()`); }
    };
  }
}
```

In our code, if we want to understand what type of pet we're dealing with, we will need to do something like the following:

```typescript
const pet = getSmallPet();
if ('swim' in pet) {
  console.log(`It is a fish!`);
} else if ('fly' in pet) {
  console.log(`It is a bird!`);
} else {
  console.log(`It is a gremlin!`);
}
```

This is quite ugly, as the writer needs to understand the underlying shape of both `Fish` and `Bird`.


TypeScript type-guards provide a much cleaner approach to these use cases. Type-guards involve creating a function with this shape:

```typescript
function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}
```

The function above leverages a *type predicate*. A predicate takes the form `parameterName is Type` where `parameterName` must be the name of a parameter of the function signature.

The function itself returns a boolean, but what we're indicating above is that when the function returns `true` the argument will be a `Fish`.

Then, we can use it to provide a much cleaner code:

```typescript
if (isFish(pet)) {
  pet.swim();
} else {
  pet.fly();
}
```

Notice that TypeScript not only knows that `pet` is a `Fish`, but also that the `else` branch is a `Bird`. This saves use from any additional casting.


We can use the type-guard function to filter out/classify the elements in our array:

```typescript
const pets: (Fish | Bird)[] = [getSmallPet(), getSmallPet(), getSmallPet(), getSmallPet(), getSmallPet()];
const fishPets: Fish[] = pets.filter(isFish);
const birdPets: Bird[] = pets.filter((pet): pet is Bird => !isFish(pet));
```

| EXAMPLE: |
| :------- |
| See [09: Hello, conditional types!](09-hello-conditional-types) for a runnable example on the example above, and also on type guards. |


## You know you've mastered this chapter when...
+ You're familiar with generics and conditional types, and understand their benefits.

+ You're comfortable reading and writing code with generic placeholders in interfaces, classes, types and functions/methods.

+ You're aware of generic constraints, and how you can use it to narrow down the type of a generic place holder (`T extends ...`).

+ You're aware of generic defaults, and how it can be used to simplify the developer experience when using generics (`T extends string | number = number`).

+ You're aware of conditional types, you know how to read them and you feel comfortable creating simple conditional types.

+ You're aware of type guards and type predicates to create your own user-defined type guard functions.

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

### [06: Hello, generic constraints](06-hello-generic-constraints)
Simple examples illustrating how to establish constraints on generic types.

### [07: A generic memoize function](07-generic-memoize)
A very detailed walkthrough on how to create a generic, type-safe `memoize()` function, in which type-safety is achieved through utility types (i.e. *mapped types*) such as `Record<K,V>`, `Parameters<T>`, and `ReturnType<T>`.

### [08: Hello, generic defaults!](08-hello-generic-defaults)
Illustrates how to use generic defaults so that you can provide a default value for a generic placeholder.

### [09: Hello, conditional types!](09-hello-conditional-types)
Illustrates the use of conditional types and types predicates and type guards, and how to infer/unbox inner types from arrays and promises using `infer`.

### [e01: Hello, Partial Type!](e01-hello-partial)
Illustrates the use of the utility type `Partial<Type>` which constructs a type from another type in which all the properties are set to optional.

### [e02: Creating a `DeepPartial<T>` type](e02-deep-partial-type)
A detailed example with step by step information about how to create a complex type `DeepPartial<T>`.

## ToDo
