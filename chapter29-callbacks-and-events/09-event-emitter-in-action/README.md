# Part 4: Node.js avanced patterns and techniques
## Chapter 29 &mdash; Callbacks and Events
### 09 &mdash; `EventEmitter` in action
> illustrates the **Observer** pattern in a simple example

#### Description
In the example, a function `findRegex(...)` accepting a list of files and a regular expression is defined. Within the function, an `EventEmitter` is instantiated and three types of events are fired to notify any possible subscribers of changes in the state:
* `fileread` &mdash; when a file is being read
* `found` &mdash; when a match is found
* `error` &mdash; when an error is found while the file is being read

Also, the function is being invoked and three listeners are registered for each of the event types produced by `findRegex(...)`.