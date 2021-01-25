# Part 4: Node.js avanced patterns and techniques
## Chapter 29 &mdash; Callbacks and Events
### Exercise 1 &mdash; A simple event
> Modify the asynchronous `FindRegex` class from [10 &mdash; Observable objects](./10-observable-objects/) so that it emits an event when the find process starts, passing the input files list as an argument of the event. Ellaborate why there is a chance of creating an inconsistency between synchronous and asynchronous behavior?

#### Solution

The change is just a simple line, but in order to make the function consistently asynchronous, you have to use `process.nextTick(...)` to give a chance to register listeners before the scanning process starts.