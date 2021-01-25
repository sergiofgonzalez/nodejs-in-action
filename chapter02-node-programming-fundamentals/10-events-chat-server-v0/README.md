# 10-events-chat-server-v0
> illustrating Node.js events in a chat server application

## Description
This example creates a very simple TCP chat server to which clients can connect and send messages that are broadcasted to all connected clients.

### Implementation details
The implementation tries to illustrate the use of events in Node.js applications, so the core of the functionality is based on events.

The application starts by creating a custom `EventEmitter` named `channel` that will handle the application logic.
It features two properties:
+ `clients` &mdash; a map of client sockets by *id*. The *id* is simply the concatenation of the client IP address and port, and the clientSocket is kept there to be able to write back to the client whenever it is needed.
+ `subscriptions` &mdash; a map of functions that will perform the actual writing on the client socket, indexed by *id*. Again, the *id* is the concatenation of the client IP address and port.

The channel defines two events:
+ `"join"` &mdash; the event describing a new client that connects to the TCP server. It should be received only *once per client*.
+ `"broadcast"` &mdash; the event describing that a new message is available.

The `"join"` event listener requires a function that receives the *client's id* and the *client's socket* object, and when an event of this type is received the application:
+ registers the new connection in the `clients` map.
+ registers the function that will handle `"broadcast"` for this client in the `subscriptions` map. The function logic is the same for all the clients and consists in checking whether the client that originated the message is the same that received the `"broadcast"` event (in which case nothing will be done, as we don't want to echo the message) and if it's not, use the client's socket to write the incoming message.
+ register the listener for the `"broadcast"` event with the function previously defined. The listener for this event accepts the id of the client who originated the message and string representing the message.
+ use the client socket to write an informational message to the client joining, informing him/her of his/her client id.

Then, the *TCP server* is created. To create the server we use:
```javascript
const server = net.createServer(clientSocket => {
...
}
```
So, on creation, you define a function that accepts the client socket and that will be invoked the first time a new client joins the server.
The logic for that function is as follows:
+ create the client id used to index the `clients` and `subscriptions` maps by reading the properties of the client socket.
+ emit a `"join"` event so that the new client is correctly registered.
+ register a listener for the `"data"` event on the client socket, so that each time we receive a new message from this client the appropriate actions are taken. The logic for this function consists in emitting a broadcast event sending the client id that originated the message and the message as a string.

Once the server is created, it starts listening on port 8888.

### Events
So, the application is completely event-based, extensively using the observer pattern to handle application behavior:

+ When a new client connects to the TCP server using telnet, the function associated to `createServer` is activated. This emits a `"join"` event and registers a listener for the `"data"` event which will ultimately emit a `"broadcast"` event.
+ When a `"join"` method is received, the internal state of the application changes to register the new client and its listener for the `"broadcast"` event.
+ When a socket `"data"` event is received, a `"broadcast"` event is triggered. All connected clients have listeners for this event, which consist of writing on the client socket if the message was originated by other client (otherwise, the event will be ignored).


### Additional info
This is the first version of the application, and it is improved in the subsequent examples.
In this particular version, the application crashes if a client disconnects from the chat server.

**Note:**
To disconnect from telnet use CTRL+]