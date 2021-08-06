import express from 'express';
import favicon from 'serve-favicon';
import helmet from 'helmet';
import compression from 'compression';
import path from 'path';
import createPinoRequestLogger from 'express-pino-logger';
import createPinoLogger from 'pino';
import { getCustomCspDirectives } from './lib/get-custom-csp-directives';


/*
  Constants and enums
*/
const VIEWS_PATH = path.join(__dirname, 'views');
const STATIC_RESOURCES_PATH = path.join(__dirname, 'public');


/*
  Logging setup
*/
const pinoRequestLogger = createPinoRequestLogger();
const logger = createPinoLogger({ name: 'app', level: process.env.LOGGER_LEVEL ?? 'info' });


export const app = express();

/*
  View engine setup: Embedded JavaScript Templates (EJS)
*/
app.set('views', VIEWS_PATH);
app.set('view engine', 'ejs');

/*
  Express Middleware setup
*/
app.use(express.json());
app.use(favicon(path.join(STATIC_RESOURCES_PATH, 'images', 'favicon.ico')));
app.use(helmet());
app.use(helmet.contentSecurityPolicy({
  directives: getCustomCspDirectives();
}));