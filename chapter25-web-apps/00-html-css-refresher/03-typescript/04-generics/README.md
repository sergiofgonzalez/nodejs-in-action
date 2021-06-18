# TypeScript: Chapter 04 &mdash; Generics and adanced type inference
> generics and *type maths* in TypeScript

## Contents
+ Generics
+ Advanced Type Inference techniques

## Generics

Generics provide a mechanism to write code that does not need to specify a specific type, as in a function that seeks for an element on a list, no matter whether the list is a list of numbers, strings or *customer objects*.

### Generics syntax

TypeScript uses an *angled bracket* syntax and a type symbol, or type substitute name to indicate that we are using generic syntax.

```typescript
function printGeneric<T>(value: T) {
  console.log(`typeof value is`, typeof value);
  console.log(`value is`, value);
}

printGeneric(1);              // -> number
printGeneric('Jason Isaacs'); // -> string
printGeneric(true);           // -> boolean
printGeneric({ id: 1 });      // -> object
printGeneric(() => {});       // function

interface IPerson {
  name: string;
  age: number;
}

class Person implements IPerson {
  name = '';
  age = 0;
}
printGeneric(new Person());           // -> object
printGeneric<IPerson>(new Person());  // -> object
printGeneric<Person>(new Person());   // -> object
```

Note that whe you invoke the function, you can also use the syntax `printGeneric<type>(arg)` but if you do not explicitly do that, the compiler is smart enough to infer the type to be used.

Note also that `typeof` cannot detect if we're using particular classes or interfaces and just prints `object` when using TypeScript classes and interfaces.

### Multiple Generic Types

You are not limited to a single type when writing generics:

```typescript
function printTwoTypes<A, B>(first: A, second: B) {
  console.log(`first:`, first);
  console.log(`second:`, second);
}
printTwoTypes(5, 'hello');
```

### Constraining the type of `T`

In most circumstances, you will want to limit the type of `T` to allow only certain specific set of types:

```typescript
class Concatenator<T extends Array<string> | Array<number>> {
  concatenateArray(items: T) {
    let returnString = '';
    for (let i = 0; i < items.length; i++) {
      returnString += i > 0 ? ',' : '';
      returnString += items[i].toString();
    }
    return returnString;
  }
}

const concatenator = new Concatenator();

let concatResult = concatenator.concatenateArray(['one', 'two', 'three']);
console.log(concatResult);

concatResult = concatenator.concatenateArray([1, 2, 3, 4, 5]);
console.log(concatResult);
```

| NOTE: |
| :---- |
| Note that you don't need to specify the type `T` when instantiating a generic class. Also, the compiler is smart enough to infer the correct type when invoking the method. |

Another way to constrain the type that can be used in generics consists in specifying a T as a class that extends a given union of interfaces as seen on the example below.

Note that when doing so, you will only be able to use the properties and methods that are common across all the types that are allowed for `T`.

```typescript
interface IPrintID {
  id: number;
  print(): void;
}

interface IPrintName {
  name: string;
  print(): void;
}

function useT<T extends IPrintID | IPrintName>(item: T) {
  item.print();
  item.id = 1;        // ERROR: not common to IPrintID and IPrintName
  item.name = 'test'; // ERROR: not common to IPrintID and IPrintName
}
```

### Generic constraints

A generic type can be constructed out of another generic type. This technique typically uses one type to apply a constraint on another type:

```typescript
function printProperty<T, K extends keyof T>(object: T, key: K) {
  const propertyValue = object[key];
  console.log(`object[${key}] = ${propertyValue}`);
}

const obj1 = {
  id: 1,
  name: 'Jason Isaacs',
  print() {
    console.log(`Hello to ${this.name}(${this.id})`);
  }
};

printProperty(obj1, 'id');    // -> object[id] = 1
printProperty(obj1, 'name');  // -> object[name] = 'Jason Isaacs'
// printProperty(obj1, 'middleName'); // ERROR: middleName not assignable
```

### Generics in interfaces

You can also use generics in namespaces, as seen below:

```typescript
interface IPrint {
  print(): void;
}

interface ILogInterface<T extends IPrint> {
  logToConsole(iPrintObj: T): void;
}

class Logger<T extends IPrint> implements ILogInterface<T> {
  logToConsole(iPrintObj: T): void {
    iPrintObj.print();
  }
}

const printObject: IPrint = {
  print() {
    console.log(`printObject.print() called`);
  }
};

const logger = new Logger();
logger.logToConsole(printObject);
```

### Creating new objects within generics

From time to time, generic classes may need to create an object of the type that was passed in as the generic type *T*.

This requires an special syntax as seen below:

```typescript
class A { }
class B { }

function createInstance<T>(arg: { new(): T }): T {
  return new arg();
}

const aInstance = createInstance(A);
const bInstance = createInstance(B);
```

