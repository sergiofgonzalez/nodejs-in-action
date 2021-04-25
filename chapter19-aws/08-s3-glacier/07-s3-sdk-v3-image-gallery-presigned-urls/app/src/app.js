import express from 'express';
import favicon from 'serve-favicon';
import helmet from 'helmet';
import compression from 'compression';
import { api } from './routes/api.js';
import { notFound, error } from './routes/error-routes.js';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { getCustomCspDirectives } from './lib/get-custom-csp-directives.js';
import createPinoRequestLogger from 'express-pino-logger';
import createPinoLogger from 'pino';

const pinoRequestLogger = createPinoRequestLogger();


/* trick to get __dirname working when using ESM */
const __dirname = dirname(fileURLToPath(import.meta.url));


const logger = createPinoLogger({ name: 'main' });

export const app = express();

/*
  View engine setup
*/
app.set('views', join(__dirname, 'views'));
app.set('view engine', 'ejs');

/*
  Path setup
*/
process.env.STATIC_RESOURCES_PATH = join(__dirname, process.env['PUBLIC_STATIC_RESOURCES_PATH'] || 'public');

/* 3rd party middleware */
app.use(express.json());
app.use(favicon(join(__dirname, process.env['PUBLIC_STATIC_RESOURCES_PATH'] || 'public', 'favicon.ico')));
app.use(helmet());
app.use(helmet.contentSecurityPolicy({
  directives: getCustomCspDirectives()
}));
app.use(compression());
app.use(express.static(process.env['STATIC_RESOURCES_PATH']));
app.use(pinoRequestLogger);

/* API */
app.get('/health-check', api.healthCheck);
app.get('/greeter', api.greeter);
app.post('/upload', api.upload);
app.get('/list-files', api.listUploadedfiles);
app.get('/download/:fileKey', api.download);


/*
  Error Handling Routes
*/
app.use(notFound);
app.use(error);


logger.info({ env: app.get('env'), NODE_ENV: process.env['NODE_ENV'] }, `Express application configured`);
logger.info({ 'view cache': app.get('view cache') }, `View Caching: ${ app.get('view cache') }`);
