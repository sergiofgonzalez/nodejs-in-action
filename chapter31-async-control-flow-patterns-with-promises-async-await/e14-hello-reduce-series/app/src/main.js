/* eslint-disable no-unused-vars */
/* classic `reduce()` use to perform a summation */

let nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

let result = nums.reduce((accumulator, currentValue, index) => {
  console.log(`Processing element ${ index }; acc=${ accumulator }, curr=${ currentValue }`);
  return accumulator + currentValue;
}, 0);

console.log(`result=${ result }`);

/*
  same without passing an initialValue

  Note that first iteration is skipped, and acc is loaded with the
  first element of the array
*/
nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
result = nums.reduce((accumulator, currentValue, index) => {
  console.log(`Processing element ${ index }; acc=${ accumulator }, curr=${ currentValue }`);
  return accumulator + currentValue;
});

console.log(`result=${ result }`);

/* Now the sequential iteration pattern with Array.reduce */
function countTo(num) {
  async function countToTask(number, delay=1000) {
    async function sleepForSomeTime(delay) {
      return new Promise(resolve => {
        setTimeout(() => resolve(), delay);
      });
    }

    for (let i = 0; i < number; i++) {
      console.log(`>> counting task ${ i + 1 }/${ number }`);
      await sleepForSomeTime(delay);
    }
    return number;
  }

  return countToTask(num)
    .then(() => console.log(`Counting done: ${ num }`))
    .then(() => `done ${ num }`); // to return something
}

const tasks = [ () => countTo(5), () => countTo(6), () => countTo(7) ];


// const reducedPromise = tasks.reduce((prevPromiseResult, currentTask) => {
//   return prevPromiseResult.then(() => {
//     return currentTask();
//   });
// }, Promise.resolve());
// reducedPromise.then(() => console.log(`Sequential iteration completed with Array.reduce()!!!`));



/* Now the sequential iteration pattern with a loop */
function asyncSequentialIterationLoop() {
  let promise = Promise.resolve();
  for (const task of tasks) {
    promise = promise.then(() => task());
  }
  return promise;
}

const resultingPromise = asyncSequentialIterationLoop()
  .then(() => console.log(`Sequential iteration completed with a loop`));
