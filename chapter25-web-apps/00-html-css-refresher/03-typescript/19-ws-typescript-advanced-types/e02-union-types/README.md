# e02: Advanced Types &mdash; Union Types
> illustrating union types

## Activity 6.02

In this exercise you will use union types to model the way in which website users can choose how they want their packages to be delivered, by land or by air.

Your union type will be called `ComboPack`, which can be either `LandPack` or `AirPack` type. You can add properties to your package that will be common to a package, and also a type literal to identify your package, and an optional label property.

Then, you will build a class to process your package, that will identify the exact type of the union type, and populate the label appropriately as `'air cargo'` or `'land cargo'`.

1. Build a `LandPack` and `AirPack` types with common properties `destination` (string), `deliveryType` (object literal type of type `'air'` and `'land'`) and an optional `label`.

2. Create a `ComboPack` as a union of `LandPack` and `AirPack`.

3. Create a `Shipping` class whose constructor takes an argument of type `ComboPack` and sets up a property of the class with the argument received but with its `label` property populated as `'air cargo'` or `'land cargo'`.