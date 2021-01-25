# Part 4: Node.js avanced patterns and techniques
## Chapter 31 &mdash; Asynchronous Control Flow Patterns with Promises and Async/Await
### Example 4: Hello, `TaskQueue` with promises
A very simple example demonstrating the usage pattern for our `TaskQueue`, promise-based class. In the example, we use the `TaskQueue` to classify a large number of numbers into even and odd.

#### Solution
Although the amount of code needed to solve the problem is much less than in the callback based counterpart, there are a few important things to take into account.

Firstly, the entry point for the program is now much simpler: the queue and the placeholders for the results can now be encapsulated within the function we call from here:

```javascript
/* no need to instantiate queue and arrays for even and odd results */
classifyEvenOddNumbers(100, 3)
  .then(({ evenNumbers, oddNumbers }) => {
    console.log(`INFO: completed classification!`);
    console.log(`even: `, evenNumbers);
    console.log(`odd: `, oddNumbers);
  });
```

Instead, we do all that setup in `classifyEvenOddNumbers(...)` function. This function is also responsible for pushing the tasks to the queue, and returning the final result once all the tasks have finished.

```javascript
function classifyEvenOddNumbers(maxNum, concurrency = 2) {
  const queue = new TaskQueue(concurrency);
  const evenNumbers = [];
  const oddNumbers = [];
  const promises = [];
  for (let i = 1; i <= maxNum; i++) {
    const p = queue.runTask(() => classifyNumberTask(i, evenNumbers, oddNumbers));
    promises.push(p);
  }
  return Promise.allSettled(promises)
    .then(() => {
      return { evenNumbers, oddNumbers };
    });
}
```

Note that we queue all the task synchronously without caring about the sequencing, as we're delegating the concurrency management to the `TaskQueue`.
We also define a variable `promises` to keep track of their *status* for all the tasks submitted to execution. That would let us inform our caller that everything has completed.

> The function `queue.runTask()` returns a *promise* that you can use if needed for synchronization.

Finally, the function doing the actual work is `classifyNumberTask(...)`.
> The function passed to `runTask(...)` is expected to return a *promise*.

The easiest way to do it in this case is to create a promise from scratch using the constructor, and then calling `resolve()` once done to resolve it. As there is no result to return (the results are passed along in `evenNumbers` and `oddNumbers` arrays) we just called `resolve()`.

Note also that we use `setImmediate()` to simulate an asynchronous operation.

```javascript
function classifyNumberTask(num, evenNumbers, oddNumbers) {
  return new Promise(resolve => {
    setImmediate(() => {
      if (num % 2 === 0) {
        evenNumbers.push(num);
      } else {
        oddNumbers.push(num);
      }
      resolve();
    });
  });
}
```


