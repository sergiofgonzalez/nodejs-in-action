# TypeScript: Chapter 15 &mdash; Workshop: TypeScript Fundamentals
> TypeScript fundamentals in action

## Contents
+ First steps into TypeScript type system: type annotationes and type inference
+ Function types in TypeScript
+ Object types in TypeScript: *duck-typing* and interfaces for literal objects
+ TypeScript basic types
+ Arrays in TypeScript
+ Tuples
+ Enums
+ Suspending TypeScript type system with `any` and `unknown`
+ `null` and `undefined`
+ `never`
+ Function types in TypeScript
+ Making your own types with classes, interfaces and type aliases.


## Types and their uses

TypeScript is a strongly typed language. To bind a variable to a type you can *annotate* the variable with the type:

```typescript
// type annotation
let variable: number;
```

Alternatively, you can simply assign a value to the variable, and TypeScript will *infer* the type of the value and *bind* it to the variable:

```typescript
// type inference
let variable = 5;
```

## TypeScript and functions

In TypeScript, a function can only be called using valid arguments &mdash; both in number and type.

An example of how the function arguments and return type are annotated:

```typescript
function add(x: number, y: number): number {
  return x + y;
}
```

| NOTE: |
| :---- |
| In general, it is not necessary to annotate the return type of the function, as TypeScript can infer it. However, when doing so, TypeScript will make sure that we're returning exactly what the function signature states. |

## TypeScript and objects

TypeScript performs type inference activities even on object literals. For example, the following block of code won't compile in TypeScript:

```typescript
const person = {
  firstName: 'Jason',
  lastName: 'Isaacs'
};

console.log(`Hi, ${person.name}`); // property 'name' does not exist on type
```

It won't also allows us to populate the object literal properties with values of the incorrect type:

```typescript
const person = {
  firstName: 'Jason',
  lastName: 'Isaacs'
};

person.lastName = 53; // Type number is not assignable to string
```

Using a TypeScript *interface* you would be able to define a *type* &mdash; the structure that some object will need to satisfy. This will allow us to declare the types of the corresponding object properties, and whether they're optional or required:

```typescript
interface Person {
  firstName: string;
  lastName: string;
  age?: number;
}
```

By doing so, you will be able to declare your object literals of that type:

```typescript
const person: Person = {
  firstName: 'Jason',
  lastName: 'Isaacs'
};

person.age = 54;
```

You can use the defined interface as type annotation for function arguments and return types:

```typescript
function showFullName(person: Person) {
  ...
}

function makePerson(name: string, surname: string): Person {
  ...
}
```

It must be noted that the interfaces in TypeScript are structural and nominal. This means that *duck-typing* applies, and as such, any object literal with string properties `firstName` and `lastName` will conform to the `Person` interface, even if we haven't explicitly set the type of the object literal to `Person`:

```typescript
const jason = {
  firstName: 'Jason',
  lastName: 'Isaacs'
};

showFullName(jason); /* no need to do `jason: Person` this is fine because of duck typing */
```
## Basic Types

Although JavaScript is a loosely typed language, it uses a type system internally.

You can get some information about those internal types with the `typeof` operator:

```javascript
const value = 1234;
console.log(typeof value); // -> 'number'

const value = 'hello!';
console.log(typeof value); // -> 'string'

const value = false;
console.log(typeof value); // -> 'boolean'

let value;
console.log(typeof value); // -> 'undefined' (yup, it's a primitive!)

const person = { name: 'Jason', lastName: 'Isaacs' };
console.log(typeof person); // -> 'object'

function add(x, y) { return x + y }
console.log(typeof add);    // -> 'function'
```

### Arrays

It's common for arrays to hold elements with certain similarity, so that you can apply certain logic iteratively to each of the elements of the array.

In TypeScript, you do that by writing the type of the array's elements when defining it:

```typescript
let numbers: number[];
numbers.push('zero'); // -> Error: string not assignable to type 'number'
```

Alternatively, you can use the generic type syntax:

```typescript
const numbers: Array<number>;
```

Also, you can let TypeScript infer the correct array type:

```typescript
const numbers = [1, 2, 3, 4, 5];
numbers[3] = 'four'; // -> Error: string not assignable to type 'number'
```

### Tuples

Consider the following block of code in which we use an array to pack some person data. By convention, we define the first element to be the person's first name, the second element would be the person's last name, and the third element would be the person's age. This is not a *regular TypeScript* array as the elements are not homogeneous, so we call this a tuple:

