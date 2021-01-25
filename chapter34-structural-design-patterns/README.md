# Part 4: Node.js avanced patterns and techniques
## Chapter 34 &mdash; Structural Design Patterns
> Design patterns for building more complex, flexible and reusable structures through the combination of objects

### Contents
+ Introduce the set of traditional design patterns for the realization of relationships between entities
+ The **Proxy** pattern
+ The **Decorator** pattern
+ The **Adapter** pattern
+ Exploring *reactive programming (RP)* concepts
+ Introducing *LevelDB* for Node.js ecosystem

### Proxy
> A **Proxy** is an object that controls access to another object, called the *subject*. A *proxy* intercepts all or some of the operations that are meant to be executed on the *subject*, augmenting or complementing their behavior.

The *proxy* and the subject have an identical interface, and this allows us to swap one for the other transparently.

| NOTE: |
| :---- |
| An alternative name for the *proxy* pattern is **surrogate**. |

![Proxy](images/proxy.png)

The *proxy* forwards each operation to the subject, enhancing its behavior with additional preprocessing or postprocessing.

It's important to notice that the *Proxy* pattern involves wrapping an actual instance of the subject, not its class &mdash; the internal state of the object is thus preserved.

A *proxy* is useful in the following circumstances:
* data validation &mdash; it gives you a chance to validate the input before forwarding it to the subject.
* security &mdash; the *proxy* can verify that the client is authorized to perform the operation.
* caching &mdash; the *proxy* can keep an internal cache and only execute the operation on the subject if the data is not yet present in the cache.
* lazy initialization &mdash; if creating the subject is expensive, the proxy can delay its initialization until it is necessary.
* logging &mdash; the *proxy* can intercept the method invocation and record the parameters.
* remote objects &mdash; the *proxy* can be used to make a remote object appear local to consumers.

#### Techniques for implementing proxies

When *proxying* an object, we can decide to intercept all of its methods or only some of them, while delegating the rest directly to the subject. In this section we will explore many different ways we can achieve this.

Our *subject* will be a simple `StackCalculator` class. The class provides methods for multiplication and division. We will want to *proxy* the instances of this class to enhance it by providing a more conservative behavior for division (in JavaScript n/0 renders `Infinity` instead of an exception).

```javascript
export class StackCalculator {
  constructor() {
    this.stack = [];
  }

  putValue(value) {
    this.stack.push(value);
  }

  getValue() {
    return this.stack.pop();
  }

  peekValue() {
    return this.stack[this.stack.length - 1];
  }

  clear() {
    this.stack = [];
  }

  divide() {
    const divisor = this.getValue();
    const dividend = this.getValue();
    const result = dividend / divisor;
    this.putValue(result);
    return result;
  }

  multiply() {
    const multiplier = this.getValue();
    const multiplicand = this.getValue();
    const result = multiplicand * multiplier;
    this.putValue(result);
    return result;
  }
}
```

##### Object composition

*Composition* is a technique whereby an object is combined with another object for the purpose of extending or using its functionality.

In the specific case of the *Proxy* pattern, a new object with the same interface as the subject is created, and a reference to the subject is stored internally in the procy in the form of an instance variable or closure variable.

The *subject* can then be injected from the client at creation time or created by the *proxy* itself.

Let's see it in action creating a `SafeCalculator` class that proxies the `divide()` method on the `StackCalculator` class to intercept the *divide by zero* situation.

The remaining operations will be simply delegated to the `StackCalculator` class:

```javascript
export class SafeCalculator {
  constructor(calculator) {
    this.calculator = calculator;
  }

  /* proxied method */
  divide() {
    const divisor = this.calculator.peekValue();
    if (divisor === 0) {
      throw Error('Division by 0');
    }
    return this.calculator.divide();
  }

  /* delegated methods */
  putValue(value) {
    return this.calculator.putValue(value);
  }

  getValue() {
    return this.calculator.getValue();
  }

  peekValue() {
    return this.calculator.peekValue();
  }

  clear() {
    return this.calculator.clear();
  }

  multiply() {
    return this.calculator.multiply();
  }
}
```


