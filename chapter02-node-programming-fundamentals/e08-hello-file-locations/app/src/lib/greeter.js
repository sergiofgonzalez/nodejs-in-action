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

console.log(`(module)::__dirname="${ __dirname }`);
console.log(`(module)::__filename=${ __filename }`);

