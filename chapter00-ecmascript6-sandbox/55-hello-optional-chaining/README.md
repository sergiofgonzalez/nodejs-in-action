# 55 &mdash; Hello, Optional Chaining
> Introducing Optional Chaining feature

## Description
The optional chaining operation `?.` permits reading the value of a property located deep within a chain of connected objects without having to expressly validate that each reference in the chain is valid.

Thus, in essence, the `?.` is the same as `.` except that instead of causing an error if a reference is *nullish*, the expession is short-circuited and `undefined` is returned.

Note that `?.` can also be used on methods by placing the operator before the parentheses as in:

```javascript
 console.log(obj.nonExistentMethod?.()); // -> undefined
```