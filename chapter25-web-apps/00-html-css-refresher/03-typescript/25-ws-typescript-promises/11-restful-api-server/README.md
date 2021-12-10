# 11: Using promises in TypeScript &mdash; Building a RESTful API server
> Creating a REST API using the Node.js `http` module, backed by SQLite.

## Description

This example illustrates how to implement a simple REST API to handle *ToDo tasks* using Node.js `http` module for the HTTP server concerns and `sqlite` as the client for the SQLite database.

The implementation does not use async/await constructs to illustrate how to work with `then` and `catch`.

The application consists of three major components:
+ The `ToDoTaskDb` class &mdash; responsible for all the operations in the database. It exposes the usual methods for the CRUD operations (`create`, `getOne`, `getAll`...), as well as a constructor and an asynchronous initialization method `initialize`. This is needed because constructors do not resolve promises before returning. That is, a constructor may invoke methods that return promises, but they will not resolve the promise as they return an instance of the class. As a result, it is cleaner to use a separate initialization method that does not have such restriction.

+ The `App` class &mdash; responsible for the HTTP server, but not for the business logic associated to the requests. It exposes a constructor and an initialization method, and registers a function to handle each of the incoming requests `requestHandler`. In this function, the technical parts of the requests are examined (e.g. url path to identify the resource), and the actual business processing of the request is delegated to a router when the resource matches a known resource (i.e., `todo`).<br> It also features a convenience method `handleError` that can be used as an static method in any application component to reply with an error.

+ The *Router* component &mdash; a collection of functions that performs the *business logic* of the application. The component exposes a `toDoTaskRouter` function that inspects the requests and delegate to specific functions that handle the creation, retrieval, update and deletion of entries.

| NOTE: |
| :---- |
| The SQLite connection is handled in memory, and therefore, the data will be lost when you restart the application. |

## Functionality walkthrough

Sending a request to the root triggers a *404 Not Found*:

```bash
$ curl -v http://localhost:5000
*   Trying 127.0.0.1:5000...
* Connected to localhost (127.0.0.1) port 5000 (#0)
> GET / HTTP/1.1
> Host: localhost:5000
> User-Agent: curl/7.71.1
> Accept: */*
>
* Mark bundle as not supporting multiuse
< HTTP/1.1 404 Not Found
< Access-Control-Allow-Origin: *
< Access-Control-Allow-Headers: *
< Access-Control-Allow-Methods: DELETE, GET, OPTIONS, POST, PUT
< Date: Thu, 02 Dec 2021 09:43:18 GMT
< Connection: keep-alive
< Keep-Alive: timeout=5
< Transfer-Encoding: chunked
<
* Connection #0 to host localhost left intact
Not Found.
```

Sending a request to the `/todos` endpoint before inserting anything:

```bash
$ curl http://localhost:5000/todos
[]
```

Sending a request to insert a new ToDo task:
```bash
$ curl http://localhost:5000/todos/ \
  --header 'Content-Type: application/json' \
  --data-raw '{ "desc": "Buy museum tickets" }'
```

Sending a request to the `/todos` endpoint afer having inserted one task:

```bash
$ curl http://localhost:5000/todos
[{"id":1,"desc":"Buy museum tickets"}]
```

Sending a request to insert a second task:
```bash
$ curl http://localhost:5000/todos/ \
  --header 'Content-Type: application/json' \
  --data-raw '{ "desc": "Learn TypeScript" }'
```

Get the recently inserted task:
```bash
$ curl http://localhost:5000/todos/2
{"id":2,"desc":"Learn TypeScript"}
```

Update the description of the previously inserted task:
```bash
$ curl http://localhost:5000/todos/2 \
  --request PUT \
  --header 'Content-Type: application/json' \
  --data-raw '{ "desc": "Master TypeScript" }'
```

Delete the first task we inserted:

```bash
$ curl --verbose http://localhost:5000/todos/1 \
  --request DELETE
$ curl --verbose http://localhost:5000/todos/1 \
>   --request DELETE
...
> DELETE /todos/1 HTTP/1.1
> Host: localhost:5000
...
< HTTP/1.1 204 No Content
< Access-Control-Allow-Origin: *
< Access-Control-Allow-Headers: *
< Access-Control-Allow-Methods: DELETE, GET, OPTIONS, POST, PUT
...
```

Try to get the task recently deleted:

```bash
$ curl --verbose http://localhost:5000/todos/1
...
> GET /todos/1 HTTP/1.1
> Host: localhost:5000
> User-Agent: curl/7.71.1
> Accept: */*
>
...
< HTTP/1.1 404 Not Found
< Access-Control-Allow-Origin: *
< Access-Control-Allow-Headers: *
< Access-Control-Allow-Methods: DELETE, GET, OPTIONS, POST, PUT
< Content-Type: application/json
...
Not Found.
```
