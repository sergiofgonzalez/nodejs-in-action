# 17: Decorators &mdash; Parameter Decorators: using parameter and method decorators to implement validation
> an example in which parameter decorators, method decorators and metadata to implement validations.

## Exercise 7.08

1. Create a class `Teacher` with public properties `id` (number) and `name` (string) initialized explicitly in the constructor.

2. Define in the class a `getFullName()` function that accepts a `title` and `suffix` parameters and returns the string `{ title } { name }, { suffix }`.

3. Define a parameter decorator `Required` with the following implementation:
  + Check if the method in which the parameter is defined has a piece of metadata named `'required'` bound to the method.
  + If it is so, read the current value and concatenate the index received.
  + Otherwise, add a piece of metadata named `'required'` to the method, whose value would be an array on number whose single element is the parameter index of the parameter to which the `@Required` decorator has been used.

4. Define a method decorator `Validate` with the following implementation:
  + read and make a copy of the existing method code, as we will be wrapping it.
  + set the value of `descriptor.value` to a `function (...args: any[])` that performs the following:
    + read the `'required'` metadata info as a `number[]`.
    + iterate over required param indices matching them with what the function received in its args.
    + return the result of applying the original function so that we're only complementing the original functionality with cross-cutting concerns, and not replacing it in its entirety.

5. Annotate the `title` parameter of the `getFullName` method with `@Required` and the method itself with `@Validate`.

6. Create an instance of the `Teacher` class.

7. Include in a try-catch block a call to `getFullName` in which you pass an empty string as the first parameter to the method. Validate that an error is raised.
