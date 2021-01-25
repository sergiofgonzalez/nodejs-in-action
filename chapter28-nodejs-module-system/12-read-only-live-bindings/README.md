# Part 4: Node.js avanced patterns and techniques
## Chapter 28 &mdash; Node.js' module system in depth 
### 12 &mdash; Read-only live bindings in ES Modules
> illustrating the concept of *read-only live bindings* in ES modules

#### Description
The example defines an ES module `counter` which exports a primitive variable `counter` and a function to increment it `increment()`.

While the consumer module can read the value of `counter` and increment its value using `increment`, when it tries to reassign the value of `counter` it gets a `TypeError` that even *ESlint* can spot as if it was trying to reassign a const value.

This is because *ES modules* does not allow to change the binding of an exported value unless the change is performed within the scope of the original module itself.

This is different from what happens with *CommonJS* as can be seen in [e02 &mdash; CommonJS does not have read-only live bindings](../e02-commonjs-no-read-only-live-bindings/)