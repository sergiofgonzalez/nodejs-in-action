# 03-hello-stream-error-handling
> introducing error handling with streams

## Description
This example illustrates how to manage error handling with streams. Ultimately, you just listen to the `"error"` event on the stream:

```javascript
const stream = fs.createReadStream(...);

stream.on("error", err => {
  ... // error handling
});
```

Note that Node.js includes a default handler for non-handled error events that include printing the stack trace and exiting the program.