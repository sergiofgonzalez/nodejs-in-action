# 25-ecmascript6-generators-passing-params
> passing arguments to generator functions

## Description
Generators are functions which can be exited and later re-entered, while their context is saved across re-entrances.
We've seen that calling a generator function does not execute its body immediately, but rather, an iterator is returned (we typically used *g* to reference that returned sequence).

Then, when the iterator's `next()` method is called, the function body is executed until the first `yield` expression, which specifies the value to be returned from the iterator.

Calling the `next()` method with an argument will resume the generator function execution, replacing the yield statement where execution was paused with the arguments from `next()`.

```javascript
function* printThreeMessages() {
  console.log(yield);
  console.log(yield);
  console.log(yield);
}

const g = printThreeMessages(); /
g.next("zero");  // <- nothing will be displayed (bootstrapping call)
g.next("one");   // <- one
g.next("two");   // <- two
g.next("three"); // <- three
g.next("four");  // <- generator done, nothing will be displayed
g.next("five");  // <- generator done, nothing will be displayed
```

Note that this is different from passing arguments to the generator function:
```javascript
function* echo(name) {
  yield name;
}

const g  = echo("Phil Dunphy");
g.next().value // <- Phil Dunphy
```