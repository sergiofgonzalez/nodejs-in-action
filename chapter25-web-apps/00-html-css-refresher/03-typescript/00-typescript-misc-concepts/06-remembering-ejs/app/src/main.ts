import path from 'path';
import express from 'express';
import * as Index  from './routes/index';
import * as Tasks  from './routes/tasks';
import * as HealthCheck from './routes/health-check';

const PORT = process.env.PORT ?? 8080;

const app = express();

/* template engine setup */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/* setting up static resources servicing */
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', Index.router);
app.use('/', Tasks.router);
app.use('/api', HealthCheck.router);

export const server = app.listen(PORT, () => {
  console.log(`INFO: serving static content on port ${ PORT }`);
});
