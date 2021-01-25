"use strict";

const EventEmitter = require("events");

class SomeClass extends EventEmitter {

  constructor(name) {
    super();
    this.name = name || "unknown someone";
  }

  getGreetingSync() {
    return `Hello to ${ this.name }!`;
  }

  getGreetingAsync() {
    return Promise.resolve(this.getGreetingSync());
  }



}

module.exports = SomeClass;