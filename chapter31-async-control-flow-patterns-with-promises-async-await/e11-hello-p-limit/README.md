# Part 4: Node.js avanced patterns and techniques
## Chapter 31 &mdash; Asynchronous Control Flow Patterns with Promises and Async/Await
### Example 11: Hello, `p-limit`
Illustrates the basics of the [`p-limit`](https://www.npmjs.com/package/p-limit) package that lets you run multiple promise-based tasks with limited concurrency.

In the example, we prepare a bunch of asynchronous tasks and make them run with a max concurrency of 1, which ensures that they are executed in series.