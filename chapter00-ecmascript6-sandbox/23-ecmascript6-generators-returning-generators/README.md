# 23-ecmascript6-generators-returning-generators
> generator functions yielding generators and other iterable objects

## Description
The ES6 generator functions can use `yield*` to delegate to a generator object or any other iterable object.

For example, as strings adhere to the iterator protocol you can do:
```javascript
function* greetMe(yourName = "sergio") {
  yield* "Hello to";
  yield* yourName;
}
```

And you can also `yield*` a custom iterable object:
```javascript
const salute = {
  [Symbol.iterator]() {
    const items = ["h", "e", "l", "l", "o", " ", "t", "o", " "];
    return {
      next: () => ({
        done: items.length === 0,
        value: items.shift()
      })
    };
  }
};

function* genSquare() {
  yield* salute;
  yield* "Jason Isaacs";
}
```
