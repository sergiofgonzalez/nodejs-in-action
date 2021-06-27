import * as _ from 'underscore';
import EventEmitter from 'events';

class Greeter {
  private _subject = 'stranger';
  sayHello() {
    console.log(`Hello to ${ this?._subject }!`);
  }
}

const greeter = new Greeter();
greeter.sayHello();

/* OK: `apply()` lets you patch the function so that it receives a this argument we decide */
greeter.sayHello.apply({ _subject: 'Jason Isaacs' });

/* This will print 'Hello to undefined!': Why JavaScript? */
let sayHelloFn = greeter.sayHello;
sayHelloFn(); // this is pointing to something other than the `this` in `greeter`

/* To fix it, we need to apply the proper `this`... */
sayHelloFn.apply(greeter);

/*
  but this means that we need to constantly pass the `_subject` around!,
  which is not practical.
  Good thing is that `bind()` comes to the rescue!
*/
sayHelloFn = _.bind(greeter.sayHello, greeter);
sayHelloFn();


/*
  Now, we can pass sayHelloFn around and it will always be bound to the
  correct `this`.
*/
setTimeout(sayHelloFn, 500);
setTimeout(function () {
  console.log(`delayed execution`);
  sayHelloFn();
}, 1000);

/*
  Note that underscore is not really needed for this:
*/
sayHelloFn = greeter.sayHello.bind(greeter);
sayHelloFn();
setTimeout(sayHelloFn, 500);
setTimeout(function () {
  console.log(`delayed execution`);
  sayHelloFn();
}, 1000);

/*
  Let's now consider a more contrived situation involving events and listeners
*/

// First let's set up shop with EventEmitters and stuff
console.log(`\n=================================`);
const eventEmitter = new EventEmitter();

eventEmitter.once('greet', (evt) => {
  console.log(`<< 'greet' event received; evt:`, evt);
});

eventEmitter.emit('greet', { name: 'Jason Isaacs' });


// Now the real scenario:
interface IEventContents {
  name: string;
}

class Listener {
  private eventEmitter: EventEmitter;

  constructor(
    eventEmitter: EventEmitter,
    event: string,
    private listenerName: string
  ) {
    this.eventEmitter = eventEmitter;
    this.eventEmitter.on(event, this.eventHandler);
  }

  private eventHandler(evt: IEventContents) {
    console.log(`Listener [${ this.listenerName }] received event:`, evt);
  }
}

const myListener = new Listener(eventEmitter, 'greet', 'myListener');

/*
  This will activate the listener which will display:
    'Listener [undefined] received event: { name: 'Idris Elba' }'
*/
eventEmitter.emit('greet', { name: 'Idris Elba' });

/* This can be fixed by binding the appropriate `this` as eventHandler */
class BetterListenerBind {
  private eventEmitter: EventEmitter;

  constructor(
    eventEmitter: EventEmitter,
    event: string,
    private listenerName: string
  ) {
    this.eventEmitter = eventEmitter;
    this.eventEmitter.on(event, this.eventHandler.bind(this));
  }

  private eventHandler(evt: IEventContents) {
    console.log(`Listener [${ this.listenerName }] received event:`, evt);
  }
}

const myBetterListener = new BetterListenerBind(eventEmitter, 'greet', 'myBetterListener');
eventEmitter.emit('greet', { name: 'Emma Watson' });

/* And also using underscore, although I don't see the point */
class BetterListenerUnderscoreBind {
  private eventEmitter: EventEmitter;

  constructor(
    eventEmitter: EventEmitter,
    event: string,
    private listenerName: string
  ) {
    this.eventEmitter = eventEmitter;
    this.eventEmitter.on(event, _.bind(this.eventHandler, this));
  }

  private eventHandler(evt: IEventContents) {
    console.log(`Listener [${ this.listenerName }] received event:`, evt);
  }
}

const myBetterListenerUnderscoreBind = new BetterListenerUnderscoreBind(eventEmitter, 'greet', 'myBetterListenerUnderscoreBind');
eventEmitter.emit('greet', { name: 'Florence Pugh' });

/* Now, let's understand with _.bindAll() provides */
class BetterListenerUnderscoreBindAll {
  private eventEmitter: EventEmitter;

  constructor(
    eventEmitter: EventEmitter,
    event: string,
    private listenerName: string
  ) {
    this.eventEmitter = eventEmitter;
    _.bindAll(this, 'eventHandler');
    this.eventEmitter.on(event, this.eventHandler);
  }

  private eventHandler(evt: IEventContents) {
    console.log(`Listener [${ this.listenerName }] received event:`, evt);
  }
}

const myBetterListenerUnderscoreBindAll = new BetterListenerUnderscoreBindAll(eventEmitter, 'greet', 'myBetterListenerUnderscoreBindAll');
eventEmitter.emit('greet', { name: 'Daniel Radcliffe' });

/*
  Using _.bindAll():
  + relieves you from taking care of the return value of the function
  + performs some *monkey-patching* on the function
  + good DX, easy to read
*/
