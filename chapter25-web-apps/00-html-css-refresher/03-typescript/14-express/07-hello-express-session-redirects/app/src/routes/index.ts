import express from 'express';
import { ISessionData } from './session-data';

const router = express.Router();

router.get('/', (req: express.Request, res: express.Response) => {
  console.log(`Processing request in Index module for `, req.url );
  res.render('index',
    {
      title: 'Express app',
      welcomeMsg: 'Hello to Jason Isaacs from an Express app',
      username: (<ISessionData>req.session).username
    }
  );
});

export { router };
