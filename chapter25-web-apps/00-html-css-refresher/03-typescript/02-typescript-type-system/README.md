# TypeScript: Chapter 02 &mdash; TypeScript's Type System
> exploring TypeScript's type system

## Contents

+ The `any` type
+ Explicit casting
+ Union types and type guards
+ Type aliases
+ Enums and *const enums*
+ `null` and `undefined` in TypeScript
+ Optional chaining and the nullish coalescing operator
+ Definite assignment
+ The `object` type
+ The `unknown` type
+ The `never` type
+ The spread operator for objects and arrays
+ Tuples
+ Object destructuring
+ Functions: optional parameters, default values and rest parameters.
+ Function signatures
+ Function overrides
+ Literals

## any, let, unions, and enums

### The `any` type

TypeScript allows you to use the *type annotation* syntax to define what a particular variable, or function parameter, or function return type should be:

```typescript
var myVarName: type;
function myFunction(a: type1, b: type2): returnType { ... }
```

TypeScript introduces the `any` type for the situations in which we want to benefit from JavaScript's *relaxed* typing system.

For example, we already know that this will not compile in TypeScript:

```typescript
var item1 = { id: 1, name: 'item1' };
item1 = { id: 2 };  /* ERROR: object does not feature `name` property */
```

so they way to fix it in TypeScript is to annotate `item1` as follows:

```typescript
var item1: any = { id: 1, name: 'item1' };
item1 = { id: 2 };  /* OK: it is `any` */
```

> The `any` type allows a variable to follow JavaScript loosely defined typing rules so that *anything* can be assigned to *anything*.

| NOTE: |
| :---- |
| The usage of `any` is needed to backward compatibility with JavaScript, but its usage is discouraged, as it disables TypeScript's *strong typing* system. |

### Explicit casting

As with any other strongly typed language, there will be situations on which we need to explicitly specify the type of an expression using a cast.

In TypeScript we use the following syntax forms:

```typescript
var item1 = <any>{ id: 1, name: 'item1' };
// or
var item1 = { id: 1, name: 'item1' } as any;
```

### Union types

TypeScript allows you to express a type as a combination of two or more other types. These types are known as *union types* and use the following syntax:

```typescript
function printObject(obj: string | number) {
  console.log(`obj = ${obj}`);
}
```

The function parameter for the function above can be either a string or a number.

### Type guards

When working with union types the compiler will still apply strong typing rules as can be seen in the example below:

```typescript
function addWithUnion(
  arg1: string | number,
  arg2: string | number
) {
  return arg1 + arg2;
}
```

The code snippet above will fail to compile with error: "Operator '+' cannot be applied to types 'string | number' and 'string | number'."

That can be fixed with a *type guard* &mdash;an expression that performs a check on your type, and then guarantees that type is within the expected scope:

```typescript
function addWithUnion(
  arg1: string | number,
  arg2: string | number
) {
  if (typeof arg1 === 'string') {
    return arg1 + arg2; // concatenation
  }

  if (typeof arg1 === 'number' && typeof arg2 === 'number') {
    return arg1 + arg2; // addition
  }

  /* default: treat both as strings */
  return arg1.toString() + arg2.toString();
}
```

When doing so, the compiler won't complain, as it can detect the exact type of the arguments.

### Type aliases

TypeScript allows you to create a *named type* that can be used as a substitute for a type union. *Type aliases* can be used anywere a type can be used:

```typescript
type stringOrNumber = string | number;

function addWithTypeAlias(
  arg1: stringOrNumber,
  arg2: stringOrNumber
) {
  return arg1.toString() + arg2.toString();
}
```

### Enums

*Enums* are used to define human-readable name for a specific number of string, as can be seen in the example below:

```typescript
enum DoorState {
  Open,
  Closed
}

function checkDoorState(state: DoorState) {
  console.log(`enum value is:`, state); /* 0 - Open, 1 - Closed */
  switch (state) {
    case DoorState.Open:
      console.log(`Door is open`);
      break;
    case DoorState.Closed:
      console.log(`Door is closed`);
      break;
  }
}

checkDoorState(DoorState.Open);
checkDoorState(DoorState.Closed);
```

As in other languages, you can set the numerical values of the enum doing:

```typescript
enum DoorStateSpecificValues {
  Open = 3,
  Closed = 7,
  Unspecified = 256
}
```

You can also create *string enums*:

```typescript
enum DoorStateString {
  OPEN = 'Open',
  CLOSED = 'Closed'
}

console.log('OPEN=', DoorStateString.OPEN); // 'Open'
```

#### Const enums

Another notable variant of *enums* in TypeScript is the *const* enum:

