# You don't Know JavaScript &mdash; 02: Scope and Closures
## 51 &mdash; `catch` scope
> learning about the `catch` scope

### `catch` scope
The `catch` block from the `try..catch` statement has an additional block-scoping declaration capability.

```javascript
try {
  doesntExist();
} catch (err) {
  console.log(err);
  let onlyHere = true;
  var outerVar = true;
}

console.log(outerVar);  // OK
console.log(onlyHere);  // oops: only attached to the catch-block scope
console.log(err);       // oops: only attached to the catch-block scope
```

Note that in recent versions of JavaScript (ES2019) the variable declaration on a `catch` block is no longer mandatory. This removes the creation of an additional scope when it is not needed.

```javascript
try {
  doesntExist();
} catch { // no longer a scope
  recoverFromError(); 
}
```

## You don't know JS Examples
All the examples in this section are taken from https://github.com/getify/You-Dont-Know-JS, book 2 on [Scopes & Closures](https://github.com/getify/You-Dont-Know-JS/tree/2nd-ed/scope-closures).

Especifically, the summary and examples are based on the section [What's the Catch](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch6.md#whats-the-catch) section.