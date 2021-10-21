# e01: Interfaces and inheritance in TypeScript &mdash; Building a user management component using interfaces
> learning how to create object and class interfaces by building a few user related interfaces and classes.

## Activity 5.01

You are working on a web application, and are tasked with building a user management component.

You need to build a class to encapsulate the user management aspects of the application and you must use interfaces to ensure that the code is easy to reuse and support.

The user interface will have at least 3 properties: `email`, `token`, and `loginAt`

1. Create a user object interface with the `email` (string), `loginAt` (number), and `token` (string) properties. The `loginAt` and `token` should be optional.

2. Build a class interface with a global property `user` and use the interface created in the preceding step to apply user object rules. You need to define a `getUser` method that returns the `user` object. Define also a `login` method that take a `user` object and a `password` (string) as arguments, and returns a `User` object.

3. Declare a class `UserClass` that implements the recently created class interface.

4. Confirm that the application works as expected.