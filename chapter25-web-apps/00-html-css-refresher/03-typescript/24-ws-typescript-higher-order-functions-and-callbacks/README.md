# TypeScript: Chapter 24 &mdash; Workshop: Higher-order functions and callbacks
> using higher-order functions and callbacks in TypeScript

## Contents
+ Introducing higher-order functions and callbacks
+ Higher-order functions to foster reusability
+ Callbacks in TypeScript

## Introduction

Higher-order functions are functions that take in another function as an argument, return a function, or both.

Consider the following example:

```typescript
import http from 'http';

http.createServer((req, res) => {
  console.log(`A request has been received!`);
  res.write('Hello, stranger!');
  res.end();
}).listen(5000, () => {
  console.log(`HTTP server running on port 5000`);
});
```

The function `createServer()` takes a request listener function which will be invoked each time a request is received, and returns a function. Also, the `listen()` function takes a port and optionally a function that will be invoked when the server is successfully started. Both functions are higher-order functions.

The functions received as arguments by `createServer()` and `listen()` are called *callbacks* as they're not immediately executed, but rather activated when something happens.

Not all the functions received by higher-order functions are *callbacks*. For example, the `memoize()` function we developed in the example [A generic memoize function](../22-ws-typescript-generics-and-conditional-types07-generic-memoize) is a higher-order function that both takes a function that is not a callback and returns a function:

```typescript
function memoize<Fn extends AnyFunction>(fn: Fn, keyGetter?: KeyGetter<Fn>): Fn {...}
```

## Higher-order functions

Higher-order functions are regular functions that at least fulfill one of the following premises:
+ at least of the function parameters is a function
+ they return a function

Higher-order functions are great mechanisms to foster reusability in applications.

Consider the following snippet in which a function that greets a particular person with their favorite greeting:

```typescript
const favoriteGreetings: Record<string, string> = {
  John: 'hey',
  Jane: 'hello',
  Jim: 'Howdy',
  Pam: 'Hi there'
};

function greet(name: string) {
  const greetingToUse = favoriteGreetings[name];
  console.log(`${ greetingToUse }, ${ name }`);
}
```

The `greet()` functions works great, but his applicability is limited to this scenario. Also, it is tightly coupled to the `favoriteGreetings` variable.

As an alternative, we can improve the implementation to break the coupling:

```typescript
function greet(name: string, mapper: Record<string, string>) {
  const greetingToUse = mapper[name] ?? 'Hello';
  console.log(`${ greetingToUse }, ${ name }`);
}
```

This also works, but the *DX* is far from perfect as we have to pass the `mapper` on every invocation. Also, the applicability of the function is limited by the fact that mapper has an specific shape. For example, the function will be cumbersome to use if the list of people is retrieved from a database.

The third version of the function is the most flexible one. Now the function receives also a `getGreeting` argument &mdash; a function that `greet()` will invoke to get the greeting:

```typescript
function greet(name: string, getGreeting: (name: string) => string) {
  const greetingToUse = getGreeting(name);
  console.log(`${ greetingToUse }, ${ name }`);
}

greet('Pam', (name) => favoriteGreetings[name] ?? 'Hello');
greet('Dwight', (name) => favoriteGreetings[name] ?? 'Hello');
greet('Brian', () => `What's up?`);
greet('Michael', () => {
  const hourOfTheDay = new Date().getHours();
  if (hourOfTheDay < 12) {
    return `Good morning`;
  } else if (hourOfTheDay < 19) {
    return `Good afternoon`;
  } else {
    return `Good evening`;
  }
});
```

As can be seen, not only we can reproduce the same behavior as before, but also can create new behaviors for the function.

We have made the `greet()` function totally reusable, while keeping the core logic the same.

However, the *DX* of the function is far from perfect as we have to pass a function even if we want to reuse the behavior. This can be solved by making `greet()` return a function:

```typescript
function greet(getGreeting: (name: string) => string) {
  return function (name: string) {
    const greetingToUse = getGreeting(name);
    console.log(`v4: ${ greetingToUse }, ${ name }`);
  };
}

const greetWithMapper = greet((name) => favoriteGreetings[name] ?? 'Hello');
const timeBasedGreet = greet(() => {
  const hourOfTheDay = new Date().getHours();
  if (hourOfTheDay < 12) {
    return `Good morning`;
  } else if (hourOfTheDay < 19) {
    return `Good afternoon`;
  } else {
    return `Good evening`;
  }
});
const constantGreet = greet(() => `What's up?`);

greetWithMapper('Pam');
greetWithMapper('Dwight');
timeBasedGreet('Michael');
constantGreet('Brian');
```

Note that now we have a great *DX* as once the behavior has been decided we no longer need to pass it, but we also have the possibility of getting new functions for new behaviors.

| EXAMPLE: |
| :------- |
| See [02: Hello, higher-order functions!](02-hello-higher-order-functions) for a runnable example. See also [03: Data filtering and manipulation using higher-order functions](03-data-filtering-and-manipulation) for an additional example. |


## Callbacks

Callbacks are functions that we pass to other functions, which in turn, will be invoked when they are needed.

The typical example is event handler we register for a button click:

```typescript
cons btnElement = document.querySelector<HTMLButtonElement>(`#my-btn`);

function handleButtonClick(event: MouseEvent) {
  console.log(`#my-btn was clicked`);
}

btnElement.addEventListener('click', handleButtonClick);
```

| EXAMPLE: |
| :------- |
| See [04: Hello, UI callbacks!](04-hello-ui-callbacks) for a runnable example. |


## You know you've mastered this chapter when...
+ You can define a higher-order function and a callback.
+ You're comfortable defining and using higher-order functions.
+ You understand that when defining higher-order functions you enable functions with extensible behaviors.
+ You are comfortable using `filter`, `map`, and `reduce`.
+ You're familiar using callbacks in TypeScript.

## Exercises, code examples, and mini-projects

### [01: Hello, HTTP server and callbacks!](01-hello-http-server-callbacks)
A Node.js http server that illustrates a couple of higher-order functions that take callbacks

### [02: Hello, higher-order functions!](02-hello-higher-order-functions)
Illustrates through various examples how higher-order functions make it possible to write code that is more readable and maintainable.

### [03: Data filtering and manipulation using higher-order functions](03-data-filtering-and-manipulation)
Using higher-order functions for data manipulation.

### [04: Hello, UI callbacks!](04-hello-ui-callbacks)
A simple TypeScript client application that illustrates the use of callbacks in event handlers.

### [05: Implementing a `pipe()` function](05-pipe-function)
Implementing a `pipe()` function with higher-order function and generics.

## ToDo
