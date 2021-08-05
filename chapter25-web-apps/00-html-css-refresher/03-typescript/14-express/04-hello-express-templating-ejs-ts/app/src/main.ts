import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import * as Index from './routes/index';
import * as Login from './routes/login';


dotenv.config(); // bootstrap configuration
export const app = express();


/* templating engine setup */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/* route declarations */
app.use('/', Index.router);
app.use('/', Login.router);

const port = process.env.PORT ?? 3000;

export const server = app.listen(port, () => {
  console.log(`HTTP server listening on port ${ port }`);
});
