# 16-ecmascript6-rest-parameters
> illustrates how to use the rest parameters

## Description
The rest operator `...` is the new ES6 way of handling a variable argument list.

```javascript
function prettyJoin(delim, ...words) {
  return words.join(delim);
}

prettyJoin(".", "one", "two", "three"); // <- one.two.three
```