# Part 4: Node.js avanced patterns and techniques
## Chapter 28 &mdash; Node.js' module system in depth 
### 18 &mdash; *ES modules* and *CommonJS* interoperability (alt)
> illustrates the different ways in which you can work with *CommonJS* modules in the context of *ESM*, in this case without setting `"type": "module"`.

#### Description
In the example, it is demonstrated how you can *import* an existing *CommonJS* modules in a project without using `"type": "module",`.

This is a much flexible option, especially when you don't have own the modules you're requiring as there is no need to change the *CommonJS* modules extensions.