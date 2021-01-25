# Part 4: Node.js avanced patterns and techniques
## Chapter 31 &mdash; Asynchronous Control Flow Patterns with Promises and Async/Await
### Exercise 9: TaskQueuePC with promises
Update the `TaskQueuePC` class internal methods so that they use just promises, removing any us of the *async/await* syntax. Hint: the infinite loop must become an asynchronous recursion, so beware of the *recursive promise resolution memory leak*.


#### Solution
It is not easy to see it working correctly on the web crawler, so I created a simpler example.

You can run `npm run profile` to see that it does not seem to create any memory leak.