# 02-hello-cluster-messaging
> the basics of Node.js `cluster` messaging

## Description
As masters and workers run in separate OS processes, they can't share state through global variables. If you need to communicate pieces of data between them you have to use inter-process communication with events and `process.send`.

In the example, we establish a cluster of masters and workers in which messages are passed between the masters and workers. A count of all requests is kept by the master, and whenever a worker reports handling a requets it's relayed to each worker.
