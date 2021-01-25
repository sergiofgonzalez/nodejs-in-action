# Part 4: Node.js avanced patterns and techniques
## Chapter 31 &mdash; Asynchronous Control Flow Patterns with Promises and Async/Await
### Exercise 14: [Hello, reduce for sequential iteration](e14-hello-reduce-series)
Illustrates the how to use `Array.reduce()` as a simpler, alternative implementation of the sequential iteration pattern.


#### Solution
According to [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce), the `reduce()` method executes a **reducer** function that you provide on each element of the array, resulting in a single output value.

The signature of the function is as follows:

```javascript
arr.reduce(callback(accumulator, currentValue, [, index[, array ]])[, initialValue])
```

and the invocation will return the single value that results from the reduction.

where:

| argument | description |
| :------- | :---------- |
| `callback` | a function to execute on each element in the array, (except for the first, if no `initialValue` is supplied). The function takes up to four arguments (see below). |
| `accumulator` | the first argument to `callback`, which accumulates the callback's return values. It will hold the accumulated value previously returned in the last invocation of the callback or `initialValue`, if it was supplied. |
| `currentValue` | the second argument to `callback`, which will hold the current element being processed in the array. |
| `index` (optional) | the third argument to `callback`, which will hold the index of the current element being processed in the array, starting from `0` if `initialValue` is provided or from `1` otherwise. |
| `array` (optional) | the fourth argument to `callback` which contains the array `reduce()` was called upon. |
| `initialValue` | a value to use as the first argument to the first call of the `callback`. If no `initialValue` is supplied, the first element in the array will be used as the initial `accumulator` value and skipped as `currentValue`. Calling `reduce()` on an empty array without an `initialValue` will throw a `TypeError`. |

In the example, we create a few simple examples of `Array.reduce()` and then jump to compare the loop-based and *reduce* based implementations of the sequential iteration pattern.