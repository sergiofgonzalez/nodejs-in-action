'use strict';

/*
  General requires
*/
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const compression = require('compression');
const util = require('util');
const config = require('./lib/config');
const logger = require('./lib/logger')('sap-cf-microservice:index');
const requestLogger = require('morgan');
const authenticator = require('./lib/authenticator');
const authorizer = require('./lib/authorizer');

/*
  Routes
*/
const errHandlingRoutes = require('./lib/err-handling-routes');
const api = require('./routes/api');


util.inspect.defaultOptions.depth = null;
util.inspect.defaultOptions.breakLength = Infinity;


const app = express();
logger.info(`Express application started with env=${ app.get('env')}; NODE_ENV=${ config(`NODE_ENV`) }`);


/*
  Middleware setup
*/
app.use(requestLogger(config('logger:request-format') || 'tiny'));
app.use(helmet());
app.use(compression());
app.use(bodyParser.json());
app.use(authenticator.initialize());


/*
  RESTful API
*/
app.get('/api/v1.0/heartbeat', api.heartbeat);
app.get('/api/v1.0/greetme/:name?', authenticator.secureEndpoint(), api.greetMe);
app.get('/api/v1.0/users', authenticator.secureEndpoint(), authorizer.checkScope('Display'), api.users.getUsers);
app.post('/api/v1.0/users', authenticator.secureEndpoint(), authorizer.checkScope('Update'), api.users.createUser);

/*
  Error handling setup
*/
app.use(errHandlingRoutes.notFound);
app.use(errHandlingRoutes.error); 


module.exports = app;