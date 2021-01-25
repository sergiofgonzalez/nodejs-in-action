import { EventEmitter } from 'events';

export class Queue {

  #eventEmitter = new EventEmitter();
  #queue = [];

  constructor(executor) {
    // need to wire `this` when exposing in the executor
    executor(this.#enqueue.bind(this));
  }

  #enqueue(item) {
    this.#queue.push(item);
    this.#eventEmitter.emit(`enqueue`);
  }

  dequeue() {
    return new Promise((resolve) => {
      if (this.#queue.length > 0) {
        return resolve(this.#queue.shift());
      }
      // Note: spend a lot of time debugging next line because used .on()
      // instead of once, and therefore, it was executed multiple times (🤦‍♂️)
      this.#eventEmitter.once('enqueue', () => resolve(this.dequeue()));
    });
  }
}