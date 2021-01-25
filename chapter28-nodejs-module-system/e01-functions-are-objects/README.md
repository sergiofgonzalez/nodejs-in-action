# Part 4: Node.js avanced patterns and techniques
## Chapter 28 &mdash; Node.js' module system in depth 
### e01 &mdash; Functions are objects
> the **substack** pattern leverages the fact that functions are objects in JavaScript and therefore can hold other functions and properties.

#### Description
In the example, it is illustrated in a very simple way how in JavaScript you can add functions and other properties to functions. This fact is heavily used in many Node.js modules and in particular in the **substack** pattern used to export a primary function by assigning it to `module.exports` and then secondary functions are defined as properties of the exported function. 