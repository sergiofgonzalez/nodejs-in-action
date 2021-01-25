# e21 &mdash; Node Event Emitters
> Practising Node.js Event Emitters

## Description
`EventEmitter` is a class that helps us implement publish-subscribe pattern in Node.js.

An `EventEmitter` is created using an instance of this class:

```javascript
const { EventEmitter } = require('events');
const eventEmitter = new EventEmitter();
```

To publish an event, we use the `emit()` function and to listen to an event, we use the `on()` function. Events are published and listened to by name:

```javascript
// listen to the event
eventEmitter.on(`someEvent`, () => console.log(`someEvent was triggered`));

// trigger an event
eventEmitter.emit(`someEvent`);
```

| NOTE: |
| :---- |
| At the time of publishing the event, all pre-existing *event listeners* will be called. A listener established to listen to that event after the event has been triggered will not receive the event. |

In order for a listener to be called for a given event, the event has to be triggered from the same `EventEmitter` used to register the lister. In other words, the listeners won't work if established on a separate `EventEmitter` instance, even if listening to the same event:

```javascript
const eventEmitter1 = new EventEmitter();
const eventEmitter2 = new EventEmitter();

eventEmitter1.on('yetAnotherEvt', () => console.log(`emitter1.evt`)); // NOOP
eventEmitter2.emit('yetAnotherEvt');
```

This simple fact might become difficult to handle in large applications. This can be solved by wrapping the `EventEmitter` on a module so that anyone can grab the same singleton instance from it.

Consider the following piece of code:

```javascript
eventEmitter.on('myOtherEvt', data => console.log(data));

console.log('Statement A');
eventEmitter.emit('myOtherEvt', 'Statement B');
console.log('Statement C');
```

The result of executing the previous piece of code will be:
```
Statement A
Statement B
Statement C
```

which means that listeners are executed synchronously in the current event loop's iteration.

Listeners are executed in the order on which they are established. For example, the following piece of code:

```javascript
eventEmitter.on('evt', () => console.log('first'));
console.log('Statement A');
eventEmitter.on('evt', () => console.log('second'));
console.log('Statement B');
eventEmitter.emit('evt');
console.log('Statement C');
```

will print:

```
Statement A
Statement B
first
second
Statement C
```

Node.js uses internally events in many areas such as streams and processes. Streams emit `open`, `end` and `data` events that allow your application to respond and act upon receiving such events. The `process` object also exposes events such as `exit`, `beforeExit` and `uncaughtException`.

Data can be passed from an `eventEmitter` instance to the listener as additional arguments to `emit`:

```javascript
eventEmitter.on('evt', (arg1, arg2, arg3) => console.log(arg1, arg2, arg3));
eventEmitter.emit('evt', 'data1', 55, { greeting: 'Hello to Jason Isaacs '});
```


### Notable Members of the `EventEmitter` Class

#### `on()`

The `on()` method lets you register a listener function that will be activated every time that an event is triggered.

```javascript
eventEmitter.on('evt', () => console.log(`on evt`));
```

#### `emit()`

The `emit()` method lets you trigger an event.

```javascript
eventEmitter.emit('evt');
```

#### `once()`

The `once()` method lets us register a listener that will be discarded after listening for an event, that is, the listener will be triggered only once.

```javascript
eventEmitter.once('evt', () => console.log(`once evt`));
```

#### `eventNames()`

Gets all the active eventNames. That is, it returns an array with all the event names for which listeners are established. For example, events registered with `once` that has been triggered will not show up.

```javascript
eventEmitter.eventNames();
```

#### `addListener()`

An alias for `on()`:
```javascript
eventEmitter.addListener('evt', () => console.log(`evt`));
```

#### `removeListener()`

*Unregisters* an existing listener, so that it will no longer be activated if the event is triggered.

```javascript
const evtListener = () => console.log('evt (1)');
function namedEvtListener() {
  console.log(`evt (2)`);
}

eventEmitter.on('evt', evtListener);
eventEmitter.on('evt', namedEvtListener);

eventEmitter.emit('evt');
eventEmitter.removeListener('evt', evtListener);
eventEmitter.emit('evt');
eventEmitter.removeListener('evt', namedEvtListener);
```

#### `removeAllListeners()`

Removes all active listeners for a given event.

```javascript
eventEmitter.on('evt', () => console.log(`evt (1)`));
eventEmitter.on('evt', () => console.log(`evt (2)`));
eventEmitter.emit('evt');
eventEmitter.removeAllListeners('evt');
```