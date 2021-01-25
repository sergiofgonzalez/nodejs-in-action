"use strict";

const Koa = require("koa");
const Router = require("koa-router");


const app = new Koa();
const router = new Router();

/*
  X-Response-Time middleware
  calculates the time the request took and sets it in an HTTP header
*/
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  ctx.set("X-Response-Time", `${ ms } msec`);
});

/*
  Logger
  displays some basic information for the current request
*/
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`Method=${ ctx.method } URL=${ ctx.url } duration: ${ ms } msec`);
});


/*
  Response
  Sends some info to the caller
*/
// app.use(ctx => {
//   ctx.body = "Hello, world";
// });


/*
  Routes
*/

router.get("/", ctx => {
  ctx.body = "Hello, world!";
});

router.get("/greet/:name", ctx => {
  ctx.body = `Hello, ${ ctx.params.name}!!!`;
});


app
  .use(router.routes())
  .use(router.allowedMethods());


console.log(`HTTP server established on port 5000`);
app.listen(5000);