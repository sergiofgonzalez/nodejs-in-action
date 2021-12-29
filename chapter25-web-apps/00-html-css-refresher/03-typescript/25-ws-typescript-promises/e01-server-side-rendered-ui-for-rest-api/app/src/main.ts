import path from 'path';
import express from 'express';
import * as Index  from './routes/index';
import * as HealthCheck from './routes/health-check';
import * as ToDos from './routes/todos';

const PORT = process.env.PORT ?? 8080;

const app = express();

/* template engine setup */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/* setting up static resources servicing */
app.use(express.static(path.join(__dirname, 'public')));

/* JSON body parser */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', Index.router);
app.use('/api', HealthCheck.router);
app.use('/api', ToDos.router);

export const server = app.listen(PORT, () => {
  console.log(`INFO: serving static content on port ${ PORT }`);
});
