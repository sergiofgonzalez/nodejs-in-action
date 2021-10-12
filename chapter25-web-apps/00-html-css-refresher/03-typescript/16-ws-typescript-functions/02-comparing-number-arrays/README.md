# 02: TypeScript functions &mdash; Comparing number arrays
> Illustrates how to create a function that compares arrays

## Exercise 3.02

TypeScript comparison operators such as `===` and `>` only work on primitive types. If we want to compare more complex types such as arrays or objects we either need to use a library or implement our own comparison functions.

In this exercise you'll build a library to compare number arrays. The goal is to compare the array elements without minding their actual position, so that the comparison of `[1, 2]` and `[2, 1]` should render `true`.

1. Define the following arrays in your program (you will use them for testing the results)

```typescript
const arrayOne = [7, 6, 8, 9, 2, 25];
const arrayTwo = [6, 8, 9, 2, 25];
const arrayThree = [6, 8, 9, 2, 25, 7];
```

2. Define the function `arrayCompare` that will take two parameters (both of them arrays of numbers) and return a boolean.

3. Implement the function taking into account the following hints:
  + you should first perform a length check (if the length does not match, the arrays will be different).
  + then you should sort the arrays
  + finally, implement a loop to compare element by element

| NOTE: |
| :---- |
| Note that `Array.sort` sorts the arrays in a mutable way, but that the original arrays are not affected. When invoking `arrayCompare(arrayOne, arrayThree)` copies of the arrays are created. |