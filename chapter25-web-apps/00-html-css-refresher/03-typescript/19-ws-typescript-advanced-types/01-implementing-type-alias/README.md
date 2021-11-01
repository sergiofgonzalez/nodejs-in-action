# 01: Advanced Types &mdash; Implementing a type alias
> introducing type aliases for primitive types and objects

## Exercise 6.01

You are working on a shopping application and when the inventory manager adds a product to the inventory, you need to push your product to the existing array of products.

You will be defining a `Product` model once, and reuse it throughout your code.

1. Create a primitive type alias `Id` that will be used to identify the number of available products in the inventory.

2. Create an object type alias `Product` with properties, `name` (string), `id` (Id), `price` (number), `amount` (number).

3. Create an empty array to hold the list of products in the inventory.

4. Create a function `makeProduct` that takes a `Product` as an argument and adds it to the list of products of the inventory.

5. Create a piece of code consisting in a loop that creates 5 products with name `Product_${i}` where `i` is the index of the loop.

6. Print out the contents of the array.