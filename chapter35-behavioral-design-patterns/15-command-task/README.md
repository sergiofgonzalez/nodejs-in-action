# Part 4: Node.js avanced patterns and techniques
## Chapter 35 &mdash; Behavioral design patterns
### 15 &mdash; *Command Pattern*: simple Task
> Illustrates the easiest and most basic implementation of the *Command* pattern consisting in creating an object that represents an invocation with a *closure* or using `Function.prototype.bind(...)`.

#### Notes on `bind()`
The `bind()` function creates a new function that, when called, has its `this` keyword set to the provided value and with a given sequence of arguments given.