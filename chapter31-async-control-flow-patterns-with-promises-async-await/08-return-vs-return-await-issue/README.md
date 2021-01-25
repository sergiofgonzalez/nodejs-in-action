# Part 4: Node.js avanced patterns and techniques
## Chapter 31 &mdash; Asynchronous Control Flow Patterns with Promises and Async/Await
### 08 &mdash; The `return` vs. `return await` issue
> Illustrates a common antipattern when dealing with errors in *async/await* code, in which a *try...catch* block is useless because the async function returns a `Promise` before it has been settled. As a result, the error must be caught by the caller code. If we intend to catch the error locally (and not in the caller code), `return await` should be used instead
