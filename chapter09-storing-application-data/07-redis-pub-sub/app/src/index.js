"use strict";

const redis = require("redis");

const subscriber = redis.createClient(6379, "127.0.0.1"); // you can omit port and ip address if connecting to localhost:6379
subscriber.on("connect", () => console.log(`(subs) Redis client connected to the server @ localhost:6379`));
subscriber.on("ready", () => console.log(`(subs) Redis server is ready to accept commands!`));
subscriber.on("error", err => console.error(`(subs) Redis error: ${ err }`));

const publisher = redis.createClient(); // you can omit port and ip address if connecting to localhost:6379
publisher.on("connect", () => console.log(`(subs) Redis client connected to the server @ localhost:6379`));
publisher.on("ready", () => console.log(`(subs) Redis server is ready to accept commands!`));
publisher.on("error", err => console.error(`(subs) Redis error: ${ err }`));


setInterval(() => publisher.publish("recurrent-messages", `Hello, world! It's ${ new Date().toISOString() }`), 5000);

subscriber.subscribe("recurrent-messages");
subscriber.on("message", (channel, message) => {
  console.log(`Message receive from channel ${ channel }: ${ message }`);
});
