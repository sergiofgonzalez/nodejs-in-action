# TypeScript: Chapter 04 &mdash; Asynchronous language features
> asynchronous TypeScript

## Contents
+ *Callbacks*
+ *Promises*: creating and returning values from *Promises*
+ Working with *async/await*

## Callbacks

Consider the following snippet, in which we execute a given function asynchronously, after some specified time:

```typescript
function delayExecutionWithCallback(cb: () => void) {
  function executeCallback() {
    console.log(`5: executeCallback()`);
    cb();
  }
  console.log(`2: calling setTimeout()`);
  setTimeout(executeCallback, 1000);
  console.log(`3: after calling setTimeout()`);
}

function callDelayedAndWait() {
  function afterWait() {
    console.log(`6: afterWait()`);
  }
  console.log(`1: calling delayExecutionWithCallback()`);
  delayExecutionWithCallback(afterWait);
  console.log(`4: after calling delayExecutionWithCallback()`);
}

callDelayedAndWait();
```

Note that `delayExecutionWithCallback()` is declared as:

```typescript
function delayExecutionWithCallback(cb: () => void) {
...
}
```

As you can see, explictly specifying the type of callback that is to be received is the only difference between JavaScript and TypeScript approach.


## *Promises*

Consider the following TypeScript code that implements a sleep function based in promises:

```typescript
function sleepFor5Seconds(): Promise<void> {
  return new Promise<void>(
    (resolve: () => void, reject: () => void) => {
      setTimeout(() => {
        resolve();
      }, 5000);
  });
}
```

The differences from the code you will use in JavaScript are the following:

+ The function signature explicitly declares that `sleepFor5Seconds()` returns a `Promise<void>`, that is, a *promise* that might succeed with a void return value. In JavaScript, the functions would be simply declared as `function sleepFor5Secons() { }`.

+ The function returns a `Promise<void>`, as dictated in the function return value.

+ When constructing the promise, from what we'd do in JavaScript (`return new Promise((reject, resolve) => {...})` we add more type annotations to `resolve()` and `reject()`, but the structure stays the same).

That is, after carefully reviewing the JavaScript and TypeScript implementations, we only see that type annotations were added!

Invoking the function won't change from JavaScript to TypeScript:

```typescript
console.log(new Date().toISOString());      // current time
sleepFor5Seconds()
  .then(() => {
    console.log(new Date().toISOString());  // current time + 5 seconds
  });
```

### Returning values from *Promises*

Consider the following piece of code, in which we return a promise of type other than void:

```typescript
function promiseReturningString(throwError: boolean): Promise<string> {
  return new Promise<string>((
    resolve: (outputValue: string) => void,
    reject: (errorCode: number) => void
  ) => {
    if (throwError) {
      reject(101);
    }
    resolve(`resolve with message`);
  });
}
```

Note that in the function definition we declare that the function will return a `Promise<string>` to indicate that if the promise is fulfilled, the result will be a string.

However, note that when constructing the promise, we're declaring resolve as:

```typescript
resolve: (a: string) => void
```

That is, the `resolve()` callback is defined as a function that receives an argument of the same type of the promise that is returned, and that returns `void`. This is consistent with the usage that we do of the `resolve()` callback, for which we're never interested in its result type, but rather, we pass as argument the fulfillment value.

Note that the `reject()` callback is not required to receive any particular type. For example, you can declare that it receives a `number`, which is what we want to report in case of error.


Using it does not require any further explanation:

```typescript
promiseReturningString(true)
  .then((result: string) => {
    console.log(`result:`, result);
  })
  .catch((errCode: number) => {
    console.log(`error:`, errCode);
  });
```

The values used as arguments for the `resolve()` and `reject()` callbacks are the ones that are being received in the `then()` and `catch()` functions.


### *Promise* summary

This section summarizes the relevant things you've seen about using *promises* in TypeScript:

+ A `Promise` is an object that requires a function to be passed in as part of its constructor. Typically, anonymous functions are used:


```typescript
const p = new Promise<number>(
  executor: (...something...) => void
)
```

+ The `executor` function has a very specific signature, with two parameters generally named `resolve` and `reject` that are themselves callback functions. The `resolve()` function must be called to fulfill the promise passing as argument the value with which the promise is fulfilled, and the `reject()` function must be called to reject the promise passing as argument the reason or error code (optionally).

```typescript
const p = new Promise<number>(
  executor: (
    resolve: (arg: number) => void,
    reject: (errReason?: any) => void
  ) => void
)
```

+ The `resolve()` and `reject()` functions return `void`.

## Async and await

The *async/await* syntax can be used in TypeScript in the same way you do in JavaScript. No additional type annotations are needed in this case, as can be seen in the following example that illustrates the classic *sleep* functionality:

```typescript
function sleepSeconds(seconds: number): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      console.log(`timeout done!`);
      resolve();
    }, seconds * 1_000);
  });
}

async function run() {
  console.log(new Date().toISOString());
  await sleepSeconds(3);
  console.log(new Date().toISOString());
}

run()
  .then(() => console.log(`done!`));
```

No changes either for handling errors in asynchronous code with *async/await*:

```TypeScript
function failAfterOneSec(): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      reject('failed!');
    }, 1_000);
  });
}

async function fail() {
  console.log(`before failure`);
  await failAfterOneSec();
  console.log(`after failure`);
}

fail();
```

The previous code fails, although more gracefully than plain-old Node.js:

```
[UnhandledPromiseRejection: This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). The promise rejected with the reason "failed!".] {
  code: 'ERR_UNHANDLED_REJECTION'
}
```

And in you want to handle the error, you have to use a *try-catch* block:

```typescript
async function fail() {
  console.log(`before failure`);
  try {
    await failAfterOneSec();
  } catch (err) {
    console.error(err);
  }
  console.log(`after failure`);
}
```

The same for using async/await with code that returns value(s):

```typescript
function getValues(): Promise<string[]> {
  return new Promise<string[]>(
    (resolve: (result: string[]) => void) => {
    resolve(['foo', 'bar', 'baz']);
  });
}

async function run() {
  const values = await getValues();
  for (const value of values) {
    console.log(value);
  }
}

run();
```

| NOTE: |
| :---- |
| During this section we've added the `resolve()` and `reject()` signature for completeness, but the TypeScript compiler does not complain when you don't include it &mdash; it is capable of inferring it from the `Promise<T>` specification that you use in the promise construction. |


## You know you've mastered this chapter when...

+ You're comfortable using *callbacks* in TypeScript, and understand that the only difference with JavaScript is the type annotations.

+ You're comfortable using *promises* in TypeScript, and understand the *somewhat* complicated syntax involved in creating a new promise.

+ You understand that there are no changes in TypeScript when using `.then()` and `.catch()`, or when using the *async/await* syntax.

## Exercises, code examples, and mini-projects

### [01: Callbacks](01-callbacks)
Practising callbacks in TypeScript.

### [02: Promises](02-promises)
Practising *promises* in TypeScript.

### [03: *async/await*](03-async-await)
Practising *async/await* in TypeScript.

### [e01: A promise example](e01-promise-example)
Another example about how to write promises in TypeScript.
