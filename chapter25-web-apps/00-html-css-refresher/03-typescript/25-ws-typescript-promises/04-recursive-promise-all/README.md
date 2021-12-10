# 04: Using promises in TypeScript &mdash; Recursive `Promise.all`
> illustrates how to use recursive calls to improve [03: Hello, `Promise.all`](../03-hello-promise-all)

## Exercise 12.2

In this example, we optimize [03: Hello, `Promise.all`](../03-hello-promise-all) with the following capabilities:
+ Improve how we invoke `getValue()` so that we don't have to explicitly call the function 10 times. (HINT: use `Array(numItems).fill(null).map(...)`).
+ Make the function more resilient by retrying the whole process when an error is found. (HINT: wrap the `Promise.all` invocation in a function, and recursively invoke that function in the `catch` handler).

Additionally, we will keep track of the number of times that the process was tried.