Note that to implement the proxy using composition, we had to intercept the method we were interested in manipulating, while simply delegating the rest of them to the *subject*. Note also that the interface for the *proxy* and the *subject* is identical.

Another interesting fact is that the proxy does not maintain the underlying calculator state.

The consumer of the proxy will have to do:

```javascript
const calculator = new StackCalculator();
const safeCalculator = new SafeCalculator(calculator);

safeCalculator.putValue(0);
safeCalculator.putValue(0);
console.log(safeCalculator.divide());
```

| EXAMPLE: |
| :------- |
| See [01 &mdash; *Proxy* pattern: Object composition](01-proxy-object-composition) for a runnable example. |


Note that you can also implement the *Proxy* pattern using object composition with a *Factory* function that returns an object literal, rather than using classes as in the example above:

```javascript
export function createSafeCalculator(calculator) {
  return {
    /* proxied method */
    divide() {
      const divisor = calculator.peekValue();
      if (divisor === 0) {
        throw Error('Division by 0');
      }
      return calculator.divide();
    },

    /* delegated methods */
    putValue(value) {
      return calculator.putValue(value);
    },

    getValue() {
      return calculator.getValue();
    },

    peekValue() {
      return calculator.peekValue();
    },

    clear() {
      return calculator.clear();
    },

    multiply() {
      return calculator.multiply();
    }
  };
}
```

| EXAMPLE: |
| :------- |
| See [02 &mdash; *Proxy* pattern: Object composition with object literals](02-proxy-object-composition-object-literal) for a runnable example. |


Note that having to delegate many methods for complex classes can be very tedious and make it harder to implement.

##### Object augmentation

*Object augmentation* (or *monkey patching) is probably the simplest and most common way of proxying just a few methods of an object. It involves modifying the subject directly by replacing a method with its proxied implementation.

```javascript
export function patchToSafeCalculator(calculator) {
  const divideOriginal = calculator.divide;
  calculator.divide = () => {
    const divisor = calculator.peekValue();
    if (divisor === 0) {
      throw new Error('Division by 0');
    }
    return divideOriginal.apply(calculator);
  };
  return calculator;
}
```

In this technique, we only need to implement the methods on which we need add some logic. For the remaining ones, we return the original calculator.

| NOTE: |
| :---- |
| The `apply(thisArg, [argsArray])` method of the `Function` object calls a function with a given `this` and arguments. |

| EXAMPLE: |
| :------- |
| See [03 &mdash; *Proxy* pattern: *Monkey patching* technique](03-proxy-monkey-patching) for a runnable example. |

This technique is very succinct and convenient but comes at the cost of mutating the *subject* object, which can be dangerously. This can have unintended consequences when the *subject* is shared with other parts of the codebase.

> The *monkey patching* technique for creating proxies is only recommended for *subjects* that exist in a controlled context or in a private scope, as the original behavior is changed, and there might be parts of the application that rely in the original behavior.


##### The built-in `Proxy` object

The built-in `Proxy` object defined in the ES2015 standard introduced a native way to create powerful proxy objects.

```javascript
const proxy = new Proxy(target, handler);
```

+ `target` &mdash; represents the *subject*.
+ `handler` &mdash; is a special object that defines the behavior of the proxy.

The `handler` object contains a series of optional methods with predefined names called *trap methods* (`apply`, `get`, `set`, `has`...) that are automatically called when the corresponding operations are performed on the proxy instance.

```javascript
export const safeCalculatorHandler = {
  get: (target, property) => {
    if (property === 'divide') {
      /* proxied method */
      return function () {
        const divisor = target.peekValue();
        if (divisor === 0) {
          throw new Error('Division by zero');
        }
        return target.divide();
      };
    }

    /* delegated methods and properties */
    return target[property];
  }
};
```

Note how we use the `get` trap to intercept access to properties and methods in the object, so that we could safely patch the `divide()` method while delegating the remaining operations to the original object.

The `Proxy` object inherits the prototype of the *subject*, so that `safeCalculator instanceOf StackCalculator` will return true.

| EXAMPLE: |
| :------- |
| See [04 &mdash; *Proxy* pattern: using the built-in `Proxy` object](04-proxy-built-in-proxy) for a runnable example. |

