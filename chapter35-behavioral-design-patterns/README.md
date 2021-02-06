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

345


#### In the wild

### Iterator

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

#### Exercise 1: [HTTP client cache](./e01-http-client-cache/)
Write a proxy for your favorite HTTP client library that caches the response of a given HTTP request, so that if you make the same request again, the response is immediately returned from the local cache, rather than being fetched from the remote URL.

### ToDo

[ ] Review https://www.reactivemanifesto.org/

[ ] Review https://loopback.io/index.html capabilities