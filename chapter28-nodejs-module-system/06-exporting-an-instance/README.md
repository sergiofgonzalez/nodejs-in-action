# Part 4: Node.js avanced patterns and techniques
## Chapter 28 &mdash; Node.js' module system in depth 
### 06 &mdash; Exporting an instance
> leveraging `require(...)` cache to export a stateful instance that can be shared across different modules

#### Description
In the example, a simplistic logger class is defined, and an instance of the class is exported. In the main program, we see how this instance can be used.

It also demonstrate how new instances can be created even when not explicitly exporting the class.
