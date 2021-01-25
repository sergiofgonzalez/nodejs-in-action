# 12-ecmascript6-assignment-destructuring-objects
> introducing ES6 assignment destructuring with objects

## Description
Illustrates how to use *ES6 assignment destructuring* with objects which might be useful in the following use cases:

### Use Case 1: destructuring as a shorthand notation for assignment
*Assignment destructuring* can be used as a shorthand when extracting pieces of objects:
```javascript
const instance = {
  key: "value"
};
const { key } = instance; /* same as const key = instance.key */
```

It also supports extracting several variables:
```javascript
const instance = {
  key: "value",
  otherKey: "some-other-value"
};
const { key, otherKey } = instance;
```

And extracting variables deep nested in the object:
```javascript
const instance = {
  key: "value",
  properties: {
    prop: "some-value"
  }
};
const { properties: { prop } } = instance; /* same as const prop = instance.properties.prop */
```


### Use Case 2: aliasing while destructuring
You can change the variable name while doing the assignment destructuring on objects.

```javascript
const instance = {
  key: "value"
};
const { key: prop } = instance; /* same as const prop = instance.key */
```

### Use Case 3: assigning default values while destructuring
You can assign default values while doing the assignment destructuring on objects to handle the situation where the value is undefined.

```javascript
const instance = {
  key: "value"
};
const { key: prop } = instance; /* same as const prop = instance.key */
```
