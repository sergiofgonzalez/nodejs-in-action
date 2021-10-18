# e01: TypeScript classes and objects &mdash; Creating a user model using classes, objects, and interfaces
> illustrating the definition of classes, interfaces and objects

## Activity 4.01

In this activity, you will build a user authentication system that mimics how an application would pass login data to a backend API to register and sign users. This will entail building several classes and combining classes together to mimic an authentication flow.

1. Create a `Login` class that takes in an object containing the attributes `email` and `password` of type `string`.

2. Build an interface `ILogin` that defines the `email` and `password` attributes. Use it in the constructor of the `Login` class.

3. Create and `Auth` class that takes in an object containing the attributes `user` and `source` of type `Login` and `string` respectively.

4. Build an interface `IAuth` that defines the `user` and `source` attributes of type `Login` and `string` respectively. Use int in the constructor of the `Auth` class.

5. Add a `validUser()` method that returns a boolean. The method must return true if `email` is equal to `admin@example.com` and `password` is equal to `secret123`.

6. Validate that the program works as expected by creating two users (`goodUser`, `badUser`) and two `Auth` instances bound to each of the users. The first user must be created with `email`  equal to `admin@example.com` and `password` equal to `secret123`, and the `badUser` with some other data. Validate that the invocation of `validUser()` works for the `goodUser` but fails for `badUser`.

onst auth = new Auth({
  source: 'Yammer',
  user: {
    email: 'admin@example.com',
    password: 'secret123'
  }
});

console.log(`Validating user sourced from ${ auth.source }: ${ auth.validUser() }`);

auth.user.password = 'tiger123';
console.log(`Validating user sourced from ${ auth.source }: ${ auth.validUser() }`);