"use strict";

const MyGreeter = require("./lib/my-greeter-class");
const myGreeter = require("./lib/my-greeter-module");

const myGreeterInstance = new MyGreeter("Ahmed Riz");
myGreeterInstance.sayHello();

myGreeter.sayHelloToJson();
myGreeter.sayHello("Idris Elba");