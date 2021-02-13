# Part 4: Node.js avanced patterns and techniques
## Chapter 35 &mdash; Behavioral Design Patterns
> Design patterns that deal with how to combine objects and how to define the way they communicate so that the behavior of the resulting structure is extensible, modular, reusable, and adaptable.

### Contents
+ Introduce the set of traditional design patterns that deal with the behavior of components: combining them to define the way they comminicate so that the behavior of the resulting structure becomes extensible, modular, reusable, and adaptable.
+ The **Strategy** pattern &mdash; change parts of a component to adapt it to specific needs.
+ The **State** pattern &mdash; change the behavior of a component based on its state.
+ The **Template** pattern &mdash; reuse the structure of a component to define new ones.
+ The **Iterator** pattern &mdash; provides a common interface to iterate over a collection.
+ The **Middleware** pattern &mdash; define a modular chain of processing steps.
+ The **Command** pattern &mdash; materializes the information required to execute a routine, allowing such information to be easily transferred, stored, and processed.

### Strategy

> The **Strategy** pattern enables an object, called the **context**, to support variations in its logic by extracting the *variable* parts into separate, *interchangeable* objects called **strategies**.

The *context* implements the common logic of a family of algorithms, while a *strategy* implements the mutable parts, allowing the *context* to adapt its behavior depending on different factors, such as an input value, a system configuration, or user preferences.

*Strategies* are usually a part of a family of solutions, and all of them implement the same interface expected by the context:

![Strategy](images/strategy.png)

You can think of a strategy as a replaceable part of a piece of machinery, such as the tyres of a car, which can be easily changed to make the car adaptable to different road conditions.

The *Strategy* pattern let us separate the concerns within a given problem, and enables the solution to have better flexibility to adapt to different variations of the same high-level problem.

The *Strategy* pattern should be used when supporting variations of the behavior involve complex conditional logic, or mixing completely different components of the same family.

Imagine an e-commerce application that provides an `Order` class that represents and online order. It exposes a method `pay()` that finalizes the order and transfer the funds from the end-user to the online store. As the application has to support different payment systems we can:
+ Use an *if..else* statement in the `pay()` method to complete the operation based on the chose payment option.
+ Delegate the logic of the payment to a *strategy* object that implements the logic for the specific payment gateway selected by the user.

Obviously, the second option if far superior as it enables the `Order` object to support a virtually unlimited number of payment methods, and keeps its scope limited to only managing the details of the user, the purchased items, and the price, while delegating the complex task of the payment to another object. By contrast, the first option will require a lot of *if..else* statements, and the code will become unmanageable as the number of payment options grow.

#### Example: Multi-format configuration objects
Let's consider an object called `Config` that holds a set of configuration parameters used by an application. The `Config` object should provide a simple interface to access these parameters, but also a way to import and export the configuration using persistent storage, such as a file. Also, we want to be able to support different formats to store the configuration such as JSON, INI or YAML.

This is a good fit for the *Strategy* pattern: while the part of serializing and deserializing the configuration parameters will change, the part that involves accessing the configuration parameters will stay the same.

```javascript
import { promises as fs } from 'fs';
import objectPath from 'object-path';

export class Config {
  constructor(formatStrategy) {
    this.data = {};
    this.formatStrategy = formatStrategy;
  }

  get(configPath) {
    return objectPath.get(this.data, configPath);
  }

  set(configPath, value) {
    return objectPath.set(this.data, configPath, value);
  }

  async load(filePath) {
    console.log(`INFO: config: Deserializing from ${ filePath }`);
    this.data = this.formatStrategy.deserialize(
      await fs.readFile(filePath, 'utf-8')
    );
  }

  async save(filePath) {
    console.log(`INFO: config: Serializing to ${ filePath }`);
    await fs.writeFile(filePath, this.formatStrategy.serialize(this.data));
  }
}
```

+ In the constructor, we create an instance variable to hold all the configuration data. We also store a reference to the `formatStrategy`, which represents the component that we will use to parse and serialize the data.

+ The `set(...)` and `get(...)` methods represent the part of the component that *do not change* independently of the format. We delegate the access to deep config properties on the `object-path` library which supports a dotted path notation (as in `prop.subProp`).

+ The `load(...)` and `save(...)` methods delegate to the `formatStrategy` the serialization and deserialization of the config data. Therefore, the strategies must expose the `serialize(...)` and `deserialize(...)` methods as those will be invoked from the *context* object.

Let's continue our example, showing how different strategies can be leveraged.

To support JSON configuration we can provide the following module:

```javascript
export const jsonStrategy = {
  deserialize: data => JSON.parse(data),
  serialize: data => JSON.stringify(data)
};
```

