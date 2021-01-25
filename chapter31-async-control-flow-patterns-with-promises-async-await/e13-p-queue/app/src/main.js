/* eslint-disable no-unused-vars */
import pq from 'p-queue';
const PQueue = pq.default;


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

const taskQueue = new PQueue({ concurrency: 1});

taskQueue.add(() => countTo(5))
  .then(console.log);

taskQueue.add(() => countTo(6))
  .then(console.log);

taskQueue.add(() => countTo(7))
  .then(console.log);