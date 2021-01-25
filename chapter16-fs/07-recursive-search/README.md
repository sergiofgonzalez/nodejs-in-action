# 07-recursive-search
> searching for files recursively on a directory tree

## Description
The example illustrates how to search on a given directory tree for file matching a given file pattern such as `/file.*/`.

If applied to the example-tree, we intend to obtain the following list:
```
[
  "dir-a/dir-b/dir-c/file-e.txt",
  "dir-a/dir-b/file-c.js",
  "dir-a/dir-b/file-d.cpp",
  "dir-a/file-a.js",
  "dir-a/file-b.log"
]
```

This functionality is implemented in a module that exposes a sync and two flavors of async versions of the functionality:
+ `finder.findSync` &mdash; sync version using `fs.readdirSync` and `fs.statSync` flavors of the file operations.
+ `finder.find` &mdash; async version using callbacks and counters to control async operations happening in the background
+ `finder.findAsync` &mdash; async version using the same algorithm as in `findSync` but using the async versions for readdir and stat and async/await to control the asynchronicity.

