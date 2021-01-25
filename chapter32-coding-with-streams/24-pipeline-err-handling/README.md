# Part 4: Node.js avanced patterns and techniques
## Chapter 32 &mdash; Coding with streams
### 24 &mdash; Error handling with `pipeline()`
> Illustrates how to perform error handling the `pipeline()` helper function. In the example, a simple app that reads a GZip file from *stdin*, decompresses it, makes all the text uppercase, gzips it back and send it to *stdout* is created.

#### Usage
You can test the happy path by running:

```bash
$ echo 'Hello to Jason Isaacs!' | gzip | node app/src/main.js | gunzip
HELLO TO JASON ISAACS!
```

And you can test how the error is being handled running:

```bash
$ echo 'Hello to Jason Isaacs!' | node app/src/main.js | gunzip
ERROR: incorrect header check
```

| NOTE: |
| :---- |
| The application cannot be tested using `npm start` instead of `node app/src/main.js` with a `gzip: stdin: not in gzip format`. |
