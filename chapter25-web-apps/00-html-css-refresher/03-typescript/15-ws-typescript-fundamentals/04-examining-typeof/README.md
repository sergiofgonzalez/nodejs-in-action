# 04: TypeScript Fundamentals &mdash; Examining `typeof`
> illustrates how to use `typeof` and analyses the responses for different types of variables.

## Exercise 1.04
1. Define the following variables in your program:

```typescript
const daysInWeek = 7;
const name = 'Ada Lovelace';
const isRaining = false;
const today = new Date();
const months = ['January', 'February', 'March'];
const notDefined = undefined;
const nothing = null;
const add = (x: number, y: number) => x + y;
const calculator = {
  add
};
```

2. Add all variables into a containing array.

3. Loop all the variables on the array calling `typeof` for each of the variables. Show also the contents of the corresponding variable.
