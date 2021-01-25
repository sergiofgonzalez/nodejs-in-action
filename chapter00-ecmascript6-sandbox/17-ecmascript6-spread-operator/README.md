# 17-ecmascript6-spread-operator
> illustrates how to use the spread `...` operator 

## Description
The spread operator `...` lets you perform the following actions:

### use 1: convert an iterable object into an array
```javascript
function toArray() {
  return [...arguments];
}

toArray("a", "b", "c"); // <- ["a", "b", "c"]
```

### use 2: flatten arrays
```javascript
const all = [1, ...[2, 3, 4], 5]; // <- [1, 2, 3, 4, 5]
```

### use 3: getting the codepoints from a string
```javascript
[..."abc"]; // <- ["a", "b", "c"]
```

### use 4: getting specific items from array
When combined with assignment destructuring lets you get specific items from array
```javascript
const [first, second, ...rest] = ["a", "b", "c", "d", "e"];
```

### use 5: alternative simpler syntax for bind
This use case i don't understand *yet*.
```javascript
const date = new Date(...[2015, 11, 31]); // alternative is: new (Date.bind.apply(Date, [null, 2015, 11, 31]));
```

