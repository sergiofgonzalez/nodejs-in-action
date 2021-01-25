# You don't Know JavaScript &mdash; 02: Scope and Closures
## 54 &mdash; Function Declarations in Blocks
> practising function declarations in blocks

### Function Declarations In Blocks
Consider the following block of code:

```javascript
if (false) {
  function ask() {
    console.log('Does this run?');
  }
}
ask();
```
According to the JavaScript specs, the piece of code should fail with a `ReferenceError`, because the `ask` identifier is block-scoped to the `if` block scope and thus it is isn't available in the outer scope. However, some of the JavaScript engines will throw a `TypeError` (as in the identier `ask` exists, but as the block is not executed, it is undefined at the time of calling).

One of the most common use cases for placing a function within a block is to implement a function differently depending on a certain condition:

```javascript
if (typeof Array.isArray != 'undefined') {
  function isArray(a) {
    return Array.isArray(a);
  }
} else {
  function isArray(a) {
    return Object.prototype.toString.call(a) == '[object Array]'; 
  }
}
```

However, function in blocks is quite an obscure feature, so it's much better to avoid it at all, and use function expressions instead:

```javascript
var isArray = function isArray(a) {
  return Array.isArray(a);
}

if (typeof Array.isArray == 'undefined') {
  isArray = function isArray(a) {
    return Object.prototype.toString.call(a) == '[object Array]';
  }
}
```


## You don't know JS Examples
All the examples in this section are taken from https://github.com/getify/You-Dont-Know-JS, book 2 on [Scopes & Closures](https://github.com/getify/You-Dont-Know-JS/tree/2nd-ed/scope-closures).

Especifically, the summary and examples are based on the section [Function Declarations in Blocks](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch6.md#function-declarations-in-blocks-fib) section.