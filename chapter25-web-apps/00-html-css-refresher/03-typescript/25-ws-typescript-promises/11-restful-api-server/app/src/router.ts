import { IncomingMessage, ServerResponse } from 'http';
import { ToDoTaskModel } from './db';
import { app } from './main';

function parseBody(req: IncomingMessage): Promise<ToDoTaskModel> {
  return new Promise((resolve, reject) => {
    let body = ``;
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        resolve(JSON.parse(body));
      } catch (err) {
        console.error(`ERROR: could not parse incoming message: ${ (err as Error).message }`);
        reject(err);
      }
    });
  });
}

function handleCreate(req: IncomingMessage, res: ServerResponse) {
  return parseBody(req)
    .then(body => app.db.create(body).then(() => res.end()))
    .catch(err => app.handleError(res, 500, err.message));
}

function handleDelete(requestParam: number, res: ServerResponse) {
  return app.db
    .delete(requestParam)
    .then(() => res.writeHead(204).end())
    .catch(err => app.handleError(res, 500, err.message));
}

function handleGetAll(res: ServerResponse) {
  return app.db
    .getAll()
    .then(data => res.end(JSON.stringify(data)))
    .catch(err => app.handleError(res, 500, err.message));
}

function handleGetOne(requestParam: number, res: ServerResponse) {
  return app.db
    .getOne(requestParam)
    .then(data => {
      if (data) {
        res.end(JSON.stringify(data));
      } else {
        app.handleError(res, 404, `Not Found.`);
      }

    })
    .catch(err => app.handleError(res, 500, err.message));
}

function handleUpdate(requestParam: number, req: IncomingMessage, res: ServerResponse) {
  return parseBody(req)
    .then(body => app.db.update({ ...body, id: requestParam }).then(() => res.end()))
    .catch(err => app.handleError(res, 500, err.message));
}

export function toDoTaskRouter(req: IncomingMessage, res: ServerResponse) {
  const urlParts = req.url?.split(`/`) ?? `/`;
  const requestParam = urlParts[2];
  res.setHeader(`Content-Type`, `application/json`);
  switch (req.method) {
    case `DELETE`:
      if (requestParam) {
        return handleDelete(Number.parseInt(requestParam), res);
      }
      console.error(`ERROR: delete operation requires an id but it was not found`);
      return app.handleError(res, 400, 'Bad Request.');

    case `GET`:
      if (requestParam) {
        return handleGetOne(Number.parseInt(requestParam), res);
      }
      return handleGetAll(res);

    case `POST`:
      return handleCreate(req, res);

    case `PUT`:
      if (requestParam) {
        return handleUpdate(Number.parseInt(requestParam), req, res);
      }
      console.error(`ERROR: update operation requires an id but it was not found`);
      return app.handleError(res, 400, 'Bad Request.');

    default:
      console.error(`ERROR: ${ req.method } cannot be handled by this router`);
      app.handleError(res, 405, `Method not allowed.`);
  }
}