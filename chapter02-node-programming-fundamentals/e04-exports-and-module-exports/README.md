# e04-exports-and-module-exports
> illustrating when to use `exports.method = ...` and `module.exports = ...`;

## Description
The example illustrate when to use `exports.method = ...` vs. when to use `module.exports = ...`.

The guidelines are simple:
+ Use `exports.method = ...` when your module exports several symbols (classes or functions) to the consumer:
```javascript
function method1() {
  ...
}

function method2(arg1, arg2) {
  ...
}

exports.fn1 = method1;
exports.fn2 = method2;
```

+ Use `module.exports = ...` when your module exports a single symbol (a class or a function) to the consumer:
```javascript
class MyClass {

}

module.exports = MyClass;
```
