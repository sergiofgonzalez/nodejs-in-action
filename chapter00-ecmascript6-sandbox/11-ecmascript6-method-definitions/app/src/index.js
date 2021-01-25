"use strict";

const util = require("util");
util.inspect.defaultOptions.depth = null;

/* ES5 Style definition */
const es5Emitter = {
  events: {},
  on: function (type, fn) {
    if (!this.events[type]) {
      this.events[type] = [];
    }
    this.events[type].push(fn);
  },
  emit: function (type, event) {
    if (!this.events[type]) {
      return;
    }
    this.events[type].forEach(function (fn) {
      fn(event);
    });
  }
};


es5Emitter.on("greetMe", () => {
  console.log("Hello, Sergio!");
});

es5Emitter.emit("greetMe", "time to say hello");


/* ES6 Style implementation for the same emitter */
const emitter = {
  events: {},
  on(type, fn) {
    if (!this.events[type]) {
      this.events[type] = [];
    }
    this.events[type].push(fn);
  },
  emit(type, event) {
    if (!this.events[type]) {
      return;
    }
    this.events[type].forEach(fn => {
      fn(event);
    });
  }
};

emitter.on("greetMe", () => {
  console.log("Hello, Sergio!");
});

emitter.emit("greetMe", "time to say hello");
