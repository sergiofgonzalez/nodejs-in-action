import { Queue } from './lib/Queue.js';
import http from 'http';


async function main() {
  const queue = new Queue((enqueue) => {
    const server = http.createServer((req, res) => {
      const task = `${ req.method }::${ req.url }::${ req.headers['x-task-id'] }`;
      enqueue(task);

      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(`${ task }\n`);
    });

    server.listen(5000, () => console.log(`INFO: task-server: listening on port 5000`));
  });

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const task = await queue.dequeue();
    console.log(`INFO: task-server: processing task '${ task }'`);

    // simulating task processing takes some time
    await new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Processing of ${ task } done!`);
        resolve();
      }, 5000);
    });
  }
}

main()
  .then(() => console.log(`INFO: main: done!`))
  .catch((err) => console.error(`ERROR: main: could not complete: ${ err.message }`));
