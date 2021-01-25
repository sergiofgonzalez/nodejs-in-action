"use strict";

function setupLogger(format) {
  const regex = /:(\w+)/g;

  return function createLogger(req, res, next) {
    // replaces all the matches of :w with req[w]
    const str = format.replace(regex, (match, property) => {
      return req[property];
    });
    console.log(str);
    next();
  };
}

module.exports = setupLogger;