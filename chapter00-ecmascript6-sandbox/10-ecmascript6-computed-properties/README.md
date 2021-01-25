# 10-ecmascript6-computed-properties
> introducing ES6 Computed Properties

## Description
Illustrates how to use *ES6 computed properties* which let you define object properties whose key is not fixed until runtime as if they were static using the syntax `[key]: value`

```javascript
const instance1 = {
  id: "rg0ODgpizbfsqQ",
  name: "instance1",
  value: 10,
  createdAt: new Date()
};

const instance2 = {
  id: "0MsC0nwal5FhTQ",
  name: "instance2",
  value: 20,
  createdAt: new Date()
};

const instancesMap = {
  [instance1.id]: instance1,
  [instance2.id]: instance2
};
```