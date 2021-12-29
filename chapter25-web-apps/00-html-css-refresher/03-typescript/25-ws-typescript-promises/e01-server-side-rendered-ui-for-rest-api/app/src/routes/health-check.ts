import express from 'express';

const router = express.Router();

router.get('/health-check', (req: express.Request, res: express.Response) => {
  console.log(`Processing health-check for`, req.url );
  const result = {
    timestamp: new Date().toISOString(),
    url: req.url,
    status: 'alive!'
  };
  res.send(result);
});

export { router };
