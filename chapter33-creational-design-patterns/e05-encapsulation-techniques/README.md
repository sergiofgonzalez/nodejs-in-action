# Part 4: Node.js avanced patterns and techniques
## Chapter 33 &mdash; Creational design patterns
### Exercise 5: Encapsulation techniques
We learnt in the concepts section that there are several techniques available in JavaScript for encapsulation (and information hiding) of private properties and methods.

This exercise provides simple examples of all these techniques:
+ using closures
+ using private class fields (using the hashbang `#` prefix).
+ Using weakmaps https://fitzgeraldnick.com/2014/01/13/hiding-implementation-details-with-e6-weakmaps.html
+ Using symbols https://2ality.com/2016/01/private-data-classes.html#using-symbols-as-keys-for-private-properties
+ Defining private variables in a constructor https://www.crockford.com/javascript/private.html (this is considered legacy, but it is also the best known approach)
+ Using conventions, like prefixing the property name with `_` to indicate it is private.

#### Using closures ⭐⭐

You have a self-explainable example in [rabbit.js](app/src/lib/rabbit.js). The pattern consists in creating a *factory* function that returns an object's public API. The private properties and methods are defined as an object literal within the function that defines the factory.

In [main.js](app/src/main.js), the `encapsulationWithClosures()` illustrates how the private properties and methods of the object are not accessible from the consumer of the factory.

#### Using private class fields ⭐⭐⭐

Please review [person.js](app/src/lib/person.js) where a class with private properties and methods are created. The function `encapsulationWithPrivateFieldsAndMethods()` in [main.js](app/src/main.js) illustrates how to use it.

#### Using *WeakMaps* ⭐⭐
`WeakMaps` were a new feature introduced with *ES6* that can be utilized to hide private implementation data and methods from consumers of the public API we choose to expose.

You can review [car.js](app/src/lib/car.js) for an example.

Note that the idea is to:
+ Keep private data and methods inside the object stored in the `privates` *WeakMap*.
+ Everything exposed on the instance will be public, but everything else will be inaccessible from the outside because `privates` isn't exported from the module.

*WeakMaps* are used instead of normal *Maps* so that they neither hold onto references and leak memory, nor need to introduce manual object lifetime management.

#### Using *Symbols* ⭐⭐

The data type *symbol* is a primitive data type. The `Symbol()` function returns a value of type `symbol`, has static properties that expose several members of built-in objects, has static methods that expose the global symbol registry, and resembles a built-in object class, but is incomplete as a constructor because it does not support the syntax `new Symbol()`.

Every *symbol* returned from `Symbol()` is unique. As a consequence, a *symbol* may be used as an object identifier for object properties.
> The *symbol* data type's primary purpose is to be used as an object identifier for object properties (see example below).

It can also be used to enable *opaque data types*, or as a service to obtain generic unique identifiers.

You can create new *symbols* using:

```javascript
const symbol1 = Symbol()
const symbol2 = Symbol('foo')
const symbol3 = Symbol('foo')

symbol2 === symbol3 // => false
console.log(symbol2); // => 'Symbol(foo)'
console.log(symbol3); // => 'Symbol(foo)'
console.log(symbol3.description); // 'foo'
```

Note that `Symbol()` will return a new *symbol* each time it is called, even when using the same argument.

| NOTE: |
| :---- |
| Using the `typeof` operator on *symbols* return `'symbol'`.

The way to use *Symbols* to store private data can be seen in [countdown.js](app/src/lib/countdown.js):

```javascript
const counterSymbol = Symbol('counter');
const actionSymbol = Symbol('action');

export class Countdown {
  constructor(counter, action) {
    this[counterSymbol] = counter;
    this[actionSymbol] = action;
  }

  dec() {
    if (this[counterSymbol] < 1) {
      return;
    }
    this[counterSymbol]--;
    if (this[counterSymbol] === 0) {
      this[actionSymbol]();
    }
  }

  get counter() {
    return this[counterSymbol];
  }
}
```

Each symbol is unique, which is a strong guarantee againts property key clashing. Additionally, *symbols* are somewhat hidden from the outside world, so that consumers of the public API won't have it easy to interact with those properties.

Note however, that there will be ways to interact with those:

```javascript
const [ counterSymbol ] = Reflect.ownKeys(countdown);
console.log(countdown[counterSymbol]++);
console.log(countdown.counter); // we've incremented the private property
```

#### Defining private variables in a constructor ⭐
We know that the members of an object in JavaScript are all public members, however, using the old-style of defining objects (before classes were included into the language) it is possible to define public, private and privileged methods.

However, the syntax is quite confusing for today's JavaScript.

You can review the code for [container.js](app/src/lib/container.js) to understand the ins and outs of this solution:

```javascript
export function Container(param) {

  /* private method */
  function dec() {
    if (secret > 0) {
      secret--;
      return true;
    } else {
      return false;
    }
  }

  /* public method */
  this.service = function (line) {
    console.log(line);
    return dec() ? `${ secret } usage(s) remaining` : 'object drained';
  };

  /* public property */
  this.member = param;

  /* private property */
  let secret = 3;

  // private methods like dec() can be called within the constructor
  dec();
}

/* public method */
Container.prototype.toString = function () {
  //return `param=${ this.param }; secret=${ secret }`; // nope, public methods do not have access to private properties or methods
  return `param=${ this.member }`;
};

/* another public method making use of a privileged method */
Container.prototype.use = function (line) {
  return this.service(line);
};
```

Note that:
+ private methods are defined as functions withing the constructor function. This is a shorthand for `var publicMethod = function publicMethod() { ... }` (remember, functions are objects in JavaScript). These methods can only be called within the constructor function, or from other private and privileged methods. It has access to public and private properties.
+ privileged methods can access private properties and methods, and can be invoked from the outside.
+ public methods are defined on the object prototype, and only have access to the object's public properties.

In summary, the patterns to define those are:

##### public

```javascript
function Constructor(...) {
  this.property = value;
}

Constructor.prototype.publicMethodOrProperty = value;
```

##### private

```javascript
function Constructor(...) {
  const that = this;
  const privateProperty = value;

  function privateMethod(...) {
    ....
  }
}
```

##### privileged

```javascript
function Constructor(...) {
  this.privilegedMethod = function(...) {
    ...
  };
}
```
#### Using conventions (prefixing private properties with `_`) ⭐
This is a good solution when you can trust the consumers of your API. However, it does not provide any guarantee that your consumers will behave and might end up breaking down your module.