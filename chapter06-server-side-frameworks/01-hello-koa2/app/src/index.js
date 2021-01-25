"use strict";

const Koa = require("koa");
const app = new Koa();


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
app.use(ctx => {
  ctx.body = "Hello, world";
});

console.log(`HTTP server established on port 5000`);
app.listen(5000);