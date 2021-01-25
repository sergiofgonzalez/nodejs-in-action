"use strict";

const connect = require("connect");
const errorHandler = require("./lib/connect-error-handler");

/*
  Forces error because the foo() function is not defined

  With no error handling, Connect will automatically return a HTTP code 500 (Internal Server Error)
  to the client and will display the error and stack trace in the server console.
*/
connect()
  .use(logger)
  .use((req, res) => {
    foo();  // eslint-disable-line no-undef
    res.setHeader("Content-Type", "text/plain");
    res.end("Hello to Jason Isaacs!");
  })
  .use(errorHandler())
  .listen(5000);

console.log(`HTTP server established on port 5000`);


function logger(req, res, next) {
  console.log(`${ req.method } ${ req.url }`);
  next();
}