# Part 4: Node.js avanced patterns and techniques
## Chapter 29 &mdash; Callbacks and Events
### 04 &mdash; An inconsistent function
> illustrates the kind of issues you might find when having a function that has an inconsistent implementation and behaves synchronously or asynchronously depending on the circumstance

#### Description

In the example, we define a function `inconsistentRead(...)` that behaves synchronously or asynchronously dependending on whether it has already seen the file to read.

Then, we create another function `createFileReader(...)` that allows the registration of handlers that will be activated when the file has been read. In order to do so, the function returns an object with a function `onDataRead(listener)`, so that the usage will be:

```javascript
const reader = createFileReader(filename);
reader.onDataRead(fileContents => { /* do something with contents */ });
```

The program demonstrates that the program does not behave as expected because of the inconsistent sync/async behavior of `inconsistentRead()` function.
