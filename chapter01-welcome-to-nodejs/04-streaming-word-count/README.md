# 04-streaming-word-count
> Counting the occurrences of a *regex* on a website using Node.js streams

## Description
Simple example that demonstrates how to use Node.js streams to count the occurrences of a *regex* (it can be a simple word) using Node.js streams.

In the example, we define a module `countstream` as a Node.js class that extends from `Writable` to be able to behave as a *writable stream* and also keep track of the text that it has to look for, and the number of occurrences that it has already detected.
This module also overrides the `_write` method of the `Writable` object to compute the matches in the recently received chunk.
Finally, the module also overrides the `end` method, which is called when the input has been exhausted, to emit the custom event `total` and notify subscribers of the total number of hits found.

The example features a very simple main program that instantiate a `CountStream` object and looks for occurrences of some text on a given HTTPS url. Instead of retrieving the whole web page before computing the count, the example uses piping to send the information in chunks to the `countStream` object:
```javascript
https.get("https://www.manning.com", res => {
  res.pipe(countStream);
});
```

Then, the main program registers a listener on the `"total"` event to display the number of total matches once completed.


**NOTE**
The project uses the `debug` module to show enhanced debugging information when needed. The `package.json` enables this debugging info by default, prefixing the execution of the program with a `DEBUG` environment variable set to `DEBUG=countstream`. This can be tailored as needed, or disabled to prevent showing debugging info.

### Tests
The project includes some basic tests using several different frameworks:
+ Native Node.js testing using `assert` &mdash; the test looks like a regular Node.js program in which assertions are inserted.
+ Testing using the `tap` module &mdash; a Node.js framework that is picking some traction thanks to the reduced set of dependencies, support for coverage, etc.