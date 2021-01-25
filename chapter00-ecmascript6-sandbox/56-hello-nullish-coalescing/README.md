# 56 &mdash; Hello, Nullish Coalescing
> Introducing nullish coalescing

## Description
The *nullish coalescing operator* `??` is a logical operator that returns its right-hand side operand when its left-hand side operand is `null` or `undefined`, and otherwise return its left-hand side operand.

This operator provides a more robust solution for assigning default values to variables than `||`, as the latter can lead to unexpected behaviors when the left-hand side of the expression is *falsy*.

```javascript
const leftHand = 0;
let value = leftHand || 'default';  // -> value == 'default'

value = leftHand ?? 'default';      // -> value == '0'
```