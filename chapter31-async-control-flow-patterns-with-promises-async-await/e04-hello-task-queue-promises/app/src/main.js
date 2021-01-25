import { TaskQueue } from './lib/task-queue.js';


function classifyEvenOddNumbers(maxNum, concurrency = 2) {
  const queue = new TaskQueue(concurrency);
  const evenNumbers = [];
  const oddNumbers = [];
  const promises = [];
  for (let i = 1; i <= maxNum; i++) {
    const p = queue.runTask(() => classifyNumberTask(i, evenNumbers, oddNumbers));
    promises.push(p);
  }
  return Promise.allSettled(promises)
    .then(() => {
      return { evenNumbers, oddNumbers };
    });
}

function classifyNumberTask(num, evenNumbers, oddNumbers) {
  return new Promise(resolve => {
    setImmediate(() => {
      if (num % 2 === 0) {
        evenNumbers.push(num);
      } else {
        oddNumbers.push(num);
      }
      resolve();
    });
  });
}


classifyEvenOddNumbers(100, 3)
  .then(({ evenNumbers, oddNumbers }) => {
    console.log(`INFO: completed classification!`);
    console.log(`even: `, evenNumbers);
    console.log(`odd: `, oddNumbers);
  });