```typescript
const person = ['Jason', 'Isaacs', 54];

console.log(`First name: ${ person[0] }`);  // -> Jason
console.log(`Last name : ${ person[1] }`);  // -> Isaacs
console.log(`Age       : ${ person[2] }`);  // -> 54
```


TypeScript lets you declare the internal structure of the tuple:

```typescript
const person: [string, string, number] = ['Jason', 'Isaacs', 54];
```

and it will also infer the corresponding internal structure when not explicitly given:

```typescript
person[2].toLowerCase(); // -> Error: 'toLowerCase' does not exist on type 'number'
```

### Enums

TypeScript allows you to define and use enumerations as follows:

```typescript
enum Suit {
  Hearts,
  Diamonds,
  Clubs,
  Spades
}

let trumpSuit = Suit.Hearts;
```

Any attempt to to assign something else to the variable will result in an error.

TypeScript will automatically assign numbers starting from zero to the options provided, but you can assign specific values using the following syntax:

```typescript
enum Suit {
  Hearts = 10,
  Diamonds = 20,
  Clubs = 30,
  Spades = 40
}

// alternatively
enum Suit {
  Hearts = 'hrts',
  Diamonds = 'dmnds',
  Clubs = 'clbs',
  Spades = 'spds'
}
```
### `any` and `unknown`

TypeScript provides the `any` type, which you can use to suspend TypeScript's strict type checking so that you can do:

```typescript
let variable: any = 3;
if (Math.random() > 0.5) {
  variable = 'invalid value';
}
```

Effectively, `any` will revert the checks performed on the variables annotated with that type to the default JavaScript behavior. Additionally, most of the calls that include a variable of the `any` type will infer a result of the same type &mdash; as a result even if we use `any` in a single place in our application, it will propagate to lots of places.

| NOTE: |
| :---- |
| `any` negates most of the TypeScript's type checking benefits. It should be used as seldom as possible, and only when absolutely necessary. It can be a powerful tool to use when you are upgrading existing JavaScript code into TypeScript. |

TypeScript introduced the `unknown` type to address some of the problems of `any`. While still dynamic, the `unknown` type is much more constricted in what can be done with it:

```typescript
// this works with any
const variable: any = getSomeResult(); // returns a value of some type (anything goes)
const str: string = variable; // OK: this is a sort of casting any -> string
variable.toLowerCase(); // OK: allowed, but it might fail at runtime

// but fails with unknown
const variable: unknown = getSomeResult();
const str: string = variable; // ERROR: unknown is not assignable to string
variable.toLowerCase(); // ERROR: object is of type `unknown`
```

The `unknown` type forces you to explicitly test its type before you can do anything with it:

```typescript
const variable: unknown = getSomeResult();

if (typeof variable === 'string') {
  const str: string = variable; // OK, we checked the value before
  variable.toLowerCase(); // OK, we know it's a string
}
```

### `null` and `undefined`

`null` and `undefined` share the same meaning in JavaScript and TypeScript:
+ `null` &mdash; there is no value, but some piece of code explicitly set the variable to this value.
+ `undefined` &mdash; there is no value, but there's a lot of chances that the value was not set at all (e.g. optional values not populated, etc.)

### `never`

The `never` type (specific to TypeScript) represents a value that never occurs. This is useful for functions whose end is not reachable:

```typescript
function throwsError(): never {
  throw new Error(`An error has occurred`);
}
```

TypeScript type inference system will also assign the type `never` in situations like the following:

```typescript
const x = true;
if (x) {
  console.log(`This will always be printed: ${ x.toString() }`);
} else {
  console.log(`This will never be printed: ${ x.toString() }`); // Error: toString does not exist on type never
}
```

### Function types

In TypeScript, to fully describe the type of a function requires the identification of the parameter types and return type.

For example, the type of a function `function sum(x: number, y: number): number` will be written as `(x: number, y: number) => number`.

As a result, if you expect an argument, to be a function of this type you'd write:

```typescript
function add(x: number, y: number) {
  return x + y;
}

function performOperation(x: number, y: number, op: (x: number, y: number) => number) {
  return op(x, y);
}

performOperation(2, 3, add); // -> 5
```

### Making your own types

This subsection is a gentle introduction to the different ways in which you can create custom types in TypeScript. Each option will be explored in detail in subsequent chapters.

#### Classes

You can use the **class specification** to declare your own classes with properties and methods:

```typescript
class Person {
  constructor(public firstName: string, public lastName: string, public age?: number) {
  }

  getFullName() {
    return `${ this.firstName } ${ this.lastName }`;
  }
}

const person = new Person('Jason', 'Isaacs');
console.log(person.getFullName());
```

