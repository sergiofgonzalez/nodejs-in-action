# Sum 18
> Brute force approach to find the sequence of numbers and operations that produce the number 18

### Description
The purpose is to find the sequence of numbers from a given array of 4 numbers (e.g. `[5, 6, 7, 8]`) and the operations from `+`, `-`, `*` and `/` that must be used so that we obtain a given number, e.g. `18`.

The implementation is based on a brute-force approach, on which all the possible combos of numbers and operations are tried until we get to the result. Also, the operations are tried on a *stack calculator* like the one used in the good-old HP 48 calculators.

For instance, the result: `6 7 8 + 5 / *` means:
```
6 | 6  | 6 | 18 |
7 | 15 | 3 |    |
8 | 5  | * |    |
+ | /  |   |    |
```

Most of the combination and permutation functions were copied from stackoverflow, and I don't feel to proud of the algorithm either (completely sure this can be rethought using recursion) but it works.