# You don't Know JavaScript &mdash; 01: Get Started
## 44 &mdash; `this`
> A refresher on `this` keyword

### `this`
When a function is defined, it is attached to its enclosing scope via the *closure* mechanism. *Scope* is the set of rules that controls how references to variables are resolved.

Besides, each function has an *execution context*, which is exposed to the function through the `this` keyword. The *scope* of the function is static (the set of variables available at the moment and location where the function is defined), while the *execution context* is dynamic, as it depends on how the function is called.
That's why `this` is not a fixed characteristic, as it happens in other programming languages.

One way to rationalize it is to think about the *execution context* as an object whose properties are made available to a function while it executes.

For example:

```javascript
function classroom(teacher) {
  return function study() {
    // teaches is part of scope, this.topic is part of the execution context
    console.log(`${ teacher } says to study ${ this.topic }`);
  };
}

const assignment = classroom('Mario');
```

That scope can be provided in two different ways:
+ You can explicitly create an execution context for the function, so that `this.topic` is found when executing the function.
```javascript
const homework = {
  topic: 'Maths',
  assignment
};

homework.assignment(); // this.topic will resolve as 'Maths'
```
+ You can use `Function.call` which will let you provide an execution context for your function as an argument.
```javascript
const homework = { topic: 'Physics' };
assignment.call(homework); // this.topic will resolve as 'Physics'
```

## You don't know JS Examples
All the examples in this section are taken from https://github.com/getify/You-Dont-Know-JS.
Especifically, this example is based on [`this` Keyword](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/get-started/ch3.md#this-keyword) section.
