# 02-hello-connect-middleware
> illustrating the basics of middleware chaining in connect

## Description

In `connect`, a middlware is a JavaScript function that accepts:
+ a `request` object
+ a `response` object
+ a `next` callback function indicating that the component is done and that the subsequent middleware can be executed

Middleware ordering is achieved using the `use` method:
```javascript
connect()
  .use(logger)
  .use(sendGreeting)
  .listen(5000);
```

This means `logger` middleware will be called before `sendGreeting`. Note that if a middleware does not call `next` the chain of middleware calls will be stopped. Thus, if `logger` would not call `next` the greeting would never be called.

To return information to the client, you use the response object:
```javascript
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello to Jason Isaacs!");
```