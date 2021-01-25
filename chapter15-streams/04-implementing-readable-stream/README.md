# 04-implementing-readable-stream
> illustrating how to implement a readable stream

## Description
This example illustrates how to implement a custom readable stream that is capable of parsing a file of JSON lines:
```javascript
{ "name": "Jason Isaacs", "age": 43 }
{ "name": "Ahmed Riz", "age": 9 }
{ "name": "Idris Elba", "age": 47 }
...
```

That file is not a valid JSON file, and therefore cannot be sent to JSON.parse. Also, the file can get really large, so streams should be used for efficient processing.

In order to implement the readable stream you have to:
+ Create a class `JSONLineReader` which extends from `stream.Readable`
  + In the constructor, add an event listener on the `"readable"` event that invokes the `stream.Readable.read()` method.
  + Implement the `_read()` method, which will be called when there is input available. In this method:
    + use `read()` to obtain the next chunk of data.
    + use `push()` to make data available to the underlying stream once processed

+ Instantiate a `JSONLineReader` passing it a `ReadStream` obtained by invoking `fs.createReadStream`.

Note that this is just an example, you might need to implement a more robust `_read()` implementation.