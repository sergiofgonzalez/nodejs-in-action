# 04: *Async/Await* in TypeScript &mdash; Hello, TypeORM + NestJS!
> introducing TypeORM, an object-relational framework in a NestJS project

## Exercise 13.09

TypeORM is an object relational mapper written in TypeScript. In this exercise, we will add a local in-memory SQLite database in a NestJS application.

We will expose a `/todos` endpoint that will support GET, POST, and DELETE HTTP methods, and the service will handle the persistence on the SQL database.

### Creating the project

The following commmands create an empty project and then configures it for managing the `/todos` module:

```bash
# create the scaffolding for the project
npx @nestjs/cli new hello-typeorm-nestjs

# cd into the recently created project
cd hello-typeorm-nestjs

# add a new module 'todos'
npx @nestjs/cli g module todos

# add a controller 'todos'
npx @nestjs/cli g controller todos

# add a service 'todos'
npx @nestjs/cli g service todos
```

Finally, install the libs for the in-memory db, and the ORM:

```bash
npm install @nestjs/typeorm sqlite3 typeorm
```

## Validating that the app works as expected

You can execute the following manual tests to validate the application behaves as expected:


Sending a request to the `/todos` endpoint before inserting anything:
```bash
$ curl --verbose http://localhost:3000/todos
*   Trying 127.0.0.1:3000...
* Connected to localhost (127.0.0.1) port 3000 (#0)
> GET /todos HTTP/1.1
> Host: localhost:3000
> User-Agent: curl/7.71.1
> Accept: */*
>
* Mark bundle as not supporting multiuse
< HTTP/1.1 200 OK
< X-Powered-By: Express
< Content-Type: application/json; charset=utf-8
< Content-Length: 2
< ETag: W/"2-l9Fw4VUO7kr8CvBlt4zaMCqXZ0w"
< Date: Thu, 30 Dec 2021 12:24:13 GMT
< Connection: keep-alive
< Keep-Alive: timeout=5
<
* Connection #0 to host localhost left intact
[]
```

Sending a request to insert a new ToDo task:
```bash
$ curl --verbose http://localhost:3000/todos/ \
  --header 'Content-Type: application/json' \
  --data-raw '{ "desc": "Buy museum tickets", "done": false }'
```

Sending a request to the `/todos` endpoint after having inserted one task:

```bash
$ curl http://localhost:3000/todos
[{"id":1,"desc":"Buy museum tickets","done":false}]
```

Sending a request to insert a second task:
```bash
curl http://localhost:3000/todos/ \
  --header 'Content-Type: application/json' \
  --data-raw '{ "desc": "Learn TypeScript", "done": false  }'
```

Sending a request to the `/todos` endpoint after having inserted two tasks:
```bash
$ curl http://localhost:3000/todos
[{"id":1,"desc":"Buy museum tickets","done":false},{"id":2,"desc":"Learn TypeScript","done":false}]
```

Retrieving the details of the most recently inserted task:
```bash
$ curl http://localhost:3000/todos/2
{"id":2,"desc":"Learn TypeScript","done":false}
```

Delete the task we've just inserted:
```bash
$ curl --verbose http://localhost:3000/todos/2 \
>   --request DELETE
*   Trying 127.0.0.1:3000...
* Connected to localhost (127.0.0.1) port 3000 (#0)
> DELETE /todos/2 HTTP/1.1
> Host: localhost:3000
> User-Agent: curl/7.71.1
> Accept: */*
>
* Mark bundle as not supporting multiuse
< HTTP/1.1 200 OK
< X-Powered-By: Express
< Content-Type: application/json; charset=utf-8
< Content-Length: 23
< ETag: W/"17-PVQD/E0HAqMH9FRBYNXdIixTtCA"
< Date: Thu, 30 Dec 2021 12:38:14 GMT
< Connection: keep-alive
< Keep-Alive: timeout=5
<
* Connection #0 to host localhost left intact
{"raw":[],"affected":1}
```

Trying to get the task recently deleted (note that it returns a 200 with an empty response):

```bash
$ curl --verbose http://localhost:3000/todos/2
*   Trying 127.0.0.1:3000...
* Connected to localhost (127.0.0.1) port 3000 (#0)
> GET /todos/2 HTTP/1.1
> Host: localhost:3000
> User-Agent: curl/7.71.1
> Accept: */*
>
* Mark bundle as not supporting multiuse
< HTTP/1.1 200 OK
< X-Powered-By: Express
< Date: Thu, 30 Dec 2021 12:43:51 GMT
< Connection: keep-alive
< Keep-Alive: timeout=5
< Content-Length: 0
<
* Connection #0 to host localhost left intact

```

Sending a request to the `/todos` endpoint after having deleted the task:
```bash
$ curl http://localhost:3000/todos
[{"id":1,"desc":"Buy museum tickets","done":false}]
```