In `{ new(): T }` we are constructing an anonymous type that defines a `new` function, and returns the type `T`. That trick allows us to return new instances of a given type using generics.


## Advanced Type Inference

In this section we will explore some advanced type inference capabilities sometimes described as *type mathematics*. This will alows us to:
+ create types based on other types
+ create types based on some or all of the properties of another type
+ modify a type by adding and removing properties

### Mapped types

Consider the following snippet of code:

```typescript
interface IAbRequired {
  a: number;
  b: string;
}

type WeakInterface<T> = {
  [K in keyof T]?: T[K];
}

const allOptional: WeakInterface<IAbRequired> = {};
```

Here, we have defined an interface `IAbRequired` with two required properties.

Then, we create a *type alias* named `WeakInterface` which uses the *generics syntax* to allow it to be used for any type *T*. Within the definition of the interface, we use `keyof` to obtain all the properties of the generic type, and then, `[K in keyof T]?` which will result in an array of all the properties of T marked as optional and identified by `K`. Finally, the type of each of these properties are denoted `T[K]`.

In summary, we are defining a type named `WeakInterface`, which accepts a type named `T`, and we are transforming each property defined in `T` into an optional property.

As a result we will be able to consume the new type as follows:

```typescript
const ab: IAbRequired = {
  a: 1,
  b: 'test'
};

const allOptional: WeakInterface<IAbRequired> = {};
const aOptional: WeakInterface<IAbRequired> = { a: 55 };
const bOptional: WeakInterface<IAbRequired> = { b: 'Ed Norton' };
// const errOptional: WeakInterface<IAbRequired> = { age: 51 }; // ERROR: not assignable
```

Note that even when tagging all the properties as optional, we can only use properties from the original type, which makes this a good fit for creating subsets of complex interfaces.

### Partial, Readonly, Record and Pick

Using mapped types as described above is a fundamental pillar of TypeScript. It is so relevant that the definition has been included in the standard TypeScript definition as `Partial`:

```typescript
type Partial<T> = {
  [P in keyof T]?: T[P];
};
```

There is also a mapped type `Required` that does the opposite:

```typescript
type Required<T> = {
  [P in keyof T]: T[P];
}
```

You can see the usage of `Partial` and `Required` in the snippet below:

```typescript
const allPartial: Partial<IAbRequired> = {};
const aPartial: Partial<IAbRequired> = { a: 88 };

/* Required */
interface WeakTypeAB {
  a?: number;
  b?: string;
}

const allRequired: Required<WeakTypeAB> = {
  a: 55,
  b: 'foo'
};

/* ERROR: missing b */
const notAllRequired: Required<WeakTypeAB> = {
  a: 55
};
```


Similarly, we can use the `Readonly` mapped type:

```typescript
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};
```

```typescript
const readonlyVar: Readonly<IAbRequired> = {
  a: 1,
  b: 'foobar'
};

readonlyVar.a = 55; // ERROR: readonly property
```

Another interesting mapped type is `Pick`, which lets you create a type based on a subset of properties of another type:

```typescript
interface IAbc {
  a: number;
  b: string;
  c: boolean;
}

type PickAb = Pick<IAbc, 'a' | 'b'>;

const pickAbObj: PickAb = {
  a: 1,
  b: 'foo'
};

/* ERROR: missing b */
const pickAbObj2: PickAb = {
  a: 1
};
```

Finally, `Record` is another relevant mapped type which lets you build a type *on the fly*.

```typescript
type RecordCd = Record<'c' | 'd', number>;
const recordCdObj: RecordCd = {
  c: 1,
  d: 1
};
```

### Conditional types

Following the syntax of the ternary operator, TypeScript allows you to define *conditional types*:

```typescript
type NumberOrString<T> = T extends number ? number : string;
```

Here we have defined a new type `NumberOrString` which is the result of the conditional type statement found to the right of the assignment operator.

```typescript
function printNumOrString<T>(input: NumberOrString<T>) {
  console.log(input);
}

printNumOrString<number>(1);
printNumOrString<string>('test');
printNumOrString<boolean>(true); // ERROR: not assignable to string
```

Let's break down what is happening with the function above. We have a function `printNumOrString()` that is using generic syntax to define a type named `T`. The function receives a single parameter of type `NumberOrString<T>` which as we know, checks whether the given type `T` extends from number and if so, returns `number` or otherwise `string`.

As boolean does not extend number, the returned type is string, and as such, expects the argument to be a string.

Therefore, the following line will work fine:

```typescript
printNumOrString<boolean>('boolean does not extend number');
```

In summary, conditional types are nothing more *ternary expressions* applied to types.

### Conditional type chaining

Conditional type definitions can be chained together in a similar fashion to how conditional statements can be chained:

