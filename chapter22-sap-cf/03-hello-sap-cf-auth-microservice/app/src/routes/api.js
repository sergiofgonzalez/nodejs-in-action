'use strict';

const logJWT = require('../lib/log-jwt');
const logger = require('../lib/logger')('sap-cf-microservice:api');
const userInfo = require('../lib/user-info');

exports.heartbeat = (req, res) => {
  res.send({ message: `It's alive!`, timestamp: new Date().toISOString() });
};

exports.greetMe = async (req, res) => {
  logJWT(req);
  const name = req.params.name || 'Jason Isaacs';
  logger.debug(`greetMe controller activated: ${ name }`);
  const userDetails = await userInfo(req);
  res.send({ message: `Hello to ${ name }`, timestamp: new Date().toISOString(), userDetails });
};

exports.users = require('./users');
