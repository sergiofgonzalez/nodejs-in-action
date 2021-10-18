# 02: Interfaces and inheritance in TypeScript &mdash; Implementing interfaces
>

## Exercise 5.01

In this exercise you will implement an interface on an object and class. You will construct a class that manages product objects and use interfaces to enforce rules related to how our class should be implemented. You will also use interface to shape your product object and class methods.

1. Create an interface `ProductObjectTemplate` with three data properties `height` and `width` (numeric) and `color` (string).

2. Create a interface `ProductFunctionTemplate` for a function receiving a `ProductObjectTemplate` instance.

3. Create an interface called `ProductClassTemplate` with two methods:
  + `makeProduct` of type `ProductFunctionTemplate`.
  + `allProducts` that receives nothing and returns an array of `ProductObjectTemplate[]`.

4. Create a `Product` class that implements `ProductClassTemplate`. The class will feature a `products` property that is initialized with an empty array of `ProductObjectTemplate` objects. The function `makeProduct` will push the product received as argument into the `products` array, and the `allProducts` method will return the currently help products.

5. Create an instance of `ProductClassTemplate`. Immediately after invoke `makeProduct` passing an object literal that conforms to the `ProductObjectTemplate` interface.

6. Invoke `allProducts` to validate that everything is working as expected.