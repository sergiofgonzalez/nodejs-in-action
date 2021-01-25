# 07-hello-events-echo-server
> illustrates handling events implementing a simple tcp server

## Description
Illustrates the most basic event handling operation: register a listener for a particular event.

In the example, a simple TCP server is established and an event listener is registered to listen for `data` events. Whenever this type of event is received, it is echoed in the same socket.

### Additional info
The *Echo TCP Server* is based on the core `net` module.

Once running, you can connect to it using *telnet*:
```bash
$ telnet 127.0.0.1 8888
Trying ::1...
Connected to localhost.
Escape character is '^]'.
hello
echo: hello
```

Remember that you can finish a telnet session clicking CTRL+]