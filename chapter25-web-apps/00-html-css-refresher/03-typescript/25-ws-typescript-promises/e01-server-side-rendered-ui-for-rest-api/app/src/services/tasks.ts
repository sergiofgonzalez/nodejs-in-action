import { ToDoTask } from '../models/todo-task';
import superagent from 'superagent';

export function findAll(): Promise<ToDoTask[]> {
    return superagent
      .get('http://localhost:5000/todos')
      .then((res) => {
        if (res.status !== 200) {
          console.error(`ERROR: 'GET /todos' returned error status: ${ res.status }`);
          throw new Error(`Could not retrieve tasks`);
        }
        const retrievedTasks: ToDoTask[] = res.body;
        return retrievedTasks;
      })
      .catch((err) => {
        console.error(`ERROR: Task.findAll() could not retrieve tasks: ${ (err as Error).message }`);
        throw err;
      });
}

export function create(toDoTask: ToDoTask): Promise<void> {
  return superagent
    .post(`http://localhost:5000/todos`)
    .send(toDoTask)
    .set('Content-Type', 'application/json')
    .then(res => {
      if (res.status !== 200) {
        console.error(`ERROR: POST /todos returned unexpected status: ${ res.status }`);
        throw new Error('Could not post new todo');
      }
    })
    .catch(err => {
      console.error(`ERROR: Task.create() could not create new task: ${ (err as Error).message }`);
      throw err;
    });
}

export function update(todoTask: ToDoTask): Promise<void> {
  return superagent
    .put(`http://localhost:5000/todos/${ todoTask.id }`)
    .send(todoTask)
    .set('Content-Type', 'application/json')
    .then(res => {
      if (res.status !== 200) {
        console.error(`ERROR: POST /todos returned unexpected status: ${ res.status }`);
        throw new Error('Could not post new todo');
      }
    })
    .catch(err => {
      console.error(`ERROR: Task.create() could not create new task: ${ (err as Error).message }`);
      throw err;
    });
  // return superagent
  //   .put(`http://localhost:5000/todos`)
  //   .send(todoTask)
  //   .set('Content-Type', 'application/json')
  //   .then((res) => {
  //     if (res.status !== 200) {
  //       console.error(`ERROR: PUT /todos/${ todoTask.id } returned unexpected status: ${ res.status }`);
  //       throw new Error(`Could not update todo task`);
  //     }
  //   })
  //   .catch((err) => {
  //     console.error(`ERROR: Task.update() could not update task with id=${ todoTask.id }: ${ (err as Error).message }`);
  //     throw err;
  //   });
}

export function remove(todoTask: ToDoTask): Promise<void> {
  return superagent
    .delete(`http://localhost:5000/todos/${ todoTask.id }`)
    .set('Content-Type', 'application/json')
    .then((res) => {
      if (res.status !== 204) {
        console.error(`ERROR: DELETE /todos/${ todoTask.id } returned unexpected status: ${ res.status }`);
        throw new Error(`Could not update todo task`);
      }
    })
    .catch((err) => {
      console.error(`ERROR: Task.remove() could not delete task with id=${ todoTask.id }: ${ (err as Error).message }`);
      throw err;
    });
}