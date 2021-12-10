import { createServer, IncomingMessage, Server, ServerResponse } from 'http';
import { ToDoTaskDb } from './db';
import { toDoTaskRouter } from './router';

class App {
  db: ToDoTaskDb;
  #server: Server;

  constructor(private port: number) {
    this.db = new ToDoTaskDb();
    this.#server = createServer(this.requestHandler.bind(this));
  }

  initialize() {
    return Promise.all([
      this.db.initialize(),
      new Promise(resolve =>
        this.#server.listen(this.port, () => resolve(true)))
    ])
      .then(() => console.log(`INFO: server listening at port ${ this.port }`));
  }

  requestHandler(req: IncomingMessage, res: ServerResponse) {
    res.setHeader(`Access-Control-Allow-Origin`, `*`); // CORS
    res.setHeader(`Access-Control-Allow-Headers`, `*`);
    res.setHeader(`Access-Control-Allow-Methods`, `DELETE, GET, OPTIONS, POST, PUT`);

    if (req.method === `OPTIONS`) {
      return res.end();
    }

    const urlParts = req.url?.split(`/`) ?? `/`;
    switch (urlParts[1]) {
      case 'todos':
        return toDoTaskRouter(req, res);
      default:
        return this.handleError(res, 404, `Not Found.`);
    }
  }

  handleError(res: ServerResponse, statusCode = 500, message = `Internal Server Error.`) {
    return res
      .writeHead(statusCode)
      .end(message);
  }
}

export const app = new App(5000);
app.initialize();