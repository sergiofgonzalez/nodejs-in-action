# Part 4: Node.js avanced patterns and techniques
## Chapter 32 &mdash; Coding with streams
### 28 &mdash; Limited ordered parallel execution with streams
> Illustrates how to perform a limited ordered parallel execution with streams using the NPM package [parallel-transform](https://www.npmjs.com/package/parallel-transform). In the example, we leverage that module to build a program that checks that a set of URLs found in a file are up.

Somehow, the results are not ordered!