```typescript
const enum DoorStateConst {
  Open = 10,
  Closed = 20
}
```

This was introduced for performance reasons, as it helps the TypeScript compiler to generate leaner, more efficient code.

In particular, if you compile `console.log('Door is', DoorStateConst.OPEN);`) the compiler will make an inline substituion of the values as in: `console.log('Door is', 10 /* OPEN */);`

## More primitive types

### Undefined

In TypeScript, we can use the `undefined` type to explicitly state that a variable could be undefined:

```typescript
function checkAndPrintElement(elem: string | undefined) {
  if (elem === undefined) {
    console.log(`Invalid array element!`);
  } else {
    console.log(`element:`, elem);
  }
}
```

The `undefined` type allows you to explictly state when you expect a variable that might not have been defined yet.

### Null

TypeScript also allows you to set a value to `null` to indicate that a variable is defined, but no value has been assigned to it yet.

```typescript
function printValue(a: number | null) {
  console.log(`a:`, a);
}
```

### Conditional expressions

TypeScript allows you to use the ternary operator for conditional expressions much in the same way you'd do in *JavaScript*.

```typescript
const value: number = 10;
const message: string = value > 10 ? 'value is larger than 10' : 'value is 10 or less';
```

### Optional chaining

You can use optional chaining in TypeScript as seen on the following code snippet:

```typescript
function printNestedObjectProperty(obj: any) {
  if (obj?.nestedProperty?.name) {
    console.log(`name:`, obj.nestedProperty.name);
  } else {
    console.log(`name not found or undefined`);
  }
}
```

When using the optional chaining, if any of the nested properties return `null` or `undefined`, the entire statement will return `undefined`.

### Nullish coalescing

Nullish coalescing is a handy shorthand that provides a default value for an expression that returns `null` or `undefined`:

```typescript
function nullishCheck(a: number | null | undefined) {
  console.log(`a:`, a ?? `undefined or null`);
}
```

### Null or undefined operands

TypeScript will enforce the validity of the operands when performing basic operations (`+`, `-`, `*`, `/`).

For example, the following will fail to compile:

```typescript
function add(a: number, b: number | null | undefined) {
  let result = a + b; /* ERROR: Object is possibly 'null' or 'undefined'. */
}
```

### Definite assignment

Consider the following code snippet:

```typescript
var globalString: string;
setGlobalString('The globalString now has a value');
console.log(`globalString:`, globalString); /* ERROR: Variable 'globalString' is used before being assigned. */

function setGlobalString(value: string) {
  globalString = value;
}
```

There does not seem to be anything wrong with the code, and yet, the compiler complains and won't generate any code. Actually, if we remove the type annotations it will run correctly as a JavaScript program.

This happens because unfortunately, the TypeScript compiler cannot understand that by invoking `setGlobalString(...)` we are setting the value of the `globalString` variable.

The definite assignment assertion syntax can be used to give a hint to the compiler that the code we've written is valid:

```typescript
var globalString: string;
setGlobalString('The globalString now has a value');
console.log(`globalString:`, globalString!);

function setGlobalString(value: string) {
  globalString = value;
}
```

The `!` is telling the compiler that you want to override the type checking rules, and are willing to use the `globalString` variable even if it thinks it has not been assigned a value.

Another place in which you can use the *definite assignment* is when declaring the variable:

```typescript
var globalString!: string;
setGlobalString('The globalString now has a value');
console.log(`globalString:`, globalString);

function setGlobalString(value: string) {
  globalString = value;
}
```

| NOTE: |
| :---- |
| The use of the *definite assignment* operator is discouraged, as it disable the strong typing system. When tempted to use it, consider refactoring your code. |

### Object

The `object` type can be used to cover types that are not primitives:

```typescript
let structuredObject: object = {
  name: 'myObj',
  properties: {
    id: 1,
    type: 'anObject'
  }
}

function printObject(a: object) {
  console.log(`a:`, a)
}

printObject(structuredObject);
```

Note that in TypeScript, we won't be able to do:

```typescript
printObject('Hello to Jason Isaacs!');
```

because strings are not assignable to objects.

### Unknown

TypeScript introduces a special type into its list of basic types, which the type `unknown`.

> The `unknown` type is a type-safe alternative to `any`. A variable marked as `unknown` can hold any type of value, but it cannot be assigned to a *known type* without explicit casting.

That is, while the following will work:

```typescript
let a: any = 'test';
let aNumber: number = 2;
aNumber = a;  // wait, what??
console.log(`aNumber:`, aNumber); // -> 'test'
```

using `unknown` will give us the expected behavior:

