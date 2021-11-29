import path from 'path';
import express from 'express';

const PORT = process.env.PORT ?? 5000;

const app = express();
app.use(express.static(path.join(__dirname, 'public')));

export const server = app.listen(PORT, () => {
  console.log(`SITE2: serving client app resources on port ${ PORT }`);
});

