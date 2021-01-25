# Part 4: Node.js avanced patterns and techniques
## Chapter 31 &mdash; Asynchronous Control Flow Patterns with Promises and Async/Await
### Example 12: Hello, `p-throttle`
Illustrates the basics of the [`p-throttle`](https://www.npmjs.com/package/p-throttle) package that lets you control that functions are called only under certain given rates (e.g. only twice a second).

In the example, we throttle a synchronous function that reports the time so that it is executed only twice every second, and a similar asynchronous function.