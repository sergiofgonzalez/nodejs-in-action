# 13: Decorators &mdash; Adding and reading metadata in a class and its methods
> illustrates how to use `Reflect.hasMetadata()`, `Reflect.defineMetadata()`, and `Reflect.getMetadata()` at the class level and its methods (at the class level).

## Exercise 7.06

1. Create a `Calculator` class that features two public properties `first` and `second` initialized in the constructor parameters.

2. Define the methods `add()`, `subtract()`, `multiply()`, and `divide()` and implement them so that they return the result of those operations on the class' properties.

3. Use `Reflect.defineMetadata()` to add a piece of metadata with name `description` that stores the description of the class, and the description of the methods `add()`, `subtract()`, and `divide()`. Note that no description is to be given to the `multiply()` class.

4. Create a function `showDescriptions(target: any)` that retrieves the description of the class and prints it.

5. Invoke the function and validate that it works as expected using `showDescriptions(Calculator)`.

6. Enhance `showDescriptions()` so that it also shows the descriptions for the methods. HINT: use `Object.getOwnProperties(target.prototype)` to get the methods of the class.

7. Validate that it works as expected.