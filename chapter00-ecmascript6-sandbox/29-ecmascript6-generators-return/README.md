# 29-ecmascript6-generators-return
> explicitly returning from a generator

## Description
Illustrates the effects of calling `g.return()` from a generator in different scenarios.

### Calling g.return() on a generated sequence
Calling `g.return()` will immediately terminate the generated sequence:

```javascript
function* numbers() {
  yield 1;
  yield 2;
  yield 3;
}

let g = numbers();

console.log(g.next());    // <- 1, done = false
console.log(g.return());  // <- done = true
console.log(g.next());    // <- done = true
```

### Preventing the termination of the generated sequence with try-finally
As `g.return(value)` triggers the return at the location of yield, you can prevent termination of the generated sequence by including a finally block in the generator function.

```javascript
function* numbers() {
  try {
    yield 1;
    yield 2;
    yield 3;
  } finally {
    yield -1;
    yield -2;
  }
  yield 10;
  yield 11;
}

g = numbers();
console.log(g.next());            // -> 1
console.log(g.return(-12345));    // -> -1
console.log(g.next());            // -> -2
console.log(g.next());            // -> -12345
console.log(g.next());            // done!
console.log(g.next());            // done!
```

### Using return within a generator function code
You can `return` from a generator function. When doing so, the returned value will be returned with `done: true` and therefore will not be picked up the *spread* operator or `Array.from`.

```javascript
function* numbers() {
  yield 1;
  yield 2;
  return 3;
  yield 4;    // unreachable code
}

g = numbersExplicitReturn();
console.log(g.next());            // -> 1, done: false
console.log(g.next());            // -> 2, done: false
console.log(g.next());            // -> 3, done: true! (a regular yield would've produced 3, done: false)
console.log(g.next());            // done!
console.log(g.next());            // done!
```

