'use strict';

/*
  General requires
*/
const logger = require('./lib/logger')('index');
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const helmet = require('helmet');
const compression = require('compression');
const requestLogger = require('morgan');

/*
  Routes
*/
const routes = require('./routes/error-routes');


const app = express();

/*
  View engine setup
*/
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


/* 3rd party middleware */
app.use(requestLogger(process.env['LOGGER_REQUEST_FORMAT_IN'] || 'tiny', { immediate: true }));
app.use(requestLogger(process.env['LOGGER_REQUEST_FORMAT_OUT'] || 'tiny'));
app.use(favicon(path.join(__dirname, process.env['PUBLIC_STATIC_RESOURCES_PATH'] || 'public', 'favicon.ico')));
app.use(helmet());
app.use(compression());
app.use(express.static(path.join(__dirname, process.env['PUBLIC_STATIC_RESOURCES_PATH'] || 'public')));

/*
  Error Handling Routes
*/
app.use(routes.notFound);
app.use(routes.error);

logger.info(`Express application started with env=${ app.get('env')}; NODE_ENV=${ process.env['NODE_ENV'] }`);
logger.info(`View Caching: ${ app.get('view cache') }`);
module.exports = app;