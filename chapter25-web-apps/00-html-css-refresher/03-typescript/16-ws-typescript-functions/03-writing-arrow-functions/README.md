# 03: TypeScript functions &mdash; Writing arrow functions
> illustrates how to write and use arrow functions by creating a function that combines the arguments it receives into a function.

## Exercise 3.03

In this exercise you have to create a function that receives 2+ arguments and builds a sentence with them.

The function must have the following signature:

```typescript
(subject: string, verb: string, ...objects: string[]) => string
```

And must be constructed in such a way that conforms to the following transformations:

```typescript
sentence(`the cat`, `ate`, `Apples`, `Cheese`, `Pancakes`); // -> The cat ate apples, cheese, and pancakes.
sentence(`the cat`, `slept`, `all day`); // -> The cat slept all day.
sentence(`the cat`, `Sneezed`); // -> The cat sneezed.
```

Create the functions using the arrow syntax.

### Hints

Structure the program in three functions:
  + `sentence` &mdash; the main function that will return the final result
  + `objectsToArrayFormatter` &mdash; the function that takes the objects, and formats them with commas and adds *and* for the last element if there are more than one object.
  + `capitalize` &mdash; the function that capitalizes the first letter of the sentence and lowercases the remaining letters.