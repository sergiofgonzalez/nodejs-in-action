# 08: Misc concepts &mdash; TypeScript basics sandbox
> a sandbox project to refresh basic TypeScript concepts

## Description

Follow through the given requirements to do a quick refreshment of the basic TypeScript concepts:

### Primitive types
Define and initialize inline the following type of primitives: `number`, `string`, `boolean`, `void`, `null`, `undefined`, `unknown`, `never`, `unique`, `bigint`, and `any`.

### Enums

Define an enum `Keys` with values `Up`, `Down`, `Left`, `Right`. Define a variable `up` and assign it the value `Left`. Then do a `console.log` to inspect the actual value assigned to it.

Define an enum `NumericOptions` with values `Option1`, `Option2`, `Option3` and assign them explictly with the values `1`, `2`, and `3` respectively. Define a variable `selectedOption` and assign it the value `Option2`. Then do a `console.log` to inspect the actual value assigned to it.

Define an enum `AlphaOptions` with values `Option1`, `Option2`, `Option3` and assign them explictly with the values `'a'`, `'b'`, and `'c'` respectively. Define a variable `userOption` and assign it the value `Option2`. Then do a `console.log` to inspect the actual value assigned to it.

### Arrays and tuples

Define a numeric array with value *1, 2, 3*.

Define a numeric 1-tuple, a numeric 2-tuple, and a 3-tuple consisting of a number, followed by two strings.

### Classes

Define a `User` class with a private string member `name` and a public method `getName` that returns the value of that private member. Create an instance of this class and invoke the member.


Define another variant of this class in which the private member `name` is defined in the constructor, and instead of the public method, define a getter for the private member. Create an instace of this class and invoke the member.

Define another variant of the user class that uses `#` to define the private member. Create an instance of this class and invoke the member.


#### Abstract classes
Define an abstract class `BaseApiClient` that declares an abstract method `fetch` that declares a parameter `req` of type `any` and returns a `Promise<any>`.

Define a class `UserApiClient` that extends that abstract class and implements the `fetch` method that fulfills the expected return type.

### Interfaces and types

Define an generic interface `Comparable<T>` the declares a method `compareTo()` that receives an argument of type `T` and returns a number.
Create a class `MyNumberHolder` that implements that interface. Then instantiate an instance of that class and use the method.

In TypeScript, interfaces can define properties and not only methods.
Define an interface `AppConfig` with two properties `paths` and `maxRetryCount`. The first property is an object with a single property `base` of type string. The second property is an *optional* number.
Create a constant variable `appConfig` whose type is the interface defined above.


#### Intersection and Union Types

Intersection types allow you to combine types to form a new type that combines the properties of the original types:

Consider the diagram below:

![Intersection Types](../../19-ws-typescript-advanced-types/images/intersection_types.png)

Create the corresponding interfaces and the intersection type that combines the properties. Create a constant of that type and populate its fields.

Create a type `Age` that is union of `number` and `string`. Create a function that receives and returns and argument of that type and displays in the console what is the actual type used.

Define the following types and check:

```typescript
type A = 'A';
type B = 'B';
```

+ That the intersection type `A & B` resolves to `never`.
+ That a type `D` defined as `C | 'E'` resolves to `'E'`

Define a type E as:

```typescript
type E = {
  name: string;
}
```

Define the intersection type `F` between `E` and `{ age: number }` and define a variable of this type. What is the shape of the resulting type?

### Working with input/output

Create a small program that reads from stdin and outputs the same into stdout. Validate that it works by doing `echo "Hello, world" | npm start` and seeing that `Hello, world` is displayed in the output.