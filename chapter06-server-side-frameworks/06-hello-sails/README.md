# 06-hello-sails
> introducing Sails MVC framework

The term framework is overloaded and means different things to different people. In Node.js you can call any framework *module* and you will never get it wrong.

However, it's a good thing to establish some basic concepts:

+ **API Framework** &mdash; a library for building web APIs, backed by a framework that helps to structure the application.
+ **HTTP server library** &mdash; libraries that help you build applications that are based around HTTP verbs and routes (anything based on Express falls into this category).
+ **HTTP server framework** &mdash; a framework for building modular servers that speak HTTP.
+ **Web MVC framework** &mdash; model-view-controller frameworks
+ **Full-stack framework** &mdash; a library that uses JavaScript on both the server and the browser and are able to share code between both ends.


## Description
Sails is an MVC framework that comes with an ORM, REST API support and some other interesting features like WebSocket support.

| Fact Sheet              |                                                                  |
------------------------- | ---------------------------------------------------------------- |
| **Library Type**        | Web MVC Framework                                                |
| **Features**            | MVC with Database support, REST API generation, WebSockets       |
| **Suggested Uses**      | MVC apps                                                         |
| **Plugin Architecture** | Express Middleware                                               |
| **Documentation**       | http://sailsjs.org                                               |
| **License**             | BSD 3                                                            |

*Sails* is a bit different from other frameworks, in the sense that it comes with its own generator. In order to create a new project you have to run:
```bash
$ ./node_modules/.bin/sails new sails-app
```

Once created, cd into the newly created directory and run
```bash
$ ./node/modules/.bin/sails lift
```
