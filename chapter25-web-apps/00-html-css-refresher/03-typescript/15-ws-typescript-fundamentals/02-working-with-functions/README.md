# 02: TypeScript Fundamentals &mdash; Working with functions in TypeScript
> define a simple function and see how you can and can't invoke it.

## Exercise 1.02
Develop a string utility that shortens a string to a snippet by cutting off the text after a given length, but taking care that you don't chop a word in half. If the string is larger than the maximum length you'll add an ellipsis (`...`) to the end.

1. Define the function signature as:
```typescript
function snippet(text: string, length: number): string
```

2. Within the function body, make sure you return the received string if its length is less than the received `length` parameter.

3. If the text length is larger than the given length, find the sub string that you would be able to return (whose length should be the given `length` minus the length of the ellipsis).

4. Find the boundary of the last word by checking if the last character is a space. If it's not, make the necessary arrangements.

5. Append the ellipsis and return the string.

Then validate:
+ the function correct call and usage
+ that the function cannot be called:
  + if the second parameter is missing
  + if the first parameter is of incorrect type
  + if the second parameter is of incorrect type
  + if the return of the function is assigned to a variable of the incorrect type