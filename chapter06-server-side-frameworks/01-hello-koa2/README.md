# 01-hello-koa2
> most basic example using Koa 2 HTTP server library

The term framework is overloaded and means different things to different people. In Node.js you can call any framework *module* and you will never get it wrong.

However, it's a good thing to establish some basic concepts:

+ **API Framework** &mdash; a library for building web APIs, backed by a framework that helps to structure the application.
+ **HTTP server library** &mdash; libraries that help you build applications that are based around HTTP verbs and routes (anything based on Express falls into this category).
+ **HTTP server framework** &mdash; a framework for building modular servers that speak HTTP.
+ **Web MVC framework** &mdash; model-view-controller frameworks
+ **Full-stack framework** &mdash; a library that uses JavaScript on both the server and the browser and are able to share code between both ends.


## Description
Koa is an HTTP server library, which means it is a library that helps you build applications that are based around HTTP verbs and routes. Anything based on Express falls into this category.

| Fact Sheet              |                                                                  |
------------------------- | ---------------------------------------------------------------- |
| **Library Type**        | HTTP server library                                              |
| **Features**            | async/await-based middleware, request/response model             |
| **Suggested Uses**      | Lightweight web apps, non-strict HTTP APIs, serving SPA web apps |
| **Plugin Architecture** | Middleware                                                       |
| **Documentation**       | http://koa.js                                                    |
| **License**             | MIT                                                              |

In the example, we write the simplest HTTP server using Koa 2 (which by the way, no longer uses generators).

Koa 2 library uses middleware that is invoked in a particular way.
Let's consider the example:

```javascript
// Middleware 1
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  ctx.set("X-Response-Time", `${ ms } msec`);
});

// Middleware 2
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`Method=${ ctx.method } URL=${ ctx.url } duration: ${ ms } msec`);
});

// Middleware 3
app.use(ctx => {
  ctx.body = "Hello, world";
});
```

That code responds with a simple "Hello, world", however the request flow is as follows:
+ When a middleware invokes `next()` the function suspends and passes control to the next middleware defined
+ When there's no more middleware to execute, the stack will unwind and each middleware is resumed to perform its upstream behavior

Therefore, that is what happens:
+ Middleware 1 is executed until `next()` is called
+ Middleware 2 is executed until `next()` is called
+ Middleware 3 is executed until the end, because it's not invoking `next()`
+ Middleware 2 execution is resumed
+ Middleware 1 execution is resumed
