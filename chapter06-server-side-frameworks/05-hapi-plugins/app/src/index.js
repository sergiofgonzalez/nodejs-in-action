"use strict";

const Hapi = require("hapi");
const Inert = require("inert");

const server = new Hapi.Server();

server.register(Inert, () => {});

server.connection({
  port: 5000
});


server.route({
  method: "GET",
  path: "/greet/{name?}",
  handler(request, reply) {
    if (request.params.name) {
      return reply(`Hello to ${ request.params.name }!!!`);
    } else {
      return reply("Hello, world!");
    }
  }
});

server.route( {
  method: "GET",
  path: "/{param*}",
  handler: {
    directory: {
      path: ".",
      redirectToSlash: true,
      index: true
    }
  }
});

server.start( err => {
  if (err) {
    console.log(`Error while starting server: ${ err }`);
    throw err;
  }

  console.log(`Server running at ${ server.info.uri}`);
});