# 02: Using promises in TypeScript &mdash; Using `then` and `catch` to solve the callback hell
> illustrates how to create a promise from scratch using `new` in TypeScript

### Exercise 12.1

As the starter point for the exercise, write a function:

```typescript
function getValue(val: number, cb: Function) { ... }
```

That receives a number, generates a random number between 0 and 99, adds it to the number it receives, and then invokes the received callback with the result after a delay of 1 second.

Then, generate a sequence of 10 recursive calls to the function, so that the callback of the first invocation consists in invoking the `getValue()` with the result of the function.

Then rewrite the `getValue()` function using promises and chain 10 recursive calls using `then()` to illustrate how the callback hell disappears.