# 03-hello-kraken
> introducing Kraken HTTP server library features

The term framework is overloaded and means different things to different people. In Node.js you can call any framework *module* and you will never get it wrong.

However, it's a good thing to establish some basic concepts:

+ **API Framework** &mdash; a library for building web APIs, backed by a framework that helps to structure the application.
+ **HTTP server library** &mdash; libraries that help you build applications that are based around HTTP verbs and routes (anything based on Express falls into this category).
+ **HTTP server framework** &mdash; a framework for building modular servers that speak HTTP.
+ **Web MVC framework** &mdash; model-view-controller frameworks
+ **Full-stack framework** &mdash; a library that uses JavaScript on both the server and the browser and are able to share code between both ends.


## Description
Kraken is an Express based HTTP server library that lets you add extra functionality through some custom modules developed by PayPal.

| Fact Sheet              |                                                                  |
------------------------- | ---------------------------------------------------------------- |
| **Library Type**        | HTTP server library                                              |
| **Features**            | Strict project structure, template (Dust), Security hardening (Lusca), configuration management, i18n...|
| **Suggested Uses**      | Lightweight web apps, non-strict HTTP APIs, serving SPA web apps |
| **Plugin Architecture** | Express Middleware                                               |
| **Documentation**       | http://www.kraken.com/help/api                                   |
| **License**             | Apache 2.0                                                       |

In the example, we establish the result of the *Yeoman kraken generator* on top of the project structure. By doing so, you can see how *Kraken* enforces a strict project structure in which you define the controllers, the models, the multilanguage properties...

