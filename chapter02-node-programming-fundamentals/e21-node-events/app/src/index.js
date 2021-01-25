'use strict';

const { EventEmitter } = require('events');
const appEventEmitter = require('./lib/app-event-emitter');
const { createReadStream } = require('fs');
const util = require('util');


/* Simple UC: create EventEmitter and register listener */
const eventEmitter = new EventEmitter();

eventEmitter.on('someEvt', () => console.log(`someEvt has been triggered`));

eventEmitter.emit('someEvt');

/* Only listeners established before event is triggered will be called */
eventEmitter.on('anotherEvt', () => console.log(`listener1`));

eventEmitter.emit('anotherEvt');

eventEmitter.on(`anotherEvt`, () => console.log(`listener2`)); // won't be called

/* Sending additional data in the event */
eventEmitter.on('evt', (arg1, arg2, arg3) => console.log(`arg1: ${ arg1 }; arg2: ${ arg2 }; arg3: ${ util.inspect(arg3) }`));
eventEmitter.emit('evt', 'data1', 55, { greeting: 'Hello to Jason Isaacs '});


/* Listeners for a given event must be registered on the same EventEmitter instance */
const eventEmitter1 = new EventEmitter();
const eventEmitter2 = new EventEmitter();

eventEmitter1.on('yetAnotherEvt', () => console.log(`emitter1.evt`)); // NOOP
eventEmitter2.emit('yetAnotherEvt');

/* app wide event emitter */
appEventEmitter.on('myEvt', () => console.log(`myEvt was triggered (1)`));
appEventEmitter.on('myEvt', () => console.log(`myEvt was triggered (2)`));

appEventEmitter.emit('myEvt');

/* Sync or Async? */
eventEmitter.on('myOtherEvt', data => console.log(data));

console.log('Statement A');
eventEmitter.emit('myOtherEvt', 'Statement B');
console.log('Statement C');

/* Order of Execution */
console.log('============');
eventEmitter.on('evt1', () => console.log('first'));
console.log('Statement A');
eventEmitter.on('evt1', () => console.log('second'));
console.log('Statement B');
eventEmitter.emit('evt1');
console.log('Statement C');

/* Node.js streams leverage events */
console.log('=============');
let chunkIndex = 0;
const readStream = createReadStream('./package-lock.json');

readStream.on('open', () => console.log('Started reading from stream...'));
readStream.on('end', () => console.log('Finished reading from stream...'));
readStream.on('data', chunk => {
  console.log(`Received data chunk #${ chunkIndex++ }`);
  console.log(chunk);
  console.log('~~~~~~~~~~~~~~');
});


/* Node.js process leverage events */
console.log('=============');
process.on('exit', () => console.log(`Application received the exit signal`));
process.on('beforeExit', () => console.log(`Tyding up before exiting...`));
process.on('uncaughtException', () => console.log('Unhandled exception'));

/* once() */
console.log('=============');
eventEmitter.on('evt2', () => console.log(`on evt2`));
eventEmitter.once('evt2', () => console.log(`once evt2`));

eventEmitter.emit('evt2');
eventEmitter.emit('evt2');
eventEmitter.emit('evt2');

/* eventNames */
console.log('=============');
eventEmitter.once('evt3', () => console.log('once: evt3'));
console.log(eventEmitter.eventNames());
eventEmitter.emit('evt3');
console.log(eventEmitter.eventNames());

/* addListener */
console.log('=============');
eventEmitter.addListener('evt4', () => console.log(`evt4`));
eventEmitter.emit('evt4');

/* removeListener */
console.log('=============');

const evt5Listener = () => console.log('evt5 (1)');
function anotherEvt5Listener() {
  console.log(`evt5 (2)`);
}

eventEmitter.on('evt5', evt5Listener);
eventEmitter.on('evt5', anotherEvt5Listener);

eventEmitter.emit('evt5');
eventEmitter.removeListener('evt5', evt5Listener);
eventEmitter.emit('evt5');
eventEmitter.removeListener('evt5', anotherEvt5Listener);
eventEmitter.emit('evt5');

/* removeAllListeners */
console.log('=============');

eventEmitter.on('evt6', () => console.log(`evt6 (1)`));
eventEmitter.on('evt6', () => console.log(`evt6 (2)`));
eventEmitter.emit('evt6');
eventEmitter.removeAllListeners('evt6');
eventEmitter.emit('evt6');

