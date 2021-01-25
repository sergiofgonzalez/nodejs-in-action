"use strict";

const debug = require("debug")("page:server");

module.exports = (cb, entriesPerPage) => {
  if (!entriesPerPage) {
    debug(`No value received for "entriesPerPage" parameter: default value of 10 will be assumed`);
  }
  entriesPerPage = entriesPerPage || 10;
  return (req, res, next) => {
    const page = Math.max(Number.parseInt(req.params.page || "0"), 0);
    cb((err, total) => {
      if (err) {
        return next(err);
      }
      req.page = res.locals.page = {
        number: page,
        perPage: entriesPerPage,
        from: page * entriesPerPage,
        to: page * entriesPerPage + entriesPerPage - 1,
        total: total,
        count: Math.ceil(total / entriesPerPage)
      };
      next();
    });
  };
};