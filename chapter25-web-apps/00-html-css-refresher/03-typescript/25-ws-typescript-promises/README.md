# TypeScript: Chapter 25 &mdash; Workshop:  Using promises in TypeScript
> TBD

## Contents

## Anatomy of a Promise

A promise is an object that can exist in three states: *pending*, *fulfilled*, or *rejected*. Although a promise can be instantly fulfilled or rejected, it is most typical for a promise to be created in a pending state, and then resolved to be *fulfilled* or *rejected*. Promises are *chainable*: the result of a promise can be a promise.

As a programmer, when using a promise you provide a callback function that will be invoked when the promise is settled.

The following snippet illustrates how to create a promise from scratch using `new` that gets resolved after 100 milliseconds:

```typescript
const p = new Promise<void>((resolve) => {
  setTimeout(() => {
    resolve();
  }, 100);
});

console.log(`${ new Date().toISOString() }: init`);
p.then(() => {
  console.log(`${ new Date().toISOString() }: fulfilled!`);
});

console.log(`${ new Date().toISOString() }: end`);
```

Note how you use generics to identify the type that will be returned by the callback.

| EXAMPLE: |
| :------- |
| See [01: Hello, promise from scratch!](01-hello-new-promise) for a runnable example. |

### `then`,  `catch`, and `finally`

Promises can be chained with `then(...)`, due to the fact that `then()` resolves to a promise itself.

Consider the following snippet in which we have a function that receives a value and returns a promise that is fulfilled with the value of adding a random number between 0 and 99 to the given number after 1 second:

```typescript
function getValuePromise(val: number): Promise<number> {
  return new Promise<number>((resolve) => {
    setTimeout(() => {
      const result = val + Math.floor(Math.random() * 100);
      console.log(`val was ${ val }, new output is ${ result }`);
      resolve(result);
    }, 1000);
  });
}
```

We can use `then()` to chain multiple calls to the function:

```typescript
getValuePromise(0)
  .then((output) => getValuePromise(output))
  .then((output) => getValuePromise(output))
  .then((output) => getValuePromise(output))
  .then((output) => getValuePromise(output))
  .then((output) => getValuePromise(output))
  .then((output) => getValuePromise(output))
  .then((output) => getValuePromise(output))
  .then((output) => getValuePromise(output))
  .then((output) => getValuePromise(output))
  .then((output) => { console.log(`Final result: ${ output }`); });
```

The `then(cb)` function will return a promise with the result of invoking `cb`, which let us chain the invocations without incurring in the callback hell.

Note that if then wouldn't return a chainable promise we would also have a callback hell:

```typescript
getValuePromise(0)
  .then((output) => getValuePromise(output)
    .then((output) => getValuePromise(output)
      .then((output) => console.log(`Final result: ${output}`))
    ));
```

Something similar applies to `catch()`, which let us trap the error found in any of the intermediate promises with a single error handler.

For example, if we slightly modify `getValuePromise()` function so that it throws an exception randomly, we can do:

```typescript
function getValuePromiseThatMightFail(val: number): Promise<number> {
  return new Promise<number>((resolve, reject) => {
    setTimeout(() => {
      const result = val + Math.floor(Math.random() * 100);
      console.log(`val was ${ val }, new output is ${ result }`);
      if (result % 10 == 0) {
        reject('result can be divided by 10!');
      }
      resolve(result);
    }, 1000);
  });
}

console.log(`${ new Date().toISOString() }: start`);
getValuePromiseThatMightFail(0)
  .then((output) => getValuePromiseThatMightFail(output))
  .then((output) => getValuePromiseThatMightFail(output))
  .then((output) => getValuePromiseThatMightFail(output))
  .then((output) => getValuePromiseThatMightFail(output))
  .then((output) => getValuePromiseThatMightFail(output))
  .then((output) => getValuePromiseThatMightFail(output))
  .then((output) => getValuePromiseThatMightFail(output))
  .then((output) => getValuePromiseThatMightFail(output))
  .then((output) => getValuePromiseThatMightFail(output))
  .then((output) => { console.log(`${ new Date().toISOString() }: Final result: ${ output }`); })
  .catch((err) => console.error(`ERROR was found: ${ err }`));
```

That is, independently of when `getValuePromise()` fails, a single `catch()` will handle the error.

Lastly, `finally()` let us run some code regardless of whether the promise was fulfilled or rejected.

```typescript
getValuePromiseThatMightFail(0)
  .then((output) => getValuePromiseThatMightFail(output))
  .then((output) => getValuePromiseThatMightFail(output))
  .then((output) => getValuePromiseThatMightFail(output))
  .then((output) => getValuePromiseThatMightFail(output))
  .then((output) => getValuePromiseThatMightFail(output))
  .then((output) => getValuePromiseThatMightFail(output))
  .then((output) => getValuePromiseThatMightFail(output))
  .then((output) => getValuePromiseThatMightFail(output))
  .then((output) => getValuePromiseThatMightFail(output))
  .then((output) => { console.log(`${ new Date().toISOString() }: Final result: ${ output }`); })
  .catch((err) => console.error(`ERROR was found: ${ err }`))
  .finally(() => console.log(`process finished!`));
```

### Promise.all

### Promise.allSettled

### Promise.any

### Promise.race

## Enhancing Promises with Types

## Libraries and native promises

## Promisify

## Asynchronous file system

### fs.readFile

### fs.readFileSync

### The fs promises API

## Working with databases

## Developing with REST

## Putting it all together

## Summary

## You know you've mastered this chapter when...

## Exercises, code examples, and mini-projects

### [01: Hello, promise from scratch!](01-hello-new-promise)
Illustrates how to create a promise from scratch using `new` in TypeScript.


## ToDo
