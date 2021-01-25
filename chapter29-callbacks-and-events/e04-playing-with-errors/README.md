# Part 4: Node.js avanced patterns and techniques
## Chapter 29 &mdash; Callbacks and Events
### Exercise 4 &mdash; Playing with errors
> Modify the function created in [Exercise 4](../e03-simple-modification/) so that it produces an error if the timestamp at the moment of a *tick* (including the extra one at the beginning) is divisible by 5. Propagate the error using both the *callback* and the *event emitter*.

#### About the solution
This one is trickier, especially for the initial error, as we need to ensure:
+ that the `eventEmitter` is returned even when you know that you're going to emit an error in the next cycle of the event loop
+ that no `setTimeout(...)` are scheduled

In the test we play with advanced capabilities of the timers, such as setting an specific time and faking `Date` object.
