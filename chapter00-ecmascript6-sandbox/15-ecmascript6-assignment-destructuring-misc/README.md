# 15-ecmascript6-assignment-destructuring-misc
> uses cases where assignment destructuring is specially useful 

## Description
The following scenarios are specially useful for assignment destructuring:

### Use Case 1: making clear what are the variables we need from a function result

```javascript
function getComplexObject() {
  return {
    num: 5,
    word: "hello",
    bool: true,
    fn: () => console.log(`hello`)
  };
}

const {num, word} = getComplexObject(); // we don't care about the other properties
```

### Use Case 2: providing default values for functions

```javascript
function getRandomBetween({min = 1, max = 6} = {}) {
  return Math.floor(Math.random() * (max - min) + min);
}
```

### Use Case 3: getting results from regEx

```javascript
function splitDate(date = "1970-01-01") {
  const rdate = /(\d+).(\d+).(\d+)/;
  return rdate.exec(date);
}

const [, year, month, day] = splitDate("1974-02-05");
```