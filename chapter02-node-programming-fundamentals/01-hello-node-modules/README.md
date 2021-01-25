# 01-hello-node-modules
> the basics of creating and consuming Node.js modules

## Description
A module `currency.js` is created to convert from Euros to Rupees and vice versa. The functionality exported from the module is then leveraged by the application.

In the example, the module needs to export two functions to the consumers (to convert from one currency to another and vice versa), and therefore, the `exports` object is used twice to make the two functions available:

```javascript
exports.fnName1 = function (param1) {
  // implementation for fn1
};

exports.fnName2 = function (param2) {
  // implementation for fn2
};
```
