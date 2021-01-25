export class TaskQueuePC {
  constructor (concurrency) {
    this.taskQueue = [];
    this.consumerQueue = [];

    // spawn the consumers
    for (let i = 0; i < concurrency; i++) {
      this.consumer();
    }
  }

  consumer() {
    this.getNextTask()
      .then(task => {
        return task();
      })
      .then(() => {
        return this.consumer();
      })
      .catch(err => {
        console.error(err);
      });
  }

  getNextTask() {
    return new Promise(resolve => {
      // there are things to do: start processing
      if (this.taskQueue.length !== 0) {
        return resolve(this.taskQueue.shift());
      }
      // this will actually put the consumer to sleep
      this.consumerQueue.push(resolve);
    });
  }

  runTask(task) {
    return new Promise((resolve, reject) => {
      const taskWrapper = () => {
        const taskPromise = task();
        taskPromise.then(resolve, reject);
        return taskPromise;
      };

      if (this.consumerQueue.length !== 0) {
        // there is an available consumers: allocate the task to it
        const consumer = this.consumerQueue.shift();
        consumer(taskWrapper);
      } else {
        // all consumers busy: enqueue the task
        this.taskQueue.push(taskWrapper);
      }
    });
  }
}