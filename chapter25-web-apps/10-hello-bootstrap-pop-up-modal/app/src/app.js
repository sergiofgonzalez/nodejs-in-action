import express from 'express';
import favicon from 'serve-favicon';
import helmet from 'helmet';
import compression from 'compression';
import requestLogger from 'morgan';
import { routeProcessingProfiler } from './lib/route-processing-profiler.js';
import { buildLogger } from './lib/logger.js';
import { api } from './routes/api.js';
import { notFound, error } from './routes/error-routes.js';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { getCustomCspDirectives } from './lib/get-custom-csp-directives.js';

/* trick to get __dirname working when using ESM */
const __dirname = dirname(fileURLToPath(import.meta.url));


const logger = buildLogger('app');

export const app = express();

/*
  View engine setup
*/
app.set('views', join(__dirname, 'views'));
app.set('view engine', 'ejs');


/* 3rd party middleware */
app.use(express.json());
app.use(requestLogger(process.env['LOGGER_REQUEST_FORMAT_IN'] || 'tiny', { immediate: true }));
app.use(requestLogger(process.env['LOGGER_REQUEST_FORMAT_OUT'] || 'tiny'));
app.use(favicon(join(__dirname, process.env['PUBLIC_STATIC_RESOURCES_PATH'] || 'public', 'favicon.ico')));
app.use(helmet());
app.use(helmet.contentSecurityPolicy({
  directives: getCustomCspDirectives()
}));
app.use(compression());
app.use(express.static(join(__dirname, process.env['PUBLIC_STATIC_RESOURCES_PATH'] || 'public')));

/* custom middleware */
app.use(routeProcessingProfiler());

/* API */
app.get('/health-check', api.healthCheck);
app.get('/greeter', api.greeter);
app.get('/download/images', api.download);

/*
  Error Handling Routes
*/
app.use(notFound);
app.use(error);


logger.info(`Express application configured with env=${ app.get('env')}; NODE_ENV=${ process.env['NODE_ENV'] }`);
logger.info(`View Caching: ${ app.get('view cache') }`);
