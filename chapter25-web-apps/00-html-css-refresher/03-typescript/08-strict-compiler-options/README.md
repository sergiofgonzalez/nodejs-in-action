# TypeScript: Chapter 08 &mdash; Strict Compiler Options
> TypeScript compiler options that affect code quality

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

The `no*` compiler options are another set of compiler options that are controlled by `"strict"` in the sense that if `"strict": true` is configured then all of the `no*` options will also be set to true.

### `noImplicitAny`

This configuration option tells the compiler to complain when a property, parameter, or function return type is not specified, and as a result `any` is assumed as type.

For example, the compiler will beep at these situations:

```typescript
// ERROR: lacks return type annotation
function myFunction() { }

// ERROR: value has implicit any type
function anotherFunction(value) { }

// ERROR: id has implicitly any type
class myClass {
  id;
}
```

### `noUnusedLocals` and `noUnusedParameters`

These options are used to detect variables or parameters that are not used and are therefore superfluous and should be removed:

```typescript
// ERROR: input is declared but never used
function myFn(input: string): boolean {
  // ERROR: test is declared but never used
  let test;
  return false;
}
```

### `noImplicitReturns`

The `noImplicitReturns` compiler option ensures that a function explicitly returns the value it has declared:

```typescript
// ERROR: not all code paths return a value
function isLargeNumber(value: number): boolean {
  if (value > 1_000_000) {
    return true;
  }
}
```

### `noFallthroughCasesInSwitch`

This option is used to trap situations like the following:

```typescript
enum SwitchEnum {
  ONE,
  TWO
}

function testSwitch(value: SwitchEnum): string {
  let returnValue = '';
  // ERROR: fallthrough case in switch
  switch (value) {
    case SwitchEnum.ONE:
      returnValue = 'One';
    case SwitchEnum.TWO:
      returnValue = 'Two';
  }
  returnValue;
}
```

As you well now, this function will always return `'Two'` because when doing `testSwitch(SwitchEnum.ONE)` the code will fall through the statements associated to `testSwitch(SwitchEnum.TWO)` because there is no `break`.

### `noImplicitThis`

This option is used to detect logic error when the `this` variable is accessed incorrectly.

```typescript
class MyClass {
  id = 55;
  printIdAfterSomeTime() {
    const callback = function () {
      // ERROR: `this` implicitly has type 'any' because it does not have type annotation
      // an outer value of `this` is shadowed by this container
      console.log(`this.id:`, this.id);
    };
    setTimeout(callback, 1_000);
  }
}
```

This function will print `undefined` because the callback function will receive a different copy of `this` than the one it expects.

Note that this can be easily fixed in multiple ways:

```typescript
class MyClass {
  id = 55;
  printIdAfterSomeTime() {
    const callback = function (_this: MyClass) {
      console.log(`this.id:`, _this.id);
    };
    setTimeout(callback, 1_000, this);
  }
}

const myClassObj = new MyClass();
myClassObj.printIdAfterSomeTime();


// Alternatively, you could have used an arrow function
class MyOtherClass {
  id = 88;
  printIdAfterSomeTime() {
    const callback = () => {
      // ERROR: an outer value of `this` is shadowed by this container
      console.log(`this.id:`, this.id);
    };
    setTimeout(callback, 1_000);
  }
}

const myOtherClassObj = new MyOtherClass();
myOtherClassObj.printIdAfterSomeTime();
```


## You know you've mastered this chapter when...

+ You understand that `"strict": true` compiler option sets a wide variety of compiler options that affect TypeScript checkings that affect code quality.

+ You are aware that TypeScript compiler allows for nested configurations, in which you can have multiple `tsconfig.json` that extend from other others. You are aware however that the compilation process should be run individually in each of the directories containing those *nested* `tsconfig.json`.

+ You understand the scope of following different compiler options:
  + `strictNullChecks`
  + `strictPropertyInitialization`
  + `strictBindCallApply`
  + `noImplicitAny`
  + `noUnusedLocals`
  + `noUnusedParameters`
  + `noImplicitReturns`
  + `noFallthroughCasesInSwitch`
  + `noImplicitThis`

+ You know that new TypeScript projects should have the `"strict"` setting enabled, but legacy code and migration activities from JavaScript to TypeScript.


## Exercises, code examples, and mini-projects

### [01: Hello, nested configurations!](01-hello-nested-config)
Illustrates how to use nested `tsconfig.json` and how to perform the build when using this technique.

### [02: `strict*` project sandbox](02-strict-options-sandbox)
A sandbox project to test `strict*` and `no*` compiler options.
