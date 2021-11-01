# e01: Advanced Types &mdash; Intersection type
> illustrating intersection types

## Activity 6.01

In this exercise you will merge two types `Motor` and `Truck` into a new type `PickupTruck`.

1. Create a `Motor` type with the properties `color` (string), `doors` (numeric), `wheels` (numeric), and `fourWheelDrive` (boolean).

2. Create a `Truck` type with the properties `doubleCab` (boolean) and `winch` (boolean).

3. Intersect the previous types to create a new type `PickupTruck`.

4. Create a function `TruckBuilder()` that takes a `PickupTruck` instance and returns the same instance.

5. Invoke the function and print the results on the console.