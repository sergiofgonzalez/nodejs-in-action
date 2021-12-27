import express from 'express';

const router = express.Router();

router.get('/', (req: express.Request, res: express.Response) => {
  const user = req?.query?.name || 'you';
  const admin = req?.query?.admin === 'true';
  console.log(`Processing request in Index module for `, req.url );
  res.render('pages/index', {
    user,
    username: {
      firstName: user,
      admin
    },
    title: 'index'
  });
});

export { router };
