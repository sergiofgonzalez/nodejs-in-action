# Part 4: Node.js avanced patterns and techniques
## Chapter 30 &mdash; Async Control Flow Patterns with Callbacks
### Example 4 &mdash; Hello, `TaskQueue`
> A very simple example demonstrating the usage pattern for our `TaskQueue` class. In the example, we use the `TaskQueue` to classify a large number of numbers into even and odd.


#### Solution Notes
The first thing needed to *grok* the *TaskQueue* is the elements that you need to define:
+ A function that represents the *individual task* corresponding to each of the items that should be processed.
+ A function that acts as an *entry point* for the parallel process
+ A *piece of code* that invokes the entry point function

##### The individual task
Starting with the individual task, we define for our stupidly simple example the following function:

```javascript
function classifyNumberTask(num, evenNumbers, oddNumbers, cb) {
  setImmediate(() => {
    if (num % 2 === 0) {
      evenNumbers.push(num);
    } else {
      oddNumbers.push(num);
    }
    cb();
  });
}
```

Note that the task function can be invoked individually without the `TaskQueue`. The callback in this case is only used to notify the caller that the processing has completed. In other scenarios, the callback might be used to provide results to the caller.

| NOTE: |
| :---- |
| The task function in this case is wrapped into a `setImmediate()` function to make it asynchronous. Also, as the logic for identifying a number as even/odd is synchronous, when using `process.nextTick()` we had the undesired side-effect that the `'empty'` event was triggered more than once. |


##### The entry point
The entry point function is the one that *pumps* the tasks into the queue. Typically, the signature of the function will receive an instance of the queue along with some other context information that might be needed to pass along to the individual task.

In our case, it is:

```javascript
function classifyEvenOddNumbers(maxNum, evenNums, oddNums, queue) {
  for (let i = 1; i <= maxNum; i++) {
    queue.pushTask(taskDone => classifyNumberTask(i, evenNums, oddNums, taskDone));
  }
}
```

Note that the entry point function does not accept a callback &mdash; as the processing will be handled in parallel, it does not need a callback to send back the results as you cannot guarantee a certain processing order. This case is simple, but in a general case, the individual task operation might take differently for each item being processed, so you will have to wait until all tasks in the queue has been processed. In other scenarios, for example, when enqueuing HTTP requests, you might not need to return an aggregated result.

Also, when pushing the tasks you are using:

```javascript
queue.pushTask(taskDone => individualTask(arg1, arg2, ..., argN, taskDone));
```

That is, the tasks you push in the queue are functions with signature and convention:

```javascript
function pushableTaskFunction(taskDone) {
  /*
    task logic
  */
 ...
 taskDone(err, data);
}
```

In a general case, our tasks will receive several arguments such as in our `classifyNumberTask(num, evenNumbers, oddNumbers, cb)`, therefore we need to *adapt* the function to the expected signature  using:

```javascript
(taskDone) => {
  /* our custom task function which has different signature */
  individualTask(arg1, arg2, ..., argN, taskDone);
}
```

What we have to ensure is that when the individual task has completed, it invokes the given callback, which our `classifyNumberTask(...)` clearly does:

```javascript
function classifyNumberTask(num, evenNumbers, oddNumbers, cb) {
  setImmediate(() => {
    if (num % 2 === 0) {
      evenNumbers.push(num);
    } else {
      oddNumbers.push(num);
    }
    cb();
  });
}
```

##### Invoking the *entry point* function
Lastly, we need to implement in `main.js` the piece of code that triggers the whole process.

```javascript
const classifyQueue = new TaskQueue(2);
classifyQueue
  .on('error', err => {
    console.error(`ERROR: a classification task failed with ${ err.message }`);
  })
  .on('empty', () => {
    console.log('INFO: completed classification!');
    console.log(`even: ${ util.inspect(evenNums) }`);
    console.log(`odd: ${ util.inspect(oddNums) }`);
  });


const evenNums = [];
const oddNums = [];

classifyEvenOddNumbers(1000, evenNums, oddNums, classifyQueue);
```

There are a few points to consider:
+ As the *entry point* function requires an instance of the queue, this one has to be instantiated in this step.
+ As the tasks will be handled in parallel, and asynchronously, the proper way to get the results (if any), is to register a listener to the `'empty'` event. Other scenarios might require a different approach, but in this case this is the way to obtain it. Defining a callback to the *entry point* will not work here because you can't control which task will be the last one that completes.
+ The context information that must be passed along to the *entry point*, and ultimately to the *individual task* is also instantiated here.
