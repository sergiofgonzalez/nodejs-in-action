'use strict';

/*
  General requires
*/
const debug = require('debug')('sap-microservice:index');
const express = require('express');
const helmet = require('helmet');
const logger = require('morgan');
const util = require('util');
const config = require('./lib/config');


/*
  Routes
*/
const commonRoutes = require('./routes/common-routes');
const api = require('./routes/api');


util.inspect.defaultOptions.depth = null;
util.inspect.defaultOptions.breakLength = Infinity;


const app = express();
debug(`Express application started with env=${ app.get('env')}; NODE_ENV=${ config(`NODE_ENV`) }`);


/*
  Middleware setup
*/
app.use(logger(config('logger:format') || 'tiny'));
app.use(helmet());


/*
  RESTful API
*/
app.get('/api/heartbeat', api.heartbeat);

/*
  Error handling setup
*/
app.use(commonRoutes.notFound);
app.use(commonRoutes.error);



module.exports = app;