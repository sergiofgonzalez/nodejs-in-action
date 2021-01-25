'use strict';

const logger = require('../../lib/logger')('sap-cf-microservice:createUser');
const users = require('./users-db');

function createUser(req, res) {
  logger.debug(`createUser controller has been activated`);
  const newUser = req.body;
  newUser.id = users.length;
  users.push(newUser);
  res
    .status(201)
    .location(`/users/${newUser.id}`)
    .json(newUser);
}

module.exports = createUser;