"use strict";

const util = require("util");
util.inspect.defaultOptions.depth = null;

/* stupid example */
var person = {
  name: "Sergio",
  [getRandomKey()] : "this has been selected randomly"
};


console.log(`person=${util.inspect(person)}`);

function getRandomKey() {
  const keys = ["one", "two", "three", "catorce"];

  return keys[Math.floor(Math.random() * keys.length)];
}

/* useful use case for computed properties */
const instance1 = {
  id: 1,
  name: "instance1",
  value: 10,
  createdAt: new Date()
};

const instance2 = {
  id: 2,
  name: "instance2",
  value: 20,
  createdAt: new Date()
};

const instancesMap = {
  [instance1.id]: instance1,
  [instance2.id]: instance2
};

console.log(`instancesMap=${util.inspect(instancesMap)}`);