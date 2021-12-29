import express from 'express';
import * as Tasks from '../services/tasks';

const router = express.Router();

router.post('/todos', (req: express.Request, res: express.Response) => {
  console.log(`Processing POST /todos`);
  Tasks.create({ id: undefined, desc: (req.body?.taskDesc as string)})
    .catch((err) => {
      console.error(`ERROR: could not save new task: ${ (err as Error).message }`);
      /* probably do some alerting here */
    })
    .finally(() => {
      res.redirect('/');
    });
});

router.put('/todos/:id', (req: express.Request, res: express.Response) => {
  console.log(`Processing PUT /todos/${ req.params.id }`);
  return Tasks.update({ id: Number.parseInt(req.params.id), desc: req.body.desc })
    .then(() => res.status(200).end())
    .catch((err) => {
      console.error(`ERROR: could not update task ${ req.params.id }: ${ (err as Error).message }`);
      /* probably do some alerting here */
    });
});

router.delete('/todos/:id', (req: express.Request, res: express.Response) => {
  console.log(`Processing DELETE /todos/${ req.params.id }`);
  return Tasks.remove({ id: Number.parseInt(req.params.id), desc: req.body.desc })
    .then(() => res.status(204).end())
    .catch((err) => {
      console.error(`ERROR: could not update task ${ req.params.id }: ${ (err as Error).message }`);
      /* probably do some alerting here */
    });
});

export { router };