###### Additional capabilities and limitations of the `Proxy` object

The `Proxy` object can also be utilized to implement features such as *meta-programming*, *operator overloading*, and *object virtualization*.

Let's elaborate these ideas in a very succinct example:

```javascript
const evenNumbers = new Proxy([], {
  get: (target, index) => index * 2,
  has: (target, number) => number % 2 === 0
});

console.log(2 in evenNumbers);
console.log(5 in evenNumbers);
console.log(evenNumbers[7]);
```

| EXAMPLE: |
| :------- |
| See [05 &mdash; Capabilities of the `Proxy` object](05-built-in-proxy-capabilities) for a runnable example. |

In the example, we are creating a virtual array that contains all the even numbers. Note that it can be used as a regular array, which means we can access its elements using `[]` as in `evenNumbers[7]`, or even check the existence of a given number in the array using `in` as in `2 in evenNumbers`.

In the example, the `get` trap is used to intercept the access to the array element, returning the even number for the given index. The `has` trap intercepts the usage of the `in` operator.

| NOTE: |
| :---- |
| You can deep dive in all the capabilities of the `Proxy` object on [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy). |

##### A comparison of the different proxying techniques

+ *Composition* &mdash; simple and safe, as it leaves the subject untouched. The only drawback is that it might get a little tedious when you're proxying a complicated class and you're delegating many of the *subject*'s methods.
+ *Object augmentation (monkey patching)* &mdash; it is succinct, but it is never a good idea to mutate the *subject*. It is a good solution when the *subject* is under control, and you only want to proxy a few methods.
+ `Proxy` &mdash; provides a very robust approach if you need to intercept function calls or have different types of access to object attributes.

#### Example: *Proxying* a Writable stream
In this section, we will apply the *Proxy* pattern to a real example by building an object that acts as a proxy to a *Writable* stream.

The *proxy* will intercept all the calls to the `write()` method and will log a message every time this happens.

We will use the `Proxy` object technique to implement this proxy:

```javascript
export function createLoggingWritable(writable) {
  return new Proxy(writable, {
    get(target, propKey) {
      if (propKey === 'write') {
        return function (...args) {
          const [ chunk ] = args;
          console.log(`Writing`, chunk);
          return writable.write(...args);
        };
      }
      return target[propKey];
    }
  });
}
```

The main points of the implementation are:
+ we create a *factory* that returns a proxied version of the `writable` object passed as an argument.
+ we use the `get(...)` trap to intercept access to the object properties.
+ we check if the property accessed is the `write(...)` method. If that is the case, we return the function that should be executed instead of the original behavior.
+ that function uses `...args` to collect in an array all the arguments that are passed to that function, and then extract the `chunk` parameter, as this will be the one we want to use for logging.
+ Then, we log the chunk received and invoke the original behavior of the *writable* stream.
+ Finally, if the property or method accessed had nothing to do with the `write(...)` method, we just delegate the call to the underlying writable.

Using this module is extremely simple:

```javascript
import { createWriteStream } from 'fs';
import { createLoggingWritable } from './lib/logging-writable.js';

const writable = createWriteStream('test.txt');
const writableProxy = createLoggingWritable(writable);

writableProxy.write('first chunk.');
writableProxy.write('second chunk.');
writable.write('third chunk: this will not be logged.');
writableProxy.end();
```


| EXAMPLE: |
| :------- |
| See [06 &mdash; *Proxy* pattern: building a *proxy* on a *Writable* stream](06-proxy-writable-stream) for a runnable example. |

#### *Change Observer* pattern with Proxy

*Proxies* are also effective tools to create observable objects.

> The **Change Observer** pattern is a desing pattern in which an object (the *subject*) notifies one or more observers of any state change in the object so that they can *react* to changes as soon as any change occur.

