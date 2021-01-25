# Part 4: Node.js avanced patterns and techniques
## Chapter 31 &mdash; Asynchronous Control Flow Patterns with Promises and Async/Await
### Example 17:[Recursive find with *async/await*

Write `recursiveFind()`, a promise-based function using *async/await* syntax that takes a path to a directory in the local filesystem and a keyword as per the following signature:
```javascript
async function recursiveFind(dir, keyword)
```

The function must find all the text files within the given directory that contain the given keyword in the file contents. The list of matching files should be returned as the *fulfillment* value of the promise when the search is completed. If no matching file is found, the fulfillment value should be an empty array.

As an example test case, if you have the files `foo.txt` and `bar.txt` and `baz.txt` in `myDir` and the keyword `batman` is contained in the files `foo.txt`, and `baz.txt` making the call:

```javascript
recursiveFind('myDir', 'batman')
  .then(console.log);
// should print ['foo.txt', 'baz.txt']
```

The final solution must make the search recursive, so that it looks for files in any subdirectory of the given directory, and in parallel using a `TaskQueue` so that the number of parallel tasks don't grow out of control.