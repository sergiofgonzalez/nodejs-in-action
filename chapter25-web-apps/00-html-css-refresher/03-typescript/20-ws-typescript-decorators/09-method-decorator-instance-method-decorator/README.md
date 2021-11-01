# 09: Decorators &mdash; Method Decorators: creating a decorator that marks a function enumerable
> defining an instance method decorator factory function that makes the decorated instance or accessor enumerable.

## Exercise 7.04

In the exercise you create a decorator that will change the `enumerable` state of the instance method/accessor it decorates.

1. Create a `Teacher` class with a private property `_title` (string) and a public property `name` that is initialized in the constructor.

2. Define a setter and getter for the private property `get title()` and `set title(value: string)`.

3. Define a method `teach()` that announces itself.

4. Instantiate an object of this class.

5. Enumerate the properties of the recently created instance (hint: use `for (key in obj)`) and validate that only `_title` and `name` appear.

6. Define an instance method decorator factory `Enumerable()` that accepts a boolean value. Make the factory return a decorator that sets the `enumerable` property set to the argument passed.

7. Apply the decorator to either the setter or the getter and to the `teach()` method. Confirm that now `name`, `_title`, `title`, and `teach` are enumerable.