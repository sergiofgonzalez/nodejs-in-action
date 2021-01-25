"use strict";

const User = require("../models/user");

module.exports = (req, res, next) => {
  if (req.remoteUser) {
    res.locals.user = req.remoteUser;
    next();
  } else {
    const uid = req.session.uid;
    if (!uid) {
      return next();
    }
    User.get(uid, (err, user) => {
      if (err) {
        return next(err);
      }
      req.user = res.locals.user = user;
      next();
    });
  }
};