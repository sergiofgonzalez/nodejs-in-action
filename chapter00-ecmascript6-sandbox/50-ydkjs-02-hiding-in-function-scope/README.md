# You don't Know JavaScript &mdash; 02: Scope and Closures
## 50 &mdash; Hiding in Function Scope
> Discussing how comparisons work in `if`, the ternary operator, `while` and `for` loops

### Hiding in Plain (Function) Scope
The example demonstrates a pattern to limit over-exposure of variables in the scope.

In order to illustrate it, we create a factorial function that applies *memoization* to make it more efficient.

| Note: |
| :---- |
| Caching a function's computed output to optimize performance when repeated calls of the same inputs are expected is a *functional programming* technique known as *memorization*. |

The *memoization* consists of creating a variable that caches the result of previous operations:

```javascript
var cache = {};

function factorial(num) {
  if (num < 2) return 1;
  if (!(num in cache)) {
    cache[num] = num * factorial(num - 1);
  }
  return cache[num];
}
```

The problem with this approach is that the `cache` variable is exposed in the global scope which is less than ideal.

The best way to solve it is to wrap the `cache` variable within a function scope:

```javascript
function hideTheCache() {
  var cache = {};

  return factorial; // we're returning the function

  function factorial(num) {
    if (num < 2) return 1;
    if (!(num in cache)) {
      cache[num] = num * factorial(num - 1);
    }
    return cache[num];
  }
}

var factorial = hideTheCache();
console.log(`5! = ${ factorial(5) }`);
```

This solves the over-exposure problem, but the developer experience is far from ideal, as the consumers need to grab the `hideTheCache` function and invoke it.

The ultimate solution is based on using function expressions:

```javascript
var factorial = (() => {
  var cache = {};

  function factorial(num) {
    if (num < 2) return 1;
    if (!(num in cache)) {
      cache[num] = num * factorial(num - 1);
    }
    return cache[num];
  }

  return factorial;
})();

console.log(`5! = ${ factorial(5) }`);
```

In the latter solution, the consumer code is completely unaware of the *memoization* and yet can use the function as if it were the classic factorial function implementation.

The price of such great *DX* is the definition of `factorial` as a function expression initialized to an anonymous function (an anonymous `hideTheCache`) that is immediately invoked as part of the function expression initialization.

### Immediately Invoked Function Expressions (IIFE)

The construct that in the previous section provides a better *DX* is known as *Immediately Invoked Function Expression (or IIFE)*. An *IIFE* is usefult when you want to create a scope to hide variables/functions.

Note that using an IIFE define a scope and therefore, might create unintended consequences depending on the code around it &mdash; creating an IIFE around an arbitrary piece of code might change the behavior of the code it is wrapping:
+ A `return` statement in the arbitrary piece of code will return from the IIFE
+ Non-arrow IIFEs will change the binding of the `this` keyword
+ `break` and `continue` won't operate across an IIFE boundary



## You don't know JS Examples
All the examples in this section are taken from https://github.com/getify/You-Dont-Know-JS, book 2 on [Scopes & Closures](https://github.com/getify/You-Dont-Know-JS/tree/2nd-ed/scope-closures).

Especifically, the summary and examples are based on the section [Hiding in Plain (Function) Scope](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch6.md#hiding-in-plain-function-scope) section.