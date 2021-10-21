# 01: Interfaces and inheritance in TypeScript &mdash; Hello, interfaces!
> writing your first interface to model products

## Description

You're working on an application for warehouse floor workers. One of your first tasks consists in building the product creation classes and functions.

1. Start by creating a `ProductTemplate` interface with three data properties: `height` and `width` (numeric) and `color` (string).

2. Create a function expression `productMaker` that takes in a `ProductTemplate` object type and returns a `ProductTemplate`.

3. Create an object literal `myProduct` that is explicitly annotated as a `ProductTemplate`. Validate that you can successfully call `productMaker()` with that object.

4. Create an object literal `badProduct` that does not conform to the `ProductTemplate` interface, and validate that you cannot call `productMaker()` with that object.

5. Create an object literal `goodProduct` that conforms to the `ProductTemplate` interface but is not explicitly annotated with that type. Validate that you can call `productMaker()` with that object.

6. Create an interface for the `ProductMaker()` function. Create a copy of `productMaker` named `productMaker2` and explicitly annotate the function with the recently created interface. Validate that you can call `productMaker2()` with both `myProduct` and `goodProduct`.

7. Create a new interface `ProductClassInterface` with a `product` property of type `ProductTemplate`, and a `makeProduct()` function that receives a `ProductTemplate` and returns a `ProductTemplate`.

8. Create a class that implements `ProductClassInterface`. Implement the class including a function `makeProduct()` that takes no arguments and returns a `ProductTemplate`. Validate that even when not strictly conforming to the interface (i.e., the method does not take a `ProductTemplate`), you don't get any errors.