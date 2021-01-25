# Part 4: Node.js avanced patterns and techniques
## Chapter 31 &mdash; Asynchronous Control Flow Patterns with Promises and Async/Await
### Example 2: [Returning values from promises](./e02-returning-values-from-promises/)
> Illustrates that a promise can only be fulfilled with a single value. If multiple values are to be returned, you have to return them in an array

In the program it is illustrated how to return several objects using different styles of JavaScript programming:

#### Direct-style
Functions in direct-style can only return a single value, therefore, if you need to return several objects you will need to encapsulate them in an object or array, and destructure them upon reception:

```javascript
function getApplesAndMealsDirectStyle() {
  /* ... */
  return { apples, meals };
}

const { apples, meals } = doSomethingDirectStyle();
```

#### Using callbacks
Callbacks are more flexible in this point, and will let you return several objects if needed:

```javascript
function getApplesAndMealsCallback(cb) {
  /* ... */
  cb(null, apples, meals);
}

getApplesAndMealsCallback((err, apples, meals) => {
  /* apples and meals available in the callback body */
});
```

#### Using promises
Promises follow the same rules as the direct-style functions &mdash; promises have to be fulfilled with a single result.

Note however that you can do the destructuring of the received objects in the function signature:

```javascript
function getApplesAndMealsPromises() {
  return Promise.resolve({ apples, meals });
}

doSomethingPromise()
  .then(({ apples, meals }) => {
    /* apples and meals available in the `then()` body */
  });
```

