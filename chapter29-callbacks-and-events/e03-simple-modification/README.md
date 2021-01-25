# Part 4: Node.js avanced patterns and techniques
## Chapter 29 &mdash; Callbacks and Events
### Exercise 3 &mdash; A simple modification
> Modify the function from [Exercise 2](../e02-ticker/) so that it emits a tick event immediately after the function is invoked.

#### About the solution
The solution to the exercise consists in emitting an extra `'tick'` asynchronously, so that the function behaves asynchronously in every situation.

The tests were updated. Please note the use of the `fakeTimers` with an extra config, as `process.nextTick` is not *faked* by default.