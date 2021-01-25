export class TaskQueuePC {
  constructor (concurrency) {
    this.taskQueue = [];
    this.consumerQueue = [];

    // spawn the consumers
    for (let i = 0; i < concurrency; i++) {
      this.consumer();
    }
  }

  async consumer() {
    /*
      this while (true) does not consume CPU cycles as
      await this.getNextTask() won't be settled until
      there are tasks to process
    */

    // eslint-disable-next-line no-constant-condition
    while (true) {
      try {
        const task = await this.getNextTask();
        await task();
      } catch (err) {
        console.error(err);
      }
    }
  }

  async getNextTask() {
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