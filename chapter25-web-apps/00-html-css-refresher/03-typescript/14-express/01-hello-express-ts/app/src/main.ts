import express from 'express';

export const app = express();

app.get('/', (req: express.Request, res: express.Response) => {
  console.log(`request URL: `, req.url);
  res.send(`Hello, Express!!`);
});

export const server = app.listen(3000, () => {
  console.log(`HTTP server listening on port 3000`);
});
