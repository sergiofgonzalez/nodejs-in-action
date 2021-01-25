# 08-hello-events-only-once
> illustrates handling one-time events implementing a simple tcp server

## Description
Illustrates the `once` method to handle one-time events by register a listener for the `data` event on a simple TCP server.

In the example, only the first message will be echoed.

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