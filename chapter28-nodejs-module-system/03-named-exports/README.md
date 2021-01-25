# Part 4: Node.js avanced patterns and techniques
## Chapter 28 &mdash; Node.js' module system in depth 
### 03 &mdash; Named exports
> illustrates the **named exports** pattern for module definition on which you add properties to the object referenced by `exports` (or directly to `module.exports`) to expose the public API of the module.

#### Description
In the module, a simplistic logger module is defined in which functions for logging `info` and `verbose` messages are given.