# Part 4: Node.js avanced patterns and techniques
## Chapter 31 &mdash; Asynchronous Control Flow Patterns with Promises and Async/Await
### Example 6: Recursive find with promises v2
This is an alternative implementation of the recursive find that does not use events to synchronize the result.

#### Solution
This alternative solution does not use events to synchronize the results, and also a different strategy is used to define the task boundaries &mdash; instead of consider that the task is the `findInFile()` operation, what we do now is consider that `scanDir()` is the task.

Let's go through the details.

In the function definition, we just instantiate the queue and create the `hits` array and trigger the processing.

```javascript
function recursiveFind(dir, keyword) {
  const findQueue = new TaskQueue(5);
  const hits = [];
  return scanDir(dir, keyword, hits, findQueue)
    .then(() => hits);
}
```

The function will return a promise whose fulfillment value will be `hits` when `scanDir(...)` has resolved. No other synchronization needed.

The tricky part is then performed on the `scanDir(...)` function:

```javascript
function scanDir(dir, keyword, hits, queue) {
  return queue.runTask(() => {
    return fsPromises.readdir(dir)
      .then(dirEntries => {
        const promises = dirEntries.map(dirEntry => findInFileTask(path.join(dir, dirEntry), keyword, hits, queue));
        return Promise.all(promises);
      });
  });
}
```

We know that `queue.runTask()` returns a promise that will be fulfilled/rejected with the result of running the task:

```javascript
  runTask(task) {
    return new Promise((resolve, reject) => {
      this.queue.push(() => {
        return task().then(resolve, reject);
      });
      process.nextTick(this.next.bind(this));
    });
  }
```

And the task we put in the queue consists of reading the initial directory and processing their entries. As a result, `scanDir()` will only be resolved when all the entries of the initial directory has been processed, which ensures that proper synchronization of the result value.

Also, internally in the task, we do:

```javascript
/* this is the task body that will be executed by TaskQueue.next() */
return fsPromises.readdir(dir)
  .then(dirEntries => {
    const promises = dirEntries.map(dirEntry => findInFileTask(path.join(dir, dirEntry), keyword, hits, queue));
    return Promise.all(promises);
  });
```

We read the directory entries and then process each of the entries aggregating the results in a `promises` array. Finally, this promise will only be resolved when all these promises has been fulfilled. Note that in these approach, we will be running `findInFileTask()` with a concurrency greater than the established one, as there is no `TaskQueue` to limit the concurrency of such tasks.

We could enhance this solution to create a separate `TaskQueue` to limit the concurrency of such tasks, or even try to put in the queue the two types of tasks, but at least with this solution we are making sure that the we're not creating a problem when there are a lot of directories to traverse in depth. Note that the first version has the opposite problem: it does not control the concurrency of `scanDir()` tasks.
