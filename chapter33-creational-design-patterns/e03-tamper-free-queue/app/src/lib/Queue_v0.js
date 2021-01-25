import { EventEmitter } from 'events';

export class Queue {
  constructor() {
    this._eventEmitter = new EventEmitter();
    this._queue = [];
  }

  _enqueue(item) {
    this._queue.push(item);
    this._eventEmitter.emit(`enqueue`);
  }

  dequeue() {
    return new Promise((resolve) => {
      if (this._queue.length > 0) {
        return resolve(this._queue.shift());
      }
      // Note: spend a lot of time debugging next line because used .on()
      // instead of once, and therefore, it was executed multiple times (🤦‍♂️)
      this._eventEmitter.once('enqueue', () => resolve(this.dequeue()));
    });
  }
}