```typescript
let u: unknown = 'unknown value';
u = 1; // OK: unknown is like `any` so it can warp its type
let aNumber2: number;
// aNumber2 = u; /* ERROR: 'unknown' is not assignable to 'number' */
aNumber2 = <number>u; // OK
```

### Never

The `never` primitive type is used to indicate instances where something should never occur.

Consider the following code:

```typescript
function alwaysThrows2(): never {
  throw new Error('this will always throw too');
  return -1; /* ERROR: type 'number' is not assignable to 'never' */
}
```

### Never and switch

The `never` type can also be used to trap logic errors within `switch` statements.


In the following example, the developer failed to include a case for the `AnEnum.SECOND`. Adding the never assignment after the switch can help spot those mistakes:

```typescript
enum AnEnum {
  FIRST,
  SECOND
}

function getEnumValue(enumValue: AnEnum): string {
  switch (enumValue) {
    case AnEnum.FIRST:
      return "first case";
  }
  let returnValue: never = enumValue; /* ERROR: Type 'AnEnum' is not assignable to type 'never' */
  return returnValue;
}
```

## Object spread

You can use the *object spread* technique in TypeScript.

```typescript
// UC1: object copy
let firstObject: object = { id: 1, name: 'firstObject', otherProperties: { age: 47, interests: ['sports', 'movies']} };
let secondObject: object = { ...firstObject };

console.log(`secondObj:`, secondObject);

// UC2: combining objects together
let nameObj: object = { name: 'Jason Isaacs' };
let idObj: object = { id: 1 };

let objCombined = { ...nameObj, ...idObj };
console.log(`objCombined:`, objCombined);
```

| NOTE: |
| :---- |
| When using object spread, if two objects have the same property the object that was specified last will take precedence. |

### Spread with arrays

The spread syntax can also be used with arrays:

```typescript
let firstArray: number[] = [1, 2, 3];
let secondArray: number[] = [4, 5, 6];
let thirdArray = [...firstArray, ...secondArray]; // -> [1, 2, 3, 4,5, 6]
```

## Tuples

Tuples let you define a type that has a finite number of unnamed properties, with each property having an associated type.

```typescript
let tuple1: [string, boolean]; /* 2-tuple [string, boolean] */
tuple1 = ['test', true];

console.log(`tuple1:`, tuple1);

// tuple1 = ['test2']; // ERROR: [string] not assignable to [string, boolean]
```

Tuples can be accessed using the array syntax:

```typescript
tuple1 = ['test', true];
console.log(`tuple1[0]:`, tuple1[0]); // -> 'test'
console.log(`tuple1[1]:`, tuple1[1]); // -> true
```

And you can also use destructuring:

```typescript
let [elem1, elem2] = tuple1;
console.log(`tuple element 1:`, elem1); // -> 'test'
console.log(`tuple element 2:`, elem2); // -> true
```

### Optional tuple elements

An interesting feature of TypeScript tuples is that it allows you to declare some of the tuple elements as optional by marking them with a `?`:

```typescript
let tupleOptional: [string, boolean?];
tupleOptional = ['test'];
console.log(`tupleOptional[0]:`, tupleOptional[0]); // -> test
console.log(`tupleOptional[1]:`, tupleOptional[1]); // -> undefined
```

### Tuples with a variable number of elements

You can also define tuples that can have a variable number of elements as seen below:

```typescript
let tupleSpread: [number, ...string[]];
tupleSpread = [1];
tupleSpread = [1, 'string'];
tupleSpread = [1, 'string1', 'string2'];
```

The first line declared `tupleSpread` as a tuple with a number and a variable number of strings following it.

### Object destructuring

TypeScript allows you to destructure objects in the same way you'd do in JavaScript:

```typescript
let complexObject = {
  aNum: 1,
  bStr: 'name',
  cBool: true
};

let { aNum, bStr, cBool } = complexObject;

// renaming also works
let { aNum: aFromObj, bStr: bFromObj, cBool: cFromObj } = complexObject;
console.log(`aFromObj=${aFromObj}, bFromObj=${bFromObj}, cFromObj=${cFromObj}`);
```

| NOTE: |
| :---- |
| Destructuring in TypeScript/JavaScript is based on the name of the property, and not on its position. |

## Functions

TypeScript includes a bunch of exciting features to functions to introduce enhanced type safety.

### Optional parameters

You can define functions with optional parameters just by marking the optional parameters with a `?`:

```typescript
function concatString(a: string, b?: string) {
  console.log(`a + b = ${a + b}`);
}

concatString(`first`, `second`);  // -> 'firstsecond'
concatString(`third`);            // -> 'thirdundefined'
```

| NOTE: |
| :---- |
| Any optional parameters must be listed last in the parameter list of the function definition. You can have as many optional parameters as you like, provided they always follow the non-optional ones. |

