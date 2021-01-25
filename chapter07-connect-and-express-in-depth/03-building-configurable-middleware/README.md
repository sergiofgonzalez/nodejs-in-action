# 03-building-configurable-middleware
> introducing the concept of configurable middleware

## Description

The concept of configurable middleware used in *Connect* consists in setting up a module that returns a middleware function. Thus, it can be used several times and with different configurations.

In the example, we define a configurable logger middleware.