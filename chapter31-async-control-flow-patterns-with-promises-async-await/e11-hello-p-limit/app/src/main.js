/* eslint-disable no-unused-vars */
import pLimit from 'p-limit';


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

function countToFactory(num) {
  return () => {
    return countToTask(num)
      .then(() => console.log(`Counting done: ${ num }`))
      .then(() => `done ${ num }`);
  };
}

/* running without p-limit */
// const inputTasks = [
//   countToFactory(5)(),
//   countToFactory(6)(),
//   countToFactory(7)(),
// ];
// Promise.all(inputTasks)
//   .then(results => console.log(`all done: `, results));

/* running with p-limit */
const limit = pLimit(1);
const limitInputTasks = [
  limit(() => countToFactory(5)()),
  limit(() => countToFactory(6)()),
  limit(() => countToFactory(7)()),
];
Promise.all(limitInputTasks)
  .then(results => console.log(`all done: `, results));
