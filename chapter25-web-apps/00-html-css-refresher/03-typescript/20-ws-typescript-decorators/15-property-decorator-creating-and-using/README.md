# 15: Decorators &mdash; Property Decorators: creating and using a property decorator
> illustrates how to mix metadata and property decorators.

## Exercise 7.07

In this exercise you'll create a simple property decorator factory that will provide each property of a class with a description.

1. Create a `Teacher` class with a public properties `id` (number) and `name` (string) and initialized them explicitly in the constructor (so that they're available for decoration).

2. Define a decorator factory `Description()` that takes a string parameter and that returns a property decorator. In the implementation, you will use reflection to bind the message received in argument corresponding property.

3. Annotate the properties of the `Teacher` class.

4. Define a function `showDescriptions(target: any)` that iterates over the properties of the class, and displays the description (if available using reflection).

5. Validate that the application works as expected
