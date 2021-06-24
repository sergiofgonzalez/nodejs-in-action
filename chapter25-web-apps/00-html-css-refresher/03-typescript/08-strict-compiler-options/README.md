# TypeScript: Chapter 08 &mdash; Strict Compiler Options
> understanding the individual TypeScript compiler options

## Contents

+ Using nested `tsconfig.json` files.
+ `strict*` compiler options
+ `no*` compiler options

## Intro

There is a compiler option named `strict` that turns on a group of other compiler options that apply a number of checks that control the quality of your code: if a variable can be undefined at the time of use, if the variables is defined and not used, etc.

In this chapter, you will examine each individual check of that group, so that you can have a view of the type of options available.

| NOTE: |
| :---- |
| The `"strict"` option should be the default when creating new TypeScript projects. Relaxing these compiler options is discouraged, except in migration efforts from JavaScript to TypeScript, where you would like to start with a minimum set of checks that you would be enabling over time until you would set again `"strict": true`. |

## Nested configuration

The TypeScript compiler allows you to lay out multiple `tsconfig.json` files in your project's directories to override certain compiler options.

For example, you can have:

```
prj/
├── app/
│   └── src/
│       ├── js-libs/
|       |   ├── my-lib.js
|       |   └── tsconfig.json
|       ├── main.ts
│       └── tsconfig.json
 tsconfig.json
```

Note that in order to make it work, the *inner* `tsconfig.json` files have to use the `"extends"` directive as follows:

```json
{
  "extends": "../tsconfig.json",
  "compilerOptions": {
    "outDir": "/dist/",
    "allowJs": true,
    "strict": false
  }
}
```

When running the compiler in the project's root directory, the *inner* `tsconfig.json` will be ignored &mdash; you will need to *cd* into the corresponding directories and run `tsc` within them so that the corresponding `tsconfig.json` are honored.

This complicates a bit the script that generates the compiled files, but in turn, it will give us all the flexibility that we need to fine-tune the corresponding compiler options for each section of our project.


## `strict*` compiler Options

This section explores the `strict*` set of compiler options that come into play when the main `"strict"` option is set to false.

### `strictNullChecks`

This compiler options is used to find instances in our code where the value of a variable could be null or undefined at the time of usage (i.e. not properly initialized).

Consider the following snippet:

```typescript
let a: number;
let b = a;
```

This situation will be picked up by the TypeScript compiler.

We can fix it by either doing proper initialization
```typescript
let a: number = 5;
let b = a;
```

or by using a type union:
```typescript
let a: number | undefined;
let b = a;
```

### `strictPropertyInitialization`

This compiler option ensures that all the properties of a class have been correctly initialized.

For example the compiler will complain about this class:

```typescript
class WithoutInit {
  a: number;
  b: string;
}
```

We can fix this problem using one of the following ways:

```typescript
/* using type union with undefined */
class WithoutInit {
  a: number | undefined;
  b: string | undefined;
}

/* using definite assignment (tells the compiler: Yes, I'm aware!) */
class WithoutInit {
  a!: number;
  b!: string;
}

/* using explicit initialization */
class WithoutInit {
  a: number = 5;
  b: string = 'hello';
}

/* using a constructor */
class WithoutInit {
  a: number;
  b: string;
  constructor(a: number) {
    this.a = a;
    this.b = 'hello';
  }
}
```

### `strictBindCallApply`

JavaScript provides the `bind(...)`, `call(...)`, and `apply(...)` functions that are used to create from other existing functions/call functions from other existing functions that when called have their `this` variable, and function arguments set to the provided ones.

This compiler option ensures that the arguments that we pass to these functions are of the correct type.

Consider the following snippet:

```typescript
class MyBoundClass {
  name: string = 'defaultNameValue';

  printName(index: number, description: string) {
    console.log(`this.name:`, this.name);
    console.log(`index:`, index);
    console.log(`description:`, description);
  }
}
```

We can use the `call()` function as follows:

```typescript
testBoundClass.printName.call({ name: `Hello!` }, 55, `foo`);
```

If we would have done:

```typescript
testBoundClass.printName.call({ name: `Hello!` }, `test`, `foo`);
```

The compiler will complain.

You would find similar behavior with `apply()` and `call()`.

Note however, that this checking does not reach inside the `this` object. For example, it would allow you to do:

```typescript
const boundThis = { id: 5 };
const boundPrintNameFn = myObj.printName.bind(boundThis, 25, 'foobar!');
boundPrintNameErrFn();
```

The compiler just checks that `boundThis` is of type `object`, but would not verify that you're passing an object with a `name` property.

| EXAMPLE: |
| :------- |
| See [02: `strict*` project sandbox](02-strict-options-sandbox) for an example illustrating these concepts (`app/src/strictBindCallApply/` directory). |

### `strictFunctionTypes`

The `strictFunctionTypes` compiler option ensures that there is no mismatch in function signatures, when using functions as arguments.

This can happen when using functions as arguments:

```typescript
function withCallback(fn: (a: number | string) => void) {
  console.log(`withCallback`);
  fn(55);
  fn('Hello');
}

function myFn(a: number | string) {
  console.log(`a:`, a);
}

withCallback(myFn); // OK
withCallback((a: number) => { console.log(a); }); // ERROR: not assignable
```

In the example above the compiler will complain when using `withCallback((a: number) => { }` because the function used as an argument does not match the expected signature.


However, it will also detect more complicated cases involving inheritance as seen below:

```typescript
/* with inheritance */
class WithPrint {
  print() { }
}

class WithPrintAndRun extends WithPrint {
  run() { }
}

function usePrint(fn: (withPrint: WithPrint) => void) {
  const withPrint = new WithPrint();
  fn(withPrint);
}

/* ERROR: Not assignable! */
usePrint((withRun: WithPrintAndRun) => {
  withRun.run();
});
```

In this case, the compuler will also complain, because `usePrint()` will pass a `WithPrint` instance to the callback which is expecting a `WithPrintAndRun`.

| EXAMPLE: |
| :------- |
| See [02: `strict*` project sandbox](02-strict-options-sandbox) for an example illustrating these concepts (`app/src/strictFunctionTypes/` directory). |

## `no*` compiler options

### `noImplicitAny`

### `noUnusedLocals` and `noUnusedParameters`

### `noImplicitReturns`

### `noFallthroughCasesI...`

### `noImplicitThis`

## You know you've mastered this chapter when...

## Exercises, code examples, and mini-projects

### [01: Hello, nested configurations!](01-hello-nested-config)
Illustrates how to use nested `tsconfig.json` and how to perform the build when using this technique.

### [02: `strict*` project sandbox](02-strict-options-sandbox)
A sandbox project to test `strict*` compiler options.
