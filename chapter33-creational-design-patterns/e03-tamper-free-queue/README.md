# Part 4: Node.js avanced patterns and techniques
## Chapter 33 &mdash; Creational design patterns
### Exercise 3: A tamper-free queue
Create a `Queue` class that has only one publicly accessible method called `dequeue()`. Such a method returns a `Promise` that resolves with a new element extracted from an internal `queue` data structure.

If the queue is empty, then the `Promise` will resolve when a new item is added. The `Queue` class must also have a *revealing constructor* that provides a function called `enqueue()` to the *executor* that pushes a new element to the end of the internal queue.

The `enqueue()` function can be invoked asynchronously and it must also take care of unblocking any eventual `Promise` returned by the `dequeue()` method.

To try out the `Queue` class, you could build a small HTTP server into the executor function. Such a server would received messages or tasks from a client and would push them into the queue. A loop would then consume all those messages using the `dequeue()` method.

#### Solution

The solution needed some iterations as there were many things to do.

In the first version (*v0*) the `Queue_v0` class was created. This one featured private fields using conventions, and did not use yet the *Revealing Constructor* pattern. However, this one already included the logic to block the execution when calling `dequeue()` on an empty queue.

You can run `node app/src/main_v0.js` to understand the solution in detail.


Then, in the version (*v1*), the `Queue` class was enhanced with a *Revealing Constructor* and the private fields and methods were protected using https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_class_fields.

You can run `node app/src/main_v1.js` to understand and debug the solution.

The final version of the application does not include changes in the `Queue` class, but provides the server described in the exercise.

```javascript
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
```

Note that in the *executor* we set up a simple HTTP server which accepts requests and transforms them into *tasks*. The server responds immediately to the client with an HTTP status 201 when the task is enqueued (which is possible because we're in the *executor* of the *Revealing Constructor* pattern).

Then the tasks that are added the to the queue are consumed asynchronously, in sequence and one by one using a loop, leveraging the capability of the queue to *sleep* if there are no items in the queue, and yet be able to wake up once items have been addded.
