/* eslint-disable no-unused-vars */
export class Thenable {
  then(onFulfilled, onRejected) {
    return new Promise(resolve => {
      onFulfilled(resolve);
    });
  }
}

/* usage:
const myThenable = new Thenable().then(onFulfilled => {
  return onFulfilled(Math.random());
});

myThenable.then(console.log);
*/