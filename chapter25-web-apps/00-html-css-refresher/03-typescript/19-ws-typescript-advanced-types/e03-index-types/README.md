# e03: Advanced Types &mdash; Index types
> illustrating index types

## Activity 6.03

You need to incorporate a shipping option to track the status of packages delivered from an e-commerce site.

It is important to make this type sufficiently flexible so that new package statuses can be added as the functionality grows and new shipping methods are added.

As a result, you will build and index type `PackageStatus` using an interface signature of the `status` property of type `string` which resolves to a `boolean` type.

You will then build a `Package` type with some common package properties that will also include the `PackageStatus` type.

Initially, the PackageStatus will be used to track three statuses: `packed`, `shipped`, and `delivered`.

You will then construct a class that takes an object of the `Package` type and that features a method that returns the `status` property, and a method that updates the `status` property.

1. Create an index type `PackageStatus` that models an index type to track the status of the package.

2. Create a `Package` type that includes an status `property` of type `PackageStatus`, along with some other properties such as `destination` (string), and `weight` (number).

3. Create a `PackageProcessor` class that features a property of type `Package`. Initialize that property in the constructor. Create two additional methods in the class to get and set the `status` property of the package.

4. Create an object of type `PackageStatus` that sets up the initial statuses of the package to false (shipped, packed, delivered).

4. Create a package object, and use the get and set methods to see that the application behaves as expected.

5. Invoke the `setPackageStatus()` with a value not given in the initial values. What is the result?