# You don't Know JavaScript &mdash; 01: Get Started
## 42 &mdash; ES6 Iterators
> A refresher on ES iterators, iterables and the spread operator `...` to consume iterators

### ES6 Iterators and Iterables
The ES6 pattern defined a `next()` method that returns an object called an *iterator result*. This object features a `value` and `done` properties. The `done` property will be `false` until the iteration over the underlying data source is complete.

The iterator-consumption protocol is technically defined for consuming iterables (values that can be iterated over). The ES6 iterator protocol automatically creates an iterator instance from an iterable, and consumes that iterator instance to its completion.

ES6 defined as iterables strings, arrays, maps, sets (among others).

You can consume an iterator using a `for...of` loop. Alternatively, you can use the `...` operator that has two symetrical forms: *spread* and *rest* (or gather). The spread form lets you consume an iterator by consuming it into either an array or a function call.

```javascript
let values = [...it];

doSomething(...it);
```

## You don't know JS Examples
All the examples in this section are taken from https://github.com/getify/You-Dont-Know-JS.
Especifically, this example is based on [Iteration](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/get-started/ch3.md#iteration).

