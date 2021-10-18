# 02: TypeScript classes and objects &mdash; Building interfaces
> first steps into interfaces in the context of classes and objects with TypeScript

## Exercise 4.04

This exercise builds on the result of [01: Building your first class](../01-hello-class) and refactors it to use interfaces instead of individual arguments.

1. Start by defining an interface with name `ITeam` and properties `name` and `drivers` of type `string` and `string[]` respectively.

2. Update the constructor, so that now it receives an argument of type `ITeam`.

3. Update the code that instantiate the teams, so that it now sends an instance of `ITeam`.

