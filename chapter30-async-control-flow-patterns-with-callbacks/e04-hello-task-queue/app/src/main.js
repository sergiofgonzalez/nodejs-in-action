import { TaskQueue } from './lib/task-queue.js';
import util from 'util';

util.inspect.defaultOptions.breakLength = Infinity;

function classifyEvenOddNumbers(maxNum, evenNums, oddNums, queue) {
  for (let i = 1; i <= maxNum; i++) {
    queue.pushTask(taskDone => classifyNumberTask(i, evenNums, oddNums, taskDone));
  }
}

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
