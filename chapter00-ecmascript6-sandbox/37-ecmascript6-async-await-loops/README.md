# 37-ecmascript6-async-await-loops
> correctly coding loops that involves async/await

## Description

Illustrates how to correctly code loops that involve async/await expressions.

As weird as it might seem, the following `forEach` loop does not execute the logic in sequence, blocking on every iteration step:

```javascript
  async function processArray(array) {
    const results = [];
    array.forEach(async item => {
      const processedItem = await asyncOperation(item); // this does not block
      results.push(processedItem);
    });
    return results;
  }
```

Also, using an `await processArray(...)` will not help, because promises generated by *forEach* will be thrown away.

If you want to process each of the items asynchronously, but in sequence (i.e. blocking the execution in each iteration step until finished, and then be able to us a final *await* on the result of the function execution) you have to use the `for..of` loop:

```javascript
  async function processArray(array) {
    const results = [];
    for (const item of array) {
      const processedItem = await asyncOperation(item); // using for of results in blocking
      results.push(processedItem);
    }
    return results;
  }
...
  await processArray([1, 2, 3]); // this will block
```

If you're just interested in blocking after the complete loop is completed, but each iteration can be handled asynchronously, you can use the following approach:

```javascript
  async function processArray(array) {
    const promises = array.map(item => asyncOperation(item));  // processing done in parallel
    const results = await Promise.all(promises);
    return results;
  }
...
  await processArray([1, 2, 3]); // this will block until all parallel processing done in the loop is completed
```