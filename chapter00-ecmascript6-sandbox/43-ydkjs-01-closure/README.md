# You don't Know JavaScript &mdash; 01: Get Started
## 43 &mdash; Closure
> A refresher on closures

### Closures
*Closure* is when a function remembers and continues to access variables from outside its scope, even when the function is executed in a different scope.

Thus:
+ a closure is part of the nature of a function &mdash; objects don't get closures
+ to observe a closure, you must execute a function in a different scope than where that function was originally defined.

Closure is a natural result of lexical scope when the language has functions as first-class values, as JavaScript does. When a function makes a reference to variables from an outer scope, and that function is passed around as a value and executed in other scopes, it maintains access to its original scope variables: that is a closure.

| NOTE: |
| :--- |
| Lexical scope is the mechanism that ensures that only variables at the same level of scope nesting, or in outer scopes are accessible, while variables from inner scopes are hidden. |

In the following example:

```javascript
function greeting(msg) {
  return function who(name) {
    console.log(`${ msg }, ${ name }!`);
  };
}

let hello = greeting('hello');
```

When the `greeting()` function is executed, an instance of the inner function `who()` is created, and that function *closes over* the `msg` variable. No matter when we execute the `hello()` function, it will always remember that originally it *closed over* `'hello'`.

Note that closures don't make copies of the values over which the function has closed over &mdash; rather, they keep a link to the original variable. Therefore, you can actually observe or make updates to these variables over time, as seen on the example below:

```javascript
/* closures don't make copies of the variables they close over, they keep references to them */
function counter(step = 1) {
  let count = 0;
  return function increaseCount() {
  // increaseCount closes over `count` and `step` so that they can be read and modified
  count += step;7
    return count;
  };
}
```

Closures are common on asynchronous code:

```javascript
function doSomethingAfterSomeTime(msg) {
  // the callback closes over `msg`
  setTimeout(() => {
    console.log(`Howdy, I was told to display this message after 2 seconds: ${ msg }`);
  }, 2000);
}
```

Note that it's not necessary that the outer scope is a function &mdash; it suffices to have at least one variable in an outer scope accessed from an inner function:

```javascript
const done = false;
if (!done) {
  let msg = `Hello to Jason Isaacs`;
  // the callback closes over `msg`
  setTimeout(() => {
    console.log(msg);
  }, 4000);
}
```

## You don't know JS Examples
All the examples in this section are taken from https://github.com/getify/You-Dont-Know-JS.
Especifically, this example is based on [Closure](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/get-started/ch3.md#closure) section.
