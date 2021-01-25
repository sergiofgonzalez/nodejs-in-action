# You don't Know JavaScript &mdash; 01: Get Started
## 39 &mdash; Comparisons
> Grokking comparisons and equality in JS

### The strict equality operator `===`

The `===` operator checks both the type and the value. Therefore, comparisons such as `5 === '5'` will render `false`. However, for historical reasons, there are a couple of cases on which `===` does not behave as expected:

```javascript
NaN === NaN; // false
0 === -0; // true: -0 should be a distinct value from 0
```

| NOTE: |
| :--- |
| Note that linters will catch those usages, so you don't inadvertently use them in your programs. Alternatively, you can use `Object.is(val1, val2)` which can be seen as a *quadruple equals* as it will give the expected results under all circumstances. |

In object (and arrays), `===` checks for identity equality &mdash; it will return true only if the object reference is the same for both sides of the comparison.

In JS, all object values are held by reference, so when you do:
```javascript
let x = [1, 2, 3];

let y = x;
```

You're actually copying the reference.

### The loose equality operator `==` (and other comparisons)

JavaScript also allows you do to *coercive comparisons*, where *coercion* means a value of one type being converted to its respective representation in another type to whatever extent possible.

In order to do that, you have to use the `==` operator, sometimes called the *loose equality* operator. That operator will return the same results as `===` provided that the types on both sides of the comparison are the same. However, if the types are different the `==` operator will perform type coercion so that `42 == '42'`.

It must be noted that relational operators such as `<` and `>` will do type coercion (generally to numbers) when the types to the left and right of the operator differ.

Relational operators use numeric comparisons except in the case where both values being compared are strings &mdash; in this case they use alphabetical comparison.

```javascript
let x = '10';
let y = '9';

x < y;
```

There's no way to disable type coercion in comparisons &mdash; it is better to understand how they work so that you don't get surprised.

## You don't know JS Examples
All the examples in this section are taken from https://github.com/getify/You-Dont-Know-JS.
Especifically, this example is based on [Comparisons](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/get-started/ch2.md#comparisons).