And we can provide another module to support [INI](https://en.wikipedia.org/wiki/INI_file) files:

```javascript
import ini from 'ini';

export const iniStrategy = {
  deserialize: data => ini.parse(data),
  serialize: data => ini.stringify(data)
};
```

| NOTE: |
| :---- |
| We are using the NPM module [ini](https://www.npmjs.com/package/ini) to address INI files parsing and serialization. |

Let's wrap up our example by creating a *main* program that leverages the `Config` object with the two different *strategies*:

```javascript
async function main() {
  /* INI */
  const iniConfig = new Config(iniStrategy);
  await iniConfig.load(`samples/conf.ini`);
  console.log(iniConfig.get(`greeting`));
  iniConfig.set('book.nodejs', 'design patterns');
  await iniConfig.save(`samples/conf_mod.ini`);

  /* JSON */
  const jsonConfig = new Config(jsonStrategy);
  await jsonConfig.load(`samples/conf.json`);
  console.log(jsonConfig.get(`greeting`));
  jsonConfig.set('book.nodejs', 'design patterns');
  await jsonConfig.save(`samples/conf_mod.json`);
}
```

| EXAMPLE: |
| :------- |
| See [01 &mdash; *Strategy* pattern](01-strategy-config) for a runnable example. |

The previous example showed us one of the possible alternatives that we had for selecting a strategy, but there are others such as:
+ creating two different strategy families: one specialized in serialization and another in deserialization.
+ dynamically selecting the strategy: we could have implemented a mechanism to dynamically select the strategy based on the extension of the file provided.

It must be also noted that the implementation of the strategy pattern might not require classes at all, and you might find usages of the *Strategy* pattern implemented as:

```javascript
function context(strategy) { ... }
```

#### In the wild
[Passport](https://github.com/jaredhanson/passport) ia a well-known authentication framework for Node.js, which allows a web server to suppoert different authentication schemes. *Passport* uses the *Strategy* pattern to separate the common logic used during authentication process from the parts that change.

### State
The **State** pattern is a specialization of the *Strategy* pattern where the strategy changes depending on the state of the context.

In contrast to the *Strategy* pattern behavior, in which the *strategy* remains unchanged once selected (based on a config property, input parameter...), in the **State** pattern, the strategy, which is called the *state* is dynamic and can change during the lifetime of the *context*, allowing its behavior to adapt depending on its internal state.

![State](images/state.png)

The diagram shows how a *context* object transitions through three states (A, B, and C), and how at each different context state, a different strategy is selected.

> The **State** pattern allows a component to adapt its behavior dynamically depending on its internal state.

Let's consider an example consisting of a hotel booking system, and an object called `Reservation` that models a room reservation.
+ When the reservation is created, the user can confirm (using `confirm()`) the reservation. The user cannot cancel it (using `cancel()`) because it's still not confirmed, but they can delete the reservation before confirming it (using `delete()`).
+ Once the reservation is confirmed, the `confirm()` method should throw an exception. However, it should be possible to cancel it. Deleting the reservation should not be allowed for internal housekeeping purposes.
+ On the day before the reservation, the user should not be allowed to either confirm, cancel or delete.

The following diagram depicts the expected behavior in terms of the *State* pattern:

![State diagram](images/state_diagram.png)

The way to solve this problem is to apply the *State* pattern with three strategies, each one implementing the same interface (`confirm()`, `cancel()`, and `delete()`) with the three different behaviors corresponding to the three states.

The switch from one behavior to another would simply require the activation of a different strategy (state object) on each state change.

| NOTE: |
| :---- |
| The *state transition* can be initiated and controlled by the context object, by client code, or by the *state* object itself. The last option usually provides the best results in terms of flexibility and decoupling, as the context does not have to know about all the possible states and how to transition between them.

#### Implementing a basic failsafe socket
In this section, we we will build a TCP client socket that does not fail when the connection with the server is lost. Instead, we will queue all the data sent during the time in which the server is offline and then try to send it again as soon as the connection is reestablished.

The socket will be leveraged in the context of a simple monitoring system, where a set of machines sends some statistics about the resource utilization at regular intervals. Thus, the failsafe implementation will be useful when the server that collects the statistics goes down, as our socket will queue the data until it becomes available again.

Let's start by creating the *context* object. This is the object that contains the common logic for all the *states*:

```javascript
import { OfflineState } from './states/offline-state.js';
import { OnlineState } from './states/online-state.js';

export class FailsafeSocket {

  constructor(options) {
    this.options = options;
    this.queue = [];
    this.currentState = null;
    this.socket = null;
    this.states = {
      offline: new OfflineState(this),
      online: new OnlineState(this)
    };
    this.changeState('offline');
  }

  changeState(state) {
    console.log(`INFO: FailsafeSocket: Activating state: ${ state }`);
    this.currentState = this.states[state];
    this.currentState.activate();
  }

  send(data) {
    this.currentState.send(data);
  }
}
```

+ The `constructor(...)` initializes the different properties we will need: the queue that will contain the data that cannot be sent, the underlying socket, the object that will reference the two different *states* (online/offline) of the *context*, and a property that references the currently active *state*. We will initialize the `FailsafeSocket` instances as `'offline'`.

+ The `changeState(...)` method is responsible for transitioning from one state to another. It simply switches the `currentState` instance property and invokes `active(...)` on the target *state*.

+ The `send(...)` method is responsible for sending the data. This is the main piece that leverages the different behavior depending on the state, and therefore, we delegate the actual send to the currently active state. Ultimately, the *state* will behave differently if we are in online or offline mode.

As a summary, we know that the *state* will be a class exposing:
+ a constructor to build the *state* instance
+ an `activate(...)` method that will be called to notify the *state* that it is the currently enabled mode on the *context*
+ a `send(...)` method which will be called to either send over a TCP socket/enqueue the data.

Let's have a look at the offline *state* first:

```javascript
import jsonOverTcp from 'json-over-tcp-2';

export class OfflineState {
  constructor(failsafeSocket) {
    this.failsafeSocket = failsafeSocket;
  }

  send(data) {
    this.failsafeSocket.queue.push(data);
  }

  activate() {
    const retry = () => {
      setTimeout(() => this.activate(), 1000);
    };

    console.log(`INFO: OfflineState: Trying to connect...`);
    this.failsafeSocket.socket = jsonOverTcp.connect(
      this.failsafeSocket.options,
      () => {
        console.log(`INFO: OfflineState: Connection established!`);
        this.failsafeSocket.socket.removeListener('error', retry);
        this.failsafeSocket.changeState('online');
      }
    );
    this.failsafeSocket.socket.once('error', retry);
  }
}
```

This is how the offline mode works:

+ We use a library [json-over-tcp-2(jot)](https://www.npmjs.com/package/json-over-tcp-2) that will help with the serialization of JSON objects over TCP.

+ The `send(...)` method in offline mode simply pushes the data received into the *context* queue.

+ The `activate()` method will attempt to connect over TCP using the `json-over-tcp-2` socket. If the operation fails, it will register an scheduled task to retry after one second. If it succeeds, it will *unschedule* the retry task, and transition the *context* state to `'online'`.

Let's have a look now at the online mode implementation:

```javascript
export class OnlineState {
  constructor(failsafeSocket) {
    this.failsafeSocket = failsafeSocket;
    this.hasDisconnected = false;
  }

  send(data) {
    this.failsafeSocket.queue.push(data);
    this._safeWrite(data);
  }

  _safeWrite(data) {
    this.failsafeSocket.socket.write(data, err => {
      if (!this.hasDisconnected && !err) {
        this.failsafeSocket.queue.shift();
      } else {
        const error = this.hasDisconnected ? new Error('Unexpected disconnection') : err;
        this._handleError(error);
      }
    });
  }

  activate() {
    this.hasDisconnected = false;
    for (const data of this.failsafeSocket.queue) {
      this._safeWrite(data);
    }

    this.failsafeSocket.socket.once('error', error => {
      this._handleError(error);
    });
  }

  _handleError(err) {
    console.error(`ERROR: OnlineState: ${ err.message }: switching to offline mode`);
    this.hasDisconnected = true;
    this.failsafeSocket.changeState('offline');
  }
}
```

Thus, in the online mode:

+ `send(...)` queues the data and then immediately tries to write it directly into the socket, as we assume we're online. It performs the actual write using an internal `_safeWrite()` method.

+ `_safeWrite(...)` tries to write the data into the underlying socket (which is *writable stream*). If no errors are returned, and the socket didn't disconnect in the meantime, we assume that the data was sent successfully and therefore we remove it from the queue using `shift()`.

+ `activate()` flushes any data that was queue while the socket was offline, and starts listening for any error event. When this happens, we transition from online to offline mode by directly invoking the *context* object `changeState(...)` method.

| NOTE: |
| :---- |
| The implementation is slightly different for `OnlineState` with regards to the error management, as it was verified that certain error conditions do not trigger the `'error'` event listener. Thus, `_safeWrite(...)` includes an else condition that handles any error received in the callback. |

Now, in order to test it end to end we need a server:

```javascript
import jsonOverTcp from 'json-over-tcp-2';

const server = jsonOverTcp.createServer({ port: 5000 });
server.on('connection', socket => {
  socket.on('data', (data) => {
    console.log(`INFO: server: data received from the client: ${ data }`);
  });
});

server.listen(5000, () => console.log(`INFO: server: TCP server started and listening on port 5000`));
```

And a client that will instantiate a `FailsafeSocket` object to report some metrics:

```javascript
import { FailsafeSocket } from './lib/fail-safe-socket.js';

const failsafeSocket = new FailsafeSocket({ port: 5000 });

setInterval(() => {
  failsafeSocket.send(process.memoryUsage());
}, 2500);
```
| EXAMPLE: |
| :------- |
| See [02 &mdash; *State* pattern: Failsafe socket](02-state-failsafe-socket) for a runnable example. |

### Template

The *Template* pattern has a lot in common with the *Strategy* pattern.

> The **Template** pattern defines an abstract class that implements the skeleton (representing the common parts) of a component, where some of its steps are left undefined. Subclasses can then *fill* the gaps by implementing the missing parts called *template methods*.

The intent of this pattern is to make it possible to define a family of classes that are all variations of a family of components.

![Template](images/template.png)

The diagram above depicts the structure of the *Template* pattern with three concrete classes that extend the *Template* class and provide an implementation of the abstract methods.

As we don't have abstract classes in JavaScript, we can opt for assigning a function that always throws an exception, or leave the method undefined.

The purpose of the *Template* and *Strategy* pattern is very similar, with the main difference being the way in which the variable parts are wired to the fixed part. While the *Strategy* let us change the variable parts at runtime, with the *Template* the component is determined at development time, when the concrete class is defined, because it uses inheritance.

As a consequence, the *Template* pattern is suitable when you want to create prepackaged variations of a component.

#### A configuration manager template
In this section, we will implement the same example described in the [Strategy](#example-multi-format-configuration-objects) section. We will build an object called `ConfigTemplate` that holds a set of configuration parameters used by an application. The `ConfigTemplate` object should provide a simple interface to access these parameters, but also a way to import and export the configuration using persistent storage, such as a file. Also, we want to be able to support different formats to store the configuration such as JSON, INI or YAML.

```javascript
import { promises as fs } from 'fs';
import objectPath from 'object-path';

export class ConfigTemplate {
  async load(file) {
    console.log(`INFO: ConfigTemplate: Deserializing from ${ file }`);
    this.data = this._deserialize(await fs.readFile(file, 'utf-8'));
  }

  async save(file) {
    console.log(`INFO: ConfigTemplate: Serializing to ${ file }`);
    await fs.writeFile(file, this._serialize(this.data));
  }

  get(path) {
    return objectPath.get(this.data, path);
  }

  set(path, value) {
    return objectPath.set(this.data, path, value);
  }

  _serialize() {
    throw new Error(`_serialize() must be implemented`);
  }

  _deserialize() {
    throw new Error(`_deserialize() must be implemented`);
  }
}
```

The `ConfigTemplate` class implements the common parts of the configuration management logic, namely setting and getting properties, plus the skeleton of the methods for loading and saving the configuration to disk. However, the details for loading and saving are delegated to `_serialize()` and `_deserialized()` which are not implemented. Those are the *templateMethods*, which will allow the creation of concrete classes for dealing with different formats such as JSON, INI, etc.

| NOTE: |
| :---- |
| As there is no support for abstract methods in JavaScript classes, we simply create *stubs* that will throw an exception if directly called. |

Let's now create the concrete class for dealing with JSON config files:

```javascript
import { ConfigTemplate } from './config-template.js';

export class JsonConfig extends ConfigTemplate {

  _deserialize(data) {
    return JSON.parse(data);
  }

  _serialize(data) {
    return JSON.stringify(data, null, ' ');
  }
}
```

And another for dealing with INI format:

```javascript
import { ConfigTemplate } from './config-template.js';
import ini from 'ini';

export class IniConfig extends ConfigTemplate {

  _deserialize(data) {
    return ini.parse(data);
  }

  _serialize(data) {
    return ini.stringify(data, null, ' ');
  }
}
```

And we can test the functionality of the `ConfigTemplate` and its concrete classes with the following code:

```javascript
import { JsonConfig } from './lib/json-config.js';
import { IniConfig } from './lib/ini-config.js';

async function main() {
  /* INI */
  const iniConfig = new IniConfig();
  await iniConfig.load(`samples/conf.ini`);
  console.log(iniConfig.get(`greeting`));
  iniConfig.set('book.nodejs', 'design patterns');
  await iniConfig.save(`samples/conf_mod.ini`);

  /* JSON */
  const jsonConfig = new JsonConfig();
  await jsonConfig.load(`samples/conf.json`);
  console.log(jsonConfig.get(`greeting`));
  jsonConfig.set('book.nodejs', 'design patterns');
  await jsonConfig.save(`samples/conf_mod.json`);
}

main()
  .then(() => console.log(`Done!!!`))
  .catch((err) => console.error(`ERROR: ${ err.message }`));
```

| EXAMPLE: |
| :------- |
| See [03 &mdash; *Template* pattern: Config](03-template-config) for a runnable example. |

Note how the functionality provided by implementation based on the *Strategy* pattern matches exactly the functionality of this example that uses the *Template* pattern.

The difference lies in the fact that when using the *Template* the different behavior is *baked into* the class itself, rather than being chosen at runtime.

#### In the wild
The *Template* pattern is very commonly used in JavaScript when using inheritance. For example, we used it when we were extending different stream classes to implement our custom streams in [Chapter 32: Coding with Streams](../chapter32-coding-with-streams).

### Iterator

The **Iterator** pattern is a fundamental pattern that it is built (in one way or another) into most of the programming languages. It was included in JavaScript in ES2015.

> The **Iterator** pattern defines a common interface to iterate over the elements produced or retrieved in sequence, such as the elements of a container (e.g. array or tree data structure), event emitters, or streams. The **Iterator** allows us to decouple the implementation of the traversal algorithm from the way we consume the elements of the traversal operation.

Usually, the algorithm is different depending on the actual structure of the data (think in the different between iterating over an array with a loop or traversing a tree using a more complex tree traversal). The *Iterator* pattern hides the details about the algorithm being used, or the structure or the data and provide a common interface for iterating any type of container.

#### The iterator protocol
In JavaScript, the *Iterator* pattern is implemented through *protocols* rather than through formal constructs such as inheritance.

In practice, this means that the interaction between the implementer and the consumer of the *Iterator* pattern will communicate using interfaces and objects whose shape is agreed in advance.

The starting point for implementing the *Iterator* pattern is the *iterator protocol*, which defines the interface for producing a sequence of values.

> We'll call *iterator* an object implement a `next()` method having the following behavior: each time the method is called, the function returns the next element in the iteration through an object, called the *iterator result* having two properties &mdash; `done` and `value`:

+ `done` is set to true when the iteration is complete. That is, when there are no more elements to return. Otherwise, `done` must be `undefined` or `false`.
+ `value` contains the current element of the iteration and it can be left `undefined` if `done` is `true`. If `value` is set even when `done` is `true`, then it is said that `value` contains the *return value* of the iteration: a value which is not part of the elements being iterated, but that is related to the iteration itself as a whole (e.g. the time spent iterating over the elements, or the average value of the items iterated if those are numbers).

As an example, let's implement the *iterator* protocol on a factory function `createAlphabetIterator()` which creates an iterator that allows us to traverse all the letters of the English alphabet:

```javascript
const A_CHAR_CODE = 65;
const Z_CHAR_CODE = 90;

export function createAlphabetIterator() {
  let currCode = A_CHAR_CODE;

  return {
    next() {
      const currChar = String.fromCodePoint(currCode);
      if (currCode > Z_CHAR_CODE) {
        return { done: true };
      }

      currCode++;
      return { value: currChar, done: false };
    }
  };
}
```

Note how we are following the *iterator protocol* to the letter: at each invocation of the `next()` method we simply increment a number representing the letter's character code, convert it to a character, and then return it using the expect object shape.

| NOTE: |
| :------- |
| Note that it's not a requirement for an iterator to ever return `done: true`. Those iterators are called *infinite*. Examples are iterators that return random numbers or numbers in mathematical series such as Fibonacci. |

Iterators are often stateful objects (as in the example above), as they might need to maintain the current position in the iteration. In the example above it is done using *closures* but there are other ways to do it, such as keeping the state within the iterator itself.

Iterators can also be stateless objects (e.g. *iterator* that returns a random number).

Let's see how we can consume the iterator we have just built:

```javascript
import { createAlphabetIterator } from './lib/alphabet-iterator.js';

const iterator = createAlphabetIterator();

let iterationResult = iterator.next();
while (!iterationResult.done) {
  console.log(iterationResult.value);
  iterationResult = iterator.next();
}
```

| EXAMPLE: |
| :------- |
| See [04 &mdash; *Iterator* pattern: Alphabet traversal](04-iterator-alphabet) for a runnable example. |


Obviously, JavaScript provides much more convenient and elegant ways to consume iterators, but the previous one will work too.

| NOTE: |
| :------- |
| *Iterators* can optionally specify two additional methods: `return([value])` and `throw(error)`. The first is by convention used to signal to the iterator that the consumer has stopped the iteration before its completion, while the second is used to communicate to the *iterator* that an error condition has occurred. Those methods are rarely used by built-in iterators. |

#### The iterable protocol

The *iterable protocol* defines a standardized way for an object to return an iterator. Such object are called *iterables*. Usually, an *iterable* is a container of elements, such as a data structure, but it can also represent a set of elements such as a `Directory` object which would allow us to iterate over the files in a directory.

In JavaScript, we can define an *iterable* by making sure it implements the *@@iterator method*, or in other words, a method accessible through the built-in symbol `Symbol.iterator`.

| NOTE: |
| :------- |
| The *@@name* convention indicates a *well-known* symbol according to the ES6 specification. See [ES6: Well-known symbols](https://262.ecma-international.org/6.0/#sec-well-known-symbols) for more details. |


Such an *@@iterator* method should return an *iterator* object, which can be used to iterate over the elements represented by the *iterable*.

```javascript
class MyIterable {
  ...
  [Symbol.iterator]() {
    /* return an iterator */
  }
}
```

To show how this works, let's build a class that let us traverse a bidimensional matrix:

```javascript
export class Matrix {
  constructor(inMatrix) {
    this.data = inMatrix;
  }

  get(row, column) {
    if (row >= this.data.length || column >= this.data[row].length) {
      throw new RangeError('Out of bounds');
    }
    return this.data[row][column];
  }

  set(row, column, value) {
    if (row >= this.data.length || column >= this.data[row].length) {
      throw new RangeError('Out of bounds');
    }
    this.data[row][column] = value;
  }

  [Symbol.iterator]() {
    let nextRow = 0;
    let nextCol = 0;
    return {
      /* note that `next() : { ... }` will not bind `this` correctly */
      next: () => {
        if (nextRow === this.data.length) {
          return { done: true };
        }

        const currVal = this.data[nextRow][nextCol];
        if (nextCol === this.data[nextRow].length - 1) {
          nextRow++;
          nextCol = 0;
        } else {
          nextCol++;
        }
        return { value: currVal };
      }
    };
  }
}
```

The class contains basic methods for initializing the matrix elements, and also for setting and getting individual elements. On top of that, the class exposes the *@@iterator* method, which implements the *iterable protocol*. The method returns an *iterator* which is compliant with the *iterator* protocol. The *iterator* logic will let us traverse the elements of the matrix in the usual way matrices are traversed.

Let's see our `Matrix` class in action:

```javascript
import { Matrix } from './lib/matrix.js';

const matrix2x2 = new Matrix([
  [1, 2],
  [3, 4]
]);

const iterator = matrix2x2[Symbol.iterator]();
let iterationResult = iterator.next();
while (!iterationResult.done) {
  console.log(iterationResult.value);
  iterationResult = iterator.next();
}
```

| EXAMPLE: |
| :------- |
| See [05 &mdash; *Iterable* protocol: Bidimensional matrix](05-iterable-matrix) for a runnable example. |

Again, there are more convenient and elegant ways to consume iterators, as we will see in the next section.

#### Iterators and iterables as a native JavaScript interface
Having a standardized interface allows 3rd party code, as well as the language itself to be modeled around the two protocols to provide certain capabilities such as native APIs and other syntax constructs.

The most obvious syntax construct accepting an *iterable* is the *for...of* loop, meaning we can simply do:

```javascript
for (const element of matrix2x2) {
  console.log(element);
}
```

But it will also work with the spread operator:

```javascript
const flattenedMatrix = [...matrix2x2];
```

and with destructuring:

```javascript
const [a11, a12, a21, a22] = matrix2x2;
```

Additionally, the following JavaScript built-in APIs accept iterables:
+ `Map([iterable])` &mdash; [MDN: Map constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/Map)
+ `WeakMap([iterable])` &mdash; [MDN: WeakMap constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap/WeakMap)
+ `Set([iterable])` &mdash; [MDN: Set constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/Set)
+ `WeakSet([iterable])` &mdash; [MDN: WeakSet constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet/WeakSet)
+ `Promise.all(iterable)` &mdash; [MDN: Promise.all()](https://developer.mozilla.org/en-USdocs/Web/JavaScript/Reference/Global_Objects/Promise/all)
+ `Promise.race(iterable)` &mdash; [MDN: Promise.race()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/race)
+ `Array.from(iterable)` &mdash; [MDN: Array.from()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from)

On the Node.js side, one notable API that accepts iterable is `stream.Readable.from(iterable, [options])`, the method that we used to create a *Readable stream* from an array (see [Node.js: `Readable.from()`](https://nodejs.org/api/stream.html#stream_stream_readable_from_iterable_options)).

Note that this means that we would pass a custom *iterable* like the one we created in the previous section to any of these APIs and it would work in the same way as if we passed a native array.

| EXAMPLE: |
| :------- |
| See [06 &mdash; *Iterable* protocol: Notable APIs](06-iterable-notable-apis) for a runnable example. |

As you can see, all these notable mentions require an *iterable* and not an iterator. A possible solution when you have an *iterator* but would like to use an API that require an *iterable* is to implement the *@@iterator* method in the iterator object itself, which will simply return the iterator object itself:

```javascript
const alphabetIterable = {
  [Symbol.iterator]() {
    return createAlphabetIterator();
  }
};

for (const letter of alphabetIterable) {
  console.log(letter);
}
```

| NOTE: |
| :---- |
| The following line ensures that an array does not contain duplicates: `const uniqArray = Array.from(new Set(arrayWithDuplicates))`. |


#### Generators

*Generators* (also known as *semicoroutines*) were introduced as a syntax construct in ES2015.

There are a generalization of standard functions, in which you can define different entry points instead of a single one: a *generator* can be *suspended* using the `yield` statement, and then resumed at a later point at that point.

That feature makes *generators* well suited to implement *iterators*.

##### Generators in theory

To define a *generator function*, we need to use the `function*` declaration:

```javascript
function* myGenerator() {
  // generator body
}
```

Invoking a generator function will not execute the body immediately. Instead, it will return a *generator object*, which is both an *iterator* and an *iterable*.

Invoking `next()` on the *generator object* will start or resume the execution of the generator until the `yield` instruction is invoked or the generator returns (either implicitly or explicitly).

Within the generator, using the keyword `yield` followed by a value `x` is equivalent to returning `{done: false, value: x}` from the iterator, while returning `x` is equivalent to returning `{done: true, value: x}`.

##### A simple generator function

Let's create a simple iterator that yield two names of fruits and return a season:

```javascript
function* fruitGenerator() {
  yield 'peach';
  yield 'watermelon';
  return 'summer';
}

const fruitGeneratorObj = fruitGenerator();

console.log(fruitGeneratorObj.next()); // { value: 'peach', done: false }
console.log(fruitGeneratorObj.next()); // { value: 'watermelon', done: false }
console.log(fruitGeneratorObj.next()); // { value: 'summer', done: true }

/* extra invocation after iterator in generator object is done */
console.log(fruitGeneratorObj.next()); // { value: undefined, done: true }
```

This works as follows:
+ Invoking the *generator function* returns a *generator object*
+ Invoking `next()` for the first time makes the generator to execute until the first `yield` statement. After that, the generator will be put in *pause* and the client code will receive `{ value: 'peach', done: false }`.
+ Invoking `next()` for the second time makes the generator to resume from the line where it paused until the next `yield`statement. Again, the generator will pause there and client code will receive `{ value: 'peach', done: false }`.
+ Invoking `next()` for the third time will make the generator advance until the `return` statement as there are no more `yield`. The generator will finish there and the client code will receive: `{ value: 'summer', done: true }`.
+ Although no reason to be called again, as we already received the signal that the iterator is done, if we call it again we get: `{ value: undefined, done: true }`.

Since a generator function is both an *iterator* and an *iterable* we can do:

```javascript
for (const fruit of fruitGenerator()) {
  console.log(fruit);
}

const fruits = [...fruitGenerator()];
console.log(fruits);

const [fruitOne, ...other] = fruitGenerator();
console.log(fruitOne);
```

| EXAMPLE: |
| :------- |
| See [07 &mdash; *Generators*](07-generator-fruits) for a runnable example. |

##### Controlling a generator iterator
Generator objects feature more functionalities than standard iterators. In particular, the `next(...)` method of the generator functions accept an argument that is not part of the *iterator protocol*.

That argument will be passed as the return value of the `yield` instruction.

```javascript
function* twoWayGenerator() {
  const what = yield null;
  yield `Hello, ${ what }!`;
}

const twoWay = twoWayGenerator();
twoWay.next();
console.log(twoWay.next('world!')); // 'Hello, world!'
```

Note that the protocol needs a little bit of explanation:
+ The first time the `next()` is called makes the execution body of the generator to move to the first `yield` statement. `null` is returned.
+ When `next('world')` is invoked, the generator resumes from the point it was put in pause, receiving the parameter sent. The execution continues until the next `yield` statement, and this time the statement yields the string which is printed in the console.

Another couple of extra features are the optional `throw()` and `return()` iterator methods.

`throw()` lets you communicate with a generator from the client code by sending an exception that is thrown at the point of the last `yield`. In turn, the generator can *catch* the exception and return the canonical iterator object with the `done` and `value` properties.

```javascript
function* throwTwoWayGenenerator() {
  try {
    const what = yield null;
    yield `Hello, ${ what }!`;
  } catch (err) {
    yield `Error received in the generator: ${ err.message }`;
  }
}

const twoWayException = throwTwoWayGenenerator();
twoWayException.next(); // nothing happens
console.log(twoWayException.throw(new Error('Boom!'))); // { value: 'Error received in the generator: Boom!', done: false }
```

return(arg)` forces the generator to terminate and returns an object `{done: true, value: arg }`.

```javascript
function* returnTwoWayGenenerator() {
  const what = yield null;
  yield `Hello, ${ what }!`;
}

const returnGenerator = returnTwoWayGenenerator();
returnGenerator.next();
console.log(returnGenerator.return('forcing return!'));
```
| EXAMPLE: |
| :------- |
| See [08 &mdash; *Generators*: extra capabilities](08-generator-extra-capabilities) for a runnable example. |

##### How to use generators in place of iterators

Generators are also iterators. This means that generator functions can be used to implement the *@@iterator* method of iterable objects.

```javascript
export class Matrix {
  constructor(inMatrix) {
    this.data = inMatrix;
  }

  *[Symbol.iterator]() {
    let nextRow = 0;
    let nextCol = 0;
    while (nextRow !== this.data.length) {
      yield this.data[nextRow][nextCol];

      if (nextCol === this.data[nextRow].length - 1) {
        nextRow++;
        nextCol = 0;
      } else {
        nextCol++;
      }
    }
  }
}
```



Note that the *@@iterator** has been implemented with a generator function, and that has let us simplify the code a bit:
+ the variables we used to maintain the state are regular local variables (no need for closures). This is possible because when a generator is invoked, its local state is preserved between reentries.
+ We use a standard loop to iterate over the elements of the matrix. This is clearly more readable than returning a `next()` function that implements a single iteration of the loop.

| EXAMPLE: |
| :------- |
| See [09 &mdash; *Generators* in place of *iterators*](09-generator-iterator) for a runnable example. |

In summary, generators are excellent alternatives to writing iterators from scratch, as they improve the readability of the iteration routine while maintaining all of their capabilities.

| NOTE: |
| :---- |
| The *generator delegation* is another example of a JavaScript syntax that accepts an iterable as an argument. The instruction `yield* iterable` can be used within a generator function to yield yield each element of the generator one by one. See [10 &mdash; *Generator delegation*](10-generator-delegation) for an example. |

#### Async iterators
360

#### Async generators

#### Async iterators and Node.js streams

#### In the wild

### Middleware

### Command

### Summary

### You know you've mastered this chapter when...


### Patterns Cheat Sheet

| Type | Pattern | Definition | Example | Additional info |
|:---- | :------ | :--------- | :------ | :-------------- |
| Creational | [**Factory**](#factory) | Allows you to separate the creation of an object from its implementation | `const db = createDb(dbName)` | As it decouples the creation of the object from the implementation, lets you create an object whose class is actually determined at runtime.<br>Also, using the *Factory* pattern reduces the exposed surface area when compared to exposing the class, thus providing better encapsulation and information hiding. <br>Protects consumer code against changes on the classes it leverages. |
| Creational | [**Builder**](#builder) | Simplifies the creation (or invocation) of complex objects (or functions) by providing a fluent interface which which allows you to build (or invoke) the object (or function) step by step. | `const db = new Db().setName(dbName).build()` |Greatly simplifies *DX*, as the fluent interface is simple to read and self-documenting.<br>The implementation consists in encapsulating parameter setting related login into setter methods. |
| Creational | [**Revealing Constructor**](#revealing-constructor) | Expose certain private functionality of an object to the consumer only at the time of creation, making them completely inaccessible once the object is created. | `const db = new Database((dbConfig) => {...})` | The pattern consists in defining a constructor which accepts as argument a function that will receive the private properties that will be accessible during creation.<br>This pattern provides strong guarantees regarding encapsulation and information hiding. |
| Creational | [**Singleton**](#singleton) | Enforces the presence of only once instance of a class and centralizes access to it. | `export const db = new Database(dbName)` |This pattern are great for sharing stateful information and synchronizing access to a resources.<br>You must be aware that multiple incompatible versions of a module might end up creating multiple *singleton instances* (one per incompatible version). |
| Dependency Wiring | [**Singleton dependencies**](#singleton-dependencies) | Leverages the module system to provide the dependencies of a  module as *Singletons*, which ensures the correct wiring even for stateful dependencies. | `import { db } from 'db.js'` | Very simple to implement, but creates tight coupling between a module and its dependencies. |
| Dependency Wiring | [**Dependency Injection**](#dependency-injection) | The dependencies of a component are *provided as inputs* by an external entity. | `const blog = new Blog(db)` | Provides loose coupling between components at the cost of more complex implementation and dependency graph management. |
| Structural | [**Proxy**](#proxy) | Contols access to another object, called the *subject*, by providing an object with the same interface as the *subject* that intercepts all or some of the operations that are meant to be executed on the *subject*, augmenting or complementing its behavior. | `const proxy = new EnhancedSubject(subject)` | Several techniques available for implementing it: composition, monkey-patching and native `Proxy` object. |
| Structural | [**Change Observer**](#change-observer-pattern-with-proxy) | Variant of [**Proxy**](#proxy) in which the *subject* notifies one or more observers of any state change in the object so that they can react to them as soon as they occur. | `const observableSubject = createObservable(subject, (...args) => { /* listener logic */ })` | Cornerstone of reactive programming |
| Structural | [**Decorator**](#decorator) | Dynamically augment the behavior of an existing *target* object. | Same impelementation techniques available for the *Proxy* pattern can be applied to *Decorator*. |
| Structural | [**Adapter**](#adapter) | Takes the interface on an object (the *adaptee*) and makes it compatible with another interface that is expected by the client code. | `const adapter = createAdapter(adaptee)` | It is common to find that methods exposed from the *Adapter* ends up invoking several methods in the *adaptee*. |

### Code, Exercises and mini-projects

#### [01 &mdash; *Strategy* pattern](01-strategy-config)
Illustrates how to implement the *Strategy* pattern by creating a config that supports different types of formats.

#### [02 &mdash; *State* pattern: Failsafe socket](02-state-failsafe-socket)
Illustrates how to implement the *State* pattern by creating Failsafe socket implementation that handles gracefully disruption in the communication as two states.

#### [03 &mdash; *Template* pattern: Config](03-template-config)
Illustrates how to implement the *Template* pattern by creating a configuration object that supports different types of formats (JSON, INI, ...).

#### [04 &mdash; *Iterator* pattern: Alphabet traversal](04-iterator-alphabet)
Illustrates how to implement the *iterator protocol* by creating a function that creates an *Iterator* that allows us to traverse all the letters of the English alphabet.

#### [05 &mdash; *Iterable* protocol: Bidimensional matrix](05-iterable-matrix)
Illustrates how to implement the *iterable protocol* by creating a class that let us manage the elements of a bidimensional matrix.

#### [06 &mdash; *Iterable* protocol: Notable APIs](06-iterable-notable-apis)
Illustrates how you can pass custom *iterables* to native JavaScript and Node.js APIs that accept *iterables*.

#### [07 &mdash; *Generators*](07-generator-fruits)
Simple example that illustrates how to create a generator function that yields two fruit names and returns their ripening season.

#### [08 &mdash; *Generators*: extra capabilities](08-generator-extra-capabilities)
Illustrates the extra bidirectional capabilities present in generators that are not available in *iterators*: passing values in `next()` and the `throw()` and `return()` methods.

#### [09 &mdash; *Generators* in place of *iterators*](09-generator-iterator)
Illustrates how to use a *generator* function in place of an iterator.

#### [10 &mdash; *Generator delegation*](10-generator-delegation)
Illustrates the *generator delegation* syntax that allows a generator to use `yield* iterable` to delegate to another iterable within a generator function.

#### Exercise 1: [HTTP client cache](./e01-http-client-cache/)
Write a proxy for your favorite HTTP client library that caches the response of a given HTTP request, so that if you make the same request again, the response is immediately returned from the local cache, rather than being fetched from the remote URL.

### ToDo
