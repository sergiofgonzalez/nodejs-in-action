import express from 'express';
import * as Tasks from '../services/tasks';
import { ToDoTask } from '../models/todo-task';
import { ErrorMessage } from '../models/error-message';

const router = express.Router();

router.get('/', (req: express.Request, res: express.Response) => {
  let tableContents: ToDoTask[] | ErrorMessage;
  Tasks.findAll()
    .then((tasks) => tableContents = tasks)
    .catch((err) => {
      console.error(`ERROR: could not retrieve table contents: ${ (err as Error).message }`);
      tableContents = { errDesc: `Tasks could not be retrieved at this moment` };
    })
    .finally(() => res.render('pages/index', { tableContents }));
});

export { router };

/*
  fetch('http://localhost:5000/todos')
    .then((res) => {
      if (res.status !== 200) {
        console.error(`ERROR: fetch 'GET /todos' returned error status: ${ res.status } (${ res.statusText })`);
        throw new Error(`Fetch 'GET /todos' error`);
      }
      return res.json();
    })
    .then((tasks: ToDoTask[]) => {
      if (tasks.length === 0) {
        console.log(`INFO: no tasks retrieved!`);
        const tableBody = document.createElement('tbody');
        const tr = document.createElement('tr');
        const th = document.createElement('th');
        th.scope = 'row';
        th.colSpan = 3;
        th.setAttribute('style', 'text-align: center');
        th.textContent = 'Nothing to do';
        tr.appendChild(th);
        tableBody.appendChild(tr);

        const oldTableBody = getValidatedHtmlElement('tbody');
        table.removeChild(oldTableBody);
        table.appendChild(tableBody);

        return;
      } else {
        console.log(`INFO: ${ tasks.length } task${ tasks.length === 1 ? '' : 's'} retrieved from the server`);
        const tableBody = document.createElement('tbody');
        for (const task of tasks) {
          const tr = getTableRow(task);
          tableBody.appendChild(tr);
        }
        const oldTableBody = getValidatedHtmlElement('tbody');
        table.removeChild(oldTableBody);
        table.appendChild(tableBody);
        return;
      }
    })
    .catch((err) => {
      console.error(`ERROR: Could not retrieve ToDo tasks from server: ${ (err as Error).message }`);
    });
}
*/