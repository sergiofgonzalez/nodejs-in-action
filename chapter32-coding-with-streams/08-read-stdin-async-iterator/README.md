# Part 4: Node.js avanced patterns and techniques
## Chapter 32 &mdash; Coding with streams
### 08 &mdash; Reading from stdin as a stream as async iterators
> illustrates how to read from a `Readable` stream using the async iterator pattern. This lets you consume an entire *readable stream* using promises.

#### Usage
Run `npm start` and start typing characters. Use 'ENTER' to make the recently typed data available to the stream as a data chunk (i.e. 'ENTER' will trigger a `'readable'` event).

Use 'CTRL+D' to send an `EOF` to the stream and therefore terminate the program gracefully (i.e. 'CTRL+D' will trigger an '`end`').

You can also pipe to this program the content of another file doing:

```bash
$ cat <file> | npm start
```

For example:
```bash
$ cat README.md | npm start
```

