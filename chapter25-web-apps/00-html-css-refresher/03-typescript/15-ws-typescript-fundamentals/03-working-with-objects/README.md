# 03: TypeScript Fundamentals &mdash; Working with objects
> define a simple object and understand the constraints that TypeScript type system imposes in that object.

## Exercise 1.03
Define a simple object that encapsulates a book with a few properties. You'll try to access and modify the object's data and verify that TypeScrit constrains you according to inferred or explicit rules. You'll also create a function that takes a book and prints out its details.

1. Define a simple interface `Book` with properties for the author and title. Include optional properties for the number of pages of the book, and a boolean flag to indicate whether you have read the book or not.

2. Add a function `showBook(...)` that displays the book author and title, along with whether the book has been read or not.

3. Create a couple of support functions `setPages(...)` and `readBook(...)` that take a book instance and sets the corresponding properties.

4. Create a function `makeBook()` that accepts the book title, author and optionally the number of pages and returns a `Book` instance.

5. Create three object literals:
  + one that does not use type annotations but conforms to the `Book` interface to check duck-typing.
  + one that explicitly uses type annotations to check how the IDE helps with autocomplete, etc.
  + one that collects the result from the `makeBook()` invocation.

Then validate that the three instances conform to the `Book` interface and can make use of the different functions we have defined.
