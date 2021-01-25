# 13-ecmascript6-assignment-destructuring-arrays
> introducing ES6 assignment destructuring with arrays

## Description
Illustrates how to use *ES6 assignment destructuring* with arrays which might be useful in the following use cases:

### Use Case 1: destructuring as a shorthand notation for assignment
*Assignment destructuring* can be used as a shorthand when extracting items from an array:
```javascript
const me = ["Sergio", "F.", "Gonzalez"];
const [firstName, middleName, lastName] = me;
```

### Use Case 2: skipping properties while destructuring
You can change the variable name while doing the assignment destructuring on objects.

```javascript
const me = ["Sergio", "F.", "Gonzalez"];
const [firstName, , lastName] = me;
```

### Use Case 3: assigning default values while destructuring
You can assign default values while doing the assignment destructuring on objects to handle the situation where the value is undefined.

```javascript
const me = ["Sergio" ];
const [firstName, surName = "Doe" ] = me;
```
