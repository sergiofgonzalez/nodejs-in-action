# 04: Advanced Types &mdash; Updating the products inventory using an API
> introducing union types

## Exercise 6.04

In this exercise you will work on an inventory management application. The program allows users to add and update products using an API PUT and POST requests respectively.


1. Create a `Product` type alias with fields `name` (string), `price` (number), and `amount` (number).

2. Create a type alias `Post` to represent a request that creates a product. It should have the properties `header`, `method` (strings), and `product`.

3. Create a type alias `Put` to represent a request that updated a product. It should have the properties `header`, `method` (strings), and `product` and `productId`. `productId` represents the product that should be updated.

4. Create a **union type** `Request` for the types `Post` and `Put`.

5. Create an empty array `products` and a function `ProcessRequest()` that receives a request. Within the function, inspect if it is a `Put` or a `Post` and perform the appropriate action.

6. Validate that it works as expected by creating a couple of products, a post and put request and invoking `processRequest`.


| NOTE: |
| :---- |
| The TypeScript compiler complained about the type called `Request`, because it clashed with some jsdom type. As this was a Node.js project, I disabled jsdom by including in `tsconfig.json` the directive `"lib": ["ES2021"]`. |