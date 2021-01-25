# e02 &mdash; Hello, CLS Hooked
> Illustrates how to use `cls-hooked` package to create *continuation-local* storage, a similar construct to thread-local storage when programming with threads.

# Description
In the example, a couple of functions are defined and run on separate contexts. It is demonstrated that even when running *in parallel* each one of them manages a different context on which the values are not mixed.