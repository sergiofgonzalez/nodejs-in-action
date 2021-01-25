# Part 4: Node.js avanced patterns and techniques
## Chapter 28 &mdash; Node.js' module system in depth 
### e02 &mdash; CommonJS does not have read-only live bindings
> demonstrates that *CommonJS* does not have read-only live bindings as *ES modules* do

#### Description
The example illustrates one essential difference between *CommonJS* and *ES modules* related to the management of bindings to exported variables.

While *ES modules* maintain a live binding with the exported variables, *CommonJS* provides a copy of the exported entities to the requiring module. As a consequence, when a variable is updated within the scope of the module that exports the variable, the requiring modules are not aware of the change.