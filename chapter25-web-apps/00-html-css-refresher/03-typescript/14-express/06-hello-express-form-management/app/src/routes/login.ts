import express from 'express';

const router = express.Router();

router.get('/login', (req: express.Request, res: express.Response) => {
  res.render('login', { title: 'Express Login', errorMessage: null });
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
router.post('/login', (req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.log(`req.body.username:`, req.body.username);
  res.send('ok');
});

export { router };