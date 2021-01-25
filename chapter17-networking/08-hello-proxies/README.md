# 08-hello-proxies
> illustrates how to implement a simplistic HTTP proxy using Node.js *core* modules

## Description
This example illustrates how to implement a *simplistic* HTTP proxy that catches HTTP requests and responses and then mirrors them to their intended destinations. This is useful for logging, caching and security-related software.

In the implementation, we set up a server on port 8080 (the default port for proxies) and when we received a request we do the following:
+ build an *options object* using `url.parse()` copying the original headers from the request
+ perform the request to the intended target using `http.request()`.
  + Establish listeners for the `"data"` and `"end"` 
  + Use `res.writeHead()` to with the status code and headers received in the request.
+ establish listeners for the `"data"` and `"end"` for the original request