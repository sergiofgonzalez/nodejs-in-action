# Part 4: Node.js avanced patterns and techniques
## Chapter 28 &mdash; Node.js' module system in depth 
### 11 &mdash; Hello, dynamic import
> introducing async imports (also called dynamic imports)

#### Description
The example illustrates how to use *async imports*, an advanced functionality of *ES modules* that allows to asynchronously load a module on demand.

In the example, several `hello-*.js` modules are defined with a string identifying how *hello world* is written in several languages. Then, the main program reads the first argument given to the program and dynamically loads the associated module `hello-<arg>.js`.

In order to test it, you can do:
```bash
$ npm run en
Hello world

$ npm run es
Hola mundo
```