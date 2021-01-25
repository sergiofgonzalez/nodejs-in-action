# Chapter 16 &mdash; File System
> Synchronous and asynchronous approaches to files

## [01-hello-fs-api](./01-hello-fs-api/)
Introduces Node.js's `fs` api running a series of *synchronous* low-level API operations.

## [02-hello-file-streaming](./02-hello-file-streaming/)
Illustrates how to copy a source file using a readable stream and piping it into a writable stream.

## [03-hello-bulk-file-io](./03-hello-bulk-file-io/)
Illustrates how to materialize the contents of a file in a buffer.

## [04-hello-file-descriptors](./04-hello-file-descriptors/)
Introduces the concept of file descriptors, which can be then used in any of the low-level API calls accepting an *fd*.

## [05-file-locking-mechanism](./05-file-locking-mechanism/)
Illustrates three level strategies you can use to implement a file-locking mechanism in Node.js.

## [06-file-locking-module](./06-file-locking-module/)
A basic implementation of a file locking mechanism in a Node.js module.

## [07-recursive-search](./07-recursive-search/)
Implementing a recursive search for files in a directory tree using a sync version and two flavors of async.

## [08-fs-key-value-db](./08-fs-key-value-db/)
Implementing basic, callback based, key/value data store with file persistence 

## [09-file-watching-alternatives](./09-file-watching-alternatives/)
A basic example that illustrates Node.js file watching alternatives: `fs.watch` and `fs.watchFile`.

## [e01-fs-key-value-db-promises](./09-fs-key-value-db-promises/)
Implementing basic, promise based, key/value data store with file persistence