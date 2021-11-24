import path from 'path';
import express from 'express';

const PORT = process.env.PORT ?? 5050;

const app = express();
app.use(express.static(path.join(__dirname, 'public')));

export const server = app.listen(PORT, () => {
  console.log(`serving static content on port ${ PORT }`);
});

