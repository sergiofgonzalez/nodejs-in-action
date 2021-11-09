# e03: Dependency Injection &mdash; Hello, DI using InversifyJS! (Variant 3)
> A small variant on [e02: Hello, DI using InversifyJS! (Variant 2)](../e02-hello-di-with-inversifyjs-main) in which `UserRegistrationService` is enhanced with password hashsing capabilities.

## Description

In this example, the `UserRegistrationService` is enhanced to include the password hashing capabilities from [01: Hello, DI!](../01-hello-di). As the password is generated asynchronously, instead of using what is explained in [Injecting a constant or dynamic value](https://github.com/inversify/InversifyJS/blob/master/wiki/value_injection.md) it was easier to just create a class responsible for the hash generation and slightly modify the `UserRegistrationService` to make use of that class.