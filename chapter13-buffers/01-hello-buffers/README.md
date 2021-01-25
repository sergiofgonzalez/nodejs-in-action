# 01-hello-buffers
> introducing the `Buffer` class

## Description
Buffers are raw allocations of the heap, exposed to JavaScript in an array-like manner. The `Buffer` class is exposed globally and therefore doesn't need to be required.

In the example, it is illustrated:
+ how to allocate a buffer
+ how the memory of the process changes before and after the allocation. As a reminder:
  + `rss` &mdash; resident set size (portion of the process' memory held in RAM)
  + `heapTotal` &mdash; memory available for dynamic allocation (V8)
  + `heapUsed` &mdash; amount of heap used (V8)
  + `external` &mdash; memory usage of C++ objects bound to JavaScript objects managed by V8
+ Using `readFile` returns a `Buffer`
+ How to transform a `Buffer` into a string using `toString(encoding)`.

