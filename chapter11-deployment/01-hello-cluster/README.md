# 01-hello-cluster
> the basics of Node.js `cluster` module to take advantage of multiple cores

## Description
Most modern computer CPUs have multiple cores, so if you want to maximize the server usage you might need to use the `cluster` module which lets you run multiple *workers* on different cores that each one of them do the same thing and respond to the same TCP/IP port.

In the example, we create one worker for each of the available CPUs and establish an HTTP server on each worker which will respond differently, but in the same port.

Note that *master* and each of the *workers* run on separate cores, and they can't share state through global variables.
