# e01-dice-experiment-infinite-sequences
> throwing a dice a variable number of times using infinite iterators

## Description
Illustrate the use of the ES6 iterator protocol when working with infinite sequences.

In the example, we model throwing a variable number of dice with an infinite iterator. In the experiment the result of throwing the dice is accumulated in an object, and the result is then printed in the console.

The most interesting part is the definition of the dice, which implements the iterable protocol.
```javascript
const dice = {
  [Symbol.iterator]: () => ({
    next: () => ({
      done: false,
      value: Math.floor(Math.random() * 6 + 1)
    })
  })
};
```

In order to obtain values from the infinite sequence you cannot use `for..of` or `Array.from` sequences as it will retrieve the results indefinitely, so it has to use this construct:
```javascript
let [currentOneDice] = dice;
```