# TypeScript: Chapter 26 &mdash; Workshop: Async/Await in TypeScript
> writing async code using promises with async/await

## Contents
+ Introducing *async/await* in TypeScript
+ Exception handling using *try-catch* blocks
+ Top-level await
+ Express and NestJS

## Async/Await in TypeScript
The *async/await* keywords in the ECMAScript specification allow developers that are not familiar with *thenables* to work effectively with promises.

Additionally, when using TypeScript you have the advantage to be more explicit about which functions should return promises and which should return a resolved value or throw an error.

## Async/Await syntax

### Async
The `async` keyword modifies a function causing it to return a promise. If using a function expression or function declaration, the `async` keyword is placed before the function keyword. If an arrow function is used, the `async` keyword is placed before the argument list:

```typescript
function addAsync(num1: number, num2: number): Promise<number> {
  return num1 + num2;
}

const addAsyncFn: (num1: number, num2: number) => Promise<number> = async (num1: number, num2: number) => num1 + num2;
```

### Await

The `await` keyword will attempt to resolve any promise before continuing, pausing the execution without blocking the event loop.

```typescript
const five = await addAsync(2, 3);
const ten = await addAsyncFn(7, 3);
```

### Syntactic sugar

Using *async/await* keywords are known as syntactic sugar &mdash; they enable more expressive syntax than *then/catch* without changing the behavior of the program.

| EXAMPLE: |
| :------- |
| See [01: Hello, async/await!](01-hello-async-await) for a runnable example illustrating the concepts of *async/await*. |

## Exception handling

The *try-catch* construct can be used to handle errors in asynchronous code:

```typescript
try {
  await asyncFn1();
  await asyncFn2();
  await asyncFn3();
} catch (err) {
  /* handle error here */
}
```

Sometimes, when implementing a *try-catch* block like the one above you might need to have finer-grained control of what function threw the exception.

In such cases, it is recommended to create a hierarchy of custom exceptions and use the following template:

```typescript
try {
  await asyncFn1();
  await asyncFn2();
  await asyncFn3();
} catch (err) {
  if (err instanceOf MyCustomError1) {
    /* handle exception generated in asyncFn1 */
  } else if (err instance of MyCustomError2) {
    /* handle exception generated in asyncFn1 */
  } else {
    /* handle other errors */
  }
}
```

## Top-Level await

Top-level await is a feature that allows the use of the `await` keyword at the module level outside of any function.

At the time of writing, in order to enable this it you need to:
+ `package.json` &mdash; configure your project as `type: "module"`.
+ `tsconfig.json` &mdash; configured your TypeScript options with `"module": "es2022"`.
+ `main.ts` &mdash; the file needs to be a module. If you're dealing with a simple program, it's possible to simply export an empty object: `export {};`.

| EXAMPLE: |
| :------- |
| See [01: Hello, async/await!](01-hello-async-await) for an example in which top-level await is configured and used in the main program. |

## Express and NestJS

Express is a popular framework for JavaScript that can also be used to TypeScript. See [02: Hello, Express!](02-hello-express) for an example.

If you prefer a TypeScript-first, highly opinionated framework *with batteries included*, see [03: Hello, NestJS!](03-hello-nest-js) and [04: Hello, TypeORM + NestJS!](04-hello-typeorm-nestjs) where NestJS is introduced, and a more contrived example illustrating how to integrate with an ORM is given.

## You know you've mastered this chapter when...
+ You are familiar with *async/await* syntax in TypeScript.
+ You know what you need to do to enable top-level await in a TypeScript project.
+ You know the basics about setting up an Express and NestJS projects.

## Exercises, code examples, and mini-projects

### [01: Hello, async/await!](01-hello-async-await)
Basic usage of *async/await* keywords and the top-level await.

### [02: Hello, Express!](02-hello-express)
A bare-bones Express TypeScript web server.

### [03: Hello, NestJS!](03-hello-nest-js)
Introducing NestJS framework, fully featured framework for TypeScript Node.js applications.

### [04: Hello, TypeORM + NestJS!](04-hello-typeorm-nestjs)
Introducing TypeORM, an object-relational framework in a NestJS project.

## ToDo
