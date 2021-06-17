# TypeScript: Chapter 04 &mdash; Generics and adanced type inference
>

## Contents
+ Generics
+ Advanced Type Inference

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
149

### Distributed conditional types

### Conditional type inference

### Type inference from function signatures

### Type inference from arrays

### Standard conditional types

## Summary

## You know you've mastered this chapter when...


## Exercises, code examples, and mini-projects

### [01: Hello, interfaces!](01-hello-interfaces)
Sandbox for practicing interfaces.

[ ] literal objects typed as interfaces and classes

[ ] syntax explanation for [K in keyof T] (looks like a Python list comprehension!)