| NOTE: |
| :---- |
| Although very similar, the **Change Observer** pattern should not be confused with the **Observer** pattern we discussed while learning about callbacks and events. The latter is a more generic approach that adopts an event emitter to propagate information about events happening in the system. See [**Observer** pattern] [chapter29-callbacks-and-events/README.md#the-observer-pattern] for a reminder on the concepts backing the pattern. |

The implementation is quite succinct:

```javascript
export function createObservable(target, observer) {
  const observable = new Proxy(target, {
    set(obj, prop, value) {
      if (value !== obj[prop]) {
        const prev = obj[prop];
        obj[prop] = value;
        observer({ prop, prev, curr: value });
      }
      return true;
    }
  });
  return observable;
}
```

+ We create a *factory* function that accepts the object to observe for changes, and a function `observer(...)` that will be invoked every time a change is detected.
+ In the function, we create a `Proxy` object that implements the `set(...)` trap to detect every time a property is set.
+ In the implementation, we check if a change has been made, and if that is the case, we invoke the `obserser(...)` function with the property, previous and current value.
+ We make the `set(...)` trap return `true` no matter whether the change was detected or not.
+ Finally, we return the *proxy* object we have created and configured.


Using the `observable` is very easy as well:

```javascript
import { createObservable } from './lib/create-observable.js';

function calculateTotal(invoice) {
  return invoice.subtotal - invoice.discount + invoice.tax;
}

const invoice = {
  subtotal: 100,
  discount: 10,
  tax: 20
};

let total = calculateTotal(invoice);
console.log(`Starting total: ${ total }`);

const observableInvoice = createObservable(invoice, ({ prop, prev, curr }) => {
  total = calculateTotal(invoice);
  console.log(`TOTAL: ${ total } (${ prop } changed: ${ prev } => ${ curr })`);
});

observableInvoice.subtotal = 200; // subtotal updated
observableInvoice.discount = 20;  // discount updated
observableInvoice.discount = 20;  // no change: smart change detection!
observableInvoice.tax = 15;       // tax updated
```

In the example, we define an `invoice` object literal that keeps track of a subtotal, discount and tax associated with an invoice.

We also define a function `calculateTotal()` that computes the final amount of the invoice.

Then we apply the *Change Observer* pattern, using the `createObservable()` *factory*: the target object will be the `invoice` object, and the `observer(...)` function is in charge of updating the total amount for the invoice, and logging in the console what change has been detected.

| EXAMPLE: |
| :------- |
| See [07 &mdash; *Change Observer* pattern: using a *proxy* to create an observable object](07-proxy-change-observer) for a runnable example. |

| NOTE: |
| :---- |
| The example above is a very simplistic implementation of the **Change Observer** pattern that illustrates the concept behaind the pattern. A more sophisticated implementation should use more traps to detect other types of mutations such as field deletions, changes in the prototype, etc. Also, the implementation does not recursively create proxies for nested objects or arrays. |

*Observables* are the cornerstone of *reactive programming (RP)* and *functional reactive programming (FRP)*. You can learn more about these techniques in the [*Reactive Manifesto*](https://www.reactivemanifesto.org/).

#### In the wild

The *Proxy* pattern and more specifically, the *Change Observer* pattern are widely adopted patterns which can be found in a multitude of projects and libraries:
+ [LoopBack](https://loopback.io/index.html) &mdash; uses the *Proxy* pattern to provide the capability to intercept and enhance method calls on controllers, which can be used to build custom validation or authentication mechanisms.

### Decorator

> **Decorator** is a structural design pattern aim to dynamically augment the behavior of an existing object.

It's different from inheritance, because not all instances of the class are augmented &mdash; the behavior is added only the classes that are explicitly augmented.

The following diagram depicts the idea behind the *Decorator* pattern:

![Decorator](images/decorator.png)

See how the *Decorator* object is extending the *Component* object by adding a method. The existing methods are typically delegated to the decorated object without further processing, although in some cases, they might also be intercepted and augmented with extra behaviors.

Implementation wise, it is very similar to the *Proxy* pattern.

#### Techniques for implementing decorators

Although *proxy* and *decorator* are conceptually two different patterns, they share the same implementation techniques.

In the examples, we will use our `StackCalculator` class and we will decorate it to add a new method `add()`, and we will also intercept the `divide()` calls to detect the *divide by zero* situations and throw an exception instead of returning `Infinity`.

##### Composition

Using composition, the decorated component is wrapped around a new object. The decorator simply needs to define the new methods and delegate the existing ones to the component:

```javascript
export class EnhancedCalculator {
  constructor(calculator) {
    this.calculator = calculator;
  }

  /* new method */
  add() {
    const addend2 = this.getValue();
    const addend1 = this.getValue();
    const result = addend1 + addend2;
    this.putValue(result);
    return result;
  }

  /* modified method */
  divide() {
    const divisor = this.calculator.peekValue();
    if (divisor === 0) {
      throw Error('Division by zero');
    }

    return this.calculator.divide();
  }

  /* delegated methods */
  putValue(value) {
    return this.calculator.putValue(value);
  }

  getValue() {
    return this.calculator.getValue();
  }

  peekValue() {
    return this.calculator.peekValue();
  }

  clear() {
    return this.calculator.clear();
  }

  multiply() {
    return this.calculator.multiply();
  }
}
```

In the constructor we create a property to store the *component* we're decorating, and then use it for the methods for which we change the behavior or delegate.

Besides, a new method `add()` is exposed.

The consumers of the class can use this `EnhancedCalculator` in the usual way:

```javascript
import { StackCalculator } from './lib/stack-calculator.js';
import { EnhancedCalculator } from './lib/enhanced-calculator.js';

const calculator = new StackCalculator();
const enhancedCalculator = new EnhancedCalculator(calculator);

enhancedCalculator.putValue(4);
enhancedCalculator.putValue(3);
console.log(enhancedCalculator.add());

enhancedCalculator.putValue(2);
console.log(enhancedCalculator.multiply());
```

| EXAMPLE: |
| :------- |
| See [08 &mdash; *Decorator* pattern: using object composition](08-decorator-object-composition) for a runnable example. |

##### Object augmentation
*Object decoration* can also be achieved by simply attaching new methods directly to the decorated object (using the *monkey patching* technique):

```javascript
export function patchCalculator(calculator) {
  /* new method */
  calculator.add = () => {
    const addend2 = calculator.getValue();
    const addend1 = calculator.getValue();
    const result = addend1 + addend2;
    calculator.putValue(result);
    return result;
  };

  /* modified method */
  const originalDivide = calculator.divide;
  calculator.divide = () => {
    const divisor = calculator.peekValue();
    if (divisor === 0) {
      throw Error('Division by 0');
    }

    return originalDivide.apply(calculator);
  };

  return calculator;
}
```

Note that the original object is mutated, which is discouraged, but in contrast, the methods we don't change are automatically delegated to the underlying object without requiring any additional code.

| EXAMPLE: |
| :------- |
| See [09 &mdash; *Decorator* pattern: using *monkey patching* (object augmentation)](09-decorator-monkey-patching) for a runnable example. |

##### Decorating with the Proxy

#### Decorating a LevelUP database

##### Introducing a LevelUP

##### Implementing a LevelUP

#### In the wild

### The line between proxy and decorator

### Adapter

### Summary

### You know you've mastered this chapter when...

### Patterns Cheat Sheet

| Type | Pattern | Definition | Example | Additional info |
|:---- | :------ | :--------- | :------ | :-------------- |
| Creational | [**Factory**](#factory) | Allows you to separate the creation of an object from its implementation | `const db = createDb(dbName)` | As it decouples the creation of the object from the implementation, lets you create an object whose class is actually determined at runtime.<br>Also, using the *Factory* pattern reduces the exposed surface area when compared to exposing the class, thus providing better encapsulation and information hiding. <br>Protects consumer code against changes on the classes it leverages. |
| Creational | [**Builder**](#builder) | Simplifies the creation (or invocation) of complex objects (or functions) by providing a fluent interface which which allows you to build (or invoke) the object (or function) step by step. | `const db = new Db().setName(dbName).build()` |Greatly simplifies *DX*, as the fluent interface is simple to read and self-documenting.<br>The implementation consists in encapsulating parameter setting related login into setter methods. |
| Creational | [**Revealing Constructor**](#revealing-constructor) | Expose certain private functionality of an object to the consumer only at the time of creation, making them completely inaccessible once the object is created. | `const db = new Database((dbConfig) => {...})` | The pattern consists in defining a constructor which accepts as argument a function that will receive the private properties that will be accessible during creation.<br>This pattern provides strong guarantees regarding encapsulation and information hiding. |
| Creational | [**Singleton**](#singleton) | Enforces the presence of only once instance of a class and centralizes access to it. | `export const db = new Database(dbName)` |This pattern are great for sharing stateful information and synchronizing access to a resources.<br>You must be aware that multiple incompatible versions of a module might end up creating multiple *singleton instances* (one per incompatible version). |
| Dependency Wiring | [**Singleton dependencies**](#singleton-dependencies) | Leverages the module system to provide the dependencies ofa  module as *Singletons*, which ensures the correct wiring even for stateful dependencies. | `import { db } from 'db.js'` | Very simple to implement, but creates tight coupling between a module and its dependencies. |
| Dependency Wiring | [**Dependency Injection**](#dependency-injection) | The dependencies of a component are *provided as inputs* by an external entity. | `const blog = new Blog(db)` | Provides loose coupling between components at the cost of more complex implementation and dependency graph management. |


### Code, Exercises and mini-projects

#### [01 &mdash; *Proxy* pattern: Object composition](01-proxy-object-composition)
Illustrates how to implement a *proxy* using object composition with classes.

#### [02 &mdash; *Proxy* pattern: Object composition with object literals](02-proxy-object-composition-object-literal)
Illustrates how to implement a *proxy* using object composition with object literals instead of classes.

#### [03 &mdash; *Proxy* pattern: *Monkey patching* technique](03-proxy-monkey-patching)
Illustrates how to implement a *proxy* using object augmentation (also known as *monkey patching*).

#### [04 &mdash; *Proxy* pattern: using the built-in `Proxy` object](04-proxy-built-in-proxy)
Illustrates how to implement a *proxy* using the ES2015 `Proxy` object.

#### [05 &mdash; Capabilities of the `Proxy` object](05-built-in-proxy-capabilities)
Illustrates some additional capabilities of the ES2015 `Proxy` object.

#### [06 &mdash; *Proxy* pattern: building a *proxy* on a *Writable* stream](06-proxy-writable-stream)
Illustrates how to apply the *Proxy* pattern by building an object that acts as a proxy to a *Writable* stream using the native `Proxy` technique.

#### [07 &mdash; *Change Observer* pattern: using a *proxy* to create an observable object](07-proxy-change-observer)
Illustrates how to apply the *Proxy* pattern to effectively build the *Change Observer* pattern.

#### [08 &mdash; *Decorator* pattern: using object composition](08-decorator-object-composition)
Illustrates how to implement the *Decorator* pattern using object composition. In the example, a new method `add()` is exposed and the behavior of `divide()` is slightly changed.

#### [09 &mdash; *Decorator* pattern: using *monkey patching* (object augmentation)](09-decorator-monkey-patching)
Illustrates how to implement the *Decorator* pattern using object augmentation (monkey-patching). In the example, a new method `add()` is exposed and the behavior of `divide()` is slightly changed.

#### Exercise 1: [Color Console Factory](./e01-color-console-factory/)
Create a class called `ColorConsole` that has just one empty method called `log()`. Then, create three subclasses: `RedConsole`, `BlueConsole`, and `GreenConsole`. The `log()` method of every `ColorConsole` subclass will accept a string as input and will print that string to the console using the color that gives the name to the class.

### ToDo

[ ] Review https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy to understand of the capabilities of the `Proxy` object.

[ ] Profiler using `Proxy`

[ ] Investigate lazy initialization with proxies

[ ] Include the **Observer pattern** in the cheat sheet:
The **Observer** pattern is another fundamental pattern in the asynchronous world of Node.js. It is the ideal solution for modeling the reactive pattern of Node.js and a perfect complement for callbacks.

> The **Observer** pattern defines an object (called *subject*) that can notify a set of *observers* (or *listeners*) when a change in state occurs.

While the **Callback** pattern when used in a *CPS* style propagate the result of an operation to a single *listener*; the **Observer** can actually notify multiple *observers*.

[ ] Review https://www.reactivemanifesto.org/

[ ] Review https://loopback.io/index.html capabilities