# 22-ecmascript6-hello-generators
> basic generator functions and how to use them

## Description
The ES6 generator functions are an alternative way of creating functions that return an iterable object, without the need of explicitly declaring an object literal with a `Symbol.iterator` method.

You can declare a generator function using the following syntax:
```javascript
function* chars() {
  yield "a";
  yield "b";
  yield "c";
}
```

Instead of `next` method that returns an object containing a `done` and `value` properties, *generator functions* use the `yield` keyword to add values to into the sequence.

Once defined, elements from the sequence returned by the generator function can be iterated using `for..of`, `Array.from` or using the spread `[...g]` operator.

```javascript
Array.from(chars());

for (let c of chars()) {
  console.log(`c=${ c }`);
}

[...chars()];
```

It's important to note that generator functions can also trigger side-effects:
```javascript
function* chars() {
  console.log("yielding a");
  yield "a";
  console.log("yielding b");  
  yield "b";
  console.log("yielding c");  
  yield "c";
}
```

Note that, in a way, a generator function is a type of iterator that can suspend execution while retaining their context. However, that metaphor, is not always useful, and sometimes it's better to think of a generator function simply as a function that builds a sequence, with yield being the building block that lets you build it.