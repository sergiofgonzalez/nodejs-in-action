# 03: Interfaces and inheritance in TypeScript &mdash; Creating interfaces for a function that updates a user database
> Learning how to create interfaces for functions

## Exercise 5.03

You are assigned the task of building an interface for a function that will update a user database.

The requirements are:
> The function should take an argument of the `User` type, which consists of `email` (string) and `userId` (number) properties, and must return a collection of existing users.

1. Define the type `User` according to the specs above.

2. Define the interface `SuperAddMe` for the function described above.

3. Define a standalone function `addUser` that conforms to the `SuperAddMe` interface. You might want to create an array of `User` objects and make the function return the collection of such objects including the one passed as an argument.

4. Validate that the function works as expected.