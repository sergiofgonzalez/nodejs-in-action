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
337

### Template

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

#### [01 &mdash; *Proxy* pattern: Object composition](01-proxy-object-composition)
Illustrates how to implement a *proxy* using object composition with classes.

#### Exercise 1: [HTTP client cache](./e01-http-client-cache/)
Write a proxy for your favorite HTTP client library that caches the response of a given HTTP request, so that if you make the same request again, the response is immediately returned from the local cache, rather than being fetched from the remote URL.

### ToDo

[ ] Review https://www.reactivemanifesto.org/

[ ] Review https://loopback.io/index.html capabilities