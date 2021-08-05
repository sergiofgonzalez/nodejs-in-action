import express from 'express';

const router = express.Router();

router.get('/', (req: express.Request, res: express.Response) => {
  console.log(`Processing request in Index module for `, req.url );
  res.render('index',
    {
      title: 'Express app',
      welcomeMsg: 'Hello to Jason Isaacs from an Express app'
    }
  );
});

export { router };
