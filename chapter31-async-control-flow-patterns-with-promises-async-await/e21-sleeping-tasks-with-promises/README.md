# Part 4: Node.js avanced patterns and techniques
## Chapter 31 &mdash; Asynchronous Control Flow Patterns with Promises and Async/Await
### Example 21: Sleeping tasks with promises
> a workbench for grokking scenarios related to *pausing* execution using promises.

In the implementation of the `TaskQueuePC` we found this *fancy* stuff:

```javascript
async consumer () {
  while (true) {
    try {
      const task = await this.getNextTask();
      await task();
    } catch (err) {
      console.error(err);
  }
}

async getNextTask () {
  return new Promise((resolve) => {
    if (this.taskQueue.length !== 0) {
      return resolve(this.taskQueue.shift());
    }
    this.consumerQueue.push(resolve);
}
```

Note that the consumer includes a `while (true)` that does not consume extra CPU cycles, because `await this.getNextTask()` puts the consumer to sleep if there is nothing to do &mdash; this means that effectively, execution is paused on that line until the promise returned by `this.getNextTask()` is settled.

The way in which that construct works is based in creating a promise instance from scratch in `getNextTask()`, and then passing the `resolve` callback into a queue.

Thus, when the consumer gets re-activated, it will receive the original `resolve` callback that it can use to finally settle the task.