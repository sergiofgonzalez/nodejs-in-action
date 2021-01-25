# 13-forking-workers-process-pool

> using `fork` to create a platform that distributes tasks to a pool of workers

## Description

Spinning up a new child process to handle a task do not scale well: at least 30ms startup and 10 MB of memory will be consumed.

In order to improve that, the example creates a pool of processes and assign tasks to those. This functionality is encapsulated in the `./lib/pooler`, which sets up a queue of ready and waiting tasks.

Then, in the `index.js` we establish a basic http server that will assign a task to complete to one of the processes in the pool.

Note that the `package.json` is prepared to show debugging info.