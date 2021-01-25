# Part 4: Node.js avanced patterns and techniques
## Chapter 30 &mdash; Async Control Flow Patterns with Callbacks
### Exercise 2 &mdash; List files recursively
> Write `listNestedFiles()`, a callback-style function that takes as the input the path to a directory in the local filesystem, and that asynchronously iterates over all the subdirectories to eventually return a list of all the files discovered.

```javascript
function listNestedFiles(dir, cb) {
  ...
}
```

#### Solution

The solution is based on the code **pattern for sequential iteration**:

```javascript
function taskOrchestrator(inputArg1, inputArg2, ..., inputArgN, cb) {
  function iterate(index) {
    if (index === tasks.length) {
      return finish();
    }

    const task = tasks[index];
    task(() => interate(index + 1))
  }

  function finish() {
    /* done! */
  }

  // start!
  iterate(0);
}
```

In the solution, apart from plain iteration, we need to perform recursive calls if the entry being scanned happens to be a directory.