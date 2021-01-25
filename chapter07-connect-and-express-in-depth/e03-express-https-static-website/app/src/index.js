'use strict';

/*
  General requires
*/
const debug = require('debug')('express-static:index');
const express = require('express');
const helmet = require('helmet');
const path = require('path');
const favicon = require('serve-favicon');
const config = require('./lib/config');



const app = express();


/* 3rd party middleware */
app.use(favicon(path.join(__dirname, config('server:public'), 'favicon.ico')));
app.use(express.static(path.join(__dirname, config('server:public'))));
app.use(helmet());



/*
  Displaying some Express related settings
*/
debug(`Application running with env = ${ app.get('env') }`);
debug(`Application running with NODE_ENV = ${ config('NODE_ENV') }`);

module.exports = app;