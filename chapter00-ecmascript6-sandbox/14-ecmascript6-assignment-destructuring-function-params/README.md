# 14-ecmascript6-assignment-destructuring-function-params
> introducing ES6 assignment destructuring with function parameters

## Description
Illustrates how to use *ES6 assignment destructuring* with function parameters which might be useful in the following use cases:

### Use Case 1: assigning default values to function params (and not only the last param!)
With assignment destructuring you can declare default values for function parameters:
```javascript
function sumOf(a = 1, b = 2, c = 3) {
  return a + b + c;
}
sumOf(5, undefined, 5); // -> 12
```

And also when the function receives an object:
```javascript
function carFactory(options = { brand: "vw", year: 1999}) {
  console.log(`brand=${options.brand}; year=${options.year}`);
}
```

Note however that in this last case if you provide part of the options object, the missing property won't get the default value:
```javascript
carFactory({brand: "gm"}); // <- brand=gm; year=undefined
```

You can fix that with a little trick:
```javascript
function carFactory({brand = "vw", year = "1990"} = {}) {
  console.log(`brand=${brand}; year=${year}`);
}
```


### Use Case 2: declaring the contract of a function
Using assignment destructuring in function parameters you can *declare* the contract of a function &mdash; that is the shape of the object the function is expecting to receive.

```javascript
// this function requires an object with `brand`, `make` and `model` properties
const getProductModel = ({brand, make, model}) => ({
  sku: `${brand}:${make}:${model}`,
  brand,
  make,
  model
});
```

