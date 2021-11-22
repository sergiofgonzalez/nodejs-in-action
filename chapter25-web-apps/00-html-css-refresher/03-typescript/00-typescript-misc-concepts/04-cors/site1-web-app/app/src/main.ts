import path from 'path';
import express from 'express';

const PORT = process.env.PORT ?? 5050;

const app = express();
app.use(express.static(path.join(__dirname, 'public')));

export const server = app.listen(PORT, () => {
  console.log(`SITE1: serving resources on port ${ PORT }`);
});

