# Part 4: Node.js avanced patterns and techniques
## Chapter 34 &mdash; Structural design patterns
Illustrates how to use the native `Proxy` object to intercept calls to a function and show that the function has been called, and report how much time it took to execute.

### Notes on the solution
It must be noted that the solution is incomplete (from the profiling standpoint), because it seems to work well with sync and async function but obviously, does not report correctly the time when `setTimeout()` is used.