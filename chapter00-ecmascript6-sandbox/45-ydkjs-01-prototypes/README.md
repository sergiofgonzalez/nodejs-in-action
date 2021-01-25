# You don't Know JavaScript &mdash; 01: Get Started
## 45 &mdash; Prototypes
> A refresher on prototypes

### Prototypes
The *prototype* concept can be rationalized as a linkage between two objects. This linkage is established when an object *B* is created to another object *A* that already exists.

A series of objects linked together via prototypes is called the *prototype chain*.

The purpose of this linkage from *B* to *A* is to enable *B* to invoke the properties and methods that *B* do not feature to *A*. Therefore, the prototype mechanism can be seen as a *delegation* on which two or more objects cooperate to perform a task.

You can establish the prototype of an object using `Object.create()`:

```javascript
const aObj = {
  prop1: 'value1',
  fn1: fn1() { ... }
}
const bObj = Object.create(aObj);
```

All objects will ultimately have `Object.prototype` as their prototype (which provides built-in methods such as `toString()`, `valueOf()`, etc.). 

You can create a standalone object (that is, one that does not have any prototype) by using `Object.create(null)`.

As you might expect in a delegation relationship, the properties that you defined on *B* having the same name as the ones defined on *A* will shadow the ones from *A*.

### Class Syntax
Note that this approach is discouraged now, as a cleaner approach using the `class` keyword is available. That will make everything work in the same way, but without the nuisances of the prototypal class approach, which is confusing.

## You don't know JS Examples
All the examples in this section are taken from https://github.com/getify/You-Dont-Know-JS.
Especifically, this example is based on [Prototypes](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/get-started/ch3.md#prototypes) section.
