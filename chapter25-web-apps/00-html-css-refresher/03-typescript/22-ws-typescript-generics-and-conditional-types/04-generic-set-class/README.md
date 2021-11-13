# 04: Generics and Conditional Types &mdash; A Generic Set Class
> Illustrates how to implement a *Set* class with a generic type placeholder


## Exercise 9.01

In this exercise you will create a `MySet<T>` class that implements a data structure that can hold items, where the order is not important, and without allowing duplicates.

1. Create a class `MySet<T>` which holds their items in a private array of elements of type `T`.

2. Define a constructor which accepts an array of initial elements of type T that are assigned to the `MySet`.

3. Define a `size` property with a getter which returns the number of elements in the set.

4. Define a `has()` method that accepts an item of type `T` and returns whether that element is contained in the array. HINT: use `Array.include`.

5. Define an `add()` method that accepts an item of type `T` and adds them to the set if not already there.

6. Define a `remove()` method that accepts an element of type `T` and removes them from the set. HINT: use `Array.indexOf()` and `Array.splice()`.

7. Validate that the class works as expected.