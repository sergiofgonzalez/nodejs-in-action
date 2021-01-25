# Part 4: Node.js avanced patterns and techniques
## Chapter 31 &mdash; Asynchronous Control Flow Patterns with Promises and Async/Await
### Example 1 &mdash; File Concatenation with Promises
> Write the implementation of `concatFiles(...)`, a promise-based function that takes two or more paths to text files in the file system and a destination file.

This function must copy the contents of every source file into the destination file, respecting the order of the files as provided by the arguments list. Also, the function must be able to handle an arbitrary number of arguments.
