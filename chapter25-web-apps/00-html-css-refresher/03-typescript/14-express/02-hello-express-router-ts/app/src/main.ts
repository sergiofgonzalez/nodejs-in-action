import express from 'express';
import * as Index from './routes/index';
import * as Login from './routes/login';

export const app = express();

app.use('/', Index.router);
app.use('/', Login.router);

export const server = app.listen(3000, () => {
  console.log(`HTTP server listening on port 3000`);
});