### Default parameters

TypeScript also allows you to specify a default value for a parameter that has not been specified:

```typescript
function concatStringWithDefault(a: string, b: string = 'default') {
  console.log(`a + b = ${ a + b }`);
}
concatStringWithDefault(`first`, `second`);
concatStringWithDefault(`third`);
```

### Rest parameters

TypeScript allows you to declare functions that receive a variable number of arguments using the *rest operator*:

```typescript
function displayReceivedArguments(...args: string[] | number[]) {
  for (const arg of args) {
    console.log(arg);
  }
}

displayReceivedArguments('one');
displayReceivedArguments('one', 'two', 'three', 'catorce');
displayReceivedArguments(1, 2, 3, 14);
//displayReceivedArguments('one', 2, 'three'); // ERROR: ['one', 2, 'three'] is not assignable to string[] or number[]
```

### Function callbacks

One of the most interesting features related to functions in TypeScript is that you won't be able to check whether the argument you have received is actually a function or not.

In order to make it work, you will need to annotate the function argument using the *fat arrow* syntax as seen below:

```typescript
let addFn = function (a: number, b: number): number {
  return a + b;
}
function compute(
  a: number,
  b: number,
  op: (param1: number, param2: number) => number
) {
  return op(a, b);
}

const result = compute(2, 3, addFn); // -> 5
compute(2, 3, 5); // ERROR: number cannot be assigned to (a: number, b: number) => number
```

| NOTE: |
| :---- |
| Note that the parameter names (`param1`, `param2`) are required when declaring a function type excpression. |


### Function overrides

TypeScript supports a sort of function overloading using the following special syntax and restrictions

```typescript
function addOp(a: string, b: string): string;   // no body supplied
function addOp(a: number, b: number): number;   // no body supplied
function addOp(a: any, b: any) {                // body supplied on any args
  return a + b;
}

addOp('Hello', 'World'); // -> HelloWorld
addOp(5, 4);             // -> 9
addOp(true, false);      // Error: no overload matches this call
```

Note the following:

+ The overloaded signatures are given with the correct arguments and no implementation.
+ You cannot give two different implementations for the function (you will get the error 'duplicate function implementation')
+ The actual function implementation, which must work for all the given overloads, must be declared with parameters of type `any` and return `void`.


### Literals

Literals are a hybrid between enums and type aliases.

A literal will limit the allowed values to a set of values specified, which must be strings, numbers, or boolean values.

```typescript
type AllowedStringValues = 'one' | 'two' | 'three';
type AllowedNumericValues = 1 | 5 | 8 | 14;

function withLiteralDo(input: AllowedStringValues | AllowedNumericValues) {
  console.log(`invoked with ${ input }`);
}

//withLiteralDo(7);         // ERROR: not assignable
//withLiteralDo('catorce'); // ERROR: not assignable

withLiteralDo(8);
withLiteralDo('three');
```

## You know you've mastered this chapter when...

+ You understand the `any` type in TypeScript, which disables the typing system rules.
+ You're familiar with the two syntax forms to perform explicit casting in TypeScript (`<number>myVar` and `myVar as number`).
+ You understand the union types, which allow you to declare a combination of two or more types.
+ You understand that you can use `typeof myVar` operator to check for the type of a given argument and applied specialized logic that depends on the type.
+ You understand the *type aliases* which allow you to give *friendly names* to type declarations in TypeScript (as in `type stringOrNumber = string | number`).
+ You're familiar with enums and const enums.
+ You understand how to use `undefined` and `null` when declaring types in TypeScript.
+ You're aware that you can use the ternary operator, nullish coalescing and optional chaining in TypeScript.
+ You are aware of the *definite assignment*.
+ You are familiar with the `object` type that lets you annotate types that are not primitives.
+ You're aware of the `unknown` type as a type-safe variant of `any`.
+ You're aware of the existence of the `never` type, used to indicate instances where something should never occur.
+ You're aware that you can use tuples in TypeScript, know how to acces their elements and how to destructure them.
+ You know how to create tuples with optional elements, and with a variable number of elements.
+ You are familiar with the following concepts related to functions:
  + optional parameters
  + default parameters
  + rest parameters
  + specifying function signatures as arguments (for callbacks)
  + function overrides, as a lightweight version of function overloading
+ You're aware of the literals concept, as a hybrid between enums and type aliases that lets you specify a set of allowed values for a variable or argument.

## Exercises, code examples, and mini-projects

### [01: TypeScript's type system &mdash; Type system sandbox](01-type-system-sandbox)
Sandbox for practicing the chapter exercises.
