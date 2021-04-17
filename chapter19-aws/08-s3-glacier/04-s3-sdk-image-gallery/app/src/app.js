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
import busboy from 'connect-busboy';
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

/*
  Path setup
*/
process.env.STATIC_RESOURCES_PATH = join(__dirname, process.env['PUBLIC_STATIC_RESOURCES_PATH'] || 'public');

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
app.use(express.static(process.env['STATIC_RESOURCES_PATH']));
app.use(busboy({
  highWaterMark: 2 * 1024 * 1024, /* highWaterMark (size of int buffer) */
  fileHwm: 2 * 1024 * 1024,       /* highWaterMark for file streams     */
  limits: {
    /* max file size in bytes     */
    fileSize: (process.env.FILE_SIZE_LIMIT_MB ?? 10) * 1024 * 1024,
    files: 1,           /* max number of file fields  */
    fieldNameSize: 255  /* max field name size        */
  }
}));

/* custom middleware */
app.use(routeProcessingProfiler());

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


logger.info(`Express application configured with env=${ app.get('env')}; NODE_ENV=${ process.env['NODE_ENV'] }`);
logger.info(`View Caching: ${ app.get('view cache') }`);
