# Part 4: Node.js avanced patterns and techniques
## Chapter 31 &mdash; Asynchronous Control Flow Patterns with Promises and Async/Await
### Example 5: Recursive find with promises

Write `recursiveFind()`, a promise-based function that takes a path to a directory in the local filesystem and a keyword as per the following signature:
```javascript
function recursiveFind(dir, keyword)
```

The function must find all the text files within the given directory that contain the given keyword in the file contents. The list of matching files should be returned as the *fulfillment* value of the promise when the search is completed. If no matching file is found, the fulfillment value should be an empty array.

As an example test case, if you have the files `foo.txt` and `bar.txt` and `baz.txt` in `myDir` and the keyword `batman` is contained in the files `foo.txt`, and `baz.txt` making the call:

```javascript
recursiveFind('myDir', 'batman')
  .then(console.log);
// should print ['foo.txt', 'baz.txt']
```

The final solution must make the search recursive, so that it looks for files in any subdirectory of the given directory, and in parallel using a `TaskQueue` so that the number of parallel tasks don't grow out of control.

#### Solution
The complicated part of this example is the timing: signaling when the process has completed, so that we can resolve the promise with the *fulfillment* value.

In this first attempt I modified the `TaskQueue` class so that it emitted an `'empty'` event when the queue is finally empty after having processed all the tasks.

```javascript
next() {
  if (this.running === 0 && this.queue.length === 0) {
    return this.emit('empty');
  }

  while (this.running < this.concurrency && this.queue.length) {
    const task = this.queue.shift();
    task().finally(() => {
      this.running--;
      this.next();
    });
    this.running++;
  }
}
```

That made the synchronization really easy:

```javascript
function recursiveFind(dir, keyword) {
  const findQueue = new TaskQueue(5);
  const hits = [];
  scanDir(dir, keyword, hits, findQueue);
  return new Promise(resolve => {
    findQueue.on('empty', () => resolve(hits));
  });
}
```

That is, the process is started by invoking `scanDir(...)` and then separately, return a promise that will be resolved when we receive the `'empty'` event.

Then the processing is handled through the queue in `scanDir()`.

```javascript
function scanDir(dir, keyword, hits, queue) {
  return fsPromises.readdir(dir)
    .then(dirEntries => {
      dirEntries.forEach(dirEntry => {
        queue.runTask(() => findInFileTask(path.join(dir, dirEntry), keyword, hits, queue));
      });
    });
}
```

Note that the queue is used to control the concurrency of the `findInFileTask()` invocations.