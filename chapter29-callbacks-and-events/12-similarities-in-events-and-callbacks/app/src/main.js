import { EventEmitter } from 'events';

function helloEvents() {
  const eventEmitter = new EventEmitter();
  setTimeout(() => eventEmitter.emit('complete', 'Hello to Jason Isaacs!', 100));
  return eventEmitter;
}

function helloCallback(cb) {
  setTimeout(() => cb(null, 'Hello to Jason Isaacs!'), 100);
}

helloEvents().on('complete', message => console.log(`using events: ${ message }`));
helloCallback((err, message) => console.log(`using callbacks: ${ message }`));
