# 06: Advanced Types &mdash; Displaying Error Messages
> using index types to process error messages

## Exercise 6.05

1. Create an `ErrorMessage` type interface with an *index type* `[number]: string`, and an additional numeric property `apiId`.

2. Build an `errorMessage` object of type `ErrorMessage` that models HTTP errors 400 (bad request), 401 (unauthorized), and 403 (forbidden). Give a random number to the `apiId` property.

3. Create a numeric array with the values 400, 401 and 403 and iterate over the `errorMessage` array printing the error message associated to each of the values.