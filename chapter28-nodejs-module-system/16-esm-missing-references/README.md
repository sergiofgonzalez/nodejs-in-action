# Part 4: Node.js avanced patterns and techniques
## Chapter 28 &mdash; Node.js' module system in depth 
### 16 &mdash; Reconstructing missing references in *ES modules*
> illustrates how you can reconstruct some missing references available in *CommonJS* in the context of *ES modules*

#### Description
In *ES modules* some important references like `__filename`, `__dirname` and `require()` are not available. This project illustrates how they can be reconstructed using the special object `import.meta`.
