# 11: Decorators &mdash; Method Decorators: Method wrapping decorator
> Illustrates how to define a method decorator that wraps the original instance/static method or property accessor with additional logging.

## Exercise 7.05

In this exercise you'll be creating a decorator that will do some logging each time a decorated method or accessor is called.

1. Create a `Teacher` class with a private property `_title` (string) and a public property `name` that is initialized in the constructor.

2. Define a setter and getter for the private property `get title()` and `set title(value: string)`.

3. Define a method `teach()` that announces itself.

4. Define a static method `showUsage()` that announces itself.

5. Instantiate an object of this class.

6. Invoke the `teach()` function, set the `title` of the instance, invoke the getter of the `title`, and invoke the static function and validate that everything works according to the plan.

7. Define a decorator factory `LoggerDecorator()` that takes a `message` string and returns a decorator.

8. Define a `logger` object at the top of the program which exposes an `info()` method that prints the received message.

9. Implement the wrapping decorator according to these hints:
  + Check if `descriptor.value` is populated. If it is, it means the decorator was applied to an instance/static method.
    + Replace the original instance/static method by returning a function that wraps the original one with some additional logging.
    + The function signature will be `function (...args: any[])` and the way in which the original method can be invoked is by doing `original.apply(this, args)`.
  + Check if `descriptor.get` is populated. If it is, it means the decorator was applied to a property getter.
    + Replace the original getter by returning a function that wraps the original one with some additional logging.
    + The function signature will be `function ()` and the way in which the original method can be invoked is by doing `original.apply(this, [])`.
  + Check if `descriptor.set` is populated. If it is, it means the decorator was applied to a property setter.
    + Replace the original setter by returning a function that wraps the original one with some additional logging.
    + The function signature will be `function (value: any)` and the way in which the original method can be invoked is by doing `original.apply(this, [value])`.

10. Validate that the program works as expected.