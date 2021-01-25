# 09-ecmascript6-property-value-shorthands
> introducing ES6 Property Value Shorthands

## Description
Illustrates how to use ES6 property value shorthands when we declare one or more properties whose values are references to variables by the same name.

```javascript
const numbers = [1, 2, 3, 4, 5];
const names = ["uno", "dos", "tres", "catorce"];

const namesAndNumbers = { numbers, names };

/* this is effectively the same as */
const namesAndNumbers = { numbers: numbers, names: names };
```