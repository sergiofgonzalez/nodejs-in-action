# 19-ecmascript6-hello-iterators
> illustrates the basics of ES6 iterators

## Description
The ES6 iterator protocol can be used to turn regular ES6 objects into iterable sequences.

The actions to accomplish that requires that you bind a function to the `Symbol.iterator` property of the object, wich must return a function that adheres to the following protocol:
  + Must return an object with a `next` method
  + The `next` method must return an object with the following two properties:
    + `value` &mdash; return the current element of the iterable object
    + `done` &mdash; boolean value indicating if the end of the iterable object has been reached

```javascript
const sequence = {
  [Symbol.iterator]() {
    const items = ["h", "e", "l", "l", "o", " ", "i", "t", "e", "r", "a", "t", "o", "r"];
    return {
      next: () => ({
        done: items.length === 0,
        value: items.shift()
      })
    };
  }
};
```

Then, you'll be able iterate over the *iterable object* using one of these constructs:
+ `for..of`
+ `[...sequence]`
+ `Array.from`

```javascript
for (let item of sequence) {
  console.log(item);
}

console.log([...sequence]);

console.log(Array.from(sequence));
```