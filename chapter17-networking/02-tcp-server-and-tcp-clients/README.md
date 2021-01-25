# 02-tcp-server-and-tcp-clients
> creating a TCP server and TCP clients in Node.js

## Description
This example illustrates how to set up a *TCP server* and a couple of *TCP clients* using the `net` module.
The program is implemented as a *unit test* so that assertions are included as part of the program.

The details are as follows:
+ server:
  + API:
    + `net.createServer` &mdash; Establish a TCP server on the given port The method accepts a callback that receives a socket for the client connection.
    + `close()` &mdash; terminates the connections and frees up the resources associated to the server.
  + Events:
    + `"end"` &mdash; triggered when the server has closed
    + `"error"` method will be triggered when there is a problem in the server.

+ client:
  + API:
    + `net.connect(server, port)` &mdash; establish a TCP connection with a server. The function returns a socket.

+ socket:
  + API:
    + `write()` &mdash; send data to the other party in the communication.
    + `end()` &mdash; close the connection when you're done with the socket.
  + Events:
    + `"data"` &mdash; triggered when data is received through the socket.
    + `"end"` &mdash; triggered when client has been closed.
    + `"error"` method will be triggered when there is a problem in the server.
