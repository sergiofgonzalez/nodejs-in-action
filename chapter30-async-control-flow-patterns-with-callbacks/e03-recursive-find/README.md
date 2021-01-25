# Part 4: Node.js avanced patterns and techniques
## Chapter 30 &mdash; Async Control Flow Patterns with Callbacks
### Exercise 3 &mdash; Recursive find
Write `recursiveFind()`, a callback-style function that takes a path to a directory in the local filesystem and a keyword as per the following signature:
```javascript
function recursiveFind(dir, keyword, cb)
```

The function must find all the text files within the given directory that contain the given keyword in the file contents. The list of matching files should be returned using the callback when the search is completed. If no matching file is found, the callback must be invoked with an empty array.

As an example test case, if you have the files `foo.txt` and `bar.txt` and `baz.txt` in `myDir` and the keyword `batman` is contained in the files `foo.txt`, and `baz.txt` making the call:

```javascript
recursiveFind('myDir', 'batman', console.log)
// should print ['foo.txt', 'baz.txt']
```

The final solution must make the search recursive, so that it looks for files in any subdirectory of the given directory, and in parallel using a `TaskQueue` so that the number of parallel tasks don't grow out of control.

#### Solution
The first thing is to identify what will be the individual task, and implement it as a function.

Then, we will need to create the function entry point that populates the tasks.

Finally, we will have to write the piece of code the invokes the entry point.

##### Writing the individual task function
We need a function that given a file path:
+ checks if the file path is a directory, if it is, invokes a function that will trigger scanning that directory for files
+ if the file path is a file, read its contents, and tries to match the given string in the contents. If found, the filename should be appended to the context variable that keeps track of the search hits.

```javascript
function findInFileTask(dirEntryPath, keyword, hits, errors, queue, cb) {
  fs.stat(dirEntryPath, (err, stat) => {
    if (err) {
      errors.push(err);
      return cb(err);
    }
    if (stat.isDirectory()) {
      scandir(dirEntryPath, keyword, hits, errors, queue);
      cb();
    } else {
      fs.readFile(dirEntryPath, 'utf8', (err, contents) => {
        if (err) {
          errors.push(err);
          return cb(err);
        }
        if (contents.match(keyword)) {
          hits.push(dirEntryPath);
          return cb(null, dirEntryPath);
        } else {
          return cb();
        }
      });
    }
  });
}
```

The function is using two async functions, so it is much better in terms of readability to refactor it into two separate functions, so that there's only one async function in each one:

```javascript
function findInFileTask(dirEntryPath, keyword, hits, errors, queue, cb) {
  fs.stat(dirEntryPath, (err, stat) => {
    if (err) {
      errors.push(err);
      return cb(err);
    }
    if (stat.isDirectory()) {
      scandir(dirEntryPath, keyword, hits, errors, queue);
      cb();
    } else {
      findKeywordInFileContents(dirEntryPath, keyword, hits, errors, cb);
    }
  });

function findKeywordInFileContents(file, keyword, hits, errors, cb) {
  fs.readFile(file, 'utf8', (err, contents) => {
    if (err) {
      errors.push(err);
      return cb(err);
    }
    if (contents.match(keyword)) {
      hits.push(file);
      return cb(null, file);
    } else {
      return cb();
    }
  });
}
```

Note that the signature of the task has been enhanced to pass along the `hits` and `errors` that will be used to report the same.

##### The entry point function
The entry point function is the function that populates the queue. In this case we will have recursive calls when we find subdirectories, so it has to be separate from the `recursiveFind(...)` that we have to build.

```javascript
function scandir(dir, keyword, hits, errors, queue) {
  fs.readdir(dir, (err, dirEntries) => {
    if (err) {
      return errors.push(err);
    }

    dirEntries.forEach(dirEntry => {
      queue.pushTask(taskDone => findInFileTask(path.join(dir, dirEntry), keyword, hits, errors, queue, taskDone));
    });
  });
}
```

##### Invoking the entry point function
In this case, the invocation of the entry point is done from the `recursiveFind(...)`. This one is in charge of setting up the task queue and the context variables on which the hits and errors will be accumulated:

```javascript
function recursiveFind(dir, keyword, cb) {
  const findQueue = new TaskQueue(5);
  const hits = [];
  const errors = [];

  findQueue
    .on('error', err => {
      console.log(`ERROR: recursiveFind: failed for ${ dir } searching for ${ keyword }: ${ err.message }`);
      errors.push(err);
    })
    .on('empty', () => cb(errors.length > 0 ? errors : null, hits));

  scandir(dir, keyword, hits, errors, findQueue);
}
```

The proper way to report the results to the caller is by subscribing to the `'empty'` event. By doing so, the function invoking `recursiveFind(...)` is unaware that everything is happening in parallel.
