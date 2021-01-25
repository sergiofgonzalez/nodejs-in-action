# Part 4: Node.js avanced patterns and techniques
## Chapter 30 &mdash; Asynchronous Control Flow Patterns with Callbacks
> controlling execution flow when using callback-style programs

### Contents
+ The difficulties of asynchronous programming
+ Learning to apply control flow patterns to Node.js code: sequential and paralell
+ Controlling the concurrency limits

### Intro
Asynchronous code and continuation-passing style (CPS) can be frustrating:
+ It is difficult to predict the order execution
+ It is easy to create inefficient and unreadable code when orchestrating sets of operations

### The difficulties of asynchronous programming
Let's create a simple program to illustrate the difficulties of asynchronous programming.

The program will be a simple *web crawler* that takes in a web URL as input and downloads its contents locally into a file.

The core functionality of the module will be contained inside a module `spider.js`, and will delegate some tasks to a local module `utils.js` and to the npm packages `superagent` and `mkdirp`.

Let's have a look at the `spider.js` file:

```javascript
import fs from 'fs';
import path from 'path';
import superagent from 'superagent';
import mkdirp from 'mkdirp';
import { urlToFilename } from './utils.js';

export function spider(url, cb) {
  const filename = urlToFilename(url);

  // has filename already been downloaded
  fs.access(filename, err => {
    // ENOENT means file did not previously exist
    if (err?.code === 'ENOENT') {
      superagent.get(url).end((err, res) => {
        if (err) {
          cb(err);
        } else {
          // create the dir that will host the file
          mkdirp(path.dirname(filename), err => {
            if (err) {
              cb(err);
            } else {
              // write the responde of the HTTP request to the file system
              fs.writeFile(filename, res.text, err => {
                if (err) {
                  cb(err);
                } else {
                  cb(null, filename, true);
                }
              });
            }
          });
        }
      });
    } else {
      cb(null, filename, false);
    }
  });
}
```

The function starts by checking whether the URL was already downloaded using `fs.access(...)`. If the response is different from `ENOENT` which is the result that tells us the file does not exist, the URL will be downloaded. Otherwise, it means the file has already been downloaded, and we invoke the received callback passing it the name of the downloaded file and `false` to signal it was already there.

Then, we access the URL and get the response using `superagent.get(url).end((err, res) => ...)`. If we find and error, we invoke the callback passing `err` in the first parameter. Otherwise, we proceed to the next step.

In the next step we use `mkdirp(path.dirname(filename), err => ...)` to create the directory that will contain the file.

Finally, we write the content that was downloaded using `fs.writeFile`.

The function is invoked from a `main.js` program that invokes the function with the parameter that was given to the program and the callback that just prints some informational messages telling the user how the process went:

```javascript
import { spider } from './lib/spider.js';

spider(process.argv[2] ?? 'http://www.example.com', (err, filename, downloaded) => {
  if (err) {
    console.error(`ERROR: main: ${ err.message }`);
  } else if (downloaded) {
    console.log(`INFO: Completed download of ${ filename }`);
  } else {
    console.log(`INFO: '${ filename } was already downloaded`);
  }
});
```

| EXAMPLE: |
| :------- |
| You have the first version of the web crawler in [01 &mdash; A simple web crawler](./01-a-simple-web-crawler/). |

#### Callback hell
Even in the simple example above, you can appreciate the several levels of indentation, and the number of nested `()` and `{}` that complicates the maintainability and readability of the code.

The situation where the abundance of closures and *in-place callback* definitions transforms the code in an unreadable and unmmanageable blob is known as **callback hell*. It's one of the most widely recognized and severe *anti-patterns* of Node.js and JavaScript in general:

```javascript
asyncFoo(err => {
  asyncBar(err => {
    asyncFooBar(err => {
      ...
    })
  })
});
```

The most evident problem with this code is its poor readability &mdash; it's impossible to keep track where a function ends and where another begins.

Another issue is caused by the overlapping of the variable names used in each scope &mdash; `err`, `cb`, etc. are likely to be reused in each of the functions and it is easy to lose track of which one you are referring to. Some developers name the variables as `err1`, `err2`... but that solution is not very good either.

### Callback best practices and control flow patterns
The previous example is a textbook definition of the callback hell that we should avoid. However, it is not the only problem we should be aware of wen writing asynchronous code with callbacks. Iteration and recursion also require special techniques.

#### Callback discipline
The first rule to keep in mind is:
> Do not abuse in-place definitions when defining callbacks.

It might be tempting not to do so, as it relieves you from thinking about modularity and reusability, but in the long run, complicates the solution.

You can also apply the following principles:
+ Exit as soon as possible &mdash; use `return`, `continue`, or `break`, depending on the context, to immediately exit the current statement instead of writing (and nesting) complete *if...else* statements.
+ Create named functions for callbacks, keeping them out of closures and passing intermediate results as arguments. Naming functions will also help with problem identification in stack traces.
+ Modularize the code. Split the code into smaller, reusable functions whenever possible.

#### Applying the callback discipline
Let's apply the previous principles to our simple web crawler.

The first step consists in changing the complete *if...else* function into *early returns*:

```javascript
// if (err) {
//   cb(err)
// } else {
//   // .. everything went well
// }
if (err) {
  return cb(err)
}
// everything went well
```

This is often referred to as the **early return principle**.

| NOTE: |
| :---- |
| A common mistake when doing this simple refactoring is to forget the `return` when doing the early exit from the function. Note also that the return code from the callback is typically ignored, as the result is passed using *CPS*.

The second optimization consists in identifying reusable pieces of code such as `saveFile(...)` and `download(...)`. This will make the code more readable and alleviate the *callback pyramid*.

| EXAMPLE: |
| :------- |
| You can find the refactoring of the web crawler in [02 &mdash; Refactoring the simple web crawler](./02-refactored-simple-web-crawler/). |

As a result of the factoring, nesting has been greatly reduced, which facilitates readability, and the definition of `saveFile(...)` and `download(...)` makes the code more reusable and testable.

#### Sequential execution
In this section, we will explore how to implement asynchronous control flow patterns, starting by looking at the sequential execution flow.

![Sequential Execution Flow](images/sequential-execution-flow.png)

The main purpose of the flow is to run the tasks in sequence, one at a time and one after the other. The order of execution must be preserved because the result of a task in the list may affect the execution of the next.

There are several variations of this flow:
+ executing the tasks without propagating data across them
+ using the output of a task as the input for the next
+ iterating over a collection while running an asynchronous task on each element, one after the other

##### Executing a known set of tasks in sequence
Consider using the following *code guidelines* when execute a known set of asynchronous tasks in sequence:

```javascript
function task1(cb) {
  asyncOperation(() => {
    task2(cb)
  });
}

function task2(cb) {
  asyncOperation(() => {
    task3(cb)
  });
}

function task3(cb) {
  asyncOperation(() => {
    cb();
  });
}

// start the process
task1(() => {
  console.log(`tasks1 1, 2, and 3 executed in sequence`);
});
```

The pattern puts a lot of emphasis on the modularization of tasks, showing how it can be handled without extra packages or unnecessary closures.

Consider the following *concrete* example:

```javascript
function asyncStep1(cb) {
  console.log(`EXECUTING: asyncStep1`);
  setTimeout(() => {
    cb();
  }, 500);
}

function asyncStep2(cb) {
  console.log(`EXECUTING: asyncStep2`);
  setTimeout(() => {
    cb();
  }, 100);
}

function asyncStep3(cb) {
  console.log(`EXECUTING: asyncStep3`);
  setTimeout(() => {
    cb();
  }, 200);
}

function task1(cb) {
  asyncStep1(() => {
    console.log(`COMPLETED: task1`);
    task2(cb);
  });
}

function task2(cb) {
  asyncStep2(() => {
    console.log(`COMPLETED: task2`);
    task3(cb);
  });
}

function task3(cb) {
  asyncStep3(() => {
    console.log(`COMPLETED: task3`);
    cb();
  });
}

