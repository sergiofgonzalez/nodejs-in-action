# You don't Know JavaScript &mdash; 02: Scope and Closures
## 51 &mdash; `var` vs. `let`
> Learning the subtle differences between `let` and `var` and when to use each one correctly

### `var` and `let`
A variable that is used across an entire function should be defined as `var`. Argument functions share the same scope as those variables, even when not used in the whole function.

`var` has historically meant *variable that belongs to the whole function. A `var` attaches itself to the nearest enclosing function scope, or to the whole global scope when used outside of any function. Note that it happens even if a `var` is declared in another block:

```javascript
function diff(x, y) {
  if (x > y) {
    var tmp = x;
    x = y;
    y = tmp;
  }
  console.log(`tmp: ${ tmp }`); /* no prob: tmp is function-scoped */
  return y - x;
}
```

As a result of this behavior, it is a good practice to declare `var`s at the top level scope of a function. As a consequence, it is also good practice to use `let` for non-function scoped variable declarations.

Therefore, we should prefer:

```javascript
function diff(x, y) {
  if (x > y) {
    let tmp = x;
    x = y;
    y = tmp;
  }
  console.log(`tmp: ${ tmp }`); /* opps: tmp is no longer function-scoped */
  return y - x;
}
```

Another common usage for `let` is the for-loop, because when using `var` the variable declared in the loop would be attached beyond the scope of the loop:

```javascript
for (var i = 1; i < 5; i++) {
  console.log(String(i).padStart(2, '0'));
}
console.log(i); /* ok, i is attached to the global scope */
```

The only useful case in which you'd like to declare the for loop variable with a var is when you'd like to check the last value of the loop:

```javascript
for (var i = 1; i < 5; i++) {
  if (mustBreak(i)) {
    break;
  }
}
if (i < 5) {
  console.log(`We broke out of the loop early`);
}
```

However, it is much clearer semantically, if we'd use a variable:
```javascript
var lastI;

for (let i = 0; i < 5; i++) {
  lastI = i;
  if (mustBreak(i)) {
    break;
  }
}

if (lastI < 5) {
  console.log(`We broke out of the loop early`);
}
```


## You don't know JS Examples
All the examples in this section are taken from https://github.com/getify/You-Dont-Know-JS, book 2 on [Scopes & Closures](https://github.com/getify/You-Dont-Know-JS/tree/2nd-ed/scope-closures).

Especifically, the summary and examples are based on the section [`var` and `let`](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch6.md#var-and-let) section.