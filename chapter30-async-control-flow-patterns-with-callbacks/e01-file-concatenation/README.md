# Part 4: Node.js avanced patterns and techniques
## Chapter 30 &mdash; Async Control Flow Patterns with Callbacks
### Exercise 1 &mdash; File Concatenation
> Write the implementation of `concatFiles(...)`, a callback-style function that takes two or more paths to text files in the file system and a destination file.

```javascript
function concatFiles(srcFile1, srcFile2, srcFile3, ..., dest, cb) {
    ...
}
```

> This function must copy the contents of every source file into the destination file, respecting the order of the files as provided by the arguments list. Also, the function must be able to handle an arbitrary number of arguments.

#### Solution
The focus of the example is to *grok* the sequential iteration pattern. Therefore, there will be more memory efficient ways to perform the concatenation. For example, the intermediate data consisting in the aggregation of each of the file contents is materialized.

The interesting part of the solution is the `concatFiles(...args)` function. This is where the asynchronous iteration is implemented.

```javascript
export function concatFiles(...args) {
  const { cb, dest, inputFiles } = getParamsFromArgs(args);
  let contents = '';

  function iterate(index) {
    if (index === inputFiles.length) {
      return finish(contents, cb);
    }

    readFileContentsTask(inputFiles[index], (err, data) => {
      if (err) {
        return cb(err);
      }
      contents += data;
      iterate(index + 1);
    });
  }

  function finish(contents, cb) {
    writeFile(dest, contents, err => {
      if (err) {
        console.log(`ERROR: concatFiles-finish: could not write destination file: ${ err.message }`);
        return cb(err);
      }
      cb();
    });
  }

  iterate(0);
}
```
