# Part 4: Node.js avanced patterns and techniques
## Chapter 31 &mdash; Asynchronous Control Flow Patterns with Promises and Async/Await
### Example 3: [List files recursively](./e03-list-files-recursively/)
Write `listNestedFiles()`, a promise-based function that takes as the input the path to a directory in the local filesystem, and that asynchronously iterates over all the subdirectories to eventually return a promise that is fulfilled with the list of all the files discovered.

#### Solution
The solution requires correct sequencing of directory scanning to do a *deep first scanning*.

The solution is definitely easier than with callbacks, but still requires a bit of thinking:

First we defined the required function, which sets up the context variables that will be passed along while scanning the directories. Also, `then()` is used to receive the result from when the scanning of the whole subtree has completed.

```javascript
function listNestedFiles(dir) {
  const files = [];
  const objects = [];
  return scanDir(dir, files, objects)
    .then(() => {
      console.log(`INFO: completed scanning of ${ dir } subtree`);
      return { files, objects };
    });
}
```

The we next the entry point for the recursion. This function just performs the `fs.readdir()` to obtain the objects in the current directory, and then delegates to `process.DirEntries()` to process them.

Note that even when `scanDir` will be called several times recursively, the function simply returns the result of processing the directory entries.

```javascript
function scanDir(dir, files, objects) {
  return fsPromises.readdir(dir)
    .then(dirEntries => processDirEntries(dir, dirEntries, files, objects));
}
```

Next we have the function that scans the directory elements, accumulating the files and objects found, while also triggering the recursive calls when required.

```javascript

function processDirEntries(dir, dirEntries, files, objects) {
  let promise = Promise.resolve();
  for (const dirEntry of dirEntries) {
    const dirEntryPath = path.join(dir, dirEntry);
    promise = promise
      .then(() => fsPromises.stat(dirEntryPath))
      .then(stat => {
        objects.push(dirEntryPath);
        if (stat.isDirectory()) {
          return scanDir(dirEntryPath, files, objects);
        }
        files.push(dirEntryPath);
      });
  }
  // next line is not necessary but helps to visualize everything is going fine
  promise.then(() => console.log(`INFO: scanning of ${ dir }/ completed`));
  return promise;
}
```

Here we need to do a little bit of *smart promise-chaining* to control the sequencing.

First we instantiate a promise that we will use in the iteration. Then, we iterate over the directory entries, checking whether the entry is a directory or a a file, and triggering a recursive call to `scanDir()` in the first case.

By chaining these actions to the `promise` we created at the beginning of the function we will make sure that the sequence of calls is exactly the one that we want: a deep-first scanning of directories.

Finally, we invoke the function to trigger the whole process and collect the results:

```javascript
listNestedFiles('sample_dir/')
  .then(({ files, objects }) => {
    console.log(`========== done!`);
    console.log(`objects:`, objects);
    console.log(`files:`, files);
  })
  .catch(err => {
    console.error(`ERROR: could not complete directory scanning: ${ err.message }`);
  });
```

As promises work like regular JavaScript direct-style functions when returning results, we destructure the two objects provided by `listNestedFiles()` in the signature of the `then()` function.

Note also that the only require error handling is written in the invocation of `listNestedFiles()`. Any error found during the process will be correctly propagated up to this point.