#### Interfaces

You can formalize complex structures with interfaces:

```typescript
interface Person {
  firstName: string;
  lastName: string;
  age?: string;
}
```

| NOTE: |
| :---- |
| Unlike classes, interfaces are TypeScript-only constructs that are checked statically and don't generate code. |

#### Type aliases
You can use the `type` keyword to give a name to an existing type.

```typescript
type integer = number;

type Person = [string, string, number?];

type Person = {
  firstName: string;
  lastName: string;
  age?: number;
}

type FilterFunction = (person: Person) => boolean;
```

## Summary
In this chapter you got familiarized yourself with TypeScript and started to learn about its type system. You learned how to write your first basic programs, as a stepping stone to do more interesting things.

## You know you've mastered this chapter when...

+ You're comfortable creating type annotations in your programs for the variable and function declarations that you do in your programs.

+ You understand that many times, explicit type annotations are not needed because TypeScript can infer the type of a variable and bound it to the variable implicitly. You're aware that it doesn't mean that you can change the underlying type of a variable.

+ You're aware that TypeScript will enforce that function calls happen with the expected number of arguments and type.

+ You understand that TypeScript will apply *duck-typing* when working with object literals: this means that if a particular object literal properties have been given types (either explicitly through an interface definition or implicitly via assignment) an object with matching types will be subject of being used whenever the original one is used.

+ You're comfortable creating basic interfaces in TypeScript and using them to annotate object literal, functions, etc.

+ You're familiar with the basic types of TypeScript (that can be obtained via the `typeof` operator): `number`, `string`, `boolean`, `undefined`, `object` and `function`.

+ You're comfortable defining arrays using the syntax: `number[]` or the generic type syntax `Array<number>`.

+ You're familiar with the concept of tuples &mdash; collections with heterogenous items. You know how to declare the types of a tuple explictly (`const person: [string, string, number]`), and how to create arrays of tuples.

+ You're familiar with *enums* to define enumerations. You understand how to use them and adjust their values to specific numbers or strings.

+ You're familiar with `any` as a way to disable TypeScript type checking engine, but understand that it debunks the benefits of TypeScript and should be used as seldom as possible, and only when there is no other option. You understand that annotating a variable as `any` has a tendency to propagate to lots of places, so that the actual damage tends to be bigger than initially planned.

+ You understand that `unknown` is a much safer alternative to `any`, as it forces you to explicitly test the type of an `unknown` variable before it can be properly used as a variable of that type.

+ You understand that `null` and `undefined` share the same meaning in JavaScript and TypeScript, and understand that both mean that there is no value, but if you find a variable whose value is `null` there is some piece of code that is explicitly setting that value to that variable.

+ You understand that `never` type (specific to TypeScript) is used to represent a value that will never occur such as code that will never be reached or functions that throw an exception in all cases.

+ You are comfortable using the syntax that lets you define the type of a function, and know how to use it to declare function parameters that expect functions as arguments.

+ You're familiar with the concept of classes and interfaces in TypeScript, and understand the interfaces are checked statically and do not generate code. You understand that there is way to define class properties in TypeScript in constructors.

+ You're familiar with the `type` keyword that lets you give a name to an existing type, so that it is easier to refer to it. That can be useful to simplify type annotations of arrays of tuples (for examples).

## Exercises, code examples, and mini-projects

### [00: TypeScript project starter](00-hello-ws-ts)
A project starter for the TypeScript workshop exercises and examples

### [01: TypeScript Fundamentals &mdash; Using `tsconfig.json` and getting started with TypeScript](01-getting-started)
Creating a simple TypeScript program and transpiling it based on the options specified.

### [02: Working with functions in TypeScript](02-working-with-functions)
Define a simple function and see how you can and can't invoke it.

### [03: Working with objects](03-working-with-objects)
Define a simple object and understand the constraints that TypeScript type system imposes in that object.

### [04: Examining `typeof`](04-examining-typeof)
Illustrates how to use `typeof` and analyses the responses for different types of variables.

### [05: Using arrays and tuples for efficient sorting of objects](05-using-arrays-and-tuples-for-sorting)
Illustrates how to use arrays and tuples to create an efficient sorting algorithm.

### [06: Making a calculator function](06-calculator-function)
Illustrates how define a function that take the operands and operation as parameters

### [e01: TypeScript Fundamentals &mdash; Creating a library for working with strings](e01-library-for-strings)
Illustrates how to create a TypeScript library consisting of a series of simple functions that operate on strings.

## ToDo

