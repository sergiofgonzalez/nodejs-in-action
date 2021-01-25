'use strict';

const logger = require('../../lib/logger')('sap-cf-microservice:getUsers');
const users = require('./users-db');

function getUsers(req, res) {
  logger.debug(`getUsers controller has been activated`);
  logger.info(`user was authorized to display users`);
  return res.status(200).json(users);
}

module.exports = getUsers;