task1(() => {
  console.log(`tasks 1, 2, and 3 completed!`);
});
```

If we would execute them as if they were synchronous functions:

```javascript
asyncStep1(() => console.log(`COMPLETED: asyncStep1`));
asyncStep2(() => console.log(`COMPLETED: asyncStep2`));
asyncStep3(() => console.log(`COMPLETED: asyncStep3`));
```

they would not be executed one after the other.


The trick is realizing that the CPS can be used to *orchestrate* the sequence of calls. We interlace the sequencing of calls in the callbacks that we pass to each of the tasks:

```javascript
function taskN(cb) {
  asyncStepN(() => {
    taskM(cb);
  });
}
```

The logic associated to the function `asyncStepN(...)` would be executed as soon as we invoke it, and by passing as the callback a function that ultimately invoked the next task, we will ensure the proper ordering.


| EXAMPLE: |
| :------- |
| You can find the example in [03 &mdash; Static Sequencial Iteration](./03-static-sequential-iteration/). |

##### Sequential iteration with an example
This section deals with the scenario in which we cannot hardcode in advance the tasks that are to be executed. The underlying idea would be the same, only that know we will to build the task sequence dynamically.

To show it with an example, we'll introduce a few new features to the web crawler application:
+ We will download all the links contained in the web page recursively.
+ Instead of checking if a file already exists, we will try to read it and start spidering its links, so that we can resume interrupted downloads.
+ We add a new parameter `nesting` that will help us to limit the recursion depth.

The first step is to modify our `spider(...)` cuntions so that it triggers a recursive download of all the links from the page and then trigger our web crawler on each recursively and in sequence.

This recursive download of links is managed by a function named `spiderLinks()`. The logic is also updated to check whether the file already exists, and if it is so, start spidering its links.

```javascript
export function spider(url, nesting, cb) {
  const filename = urlToFilename(url);
  fs.readFile(filename, 'utf8', (err, fileContent) => {
    if (err) {
      if (err.code !== 'ENOENT') {
        return cb(err);
      }

      // ENOENT: file did not previously existed
      return downloadFile(url, filename, (err, requestContent) => {
        if (err) {
          return cb(err);
        }

        spiderLinks(url, requestContent, nesting, cb);
      });
    }

    // file already existed and was correctly read: process the links
    spiderLinks(url, fileContent, nesting, cb);
  });
}
```

The following piece of code implements the `spiderLinks(...)` function, which is the core of the new functionality. It downloads all the links of an HTML page using a sequential asynchronous iteration algorithm.

```javascript
function spiderLinks(currentUrl, body, nesting, cb) {
  if (nesting === 0) {
    // max nesting reached: return making sure the function is always async
    return process.nextTick(cb);
  }

  const links = getPageLinks(currentUrl, body);
  if (links.length === 0) {
    // no links in this page, return
    return process.nextTick(cb);
  }

  function iterate(index) {
    // processing links[index] from currentUrl
    if (index === links.length) {
      // all links processed!
      return cb();
    }

    // process links[index], updating nesting
    spider(links[index], nesting - 1, err => {
      if (err) {
        return cb(err);
      }
      // we're done with no errors, schedule next async iteration
      iterate(index + 1);
    });
  }

  // initial call to trigger the whole process
  iterate(0);
}
```

The important steps in the logic are:
+ We obtain the list of all the links in the page using `getPageLinks()` function. The function returns only the links pointing to the same `hostname` as the original `hostname` found in the argument.
+ We iterate over the links using a local function `iterate(...)`, which takes the index of the next link to analyze. We include a guard to stop the process if we're already at the end of the list of items to process.
+ We invoke `spider()` to handle the download of the next link, with the nesting reduce.
+ We bootstrap the iteration invoking `iterate(0)`.

| EXAMPLE: |
| :------- |
| You can review the full implementation in [04 &mdash; Web Crawler v2](./04-web-crawler-v2/). |


##### The pattern for sequential iteration over a collection
The following *code pattern* illustrates how to iterate asynchronously over the elements of a collection, or in general, over a list of tasks.

```javascript
function iterate(index) {
  if (index === tasks.length) {
    return finish();
  }
  const task = tasks[index];
  task(() => iterate(index + 1));
}

function finish() {
  // iteration completed
}

