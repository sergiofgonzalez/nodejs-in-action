# Part 4: Node.js avanced patterns and techniques
## Chapter 31 &mdash; Asynchronous Control Flow Patterns with Promises and Async/Await
### Example 20: Chaining promise callbacks
> a workbench for grokking several related scenarios related to chaining promise callbacks.


From the concepts section we know that the `then()` method of a promise instance can be used to get the fulfillment value or the error reason with which the promise instance is settled:

```javascript
promise.then(onFulfilled, onRejected);
```

where:
+ `onFulfilled` &mdash; a callback that will eventually receive the fulfillment value of the `Promise` instance.
+ `onRejected` &mdash; a callback that will eventually receive the rejection reason of the `Promise` instance.


```javascript
promise
  .then(result => {
    // logic when promise is fulfilled
  }, err => {
    // logic to handle the error
  });
```

Therefore, code like the following:

```javascript
function runTask (task) {
  return new Promise((resolve, reject) => {
    return task()
      .then(resolve, reject);
  });
}
```

in which we do `task().then(resolve, reject)` means that if `task()` returns a promise that is fulfilled, `resolve` will be invoked, which means the promise created from scratch will be fulfilled; if `task()` is rejected, `reject` will be invoked, which will ultimately reject the promise created from scratch in `runTask()`.

It might be clearer if we *deconstruct* what we're doing with `then(resolve, reject)`:
```javascript
function runTask (task) {
  return new Promise((resolve, reject) => {
    return task()
      .then((result, err) => {
        resolve(result);
      }, err => {
        reject(err);
      });
  });
}
```

Note that the complexity of the construct `then(resolve, reject)` lies in JavaScript functional underpinnings rather than promise-based concepts, as can be seen in the following example that does not rely in promises:

```javascript
[1, 2, 3].forEach(console.log);
```

In the example above, `console.log` will be invoked with all the arguments `forEach` provides to the callback in each iteration.



