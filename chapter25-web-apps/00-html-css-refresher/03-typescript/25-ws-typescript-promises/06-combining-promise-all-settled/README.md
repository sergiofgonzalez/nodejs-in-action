# 06: Using promises in TypeScript &mdash; Combining `Promise.all` and `Promise.allSettled`
> illustrates how to combine `Promise.all` and `Promise.allSettled`

## Exercise 12.3
In this exercise, we want to aggregate multiple results of calling `getValue`.

That is:
+ We want to keep `generateTotal`, in which we use `Promise.allSettled` to generate a total even when some individual value generation might fail.
+ We want to create a new function `doProcess`, in which we use `Promise.all` to obtain the result of invoking `generateTotal` three times.

Note that during the process, we will need to introduce a small modification in `generateTotal`, as it was not returning any value.

The proper way to do so requires two things:
+ make the `then` clause return the classified results.
+ make the `generateTotal` function return the result of `Promise.allSettled`, which will effectively make the function return the classified results.