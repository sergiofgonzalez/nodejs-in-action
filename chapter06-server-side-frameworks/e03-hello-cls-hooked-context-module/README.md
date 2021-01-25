# e03 &mdash; Hello, CLS Hooked Context Module
> Creating a Node.js module to support a continuation-local-storage using `cls-hooked`

# Description
Illustrates how to use the `cls-hooked` to create a module that provides a sort of continuation-local-storage context on which you can keep values that won't be shared between different executions of the same function.

The output is displayed in the console, and it might take some time to make sense of it, but this is the thing that the program validates:
+ The *CLS* namespace is created on a *Node.js module* and then shared to other application modules to consume
+ Two different functions can create contexts concurrently and set different values on it and they won't clash
+ Even the same function invoked from two different *CLS contexts*  can query and set the values on the context and they won't clash
