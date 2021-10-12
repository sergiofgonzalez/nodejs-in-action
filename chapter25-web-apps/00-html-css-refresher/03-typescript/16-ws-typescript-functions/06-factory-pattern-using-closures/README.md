# 06: TypeScript functions &mdash; Factory pattern using closures
> Illustrates how to implement the *Factory pattern* using closures

## Exercise 3.05

In this exercise, you will implement the **Factory pattern** as a function that returns another function that is all set up and ready for use.  You will leverage a closure to make sure that variables can persist between function calls.

In the exercise, we're working on an order system for some sort of clothing. Each order received will specify a quantity of the garment in identical color and size. We have to produce a record of each garment with a unique ID for tracking.

That is, the orders will have the following shape:
+ Order One &mdash; 4 units of size 'M', color red.
+ Order Two &mdash; 7 units of size 'S', color blue.


The function we are implementing, will have to return the following information:

+ Order One: an array of 4 elements, each element being an object with properties `id`, `color` and `size`. The `color` and `size` will be the same for all the elements, while the `id` should be an increasing sequence number.

+ Order Two: an array of 7 elements, each element being an object with properties `id`, `color` and `size`. The `color` and `size` will be the same for all the elements, while the `id` should be an increasing sequence number continuing from the previous order (i.e. first `id` will be 4).