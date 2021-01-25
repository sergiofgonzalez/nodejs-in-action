'use strict';

/*
  General requires
*/
const debug = require('debug')('server:index');
const express = require('express');
const helmet = require('helmet');
const path = require('path');
const favicon = require('serve-favicon');
const config = require('./lib/config');

/*
  Routes
*/
const routes = require('./routes/index');

const app = express();

/*
  View engine setup
*/
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/*
  Middleware setup
*/

/* 3rd party middleware */
app.use(favicon(path.join(__dirname, config('server:public'), 'favicon.ico')));
app.use(express.static(path.join(__dirname, config('server:public'))));
app.use(helmet());

/*
  Routes setup
*/
app.get('/rest/report', routes.report);

/*
  Error handling setup
*/
app.use(routes.notFound);
app.use(routes.error);

/*
  Displaying some Express related settings
*/
debug(`Application running with env = ${ app.get('env') }`);
debug(`Application running with NODE_ENV = ${ config('NODE_ENV') }`);

module.exports = app;