iterate(0);
```

This pattern can be adapted to several common use cases:
+ Map the values of an array asynchronously
+ Pass the results of an operation to the next one in the iteration to implement an asynchronous version of the *reduce* althorithm.
+ Quit the loop prematurely if a particular condition is met (e.g. async implementation of `Array.some()`).
+ Iterate over an infinite sumber of elements

Note that the pattern can be wrapped in a function:

```javascript
iterateSeries(collection, iteratorCallback, finalCallback) {
  ...
}
```

with:
+ `collection` &mdash; the dataset you want to iterate over
+ `iteratorCallback` &mdash; function that should be executed on every item
+ `finalCallback` &mdash; function to be executed when all the items have been processed or in case of error while iterating

> The **sequential iterator pattern** lets you execute a list of tasks in sequence by creating a function named `iterator`, which invokes the next available task in the collection and makes sure to invoke the next step of the iteration when the current task completes.

##### Parallel execution
When the order of execution of a set of asynchronous tasks is not important, and all we want is to be notified when all those running tasks are completed we can run the tasks using a parallel execution flow:

![Parallel execution](images/parallel_execution.png)

Note that this is possible in Node.js single-threaded model thanks to the non-blocking nature of the engine.

The details that explain how this *concurrent* or *parallel* execution is possible can be seen in the following sequence diagram. The diagram depicts how two asynchronous tasks *Task 1* and *Task 2* run in parallel in a Node.js program driven by *Main*:

![Parallel Execution: Sequence Diagram](images/parallel_execution_sequence_diagram.png)

1. The **Main** function triggers the execution of **Task 1** and **Task 2**. As they trigger a non-blocking asynchronous oepration, they immediately return control back to **Main**, which then returns to the **Event Loop**.

2. When the asynchronous operation of **Task 1** is completed, the **Event Loop** gives control to it. When **Task 1** completes its internal synchronous processing as well, it notifies the **Main** function.

3. When the asynchronous operation triggered by **Task 2** is complete, the **Event Loop** invokes its callback, giving control back to **Task 2**. At the end of **Task 2**, the **Main** function is notified once more. At this point, **Main** function knows that both **Task 1** and **Task 2** are complete, so it can continue its execution or return the results of the oeprations to another callback.

| NOTE: |
| :---- |
| This is also easy to understand with our Node.js mental model based on the *event loop*, a *call stack*, an *event queue*, and a set of underlying *runtime APIs*. |

Let's use this approach to build another version of our web crawler. In this case, instead of doing a sequential, recursive download of the linked pages, we will download all the linked pages in parallel.

The only function we need to modify is `spiderLinks(...)` to change the previous sequential approach for the parallel one:

```javascript
function spiderLinks(currentUrl, body, nesting, cb) {
  if (nesting === 0) {
    // make sure the behavior of the function is always async
    return process.nextTick(cb);
  }

  const links = getPageLinks(currentUrl, body);
  if (links.length === 0) {
    return process.nextTick(cb);
  }

  let completed = 0;
  let hasErrors = false;

  function done(err) {
    if (err) {
      hasErrors = true;
      return cb(err);
    }
    if (++completed == links.length && !hasErrors) {
      return cb();
    }
  }

  links.forEach(link => spider(link, nesting - 1, done));
}
```

Now the `spider(...)` tasks are started all at once by simply iterating over the links array and starting each task without waiting for the previous one to finish:

```javascript
links.forEach(link => spider(link, nesting - 1, done));
```

In order to control the status of the completed tasks, we provide `spider(...)` a custom callback that keeps track of the number of completed tasks and an error *guard*.

| EXAMPLE: |
| :------- |
| You can review the full implementation in [05 &mdash; Web Crawler v3](./05-web-crawler-v3/). |

##### The pattern for parallel execution over a collection of tasks
We can extract the pattern for the parallel execution flow as follows:

```javascript
const tasks = [ /* ...collection of tasks... */]

let completed = 0;
tasks.forEach(task => {
  task(() => {
    if (++completed === tasks.length) {
      finish();
    }
  });
});


