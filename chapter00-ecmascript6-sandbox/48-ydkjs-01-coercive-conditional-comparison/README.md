# You don't Know JavaScript &mdash; 01: Get Started
## 48 &mdash; Coercive Conditional Comparison
> Discussing how comparisons work in `if`, the ternary operator, `while` and `for` loops

### What type of comparison is used in *test* clauses?

`if`, the ternary statements, as well as the test clauses for `while` and `for` loops perform an implicit value comparison that can be aligned to the following mental model:

```javascript
const x = ...
if (Boolean(x) === true) {

}
```

But it is not 100% accurate, as the following statement won't run:
```javascript
let x = 'hello';
if (x == true) {
  // won't run, even when Boolean('hello') returns true
}
```



## You don't know JS Examples
All the examples in this section are taken from https://github.com/getify/You-Dont-Know-JS.
Especifically, this example is based on [Coercive Conditional Comparison](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/get-started/apA.md#coercive-conditional-comparison) section.
