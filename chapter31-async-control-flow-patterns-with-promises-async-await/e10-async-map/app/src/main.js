/* eslint-disable no-unused-vars */

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


async function mapAsync(iterable, callback, concurrency = Infinity) {
  async function spawnWorker() {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const task = await getNextTask();
      await task();
    }
  }

  async function getNextTask() {
    return new Promise((resolve, reject) => {
      if (tasks.length !== 0) {
        return resolve(tasks.shift());
      }
      workers.push(resolve);
    });
  }

  function runTask(task) {
    return new Promise((resolve, reject) => {
      const taskWrapper = () => {
        const taskPromise = task();
        taskPromise.then(resolve, reject);
        return taskPromise;
      };
      if (workers.length  !== 0) {
        const worker = workers.shift();
        worker(taskWrapper);
      } else {
        tasks.push(taskWrapper);
      }
    });
  }

  if (concurrency === Infinity) {
    const promises = iterable.map(iterItem => callback(iterItem));
    return await Promise.all(promises);
  }

  const workers = [];
  const tasks = [];
  for (let i = 0; i < concurrency; i++) {
    spawnWorker();
  }

  const results = iterable.map(iterItem => runTask(() => callback(iterItem)));
  return await Promise.all(results);
}


mapAsync([5, 6, 7], countTo, 2)
  .then(results => {
    console.log(`Async iteration completed!`);
    console.log(`results = ${ results }`);
  });