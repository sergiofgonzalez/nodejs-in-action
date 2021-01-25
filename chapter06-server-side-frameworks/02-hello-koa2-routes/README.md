# 02-hello-koa2-routes
> routing requests with koa-router module


## Description
The example illustrates how to write Koa middleware to handle requests for specific URLs, using the `koa-router` module.

```javascript
...
const Router = require("koa-router");
const router = new Router();

...

router.get("/", ctx => {
  ctx.body = "Hello, world!";
});

router.get("/greet/:name", ctx => {
  ctx.body = `Hello, ${ ctx.params.name}!!!`;
});


app
  .use(router.routes())
  .use(router.allowedMethods());

```