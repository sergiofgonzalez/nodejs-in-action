# Part 4: Node.js avanced patterns and techniques
## Chapter 28 &mdash; Node.js' module system in depth 
### Exercise 28.4 &mdash; The fragility of monkey patching in the context of ES modules
> illustrates the fragility of the way in which we mocked the `fs.readFile(...)` function in `mock-read-file.js`

#### Description
Using the same `mock-read-file.js` from [14 &mdash; ESM monkey patching](./14-esm-monkey-patching) it is demonstrated how it might not work depending on how the `fs` module is being imported:
+ It works when importing the *default* exported object from `fs`
+ It fails when importing the named export `readFile`
+ It fails when doing the namespace import of `fs`.

