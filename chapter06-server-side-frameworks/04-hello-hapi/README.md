# 04-hello-hapi
> most basic example using Hapi HTTP server library

The term framework is overloaded and means different things to different people. In Node.js you can call any framework *module* and you will never get it wrong.

However, it's a good thing to establish some basic concepts:

+ **API Framework** &mdash; a library for building web APIs, backed by a framework that helps to structure the application.
+ **HTTP server library** &mdash; libraries that help you build applications that are based around HTTP verbs and routes (anything based on Express falls into this category).
+ **HTTP server framework** &mdash; a framework for building modular servers that speak HTTP.
+ **Web MVC framework** &mdash; model-view-controller frameworks
+ **Full-stack framework** &mdash; a library that uses JavaScript on both the server and the browser and are able to share code between both ends.


## Description
Hapi is an HTTP server library, that focuses on web API development. It comes with a routing API, and has its own server wrapper.

| Fact Sheet              |                                                                  |
------------------------- | ---------------------------------------------------------------- |
| **Library Type**        | HTTP server library                                              |
| **Features**            | High-level server container abstraction, security headers        |
| **Suggested Uses**      | Serving SPA web apps, HTTP APIs                                  |
| **Plugin Architecture** | Hapi plugins                                                     |
| **Documentation**       | http://hapijs.com/api                                            |
| **License**             | BSD 3 Clause                                                     |

In the example, we write the simplest HTTP server using *Hapi* and illustrate how to work with the Hapi server, routes and request parameters.
