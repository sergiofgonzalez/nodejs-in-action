'use strict';

const User = require('./user.js');

function project(user) {
  return {
    name: user.name,
    email: user.email
  };
}

function findUserById(id, done) {
  User.findOne({ id }, (err, user) => {
    done(err, user ? project(user) : null);
  });
}

module.exports = findUserById;
