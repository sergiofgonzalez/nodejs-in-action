/* eslint-disable no-unused-vars */
import { TaskQueuePC } from './lib/task-queue-pc.js';
import { TaskQueuePC as TaskQueuePCNoAsyncAwait } from './lib/task-queue-pc-no-async-await.js';

let instanceCount = -1;

function getInstanceId() {
  instanceCount++;
  return instanceCount;
}

async function countToFiveTask() {
  async function sleepForSomeTime() {
    return new Promise(resolve => {
      setTimeout(() => resolve(), 10);
    });
  }

  const instanceId = getInstanceId();
  for (let i = 0; i < 5; i++) {
    console.log(`>> task #${ instanceId }: ${ i }`);
    await sleepForSomeTime();
  }
  return instanceId;
}

function spawnUnlimitedParallelCounterTasks(numTasks) {
  for (let i = 0; i < numTasks; i++) {
    countToFiveTask()
      .then(instanceId => console.log(`InstanceID # ${ instanceId } done!`));
  }
}

function spawnLimitedParallelCounterTasksWithPC(numTasks, concurrency) {
  const taskQueue = new TaskQueuePC(concurrency);
  for (let i = 0; i < numTasks; i++) {
    taskQueue.runTask(() => {
      return countToFiveTask()
        .then(instanceId => console.log(`InstanceID #${ instanceId } done!`));
    });
  }
}

function spawnLimitedParallelCounterTasksWithPCNoAsyncAwait(numTasks, concurrency) {
  const taskQueue = new TaskQueuePCNoAsyncAwait(concurrency);
  for (let i = 0; i < numTasks; i++) {
    taskQueue.runTask(() => {
      return countToFiveTask()
        .then(instanceId => console.log(`InstanceID #${ instanceId } done!`));
    });
  }
}

// spawnUnlimitedParallelCounterTasks();
// spawnLimitedParallelCounterTasksWithPC(10, 5);
spawnLimitedParallelCounterTasksWithPCNoAsyncAwait(10e3, 5);
