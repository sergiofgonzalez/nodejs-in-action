import express from 'express';

const router = express.Router();

router.get('/login', (req: express.Request, res: express.Response) => {
  res.send(`Login module processed ${ req.url }`);
});

export { router };