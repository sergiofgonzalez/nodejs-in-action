import express from 'express';
import { ISessionData } from './session-data';

const router = express.Router();

router.get('/login', (req: express.Request, res: express.Response) => {
  res.render('login', { title: 'Express Login', errorMessage: null });
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
router.post('/login', (req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.log(`req.body.username:`, );
  if (req.body.username?.length > 0) {
    console.log(`found username in request:`, req.body.username);
    (<ISessionData>req.session).username = req.body.username;
    res.redirect('/');
  } else {
    console.error(`username not found in request: resending login page with errorMessage`);
    res.render('login', { title: 'Express Login', errorMessage: 'Please enter a username and password' });
  }
});

export { router };