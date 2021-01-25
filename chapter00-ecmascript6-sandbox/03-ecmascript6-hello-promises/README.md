# 03-ecmascript6-hello-promises
> promises in Node.js

## Description
The most simple examples of promises in Node.js. 

### Example 1: Creating Promises using Promise(resolveFn, rejectFn) constructor
In the example, a synchronous promise is created that is fulfilled if a random number between 0 and 1 is less than 0.5, or fails otherwise. 
The syntax for using `then(onSuccess, onReject)` and the alternative `then(onSuccess).catch(onFail)` are used, both with named functions and arrow function syntax.

### Example 2: Promise.resolve and Promise.reject static methods
Illustrates the use of `Promise.resolve` and `Promise.reject` to create promises that are immediately resolved or rejected.

### Example 3: Promises tree-like structures 101
Illustrates the basics of tree-like structures that are created whenever you start using Promises, and how reactions can be bound to Promises outcome (both for resolving and rejecting).
