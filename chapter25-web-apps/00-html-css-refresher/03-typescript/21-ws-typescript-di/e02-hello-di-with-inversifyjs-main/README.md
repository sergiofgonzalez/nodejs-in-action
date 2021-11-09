# e02: Dependency Injection &mdash; Hello, DI using InversifyJS! (Variant 2)
> A small variant on [e01: Hello, DI using InversifyJS!](../e01-hello-di-with-inversifyjs) in which `UserRegistrationService` is no longer the *main* class of the composition root.

## Description

In this example, instead of using `UserRegistrationService` as the main class of the composition root, you define an *injectable* main class in `main.ts` who bootstraps the application.

Then, the `UserRegistrationService`, which is a class with no defined interface, is added to the `TYPES` and configured in the IoC container.
