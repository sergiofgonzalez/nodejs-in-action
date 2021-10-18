# 01: TypeScript classes and objects &mdash; Building your first class
> first steps into classes and objects with TypeScript

## Exercise 4.01, 4.02, 4.03

In this exercise you'll build a class named `Team` and add some behavior through a method named `generateLineup`.

1. Start by defining an empty `Team` class.

2. Add a method `generateLineup` that takes no arguments and return a hardcoded string `'lineup will be returned here'`.

3. Add a property `name` of type string and initialize that data attribute in a constructor.

4. Outside the class, instantiate the `Team` class twice with the names `Mercedes` and `Ferrari`. Invoke the `generateLineup` and print the `name` attribute for for both instances.

5. Create an additional attribute in the class `drivers` which is an array of strings.

6. Update the constructor, so that it now receives the drivers argument, and initializes the `drivers` property.

7. Update the `generateLineup` method so that it returns the lineup of the team (Hint: use `drivers.join(', '))`.

