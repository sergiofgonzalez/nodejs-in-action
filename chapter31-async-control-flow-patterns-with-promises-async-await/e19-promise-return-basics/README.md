# Part 4: Node.js avanced patterns and techniques
## Chapter 31 &mdash; Asynchronous Control Flow Patterns with Promises and Async/Await
### Example 19: Promise `return` basics
> Illustrates some basic stuff about promise chaining related to how `return` works

On the one hand, when creating a promise using its constructor, we have to make sure:
+ that the function returns a promise
+ that within the body of the function we call the `resolve` or `reject` callbacks to settle the promise.

If we fail to do both, the code will break.

Regarding using `then()`:
+ `then()` will always return a promise synchronously, so you can chain `then()` with other `then()`, `catch()` and `finally()` as required, independently of what we do in the initial `then()` body.
+ If we return something (promise or value) in the `then()` body, it will become the value with which the promise will be settled. This means that if it is the last `then()` in the chain, the promise will be settled with that value, or with the fulfillment or error reason of that promise we return. If it's an intermediate `then()` in a promise chain, the next `then()` will:
  + if we're returning a value &mdash; that value will be received in the `then()` callback.
  + if we're returning a promise &mdash; the `then()` callback will be executed as soon as the promise is settled, and that callback will received the fulfillment value or error reason of that returned promise.


You have to be very careful when working with those chains, as a minor bug will have *dire* consequences on the chain resolution logic.

For example, the following code snippet is buggy because the body of the `then()` callback is fulfilling a promise that is not returning. As a result, the subsequent `then()` callback will execute right away and will receive no data.

```javascript
/* ... */
.then((data) => {
    setTimeout(() => Promise.resolve(data + 1), 2 * 1000);
  })
  .then((data) => {
    console.log(`data=${ data }`);
  })
/* ... */
```

The following code example is also buggy because the first callback is returning a promise that never settles. This will cause the subsequent `then()` callback to never be invoked.

```javascript
/* ... */
.then((data) => {
  /* buggy, resolve callback from the returned promise is never invoked */
    return new Promise(resolve => {
      setTimeout(() => Promise.resolve(data + 1), 2 * 1000);
    });

  })
  .then((data) => {
    // never gets called!
    console.log(`data=${ data }`);
  })
/* ... */
```


