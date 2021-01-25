# Part 4: Node.js avanced patterns and techniques
## Chapter 31 &mdash; Asynchronous Control Flow Patterns with Promises and Async/Await
### Exercise 7: Dissecting `Promise.all()`
Implement your own version of `Promise.all()` leveraging promises, *async/await* or a combination of the two. The function must be functionally equivalent to its original counterpart.

#### Solution
We know from the concepts section that `Promise.all(iterable)` creates a `Promise` that fulfills with an array of fulfillment values when every item in the input `iterable` object fulfills.
If any of the *promises* in the `iterable` object rejects, then the `Promise` returned by `Promise.all()` will reject with the first rejection reason. Each item in the iterable object can be a `Promise` a generic *thenable* or a *value*.

The first thing will be to set up a test harness, so that we can switch from the native `Promise.all()` implementation to the custom one, ensuring everything keeps working.
+ `Promise.all(iterable)` should accept an iterable of either one of `Promise`, *thenable* or *values*
+ `Promise.all(iterable)` should return a promise that:
  + if fulfills, the fulfillment value will be an array of the fulfillment values of every item in the iterable object
  + if rejects, the error reason will be the first rejection of the iterable object

