# 01-hello-custom-event-emitter
> creating a class that inherits from `EventEmitter`

## Description
In the example, we explore to different ways of sending a really large file to a client using a solution based on streams, and a solution not based on streams.

In order to test it, run:
```bash
LARGE_FILE_PATH="<path-to-really-large-file>" npm start
```

You'll see that when using the stream-based solution, the memory consumption is much less.

### Some Notes on Streams
Streams are an event-based API for managing and modeling data. By leveraging `EventEmitter` and non-blocking I/O libraries, *streams* provide an efficient wat to process data when it's available and released when it's no longer needed.

The `stream` core module provides abstract tools for building event-based stream classes. It's more likely that you'll use modules that uses that API, but it's critical to understand how it works to be able to use it properly.

In Node.js streams are an abstract interface adhered to by several different objects &mdash; in a sense streams are a protocol. Streams can be readable or writable, and are implemented with instances of `EventEmitter`.

Streams always involve I/O of some kind.
When reading a file synchronously with `fs.readFileSync` the program will block and all of the data will be read into memory. Using `fs.readFile` will prevent the program from blocking because it's an *async* method, but it'll still load the entire file into memory.
When using streams, you'll be able to read a chunk of data into memory, process it, and then ask for more data.

You can think of Node streams as you would with Unix pipes (as in `cat file.txt | grep`), except that in Node.js data is filtered through functions rather than command-line programs.

Each of the `stream` module base classes emits various events, which depend on whether the base class is readable, writable or both. As *extensions* of `EventEmitter` you can listen to those standard events or generate your own to represent domain-specific behavior.

| stream type | Use Case                                                                            |
|-------------|-------------------------------------------------------------------------------------|
| Readable    | Wrap around an underlying I/O source with a streamable API                          |
| Writable    | Get output from a program to use elsewhere, or send data elsewhere within a program |
| Transform   | Change data in some way by parsing it                                               |
| Duplex      | wrap a data source that can also receive messages                                   |
| PassThrough | Extract data from streams without changing it                                       |

Some notable events:
+ `"readable"` &mdash; a `stream.Readable` instance is prepared to receive `stream.read()` calls.
+ `"error"` &mdash; triggered when a stream encounters an error.
+ `"end"` &mdash; emitted when the stream has received the equivalent of the EOF character and therefore won't receive more data.
+ `"close"` &mdash; the underlying resources has been closed.
+ `"finish"` &mdash; emitted in `stream.Writable` instances when `writable.end()` has been called.
+ `"pipe"` &mdash; emitted when passing a stream to `stream.Readable.pipe()` method.

#### Basics

##### pipe
Use the `pipe()` method to pair an input with an output: it takes a *readable* source stream and hooks the output to a target *writable* stream:
```javascript
a.pipe(b).pipe(c).pipe(d);
// it's the same as
a.pipe(b);
b.pipe(c);
c.pipe(d);
```

##### Readable

Readable streams produce data that can be fed into a writable, transform or duplex stream by calling `pipe()`.


