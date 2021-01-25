"use strict";

const { EventEmitter } = require("events");

const eventTracker = new EventEmitter();

eventTracker.on("newListener", (name, listener) => {
  console.log(`new listener added for event '${ name }': listener: ${ listener }`);
});

eventTracker.on("some event", () => console.log("hello!"));