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

/* middleware setup */
process.env.STATIC_RESOURCES_PATH = path.join(__dirname, process.env.PUBLIC_STATIC_RESOURCES_PATH ?? 'public');
app.use(express.static(process.env.STATIC_RESOURCES_PATH));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* route declarations */
app.use('/', Index.router);
app.use('/', Login.router);

const port = process.env.PORT ?? 3000;

export const server = app.listen(port, () => {
  console.log(`HTTP server listening on port ${ port }`);
});
