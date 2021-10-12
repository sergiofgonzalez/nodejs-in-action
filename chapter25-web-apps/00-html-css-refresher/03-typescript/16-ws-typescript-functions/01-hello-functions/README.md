# 01: TypeScript functions &mdash; Getting started with functions in TypeScript
> Illustrates how a program can be simplified by creating the same program with and without functions. In the example, logic to calculate the average and standard deviation of an array of numbers is created.

## Exercise 3.01

You will create a program that calculates an average. To illustrate the importance of structuring the programs with functions, you will first create the program without functions, then you will rewrite it again using functions.

1. Define the following array in your program:

```typescript
const values = [8, 42, 99, 161];
```

2. Without defining/using functions calculate the average of the `values` array.

3. Without defining/using functions calculate the standard deviation of the `values` array. To calculate the standard deviation you need to:
  + calculate the square differences between the elements in the array and the average. That is, for each element of the array you have to do: `(a[i] - avg)^2`.
  + the standard deviation is the average of the square differences.

4. Repeat the exercise this time leveraging functions. Start by calculating the average using `Array.reduce()`.

5. Then compute the standard deviation using `Array.map()` and the average function defined in step 4.

6. Compare the results and execution time of both approaches.