# 03: Decorators &mdash; Class Decorators: Creating a simple class decorator factory
> illustrates one of the common use cases of class decorators: the injection of properties on a given class

## Exercise 7.01

In this exercise, you will create a simple *decorator factory* for a `Token` decorator.

You're developing an application for a school, and you need to implement an authorization system, so that only subjects with specific authori-ty 😜 can execute certain actions such as grade exams. Authorization being a cross-cutting concern, you decide to implement it using decorators.

1. Create a `Teacher` and `Student` class with public properties `id` (numeric) and `name` (string).

2. Create a `Token` decorator factory that returns a class decorator for the *annotation* `@Token(boolean)`. If the argument given to the decorator is `true`, it will mean the instances of that class will be able to execute the protected actions. The decorator function should inject a property `token` in the instance with the passed argument.

3. Annotate the `Teacher` class with `@Token(true)` and the `Student` class with `@Token(false)`.

4. Create an instance of each the classes and validate that you can access the `token` property. Note that you need to cast the instance to `any` to be able to access that property.

5. Create a type (or interface) named `SchoolSubject` as a way to remove the need for the casting to `any`. Validate the you the application still works.

6. Create a function `isAuthorized()` that takes a `SchoolSubject` object and returns true if its `token` property is `true` or `false` otherwise.

7. Create a function `gradeExams()` that takes a `Teacher` or `Student` and checks whether the given argument is authorized or not and prints a message in the screen with the result of the authorization.



