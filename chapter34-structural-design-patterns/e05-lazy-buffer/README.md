# Part 4: Node.js avanced patterns and techniques
## Chapter 34 &mdash; Structural design patterns
### Exercise 5: [The lazy buffer](./e05-lazy-buffer)
Implement a `createLazyBuffer(size)` *factory function* that generates a virtual proxy for a `Buffer` of the given size. The *proxy* instance should instantiate a `Buffer` object (effectively allocating the given amount of memory) only when `write()` is being invoked for the first time. If no attempt to write into the buffer is made, no `Buffer` instance should be created.

#### A few details about `Buffer`

`Buffer` objects are used to represent fixed-length sequence of bytes. The `Buffer` class is a subclass of `UInt8Array` class and extends it with methods that cover additional use cases. Node.js' APIs accept plain `UInt8Array` wherever `Buffer` is accepted.

The `Buffer` class is defined in the global scope.

Let's see some examples:

```javascript
// creates a zero-filled Buffer of length 10 bytes
const buf1 = Buffer.alloc(10);

// creates a Buffer of length 10 bytes filled with bytes of value 1
const buf2 = Buffer.alloc(10, 1);

// creates an uninitialized data (might contain garbage)
const buf3 = Buffer.allocUnsafe(10);

// creates a buffer containing the bytes taken from the given array
const buf4 = Buffer.from([1, 2, 3]);

// creates a buffer from the UTF8 encoded given string characters
const buf5 = Buffer.from('hello');

// creates a buffer from the given string characters and encoding
const buf6 = Buffer.from('sí', 'latin1');
```

`Buffer` objects are ideal to obtain the binary or base64 of strings and other objects:

```javascript
const buff = Buffer.from('Hello to Jason Isaacs!', 'utf8');
console.log(buf.toString('hex'));
console.log(buf.toString('base64'));

const buff2 = Buffer.from('aGVsbG8gd29ybGQ=', 'base64');
```

The method `buffer.write(string[, offset, [length]], [encoding])` writes `string` to the `buffer` at the given offest according to the character encoding in `encoding`. The `length` parameter is the number of butes to write.

```javascript
const buf = Buffer.alloc(256);

const len = buf.write(`string`, 0);
```

#### What I want to achieve

I want to define a *factory* function `createLazyBuffer(size)` that augments the interface of the core `Buffer` class. As such, the object returned by `createLazyBuffer()` should correctly respond to the instance methods of `Buffer` (`length`, `slice()`, `text()`, `type`...).

| NOTE: |
| :---- |
| Please be aware that it doesn't work 100% well because duck-typing fails in some operations, as the underlying `Buffer` implementation relies on the actual type, for example when copying from one buffer to another. |