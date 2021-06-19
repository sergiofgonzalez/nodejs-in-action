# TypeScript: Chapter 07 &mdash; Integration with JavaScript
> TypeScript programs interacting with JavaScript


## Contents
+ Declaration files
+ Declaration file typing
+ The `allowJs` and `outDir` options
+ Compiling JavaScript
+ The `declaration` option

## Declaration files

A declaration file is a pecial type of file used by the TypeScript compiler during the compilation step as a sort of reference to describe JavaScript code.

These files are similar to the header files in C/C++, in the sense that they just describe the structure of available *entities* without providing an implementation.

### Global variables

In this section, we will see how to provide the declaration of a global variable with an example.

One of the scenarios in which we will need to create global variable declarations is when we are dealing with browser-based TypeScript.

Consider the example, in which we have a website with two separate `<scripts>`:

```html
<!DOCTYPE html>
<html lang="en">

<head>
  ...
  <script type="text/javascript" defer>
    const CONTACT_EMAIL_ARRAY = [
      'help@example.com',
      'contactus@example.com',
      'webmaster@example.com'
    ]
  </script>
  <script src="/public/js/global-logger.js" type="module" defer></script>
  ...
</head>
```

The first `<script>` creates an array of strings with three items, and the second `<script>` is your browser-based TypeScript code that happens to log in the console those array items when the window is loaded:

```typescript
// file: app/src/public/ts/global-logger.ts
class GlobalLogger {
  static logEmailsToConsole() {
    for (const email of CONTACT_EMAIL_ARRAY) {
      console.log(`found contact:`, email);
    }
  }
}

window.addEventListener('load', () => {
  console.log(`Window is loaded!`);
  GlobalLogger.logEmailsToConsole();
});
```

If you try to compile the project, you will get an error, because the TypeScript module is unaware of the existence of `CONTACT_EMAIL_ARRAY`.

This is solved by creating a declaration file for the globals named `globals.d.ts` in the `app/src/types/` directory with the following contents:

```typescript
declare const CONTACT_EMAIL_ARRAY: string[];
```

Note, that we had previously configure our `tsconfig.json` with:

```json
    "paths": {
      "*": [
        "node_modules/*",
        "app/src/types/*" /* for .d.ts files that are not found via @types/<lib> */
      ]
```

If we compile the project again after doing those changes, we can successfully compile the project and see the desired results in the console:

![Global declarations](images/global_declarations.png)

| EXAMPLE: |
| :------- |
| See [01: Global variable declaration](01-global-vars) for a runnable example. |

### Finding declaration files
207/539
### Writing declaration files

### The `module` keyword

## Declaration file typing

### Function overloading

### Nested namespaces

### Classes

### Static properties and functions

### Abstract classes

### Generics

### Conditional types

### Conditional type inference

### Declaration file summary

## Integration compiler options

### The `allowJs` and `outDir` options

### Compiling JavaScript

### The `declaration` option

## You know you've mastered this chapter when...

## Exercises, code examples, and mini-projects

### [01: Global variable declaration](01-global-vars)
Introducing global variable declaration.

