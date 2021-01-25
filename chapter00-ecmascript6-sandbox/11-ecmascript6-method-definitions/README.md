# 11-ecmascript6-method-definitions
> introducing ES6 style method definitions

## Description
Illustrates how to use *ES6 method definitions* which let you use a special syntax that omits the `function` keyword when creating methods on JavaScript objects.

In the example, a basic *event emitter* is defined using both ES5 and ES6 syntax.

```javascript
const jsObject = {
  methodA(param1, param2, param3) {
    ...
  },
  methodB(param1, param2) {
    ...
  }
}

```