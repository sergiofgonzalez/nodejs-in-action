# Part 4: Node.js avanced patterns and techniques
## Chapter 29 &mdash; Callbacks and Events
### Exercise 2 &mdash; Ticker
> Write a function that accepts a number and a callback as the arguments. The function will return an `EventEmitter` that emits an event called `'tick'` every 50 milliseconds until the number of milliseconds is passed from the invocation of the function. The function will also call the callback when the number of milliseconds has passed providing as the result the total count of `'tick'` events emitted. Hint: you can use `setTimeout()` to schedule another `setTimeout()` recursively.

#### Notes on ESM interoperability
In the example, the `package.json` is qualified as `"type": "module"` and all the JavaScript files are using *ESM* with extension `.js`, without issues.

The tests make use of NPM libraries like `tap` and `sinon` that seem to work quite well with *ESM* with a few changes here and there and some missing functionality with respect to *CJS*:
+ `tap` requires a `--non-esm` (I know is counterintuitive!) to work
+ the coverage report is empty