```typescript
interface IA {
  a: number;
}

interface IAb {
  a: number;
  b: string;
}

interface IAbc {
  a: number;
  b: string;
  c: boolean;
}

type abc_ab_a<T> =
  T extends IAbc ? [number, string, boolean] :
  T extends IAb ? [number, string] :
  T extends IA ? [number] :
  never;

function getTupleStringAbc<T>(tupleValue: abc_ab_a<T>): string {
  const [...tupleItems] = tupleValue;
  let resultString = '|';
  for (const value of tupleItems) {
    resultString += `${value}|`;
  }
  return resultString;
}

const keyA = getTupleStringAbc<IA>([1]);
const keyAb = getTupleStringAbc<IAb>([1, 'foo']);
const keyAbc = getTupleStringAbc<IAbc>([1, 'bar', false]);

console.log(keyA);
console.log(keyAb);
console.log(keyAbc);
```

You start by defining three interfaces with different properties each one of them: `IA`, `IAb` and `IAbc`.

Right after that, you define our conditional type using chaining `abc_ab_a<T>` which evaluates the generic type `T` and depending whether it extends from `IA`, `IAb` or `IAbc` will return a different tuple definition:
+ if extending from `IA` will return a 1-tuple with a `number`
+ if extending from `IAb` will return a 2-tuple with a `number` and a `string`.
+ if extending from `IAbc` will return a 3-tuple with a `number`, a `string`, and a `boolean`.

After that, you can create a function that uses that conditional type definitions `getTupleStringAbc<T>(tupleValue: abc_ab_a<T>)` that will print the tuple received.

### Distributed conditional types

Distributed conditional types is the technique based on conditional types in which we return multiple types instead of a single one, as we've done in the previous section.

Consider the following piece of code:

```typescript
type dateOrNumberOrString<T> =
  T extends Date ? Date :
  T extends number ? Date | number :
  T extends string ? Date | number | string :
  never;

function compareValues<T extends string | number | Date | boolean>(input: T, compareTo: dateOrNumberOrString<T>) {
  // comparison logic
}

compareValues(new Date(), new Date());
compareValues(1, new Date());
compareValues(1, 2);
compareValues('test', new Date());
compareValues('test', 1);
compareValues('test', 'test');
compareValues(true, 1); // ERROR: 1 not assignable to never
```

You start by definiting a conditional type `dateOrNumberOrString<T>`:
+ if the generic type `T` is a `Date`, then the conditional type will return a `Date` type.
+ if the generic type `T` is a `number`, then the conditional type will return a `Date` or a `number` type.
+ if the generic type `T` is a `string`, then the conditional type will return a `Date`, or a `number`, or a `string` type.

Then you can use that definition to create a function `compareValues<T extends string | number | Date | boolean>(input: T, compareTo: dateOrNumberOrString<T>)`.

The function uses a generic type `T` that is constrained to `string`, `number`, `Date` or `boolean` and receives two parameters:
+ the first parameter is a parameter of type `T` (and therefore either a `string`, `number`, `Date` or `boolean`), and the second is our conditional type `dateOrNumberOrString<T>`. As a result:
+ if the first parameter is a `Date`, then the second parameter is a `Date`.
+ if the first parameter is a `number`, then the second parameter can be a `Date` or a `number`.
+ if the first parameter is a `string`, then the second parameter can be a `Date`, or a `number`, or a `string`.
+ if the first parameter is a `boolean`, then the second parameter is `never`, and as a result, the function cannot be called.

### Conditional type inference

The conditional type inference refers to the technique where we are able to infer a new type as part of a conditional type statement.

Consider the following example that illustrates this idea in its simplest form:

```typescript
type inferFromPropertyType<T> =
  T extends { id: infer U } ? U : never;
```

Here, you define a type `inferFromPropertyType<T>` that uses a conditional type to check whether the type of T extends an object that has a property named `id`. If that is so, it will return the type of the `id` property itself, otherwise it will return `never`.

```typescript
function testInferFromPropertyType<T>(arg: inferFromPropertyType<T>) {
  // some logic here
}

testInferFromPropertyType<{ id: string }>('test');
testInferFromPropertyType<{ id: number }>(5);
testInferFromPropertyType<{ id: number }>('test'); // ERROR: string not assignable to number
testInferFromPropertyType<{ uuid: string }>('uuid'); // ERROR: string not assignable to never
```

Then, you can use the type to define a function like `testInferFromPropertyType<T>(arg: inferFromPropertyType<T>)` which:
+ if the type `T` is an object with an `id` property:
  + if the `id` property is a `string`, the arg expected is a `string`.
  + if the `id` property is a `number`, the arg expected is a `number`.
  + if the `id` property is a `U`, the arg must match
