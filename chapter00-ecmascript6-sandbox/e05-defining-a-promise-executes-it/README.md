# e05-defining-a-promise-executes-it
> A simple example to understand some of the `Promise` behavior

## Description

Illustrates that defining a promise as in:
```javascript
new Promise(resolve => {
  console.log("Inside the promise logic for p1");
  resolve("OK");
});
```

makes the code inside the `Promise` body to be executed immediately.

Even when doing:

```javascript
const p1 = new Promise(resolve => {
  console.log("Inside the promise logic for p1");
  resolve("OK");
});

const p2 = new Promise(resolve => {
  console.log("Inside the promise logic for p2");
  resolve("OK");
});

p2.then(() => p1);  // I would expect p2 to be executed before p1
```

the message for p1 will be executed before the code for p2.

Therefore, if we wanted to serialize the execution your only chance is to define the code you want to orchestrate in functions:
```javascript
function task1() {
  return Promise.resolve(console.log("task1"));
}

function task2() {
  return Promise.resolve(console.log("task2"));
}

task2().then(() => task1()); // task2, task1
```

Articles such as https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise explain this in detail:
Several other languages have mechanisms for lazy evaluation and deferring computation which they also call *"promises"*. In JavaScript *Promises* represent processes which are already happening, which can be chained with callback functions.

The `Promise` constructor function is as follows:
```javascript
new Promise((resolve, reject) => { /* executor */ });
```

The executor function is executed **immediately** by the `Promise` implementation.