function finish() {
  // all the tasks have been completed
}
```

This pattern can be adapted with small modifications to accumulate the results of each task into a collection, to filter or map the elements of an array, or to invoke the `finish()` callback as soon as one or any number of tasks complete, in what is called a **competitive race**.

> The **unlimited parallel execution pattern** runs a set of asynchronous tasks in parallel by launching them all at once, and then waits for all of them to complete by counting the number of times their callbacks are invoked.

##### Fixing race conditions with concurrent tasks
When we have multiple tasks running in parallel, we might have *race conditions* &mdash; contention to access external resources such as files or database records.

Identifying, and fixing race conditions in Node.js is a completely different story from the one you'd have for multithreaded programming languages. In those languages you would use *locks*, *mutexes*, *semaphores* and *monitors* to deal with task synchronization and race conditions. In Node.js, we don't need those synchronization mechanisms as everything runs on a single thread.

> However, that does not mean that we can't have *race conditions* in Node.js. *Race conditions* are quite common in Node.js the root cause has to do with the delay between the invocation of an asynchronous operation and the notification of its result.

In particular, our *Web Crawler v3* includes an obvious race condition:

```javascript
export function spider(url, nesting, cb) {
  const filename = urlToFilename(url);
  fs.readFile(filename, 'utf8', (err, fileContent) => {
    if (err) {
      if (err.code !== 'ENOENT') {
        return cb(err);
      }

      // ENOENT: file did not previously existed
      return downloadFile(url, filename, (err, requestContent) => {
      ...
```

Two `spider(...)` tasks operating on the same URL might invoke `fs.readFile(...)` on the same file before one of the two tasks completes the download and creates a file, causing both tasks to start a `downloadFile(...)` operation:

![Race condition example](images/race_condition_example.png)

*Task 1* and *Task 2* are interleaved in a single thread of Node.js, and we see how we can get a race condition as two separate tasks will end up downloading and writing the same file.

In this case, we can fix it using a `Set()` that would let us prevent downloading a given URL twice:

```javascript
const spidering = new Set();

export function spider(url, nesting, cb) {
  if (spidering.has(url)) {
    console.log(`INFO: spider: skipping ${ url } as it has already been processed`);
    return process.nextTick(cb);
  }
  spidering.add(url);
```

As Node.js is single threaded, and there is no background async operation involved when interacting with the `spidering` set, we can ensure that we won't trigger the execution of any URL download twice at any point in time, and therefore, we won't have the race condition anymore.

| NOTE: |
| :---- |
| A possible optimization, especially if you're dealing with a large set, would be to remove the URL from `spidering` once the download has completed successfully, as then, the file itself would be used as the guard to control the URL is not processed again. |

Race conditions can cause many problems, even in a single-threaded environment such as the one that provides Node.js. Race conditions are very difficult to spot because of their ephemeral nature, so it's considered a good practice to be proactive trying to identifying them before hand, by looking for situations on which asynchronous tasks are running in parallel and depend on the outcome of asynchronous operations.

| EXAMPLE: |
| :------- |
| You can review the full implementation in [06 &mdash; Web Crawler v4: Fixing the race condition](./06-web-crawler-v4-race-condition-fix/). |

#### Limited parallel execution
Spawning parallel tasks without control typically lead to excessive load, and ultimately crashes as the application runs out of resources.

This can also be considered a security issues, as a server that spawns unbounded parallel tasks to handle a user request could be exploited with a **denial-of-service** (DoS) attack.

Therefore, limiting the number of parallel tasks is, in general, a good practive that helps building more resilient applications.

The following diagram depicts the approach, consisting in running a set of asynchronous tasks, in parallel, but with a defined concurrency limit (two parallel tasks in the picture):

![Limited Parallel Execution](images/limited_parallel_execution.png)

The strategy is as follows:
+ We spawn as many tasks as we can without exceeding the concurrency limit.
+ Every time a task is completed, we spawn one or more tasks until we reach the limit again.

##### The pattern for limited concurrency

Consider the following snippet, that executes a set of given tasks with limited concurrency:

```javascript
const tasks = [ /* async tasks to execute in parallel */];

const concurrency = 2;
let running = 0;
let completed = 0;
let index = 0;

function next() {
  while (running < concurrency && index < tasks.length) {
    const task = tasks[index++];
    task(() => {
      if (++completed === tasks.length) {
        return finish();
      }
      running--;
      next();
    });
    running++;
  }
}

next();

function finish() {
  /* all tasks executed */
}
```

As you can see, the pattern is a mixture of the **sequential execution pattern** and the **parallel execution pattern**:
+ We have an iterator function `next(...)` and an inner loop that spawns as many tasks as possible in parallel while staying within the concurrency limit.
+ The callback that we pass to each task checks whether we have completed all the tasks in the list. If there are still tasks to run, it invokes `next()` to spawn another set of tasks.

##### Globally limiting concurrency
In some situations, the pattern described above will not be enough to control the number of operations running in the background. For example, in our *web crawler* example, that pattern won't work as we will be limiting the number of links downloaded from each page, but as each page will spawn another two downloads the grand total of download operations will end up being exponential.

> The pattern for **limited concurrency pattern** works well when we have a predetermined set of tasks to execute, or when the set of tasks grow linearly over the time. That pattern is not suitable for limiting global concurrency in other circumstances.

##### Queues to the rescue
A suitable solution for controlling the global number of asynchronous operations makes uses of **queues** to limit the concurrency of multiple tasks.

Let's consider the following module `TaskQueue` which will combine a queue with the limited concurrency algorithm:

```javascript
export class TaskQueue {
  constructor(concurrency) {
    this.concurrency = concurrency;
    this.running = 0;
    this.queue = [];
  }

  push(task) {
    this.queue.push(task);
    process.nextTick(this.next.bind(this));
    return this;
  }

  next() {
    while (this.running < this.concurrency && this.queue.length) {
      const task = this.queue.shift();
      task(() => {
        this.running--;
        process.nextTick(this.next.bind(this));
      });
      this.running++;
    }
  }
}
```

The constructor of this class takes the concurrency limit and initializes the instance variables `running` (that will keep task of the pending running tasks) and `queue`, which is supported by an array that will keep track of the pending tasks.

The `pushTask(...)` method adds a new task to the queue and bootstraps the execution of the worker by invoking `this.next()`.

| NOTE: |
| :---- |
| we're forced to use `this.next.bind(this)` to ensure that `next(...)` won't lose the context when invoked by `process.nextTick()`. Recall that `bind(thisArg[, arg1[, arg2[, ...argN]]])` creates a new function that when called, has its `this` keyword set to the provided value. |

The `next()` method spawns a set of tasks from the queue, ensuring that it does not exceed the concurrency limit.

This approach has the following advantages over the **limited concurrency pattern**:
+ It allows us to add new tasks dynamically as we go along
+ We have a *central entity* defined that is responsible for the limitation of the concurrency of our tasks, which can be shared across all the instances of a function's execution, and therefore, capable of controlling the concurrency limit globally.

##### Refining the `TaskQueue`
The `TaskQueue` from the previous section needs additional features to make it production grade:
+ better error management to identify failed tasks
+ understand when all the work in the queue has been completed

In order to add these features, we only need to modify the `next(...)` method of our previous `TaskQueue` implementation, and import the `EventEmitter` class:

```javascript
import { EventEmitter } from 'events';

export class TaskQueue extends EventEmitter {
  constructor(concurrency) {
    super();
    ...
  }

  next() {
    if (this.running === 0 && this.queue.length === 0) {
      return this.emit('empty');
    }

    while (this.running < this.concurrency && this.queue.length) {
      const task = this.queue.shift();
      task(err => {
        if (err) {
          console.log(`ERROR: TaskQueue: error processing task: ${ err.message }`);
          this.emit('error', err);
        }
        this.running--;
        process.nextTick(this.next.bind(this));
      });
      this.running++;
    }
  }
}
```

Therefore, every time the `next()` function is called, we check that no task is running and whether the queue is empty to identify that the queue has been *drained* which we communicate through the `'empty'` event.

In the task completion callback we check for errors and if an error is found we propagate it through an `'error'` event.

| NOTE: |
| :---- |
| We are keeping the queue running in case of error in purpose, without stopping other tasks in progress or removing any pending tasks. This is quite common in queue-based systems. |

| EXAMPLE: |
| :------- |
| You have a very simple example in [Hello, `TaskQueue`](./e04-hello-task-queue) that would let you understand in a simple way the usage patterns of the `TaskQueue`. |

##### Web crawler version 5

Now we can modify our web crawler to make use of the `TaskQueue` as a work backlog: every URL that we want to crawl needs to be appended to the queue as a task.

The queue will manage all the scheduling for us making sure that the number of tasks in progress is never greater than the concurrency limit.

First of all, we rename our `spider(...)` function as `spiderTask(...)` and make it our generic crawling task:

```javascript
function spiderTask(url, nesting, queue, cb) {
  const filename = urlToFilename(url);
  fs.readFile(filename, 'utf8', (err, fileContent) => {
    if (err) {
      if (err.code !== 'ENOENT') {
        return cb(err);
      }

      // ENOENT: file did not previously existed
      return downloadFile(url, filename, (err, requestContent) => {
        if (err) {
          return cb(err);
        }

        spiderLinks(url, requestContent, nesting, queue);
        return cb();
      });
    }

    // file already existed and was correctly read: process the links
    spiderLinks(url, fileContent, nesting, queue);
    return cb();
  });
}
```

Note that:
+ the function signature has changed and now accepts a parameter called `queue`. This is an instance of `TaskQueue` that we need to carry over to be able to append new tasks when necessary.
+ the function responsible for adding new links to crawl is `spiderLinks(...)`, which is no longer async. This function also receives the `queue` instance.

Now the `spiderLinks()` function gets greatly simplified, as it delegates task tracking to the `TaskQueue`. The function becomes synchronous now, as it will just invoke a new `spider(...)` function:

```javascript
function spiderLinks(currentUrl, body, nesting, queue) {
  if (nesting === 0) {
    return;
  }

  const links = getPageLinks(currentUrl, body);
  if (links.length === 0) {
    return;
  }

  links.forEach(link => spider(link, nesting - 1, queue));
}
```

Now the entry point is the `spider(...)` function, which will be responsible for pushing every new discovered URL to the queue:

```javascript
const spidering = new Set();

export function spider(url, nesting, queue) {
  if (spidering.has(url)) {
    console.log(`INFO: spider: skipping ${ url } as it has already been processed`);
    return;
  }
  spidering.add(url);
  queue.pushTask(done => {
    spiderTask(url, nesting, queue, done);
  });
}
```

Finally, we adapt the `main` script so that it instantiates the queue and invokes the `spider(...)` entry point:

```javascript
import { spider } from './lib/spider.js';
import { TaskQueue } from './lib/task-queue.js';


const url = process.argv[2] ?? 'http://www.example.com';
const nesting = Number.parseInt(process.argv[3], 10) || 1;
const concurrency = Number.parseInt(process.argv[4], 10) || 1;


const spiderQueue = new TaskQueue(concurrency);
spiderQueue.on('error', console.error);
spiderQueue.on('empty', () => console.log(`INFO: completed download of ${ url }`));

spider(url, nesting, spiderQueue);
```

| EXAMPLE: |
| :------- |
| You can review the full implementation of the `TaskQueue` and the Web Crawler v5 in [07 &mdash; Web Crawler v5](./07-web-crawler-v5/). |


### The `async` library
The [`async`](https://www.npmjs.com/package/async) is a very popular utility module that implements the patterns we've seen in this chapter, and many other ones.

The most important capabilities of this library are:
+ execute async functions over a collection of elements in series or in parallel, and with limited concurrency.
+ provides a queue abstraction that is functionally equivalent to our `TaskQueue` implementation.
+ additional sophisticated async patterns such as *race* which execute multiple async function in parallel and stops when the first one completes.

In general, once you've grasped the fundamentals and rationale behind the patterns presented it is recommended to rely on battle-tested libraries such as `async` for your production applications.

### You know you've mastered this chapter when...
+ You understand the difficulties of asynchronous code and CPS programming: readability and efficiency
+ You are aware of the callback discipline rules, that will let you minimize the difficulties associated to asynchronous programming with callbacks:
  + Do not abuse in-place definitions when using callbacks &mdash; use named functions instead.
  + Exit as soon as possible instead of nesting.
  + Modularize the code as much as possible, creating smaller, reusable, named functions.
+ You know how to manually *sequence* a predefined set of tasks when using CPS.
+ You're aware of the pattern for sequential iteration over a collection.
+ You're aware of the pattern for the unlimited parallel execution, and understand that in general, it is better to control concurrency so that the number of concurrent tasks do not grow out of control.
+ You understand what is race condition, and you know the general guidelines to identify where it might happen in Node.js, even when being single threaded (delay between the invocation of an asynchronous operation and the notification of the result).
+ You understand what can you do to limit the exposure to race conditions.
+ You know about the pattern for limited concurrency, and understand that is much better behaved than the one for unlimited parallel execution.
+ You're aware that the pattern for unlimited concurrency might be challenging when you cannot globally limit the concurrency.
+ You understand that implementing a *queue* to control the number of asynchronous operation is a robust way to limit the concurrency of parallel asynchronous operations. You're aware of how to use this pattern, and how to make it more robust through *events*.
+ You know that for production grade scenarios, `async` is a very good solution for implementing the aforementioned asynchronous patterns and many more.

### Code, Exercises and mini-projects

#### [01 &mdash; A simple web crawler](./01-a-simple-web-crawler/)
First version of a simple web crawler that takes in a web URL as input and downloads its contents locally to a file

#### [02 &mdash; Refactoring the simple web crawler](./02-refactored-simple-web-crawler/)
Second version of the simple web crawler, in which the principles of the *callback discipline* have been applied.

#### [03 &mdash; Static Sequential Iteration](./03-static-sequential-iteration/)
Illustrates how to orchestrate a predefined set of asynchronous tasks, known in advanced, so that they are executed sequentially.

#### [04 &mdash; Web Crawler v2](./04-web-crawler-v2/)
The original example [01 &mdash; A simple web crawler](../01-a-simple-web-crawler) with some additional features and a recursive, sequential download of linked pages.

#### [05 &mdash; Web Crawler v3](./05-web-crawler-v3/)
The original example [01 &mdash; A simple web crawler](../01-a-simple-web-crawler) but applying a parallel downloading of linked pages.

#### [06 &mdash; Web Crawler v4: Fixing the race condition](./06-web-crawler-v4-race-condition-fix/)
An improvement over [05 &mdash; Web Crawler v3](../05-web-crawler-v3) that includes a fix for a possible race condition when two `spider()` tasks download the same file.

#### [07 &mdash; Web Crawler v5](./07-web-crawler-v5/)
The final version of the Web Crawler, that uses a `TaskQueue` to control the concurrency of parallel requests.

#### Exercise 1: [File Concatenation](./e01-file-concatenation/)
Write the implementation of `concatFiles(...)`, a callback-style function that takes two or more paths to text files in the file system and a destination file.

This function must copy the contents of every source file into the destination file, respecting the order of the files as provided by the arguments list. Also, the function must be able to handle an arbitrary number of arguments.

#### Exercise 2: [List files recursively](./e02-list-files-recursively/)
Write `listNestedFiles()`, a callback-style function that takes as the input the path to a directory in the local filesystem, and that asynchronously iterates over all the subdirectories to eventually return a list of all the files discovered.

#### Exercise 3: [Recursive find](./e03-recursive-find/)
Write `recursiveFind()`, a callback-style function that takes a path to a directory in the local filesystem and a keyword as per the following signature:
```javascript
function recursiveFind(dir, keyword, cb)
```

The function must find all the text files within the given directory that contain the given keyword in the file contents. The list of matching files should be returned using the callback when the search is completed. If not matching file is found, the callback must be invoked with an empty array.

As an example test case, if you have the files `foo.txt` and `bar.txt` and `baz.txt` in `myDir` and the keyword `batman` is contained in the files `foo.txt`, and `baz.txt` making the call:

```javascript
recursiveFind('myDir', 'batman', console.log)
// should print ['foo.txt', 'baz.txt']
```

The final solution must make the search recursive, so that it looks for files in any subdirectory of the given directory, and in parallel using a `TaskQueue` so that the number of parallel tasks don't grow out of control.

#### Example 4: [Hello, `TaskQueue`](./e04-hello-task-queue)
A very simple example demonstrating the usage pattern for our `TaskQueue` class. In the example, we use the `TaskQueue` to classify a large number of numbers into even and odd.