+ if the type `T` does not feature an `id` property the function cannot be called.

### Type inference from function signatures

You can also infer types from function signatures as seen below:

```typescript
type inferredFromFnParam<T> =
  T extends (a: infer U) => void ? U : never;
```

Here, you define a new generic type `inferredFromFnParam<T>` in which if `T` is a type that extends from a function that has a single parameter of type `U` and returns `void` it returns the type of the parameter `U`, and otherwise it returns never.

```typescript
function testInferredFromFnParam<T>(arg: inferredFromFnParam<T>) {
  // some logic here
}

testInferredFromFnParam<(a: number) => void>(1);
testInferredFromFnParam<(a: string) => void>('test');
testInferredFromFnParam<(a: boolean) => void>(false);
testInferredFromFnParam<(a: string) => string>('test'); // this should fail but doesn't
```

Then, you can define a function that uses the type, and as a consequence, should only receive arguments that match the parameter type of functions of the type `(a: U) => void`. However, it doesn't seem to work as expected.

| NOTE: |
| :---- |
| In the example above, it seems that the return type from the function is not even checked and the type checking only affects the parameter type. |

Similarly, you can infer from the return type:

```typescript
type inferredFromFnReturnType<T> =
  T extends (a: string) => infer U ? U : never;

function testInferredFromFnReturnType<T>(arg: inferredFromFnReturnType<T>) {
  // some logic here
}

testInferredFromFnReturnType<(a: string) => number>(1);
testInferredFromFnReturnType<(a: string) => string>('foo');
testInferredFromFnReturnType<(a: string) => void>(1); // ERROR: 1 not assignable to void
```

### Type inference from arrays

TypeScript also allows you inferring types from arrays:

```typescript
type inferredTypeFromArray<T> =
  T extends (infer U)[] ? U : never;

function testInferredFromArray<T>(args: inferredTypeFromArray<T>) {
  // do something here
}

testInferredFromArray<string[]>('test');
testInferredFromArray<number[]>(1);
testInferredFromArray<string[]>(55); // ERROR: number not assignable to string
```

Here you define a type that infers the type from the type of the array elements, and then you define a function that expects an argument based on it.

### Standard conditional types

Some handy conditional type combinations have been included in the standard TypeScript library: `Exclude`, `Extract`, and `NonNullable`.

```typescript
type ExcludeStringAndNumber = Exclude<
  string | number | boolean,
  string | number
>;

const boolValue: ExcludeStringAndNumber = true;
const dateValue: ExcludeStringAndNumber = new Date(); // ERROR: not assignable
```

In the snippet above, you define a type `ExcludeStringAndNumber` using the standard conditional type `Exclude<T, U>` which takes two generic parameters:
> it will exclude those types given in the second parameter from the ones given in the first parameter.

As a result, in our example, it will allow only *booleans*.

Consider a similar example for `Extract`:

```typescript
type StringOrNumber = Extract<
string | boolean | never,
string | number
>;

const stringValue: StringOrNumber = 'foo';
const boolValue: StringOrNumber = true; // ERROR: not assignable
```

Consider finally the following example for `NonNullable`:

```typescript
type NotNullOrUndef = NonNullable<number | undefined | null>;
```

The previous definition extract the types from a given type union that are not `null` or `undefined`, so it only leaves the type `number`.

## Summary

## You know you've mastered this chapter when...
+ You're comfortable creating functions and classes using generic types, and understand when this technique will come in handy.

+ You're aware of advanced use of generic syntax (i.e. using unions on generics specifications).

+ You're aware that a generic type can be constructed out of another generic type, by applying a constraints.

+ You're aware that you can use generics in interfaces.

+ You know how to create functions that return new objects with generics.

+ You know about mapped types in TypeScript, that create new types from others using generics.

+ You're comfortable reading examples using the standard mapped types `Partial<T>`, `Required<T>`, `Readonly<T>`, `Record<T, S>` and `Pick<T, S>`.

+ You known about conditional types, and can read expressions involving them.

+ You known about advanced conditional types techniques such as:
  + chaining
  + distributed conditional types (returning multiple types on conditional type expressions)

+ You're familiar with conditional type inference, which lets you infer a new type as part of a conditional type statement.

+ You can read type inference expressions involving functions and arrays.

+ You know about the standard conditional types `Exclude<T, S>`, `Extract<T, S>` and `NonNullable<T>`.

## Exercises, code examples, and mini-projects

### [01: Hello, interfaces!](01-hello-interfaces)
Sandbox for practicing interfaces.

### [02: Advanced Type Inference](02-advanced-type-inference)
*Type mathematics* using generics

### [e01: Literal objects when using classes and interfaces](e01-literals-with-classes-and-interfaces)
Practising how to use literal objects in TypeScript when there are classes and interfaces.
