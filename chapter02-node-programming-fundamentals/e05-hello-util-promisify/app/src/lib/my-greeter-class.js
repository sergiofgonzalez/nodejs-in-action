"use strict";

class MyGreeter {
  constructor(name) {
    this.name = name;
  }

  sayHello() {
    console.log(`Hello, ${ this.name }`);
  }
}

module.exports = MyGreeter;