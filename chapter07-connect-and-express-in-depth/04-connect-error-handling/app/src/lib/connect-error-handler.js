"use strict";

const env = process.env.NODE_ENV || "development";

function errorHandler() {
  return (err, req, res, next) => {
    if (env === "development") {
      console.error(`Error found: ${ err }`);
      res.setHeader("Content-Type", "application/json");
      res.statusCode = 500;
      res.end(`Error found in the server side: ${ err.message }`);
      next();
    } else {
      res.end("Server Error");
      next();
    }
  };
}

module.exports = errorHandler;