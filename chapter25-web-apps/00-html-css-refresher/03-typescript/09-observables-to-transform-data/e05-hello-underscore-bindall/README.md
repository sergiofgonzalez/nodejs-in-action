# e05: Using *Observables* to transform data &mdash; Hello, `_.bindAll()`
> grokking the need for `_.bindAll()` when binding listeners in *RxJS*

Examples and some written docs inspired from the article [Understanding `bind` and `bindAll` in Backbone.js (https://www.bigbinary.com/blog/understanding-bind-and-bindall-in-backbone) but exercised in the context of Node.js instead of the browser.

## Grokking `_.bindAll()` for event handlers

### Illustrating the problem

Consider the following piece of code that defines a simple class with a method that announces itself and prints some internal property from the class:

```typescript
class Greeter {
  private _subject = 'stranger';
  sayHello() {
    console.log(`Hello to ${ this?._subject }!`);
  }
}

const greeter = new Greeter();
greeter.sayHello(); // -> Hello to stranger!
```

Unsurprisingly, the previous snippet will print `'Hello to stranger!'` as expected.

The value of `_subject` is hardcoded in the class, so if we want to change it, we need to *patch* the function, making it think it is running on a different context.

That can be done easily with `apply()` as seen below:

```typescript
greeter.sayHello.apply({ _subject: 'Jason Isaacs' }); // -> Hello to Jason Isaac!
```

Therefore, `apply()` lets you provide a different `this` to the method, so that when executed uses the supplied value rather than the one from the object.

Let's now consider the following scenario, in which we create a variable that holds a reference to the class' method `sayHello()` and invoke it:

```typescript
let sayHelloFn = greeter.sayHello;
sayHelloFn(); // -> Hello to undefined!
```

The previous snippet prints `'Hello to undefined!'`, because it is executing in a context in which `this` is not what you expect.

In this particular instance, we can fix it with:

```typescript
sayHelloFn.apply(greeter);
```

But, it is not practical to keep a reference to `greeter` so that everytime that you want to invoke the function you inject the proper object.

You can use JavaScript's `bind()` to provide a more practical solution:

```typescript
const sayHelloFn = greeter.sayHello.bind(greeter);
```

Now, every time that you invoke `sayHelloFn()` will produce the expected results, even if you execute it in an inner context asynchronously:

```typescript
sayHelloFn(); // -> Hello to stranger
setTimeout(sayHelloFn, 500); // -> Hello to stranger
setTimeout(() => {
  sayHelloFn(); // -> Hello to stranger
}, 500);
```

In summary:
+ `this` is not what you expect as soon as you take a reference of the function and invoke the class' method through that reference.
+ It can be easily fixed by taking the reference of the function using `bind()` and setting the `this` argument to the proper instance.

### Applying these concepts to a more contrived example

Let's consider now a more realistic scenario involving events and event handlers (listeners).

Let's create an *event emitter* and a class that can be used to listen to certain events triggered by the *emitter*:

```typescript
const eventEmitter = new EventEmitter();

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
```

We instantiate the `eventEmitter`, define an interface for the contents of the *events* and a class that will model the *listeners*.

Note that the event handler `eventHandler()` is *fixed*, and it uses some internal state from the object.

If you test this approach using the following code:

```typescript
const myListener = new Listener(eventEmitter, 'greet', 'myListener');

eventEmitter.emit('greet', { name: 'Idris Elba' }); // -> 'Listener [undefined] received event: { name: 'Idris Elba' }'
```

You'll see that `this` does not point to the object's instance &mdash; it features the same problem we explored in the previous section: it is being executed in a different context.

Fortunately, we now know how to fix it using `bind()`:

```typescript
class Listener {
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

const listener = new Listener(eventEmitter, 'greet', 'myBetterListener');
eventEmitter.emit('greet', { name: 'Emma Watson' }); // -> Listener [myBetterListener] received event: { name: 'Emma Watson' }
```

See how we've fixed it by registering the listener not to `eventHandler()` but rather to the result of *binding* the correct `this` to that method:

```typescript
this.eventEmitter.on(event, this.eventHandler.bind(this));
```

### Better DX with `_.bindAll()`

*Underscore* module includes a method `_.bindAll()` that provides better *developer's experience* in this kind of situations.

`_.bindAll(obj, methodName)` will *patch all instances* of `obj.methodName` so that they execute with the correct context each and everytime:

```typescript
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
```

As you can see the change is minimum, but it provides a better *DX* because the *patching* occurs as a side-effect, so that the registration of the handler happens with the method name:

```typescript
/* we monkey-patch `eventHandler` */
_.bindAll(this, 'eventHandler');

/* once patched, we can use the class' method as-is */
this.eventEmitter.on(event, this.eventHandler);
```
