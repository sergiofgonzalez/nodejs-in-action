# 02: *Async/Await* in TypeScript &mdash; Hello, Express!
> a bare-bones Express TypeScript web server

## Exercise 13.07

In this exercise, we will build a simple web application using Express.

We will start a web server on port 8080, and accept GET requests. If the request has a `name` parameter in the query string, we will log the name in a file calleds `names.txt`. Then we'll gree the user with a message. If no name is present, we will just print out `Hello, world!`