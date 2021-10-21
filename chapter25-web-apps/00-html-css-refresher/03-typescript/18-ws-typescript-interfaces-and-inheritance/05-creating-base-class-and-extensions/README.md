# 05: Interfaces and inheritance in TypeScript &mdash; Creating a base class and two extended classes
> playing with inheritance in TypeScript in an example that creates a user class hierarchy

## Exercise 5.04

In this exercise you have the task of building classes that represent a user in an application for a supermarket chain.

You will build a class with the common attributes a user will have, and extended classes to tailor the needs of specific use cases:

1. Create a `User` class featuring two private string properties `username` and `token`, and a readonly property `timestamp` which will be initialized to `new Date().getTime()`.

2. Define a constructor for the `User` class that receives the username and the token.

3. Add a `logOut()` method in the `User` class that cleans out the `username` and `token` properties.

4. Define a `getUser()` class that returns an object literal with the `username`, `token` and `createdAt` properties. By doing so, you are providing an indirect reference to the instance, rather than direct access to the underlying properties.

5. Define a protected method `renewToken(...)` that updates the user token with the value received as an argument.

6. Define a `Cashier` class that inherits from `User`. It should feature two additional properties `balance` and `float` (both numeric), that are initialized in a method `start()`.

7. Create an `Inventory` class that inherits from `User`. It will feature an array of products (as `string[]` for simplicity). In this case, define a constructor that will receive the inventory products as an argument (along with the required parameters to instantiate an user).

8. Create a `FloorWorker` class that extends from `Inventory`. This type of user will feature a `floorStock` property that represents the products that have been taken from the inventory to the floor. Define a `checkOut(id: number)` that is in charge of populating the local `floorStock` property from the `products` property inherited from the inventory.

9. Validate the functionality of the application:
  + create a `User` instance
  + create a `Cashier` instance and invoke the `start` method
  + create an `Inventory` instance, initialize the products with `orange`, `mango` and `plum` products.
  + create a `FloorWorker` instance, initialize the products with `orange`, `mango` and `plum`. Invoke `checkOut` to retrieve oranges and plums. Make sure the application does not crash when passing as argument an invalid `id`.