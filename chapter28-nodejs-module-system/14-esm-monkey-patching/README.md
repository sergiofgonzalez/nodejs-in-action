# Part 4: Node.js avanced patterns and techniques
## Chapter 28 &mdash; Node.js' module system in depth 
### 14 &mdash; Modifying other modules when using ES modules
> illustrates how to modify other modules when using ES modules

#### Description
In the example, we create an ES module `mock-read-file.js` with two named exports `mockEnable` and `mockDisable` that modify the core `fs.readFile` function. This is possible because `fs` exports an object that we can mutate from our code.

In the main program: `index.js`, we illustrate how this module can be leveraged.

