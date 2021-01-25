# Part 4: Node.js avanced patterns and techniques
## Chapter 31 &mdash; Asynchronous Control Flow Patterns with Promises and Async/Await
### Exercise 10: An asynchronous `map()`
Implement a parallel asynchronous version of `Array.map()` that supports promises and a concurrency limit. The function should not directly leverage `TaskQueue` or `TaskQueuePC` classes, but it can use the underlying patterns on which those are based.

The function, which will be defined with the signature `mapAsync(iterable, callback, concurrency)` will accept the following inputs:
+ `iterable` &mdash; a generic iterable, such as an array
+ `callback` &mdash; a function that accepts as input each item of the iterable (exactly as the original `Array.map()`) and that returns a `Promise` or a simple value.
+ `concurrency` &mdash; which defines how many items in the iterable can be processed by callback in parallel at each given time
