import express from 'express';

const router = express.Router();

interface ToDoTask {
  id: number;
  desc: string;
  done: boolean;
}


router.get('/tasks', (req: express.Request, res: express.Response) => {
  const tasks: ToDoTask[] = [
    { id: 1, desc: 'Buy flowers', done: true },
    { id: 2, desc: 'Collect concert tickets', done: false },
    { id: 3, desc: 'Prepare dinner', done: false }
  ];

  res.render('pages/tasks', { tasks });
});

export { router };
