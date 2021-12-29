# TypeScript: Chapter 25 &mdash; Workshop: Using promises in TypeScript
> writing async code using promises without async/await

## Contents
+ Remembering promise basic concepts
+ Type safe promises with `Promise<T>`
+ Practical examples: databases, backends and frontends

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

| EXAMPLE: |
| :------- |
| See [02: Using `then` and `catch` to solve the callback hell](02-using-then-and-catch) for a runnable example. |

### `Promise.all`

`Promise.all(...)` takes an iterable of promises as an argument and resolves them when all the individual promises have been resolved.

| EXAMPLE: |
| :------- |
| See [03: Hello, `Promise.all`](03-hello-promise-all) and [04: Recursive `Promise.all`](04-recursive-promise-all) for runnable examples illustrating `Promise.all()`. |

### `Promise.allSettled`

`Promise.allSettled` is a variation on `Promise.all` that resolves when the iterable promises received as arguments are resolved either succefully or rejected.

Note that each of the elements resolved by `Promise.allSettled()` will look like:

+ fulfilled promise: `{ status: 'fulfilled', value: <fulfilled-value> }`
+ rejected promise: `{ status: 'rejected', reason: <rejected-value> }`

| EXAMPLE: |
| :------- |
| See [05: Hello, `Promise.allSettled`](05-hello-promise-all-settled) and [06: Combining `Promise.all` and `Promise.allSettled`](06-combining-promising-all-settled) for runnable examples. |


### `Promise.any`

`Promise.any` takes an iterable of promises and will resolve to the value of the first promise that resolves successfully. If no promises in the iterable fullfill (i.e. all the promises are rejected), then the returned promise is rejected with an `AggregateError`, which groups together the individual errors.

| EXAMPLE: |
| :------- |
| See [07: Hello, `Promise.any`](07-hello-promise-any) for a runnable example. |

### `Promise.race`

`Promise.race` takes an iterable of promises and fulfills or rejects as soon as one of the promises in the iterable fulfills or rejects with the value of reason from that promise.

| EXAMPLE: |
| :------- |
| See [08: Hello, `Promise.race`](08-hello-promise-race) for a runnable example. |

## Working with databases

The examples [09: Hello, `sqlite3` with callbacks](09-hello-sqlite3) and [10: Hello, `sqlite` with promises](10-hello-sqlite) illustrate how to work with SQLite using callback and promises.

## Building a RESTful API without a web server framework

The example [11: Building a RESTful API server](11-restful-api-server) illustrates how to build an HTTP server that exposes a CRUD API using the `http` module. The server uses SQLite in-memory database for persistence concerns.

## Building a vanilla-TS UI for a Restful API

The example [12: Vanilla TypeScript UI for a REST API](12-vanilla-ts-ui-for-rest-api) illustrates how to create a very basic Vanilla TypeScript UI for the REST API implemented in [11: Building a RESTful API server](/11-restful-api-server).


## You know you've mastered this chapter when...
+ You're comfortable using `Promise<T>` in TypeScript.
+ You know how to create Promises from scratch, and how to use `then`, `catch`, and `finally`.
+ You're comfortable using:
  + `Promise.all`
  + `Promise.allSettled`
  + `Promise.any`
  + `Promise.race`
+ You're comfortable writing asynchronous code without using async/await for:
  + interacting with databases, namely SQLite
  + building a backend RESTFul API using Node.js' `http` module
  + building a frontend using vanilla TypeScript

## Exercises, code examples, and mini-projects

### [01: Hello, promise from scratch!](01-hello-new-promise)
Illustrates how to create a promise from scratch using `new` in TypeScript.

### [02: Using `then` and `catch` to solve the callback hell](02-using-then-and-catch)
Illustrates how to use `then()` and `catch()` in promises.

### [03: Hello, `Promise.all`](03-hello-promise-all)
Illustrates how to use `Promise.all`.

### [04: Recursive `Promise.all`](04-recursive-promise-all)
Illustrates how to use recursive calls to improve [03: Hello, `Promise.all`](../03-hello-promise-all)

### [05: Hello, `Promise.allSettled`](05-hello-promise-all-settled)
Illustrates how to use `Promise.allSettled()` which returns a promise that resolves when all the given promises are either resolved or rejected.

### [06: Combining `Promise.all` and `Promise.allSettled`](06-combining-promising-all-settled)
Illustrates how to combine `Promise.all` and `Promise.allSettled`.

### [07: Hello, `Promise.any`](07-hello-promise-any)
Illustrates the behavior of `Promise.any`, which resolves to the first iterable that resolves or rejects if none of the promises is fulfilled.

### [08: Hello, `Promise.race`](08-hello-promise-race)
Illustrates the behavior of `Promise.race`, which resolves to the first iterable that either resolves or rejects.

### [09: Hello, `sqlite3` with callbacks](09-hello-sqlite3)
Illustrates how to work with SQLite using the asynchronous, callback based API of [`sqlite3`](npmjs.com/package/sqlite3).

### [10: Hello, `sqlite` with promises](10-hello-sqlite)
Illustrates how to work with SQLite using the asynchronous, promised based API of [`sqlite`](npmjs.com/package/sqlite).

### [11: Building a RESTful API server](11-restful-api-server)
Creating a REST API using the Node.js `http` module, backed by SQLite.

### [12: Vanilla TypeScript UI for a REST API](12-vanilla-ts-ui-for-rest-api)
Creating a Vanilla TypeScript UI for a REST API.

### [e01: Server-side rendered UI for REST API](e01-server-side-rendered-ui-for-rest-api)
Reimplementing [12: Vanilla TypeScript UI for a REST API](12-vanilla-ts-ui-for-rest-api) with a mix of server-side rendered UI and client TypeScript.

## ToDo
