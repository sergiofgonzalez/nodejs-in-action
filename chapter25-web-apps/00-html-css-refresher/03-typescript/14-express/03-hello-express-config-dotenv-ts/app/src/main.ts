import express from 'express';
import dotenv from 'dotenv';
import * as Index from './routes/index';
import * as Login from './routes/login';

enum ConfigOptions {
  PORT = 'PORT'
}

dotenv.config(); // bootstrap configuration
export const app = express();

app.use('/', Index.router);
app.use('/', Login.router);


let port = 3000;

if (process.env[ConfigOptions.PORT]) {
  port = Number(process.env[ConfigOptions.PORT]);
} else {
  console.log(`No port config was found using default port:`, port);
}

export const server = app.listen(port, () => {
  console.log(`HTTP server listening on port ${ port }`);
});
